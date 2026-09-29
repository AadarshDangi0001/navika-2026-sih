import { useState, useMemo } from 'react'
import { Sun, SunDim, Wind, Thermometer, Volume2, Zap, Leaf, Maximize, Info, TrendingUp, TrendingDown } from 'lucide-react'
import { analysisTypes } from '../data/analysis'
import { buildings } from '../data/buildings'
import { PageHeader } from '../components/common/PageHeader'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const iconMap: Record<string, typeof Sun> = { Sun, SunDim, Wind, Thermometer, Volume2, Zap, Leaf, Maximize }

function AnalysisHeatmap({ type }: { type: string }) {
  const getIntensity = (b: typeof buildings[0]) => {
    switch (type) {
      case 'sun': return b.sunHours / 8
      case 'daylight': return b.daylight / 100
      case 'noise': return b.noise / 70
      case 'solar': return b.solarPotential / 100
      case 'carbon': return b.embodiedCarbon / 2000
      case 'wind': return 0.4 + Math.random() * 0.4
      case 'microclimate': return 0.3 + Math.random() * 0.5
      default: return b.area / 2500
    }
  }

  const colorScale = (v: number, t: string) => {
    if (t === 'noise' || t === 'carbon') {
      const r = Math.round(50 + v * 200)
      const g = Math.round(200 - v * 150)
      return `rgb(${r}, ${g}, 80)`
    }
    const r = Math.round(40 + (1 - v) * 180)
    const g = Math.round(100 + v * 140)
    const b2 = Math.round(80 + v * 100)
    return `rgb(${r}, ${g}, ${b2})`
  }

  return (
    <div className="relative bg-surface-sunken overflow-hidden" style={{ height: 340 }}>
      <svg viewBox="0 0 400 350" className="w-full h-full">
        <defs>
          <pattern id="heatgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e1db" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="350" fill="url(#heatgrid)" />
        <rect x="30" y="15" width="340" height="320" fill="none" stroke="#c6c5bd" strokeWidth="1" strokeDasharray="4,2" rx="6" />

        {buildings.map((b) => {
          const intensity = getIntensity(b)
          const cx = 200 + b.position.x * 1.2
          const cy = 175 + b.position.y * 1.2
          return (
            <g key={b.id}>
              <rect
                x={cx - b.width * 0.6} y={cy - b.depth * 0.6}
                width={b.width * 1.2} height={b.depth * 1.2}
                fill={colorScale(intensity, type)} rx={2.5}
                opacity={0.85}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.5}
              />
              <text x={cx} y={cy + 3} textAnchor="middle" fontSize={6} fill="#16171c" opacity={0.75} fontWeight={600}>
                {b.id.replace('B-', '')}
              </text>
            </g>
          )
        })}

        {type === 'wind' && (
          <g opacity={0.45}>
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={60 + i * 40} y1={50} x2={90 + i * 40} y2={80} stroke="#3355e6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            ))}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3355e6" />
              </marker>
            </defs>
          </g>
        )}
      </svg>

      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-lg border border-border shadow-sm px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-2 rounded-full" style={{ background: type === 'noise' || type === 'carbon' ? 'linear-gradient(to right, #4ade80, #ef4444)' : 'linear-gradient(to right, #ef4444, #22c55e)' }} />
          <span className="text-[9px] font-medium text-text-muted">Low → High</span>
        </div>
      </div>
    </div>
  )
}

export function Analysis() {
  const [activeTab, setActiveTab] = useState('sun')
  const current = analysisTypes.find((a) => a.id === activeTab)!
  const Icon = iconMap[current.icon] || Sun

  const chartData = useMemo(() =>
    buildings.slice(0, 10).map((b) => {
      const valMap: Record<string, number> = {
        sun: b.sunHours, daylight: b.daylight, noise: b.noise,
        solar: b.solarPotential, carbon: b.embodiedCarbon / 100,
        wind: 2 + Math.random() * 3, microclimate: 22 + Math.random() * 6,
        area: b.area / 100,
      }
      return { name: b.id.replace('B-', ''), value: valMap[activeTab] || b.sunHours }
    }),
    [activeTab],
  )

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        <PageHeader title="Site Analysis" subtitle="Understand how your site performs across environmental and urban factors." />

        <div className="flex gap-1.5 flex-wrap p-1 bg-surface-sunken rounded-xl w-fit border border-border-subtle">
          {analysisTypes.map((a) => {
            const TabIcon = iconMap[a.icon] || Sun
            return (
              <button
                key={a.id}
                onClick={() => setActiveTab(a.id)}
                className={`flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[12px] font-medium transition-all duration-150 ${
                  activeTab === a.id
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <TabIcon size={13} className={activeTab === a.id ? 'text-accent' : ''} />
                {a.name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-[10px] bg-accent/10">
                <Icon size={17} className="text-accent" strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-[11px] text-text-muted">{current.metric}</p>
                <p className="text-[20px] font-semibold text-text-primary tracking-tight tabular-nums">{current.value}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp size={12} className="text-accent-green" />
              <p className="text-[11px] text-text-muted uppercase tracking-wide font-medium">Best Zone</p>
            </div>
            <p className="text-[15px] font-semibold text-accent-green">{current.bestZone}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingDown size={12} className="text-amber-500" />
              <p className="text-[11px] text-text-muted uppercase tracking-wide font-medium">Low Exposure</p>
            </div>
            <p className="text-[15px] font-semibold text-amber-600">{current.lowZone}</p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight">{current.name} Distribution</h3>
            <p className="text-[11.5px] text-text-muted">Spatial intensity across all buildings</p>
          </div>
          <AnalysisHeatmap type={activeTab} />
        </div>

        <div className="card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight">Building Comparison</h3>
          </div>
          <div className="p-5" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9d9ca3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#f5f5f2' }}
                  contentStyle={{ fontSize: '12px', borderRadius: '10px', border: '1px solid #e3e2dc', boxShadow: '0 8px 20px -6px rgba(20,20,25,0.12)' }}
                  labelStyle={{ fontWeight: 600, color: '#16171c' }}
                />
                <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? '#3355e6' : '#93a6f2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5 flex items-start gap-3 mb-2">
          <div className="p-1.5 rounded-lg bg-accent/10 mt-0.5">
            <Info size={13} className="text-accent" />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-text-primary mb-1">Insight</h3>
            <p className="text-[12.5px] text-text-secondary leading-relaxed">{current.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
