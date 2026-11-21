import { Badge } from './Badge'
import { Button } from './Button'
import { ProductIdentity } from './ProductIdentity'
import { SectionCardTitle } from './SectionCardTitle'
import { RESTOCK_PRODUCTS, stockCount, stockTone, type StockDelivery, type StockProduct } from './stockInventory'
import packageSearch from '../assets/wh4_imgPackageSearch.svg'

type NeedsRestockProps = {
  warehouse: string
  deliveries: StockDelivery[]
  onAddStock: (product: StockProduct) => void
}

export function NeedsRestock({ warehouse, deliveries, onAddStock }: NeedsRestockProps) {
  const rows = RESTOCK_PRODUCTS.map(product => {
    const onHand = stockCount(deliveries, product.sku, warehouse)
    return { product, onHand, status: stockTone(onHand, product.minimum) }
  })
  const out = 80 - rows.filter(row => row.onHand > 0).length
  const low = 160 + rows.filter(row => row.status.tone === 'warning').length

  return <section className="needs-restock">
    <SectionCardTitle icon={packageSearch} action={<><Badge tone="error">{out} Out</Badge><Badge tone="warning">{low} Low</Badge><Button hierarchy="primary" appearance="ghost" className="accent-action">Show All</Button></>}>Needs Restock</SectionCardTitle>
    <div className="table-wrap">
      <table className="data-table restock-table">
        <colgroup><col /><col /><col /><col /><col /></colgroup>
        <thead><tr><th scope="col">Product</th><th scope="col">SKU &amp; Bin</th><th scope="col">Stock</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead>
        <tbody>{rows.map(({ product, onHand, status }) => <tr key={product.sku}>
          <td><ProductIdentity name={product.name} category={product.category} image={product.image} /></td>
          <td><strong>{product.sku}</strong><span className="table-secondary">{product.defaultBin}</span></td>
          <td><strong>{onHand}</strong><span className="table-muted"> / Min {product.minimum}</span></td>
          <td><Badge tone={status.tone}>{status.label}</Badge></td>
          <td><Button className="table-action" aria-haspopup="dialog" onClick={() => onAddStock(product)}><span className="icon button-add-icon" aria-hidden="true" />Add stock</Button></td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>
}
