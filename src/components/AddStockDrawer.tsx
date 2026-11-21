import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import styles from './AddStockPanel.module.css'

export function AddStockDrawer({ titleId, isBusy, children, onClose }: { titleId: string; isBusy: boolean; children: (close: () => void) => ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const startedOnBackdrop = useRef(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const [isClosing, setIsClosing] = useState(false)

  useLayoutEffect(() => {
    const element = dialog.current
    const opener = document.activeElement
    element?.showModal()
    return () => {
      window.clearTimeout(closeTimer.current)
      if (element?.open) element.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])

  const close = () => {
    if (isBusy || isClosing) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { onClose(); return }
    setIsClosing(true)
    closeTimer.current = window.setTimeout(onClose, 240)
  }

  return <dialog ref={dialog} className={styles.panel} data-stock-panel="" aria-modal="true" data-closing={isClosing || undefined} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); close() }}
    onPointerDown={event => { startedOnBackdrop.current = event.target === event.currentTarget }}
    onClick={event => { if (startedOnBackdrop.current && event.target === event.currentTarget) close() }}>
    <div inert={isClosing} className={styles.layout}>{children(close)}</div>
  </dialog>
}
