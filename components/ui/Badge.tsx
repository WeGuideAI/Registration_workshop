import { cn } from '@/lib/utils/cn'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 border-slate-200/80 shadow-xs',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-xs',
  warning: 'bg-amber-50 text-amber-800 border-amber-200/80 shadow-xs',
  error:   'bg-rose-50 text-rose-700 border-rose-200/80 shadow-xs',
  info:    'bg-blue-50 text-blue-700 border-blue-200/80 shadow-xs',
  muted:   'bg-slate-50 text-slate-500 border-slate-200/60 shadow-xs',
}

export default function Badge({
  variant = 'default',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
