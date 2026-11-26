import { useEffect, useRef, useState } from 'react'
import { Search } from './Search'
import { Badge } from './Badge'
import { Button } from './Button'
import { WarehouseListCard } from './WarehouseListCard'
import { SwitchActionBar } from './SwitchActionBar'
import { MapCanvas } from './MapCanvas'
import { warehouseCatalog, type WarehouseRecord } from './warehouseCatalog'
import back from '../assets/warehouse-switch/imgBackToDashboard.svg'
import './SwitchWarehouse.css'
export const warehouses = warehouseCatalog
export function SwitchWarehouse({ selected, onSelect, onClose }: { selected: string; onSelect: (name: string) => void; onClose: () => void }) {
  const current = warehouseCatalog.find(w=>w.name===selected) ?? warehouseCatalog[0]
  const [candidate,setCandidate] = useState(current)
  const [query, setQuery] = useState('')
  const [source,setSource] = useState<'initial'|'list'|'map'>('initial')
  const [isBusy,setIsBusy] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
  const cards = useRef<Record<string,HTMLButtonElement|null>>({})
  const heading = useRef<HTMLHeadingElement>(null)
  const matches = warehouses.filter(item => `${item.name} ${item.location}`.toLowerCase().includes(query.trim().toLowerCase()))
  useEffect(()=>{heading.current?.focus();return()=>clearTimeout(timer.current)},[])
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!isBusy)onClose()};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[isBusy,onClose])
  const choose=(w:WarehouseRecord,nextSource:'list'|'map')=>{if(isBusy||w.isDisabled)return;setCandidate(w);setSource(nextSource);if(nextSource==='map'){setQuery('');requestAnimationFrame(()=>cards.current[w.id]?.scrollIntoView?.({block:'nearest',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}}
  const confirm=()=>{if(isBusy||candidate.id===current.id)return;setIsBusy(true);timer.current=setTimeout(()=>onSelect(candidate.name),450)}
  const tabbable=matches.some(w=>w.id===candidate.id)?candidate.id:matches[0]?.id
  return <div className="warehouse-switch-workspace" role="dialog" aria-label="Switch warehouse" aria-busy={isBusy}><section className="warehouse-list-panel">
    <header className="warehouse-switch-heading"><Button isIconOnly className="warehouse-back" aria-label="Back to dashboard" disabled={isBusy} onClick={onClose}><img src={back} alt=""/></Button><div><h1 ref={heading} tabIndex={-1}>Switch warehouse</h1><p>Pick a warehouse from the list or the map.</p></div></header>
    <div className="warehouse-search"><Search hasShortcut={false} aria-label="Search warehouses" placeholder="Search warehouses…" value={query} disabled={isBusy} onChange={event=>setQuery(event.target.value)}/><div className="divider"/></div><div className="warehouse-list-caption"><span>All warehouses</span><Badge>{matches.length}</Badge></div>
    <div className="warehouse-list" role="radiogroup" aria-label="Warehouses">{matches.map((w,index)=><WarehouseListCard ref={el=>{cards.current[w.id]=el}} key={w.id} warehouse={w} isDisabled={isBusy} state={w.id===candidate.id?'Selected':'Default'} isCurrent={current.id===w.id} isTabbable={tabbable===w.id} onSelect={()=>choose(w,'list')} onKeyDown={event=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?matches.length-1:(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+matches.length)%matches.length;choose(matches[next],'list');cards.current[matches[next].id]?.focus()}}/>)}{!matches.length&&<p role="status" className="warehouse-list-empty">No warehouses match “{query}”.</p>}</div>
    <SwitchActionBar current={current} selected={candidate} state={isBusy?'Switching':current.id===candidate.id?'Same Warehouse':'Ready'} onCancel={onClose} onConfirm={confirm}/></section><MapCanvas current={current} selected={candidate} source={source} onSelect={w=>choose(w,'map')}/></div>
}
