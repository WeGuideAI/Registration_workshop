'use client'

import { Calendar, Clock, Users, AlertTriangle, CheckCircle2, Flame, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { formatSessionDate, formatSessionTime } from '@/lib/utils/format'
import type { PublicSlot } from '@/lib/types/workshop'

interface SlotSelectorProps {
  slots: PublicSlot[]
  selectedSlotId: string
  onSelectSlot: (id: string) => void
  disabled?: boolean
}

function SeatIndicator({ slot }: { slot: PublicSlot }) {
  if (slot.isSoldOut) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
        SOLD OUT
      </span>
    )
  }

  if (slot.seatsRemaining <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300/80 px-2.5 py-1 rounded-lg animate-pulse">
        <Flame className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
        Only {slot.seatsRemaining} seat{slot.seatsRemaining === 1 ? '' : 's'} left!
      </span>
    )
  }

  if (slot.seatsRemaining <= 15) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50/80 border border-amber-200 px-2 py-0.5 rounded-md">
        <Users className="h-3.5 w-3.5" aria-hidden="true" />
        {slot.seatsRemaining} seats remaining
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200 px-2 py-0.5 rounded-md">
      <Users className="h-3.5 w-3.5" aria-hidden="true" />
      {slot.seatsRemaining} seats available
    </span>
  )
}

function CapacityBar({ slot }: { slot: PublicSlot }) {
  const pct = Math.min((slot.seatsFilled / slot.maxCapacity) * 100, 100)
  const color =
    slot.isSoldOut || pct >= 95
      ? 'bg-gradient-to-r from-rose-600 to-red-500'
      : pct >= 75
        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
        : 'bg-gradient-to-r from-blue-600 to-cyan-500'

  return (
    <div className="mt-4 pt-3 border-t border-slate-100">
      <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
        <span>
          <strong className="text-slate-900 font-bold">{slot.seatsFilled}</strong> / {slot.maxCapacity} filled
        </span>
        <span className="text-slate-500 font-semibold">{Math.round(pct)}% capacity</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80 p-0.5"
        role="progressbar"
        aria-valuenow={slot.seatsFilled}
        aria-valuemin={0}
        aria-valuemax={slot.maxCapacity}
        aria-label={`${slot.seatsFilled} of ${slot.maxCapacity} seats filled`}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 shadow-2xs', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function SlotSelector({
  slots,
  selectedSlotId,
  onSelectSlot,
  disabled = false,
}: SlotSelectorProps) {
  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-10 text-center shadow-xs">
        <Calendar className="mx-auto mb-3 h-10 w-10 text-slate-400" aria-hidden="true" />
        <p className="text-slate-800 font-bold">No Sessions Currently Open</p>
        <p className="text-sm text-slate-500 mt-1">Please check back soon for upcoming batch announcements.</p>
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select a workshop session"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id
        const isDisabled = disabled || slot.isSoldOut

        return (
          <button
            key={slot.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelectSlot(slot.id)}
            className={cn(
              'group relative w-full rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
              isDisabled
                ? 'cursor-not-allowed border-slate-200/80 bg-slate-100/70 opacity-60'
                : isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/30'
                  : 'border-white/90 bg-white/80 shadow-xs hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 backdrop-blur-md'
            )}
          >
            {/* Selected checkmark */}
            {isSelected && (
              <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </div>
            )}

            {/* Session Title */}
            <h4 className="text-base font-bold text-slate-900 mb-2.5 pr-8 group-hover:text-blue-600 transition-colors">
              {slot.sessionTitle}
            </h4>

            {/* Date & Time */}
            <div className="space-y-1.5 mb-3.5">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                <span>{formatSessionDate(slot.sessionDatetime)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Clock className="h-3.5 w-3.5 shrink-0 text-cyan-600" aria-hidden="true" />
                <span>{formatSessionTime(slot.sessionDatetime)} IST</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                <span>Orchid Mall, Palakkad</span>
              </div>
            </div>

            {/* Indicator Badge */}
            <div>
              <SeatIndicator slot={slot} />
            </div>

            {/* Capacity Meter */}
            <CapacityBar slot={slot} />
          </button>
        )
      })}
    </div>
  )
}
