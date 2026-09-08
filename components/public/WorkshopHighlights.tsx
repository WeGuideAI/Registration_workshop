'use client'

import {
  Eye,
  Brain,
  Bot,
  Compass,
  Lightbulb,
  Radio,
  Sparkles,
  GraduationCap,
  Users,
  Briefcase,
  Heart,
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

interface AudienceItem {
  icon: LucideIcon
  label: string
  desc: string
}

const aiHighlights: HighlightCard[] = [
  {
    icon: Eye,
    title: 'How Computers See Things',
    subtitle: 'Seeing the World',
    description:
      'Ever wondered how your smartphone unlocks with your face, or how cameras read QR codes? Learn how computers understand shapes, colors, and objects in real time.',
    simplePoints: ['Face Detection', 'Recognizing Objects', 'Smart Cameras'],
  },
  {
    icon: Brain,
    title: 'How AI Thinks & Learns',
    subtitle: 'Learning Like Humans',
    description:
      'Instead of humans writing endless rules, computers can now learn by looking at examples — just like a child learns to recognize a cat or dog.',
    simplePoints: ['Learning from Examples', 'Spotting Patterns', 'Smart Decisions'],
  },
  {
    icon: Sparkles,
    title: 'AI in Everyday Life',
    subtitle: 'Real-World Examples',
    description:
      'From Google Maps finding the quickest route to voice assistants answering questions, discover how AI is already helping millions of people every day.',
    simplePoints: ['Smartphones & Apps', 'Voice Assistants', 'Future of Work'],
  },
]

const roboticsHighlights: HighlightCard[] = [
  {
    icon: Compass,
    title: 'The Brain Inside a Robot',
    subtitle: 'The Tiny Controller',
    description:
      'Discover the small, affordable computer chips that act as the robot’s brain — receiving information and telling every part what to do next.',
    simplePoints: ['Small Computer Chips', 'Giving Instructions', 'Connecting Parts'],
  },
  {
    icon: Radio,
    title: 'Robot Eyes, Ears & Touch',
    subtitle: 'Sensors Explained',
    description:
      'How does a robotic vacuum cleaner avoid bumping into a sofa? See how simple sensors measure distance, detect motion, and sense obstacles.',
    simplePoints: ['Distance Sensors', 'Motion Detectors', 'Avoiding Obstacles'],
  },
  {
    icon: Bot,
    title: 'Making Machines Move',
    subtitle: 'Motors & Motion',
    description:
      'See how small electric motors turn computer decisions into physical movement — spinning wheels, moving robotic arms, and steering smoothly.',
    simplePoints: ['Electric Motors', 'Spinning Wheels', 'Robotic Arms'],
  },
]

const audience: AudienceItem[] = [
  { icon: GraduationCap, label: 'Students & Youth', desc: 'Get inspired about future careers and discover how technology works behind the scenes' },
  { icon: Users,         label: 'Curious Beginners', desc: 'Anyone interested in understanding what the buzz around AI and robotics is really about' },
  { icon: Heart,         label: 'Parents & Families', desc: 'Understand the technologies your children are growing up with and talk about' },
  { icon: Briefcase,     label: 'Working Professionals', desc: 'Learn how automation and AI are shaping modern workplaces and businesses' },
]

function HighlightGrid({
  items,
  accent,
}: {
  items: HighlightCard[]
  accent: 'blue' | 'purple'
}) {
  const isBlue = accent === 'blue'
  const iconBg = isBlue ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-purple-50 border-purple-200 text-purple-600'
  const borderHover = isBlue ? 'hover:border-blue-300 hover:shadow-blue-500/10' : 'hover:border-purple-300 hover:shadow-purple-500/10'
  const tagBg = isBlue ? 'bg-blue-50/90 text-blue-700 border-blue-200/70' : 'bg-purple-50/90 text-purple-700 border-purple-200/70'

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={`group relative rounded-2xl border border-white/90 bg-white/80 p-6 shadow-sm shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderHover}`}
          >
            {/* Top icon and subtitle */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconBg} shadow-xs`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                {item.subtitle}
              </span>
            </div>

            <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>

            <p className="text-sm leading-relaxed text-slate-600 mb-5 font-normal">
              {item.description}
            </p>

            {/* Simple concept tags */}
            <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-100">
              {item.simplePoints.map((t) => (
                <span
                  key={t}
                  className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-semibold ${tagBg}`}
                >
                  {t}
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
      id="what-youll-learn"
      className="bg-gradient-to-b from-slate-50 via-slate-100/40 to-slate-50 py-24 relative overflow-hidden"
      aria-labelledby="highlights-heading"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 -left-40 h-[600px] w-[600px] rounded-full bg-blue-300/15 blur-[160px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-purple-300/15 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 shadow-2xs">
            <Lightbulb className="h-3.5 w-3.5" />
            Easy-to-Understand Topics
          </div>
          <h2
            id="highlights-heading"
            className="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight"
          >
            What Will You Learn &amp; See?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            We break down the future of technology in simple, everyday words.
            No confusing computer terms, no prior knowledge required.
          </p>
        </div>

        {/* ── The 3-Step Simple Guide (How Robots Work) ──────────────────── */}
        <div className="mb-16 rounded-3xl border border-white/80 bg-white/70 p-6 sm:p-8 backdrop-blur-xl shadow-sm shadow-slate-200/50">
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-6">
            In 3 Simple Steps: How Robots Work With AI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center items-stretch">
            <div className="relative p-5 rounded-2xl border border-blue-200/80 bg-blue-50/60 shadow-2xs flex flex-col justify-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Step 1: The Eyes</span>
              <p className="text-sm font-bold text-slate-900">Cameras &amp; Sensors</p>
              <p className="text-xs text-slate-600 mt-1">The robot looks around and senses objects, obstacles, or movement</p>
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-blue-600 shadow-2xs">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="relative p-5 rounded-2xl border border-cyan-200/80 bg-cyan-50/60 shadow-2xs flex flex-col justify-center">
              <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider block mb-1">Step 2: The Brain</span>
              <p className="text-sm font-bold text-slate-900">Smart AI Thinking</p>
              <p className="text-xs text-slate-600 mt-1">The small computer chip decides what to do based on what it sees</p>
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-cyan-600 shadow-2xs">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-purple-200/80 bg-purple-50/60 shadow-2xs flex flex-col justify-center">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">Step 3: The Action</span>
              <p className="text-sm font-bold text-slate-900">Motors Move</p>
              <p className="text-xs text-slate-600 mt-1">The robot turns wheels, moves robotic arms, or steers safely</p>
            </div>
          </div>
        </div>

        {/* ── AI Section ──────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-300" />
            <div className="flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-4 py-1.5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-blue-700 tracking-wide uppercase">
                Part 1 &bull; Artificial Intelligence (AI)
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
          <HighlightGrid items={aiHighlights} accent="blue" />
        </div>

        {/* ── Robotics Section ────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-300" />
            <div className="flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/90 px-4 py-1.5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-purple-700 tracking-wide uppercase">
                Part 2 &bull; Robotics &amp; Smart Machines
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-300" />
          </div>
          <HighlightGrid items={roboticsHighlights} accent="purple" />
        </div>

        {/* ── Who Can Attend (Open & Welcoming) ────────────────────────── */}
        <div className="rounded-3xl border border-white/90 bg-white/80 p-8 sm:p-10 shadow-lg shadow-slate-200/50 backdrop-blur-2xl">
          <div className="mb-8 text-center max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Who Can Attend?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This workshop is open to everyone in the local community. No technical background is needed.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audience.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col p-5 rounded-2xl border border-slate-200/70 bg-white/60 hover:bg-white hover:border-slate-300 transition-all shadow-2xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3 border border-blue-100 shadow-2xs">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{label}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600 font-semibold">
              ✨ Free Attendance &bull; Zero Prerequisites &bull; No Prior Coding, Math, or Science Knowledge Needed!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
