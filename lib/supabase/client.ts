import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

const DEFAULT_SUPABASE_URL = 'https://zhvupazdnxariocrawmp.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_rXpUSulpWKpyNc6-sxqiZg_E1ldgWKt'

/**
 * Browser-side Supabase client.
 * Used in Client Components for auth state and public operations.
 */
export function createClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY

  if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
    return null
  }

  try {
    return createBrowserClient<Database>(url, key)
  } catch {
    return null
  }
}

