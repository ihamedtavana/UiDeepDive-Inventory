import { useId } from 'react'
import { Button } from './Button'
import styles from './AddStockPanel.module.css'

type QuantityStepperProps = {
  value: string
  helper: string
  hasError: boolean
  isDisabled: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function QuantityStepper({ value, helper, hasError, isDisabled, onChange, onSubmit }: QuantityStepperProps) {
  const helperId = useId()
  const quantity = Number(value)
  const adjust = (delta: number) => onChange(String(Math.max(0, Math.min(999, quantity + delta))))

  return <div className={styles.stepperField}>
    <div className={styles.stepper} data-invalid={hasError || undefined}>
      <Button appearance="ghost" isIconOnly aria-label="Remove one unit" disabled={isDisabled || quantity === 0} onClick={() => adjust(-1)}><span aria-hidden="true">−</span></Button>
      <div className={styles.stepperValue}>
        <input aria-label="Quantity to add" aria-describedby={helperId} aria-invalid={hasError || undefined} inputMode="numeric" maxLength={3} autoComplete="off" value={value} placeholder="0" size={Math.max(value.length, 1)} disabled={isDisabled}
          onChange={event => { if (/^\d{0,3}$/.test(event.target.value)) onChange(event.target.value) }}
          onFocus={event => event.currentTarget.select()}
          onBlur={() => onChange(String(quantity))}
          onKeyDown={event => {
            if (event.key === 'Enter') { event.preventDefault(); onSubmit() }
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault()
              adjust(event.key === 'ArrowUp' ? 1 : -1)
            }
          }} />
        <span aria-hidden="true">units</span>
      </div>
      <Button appearance="ghost" isIconOnly aria-label="Add one unit" disabled={isDisabled || quantity >= 999} onClick={() => adjust(1)}><span aria-hidden="true">+</span></Button>
    </div>
    <p id={helperId} className={hasError ? styles.invalid : styles.muted}>{helper}</p>
  </div>
}
