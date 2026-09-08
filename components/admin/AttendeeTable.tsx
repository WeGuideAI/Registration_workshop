'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw, Users } from 'lucide-react'
import { updateRegistrationStatus } from '@/app/actions/admin'
import { formatSessionDate, formatSessionTime, formatRegistrationId } from '@/lib/utils/format'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import type { Registration, RegistrationStatus } from '@/lib/types/workshop'
import { cn } from '@/lib/utils/cn'

interface AttendeeTableProps {
  registrations: Registration[]
  pageSize?: number
}

function StatusDropdown({
  registrationId,
  currentStatus,
  onUpdate,
}: {
  registrationId: string
  currentStatus: RegistrationStatus
  onUpdate: (id: string, status: RegistrationStatus) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = async (newStatus: RegistrationStatus) => {
    if (newStatus === currentStatus) return
    setLoading(true)
    setError(null)

    const result = await updateRegistrationStatus(registrationId, newStatus)
    if (result.success) {
      onUpdate(registrationId, newStatus)
    } else {
      setError(result.error.message)
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      {error && (
        <span title={error} className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
      )}
      <select
        value={currentStatus}
        onChange={(e) => void handleChange(e.target.value as RegistrationStatus)}
        disabled={loading}
        aria-label="Update registration status"
        className={cn(
          'h-7 rounded-lg border px-2.5 text-xs font-bold transition-all shadow-2xs cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          currentStatus === 'confirmed'
            ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100/60'
            : currentStatus === 'attended'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/60'
              : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100/60',
        )}
      >
        <option value="confirmed">Confirmed</option>
        <option value="attended">Attended</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {loading && (
        <RefreshCw className="absolute right-1 top-2 h-3 w-3 animate-spin text-slate-400" />
      )}
    </div>
  )
}

export default function AttendeeTable({
  registrations: initialRegistrations,
  pageSize = 25,
}: AttendeeTableProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations)
  const [page, setPage] = useState(1)

  const handleStatusUpdate = useCallback((id: string, status: RegistrationStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
  }, [])

  const totalPages = Math.max(1, Math.ceil(registrations.length / pageSize))
  const pageItems = registrations.slice((page - 1) * pageSize, page * pageSize)

  if (registrations.length === 0) {
    return (
      <div className="rounded-2xl border border-white/90 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
        <EmptyState
          icon={Users}
          title="No attendees found"
          description="Try adjusting your filters or search terms."
        />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/90 bg-white/85 shadow-sm shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Organization
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Experience
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Session
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Registered
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.map((reg) => (
              <tr
                key={reg.id}
                className="hover:bg-blue-50/30 transition-colors"
              >
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-slate-400">
                  {formatRegistrationId(reg.id)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">
                  {reg.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600 font-medium">
                  <a
                    href={`mailto:${reg.email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {reg.email}
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600 font-medium">
                  {reg.phone}
                </td>
                <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate font-medium">
                  {reg.organization}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant="default">{reg.role}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge
                    variant={
                      reg.experienceLevel === 'Advanced'
                        ? 'info'
                        : reg.experienceLevel === 'Intermediate'
                          ? 'warning'
                          : 'muted'
                    }
                  >
                    {reg.experienceLevel}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                  <div>
                    <p className="text-xs text-slate-900 font-bold">{reg.sessionTitle}</p>
                    {reg.sessionDatetime && (
                      <p className="text-[11px] text-slate-500 font-medium">
                        {formatSessionDate(reg.sessionDatetime)}
                        {' · '}
                        {formatSessionTime(reg.sessionDatetime)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 font-medium">
                  {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric',
                    timeZone: 'Asia/Kolkata',
                  })}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusDropdown
                    registrationId={reg.id}
                    currentStatus={reg.status}
                    onUpdate={handleStatusUpdate}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600">
            Showing <span className="font-bold text-slate-900">{(page - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(page * pageSize, registrations.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{registrations.length}</span> attendees
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-slate-700">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
