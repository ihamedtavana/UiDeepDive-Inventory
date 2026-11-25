import { useId, useState } from 'react'
import type { InputHTMLAttributes, MouseEventHandler } from 'react'
import calendar from '../assets/top1_imgCalendar.svg'
import { Button } from './Button'

type TrailingIconProps = {
  trailingIcon?: string
  onTrailingIconClick?: never
  trailingIconLabel?: never
  isTrailingIconPressed?: never
} | {
  trailingIcon: string
  onTrailingIconClick: MouseEventHandler<HTMLButtonElement>
  trailingIconLabel: string
  isTrailingIconPressed?: boolean
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  helper?: string
  leadingIcon?: string
} & TrailingIconProps

export function InputField({ label, error, helper, leadingIcon, trailingIcon, onTrailingIconClick, trailingIconLabel, isTrailingIconPressed, ...props }: InputFieldProps) {
  const generatedId = useId()
  const id = props.id ?? generatedId
  const [isPressed, setIsPressed] = useState(false)
  const isDate = props.type === 'date'
  const rawValue = typeof props.value === 'string' ? props.value : ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(rawValue) ? new Date(`${rawValue}T00:00:00`) : null
  const displayValue = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'
  const description = error || helper
  const icon = (src: string, className = '') => <span className={`icon input-field-icon ${className}`} style={{ maskImage: `url('${src.replaceAll("'", '%27')}')` }} aria-hidden="true" />
  const inputProps = { ...props, id, 'aria-label': props['aria-label'] ?? label, 'aria-invalid': !!error, 'aria-describedby': [props['aria-describedby'], description ? `${id}-description` : undefined].filter(Boolean).join(' ') || undefined }
  return <div className="input-field">
    <label htmlFor={id}>{label}</label>
    {isDate ? <span className={`input-field-control input-field-date${isPressed ? ' is-pressed' : ''}`}>
      <span className="input-field-date-value" aria-hidden="true">{displayValue}</span>
      {icon(calendar)}
      <input {...inputProps} onPointerDown={event => { setIsPressed(true); props.onPointerDown?.(event) }} onBlur={event => { setIsPressed(false); props.onBlur?.(event) }} onKeyDown={event => { setIsPressed(event.key === 'Enter' || event.key === ' '); props.onKeyDown?.(event) }} onChange={event => { setIsPressed(false); props.onChange?.(event) }} />
    </span> : leadingIcon || trailingIcon ? <span className={`input-field-with-icon${leadingIcon ? ' has-leading-icon' : ''}${trailingIcon ? ' has-trailing-icon' : ''}`}>
      {leadingIcon && icon(leadingIcon, 'input-field-leading-icon')}
      <input {...inputProps} />
      {trailingIcon && (onTrailingIconClick ? <Button className="input-field-trailing-action" appearance="ghost" isIconOnly disabled={props.disabled} aria-label={trailingIconLabel} aria-controls={id} aria-pressed={isTrailingIconPressed} onPointerDown={event => event.preventDefault()} onClick={onTrailingIconClick}>{icon(trailingIcon)}</Button> : icon(trailingIcon, 'input-field-trailing-icon'))}
    </span> : <input {...inputProps} />}
    {description && <span id={`${id}-description`} className={error ? 'input-error' : 'input-helper'}>{description}</span>}
  </div>
}

