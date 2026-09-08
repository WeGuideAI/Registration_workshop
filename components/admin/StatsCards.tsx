import { Users, CheckCircle2, Star, XCircle, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { DashboardStats } from '@/lib/types/workshop'

interface StatsCardsProps {
  stats: DashboardStats
  totalCapacity: number
}

interface StatCard {
  label: string
  value: number
  icon: typeof Users
  iconColor: string
  iconBg: string
  description?: string
}

export default function StatsCards({ stats, totalCapacity }: StatsCardsProps) {
  const availableSeats = Math.max(totalCapacity - (stats.confirmed + stats.attended), 0)

  const cards: StatCard[] = [
    {
      label:     'Total Registrations',
      value:     stats.total,
      icon:      Users,
      iconColor: 'text-blue-600',
      iconBg:    'bg-blue-50 border border-blue-100',
    },
    {
      label:       'Confirmed',
      value:       stats.confirmed,
      icon:        CheckCircle2,
      iconColor:   'text-emerald-600',
      iconBg:      'bg-emerald-50 border border-emerald-100',
      description: 'Awaiting attendance',
    },
    {
      label:       'Attended',
      value:       stats.attended,
      icon:        Star,
      iconColor:   'text-amber-600',
      iconBg:      'bg-amber-50 border border-amber-100',
      description: 'Marked present',
    },
    {
      label:       'Cancelled',
      value:       stats.cancelled,
      icon:        XCircle,
      iconColor:   'text-rose-600',
      iconBg:      'bg-rose-50 border border-rose-100',
      description: 'Seat released',
    },
    {
      label:       'Seats Available',
      value:       availableSeats,
      icon:        BarChart3,
      iconColor:   'text-purple-600',
      iconBg:      'bg-purple-50 border border-purple-100',
      description: `of ${totalCapacity} total capacity`,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="rounded-2xl border border-white/90 bg-white/80 p-4.5 shadow-sm shadow-slate-200/60 backdrop-blur-xl ring-1 ring-slate-900/5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('rounded-xl p-2.5 shadow-2xs', card.iconBg)}>
                <Icon className={cn('h-4 w-4', card.iconColor)} aria-hidden="true" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tabular-nums mb-0.5 tracking-tight">
              {card.value.toLocaleString()}
            </p>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{card.label}</p>
            {card.description && (
              <p className="text-xs text-slate-400 mt-1 font-medium">{card.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
