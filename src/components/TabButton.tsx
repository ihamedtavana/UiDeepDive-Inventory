type TabButtonProps = { children: string; isSelected: boolean; isDisabled?: boolean; onClick: () => void }
export function TabButton({ children, isSelected, isDisabled, onClick }: TabButtonProps) {
  return <button type="button" className={`tab-button${isSelected ? ' is-selected' : ''}`} aria-pressed={isSelected} disabled={isDisabled} onClick={onClick}>{children}<FocusRing /></button>
}
import { FocusRing } from './FocusRing'
