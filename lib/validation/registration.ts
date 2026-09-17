import { z } from 'zod'

// ── Base schema (fields always required) ─────────────────────────
const baseSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[\d\s\-(). ]{7,20}$/,
      'Please enter a valid phone number (7-20 digits)'
    ),

  applicant_type: z.enum(
    ['school_student', 'college_student', 'professional'] as const,
    { error: 'Please select who you are registering as' }
  ),

  experience_level: z.enum(
    ['Beginner', 'Intermediate', 'Advanced'] as const,
    { error: 'Please select your familiarity level with AI / Robotics' }
  ),

  // Common optional enrichment fields
  city:          z.string().trim().max(100).optional(),
  hear_about_us: z.string().trim().max(200).optional(),

  // ── School student fields ──────────────────────────────────────
  school_name:           z.string().trim().max(150).optional(),
  grade:                 z.string().trim().max(20).optional(),
  parent_guardian_name:  z.string().trim().max(100).optional(),
  parent_guardian_phone: z.string().trim().max(20).optional(),

  // ── College student fields ─────────────────────────────────────
  college_name:  z.string().trim().max(150).optional(),
  course:        z.string().trim().max(100).optional(),
  year_of_study: z.string().trim().max(20).optional(),
  tech_interests:z.string().trim().max(300).optional(),

  // ── Professional (parent / working professional) fields ────────
  occupation:          z.string().trim().max(100).optional(),
  workplace:           z.string().trim().max(150).optional(),
  has_child_attending: z.coerce.boolean().optional(),
  child_name:          z.string().trim().max(100).optional(),
  child_grade:         z.string().trim().max(20).optional(),
  child_school:        z.string().trim().max(150).optional(),
})

// ── Full schema with conditional validation ───────────────────────
export const registrationSchema = baseSchema.superRefine((data, ctx) => {
  if (data.applicant_type === 'school_student') {
    if (!data.school_name || data.school_name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['school_name'],          message: 'Please enter your school name' })
    }
    if (!data.grade || data.grade.length < 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['grade'],                message: 'Please select your grade or class' })
    }
    if (!data.parent_guardian_name || data.parent_guardian_name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['parent_guardian_name'], message: "Please enter your parent/guardian's name" })
    }
  }

  if (data.applicant_type === 'college_student') {
    if (!data.college_name || data.college_name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['college_name'],  message: 'Please enter your college name' })
    }
    if (!data.course || data.course.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['course'],        message: 'Please enter your course or stream' })
    }
    if (!data.year_of_study || data.year_of_study.length < 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['year_of_study'], message: 'Please select your year of study' })
    }
  }

  // professional: occupation is required; child fields only if has_child_attending is true
  if (data.applicant_type === 'professional') {
    if (!data.occupation || data.occupation.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['occupation'], message: 'Please select your occupation' })
    }
    if (data.has_child_attending) {
      if (!data.child_name || data.child_name.length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['child_name'],   message: "Please enter your child's name" })
      }
      if (!data.child_grade || data.child_grade.length < 1) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['child_grade'],  message: "Please select your child's grade" })
      }
      if (!data.child_school || data.child_school.length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['child_school'], message: "Please enter your child's school name" })
      }
    }
  }
})

export type RegistrationInput = z.infer<typeof registrationSchema>

// Admin filter/search validation
export const adminFiltersSchema = z.object({
  search:           z.string().trim().max(100).optional(),
  applicant_type:   z.enum(['school_student', 'college_student', 'professional'] as const).optional(),
  experience_level: z.enum(['Beginner', 'Intermediate', 'Advanced'] as const).optional(),
  status:           z.enum(['confirmed', 'attended', 'cancelled'] as const).optional(),
  page:             z.coerce.number().int().min(1).default(1),
  page_size:        z.coerce.number().int().min(1).max(100).default(25),
})

export type AdminFilters = z.infer<typeof adminFiltersSchema>
