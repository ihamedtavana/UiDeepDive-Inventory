import nyc from '../assets/warehouse-switch/imgImage236.png'
import fra from '../assets/warehouse-switch/imgImage237.png'
import lon from '../assets/warehouse-switch/imgImage238.png'
import tyo from '../assets/warehouse-switch/imgImage239.png'
import ruh from '../assets/warehouse-switch/imgImage240.png'

export type WarehouseRecord = { id: string; name: string; city: string; location: string; shelves: number; low: number; out: number; image: string; point: [number, number]; isDisabled?: boolean }
// Names, imagery, stock badges and projected marker positions from Final / Warehouse Switch.
export const warehouseCatalog: WarehouseRecord[] = [
  { id: 'nyc', name: 'New York Central', city: 'New York', location: 'New York, United States', shelves: 16, low: 2, out: 1, image: nyc, point: [279.6, 319.6] },
  { id: 'fra', name: 'Frankfurt Hub', city: 'Frankfurt', location: 'Frankfurt, Germany', shelves: 12, low: 3, out: 0, image: fra, point: [550.3, 281.3] },
  { id: 'lon', name: 'London Warehouse', city: 'London', location: 'London, United Kingdom', shelves: 10, low: 1, out: 2, image: lon, point: [522.7, 275.8] },
  { id: 'tyo', name: 'Tokyo Distribution Center', city: 'Tokyo', location: 'Tokyo, Japan', shelves: 20, low: 4, out: 1, image: tyo, point: [992.4, 340.5] },
  { id: 'ruh', name: 'Riyadh Warehouse', city: 'Riyadh', location: 'Riyadh, Saudi Arabia', shelves: 8, low: 0, out: 0, image: ruh, point: [685.3, 386.2] },
]
export const warehouseById = (id: string) => warehouseCatalog.find(w => w.id === id)
export const dashboardPath = (id: string) => `/warehouses/${id}/dashboard`
export const switchPath = (id: string) => `/warehouses/${id}/switch`
