import type { AnalysisType, UrbanMetric, AccessibilityMetric } from '../types'

export const analysisTypes: AnalysisType[] = [
  { id: 'sun', name: 'Sun Hours', icon: 'Sun', metric: 'Average Sun Exposure', value: '6.4 hrs', bestZone: 'South District', lowZone: 'North-East District', unit: 'hrs', description: 'Daily average direct sunlight hours across the site.' },
  { id: 'daylight', name: 'Daylight', icon: 'SunDim', metric: 'Daylight Factor', value: '78%', bestZone: 'Central Plaza', lowZone: 'West Corridor', unit: '%', description: 'Indoor natural light availability as percentage of outdoor illuminance.' },
  { id: 'wind', name: 'Wind', icon: 'Wind', metric: 'Avg Wind Speed', value: '3.2 m/s', bestZone: 'Open Fields', lowZone: 'Dense Blocks', unit: 'm/s', description: 'Pedestrian-level wind comfort and ventilation potential.' },
  { id: 'microclimate', name: 'Microclimate', icon: 'Thermometer', metric: 'Thermal Comfort', value: '24.6°C', bestZone: 'Lakeside', lowZone: 'Parking District', unit: '°C', description: 'Outdoor thermal comfort based on temperature, humidity, and shade.' },
  { id: 'noise', name: 'Noise', icon: 'Volume2', metric: 'Ambient Noise', value: '48 dB', bestZone: 'Park Zone', lowZone: 'Transit Corridor', unit: 'dB', description: 'Environmental noise levels from traffic and urban activity.' },
  { id: 'solar', name: 'Solar', icon: 'Zap', metric: 'Solar Potential', value: '5.1 GWh', bestZone: 'South Rooftops', lowZone: 'Shaded Blocks', unit: 'GWh', description: 'Annual photovoltaic energy generation potential across rooftops.' },
  { id: 'carbon', name: 'Carbon', icon: 'Leaf', metric: 'Embodied Carbon', value: '15.7 kt', bestZone: 'Timber Structures', lowZone: 'Steel Towers', unit: 'kt', description: 'Total embodied carbon in building materials and construction.' },
  { id: 'area', name: 'Area Metrics', icon: 'Maximize', metric: 'Floor Area Ratio', value: '2.4', bestZone: 'Commercial Core', lowZone: 'Residential Edge', unit: 'FAR', description: 'Density and land-use efficiency across zones.' },
]

export const urbanMetrics: UrbanMetric[] = [
  { name: 'Climate', score: 82, weight: 25, color: '#06b6d4' },
  { name: 'Energy', score: 88, weight: 20, color: '#f59e0b' },
  { name: 'Carbon', score: 91, weight: 20, color: '#22c55e' },
  { name: 'Mobility', score: 79, weight: 15, color: '#8b5cf6' },
  { name: 'Environment', score: 86, weight: 10, color: '#14b8a6' },
  { name: 'Accessibility', score: 83, weight: 10, color: '#f43f5e' },
]

export const accessibilityMetrics: AccessibilityMetric[] = [
  { name: 'Healthcare', coverage: 91, icon: 'Heart', color: '#ef4444' },
  { name: 'Education', coverage: 87, icon: 'GraduationCap', color: '#3b82f6' },
  { name: 'Transit', coverage: 94, icon: 'Train', color: '#8b5cf6' },
  { name: 'Parks', coverage: 96, icon: 'TreePine', color: '#22c55e' },
  { name: 'Retail', coverage: 82, icon: 'ShoppingBag', color: '#f59e0b' },
]
