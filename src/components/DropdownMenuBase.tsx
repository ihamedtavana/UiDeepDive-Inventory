import './Dropdown.css'
import type { ReactNode } from 'react'

export function DropdownMenuBase({ id, labelId, children }: { id: string; labelId: string; children: ReactNode }) {
  return <div id={id} role="listbox" aria-labelledby={labelId} className="dropdown-menu-base">{children}</div>
}
