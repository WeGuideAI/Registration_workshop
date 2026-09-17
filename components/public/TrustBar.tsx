'use client'

import { Bot, GraduationCap, Users, Ticket, MapPin } from 'lucide-react'

const TRUST_ITEMS = [
  {
    icon: Bot,
    label: 'Real AI & Robotics',
    sub: 'Live physical machines',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: GraduationCap,
    label: '100% Beginner Friendly',
    sub: 'Zero coding required',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Users,
    label: 'Tech Mentor Guided',
    sub: 'Interactive live session',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Ticket,
    label: 'Free Community Pass',
    sub: 'No hidden charges',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: MapPin,
    label: 'Orchid Mall, Palakkad',
    sub: '2nd Floor, Sekharipuram',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
]

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative z-20 border-y border-white/10 bg-[#0A0F16]/90 py-5 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 items-center">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 ${
                  idx === TRUST_ITEMS.length - 1 ? 'col-span-2 md:col-span-1 justify-center md:justify-start' : ''
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.bg} ${item.color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.sub}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
