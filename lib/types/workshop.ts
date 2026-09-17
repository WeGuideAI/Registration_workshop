// Application-level domain types (distinct from raw DB types)

export type RegistrationStatus = 'confirmed' | 'attended' | 'cancelled'

// Applicant types for the dynamic form
export type ApplicantType = 'school_student' | 'college_student' | 'professional'

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export const APPLICANT_TYPES: ApplicantType[] = [
  'school_student',
  'college_student',
  'professional',
]

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
]

export const REGISTRATION_STATUSES: RegistrationStatus[] = [
  'confirmed',
  'attended',
  'cancelled',
]

// ── Registrations ────────────────────────────────────────────────
export interface Registration {
  id: string
  createdAt: string
  updatedAt: string
  fullName: string
  email: string
  phone: string
  applicantType: ApplicantType
  city?: string
  hearAboutUs?: string
  experienceLevel: ExperienceLevel

  // School student specific
  schoolName?: string
  grade?: string
  parentGuardianName?: string
  parentGuardianPhone?: string

  // College student specific
  collegeName?: string
  course?: string
  yearOfStudy?: string
  techInterests?: string

  // Professional (parent / working professional) specific
  occupation?: string
  workplace?: string
  hasChildAttending?: boolean
  childName?: string
  childGrade?: string
  childSchool?: string

  status: RegistrationStatus
}

// ── Form / submission ────────────────────────────────────────────
export interface RegistrationFormData {
  // Common fields
  fullName: string
  email: string
  phone: string
  applicantType: ApplicantType | ''
  city: string
  hearAboutUs: string

  // School student specific
  schoolName: string
  grade: string
  parentGuardianName: string
  parentGuardianPhone: string

  // College student specific
  collegeName: string
  course: string
  yearOfStudy: string
  techInterests: string

  // Professional (parent / working professional) specific
  occupation: string
  workplace: string
  hasChildAttending: boolean
  childName: string
  childGrade: string
  childSchool: string

  // Common end field
  experienceLevel: ExperienceLevel | ''
}

export interface BookingResult {
  registrationId: string
  fullName: string
  email: string
  phone?: string
  applicantType: ApplicantType
  status: RegistrationStatus
  experienceLevel?: ExperienceLevel
  city?: string
  hearAboutUs?: string
  schoolName?: string
  grade?: string
  parentGuardianName?: string
  parentGuardianPhone?: string
  collegeName?: string
  course?: string
  yearOfStudy?: string
  techInterests?: string
  occupation?: string
  workplace?: string
  hasChildAttending?: boolean
  childName?: string
  childGrade?: string
  childSchool?: string
  createdAt?: string
}

// ── Errors ───────────────────────────────────────────────────────
export type AppErrorCode =
  | 'DUPLICATE_REGISTRATION'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'

export interface AppError {
  code: AppErrorCode
  message: string
}

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: AppError }

// ── Dashboard ────────────────────────────────────────────────────
export interface DashboardStats {
  total: number
  confirmed: number
  attended: number
  cancelled: number
}
