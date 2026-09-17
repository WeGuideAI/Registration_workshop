import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { workshopConfig } from '@/lib/config/workshop'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = workshopConfig.website

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${workshopConfig.name} | ${workshopConfig.company}`,
    template: `%s | ${workshopConfig.company}`,
  },
  description:
    'A free beginner-friendly AI & Robotics awareness workshop by We Guide in Palakkad, Kerala. ' +
    'Learn how AI and robots work in everyday life through simple live demonstrations.',
  keywords: [
    'AI workshop Palakkad', 'Robotics awareness Kerala', 'We Guide Palakkad',
    'Orchid Mall Palakkad', 'beginner AI session', 'community technology workshop',
  ],
  authors: [{ name: workshopConfig.company, url: siteUrl }],
  creator: workshopConfig.company,
  openGraph: {
    type:        'website',
    url:         siteUrl,
    siteName:    workshopConfig.company,
    title:       `${workshopConfig.name} | ${workshopConfig.company}`,
    description:
      'Free AI & Robotics awareness workshop in Palakkad. Simple, fun, and open to everyone.',
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    `${workshopConfig.name} by ${workshopConfig.company}`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${workshopConfig.name} | ${workshopConfig.company}`,
    description: 'Free AI & Robotics awareness workshop in Palakkad. Limited seats.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor:  '#05070b',
  colorScheme: 'dark',
  width:       'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
