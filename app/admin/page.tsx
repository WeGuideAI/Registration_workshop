import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { getAdminSession } from '@/app/actions/admin-auth'
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
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin/login')
  }
  const supabase = await createClient()
  return { supabase, user: session }
}

async function fetchRegistrations(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Registration[]> {
  try {
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
  } catch {
    return []
  }
}

async function fetchStats(
  supabase: Awaited<ReturnType<typeof createClient>>,
  registrations: Registration[]
): Promise<DashboardStats> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).rpc('get_admin_stats')
    if (!error && data) {
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
  } catch {
    // fallback
  }

  // Derive stats directly from registrations list if DB RPC is not available
  const total = registrations.length
  const confirmed = registrations.filter((r) => r.status === 'confirmed').length
  const attended = registrations.filter((r) => r.status === 'attended').length
  const cancelled = registrations.filter((r) => r.status === 'cancelled').length

  return { total, confirmed, attended, cancelled }
}

export default async function AdminPage() {
  const { supabase, user } = await requireAdmin()

  const registrations = await fetchRegistrations(supabase)
  const stats = await fetchStats(supabase, registrations)

  return (
    <AdminDashboard
      userEmail={user.email ?? 'admin@weguide.work'}
      registrations={registrations}
      stats={stats}
    />
  )
}
