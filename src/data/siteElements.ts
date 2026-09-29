import type { Road, GreenSpace, WaterBody, TransitStop } from '../types'

export const roads: Road[] = [
  { id: 'r-1', points: [{ x: -150, y: 0 }, { x: 150, y: 0 }], width: 12, type: 'primary' },
  { id: 'r-2', points: [{ x: 0, y: -130 }, { x: 0, y: 130 }], width: 12, type: 'primary' },
  { id: 'r-3', points: [{ x: -150, y: 60 }, { x: 150, y: 60 }], width: 8, type: 'secondary' },
  { id: 'r-4', points: [{ x: -150, y: -60 }, { x: 150, y: -60 }], width: 8, type: 'secondary' },
  { id: 'r-5', points: [{ x: 60, y: -130 }, { x: 60, y: 130 }], width: 8, type: 'secondary' },
  { id: 'r-6', points: [{ x: -60, y: -130 }, { x: -60, y: 130 }], width: 8, type: 'secondary' },
  { id: 'r-7', points: [{ x: -40, y: 30 }, { x: 40, y: 30 }], width: 4, type: 'pedestrian' },
  { id: 'r-8', points: [{ x: -40, y: -30 }, { x: 40, y: -30 }], width: 4, type: 'pedestrian' },
]

export const greenSpaces: GreenSpace[] = [
  { id: 'g-1', name: 'Central Park', position: { x: -20, y: 30 }, width: 40, depth: 30, type: 'park' },
  { id: 'g-2', name: 'Lakeside Garden', position: { x: -80, y: 90 }, width: 30, depth: 25, type: 'garden' },
  { id: 'g-3', name: 'North Forest', position: { x: 30, y: -100 }, width: 50, depth: 35, type: 'forest' },
  { id: 'g-4', name: 'Wetland Reserve', position: { x: 100, y: 80 }, width: 35, depth: 20, type: 'wetland' },
  { id: 'g-5', name: 'Community Garden', position: { x: -110, y: -80 }, width: 25, depth: 20, type: 'garden' },
]

export const waterBodies: WaterBody[] = [
  { id: 'w-1', name: 'Central Lake', position: { x: -50, y: 60 }, width: 45, depth: 30 },
  { id: 'w-2', name: 'East Pond', position: { x: 110, y: -50 }, width: 25, depth: 20 },
]

export const transitStops: TransitStop[] = [
  { id: 't-1', name: 'Central Station', position: { x: 5, y: 5 }, type: 'metro' },
  { id: 't-2', name: 'South Hub', position: { x: 30, y: 85 }, type: 'bus' },
  { id: 't-3', name: 'North Terminal', position: { x: -20, y: -90 }, type: 'bus' },
  { id: 't-4', name: 'East Gate', position: { x: 120, y: 20 }, type: 'tram' },
  { id: 't-5', name: 'West Plaza', position: { x: -100, y: 10 }, type: 'bus' },
]
