import type { KeyboardEvent, Ref } from 'react'
import { Badge } from './Badge'
import type { WarehouseRecord } from './warehouseCatalog'
import off from '../assets/warehouse-switch/imgSelectedOff.svg'
import on from '../assets/warehouse-switch/imgSelectedOn.svg'

export function WarehouseListCard({ warehouse, isCurrent, state = 'Default', isTabbable, isDisabled = false, onSelect, onKeyDown, ref }: { warehouse: WarehouseRecord; isCurrent: boolean; state?: 'Default' | 'Hover' | 'Focused' | 'Selected' | 'Disabled'; isTabbable: boolean; isDisabled?: boolean; onSelect: () => void; onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void; ref?: Ref<HTMLButtonElement> }) {
  return <button ref={ref} type="button" role="radio" aria-checked={state === 'Selected'} aria-label={`${warehouse.name}, ${warehouse.location}${isCurrent ? ', current warehouse' : ''}`} tabIndex={isTabbable ? 0 : -1} disabled={isDisabled || state === 'Disabled' || warehouse.isDisabled} className={`warehouse-list-card warehouse-list-card--${state.toLowerCase()}`} onClick={onSelect} onKeyDown={onKeyDown}>
    <img className="warehouse-list-photo" src={warehouse.image} alt={`${warehouse.name} building`} />
    <span className="warehouse-list-heading"><span><strong>{warehouse.name}</strong><small>{warehouse.location}</small></span><img src={state === 'Selected' ? on : off} alt="" /></span>
    {state !== 'Disabled' && <span className="badges">{isCurrent && <Badge tone="brand">Current</Badge>}<Badge>{warehouse.shelves} Shelves</Badge>{warehouse.low > 0 && <Badge tone="warning">{warehouse.low} Low</Badge>}{warehouse.out > 0 && <Badge tone="error">{warehouse.out} Out</Badge>}{!warehouse.low && !warehouse.out && <Badge tone="success">All stocked</Badge>}</span>}
  </button>
}
