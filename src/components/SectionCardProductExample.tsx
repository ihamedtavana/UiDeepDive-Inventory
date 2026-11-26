import { OverviewCard } from './OverviewCard'
import packageIcon from '../assets/design-system/page-status.svg'

const inventory = [['1,921', 'Available'], ['90', 'Out Stock'], ['180', 'Reserved']] as const

export function SectionCardProductExample({ headingId }: { headingId?: string }) {
  return <OverviewCard title="Total Products" icon={packageIcon} badge="+3.8%" headingId={headingId} isPositive>
    <div className="overview-card-body">
      <div className="overview-reading"><strong>1,240</strong><span>Products</span></div>
      <div className="overview-stats">
        {inventory.map(([value, label]) => <div className="overview-stat" key={label}>
          <strong>{value}</strong><div>{label}</div>
        </div>)}
      </div>
    </div>
  </OverviewCard>
}
