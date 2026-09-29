import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei'
import { buildings } from '../data/buildings'
import { greenSpaces, waterBodies, roads } from '../data/siteElements'
import { useStore } from '../store/useStore'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Building2, TreePine, Volume2, Wind, Thermometer, Zap, Maximize, RotateCcw, Search, X } from 'lucide-react'
import * as THREE from 'three'

type TwinLayer = 'buildings' | 'roads' | 'green' | 'solar' | 'noise' | 'wind' | 'climate'

const layerConfig: { id: TwinLayer; label: string; icon: typeof Building2 }[] = [
  { id: 'buildings', label: 'Buildings', icon: Building2 },
  { id: 'roads', label: 'Roads', icon: Building2 },
  { id: 'green', label: 'Green', icon: TreePine },
  { id: 'solar', label: 'Solar', icon: Zap },
  { id: 'noise', label: 'Noise', icon: Volume2 },
  { id: 'wind', label: 'Wind', icon: Wind },
  { id: 'climate', label: 'Climate', icon: Thermometer },
]

function getAnalysisColor(building: typeof buildings[0], layer: TwinLayer): string {
  switch (layer) {
    case 'solar': {
      const t = building.solarPotential / 100
      return `rgb(${Math.round(255 * t)}, ${Math.round(180 * t)}, ${Math.round(50)})`
    }
    case 'noise': {
      const t = building.noise / 70
      return `rgb(${Math.round(50 + 200 * t)}, ${Math.round(200 - 150 * t)}, 80)`
    }
    case 'wind':
      return `hsl(${200 + Math.random() * 40}, 60%, 55%)`
    case 'climate': {
      const t = (building.sunHours - 5) / 3
      return `rgb(${Math.round(80 + 175 * t)}, ${Math.round(120 - 40 * t)}, ${Math.round(200 - 120 * t)})`
    }
    default:
      return building.color
  }
}

function TwinBuilding({ building, activeLayer, isSelected, isHovered, onClick, onHover, onUnhover }: {
  building: typeof buildings[0]
  activeLayer: TwinLayer
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onHover: () => void
  onUnhover: () => void
}) {
  const height = building.height / 4
  const color = useMemo(() => {
    if (isSelected) return '#3355e6'
    if (isHovered) return '#7c93ee'
    if (['solar', 'noise', 'wind', 'climate'].includes(activeLayer)) return getAnalysisColor(building, activeLayer)
    return building.color
  }, [isSelected, isHovered, activeLayer, building])

  return (
    <mesh
      position={[building.position.x / 10, height / 2, building.position.y / 10]}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={(e) => { e.stopPropagation(); onHover() }}
      onPointerOut={onUnhover}
      castShadow receiveShadow
    >
      <boxGeometry args={[building.width / 10, height, building.depth / 10]} />
      <meshStandardMaterial color={color} metalness={0.15} roughness={0.6} transparent opacity={isSelected ? 1 : 0.88} />
      {isSelected && (
        <Html position={[0, height / 2 + 1, 0]} center>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 px-3 py-2 whitespace-nowrap pointer-events-none">
            <p className="text-xs font-semibold text-gray-900">{building.name}</p>
            <p className="text-[10px] text-gray-500">{building.id} · {building.floors}F · {building.height}m</p>
          </div>
        </Html>
      )}
    </mesh>
  )
}

function TwinScene({ activeLayer }: { activeLayer: TwinLayer }) {
  const { selectedBuilding, setSelectedBuilding, hoveredBuilding, setHoveredBuilding } = useStore()
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (selectedBuilding && controlsRef.current) {
      const target = new THREE.Vector3(selectedBuilding.position.x / 10, selectedBuilding.height / 8, selectedBuilding.position.y / 10)
      controlsRef.current.target.lerp(target, 0.5)
      controlsRef.current.update()
    }
  }, [selectedBuilding])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[25, 35, 15]} intensity={1.2} castShadow shadow-mapSize={2048} />
      <directionalLight position={[-15, 25, -15]} intensity={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#e8ecf0" />
      </mesh>

      {(activeLayer === 'roads' || activeLayer === 'buildings') && roads.map((r) => {
        const p1 = { x: r.points[0].x / 10, z: r.points[0].y / 10 }
        const p2 = { x: r.points[1].x / 10, z: r.points[1].y / 10 }
        const dx = p2.x - p1.x; const dz = p2.z - p1.z
        const length = Math.sqrt(dx * dx + dz * dz)
        const angle = Math.atan2(dz, dx)
        return (
          <mesh key={r.id} position={[(p1.x + p2.x) / 2, 0.02, (p1.z + p2.z) / 2]} rotation={[-Math.PI / 2, 0, -angle]}>
            <planeGeometry args={[length, r.width / 12]} />
            <meshStandardMaterial color={r.type === 'primary' ? '#94a3b8' : '#cbd5e1'} />
          </mesh>
        )
      })}

      {(activeLayer === 'green' || activeLayer === 'buildings') && greenSpaces.map((g) => (
        <group key={g.id}>
          <mesh position={[g.position.x / 10, 0.03, g.position.y / 10]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[g.width / 10, g.depth / 10]} />
            <meshStandardMaterial color="#86efac" transparent opacity={0.7} />
          </mesh>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={i} position={[g.position.x / 10 + (i - 1) * 1.2, 0.7, g.position.y / 10]}>
              <sphereGeometry args={[0.5, 8, 6]} />
              <meshStandardMaterial color="#22c55e" transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {waterBodies.map((w) => (
        <mesh key={w.id} position={[w.position.x / 10, 0.04, w.position.y / 10]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[w.width / 15, 32]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} metalness={0.3} roughness={0.2} />
        </mesh>
      ))}

      {buildings.map((b) => (
        <TwinBuilding
          key={b.id}
          building={b}
          activeLayer={activeLayer}
          isSelected={selectedBuilding?.id === b.id}
          isHovered={hoveredBuilding === b.id}
          onClick={() => setSelectedBuilding(b)}
          onHover={() => setHoveredBuilding(b.id)}
          onUnhover={() => setHoveredBuilding(null)}
        />
      ))}

      <ContactShadows position={[0, -0.01, 0]} opacity={0.25} scale={80} blur={2} />
      <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.1} minDistance={5} maxDistance={70} maxPolarAngle={Math.PI / 2.2} />
      <Environment preset="city" />
    </>
  )
}

export function DigitalTwin() {
  const [activeLayer, setActiveLayer] = useState<TwinLayer>('buildings')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { selectedBuilding, setSelectedBuilding } = useStore()

  const filteredBuildings = buildings.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 flex items-center justify-between px-5 bg-surface-raised border-b border-border">
        <div>
          <h1 className="text-[14px] font-semibold text-text-primary tracking-tight">Digital Twin</h1>
          <p className="text-[11px] text-text-muted">Explore your city as an interactive spatial model.</p>
        </div>
        <div className="flex items-center gap-1">
          {searchOpen ? (
            <div className="relative">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search buildings..."
                className="text-[12px] px-3 py-[7px] rounded-lg border border-accent/40 ring-4 ring-accent/[0.08] bg-surface w-52 outline-none"
              />
              {searchQuery && (
                <div className="absolute top-full mt-1.5 w-full bg-surface-raised border border-border rounded-xl shadow-[var(--shadow-panel)] max-h-48 overflow-y-auto z-20 p-1">
                  {filteredBuildings.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { setSelectedBuilding(b); setSearchQuery(''); setSearchOpen(false) }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-[12px] hover:bg-surface-hover transition-colors"
                    >
                      <span className="font-medium text-text-primary">{b.name}</span>
                      <span className="text-text-muted ml-1.5">{b.id}</span>
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <X size={12} className="text-text-muted" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors"><Search size={14} /></button>
          )}
          <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors"><RotateCcw size={14} /></button>
          <div className="w-px h-4 bg-border mx-1" />
          <button onClick={() => document.documentElement.requestFullscreen?.()} className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors"><Maximize size={14} /></button>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-3 left-3 z-10 flex gap-1 bg-surface-raised/95 backdrop-blur-md rounded-xl border border-border p-1 shadow-[var(--shadow-panel)]">
          {layerConfig.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[11px] font-medium transition-all duration-150 ${
                activeLayer === l.id ? 'bg-text-primary text-white' : 'text-text-secondary hover:bg-surface-hover'
              }`}
            >
              <l.icon size={12} />
              {l.label}
            </button>
          ))}
        </div>

        {selectedBuilding && (
          <div className="absolute top-3 right-3 z-10 w-64 bg-surface-raised/95 backdrop-blur-md rounded-xl border border-border shadow-[var(--shadow-panel)] p-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[13px] font-semibold text-text-primary tracking-tight">{selectedBuilding.name}</h4>
              <button onClick={() => setSelectedBuilding(null)} className="p-1 rounded hover:bg-surface-hover transition-colors"><X size={12} className="text-text-muted" /></button>
            </div>
            <div className="space-y-1.5 text-[12px]">
              {[
                ['Height', `${selectedBuilding.height} m`],
                ['Floors', `${selectedBuilding.floors}`],
                ['Area', `${selectedBuilding.area.toLocaleString()} m²`],
                ['Solar', `${selectedBuilding.solarPotential}%`],
                ['Noise', `${selectedBuilding.noise} dB`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-surface">
                  <span className="text-text-muted">{label}</span>
                  <span className="font-semibold text-text-primary tabular-nums">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Canvas shadows camera={{ position: [30, 22, 30], fov: 45 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
          <TwinScene activeLayer={activeLayer} />
        </Canvas>
      </div>
    </div>
  )
}
