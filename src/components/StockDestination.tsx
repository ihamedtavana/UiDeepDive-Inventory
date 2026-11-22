import { BinPicker } from './BinPicker'
import { SectionCardTitle } from './SectionCardTitle'
import { STOCK_SHELVES, WAREHOUSES, shelfLabel, type StockBin, type Allocation } from './stockInventory'
import location from '../assets/stock-send-01.svg'
import building from '../assets/stock-building-02.svg'
import shelfIcon from '../assets/stock-layers-three-01.svg'
import styles from './AddStockPanel.module.css'

type StockDestinationProps = {
  warehouse: string
  shelf: string
  defaultBin: string
  bins: StockBin[]
  selected: string[]
  allocations: Allocation[]
  remaining: number
  hasError: boolean
  isSplit: boolean
  onWarehouse: (value: string) => void
  onShelf: (value: string) => void
  onBin: (bin: string) => void
}

export function StockDestination({ warehouse, shelf, defaultBin, bins, selected, allocations, remaining, hasError, isSplit, onWarehouse, onShelf, onBin }: StockDestinationProps) {
  return <section className={styles.card}>
    <SectionCardTitle icon={location} variant="compact" isIconTinted>Destination</SectionCardTitle>
    <div className={styles.fields}>
      <label>Warehouse<span className={styles.select}><img className="icon" src={building} alt="" /><select value={warehouse} onChange={event => onWarehouse(event.target.value)}>{WAREHOUSES.map(value => <option key={value}>{value}</option>)}</select></span></label>
      <label>Shelf<span className={styles.select}><img className="icon" src={shelfIcon} alt="" /><select value={shelf} onChange={event => onShelf(event.target.value)}>{STOCK_SHELVES.map(item => <option key={item.code} value={item.code}>{shelfLabel(item.code)}</option>)}</select></span></label>
      <BinPicker shelf={shelfLabel(shelf)} defaultBin={defaultBin} bins={bins} selected={selected} allocations={allocations} remaining={remaining} hasError={hasError} isSplit={isSplit} onSelect={onBin} />
    </div>
  </section>
}
