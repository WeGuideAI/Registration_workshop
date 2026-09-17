import type { AppError, AppErrorCode } from '@/lib/types/workshop'

// Map raw DB error message substrings → typed error codes
const ERROR_PATTERNS: Array<[string, AppErrorCode]> = [
  ['DUPLICATE_REGISTRATION', 'DUPLICATE_REGISTRATION'],
  ['VALIDATION_ERROR',       'VALIDATION_ERROR'],
  ['UNAUTHORIZED',           'UNAUTHORIZED'],
  ['unique_violation',       'DUPLICATE_REGISTRATION'],
]

// User-facing messages — never expose DB internals
const USER_MESSAGES: Record<AppErrorCode, string> = {
  DUPLICATE_REGISTRATION:
    'You are already registered. Check your email for your confirmation.',
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
