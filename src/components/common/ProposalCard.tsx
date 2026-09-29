import { Clock, ArrowRight, Sun, Leaf, TreePine } from 'lucide-react'
import type { Proposal } from '../../types'

interface ProposalCardProps {
  proposal: Proposal
  onClick?: () => void
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const isB = proposal.id === 'prop-b'
  const accent = isB ? '#0d9668' : '#65646d'

  return (
    <div className="card group overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
      <div className={`h-28 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${isB ? 'from-emerald-500/12 via-teal-500/8' : 'from-slate-500/10 via-gray-400/6'} to-transparent bg-surface-sunken`}>
        <div className="grid grid-cols-6 gap-1.5 opacity-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-5 rounded-sm" style={{ height: `${18 + (i % 3) * 10}px`, backgroundColor: accent, opacity: 0.35 }} />
          ))}
        </div>
        {isB && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-green text-white shadow-sm">
            Recommended
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[13.5px] font-semibold text-text-primary tracking-tight">{proposal.name}</h4>
          <span className="text-[11px] text-text-muted flex items-center gap-1">
            <Clock size={10} /> {proposal.updatedAt}
          </span>
        </div>
        <p className="text-[12px] text-text-secondary mt-1">{proposal.description}</p>

        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-surface">
            <Sun size={12} className="text-amber-500" />
            <p className="text-[12.5px] font-semibold text-text-primary tabular-nums">{proposal.metrics.sunHours}h</p>
          </div>
          <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-surface">
            <TreePine size={12} className="text-accent-green" />
            <p className="text-[12.5px] font-semibold text-text-primary tabular-nums">{proposal.metrics.greenCoverage}%</p>
          </div>
          <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-surface">
            <Leaf size={12} className="text-emerald-600" />
            <p className="text-[12.5px] font-semibold text-text-primary tabular-nums">{proposal.metrics.carbon}kt</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full mt-3.5 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-[12px] font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary hover:border-border-strong transition-colors"
        >
          Open <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
