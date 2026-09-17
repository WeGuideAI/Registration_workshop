'use client'

import { useState, useRef } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Smile,
  Eye,
  Brain,
  Bot,
  Play,
  Pause,
  Smartphone,
  CheckCircle,
  MapPin,
  Star,
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 pt-28 pb-16"
      aria-label="Workshop introduction"
    >
      {/* ── Soft luminous ambient orbs ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gradient-to-tr from-blue-300/30 to-indigo-300/20 blur-[130px]" />
        <div className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-cyan-300/25 blur-[120px]" />
        <div className="absolute bottom-10 -right-32 h-[500px] w-[500px] rounded-full bg-purple-300/20 blur-[130px]" />
      </div>

      {/* ── Subtle background grid ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* ── Video Logo Presentation (Glass Card) ─────────────────────── */}
        <div className="relative mx-auto mb-8 max-w-sm sm:max-w-md group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-pulse" />

          <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 p-1 shadow-2xl shadow-blue-500/15 backdrop-blur-xl ring-1 ring-black/5">
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
              className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-slate-900/80 hover:scale-110 transition-all duration-200 shadow-sm cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Play className="h-3 w-3 ml-0.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* ── Status & Venue Badges ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/85 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-800">
              Free Community Workshop &bull; Open to All
            </span>
          </div>

          <a
            href={workshopConfig.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/85 px-3 py-1.5 backdrop-blur-md shadow-xs text-xs font-semibold text-blue-800 hover:bg-blue-50 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span>Orchid Mall, Palakkad</span>
          </a>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-white/85 px-3 py-1.5 backdrop-blur-md shadow-xs text-xs font-semibold text-amber-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>5.0 Rating on Google</span>
          </div>
        </div>

        {/* ── Subtitle Label ───────────────────────────────────────────── */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
          We Guide Presents &bull; Technology Awareness Session
        </p>

        {/* ── Main Headline (Plain, Inspiring, Zero Jargon) ─────────────── */}
        <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-5">
          AI &amp; Robotics,{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Made Simple for Everyone.
          </span>
        </h1>

        {/* ── Friendly Relatable Explainer ─────────────────────────────── */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 mb-4 font-normal">
          Ever wondered what <strong className="text-slate-900 font-semibold">Artificial Intelligence (AI)</strong> actually is?
          Or how robots move, see, and do smart tasks in the real world?
        </p>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-700 mb-9 font-medium">
          Join this friendly, beginner-friendly awareness workshop at WeGuide, Palakkad. We explain modern technology
          in <span className="text-blue-600 font-bold underline decoration-blue-300 decoration-2 underline-offset-4">simple, everyday words</span> —
          with live demonstrations you can watch and understand. <strong className="text-slate-800">Free for everyone.</strong>
        </p>

        {/* ── 3 Big Reassurance Cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/90 bg-white/80 p-4 shadow-sm shadow-slate-200/50 backdrop-blur-md">
            <Smile className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">100% Beginner Friendly</p>
              <p className="text-[11px] text-slate-500">No math or coding required</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/90 bg-white/80 p-4 shadow-sm shadow-slate-200/50 backdrop-blur-md">
            <Bot className="h-5 w-5 text-blue-600 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">Live Demonstrations</p>
              <p className="text-[11px] text-slate-500">See AI &amp; machines in action</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/90 bg-white/80 p-4 shadow-sm shadow-slate-200/50 backdrop-blur-md">
            <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">Ask Any Question</p>
              <p className="text-[11px] text-slate-500">Clear doubts freely with guides</p>
            </div>
          </div>
        </div>

        {/* ── Primary Action CTAs ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center mb-10">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              analytics.track('registration_form_started')
              scrollTo('register')
            }}
            className="w-full sm:w-auto shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 text-base px-8 py-3.5"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Book Your Free Seat</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo('what-youll-learn')}
            className="w-full sm:w-auto hover:-translate-y-0.5 text-base px-6 py-3.5"
          >
            See What You&#39;ll Learn
          </Button>
        </div>

        {/* ── Plain English Topic Pills ────────────────────────────────── */}
        <div className="flex flex-wrap justify-center items-center gap-2 pt-4 border-t border-slate-200/80 max-w-2xl mx-auto">
          <span className="text-xs text-slate-500 mr-2 font-bold uppercase tracking-wider">What We Cover:</span>
          {[
            { icon: Eye, label: 'How Cameras See Objects' },
            { icon: Brain, label: 'How Computers Learn' },
            { icon: Bot, label: 'How Robots Move' },
            { icon: Smartphone, label: 'AI in Your Phone' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────────── */}
      <div className="mt-12 flex justify-center animate-bounce" aria-hidden="true">
        <button
          type="button"
          onClick={() => scrollTo('what-youll-learn')}
          className="text-slate-400 hover:text-slate-700 transition-colors p-2 cursor-pointer"
          aria-label="Scroll to curriculum"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}
