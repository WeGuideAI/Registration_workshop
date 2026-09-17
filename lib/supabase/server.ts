import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Live Supabase project credentials for WeGuide AI & Robotics Workshop
const DEFAULT_SUPABASE_URL = 'https://zhvupazdnxariocrawmp.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_rXpUSulpWKpyNc6-sxqiZg_E1ldgWKt'

function getSupabaseConfig(): { url: string; key: string } {
  // Support all standard Vercel & Next.js Supabase environment variable names
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY

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

