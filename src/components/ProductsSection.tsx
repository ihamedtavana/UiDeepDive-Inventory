import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ProductIdentity } from './ProductIdentity'
import productIcon from '../assets/remaining2_imgPackage.svg'
import searchIcon from '../assets/remaining2_imgSearchMd.svg'
import product1 from '../assets/remaining2_imgAsusDualFanGraphicsCardRender2.png'
import product2 from '../assets/remaining2_imgAsusDualFanGraphicsCardRender3.png'
import product3 from '../assets/remaining2_imgAsusDualFanGraphicsCardRender4.png'
import product4 from '../assets/remaining2_imgAsusDualFanGraphicsCardRender5.png'
import product5 from '../assets/remaining2_imgAsusDualFanGraphicsCardRender6.png'
const products = [
  {name:'Radeon RX 7900 XTX',category:'Graphics Cards',sku:'GPU-0107',bin:'A1-L2-S3',reserved:'-',incoming:'-',image:product2},
  {name:'PRO Z790-A',category:'Motherboards',sku:'MBD-0104',bin:'A3-L3-S4',reserved:'80',incoming:'-',image:product3},
  {name:'Kingston Fury Beast RGB DDR5',category:'RAM',sku:'RAM-0105',bin:'B1-L2-S1',reserved:'-',incoming:'+80',image:product4},
  {name:'Corsair Vengeance RGB DDR5',category:'RAM',sku:'RAM-0110',bin:'B1-L1-S2',reserved:'-',incoming:'-',image:product5},
  {name:'Ryzen 7 7800X3D',category:'Processors',sku:'CPU-0108',bin:'A2-L2-S4',reserved:'-',incoming:'+44',image:product1},
]
export function ProductsSection() {
  const [query,setQuery] = useState('')
  const visible = products.filter(p => `${p.name} ${p.sku} ${p.bin}`.toLowerCase().includes(query.toLowerCase()))
  return <SectionCard className="products-section">
    <SectionCardTitle icon={productIcon} action={<div className="products-controls"><label className="product-search"><img className="icon" src={searchIcon} alt="" /><input aria-label="Search products" placeholder="Search SKU, bin…" value={query} onChange={e=>setQuery(e.target.value)} /></label><div className="product-filters"><span>All · 691</span><span>In Stock · 420</span><span>Low · 190</span><strong>Out · 81</strong></div><Button hierarchy="primary" className="table-action">Add product</Button></div>}>Products</SectionCardTitle>
    <div className="table-wrap"><table className="data-table products-table"><thead><tr><th>Product</th><th>SKU &amp; Bin</th><th>Stock</th><th>Reserved</th><th>Incoming</th><th>Stock</th><th>Product status</th><th><span className="visually-hidden">Actions</span></th></tr></thead><tbody>{visible.map(p=><tr key={p.sku}><td><ProductIdentity name={p.name} category={p.category} image={p.image} /></td><td><strong>{p.sku}</strong><span className="table-secondary">{p.bin}</span></td><td><strong>0</strong><span className="table-muted"> / Min 3</span></td><td>{p.reserved}</td><td>{p.incoming}</td><td><Badge tone="error">Out Of Stock</Badge></td><td className="table-muted">Inactive</td><td><Button className="more-button" aria-label={`More options for ${p.name}`}>···</Button></td></tr>)}</tbody></table>
      {visible.length === 0 && <p className="empty-message">No matching products</p>}
      <footer className="table-footer"><span>Showing {visible.length ? '1–' : ''}{visible.length} of {query ? visible.length : 96} products</span><div className="pagination"><Button disabled aria-label="Previous page">‹</Button><Button>1</Button><span>2</span><span>3</span><span>…</span><span>12</span><Button aria-label="Next page">›</Button></div></footer>
    </div>
  </SectionCard>
}
