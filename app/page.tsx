import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import TrustBar from '@/components/public/TrustBar'
import RegistrationSection from '@/components/public/RegistrationSection'
import ExperiencePillars from '@/components/public/ExperiencePillars'
import AIFlowSection from '@/components/public/AIFlowSection'
import AudienceSection from '@/components/public/AudienceSection'
import WorkshopMedia from '@/components/public/WorkshopMedia'
import WorkshopHighlights from '@/components/public/WorkshopHighlights'
import WorkshopDetails from '@/components/public/WorkshopDetails'
import FAQSection from '@/components/public/FAQSection'
import FinalCTA from '@/components/public/FinalCTA'
import Footer from '@/components/public/Footer'
import MobileStickyCTA from '@/components/public/MobileStickyCTA'
import { workshopConfig } from '@/lib/config/workshop'

export const metadata: Metadata = {
  title: `${workshopConfig.name} — WeGuide AI & Robotics`,
  description:
    'Experience Artificial Intelligence in the physical world. Hands-on robotics, computer vision, and real machines at WeGuide Lab, Palakkad. 100% Free Entry • Download instant PDF entry pass.',
  keywords: [
    'AI workshop',
    'Robotics workshop',
    'WeGuide AI',
    'Palakkad robotics',
    'Free AI workshop Kerala',
    'Learn robotics beginner',
    'Computer vision demo',
    'Orchid Mall Palakkad',
  ],
  openGraph: {
    title: `${workshopConfig.name} — WeGuide AI & Robotics`,
    description:
      'Experience Artificial Intelligence in the physical world. Watch a robot think and move in real time at WeGuide Lab, Palakkad. Free Community Entry.',
    url: 'https://register.weguide.work',
    siteName: 'WeGuide AI',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <RegistrationSection />
        <ExperiencePillars />
        <AIFlowSection />
        <AudienceSection />
        <WorkshopMedia />
        <WorkshopHighlights />
        <WorkshopDetails />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
