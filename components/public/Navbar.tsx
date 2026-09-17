'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Shield, Menu, X } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40'
          : 'bg-[#05070B]/50 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={workshopConfig.company}
              className="h-8 w-auto rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-sm">
                {workshopConfig.company}
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-widest hidden sm:inline">
                AI &amp; Robotics Workshop
              </span>
            </div>
          </Link>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              type="button"
              onClick={() => scrollTo('experience')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              How AI Thinks
            </button>
            <button
              type="button"
              onClick={() => scrollTo('who-its-for')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Who It&apos;s For
            </button>
            <button
              type="button"
              onClick={() => scrollTo('curriculum')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Curriculum
            </button>
            <button
              type="button"
              onClick={() => scrollTo('faq')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Venue &amp; FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Admin Portal</span>
            </Link>

            <Button
              size="sm"
              variant="primary"
              onClick={() => scrollTo('register')}
              className="shadow-lg shadow-blue-600/30 text-xs sm:text-sm font-bold py-2 px-3.5 sm:px-4"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden xs:inline">Reserve My Free Seat</span>
              <span className="xs:hidden">Reserve Seat</span>
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" aria-hidden="true" />
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#05070B]/98 px-4 py-5 shadow-2xl backdrop-blur-2xl">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            <button
              type="button"
              onClick={() => scrollTo('experience')}
              className="flex items-center justify-between py-2 text-left hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              <span>The Experience</span>
              <span className="text-xs text-slate-500">Live Demos</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="flex items-center justify-between py-2 text-left hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              <span>How AI Thinks &amp; Moves</span>
              <span className="text-xs text-slate-500">The 3-Step Loop</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo('who-its-for')}
              className="flex items-center justify-between py-2 text-left hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              <span>Who Can Attend</span>
              <span className="text-xs text-slate-500">Students &bull; Parents &bull; Pros</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo('curriculum')}
              className="flex items-center justify-between py-2 text-left hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              <span>What You&apos;ll Learn</span>
              <span className="text-xs text-slate-500">Vision &bull; Brain &bull; Motors</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo('faq')}
              className="flex items-center justify-between py-2 text-left hover:text-cyan-400 transition-colors border-b border-white/5"
            >
              <span>Venue &amp; FAQ</span>
              <span className="text-xs text-slate-500">Orchid Mall, Palakkad</span>
            </button>
            <div className="pt-2">
              <Button
                size="md"
                variant="primary"
                fullWidth
                onClick={() => scrollTo('register')}
                className="py-3 text-sm font-bold shadow-lg shadow-blue-600/30"
              >
                <Sparkles className="h-4 w-4 mr-1.5" />
                Reserve My Free Seat →
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
