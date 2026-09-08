'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import SlotSelector from './SlotSelector'
import RegistrationForm from './RegistrationForm'
import RegistrationSuccess from './RegistrationSuccess'
import { Sparkles, ShieldCheck, Clock, BookOpen } from 'lucide-react'
import type { PublicSlot, BookingResult } from '@/lib/types/workshop'

interface SlotRpcRow {
  id: string
  session_title: string
  session_datetime: string
  max_capacity: number
  seats_filled: number
  seats_remaining: number
  is_sold_out: boolean
}

interface RegistrationSectionProps {
  initialSlots: PublicSlot[]
}

function mapSlots(raw: SlotRpcRow[]): PublicSlot[] {
  return raw.map((s) => ({
    id:              s.id,
    sessionTitle:    s.session_title,
    sessionDatetime: s.session_datetime,
    maxCapacity:     s.max_capacity,
    seatsFilled:     Number(s.seats_filled),
    seatsRemaining:  Number(s.seats_remaining),
    isSoldOut:       s.is_sold_out,
  }))
}

export default function RegistrationSection({ initialSlots }: RegistrationSectionProps) {
  const [slots,          setSlots]          = useState<PublicSlot[]>(initialSlots)
  const [selectedSlotId, setSelectedSlotId] = useState<string>('')
  const [bookingResult,  setBookingResult]  = useState<BookingResult | null>(null)

  const refreshSlots = useCallback(async () => {
    const supabase = createClient()
    if (!supabase) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).rpc('get_public_slots')
    if (data) setSlots(mapSlots(data as SlotRpcRow[]))
  }, [])

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return

    const channel = supabase
      .channel('weguide-public-slots')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'registrations' },
        () => { void refreshSlots() }
      )
      .subscribe()

    return () => { void supabase.removeChannel(channel) }
  }, [refreshSlots])

  if (bookingResult) {
    return (
      <section
        id="register"
        className="bg-slate-50 py-24 relative overflow-hidden"
        aria-labelledby="registration-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RegistrationSuccess
            result={bookingResult}
            onRegisterAnother={() => {
              setBookingResult(null)
              setSelectedSlotId('')
            }}
          />
        </div>
      </section>
    )
  }

  return (
    <section
      id="register"
      className="bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 py-24 border-t border-slate-200/80 relative overflow-hidden"
      aria-labelledby="registration-heading"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-blue-200/25 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Free Community Entry
          </div>
          <h2
            id="registration-heading"
            className="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight"
          >
            Reserve Your Free Seat
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Sessions are held at <strong>We Guide Office, 2nd Floor, Orchid Mall, Palakkad</strong>.
            Choose your preferred session timing below and enter your contact details.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_430px] lg:items-start">
          {/* Left: Slot Selector + Assurance Checklist */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 1 &bull; Pick Your Preferred Batch Timing
                </h3>
                <span className="text-xs text-blue-600 font-semibold">Click a card to select</span>
              </div>
              <SlotSelector
                slots={slots}
                selectedSlotId={selectedSlotId}
                onSelectSlot={setSelectedSlotId}
              />
            </div>

            {/* Workshop Assurance Cards */}
            <div className="rounded-2xl border border-white/90 bg-white/75 p-6 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Workshop Benefits
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Instant Seat Booking</p>
                    <p className="text-[11px] text-slate-500">Booking pass on screen</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <BookOpen className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Live Demonstrations</p>
                    <p className="text-[11px] text-slate-500">Real robots in action</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">100% Free Entry</p>
                    <p className="text-[11px] text-slate-500">No charges or fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Registration Form in Frosted Glass Card */}
          <div className="rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur-2xl ring-1 ring-slate-900/5 lg:sticky lg:top-24">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                Step 2 &bull; Attendee Info
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Enter Your Details
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Workshop schedules and venue details will be dispatched to this email.
              </p>
            </div>

            <RegistrationForm
              slots={slots}
              selectedSlotId={selectedSlotId}
              onSelectSlot={setSelectedSlotId}
              onSuccess={setBookingResult}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
