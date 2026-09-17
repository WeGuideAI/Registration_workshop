'use client'

import { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import RegistrationSuccess from './RegistrationSuccess'
import { Sparkles, ShieldCheck, BookOpen, Gift } from 'lucide-react'
import type { BookingResult } from '@/lib/types/workshop'

export default function RegistrationSection() {
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)

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
            onRegisterAnother={() => setBookingResult(null)}
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
            Register for the Workshop
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Join us at{' '}
            <strong>We Guide Office, 2nd Floor, Orchid Mall, Palakkad</strong>.
            Fill in the form below to secure your free spot — no payment needed.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start">
          {/* Left: Benefits panel */}
          <div className="space-y-6">
            {/* What you'll get */}
            <div className="rounded-2xl border border-white/90 bg-white/80 p-7 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">
                What You Get by Registering
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Guaranteed Free Entry</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Your name goes on our confirmation list. Walk in with confidence — no queue, no charges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Live AI & Robotics Demos</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      See real robots in action, AI-powered cameras, and get hands-on with smart machines.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <Gift className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Certificate of Participation</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      All attendees receive a digital certificate to add to their portfolio or school record.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Who attends cards */}
            <div className="rounded-2xl border border-white/90 bg-white/80 p-7 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Tailored for Every Learner
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                  <span className="text-xl">📚</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">School Students (Grades 1–12)</p>
                    <p className="text-xs text-slate-500">Spark curiosity — discover what AI &amp; robots can do</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/60 px-4 py-3">
                  <span className="text-xl">🎓</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">College Students</p>
                    <p className="text-xs text-slate-500">Explore career opportunities in AI, robotics &amp; tech</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                  <span className="text-xl">👨‍👩‍👧</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Parents &amp; Guardians</p>
                    <p className="text-xs text-slate-500">Understand the world your child is growing up in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-400 leading-relaxed px-1">
              WeGuide reserves the right to reschedule or modify sessions without prior notice.
              Participation is subject to seat availability.
            </p>
          </div>

          {/* Right: Registration Form in Frosted Glass Card */}
          <div className="rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur-2xl ring-1 ring-slate-900/5 lg:sticky lg:top-24">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Secure Your Free Spot
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Takes under 2 minutes · Confirmation sent to your email
              </p>
            </div>

            <RegistrationForm onSuccess={setBookingResult} />
          </div>
        </div>
      </div>
    </section>
  )
}
