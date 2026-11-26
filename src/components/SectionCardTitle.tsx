import type { ReactNode } from 'react'
import { Button } from './Button'
import chevronDown from '../assets/iconChevronDown.svg'
type Props = { icon: string; children: ReactNode; headingId?: string; headingLevel?: 2 | 3; action?: ReactNode; hasChevron?: boolean; isExpanded?: boolean; controlsId?: string; onToggle?: () => void; variant?: 'default' | 'compact'; isIconTinted?: boolean }
export function SectionCardTitle({ icon, children, headingId, headingLevel, action, hasChevron = false, isExpanded = true, controlsId, onToggle, variant = 'default', isIconTinted = false }: Props) {
  const Heading = (headingLevel ?? (variant === 'compact' ? 3 : 2)) === 3 ? 'h3' : 'h2'
  return <header className={`section-card-title${variant === 'compact' ? ' section-card-title--compact' : ''}${hasChevron && !isExpanded ? ' is-collapsed' : ''}`}><div>{isIconTinted ? <span className="section-title-icon section-title-icon--tinted" style={{ maskImage: `url('${icon.replaceAll("'", '%27')}')` }} aria-hidden="true" /> : <img className="section-title-icon" src={icon} alt="" />}<Heading id={headingId}>{children}</Heading></div>{(action || hasChevron) && <div className="section-title-action">{action}{hasChevron && <Button appearance="ghost" isIconOnly aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${children}`} aria-expanded={isExpanded} aria-controls={controlsId} onClick={onToggle}><img className={`icon${isExpanded ? '' : ' is-collapsed'}`} src={chevronDown} alt="" /></Button>}</div>}</header>
}
