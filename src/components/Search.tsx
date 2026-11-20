import searchIcon from '../assets/imgSearchMd.svg'
import { Badge } from './Badge'
import { FocusRing } from './FocusRing'
import type { InputHTMLAttributes, RefObject } from 'react'
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & { isCollapsed?: boolean; isSelected?: boolean; hasShortcut?: boolean; onExpand?: () => void; inputRef?: RefObject<HTMLInputElement | null> }
export function Search({ isCollapsed = false, isSelected = false, hasShortcut = true, onExpand, inputRef, ...inputProps }: Props) {
  if (isCollapsed) return <button className="search search--collapsed" type="button" aria-label="Search SKU or bin" onClick={onExpand}><img className="icon" src={searchIcon} alt="" /><FocusRing /></button>
  return <label className={`search${isSelected ? ' is-selected' : ''}`}><img className="icon" src={searchIcon} alt="" /><input aria-label="Search SKU or bin" placeholder="Search SKU, bin…" {...inputProps} ref={inputRef} />{hasShortcut && <Badge>⌘K</Badge>}<FocusRing /></label>
}
