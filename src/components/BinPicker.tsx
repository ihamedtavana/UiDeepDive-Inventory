import { useId, type KeyboardEvent } from 'react'
import { Button } from './Button'
import { type StockBin, type Allocation, units } from './stockInventory'
import styles from './AddStockPanel.module.css'

type SharedProps = {
  shelf: string
  defaultBin: string
  bins: StockBin[]
  onSelect: (bin: string) => void
}

type BinPickerProps = SharedProps & ({
  variant?: 'stock'
  selected: string[]
  allocations: Allocation[]
  remaining: number
  hasError: boolean
  isSplit: boolean
} | {
  variant: 'documentation'
  selectedBin: string
  errorMessage?: string
})

const levels = [3, 2, 1]
const radioDirection: Readonly<Record<string, number | undefined>> = {
  ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1,
}

export function BinPicker(props: BinPickerProps) {
  const { shelf, defaultBin, bins, onSelect } = props
  const titleId = useId()
  const hintId = useId()
  const isDocumentation = props.variant === 'documentation'
  const selected = isDocumentation ? [props.selectedBin || defaultBin] : props.selected
  const hasError = isDocumentation ? Boolean(props.errorMessage && !props.selectedBin) : props.hasError
  const isSplit = !isDocumentation && props.isSplit
  const destination = selected[0] || defaultBin
  let hint = destination ? `Bin ${destination}` : 'Choose a bin'
  if (isSplit) hint = props.remaining > 0 ? `${units(props.remaining)} left to place` : 'All units assigned'
  if (isDocumentation && hasError && props.errorMessage) hint = props.errorMessage
  const tabStop = isDocumentation && (bins.find(bin => bin.id === selected[0] && bin.room > 0) ?? bins.find(bin => bin.room > 0))

  const moveSelection = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = radioDirection[event.key]
    if (direction === undefined) return
    const radios = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]:enabled'))
    const index = radios.findIndex(radio => radio === event.target)
    if (index === -1) return
    event.preventDefault()
    const next = radios[(index + direction + radios.length) % radios.length]
    next.focus()
    next.click()
  }

  return <div role={isDocumentation ? 'radiogroup' : 'group'} aria-label={isDocumentation ? undefined : 'Destination bins'}
    aria-labelledby={isDocumentation ? titleId : undefined} aria-describedby={isDocumentation ? hintId : undefined}
    aria-invalid={isDocumentation && hasError || undefined}
    className={`${styles.binPicker}${isDocumentation ? ` ${styles.binPickerDocumentation}` : ''}`}
    data-invalid={hasError || undefined}
    data-compact={isDocumentation && Boolean(props.errorMessage) || undefined}
    onKeyDown={isDocumentation ? moveSelection : undefined}>
    <div className={styles.binHeading}><strong id={isDocumentation ? titleId : undefined}>Shelf {shelf}</strong>
      <span id={isDocumentation ? hintId : undefined} className={hasError ? styles.invalid : undefined} aria-live="polite">{hint}</span></div>
    {levels.map((level, index) => <div className={styles.binRow} key={level}>
      <span className={styles.muted}>L{level}</span>
      {bins.slice(index * 4, index * 4 + 4).map((bin, slot) => {
        const amount = isSplit ? props.allocations.find(item => item.bin === bin.id)?.quantity : undefined
        const isSelected = selected.includes(bin.id)
        // The Default example mirrors Figma's header-only selection until the user picks a bin.
        if (isDocumentation) return <Button key={bin.id} role="radio" aria-checked={isSelected}
          aria-label={`Level ${level}, slot ${slot + 1}${bin.room === 0 ? ', full' : ''}`} disabled={bin.room === 0}
          data-selected={isSelected && Boolean(props.selectedBin) || undefined}
          tabIndex={tabStop && bin.id === tabStop.id ? 0 : -1} onClick={() => onSelect(bin.id)}>
          {bin.room === 0 ? 'Full' : bin.label}
        </Button>
        const { remaining } = props
        return <Button key={bin.id} aria-label={`${bin.id}, ${bin.room ? `room for ${bin.room}` : 'full'}${amount ? `, ${units(amount)} assigned` : ''}`} aria-pressed={isSelected} disabled={isSelected ? false : bin.room === 0 || (isSplit && remaining === 0)} onClick={() => onSelect(bin.id)}>{bin.room === 0 ? 'Full' : bin.label}{amount ? ` · ${amount}` : ''}</Button>
      })}
    </div>)}
  </div>
}
