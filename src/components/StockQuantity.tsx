import { Button } from './Button'
import { QuantityStepper } from './QuantityStepper'
import { SectionCardTitle } from './SectionCardTitle'
import { StockBox, type StockBoxState } from './StockBox'
import packagePlus from '../assets/stock-package-plus.svg'
import styles from './AddStockPanel.module.css'

type StockQuantityProps = {
  value: string
  onHand: number
  onHandInBin: number
  room: number
  bin: string
  minimum: number
  boxState: StockBoxState
  hasError: boolean
  isDisabled: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function StockQuantity({ value, onHand, onHandInBin, room, bin, minimum, boxState, hasError, isDisabled, onChange, onSubmit }: StockQuantityProps) {
  const quantity = Number(value)
  const toMinimum = Math.max(0, minimum - onHand)
  return <section className={styles.card}>
    <SectionCardTitle icon={packagePlus} variant="compact">Quantity to add</SectionCardTitle>
    <div className={styles.quantityRow}>
      <div className={styles.quantityBox}><StockBox state={boxState} onHand={onHandInBin} adding={quantity} width={238} /></div>
      <div className={styles.quantityControls}>
        <QuantityStepper value={value} helper={bin ? `Room for ${room} in bin ${bin}` : 'Choose a bin to check capacity'} hasError={hasError} isDisabled={isDisabled} onChange={onChange} onSubmit={onSubmit} />
        <div className={styles.presets}>
          <Button disabled={isDisabled || room === 0} onClick={() => onChange(String(room))}>Fill bin · {room}</Button>
          <Button disabled={isDisabled || toMinimum === 0} onClick={() => onChange(String(toMinimum))}>To minimum · {toMinimum}</Button>
        </div>
        <div className={styles.presets}>{[5, 10, 20].map(amount => <Button key={amount} disabled={isDisabled || quantity >= 999} onClick={() => onChange(String(Math.min(999, quantity + amount)))}>+{amount}</Button>)}</div>
      </div>
    </div>
    <dl className={styles.stats} aria-label="Stock preview">
      <div><dt><i aria-hidden="true" />Current stock</dt><dd>{onHand}</dd></div>
      <div><dt><i aria-hidden="true" data-over={hasError || undefined} />Adding</dt><dd>{quantity ? `+${quantity}` : 0}</dd></div>
      <div><dt>Stock after adding</dt><dd>{onHand + quantity}</dd></div>
    </dl>
  </section>
}
