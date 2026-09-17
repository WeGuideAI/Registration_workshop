'use client'

import { Zap, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'

export default function FinalCTA() {
  const scrollToRegister = () => {
    const el = document.getElementById('register')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#05070B] via-[#0A101D] to-[#05070B] text-white overflow-hidden border-b border-white/[0.06]"
      aria-label="Final call to action"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-blue-600/15 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest mb-6 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Palakkad Community Initiative</span>
        </div>

        <h2 className="text-3xl font-black sm:text-5xl lg:text-6xl tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to See AI in the{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Physical World?
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Your first step into robotics, sensors, and intelligent machines starts here. Take 2 minutes to reserve your seat and download your official entry pass.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Zap className="h-5 w-5 text-cyan-300 fill-cyan-300" />
            <span>Reserve My Free Seat</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Value badges reassurance */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Free Entry
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-cyan-400" /> Instant PDF Pass
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <MapPin className="h-4 w-4 text-red-400" /> {workshopConfig.address.venue}
          </span>
        </div>
      </div>
    </section>
  )
}
