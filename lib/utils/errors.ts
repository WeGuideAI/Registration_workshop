import type { AppError, AppErrorCode } from '@/lib/types/workshop'

// User-facing messages — clear, actionable, friendly
const USER_MESSAGES: Record<AppErrorCode, string> = {
  DUPLICATE_REGISTRATION:
    'You are already registered with this email address. Please check your inbox.',
  VALIDATION_ERROR:
    'Please check your information and ensure all required fields are filled correctly.',
  UNAUTHORIZED:
    'You are not authorised to perform this action.',
  NETWORK_ERROR:
    'Network communication issue. Please check your connection and try again.',
  UNKNOWN_ERROR:
    'Something went wrong. Please try again in a moment.',
}

export function parseSupabaseError(error: unknown): AppError {
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : String(error)

  const lower = rawMessage.toLowerCase()

  if (
    lower.includes('duplicate') ||
    lower.includes('unique_violation') ||
    lower.includes('already registered') ||
    lower.includes('23505')
  ) {
    return { code: 'DUPLICATE_REGISTRATION', message: USER_MESSAGES.DUPLICATE_REGISTRATION }
  }

  if (
    lower.includes('validation') ||
    lower.includes('invalid') ||
    lower.includes('violates check constraint')
  ) {
    return { code: 'VALIDATION_ERROR', message: USER_MESSAGES.VALIDATION_ERROR }
  }

  if (
    lower.includes('unauthorized') ||
    lower.includes('permission denied') ||
    lower.includes('row-level security')
  ) {
    return { code: 'UNAUTHORIZED', message: USER_MESSAGES.UNAUTHORIZED }
  }

  if (
    lower.includes('fetch failed') ||
    lower.includes('failed to fetch') ||
    lower.includes('network') ||
    lower.includes('enotfound') ||
    lower.includes('timeout')
  ) {
    return { code: 'NETWORK_ERROR', message: USER_MESSAGES.NETWORK_ERROR }
  }

  return { code: 'UNKNOWN_ERROR', message: USER_MESSAGES.UNKNOWN_ERROR }
}

export function getErrorMessage(code: AppErrorCode): string {
  return USER_MESSAGES[code] || USER_MESSAGES.UNKNOWN_ERROR
}
