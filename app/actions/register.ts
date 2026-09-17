'use server'

import { createClient } from '@/lib/supabase/server'
import { registrationSchema } from '@/lib/validation/registration'
import { parseSupabaseError } from '@/lib/utils/errors'
import { saveLocalRegistration, getLocalRegistrations } from '@/lib/storage/local-registrations'
import type { ActionResult, BookingResult, Registration } from '@/lib/types/workshop'

export async function registerForSlot(
  formData: Record<string, string | boolean>
): Promise<ActionResult<BookingResult>> {
  const parsed = registrationSchema.safeParse(formData)

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: firstIssue?.message ?? 'Please check your information and try again.',
      },
    }
  }

  const data = parsed.data
  const normalizedEmail = data.email.toLowerCase().trim()

  // 1. Check local duplicates
  try {
    const localList = await getLocalRegistrations()
    const duplicate = localList.find((r) => r.email.toLowerCase().trim() === normalizedEmail)
    if (duplicate) {
      return {
        success: false,
        error: {
          code: 'DUPLICATE_REGISTRATION',
          message: 'You are already registered with this email address. Please check your inbox.',
        },
      }
    }
  } catch {
    // Non-blocking
  }

  let dbRegistrationId: string | null = null

  // 2. Attempt Supabase persistence if configured
  try {
    const supabase = await createClient()

    // First attempt: Direct insert with all enriched fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: inserted, error: insertError } = await (supabase as any)
      .from('registrations')
      .insert({
        full_name:             data.full_name,
        email:                 normalizedEmail,
        phone:                 data.phone,
        applicant_type:        data.applicant_type,
        experience_level:      data.experience_level,
        city:                  data.city                   || null,
        hear_about_us:         data.hear_about_us          || null,
        school_name:           data.school_name            || null,
        grade:                 data.grade                  || null,
        parent_guardian_name:  data.parent_guardian_name   || null,
        parent_guardian_phone: data.parent_guardian_phone  || null,
        college_name:          data.college_name           || null,
        course:                data.course                 || null,
        year_of_study:         data.year_of_study          || null,
        tech_interests:        data.tech_interests         || null,
        occupation:            data.occupation             || null,
        workplace:             data.workplace              || null,
        has_child_attending:   Boolean(data.has_child_attending),
        child_name:            data.child_name             || null,
        child_grade:           data.child_grade            || null,
        child_school:          data.child_school           || null,
        status:                'confirmed',
      })
      .select('id')
      .single()

    if (!insertError && inserted?.id) {
      dbRegistrationId = inserted.id
    } else if (insertError) {
      const errMsg = (insertError.message || '').toLowerCase()

      // Handle genuine duplicate error from Postgres
      if (
        errMsg.includes('duplicate') ||
        errMsg.includes('unique_violation') ||
        insertError.code === '23505'
      ) {
        return {
          success: false,
          error: {
            code: 'DUPLICATE_REGISTRATION',
            message: 'You are already registered with this email address.',
          },
        }
      }

      // If missing columns in legacy DB (e.g. role/organization/slot_id constraints), attempt legacy format
      if (
        errMsg.includes('column') ||
        errMsg.includes('violates not-null') ||
        errMsg.includes('relation')
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: legacyInserted } = await (supabase as any)
          .from('registrations')
          .insert({
            full_name:        data.full_name,
            email:            normalizedEmail,
            phone:            data.phone,
            role:             data.applicant_type === 'professional' ? 'Working Professional' : 'Student',
            organization:     data.school_name || data.college_name || data.workplace || 'Self',
            experience_level: data.experience_level,
            status:           'confirmed',
          })
          .select('id')
          .single()

        if (legacyInserted?.id) {
          dbRegistrationId = legacyInserted.id
        }
      }
    }
  } catch (supabaseErr) {
    // Non-blocking: Supabase unavailable / network error / placeholder configuration
    console.warn('Supabase registration insert skipped or unavailable:', supabaseErr)
  }

  // 3. Fallback / Canonical ID generation
  const registrationId =
    dbRegistrationId ||
    'wg-' + Math.random().toString(36).substring(2, 9).toLowerCase()

  // 4. Save to persistent local storage so lead is never lost
  const registrationRecord: Registration = {
    id:                  registrationId,
    createdAt:           new Date().toISOString(),
    updatedAt:           new Date().toISOString(),
    fullName:            data.full_name,
    email:               normalizedEmail,
    phone:               data.phone,
    applicantType:       data.applicant_type,
    experienceLevel:     data.experience_level,
    city:                data.city,
    hearAboutUs:         data.hear_about_us,
    schoolName:          data.school_name,
    grade:               data.grade,
    parentGuardianName:  data.parent_guardian_name,
    parentGuardianPhone: data.parent_guardian_phone,
    collegeName:         data.college_name,
    course:              data.course,
    yearOfStudy:         data.year_of_study,
    techInterests:       data.tech_interests,
    occupation:          data.occupation,
    workplace:           data.workplace,
    hasChildAttending:   data.has_child_attending,
    childName:           data.child_name,
    childGrade:          data.child_grade,
    childSchool:         data.child_school,
    status:              'confirmed',
  }

  await saveLocalRegistration(registrationRecord)

  return {
    success: true,
    data: {
      registrationId,
      fullName:      data.full_name,
      email:         normalizedEmail,
      applicantType: data.applicant_type,
      status:        'confirmed',
    },
  }
}
