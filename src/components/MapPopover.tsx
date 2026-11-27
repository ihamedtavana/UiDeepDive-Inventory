import './MapComponents.css'
import { Badge } from './Badge'
import above from '../assets/design-system/map/pointer-above.svg'
import below from '../assets/design-system/map/pointer-below.svg'
import right from '../assets/design-system/map/pointer-right.svg'
import left from '../assets/design-system/map/pointer-left.svg'

export type MapPopoverPlacement = 'Above' | 'Below' | 'Right' | 'Left'

type Props = {
  name?: string
  location?: string
  placement?: MapPopoverPlacement
  status?: 'Current' | 'Selected'
  stock?: { shelves: number; low: number; out: number }
}

const defaultStock = { shelves: 16, low: 2, out: 1 }
const pointers = { Above: above, Below: below, Right: right, Left: left }
const selectedPointers = { ...pointers, Right: left, Left: right }

export function MapPopover({
  name = 'New York Central', location = 'New York, United States', placement = 'Above', status = 'Current', stock = defaultStock,
}: Props) {
  const pointer = (status === 'Selected' ? selectedPointers : pointers)[placement]
  return <div className="map-popover" data-status={status} data-placement={placement} role="group"
    aria-label={status === 'Current' ? 'Current warehouse' : 'Selected warehouse'}>
    <div className="map-popover-header">
      <div className="map-popover-identity">
        <strong className="map-popover-name">{name}</strong>
        <span className="map-popover-location">{location}</span>
      </div>
      {status === 'Current' && <Badge tone="brand">Current</Badge>}
    </div>
    <div className="map-popover-stock">
      <Badge>{stock.shelves} Shelves</Badge>
      <Badge tone="warning">{stock.low} Low</Badge>
      <Badge tone="error">{stock.out} Out</Badge>
    </div>
    <span className="map-popover-pointer" aria-hidden="true"><img src={pointer} alt="" /></span>
  </div>
}
