import type { WarehouseRecord } from './warehouseCatalog'
import selected from '../assets/warehouse-switch/imgMapMarkerNewYork.svg'
import normal from '../assets/warehouse-switch/imgMapMarkerFrankfurt.svg'

export function MapMarker({ warehouse, state, isCurrent, scale, onSelect }: { warehouse: WarehouseRecord; state: 'Default' | 'Selected'; isCurrent: boolean; scale: number; onSelect: () => void }) {
  const [x,y] = warehouse.point
  const isLeft = warehouse.id === 'lon'
  const isRight = warehouse.id === 'fra'
  return <g transform={`translate(${x} ${y}) scale(${1 / scale})`} className={`warehouse-map-marker${state === 'Selected' ? ' is-selected' : ''}${isCurrent ? ' is-current' : ''}`} role="button" tabIndex={0} aria-label={`Select ${warehouse.name} on map${isCurrent ? ', current warehouse' : ''}`} aria-pressed={state === 'Selected'} onClick={onSelect} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect() } }}>
    <circle className="warehouse-marker-focus" r="17" />{isCurrent && state !== 'Selected' && <circle className="warehouse-marker-current" r="10" />}<image href={state === 'Selected' ? selected : normal} x="-16" y="-16" width="32" height="32" />
    <text x={isLeft ? -12 : isRight ? 12 : 0} y={isLeft || isRight ? 4 : 26} textAnchor={isLeft ? 'end' : isRight ? 'start' : 'middle'}>{warehouse.city}</text>
  </g>
}
