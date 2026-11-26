import { TabButton } from './TabButton'
import type { KeyboardEvent, ReactNode } from 'react'
const options = ['Today', '7 days', '30 days', '90 days', 'Custom']
const arrowSteps: Readonly<Record<string, number | undefined>> = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }
export type Period = 'Today' | '7 days' | '30 days' | '90 days'
type TabProps =
  | { selected: Period | 'Custom'; onSelect: (period: Period) => void; onCustom: () => void }
  | { children: ReactNode; label: string }
  | { options: readonly { label: string; value?: string }[]; label: string; selected: string; onChangeSelection: (label: string) => void }

function moveSelection(event: KeyboardEvent<HTMLDivElement>) {
  const step = arrowSteps[event.key]
  if (step === undefined) return

  const radios = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]')]
  const current = radios.indexOf(event.target as HTMLButtonElement)
  if (current === -1) return

  event.preventDefault()
  const next = radios[(current + step + radios.length) % radios.length]
  next.focus()
  next.click()
}

export function Tab(props: TabProps) {
  if ('children' in props) return <div className="tab" role="group" aria-label={props.label}>{props.children}</div>
  if ('options' in props) return <div className="tab" role="radiogroup" aria-label={props.label} onKeyDown={moveSelection}>
    {props.options.map(({ label, value }) => <TabButton key={label} value={value} selectionRole="radio"
      isSelected={props.selected === label} onClick={() => props.onChangeSelection(label)}>{label}</TabButton>)}
  </div>
  return <div className="tab" role="group" aria-label="Date range">{options.map(option => <TabButton key={option} isSelected={props.selected === option} onClick={() => { if (option === 'Custom') props.onCustom(); else props.onSelect(option as Period) }}>{option}</TabButton>)}</div>
}
