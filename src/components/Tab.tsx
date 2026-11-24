import { TabButton } from './TabButton'
import type { ReactNode } from 'react'
const options = ['Today', '7 days', '30 days', '90 days', 'Custom']
export type Period = 'Today' | '7 days' | '30 days' | '90 days'
type TabProps = { selected: Period | 'Custom'; onSelect: (period: Period) => void; onCustom: () => void } | { children: ReactNode; label: string }
export function Tab(props: TabProps) {
  if ('children' in props) return <div className="tab" role="group" aria-label={props.label}>{props.children}</div>
  return <div className="tab" role="group" aria-label="Date range">{options.map(option => <TabButton key={option} isSelected={props.selected === option} onClick={() => { if (option === 'Custom') props.onCustom(); else props.onSelect(option as Period) }}>{option}</TabButton>)}</div>
}
