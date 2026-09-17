import Papa from 'papaparse'
import type { Registration } from '@/lib/types/workshop'

function formatDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
  })
  const time = d.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
  })
  return { date, time }
}

function formatApplicantType(type: Registration['applicantType']): string {
  if (type === 'school_student') return 'School Student'
  if (type === 'college_student') return 'College Student'
  return 'Parent / Professional'
}

export function exportRegistrationsToCsv(
  registrations: Registration[],
  filename = 'weguide-workshop-registrations.csv'
): void {
  const rows = registrations.map((r) => {
    const { date: regDate, time: regTime } = formatDateTime(r.createdAt)
    return {
      'Registration ID':      r.id,
      'Registered Date':      regDate,
      'Registered Time':      regTime,
      'Full Name':            r.fullName,
      'Email':                r.email,
      'Phone':                r.phone,
      'Applicant Category':   formatApplicantType(r.applicantType),
      'Experience Level':     r.experienceLevel,
      'City / Area':          r.city              ?? '',
      'Discovered Via':       r.hearAboutUs       ?? '',
      // School student specific
      'School Name':          r.schoolName              ?? '',
      'Grade':                r.grade                   ?? '',
      'Parent Guardian Name': r.parentGuardianName      ?? '',
      'Parent Guardian Phone':r.parentGuardianPhone     ?? '',
      // College student specific
      'College Name':         r.collegeName             ?? '',
      'Course / Stream':      r.course                  ?? '',
      'Year of Study':        r.yearOfStudy             ?? '',
      'Tech Interests':       r.techInterests           ?? '',
      // Professional specific
      'Occupation':           r.occupation              ?? '',
      'Workplace':            r.workplace               ?? '',
      'Child Attending':      r.hasChildAttending ? 'Yes' : '',
      'Child Name':           r.childName               ?? '',
      'Child Grade':          r.childGrade              ?? '',
      'Child School':         r.childSchool             ?? '',
    }
  })

  const csv  = Papa.unparse(rows, { quotes: true, newline: '\r\n' })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href       = url
  link.download   = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
