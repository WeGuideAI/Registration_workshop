'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function LoginForm() {
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPass,     setShowPass]     = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [error,        setError]        = useState<string | null>(null)

  const router      = useRouter()
  const searchParams = useSearchParams()
  const redirect    = searchParams.get('redirect') ?? '/admin'

  // If user already has a valid session, redirect immediately
  useEffect(() => {
    const supabase = createClient()
    if (!supabase) { setCheckingAuth(false); return }
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace(redirect)
      } else {
        setCheckingAuth(false)
      }
    })
  }, [router, redirect])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    if (!supabase) {
      setError('Supabase credentials are not configured yet. Please check .env.local.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email:    email.trim().toLowerCase(),
      password,
    })

    if (authError) {
      setError(
        authError.message.includes('Invalid login credentials')
          ? 'Invalid email or password. Please try again.'
          : 'Sign-in failed. Please try again in a moment.'
      )
      setLoading(false)
      return
    }

    // Verify membership in admin_users table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: adminRow } = await (supabase as any)
      .from('admin_users')
      .select('id')
      .single()

    if (!adminRow) {
      await supabase.auth.signOut()
      setError('Your account does not have admin access to this portal.')
      setLoading(false)
      return
    }

    router.replace(redirect)
  }

  if (checkingAuth) {
    return (
      <div className="rounded-3xl border border-white/80 bg-white/80 p-8 flex justify-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
          aria-label="Checking session"
        />
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
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
            {showPass
              ? <EyeOff className="h-4 w-4" aria-hidden="true" />
              : <Eye    className="h-4 w-4" aria-hidden="true" />}
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
          loading={loading}
          className="shadow-md shadow-blue-500/20"
        >
          {loading ? 'Signing in…' : 'Sign In to Dashboard'}
        </Button>
      </form>
    </div>
  )
}
