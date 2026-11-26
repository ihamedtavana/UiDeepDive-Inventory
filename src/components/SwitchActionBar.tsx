import { Button } from './Button'
import type { WarehouseRecord } from './warehouseCatalog'
import building from '../assets/warehouse-switch/imgBuilding02.svg'
import chevron from '../assets/imgChevronRight.svg'

export function SwitchActionBar({ current, selected, state, onCancel, onConfirm }: { current: WarehouseRecord; selected: WarehouseRecord; state: 'Same Warehouse' | 'Ready' | 'Switching'; onCancel: () => void; onConfirm: () => void }) {
  const isBusy = state === 'Switching'
  return <footer className="switch-action-bar" aria-busy={isBusy}>
    <div className="switch-action-selection" aria-live="polite"><span className="switch-action-tile"><img src={building} alt="" /></span><span><small>{state === 'Same Warehouse' ? 'Current warehouse' : 'Selected warehouse'}</small><strong>{selected.name}</strong></span></div>
    {state !== 'Same Warehouse' && <div className="switch-action-from"><span>{current.name}</span><img className="icon" src={chevron} alt="to" /><strong>{selected.name}</strong></div>}
    <div className="switch-action-buttons"><Button size="medium" disabled={isBusy} onClick={onCancel}>Cancel</Button><Button size="medium" hierarchy="primary" disabled={state !== 'Ready'} onClick={onConfirm}>{isBusy ? <span className="switch-spinner" aria-hidden="true" /> : <span className="switch-action-icon" aria-hidden="true" />}{isBusy ? 'Switching…' : 'Switch to this warehouse'}</Button></div>
  </footer>
}
