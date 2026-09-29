export interface Building {
  id: string
  name: string
  position: { x: number; y: number }
  width: number
  depth: number
  height: number
  floors: number
  area: number
  sunHours: number
  daylight: number
  noise: number
  solarPotential: number
  embodiedCarbon: number
  type: 'residential' | 'commercial' | 'mixed' | 'institutional' | 'civic'
  color: string
}

export interface Road {
  id: string
  points: { x: number; y: number }[]
  width: number
  type: 'primary' | 'secondary' | 'pedestrian'
}

export interface GreenSpace {
  id: string
  name: string
  position: { x: number; y: number }
  width: number
  depth: number
  type: 'park' | 'garden' | 'forest' | 'wetland'
}

export interface WaterBody {
  id: string
  name: string
  position: { x: number; y: number }
  width: number
  depth: number
}

export interface TransitStop {
  id: string
  name: string
  position: { x: number; y: number }
  type: 'bus' | 'metro' | 'tram'
}

export interface Project {
  id: string
  name: string
  location: string
  siteArea: string
  buildings: number
  proposals: number
  lastUpdated: string
  description: string
  thumbnail: string
}

export interface Proposal {
  id: string
  name: string
  description: string
  updatedAt: string
  metrics: {
    sunHours: number
    daylight: number
    solar: number
    carbon: number
    greenCoverage: number
    mobility: number
    climate: number
  }
}

export interface AnalysisType {
  id: string
  name: string
  icon: string
  metric: string
  value: string
  bestZone: string
  lowZone: string
  unit: string
  description: string
}

export interface UrbanMetric {
  name: string
  score: number
  weight: number
  color: string
}

export interface AccessibilityMetric {
  name: string
  coverage: number
  icon: string
  color: string
}

export interface Layer {
  id: string
  name: string
  visible: boolean
  color: string
}
