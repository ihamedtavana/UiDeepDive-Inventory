import { useState, type RefObject } from 'react'
import { Button } from './Button'
import { Search } from './Search'
import { SectionCard } from './SectionCard'
import { SidebarMenuButton } from './SidebarMenuButton'
import { StatusBadge } from './StatusBadge'
import logo from '../assets/design-system/logo.svg'
import toggle from '../assets/design-system/sidebar-toggle.svg'
import search from '../assets/design-system/search-small.svg'
import intro from '../assets/design-system/intro.svg'
import principles from '../assets/design-system/principles.svg'
import howToUse from '../assets/design-system/how-to-use.svg'
import dashboardLayout from '../assets/design-system/dashboard-layout.svg'
import dataTables from '../assets/design-system/data-tables.svg'
import emptyLoading from '../assets/design-system/empty-loading.svg'
import pageStatus from '../assets/design-system/page-status.svg'
import changelog from '../assets/design-system/changelog.svg'
import contribute from '../assets/design-system/contribute.svg'

const pagePaths: Readonly<Record<string, string | undefined>> = {
  Color: '/designsystem/foundation/color',
  Typography: '/designsystem/foundation/typography',
  Spacing: '/designsystem/foundation/spacing',
  Radius: '/designsystem/foundation/radius',
  Shadow: '/designsystem/foundation/shadow',
  Layout: '/designsystem/foundation/layout',
  Iconography: '/designsystem/foundation/iconography',
  Button: '/designsystem/components/button',
  Badge: '/designsystem/components/badge',
  Tab: '/designsystem/components/tab',
  Search: '/designsystem/components/search',
  'Section Card': '/designsystem/components/section-card',
  Table: '/designsystem/components/table',
  Pagination: '/designsystem/components/pagination',
  'Progress Bar': '/designsystem/components/progress-bar',
}
export type DesignSystemPage = 'Color' | 'Typography' | 'Spacing' | 'Radius' | 'Shadow' | 'Layout' | 'Iconography' | 'Button' | 'Badge' | 'Tab' | 'Search' | 'Section Card' | 'Table' | 'Pagination' | 'Progress Bar'
const menus = [
  { title: 'Getting Started', isCompact: true, items: [{ label: 'Introduction', icon: intro }, { label: 'Principles', icon: principles }, { label: 'How to Use', icon: howToUse }] },
  { title: 'Foundations', items: ['Color', 'Typography', 'Spacing', 'Radius', 'Shadow', 'Layout', 'Iconography'].map((label, index) => ({ label, detail: `F${index + 1}`, status: 'success' as const })) },
  { title: 'Components', items: ['Button', 'Badge', 'Tab', 'Search', 'Section Card', 'Table', 'Pagination', 'Progress Bar'].map((label, index) => ({ label, detail: `C${index + 1}`, status: (index === 7 ? 'warning' : 'success') as 'warning' | 'success' })) },
  { title: 'Patterns', isCompact: true, items: [{ label: 'Dashboard Layout', icon: dashboardLayout }, { label: 'Data Tables', icon: dataTables }, { label: 'Empty & Loading', icon: emptyLoading }] },
]
const legend = [['Ready', 'success'], ['In progress', 'warning'], ['Not started', 'error']] as const

type Props = {
  mode: 'static' | 'drawer'
  page: DesignSystemPage
  searchInput: RefObject<HTMLInputElement | null>
  onClose: () => void
}

export function DesignSystemSidebar({ mode, page, searchInput, onClose }: Props) {
  const isDrawer = mode === 'drawer'
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const searchQuery = query.trim().toLowerCase()
  const visibleMenus = menus.map(menu => ({
    ...menu,
    items: menu.items.filter(({ label }) => label.toLowerCase().includes(searchQuery)),
  })).filter(menu => menu.items.length > 0)
  const expandSearch = () => {
    setIsCollapsed(false)
    requestAnimationFrame(() => searchInput.current?.focus())
  }

  return <aside className={`sidebar docs-sidebar${isCollapsed ? ' is-collapsed' : ''}`} aria-label="Design system sidebar">
    <div className="sidebar-logo">
      <div className="brand"><img src={logo} alt={isCollapsed ? 'CoreTech' : ''} />{!isCollapsed && <strong>CoreTech</strong>}</div>
      <Button appearance="ghost" className="sidebar-toggle" aria-label={isDrawer ? 'Close navigation' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={isDrawer ? undefined : !isCollapsed} onClick={isDrawer ? onClose : () => setIsCollapsed(value => !value)}>
        {isDrawer ? <span className="docs-close-glyph" aria-hidden="true">×</span> : <img src={toggle} alt="" />}
      </Button>
    </div>
    <div className="search-section">
      <div className="divider" />
      <Search icon={search} aria-label="Search docs" placeholder="Search docs…" isCollapsed={isCollapsed} onExpand={expandSearch} inputRef={searchInput} value={query} onChange={event => setQuery(event.target.value)} />
      <div className="divider" />
    </div>
    <nav id="docs-nav" className="docs-menu" aria-label="Design system" onClick={isDrawer ? event => {
      if ((event.target as HTMLElement).closest('a[href]')) onClose()
    } : undefined}>
      {visibleMenus.map(({ title, items, isCompact }) =>
        <div className="menu-section" key={title}>
          {!isCollapsed && <div className={`section-label${isCompact ? ' section-label--compact' : ''}`}>{title}</div>}
          <div className="menu-list">
            {items.map(({ label, ...item }) => <SidebarMenuButton
              key={label} {...item} isCollapsed={isCollapsed} isSelected={label === page}
              href={pagePaths[label]}
            >{label}</SidebarMenuButton>)}
          </div>
        </div>
      )}
      {searchQuery && !visibleMenus.length &&
        <p className="section-label" role="status">No matching pages</p>}
    </nav>
    {!isCollapsed && <>
      <div className="divider" />
      <SectionCard className="storage-card" aria-label="Page Status">
        <div className="card-title"><div><img className="icon" src={pageStatus} alt="" />Page Status</div></div>
        <ul className="docs-status-list">
          {legend.map(([label, tone]) => <li key={label}><StatusBadge tone={tone} />{label}</li>)}
        </ul>
      </SectionCard>
    </>}
    <div className="divider" />
    <div className="menu-list">
      <SidebarMenuButton icon={changelog} isCollapsed={isCollapsed}>Changelog</SidebarMenuButton>
      <SidebarMenuButton icon={contribute} isCollapsed={isCollapsed}>Contribute</SidebarMenuButton>
    </div>
  </aside>
}
