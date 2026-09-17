import { jsPDF } from 'jspdf'
import { formatRegistrationId } from '@/lib/utils/format'
import { workshopConfig } from '@/lib/config/workshop'
import type { BookingResult, ApplicantType } from '@/lib/types/workshop'

const APPLICANT_LABELS: Record<ApplicantType, string> = {
  school_student: 'School Student (Classes 1–12)',
  college_student: 'College Student (Undergraduate / PG)',
  professional: 'Parent / Working Professional',
}

export function generateRegistrationPDF(result: BookingResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const margin = 14
  const contentWidth = pageWidth - margin * 2

  // 1. Header Banner
  doc.setFillColor(15, 23, 42) // Slate 900
  doc.rect(0, 0, pageWidth, 40, 'F')

  // Blue Accent Stripe
  doc.setFillColor(37, 99, 235) // Blue 600
  doc.rect(0, 38, pageWidth, 2, 'F')

  // Brand Name
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('WEGUIDE AI', margin, 18)

  // Subtitle
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(147, 197, 253) // Light blue
  doc.text('AI & ROBOTICS AWARENESS WORKSHOP • PALAKKAD', margin, 26)
  doc.setFontSize(8)
  doc.setTextColor(203, 213, 225)
  doc.text('Official Registration Pass & Entry Confirmation', margin, 32)

  // Status Badge on Right
  doc.setFillColor(16, 185, 129) // Emerald 500
  doc.roundedRect(pageWidth - margin - 58, 11, 58, 18, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('ENTRY CONFIRMED', pageWidth - margin - 29, 18, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.text('FREE COMMUNITY PASS', pageWidth - margin - 29, 24, { align: 'center' })

  // 2. Pass ID Callout Box
  const passBoxY = 46
  doc.setFillColor(248, 250, 252) // Slate 50
  doc.setDrawColor(203, 213, 225) // Slate 300
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, passBoxY, contentWidth, 18, 3, 3, 'FD')

  // Pass ID text
  doc.setTextColor(15, 23, 42)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  const passId = formatRegistrationId(result.registrationId)
  doc.text(`PASS ID: ${passId}`, margin + 5, passBoxY + 11)

  // Issued Date
  const issuedDate = result.createdAt
    ? new Date(result.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(100, 116, 139)
  doc.text(`Issued: ${issuedDate}`, pageWidth - margin - 5, passBoxY + 11, { align: 'right' })

  let currentY = 72

  // Helper function to draw section headers
  const drawSectionHeader = (title: string, y: number) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(37, 99, 235) // Blue 600
    doc.text(title.toUpperCase(), margin, y)

    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(margin, y + 2, pageWidth - margin, y + 2)
  }

  // Helper to draw two-column key-value rows
  const drawRow = (
    label1: string,
    val1: string,
    label2: string,
    val2: string,
    y: number
  ) => {
    const col2X = margin + contentWidth / 2

    // Col 1
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139) // Slate 500
    doc.text(label1.toUpperCase(), margin, y)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(15, 23, 42)
    doc.text(val1 || '—', margin, y + 5)

    // Col 2
    if (label2) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(100, 116, 139)
      doc.text(label2.toUpperCase(), col2X, y)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.5)
      doc.setTextColor(15, 23, 42)
      doc.text(val2 || '—', col2X, y + 5)
    }
  }

  // 3. Section 1: Attendee Information
  drawSectionHeader('1. Attendee Information', currentY)
  currentY += 8

  drawRow('Full Name', result.fullName, 'Category', APPLICANT_LABELS[result.applicantType] || result.applicantType, currentY)
  currentY += 12

  drawRow('Email Address', result.email, 'Contact Phone', result.phone || '—', currentY)
  currentY += 12

  drawRow('City / Location', result.city || 'Palakkad', 'Experience Level', result.experienceLevel || 'Beginner', currentY)
  currentY += 16

  // 4. Section 2: Educational & Professional Profile
  drawSectionHeader('2. Educational & Background Details', currentY)
  currentY += 8

  if (result.applicantType === 'school_student') {
    drawRow('School / Institution', result.schoolName || '—', 'Grade / Class', result.grade ? `Class ${result.grade}` : '—', currentY)
    currentY += 12
    drawRow('Parent / Guardian Name', result.parentGuardianName || '—', 'Parent Contact', result.parentGuardianPhone || '—', currentY)
    currentY += 16
  } else if (result.applicantType === 'college_student') {
    drawRow('College / University', result.collegeName || '—', 'Degree / Course', result.course || '—', currentY)
    currentY += 12
    drawRow('Year of Study', result.yearOfStudy || '—', 'Tech Interests', result.techInterests || 'AI & Robotics', currentY)
    currentY += 16
  } else {
    // Professional / Parent
    drawRow('Occupation / Role', result.occupation || '—', 'Organization / Workplace', result.workplace || '—', currentY)
    currentY += 12
    if (result.hasChildAttending) {
      const childInfo = `${result.childName || ''}${result.childGrade ? ` (Class ${result.childGrade})` : ''}`
      drawRow('Accompanying Child', childInfo || 'Yes', 'Child School', result.childSchool || '—', currentY)
    } else {
      drawRow('Attending With Child', 'No (Individual Attendee)', 'Industry Focus', 'Technology & Automation', currentY)
    }
    currentY += 16
  }

  // 5. Section 3: Venue & Schedule Information
  drawSectionHeader('3. Venue & Schedule Notice', currentY)
  currentY += 7

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(15, 23, 42)
  doc.text('WORKSHOP LOCATION:', margin, currentY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(51, 65, 85)
  const fullAddress = `${workshopConfig.address.venue}, ${workshopConfig.address.line1}, ${workshopConfig.address.locality}, ${workshopConfig.address.city}, ${workshopConfig.address.state} - ${workshopConfig.address.pincode}`
  const splitAddress = doc.splitTextToSize(fullAddress, contentWidth)
  doc.text(splitAddress, margin, currentY + 4)

  currentY += 4 + splitAddress.length * 4

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(15, 23, 42)
  doc.text('BATCH SCHEDULING NOTICE:', margin, currentY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(71, 85, 105)
  const scheduleNotice =
    'Sessions are organised in small interactive batches. Your specific time slot and batch schedule ' +
    'will be communicated directly via your registered Email and WhatsApp prior to the session date.'
  const splitNotice = doc.splitTextToSize(scheduleNotice, contentWidth)
  doc.text(splitNotice, margin, currentY + 4)

  currentY += 6 + splitNotice.length * 4

  // 6. Section 4: Check-in Guidelines & Important Instructions Box
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.4)
  const boxHeight = 34
  doc.roundedRect(margin, currentY, contentWidth, boxHeight, 3, 3, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(30, 41, 59)
  doc.text('CHECK-IN INSTRUCTIONS FOR ATTENDEES', margin + 5, currentY + 6)

  const instructions = [
    '• Please present this pass (digital copy on your phone or printed) at the reception desk upon arrival.',
    '• Admission is 100% complimentary — no entrance fees or hidden charges are collected.',
    '• Hands-on robotics demonstrations, AI interaction, and career roadmap guidance are included.',
    '• Participants who complete the awareness session receive a verified Digital Certificate of Participation.',
  ]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  let instY = currentY + 12
  instructions.forEach((inst) => {
    doc.text(inst, margin + 5, instY)
    instY += 5
  })

  // 7. Footer
  const footerY = 280
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY, pageWidth - margin, footerY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(100, 116, 139)
  doc.text(
    `WeGuide AI • Support: ${workshopConfig.contactEmail} • ${workshopConfig.contactPhone} • ${workshopConfig.website}`,
    margin,
    footerY + 5
  )

  doc.setFont('helvetica', 'bold')
  doc.text(
    `PASS CODE: ${passId}`,
    pageWidth - margin,
    footerY + 5,
    { align: 'right' }
  )

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(148, 163, 184)
  doc.text(
    'This is an official system-generated registration pass from WeGuide AI. Valid for workshop admission without physical signature.',
    pageWidth / 2,
    footerY + 10,
    { align: 'center' }
  )

  // Save the PDF directly to user download
  const safeFilename = `WeGuide_Pass_${passId.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`
  doc.save(safeFilename)
}
