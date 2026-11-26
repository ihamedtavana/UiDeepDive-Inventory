import type { ReactNode } from 'react'
export type BadgeTone = 'neutral' | 'warning' | 'error' | 'success' | 'brand' | 'info'
type BadgeProps = { children: ReactNode; tone?: BadgeTone }
export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}
