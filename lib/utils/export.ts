import Papa from 'papaparse'
import type { Registration } from '@/lib/types/workshop'

function formatDateTime(
  iso: string
): { date: string; time: string } {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
  const time = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
  return { date, time }
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function exportRegistrationsToCsv(
  registrations: Registration[],
  filename = 'weguide-registrations.csv'
): void {
  const rows = registrations.map((r) => {
    const { date: sessionDate, time: sessionTime } = r.sessionDatetime
      ? formatDateTime(r.sessionDatetime)
      : { date: '', time: '' }

    const { date: registeredDate, time: registeredTime } = formatDateTime(
      r.createdAt
    )

    return {
      'Registration ID': r.id,
      'Registered Date': registeredDate,
      'Registered Time': registeredTime,
      'Full Name': r.fullName,
      Email: r.email,
      Phone: r.phone,
      Role: r.role,
      'Organization / College': r.organization,
      'Experience Level': r.experienceLevel,
      Session: r.sessionTitle ?? '',
      'Session Date': sessionDate,
      'Session Time': sessionTime,
      Status: capitalise(r.status),
    }
  })

  const csv = Papa.unparse(rows, { quotes: true, newline: '\r\n' })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
