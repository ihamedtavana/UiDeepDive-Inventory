import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './Button'
import { MapMarker } from './MapMarker'
import { MapPopover } from './MapPopover'
import { MapGoodsDot, type GoodsRoute } from './MapGoodsDot'
import { warehouseCatalog, type WarehouseRecord } from './warehouseCatalog'
import map from '../assets/warehouse-switch/map-overview.svg'
import globe from '../assets/warehouse-switch/imgLeadingIcon1.svg'
import zoomIn from '../assets/warehouse-switch/imgZoomIn.svg'
import zoomOut from '../assets/warehouse-switch/imgZoomOut.svg'
import dot from '../assets/warehouse-switch/imgMapGoodsDot.svg'

const initial = { k: 1, x: 0, y: 0 }
type Camera = typeof initial
const constrain = (v: Camera): Camera => ({ k:v.k, x:Math.max(-992*(v.k-1),Math.min(0,v.x)), y:Math.max(-884*(v.k-1),Math.min(0,v.y)) })

export function MapCanvas({ current, selected, source, onSelect }: { current: WarehouseRecord; selected: WarehouseRecord; source: 'initial' | 'list' | 'map'; onSelect: (warehouse: WarehouseRecord) => void }) {
  const [view, setView] = useState(initial)
  const [size, setSize] = useState({ width:992, height:884 })
  const [isDragging, setIsDragging] = useState(false)
  const camera = useRef(initial)
  const animation = useRef(0)
  const drag = useRef<{ x:number; y:number; view:Camera } | null>(null)
  const container = useRef<HTMLElement>(null)
  const fit = Math.min(size.width/992,size.height/884)
  const offsetX = (size.width-992*fit)/2, offsetY = (size.height-884*fit)/2
  useEffect(() => {
    if (!container.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => { if(entry.contentRect.width && entry.contentRect.height) setSize({width:entry.contentRect.width,height:entry.contentRect.height}) })
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [])
  const move = useCallback((next:Camera, isImmediate=false) => {
    cancelAnimationFrame(animation.current)
    const target=constrain(next), from=camera.current
    const commit=(v:Camera) => { camera.current=v; setView(v) }
    if(isImmediate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { commit(target); return }
    const start=performance.now()
    const frame=(now:number) => {
      const t=Math.min(1,(now-start)/700), eased=t*t*(3-2*t)
      commit({k:from.k+(target.k-from.k)*eased,x:from.x+(target.x-from.x)*eased,y:from.y+(target.y-from.y)*eased})
      if(t<1) animation.current=requestAnimationFrame(frame)
    }
    animation.current=requestAnimationFrame(frame)
  }, [])
  useEffect(() => () => cancelAnimationFrame(animation.current), [])
  useEffect(() => {
    if(source==='initial') return
    // Figma's Tokyo focus is the only selection that changes map scale.
    const k=selected.id==='tyo'?1.65:1
    move(k===1?initial:{k,x:496-selected.point[0]*k,y:442-selected.point[1]*k})
  }, [selected,source,move])
  const routes = useMemo<GoodsRoute[]>(() => [
    ['nyc','lon',.2],['nyc','fra',.07],['nyc','ruh',-.12],['nyc','tyo',.24],
    ['lon','fra',.6],['lon','ruh',.14],['fra','ruh',-.18],['lon','tyo',.11],['fra','tyo',-.05],['ruh','tyo',-.16],
  ].map(([fromId,toId,bend]) => {
    const from=warehouseCatalog.find(w=>w.id===fromId)!.point, to=warehouseCatalog.find(w=>w.id===toId)!.point
    const dx=to[0]-from[0],dy=to[1]-from[1],length=Math.hypot(dx,dy)
    let nx=-dy/length,ny=dx/length
    if(ny>0){nx=-nx;ny=-ny}
    const control:[number,number]=[(from[0]+to[0])/2+nx*Number(bend)*length,(from[1]+to[1])/2+ny*Number(bend)*length]
    return {from,to,control,fromId:String(fromId),toId:String(toId),d:`M${from.join(',')} Q${control.join(',')} ${to.join(',')}`}
  }), [])
  const zoom=(factor:number) => {
    const v=camera.current,k=Math.max(1,Math.min(4,v.k*factor))
    move({k,x:496-(496-v.x)*k/v.k,y:442-(442-v.y)*k/v.k})
  }
  const project=(p:[number,number]):[number,number] => [offsetX+(p[0]*view.k+view.x)*fit,offsetY+(p[1]*view.k+view.y)*fit]
  const [x,y]=project(selected.point)
  const isRight=selected.id==='fra' && x+326<size.width
  const isVisible=x>=0 && x<=size.width && y>=0 && y<=size.height
  const endDrag=() => {drag.current=null;setIsDragging(false)}
  return <section ref={container} className={`warehouse-map${isDragging?' is-dragging':''}`} aria-label="Warehouse network map">
    <svg viewBox={`0 0 ${size.width} ${size.height}`} aria-label="Interactive warehouse map"
      onPointerDown={event=>{if(event.button!==0||(event.target as Element).closest('[role="button"]'))return;cancelAnimationFrame(animation.current);drag.current={x:event.clientX,y:event.clientY,view:camera.current};setIsDragging(true);event.currentTarget.setPointerCapture(event.pointerId)}}
      onPointerMove={event=>{const d=drag.current;if(d)move({k:d.view.k,x:d.view.x+(event.clientX-d.x)/fit,y:d.view.y+(event.clientY-d.y)/fit},true)}}
      onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
      <g transform={`translate(${offsetX+view.x*fit} ${offsetY+view.y*fit}) scale(${view.k*fit})`}>
        <image href={map} width="992" height="884" />
        <g aria-hidden="true">{routes.filter(r=>r.fromId===selected.id||r.toId===selected.id).map(r=><path key={`${r.fromId}-${r.toId}`} d={r.d} className="warehouse-map-route" vectorEffect="non-scaling-stroke" />)}
          <MapGoodsDot routes={routes} slot={0} selectedId={selected.id} scale={view.k*fit} isPaused={isDragging}/>
          <MapGoodsDot routes={routes} slot={1} selectedId={selected.id} scale={view.k*fit} isPaused={isDragging}/>
        </g>
      </g>
      {warehouseCatalog.map(w=><MapMarker key={w.id} warehouse={{...w,point:project(w.point)}} state={w.id===selected.id?'Selected':'Default'} isCurrent={w.id===current.id} scale={1} onSelect={()=>onSelect(w)}/>)}
    </svg>
    {isVisible&&<MapPopover warehouse={selected} status={selected.id===current.id?'Current':'Selected'} placement={isRight?'Right':'Above'} x={x} y={y} viewport={size}/>}
    <div className="warehouse-map-controls"><Button onClick={()=>move(initial)}><img src={globe} alt=""/>Show all warehouses</Button><div><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom in" disabled={view.k>=4} onClick={()=>zoom(1.6)}><img src={zoomIn} alt=""/></Button><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom out" disabled={view.k<=1} onClick={()=>zoom(1/1.6)}><img src={zoomOut} alt=""/></Button></div></div>
    <div className="warehouse-map-legend"><span><i className="warehouse-legend-marker"/>Warehouse</span><span><i className="warehouse-legend-route"/>Transfer route</span><span><img src={dot} alt=""/>Goods in transit</span></div>
  </section>
}
