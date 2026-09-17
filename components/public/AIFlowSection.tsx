'use client'

import { useState } from 'react'
import { Eye, Brain, Zap, ArrowRight, Cpu, Activity, Camera, Radio, Disc3, Layers } from 'lucide-react'

interface Stage {
  id: string
  stepNumber: string
  title: string
  tag: string
  icon: typeof Eye
  color: 'blue' | 'purple' | 'cyan'
  headline: string
  description: string
  hardwareUsed: string[]
  metrics: { label: string; value: string }[]
}

const STAGES: Stage[] = [
  {
    id: 'eyes',
    stepNumber: 'STAGE 01',
    title: 'The Eyes',
    tag: 'SENSORS & CAMERAS',
    icon: Eye,
    color: 'cyan',
    headline: 'Real-time perception of the physical environment',
    description:
      'Machines do not see like humans do with intuition. High-frame-rate computer vision cameras and ultrasonic sensors capture real-world light and distance, translating photons and acoustic waves into dense digital arrays.',
    hardwareUsed: ['Stereo Depth Cameras', 'Ultrasonic Distance Sensors', 'IR Proximity Detectors', 'Ambient Light Array'],
    metrics: [
      { label: 'Capture Rate', value: '60 FPS' },
      { label: 'Latency', value: '< 15 ms' },
      { label: 'Field of View', value: '120° Wide' },
    ],
  },
  {
    id: 'brain',
    stepNumber: 'STAGE 02',
    title: 'The Brain',
    tag: 'EDGE AI & REASONING',
    icon: Brain,
    color: 'purple',
    headline: 'Neural network inference running right on the robot',
    description:
      'No cloud dependency, no internet lag. Edge microprocessors run lightweight neural models that classify objects, predict trajectories, map boundaries, and decide the safest path forward in a fraction of a second.',
    hardwareUsed: ['Edge Neural Processors', 'Microcontroller Logic Boards', 'Spatial Mapping Engine', 'Trained Object Classifier'],
    metrics: [
      { label: 'Decision Cycle', value: '< 5 ms' },
      { label: 'Offline Inference', value: '100% Local' },
      { label: 'Model Type', value: 'Edge CNN' },
    ],
  },
  {
    id: 'action',
    stepNumber: 'STAGE 03',
    title: 'The Action',
    tag: 'MOTORS & MOVEMENT',
    icon: Zap,
    color: 'blue',
    headline: 'Translating digital decisions into kinetic reality',
    description:
      'The loop is completed when software commands become physical force. High-torque stepper motors, servo controllers, and articulated limbs rotate, steer, brake, or grip with millimeter precision.',
    hardwareUsed: ['Precision Stepper Motors', 'Dual H-Bridge Motor Drivers', 'Rotary Wheel Encoders', 'Actuator Grippers'],
    metrics: [
      { label: 'Torque Precision', value: '0.1 mm' },
      { label: 'Feedback Loop', value: '1000 Hz' },
      { label: 'Power Efficiency', value: 'High' },
    ],
  },
]

export default function AIFlowSection() {
  const [activeStage, setActiveStage] = useState<number>(0)
  const current = STAGES[activeStage]

  return (
    <section
      id="ai-flow"
      className="relative py-20 sm:py-28 bg-[#05070B] text-white overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="ai-flow-heading"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 mb-4 backdrop-blur-md">
            <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>The Embodied AI Loop</span>
          </div>

          <h2
            id="ai-flow-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            See AI Come Alive:{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Perception ➔ Brain ➔ Action
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Most people only interact with AI as text on a screen. In this workshop, you will discover what happens when an artificial intelligence is given eyes to see and motors to move.
          </p>
        </div>

        {/* 3-Stage Progress Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            const isActive = activeStage === idx

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#0D131C] border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/40'
                    : 'bg-[#0A0F16]/70 border-white/[0.08] hover:border-white/20 hover:bg-[#0D131C]/60 text-slate-400'
                }`}
                aria-pressed={isActive}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                    {stage.stepNumber}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-colors ${
                      isActive
                        ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {stage.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                  {stage.tag}
                </p>
              </button>
            )
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0D131C] p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Subtle Decorative Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-mono text-blue-300">
                <span>{current.stepNumber}</span>
                <span>•</span>
                <span>{current.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {current.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {current.description}
              </p>

              {/* Hardware used pills */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Demonstrated with Live Lab Hardware:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.hardwareUsed.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 font-medium"
                    >
                      <Layers className="h-3 w-3 text-cyan-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Technical Specs & Metrics Column */}
            <div className="lg:col-span-5 bg-[#0A0F16] rounded-2xl border border-white/[0.08] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  <Cpu className="h-4 w-4" />
                  <span>Real-Time Telemetry</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                {current.metrics.map((m) => (
                  <div key={m.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center">
                    <span className="block text-[11px] text-slate-400 font-mono mb-1">{m.label}</span>
                    <span className="block text-sm sm:text-base font-bold text-white font-mono">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Flow Connection Visual */}
              <div className="bg-gradient-to-r from-blue-950/40 to-cyan-950/40 rounded-xl p-4 border border-blue-500/20 text-xs text-slate-300 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block">Physical Loop Status</span>
                  <span className="font-medium text-slate-200">Continuous 60Hz Perception-Action Cycle</span>
                </div>
                <Disc3 className="h-5 w-5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              {/* Navigation button to next stage */}
              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev + 1) % STAGES.length)}
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-cyan-400/40 bg-white/5 hover:bg-cyan-500/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Next: {STAGES[(activeStage + 1) % STAGES.length].title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
