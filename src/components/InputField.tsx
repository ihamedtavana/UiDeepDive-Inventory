import { useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import calendar from '../assets/top1_imgCalendar.svg'
export function InputField({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = useId()
  const [isPressed, setIsPressed] = useState(false)
  const isDate = props.type === 'date'
  const rawValue = typeof props.value === 'string' ? props.value : ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(rawValue) ? new Date(`${rawValue}T00:00:00`) : null
  const displayValue = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'
  return <label className="input-field" htmlFor={id}>{label}{isDate ? <span className={`input-field-control input-field-date${isPressed ? ' is-pressed' : ''}`}><span className="input-field-date-value" aria-hidden="true">{displayValue}</span><img className="icon" src={calendar} alt="" /><input {...props} id={id} aria-label={label} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} onPointerDown={event => { setIsPressed(true); props.onPointerDown?.(event) }} onBlur={event => { setIsPressed(false); props.onBlur?.(event) }} onKeyDown={event => { setIsPressed(event.key === 'Enter' || event.key === ' '); props.onKeyDown?.(event) }} onChange={event => { setIsPressed(false); props.onChange?.(event) }} /></span> : <input {...props} id={id} aria-label={label} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />}{error && <span id={`${id}-error`} className="input-error">{error}</span>}</label>
}

