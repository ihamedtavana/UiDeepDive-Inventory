import searchIcon from '../assets/imgSearchMd.svg'
import { Badge } from './Badge'
import { FocusRing } from './FocusRing'
import type { InputHTMLAttributes, RefObject } from 'react'
import { useState } from 'react'
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & { icon?: string; isCollapsed?: boolean; isSelected?: boolean; hasShortcut?: boolean; onExpand?: () => void; inputRef?: RefObject<HTMLInputElement | null> }
export function Search({ icon = searchIcon, isCollapsed = false, isSelected = false, hasShortcut = true, onExpand, inputRef, ...inputProps }: Props) {
  const [isPointerFocus, setIsPointerFocus] = useState(false)
  if (isCollapsed) return <button className="search search--collapsed" type="button" aria-label={inputProps['aria-label'] ?? 'Search SKU or bin'} onClick={onExpand}><img className="icon" src={icon} alt="" /><FocusRing /></button>
  return <label className={`search${isSelected ? ' is-selected' : ''}${isPointerFocus ? ' is-pointer-focus' : ''}`}><img className="icon" src={icon} alt="" /><input aria-label="Search SKU or bin" placeholder="Search SKU, bin…" {...inputProps} ref={inputRef} onPointerDown={event => { setIsPointerFocus(true); inputProps.onPointerDown?.(event) }} onBlur={event => { setIsPointerFocus(false); inputProps.onBlur?.(event) }} />{hasShortcut && <Badge>⌘K</Badge>}<FocusRing /></label>
}
