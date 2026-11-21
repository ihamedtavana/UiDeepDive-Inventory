import { StockBox, boxStateFor } from './StockBox'
import { StockSummary } from './StockSummary'
import { BIN_CAPACITY, shelfLabel, units, type StockDelivery, type StockBin } from './stockInventory'
import styles from './AddStockPanel.module.css'

export function StockReview({ delivery, bins, before, phase }: { delivery: StockDelivery; bins: StockBin[]; before: number; phase: 'review' | 'saving' | 'error' }) {
  const quantity = delivery.allocations.reduce((total, item) => total + item.quantity, 0)
  const { details } = delivery
  const rows: [string, string][] = [
    ['Quantity', `+${units(quantity)}`],
    ['Warehouse', delivery.warehouse],
    ['Shelf / bin', `${shelfLabel(delivery.shelf)} / ${delivery.allocations.map(item => item.bin).join(', ')}`],
    ['Supplier', details.supplier || '—'],
    ['Reference / PO', details.reference || '—'],
    ['Received on', details.receivedOn ? new Date(`${details.receivedOn}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'],
    ...(details.batch ? [['Batch / lot', details.batch] as [string, string]] : []),
    ['Note', details.note || '—'],
  ]
  return <>
    {delivery.allocations.map(allocation => {
      const bin = bins.find(item => item.id === allocation.bin)
      const onHand = bin?.used ?? 0
      const used = Math.min(BIN_CAPACITY, onHand + allocation.quantity)
      const remaining = BIN_CAPACITY - used
      return <div key={allocation.bin} className={styles.reviewBox}>
        <StockBox width={238} onHand={onHand} adding={allocation.quantity} state={boxStateFor({ adding: allocation.quantity, room: bin?.room ?? 0, phase: phase === 'review' ? 'edit' : phase })} />
        <div><strong>Bin {allocation.bin} after this delivery</strong><p>{used} of {BIN_CAPACITY} slots used · {Math.round(used / BIN_CAPACITY * 100)}% full · {remaining} slots left</p>{delivery.allocations.length > 1 && <p>Adding {units(allocation.quantity)}</p>}</div>
      </div>
    })}
    <StockSummary title="Review before adding" before={before} after={before + quantity} rows={rows} />
  </>
}
