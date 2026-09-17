'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { loginAdmin } from '@/app/actions/admin-auth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        setError(result.error || 'Authentication failed. Please verify your credentials.')
      }
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/50">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          name="email"
          label="Admin Email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@weguide.work"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dark={false}
        />

        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={showPass ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dark={false}
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
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
          className="mt-2 shadow-md shadow-blue-600/20 text-sm font-bold py-3"
        >
          <Lock className="h-4 w-4 mr-1.5" />
          {isPending ? 'Authenticating…' : 'Sign In to Dashboard'}
        </Button>
      </form>
    </div>
  )
}
