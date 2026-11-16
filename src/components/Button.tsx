import type { ButtonHTMLAttributes } from 'react'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hierarchy?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
}
export function Button({ className = '', hierarchy = 'secondary', size = 'small', ...props }: ButtonProps) {
  return <button className={`button button--${hierarchy} button--${size} ${className}`} type="button" {...props} />
}
