import type { Metadata } from 'next'
import Hero from '@/components/public/Hero'
import WorkshopHighlights from '@/components/public/WorkshopHighlights'
import RegistrationSection from '@/components/public/RegistrationSection'
import Footer from '@/components/public/Footer'
import Navbar from '@/components/public/Navbar'
import { workshopConfig } from '@/lib/config/workshop'

export const metadata: Metadata = {
  title: workshopConfig.name,
  description: workshopConfig.description,
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WorkshopHighlights />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  )
}
