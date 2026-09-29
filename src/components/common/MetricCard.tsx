import { type LucideIcon, ArrowUpRight } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  color?: string
  trend?: string
}

export function MetricCard({ label, value, icon: Icon, color = '#3355e6', trend }: MetricCardProps) {
  return (
    <div className="card group relative overflow-hidden p-4 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
      <div
        className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-[0.07] blur-xl transition-opacity group-hover:opacity-[0.12]"
        style={{ backgroundColor: color }}
      />
      <div className="relative flex items-start justify-between">
        <div className="p-2 rounded-[9px]" style={{ backgroundColor: color + '14' }}>
          <Icon size={16} style={{ color }} strokeWidth={2.25} />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-[11px] font-medium text-accent-green">
            <ArrowUpRight size={11} />
            {trend}
          </span>
        )}
      </div>
      <p className="relative text-[22px] font-semibold text-text-primary mt-3 tracking-tight tabular-nums">{value}</p>
      <p className="relative text-[12px] font-medium text-text-secondary mt-0.5">{label}</p>
    </div>
  )
}
