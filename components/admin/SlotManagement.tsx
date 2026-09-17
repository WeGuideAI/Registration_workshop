'use client'

import { BookOpen, GraduationCap, Briefcase } from 'lucide-react'
import type { Registration, ApplicantType } from '@/lib/types/workshop'

interface RegistrationsByTypeProps {
  registrations: Registration[]
}

interface TypeRow {
  type: ApplicantType
  label: string
  subtitle: string
  icon: typeof BookOpen
  iconBg: string
  iconFg: string
  barColor: string
}

const TYPE_ROWS: TypeRow[] = [
  {
    type: 'school_student',
    label: 'School Students',
    subtitle: 'Grades & Young Explorers',
    icon: BookOpen,
    iconBg: 'bg-blue-50 border-blue-100',
    iconFg: 'text-blue-600',
    barColor: 'bg-blue-500',
  },
  {
    type: 'college_student',
    label: 'College Students',
    subtitle: 'Undergrad / Degree Pursuing',
    icon: GraduationCap,
    iconBg: 'bg-purple-50 border-purple-100',
    iconFg: 'text-purple-600',
    barColor: 'bg-purple-500',
  },
  {
    type: 'professional',
    label: 'Parents & Professionals',
    subtitle: 'Career Explorers & Guardians',
    icon: Briefcase,
    iconBg: 'bg-amber-50 border-amber-100',
    iconFg: 'text-amber-600',
    barColor: 'bg-amber-500',
  },
]

export default function RegistrationsByType({ registrations }: RegistrationsByTypeProps) {
  const total = registrations.length

  return (
    <section aria-labelledby="type-breakdown-heading">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            id="type-breakdown-heading"
            className="text-base font-bold text-slate-900 tracking-tight"
          >
            Audience Distribution
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Registration breakdown by participant category
          </p>
        </div>
        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">
          {total} Total Applicants
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TYPE_ROWS.map((row) => {
          const Icon = row.icon
          const count = registrations.filter((r) => r.applicantType === row.type).length
          const pct = total > 0 ? Math.round((count / total) * 100) : 0

          return (
            <div
              key={row.type}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${row.iconBg} ${row.iconFg} shadow-2xs`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {row.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900 tabular-nums leading-tight mt-0.5">
                    {count.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">{row.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-500">Audience share</span>
                <span className="font-bold text-slate-800">{pct}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${row.barColor} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
