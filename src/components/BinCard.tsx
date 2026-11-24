import type { ReactNode } from 'react'
import { FocusRing } from './FocusRing'
import { StockBoxCompact } from './StockBoxCompact'
import type { StockProduct } from './stockInventory'

type BinCardProps = {
  bin: string
  product: StockProduct
  quantity: number
  contents?: { sku: string; quantity: number }[]
  badge?: ReactNode
  state?: 'Default' | 'Hover' | 'Focused' | 'Pressed'
  onClick: () => void
}

export function BinCard({ bin, product, quantity, contents = [], badge, state = 'Default', onClick }: BinCardProps) {
  const description = contents.length > 1 ? contents.map(item => `${item.sku}: ${item.quantity}`).join(', ') : undefined
  const label = contents.length > 1 ? `${product.name} + ${contents.length - 1} product` : product.name
  return <button type="button" className="bin-card" data-state={state} aria-haspopup="dialog"
    aria-label={`${bin}, ${label}, ${quantity} of 24 units. Manage stock`} onClick={onClick}>
    <span className="bin-card-head"><strong>{bin}</strong><span className="bin-card-badge">{badge}</span></span>
    <StockBoxCompact onHand={quantity} />
    <span className="bin-card-product"><strong title={description ?? label}>{label}</strong>
      <span className="bin-card-foot"><span title={description}>{contents.length > 1 ? `${contents.length} SKUs` : product.sku}</span><span className="bin-card-quantity" key={quantity}><strong>{quantity}</strong><span>/24</span></span></span>
    </span>
    <FocusRing />
  </button>
}
