'use client'

import { useState, useCallback } from 'react'
import { registrationSchema } from '@/lib/validation/registration'
import { registerForSlot } from '@/app/actions/register'
import { analytics } from '@/lib/utils/analytics'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import type {
  RegistrationFormData,
  BookingResult,
  AppError,
  UserRole,
  ExperienceLevel,
  PublicSlot,
} from '@/lib/types/workshop'
import { USER_ROLES, EXPERIENCE_LEVELS } from '@/lib/types/workshop'

interface RegistrationFormProps {
  slots: PublicSlot[]
  selectedSlotId: string
  onSelectSlot: (id: string) => void
  onSuccess: (result: BookingResult) => void
}

type FieldErrors = Partial<Record<keyof RegistrationFormData, string>>

const EMPTY_FORM: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  organization: '',
  experienceLevel: '',
  slotId: '',
}

export default function RegistrationForm({
  slots,
  selectedSlotId,
  onSelectSlot,
  onSuccess,
}: RegistrationFormProps) {
  const [form, setForm] = useState<RegistrationFormData>({
    ...EMPTY_FORM,
    slotId: selectedSlotId,
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [globalError, setGlobalError] = useState<AppError | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Keep slotId synced with external selection
  const currentSlotId = selectedSlotId || form.slotId

  const setField = useCallback(
    <K extends keyof RegistrationFormData>(key: K, value: RegistrationFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      // Clear field error on change
      if (fieldErrors[key]) {
        setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
      }
      if (globalError) setGlobalError(null)
    },
    [fieldErrors, globalError]
  )

  const validateClientSide = (): boolean => {
    const result = registrationSchema.safeParse({
      full_name:        form.fullName,
      email:            form.email,
      phone:            form.phone,
      role:             form.role,
      organization:     form.organization,
      experience_level: form.experienceLevel,
      slot_id:          currentSlotId,
    })

    if (!result.success) {
      const errors: FieldErrors = {}
      result.error.issues.forEach((issue) => {
        const fieldMap: Record<string, keyof FieldErrors> = {
          full_name:        'fullName',
          email:            'email',
          phone:            'phone',
          role:             'role',
          organization:     'organization',
          experience_level: 'experienceLevel',
          slot_id:          'slotId',
        }
        const key = fieldMap[issue.path[0] as string]
        if (key && !errors[key]) errors[key] = issue.message
      })
      setFieldErrors(errors)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)

    if (!validateClientSide()) return

    const selectedSlot = slots.find((s) => s.id === currentSlotId)
    if (selectedSlot?.isSoldOut) {
      setGlobalError({
        code: 'SLOT_FULL',
        message:
          'This session filled up while you were registering. Please choose another session.',
      })
      return
    }

    setIsSubmitting(true)
    analytics.track('registration_submitted', {
      slot_id:       currentSlotId,
      session_title: selectedSlot?.sessionTitle,
    })

    try {
      const result = await registerForSlot({
        full_name:        form.fullName.trim(),
        email:            form.email.trim().toLowerCase(),
        phone:            form.phone.trim(),
        role:             form.role,
        organization:     form.organization.trim(),
        experience_level: form.experienceLevel,
        slot_id:          currentSlotId,
      })

      if (!result.success) {
        analytics.track('registration_failure', { error_code: result.error.code })
        setGlobalError(result.error)
        return
      }

      analytics.track('registration_success', {
        slot_id:       currentSlotId,
        session_title: result.data.sessionTitle,
      })
      onSuccess(result.data)
    } catch {
      analytics.track('registration_failure', { error_code: 'NETWORK_ERROR' })
      setGlobalError({
        code: 'NETWORK_ERROR',
        message:
          "We couldn't confirm your registration. Please try again. Your seat has not been confirmed unless you see the confirmation screen.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSlots = slots.filter((s) => !s.isSoldOut)

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Workshop registration form"
      className="space-y-5"
    >
      {/* Session selector (inline with form for mobile friendliness) */}
      {slots.length > 0 && (
        <Select
          label="Workshop Session"
          required
          value={currentSlotId}
          onChange={(e) => {
            onSelectSlot(e.target.value)
            setField('slotId', e.target.value)
            analytics.track('slot_selected', { slot_id: e.target.value })
          }}
          error={fieldErrors.slotId}
          placeholder="Select a session"
          options={slots.map((s) => ({
            value:    s.id,
            label:    s.isSoldOut ? `${s.sessionTitle} — SOLD OUT` : s.sessionTitle,
            disabled: s.isSoldOut,
          }))}
        />
      )}

      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g. Arjun Sharma"
          value={form.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          error={fieldErrors.fullName}
        />
        <Input
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          error={fieldErrors.email}
        />
      </div>

      {/* Phone + Role */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Phone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => setField('phone', e.target.value)}
          error={fieldErrors.phone}
          hint="We may send session updates via WhatsApp"
        />
        <Select
          label="What best describes you?"
          required
          value={form.role}
          onChange={(e) => setField('role', e.target.value as UserRole)}
          error={fieldErrors.role}
          placeholder="Select an option"
          options={[
            { value: 'Student', label: 'Student (School, College, or Learning)' },
            { value: 'Working Professional', label: 'Working / Business / Self-Employed' },
            { value: 'Hobbyist/Other', label: 'Local Resident / Parent / Curious Citizen' },
          ]}
        />
      </div>

      {/* Organization + Experience */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="School, Workplace, or Locality"
          type="text"
          required
          autoComplete="organization"
          placeholder="e.g. Local resident, City College, Freelancer"
          value={form.organization}
          onChange={(e) => setField('organization', e.target.value)}
          error={fieldErrors.organization}
          hint="If not a student or employee, simply enter your area or city"
        />
        <Select
          label="Your Familiarity with AI / Robotics"
          required
          value={form.experienceLevel}
          onChange={(e) => setField('experienceLevel', e.target.value as ExperienceLevel)}
          error={fieldErrors.experienceLevel}
          placeholder="Select your level"
          options={[
            { value: 'Beginner',     label: 'Complete Beginner (Brand new to AI & Robots)' },
            { value: 'Intermediate', label: 'Curious Explorer (Heard of ChatGPT, want to see practical robots)' },
            { value: 'Advanced',     label: 'Tech Enthusiast (Already enjoy building or coding)' },
          ]}
        />
      </div>

      {/* Global error */}
      {globalError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-4 shadow-sm backdrop-blur-sm"
        >
          <span aria-hidden="true" className="mt-0.5 text-red-500 text-lg">⚠</span>
          <p className="text-sm font-medium text-red-700">{globalError.message}</p>
        </div>
      )}

      {/* No available slots warning */}
      {slots.length > 0 && availableSlots.length === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-medium text-amber-800">
            All sessions are currently full. Please check back soon for additional sessions!
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={availableSlots.length === 0}
        className="mt-2"
      >
        {isSubmitting ? 'Confirming your seat…' : 'Confirm Registration'}
      </Button>

      <p className="text-center text-xs text-slate-600">
        By registering you agree to WeGuide's event terms. No payment required.
      </p>
    </form>
  )
}
