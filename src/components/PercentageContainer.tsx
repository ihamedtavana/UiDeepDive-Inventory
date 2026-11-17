import { useLayoutEffect, useRef, useState } from 'react'
import { PercentageSegment } from './PercentageSegment'

type PercentageContainerProps = { percentage: number; size?: 'small' | 'medium' }
export function PercentageContainer({ percentage }: PercentageContainerProps) {
  const barsRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const value = Math.min(100, Math.max(0, percentage))

  useLayoutEffect(() => {
    const bars = barsRef.current
    if (!bars) return
    const updateCount = () => {
      const style = getComputedStyle(bars)
      const barWidth = parseFloat(style.getPropertyValue('--percentage-bar-width'))
      const gap = parseFloat(style.columnGap)
      if (barWidth > 0 && Number.isFinite(gap)) {
        setCount(Math.max(0, Math.floor((bars.clientWidth + gap) / (barWidth + gap))))
      }
    }
    updateCount()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateCount)
      return () => window.removeEventListener('resize', updateCount)
    }
    const observer = new ResizeObserver(updateCount)
    observer.observe(bars)
    return () => observer.disconnect()
  }, [])

  return <div className="percentage" role="meter" aria-label="Capacity used" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
    <div ref={barsRef} className="percentage-bars" aria-hidden="true">{Array.from({ length: count }, (_, i) => <PercentageSegment key={i} state={i < Math.round(count * value / 100) ? 'Active' : 'Default'} />)}</div>
    <div className="percentage-labels">{[0, 20, 40, 60, 80, 100].map(n => <span key={n}>{n}</span>)}</div>
  </div>
}
