import { useState } from 'react'
import { Badge } from './Badge'
import { FocusRing } from './FocusRing'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ProductIdentity } from './ProductIdentity'
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
  {name:'GeForce RTX 4070 Super',sku:'GPU-0104',partner:'Atlas Components',type:'Inbound',quantity:'+40',image:m1},
  {name:'Intel Core i7 14700K',sku:'CPU-0108',partner:'SHP-2041',type:'Inbound',quantity:'+12',image:m2},
  {name:'990 Pro 1TB',sku:'STO-0102',partner:'PcGaming Digital',type:'Outbound',quantity:'-120',image:m3},
  {name:'RM850e',sku:'PSU-0101',partner:'Order #10482',type:'Outbound',quantity:'-20',image:m4},
  {name:'Lancool 216',sku:'CAS-0102',partner:'From WH-02',type:'Inbound',quantity:'+20',image:m5},
]
const bars = [{month:'May',in:2000,out:1870},{month:'Jun',in:2160,out:2010},{month:'Jul',in:2090,out:2190},{month:'Aug',in:2210,out:2070},{month:'Sep',in:2280,out:2110},{month:'Oct',in:2470,out:2310}]
const shipments = [
  {id:'SHP-2041',vehicle:'Mercedes-Benz Atego 818',status:'Loading',image:van,destination:'Center-02',end:'04 Nov',units:'410',percent:0,km:'550'},
  {id:'SHP-2043',vehicle:'Mercedes-Benz Atego 818',status:'In Transit',image:truck,destination:'WH-01',end:'06 Nov',units:'700',percent:51,km:'980'},
  {id:'SHP-2044',vehicle:'Mercedes-Benz Actros 1845',status:'Delivered',image:lorry,destination:'WH-01',end:'06 Nov',units:'1200',percent:100,km:'940'},
]
export function InventoryActivity() {
  const [filter,setFilter] = useState('All')
  const filtered = movements.filter(m => filter === 'All' || m.type === filter)
  return <div className="activity-layout">
    <SectionCard className="activity-column">
      <SectionCardTitle icon={chartIcon} hasChevron chevronLabel="Inventory movement options">Inventory movement</SectionCardTitle>
      <div className="movement-chart">
        <div className="movement-summary">{[['4,780','Movements'],['2,470','Incoming'],['2,310','Outbond'],['+160','Net movement']].map(([v,l])=><div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div>
        <div className="chart-area"><div className="chart-axis">{['2.5k','2k','1.5k','1k','500','0'].map(v=><span key={v}>{v}</span>)}</div><div className="chart-plot">{bars.map((bar,i)=><div className="chart-group" key={bar.month}><div className="chart-pair"><div className={`chart-bar incoming ${i===5?'active':''}`} style={{height:`${bar.in/2500*100}%`}} title={`${bar.month}: ${bar.in} in`} /><div className={`chart-bar outgoing ${i===5?'active':''}`} style={{height:`${bar.out/2500*100}%`}} title={`${bar.month}: ${bar.out} out`} /></div><span>{bar.month}</span></div>)}</div></div>
      </div>
      <section className="recent-movements"><SectionCardTitle icon={trendIcon} action={<><div className="movement-filter" role="group" aria-label="Movement type">{['All','Inbound','Outbound'].map(v=><button type="button" key={v} className={filter===v?'is-selected':''} aria-pressed={filter===v} onClick={()=>setFilter(v)}>{v}<FocusRing /></button>)}</div><span className="accent-text">View log</span></>}>Recent stock movements</SectionCardTitle>
        <div className="table-wrap"><table className="data-table movements-table"><thead><tr><th>Product</th><th>Type</th><th>Qty</th><th>Date</th></tr></thead><tbody>{filtered.map(m=><tr key={m.sku}><td><div className="movement-product"><ProductIdentity name={m.name} category={m.sku} image={m.image} /><Badge>{m.partner}</Badge></div></td><td><Badge tone={m.type==='Inbound'?'success':'error'}>{m.type}</Badge></td><td><strong>{m.quantity}</strong></td><td className="table-muted">Today, 10:12</td></tr>)}</tbody></table></div>
      </section>
    </SectionCard>
    <SectionCard className="shipments-section"><SectionCardTitle icon={truckIcon} hasChevron chevronLabel="Shipments options" action={<Badge>4</Badge>}>Shipments On Road</SectionCardTitle>
      <div className="shipments-content"><div className="shipments-summary"><span>3 Active　/　1 Delivered</span><span className="accent-text">View All</span></div>{shipments.map(s=><article className="shipment" key={s.id}><div className="shipment-top"><div><strong>{s.id}</strong><p>{s.vehicle}</p><Badge tone={s.status==='Delivered'?'success':s.status==='In Transit'?'warning':'brand'}>{s.status}</Badge></div><img src={s.image} alt="" /></div><div className="route-labels"><strong>New York Central</strong><strong>{s.destination}</strong></div><div className="shipment-progress" role="progressbar" aria-label={`Shipment ${s.id} progress`} aria-valuenow={s.percent} aria-valuemin={0} aria-valuemax={100}><span className={s.percent===100?'is-complete':''} style={{width:`${s.percent}%`}} /><i className={`shipment-marker${s.percent===100?' is-complete':''}`} style={{left:`${s.percent}%`}}><img src={s.percent===100?checkIcon:shipmentIcon} alt="" /></i></div><div className="route-dates"><span>01 Nov</span><span>{s.end}</span></div><div className="shipment-metrics"><span><img className="icon" src={packageIcon} alt="" />{s.units} <small>Units</small></span><span><img className="icon" src={clockIcon} alt="" />{s.percent}%</span><span><img className="icon" src={mapIcon} alt="" />{s.km} <small>KM</small></span></div></article>)}</div>
    </SectionCard>
  </div>
}
