import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './Button'
import { MapMarker } from './MapMarker'
import { MapPopover } from './MapPopover'
import { MapGoodsDot, type GoodsRoute } from './MapGoodsDot'
import { warehouseCatalog, type WarehouseRecord } from './warehouseCatalog'
import map from '../assets/warehouse-switch/map.svg'
import globe from '../assets/warehouse-switch/imgLeadingIcon1.svg'
import zoomIn from '../assets/warehouse-switch/imgZoomIn.svg'
import zoomOut from '../assets/warehouse-switch/imgZoomOut.svg'
import dot from '../assets/warehouse-switch/imgMapGoodsDot.svg'

const initial = { k: 1, x: 0, y: 0 }
export function MapCanvas({ current, selected, source, onSelect }: { current: WarehouseRecord; selected: WarehouseRecord; source: 'initial' | 'list' | 'map'; onSelect: (warehouse: WarehouseRecord) => void }) {
  const [view, setView] = useState(initial)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const drag = useRef<{ x: number; y: number; view: typeof initial } | null>(null)
  const svg = useRef<SVGSVGElement>(null)
  useEffect(() => { if (source === 'initial') return; const [x,y] = selected.point; const k = 2; setView(selected.id === 'tyo' || source === 'list' && selected.id !== 'fra' ? { k, x: 496-x*k, y: 442-y*k } : initial) }, [selected, source])
  // Curve bends follow the animation reference; endpoints are the Figma marker positions.
  const routes = useMemo<GoodsRoute[]>(() => [
    ['nyc','lon',.2],['nyc','fra',.07],['nyc','ruh',-.12],['nyc','tyo',.24],
    ['lon','fra',.6],['lon','ruh',.14],['fra','ruh',-.18],['lon','tyo',.11],['fra','tyo',-.05],['ruh','tyo',-.16],
  ].map(([fromId,toId,bend]) => {
    const from=warehouseCatalog.find(w=>w.id===fromId)!.point, to=warehouseCatalog.find(w=>w.id===toId)!.point
    const dx=to[0]-from[0], dy=to[1]-from[1], length=Math.hypot(dx,dy)
    let nx=-dy/length, ny=dx/length
    if(ny>0){nx=-nx;ny=-ny}
    const control:[number,number]=[(from[0]+to[0])/2+nx*Number(bend)*length,(from[1]+to[1])/2+ny*Number(bend)*length]
    return {from,to,control,fromId:String(fromId),toId:String(toId),d:`M${from.join(',')} Q${control.join(',')} ${to.join(',')}`}
  }), [])
  const zoom = (factor: number) => setView(v => { const k = Math.max(1, Math.min(4, v.k * factor)); return { k, x:496-(496-v.x)*k/v.k, y:442-(442-v.y)*k/v.k } })
  const x=selected.point[0]*view.k+view.x, y=selected.point[1]*view.k+view.y
  const isRight=selected.id==='fra' && view.k===1
  return <section className={`warehouse-map${isDragging?' is-dragging':''}`} aria-label="Warehouse network map">
    <svg ref={svg} viewBox="0 0 992 884" preserveAspectRatio="none" aria-label="Interactive warehouse map" onPointerDown={event=>{if((event.target as Element).closest('[role="button"]'))return;drag.current={x:event.clientX,y:event.clientY,view};setIsDragging(true);event.currentTarget.setPointerCapture(event.pointerId)}} onPointerMove={event=>{const d=drag.current;if(!d||!svg.current)return;const rect=svg.current.getBoundingClientRect();setView({k:d.view.k,x:d.view.x+(event.clientX-d.x)*992/rect.width,y:d.view.y+(event.clientY-d.y)*884/rect.height})}} onPointerUp={()=>{drag.current=null;setIsDragging(false)}} onPointerCancel={()=>{drag.current=null;setIsDragging(false)}}>
      <g className="warehouse-map-world" style={{transform:`translate(${view.x}px, ${view.y}px) scale(${view.k})`}}><image href={map} width="992" height="884" />
        <g aria-hidden="true">{routes.filter(r=>r.fromId===selected.id||r.toId===selected.id).map(r=><path key={`${r.fromId}-${r.toId}`} d={r.d} className="warehouse-map-route" vectorEffect="non-scaling-stroke" />)}<MapGoodsDot routes={routes} slot={0} selectedId={selected.id} isPaused={isPaused}/><MapGoodsDot routes={routes} slot={1} selectedId={selected.id} isPaused={isPaused}/></g>
        {warehouseCatalog.map(w=><MapMarker key={w.id} warehouse={w} state={w.id===selected.id?'Selected':'Default'} isCurrent={w.id===current.id} scale={view.k} onSelect={()=>onSelect(w)}/>)}</g>
    </svg>
    {x>=0&&x<=992&&y>=0&&y<=884&&<MapPopover warehouse={selected} status={selected.id===current.id?'Current':'Selected'} placement={isRight?'Right':'Above'} x={Math.max(140,Math.min(852,isRight?x+202:x))} y={Math.max(160,Math.min(740,y))}/>}
    <div className="warehouse-map-controls"><Button onClick={()=>setView(initial)}><img src={globe} alt=""/>Show all warehouses</Button><div><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom in" disabled={view.k>=4} onClick={()=>zoom(1.6)}><img src={zoomIn} alt=""/></Button><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom out" disabled={view.k<=1} onClick={()=>zoom(1/1.6)}><img src={zoomOut} alt=""/></Button></div></div>
    <div className="warehouse-map-legend"><span><i className="warehouse-legend-marker"/>Warehouse</span><span><i className="warehouse-legend-route"/>Transfer route</span><span><img src={dot} alt=""/>Goods in transit</span><button type="button" aria-pressed={isPaused} onClick={()=>setIsPaused(!isPaused)}>{isPaused?'Resume animation':'Pause animation'}</button></div><small className="warehouse-map-note">Illustrative activity, not live tracking</small>
  </section>
}
