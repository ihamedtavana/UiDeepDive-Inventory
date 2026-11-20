import type { Period } from './Tab'
import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { FocusRing } from './FocusRing'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ProductIdentity } from './ProductIdentity'
import { TabButton } from './TabButton'
import productIcon from '../assets/remaining2_imgPackage.svg'
import searchIcon from '../assets/remaining2_imgSearchMd.svg'
import graphicsCard from '../assets/remaining2_imgAsusDualFanGraphicsCardRender3.png'
import motherboard from '../assets/remaining2_imgAsusDualFanGraphicsCardRender4.png'
import kingstonRam from '../assets/remaining2_imgAsusDualFanGraphicsCardRender5.png'
import corsairRam from '../assets/remaining2_imgAsusDualFanGraphicsCardRender6.png'

type StockStatus = 'In Stock' | 'Low' | 'Out'
type Product = { name: string; category: string; sku: string; bin: string; stock: number; minimum: number; reserved: number; incoming: number; image: string; isActive: boolean }
const products: Product[] = [
  { name: 'Radeon RX 7900 XTX', category: 'Graphics Cards', sku: 'GPU-0107', bin: 'A1-L2-S3', stock: 24, minimum: 5, reserved: 4, incoming: 12, image: graphicsCard, isActive: true },
  { name: 'PRO Z790-A WiFi', category: 'Motherboards', sku: 'MBD-0105', bin: 'A3-L3-S3', stock: 3, minimum: 5, reserved: 1, incoming: 20, image: motherboard, isActive: true },
  { name: 'Radeon RX 7900 XTX White', category: 'Graphics Cards', sku: 'GPU-0110', bin: 'A1-L2-S1', stock: 0, minimum: 3, reserved: 0, incoming: 8, image: graphicsCard, isActive: true },
  { name: 'PRO Z790-A', category: 'Motherboards', sku: 'MBD-0104', bin: 'A3-L3-S4', stock: 18, minimum: 4, reserved: 3, incoming: 0, image: motherboard, isActive: true },
  { name: 'Kingston Fury Beast DDR5 16GB', category: 'RAM', sku: 'RAM-0106', bin: 'B1-L2-S2', stock: 6, minimum: 10, reserved: 2, incoming: 32, image: kingstonRam, isActive: true },
  { name: 'PRO Z790-P', category: 'Motherboards', sku: 'MBD-0107', bin: 'A3-L3-S2', stock: 0, minimum: 4, reserved: 0, incoming: 12, image: motherboard, isActive: true },
  { name: 'Kingston Fury Beast RGB DDR5', category: 'RAM', sku: 'RAM-0105', bin: 'B1-L2-S1', stock: 72, minimum: 10, reserved: 8, incoming: 40, image: kingstonRam, isActive: true },
  { name: 'Corsair Vengeance DDR5 32GB', category: 'RAM', sku: 'RAM-0111', bin: 'B1-L1-S3', stock: 4, minimum: 8, reserved: 1, incoming: 24, image: corsairRam, isActive: true },
  { name: 'Kingston Fury Beast RGB DDR5 64GB', category: 'RAM', sku: 'RAM-0107', bin: 'B1-L2-S4', stock: 0, minimum: 6, reserved: 0, incoming: 24, image: kingstonRam, isActive: true },
  { name: 'Corsair Vengeance RGB DDR5', category: 'RAM', sku: 'RAM-0110', bin: 'B1-L1-S2', stock: 46, minimum: 8, reserved: 6, incoming: 0, image: corsairRam, isActive: true },
  { name: 'Radeon RX 7800 XT', category: 'Graphics Cards', sku: 'GPU-0109', bin: 'A1-L1-S2', stock: 2, minimum: 5, reserved: 1, incoming: 10, image: graphicsCard, isActive: true },
  { name: 'Corsair Vengeance RGB DDR5 64GB', category: 'RAM', sku: 'RAM-0112', bin: 'B1-L1-S4', stock: 0, minimum: 6, reserved: 0, incoming: 0, image: corsairRam, isActive: false },
  { name: 'Radeon RX 7900 XT', category: 'Graphics Cards', sku: 'GPU-0108', bin: 'A1-L2-S4', stock: 12, minimum: 4, reserved: 2, incoming: 8, image: graphicsCard, isActive: true },
  { name: 'PRO B760-A WiFi', category: 'Motherboards', sku: 'MBD-0106', bin: 'A3-L2-S1', stock: 4, minimum: 6, reserved: 0, incoming: 16, image: motherboard, isActive: true },
  { name: 'Radeon RX 7700 XT', category: 'Graphics Cards', sku: 'GPU-0111', bin: 'A1-L1-S3', stock: 0, minimum: 4, reserved: 0, incoming: 6, image: graphicsCard, isActive: true },
]
const filters = ['All', 'In Stock', 'Low', 'Out'] as const
type Filter = typeof filters[number]
const pageSize = 5
function stockStatus(product: Product): StockStatus {
  return product.stock === 0 ? 'Out' : product.stock <= product.minimum ? 'Low' : 'In Stock'
}

export function ProductsSection({ period }: { period: Period }) {
  const adjustment = { Today: 0, '7 days': 1, '30 days': 0, '90 days': 2 }[period]
  const periodProducts = products.map(p => ({ ...p, stock: p.stock > p.minimum ? p.stock + adjustment : p.stock, incoming: p.incoming ? p.incoming + adjustment * 2 : 0 }))
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)
  const filtered = periodProducts.filter(p => (filter === 'All' || stockStatus(p) === filter) && `${p.name} ${p.sku} ${p.bin}`.toLowerCase().includes(query.trim().toLowerCase()))
  const pageCount = Math.ceil(filtered.length / pageSize)
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  return <SectionCard className="products-section">
    <SectionCardTitle icon={productIcon} action={<div className="products-controls"><label className="product-search"><img className="icon" src={searchIcon} alt="" /><input aria-label="Search products" placeholder="Search SKU, bin…" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /><FocusRing /></label><div className="product-filters" role="group" aria-label="Filter products by stock">{filters.map(option => <TabButton key={option} isSelected={filter === option} onClick={() => { setFilter(option); setPage(1) }}>{`${option} · ${option === 'All' ? periodProducts.length : periodProducts.filter(p => stockStatus(p) === option).length}`}</TabButton>)}</div><Button hierarchy="primary" className="table-action">Add product</Button></div>}>Products</SectionCardTitle>
    <div className="table-wrap"><table className="data-table products-table"><thead><tr><th scope="col">Product</th><th scope="col">SKU &amp; Bin</th><th scope="col">Stock</th><th scope="col">Reserved</th><th scope="col">Incoming</th><th scope="col">Stock</th><th scope="col">Product status</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr></thead><tbody>{visible.map(p => { const status = stockStatus(p); const isActive = status !== 'Out' && p.isActive; return <tr key={p.sku}><td><ProductIdentity name={p.name} category={p.category} image={p.image} /></td><td><strong>{p.sku}</strong><span className="table-secondary">{p.bin}</span></td><td><strong>{p.stock}</strong><span className="table-muted"> / Min {p.minimum}</span></td><td>{p.reserved || '–'}</td><td>{p.incoming ? `+${p.incoming}` : '–'}</td><td><Badge tone={status === 'Out' ? 'error' : status === 'Low' ? 'warning' : 'success'}>{status === 'Out' ? 'Out Of Stock' : status === 'Low' ? 'Low Stock' : 'In Stock'}</Badge></td><td className={isActive ? '' : 'table-muted'}>{isActive ? 'Active' : 'Inactive'}</td><td><Button isIconOnly className="more-button" aria-label={`More options for ${p.name}`}><span aria-hidden="true">···</span></Button></td></tr> })}</tbody></table>
      {visible.length === 0 && <p className="empty-message">No matching products</p>}
      <footer className="table-footer"><span>Showing {filtered.length ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)}` : '0'} of {filtered.length} products</span><nav className="pagination" aria-label="Product pages"><Button isIconOnly disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page"><span className="pagination-chevron pagination-chevron--previous" aria-hidden="true" /></Button>{Array.from({ length: pageCount }, (_, index) => <Button key={index + 1} aria-label={`Page ${index + 1}`} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)}>{index + 1}</Button>)}<Button isIconOnly disabled={page >= pageCount} onClick={() => setPage(page + 1)} aria-label="Next page"><span className="pagination-chevron" aria-hidden="true" /></Button></nav></footer>
    </div>
  </SectionCard>
}
