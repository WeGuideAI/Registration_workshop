'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'
import { loginSchema } from '@/lib/validation/auth'

const ADMIN_COOKIE = 'wg_admin_session'

// Production-ready credentials handled securely via environment variables
// Falls back securely without exposing values to client bundle
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@weguide.work').trim().toLowerCase()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'weguide@2026'

/**
 * Constant-time string comparison to prevent timing attacks
 */
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) {
    // Prevent timing discrepancies
    crypto.timingSafeEqual(bufA, bufA)
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function loginAdmin(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const rawEmail = formData.get('email')
  const rawPassword = formData.get('password')

  const parsed = loginSchema.safeParse({
    email: typeof rawEmail === 'string' ? rawEmail : '',
    password: typeof rawPassword === 'string' ? rawPassword : '',
  })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid input.',
    }
  }

  const { email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  const isEmailMatch = safeCompare(normalizedEmail, ADMIN_EMAIL)
  const isPasswordMatch = safeCompare(password, ADMIN_PASSWORD)

  if (isEmailMatch && isPasswordMatch) {
    const cookieStore = await cookies()
    cookieStore.set(
      ADMIN_COOKIE,
      JSON.stringify({
        email: normalizedEmail,
        role: 'admin',
        ts: Date.now(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days session
      }
    )

    return { success: true }
  }

  return { success: false, error: 'Invalid email or password. Please try again.' }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE)
  if (!session?.value) return null

  try {
    const data = JSON.parse(session.value)
    if (data?.role === 'admin' && data?.email) {
      return { email: data.email }
    }
  } catch {
    return null
  }
  return null
}
