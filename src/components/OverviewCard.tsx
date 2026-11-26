import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { SectionCard } from './SectionCard'

type Props = { title: string; icon: string; badge: string; headingId?: string; isPositive?: boolean; children: ReactNode }

export function OverviewCard({ title, icon, badge, headingId, isPositive = false, children }: Props) {
  const Title = headingId ? 'h3' : 'span'
  return <SectionCard className="overview-card" aria-labelledby={headingId}>
    <div className="card-title">
      <div><img className="icon" src={icon} alt="" /><Title id={headingId} className="card-title-label" title={title}>{title}</Title></div>
      <Badge tone={isPositive ? 'success' : 'neutral'}>{badge}</Badge>
    </div>
    {children}
  </SectionCard>
}
