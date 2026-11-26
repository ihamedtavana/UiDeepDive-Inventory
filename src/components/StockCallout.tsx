import { Button } from './Button'
import alert from '../assets/stock-alert-circle.svg'
import check from '../assets/auth/check-circle.svg'
import info from '../assets/auth/info-circle.svg'
import styles from './AddStockPanel.module.css'

export function StockCallout({ title, children, action, onAction, tone = 'error' }: { title: string; children: string; action?: string; onAction?: () => void; tone?: 'error' | 'success' | 'info' }) {
  return <div className={`${styles.callout}${tone !== 'error' ? ` ${styles[tone]}` : ''}`} role={tone === 'error' ? 'alert' : 'status'}>
    <div><strong><img className="icon" src={tone === 'success' ? check : tone === 'info' ? info : alert} alt="" />{title}</strong><p>{children}</p></div>
    {action && <Button onClick={onAction}>{action}</Button>}
  </div>
}
