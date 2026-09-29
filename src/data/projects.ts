import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Bhopal Sustainable District',
    location: 'Bhopal, Madhya Pradesh',
    siteArea: '1.24 km²',
    buildings: 184,
    proposals: 3,
    lastUpdated: '2 hours ago',
    description: 'A mixed-use sustainable district integrating green infrastructure, smart mobility, and renewable energy systems.',
    thumbnail: 'bhopal',
  },
  {
    id: 'proj-2',
    name: 'Indore Green Corridor',
    location: 'Indore, Madhya Pradesh',
    siteArea: '0.86 km²',
    buildings: 112,
    proposals: 2,
    lastUpdated: '1 day ago',
    description: 'Linear park and transit-oriented development connecting major urban nodes.',
    thumbnail: 'indore',
  },
  {
    id: 'proj-3',
    name: 'Smart Commercial Hub',
    location: 'Pune, Maharashtra',
    siteArea: '0.52 km²',
    buildings: 67,
    proposals: 4,
    lastUpdated: '3 days ago',
    description: 'High-density commercial district with integrated smart infrastructure and carbon-neutral targets.',
    thumbnail: 'pune',
  },
]
