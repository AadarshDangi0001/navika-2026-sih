import { X, Building2, Sun, Eye, Volume2, Zap, Leaf, Ruler, Layers, Box } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tabs = ['Overview', 'Environment', 'Energy', 'Carbon'] as const

const typeLabels: Record<string, string> = {
  residential: 'Residential', commercial: 'Commercial', mixed: 'Mixed-Use', institutional: 'Institutional', civic: 'Civic',
}

export function BuildingInspector() {
  const { selectedBuilding, setSelectedBuilding } = useStore()
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview')
  const navigate = useNavigate()

  if (!selectedBuilding) return null

  const b = selectedBuilding

  const infoItems = {
    Overview: [
      { icon: Ruler, label: 'Height', value: `${b.height} m` },
      { icon: Layers, label: 'Floors', value: `${b.floors}` },
      { icon: Building2, label: 'Footprint', value: `${b.area.toLocaleString()} m²` },
      { icon: Sun, label: 'Sun Exposure', value: `${b.sunHours} h` },
      { icon: Eye, label: 'Daylight', value: `${b.daylight}%` },
      { icon: Volume2, label: 'Noise', value: `${b.noise} dB` },
    ],
    Environment: [
      { icon: Sun, label: 'Sun Exposure', value: `${b.sunHours} h` },
      { icon: Eye, label: 'Daylight Factor', value: `${b.daylight}%` },
      { icon: Volume2, label: 'Ambient Noise', value: `${b.noise} dB` },
    ],
    Energy: [
      { icon: Zap, label: 'Solar Potential', value: `${b.solarPotential}%` },
      { icon: Sun, label: 'Annual Irradiance', value: `${(b.solarPotential * 12).toFixed(0)} kWh/m²` },
    ],
    Carbon: [
      { icon: Leaf, label: 'Embodied Carbon', value: `${b.embodiedCarbon.toLocaleString()} t` },
      { icon: Leaf, label: 'Operational Carbon', value: `${(b.embodiedCarbon * 0.15).toFixed(0)} t/yr` },
    ],
  }

  return (
    <div className="w-80 h-full bg-surface-raised border-l border-border flex flex-col overflow-hidden animate-fade-in-up">
      <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: b.color + '18' }}>
            <Box size={14} style={{ color: b.color }} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13.5px] font-semibold text-text-primary tracking-tight truncate">{b.name}</h3>
            <p className="text-[11px] text-text-muted">{b.id} · {typeLabels[b.type]}</p>
          </div>
        </div>
        <button onClick={() => setSelectedBuilding(null)} className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted transition-colors flex-shrink-0">
          <X size={14} />
        </button>
      </div>

      <div className="flex border-b border-border px-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-2.5 text-[11px] font-medium transition-colors ${
              activeTab === tab ? 'text-accent' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab}
            {activeTab === tab && <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-accent" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {infoItems[activeTab].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface hover:bg-surface-hover transition-colors">
            <div className="flex items-center gap-2.5">
              <item.icon size={13} className="text-text-muted" />
              <span className="text-[12px] text-text-secondary">{item.label}</span>
            </div>
            <span className="text-[13px] font-semibold text-text-primary tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => navigate('/twin')}
          className="w-full py-2.5 rounded-lg bg-accent text-white text-[12.5px] font-medium hover:bg-accent-dim transition-colors shadow-sm"
        >
          View in Digital Twin
        </button>
      </div>
    </div>
  )
}
