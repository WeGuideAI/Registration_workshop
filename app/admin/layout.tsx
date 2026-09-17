import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal — WeGuide AI & Robotics Workshop',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#f8fafc',
  colorScheme: 'light',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-portal min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white" style={{ colorScheme: 'light' }}>
      {children}
    </div>
  )
}
