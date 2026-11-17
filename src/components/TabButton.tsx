type TabButtonProps = { children: string; isSelected: boolean; onClick: () => void }
export function TabButton({ children, isSelected, onClick }: TabButtonProps) {
  return <button type="button" className={`tab-button${isSelected ? ' is-selected' : ''}`} aria-pressed={isSelected} onClick={onClick}>{children}<FocusRing /></button>
}
import { FocusRing } from './FocusRing'
