import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder = 'Select an option',
      error,
      className,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${selectId}-error`

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={selectId}
          className="text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-blue-600 ml-1 font-bold">*</span>
          )}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full appearance-none rounded-xl border bg-white/90 px-4 py-2.5 pr-10',
              'text-sm text-slate-900 shadow-xs backdrop-blur-md',
              'transition-all duration-150',
              'focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white',
              error
                ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
              className
            )}
            {...props}
          >
            <option value="" disabled className="text-slate-400 bg-white">
              {placeholder}
            </option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-white text-slate-900 py-1"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
            aria-hidden="true"
          />
        </div>

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
Select.displayName = 'Select'
export default Select
