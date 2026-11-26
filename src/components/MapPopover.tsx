import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Badge } from './Badge'
import type { WarehouseRecord } from './warehouseCatalog'
import pointer from '../assets/warehouse-switch/imgPointer.svg'

export function MapPopover({ warehouse, status, placement, x, y, viewport }: { warehouse: WarehouseRecord; status: 'Current' | 'Selected'; placement: 'Above' | 'Below' | 'Right' | 'Left'; x: number; y: number; viewport: { width: number; height: number } }) {
  const element = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState({ width: 248, height: 98, gutter: 0, gap: 0 })
  useLayoutEffect(() => {
    if (!element.current) return
    const rect = element.current.getBoundingClientRect(), css = getComputedStyle(element.current)
    setGeometry({ width: rect.width || 248, height: rect.height || 98, gutter: Number(css.getPropertyValue('--semantic-spacing-gap-xl')), gap: Number(css.getPropertyValue('--semantic-spacing-layout-section-gap')) })
  }, [warehouse, status])
  const { width, height, gutter, gap } = geometry
  const actualPlacement = placement === 'Above' && y - height - gap < gutter ? 'Below' : placement
  const isSide = actualPlacement === 'Right' || actualPlacement === 'Left'
  // Keep the card in the map and its pointer anchored to the marker during every camera frame.
  const left = Math.max(gutter, Math.min(viewport.width - width - gutter, isSide ? x + (actualPlacement === 'Right' ? 78 : -width - 78) : x - width / 2))
  const top = Math.max(gutter, Math.min(viewport.height - height - gutter, isSide ? y - height / 2 : actualPlacement === 'Below' ? y + gap : y - height - gap))
  return <div ref={element} className={`warehouse-map-popover warehouse-map-popover--${actualPlacement.toLowerCase()}`} style={{ left, top, '--popover-pointer-x': `${x-left}px`, '--popover-pointer-y': `${y-top}px` } as CSSProperties} aria-live="polite"><div className="warehouse-map-popover-heading"><span><strong>{warehouse.name}</strong><small>{warehouse.location}</small></span>{status === 'Current' && <Badge tone="brand">Current</Badge>}</div><div className="badges"><Badge>{warehouse.shelves} Shelves</Badge>{warehouse.low > 0 && <Badge tone="warning">{warehouse.low} Low</Badge>}{warehouse.out > 0 && <Badge tone="error">{warehouse.out} Out</Badge>}{!warehouse.low && !warehouse.out && <Badge tone="success">All stocked</Badge>}</div><img className="warehouse-map-pointer" src={pointer} alt="" /></div>
}
