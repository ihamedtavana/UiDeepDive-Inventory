import gpu from '../assets/wh4_imgAsusDualFanGraphicsCardRender2.png'
import motherboard from '../assets/raw0_0.png'
import ram1 from '../assets/raw1_0.png'
import ram2 from '../assets/raw2_0.png'
import cpu from '../assets/raw3_0.png'
import { warehouseCatalog as warehouses } from './warehouseCatalog'
import { INVENTORY_CATALOG, SHELF_CATALOG } from './inventoryCatalog'

export const WAREHOUSES = warehouses.map(warehouse => warehouse.name)
export const BIN_CAPACITY = 24
export const UNDO_WINDOW = 10 * 60 * 1000
const STORAGE_KEY = 'ui-deep-core.stock-deliveries.v1'

export type StockProduct = {
  name: string
  category: string
  sku: string
  defaultBin: string
  image: string
  minimum: number
}

export const RESTOCK_PRODUCTS: StockProduct[] = [
  { name: 'GeForce RTX 4070 Super', category: 'Graphics Cards', sku: 'GPU-0107', defaultBin: 'A1-L2-S3', image: gpu, minimum: 3 },
  { name: 'PRO Z790-A', category: 'Motherboards', sku: 'MBD-0104', defaultBin: 'A3-L3-S4', image: motherboard, minimum: 3 },
  { name: 'Kingston Fury Beast RGB DDR5', category: 'RAM', sku: 'RAM-0105', defaultBin: 'B1-L2-S1', image: ram1, minimum: 3 },
  { name: 'Corsair Vengeance RGB DDR5', category: 'RAM', sku: 'RAM-0110', defaultBin: 'B1-L1-S2', image: ram2, minimum: 3 },
  { name: 'Ryzen 7 7800X3D', category: 'Processors', sku: 'CPU-0108', defaultBin: 'A2-L2-S4', image: cpu, minimum: 3 },
]

export const STOCK_SHELVES = [
  { code: 'A1', category: 'Graphics Cards' },
  { code: 'A2', category: 'Processors' },
  { code: 'A3', category: 'Motherboards' },
  { code: 'B1', category: 'RAM' },
  { code: 'B2', category: 'Storage' },
  { code: 'B3', category: 'Power Supplies' },
  { code: 'C1', category: 'PC Cases' },
  { code: 'C2', category: 'Cooling Systems' },
]

export type StockDetails = {
  supplier: string
  reference: string
  receivedOn: string
  batch: string
  note: string
}
export type Allocation = { bin: string; quantity: number }
export type StockDelivery = {
  id: string
  sku: string
  warehouse: string
  shelf: string
  allocations: Allocation[]
  details: StockDetails
  savedAt: number
}
export type StockBin = { id: string; label: string; used: number; room: number }
export type StockMode = 'quick' | 'detailed'

export function shelfLabel(code: string) {
  const shelf = STOCK_SHELVES.find(item => item.code === code)
  return shelf ? shelf.code + ' · ' + shelf.category : code
}

export function stockCount(deliveries: StockDelivery[], sku: string, warehouse: string) {
  const product = INVENTORY_CATALOG.find(item => item.sku === sku)
  const recorded = deliveries.filter(item => item.warehouse === warehouse).flatMap(item => item.allocations)
  const allocated = recorded.filter(item => item.bin === product?.defaultBin).reduce((sum, item) => sum + item.quantity, 0)
  const initial = (warehouse === WAREHOUSES[0] || warehouse === 'Frankfurt Hub') ? Math.min(product?.initial ?? 0, Math.max(0, BIN_CAPACITY - allocated)) : 0
  return initial + deliveries.filter(item => item.sku === sku && item.warehouse === warehouse)
    .flatMap(item => item.allocations).reduce((total, allocation) => total + allocation.quantity, 0)
}

export function stockTone(quantity: number, minimum: number) {
  if (quantity === 0) return { tone: 'error', label: 'Out Of Stock' } as const
  if (quantity < minimum) return { tone: 'warning', label: 'Low Stock' } as const
  return { tone: 'success', label: 'In Stock' } as const
}

export function shelfBins(deliveries: StockDelivery[], warehouse: string, shelf: string): StockBin[] {
  const allocations = deliveries.filter(item => item.warehouse === warehouse && item.shelf === shelf).flatMap(item => item.allocations)
  return Array.from({ length: 12 }, (_, index) => {
    const label = 'S' + (index % 4 + 1)
    const id = shelf + '-L' + (3 - Math.floor(index / 4)) + '-' + label
    const added = allocations.filter(item => item.bin === id).reduce((total, item) => total + item.quantity, 0)
    const seed = INVENTORY_CATALOG.find(product => product.defaultBin === id)?.initial ?? 0
    // Existing saved deliveries take precedence when introducing the seeded inventory.
    const initial = (warehouse === WAREHOUSES[0] || warehouse === 'Frankfurt Hub') ? Math.min(seed, Math.max(0, BIN_CAPACITY - added)) : 0
    const used = initial + added
    return { id, label, used, room: Math.max(0, BIN_CAPACITY - used) }
  })
}

export function inventoryBins(deliveries: StockDelivery[], warehouse: string, shelf?: string) {
  return SHELF_CATALOG.filter(item => !shelf || item.code === shelf).flatMap(item =>
    shelfBins(deliveries, warehouse, item.code).map(bin => {
      const product = INVENTORY_CATALOG.find(product => product.defaultBin === bin.id)!
      const receipts = deliveries.filter(delivery => delivery.warehouse === warehouse)
        .flatMap(delivery => delivery.allocations.filter(allocation => allocation.bin === bin.id).map(allocation => ({ sku: delivery.sku, quantity: allocation.quantity })))
      const initial = bin.used - receipts.reduce((sum, receipt) => sum + receipt.quantity, 0)
      const contents = new Map<string, number>(initial ? [[product.sku, initial]] : [])
      for (const receipt of receipts) contents.set(receipt.sku, (contents.get(receipt.sku) ?? 0) + receipt.quantity)
      const primaryProduct = initial ? product : INVENTORY_CATALOG.find(item => item.sku === contents.keys().next().value) ?? product
      return { ...bin, product: primaryProduct, contents: [...contents].map(([sku, quantity]) => ({ sku, quantity })) }
    }),
  )
}

export function productSummary(deliveries: StockDelivery[], warehouse: string) {
  const quantities = INVENTORY_CATALOG.map(product => ({ quantity: stockCount(deliveries, product.sku, warehouse), minimum: product.minimum }))
  const out = quantities.filter(product => product.quantity === 0).length
  const low = quantities.filter(product => product.quantity > 0 && product.quantity < product.minimum).length
  return { out, low, inStock: quantities.length - out - low }
}

export function inventorySummary(deliveries: StockDelivery[], warehouse: string, shelf?: string) {
  const bins = inventoryBins(deliveries, warehouse, shelf)
  const used = bins.reduce((total, bin) => total + bin.used, 0)
  const capacity = bins.length * BIN_CAPACITY
  const out = bins.filter(bin => bin.used === 0).length
  const low = bins.filter(bin => bin.used > 0 && bin.used < bin.product.minimum).length
  const full = bins.filter(bin => bin.used === BIN_CAPACITY).length
  return { bins, used, capacity, out, low, full, inStock: bins.length - out - low - full, percentage: capacity ? Math.round(used / capacity * 100) : 0 }
}

export function currentDeliveries(deliveries: StockDelivery[], warehouse: string, period: 'Today' | '7 days' | '30 days' | '90 days') {
  const days = { Today: 1, '7 days': 7, '30 days': 30, '90 days': 90 }[period]
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - days + 1)
  return deliveries.filter(delivery => delivery.warehouse === warehouse && delivery.savedAt >= start.getTime() && delivery.savedAt <= Date.now())
}

export function allocateStock(quantity: number, bins: StockBin[], selection: string[]) {
  let remaining = quantity
  const allocations: Allocation[] = []
  for (const id of selection) {
    const bin = bins.find(item => item.id === id)
    const amount = Math.min(bin?.room ?? 0, remaining)
    if (amount > 0) allocations.push({ bin: id, quantity: amount })
    remaining -= amount
  }
  return { allocations, remaining }
}

function loadStockDeliveries(): StockDelivery[] {
  const value: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
  if (!Array.isArray(value)) throw new Error('Invalid stock delivery history')
  return value
}

export function readStockDeliveries(): StockDelivery[] {
  try {
    return loadStockDeliveries()
  } catch {
    return []
  }
}

export function saveStockDelivery(delivery: StockDelivery) {
  const current = loadStockDeliveries()
  if (current.some(item => item.id === delivery.id)) return current
  const bins = shelfBins(current, delivery.warehouse, delivery.shelf)
  if (!delivery.allocations.length || delivery.allocations.some(item => !Number.isSafeInteger(item.quantity) || item.quantity <= 0)) return null
  const totals = new Map<string, number>()
  for (const allocation of delivery.allocations) totals.set(allocation.bin, (totals.get(allocation.bin) ?? 0) + allocation.quantity)
  if ([...totals].some(([id, quantity]) => quantity > (bins.find(bin => bin.id === id)?.room ?? 0))) return null
  const next = [...current, delivery]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function undoStockDelivery(id: string) {
  const current = loadStockDeliveries()
  const delivery = current.find(item => item.id === id)
  if (!delivery || Date.now() - delivery.savedAt >= UNDO_WINDOW) return null
  const next = current.filter(item => item.id !== id)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export const units = (quantity: number) => quantity + (quantity === 1 ? ' unit' : ' units')
