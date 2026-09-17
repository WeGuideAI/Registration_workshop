'use client'

import { useState } from 'react'
import { LogOut, User, ChevronDown } from 'lucide-react'
import { logoutAdmin } from '@/app/actions/admin-auth'
import { workshopConfig } from '@/lib/config/workshop'
import Button from '@/components/ui/Button'

interface AdminHeaderProps {
  userEmail: string
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await logoutAdmin()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="WeGuide"
              className="h-8 w-auto rounded-lg shadow-2xs border border-slate-200 bg-white p-0.5"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">
                {workshopConfig.company} Admin
              </p>
              <p className="text-xs text-slate-500 leading-none mt-1 font-medium">
                {workshopConfig.name}
              </p>
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-semibold">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <span className="hidden sm:block max-w-[180px] truncate font-semibold text-xs text-slate-700">{userEmail}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-2 z-40 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <div className="px-3 py-2 mb-1 border-b border-slate-100">
                    <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                    <p className="text-xs font-bold text-slate-900 truncate mt-0.5">{userEmail}</p>
                  </div>
                  <div className="pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      loading={signingOut}
                      onClick={handleSignOut}
                      className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer text-xs font-semibold"
                    >
                      <LogOut className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
