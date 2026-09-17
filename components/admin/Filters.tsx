'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ApplicantType, ExperienceLevel } from '@/lib/types/workshop'

export interface FilterState {
  search: string
  applicantType: ApplicantType | ''
  experienceLevel: ExperienceLevel | ''
  source: string
}

interface FiltersProps {
  filters: FilterState
  availableSources: string[]
  onChange: (filters: FilterState) => void
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
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
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function Filters({ filters, availableSources, onChange }: FiltersProps) {
  const hasActiveFilters =
    !!filters.search ||
    !!filters.applicantType ||
    !!filters.experienceLevel ||
    !!filters.source

  const clearAll = () =>
    onChange({ search: '', applicantType: '', experienceLevel: '', source: '' })

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search across name, email, phone, city, institution */}
      <div className="relative flex-1 min-w-[240px]">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search by name, email, phone, city, school or college…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={cn(
            'h-10 w-full rounded-xl border border-slate-200/90 bg-white/90 pl-9 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs backdrop-blur-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
            'hover:border-slate-300 transition-colors'
          )}
          aria-label="Search registrations"
        />
      </div>

      {/* Applicant type filter */}
      <FilterSelect
        label="All Applicant Types"
        value={filters.applicantType}
        onChange={(v) => onChange({ ...filters, applicantType: v as ApplicantType | '' })}
        options={[
          { value: 'school_student', label: 'School Students' },
          { value: 'college_student', label: 'College Students' },
          { value: 'professional', label: 'Parents / Professionals' },
        ]}
      />

      {/* Experience level filter */}
      <FilterSelect
        label="All Experience Levels"
        value={filters.experienceLevel}
        onChange={(v) => onChange({ ...filters, experienceLevel: v as ExperienceLevel | '' })}
        options={[
          { value: 'Beginner', label: 'Beginner' },
          { value: 'Intermediate', label: 'Intermediate' },
          { value: 'Advanced', label: 'Advanced' },
        ]}
      />

      {/* Source filter */}
      {availableSources.length > 0 && (
        <FilterSelect
          label="All Discovery Channels"
          value={filters.source}
          onChange={(v) => onChange({ ...filters, source: v })}
          options={availableSources.map((s) => ({ value: s, label: s }))}
        />
      )}

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-100"
          aria-label="Clear all filters"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  )
}
