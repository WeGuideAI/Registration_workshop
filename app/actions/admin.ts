'use server'

import { createClient } from '@/lib/supabase/server'
import { parseSupabaseError } from '@/lib/utils/errors'
import type { ActionResult, RegistrationStatus } from '@/lib/types/workshop'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('UNAUTHORIZED')

  const { data } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!data) throw new Error('UNAUTHORIZED')
  // Return as any to avoid deep generic inference issues with supabase-js v2+
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return supabase as any
}

export async function updateRegistrationStatus(
  registrationId: string,
  status: RegistrationStatus
): Promise<ActionResult<void>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = await requireAdmin()
    const { error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', registrationId)

    if (error) return { success: false, error: parseSupabaseError(error) }
    revalidatePath('/admin')
    return { success: true, data: undefined }
  } catch (err) {
    return { success: false, error: parseSupabaseError(err) }
  }
}
