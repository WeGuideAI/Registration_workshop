'use server'

import { createClient } from '@/lib/supabase/server'
import { parseSupabaseError } from '@/lib/utils/errors'
import { getAdminSession } from '@/app/actions/admin-auth'
import type { ActionResult } from '@/lib/types/workshop'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) throw new Error('UNAUTHORIZED')
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return supabase as any
}

export async function deleteRegistration(
  registrationId: string
): Promise<ActionResult<void>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase: any = await requireAdmin()
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', registrationId)

    if (error) return { success: false, error: parseSupabaseError(error) }
    revalidatePath('/admin')
    return { success: true, data: undefined }
  } catch (err) {
    return { success: false, error: parseSupabaseError(err) }
  }
}
