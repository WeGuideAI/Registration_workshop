'use client'

import { useState } from 'react'
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Compass,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  School,
  GraduationCap,
  Briefcase,
  ExternalLink,
} from 'lucide-react'
import { formatRegistrationId } from '@/lib/utils/format'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import type { Registration } from '@/lib/types/workshop'
import { cn } from '@/lib/utils/cn'

interface AttendeeTableProps {
  registrations: Registration[]
  pageSize?: number
}

function TypeBadge({ type }: { type: Registration['applicantType'] }) {
  if (type === 'school_student') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200/80 px-2.5 py-1 text-xs font-bold text-blue-700">
        <School className="h-3 w-3" />
        School Student
      </span>
    )
  }
  if (type === 'college_student') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 border border-purple-200/80 px-2.5 py-1 text-xs font-bold text-purple-700">
        <GraduationCap className="h-3 w-3" />
        College Student
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-bold text-amber-700">
      <Briefcase className="h-3 w-3" />
      Parent / Professional
    </span>
  )
}

function ExperienceBadge({ level }: { level: Registration['experienceLevel'] }) {
  const styles = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    Intermediate: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    Advanced: 'bg-violet-50 text-violet-700 border-violet-200/80',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold',
        styles[level] || 'bg-slate-50 text-slate-700 border-slate-200'
      )}
    >
      {level}
    </span>
  )
}

export default function AttendeeTable({
  registrations,
  pageSize = 20,
}: AttendeeTableProps) {
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId((curr) => (curr === id ? null : id))
  }

  const totalPages = Math.max(1, Math.ceil(registrations.length / pageSize))
  const pageItems = registrations.slice((page - 1) * pageSize, page * pageSize)

  if (registrations.length === 0) {
    return (
      <div className="rounded-2xl border border-white/90 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
        <EmptyState
          icon={Users}
          title="No registrations found"
          description="Try adjusting your search criteria or clearing active filters."
        />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/90 bg-white/85 shadow-sm shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/90">
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                ID / Reg Time
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Participant
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                City / Discovery
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Background
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.map((reg) => {
              const isExpanded = expandedId === reg.id
              const createdDate = new Date(reg.createdAt)
              const formattedDate = createdDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'Asia/Kolkata',
              })
              const formattedTime = createdDate.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata',
              })

              return (
                <tr
                  key={reg.id}
                  className={cn(
                    'group transition-colors',
                    isExpanded ? 'bg-blue-50/20' : 'hover:bg-slate-50/60'
                  )}
                >
                  {/* ID & Date */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    <p className="font-mono text-xs font-bold text-slate-700">
                      {formatRegistrationId(reg.id)}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {formattedDate} &bull; {formattedTime}
                    </p>
                  </td>

                  {/* Participant Name & Experience */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    <p className="font-bold text-slate-900 leading-tight">{reg.fullName}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <ExperienceBadge level={reg.experienceLevel} />
                    </div>
                  </td>

                  {/* Contact Links */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    <div className="space-y-1">
                      <a
                        href={`mailto:${reg.email}`}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{reg.email}</span>
                      </a>
                      <a
                        href={`tel:${reg.phone}`}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{reg.phone}</span>
                      </a>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    <TypeBadge type={reg.applicantType} />
                  </td>

                  {/* City & Referral */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    {reg.city ? (
                      <p className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {reg.city}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">—</p>
                    )}
                    {reg.hearAboutUs && (
                      <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <Compass className="h-3 w-3" />
                        {reg.hearAboutUs}
                      </p>
                    )}
                  </td>

                  {/* Contextual Institutional/Professional snippet */}
                  <td className="px-4 py-3.5 align-top text-xs text-slate-600 max-w-xs truncate">
                    {reg.applicantType === 'school_student' && (
                      <div>
                        <p className="font-semibold text-slate-800 truncate">{reg.schoolName || 'School Student'}</p>
                        {reg.grade && <p className="text-[11px] text-slate-500">Grade: {reg.grade}</p>}
                      </div>
                    )}
                    {reg.applicantType === 'college_student' && (
                      <div>
                        <p className="font-semibold text-slate-800 truncate">{reg.collegeName || 'College Student'}</p>
                        {reg.course && (
                          <p className="text-[11px] text-slate-500 truncate">
                            {reg.course} {reg.yearOfStudy ? `(${reg.yearOfStudy})` : ''}
                          </p>
                        )}
                      </div>
                    )}
                    {reg.applicantType === 'professional' && (
                      <div>
                        <p className="font-semibold text-slate-800 truncate">{reg.occupation || 'Professional'}</p>
                        {reg.workplace && <p className="text-[11px] text-slate-500 truncate">{reg.workplace}</p>}
                      </div>
                    )}
                  </td>

                  {/* Action / Expand */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top text-right">
                    <button
                      type="button"
                      onClick={() => toggleExpand(reg.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-2xs cursor-pointer"
                      aria-expanded={isExpanded}
                      aria-label="Toggle details view"
                    >
                      <span>{isExpanded ? 'Hide' : 'View'}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded Details Drawer/Row for the active item */}
      {expandedId && (
        (() => {
          const activeReg = registrations.find((r) => r.id === expandedId)
          if (!activeReg) return null

          return (
            <div className="border-t border-blue-100 bg-gradient-to-r from-blue-50/50 via-indigo-50/20 to-slate-50/50 p-5">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700">
                    {formatRegistrationId(activeReg.id)}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs font-bold text-slate-800">{activeReg.fullName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Close Details
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {/* General Info */}
                <div className="rounded-xl bg-white/90 p-3.5 border border-slate-200/60 shadow-2xs space-y-1.5">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                    Contact &amp; Location
                  </p>
                  <div><span className="text-slate-400">Email:</span> <span className="font-medium text-slate-700">{activeReg.email}</span></div>
                  <div><span className="text-slate-400">Phone:</span> <span className="font-medium text-slate-700">{activeReg.phone}</span></div>
                  <div><span className="text-slate-400">City / Locality:</span> <span className="font-medium text-slate-700">{activeReg.city || 'Not specified'}</span></div>
                  <div><span className="text-slate-400">Discovered via:</span> <span className="font-medium text-slate-700">{activeReg.hearAboutUs || 'Not specified'}</span></div>
                  <div><span className="text-slate-400">Experience Level:</span> <span className="font-medium text-slate-700">{activeReg.experienceLevel}</span></div>
                </div>

                {/* Specific details */}
                <div className="rounded-xl bg-white/90 p-3.5 border border-slate-200/60 shadow-2xs space-y-1.5 sm:col-span-2">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                    Specific Profile Details
                  </p>

                  {activeReg.applicantType === 'school_student' && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div><span className="text-slate-400">School Name:</span> <p className="font-semibold text-slate-800">{activeReg.schoolName || '—'}</p></div>
                      <div><span className="text-slate-400">Class / Grade:</span> <p className="font-semibold text-slate-800">{activeReg.grade || '—'}</p></div>
                      <div><span className="text-slate-400">Parent / Guardian:</span> <p className="font-semibold text-slate-800">{activeReg.parentGuardianName || '—'}</p></div>
                      <div><span className="text-slate-400">Parent Phone:</span> <p className="font-semibold text-slate-800">{activeReg.parentGuardianPhone || '—'}</p></div>
                    </div>
                  )}

                  {activeReg.applicantType === 'college_student' && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div><span className="text-slate-400">College / University:</span> <p className="font-semibold text-slate-800">{activeReg.collegeName || '—'}</p></div>
                      <div><span className="text-slate-400">Course &amp; Year:</span> <p className="font-semibold text-slate-800">{activeReg.course || '—'} {activeReg.yearOfStudy ? `(${activeReg.yearOfStudy})` : ''}</p></div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400">Interests &amp; Ambitions:</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{activeReg.techInterests || 'None specified'}</p>
                      </div>
                    </div>
                  )}

                  {activeReg.applicantType === 'professional' && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div><span className="text-slate-400">Occupation / Domain:</span> <p className="font-semibold text-slate-800">{activeReg.occupation || '—'}</p></div>
                      <div><span className="text-slate-400">Workplace / Organization:</span> <p className="font-semibold text-slate-800">{activeReg.workplace || '—'}</p></div>
                      {activeReg.hasChildAttending && (
                        <div className="sm:col-span-2 rounded-lg bg-amber-50/60 p-2.5 border border-amber-200/60 mt-1">
                          <p className="font-bold text-amber-800 mb-1">Attending Child Details:</p>
                          <p className="text-slate-700">
                            <strong>{activeReg.childName}</strong>
                            {activeReg.childGrade && ` • Grade: ${activeReg.childGrade}`}
                            {activeReg.childSchool && ` • ${activeReg.childSchool}`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })()
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600">
            Showing <span className="font-bold text-slate-900">{(page - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(page * pageSize, registrations.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{registrations.length}</span> registrations
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
