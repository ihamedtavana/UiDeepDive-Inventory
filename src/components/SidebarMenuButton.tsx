import type { ReactNode } from 'react'
type Props = { children: ReactNode; icon?: string; detail?: string; isSelected?: boolean; status?: 'error' | 'warning' | 'success' }
export function SidebarMenuButton({ children, icon, detail, isSelected = false, status }: Props) {
  return <div className={`sidebar-menu-button${isSelected ? ' is-selected' : ''}`} aria-current={isSelected ? 'page' : undefined}>
    {icon && <img className="icon" src={icon} alt="" />}
    {status && <span className={`status status--${status}`} aria-hidden="true" />}
    <span className="menu-label">{children}</span>{detail && <span className="menu-detail">{detail}</span>}
  </div>
}
