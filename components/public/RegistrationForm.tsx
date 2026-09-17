'use client'

import { useState, useCallback } from 'react'
import { registrationSchema } from '@/lib/validation/registration'
import { registerForSlot } from '@/app/actions/register'
import { analytics } from '@/lib/utils/analytics'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import type {
  RegistrationFormData,
  BookingResult,
  AppError,
  ApplicantType,
  ExperienceLevel,
} from '@/lib/types/workshop'
import { GraduationCap, BookOpen, Briefcase, ChevronRight, ChevronDown } from 'lucide-react'

interface RegistrationFormProps {
  onSuccess: (result: BookingResult) => void
}

type FieldErrors = Partial<Record<string, string>>

const EMPTY_FORM: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  applicantType: '',
  city: '',
  hearAboutUs: '',
  // school
  schoolName: '',
  grade: '',
  parentGuardianName: '',
  parentGuardianPhone: '',
  // college
  collegeName: '',
  course: '',
  yearOfStudy: '',
  techInterests: '',
  // professional
  occupation: '',
  workplace: '',
  hasChildAttending: false,
  childName: '',
  childGrade: '',
  childSchool: '',
  // common end
  experienceLevel: '',
}

interface ApplicantCard {
  type: ApplicantType
  icon: typeof GraduationCap
  title: string
  subtitle: string
  color: 'blue' | 'purple' | 'orange'
}

const APPLICANT_CARDS: ApplicantCard[] = [
  {
    type:     'school_student',
    icon:     BookOpen,
    title:    'School Student',
    subtitle: 'Classes 1–12',
    color:    'blue',
  },
  {
    type:     'college_student',
    icon:     GraduationCap,
    title:    'College Student',
    subtitle: 'Undergraduate / PG / PhD',
    color:    'purple',
  },
  {
    type:     'professional',
    icon:     Briefcase,
    title:    'Parent / Professional',
    subtitle: 'Working professional or parent',
    color:    'orange',
  },
]

const colorMap = {
  blue: {
    border: 'border-blue-400',   bg: 'bg-blue-50',
    icon:   'text-blue-600 bg-blue-100 border-blue-200',
    title:  'text-blue-700',     ring: 'ring-2 ring-blue-400 ring-offset-2',
    check:  'bg-blue-600',
  },
  purple: {
    border: 'border-purple-400', bg: 'bg-purple-50',
    icon:   'text-purple-600 bg-purple-100 border-purple-200',
    title:  'text-purple-700',   ring: 'ring-2 ring-purple-400 ring-offset-2',
    check:  'bg-purple-600',
  },
  orange: {
    border: 'border-orange-400', bg: 'bg-orange-50',
    icon:   'text-orange-600 bg-orange-100 border-orange-200',
    title:  'text-orange-700',   ring: 'ring-2 ring-orange-400 ring-offset-2',
    check:  'bg-orange-600',
  },
}

const YEAR_OPTIONS = [
  { value: '1st Year',      label: '1st Year' },
  { value: '2nd Year',      label: '2nd Year' },
  { value: '3rd Year',      label: '3rd Year' },
  { value: '4th Year',      label: '4th Year' },
  { value: 'Postgraduate',  label: 'Postgraduate / Masters' },
  { value: 'PhD',           label: 'PhD / Research' },
]

const GRADE_OPTIONS = [
  '1st', '2nd', '3rd', '4th', '5th',
  '6th', '7th', '8th', '9th', '10th', '11th', '12th',
].map((g) => ({ value: g, label: `Grade ${g}` }))

const OCCUPATION_OPTIONS = [
  { value: 'Teacher / Educator',          label: 'Teacher / Educator' },
  { value: 'Engineer / IT Professional',  label: 'Engineer / IT Professional' },
  { value: 'Business Owner',              label: 'Business Owner / Entrepreneur' },
  { value: 'Government Employee',         label: 'Government Employee' },
  { value: 'Healthcare Professional',     label: 'Healthcare Professional' },
  { value: 'Parent / Homemaker',          label: 'Parent / Homemaker' },
  { value: 'Freelancer / Self-Employed',  label: 'Freelancer / Self-Employed' },
  { value: 'Retired',                     label: 'Retired' },
  { value: 'Other',                       label: 'Other' },
]

const HEAR_ABOUT_OPTIONS = [
  { value: 'WhatsApp / Friends & Family', label: 'WhatsApp / Friends & Family' },
  { value: 'Instagram / Facebook',        label: 'Instagram / Facebook' },
  { value: 'School / College Notice',     label: 'School / College Notice Board' },
  { value: 'Google Search',               label: 'Google Search' },
  { value: 'YouTube',                     label: 'YouTube' },
  { value: 'Newspaper / Poster',          label: 'Newspaper / Poster / Flyer' },
  { value: 'Word of Mouth',               label: 'Friend or Colleague told me' },
  { value: 'Other',                       label: 'Other' },
]

const FIELD_MAP: Record<string, string> = {
  full_name:             'fullName',
  email:                 'email',
  phone:                 'phone',
  applicant_type:        'applicantType',
  experience_level:      'experienceLevel',
  city:                  'city',
  hear_about_us:         'hearAboutUs',
  school_name:           'schoolName',
  grade:                 'grade',
  parent_guardian_name:  'parentGuardianName',
  parent_guardian_phone: 'parentGuardianPhone',
  college_name:          'collegeName',
  course:                'course',
  year_of_study:         'yearOfStudy',
  tech_interests:        'techInterests',
  occupation:            'occupation',
  workplace:             'workplace',
  child_name:            'childName',
  child_grade:           'childGrade',
  child_school:          'childSchool',
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [form, setForm]           = useState<RegistrationFormData>(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [globalError, setGlobalError] = useState<AppError | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = useCallback(
    <K extends keyof RegistrationFormData>(key: K, value: RegistrationFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      if (fieldErrors[key as string]) {
        setFieldErrors((prev) => { const n = { ...prev }; delete n[key as string]; return n })
      }
      if (globalError) setGlobalError(null)
    },
    [fieldErrors, globalError]
  )

  const selectApplicantType = (type: ApplicantType) => {
    setForm((prev) => ({
      ...EMPTY_FORM,
      // preserve common contact info already typed
      fullName:     prev.fullName,
      email:        prev.email,
      phone:        prev.phone,
      city:         prev.city,
      hearAboutUs:  prev.hearAboutUs,
      applicantType: type,
    }))
    setFieldErrors({})
    setGlobalError(null)
  }

  const buildPayload = (): Record<string, string | boolean> => {
    const payload: Record<string, string | boolean> = {
      full_name:        form.fullName.trim(),
      email:            form.email.trim().toLowerCase(),
      phone:            form.phone.trim(),
      applicant_type:   form.applicantType,
      experience_level: form.experienceLevel,
      city:             form.city.trim(),
      hear_about_us:    form.hearAboutUs,
    }
    if (form.applicantType === 'school_student') {
      payload.school_name            = form.schoolName.trim()
      payload.grade                  = form.grade.trim()
      payload.parent_guardian_name   = form.parentGuardianName.trim()
      payload.parent_guardian_phone  = form.parentGuardianPhone.trim()
    } else if (form.applicantType === 'college_student') {
      payload.college_name   = form.collegeName.trim()
      payload.course         = form.course.trim()
      payload.year_of_study  = form.yearOfStudy.trim()
      payload.tech_interests = form.techInterests.trim()
    } else if (form.applicantType === 'professional') {
      payload.occupation          = form.occupation
      payload.workplace           = form.workplace.trim()
      payload.has_child_attending = form.hasChildAttending
      if (form.hasChildAttending) {
        payload.child_name   = form.childName.trim()
        payload.child_grade  = form.childGrade.trim()
        payload.child_school = form.childSchool.trim()
      }
    }
    return payload
  }

  const validateClientSide = (): boolean => {
    const result = registrationSchema.safeParse(buildPayload())
    if (!result.success) {
      const errors: FieldErrors = {}
      result.error.issues.forEach((issue) => {
        const key = FIELD_MAP[issue.path[0] as string] ?? (issue.path[0] as string)
        if (key && !errors[key]) errors[key] = issue.message
      })
      setFieldErrors(errors)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    if (!form.applicantType) {
      setFieldErrors({ applicantType: 'Please select who you are registering as' })
      return
    }
    if (!validateClientSide()) return

    setIsSubmitting(true)
    analytics.track('registration_submitted', { applicant_type: form.applicantType })
    try {
      const result = await registerForSlot(buildPayload())
      if (!result.success) {
        analytics.track('registration_failure', { error_code: result.error.code })
        setGlobalError(result.error)
        return
      }
      analytics.track('registration_success', { applicant_type: form.applicantType })
      onSuccess(result.data)
    } catch {
      analytics.track('registration_failure', { error_code: 'NETWORK_ERROR' })
      setGlobalError({ code: 'NETWORK_ERROR', message: "We couldn't confirm your registration. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedType = form.applicantType as ApplicantType | ''

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Workshop registration form" className="space-y-6">

      {/* ── Step 1: Who Are You? ─────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Step 1 · Who is registering?
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {APPLICANT_CARDS.map((card) => {
            const Icon = card.icon
            const isSelected = selectedType === card.type
            const c = colorMap[card.color]
            return (
              <button
                key={card.type}
                type="button"
                id={`applicant-type-${card.type}`}
                onClick={() => selectApplicantType(card.type)}
                aria-pressed={isSelected}
                className={`
                  relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center
                  transition-all duration-200 cursor-pointer select-none
                  ${isSelected
                    ? `${c.border} ${c.bg} ${c.ring} shadow-md`
                    : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-sm hover:bg-white'
                  }
                `}
              >
                {isSelected && (
                  <span className={`absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full ${c.check}`}>
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${c.icon} shadow-xs`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className={`block text-sm font-bold ${isSelected ? c.title : 'text-slate-900'}`}>
                    {card.title}
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium mt-0.5">
                    {card.subtitle}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        {fieldErrors.applicantType && (
          <p className="mt-2 text-xs font-semibold text-red-600" role="alert">
            {fieldErrors.applicantType}
          </p>
        )}
      </div>

      {/* ── Steps 2–4 revealed after type selection ──────────────── */}
      {selectedType && (
        <>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Details</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* ── Step 2: Contact Information ──────────────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Step 2 · Contact Information
            </p>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Arjun Sharma"
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  error={fieldErrors.fullName}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  error={fieldErrors.email}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Phone / WhatsApp"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  error={fieldErrors.phone}
                  hint="Session updates may be sent via WhatsApp"
                />
                <Input
                  label="City / Area"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. Palakkad, Coimbatore"
                  value={form.city}
                  onChange={(e) => setField('city', e.target.value)}
                  error={fieldErrors.city}
                />
              </div>
            </div>
          </div>

          {/* ── Step 3: Type-Specific Details ────────────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Step 3 ·{' '}
              {selectedType === 'school_student'  && 'School Details'}
              {selectedType === 'college_student' && 'College Details'}
              {selectedType === 'professional'    && 'Professional Details'}
            </p>

            <div className="space-y-4">

              {/* ── School Student ─────────────────────────────── */}
              {selectedType === 'school_student' && (
                <>
                  <Input
                    label="School Name"
                    type="text"
                    required
                    placeholder="e.g. Government Higher Secondary School, Palakkad"
                    value={form.schoolName}
                    onChange={(e) => setField('schoolName', e.target.value)}
                    error={fieldErrors.schoolName}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Grade / Class"
                      required
                      value={form.grade}
                      onChange={(e) => setField('grade', e.target.value)}
                      error={fieldErrors.grade}
                      placeholder="Select your grade"
                      options={GRADE_OPTIONS}
                    />
                    <Input
                      label="Parent / Guardian Name"
                      type="text"
                      required
                      placeholder="e.g. Suresh Kumar"
                      value={form.parentGuardianName}
                      onChange={(e) => setField('parentGuardianName', e.target.value)}
                      error={fieldErrors.parentGuardianName}
                    />
                  </div>
                  <Input
                    label="Parent / Guardian Phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    value={form.parentGuardianPhone}
                    onChange={(e) => setField('parentGuardianPhone', e.target.value)}
                    error={fieldErrors.parentGuardianPhone}
                    hint="Optional — for guardian coordination"
                  />
                </>
              )}

              {/* ── College Student ────────────────────────────── */}
              {selectedType === 'college_student' && (
                <>
                  <Input
                    label="College / University Name"
                    type="text"
                    required
                    placeholder="e.g. Government Engineering College, Palakkad"
                    value={form.collegeName}
                    onChange={(e) => setField('collegeName', e.target.value)}
                    error={fieldErrors.collegeName}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Course / Stream"
                      type="text"
                      required
                      placeholder="e.g. B.Tech CSE, BCA, B.Sc Physics"
                      value={form.course}
                      onChange={(e) => setField('course', e.target.value)}
                      error={fieldErrors.course}
                    />
                    <Select
                      label="Year of Study"
                      required
                      value={form.yearOfStudy}
                      onChange={(e) => setField('yearOfStudy', e.target.value)}
                      error={fieldErrors.yearOfStudy}
                      placeholder="Select year"
                      options={YEAR_OPTIONS}
                    />
                  </div>
                  <Input
                    label="Areas of Tech Interest"
                    type="text"
                    placeholder="e.g. Machine Learning, Robotics, App Development"
                    value={form.techInterests}
                    onChange={(e) => setField('techInterests', e.target.value)}
                    error={fieldErrors.techInterests}
                    hint="Optional — helps us tailor content for you"
                  />
                </>
              )}

              {/* ── Parent / Professional ──────────────────────── */}
              {selectedType === 'professional' && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Occupation"
                      required
                      value={form.occupation}
                      onChange={(e) => setField('occupation', e.target.value)}
                      error={fieldErrors.occupation}
                      placeholder="Select your occupation"
                      options={OCCUPATION_OPTIONS}
                    />
                    <Input
                      label="Organization / Workplace"
                      type="text"
                      placeholder="e.g. KSEB, Infosys, Self-employed"
                      value={form.workplace}
                      onChange={(e) => setField('workplace', e.target.value)}
                      error={fieldErrors.workplace}
                      hint="Optional"
                    />
                  </div>

                  {/* Child attending toggle */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                    <button
                      type="button"
                      onClick={() => {
                        setField('hasChildAttending', !form.hasChildAttending)
                        if (form.hasChildAttending) {
                          // clear child fields when unchecking
                          setForm((prev) => ({ ...prev, childName: '', childGrade: '', childSchool: '', hasChildAttending: false }))
                          setFieldErrors((prev) => {
                            const n = { ...prev }
                            delete n.childName; delete n.childGrade; delete n.childSchool
                            return n
                          })
                        }
                      }}
                      aria-pressed={form.hasChildAttending}
                      className="flex w-full items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          form.hasChildAttending
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {form.hasChildAttending && (
                            <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">
                          I also have a school-age child attending with me
                        </span>
                      </span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${form.hasChildAttending ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>

                    {/* Child fields — slide open when checked */}
                    {form.hasChildAttending && (
                      <div className="mt-4 space-y-3 pt-4 border-t border-slate-200">
                        <Input
                          label="Child's Full Name"
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={form.childName}
                          onChange={(e) => setField('childName', e.target.value)}
                          error={fieldErrors.childName}
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Select
                            label="Child's Grade"
                            required
                            value={form.childGrade}
                            onChange={(e) => setField('childGrade', e.target.value)}
                            error={fieldErrors.childGrade}
                            placeholder="Select grade"
                            options={GRADE_OPTIONS}
                          />
                          <Input
                            label="Child's School"
                            type="text"
                            required
                            placeholder="e.g. St. Thomas School"
                            value={form.childSchool}
                            onChange={(e) => setField('childSchool', e.target.value)}
                            error={fieldErrors.childSchool}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ── AI/Robotics Familiarity (all types) ──────────── */}
              <Select
                label="Familiarity with AI / Robotics"
                required
                value={form.experienceLevel}
                onChange={(e) => setField('experienceLevel', e.target.value as ExperienceLevel)}
                error={fieldErrors.experienceLevel}
                placeholder="Select your level"
                options={[
                  { value: 'Beginner',     label: 'Complete Beginner — Brand new to AI & Robots' },
                  { value: 'Intermediate', label: 'Curious Explorer — Heard of ChatGPT, want to learn more' },
                  { value: 'Advanced',     label: 'Tech Enthusiast — Already enjoy building or coding' },
                ]}
              />
            </div>
          </div>

          {/* ── Step 4: How Did You Hear About Us? ───────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Step 4 · One Last Thing
            </p>
            <Select
              label="How did you hear about this workshop?"
              value={form.hearAboutUs}
              onChange={(e) => setField('hearAboutUs', e.target.value)}
              error={fieldErrors.hearAboutUs}
              placeholder="Select an option"
              options={HEAR_ABOUT_OPTIONS}
            />
          </div>

          {/* ── Global Error ─────────────────────────────────────── */}
          {globalError && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-4 shadow-sm backdrop-blur-sm"
            >
              <span aria-hidden="true" className="mt-0.5 text-red-500 text-lg">⚠</span>
              <p className="text-sm font-medium text-red-700">{globalError.message}</p>
            </div>
          )}

          {/* ── Submit ───────────────────────────────────────────── */}
          <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting} className="mt-1">
            {isSubmitting ? (
              'Confirming your registration…'
            ) : (
              <>
                <span>Confirm Registration</span>
                <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-500">
            By registering you agree to WeGuide&apos;s event terms.{' '}
            <strong className="text-slate-700">No payment required. Free entry.</strong>
          </p>
        </>
      )}

      {!selectedType && (
        <p className="text-center text-sm text-slate-500 py-2">
          👆 Select who is registering above to fill in your details.
        </p>
      )}
    </form>
  )
}
