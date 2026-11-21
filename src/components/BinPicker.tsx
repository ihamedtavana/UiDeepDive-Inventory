import { Button } from './Button'
import { type StockBin, type Allocation, units } from './stockInventory'
import styles from './AddStockPanel.module.css'

type BinPickerProps = {
  shelf: string
  defaultBin: string
  bins: StockBin[]
  selected: string[]
  allocations: Allocation[]
  remaining: number
  hasError: boolean
  isSplit: boolean
  onSelect: (bin: string) => void
}

export function BinPicker({ shelf, defaultBin, bins, selected, allocations, remaining, hasError, isSplit, onSelect }: BinPickerProps) {
  const hint = isSplit
    ? remaining > 0 ? `${units(remaining)} left to place` : 'All units assigned'
    : selected.length ? `Bin ${selected[0]}` : defaultBin ? `Bin ${defaultBin}` : 'Choose a bin'

  return <div role="group" aria-label="Destination bins" className={styles.binPicker} data-invalid={hasError || undefined}>
    <div className={styles.binHeading}><strong>Shelf {shelf}</strong><span className={hasError ? styles.invalid : undefined} aria-live="polite">{hint}</span></div>
    {[3, 2, 1].map((level, index) => <div className={styles.binRow} key={level}>
      <span className={styles.muted}>L{level}</span>
      {bins.slice(index * 4, index * 4 + 4).map(bin => {
        const amount = isSplit ? allocations.find(item => item.bin === bin.id)?.quantity : undefined
        const isSelected = selected.includes(bin.id)
        return <Button key={bin.id} aria-label={`${bin.id}, ${bin.room ? `room for ${bin.room}` : 'full'}${amount ? `, ${units(amount)} assigned` : ''}`} aria-pressed={isSelected} disabled={isSelected ? false : bin.room === 0 || (isSplit && remaining === 0)} onClick={() => onSelect(bin.id)}>{bin.room === 0 ? 'Full' : bin.label}{amount ? ` · ${amount}` : ''}</Button>
      })}
    </div>)}
  </div>
}
