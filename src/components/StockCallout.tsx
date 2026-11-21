import { Button } from './Button'
import alert from '../assets/stock-alert-circle.svg'
import styles from './AddStockPanel.module.css'

export function StockCallout({ title, children, action, onAction }: { title: string; children: string; action?: string; onAction?: () => void }) {
  return <div className={styles.callout}>
    <div role="alert"><img className="icon" src={alert} alt="" /><div><strong>{title}</strong><p>{children}</p></div></div>
    {action && <Button onClick={onAction}>{action}</Button>}
  </div>
}
