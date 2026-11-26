import { Button } from './Button'
import { Badge } from './Badge'
import { SectionCard } from './SectionCard'
import { PercentageContainer } from './PercentageContainer'
export type ShelfStatus = 'low' | 'out'
export type Shelf = { code: string; name: string; description: string; icon: string; percentage: number; available: string; out: string; reserved: string; status?: ShelfStatus }
export function ShelfCard({ shelf, headingId, onViewShelf }: { shelf: Shelf; headingId?: string; onViewShelf?: () => void }) {
  const Title = headingId ? 'h3' : 'span'
  return <SectionCard className="shelf-card" aria-labelledby={headingId}>
    <div className="card-title"><div><Title id={headingId} className="card-title-label">Shelf {shelf.code}</Title></div>{shelf.status === 'low' && <Badge tone="warning">Low Stock</Badge>}{shelf.status === 'out' && <Badge tone="error">Out Of Stock</Badge>}</div>
    <div className="shelf-identity"><div className="shelf-icon"><img src={shelf.icon} alt="" /></div><div><strong>{shelf.name}</strong><p>{shelf.description}</p></div></div>
    <div className="shelf-health"><div><span>Stock health</span><span>{shelf.percentage}%</span></div><PercentageContainer percentage={shelf.percentage} size="medium" /></div>
    <div className="shelf-stats">{[[shelf.available,'Available'],[shelf.out,'Out Stock'],[shelf.reserved,'Reserved']].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <Button className="shelf-action" onClick={onViewShelf} inert={!onViewShelf} aria-label={`View Shelf ${shelf.code}`}>View Shelf</Button>
  </SectionCard>
}
