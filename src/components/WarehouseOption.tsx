import './WarehouseOption.css'
import { useId } from 'react'
import { Badge } from './Badge'
import { FocusRing } from './FocusRing'
import { RadioButton } from './RadioButton'

export type Warehouse = { name: string; location: string; shelves: number; isDisabled?: boolean }
export type WarehouseOptionState = 'Default' | 'Hover' | 'Focused' | 'Selected' | 'Disabled'

type Props = {
  warehouse: Warehouse
  isSelected: boolean
  onSelect: () => void
} & ({
  variant?: 'compact'
} | {
  variant: 'list-card'
  groupName: string
  photo: string
  state?: WarehouseOptionState
  isCurrent?: boolean
  hasLow?: boolean
  hasOut?: boolean
  hasAllStocked?: boolean
  lowCount?: number
  outCount?: number
})

export function WarehouseOption(props: Props) {
  const { warehouse, isSelected, onSelect } = props
  const id = useId()
  if (props.variant === 'list-card') {
    const { groupName, photo, state, isCurrent = false, hasLow = true, hasOut = true,
      hasAllStocked = false, lowCount = 2, outCount = 1 } = props
    const isDisabled = warehouse.isDisabled || state === 'Disabled'
    const isChecked = !isDisabled && (state ? state === 'Selected' : isSelected)
    return <label className="warehouse-list-card" data-state={state}>
      <input className="visually-hidden" type="radio" name={groupName} value={warehouse.name}
        checked={isChecked} disabled={isDisabled} onChange={onSelect}
        onClick={isChecked ? onSelect : undefined}
        aria-labelledby={`${id}-name`} aria-describedby={`${id}-location${isDisabled ? '' : ` ${id}-stock`}`} />
      <img className="warehouse-list-card-photo" src={photo} alt="" />
      <span className="warehouse-list-card-heading">
        <span className="warehouse-list-card-text">
          <strong id={`${id}-name`}>{warehouse.name}</strong>
          <span id={`${id}-location`}>{warehouse.location}</span>
        </span>
        <RadioButton isSelected={isChecked} />
      </span>
      {!isDisabled && <span className="warehouse-list-card-badges" id={`${id}-stock`}>
        {isCurrent && <Badge tone="brand">Current</Badge>}
        <Badge>{warehouse.shelves} Shelves</Badge>
        {hasLow && <Badge tone="warning">{lowCount} Low</Badge>}
        {hasOut && <Badge tone="error">{outCount} Out</Badge>}
        {hasAllStocked && <Badge tone="success">All stocked</Badge>}
      </span>}
      <FocusRing />
    </label>
  }
  return <button className={`warehouse-option${isSelected ? ' is-selected' : ''}`} type="button" aria-pressed={isSelected} disabled={warehouse.isDisabled} onClick={onSelect}><span><strong>{warehouse.name}</strong><small>{warehouse.location}</small></span><Badge>{warehouse.shelves} Shelves</Badge></button>
}
