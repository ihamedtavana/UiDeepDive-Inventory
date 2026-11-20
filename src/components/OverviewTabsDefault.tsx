import { Badge } from './Badge'
import { Button } from './Button'
import { Tab } from './Tab'
import type { Period } from './Tab'
import calendar from '../assets/top1_imgCalendar.svg'
import upload from '../assets/top1_imgUpload01.svg'
import { useEffect, useRef, useState } from 'react'
import { CustomDateRange } from './CustomDateRange'
import type { DateRange } from './CustomDateRange'

export function OverviewTabsDefault({ period, onSelect, warehouse, customRange, onCustomRange }: { period: Period; onSelect: (period: Period) => void; warehouse: string; customRange: DateRange | null; onCustomRange: (range: DateRange | null) => void }) {
  const ranges: Record<Period, string> = { Today: 'Oct 31', '7 days': 'Oct 25 - Oct 31', '30 days': 'Oct 2 - Oct 31', '90 days': 'Aug 3 - Oct 31' }
  const [isOpen, setIsOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!isOpen) return; const close = (event: PointerEvent) => { if (!wrapper.current?.contains(event.target as Node)) setIsOpen(false) }; document.addEventListener('pointerdown', close); return () => document.removeEventListener('pointerdown', close) }, [isOpen])
  const close = () => { setIsOpen(false); wrapper.current?.querySelector<HTMLButtonElement>('.tab-button:last-child')?.focus() }
  const format = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return <section className="overview-tabs" aria-label="Overview controls">
    <div className="overview-heading"><h2>{warehouse}</h2><Badge>Synced 2 min ago</Badge></div>
    <div className="overview-controls">
      <div className="date-picker-anchor" ref={wrapper}><div className="date-controls"><div className="date-range"><img className="icon" src={calendar} alt="" /><span>{customRange ? `${format(customRange.start)} - ${format(customRange.end)}` : ranges[period]}</span></div><span className="vertical-divider" /><Tab selected={customRange ? 'Custom' : period} onSelect={value => { onCustomRange(null); onSelect(value); setIsOpen(false) }} onCustom={() => setIsOpen(open => !open)} /></div>{isOpen && <CustomDateRange value={customRange ?? { start: '2026-10-02', end: '2026-10-31' }} onCancel={close} onApply={value => { onCustomRange(value); close() }} />}</div>
      <Button size="medium" className="export-button"><img className="icon" src={upload} alt="" />Export</Button>
    </div>
  </section>
}
