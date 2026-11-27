import './Dropdown.css'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { DropdownMenuBase } from './DropdownMenuBase'
import { DropdownOption } from './DropdownOption'
import { DropdownTrigger } from './DropdownTrigger'

export type DropdownItem = { value: string; label: string; isDisabled?: boolean }
type DropdownProps = {
  label: string
  value: string
  options: DropdownItem[]
  isDisabled?: boolean
  onChange: (value: string) => void
}

export function Dropdown({ label, value, options, isDisabled = false, onChange }: DropdownProps) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(0)
  const selected = options.find(option => option.value === value)

  useEffect(() => {
    if (!isOpen) return
    // Wait until the popup is visible before moving keyboard focus into it.
    const frame = window.requestAnimationFrame(() => document.getElementById(`${id}-option-${active}`)?.focus({ preventScroll: true }))
    return () => window.cancelAnimationFrame(frame)
  }, [isOpen, active, id])

  useEffect(() => {
    if (!isOpen) return
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [isOpen])

  const open = (isLast = false) => {
    const available = options.map((option, index) => ({ ...option, index })).filter(option => !option.isDisabled)
    const initial = isLast ? available.at(-1) : available.find(option => option.value === value) ?? available[0]
    if (!initial) return
    setActive(initial.index)
    setIsOpen(true)
  }
  const close = () => { setIsOpen(false); trigger.current?.focus() }
  const select = (next: string) => { onChange(next); close() }
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && isOpen) { event.preventDefault(); event.stopPropagation(); close(); return }
    if (event.key === 'Tab') { setIsOpen(false); return }
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(event.key === 'ArrowUp') }
      return
    }
    const available = options.map((option, index) => ({ ...option, index })).filter(option => !option.isDisabled)
    const index = available.findIndex(option => option.index === active)
    if (!available.length) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive(available[(index + step + available.length) % available.length].index)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActive((event.key === 'Home' ? available[0] : available[available.length - 1]).index)
    } else if (event.key.length === 1 && event.key !== ' ') {
      const match = available.find(option => option.label.toLowerCase().startsWith(event.key.toLowerCase()))
      if (match) { event.preventDefault(); setActive(match.index) }
    }
  }

  return <div className="dropdown" ref={root} onKeyDown={onKeyDown}>
    <DropdownTrigger id={`${id}-trigger`} ref={trigger} disabled={isDisabled} aria-label={`${label}: ${selected?.label ?? 'Select option'}`}
      aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={`${id}-menu`} state={isOpen ? 'Open' : 'Default'}
      onClick={() => isOpen ? close() : open()}>
      {selected?.label ?? 'Select option'}
    </DropdownTrigger>
    <div className={`dropdown-popup${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen || undefined} inert={!isOpen}>
      <DropdownMenuBase id={`${id}-menu`} labelId={`${id}-trigger`}>
        {options.map((option, index) => <DropdownOption key={option.value} id={`${id}-option-${index}`} label={option.label}
          isSelected={option.value === value} isDisabled={option.isDisabled} onClick={() => select(option.value)} />)}
      </DropdownMenuBase>
    </div>
  </div>
}
