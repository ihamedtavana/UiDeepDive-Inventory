type PercentageContainerProps = { percentage: number; size?: 'small' | 'medium' }
export function PercentageContainer({ percentage, size = 'small' }: PercentageContainerProps) {
  const count = size === 'small' ? 25 : 50
  return <div className="percentage" role="meter" aria-label="Capacity used" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
    <div className="percentage-bars">{Array.from({ length: count }, (_, i) => <span key={i} className={i < Math.floor(count * percentage / 100) ? 'is-filled' : ''} />)}</div>
    <div className="percentage-labels">{[0, 20, 40, 60, 80, 100].map(n => <span key={n}>{n}</span>)}</div>
  </div>
}
