import { Button } from './Button'
import { Dropdown } from './Dropdown'
import { Tab } from './Tab'
import { TabButton } from './TabButton'
import { SHELF_CATALOG } from './inventoryCatalog'
import { inventorySummary, type StockDelivery } from './stockInventory'
import './ShelfHeader.css'

type ShelfHeaderProps = {
  id: string
  shelf: string
  warehouse: string
  deliveries: StockDelivery[]
  onBack: () => void
  onSection: (section: string) => void
  onShelf: (shelf: string) => void
}

export function ShelfHeader({ id, shelf, warehouse, deliveries, onBack, onSection, onShelf }: ShelfHeaderProps) {
  const current = SHELF_CATALOG.find(item => item.code === shelf)!
  const section = shelf[0]
  return <header className="shelf-header">
    <Button onClick={onBack}><span className="icon shelf-back-arrow" aria-hidden="true" />All shelves</Button>
    <div className="shelf-header-title"><span className="shelf-icon"><img className="shelf-header-icon" src={current.icon} alt="" /></span>
      <div className="shelf-header-text"><p>{warehouse} · Section {section}</p><h3 id={id}>Shelf {shelf} · {current.category}</h3></div>
    </div>
    <div className="shelf-navigation">
      <Dropdown label="Section" value={section} options={['A', 'B', 'C'].map(value => ({ value, label: `Section ${value}` }))} onChange={onSection} />
      <Tab label="Select shelf">{SHELF_CATALOG.filter(item => item.code.startsWith(section)).map(item => {
        const summary = inventorySummary(deliveries, warehouse, item.code)
        const tone = summary.out ? 'error' : summary.low ? 'warning' : 'success'
        return <TabButton key={item.code} isSelected={item.code === shelf} onClick={() => onShelf(item.code)}
          badge={<i className={`status status--${tone}`} aria-hidden="true" />}>{item.code}</TabButton>
      })}</Tab>
    </div>
  </header>
}
