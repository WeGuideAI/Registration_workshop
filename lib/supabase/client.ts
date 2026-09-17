import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

const DEFAULT_SUPABASE_URL = 'https://zhvupazdnxariocrawmp.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_rXpUSulpWKpyNc6-sxqiZg_E1ldgWKt'

function isInvalidConfig(val?: string): boolean {
  if (!val) return true
  const s = val.toLowerCase()
  return (
    s.includes('placeholder') ||
    s.includes('ittpioioodltcbesblsr') // Old deleted Supabase project
  )
}

/**
 * Browser-side Supabase client.
 * Used in Client Components for auth state and public operations.
 */
export function createClient() {
  const envUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL

  const url = !isInvalidConfig(envUrl) ? (envUrl as string) : DEFAULT_SUPABASE_URL

  const envKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY

  const key = !isInvalidConfig(envKey) ? (envKey as string) : DEFAULT_SUPABASE_KEY

  if (isInvalidConfig(url) || isInvalidConfig(key)) {
    return null
  }

  try {
    return createBrowserClient<Database>(url, key)
  } catch {
    return null
  }
}

