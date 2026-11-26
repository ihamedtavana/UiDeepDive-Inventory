import './TabButton.css'
import type { ReactNode } from 'react'
import { FocusRing } from './FocusRing'

type TabButtonProps = { children: ReactNode; badge?: ReactNode; isSelected: boolean; value?: string } & (
  | { href: string; isStatic?: never }
  | { isStatic: true; href?: never }
  | { href?: never; isStatic?: never; isDisabled?: boolean; onClick: () => void; selectionRole?: 'radio' }
)

export function TabButton(props: TabButtonProps) {
  const { children, badge, isSelected, value } = props
  const className = `tab-button${isSelected ? ' is-selected' : ''}`
  const content = <>{badge}{children}{value !== undefined && <>
    <span className="tab-button-value" aria-hidden="true">·</span>
    <span className="tab-button-value">{value}</span>
  </>}</>
  if (props.isStatic) return <span className={className}>{content}</span>
  if (props.href !== undefined) {
    return <a className={className} href={props.href} aria-current={isSelected ? 'location' : undefined}>{content}<FocusRing /></a>
  }
  const isRadio = props.selectionRole === 'radio'
  return <button type="button" className={className} role={props.selectionRole}
    aria-pressed={isRadio ? undefined : isSelected} aria-checked={isRadio ? isSelected : undefined}
    tabIndex={isRadio ? (isSelected ? 0 : -1) : undefined} disabled={props.isDisabled}
    onClick={props.onClick}>{content}<FocusRing /></button>
}
