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
  const hasSampleData = warehouse === 'New York Central' && !customRange
  return <div className="app-shell"><Sidebar selectedWarehouse={warehouse} onSelectWarehouse={setWarehouse} /><main aria-label="Workspace"><TopNavigation warehouse={warehouse} /><div className="main-content"><OverviewTabsDefault period={period} onSelect={setPeriod} warehouse={warehouse} customRange={customRange} onCustomRange={setCustomRange} />{hasSampleData ? <><OverviewCards period={period} /><WarehouseOverview /><InventoryActivity period={period} /><ProductsSection period={period} /></> : <div className="selection-data-empty" role="status">No demo data is available for this selection.</div>}</div></main></div>
}
