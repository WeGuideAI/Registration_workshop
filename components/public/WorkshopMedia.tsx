'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Video, Eye, Cpu, Radio, ShieldCheck, MapPin, Zap, Layers } from 'lucide-react'

export default function WorkshopMedia() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const LAB_HARDWARE = [
    {
      icon: Eye,
      title: 'Computer Vision Rig',
      specs: 'HD Optical Sensor • 60 FPS',
      description: 'See live object identification, boundary tracking, and real-time bounding boxes projected onto high-res displays as participants move.',
    },
    {
      icon: Cpu,
      title: 'Edge Microprocessors',
      specs: 'Local Neural Inference • Low Latency',
      description: 'Hands-on demonstration of dedicated AI inference chips executing neural models right on the machine without needing internet or cloud servers.',
    },
    {
      icon: Radio,
      title: 'Autonomous Mobile Base',
      specs: 'Dual Motor Drive • Encoders',
      description: 'Watch a mobile robot calculate path planning in real time, navigating around dynamic obstacles placed by attendees on the lab floor.',
    },
    {
      icon: Layers,
      title: 'Multi-Sensor Array',
      specs: 'Ultrasonic + IR + IMU Telemetry',
      description: 'Discover how distance, acceleration, and orientation sensors combine to form the complete spatial awareness of intelligent machines.',
    },
  ]

  return (
    <section
      id="workshop-media"
      className="relative py-20 sm:py-28 bg-[#05070B] text-white border-b border-white/[0.06] overflow-hidden"
      aria-labelledby="media-heading"
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-blue-600/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 mb-4 backdrop-blur-md">
            <Video className="h-3.5 w-3.5 text-cyan-400" />
            <span>Live Demonstration Lab</span>
          </div>

          <h2
            id="media-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            You Don&apos;t Just Hear About It.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              You See It Happen.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Forget theoretical slide decks. At WeGuide, AI comes out of the computer monitor and onto the demonstration table. Real sensors, real motors, real intelligence.
          </p>
        </div>

        {/* Featured Video Player Card */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0D131C] p-3 sm:p-5 shadow-2xl overflow-hidden mb-12 backdrop-blur-xl">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-white/5">
            <video
              ref={videoRef}
              src="/logo-animation.mp4"
              poster="/video-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-label="WeGuide AI and Robotics live demonstration video"
            />

            {/* Video Overlay Info */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-xs text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] font-medium tracking-wide">WEGUIDE LAB DEMO</span>
            </div>

            {/* Play/Pause Control Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause demonstration video' : 'Play demonstration video'}
              className="absolute bottom-4 right-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5 translate-x-0.5" />}
            </button>

            {/* Location water tag */}
            <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-red-400" />
              <span>WeGuide Robotics Lab • Orchid Mall, Palakkad</span>
            </div>
          </div>
        </div>

        {/* Hardware In-Depth Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LAB_HARDWARE.map((hw) => {
            const Icon = hw.icon
            return (
              <div
                key={hw.title}
                className="rounded-2xl border border-white/[0.08] bg-[#0A0F16] p-5 hover:border-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{hw.title}</h3>
                <span className="text-[11px] font-mono text-cyan-400 block mb-2 font-medium">{hw.specs}</span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{hw.description}</p>
              </div>
            )
          })}
        </div>

        {/* Lab Trust Proof Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0D131C] to-cyan-950/40 border border-blue-500/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-200 text-center sm:text-left">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>
              All lab equipment, microcontrollers, and sensors are supplied for attendee interaction. Zero kits to purchase.
            </span>
          </div>

          <a
            href="#register"
            className="shrink-0 inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
          >
            <Zap className="h-3.5 w-3.5 text-cyan-300" />
            <span>Claim Your Free Pass</span>
          </a>
        </div>
      </div>
    </section>
  )
}
