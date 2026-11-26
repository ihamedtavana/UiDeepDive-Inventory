export type StatusTone = 'error' | 'warning' | 'success' | 'brand' | 'neutral'

export function StatusBadge({ tone }: { tone: StatusTone }) {
  return <span className={`status status--${tone}`} aria-hidden="true" />
}
