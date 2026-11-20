import { useState } from 'react'
import { Button } from './Button'
import { InputField } from './InputField'
export type DateRange = { start: string; end: string }
export function CustomDateRange({ value, onApply, onCancel }: { value: DateRange; onApply: (value: DateRange) => void; onCancel: () => void }) {
  const [start, setStart] = useState(value.start)
  const [end, setEnd] = useState(value.end)
  const isInvalid = !start || !end || start > end
  return <div className="selection-panel date-panel" role="dialog" aria-label="Custom date range" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onCancel() } }}>
    <div className="selection-heading"><strong>Custom date range</strong><span>Select a start and end date.</span></div>
    <div className="date-inputs"><InputField label="Start date" type="date" autoFocus value={start} onChange={event => setStart(event.target.value)} /><InputField label="End date" type="date" value={end} onChange={event => setEnd(event.target.value)} /></div>
    {isInvalid && <span className="input-error" role="alert">Choose a valid date range.</span>}
    <div className="selection-actions"><Button onClick={onCancel}>Cancel</Button><Button hierarchy="primary" disabled={isInvalid} onClick={() => onApply({ start, end })}>Apply</Button></div>
  </div>
}
