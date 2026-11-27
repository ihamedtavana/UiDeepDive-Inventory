import { PercentageContainer } from './PercentageContainer'
import type { inventorySummary } from './stockInventory'

type Summary = ReturnType<typeof inventorySummary>

export function ShelfSummary({ summary, meterPercentage = summary.percentage }: { summary: Omit<Summary, 'bins'>; meterPercentage?: number }) {
  const counts = [
    { label: 'In stock', value: summary.inStock, tone: 'success' },
    { label: 'Low stock', value: summary.low, tone: 'warning' },
    { label: 'Out of stock', value: summary.out, tone: 'error' },
    { label: 'Full', value: summary.full, tone: 'full' },
  ]
  return <div className="shelf-summary-panel">
    <div className="shelf-summary-metrics">
      <div className="shelf-units"><strong key={summary.used}>{summary.used.toLocaleString('en-US')}</strong><span>/{summary.capacity}</span></div>
      <div className="shelf-capacity"><strong key={summary.percentage}>{summary.percentage}%</strong><span>Capacity Used</span></div>
      <div className="shelf-capacity-meter"><PercentageContainer percentage={meterPercentage} /></div>
    </div>
    <div className="shelf-bin-counts">{counts.map(item => <div key={item.label}><strong key={item.value}>{item.value}</strong>
      <span><i className={`status status--${item.tone}`} aria-hidden="true" />{item.label}</span></div>)}</div>
    <span className="visually-hidden" role="status">{summary.used} of {summary.capacity} units. {summary.percentage}% capacity used. {summary.out} empty bins.</span>
  </div>
}
