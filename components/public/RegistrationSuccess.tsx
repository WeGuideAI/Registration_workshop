'use client'

import { CheckCircle2, Mail, Hash, ArrowRight, MapPin, User } from 'lucide-react'
import { formatRegistrationId } from '@/lib/utils/format'
import { workshopConfig } from '@/lib/config/workshop'
import type { BookingResult, ApplicantType } from '@/lib/types/workshop'
import Button from '@/components/ui/Button'

interface RegistrationSuccessProps {
  result: BookingResult
  onRegisterAnother?: () => void
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3.5 py-3 border-b border-slate-100 last:border-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600 shadow-2xs">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}

const applicantTypeLabels: Record<ApplicantType, { label: string; emoji: string; message: string }> = {
  school_student: {
    label: 'School Student',
    emoji: '📚',
    message: "You're all set! Get ready to discover the amazing world of AI & Robotics.",
  },
  college_student: {
    label: 'College Student',
    emoji: '🎓',
    message: 'Great! Explore how AI & Robotics can shape your career and future.',
  },
  professional: {
    label: 'Parent / Working Professional',
    emoji: '💼',
    message: 'Wonderful! Come learn how AI & Robotics are transforming every industry.',
  },
}

export default function RegistrationSuccess({
  result,
  onRegisterAnother,
}: RegistrationSuccessProps) {
  const typeInfo = applicantTypeLabels[result.applicantType] ?? {
    label: 'Attendee',
    emoji: '✅',
    message: 'You are confirmed for the workshop!',
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Success header */}
      <div className="mb-8 text-center">
        <div className="mb-3 text-5xl">{typeInfo.emoji}</div>
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Registration Confirmed!
        </h2>
        <p className="text-slate-600 font-normal">
          Welcome, <span className="text-slate-900 font-bold">{result.fullName}</span>!{' '}
          {typeInfo.message}
        </p>
      </div>

      {/* Confirmation card (Frosted Glass) */}
      <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-2xl ring-1 ring-slate-900/5 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
          Booking Pass Details
        </h3>

        <InfoRow
          icon={Hash}
          label="Registration ID"
          value={formatRegistrationId(result.registrationId)}
        />
        <InfoRow
          icon={User}
          label="Registered As"
          value={typeInfo.label}
        />
        <InfoRow
          icon={Mail}
          label="Registered Email"
          value={result.email}
        />
        <InfoRow
          icon={MapPin}
          label="Venue"
          value={`${workshopConfig.address.line1}, ${workshopConfig.address.locality}, ${workshopConfig.address.city}, ${workshopConfig.address.state}`}
        />
      </div>

      {/* Save info note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3.5 mb-6 shadow-2xs">
        <p className="text-xs sm:text-sm text-amber-900 font-medium">
          <strong>Save this confirmation.</strong> Screenshot or note down your
          Registration ID for quick check-in at the venue.
        </p>
      </div>

      {/* Support */}
      <p className="text-center text-xs text-slate-500 mb-6">
        Questions? Contact us at{' '}
        <a
          href={`mailto:${workshopConfig.supportEmail}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          {workshopConfig.supportEmail}
        </a>
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
          <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
        </Button>
        {onRegisterAnother && (
          <button
            type="button"
            onClick={onRegisterAnother}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Register another attendee
          </button>
        )}
      </div>
    </div>
  )
}
