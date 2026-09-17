'use client'

import { useState } from 'react'
import { BookOpen, GraduationCap, Briefcase, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

type Persona = 'student' | 'professional'

export default function AudienceSection() {
  const [activePersona, setActivePersona] = useState<Persona>('student')

  const AUDIENCE_CARDS = [
    {
      id: 'school',
      icon: BookOpen,
      category: 'CLASSES 1 — 12',
      title: 'School Students',
      highlightBadge: 'Ignite Curiosity',
      description:
        'Transform computer screen screen-time into real engineering curiosity. See robots move, learn how machines think, and discover that robotics and coding are fun, visual, and accessible.',
      takeaways: [
        'See how cameras and sensors work like human eyes and ears',
        'Watch live autonomous robots navigate obstacle courses',
        'Learn how to get started with STEM and robotics early',
      ],
      ctaText: 'Register as School Student',
      color: 'cyan',
    },
    {
      id: 'college',
      icon: GraduationCap,
      category: 'DIPLOMA / B.TECH / ARTS / SCIENCE',
      title: 'College Students & Tech Learners',
      highlightBadge: 'Future-Proof Skills',
      description:
        'Bridge the gap between theoretical software algorithms and physical robotic hardware. Discover embodied AI, microcontroller brains, sensor integration, and high-demand robotics careers.',
      takeaways: [
        'Understand how computer vision models run locally on edge chips',
        'Explore the hardware stack: sensors, actuators, and motor controllers',
        'Learn about career trajectories in AI engineering and robotics',
      ],
      ctaText: 'Register as College Student',
      color: 'blue',
    },
    {
      id: 'professional',
      icon: Briefcase,
      category: 'CAREER & TECH EXPLORATION',
      title: 'Working Professionals',
      highlightBadge: 'Physical AI Era',
      description:
        'Step outside the standard screen-based LLM workflow. See how robotics, autonomous mobility, computer vision, and industrial automation are reshaping the physical economy and modern enterprises.',
      takeaways: [
        'Understand the transition from software AI to physical autonomous agents',
        'Explore practical automation applications across industries',
        'Network with passionate technology creators and innovators',
      ],
      ctaText: 'Register as Professional',
      color: 'purple',
    },
    {
      id: 'parents',
      icon: Heart,
      category: 'FAMILIES & MENTORS',
      title: 'Parents & Guardians',
      highlightBadge: 'Guide Next Generation',
      description:
        'Gain clarity on the technologies your children are growing up with. Learn how to encourage practical, productive technical problem-solving rather than passive screen consumption.',
      takeaways: [
        'Demystify artificial intelligence in simple, friendly, relatable terms',
        'Discover educational pathways and healthy tech habits for kids',
        'Attend together with your school-age child for a shared experience',
      ],
      ctaText: 'Register with Child',
      color: 'amber',
    },
  ]

  return (
    <section
      id="who-is-this-for"
      className="relative py-20 sm:py-28 bg-[#070B12] text-white border-b border-white/[0.06]"
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Inclusive &amp; Beginner Friendly</span>
          </div>

          <h2
            id="audience-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            Who Is This Workshop For?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            No coding background is required. The session is crafted so anyone — from a curious school student to an experienced engineer — gains actionable insight into physical AI.
          </p>

          {/* Interactive Personalization Toggle */}
          <div className="mt-8 inline-flex items-center rounded-2xl bg-[#0D131C] p-1.5 border border-white/10 shadow-lg">
            <button
              type="button"
              onClick={() => setActivePersona('student')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePersona === 'student'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>🎓 Student Perspective</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePersona('professional')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePersona === 'professional'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>💼 Professional / Parent Perspective</span>
            </button>
          </div>

          {/* Persona Headline Banner */}
          <div className="mt-4 p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 max-w-xl mx-auto transition-all">
            <p className="text-xs sm:text-sm text-blue-200 font-medium">
              {activePersona === 'student' ? (
                <span>
                  ✨ <strong className="text-white">For Students:</strong> Explore AI, robotics, and future careers through real physical machines — not just textbook equations.
                </span>
              ) : (
                <span>
                  ✨ <strong className="text-white">For Professionals &amp; Parents:</strong> Understand physical automation, the robotics economy, and how to guide the next generation into the AI era.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* 4 Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUDIENCE_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                className="group relative rounded-3xl border border-white/[0.08] bg-[#0D131C] p-6 sm:p-8 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                          {card.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                      {card.highlightBadge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      What you will take away:
                    </span>
                    {card.takeaways.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#register"
                  className="mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-blue-400 bg-white/5 hover:bg-blue-600 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all group-hover:bg-blue-600/90 group-hover:text-white"
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
