import { TabButton } from './TabButton'
const options = ['Today', '7 days', '30 days', '90 days', 'Custom']
export type Period = 'Today' | '7 days' | '30 days' | '90 days'
export function Tab({ selected, onSelect, onCustom }: { selected: Period | 'Custom'; onSelect: (period: Period) => void; onCustom: () => void }) {
  return <div className="tab" role="group" aria-label="Date range">{options.map(option => <TabButton key={option} isSelected={selected === option} onClick={() => { if (option === 'Custom') onCustom(); else onSelect(option as Period) }}>{option}</TabButton>)}</div>
}
