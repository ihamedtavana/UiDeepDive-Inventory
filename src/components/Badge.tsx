import type { ReactNode } from 'react'
type BadgeProps = { children: ReactNode; tone?: 'neutral' | 'warning' | 'error' | 'success' | 'brand' }
export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}
