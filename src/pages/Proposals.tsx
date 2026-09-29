import { proposals } from '../data/proposals'
import { PageHeader } from '../components/common/PageHeader'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react'

const comparisonData = [
  { metric: 'Sun Hours', a: 5.2, b: 6.8, unit: 'h' },
  { metric: 'Daylight', a: 61, b: 74, unit: '%' },
  { metric: 'Solar', a: 4.2, b: 5.1, unit: 'GWh' },
  { metric: 'Carbon', a: 18.4, b: 15.7, unit: 'kt' },
  { metric: 'Green Coverage', a: 24, b: 31, unit: '%' },
  { metric: 'Mobility', a: 72, b: 84, unit: '' },
  { metric: 'Climate', a: 68, b: 81, unit: '' },
]

const keyDifferences = [
  '+18% solar potential',
  '+14% daylight',
  '-21% noise exposure',
  '-16% carbon impact',
  '+23% green coverage',
]

const chartData = comparisonData.map((d) => ({
  name: d.metric,
  'Proposal A': d.a,
  'Proposal B': d.b,
}))

export function Proposals() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        <PageHeader title="Compare Proposals" subtitle="Side-by-side evaluation of urban design alternatives." />

        <div className="grid grid-cols-2 gap-5">
          {proposals.map((p) => {
            const isB = p.id === 'prop-b'
            return (
              <div key={p.id} className={`card overflow-hidden ${isB ? 'ring-1 ring-accent-green/25' : ''}`}>
                <div className={`h-32 flex items-center justify-center relative overflow-hidden bg-surface-sunken bg-gradient-to-br ${isB ? 'from-emerald-500/12 via-teal-500/8' : 'from-slate-500/10 via-gray-400/6'} to-transparent`}>
                  <div className="grid grid-cols-8 gap-1.5 opacity-50">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-5 rounded-sm" style={{ height: `${16 + (i % 3) * 8}px`, backgroundColor: isB ? '#0d9668' : '#65646d', opacity: 0.35 }} />
                    ))}
                  </div>
                  {isB && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-green text-white shadow-sm">
                      <CheckCircle2 size={10} /> Recommended
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-[14.5px] font-semibold text-text-primary tracking-tight">{p.name}</h3>
                  <p className="text-[12px] text-text-secondary mt-0.5">{p.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight">Metric Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Metric</th>
                  <th className="text-right px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Proposal A</th>
                  <th className="text-right px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Proposal B</th>
                  <th className="text-right px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Diff</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((d) => {
                  const diff = d.b - d.a
                  const isLowerBetter = d.metric === 'Carbon'
                  const isPositive = isLowerBetter ? diff < 0 : diff > 0
                  return (
                    <tr key={d.metric} className="border-b border-border-subtle hover:bg-surface/60 transition-colors">
                      <td className="px-5 py-3 text-[13px] font-medium text-text-primary">{d.metric}</td>
                      <td className="px-5 py-3 text-[13px] text-right text-text-secondary tabular-nums">{d.a} {d.unit}</td>
                      <td className="px-5 py-3 text-[13px] text-right font-semibold text-text-primary tabular-nums">{d.b} {d.unit}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {diff > 0 ? '+' : ''}{diff.toFixed(1)}{d.unit}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight">Performance Comparison</h3>
          </div>
          <div className="p-5" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f5f5f2' }} contentStyle={{ fontSize: '12px', borderRadius: '10px', border: '1px solid #e3e2dc', boxShadow: '0 8px 20px -6px rgba(20,20,25,0.12)' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Proposal A" fill="#c7c6c0" radius={[5, 5, 0, 0]} />
                <Bar dataKey="Proposal B" fill="#3355e6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5 mb-2">
          <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight mb-3">Key Differences</h3>
          <div className="grid grid-cols-5 gap-3">
            {keyDifferences.map((text) => (
              <div key={text} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-accent-green-light/60 border border-accent-green/10">
                <TrendingUp size={13} className="text-accent-green flex-shrink-0" />
                <span className="text-[12px] font-medium text-accent-green">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
