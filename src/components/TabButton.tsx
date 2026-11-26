import './TabButton.css'
import type { ReactNode } from 'react'
type TabButtonProps = { children: ReactNode; badge?: ReactNode; isSelected: boolean } &
  ({ href: string } | { href?: undefined; isDisabled?: boolean; onClick: () => void })
export function TabButton(props: TabButtonProps) {
  const { children, badge, isSelected } = props
  const className = `tab-button${isSelected ? ' is-selected' : ''}`
  const content = <>{badge}{children}<FocusRing /></>
  if (props.href !== undefined) {
    return <a className={className} href={props.href} aria-current={isSelected ? 'location' : undefined}>{content}</a>
  }
  return <button type="button" className={className} aria-pressed={isSelected} disabled={props.isDisabled} onClick={props.onClick}>{content}</button>
}
import { FocusRing } from './FocusRing'
