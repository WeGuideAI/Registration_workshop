'use client'

import { useState, useMemo } from 'react'
import AdminHeader from './AdminHeader'
import StatsCards from './StatsCards'
import SlotManagement from './SlotManagement'
import Filters, { type FilterState } from './Filters'
import AttendeeTable from './AttendeeTable'
import ExportButton from './ExportButton'
import EmptyState from '@/components/ui/EmptyState'
import { SearchX } from 'lucide-react'
import type { AdminSlot, Registration, DashboardStats } from '@/lib/types/workshop'

interface AdminDashboardProps {
  userEmail:            string
  slots:                AdminSlot[]
  registrations:        Registration[]
  stats:                DashboardStats
}

export default function AdminDashboard({
  userEmail,
  slots,
  registrations,
  stats,
}: AdminDashboardProps) {
  const [filters, setFilters] = useState<FilterState>({
    search:          '',
    slotId:          '',
    experienceLevel: '',
    status:          '',
  })

  const totalCapacity = slots.reduce((sum, s) => sum + s.maxCapacity, 0)

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase().trim()
    return registrations.filter((r) => {
      if (q && !(
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q)
      )) return false

      if (filters.slotId && r.slotId !== filters.slotId) return false

      if (filters.experienceLevel && r.experienceLevel !== filters.experienceLevel)
        return false

      if (filters.status && r.status !== filters.status) return false

      return true
    })
  }, [registrations, filters])

  const hasActiveFilters =
    !!filters.search ||
    !!filters.slotId ||
    !!filters.experienceLevel ||
    !!filters.status

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 text-slate-900">
      <AdminHeader userEmail={userEmail} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Stats */}
        <section aria-label="Registration statistics">
          <StatsCards stats={stats} totalCapacity={totalCapacity} />
        </section>

        {/* Session capacity */}
        <SlotManagement slots={slots} />

        {/* Attendee directory */}
        <section aria-labelledby="attendees-heading">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 id="attendees-heading" className="text-base font-bold text-slate-900 tracking-tight">
                Attendee Directory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {filtered.length}{' '}
                {hasActiveFilters ? 'matching ' : ''}
                attendee{filtered.length !== 1 ? 's' : ''}
                {hasActiveFilters && ` (of ${registrations.length} total)`}
              </p>
            </div>
            <ExportButton registrations={filtered} />
          </div>

          {/* Filters */}
          <div className="mb-4">
            <Filters
              filters={filters}
              onChange={setFilters}
              slots={slots}
            />
          </div>

          {/* Table or empty state */}
          {filtered.length === 0 && hasActiveFilters ? (
            <div className="rounded-2xl border border-white/90 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <EmptyState
                icon={SearchX}
                title="No attendees match your filters"
                description="Try adjusting your search or clearing the active filters."
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
