import { Download, FileText, CheckCircle, Sparkle } from 'lucide-react'
import { urbanMetrics } from '../data/analysis'
import { ScoreRing } from '../components/common/ScoreRing'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

const comparisonData = [
  { metric: 'Sun Hours', a: 5.2, b: 6.8 },
  { metric: 'Daylight', a: 61, b: 74 },
  { metric: 'Solar', a: 4.2, b: 5.1 },
  { metric: 'Carbon', a: 18.4, b: 15.7 },
  { metric: 'Green', a: 24, b: 31 },
]

export function Reports() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-accent/10">
                <FileText size={15} className="text-accent" />
              </div>
              <h1 className="text-[22px] font-semibold text-text-primary tracking-tight">Project Report</h1>
            </div>
            <p className="text-[13px] text-text-secondary">Bhopal Sustainable District — Full Analysis Report</p>
          </div>
          <button
            onClick={() => toast.success('Report prepared successfully', { style: { fontSize: '13px' }, icon: <CheckCircle size={16} className="text-green-500" /> })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white text-[13px] font-medium hover:bg-accent-dim transition-colors shadow-sm"
          >
            <Download size={14} />
            Export Report
          </button>
        </div>

        <div className="card p-6">
          <h2 className="text-[15px] font-semibold text-text-primary tracking-tight mb-3">Executive Summary</h2>
          <p className="text-[13px] text-text-secondary leading-relaxed">
            The Bhopal Sustainable District project encompasses a 1.24 km² mixed-use development designed to accommodate approximately 32,400 residents. The site integrates 184 buildings with 31% green coverage, prioritizing pedestrian connectivity, renewable energy, and climate-responsive urban design. Analysis indicates strong performance across sustainability metrics, with Proposal B (Green Connected Layout) demonstrating measurable improvements over the conventional approach.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-[15px] font-semibold text-text-primary tracking-tight mb-4">Site Metrics</h2>
          <div className="grid grid-cols-4 gap-3.5">
            {[
              { label: 'Total Site Area', value: '1.24 km²' },
              { label: 'Total Buildings', value: '184' },
              { label: 'Green Coverage', value: '31%' },
              { label: 'Population Capacity', value: '32,400' },
              { label: 'Average Building Height', value: '26.4 m' },
              { label: 'Floor Area Ratio', value: '2.4' },
              { label: 'Transit Accessibility', value: '94%' },
              { label: 'Solar Potential', value: '5.1 GWh/yr' },
            ].map((item) => (
              <div key={item.label} className="py-3 px-4 rounded-xl bg-surface border border-border-subtle">
                <p className="text-[11px] text-text-muted">{item.label}</p>
                <p className="text-[15.5px] font-semibold text-text-primary mt-0.5 tracking-tight tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-[15px] font-semibold text-text-primary tracking-tight mb-4">Proposal Comparison</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} barGap={4}>
                <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <Bar dataKey="a" name="Proposal A" fill="#c7c6c0" radius={[5, 5, 0, 0]} />
                <Bar dataKey="b" name="Proposal B" fill="#3355e6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-[15px] font-semibold text-text-primary tracking-tight mb-4">Urban Resilience</h2>
          <div className="flex items-center gap-8">
            <ScoreRing score={84} size={100} strokeWidth={8} color="#3355e6" label="Overall Score" />
            <div className="flex-1 grid grid-cols-3 gap-3">
              {urbanMetrics.map((m) => (
                <div key={m.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[12px] text-text-secondary">{m.name}</span>
                  <span className="text-[12px] font-semibold text-text-primary ml-auto tabular-nums">{m.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6 mb-2">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkle size={13} className="text-accent-green" />
            <h2 className="text-[15px] font-semibold text-text-primary tracking-tight">Final Recommendation</h2>
          </div>
          <div className="px-4 py-3.5 rounded-xl bg-accent-green-light/60 border border-accent-green/15">
            <p className="text-[13px] text-accent-green font-semibold mb-1.5">Proposal B — Green Connected Layout</p>
            <p className="text-[12.5px] text-text-secondary leading-relaxed">
              Based on comprehensive analysis across all environmental and urban performance metrics, Proposal B demonstrates superior outcomes: +18% solar potential, +14% daylight access, -21% noise exposure, -16% carbon footprint, and +23% green coverage compared to the conventional layout. This proposal aligns with the project's sustainability goals and regulatory requirements.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-text-muted text-center pb-4">
          This report contains prototype data for demonstration purposes only.
        </p>
      </div>
    </div>
  )
}
