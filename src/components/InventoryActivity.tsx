import type { Period } from './Tab'
import { useId, useState } from 'react'
import { Badge } from './Badge'
import { ChartTooltip } from './ChartTooltip'
import { Button } from './Button'
import { FocusRing } from './FocusRing'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ProductIdentity } from './ProductIdentity'
import { currentDeliveries, type StockDelivery } from './stockInventory'
import { catalogProduct } from './inventoryCatalog'
import chartIcon from '../assets/remaining1_imgBarChart11.svg'
import trendIcon from '../assets/remaining1_imgTrendUp01.svg'
import truckIcon from '../assets/remaining1_imgTruck2.svg'
import shipmentIcon from '../assets/remaining1_imgTruck01.svg'
import checkIcon from '../assets/remaining1_imgCheck.svg'
import packageIcon from '../assets/remaining1_imgPackage.svg'
import clockIcon from '../assets/remaining1_imgClock.svg'
import mapIcon from '../assets/remaining1_imgMap01.svg'
import van from '../assets/remaining1_imgWhiteMercedesStyleSprinterVanSideProfile2.png'
import truck from '../assets/remaining1_imgWhiteAtegoBoxTruckProfile1.png'
import lorry from '../assets/remaining1_imgMercedesBenzActrosSideProfile1.png'
import m1 from '../assets/raw4_0.png'
import m2 from '../assets/raw4_1.png'
import m3 from '../assets/raw4_4.png'
import m4 from '../assets/raw4_5.png'
import m5 from '../assets/raw4_8.png'
const movements = [
  {name:'GeForce RTX 4070 Super',sku:'GPU-0107',date:'2026-10-31',partner:'Atlas Components',type:'Inbound',quantity:'+40',image:m1},
  {name:'Intel Core i7 14700K',sku:'CPU-0103',date:'2026-10-31',partner:'Core Components',type:'Inbound',quantity:'+12',image:m2},
  {name:'990 Pro 1TB',sku:'STO-0102',date:'2026-10-31',partner:'PcGaming Digital',type:'Outbound',quantity:'-120',image:m3},
  {name:'RM850e',sku:'PSU-0101',date:'2026-10-30',partner:'Order #10482',type:'Outbound',quantity:'-20',image:m4},
  {name:'Lancool 216',sku:'CAS-0102',date:'2026-10-29',partner:'From WH-02',type:'Inbound',quantity:'+20',image:m5},
]
const movementDateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
const chartData: Record<Period, { label: string; detail: string; incoming: number; outgoing: number }[]> = {
  Today: [
    { label: '00–04', detail: 'Oct 31, 00:00–04:00', incoming: 8, outgoing: 0 },
    { label: '04–08', detail: 'Oct 31, 04:00–08:00', incoming: 14, outgoing: 10 },
    { label: '08–12', detail: 'Oct 31, 08:00–12:00', incoming: 21, outgoing: 0 },
    { label: '12–16', detail: 'Oct 31, 12:00–16:00', incoming: 19, outgoing: 120 },
    { label: '16–20', detail: 'Oct 31, 16:00–20:00', incoming: 12, outgoing: 5 },
    { label: '20–24', detail: 'Oct 31, 20:00–24:00', incoming: 8, outgoing: 5 },
  ],
  '7 days': [70, 84, 76, 80, 88, 90, 82].map((incoming, i) => ({ label: `${25 + i} Oct`, detail: `Oct ${25 + i}, 2026`, incoming, outgoing: [55, 60, 65, 70, 60, 80, 140][i] })),
  '30 days': [400, 390, 420, 430, 414, 416].map((incoming, i) => ({ label: `${2 + i * 5}–${6 + i * 5}`, detail: `Oct ${2 + i * 5}–${6 + i * 5}, 2026`, incoming, outgoing: [350, 380, 360, 400, 405, 415][i] })),
  '90 days': [1100, 1120, 1150, 1120, 1180, 1290].map((incoming, i) => ({ label: ['Aug 3', 'Aug 18', 'Sep 2', 'Sep 17', 'Oct 2', 'Oct 17'][i], detail: ['Aug 3–17', 'Aug 18–Sep 1', 'Sep 2–16', 'Sep 17–Oct 1', 'Oct 2–16', 'Oct 17–31'][i] + ', 2026', incoming, outgoing: [1000, 1050, 1080, 1050, 1120, 1190][i] })),
}

const shipments = [
  {id:'SHP-2041',vehicle:'Mercedes-Benz Atego 818',status:'Loading',image:van,destination:'Center-02',end:'04 Nov',units:'410',percent:0,km:'550'},
  {id:'SHP-2043',vehicle:'Mercedes-Benz Atego 818',status:'In Transit',image:truck,destination:'WH-01',end:'06 Nov',units:'700',percent:51,km:'980'},
  {id:'SHP-2044',vehicle:'Mercedes-Benz Actros 1845',status:'Delivered',image:lorry,destination:'WH-01',end:'06 Nov',units:'1200',percent:100,km:'940'},
]
export function InventoryActivity({ period, warehouse, deliveries }: { period: Period; warehouse: string; deliveries: StockDelivery[] }) {
  const receipts = currentDeliveries(deliveries, warehouse, period)
  const received = receipts.flatMap(delivery => delivery.allocations).reduce((sum, allocation) => sum + allocation.quantity, 0)
  const periodBars = received ? [...chartData[period], { label: 'Latest', detail: 'Latest received stock', incoming: received, outgoing: 0 }] : chartData[period]
  const incoming = periodBars.reduce((sum, bar) => sum + bar.incoming, 0)
  const outgoing = periodBars.reduce((sum, bar) => sum + bar.outgoing, 0)
  const format = (value: number) => value.toLocaleString('en-US')
  const peak = Math.max(...periodBars.flatMap(bar => [bar.incoming, bar.outgoing]))
  const step = 10 ** Math.floor(Math.log10(peak / 5))
  const max = Math.ceil(peak / (5 * step)) * 5 * step
  const [filter,setFilter] = useState('All')
  const [isMovementExpanded, setIsMovementExpanded] = useState(true)
  const [isShipmentsExpanded, setIsShipmentsExpanded] = useState(true)
  const movementId = useId()
  const shipmentsId = useId()
  const [dismissedTooltip,setDismissedTooltip] = useState<string | null>(null)
  const start = { Today: '2026-10-31', '7 days': '2026-10-25', '30 days': '2026-10-02', '90 days': '2026-08-03' }[period]
  const latest = [...receipts].sort((a, b) => b.savedAt - a.savedAt).map(delivery => {
    const product = catalogProduct(delivery.sku)
    return { id: delivery.id, name: product?.name ?? delivery.sku, sku: delivery.sku, date: new Date(delivery.savedAt).toISOString().slice(0, 10), partner: delivery.details.supplier || delivery.allocations.map(allocation => allocation.bin).join(', '), type: 'Inbound', quantity: '+' + delivery.allocations.reduce((sum, allocation) => sum + allocation.quantity, 0), image: product?.image ?? m1 }
  })
  const history = movements.filter(m => m.date >= start && m.date <= '2026-10-31').map(m => ({ ...m, id: `${m.sku}-${m.date}-${m.quantity}` }))
  const filtered = [...latest, ...history].filter(m => filter === 'All' || m.type === filter).slice(0, 5)
  return <div className={`activity-layout${isMovementExpanded && isShipmentsExpanded ? ' is-expanded' : ''}`}>
    <SectionCard className="activity-column">
      <SectionCardTitle icon={chartIcon} hasChevron isExpanded={isMovementExpanded} controlsId={movementId} onToggle={() => setIsMovementExpanded(expanded => !expanded)}>Inventory movement</SectionCardTitle>
      <div id={movementId} className="section-disclosure" inert={!isMovementExpanded} aria-hidden={!isMovementExpanded || undefined}>
      <div className="section-disclosure-body">
      <div className="movement-chart">
        <div className="movement-summary">{[[format(incoming + outgoing),'Movements'],[format(incoming),'Incoming'],[format(outgoing),'Outbound'],[`${incoming >= outgoing ? '+' : ''}${format(incoming - outgoing)}`,'Net movement']].map(([v,l])=><div key={l}><strong>{v}</strong><span className={l === 'Incoming' ? 'legend-incoming' : l === 'Outbound' ? 'legend-outbound' : undefined}>{l}</span></div>)}</div>
        <div className="chart-area" role="group" aria-label={`${period} inventory movements`}>
          <div className="chart-axis" aria-hidden="true">{[1, .8, .6, .4, .2, 0].map(v=><span key={v}>{format(Math.round(max * v))}</span>)}</div>
          <div className="chart-plot">{periodBars.map(bar=><div className={`chart-group${dismissedTooltip === bar.label ? ' is-tooltip-dismissed' : ''}`} key={bar.label} tabIndex={0} role="group" aria-label={`${bar.label}: ${bar.incoming.toLocaleString('en-US')} incoming, ${bar.outgoing.toLocaleString('en-US')} outbound`} aria-describedby={`chart-tooltip-${bar.label}`} onMouseEnter={() => setDismissedTooltip(null)} onFocus={() => setDismissedTooltip(null)} onKeyDown={event => { if (event.key === 'Escape') setDismissedTooltip(bar.label) }}><div className="chart-pair"><div className="chart-track"><div className="chart-bar incoming" style={{height:`${bar.incoming/max*100}%`}} /></div><div className="chart-track"><div className="chart-bar outgoing" style={{height:`${bar.outgoing/max*100}%`}} /></div></div><ChartTooltip id={`chart-tooltip-${bar.label}`} label={bar.detail} incoming={bar.incoming} outbound={bar.outgoing} /></div>)}</div>
          <div className="chart-months" aria-hidden="true">{periodBars.map(bar=><span key={bar.label}>{bar.label}</span>)}</div>
        </div>
      </div>
      <section className="recent-movements"><SectionCardTitle icon={trendIcon} action={<><div className="movement-filter" role="group" aria-label="Movement type">{['All','Inbound','Outbound'].map(v=><button type="button" key={v} className={filter===v?'is-selected':''} aria-pressed={filter===v} onClick={()=>setFilter(v)}>{v}<FocusRing /></button>)}</div><Button hierarchy="primary" appearance="ghost" className="accent-action">View log</Button></>}>Recent stock movements</SectionCardTitle>
        <div className="table-wrap"><table className="data-table movements-table"><thead><tr><th>Product</th><th>Type</th><th>Qty</th><th>Date</th></tr></thead><tbody>{filtered.map(m=><tr key={m.id}><td><div className="movement-product"><ProductIdentity name={m.name} category={m.sku} image={m.image} /><Badge>{m.partner}</Badge></div></td><td><Badge tone={m.type==='Inbound'?'success':'error'}>{m.type}</Badge></td><td><strong>{m.quantity}</strong></td><td className="table-muted"><time dateTime={m.date}>{movementDateFormatter.format(new Date(`${m.date}T00:00:00Z`))}</time></td></tr>)}</tbody></table></div>
      </section>
      </div>
      </div>
    </SectionCard>
    <SectionCard className="shipments-section"><SectionCardTitle icon={truckIcon} hasChevron isExpanded={isShipmentsExpanded} controlsId={shipmentsId} onToggle={() => setIsShipmentsExpanded(expanded => !expanded)} action={<Badge>4</Badge>}>Shipments On Road</SectionCardTitle>
      <div id={shipmentsId} className="section-disclosure" inert={!isShipmentsExpanded} aria-hidden={!isShipmentsExpanded || undefined}><div className="section-disclosure-body"><div className="shipments-content"><div className="shipments-summary"><span>3 Active　/　1 Delivered</span><Button hierarchy="primary" appearance="ghost" className="accent-action">View All</Button></div>{shipments.map(s=><article className="shipment" key={s.id}><div className="shipment-top"><div><strong>{s.id}</strong><p>{s.vehicle}</p><Badge tone={s.status==='Delivered'?'success':s.status==='In Transit'?'warning':'brand'}>{s.status}</Badge></div><img src={s.image} alt="" /></div><div className="shipment-route"><div className="route-labels"><strong>New York Central</strong><strong>{s.destination}</strong></div><div className="shipment-progress" role="progressbar" aria-label={`Shipment ${s.id} progress`} aria-valuenow={s.percent} aria-valuemin={0} aria-valuemax={100}><span className={`shipment-track${s.percent===100?' is-complete':''}`}><span style={{width:`${s.percent}%`}} /></span><i className={`shipment-marker${s.percent===100?' is-complete':''}`} style={{left:`calc(12px + (100% - 24px) * ${s.percent / 100})`}}><img src={s.percent===100?checkIcon:shipmentIcon} alt="" /></i></div><div className="route-dates"><span>01 Nov</span><span>{s.end}</span></div></div><div className="shipment-metrics"><span><img className="icon" src={packageIcon} alt="" />{s.units} <small>Units</small></span><span><img className="icon" src={clockIcon} alt="" />{s.percent}%</span><span><img className="icon" src={mapIcon} alt="" />{s.km} <small>KM</small></span></div></article>)}</div></div></div>
    </SectionCard>
  </div>
}

