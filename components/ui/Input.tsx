import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, required, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-blue-600 ml-1 font-bold">*</span>
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
            'w-full rounded-xl border bg-white/90 px-4 py-2.5 text-slate-900',
            'text-sm placeholder:text-slate-400 backdrop-blur-md shadow-xs',
            'transition-all duration-150',
            'focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white',
            error
              ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-200 hover:border-slate-300',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-500">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
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
