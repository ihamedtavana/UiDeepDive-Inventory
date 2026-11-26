import { Badge } from './Badge'
import type { WarehouseRecord } from './warehouseCatalog'
import pointer from '../assets/warehouse-switch/imgPointer.svg'

export function MapPopover({ warehouse, status, placement, x, y }: { warehouse: WarehouseRecord; status: 'Current' | 'Selected'; placement: 'Above' | 'Right'; x: number; y: number }) {
  return <div className={`warehouse-map-popover warehouse-map-popover--${placement.toLowerCase()}`} style={{ left: `${x / 992 * 100}%`, top: `${y / 884 * 100}%` }} aria-live="polite"><div className="warehouse-map-popover-heading"><span><strong>{warehouse.name}</strong><small>{warehouse.location}</small></span>{status === 'Current' && <Badge tone="brand">Current</Badge>}</div><div className="badges"><Badge>{warehouse.shelves} Shelves</Badge>{warehouse.low > 0 && <Badge tone="warning">{warehouse.low} Low</Badge>}{warehouse.out > 0 && <Badge tone="error">{warehouse.out} Out</Badge>}{!warehouse.low && !warehouse.out && <Badge tone="success">All stocked</Badge>}</div><img className="warehouse-map-pointer" src={pointer} alt="" /></div>
}
