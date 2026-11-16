import { Button } from './Button'
import { SectionCard } from './SectionCard'
import { PercentageContainer } from './PercentageContainer'
export type Shelf = { code: string; name: string; description: string; icon: string; percentage: number; available: string; out: string; reserved: string }
export function ShelfCard({ shelf }: { shelf: Shelf }) {
  return <SectionCard className="shelf-card">
    <div className="shelf-label">Shelf {shelf.code}</div>
    <div className="shelf-identity"><div className="shelf-icon"><img src={shelf.icon} alt="" /></div><div><strong>{shelf.name}</strong><p>{shelf.description}</p></div></div>
    <div className="shelf-health"><div><span>Stock health</span><span>{shelf.percentage}%</span></div><PercentageContainer percentage={shelf.percentage} size="medium" /></div>
    <div className="shelf-stats">{[[shelf.available,'Available'],[shelf.out,'Out Stock'],[shelf.reserved,'Reserved']].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <Button className="shelf-action">View Shelf</Button>
  </SectionCard>
}
