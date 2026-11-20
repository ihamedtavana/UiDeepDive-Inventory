import { Badge } from './Badge'
export type Warehouse = { name: string; location: string; shelves: number; isDisabled?: boolean }
export function WarehouseOption({ warehouse, isSelected, onSelect }: { warehouse: Warehouse; isSelected: boolean; onSelect: () => void }) {
  return <button className={`warehouse-option${isSelected ? ' is-selected' : ''}`} type="button" aria-pressed={isSelected} disabled={warehouse.isDisabled} onClick={onSelect}><span><strong>{warehouse.name}</strong><small>{warehouse.location}</small></span><Badge>{warehouse.shelves} Shelves</Badge></button>
}
