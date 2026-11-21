import { Badge } from './Badge'
import { InputField } from './InputField'
import { SectionCardTitle } from './SectionCardTitle'
import type { StockDetails } from './stockInventory'
import file from '../assets/stock-file-02.svg'
import truck from '../assets/stock-truck-01.svg'
import hash from '../assets/stock-hash-02.svg'
import message from '../assets/stock-message-text-square-01.svg'
import styles from './AddStockPanel.module.css'

export function StockSource({ details, onChange }: { details: StockDetails; onChange: (change: Partial<StockDetails>) => void }) {
  return <section className={styles.card}>
    <SectionCardTitle icon={file} variant="compact" action={<Badge>Optional</Badge>}>Source &amp; details</SectionCardTitle>
    <div className={styles.fields}>
      <label>Supplier<span className={styles.select}><img className="icon" src={truck} alt="" /><select value={details.supplier} onChange={event => onChange({ supplier: event.target.value })}><option value="">Select supplier</option><option>Pars Components</option><option>Northwind Hardware</option><option>Contoso Distribution</option></select></span></label>
      <InputField label="Reference / PO" leadingIcon={file} value={details.reference} placeholder="PO-2026-0418" onChange={event => onChange({ reference: event.target.value })} />
      <InputField label="Received on" type="date" value={details.receivedOn} onChange={event => onChange({ receivedOn: event.target.value })} />
      <InputField label="Batch / lot" leadingIcon={hash} value={details.batch} placeholder="Add batch id" onChange={event => onChange({ batch: event.target.value })} />
      <div className={styles.note}><InputField label="Note" leadingIcon={message} value={details.note} placeholder="Add a note for the team" onChange={event => onChange({ note: event.target.value })} /></div>
    </div>
  </section>
}
