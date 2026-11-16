import { Sidebar } from './Sidebar'
import { TopNavigation } from './TopNavigation'
import { OverviewTabsDefault } from './OverviewTabsDefault'
import { OverviewCards } from './OverviewCards'
import { WarehouseOverview } from './WarehouseOverview'
import { InventoryActivity } from './InventoryActivity'
import { ProductsSection } from './ProductsSection'

export function App() {
  return <div className="app-shell"><Sidebar /><main aria-label="Workspace"><TopNavigation /><div className="main-content"><OverviewTabsDefault /><OverviewCards /><WarehouseOverview /><InventoryActivity /><ProductsSection /></div></main></div>
}
