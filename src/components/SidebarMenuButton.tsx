import type { ReactNode } from 'react'
import { StatusBadge, type StatusTone } from './StatusBadge'

type Props = { children: ReactNode; icon?: string; detail?: string; href?: string; isSelected?: boolean; isCollapsed?: boolean; status?: StatusTone }
export function SidebarMenuButton({ children, icon, detail, href, isSelected = false, isCollapsed = false, status }: Props) {
  const Element = href ? 'a' : 'div'
  return <Element href={href} className={`sidebar-menu-button${isSelected ? ' is-selected' : ''}${isCollapsed ? ' is-collapsed' : ''}`} aria-current={isSelected ? 'page' : undefined} title={isCollapsed && typeof children === 'string' ? children : undefined} aria-label={isCollapsed && typeof children === 'string' ? `${children}${detail ? ` ${detail}` : ''}` : undefined}>
    {icon && <img className="icon" src={icon} alt="" />}
    {status && <StatusBadge tone={status} />}
    {!isCollapsed && <span className="menu-label">{children}</span>}{detail && (!isCollapsed || status) && <span className="menu-detail">{detail}</span>}
  </Element>
}
