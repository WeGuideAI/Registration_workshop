'use client'

import { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import RegistrationSuccess from './RegistrationSuccess'
import { Sparkles, ShieldCheck, Gift, Check, Zap, MapPin } from 'lucide-react'
import type { BookingResult } from '@/lib/types/workshop'
import { workshopConfig } from '@/lib/config/workshop'

export default function RegistrationSection() {
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)

  if (bookingResult) {
    return (
      <section
        id="register"
        className="bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 py-20 relative overflow-hidden border-y-2 border-blue-500/30 text-white"
        aria-labelledby="registration-heading"
      >
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <RegistrationSuccess
            result={bookingResult}
            onRegisterAnother={() => setBookingResult(null)}
          />
        </div>
      </section>
    )
  }

  return (
    <section
      id="register"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#090e1a] to-slate-950 text-white border-y-2 border-blue-500/40 overflow-hidden"
      aria-labelledby="registration-heading"
    >
      {/* ── Background Glows ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[850px] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-cyan-600/15 blur-[120px]" />
      </div>

      {/* ── Subtle Cyber Grid ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-950/70 px-4 py-1.5 text-xs font-black text-cyan-300 uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/20 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
            Free Community Entry · Instant Pass
          </div>

          <h2
            id="registration-heading"
            className="text-3xl font-black text-white sm:text-5xl lg:text-6xl tracking-tight"
          >
            Claim Your Free Spot
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Join us at{' '}
            <strong className="text-white font-semibold">{workshopConfig.address.venue}</strong>.
            Complete your registration below to secure your seat and receive your{' '}
            <span className="text-blue-400 font-bold underline decoration-blue-500 underline-offset-4">
              official entry confirmation and instant PDF pass
            </span>.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-xs">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> 100% Free Entry
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/80 border border-blue-500/50 px-3.5 py-1 text-xs font-bold text-blue-300 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Live Robot Demos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/80 border border-purple-500/50 px-3.5 py-1 text-xs font-bold text-purple-300 shadow-xs">
              <Gift className="h-3.5 w-3.5 text-purple-400" /> Digital Certificate
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-700 px-3.5 py-1 text-xs font-bold text-slate-300 shadow-xs">
              <MapPin className="h-3.5 w-3.5 text-red-400" /> Orchid Mall, Palakkad
            </span>
          </div>
        </div>

        {/* ── THE REGISTRATION CARD (Prominent Midnight Tech Card) ──── */}
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-3xl border-2 border-blue-500/50 bg-gradient-to-b from-slate-900/98 via-slate-900 to-slate-950 shadow-2xl shadow-blue-900/50 backdrop-blur-2xl ring-4 ring-blue-500/15 overflow-hidden">
            {/* Top Glowing Gradient Accent Stripe */}
            <div className="h-2.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-6 sm:px-8 py-5 bg-slate-850/60">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Workshop Entry Pass Form
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Takes less than 2 minutes · Download official PDF pass on completion
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-950/80 border border-blue-500/40 px-3.5 py-1 text-xs font-bold text-blue-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>Seats Open Now</span>
              </div>
            </div>

            {/* Card Content with Form */}
            <div className="p-6 sm:p-9">
              <RegistrationForm onSuccess={setBookingResult} dark={true} />
            </div>

            {/* Card Footer Reassurance */}
            <div className="border-t border-slate-800 bg-slate-950/70 px-6 py-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Your information is confidential and secure. No payment needed.</span>
              </span>
              <span className="text-slate-500 font-medium">WeGuide AI Community Initiative</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
