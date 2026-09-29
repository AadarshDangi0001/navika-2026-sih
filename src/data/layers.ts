import type { Layer } from '../types'

export const defaultLayers: Layer[] = [
  { id: 'buildings', name: 'Buildings', visible: true, color: '#64748b' },
  { id: 'roads', name: 'Roads', visible: true, color: '#94a3b8' },
  { id: 'green', name: 'Green Spaces', visible: true, color: '#22c55e' },
  { id: 'parking', name: 'Parking', visible: true, color: '#a855f7' },
  { id: 'transit', name: 'Transit', visible: true, color: '#f59e0b' },
  { id: 'water', name: 'Water', visible: true, color: '#38bdf8' },
  { id: 'pedestrian', name: 'Pedestrian Paths', visible: true, color: '#fb923c' },
]
