import { useId } from 'react'
import { Button } from './Button'
import styles from './AddStockPanel.module.css'

type QuantityStepperProps = {
  value: string
  helper: string
  hasError: boolean
  isDisabled: boolean
  onChange: (value: string) => void
  onSubmit?: () => void
  variant?: 'stock' | 'documentation'
  labelId?: string
  placeholder?: string
}

export function QuantityStepper({ value, helper, hasError, isDisabled, onChange, onSubmit, variant = 'stock', labelId, placeholder = '0' }: QuantityStepperProps) {
  const helperId = useId()
  const quantity = Number(value)
  const isDocumentation = variant === 'documentation'
  const adjust = (delta: number) => onChange(String(Math.max(0, Math.min(999, quantity + delta))))

  return <div className={isDocumentation ? styles.stepperDocumentation : styles.stepperField}>
    <div className={styles.stepper} data-invalid={hasError || undefined}>
      <Button appearance="ghost" size={isDocumentation ? 'medium' : 'small'} isIconOnly aria-label={isDocumentation ? 'Decrease quantity' : 'Remove one unit'} disabled={isDisabled || quantity === 0} onClick={() => adjust(-1)}>
        <span className={isDocumentation ? styles.stepperDecrease : undefined} aria-hidden="true">{!isDocumentation && '−'}</span>
      </Button>
      <div className={styles.stepperValue}>
        <input aria-label="Quantity to add" aria-labelledby={labelId} aria-describedby={helperId} aria-invalid={hasError || undefined}
          role={isDocumentation ? 'spinbutton' : undefined} aria-valuemin={isDocumentation ? 0 : undefined}
          aria-valuemax={isDocumentation ? 999 : undefined} aria-valuenow={isDocumentation ? quantity : undefined}
          inputMode="numeric" maxLength={3} autoComplete="off" value={value} placeholder={placeholder}
          size={Math.max((value || placeholder).length, 1)} disabled={isDisabled}
          onChange={event => { if (/^\d{0,3}$/.test(event.target.value)) onChange(event.target.value) }}
          onFocus={event => event.currentTarget.select()}
          onBlur={() => onChange(String(quantity))}
          onKeyDown={event => {
            if (event.key === 'Enter' && onSubmit) { event.preventDefault(); onSubmit() }
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault()
              adjust(event.key === 'ArrowUp' ? 1 : -1)
            }
          }} />
        <span aria-hidden="true">units</span>
      </div>
      <Button appearance="ghost" size={isDocumentation ? 'medium' : 'small'} isIconOnly aria-label={isDocumentation ? 'Increase quantity' : 'Add one unit'} disabled={isDisabled || quantity >= 999} onClick={() => adjust(1)}>
        <span className={isDocumentation ? styles.stepperIncrease : undefined} aria-hidden="true">{!isDocumentation && '+'}</span>
      </Button>
    </div>
    <p id={helperId} className={hasError ? styles.invalid : styles.muted}>{helper}</p>
  </div>
}
