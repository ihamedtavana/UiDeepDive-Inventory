import type { ButtonHTMLAttributes } from 'react'
import { FocusRing } from './FocusRing'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hierarchy?: 'primary' | 'secondary'
  appearance?: 'filled' | 'ghost'
  size?: 'small' | 'medium'
  isIconOnly?: boolean
  hasBadge?: boolean
}
export function Button({ className = '', hierarchy = 'secondary', appearance = 'filled', size = 'small', isIconOnly = false, hasBadge = false, children, ...props }: ButtonProps) {
  return <button className={`button button--${hierarchy} button--${size}${appearance === 'ghost' ? ' button--ghost' : ''}${isIconOnly ? ' button--icon' : ''} ${className}`} type="button" {...props}>{children}{hasBadge && <span className="button-badge" aria-hidden="true" />}<FocusRing /></button>
}
