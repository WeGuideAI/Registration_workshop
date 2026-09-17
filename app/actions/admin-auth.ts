'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_COOKIE = 'wg_admin_session'

// Pre-configured built-in credentials
// In production, these can also be overridden via ADMIN_EMAIL and ADMIN_PASSWORD env vars
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@weguide.work'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'weguide@2026'

export async function loginAdmin(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' }
  }

  const validEmail = DEFAULT_ADMIN_EMAIL.toLowerCase()
  const validPassword = DEFAULT_ADMIN_PASSWORD

  if (email === validEmail && password === validPassword) {
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE, JSON.stringify({ email, role: 'admin', ts: Date.now() }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    })

    return { success: true }
  }

  return { success: false, error: 'Invalid admin credentials. Please try again.' }
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
