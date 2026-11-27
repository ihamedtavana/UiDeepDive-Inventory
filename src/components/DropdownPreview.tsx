import { useId, useState } from 'react'
import plus from '../assets/design-system/iconography/plus.svg'
import { Dropdown } from './Dropdown'
import { DropdownMenuBase } from './DropdownMenuBase'
import { DropdownOption } from './DropdownOption'
import { DropdownTrigger } from './DropdownTrigger'

const sections = ['Section A', 'Section B', 'Section C', 'Section D'].map(label => ({ value: label, label }))
const triggerStates = ['Default', 'Focused', 'Open'] as const
const optionStates = ['Default', 'Hover', 'Pressed', 'Focused', 'Disabled'] as const
const leadingIcon = <img src={plus} width={16} height={16} alt="" />
const noop = () => {}

export function DropdownPreview({ variant }: { variant: 'overview' | 'states' }) {
  const id = useId()
  const [section, setSection] = useState(sections[0].value)

  if (variant === 'overview') return <div className="dropdown-docs-preview dropdown-docs-preview--overview">
    <figure>
      <Dropdown label="Shelf section" value={section} options={sections} onChange={setSection} />
      <figcaption>Dropdown · as used in Shelf</figcaption>
    </figure>
    <figure>
      <div inert aria-hidden="true"><DropdownTrigger state="Open" leadingIcon={leadingIcon}>Select option</DropdownTrigger></div>
      <figcaption>Dropdown · Open</figcaption>
    </figure>
    <figure>
      <div className="dropdown-docs-menu" inert aria-hidden="true">
        <DropdownMenuBase id={`${id}-menu`} labelId={`${id}-menu-caption`}>
          {Array.from({ length: 4 }, (_, index) => <DropdownOption key={index} id={`${id}-menu-${index}`}
            label="Option" leadingIcon={leadingIcon} isSelected={false} onClick={noop} />)}
        </DropdownMenuBase>
      </div>
      <figcaption id={`${id}-menu-caption`}>Dropdown Menu Base</figcaption>
    </figure>
  </div>

  return <div className="dropdown-docs-preview dropdown-docs-preview--states">
    {triggerStates.map(state => <figure key={state}>
      <div inert aria-hidden="true"><DropdownTrigger state={state} leadingIcon={leadingIcon}>Select option</DropdownTrigger></div>
      <figcaption>{state}</figcaption>
    </figure>)}
    {optionStates.map(state => <figure key={state}>
      <div inert aria-hidden="true"><DropdownOption id={`${id}-${state}`} label="Option" leadingIcon={leadingIcon}
        state={state} isSelected={false} onClick={noop} /></div>
      <figcaption>{state === 'Default' ? 'Option · Default' : state}</figcaption>
    </figure>)}
  </div>
}
