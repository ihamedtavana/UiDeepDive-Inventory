import { useEffect, useState } from 'react'
import type { Period } from './Tab'
import { Sidebar } from './Sidebar'
import { TopNavigation } from './TopNavigation'
import { OverviewTabsDefault } from './OverviewTabsDefault'
import { OverviewCards } from './OverviewCards'
import { WarehouseOverview } from './WarehouseOverview'
import { InventoryActivity } from './InventoryActivity'
import { ProductsSection } from './ProductsSection'
import type { DateRange } from './CustomDateRange'
import { AddStockPanel } from './AddStockPanel'
import { readStockDeliveries, type StockProduct } from './stockInventory'

export function App() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey) document.documentElement.dataset.focusMode = 'keyboard' }
    const onPointerDown = () => { delete document.documentElement.dataset.focusMode }
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => { document.removeEventListener('keydown', onKeyDown, true); document.removeEventListener('pointerdown', onPointerDown, true); delete document.documentElement.dataset.focusMode }
  }, [])
  const [period, setPeriod] = useState<Period>('30 days')
  const [customRange, setCustomRange] = useState<DateRange | null>(null)
  const [warehouse, setWarehouse] = useState('New York Central')
  const [deliveries, setDeliveries] = useState(readStockDeliveries)
  const [stockProduct, setStockProduct] = useState<StockProduct | null>(null)
  useEffect(() => {
    const syncInventory = () => setDeliveries(readStockDeliveries())
    window.addEventListener('storage', syncInventory)
    return () => window.removeEventListener('storage', syncInventory)
  }, [])
  const hasSampleData = warehouse === 'New York Central' && !customRange
  return <div className="app-shell"><Sidebar deliveries={deliveries} selectedWarehouse={warehouse} onSelectWarehouse={setWarehouse} /><main aria-label="Workspace"><TopNavigation warehouse={warehouse} /><div className="main-content"><OverviewTabsDefault period={period} onSelect={setPeriod} warehouse={warehouse} customRange={customRange} onCustomRange={setCustomRange} />{hasSampleData ? <><OverviewCards period={period} warehouse={warehouse} deliveries={deliveries} /><WarehouseOverview warehouse={warehouse} deliveries={deliveries} onAddStock={setStockProduct} /><InventoryActivity period={period} warehouse={warehouse} deliveries={deliveries} /><ProductsSection period={period} warehouse={warehouse} deliveries={deliveries} onAddStock={setStockProduct} /></> : <div className="selection-data-empty" role="status">No demo data is available for this selection.</div>}</div></main>
    {stockProduct && <AddStockPanel key={`${stockProduct.sku}-${stockProduct.defaultBin}`} product={stockProduct} warehouse={warehouse} deliveries={deliveries} onInventoryChange={setDeliveries} onClose={() => setStockProduct(null)} />}
  </div>
}
