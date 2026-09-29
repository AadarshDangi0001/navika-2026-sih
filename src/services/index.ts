import { buildings } from '../data/buildings'
import { projects } from '../data/projects'
import { proposals } from '../data/proposals'
import { analysisTypes, urbanMetrics, accessibilityMetrics } from '../data/analysis'

export const formaService = {
  getBuildings: () => Promise.resolve(buildings),
  getBuildingById: (id: string) => Promise.resolve(buildings.find((b) => b.id === id) ?? null),
}

export const projectService = {
  getProjects: () => Promise.resolve(projects),
  getProjectById: (id: string) => Promise.resolve(projects.find((p) => p.id === id) ?? null),
}

export const analysisService = {
  getAnalysisTypes: () => Promise.resolve(analysisTypes),
  getUrbanMetrics: () => Promise.resolve(urbanMetrics),
  getAccessibilityMetrics: () => Promise.resolve(accessibilityMetrics),
}

export const proposalService = {
  getProposals: () => Promise.resolve(proposals),
  getProposalById: (id: string) => Promise.resolve(proposals.find((p) => p.id === id) ?? null),
}
