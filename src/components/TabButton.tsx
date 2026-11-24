import './TabButton.css'
import type { ReactNode } from 'react'
type TabButtonProps = { children: ReactNode; badge?: ReactNode; isSelected: boolean; isDisabled?: boolean; onClick: () => void }
export function TabButton({ children, badge, isSelected, isDisabled, onClick }: TabButtonProps) {
  return <button type="button" className={`tab-button${isSelected ? ' is-selected' : ''}`} aria-pressed={isSelected} disabled={isDisabled} onClick={onClick}>{badge}{children}<FocusRing /></button>
}
import { FocusRing } from './FocusRing'
