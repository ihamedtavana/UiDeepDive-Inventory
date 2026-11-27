import { useId, useRef, useState } from 'react'
import { AddStockDrawer } from './AddStockDrawer'
import { BinCard } from './BinCard'
import { Button } from './Button'
import { ShelfHeader } from './ShelfHeader'
import { ShelfSummary } from './ShelfSummary'
import { INVENTORY_CATALOG, SHELF_CATALOG } from './inventoryCatalog'
import { inventorySummary, WAREHOUSES, type StockProduct } from './stockInventory'
import './ShelfSection.css'

const referenceShelf = 'A1'
const referenceSummary = { used: 186, capacity: 288, percentage: 75, inStock: 6, low: 1, out: 1, full: 4 }
const referenceStatuses = { A1: 'error', A2: 'warning', A3: 'error' } as const
const warehouse = WAREHOUSES[0]
const states = ['Default', 'Hover', 'Focused', 'Pressed'] as const
const referenceProducts = ['GPU-0101', 'GPU-0106'].map(sku => INVENTORY_CATALOG.find(product => product.sku === sku)!)
const stateProduct = INVENTORY_CATALOG.find(product => product.sku === 'GPU-0107')!

type BinSample = { bin: string; product: StockProduct; quantity: number }

export function ShelfBinCardPreview({ variant }: { variant: 'overview' | 'states' }) {
  const headingId = useId()
  const drawerTitleId = useId()
  const previousShelves = useRef<Record<string, string>>({ A: 'A1', B: 'B1', C: 'C1' })
  const [shelf, setShelf] = useState(referenceShelf)
  const [drawer, setDrawer] = useState<BinSample | 'shelves' | null>(null)
  const current = SHELF_CATALOG.find(item => item.code === shelf)!
  const summary = inventorySummary([], warehouse, shelf)
  const isReference = shelf === referenceShelf
  const bins = isReference
    ? referenceProducts.map(product => ({ bin: product.defaultBin, product, quantity: 15 }))
    : summary.bins.slice(0, 2).map(({ id, product, used }) => ({ bin: id, product, quantity: used }))
  const selectShelf = (code: string) => {
    previousShelves.current[code[0]] = code
    setShelf(code)
  }

  return <>
    <div className={`shelf-bin-docs-preview shelf-bin-docs-preview--${variant}`}>
      {variant === 'overview' ? <>
        <figure className="shelf-bin-docs-wide">
          <ShelfHeader id={headingId} shelf={shelf} warehouse={warehouse} deliveries={[]}
            context={shelf} shelfTitle={current.category} shelfStatuses={referenceStatuses}
            onBack={() => setDrawer('shelves')} onSection={section => selectShelf(previousShelves.current[section])} onShelf={selectShelf} />
          <figcaption>Shelf Header</figcaption>
        </figure>
        <figure className="shelf-bin-docs-wide">
          {/* The reference meter is half filled even though its adjacent label says 75%. */}
          <ShelfSummary summary={isReference ? referenceSummary : summary} meterPercentage={isReference ? 50 : undefined} />
          <figcaption>Shelf Summary</figcaption>
        </figure>
        {bins.map((sample, index) => <figure key={sample.bin}>
          <BinCard {...sample} state={index ? 'Hover' : 'Default'} onClick={() => setDrawer(sample)} />
          <figcaption>{index ? 'Bin Card · Hover' : 'Bin Card'}</figcaption>
        </figure>)}
      </> : states.map(state => {
        const sample = { bin: stateProduct.defaultBin, product: stateProduct, quantity: 15 }
        return <figure key={state}>
          <BinCard {...sample} state={state} onClick={() => setDrawer(sample)} />
          <figcaption>{state}</figcaption>
        </figure>
      })}
    </div>
    {drawer && <AddStockDrawer titleId={drawerTitleId} isBusy={false} onClose={() => setDrawer(null)}>
      {close => <div className="shelf-bin-docs-drawer">
        <h2 id={drawerTitleId}>{drawer === 'shelves' ? 'All shelves' : drawer.bin}</h2>
        {drawer === 'shelves' ? <ul>
          {SHELF_CATALOG.map(item => <li key={item.code}>
            <Button onClick={() => { selectShelf(item.code); close() }}>{item.code} · {item.category}</Button>
          </li>)}
        </ul> : <dl>
          <dt>Product</dt><dd>{drawer.product.name}</dd>
          <dt>SKU</dt><dd>{drawer.product.sku}</dd>
          <dt>Quantity</dt><dd>{drawer.quantity} of 24 units</dd>
        </dl>}
        <Button onClick={close}>Close</Button>
      </div>}
    </AddStockDrawer>}
  </>
}
