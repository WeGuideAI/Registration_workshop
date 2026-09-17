'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  Mail,
  Hash,
  ArrowRight,
  MapPin,
  User,
  Phone,
  FileDown,
  Check,
  Building2,
  Briefcase,
  GraduationCap,
} from 'lucide-react'
import { formatRegistrationId } from '@/lib/utils/format'
import { workshopConfig } from '@/lib/config/workshop'
import { generateRegistrationPDF } from '@/lib/utils/pdf'
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
    <div className="flex items-start gap-3.5 py-3.5 border-b border-white/[0.08] last:border-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-400 shadow-2xs">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
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
    message: 'Wonderful! Come learn how AI & Robotics are transforming modern industry.',
  },
}

export default function RegistrationSuccess({
  result,
  onRegisterAnother,
}: RegistrationSuccessProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const typeInfo = applicantTypeLabels[result.applicantType] ?? {
    label: 'Attendee',
    emoji: '✅',
    message: 'You are confirmed for the workshop!',
  }

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true)
      // Small tick for smooth button state transition
      await new Promise((r) => setTimeout(r, 150))
      generateRegistrationPDF(result)
      setDownloaded(true)
    } catch (err) {
      console.error('Failed to generate PDF pass:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg text-white">
      {/* Success header with high contrast legible typography */}
      <div className="mb-8 text-center">
        <div className="mb-3 text-5xl">{typeInfo.emoji}</div>
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
          Registration Confirmed!
        </h2>
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Welcome, <span className="text-cyan-400 font-extrabold">{result.fullName}</span>!{' '}
          <span className="text-slate-300">{typeInfo.message}</span>
        </p>
      </div>

      {/* Confirmation card (Dark Tech Elevated Card) */}
      <div className="rounded-3xl border border-white/10 bg-[#0D131C] p-6 sm:p-7 shadow-2xl backdrop-blur-2xl ring-1 ring-white/5 mb-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            Booking Pass Details
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
            <Check className="h-3 w-3" /> Confirmed
          </span>
        </div>

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
        {result.phone && (
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={result.phone}
          />
        )}
        {result.schoolName && (
          <InfoRow
            icon={GraduationCap}
            label="School"
            value={`${result.schoolName}${result.grade ? ` (Class ${result.grade})` : ''}`}
          />
        )}
        {result.collegeName && (
          <InfoRow
            icon={Building2}
            label="College / Degree"
            value={`${result.collegeName}${result.course ? ` • ${result.course}` : ''}`}
          />
        )}
        {result.occupation && (
          <InfoRow
            icon={Briefcase}
            label="Occupation / Workplace"
            value={`${result.occupation}${result.workplace ? ` at ${result.workplace}` : ''}`}
          />
        )}
        <InfoRow
          icon={MapPin}
          label="Venue"
          value={`${workshopConfig.address.line1}, ${workshopConfig.address.locality}, ${workshopConfig.address.city}, ${workshopConfig.address.state}`}
        />
      </div>

      {/* Download PDF Pass CTA Button */}
      <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#0A0F16] via-[#0D131C] to-blue-950/40 p-5 sm:p-6 mb-6 shadow-xl">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <FileDown className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">Your Official Pass is Ready</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Download your personalized PDF pass with all registration details, venue directions, and check-in instructions.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isDownloading}
          onClick={handleDownloadPDF}
          className="shadow-lg shadow-blue-600/30 text-base font-extrabold py-3.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          {downloaded ? (
            <>
              <Check className="h-5 w-5 mr-1 text-emerald-300" aria-hidden="true" />
              Download PDF Pass Again
            </>
          ) : (
            <>
              <FileDown className="h-5 w-5 mr-1 text-cyan-300" aria-hidden="true" />
              Download Registration Pass (PDF)
            </>
          )}
        </Button>
      </div>

      {/* Save info note */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 px-4 py-3 mb-6">
        <p className="text-xs text-amber-200 font-medium leading-relaxed">
          <strong className="text-amber-100 font-bold">Tip:</strong> Keep the downloaded PDF on your phone or save your
          Registration ID (<strong className="text-amber-300">{formatRegistrationId(result.registrationId)}</strong>) for quick verification at the entrance.
        </p>
      </div>

      {/* Support */}
      <p className="text-center text-xs text-slate-400 mb-6">
        Questions? Contact us at{' '}
        <a
          href={`mailto:${workshopConfig.supportEmail}`}
          className="text-cyan-400 font-semibold hover:underline"
        >
          {workshopConfig.supportEmail}
        </a>{' '}
        or call{' '}
        <a
          href={`tel:${workshopConfig.phoneRaw}`}
          className="text-cyan-400 font-semibold hover:underline"
        >
          {workshopConfig.contactPhone}
        </a>
      </p>

      {/* Secondary Actions */}
      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          Back to Top
          <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
        </Button>
        {onRegisterAnother && (
          <button
            type="button"
            onClick={onRegisterAnother}
            className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer py-1 text-center"
          >
            Register another attendee
          </button>
        )}
      </div>
    </div>
  )
}
