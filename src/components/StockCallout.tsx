import { Button } from './Button'
import alert from '../assets/stock-alert-circle.svg'
import infoIcon from '../assets/design-system/callout-info.svg'
import successIcon from '../assets/design-system/callout-success.svg'
import warningIcon from '../assets/design-system/callout-warning.svg'
import styles from './AddStockPanel.module.css'
import calloutStyles from './StockCallout.module.css'

const icons = { error: alert, info: infoIcon, success: successIcon, warning: warningIcon }
export type CalloutTone = keyof typeof icons

type StockCalloutProps = {
  title: string
  children?: string
  tone?: CalloutTone
  variant?: 'stock' | 'design-system'
  action?: string
  actionLabel?: string
  hasAction?: boolean
  hasDescription?: boolean
  onAction?: () => void
}

export function StockCallout({
  title, children, variant = 'stock', tone = variant === 'stock' ? 'error' : 'info',
  action, actionLabel, hasAction = Boolean(action), hasDescription = Boolean(children), onAction,
}: StockCalloutProps) {
  const isStock = variant === 'stock'
  const icon = icons[tone]
  return <div className={isStock ? styles.callout : calloutStyles.callout} data-tone={tone}>
    <div role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}>
      {isStock ? <img className="icon" src={icon} alt="" /> : <span className={calloutStyles.icon} aria-hidden="true" style={{ maskImage: `url("${icon}")` }} />}
      <div><strong>{title}</strong>{hasDescription && <p>{children}</p>}</div>
    </div>
    {hasAction && <Button inert={isStock || onAction ? undefined : true} aria-label={actionLabel} onClick={onAction}>{action ?? 'Action'}</Button>}
  </div>
}
