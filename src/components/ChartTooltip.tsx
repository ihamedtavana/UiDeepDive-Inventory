import { useId } from 'react'

type ChartTooltipProps = {
  id?: string
  label: string
  incoming: number
  outbound: number
}

export function ChartTooltip({ id, label, incoming, outbound }: ChartTooltipProps) {
  const fallbackId = useId()
  return <div className="chart-tooltip" id={id ?? fallbackId} role="tooltip">
    <span className="chart-tooltip-title">{label}</span>
    <div className="chart-tooltip-value"><span className="chart-tooltip-swatch is-incoming" /><strong>{incoming.toLocaleString('en-US')}</strong><span>in</span></div>
    <div className="chart-tooltip-value"><span className="chart-tooltip-swatch is-outbound" /><strong>{outbound.toLocaleString('en-US')}</strong><span>out</span></div>
  </div>
}
