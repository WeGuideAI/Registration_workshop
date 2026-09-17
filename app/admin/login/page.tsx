import { Suspense } from 'react'
import LoginForm from './LoginForm'
import { workshopConfig } from '@/lib/config/workshop'
import { ShieldCheck } from 'lucide-react'

// Shell renders on the server; LoginForm uses useSearchParams so it's client-only.
export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden">
      {/* Soft background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-blue-100/60 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="We Guide"
              className="h-11 w-auto rounded-xl shadow-xs border border-slate-200 bg-white p-1"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            {workshopConfig.company} &bull; {workshopConfig.shortName}
          </p>
        </div>

        {/* Suspense boundary required for useSearchParams */}
        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-200 bg-white p-8 flex justify-center shadow-md">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-label="Loading" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <span>Restricted access &bull; Authorized personnel only</span>
        </div>
      </div>
    </div>
  )
}
