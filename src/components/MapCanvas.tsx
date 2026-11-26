import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './Button'
import { MapMarker } from './MapMarker'
import { MapPopover } from './MapPopover'
import { MapGoodsDot, type GoodsRoute } from './MapGoodsDot'
import { warehouseCatalog, type WarehouseRecord } from './warehouseCatalog'
import map from '../assets/warehouse-switch/map-full.svg'
import globe from '../assets/warehouse-switch/imgLeadingIcon1.svg'
import zoomIn from '../assets/warehouse-switch/imgZoomIn.svg'
import zoomOut from '../assets/warehouse-switch/imgZoomOut.svg'
import dot from '../assets/warehouse-switch/imgMapGoodsDot.svg'

const MAP_WIDTH = 1133
const MAP_HEIGHT = 884
const initial = { k: 1, x: 0, y: 0 }
type Camera = typeof initial
const constrain = (v: Camera): Camera => ({ k:v.k, x:Math.max(MAP_WIDTH/2-MAP_WIDTH*v.k,Math.min(MAP_WIDTH/2,v.x)), y:Math.max(MAP_HEIGHT/2-MAP_HEIGHT*v.k,Math.min(MAP_HEIGHT/2,v.y)) })

export function MapCanvas({ current, selected, source, isDisabled = false, onSelect }: { current: WarehouseRecord; selected: WarehouseRecord; source: 'initial' | 'list' | 'map'; isDisabled?: boolean; onSelect: (warehouse: WarehouseRecord) => void }) {
  const [view, setView] = useState(initial)
  const [size, setSize] = useState({ width:MAP_WIDTH, height:MAP_HEIGHT })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const camera = useRef(initial)
  const animation = useRef(0)
  const drag = useRef<{ x:number; y:number; view:Camera } | null>(null)
  const container = useRef<HTMLElement>(null)
  const fit = Math.min(size.width/MAP_WIDTH,size.height/MAP_HEIGHT)
  const offsetX = (size.width-MAP_WIDTH*fit)/2, offsetY = (size.height-MAP_HEIGHT*fit)/2
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
      const t=Math.min(1,(now-start)/700), eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2
      commit({k:from.k+(target.k-from.k)*eased,x:from.x+(target.x-from.x)*eased,y:from.y+(target.y-from.y)*eased})
      if(t<1) animation.current=requestAnimationFrame(frame)
    }
    animation.current=requestAnimationFrame(frame)
  }, [])
  useEffect(() => () => cancelAnimationFrame(animation.current), [])
  useEffect(() => {
    // Map clicks preserve exploration; list choices animate from the current camera.
    if(source !== 'list') { cancelAnimationFrame(animation.current); return }
    const k=2
    move({k,x:MAP_WIDTH/2-selected.point[0]*k,y:MAP_HEIGHT/2-selected.point[1]*k})
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
    const v=camera.current,k=Math.max(1,Math.min(8,v.k*factor))
    move({k,x:MAP_WIDTH/2-(MAP_WIDTH/2-v.x)*k/v.k,y:MAP_HEIGHT/2-(MAP_HEIGHT/2-v.y)*k/v.k})
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
        <image href={map} width={MAP_WIDTH} height={MAP_HEIGHT} />
        <g aria-hidden="true">{routes.filter(r=>r.fromId===selected.id||r.toId===selected.id||r.fromId===hoveredId||r.toId===hoveredId).map(r=><path key={`${r.fromId}-${r.toId}`} d={r.d} className={`warehouse-map-route${r.fromId===hoveredId||r.toId===hoveredId ? ' is-emphasized' : ''}`} vectorEffect="non-scaling-stroke" />)}
          <MapGoodsDot routes={routes} slot={0} selectedId={selected.id} scale={view.k*fit} isPaused={isDragging}/>
          <MapGoodsDot routes={routes} slot={1} selectedId={selected.id} scale={view.k*fit} isPaused={isDragging}/>
        </g>
      </g>
      {warehouseCatalog.map(w=><MapMarker key={w.id} warehouse={{...w,point:project(w.point)}} state={w.id===selected.id?'Selected':'Default'} isCurrent={w.id===current.id} scale={1} isDisabled={isDisabled || w.isDisabled} onHover={isHovered=>setHoveredId(isHovered?w.id:null)} onSelect={()=>onSelect(w)}/>)}
    </svg>
    {isVisible&&<MapPopover warehouse={selected} status={selected.id===current.id?'Current':'Selected'} placement={isRight?'Right':'Above'} x={x} y={y} viewport={size}/>}
    <div className="warehouse-map-controls"><Button onClick={()=>move(initial)}><img src={globe} alt=""/>Show all warehouses</Button><div><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom in" disabled={view.k>=8} onClick={()=>zoom(1.6)}><img src={zoomIn} alt=""/></Button><Button isIconOnly className="warehouse-map-zoom" aria-label="Zoom out" disabled={view.k<=1} onClick={()=>zoom(1/1.6)}><img src={zoomOut} alt=""/></Button></div></div>
    <div className="warehouse-map-legend"><span><i className="warehouse-legend-marker"/>Warehouse</span><span><i className="warehouse-legend-route"/>Transfer route</span><span><img src={dot} alt=""/>Goods in transit</span></div>
  </section>
}

