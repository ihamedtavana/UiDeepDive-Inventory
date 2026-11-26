import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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
import { StockCallout } from './StockCallout'
import { SwitchWarehouse } from './SwitchWarehouse'
import { warehouseCatalog, warehouseById, dashboardPath, switchPath } from './warehouseCatalog'
function transitionWarehouse(update: () => void, isEntering: boolean) {
  if (!document.startViewTransition || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { update(); return }
  document.documentElement.dataset.warehouseTransition = isEntering ? 'enter' : 'exit'
  const transition = document.startViewTransition(() => flushSync(update))
  void transition.finished.catch(() => {}).finally(() => { delete document.documentElement.dataset.warehouseTransition })
}
export function App({ path = '/dashboard', onNavigate }: { path?: string; onNavigate?: (path: string) => void }) {
  const routeWarehouse = warehouseById(path.split('/')[2] ?? '')
  const [localPath, setLocalPath] = useState(path)
  const activePath = onNavigate ? path : localPath
  const isSwitching = activePath.endsWith('/switch')
  const navigate = (next: string, update?: () => void) => transitionWarehouse(() => { update?.(); if (onNavigate) onNavigate(next); else setLocalPath(next) }, next.endsWith('/switch'))
  const wasSwitching = useRef(false)
  useEffect(() => {
    if (wasSwitching.current && !isSwitching) requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.warehouse-switch')?.focus())
    wasSwitching.current = isSwitching
    document.title = `${isSwitching ? 'Switch warehouse' : 'Inventory'} آ· CoreTech`
  }, [isSwitching])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey) document.documentElement.dataset.focusMode = 'keyboard' }
    const onPointerDown = () => { delete document.documentElement.dataset.focusMode }
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => { document.removeEventListener('keydown', onKeyDown, true); document.removeEventListener('pointerdown', onPointerDown, true); delete document.documentElement.dataset.focusMode }
  }, [])
  const [period, setPeriod] = useState<Period>('30 days')
  const [customRange, setCustomRange] = useState<DateRange | null>(null)
  const [notice,setNotice] = useState('')
  const [warehouse, setWarehouse] = useState(routeWarehouse?.name ?? 'New York Central')
  const [deliveries, setDeliveries] = useState(readStockDeliveries)
  const [stockProduct, setStockProduct] = useState<StockProduct | null>(null)
  useEffect(() => {
    const syncInventory = () => setDeliveries(readStockDeliveries())
    window.addEventListener('storage', syncInventory)
    return () => window.removeEventListener('storage', syncInventory)
  }, [])
  useEffect(() => {
    if (routeWarehouse) {
      if (routeWarehouse.name !== warehouse) setNotice('')
      setWarehouse(routeWarehouse.name)
    }
  }, [routeWarehouse, warehouse])
  const currentWarehouse = warehouseCatalog.find(w => w.name === warehouse) ?? warehouseCatalog[0]
  const closeSwitcher = useCallback(() => { const next = dashboardPath(currentWarehouse.id); transitionWarehouse(() => { if (onNavigate) onNavigate(next); else setLocalPath(next) }, false) }, [currentWarehouse.id, onNavigate])
  const hasSampleData = !customRange
  return <div className={`app-shell${isSwitching ? ' warehouse-switch-shell' : ''}`}><Sidebar deliveries={deliveries} selectedWarehouse={warehouse} isSwitching={isSwitching} onOpenWarehouse={() => navigate(switchPath(currentWarehouse.id))} /><main aria-label="Workspace">{isSwitching ? <SwitchWarehouse key={currentWarehouse.id} selected={warehouse} onClose={closeSwitcher} onSelect={name => navigate(dashboardPath(warehouseCatalog.find(w => w.name === name)!.id), () => { setWarehouse(name); setCustomRange(null); setNotice(name) })} /> : <><TopNavigation warehouse={warehouse} /><div className="main-content">{notice && <StockCallout tone="success" title={`Switched to ${notice}`} action="Dismiss" onAction={()=>setNotice('')}>Dashboard data now reflects this warehouse.</StockCallout>}<OverviewTabsDefault period={period} onSelect={setPeriod} warehouse={warehouse} customRange={customRange} onCustomRange={setCustomRange} />{hasSampleData ? <><OverviewCards period={period} warehouse={warehouse} deliveries={deliveries} /><WarehouseOverview warehouse={warehouse} deliveries={deliveries} onAddStock={setStockProduct} /><InventoryActivity period={period} warehouse={warehouse} deliveries={deliveries} /><ProductsSection period={period} warehouse={warehouse} deliveries={deliveries} onAddStock={setStockProduct} /></> : <div className="selection-data-empty" role="status">No demo data is available for this selection.</div>}</div></>}</main>
    {stockProduct && <AddStockPanel key={`${stockProduct.sku}-${stockProduct.defaultBin}`} product={stockProduct} warehouse={warehouse} deliveries={deliveries} onInventoryChange={setDeliveries} onClose={() => setStockProduct(null)} />}
  </div>
}
