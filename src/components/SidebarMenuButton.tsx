import type { ReactNode } from 'react'
type Props = { children: ReactNode; icon?: string; detail?: string; isSelected?: boolean; isCollapsed?: boolean; status?: 'error' | 'warning' | 'success' }
export function SidebarMenuButton({ children, icon, detail, isSelected = false, isCollapsed = false, status }: Props) {
  return <div className={`sidebar-menu-button${isSelected ? ' is-selected' : ''}${isCollapsed ? ' is-collapsed' : ''}`} aria-current={isSelected ? 'page' : undefined} title={isCollapsed && typeof children === 'string' ? children : undefined} aria-label={isCollapsed && typeof children === 'string' ? `${children}${detail ? ` ${detail}` : ''}` : undefined}>
    {icon && <img className="icon" src={icon} alt="" />}
    {status && <span className={`status status--${status}`} aria-hidden="true" />}
    {!isCollapsed && <span className="menu-label">{children}</span>}{detail && (!isCollapsed || status) && <span className="menu-detail">{detail}</span>}
  </div>
}
