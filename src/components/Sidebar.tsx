import { useEffect, useRef, useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Search } from './Search'
import { SidebarMenuButton } from './SidebarMenuButton'
import { SectionCard } from './SectionCard'
import { PercentageContainer } from './PercentageContainer'
import logo from '../assets/imgFrame2147235759.svg'
import warehouse from '../assets/imgImage236.png'
import layout from '../assets/imgLayoutRight.svg'
import grid from '../assets/imgGrid01.svg'
import home from '../assets/imgHome02.svg'
import box from '../assets/imgPackage.svg'
import compass from '../assets/imgCompass03.svg'
import vertical from '../assets/imgSwitchVertical02.svg'
import packageCheck from '../assets/imgPackageCheck.svg'
import chart from '../assets/imgLineChartUp01.svg'
import switchIcon from '../assets/imgSwitchHorizontal02.svg'
import packageSearch from '../assets/imgPackageSearch.svg'
import chevron from '../assets/imgChevronRight.svg'
import settings from '../assets/imgSettings01.svg'
import headphones from '../assets/imgHeadphones02.svg'
import { SwitchWarehouse, warehouses } from './SwitchWarehouse'
import { productSummary, inventorySummary, type StockDelivery } from './stockInventory'
import { SHELF_CATALOG } from './inventoryCatalog'

const menu = [
  { label: 'Overview', icon: grid }, { label: 'Warehouse', icon: home },
  { label: 'Products', icon: box, detail: '96' }, { label: 'Shipments', icon: compass, detail: '4' },
  { label: 'Stock movements', icon: vertical }, { label: 'Suppliers', icon: packageCheck },
  { label: 'Reports & Analytics', icon: chart },
]
const shelves = [
  ['Graphic Cards', 'A1', 'error'], ['Processors', 'A2', 'warning'], ['Motherboards', 'A3', 'error'],
  ['RAM', 'B1', 'warning'], ['Storage', 'B2', 'warning'], ['Power Supplies', 'B3', 'success'],
  ['Cases', 'C1', 'success'], ['Cooling Systems', 'C2', 'error'],
] as const
export function Sidebar({ selectedWarehouse, deliveries, onSelectWarehouse, isPreview = false, previewPart }: {
  selectedWarehouse: string
  deliveries: StockDelivery[]
  onSelectWarehouse: (name: string) => void
  isPreview?: boolean
  previewPart?: 'Collapsed' | 'Warehouse Card' | 'Main Menu' | 'Shelves'
}) {
  const summary = isPreview
    ? { low: 2, out: 1, percentage: 75 }
    : { ...inventorySummary(deliveries, selectedWarehouse), ...productSummary(deliveries, selectedWarehouse) }
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false)
  const switchRef = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!isWarehouseOpen) return; const close = (event: PointerEvent) => { if (!switchRef.current?.contains(event.target as Node)) setIsWarehouseOpen(false) }; document.addEventListener('pointerdown', close); return () => document.removeEventListener('pointerdown', close) }, [isWarehouseOpen])
  useEffect(() => { if (!isWarehouseOpen) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { setIsWarehouseOpen(false); switchRef.current?.querySelector<HTMLButtonElement>('.warehouse-switch')?.focus() } }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown) }, [isWarehouseOpen])
  const closeWarehouse = () => { setIsWarehouseOpen(false); switchRef.current?.querySelector<HTMLButtonElement>('.warehouse-switch')?.focus() }
  const [isCollapsed, setIsCollapsed] = useState(() =>
    isPreview ? previewPart === 'Collapsed' : typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 1024px) and (width < 1200px)').matches,
  )
  useEffect(() => {
    if (isPreview || typeof window.matchMedia !== 'function') return
    const breakpoint = window.matchMedia('(min-width: 1024px) and (width < 1200px)')
    const handleChange = (event: MediaQueryListEvent) => setIsCollapsed(event.matches)
    breakpoint.addEventListener('change', handleChange)
    return () => breakpoint.removeEventListener('change', handleChange)
  }, [isPreview])
  const searchRef = useRef<HTMLInputElement>(null)
  const expandSearch = () => {
    setIsCollapsed(false)
    requestAnimationFrame(() => searchRef.current?.focus())
  }
  const warehouseCard = <div className="warehouse-switch-anchor" ref={switchRef}><section className="warehouse-card" aria-label="Current warehouse">
      <div className="warehouse-card-content"><img className="warehouse-image" src={warehouse} alt="" />
        <div><div className="muted">Warehouse</div><strong>{selectedWarehouse}</strong></div>
        <div className="badges"><Badge>{isPreview ? warehouses[0].shelves : selectedWarehouse === 'New York Central' ? SHELF_CATALOG.length : warehouses.find(item => item.name === selectedWarehouse)?.shelves} Shelves</Badge>{selectedWarehouse === 'New York Central' && <><Badge tone="warning">{summary.low} Low</Badge><Badge tone="error">{summary.out} Out</Badge></>}</div>
      </div>
      <button type="button" className="warehouse-switch" aria-expanded={isWarehouseOpen} aria-haspopup="dialog" onClick={() => setIsWarehouseOpen(open => !open)}><img className="icon" src={switchIcon} alt="" /><span>Switch Warehouse</span><Badge>4</Badge></button>
    </section>{isWarehouseOpen && <SwitchWarehouse selected={selectedWarehouse} onClose={closeWarehouse} onSelect={name => { onSelectWarehouse(name); closeWarehouse() }} />}</div>
  const mainMenu = <nav aria-label="Main menu" className="menu-section">{!isCollapsed && <div className="section-label">Main Menu</div>}<div className="menu-list">{menu.map((item, index) => <SidebarMenuButton key={item.label} icon={item.icon} detail={item.detail} isCollapsed={isCollapsed} isSelected={index === 0}>{item.label}</SidebarMenuButton>)}</div></nav>
  const shelfMenu = selectedWarehouse === 'New York Central' && <section className="menu-section" aria-label="Shelves">{!isCollapsed && <div className="section-label">Shelves</div>}<div className="menu-list">{shelves.map(([label, detail, previewStatus]) => {
      const stock = isPreview ? undefined : inventorySummary(deliveries, selectedWarehouse, detail)
      const status = stock ? stock.out ? 'error' : stock.low ? 'warning' : 'success' : previewStatus
      return <SidebarMenuButton key={label} detail={detail} status={status} isCollapsed={isCollapsed}>{label}</SidebarMenuButton>
    })}</div></section>

  if (isPreview && previewPart === 'Warehouse Card') return warehouseCard
  if (isPreview && previewPart === 'Main Menu') return mainMenu
  if (isPreview && previewPart === 'Shelves') return shelfMenu

  return <aside className={`sidebar${isCollapsed ? ' is-collapsed' : ''}`} aria-label="Sidebar">
    <div className="sidebar-logo"><div className="brand"><img src={logo} alt="" />{!isCollapsed && <h1>CoreTech</h1>}</div><Button appearance="ghost" className="sidebar-toggle" aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}><img className="icon" src={layout} alt="" /></Button></div>
    {!isCollapsed && warehouseCard}
    <div className="search-section"><div className="divider" /><Search isCollapsed={isCollapsed} onExpand={expandSearch} inputRef={searchRef} /><div className="divider" /></div>
    {mainMenu}
    <div className="divider" />
    {selectedWarehouse === 'New York Central' && <>{shelfMenu}
    <div className="divider" />
    {!isCollapsed && <><SectionCard className="storage-card" aria-label="Warehouse storage">
      <div className="storage-title"><img className="icon" src={packageSearch} alt="" /><span>Warehouse Storage</span></div>
      <div className="storage-reading"><strong>{summary.percentage}%</strong><span className="muted">Capacity Used</span></div>
      <PercentageContainer percentage={summary.percentage} />
      <Button className="restock-button">{isPreview ? 11 : summary.low + summary.out} SKUs need restock<img className="icon" src={chevron} alt="" /></Button>
    </SectionCard>
    <div className="divider" /></>}</>}
    <div className="menu-list"><SidebarMenuButton icon={settings} isCollapsed={isCollapsed}>Setting</SidebarMenuButton><SidebarMenuButton icon={headphones} isCollapsed={isCollapsed}>Help &amp; Support</SidebarMenuButton></div>
  </aside>
}
