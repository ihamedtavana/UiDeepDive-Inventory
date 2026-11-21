import { Button } from './Button'
import { StockBox } from './StockBox'
import { StockSummary } from './StockSummary'
import { BIN_CAPACITY, shelfLabel, units, type StockBin, type StockDelivery, type StockMode, type StockProduct } from './stockInventory'
import clock from '../assets/remaining1_imgClock.svg'
import retry from '../assets/stock-refresh-ccw-01.svg'
import styles from './AddStockPanel.module.css'

type StockSuccessProps = {
  delivery: StockDelivery
  product: StockProduct
  mode: StockMode
  before: number
  bins: StockBin[]
  canUndo: boolean
  onUndo: () => void
}

export function StockSuccess({ delivery, product, mode, before, bins, canUndo, onUndo }: StockSuccessProps) {
  const quantity = delivery.allocations.reduce((total, item) => total + item.quantity, 0)
  const after = before + quantity
  const isDetailed = mode === 'detailed'
  const location = delivery.allocations.map(({ bin, quantity }) => {
    const used = bins.find(item => item.id === bin)?.used ?? quantity
    return `${bin} · ${Math.round(used / BIN_CAPACITY * 100)}% full`
  }).join(', ')
  const first = delivery.allocations[0]
  const previousBinStock = Math.max(0, (bins.find(bin => bin.id === first.bin)?.used ?? first.quantity) - first.quantity)
  const source = [delivery.details.supplier, delivery.details.reference].filter(Boolean).join(' · ')
  const receivedAt = new Date(delivery.savedAt)
  const receivedDate = delivery.details.receivedOn ? new Date(`${delivery.details.receivedOn}T12:00:00`) : receivedAt
  const received = receivedDate.toDateString() === receivedAt.toDateString()
    ? `Today, ${receivedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    : receivedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const rows: [string, string][] = [['Added', `+${units(quantity)}`], [isDetailed ? 'On hand now' : 'Current stock', units(after)]]
  if (isDetailed) rows.push(['Warehouse', delivery.warehouse], ['Shelf / bin', `${shelfLabel(delivery.shelf)} / ${location}`], ['Supplier / PO', source || '—'])
  else rows.push(['Bin', location])
  rows.push(['Received', received])

  return <>
    <section className={styles.successHero}>
      <StockBox width={228} adding={first.quantity} onHand={previousBinStock} state="success" />
      <h3>{units(quantity)} added</h3>
      <p>{before === 0 ? `${product.name} is back in stock.` : `${product.name} now has ${units(after)} on hand.`}</p>
    </section>
    <StockSummary title="What changed" before={before} after={after} rows={rows} />
    <div className={styles.undo}><img className="icon" src={clock} alt="" /><p>{canUndo ? 'Made a mistake? You can undo this for the next 10 minutes.' : 'The 10-minute undo window has ended.'}</p><Button disabled={!canUndo} onClick={onUndo}><img className="icon" src={retry} alt="" />Undo</Button></div>
  </>
}
