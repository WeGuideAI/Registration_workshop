import { Users, CalendarCheck, MapPin, Compass } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface LogicalDashboardStats {
  totalRegistrations: number
  todayRegistrations: number
  topCity: string
  topSource: string
  schoolCount: number
  collegeCount: number
  professionalCount: number
}

interface StatsCardsProps {
  stats: LogicalDashboardStats
}

interface StatCard {
  label: string
  value: number | string
  icon: typeof Users
  iconColor: string
  iconBg: string
  description?: string
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatCard[] = [
    {
      label: 'Total Registrations',
      value: stats.totalRegistrations.toLocaleString(),
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border border-blue-100',
      description: 'Overall interest received',
    },
    {
      label: "Registered Today",
      value: stats.todayRegistrations.toLocaleString(),
      icon: CalendarCheck,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border border-emerald-100',
      description: 'New submissions today',
    },
    {
      label: 'Top Location',
      value: stats.topCity || '—',
      icon: MapPin,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50 border border-indigo-100',
      description: 'Most active city / area',
    },
    {
      label: 'Primary Referral',
      value: stats.topSource || '—',
      icon: Compass,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border border-amber-100',
      description: 'Top discovery channel',
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('rounded-xl p-2.5 shadow-2xs', card.iconBg)}>
                <Icon className={cn('h-5 w-5', card.iconColor)} aria-hidden="true" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums mb-1 tracking-tight truncate" title={String(card.value)}>
              {card.value}
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
            {card.description && (
              <p className="text-xs text-slate-400 mt-1 font-medium truncate">{card.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
