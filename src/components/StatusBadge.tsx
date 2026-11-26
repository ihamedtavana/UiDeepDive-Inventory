export type StatusTone = 'error' | 'warning' | 'success'

export function StatusBadge({ tone }: { tone: StatusTone }) {
  return <span className={`status status--${tone}`} aria-hidden="true" />
}
