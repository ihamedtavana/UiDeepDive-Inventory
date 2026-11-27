import './Dropdown.css'
import type { ComponentProps, ReactNode } from 'react'
import chevron from '../assets/iconChevronDown.svg'
import { Button } from './Button'

type DropdownTriggerProps = Omit<ComponentProps<typeof Button>, 'children'> & {
  children: ReactNode
  leadingIcon?: ReactNode
  state?: 'Default' | 'Focused' | 'Open'
}

export function DropdownTrigger({ children, leadingIcon, state = 'Default', className = '', ...buttonProps }: DropdownTriggerProps) {
  return <Button {...buttonProps} className={`dropdown-trigger ${className}`}
    data-button-preview={state === 'Focused' ? 'focused' : undefined}>
    {leadingIcon}{children}
    <img className={`icon dropdown-chevron${state === 'Open' ? ' is-open' : ''}`} src={chevron} alt="" />
  </Button>
}
