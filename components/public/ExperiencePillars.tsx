'use client'

import { Eye, Brain, Compass, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'

const PILLARS = [
  {
    num: '01',
    tag: 'SEE',
    title: 'Watch Physical AI at Work',
    desc: 'See cameras detect shapes, track movement, and feed real-time visual information into intelligent robotic controllers.',
    icon: Eye,
    color: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/50',
    glow: 'group-hover:shadow-blue-500/10',
    bgIcon: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    num: '02',
    tag: 'UNDERSTAND',
    title: 'How Computers Think',
    desc: 'Understand how AI models analyze visual data, evaluate choices, and send instant movement commands — explained in plain, clear language.',
    icon: Brain,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-500/50',
    glow: 'group-hover:shadow-cyan-500/10',
    bgIcon: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    num: '03',
    tag: 'EXPLORE',
    title: 'Robotics in the Real World',
    desc: 'Learn how smart machines navigate obstacle mazes, automate factories, assist surgeons, and open up futuristic career roadmaps.',
    icon: Compass,
    color: 'text-purple-400',
    border: 'border-purple-500/20 hover:border-purple-500/50',
    glow: 'group-hover:shadow-purple-500/10',
    bgIcon: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    num: '04',
    tag: 'INTERACT',
    title: 'Ask Mentors Freely',
    desc: 'No questions are too basic. Clarify how AI affects education, career pathways, school projects, or day-to-day technologies.',
    icon: MessageSquare,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    glow: 'group-hover:shadow-emerald-500/10',
    bgIcon: 'bg-emerald-500/10 border-emerald-500/20',
  },
]

export default function ExperiencePillars() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="experience" className="relative py-20 sm:py-28 bg-[#05070B] text-white overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3.5 py-1 text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            The Live Experience
          </div>
          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
            See AI Come Alive
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            You don&apos;t just listen to a lecture. You experience the physical integration of cameras,
            algorithms, sensors, and moving robotic hardware right in front of you.
          </p>
        </div>

        {/* 4 Experience Pillars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.num}
                className={`group relative rounded-3xl border ${p.border} bg-[#0D131C] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${p.glow}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-black tracking-widest text-slate-500">
                    {p.num}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${p.bgIcon} ${p.color}`}>
                    {p.tag}
                  </span>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${p.bgIcon} ${p.color} mb-5 shadow-sm`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Mid-page CTA Hook */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Curious how a robot perceives its surroundings?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Join the free awareness session at Orchid Mall, Palakkad. All demo hardware provided.
            </p>
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={() => scrollTo('register')}
            className="w-full sm:w-auto shrink-0 shadow-lg shadow-blue-500/25 py-3 px-6 text-sm font-bold"
          >
            <span>Reserve My Free Seat</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
