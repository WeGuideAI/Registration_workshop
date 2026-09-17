'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { loginAdmin } from '@/app/actions/admin-auth'

export default function LoginForm() {
  const [email, setEmail] = useState('admin@weguide.work')
  const [password, setPassword] = useState('weguide@2026')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await loginAdmin(formData)
      if (result.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(result.error || 'Failed to sign in.')
      }
    })
  }

  const fillDefaultCredentials = () => {
    setEmail('admin@weguide.work')
    setPassword('weguide@2026')
    setError(null)
  }

  return (
    <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          name="email"
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@weguide.work"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={showPass ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 bottom-2.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {showPass ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-2xs">
            <p className="text-xs font-semibold text-red-700">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
          className="shadow-md shadow-blue-500/20"
        >
          {isPending ? 'Signing in…' : 'Sign In to Dashboard'}
        </Button>
      </form>

      {/* Built-in quick credentials helper */}
      <div className="mt-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 p-3.5 text-xs text-slate-600">
        <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-800">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Built-in Login Credentials
          </span>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            Auto-fill
          </button>
        </div>
        <div className="space-y-1 font-mono text-[11px] text-slate-500 bg-white/70 p-2 rounded-lg border border-slate-200/50">
          <div><span className="text-slate-400">Email:</span> <strong className="text-slate-700">admin@weguide.work</strong></div>
          <div><span className="text-slate-400">Pass:</span> <strong className="text-slate-700">weguide@2026</strong></div>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 leading-tight">
          Default built-in credentials. Ready for immediate access without database setup.
        </p>
      </div>
    </div>
  )
}
