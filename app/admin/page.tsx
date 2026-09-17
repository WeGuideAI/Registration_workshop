import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'
import type { Registration, DashboardStats } from '@/lib/types/workshop'

export const metadata: Metadata = {
  title: 'Admin Dashboard — WeGuide',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface RegistrationRow {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  email: string
  phone: string
  applicant_type: string
  experience_level: string
  status: string
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

async function fetchRegistrations(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Registration[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return (data as RegistrationRow[]).map((r) => ({
    id:              r.id,
    createdAt:       r.created_at,
    updatedAt:       r.updated_at,
    fullName:        r.full_name,
    email:           r.email,
    phone:           r.phone,
    applicantType:   r.applicant_type as Registration['applicantType'],
    experienceLevel: r.experience_level as Registration['experienceLevel'],
    status:          r.status as Registration['status'],
  }))
}

async function fetchStats(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<DashboardStats> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc('get_admin_stats')
  if (error || !data) {
    // Derive from registrations as fallback
    return { total: 0, confirmed: 0, attended: 0, cancelled: 0 }
  }

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

  const [registrations, stats] = await Promise.all([
    fetchRegistrations(supabase),
    fetchStats(supabase),
  ])

  return (
    <AdminDashboard
      userEmail={user.email ?? 'admin'}
      registrations={registrations}
      stats={stats}
    />
  )
}
