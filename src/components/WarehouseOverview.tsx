import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { PercentageContainer } from './PercentageContainer'
import { ShelfCard, type Shelf } from './ShelfCard'
import { NeedsRestock } from './NeedsRestock'
import home from '../assets/imgHome02.svg'
import gpu from '../assets/wh1_imgGraphicsCard.svg'
import cpu from '../assets/wh1_imgProcessor.svg'
import motherboard from '../assets/wh1_imgMotherboard.svg'
import ram from '../assets/wh2_imgRam.svg'
import storage from '../assets/wh2_imgStorage.svg'
import psu from '../assets/wh2_imgPowerSupply.svg'
import pc from '../assets/wh3_imgPcCase.svg'
import cooling from '../assets/wh3_imgCoolingFan.svg'
const shelves: Shelf[] = [
  {code:'A1',name:'Graphics Cards',description:'NVIDIA / AMD Series',icon:gpu,percentage:25,available:'142',out:'90',reserved:'180'},
  {code:'A2',name:'Processors',description:'Intel Core / AMD Ryzen',icon:cpu,percentage:48,available:'480',out:'25',reserved:'110'},
  {code:'A3',name:'Motherboards',description:'ATX, Micro-ATX & Mini-ITX',icon:motherboard,percentage:18,available:'64',out:'120',reserved:'45'},
  {code:'B1',name:'RAM',description:'DDR4 & DDR5 Kits',icon:ram,percentage:52,available:'820',out:'40',reserved:'210'},
  {code:'B2',name:'Storage',description:'NVMe M.2 & SATA SSDs',icon:storage,percentage:42,available:'610',out:'55',reserved:'190'},
  {code:'B3',name:'Power Supplies',description:'Modular & ATX 3.0 PSUs',icon:psu,percentage:88,available:'1,450',out:'0',reserved:'75'},
  {code:'C1',name:'PC Cases',description:'Mid-Tower & Full-Tower',icon:pc,percentage:92,available:'320',out:'0',reserved:'30'},
  {code:'C2',name:'Cooling Systems',description:'AIO Liquid & Air Coolers',icon:cooling,percentage:20,available:'95',out:'80',reserved:'65'},
]
export function WarehouseOverview() {
  return <SectionCard className="warehouse-overview">
    <SectionCardTitle icon={home} action={<span aria-hidden="true">⌄</span>}>Warehouse Overview</SectionCardTitle>
    <div className="warehouse-overview-content">
      <div className="shelf-summary">{[['8','Total shelves'],['2','In Stock'],['3','Restock Needed'],['2','Low Stock']].map(([value,label],i)=><div className="summary-stat" key={label}><strong>{value}</strong><span>{i>0 && <i className={`status status--${i===1?'success':i===2?'warning':'error'}`} />}{label}</span></div>)}<div className="summary-capacity"><div><strong>75%</strong><span>Capacity Used</span></div><PercentageContainer percentage={75} /></div></div>
      <div className="shelf-grid">{shelves.map(shelf=><ShelfCard key={shelf.code} shelf={shelf} />)}</div>
    </div>
    <NeedsRestock />
  </SectionCard>
}
