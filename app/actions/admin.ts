'use server'

import { createClient } from '@/lib/supabase/server'
import { getAdminSession } from '@/app/actions/admin-auth'
import { deleteLocalRegistration } from '@/lib/storage/local-registrations'
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
    // 1. Delete from persistent local storage
    await deleteLocalRegistration(registrationId)

    // 2. Delete from Supabase if reachable
    try {
      const supabase: any = await requireAdmin()
      await supabase
        .from('registrations')
        .delete()
        .eq('id', registrationId)
    } catch {
      // Non-blocking if Supabase is offline
    }

    revalidatePath('/admin')
    return { success: true, data: undefined }
  } catch (err) {
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Could not delete registration. Please try again.',
      },
    }
  }
}
