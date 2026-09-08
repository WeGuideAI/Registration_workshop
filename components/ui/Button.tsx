import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'
import LoadingSpinner from './LoadingSpinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 border border-blue-500/30 focus-visible:ring-blue-500',
  secondary:
    'bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-sm backdrop-blur-md hover:border-slate-300 focus-visible:ring-slate-400',
  ghost:
    'bg-transparent hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-transparent focus-visible:ring-slate-400',
  danger:
    'bg-red-600 hover:bg-red-500 text-white border border-red-600 shadow-sm focus-visible:ring-red-500',
}

const sizeClasses: Record<Size, string> = {
  sm:  'h-8  px-3  text-sm  gap-1.5',
  md:  'h-10 px-4  text-sm  gap-2',
  lg:  'h-12 px-6  text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold',
          'transition-all duration-200 cursor-pointer active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner className="h-4 w-4" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
