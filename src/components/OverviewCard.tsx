import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { SectionCard } from './SectionCard'

type Props = { title: string; icon: string; badge: string; isPositive?: boolean; children: ReactNode }

export function OverviewCard({ title, icon, badge, isPositive = false, children }: Props) {
  return <SectionCard className="overview-card"><div className="card-title"><div><img className="icon" src={icon} alt="" /><span className="card-title-label" title={title}>{title}</span></div><Badge tone={isPositive ? 'success' : 'neutral'}>{badge}</Badge></div>{children}</SectionCard>
}
