import type { ReactNode } from 'react'
import { Button } from './Button'
import chevronDown from '../assets/iconChevronDown.svg'
type Props = { icon: string; children: ReactNode; action?: ReactNode; hasChevron?: boolean; isExpanded?: boolean; controlsId?: string; onToggle?: () => void; variant?: 'default' | 'compact' }
export function SectionCardTitle({ icon, children, action, hasChevron = false, isExpanded = true, controlsId, onToggle, variant = 'default' }: Props) {
  const Heading = variant === 'compact' ? 'h3' : 'h2'
  return <header className={`section-card-title${variant === 'compact' ? ' section-card-title--compact' : ''}${hasChevron && !isExpanded ? ' is-collapsed' : ''}`}><div><img className="section-title-icon" src={icon} alt="" /><Heading>{children}</Heading></div>{(action || hasChevron) && <div className="section-title-action">{action}{hasChevron && <Button appearance="ghost" isIconOnly aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${children}`} aria-expanded={isExpanded} aria-controls={controlsId} onClick={onToggle}><img className={`icon${isExpanded ? '' : ' is-collapsed'}`} src={chevronDown} alt="" /></Button>}</div>}</header>
}
