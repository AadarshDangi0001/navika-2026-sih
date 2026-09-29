import { useState } from 'react'
import { urbanMetrics, accessibilityMetrics } from '../data/analysis'
import { ScoreRing } from '../components/common/ScoreRing'
import { PageHeader } from '../components/common/PageHeader'
import { ChevronDown, ChevronUp, Heart, GraduationCap, Train, TreePine, ShoppingBag, Info, Sparkles } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const iconMap: Record<string, typeof Heart> = { Heart, GraduationCap, Train, TreePine, ShoppingBag }

const overallScore = Math.round(
  urbanMetrics.reduce((sum, m) => sum + m.score * (m.weight / 100), 0),
)

const radarData = urbanMetrics.map((m) => ({ subject: m.name, value: m.score, fullMark: 100 }))

export function UrbanIntelligence() {
  const [calculationOpen, setCalculationOpen] = useState(false)

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        <PageHeader
          eyebrow="AI-Assisted Assessment"
          title="Urban Intelligence"
          subtitle="Comprehensive urban performance and resilience assessment."
        />

        <div className="card p-6">
          <div className="flex items-start gap-10">
            <div className="flex flex-col items-center flex-shrink-0">
              <ScoreRing score={overallScore} size={160} strokeWidth={10} color="#3355e6" />
              <p className="text-[13px] font-semibold text-text-primary mt-3 tracking-tight">Urban Resilience Index</p>
              <p className="text-[11px] text-text-muted">{overallScore} / 100 · Prototype Score</p>
            </div>

            <div className="flex-1 min-w-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e3e2dc" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#65646d' }} />
                    <PolarRadiusAxis tick={{ fontSize: 9, fill: '#9d9ca3' }} domain={[0, 100]} />
                    <Radar dataKey="value" stroke="#3355e6" fill="#3355e6" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 mt-6">
            {urbanMetrics.map((m) => (
              <div key={m.name} className="rounded-xl border border-border p-3.5 text-center hover:bg-surface hover:-translate-y-0.5 transition-all duration-200">
                <ScoreRing score={m.score} size={52} strokeWidth={4} color={m.color} />
                <p className="text-[11px] font-medium text-text-secondary mt-2.5">{m.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden">
          <button
            onClick={() => setCalculationOpen(!calculationOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-surface-hover/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info size={14} className="text-text-muted" />
              <span className="text-[13px] font-medium text-text-primary">How is this calculated?</span>
            </div>
            {calculationOpen ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
          </button>

          {calculationOpen && (
            <div className="px-5 pb-4 border-t border-border pt-3 animate-fade-in-up">
              <div className="space-y-1.5">
                {urbanMetrics.map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                      <span className="text-[12px] font-medium text-text-primary">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] text-text-muted tabular-nums">Score: {m.score}</span>
                      <span className="text-[12px] font-semibold text-text-primary tabular-nums">x {m.weight}%</span>
                      <span className="text-[12px] font-bold text-accent tabular-nums w-10 text-right">{(m.score * m.weight / 100).toFixed(1)}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 px-3 border-t border-border mt-1">
                  <span className="text-[13px] font-semibold text-text-primary">Total</span>
                  <span className="text-[15px] font-bold text-accent tabular-nums">{overallScore}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <h2 className="text-[14px] font-semibold text-text-primary tracking-tight">15-Minute City Accessibility</h2>
            <Sparkles size={12} className="text-accent" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {accessibilityMetrics.map((m) => {
              const Icon = iconMap[m.icon] || Heart
              return (
                <div key={m.name} className="card p-4 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: m.color + '18' }}>
                      <Icon size={14} style={{ color: m.color }} />
                    </div>
                    <span className="text-[12px] font-medium text-text-secondary">{m.name}</span>
                  </div>
                  <p className="text-2xl font-semibold text-text-primary tracking-tight tabular-nums">{m.coverage}%</p>
                  <div className="mt-2.5 h-1.5 bg-surface-sunken rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.coverage}%`, backgroundColor: m.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card overflow-hidden mb-2">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight">Accessibility Radius</h3>
            <p className="text-[11.5px] text-text-muted">Walk-time coverage from the site center</p>
          </div>
          <div className="relative bg-surface-sunken" style={{ height: 320 }}>
            <svg viewBox="0 0 500 320" className="w-full h-full">
              <defs>
                <pattern id="accgrid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e2e1db" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="500" height="320" fill="url(#accgrid)" />

              {[12, 9, 6, 3].map((r, i) => (
                <circle key={i} cx={250} cy={160} r={r * 12} fill="none" stroke="#c6c5bd" strokeDasharray="3,3" />
              ))}

              {accessibilityMetrics.map((m, i) => {
                const angle = (i / accessibilityMetrics.length) * Math.PI * 2 - Math.PI / 2
                const radius = (m.coverage / 100) * 120
                const x = 250 + Math.cos(angle) * radius
                const y = 160 + Math.sin(angle) * radius
                return (
                  <g key={m.name}>
                    <circle cx={x} cy={y} r={16} fill={m.color} opacity={0.18} />
                    <circle cx={x} cy={y} r={8} fill={m.color} opacity={0.65} />
                    <circle cx={x} cy={y} r={4} fill={m.color} stroke="white" strokeWidth={1} />
                    <text x={x} y={y + 28} textAnchor="middle" fontSize={9} fill="#65646d" fontWeight={600}>{m.name}</text>
                    <text x={x} y={y + 39} textAnchor="middle" fontSize={8} fill="#9d9ca3">{m.coverage}%</text>
                  </g>
                )
              })}

              <circle cx={250} cy={160} r={6} fill="#3355e6" stroke="white" strokeWidth={2} />
              <text x={250} y={200} textAnchor="middle" fontSize={9} fill="#65646d" fontWeight={500}>Site Center</text>

              {[5, 10, 15].map((mins, i) => (
                <text key={i} x={250 + (i + 1) * 36 + 12} y={163} fontSize={8} fill="#9d9ca3">{mins}min</text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
