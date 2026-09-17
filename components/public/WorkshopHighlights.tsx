'use client'

import {
  Eye,
  Brain,
  Bot,
  Compass,
  Radio,
  Sparkles,
  TrendingUp,
  Stethoscope,
  Factory,
  Car,
  Cpu,
  Globe,
  Check,
  Zap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

interface HighlightCard {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  simplePoints: string[]
}

interface WhyCard {
  icon: LucideIcon
  sector: string
  title: string
  description: string
  color: 'blue' | 'purple' | 'emerald' | 'cyan'
}

const aiHighlights: HighlightCard[] = [
  {
    icon: Eye,
    title: 'Computer Vision in Real Time',
    subtitle: 'Seeing the World',
    description:
      'Learn how cameras detect faces, read gestures, and recognize physical objects in milliseconds — the foundational technology behind autonomous robotics.',
    simplePoints: ['Object Recognition', 'Facial & Gesture Tracking', 'Depth Perception'],
  },
  {
    icon: Brain,
    title: 'How AI Thinks & Decides',
    subtitle: 'Local Machine Learning',
    description:
      'Discover how neural networks process sensor data to predict safe trajectories and make real-time decisions without human intervention.',
    simplePoints: ['Pattern Recognition', 'Real-Time Inference', 'Decision Algorithms'],
  },
  {
    icon: Sparkles,
    title: 'Physical AI in Action',
    subtitle: 'Beyond Screen Chatbots',
    description:
      'Understand the massive shift occurring today: AI leaving screen-based chatbots and entering physical drones, robotic arms, and smart machines.',
    simplePoints: ['Autonomous Systems', 'Industrial Robots', 'Future of Work'],
  },
]

const roboticsHighlights: HighlightCard[] = [
  {
    icon: Compass,
    title: 'The Microcontroller Brain',
    subtitle: 'Embedded Compute',
    description:
      "Explore the compact microprocessors that govern robotic systems \u2014 routing commands from software logic to physical kinetic power.",
    simplePoints: ['Microcontrollers', 'Input/Output Buses', 'Motor Direction Logic'],
  },
  {
    icon: Radio,
    title: 'Ultrasonic & Optical Sensors',
    subtitle: 'Spatial Telemetry',
    description:
      'How does a robotic vacuum or self-driving cart navigate without collisions? See distance sensors, infrared rays, and acoustic telemetry live.',
    simplePoints: ['Distance Ranging', 'Obstacle Avoidance', 'Continuous Telemetry'],
  },
  {
    icon: Bot,
    title: 'Motors, Servos & Movement',
    subtitle: 'Kinetic Translation',
    description:
      'Witness how electrical pulses translate into mechanical torque — turning wheels, articulating robotic arms, and maneuvering with precision.',
    simplePoints: ['Stepper & DC Motors', 'Servo Kinematics', 'Smooth Motion Control'],
  },
]

const whyCards: WhyCard[] = [
  {
    icon: Stethoscope,
    sector: 'Healthcare',
    title: 'Surgical & Diagnostic AI',
    description:
      'Precision robotic arms assist surgeons with sub-millimeter accuracy while computer vision algorithms detect anomalies in scans earlier than ever.',
    color: 'blue',
  },
  {
    icon: Factory,
    sector: 'Smart Manufacturing',
    title: 'Autonomous Production',
    description:
      'Modern assembly facilities utilize collaborative robots (Cobots) that work safely alongside human operators with zero downtime.',
    color: 'cyan',
  },
  {
    icon: Car,
    sector: 'Mobility & Logistics',
    title: 'Autonomous Navigation',
    description:
      'From warehouse bots to automated delivery fleets, real-time sensor fusion enables vehicles to navigate dynamic traffic safely.',
    color: 'emerald',
  },
  {
    icon: Globe,
    sector: 'Agriculture',
    title: 'AI Precision Farming',
    description:
      'Autonomous drones and soil sensors monitor crop vitality, target weeds accurately, and minimize water and pesticide usage.',
    color: 'blue',
  },
  {
    icon: Cpu,
    sector: 'Technology Careers',
    title: 'Next-Gen High-Demand Roles',
    description:
      'Physical AI engineers, robotics specialists, and computer vision developers represent the fastest-growing engineering domains worldwide.',
    color: 'purple',
  },
  {
    icon: Zap,
    sector: 'Consumer Electronics',
    title: 'Smart Home Automation',
    description:
      'Intelligent appliances and assistive robotic devices are entering daily living spaces, responding to vocal and gesture commands.',
    color: 'cyan',
  },
]

function HighlightGrid({
  items,
  theme = 'blue',
}: {
  items: HighlightCard[]
  theme?: 'blue' | 'purple'
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0D131C] p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    theme === 'blue'
                      ? 'bg-blue-500/10 border-blue-500/30 text-cyan-400'
                      : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-400">
                  {item.subtitle}
                </span>
              </div>

              <h3 className="mb-2 text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 mb-5 font-normal">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.06]">
              {item.simplePoints.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                >
                  <Check className="h-3 w-3 text-cyan-400" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function WorkshopHighlights() {
  return (
    <section
      id="curriculum"
      className="relative py-20 sm:py-28 bg-[#05070B] text-white border-b border-white/[0.06] overflow-hidden"
      aria-labelledby="curriculum-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
            <Bot className="h-3.5 w-3.5 text-blue-400" />
            <span>Interactive Curriculum</span>
          </div>

          <h2
            id="curriculum-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            What You Will Learn &amp; Explore
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            We break down cutting-edge technology into clear, intuitive concepts. No confusing mathematical jargon, zero prerequisites.
          </p>
        </div>

        {/* ── Track 1: Artificial Intelligence & Computer Vision ──────── */}
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
            <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider">
                Module 01 • Artificial Intelligence &amp; Computer Vision
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>
          <HighlightGrid items={aiHighlights} theme="blue" />
        </div>

        {/* ── Track 2: Robotics, Controllers & Sensors ───────────────── */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
            <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-mono font-bold text-purple-300 uppercase tracking-wider">
                Module 02 • Robotics Hardware &amp; Actuators
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
          </div>
          <HighlightGrid items={roboticsHighlights} theme="purple" />
        </div>

        {/* ── Real-World Impact Across Industries ─────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#0D131C] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest mb-3">
              <TrendingUp className="h-3.5 w-3.5" />
              Real-World Impact
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Where Physical AI Is Operating Today
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300">
              Understanding these applications gives students and professionals a lasting competitive advantage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0A0F16] p-5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 text-slate-400">
                      {card.sector}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">{card.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{card.description}</p>
                </div>
              )
            })}
          </div>

          {/* Section CTA */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-slate-300">
              ⚡ <strong>100% Free Community Attendance</strong> • Hands-on demonstrations included.
            </div>
            <a
              href="#register"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 shrink-0"
            >
              <span>Reserve My Spot</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
