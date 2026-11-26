import type { WarehouseRecord } from './warehouseCatalog'
import defaultOther from '../assets/warehouse-switch/marker-default-other.svg'
import hoverOther from '../assets/warehouse-switch/marker-hover-other.svg'
import focusedOther from '../assets/warehouse-switch/marker-focused-other.svg'
import selectedOther from '../assets/warehouse-switch/marker-selected-other.svg'
import defaultCurrent from '../assets/warehouse-switch/marker-default-current.svg'
import hoverCurrent from '../assets/warehouse-switch/marker-hover-current.svg'
import focusedCurrent from '../assets/warehouse-switch/marker-focused-current.svg'
import selectedCurrent from '../assets/warehouse-switch/marker-selected-current.svg'

const artwork = {
  other: { Default: defaultOther, Hover: hoverOther, Focused: focusedOther, Selected: selectedOther },
  current: { Default: defaultCurrent, Hover: hoverCurrent, Focused: focusedCurrent, Selected: selectedCurrent },
}
export function MapMarker({ warehouse, state, isCurrent, isDisabled = false, scale, onSelect, onHover }: { warehouse: WarehouseRecord; state: 'Default' | 'Hover' | 'Focused' | 'Selected'; isCurrent: boolean; isDisabled?: boolean; scale: number; onSelect: () => void; onHover?: (isHovered: boolean) => void }) {
  const [x, y] = warehouse.point
  const isLeft = warehouse.id === 'lon'
  const isRight = warehouse.id === 'fra'
  const variants = artwork[isCurrent ? 'current' : 'other']
  return <g transform={`translate(${x} ${y}) scale(${1 / scale})`} className={`warehouse-map-marker${state === 'Selected' ? ' is-selected' : ''}`} data-state={state} data-current={isCurrent} role="button" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled || undefined} aria-label={`Select ${warehouse.name} on map${isCurrent ? ', current warehouse' : ''}`} aria-pressed={state === 'Selected'} onPointerEnter={() => onHover?.(true)} onPointerLeave={() => onHover?.(false)} onClick={() => { if (!isDisabled) onSelect() }} onKeyDown={event => { if (!isDisabled && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onSelect() } }}>
    <rect x="-16" y="-16" width="32" height="32" fill="transparent" />
    <image className="warehouse-marker-base" href={variants[state]} x="-16" y="-16" width="32" height="32" />
    {state !== 'Selected' && <><image className="warehouse-marker-hover" href={variants.Hover} x="-16" y="-16" width="32" height="32" /><image className="warehouse-marker-keyboard" href={variants.Focused} x="-16" y="-16" width="32" height="32" /></>}
    <circle className="warehouse-marker-focus" r="16" />
    <text x={isLeft ? -12 : isRight ? 12 : 0} y={isLeft || isRight ? 4 : 26} textAnchor={isLeft ? 'end' : isRight ? 'start' : 'middle'}>{warehouse.city}</text>
  </g>
}
