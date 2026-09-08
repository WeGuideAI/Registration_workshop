import { cn } from '@/lib/utils/cn'

interface ProgressBarProps {
  value: number      // 0–100
  className?: string
  label?: string
  showLabel?: boolean
  colorThreshold?: { warning: number; danger: number }
}

export default function ProgressBar({
  value,
  className,
  label,
  showLabel = false,
  colorThreshold = { warning: 75, danger: 95 },
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100)

  const barColor =
    clamped >= colorThreshold.danger
      ? 'bg-gradient-to-r from-red-600 to-rose-500'
      : clamped >= colorThreshold.warning
        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
        : 'bg-gradient-to-r from-blue-600 to-cyan-500'

  return (
    <div className={cn('w-full', className)}>
      {(label || showLabel) && (
        <div className="flex justify-between text-xs text-slate-600 font-medium mb-1.5">
          {label && <span>{label}</span>}
          {showLabel && <span>{clamped.toFixed(0)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="w-full h-2 bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden p-0.5"
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 shadow-xs', barColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
