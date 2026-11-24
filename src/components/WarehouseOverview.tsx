import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { PercentageContainer } from './PercentageContainer'
import { ShelfCard } from './ShelfCard'
import { ShelfSection } from './ShelfSection'
import { NeedsRestock } from './NeedsRestock'
import { SHELF_CATALOG } from './inventoryCatalog'
import { inventorySummary, type StockDelivery, type StockProduct } from './stockInventory'
import home from '../assets/imgHome02.svg'

export function WarehouseOverview({ warehouse, deliveries, onAddStock }: { warehouse: string; deliveries: StockDelivery[]; onAddStock: (product: StockProduct) => void }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null)
  const [isChanging, setIsChanging] = useState(false)
  const [viewHeight, setViewHeight] = useState<number>()
  const content = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const lastShelf = useRef<string | null>(null)
  const contentId = useId()
  const total = inventorySummary(deliveries, warehouse)
  const shelves = SHELF_CATALOG.map(shelf => {
    const summary = inventorySummary(deliveries, warehouse, shelf.code)
    const stockHealth = Math.round((summary.bins.length - summary.out - summary.low) / summary.bins.length * 100)
    return { ...shelf, summary, stockHealth }
  })
  const healthy = shelves.filter(({ stockHealth }) => stockHealth >= 50).length
  const restock = shelves.length - healthy
  const low = shelves.filter(({ summary, stockHealth }) => summary.used > 0 && stockHealth < 50).length

  useLayoutEffect(() => {
    const height = content.current?.getBoundingClientRect().height
    if (height) setViewHeight(Math.ceil(height))
  }, [selectedShelf, deliveries])
  useEffect(() => {
    const element = content.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      const height = element.getBoundingClientRect().height
      if (height) setViewHeight(Math.ceil(height))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const selectShelf = (code: string | null) => {
    if (isChanging || code === selectedShelf) return
    lastShelf.current = selectedShelf ?? code
    const finish = () => {
      setSelectedShelf(code)
      setIsChanging(false)
      window.requestAnimationFrame(() => {
        if (code) content.current?.querySelector<HTMLElement>('.shelf-header button')?.focus({ preventScroll: true })
        else content.current?.querySelector<HTMLElement>(`[aria-label="View Shelf ${lastShelf.current}"]`)?.focus({ preventScroll: true })
      })
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { finish(); return }
    setIsChanging(true)
    timer.current = window.setTimeout(finish, 120)
  }

  return <SectionCard className="warehouse-overview">
    <SectionCardTitle icon={home} hasChevron isExpanded={isExpanded} controlsId={contentId} onToggle={() => setIsExpanded(expanded => !expanded)}>Warehouse Overview</SectionCardTitle>
    <div id={contentId} className="section-disclosure" inert={!isExpanded} aria-hidden={!isExpanded || undefined}>
      <div className="section-disclosure-body">
        <div className="warehouse-overview-content">
          <div className="shelf-summary">{[[String(shelves.length), 'Total shelves'], [String(healthy), 'In Stock'], [String(restock), 'Restock Needed'], [String(low), 'Low Stock']].map(([value, label], index) =>
            <div className="summary-stat" key={label}><strong>{value}</strong><span>{index > 0 && <i className={`status status--${index === 1 ? 'success' : index === 2 ? 'warning' : 'error'}`} />}{label}</span></div>)}
            <div className="summary-capacity"><div><strong>{total.percentage}%</strong><span>Capacity Used</span></div><PercentageContainer percentage={total.percentage} /></div>
          </div>
          <div className="warehouse-view" style={{ height: viewHeight }}>
            <div ref={content} className={`warehouse-view-content${isChanging ? ' is-leaving' : ''}`}>
              {selectedShelf ? <ShelfSection shelf={selectedShelf} warehouse={warehouse} deliveries={deliveries} onBack={() => selectShelf(null)} onShelf={setSelectedShelf} onAddStock={onAddStock} />
                : <div className="shelf-grid">{shelves.map(({ summary, stockHealth, ...shelf }) => {
                  const reserved = summary.bins.reduce((sum, bin) => sum + Math.min(bin.used, Math.floor(bin.product.initial / 6)), 0)
                  return <ShelfCard key={shelf.code} onViewShelf={() => selectShelf(shelf.code)} shelf={{
                    ...shelf, name: shelf.category,
                    percentage: stockHealth,
                    available: String(summary.used - reserved), out: String(summary.out), reserved: String(reserved),
                    status: summary.used === 0 ? 'out' : stockHealth < 50 ? 'low' : undefined,
                  }} />
                })}</div>}
            </div>
          </div>
        </div>
        <NeedsRestock warehouse={warehouse} deliveries={deliveries} onAddStock={onAddStock} />
      </div>
    </div>
  </SectionCard>
}
