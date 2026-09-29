import { MapPin, Building2, TreePine, Users, TrendingUp, ArrowRight, Maximize2 } from 'lucide-react'
import { MetricCard } from '../components/common/MetricCard'
import { ProposalCard } from '../components/common/ProposalCard'
import { ScoreRing } from '../components/common/ScoreRing'
import { PageHeader } from '../components/common/PageHeader'
import { proposals } from '../data/proposals'
import { urbanMetrics } from '../data/analysis'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { buildings } from '../data/buildings'
import * as THREE from 'three'

function MiniCity() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 20, 10]} intensity={0.8} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#eeede8" />
      </mesh>
      {buildings.slice(0, 12).map((b) => (
        <mesh key={b.id} position={[b.position.x / 15, b.height / 12, b.position.y / 15]}>
          <boxGeometry args={[b.width / 15, b.height / 6, b.depth / 15]} />
          <meshStandardMaterial color={b.color} transparent opacity={0.85} />
        </mesh>
      ))}
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.5} />
      <Environment preset="city" />
    </>
  )
}

export function Overview() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-7">
        <PageHeader
          eyebrow="Prototype · Demo Data"
          title="Bhopal Sustainable District"
          subtitle="Smart Urban Planning & Performance Intelligence"
        />

        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Site Area" value="1.24 km²" icon={MapPin} color="#3355e6" trend="+4.2%" />
          <MetricCard label="Buildings" value="184" icon={Building2} color="#65646d" />
          <MetricCard label="Green Coverage" value="31%" icon={TreePine} color="#0d9668" trend="+2.1%" />
          <MetricCard label="Population Capacity" value="32.4K" icon={Users} color="#8b5cf6" />
        </div>

        <div className="card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-text-primary tracking-tight">City Preview</h2>
              <p className="text-[11.5px] text-text-muted">Live 3D digital twin snapshot</p>
            </div>
            <button
              onClick={() => navigate('/workspace')}
              className="flex items-center gap-1.5 text-[12px] font-medium text-accent hover:text-accent-dim transition-colors"
            >
              Open Workspace <ArrowRight size={12} />
            </button>
          </div>
          <div className="h-72 relative bg-surface-sunken">
            <Canvas camera={{ position: [18, 14, 18], fov: 45 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
              <MiniCity />
            </Canvas>
            <button
              onClick={() => navigate('/twin')}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-border shadow-sm hover:bg-white transition-colors"
            >
              <Maximize2 size={13} className="text-text-secondary" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-[14px] font-semibold text-text-primary tracking-tight">Urban Performance</h2>
            <button
              onClick={() => navigate('/intelligence')}
              className="text-[12px] font-medium text-accent hover:text-accent-dim transition-colors"
            >
              View Intelligence
            </button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {urbanMetrics.map((m) => (
              <div key={m.name} className="card flex flex-col items-center gap-2 p-4 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
                <ScoreRing score={m.score} size={64} strokeWidth={5} color={m.color} />
                <div className="text-center">
                  <p className="text-[11px] font-medium text-text-secondary">{m.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-2">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-[14px] font-semibold text-text-primary tracking-tight">Recent Proposals</h2>
            <button
              onClick={() => navigate('/proposals')}
              className="text-[12px] text-accent font-medium hover:text-accent-dim transition-colors flex items-center gap-1"
            >
              Compare All <TrendingUp size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {proposals.map((p) => (
              <ProposalCard key={p.id} proposal={p} onClick={() => navigate('/proposals')} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
