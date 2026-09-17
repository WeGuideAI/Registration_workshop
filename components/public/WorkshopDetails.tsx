'use client'

import { MapPin, Calendar, Clock, Ticket, Navigation, ShieldCheck, Car, Wind, Wifi } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'

export default function WorkshopDetails() {
  const { address } = workshopConfig

  return (
    <section
      id="details"
      className="relative py-20 sm:py-28 bg-[#070B12] text-white border-b border-white/[0.06] overflow-hidden"
      aria-labelledby="details-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 mb-4 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>Venue &amp; Logistics</span>
          </div>

          <h2
            id="details-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            Workshop Logistics &amp; Location
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Conveniently hosted at WeGuide Robotics Lab inside Orchid Mall, Palakkad. Complete with live demo zones and modern amenities.
          </p>
        </div>

        {/* 4 Essential Logistics Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0D131C] p-5 text-center">
            <div className="h-9 w-9 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
              <Ticket className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Admission</span>
            <span className="text-base font-bold text-white">100% Free Entry</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5 font-medium">Prior Registration Req.</span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0D131C] p-5 text-center">
            <div className="h-9 w-9 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Session Duration</span>
            <span className="text-base font-bold text-white">90 Minutes</span>
            <span className="text-[11px] text-cyan-400 block mt-0.5 font-medium">Hands-On Experience</span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0D131C] p-5 text-center">
            <div className="h-9 w-9 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Calendar className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Schedule</span>
            <span className="text-base font-bold text-white">Weekend Batches</span>
            <span className="text-[11px] text-purple-300 block mt-0.5 font-medium">Allocated Upon Pass</span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0D131C] p-5 text-center">
            <div className="h-9 w-9 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Official Pass</span>
            <span className="text-base font-bold text-white">Instant PDF Pass</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5 font-medium">With Unique Reg ID</span>
          </div>
        </div>

        {/* Venue Location Card & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Venue Info */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0D131C] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Official Venue
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold">
                  {workshopConfig.googleReview}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {address.venue}
              </h3>

              <address className="not-italic text-sm text-slate-300 leading-relaxed mb-6 space-y-1">
                <p>{address.line1}</p>
                <p>{address.locality}</p>
                <p className="font-semibold text-white">
                  {address.city}, {address.state} — {address.pincode}
                </p>
              </address>

              {/* Venue Amenities */}
              <div className="space-y-2 pt-4 border-t border-white/[0.08] mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Lab Features &amp; Facility:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Wind className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Air Conditioned Lab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Mall Parking (2W &amp; 4W)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-3.5 w-3.5 text-cyan-400" />
                    <span>High-Speed Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Elevator Access (2nd Fl)</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Open in Google Maps for Navigation</span>
            </a>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0D131C] p-2 sm:p-3 overflow-hidden shadow-2xl relative min-h-[300px]">
            <iframe
              src={address.embedMapUrl}
              title="WeGuide Robotics Workshop Location at Orchid Mall Palakkad"
              className="h-full min-h-[300px] w-full rounded-2xl border-0 filter brightness-90 contrast-125 invert-[0.88] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
