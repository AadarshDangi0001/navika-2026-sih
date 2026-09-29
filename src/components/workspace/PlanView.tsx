import { useRef, useState, useCallback, useEffect } from 'react'
import { buildings } from '../../data/buildings'
import { roads, greenSpaces, waterBodies, transitStops } from '../../data/siteElements'
import { useStore } from '../../store/useStore'

const SCALE = 1.8
const OFFSET = 200

function toSvg(x: number, y: number) {
  return { x: x * SCALE + OFFSET * SCALE, y: y * SCALE + OFFSET * SCALE }
}

export function PlanView() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 800, h: 700 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const { selectedBuilding, setSelectedBuilding, hoveredBuilding, setHoveredBuilding, layers, showSyncToast } = useStore()

  const handleBuildingClick = useCallback((building: typeof buildings[0]) => {
    setSelectedBuilding(building)
    showSyncToast()
  }, [setSelectedBuilding, showSyncToast])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9
    setViewBox((v) => {
      const newW = v.w * zoomFactor
      const newH = v.h * zoomFactor
      return { x: v.x + (v.w - newW) / 2, y: v.y + (v.h - newH) / 2, w: newW, h: newH }
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as Element).tagName === 'rect') {
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return
    const dx = (e.clientX - panStart.x) * (viewBox.w / 800)
    const dy = (e.clientY - panStart.y) * (viewBox.h / 700)
    setViewBox((v) => ({ ...v, x: v.x - dx, y: v.y - dy }))
    setPanStart({ x: e.clientX, y: e.clientY })
  }, [isPanning, panStart, viewBox])

  const handleMouseUp = useCallback(() => setIsPanning(false), [])

  useEffect(() => {
    if (selectedBuilding) {
      const pos = toSvg(selectedBuilding.position.x, selectedBuilding.position.y)
      setViewBox({ x: pos.x - 200, y: pos.y - 175, w: 400, h: 350 })
    }
  }, [selectedBuilding])

  return (
    <svg
      ref={svgRef}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      className="w-full h-full bg-[#efeee9] select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e1da" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect x={-500} y={-500} width={2000} height={2000} fill="url(#grid)" />

      {/* Site boundary */}
      <rect
        x={20} y={20}
        width={OFFSET * SCALE * 2 - 40} height={OFFSET * SCALE * 2 - 40}
        fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8,4" rx={8}
      />

      {/* Water */}
      {layers.find(l => l.id === 'water')?.visible && waterBodies.map((w) => {
        const pos = toSvg(w.position.x, w.position.y)
        return (
          <ellipse
            key={w.id}
            cx={pos.x} cy={pos.y}
            rx={w.width * SCALE / 2} ry={w.depth * SCALE / 2}
            fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" opacity={0.7}
          />
        )
      })}

      {/* Green spaces */}
      {layers.find(l => l.id === 'green')?.visible && greenSpaces.map((g) => {
        const pos = toSvg(g.position.x, g.position.y)
        const colors: Record<string, string> = { park: '#86efac', garden: '#6ee7b7', forest: '#4ade80', wetland: '#a7f3d0' }
        return (
          <rect
            key={g.id}
            x={pos.x - (g.width * SCALE) / 2} y={pos.y - (g.depth * SCALE) / 2}
            width={g.width * SCALE} height={g.depth * SCALE}
            fill={colors[g.type] || '#86efac'} rx={6} opacity={0.6}
          />
        )
      })}

      {/* Roads */}
      {layers.find(l => l.id === 'roads')?.visible && roads.map((r) => {
        const colors: Record<string, string> = { primary: '#cbd5e1', secondary: '#e2e8f0', pedestrian: '#fde68a' }
        const p1 = toSvg(r.points[0].x, r.points[0].y)
        const p2 = toSvg(r.points[1].x, r.points[1].y)
        return (
          <line
            key={r.id}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={colors[r.type]} strokeWidth={r.width * SCALE / 2}
            strokeLinecap="round"
          />
        )
      })}

      {/* Buildings */}
      {layers.find(l => l.id === 'buildings')?.visible && buildings.map((b) => {
        const pos = toSvg(b.position.x, b.position.y)
        const isSelected = selectedBuilding?.id === b.id
        const isHovered = hoveredBuilding === b.id
        return (
          <g key={b.id} className="cursor-pointer">
            <rect
              x={pos.x - (b.width * SCALE) / 2}
              y={pos.y - (b.depth * SCALE) / 2}
              width={b.width * SCALE}
              height={b.depth * SCALE}
              fill={isSelected ? '#3355e6' : isHovered ? '#7c93ee' : b.color}
              stroke={isSelected ? '#1e3bc4' : isHovered ? '#3355e6' : '#475569'}
              strokeWidth={isSelected ? 2.5 : 1}
              rx={3}
              opacity={isSelected ? 1 : isHovered ? 0.95 : 0.85}
              className="transition-all duration-150"
              onClick={() => handleBuildingClick(b)}
              onMouseEnter={() => setHoveredBuilding(b.id)}
              onMouseLeave={() => setHoveredBuilding(null)}
            />
            {viewBox.w < 600 && (
              <text
                x={pos.x} y={pos.y + 3}
                textAnchor="middle" fontSize={8}
                fill={isSelected ? '#fff' : '#1e293b'}
                className="pointer-events-none select-none"
                fontWeight={isSelected ? 600 : 400}
              >
                {b.id}
              </text>
            )}
          </g>
        )
      })}

      {/* Transit */}
      {layers.find(l => l.id === 'transit')?.visible && transitStops.map((t) => {
        const pos = toSvg(t.position.x, t.position.y)
        const colors: Record<string, string> = { metro: '#8b5cf6', bus: '#f59e0b', tram: '#06b6d4' }
        return (
          <g key={t.id}>
            <circle cx={pos.x} cy={pos.y} r={6} fill={colors[t.type]} stroke="#fff" strokeWidth={2} />
            {viewBox.w < 600 && (
              <text x={pos.x + 10} y={pos.y + 3} fontSize={7} fill="#6b7280">{t.name}</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
