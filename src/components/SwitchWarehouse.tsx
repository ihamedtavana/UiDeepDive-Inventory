import { useState } from 'react'
import { Search } from './Search'
import { WarehouseOption } from './WarehouseOption'
import type { Warehouse } from './WarehouseOption'
export const warehouses: Warehouse[] = [{ name: 'New York Central', location: 'New York, NY', shelves: 16 }, { name: 'Los Angeles West', location: 'Los Angeles, CA', shelves: 12 }, { name: 'Chicago North', location: 'Chicago, IL', shelves: 10 }, { name: 'Dallas South', location: 'Dallas, TX', shelves: 8 }]
export function SwitchWarehouse({ selected, onSelect, onClose }: { selected: string; onSelect: (name: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const matches = warehouses.filter(item => `${item.name} ${item.location}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <div className="selection-panel warehouse-panel" role="dialog" aria-label="Switch warehouse" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onClose() } }}><div className="selection-heading"><strong>Switch warehouse</strong><span>Select a warehouse to view.</span></div><Search hasShortcut={false} autoFocus aria-label="Search warehouses" placeholder="Search warehouses…" value={query} onChange={event => setQuery(event.target.value)} /><div className="warehouse-options">{matches.map(item => <WarehouseOption key={item.name} warehouse={item} isSelected={selected === item.name} onSelect={() => onSelect(item.name)} />)}{!matches.length && <span className="selection-empty">No warehouses found.</span>}</div></div>
}
