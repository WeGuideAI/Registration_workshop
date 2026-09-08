import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/public/Hero'
import WorkshopHighlights from '@/components/public/WorkshopHighlights'
import RegistrationSection from '@/components/public/RegistrationSection'
import Footer from '@/components/public/Footer'
import type { PublicSlot } from '@/lib/types/workshop'
import { workshopConfig } from '@/lib/config/workshop'

export const metadata: Metadata = {
  title: workshopConfig.name,
  description: workshopConfig.description,
}

export const revalidate = 30

interface SlotRpcRow {
  id: string
  session_title: string
  session_datetime: string
  max_capacity: number
  seats_filled: number
  seats_remaining: number
  is_sold_out: boolean
}

const PREVIEW_SLOTS: PublicSlot[] = [
  {
    id: 'e4d29a50-6e3d-4c4f-9e77-9b2f689c1d01',
    sessionTitle: 'Batch A — Morning Session',
    sessionDatetime: '2026-09-20T04:00:00.000Z',
    maxCapacity: 50,
    seatsFilled: 46,
    seatsRemaining: 4,
    isSoldOut: false,
  },
  {
    id: 'f5e30b61-7f4e-5d5a-af88-0c3a790d2e12',
    sessionTitle: 'Batch B — Afternoon Session',
    sessionDatetime: '2026-09-20T08:30:00.000Z',
    maxCapacity: 50,
    seatsFilled: 38,
    seatsRemaining: 12,
    isSoldOut: false,
  },
  {
    id: 'a6f41c72-8a5f-6e6b-b099-1d4b801e3f23',
    sessionTitle: 'Batch C — Evening Session',
    sessionDatetime: '2026-09-21T11:30:00.000Z',
    maxCapacity: 50,
    seatsFilled: 50,
    seatsRemaining: 0,
    isSoldOut: true,
  },
]

async function getPublicSlots(): Promise<PublicSlot[]> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).rpc('get_public_slots')

    if (error || !data || data.length === 0) return PREVIEW_SLOTS

    return (data as SlotRpcRow[]).map((s) => ({
      id:              s.id,
      sessionTitle:    s.session_title,
      sessionDatetime: s.session_datetime,
      maxCapacity:     s.max_capacity,
      seatsFilled:     Number(s.seats_filled),
      seatsRemaining:  Number(s.seats_remaining),
      isSoldOut:       s.is_sold_out,
    }))
  } catch {
    return PREVIEW_SLOTS
  }
}

import Navbar from '@/components/public/Navbar'

export default async function LandingPage() {
  const initialSlots = await getPublicSlots()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WorkshopHighlights />
        <RegistrationSection initialSlots={initialSlots} />
      </main>
      <Footer />
    </div>
  )
}
