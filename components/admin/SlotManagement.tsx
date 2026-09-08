'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Power, PowerOff } from 'lucide-react'
import { toggleSlotActive } from '@/app/actions/admin'
import { formatSessionDate, formatSessionTime } from '@/lib/utils/format'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import type { AdminSlot } from '@/lib/types/workshop'

interface SlotManagementProps {
  slots: AdminSlot[]
}

export default function SlotManagement({ slots: initialSlots }: SlotManagementProps) {
  const [slots, setSlots] = useState(initialSlots)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleToggle = async (slot: AdminSlot) => {
    const confirmed = window.confirm(
      slot.isActive
        ? `Deactivate "${slot.sessionTitle}"? No new registrations will be accepted. Existing registrations remain.`
        : `Activate "${slot.sessionTitle}"? It will accept new public registrations again.`
    )
    if (!confirmed) return

    setLoadingId(slot.id)
    setError(null)

    const result = await toggleSlotActive(slot.id, !slot.isActive)

    if (!result.success) {
      setError(result.error.message)
    } else {
      setSlots((prev) =>
        prev.map((s) =>
          s.id === slot.id ? { ...s, isActive: !s.isActive } : s
        )
      )
    }
    setLoadingId(null)
  }

  return (
    <section aria-labelledby="slots-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="slots-heading"
          className="text-base font-bold text-slate-900 tracking-tight"
        >
          Session Capacity &amp; Controls
        </h2>
        <Badge variant="muted">{slots.length} session{slots.length !== 1 ? 's' : ''}</Badge>
      </div>

      {error && (
        <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-2xs">
          <p className="text-xs font-semibold text-red-700">{error}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => {
          const pct = slot.maxCapacity > 0
            ? Math.round((slot.seatsFilled / slot.maxCapacity) * 100)
            : 0
          const isFull = slot.seatsRemaining === 0
          const isLoading = loadingId === slot.id

          return (
            <div
              key={slot.id}
              className="rounded-2xl border border-white/90 bg-white/85 p-5 shadow-sm shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {slot.sessionTitle}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="h-3 w-3 shrink-0 text-blue-600" aria-hidden="true" />
                    <span>{formatSessionDate(slot.sessionDatetime)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 font-medium">
                    <Clock className="h-3 w-3 shrink-0 text-cyan-600" aria-hidden="true" />
                    <span>{formatSessionTime(slot.sessionDatetime)} IST</span>
                  </div>
                </div>

                <Badge variant={slot.isActive ? 'success' : 'muted'} className="shrink-0">
                  {slot.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {/* Capacity */}
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Users className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  <span>
                    <strong className="font-bold text-slate-900">{slot.seatsFilled}</strong>
                    {' / '}
                    {slot.maxCapacity} registered
                  </span>
                </div>
                <span
                  className={
                    isFull ? 'text-rose-600 font-bold' : 'text-slate-500 font-semibold'
                  }
                >
                  {isFull
                    ? 'FULL'
                    : `${slot.seatsRemaining} left`}
                </span>
              </div>

              <ProgressBar value={pct} className="mb-4" />

              {/* Toggle button */}
              <Button
                variant={slot.isActive ? 'danger' : 'secondary'}
                size="sm"
                fullWidth
                loading={isLoading}
                onClick={() => handleToggle(slot)}
              >
                {slot.isActive
                  ? <><PowerOff className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Deactivate Session</>
                  : <><Power className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Activate Session</>}
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
