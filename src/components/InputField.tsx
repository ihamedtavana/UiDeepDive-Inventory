import { useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import calendar from '../assets/top1_imgCalendar.svg'
export function InputField({ label, error, helper, leadingIcon, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; helper?: string; leadingIcon?: string }) {
  const id = useId()
  const [isPressed, setIsPressed] = useState(false)
  const isDate = props.type === 'date'
  const rawValue = typeof props.value === 'string' ? props.value : ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(rawValue) ? new Date(`${rawValue}T00:00:00`) : null
  const displayValue = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'
  const description = error || helper
  const icon = (src: string) => <span className="icon input-field-icon" style={{ maskImage: `url('${src.replaceAll("'", '%27')}')` }} aria-hidden="true" />
  const inputProps = { ...props, id, 'aria-label': props['aria-label'] ?? label, 'aria-invalid': !!error, 'aria-describedby': [props['aria-describedby'], description ? `${id}-description` : undefined].filter(Boolean).join(' ') || undefined }
  return <label className="input-field" htmlFor={id}>{label}{isDate ? <span className={`input-field-control input-field-date${isPressed ? ' is-pressed' : ''}`}><span className="input-field-date-value" aria-hidden="true">{displayValue}</span>{icon(calendar)}<input {...inputProps} onPointerDown={event => { setIsPressed(true); props.onPointerDown?.(event) }} onBlur={event => { setIsPressed(false); props.onBlur?.(event) }} onKeyDown={event => { setIsPressed(event.key === 'Enter' || event.key === ' '); props.onKeyDown?.(event) }} onChange={event => { setIsPressed(false); props.onChange?.(event) }} /></span> : leadingIcon ? <span className="input-field-with-icon">{icon(leadingIcon)}<input {...inputProps} /></span> : <input {...inputProps} />}{description && <span id={`${id}-description`} className={error ? 'input-error' : 'input-helper'}>{description}</span>}</label>
}

