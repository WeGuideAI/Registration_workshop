import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'
import type { AdminSlot, Registration, DashboardStats } from '@/lib/types/workshop'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

// Raw DB row types (not from generic Database type to avoid RLS-induced never)
interface SlotRow {
  id: string
  session_title: string
  session_datetime: string
  max_capacity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface RegistrationRow {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  email: string
  phone: string
  role: string
  organization: string
  experience_level: string
  slot_id: string
  status: string
  slots: {
    session_title: string
    session_datetime: string
  } | null
}

interface CountRow {
  slot_id: string
}

async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) redirect('/admin/login')

  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminRow) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  return { supabase, user }
}

async function fetchAdminSlots(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<AdminSlot[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: slots, error } = await (supabase as any)
    .from('slots')
    .select('*')
    .order('session_datetime', { ascending: true })

  if (error || !slots) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: counts } = await (supabase as any)
    .from('registrations')
    .select('slot_id')
    .neq('status', 'cancelled')

  const occupancy: Record<string, number> = {}
  ;((counts as CountRow[]) ?? []).forEach((r) => {
    occupancy[r.slot_id] = (occupancy[r.slot_id] ?? 0) + 1
  })

  return (slots as SlotRow[]).map((s) => {
    const filled    = occupancy[s.id] ?? 0
    const remaining = Math.max(s.max_capacity - filled, 0)
    return {
      id:              s.id,
      sessionTitle:    s.session_title,
      sessionDatetime: s.session_datetime,
      maxCapacity:     s.max_capacity,
      isActive:        s.is_active,
      seatsFilled:     filled,
      seatsRemaining:  remaining,
      createdAt:       s.created_at,
      updatedAt:       s.updated_at,
    }
  })
}

async function fetchRegistrations(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Registration[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('registrations')
    .select(`
      *,
      slots (
        session_title,
        session_datetime
      )
    `)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return (data as RegistrationRow[]).map((r) => ({
    id:              r.id,
    createdAt:       r.created_at,
    updatedAt:       r.updated_at,
    fullName:        r.full_name,
    email:           r.email,
    phone:           r.phone,
    role:            r.role as Registration['role'],
    organization:    r.organization,
    experienceLevel: r.experience_level as Registration['experienceLevel'],
    slotId:          r.slot_id,
    status:          r.status as Registration['status'],
    sessionTitle:    r.slots?.session_title    ?? '',
    sessionDatetime: r.slots?.session_datetime ?? '',
  }))
}

async function fetchStats(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<DashboardStats> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc('get_admin_stats')
  if (error || !data) return { total: 0, confirmed: 0, attended: 0, cancelled: 0 }

  const raw = data as {
    total: number; confirmed: number; attended: number; cancelled: number
  }
  return {
    total:     Number(raw.total),
    confirmed: Number(raw.confirmed),
    attended:  Number(raw.attended),
    cancelled: Number(raw.cancelled),
  }
}

export default async function AdminPage() {
  const { supabase, user } = await requireAdmin()

  const [slots, registrations, stats] = await Promise.all([
    fetchAdminSlots(supabase),
    fetchRegistrations(supabase),
    fetchStats(supabase),
  ])

  return (
    <AdminDashboard
      userEmail={user.email ?? 'admin'}
      slots={slots}
      registrations={registrations}
      stats={stats}
    />
  )
}
