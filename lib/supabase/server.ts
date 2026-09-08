import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/types/database'

function requireEnv(name: string): string {
  const val = process.env[name]
  if (!val) {
    return name === 'NEXT_PUBLIC_SUPABASE_URL'
      ? 'https://placeholder.supabase.co'
      : 'placeholder-anon-key'
  }
  return val
}

/**
 * Server-side Supabase client.
 * Used in Server Components, Server Actions, and Route Handlers.
 * Reads/writes session cookies so auth state is preserved.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component context — cookie writes are ignored safely
          }
        },
      },
    }
  )
}
