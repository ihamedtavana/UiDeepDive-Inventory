import { Button } from './Button'
import alert from '../assets/stock-alert-circle.svg'
import check from '../assets/auth/check-circle.svg'
import styles from './AddStockPanel.module.css'

export function StockCallout({ title, children, action, onAction, tone = 'error' }: { title: string; children: string; action?: string; onAction?: () => void; tone?: 'error' | 'success' }) {
  if (tone === 'success') return <div className={`${styles.callout} ${styles.success}`} role="status"><div><strong><img className="icon" src={check} alt="" />{title}</strong><p>{children}</p></div>{action && <Button onClick={onAction}>{action}</Button>}</div>
  return <div className={styles.callout}>
    <div role="alert"><img className="icon" src={alert} alt="" /><div><strong>{title}</strong><p>{children}</p></div></div>
    {action && <Button onClick={onAction}>{action}</Button>}
  </div>
}
