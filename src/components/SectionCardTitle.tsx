import type { ReactNode } from 'react'
import { Button } from './Button'
import chevronDown from '../assets/iconChevronDown.svg'
type Props = { icon: string; children: ReactNode; action?: ReactNode; hasChevron?: boolean; chevronLabel?: string }
export function SectionCardTitle({ icon, children, action, hasChevron = false, chevronLabel }: Props) {
  return <header className="section-card-title"><div><img className="section-title-icon" src={icon} alt="" /><h2>{children}</h2></div>{(action || hasChevron) && <div className="section-title-action">{action}{hasChevron && <Button appearance="ghost" isIconOnly aria-label={chevronLabel}><img className="icon" src={chevronDown} alt="" /></Button>}</div>}</header>
}
