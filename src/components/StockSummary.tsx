import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { SectionCardTitle } from './SectionCardTitle'
import check from '../assets/imgPackageCheck.svg'
import styles from './AddStockPanel.module.css'

export function StockSummary({ title, before, after, rows }: { title: string; before: number; after: number; rows: [string, ReactNode][] }) {
  return <section className={styles.card}>
    <SectionCardTitle icon={check} variant="compact" action={<Badge tone="success">{before} → {after} on hand</Badge>}>{title}</SectionCardTitle>
    <dl className={styles.summary}>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </section>
}
