import './SwitchActionBar.css'
import { Button } from './Button'
import buildingIcon from '../assets/design-system/warehouse-switch-building.svg'
import chevronIcon from '../assets/design-system/warehouse-switch-chevron.svg'
import spinnerIcon from '../assets/design-system/warehouse-switch-spinner.svg'

type Props = {
  state: 'Same Warehouse' | 'Ready' | 'Switching'
  warehouse: string
  from: string
  onCancel?: () => void
  onSwitch?: () => void
}

export function SwitchActionBar({ state, warehouse, from, onCancel, onSwitch }: Props) {
  const isSameWarehouse = state === 'Same Warehouse'
  const isSwitching = state === 'Switching'

  return <div className="switch-action-bar" data-state={state}>
    <div className="switch-action-bar-selection">
      <span className="switch-action-bar-tile"><img src={buildingIcon} alt="" width={20} height={20} /></span>
      <span className="switch-action-bar-name">
        <span>{isSameWarehouse ? 'Current warehouse' : 'Selected warehouse'}</span>
        <strong>{warehouse}</strong>
      </span>
    </div>
    {!isSameWarehouse && <div className="switch-action-bar-route">
      <span>{from}</span><img src={chevronIcon} alt="" width={12} height={12} /><strong>{warehouse}</strong>
    </div>}
    <div className="switch-action-bar-buttons">
      <Button className="switch-action-bar-cancel" size="medium" disabled={isSwitching} onClick={onCancel}>Cancel</Button>
      <Button className="switch-action-bar-confirm" hierarchy="primary" size="medium"
        disabled={isSameWarehouse} aria-disabled={isSwitching || undefined} onClick={isSwitching ? undefined : onSwitch}>
        {isSwitching
          ? <img className="switch-action-bar-spinner" src={spinnerIcon} alt="" width={16} height={16} />
          : <span className="switch-action-bar-arrow" aria-hidden="true" />}
        {isSwitching ? 'Switching…' : 'Switch to this warehouse'}
      </Button>
    </div>
    <span className="visually-hidden" role="status">{isSwitching ? 'Switching…' : ''}</span>
  </div>
}
