import searchIcon from '../assets/imgSearchMd.svg'
import { Badge } from './Badge'
export function Search() {
  return <label className="search"><img className="icon" src={searchIcon} alt="" /><input aria-label="Search SKU or bin" placeholder="Search SKU, bin…" /><Badge>⌘K</Badge></label>
}
