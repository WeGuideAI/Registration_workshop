import { Suspense } from 'react'
import LoginForm from './LoginForm'
import { workshopConfig } from '@/lib/config/workshop'

// Shell renders on the server; LoginForm uses useSearchParams so it's client-only.
export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-100 px-4 relative overflow-hidden">
      {/* Background glowing orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="We Guide"
              className="h-12 w-auto rounded-xl shadow-md border border-blue-100"
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {workshopConfig.company} &bull; {workshopConfig.shortName}
          </p>
        </div>

        {/* Suspense boundary required for useSearchParams */}
        <Suspense
          fallback={
            <div className="rounded-3xl border border-white/80 bg-white/80 p-8 flex justify-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-label="Loading" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-slate-400">
          Restricted access. Authorized WeGuide personnel only.
        </p>
      </div>
    </div>
  )
}
