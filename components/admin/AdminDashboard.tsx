'use client'

import { useState, useMemo } from 'react'
import AdminHeader from './AdminHeader'
import StatsCards, { type LogicalDashboardStats } from './StatsCards'
import RegistrationsByType from './SlotManagement'
import Filters, { type FilterState } from './Filters'
import AttendeeTable from './AttendeeTable'
import ExportButton from './ExportButton'
import EmptyState from '@/components/ui/EmptyState'
import { SearchX } from 'lucide-react'
import type { Registration } from '@/lib/types/workshop'

interface AdminDashboardProps {
  userEmail: string
  registrations: Registration[]
  stats: LogicalDashboardStats
}

export default function AdminDashboard({
  userEmail,
  registrations,
  stats,
}: AdminDashboardProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    applicantType: '',
    experienceLevel: '',
    source: '',
  })

  // Extract all distinct non-empty referral sources for the dropdown
  const availableSources = useMemo(() => {
    const set = new Set<string>()
    registrations.forEach((r) => {
      if (r.hearAboutUs) set.add(r.hearAboutUs)
    })
    return Array.from(set).sort()
  }, [registrations])

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase().trim()
    return registrations.filter((r) => {
      // Free-text search across all relevant fields
      if (q) {
        const matchesName = r.fullName.toLowerCase().includes(q)
        const matchesEmail = r.email.toLowerCase().includes(q)
        const matchesPhone = r.phone.toLowerCase().includes(q)
        const matchesCity = (r.city || '').toLowerCase().includes(q)
        const matchesSchool = (r.schoolName || '').toLowerCase().includes(q)
        const matchesCollege = (r.collegeName || '').toLowerCase().includes(q)
        const matchesWorkplace = (r.workplace || '').toLowerCase().includes(q)

        if (
          !matchesName &&
          !matchesEmail &&
          !matchesPhone &&
          !matchesCity &&
          !matchesSchool &&
          !matchesCollege &&
          !matchesWorkplace
        ) {
          return false
        }
      }

      if (filters.applicantType && r.applicantType !== filters.applicantType) {
        return false
      }

      if (filters.experienceLevel && r.experienceLevel !== filters.experienceLevel) {
        return false
      }

      if (filters.source && r.hearAboutUs !== filters.source) {
        return false
      }

      return true
    })
  }, [registrations, filters])

  const hasActiveFilters =
    !!filters.search ||
    !!filters.applicantType ||
    !!filters.experienceLevel ||
    !!filters.source

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 text-slate-900">
      <AdminHeader userEmail={userEmail} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Executive Overview Stats */}
        <section aria-label="Workshop registration statistics">
          <StatsCards stats={stats} />
        </section>

        {/* Audience Type Breakdown */}
        <RegistrationsByType registrations={registrations} />

        {/* Registrant Directory */}
        <section aria-labelledby="registrants-heading">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 id="registrants-heading" className="text-base font-bold text-slate-900 tracking-tight">
                Registrations Directory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {filtered.length}{' '}
                {hasActiveFilters ? 'matching ' : ''}
                registration{filtered.length !== 1 ? 's' : ''}
                {hasActiveFilters && ` (of ${registrations.length} total)`}
              </p>
            </div>
            <ExportButton registrations={filtered} />
          </div>

          {/* Filters */}
          <div className="mb-4">
            <Filters
              filters={filters}
              availableSources={availableSources}
              onChange={setFilters}
            />
          </div>

          {/* Table or empty state */}
          {filtered.length === 0 && hasActiveFilters ? (
            <div className="rounded-2xl border border-white/90 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <EmptyState
                icon={SearchX}
                title="No registrations match your search filters"
                description="Try clearing your filters or changing search keywords."
              />
            </div>
          ) : (
            <AttendeeTable registrations={filtered} />
          )}
        </section>
      </main>
    </div>
  )
}
