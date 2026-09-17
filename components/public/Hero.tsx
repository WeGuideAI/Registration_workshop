'use client'

import { useState, useRef } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Bot,
  Play,
  Pause,
  MapPin,
  Star,
  Cpu,
  Eye,
  ShieldCheck,
} from 'lucide-react'
import { analytics } from '@/lib/utils/analytics'
import Button from '@/components/ui/Button'
import { workshopConfig } from '@/lib/config/workshop'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      void videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#05070B] via-[#080d16] to-[#05070B] pt-28 pb-16"
      aria-label="Workshop introduction"
    >
      {/* ── Deep Cyber Luminous Ambient Orbs ───────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-indigo-600/20 blur-[150px]" />
        <div className="absolute top-1/2 -left-48 h-[450px] w-[450px] rounded-full bg-blue-700/15 blur-[140px]" />
        <div className="absolute bottom-10 -right-48 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[140px]" />
      </div>

      {/* ── High-Tech Background Matrix Grid ────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

        {/* ── Video Logo Presentation (Cyber Glass Frame) ─────────────── */}
        <div className="relative mx-auto mb-7 max-w-xs sm:max-w-sm group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-pulse" />

          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0D131C]/90 p-1.5 shadow-2xl shadow-blue-500/20 backdrop-blur-xl ring-1 ring-white/10">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/video-poster.jpg"
              className="w-full h-auto rounded-xl object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
              onClick={toggleVideo}
            >
              <source src="/logo-animation.mp4" type="video/mp4" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={workshopConfig.company} className="w-full h-auto rounded-xl" />
            </video>

            <button
              type="button"
              onClick={toggleVideo}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-black/90 hover:scale-110 transition-all duration-200 shadow-sm cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Play className="h-3.5 w-3.5 ml-0.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* ── Status & Venue Badges ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">
              Free Community Pass &bull; Palakkad
            </span>
          </div>

          <a
            href={workshopConfig.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1.5 backdrop-blur-md shadow-xs text-xs font-semibold text-blue-300 hover:bg-blue-900/40 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-400" />
            <span>Orchid Mall, Palakkad</span>
          </a>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/50 px-3.5 py-1.5 backdrop-blur-md shadow-xs text-xs font-semibold text-amber-300">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>5.0 on Google Reviews</span>
          </div>
        </div>

        {/* ── Subtitle Label ───────────────────────────────────────────── */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cyan-400 mb-3">
          We Guide Presents &bull; Live Technology Experience
        </p>

        {/* ── Main Headline ───────────────────────────────────────────── */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white mb-6">
          AI in the Physical World.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            See AI Come Alive.
          </span>
        </h1>

        {/* ── Emotional & Relatable Explainer ──────────────────────────── */}
        <p className="mx-auto max-w-2xl text-base sm:text-xl leading-relaxed text-slate-300 mb-5 font-normal">
          Discover what happens when artificial intelligence leaves the screen and enters physical reality.
          Watch real machines <strong className="text-white font-semibold">see with cameras</strong>,{' '}
          <strong className="text-white font-semibold">think with algorithms</strong>, and{' '}
          <strong className="text-white font-semibold">move with motors</strong>.
        </p>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-400 mb-9 font-medium">
          An interactive, hands-on awareness workshop at WeGuide Orchid Mall, Palakkad.
          Explained in <span className="text-cyan-300 font-bold underline decoration-cyan-500/50 underline-offset-4">simple, everyday language</span> with zero jargon.
          Open to students, parents, and curious minds.
        </p>

        {/* ── Primary Action CTAs ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center mb-10">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              analytics.track('registration_form_started')
              scrollTo('register')
            }}
            className="w-full sm:w-auto shadow-2xl shadow-blue-500/35 hover:shadow-blue-500/60 hover:-translate-y-0.5 text-base px-8 py-4 font-black transition-all"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>🚀 RESERVE MY FREE SEAT</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo('experience')}
            className="w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-white hover:-translate-y-0.5 text-base px-6 py-4 backdrop-blur-md transition-all"
          >
            Explore the Experience ↓
          </Button>
        </div>

        {/* ── 3 Big Reassurance Highlights ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0D131C]/80 p-4 shadow-lg backdrop-blur-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Eye className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Live Computer Vision</p>
              <p className="text-[11px] text-slate-400">Cameras detect shapes in real time</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0D131C]/80 p-4 shadow-lg backdrop-blur-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Bot className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Physical Robots Moving</p>
              <p className="text-[11px] text-slate-400">Hardware reacting to AI decisions</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0D131C]/80 p-4 shadow-lg backdrop-blur-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">100% Beginner Friendly</p>
              <p className="text-[11px] text-slate-400">No coding or math required</p>
            </div>
          </div>
        </div>

        {/* ── Scroll cue ───────────────────────────────────────────────── */}
        <div className="flex justify-center animate-bounce" aria-hidden="true">
          <button
            type="button"
            onClick={() => scrollTo('trust-bar')}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 cursor-pointer"
            aria-label="Scroll to highlights"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
