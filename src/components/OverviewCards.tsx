import type { Period } from './Tab'
import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { SectionCard } from './SectionCard'
import packageSearch from '../assets/top2_imgPackageSearch.svg'
import chart from '../assets/top2_imgBarChart10.svg'
import vertical from '../assets/top2_imgSwitchVertical02.svg'
import up from '../assets/top2_imgArrowUp.svg'
import down from '../assets/top2_imgArrowDown.svg'
import { currentDeliveries, productSummary, inventorySummary, type StockDelivery } from './stockInventory'
import { SHELF_CATALOG } from './inventoryCatalog'

type CardProps = { title: string; icon: string; badge: string; isPositive?: boolean; children: ReactNode }
function OverviewCard({ title, icon, badge, isPositive = false, children }: CardProps) {
  return <SectionCard className="overview-card"><div className="card-title"><div><img className="icon" src={icon} alt="" /><span className="card-title-label" title={title}>{title}</span></div><Badge tone={isPositive ? 'success' : 'neutral'}>{badge}</Badge></div>{children}</SectionCard>
}
type Stat = { value: string; label: string; status?: 'success' | 'warning' | 'error' }
function Stats({ items }: { items: Stat[] }) {
  return <div className="overview-stats">{items.map(item => <div className="overview-stat" key={item.label}><strong>{item.value}</strong><div>{item.status && <span className={`status status--${item.status}`} aria-hidden="true" />}<span>{item.label}</span></div></div>)}</div>
}
function Reading({ value, label }: { value: string; label: string }) {
  return <div className="overview-reading"><strong>{value}</strong><span>{label}</span></div>
}
export function OverviewCards({ period, warehouse, deliveries }: { period: Period; warehouse: string; deliveries: StockDelivery[] }) {
  const summary = inventorySummary(deliveries, warehouse)
  const health = productSummary(deliveries, warehouse)
  const healthy = health.inStock
  const zones = ['A', 'B', 'C'].map(zone => {
    const shelves = SHELF_CATALOG.filter(shelf => shelf.code.startsWith(zone)).map(shelf => inventorySummary(deliveries, warehouse, shelf.code))
    return Math.round(shelves.reduce((sum, shelf) => sum + shelf.used, 0) / shelves.reduce((sum, shelf) => sum + shelf.capacity, 0) * 100)
  })
  const data = { Today: [82, 140], '7 days': [570, 530], '30 days': [2470, 2310], '90 days': [6960, 6490] }[period]
  const [baselineIncoming, outgoing] = data
  const received = currentDeliveries(deliveries, warehouse, period).flatMap(delivery => delivery.allocations).reduce((sum, allocation) => sum + allocation.quantity, 0)
  const incoming = baselineIncoming + received
  const format = (value: number) => value.toLocaleString('en-US')
  // Frankfurt summary is the explicit demo snapshot in Final / Warehouse Switch / 04.
  if (warehouse === 'Frankfurt Hub' && period === '30 days' && !received) return <div className="overview-cards">
    <OverviewCard title="Total Products" icon={packageSearch} badge="+2.1%" isPositive><div className="overview-card-body"><Reading value="980" label="Products"/><Stats items={[{value:'1,540',label:'Available'},{value:'42',label:'Out Stock'},{value:'126',label:'Reserved'}]}/></div></OverviewCard>
    <OverviewCard title="Stock health" icon={chart} badge="74 SKUs"><div className="overview-card-body"><Reading value="82%" label="In stock"/><Stats items={[{value:'68',label:'In stock',status:'success'},{value:'6',label:'Low',status:'warning'},{value:'0',label:'Out',status:'error'}]}/></div></OverviewCard>
    <OverviewCard title="Inbound vs outbound" icon={vertical} badge="+65 net" isPositive><div className="movement-stats"><div><strong>1,860</strong><span><img className="icon" src={up} alt=""/>Inbound</span></div><div><strong>1,795</strong><span><img className="icon" src={down} alt=""/>Outbound</span></div></div></OverviewCard>
    <OverviewCard title="Warehouse Storage" icon={packageSearch} badge="1,900 Slots"><div className="overview-card-body"><Reading value="68%" label="Capacity Used"/><Stats items={[{value:'64%',label:'Zone A'},{value:'72%',label:'Zone B'},{value:'69%',label:'Zone C'}]}/></div></OverviewCard>
  </div>
  return <div className="overview-cards">
    <OverviewCard title="Total Products" icon={packageSearch} badge={`${summary.bins.length} SKUs`}><div className="overview-card-body"><Reading value={format(summary.bins.length)} label="Products" /><Stats items={[{value:format(summary.used),label:'On hand'}, {value:String(health.out),label:'Out Stock'}, {value:String(health.low),label:'Low Stock'}]} /></div></OverviewCard>
    <OverviewCard title="Stock health" icon={chart} badge={`${summary.bins.length} SKUs`}><div className="overview-card-body"><Reading value={`${Math.round(healthy / summary.bins.length * 100)}%`} label="In stock" /><Stats items={[{value:String(healthy),label:'In stock',status:'success'}, {value:String(health.low),label:'Low',status:'warning'}, {value:String(health.out),label:'Out',status:'error'}]} /></div></OverviewCard>
    <OverviewCard title="Inbound vs outbound" icon={vertical} badge={`${incoming >= outgoing ? '+' : ''}${format(incoming - outgoing)} net`} isPositive={incoming >= outgoing}><div className="movement-stats"><div><strong>{format(incoming)}</strong><span><img className="icon" src={up} alt="" />Inbound</span></div><div><strong>{format(outgoing)}</strong><span><img className="icon" src={down} alt="" />Outbound</span></div></div></OverviewCard>
    <OverviewCard title="Warehouse Storage" icon={packageSearch} badge={`${format(summary.capacity)} Slots`}><div className="overview-card-body"><Reading value={`${summary.percentage}%`} label="Capacity Used" /><Stats items={zones.map((percentage, index) => ({ value: `${percentage}%`, label: `Zone ${['A', 'B', 'C'][index]}` }))} /></div></OverviewCard>
  </div>
}
