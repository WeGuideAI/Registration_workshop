import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Live Supabase project credentials for WeGuide AI & Robotics Workshop
const DEFAULT_SUPABASE_URL = 'https://zhvupazdnxariocrawmp.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_rXpUSulpWKpyNc6-sxqiZg_E1ldgWKt'

function sanitizeConfigValue(val?: string): string {
  if (!val) return ''
  return val.replace(/[\r\n\t\s]+/g, '').trim()
}

function isInvalidConfig(val?: string): boolean {
  if (!val) return true
  const s = val.toLowerCase()
  return (
    s.length < 5 ||
    s.includes('placeholder') ||
    s.includes('ittpioioodltcbesblsr') // Old deleted Supabase project
  )
}

function getSupabaseConfig(): { url: string; key: string } {
  // Check all standard Vercel & Next.js Supabase environment variable names
  const rawUrl = sanitizeConfigValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL
  )

  const url = !isInvalidConfig(rawUrl) ? rawUrl : DEFAULT_SUPABASE_URL

  const rawKey = sanitizeConfigValue(
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY
  )

  const key = !isInvalidConfig(rawKey) ? rawKey : DEFAULT_SUPABASE_KEY

  return { url, key }
}

/**
 * Server-side Supabase client for database operations.
 * Robust, direct connection that works seamlessly across Server Actions,
 * Server Components, and API routes without brittle request-cookie dependencies.
 */
export async function createClient() {
  const { url, key } = getSupabaseConfig()
  console.log('[Supabase Server Client] Target URL:', url)

  return createSupabaseClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

