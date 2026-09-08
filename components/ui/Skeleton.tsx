import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-slate-200/70',
        className
      )}
      aria-hidden="true"
    />
  )
}
