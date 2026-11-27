import { Sidebar } from './Sidebar'
import { SidebarMenuButton } from './SidebarMenuButton'
import packageIcon from '../assets/imgPackage.svg'
import activePackageIcon from '../assets/design-system/shadow-package-active.svg'

const overview = [
  { caption: 'Sidebar · Expanded', description: 'Expanded dashboard sidebar with the warehouse, search, main menu, shelves and 75% capacity used.' },
  { caption: 'Collapsed', part: 'Collapsed', description: 'Dashboard sidebar collapsed into a rail of icons and shelf codes.' },
  { caption: 'Sidebar - Warehouse Card', part: 'Warehouse Card', description: 'New York Central warehouse card, with 16 shelves, 2 low and 1 out.' },
  { caption: 'Sidebar - Main Menu', part: 'Main Menu', description: 'Seven dashboard navigation items, with Overview active.' },
  { caption: 'Sidebar - Shelves', part: 'Shelves', description: 'Eight shelves organized by name and shelf code, from A1 to C2.' },
] as const

const states = ['Default', 'Hover', 'Active'] as const

export function SidebarDocumentationPreview({ variant }: { variant: 'overview' | 'states' }) {
  if (variant === 'overview') {
    return <div className="sidebar-docs-preview sidebar-docs-preview--overview">
      {overview.map(example => <figure key={example.caption}>
        <div className="sidebar-docs-instance" role="img" aria-label={example.description}>
          <div inert>
            <Sidebar isPreview previewPart={'part' in example ? example.part : undefined}
              selectedWarehouse="New York Central" deliveries={[]} onSelectWarehouse={() => {}} />
          </div>
        </div>
        <figcaption>{example.caption}</figcaption>
      </figure>)}
    </div>
  }

  return <div className="sidebar-docs-preview sidebar-docs-preview--states">
    {[false, true].flatMap(isCollapsed => states.map(state => {
      const caption = isCollapsed ? `Collapsed · ${state}` : state
      const isSelected = state === 'Active'
      return <figure key={caption} data-state={state} data-layout={isCollapsed ? 'Collapsed' : 'Expanded'}>
        <div role="img" aria-label={isCollapsed ? 'Products icon, alert marker and count 96' : 'Products, alert marker and count 96'}>
          <div inert>
            <SidebarMenuButton icon={isSelected ? activePackageIcon : packageIcon} detail="96" status="error"
              isCollapsed={isCollapsed} isSelected={isSelected}>Products</SidebarMenuButton>
          </div>
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    }))}
  </div>
}
