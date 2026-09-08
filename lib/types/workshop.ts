// Application-level domain types (distinct from raw DB types)

export type RegistrationStatus = 'confirmed' | 'attended' | 'cancelled'
export type UserRole = 'Student' | 'Working Professional' | 'Hobbyist/Other'
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export const USER_ROLES: UserRole[] = [
  'Student',
  'Working Professional',
  'Hobbyist/Other',
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

// ── Public (no PII leakage) ──────────────────────────────────────
export interface PublicSlot {
  id: string
  sessionTitle: string
  sessionDatetime: string
  maxCapacity: number
  seatsFilled: number
  seatsRemaining: number
  isSoldOut: boolean
}

// ── Admin: full slot with write fields ──────────────────────────
export interface AdminSlot {
  id: string
  sessionTitle: string
  sessionDatetime: string
  maxCapacity: number
  isActive: boolean
  seatsFilled: number
  seatsRemaining: number
  createdAt: string
  updatedAt: string
}

// ── Registrations ────────────────────────────────────────────────
export interface Registration {
  id: string
  createdAt: string
  updatedAt: string
  fullName: string
  email: string
  phone: string
  role: UserRole
  organization: string
  experienceLevel: ExperienceLevel
  slotId: string
  status: RegistrationStatus
  // joined from slots
  sessionTitle?: string
  sessionDatetime?: string
}

// ── Form / submission ────────────────────────────────────────────
export interface RegistrationFormData {
  fullName: string
  email: string
  phone: string
  role: UserRole | ''
  organization: string
  experienceLevel: ExperienceLevel | ''
  slotId: string
}

export interface BookingResult {
  registrationId: string
  fullName: string
  email: string
  sessionTitle: string
  sessionDatetime: string
  status: RegistrationStatus
}

// ── Errors ───────────────────────────────────────────────────────
export type AppErrorCode =
  | 'SLOT_FULL'
  | 'DUPLICATE_REGISTRATION'
  | 'SLOT_INACTIVE'
  | 'SLOT_NOT_FOUND'
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
