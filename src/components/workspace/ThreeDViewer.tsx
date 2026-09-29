import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { buildings } from '../../data/buildings'
import { greenSpaces, waterBodies, roads } from '../../data/siteElements'
import { useStore } from '../../store/useStore'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

function CityBuilding({ building, isSelected, isHovered, onClick, onHover, onUnhover }: {
  building: typeof buildings[0]
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onHover: () => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const height = building.height / 4

  const color = useMemo(() => {
    if (isSelected) return '#3355e6'
    if (isHovered) return '#7c93ee'
    return building.color
  }, [isSelected, isHovered, building.color])

  return (
    <mesh
      ref={meshRef}
      position={[building.position.x / 10, height / 2, building.position.y / 10]}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={(e) => { e.stopPropagation(); onHover() }}
      onPointerOut={onUnhover}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[building.width / 10, height, building.depth / 10]} />
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.7}
        transparent
        opacity={isSelected ? 1 : 0.9}
      />
      {/* Roof line */}
      <lineSegments position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(building.width / 10, 0.05, building.depth / 10)]} />
        <lineBasicMaterial color={isSelected ? '#1e3bc4' : '#475569'} transparent opacity={0.5} />
      </lineSegments>
    </mesh>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#e8ecf0" />
    </mesh>
  )
}

function Roads3D() {
  return (
    <group>
      {roads.map((r) => {
        const p1 = { x: r.points[0].x / 10, z: r.points[0].y / 10 }
        const p2 = { x: r.points[1].x / 10, z: r.points[1].y / 10 }
        const dx = p2.x - p1.x
        const dz = p2.z - p1.z
        const length = Math.sqrt(dx * dx + dz * dz)
        const angle = Math.atan2(dz, dx)
        const colors: Record<string, string> = { primary: '#94a3b8', secondary: '#cbd5e1', pedestrian: '#fde68a' }
        return (
          <mesh
            key={r.id}
            position={[(p1.x + p2.x) / 2, 0.02, (p1.z + p2.z) / 2]}
            rotation={[-Math.PI / 2, 0, -angle]}
            receiveShadow
          >
            <planeGeometry args={[length, r.width / 12]} />
            <meshStandardMaterial color={colors[r.type]} />
          </mesh>
        )
      })}
    </group>
  )
}

function Parks3D() {
  return (
    <group>
      {greenSpaces.map((g) => (
        <group key={g.id}>
          <mesh
            position={[g.position.x / 10, 0.03, g.position.y / 10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[g.width / 10, g.depth / 10]} />
            <meshStandardMaterial color="#86efac" transparent opacity={0.7} />
          </mesh>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                g.position.x / 10 + (i % 2 === 0 ? -1 : 1) * (g.width / 40),
                0.6,
                g.position.y / 10 + (i < 2 ? -1 : 1) * (g.depth / 40),
              ]}
            >
              <sphereGeometry args={[0.5, 8, 8]} />
              <meshStandardMaterial color="#22c55e" transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Water3D() {
  return (
    <group>
      {waterBodies.map((w) => (
        <mesh
          key={w.id}
          position={[w.position.x / 10, 0.04, w.position.y / 10]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[w.width / 15, 32]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} metalness={0.3} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  const { selectedBuilding, setSelectedBuilding, hoveredBuilding, setHoveredBuilding, showSyncToast } = useStore()
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (selectedBuilding && controlsRef.current) {
      const target = new THREE.Vector3(
        selectedBuilding.position.x / 10,
        selectedBuilding.height / 8,
        selectedBuilding.position.y / 10,
      )
      controlsRef.current.target.lerp(target, 0.5)
      controlsRef.current.update()
    }
  }, [selectedBuilding])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[20, 30, 10]} intensity={1} castShadow shadow-mapSize={2048} />
      <directionalLight position={[-10, 20, -10]} intensity={0.3} />

      <Ground />
      <Roads3D />
      <Parks3D />
      <Water3D />

      {buildings.map((b) => (
        <CityBuilding
          key={b.id}
          building={b}
          isSelected={selectedBuilding?.id === b.id}
          isHovered={hoveredBuilding === b.id}
          onClick={() => { setSelectedBuilding(b); showSyncToast() }}
          onHover={() => setHoveredBuilding(b.id)}
          onUnhover={() => setHoveredBuilding(null)}
        />
      ))}

      <ContactShadows position={[0, -0.01, 0]} opacity={0.3} scale={80} blur={2} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.1}
        minDistance={5}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2.2}
      />
      <Environment preset="city" />
    </>
  )
}

export function ThreeDViewer() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [25, 20, 25], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
