import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

/**
 * Browser-side Supabase client.
 * Used in Client Components for auth state and public operations.
 * Returns null if env vars are not configured or invalid (preview / CI mode).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
    return null
  }

  try {
    return createBrowserClient<Database>(url, key)
  } catch {
    return null
  }
}
