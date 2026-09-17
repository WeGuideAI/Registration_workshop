import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  dark?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, required, dark = false, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs font-bold uppercase tracking-wider',
            dark ? 'text-slate-200' : 'text-slate-700'
          )}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-blue-500 ml-1 font-bold">*</span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') ||
            undefined
          }
          className={cn(
            'w-full rounded-xl border px-4 py-2.5 text-sm backdrop-blur-md shadow-xs transition-all duration-150',
            dark
              ? 'bg-slate-800/90 text-white placeholder:text-slate-500 border-slate-700 focus:outline-none focus:ring-3 focus:ring-blue-400/30 focus:border-blue-400 focus:bg-slate-800'
              : 'bg-white/90 text-slate-900 placeholder:text-slate-400 border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white',
            error && (dark ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : 'border-red-400 focus:ring-red-500/20 focus:border-red-500'),
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className={cn('text-xs', dark ? 'text-slate-400' : 'text-slate-500')}>
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className={cn('text-xs font-medium flex items-center gap-1', dark ? 'text-red-400' : 'text-red-600')}>
            <span aria-hidden="true">⚠</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
