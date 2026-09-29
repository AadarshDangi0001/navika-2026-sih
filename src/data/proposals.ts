import type { Proposal } from '../types'

export const proposals: Proposal[] = [
  {
    id: 'prop-a',
    name: 'Proposal A',
    description: 'Conventional Urban Layout',
    updatedAt: '2 hours ago',
    metrics: {
      sunHours: 5.2,
      daylight: 61,
      solar: 4.2,
      carbon: 18.4,
      greenCoverage: 24,
      mobility: 72,
      climate: 68,
    },
  },
  {
    id: 'prop-b',
    name: 'Proposal B',
    description: 'Green Connected Layout',
    updatedAt: '45 min ago',
    metrics: {
      sunHours: 6.8,
      daylight: 74,
      solar: 5.1,
      carbon: 15.7,
      greenCoverage: 31,
      mobility: 84,
      climate: 81,
    },
  },
]
