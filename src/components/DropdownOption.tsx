import './Dropdown.css'
import type { ReactNode } from 'react'
import { FocusRing } from './FocusRing'

type DropdownOptionProps = {
  id: string
  label: ReactNode
  isSelected: boolean
  isDisabled?: boolean
  state?: 'Default' | 'Hover' | 'Focused' | 'Pressed' | 'Disabled'
  onClick: () => void
}

export function DropdownOption({ id, label, isSelected, isDisabled = false, state = 'Default', onClick }: DropdownOptionProps) {
  return <button id={id} type="button" role="option" aria-selected={isSelected} disabled={isDisabled || state === 'Disabled'}
    tabIndex={-1} className="dropdown-option" data-state={state} onClick={onClick}>
    <span>{label}</span>{isSelected && <span className="dropdown-check" aria-hidden="true">✓</span>}<FocusRing />
  </button>
}
