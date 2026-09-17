import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { getAdminSession } from '@/app/actions/admin-auth'
import { getLocalRegistrations } from '@/lib/storage/local-registrations'
import type { Registration } from '@/lib/types/workshop'
import type { LogicalDashboardStats } from '@/components/admin/StatsCards'

export const metadata: Metadata = {
  title: 'Admin Dashboard — WeGuide AI & Robotics Workshop',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface RegistrationRow {
  id: string
  created_at: string
  updated_at?: string
  full_name: string
  email: string
  phone: string
  applicant_type?: string
  role?: string
  experience_level: string
  city?: string
  hear_about_us?: string
  school_name?: string
  grade?: string
  parent_guardian_name?: string
  parent_guardian_phone?: string
  college_name?: string
  course?: string
  year_of_study?: string
  tech_interests?: string
  occupation?: string
  workplace?: string
  has_child_attending?: boolean
  child_name?: string
  child_grade?: string
  child_school?: string
}

async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin/login')
  }
  const supabase = await createClient()
  return { supabase, user: session }
}

async function fetchSupabaseRegistrations(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Registration[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []

    return (data as RegistrationRow[]).map((r) => {
      let applicantType: Registration['applicantType'] = 'school_student'
      if (r.applicant_type) {
        applicantType = r.applicant_type as Registration['applicantType']
      } else if (r.role === 'Working Professional') {
        applicantType = 'professional'
      } else if (r.role === 'Student') {
        applicantType = 'college_student'
      }

      return {
        id:                  r.id,
        createdAt:           r.created_at,
        updatedAt:           r.updated_at || r.created_at,
        fullName:            r.full_name,
        email:               r.email,
        phone:               r.phone,
        applicantType,
        experienceLevel:     (r.experience_level as Registration['experienceLevel']) || 'Beginner',
        city:                r.city,
        hearAboutUs:         r.hear_about_us,
        schoolName:          r.school_name,
        grade:               r.grade,
        parentGuardianName:  r.parent_guardian_name,
        parentGuardianPhone: r.parent_guardian_phone,
        collegeName:         r.college_name,
        course:              r.course,
        yearOfStudy:         r.year_of_study,
        techInterests:       r.tech_interests,
        occupation:          r.occupation,
        workplace:           r.workplace,
        hasChildAttending:   r.has_child_attending,
        childName:           r.child_name,
        childGrade:          r.child_grade,
        childSchool:         r.child_school,
        status:              'confirmed',
      }
    })
  } catch {
    return []
  }
}

async function fetchAllRegistrations(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Registration[]> {
  const [supabaseList, localList] = await Promise.all([
    fetchSupabaseRegistrations(supabase),
    getLocalRegistrations(),
  ])

  // Merge & deduplicate by ID and Email
  const uniqueMap = new Map<string, Registration>()

  // Add local first
  localList.forEach((r) => {
    uniqueMap.set(r.id, r)
  })

  // Add / overwrite with Supabase records
  supabaseList.forEach((r) => {
    uniqueMap.set(r.id, r)
  })

  // Deduplicate if same email has different IDs between local & supabase
  const emailMap = new Map<string, Registration>()
  uniqueMap.forEach((r) => {
    const key = r.email.toLowerCase().trim()
    if (!emailMap.has(key)) {
      emailMap.set(key, r)
    }
  })

  const merged = Array.from(emailMap.values())
  merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return merged
}

function calculateDashboardStats(registrations: Registration[]): LogicalDashboardStats {
  const totalRegistrations = registrations.length

  const now = new Date()
  const todayStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const todayRegistrations = registrations.filter((r) => {
    const regDate = new Date(r.createdAt).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
    return regDate === todayStr
  }).length

  const cityCounts: Record<string, number> = {}
  registrations.forEach((r) => {
    if (r.city && r.city.trim()) {
      const c = r.city.trim()
      cityCounts[c] = (cityCounts[c] || 0) + 1
    }
  })
  let topCity = ''
  let maxCityCount = 0
  for (const [city, count] of Object.entries(cityCounts)) {
    if (count > maxCityCount) {
      maxCityCount = count
      topCity = city
    }
  }

  const sourceCounts: Record<string, number> = {}
  registrations.forEach((r) => {
    if (r.hearAboutUs && r.hearAboutUs.trim()) {
      const s = r.hearAboutUs.trim()
      sourceCounts[s] = (sourceCounts[s] || 0) + 1
    }
  })
  let topSource = ''
  let maxSourceCount = 0
  for (const [source, count] of Object.entries(sourceCounts)) {
    if (count > maxSourceCount) {
      maxSourceCount = count
      topSource = source
    }
  }

  const schoolCount = registrations.filter((r) => r.applicantType === 'school_student').length
  const collegeCount = registrations.filter((r) => r.applicantType === 'college_student').length
  const professionalCount = registrations.filter((r) => r.applicantType === 'professional').length

  return {
    totalRegistrations,
    todayRegistrations,
    topCity: topCity ? `${topCity} (${maxCityCount})` : 'Palakkad',
    topSource: topSource ? `${topSource} (${maxSourceCount})` : 'Word of mouth',
    schoolCount,
    collegeCount,
    professionalCount,
  }
}

export default async function AdminPage() {
  const { supabase, user } = await requireAdmin()
  const registrations = await fetchAllRegistrations(supabase)
  const stats = calculateDashboardStats(registrations)

  return (
    <AdminDashboard
      userEmail={user.email ?? 'admin@weguide.work'}
      registrations={registrations}
      stats={stats}
    />
  )
}
