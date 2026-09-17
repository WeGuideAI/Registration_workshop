'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, Check, Sparkles } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  badge?: string
}

const FAQS: FAQItem[] = [
  {
    question: 'Who can attend this workshop?',
    answer:
      'The workshop is open to everyone! School students (classes 1 through 12), college students across engineering and non-engineering streams, working professionals curious about automation, and parents interested in guiding their children into technology are all welcome.',
    badge: 'All Welcome',
  },
  {
    question: 'Is prior coding or robotics knowledge required?',
    answer:
      'Absolutely not. The entire experience is designed to be 100% beginner-friendly. All concepts — from computer vision to motor control — are explained intuitively using real-life analogies and live visual demonstrations.',
    badge: 'Beginner Friendly',
  },
  {
    question: 'Is entry really 100% free? Are there any hidden fees?',
    answer:
      'Yes, attendance is completely free of charge. This is a community educational initiative by WeGuide to foster practical AI and robotics literacy in Palakkad. There are no registration fees, no material charges, and no hidden costs.',
    badge: '100% Free',
  },
  {
    question: 'Where is the workshop conducted?',
    answer:
      'The workshop takes place at the WeGuide Robotics Lab, located on the 2nd Floor of Orchid Mall, 966 National Highway, Sekharipuram, Kalpathy, Palakkad. The mall offers elevator access and ample parking space for two-wheelers and cars.',
  },
  {
    question: 'How do I receive my entry pass?',
    answer:
      'Immediately upon submitting the registration form on this website, you will be able to download your official PDF Entry Pass with your unique Registration ID. Confirmation details will also be coordinated via your provided phone / WhatsApp number.',
    badge: 'Instant PDF',
  },
  {
    question: 'Can parents attend together with their school-age children?',
    answer:
      'Yes! Parents are warmly encouraged to attend alongside their children. You can select "Parent / Professional" on the registration form and check the option indicating that your child is attending with you.',
  },
  {
    question: 'What should I bring to the workshop?',
    answer:
      'You only need to bring your mobile phone (with your downloaded PDF pass) and an active curiosity! All robotic kits, microcontrollers, sensors, and computers are provided in the lab for live demonstrations.',
  },
  {
    question: 'How long does the session take?',
    answer:
      'Each interactive session is approximately 90 minutes. This includes conceptual breakdowns, live robot perception & movement demonstrations, and an open Q&A session with our engineering mentors.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 bg-[#05070B] text-white border-b border-white/[0.06] overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
            <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
            <span>Got Questions?</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Everything you need to know about attending our free AI &amp; Robotics workshop in Palakkad.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/40 bg-[#0D131C] shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/20'
                    : 'border-white/[0.08] bg-[#0A0F16]/90 hover:border-white/20 hover:bg-[#0D131C]/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    {faq.badge && (
                      <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                        {faq.badge}
                      </span>
                    )}
                  </div>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-blue-500/20 border-blue-400/40 text-blue-300'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/[0.04] pt-4"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions? Help card */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#0D131C] border border-white/[0.08] max-w-xl mx-auto">
          <p className="text-sm text-slate-300">
            Have a specific question not covered here? Reach out to our team at{' '}
            <a href="mailto:info@weguide.co.in" className="text-cyan-400 hover:underline font-medium">
              info@weguide.co.in
            </a>{' '}
            or call{' '}
            <a href="tel:07593993975" className="text-cyan-400 hover:underline font-medium">
              +91 75939 93975
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
