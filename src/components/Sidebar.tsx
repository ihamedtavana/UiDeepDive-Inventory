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
export function Sidebar() {
  return <aside className="sidebar" aria-label="Sidebar">
    <div className="sidebar-logo"><div className="brand"><img src={logo} alt="" /><h1>CoreTech</h1></div><img className="icon" src={layout} alt="" /></div>
    <section className="warehouse-card" aria-label="Current warehouse">
      <div className="warehouse-card-content"><img className="warehouse-image" src={warehouse} alt="New York Central warehouse" />
        <div><div className="muted">Warehouse</div><strong>New York Central</strong></div>
        <div className="badges"><Badge>16 Shelves</Badge><Badge tone="warning">2 Low</Badge><Badge tone="error">1 Out</Badge></div>
      </div>
      <div className="warehouse-switch"><img className="icon" src={switchIcon} alt="" /><span>Switch Warehouse</span><Badge>4</Badge></div>
    </section>
    <div className="search-section"><div className="divider" /><Search /><div className="divider" /></div>
    <nav aria-label="Main menu" className="menu-section"><div className="section-label">Main Menu</div><div className="menu-list">{menu.map((item, index) => <SidebarMenuButton key={item.label} icon={item.icon} detail={item.detail} isSelected={index === 0}>{item.label}</SidebarMenuButton>)}</div></nav>
    <div className="divider" />
    <section className="menu-section" aria-label="Shelves"><div className="section-label">Shelves</div><div className="menu-list">{shelves.map(([label, detail, status]) => <SidebarMenuButton key={label} detail={detail} status={status}>{label}</SidebarMenuButton>)}</div></section>
    <div className="divider" />
    <SectionCard className="storage-card" aria-label="Warehouse storage">
      <div className="storage-title"><img className="icon" src={packageSearch} alt="" />Warehouse Storage</div>
      <div className="storage-reading"><strong>75%</strong><span className="muted">Capacity Used</span></div>
      <PercentageContainer percentage={75} />
      <Button className="restock-button">11 SKUs need restock<img className="icon" src={chevron} alt="" /></Button>
    </SectionCard>
    <div className="divider" />
    <div className="menu-list"><SidebarMenuButton icon={settings}>Setting</SidebarMenuButton><SidebarMenuButton icon={headphones}>Help &amp; Support</SidebarMenuButton></div>
  </aside>
}
