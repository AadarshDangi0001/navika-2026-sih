import { MapPin, Building2, Layers, Clock, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'

const thumbnailStyles: Record<string, { grad: string; accent: string }> = {
  bhopal: { grad: 'from-blue-500/15 via-cyan-500/10 to-transparent', accent: '#3355e6' },
  indore: { grad: 'from-emerald-500/15 via-green-500/10 to-transparent', accent: '#0d9668' },
  pune: { grad: 'from-violet-500/15 via-purple-500/10 to-transparent', accent: '#8b5cf6' },
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const style = thumbnailStyles[project.thumbnail] || { grad: 'from-gray-500/15 to-transparent', accent: '#65646d' }

  return (
    <div
      onClick={onClick}
      className="card group overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 hover:border-border-strong"
    >
      <div className={`h-36 bg-gradient-to-br ${style.grad} bg-surface-sunken flex items-center justify-center relative overflow-hidden`}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.4]" viewBox="0 0 300 140">
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 20 + (i % 5) * 56
            const y = 20 + Math.floor(i / 5) * 60
            const h = 30 + (i % 3) * 18
            return <rect key={i} x={x} y={y + (60 - h)} width={30} height={h} rx={2} fill={style.accent} opacity={0.35} />
          })}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        <Building2 size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ color: style.accent, opacity: 0.55 }} />
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={13} className="text-text-primary" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[14px] font-semibold text-text-primary tracking-tight">{project.name}</h3>
        <div className="flex items-center gap-1 mt-1.5">
          <MapPin size={11} className="text-text-muted" />
          <span className="text-[11.5px] text-text-muted">{project.location}</span>
        </div>
        <p className="text-[12px] text-text-secondary mt-2 line-clamp-2 leading-relaxed">{project.description}</p>

        <div className="flex items-center gap-4 mt-3.5 pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-1.5">
            <Building2 size={12} className="text-text-muted" />
            <span className="text-[11.5px] font-medium text-text-secondary">{project.buildings}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={12} className="text-text-muted" />
            <span className="text-[11.5px] font-medium text-text-secondary">{project.proposals} proposals</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Clock size={11} className="text-text-muted" />
            <span className="text-[11px] text-text-muted">{project.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
