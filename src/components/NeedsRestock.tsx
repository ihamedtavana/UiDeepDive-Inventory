import { Badge } from './Badge'
import { Button } from './Button'
import { ProductIdentity } from './ProductIdentity'
import { SectionCardTitle } from './SectionCardTitle'
import packageSearch from '../assets/wh4_imgPackageSearch.svg'
import gpu from '../assets/wh4_imgAsusDualFanGraphicsCardRender2.png'
import motherboard from '../assets/raw0_0.png'
import ram1 from '../assets/raw1_0.png'
import ram2 from '../assets/raw2_0.png'
import cpu from '../assets/raw3_0.png'
const rows = [
  ['GeForce RTX 4070 Super','Graphics Cards','GPU-0107','A1-L2-S3',gpu],
  ['PRO Z790-A','Motherboards','MBD-0104','A3-L3-S4',motherboard],
  ['Kingston Fury Beast RGB DDR5','RAM','RAM-0105','B1-L2-S1',ram1],
  ['Corsair Vengeance RGB DDR5','RAM','RAM-0110','B1-L1-S2',ram2],
  ['Ryzen 7 7800X3D','Processors','CPU-0108','A2-L2-S4',cpu],
]
export function NeedsRestock() {
  return <section className="needs-restock">
    <SectionCardTitle icon={packageSearch} action={<><Badge tone="error">80 Out</Badge><Badge tone="warning">160 Low</Badge><Button hierarchy="primary" appearance="ghost" className="accent-action">Show All</Button></>}>Needs Restock</SectionCardTitle>
    <div className="table-wrap"><table className="data-table restock-table"><colgroup><col /><col /><col /><col /><col /></colgroup><thead><tr><th scope="col">Product</th><th scope="col">SKU &amp; Bin</th><th scope="col">Stock</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>{rows.map(([name,category,sku,bin,image])=><tr key={sku}><td><ProductIdentity name={name} category={category} image={image} /></td><td><strong>{sku}</strong><span className="table-secondary">{bin}</span></td><td><strong>0</strong><span className="table-muted"> / Min 3</span></td><td><Badge tone="error">Out Of Stock</Badge></td><td><Button className="table-action"><span className="icon button-add-icon" aria-hidden="true" />Add stock</Button></td></tr>)}</tbody></table></div>
  </section>
}
