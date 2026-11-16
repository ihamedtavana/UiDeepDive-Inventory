import { useState } from 'react'
import { TabButton } from './TabButton'
const options = ['Today', '7 days', '30 days', '90 days', 'Custom']
export function Tab() {
  const [selected, setSelected] = useState('30 days')
  return <div className="tab" role="group" aria-label="Date range">{options.map(option => <TabButton key={option} isSelected={selected === option} onClick={() => setSelected(option)}>{option}</TabButton>)}</div>
}
