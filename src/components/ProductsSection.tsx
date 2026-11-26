import type { Period } from './Tab'
import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { FocusRing } from './FocusRing'
import { Pagination } from './Pagination'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ProductIdentity } from './ProductIdentity'
import { TabButton } from './TabButton'
import { INVENTORY_CATALOG } from './inventoryCatalog'
import { stockCount, type StockDelivery, type StockProduct } from './stockInventory'
import productIcon from '../assets/remaining2_imgPackage.svg'
import searchIcon from '../assets/remaining2_imgSearchMd.svg'

type StockStatus = 'In Stock' | 'Low' | 'Out'
type Product = { name: string; category: string; sku: string; bin: string; stock: number; minimum: number; reserved: number; incoming: number; image: string; isActive: boolean }
const featured = ['GPU-0111', 'MBD-0105', 'GPU-0107', 'MBD-0104', 'RAM-0106']
const products = [...featured.map(sku => INVENTORY_CATALOG.find(product => product.sku === sku)!), ...INVENTORY_CATALOG.filter(product => !featured.includes(product.sku))]
const filters = ['All', 'In Stock', 'Low', 'Out'] as const
type Filter = typeof filters[number]
const pageSize = 5
function stockStatus(product: Product): StockStatus {
  return product.stock === 0 ? 'Out' : product.stock < product.minimum ? 'Low' : 'In Stock'
}

export function ProductsSection({ warehouse, deliveries, onAddStock }: { period: Period; warehouse: string; deliveries: StockDelivery[]; onAddStock: (product: StockProduct) => void }) {
  const periodProducts: Product[] = products.map(product => {
    const stock = stockCount(deliveries, product.sku, warehouse)
    const added = deliveries.filter(delivery => delivery.sku === product.sku && delivery.warehouse === warehouse).flatMap(delivery => delivery.allocations).reduce((sum, allocation) => sum + allocation.quantity, 0)
    return { ...product, stock, bin: product.defaultBin, reserved: Math.min(stock, Math.floor(product.initial / 6)), incoming: product.initial < product.minimum ? Math.max(0, 24 - added) : 0, isActive: product.sku !== 'RAM-0112' }
  })
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)
  const filtered = periodProducts.filter(p => (filter === 'All' || stockStatus(p) === filter) && `${p.name} ${p.sku} ${p.bin}`.toLowerCase().includes(query.trim().toLowerCase()))
  const pageCount = Math.ceil(filtered.length / pageSize)
  const currentPage = Math.min(page, Math.max(1, pageCount))
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(number => number === 1 || number === pageCount || Math.abs(number - currentPage) <= 1)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return <SectionCard className="products-section">
    <SectionCardTitle icon={productIcon} action={<div className="products-controls"><label className="product-search"><img className="icon" src={searchIcon} alt="" /><input aria-label="Search products" placeholder="Search SKU, bin…" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /><FocusRing /></label><div className="product-filters" role="group" aria-label="Filter products by stock">{filters.map(option => <TabButton key={option} isSelected={filter === option} onClick={() => { setFilter(option); setPage(1) }}>{`${option} · ${option === 'All' ? periodProducts.length : periodProducts.filter(p => stockStatus(p) === option).length}`}</TabButton>)}</div><Button hierarchy="primary" className="table-action">Add product</Button></div>}>Products</SectionCardTitle>
    <div className="table-wrap"><table className="data-table products-table"><thead><tr><th scope="col">Product</th><th scope="col">SKU &amp; Bin</th><th scope="col">Stock</th><th scope="col">Reserved</th><th scope="col">Incoming</th><th scope="col">Stock</th><th scope="col">Product status</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr></thead><tbody>{visible.map(p => { const status = stockStatus(p); const isActive = status !== 'Out' && p.isActive; return <tr key={p.sku}><td><ProductIdentity name={p.name} category={p.category} image={p.image} /></td><td><strong>{p.sku}</strong><span className="table-secondary">{p.bin}</span></td><td><strong>{p.stock}</strong><span className="table-muted"> / Min {p.minimum}</span></td><td>{p.reserved || '–'}</td><td>{p.incoming ? `+${p.incoming}` : '–'}</td><td><Badge tone={status === 'Out' ? 'error' : status === 'Low' ? 'warning' : 'success'}>{status === 'Out' ? 'Out Of Stock' : status === 'Low' ? 'Low Stock' : 'In Stock'}</Badge></td><td className={isActive ? '' : 'table-muted'}>{isActive ? 'Active' : 'Inactive'}</td><td><Button isIconOnly className="more-button" aria-label={`Manage stock for ${p.name}`} aria-haspopup="dialog" onClick={() => onAddStock({ ...p, defaultBin: p.bin })}><span aria-hidden="true">···</span></Button></td></tr> })}</tbody></table>
      {visible.length === 0 && <p className="empty-message">No matching products</p>}
      <footer className="table-footer">
        <span>Showing {filtered.length ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, filtered.length)}` : '0'} of {filtered.length} products</span>
        <Pagination label="Product pages" page={currentPage} pageCount={pageCount} pages={pages} onPageChange={setPage} />
      </footer>
    </div>
  </SectionCard>
}
