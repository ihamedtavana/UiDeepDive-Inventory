import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AddStockDrawer } from './AddStockDrawer'
import { Button } from './Button'
import { StockCallout } from './StockCallout'
import { StockDestination } from './StockDestination'
import { StockProductSummary } from './StockProductSummary'
import { StockQuantity } from './StockQuantity'
import { StockReview } from './StockReview'
import { StockSource } from './StockSource'
import { StockSuccess } from './StockSuccess'
import { TabButton } from './TabButton'
import { boxStateFor } from './StockBox'
import { allocateStock, readStockDeliveries, saveStockDelivery, shelfBins, stockCount, undoStockDelivery, units, UNDO_WINDOW, type StockDelivery, type StockDetails, type StockMode, type StockProduct } from './stockInventory'
import arrow from '../assets/imgChevronRight.svg'
import retry from '../assets/stock-refresh-ccw-01.svg'
import styles from './AddStockPanel.module.css'

type SaveError = 'save' | 'capacity' | 'undo' | 'expired'

type AddStockPanelProps = {
  product: StockProduct
  warehouse: string
  deliveries: StockDelivery[]
  onInventoryChange: (deliveries: StockDelivery[]) => void
  onClose: () => void
}

function initialDetails(): StockDetails {
  const today = new Date()
  const receivedOn = [today.getFullYear(), today.getMonth() + 1, today.getDate()].map(value => String(value).padStart(2, '0')).join('-')
  return { supplier: '', reference: '', receivedOn, batch: '', note: '' }
}

export function AddStockPanel({ product, warehouse, deliveries, onInventoryChange, onClose }: AddStockPanelProps) {
  const defaultShelf = product.defaultBin.split('-')[0]
  const [mode, setMode] = useState<StockMode>('quick')
  const [value, setValue] = useState('0')
  const [destination, setDestination] = useState(warehouse)
  const [shelf, setShelf] = useState(defaultShelf)
  const [selection, setSelection] = useState<string[]>([])
  const [isSplit, setIsSplit] = useState(false)
  const [details, setDetails] = useState(initialDetails)
  const [review, setReview] = useState<StockDelivery | null>(null)
  const [receipt, setReceipt] = useState<{ delivery: StockDelivery; before: number; inventory: StockDelivery[] } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<SaveError | null>(null)
  const [hasUndoExpired, setHasUndoExpired] = useState(false)
  const saveTimer = useRef<number | undefined>(undefined)
  const heading = useRef<HTMLHeadingElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const isDetailed = mode === 'detailed'
  const screen = receipt ? 'success' : review ? 'review' : 'edit'
  const targetWarehouse = isDetailed ? destination : warehouse
  const targetShelf = isDetailed ? shelf : defaultShelf
  const bins = shelfBins(deliveries, targetWarehouse, targetShelf)
  const onHand = stockCount(deliveries, product.sku, targetWarehouse)
  const selected = isDetailed ? selection : [product.defaultBin]
  const quantity = Number(value)
  const { allocations, remaining } = allocateStock(quantity, bins, selected)
  const shownBin = bins.find(item => item.id === selected[0]) ?? bins.find(item => item.id === product.defaultBin)
  const room = shownBin?.room ?? 0
  const shownBinId = shownBin?.id ?? ''
  const hasOverCapacity = quantity > room && (!isDetailed || Boolean(shownBin)) && (!isSplit || remaining > 0)
  const canSubmit = quantity > 0 && remaining === 0
  const canConfirm = review?.allocations.every(item => item.quantity <= (bins.find(bin => bin.id === item.bin)?.room ?? 0))
  const hasCapacityChanged = error === 'capacity' || Boolean(review && !receipt && !canConfirm)
  const boxPhase = isSaving ? 'saving' : error === 'save' ? 'error' : 'edit'
  const boxQuantity = isSplit && remaining === 0 ? (allocations[0]?.quantity ?? quantity) : quantity

  useLayoutEffect(() => {
    if (body.current) body.current.scrollTop = 0
    heading.current?.focus()
  }, [screen])

  useEffect(() => () => window.clearTimeout(saveTimer.current), [])
  useEffect(() => {
    if (!receipt) return
    const timer = window.setTimeout(() => setHasUndoExpired(true), Math.max(0, receipt.delivery.savedAt + UNDO_WINDOW - Date.now()))
    return () => window.clearTimeout(timer)
  }, [receipt])

  const resetDestination = () => { setSelection([]); setIsSplit(false); setError(null) }
  const editValue = (next: string) => {
    if (next === value) return
    setValue(next)
    setError(null)
    if (isSplit && Number(next) <= room) { setIsSplit(false); setSelection(selection.slice(0, 1)) }
  }
  const selectBin = (id: string) => {
    setError(null)
    if (isSplit) setSelection(current => current.includes(id) ? current.filter(bin => bin !== id) : [...current, id])
    else setSelection([id])
  }

  const draft = (): StockDelivery => ({
    id: crypto.randomUUID(), sku: product.sku, warehouse: targetWarehouse, shelf: targetShelf, allocations,
    details: isDetailed ? details : { supplier: '', reference: '', receivedOn: '', batch: '', note: '' }, savedAt: 0,
  })

  const save = (delivery: StockDelivery) => {
    if (saveTimer.current !== undefined || isSaving) return
    setIsSaving(true)
    setError(null)
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    saveTimer.current = window.setTimeout(() => {
      saveTimer.current = undefined
      const entry = { ...delivery, savedAt: Date.now() }
      try {
        const inventory = saveStockDelivery(entry)
        if (!inventory) {
          onInventoryChange(readStockDeliveries())
          setError('capacity')
        } else {
          const before = stockCount(inventory.filter(item => item.id !== entry.id), product.sku, entry.warehouse)
          onInventoryChange(inventory)
          setHasUndoExpired(false)
          setReceipt({ delivery: entry, before, inventory })
        }
      } catch {
        setError('save')
      } finally {
        setIsSaving(false)
      }
    }, reduced ? 0 : 1800)
  }

  const submit = () => {
    if (review) { if (canConfirm) save(review); return }
    if (!canSubmit) return
    if (isDetailed) { setReview(draft()); setError(null) }
    else save(draft())
  }
  const backToEdit = () => { setReview(null); setError(null) }
  const undo = () => {
    if (!receipt) return
    try {
      const inventory = undoStockDelivery(receipt.delivery.id)
      if (!inventory) { setHasUndoExpired(true); setError('expired'); return }
      onInventoryChange(inventory)
      setReceipt(null)
      setReview(null)
      setError(null)
    } catch {
      setError('undo')
    }
  }
  const addMore = () => {
    setValue('0')
    setReceipt(null)
    setReview(null)
    setError(null)
    setIsSplit(false)
    setSelection([])
  }

  const footnote = isSaving ? `Saving to ${targetWarehouse}…`
    : review ? 'Nothing is saved until you confirm'
    : error === 'save' || error === 'capacity' ? 'Nothing was changed in inventory'
    : isDetailed && selected.length === 0 ? 'Choose a bin'
    : hasOverCapacity ? 'Fix the quantity to continue'
    : isDetailed && canSubmit ? ''
    : quantity === 0 ? 'Type a quantity or pick a preset' : 'Press Enter to add'

  return <AddStockDrawer titleId={titleId} isBusy={isSaving} onClose={onClose}>{close => <>
    <header className={styles.header}>
      {screen === 'review' && <Button appearance="ghost" size="medium" isIconOnly aria-label="Back to edit" disabled={isSaving} onClick={backToEdit}><span className={styles.closeGlyph} aria-hidden="true">←</span></Button>}
      <div className={styles.heading}><p>{screen === 'review' ? 'Add stock · Detailed' : receipt && isDetailed ? `Inventory · ${product.category}` : warehouse}</p><h2 id={titleId} ref={heading} tabIndex={-1}>{screen === 'review' ? 'Review and confirm' : receipt && isDetailed ? 'Stock added' : 'Add stock'}</h2></div>
      <Button appearance="ghost" isIconOnly aria-label="Close Add stock" disabled={isSaving} onClick={close}><span className={styles.closeGlyph} aria-hidden="true">×</span></Button>
    </header>
    <div className={styles.body} ref={body}>
      <StockProductSummary product={product} onHand={onHand} />
      {receipt ? <StockSuccess delivery={receipt.delivery} product={product} mode={mode} before={receipt.before} bins={shelfBins(receipt.inventory, receipt.delivery.warehouse, receipt.delivery.shelf)} canUndo={!hasUndoExpired} onUndo={undo} />
        : review ? <StockReview delivery={review} bins={bins} before={onHand} phase={isSaving ? 'saving' : error ? 'error' : 'review'} />
        : <>
          <div className={styles.modeRow}>
            <div className="tab" role="group" aria-label="Add mode">
              <TabButton isSelected={!isDetailed} isDisabled={isSaving} onClick={() => { setMode('quick'); setError(null) }}>Quick add</TabButton>
              <TabButton isSelected={isDetailed} isDisabled={isSaving} onClick={() => { setMode('detailed'); setError(null) }}>Detailed add</TabButton>
            </div>
            <span className={styles.defaultBin} data-hidden={isDetailed || undefined} aria-hidden={isDetailed || undefined}>Goes to the default bin {product.defaultBin}.</span>
          </div>
          <div className={styles.editFields}>
            <StockQuantity value={value} onHand={onHand} onHandInBin={shownBin?.used ?? 0} room={room} bin={shownBinId} minimum={product.minimum} hasError={hasOverCapacity} isDisabled={isSaving} boxState={boxStateFor({ adding: boxQuantity, room: shownBin ? room : Infinity, phase: boxPhase })} onChange={editValue} onSubmit={submit} />
            <div className={styles.detailedFields} data-expanded={isDetailed} inert={!isDetailed} aria-hidden={!isDetailed || undefined}>
              <div className={styles.detailedClip}><div className={styles.detailedContent}>
                <StockDestination warehouse={destination} shelf={shelf} defaultBin={shelf === defaultShelf ? product.defaultBin : ''} bins={bins} selected={selection} allocations={allocations} remaining={remaining} hasError={hasOverCapacity} isSplit={isSplit} onWarehouse={next => { setDestination(next); resetDestination() }} onShelf={next => { setShelf(next); resetDestination() }} onBin={selectBin} />
                <StockSource details={details} onChange={change => setDetails(current => ({ ...current, ...change }))} />
              </div></div>
            </div>
          </div>
          {hasOverCapacity && !isSaving && !error && <>
            <StockCallout title={isSplit ? `${units(remaining)} still need a bin` : `${units(quantity)} won’t fit in this bin`} action={!isSplit && room > 0 ? `Set to ${room}` : undefined} onAction={() => editValue(String(room))}>
              {isSplit ? 'Select additional bins with enough space.' : isDetailed ? 'Reduce the quantity or split the delivery across bins.' : 'Reduce the quantity or switch to Detailed add to split the delivery across bins.'}
            </StockCallout>
            {isDetailed && !isSplit && <div><Button onClick={() => setIsSplit(true)}>Split across bins</Button></div>}
          </>}
        </>}
      {error === 'save' && <StockCallout title="Stock wasn’t added" action="Try again" onAction={submit}>Nothing was saved. Your entries are still here — try again.</StockCallout>}
      {hasCapacityChanged && <StockCallout title="Bin capacity changed" action={review ? 'Back to edit' : `Set to ${room}`} onAction={review ? backToEdit : () => editValue(String(room))}>The selected bin no longer has enough space. Nothing was saved.</StockCallout>}
      {error === 'undo' && <StockCallout title="Stock wasn’t undone" action="Try again" onAction={undo}>The delivery is still in inventory.</StockCallout>}
      {error === 'expired' && <StockCallout title="Undo is no longer available">The delivery can no longer be undone from this panel.</StockCallout>}
    </div>
    <form className={styles.footer} id={`${titleId}-form`} onSubmit={event => { event.preventDefault(); submit() }}>
      {receipt ? <>
        <Button size="medium" onClick={addMore}><span className="icon button-add-icon" aria-hidden="true" />Add more stock</Button>
        <Button hierarchy="primary" size="medium" onClick={close}>Done</Button>
      </> : <>
        <span className={`${styles.footerHint} ${hasOverCapacity && !review ? styles.invalid : ''}`} role="status">{footnote}</span>
        <Button size="medium" disabled={isSaving} onClick={review ? backToEdit : close}>{review ? 'Back to edit' : 'Cancel'}</Button>
        <Button type="submit" size="medium" hierarchy="primary" disabled={isSaving || (review ? !canConfirm : !canSubmit)}>
          {isSaving ? <><span className={styles.spinner} aria-hidden="true" />Adding {units(quantity)}…</>
            : review || !isDetailed ? <>{error === 'save' && !review ? <img className="icon" src={retry} alt="" /> : <span className="icon button-add-icon" aria-hidden="true" />}{error === 'save' && !review ? 'Try again' : quantity > 0 ? `Add ${units(quantity)}` : 'Add stock'}</>
            : <>Review<img className="icon" src={arrow} alt="" /></>}
        </Button>
      </>}
    </form>
  </>}</AddStockDrawer>
}
