'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { exportRegistrationsToCsv } from '@/lib/utils/export'
import Button from '@/components/ui/Button'
import type { Registration } from '@/lib/types/workshop'

interface ExportButtonProps {
  registrations: Registration[]
}

export default function ExportButton({ registrations }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      const timestamp = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')
      exportRegistrationsToCsv(
        registrations,
        `weguide-registrations-${timestamp}.csv`
      )
    } finally {
      // Small delay so user sees feedback
      setTimeout(() => setExporting(false), 600)
    }
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      loading={exporting}
      onClick={handleExport}
      disabled={registrations.length === 0}
      title={
        registrations.length === 0
          ? 'No registrations to export'
          : `Export ${registrations.length} registration${registrations.length !== 1 ? 's' : ''} to CSV`
      }
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Export CSV
      {registrations.length > 0 && (
        <span className="ml-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.2 text-[11px] font-bold tabular-nums">
          {registrations.length}
        </span>
      )}
    </Button>
  )
}
