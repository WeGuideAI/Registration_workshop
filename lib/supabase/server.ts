import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

function getSupabaseConfig(): { url: string; key: string } {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://placeholder.supabase.co'

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'placeholder-anon-key'

  return { url, key }
}

/**
 * Server-side Supabase client for database operations.
 * Robust, direct connection that works seamlessly across Server Actions,
 * Server Components, and API routes without brittle request-cookie dependencies.
 */
export async function createClient() {
  const { url, key } = getSupabaseConfig()

  return createSupabaseClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
