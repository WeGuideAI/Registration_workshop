'use client'

import { useEffect, useState } from 'react'
import { Zap, ArrowRight } from 'lucide-react'

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const registerSection = document.getElementById('register')
    if (!registerSection) {
      // Fallback: show on scroll past 300px
      const handleScroll = () => {
        setIsVisible(window.scrollY > 300)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    // Use IntersectionObserver to hide sticky bar when registration form is already visible on screen
    let isRegisterInView = false
    let isPastHero = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        isRegisterInView = entry.isIntersecting
        setIsVisible(isPastHero && !isRegisterInView)
      },
      { threshold: 0.1 }
    )

    observer.observe(registerSection)

    const handleScroll = () => {
      isPastHero = window.scrollY > 350
      setIsVisible(isPastHero && !isRegisterInView)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToRegister = () => {
    const el = document.getElementById('register')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside
      aria-label="Quick registration bar"
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-md rounded-2xl border border-blue-500/40 bg-[#05070B]/95 p-2.5 shadow-2xl backdrop-blur-2xl ring-1 ring-blue-500/20">
        <button
          type="button"
          onClick={scrollToRegister}
          className="w-full flex items-center justify-between gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Reserve My Free Seat</span>
          </div>

          <div className="flex items-center gap-1.5 text-cyan-200 text-xs font-semibold">
            <span>Free Entry</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>
    </aside>
  )
}
