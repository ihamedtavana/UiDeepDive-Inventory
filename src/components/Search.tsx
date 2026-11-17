import searchIcon from '../assets/imgSearchMd.svg'
import { Badge } from './Badge'
import { FocusRing } from './FocusRing'
import type { RefObject } from 'react'
type Props = { isCollapsed?: boolean; onExpand?: () => void; inputRef?: RefObject<HTMLInputElement | null> }
export function Search({ isCollapsed = false, onExpand, inputRef }: Props) {
  if (isCollapsed) return <button className="search search--collapsed" type="button" aria-label="Search SKU or bin" onClick={onExpand}><img className="icon" src={searchIcon} alt="" /><FocusRing /></button>
  return <label className="search"><img className="icon" src={searchIcon} alt="" /><input ref={inputRef} aria-label="Search SKU or bin" placeholder="Search SKU, bin…" /><Badge>⌘K</Badge><FocusRing /></label>
}
