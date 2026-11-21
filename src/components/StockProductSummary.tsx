import { Badge } from './Badge'
import { ProductIdentity } from './ProductIdentity'
import { stockTone, type StockProduct } from './stockInventory'
import styles from './AddStockPanel.module.css'

export function StockProductSummary({ product, onHand }: { product: StockProduct; onHand: number }) {
  const status = stockTone(onHand, product.minimum)
  return <div className={styles.product}>
    <ProductIdentity name={product.name} category={product.category} image={product.image} />
    <div className={styles.productStock}><strong>{onHand}</strong><span className={styles.muted}> / Min {product.minimum}</span></div>
    <Badge tone={status.tone}>{status.label}</Badge>
  </div>
}
