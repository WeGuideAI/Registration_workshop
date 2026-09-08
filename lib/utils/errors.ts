import type { AppError, AppErrorCode } from '@/lib/types/workshop'

// Map raw DB error message substrings → typed error codes
const ERROR_PATTERNS: Array<[string, AppErrorCode]> = [
  ['SLOT_FULL', 'SLOT_FULL'],
  ['DUPLICATE_REGISTRATION', 'DUPLICATE_REGISTRATION'],
  ['SLOT_INACTIVE', 'SLOT_INACTIVE'],
  ['SLOT_NOT_FOUND', 'SLOT_NOT_FOUND'],
  ['VALIDATION_ERROR', 'VALIDATION_ERROR'],
  ['UNAUTHORIZED', 'UNAUTHORIZED'],
  ['unique_violation', 'DUPLICATE_REGISTRATION'],
]

// User-facing messages — never expose DB internals
const USER_MESSAGES: Record<AppErrorCode, string> = {
  SLOT_FULL:
    'This session filled up while you were registering. Please choose another available session.',
  DUPLICATE_REGISTRATION:
    'You are already registered for this session. Check your email for your confirmation.',
  SLOT_INACTIVE:
    'This session is no longer accepting registrations.',
  SLOT_NOT_FOUND:
    'The selected session could not be found. Please refresh and try again.',
  VALIDATION_ERROR:
    'Please check your information and try again.',
  UNAUTHORIZED:
    'You are not authorised to perform this action.',
  NETWORK_ERROR:
    "We couldn't confirm your registration. Please try again. Your seat has not been " +
    'confirmed unless you see the confirmation screen.',
  UNKNOWN_ERROR:
    'Something went wrong. Please try again in a moment.',
}

export function parseSupabaseError(error: unknown): AppError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : String(error)

  for (const [pattern, code] of ERROR_PATTERNS) {
    if (message.includes(pattern)) {
      return { code, message: USER_MESSAGES[code] }
    }
  }

  return { code: 'UNKNOWN_ERROR', message: USER_MESSAGES.UNKNOWN_ERROR }
}

export function getErrorMessage(code: AppErrorCode): string {
  return USER_MESSAGES[code]
}
