'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ApplicantType, ExperienceLevel, RegistrationStatus } from '@/lib/types/workshop'

export interface FilterState {
  search:          string
  applicantType:   ApplicantType | ''
  experienceLevel: ExperienceLevel | ''
  status:          RegistrationStatus | ''
}

interface FiltersProps {
  filters:  FilterState
  onChange: (filters: FilterState) => void
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label:    string
  value:    string
  onChange: (v: string) => void
  options:  { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 sr-only">{label}</label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-10 rounded-xl border border-slate-200/90 bg-white/90 px-3 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
          'hover:border-slate-300 transition-colors cursor-pointer'
        )}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const hasActiveFilters =
    !!filters.search ||
    !!filters.applicantType ||
    !!filters.experienceLevel ||
    !!filters.status

  const clearAll = () =>
    onChange({ search: '', applicantType: '', experienceLevel: '', status: '' })

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search by name or email…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={cn(
            'h-10 w-full rounded-xl border border-slate-200/90 bg-white/90 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs backdrop-blur-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
            'hover:border-slate-300 transition-colors'
          )}
          aria-label="Search attendees"
        />
      </div>

      {/* Applicant type filter */}
      <FilterSelect
        label="All Types"
        value={filters.applicantType}
        onChange={(v) => onChange({ ...filters, applicantType: v as ApplicantType | '' })}
        options={[
          { value: 'school_student',  label: 'School Students' },
          { value: 'college_student', label: 'College Students' },
          { value: 'professional',    label: 'Parents / Professionals' },
        ]}
      />

      {/* Experience filter */}
      <FilterSelect
        label="Experience"
        value={filters.experienceLevel}
        onChange={(v) => onChange({ ...filters, experienceLevel: v as ExperienceLevel | '' })}
        options={[
          { value: 'Beginner',     label: 'Beginner' },
          { value: 'Intermediate', label: 'Intermediate' },
          { value: 'Advanced',     label: 'Advanced' },
        ]}
      />

      {/* Status filter */}
      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(v) => onChange({ ...filters, status: v as RegistrationStatus | '' })}
        options={[
          { value: 'confirmed', label: 'Confirmed' },
          { value: 'attended',  label: 'Attended' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
      />

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Clear all filters"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      )}
    </div>
  )
}
