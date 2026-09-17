'use client'

import { BookOpen, GraduationCap, Briefcase, Users } from 'lucide-react'
import type { Registration, ApplicantType } from '@/lib/types/workshop'
import ProgressBar from '@/components/ui/ProgressBar'

interface RegistrationsByTypeProps {
  registrations: Registration[]
}

interface TypeRow {
  type:    ApplicantType
  label:   string
  icon:    typeof Users
  iconBg:  string
  iconFg:  string
  barColor:'blue' | 'purple' | 'orange'
}

const TYPE_ROWS: TypeRow[] = [
  {
    type:      'school_student',
    label:     'School Students',
    icon:      BookOpen,
    iconBg:    'bg-blue-50 border-blue-100',
    iconFg:    'text-blue-600',
    barColor:  'blue',
  },
  {
    type:      'college_student',
    label:     'College Students',
    icon:      GraduationCap,
    iconBg:    'bg-purple-50 border-purple-100',
    iconFg:    'text-purple-600',
    barColor:  'purple',
  },
  {
    type:     'professional' as ApplicantType,
    label:    'Parents / Professionals',
    icon:     Briefcase,
    iconBg:   'bg-orange-50 border-orange-100',
    iconFg:   'text-orange-600',
    barColor: 'orange' as const,
  },
]

const barColorClass: Record<string, string> = {
  blue:   'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
}

export default function RegistrationsByType({ registrations }: RegistrationsByTypeProps) {
  const total = registrations.filter((r) => r.status !== 'cancelled').length

  return (
    <section aria-labelledby="type-breakdown-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="type-breakdown-heading"
          className="text-base font-bold text-slate-900 tracking-tight"
        >
          Registrations by Type
        </h2>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
          {total} active
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TYPE_ROWS.map((row) => {
          const Icon = row.icon
          const count = registrations.filter(
            (r) => r.applicantType === row.type && r.status !== 'cancelled'
          ).length
          const pct = total > 0 ? Math.round((count / total) * 100) : 0

          return (
            <div
              key={row.type}
              className="rounded-2xl border border-white/90 bg-white/85 p-5 shadow-sm shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${row.iconBg} ${row.iconFg} shadow-2xs`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {row.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900 tabular-nums leading-tight">
                    {count.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Share of total</span>
                <span className="font-bold text-slate-700">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColorClass[row.barColor]}`}
                  style={{ width: `${pct}%` }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
