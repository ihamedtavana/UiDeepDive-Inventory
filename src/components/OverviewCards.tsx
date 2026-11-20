import type { Period } from './Tab'
import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { SectionCard } from './SectionCard'
import packageSearch from '../assets/top2_imgPackageSearch.svg'
import chart from '../assets/top2_imgBarChart10.svg'
import vertical from '../assets/top2_imgSwitchVertical02.svg'
import up from '../assets/top2_imgArrowUp.svg'
import down from '../assets/top2_imgArrowDown.svg'

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
export function OverviewCards({ period }: { period: Period }) {
  const data = { Today: [82, 140], '7 days': [570, 530], '30 days': [2470, 2310], '90 days': [6960, 6490] }[period]
  const [incoming, outgoing] = data
  const format = (value: number) => value.toLocaleString('en-US')
  return <div className="overview-cards">
    <OverviewCard title="Total Products" icon={packageSearch} badge="+3.8%" isPositive><div className="overview-card-body"><Reading value="1,240" label="Products" /><Stats items={[{value:'1,921',label:'Available'}, {value:'90',label:'Out Stock'}, {value:'180',label:'Reserved'}]} /></div></OverviewCard>
    <OverviewCard title="Stock health" icon={chart} badge="96 SKUs"><div className="overview-card-body"><Reading value="76%" label="In stock" /><Stats items={[{value:'85',label:'In stock',status:'success'}, {value:'8',label:'Low',status:'warning'}, {value:'3',label:'Out',status:'error'}]} /></div></OverviewCard>
    <OverviewCard title="Inbound vs outbound" icon={vertical} badge={`${incoming >= outgoing ? '+' : ''}${format(incoming - outgoing)} net`} isPositive={incoming >= outgoing}><div className="movement-stats"><div><strong>{format(incoming)}</strong><span><img className="icon" src={up} alt="" />Inbound</span></div><div><strong>{format(outgoing)}</strong><span><img className="icon" src={down} alt="" />Outbound</span></div></div></OverviewCard>
    <OverviewCard title="Warehouse Storage" icon={packageSearch} badge="2,600 Slots"><div className="overview-card-body"><Reading value="81%" label="Capacity Used" /><Stats items={[{value:'76%',label:'Zone A'}, {value:'91%',label:'Zone B'}, {value:'73%',label:'Zone C'}]} /></div></OverviewCard>
  </div>
}
