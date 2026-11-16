import type { ReactNode } from 'react'
type Props = { icon: string; children: ReactNode; action?: ReactNode }
export function SectionCardTitle({ icon, children, action }: Props) {
  return <header className="section-card-title"><div><img className="section-title-icon" src={icon} alt="" /><h2>{children}</h2></div>{action && <div className="section-title-action">{action}</div>}</header>
}
