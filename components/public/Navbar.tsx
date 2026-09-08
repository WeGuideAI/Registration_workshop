'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Shield } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs shadow-slate-900/5'
          : 'bg-white/40 backdrop-blur-md border-b border-slate-200/40'
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
              className="h-8 w-auto rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-200"
            />
            <span className="hidden sm:inline-block font-bold text-slate-900 tracking-tight text-sm">
              {workshopConfig.company}
            </span>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => scrollTo('what-youll-learn')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Curriculum
            </button>
            <button
              type="button"
              onClick={() => scrollTo('highlights-heading')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              AI &amp; Robotics
            </button>
            <button
              type="button"
              onClick={() => scrollTo('register')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Sessions &amp; Dates
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Admin Portal</span>
            </Link>

            <Button
              size="sm"
              variant="primary"
              onClick={() => scrollTo('register')}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Book Slot</span>
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
