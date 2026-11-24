import { useId, useRef } from 'react'
import { Badge } from './Badge'
import { BinCard } from './BinCard'
import { ShelfHeader } from './ShelfHeader'
import { ShelfSummary } from './ShelfSummary'
import { inventorySummary, type StockDelivery, type StockProduct } from './stockInventory'
import './ShelfSection.css'

type ShelfSectionProps = {
  shelf: string
  warehouse: string
  deliveries: StockDelivery[]
  onBack: () => void
  onShelf: (shelf: string) => void
  onAddStock: (product: StockProduct) => void
}

export function ShelfSection({ shelf, warehouse, deliveries, onBack, onShelf, onAddStock }: ShelfSectionProps) {
  const headingId = useId()
  const remembered = useRef<Record<string, string>>({ A: 'A1', B: 'B1', C: 'C1' })
  const summary = inventorySummary(deliveries, warehouse, shelf)
  const selectShelf = (code: string) => { remembered.current[code[0]] = code; onShelf(code) }

  return <section className="shelf-section" aria-labelledby={headingId}>
    <ShelfHeader id={headingId} shelf={shelf} warehouse={warehouse} deliveries={deliveries} onBack={onBack}
      onShelf={selectShelf} onSection={section => selectShelf(remembered.current[section])} />
    <ShelfSummary summary={summary} />
    <div className="shelf-bin-grid" key={shelf}>
      {[3, 2, 1].map(level => <div className="shelf-level" key={level}>
        <span className="shelf-level-label">L{level}</span>
        <div className="shelf-level-bins">{summary.bins.filter(bin => bin.id.includes(`-L${level}-`)).map(bin => {
          const status = bin.used === 0 ? { tone: 'error', label: 'Out of stock' } as const
            : bin.used < bin.product.minimum ? { tone: 'warning', label: 'Low stock' } as const
            : bin.used === 24 ? { tone: 'neutral', label: 'Full' } as const : { tone: 'success', label: 'In stock' } as const
          return <BinCard key={bin.id} bin={bin.id} product={bin.product} quantity={bin.used} contents={bin.contents}
            badge={<Badge tone={status.tone}>{status.label}</Badge>} onClick={() => onAddStock({ ...bin.product, defaultBin: bin.id })} />
        })}</div>
      </div>)}
    </div>
  </section>
}
