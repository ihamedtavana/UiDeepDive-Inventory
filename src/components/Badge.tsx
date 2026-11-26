import type { ReactNode } from 'react'
export type BadgeTone = 'neutral' | 'gray' | 'warning' | 'error' | 'success' | 'brand' | 'info'
type BadgeProps = { children: ReactNode; tone?: BadgeTone; leadingIcon?: ReactNode; trailingIcon?: ReactNode }
export function Badge({ children, tone = 'neutral', leadingIcon, trailingIcon }: BadgeProps) {
  const colorTone = tone === 'gray' ? 'neutral' : tone
  return <span className={`badge badge--${colorTone}`}>{leadingIcon}{children}{trailingIcon}</span>
}
