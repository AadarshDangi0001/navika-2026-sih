import { create } from 'zustand'
import type { Building, Layer } from '../types'
import { defaultLayers } from '../data/layers'

interface AppState {
  selectedBuilding: Building | null
  setSelectedBuilding: (b: Building | null) => void
  hoveredBuilding: string | null
  setHoveredBuilding: (id: string | null) => void
  layers: Layer[]
  toggleLayer: (id: string) => void
  viewMode: '2d' | '3d'
  setViewMode: (mode: '2d' | '3d') => void
  activeAnalysis: string | null
  setActiveAnalysis: (id: string | null) => void
  activeProject: string
  setActiveProject: (id: string) => void
  syncToast: boolean
  showSyncToast: () => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  selectedBuilding: null,
  setSelectedBuilding: (b) => set({ selectedBuilding: b }),
  hoveredBuilding: null,
  setHoveredBuilding: (id) => set({ hoveredBuilding: id }),
  layers: defaultLayers,
  toggleLayer: (id) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    })),
  viewMode: '2d',
  setViewMode: (mode) => set({ viewMode: mode }),
  activeAnalysis: null,
  setActiveAnalysis: (id) => set({ activeAnalysis: id }),
  activeProject: 'proj-1',
  setActiveProject: (id) => set({ activeProject: id }),
  syncToast: false,
  showSyncToast: () => {
    set({ syncToast: true })
    setTimeout(() => set({ syncToast: false }), 2000)
  },
  sidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
}))
