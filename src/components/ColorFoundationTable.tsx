import { Fragment, type CSSProperties } from 'react'
import { Badge } from './Badge'
import type { ColorCell, ColorTableSpec } from './colorFoundationData'

export function ColorFoundationTable({ table, label }: { table: ColorTableSpec; label: string }) {
  const isMatrix = ['feedback', 'badge', 'button'].includes(table.layout)
  const matrixSamples = table.layout === 'feedback' || table.layout === 'badge'
  const rowHeading = ['token', 'contrast', 'focus'].includes(table.layout) ? 1 : 0
  return <div className="docs-table-container">
    <table role="table" className={`docs-table docs-table--${table.layout}${isMatrix ? ' docs-table--matrix' : ''}`} aria-label={`${label} · ${table.headings.find(Boolean)}`}>
      <colgroup>{table.headings.map((heading, index) => <col key={heading || index} />)}</colgroup>
      <thead role="rowgroup"><tr role="row">{table.headings.map((heading, index) => <th key={heading || index} scope="col" role="columnheader"><span>{heading}</span></th>)}</tr></thead>
      <tbody role="rowgroup">{table.rows.map((row, rowIndex) => <tr role="row" key={rowIndex}>
        {row.map((cell, columnIndex) => {
          if (columnIndex === rowHeading) return <th key={columnIndex} role="rowheader" scope="row">{renderCell(cell)}</th>
          const heading = table.headings[columnIndex]
          return <td key={columnIndex} role="cell">
            {heading && !isMatrix && <span className="docs-stacked-label">{heading}: </span>}
            {columnIndex > 0 && table.layout === 'button' && <span className="docs-matrix-label">{heading}</span>}
            {renderCell(cell, matrixSamples ? heading : undefined)}
          </td>
        })}
      </tr>)}</tbody>
    </table>
  </div>
}

export function wrapTokenPath(value: string) {
  const parts = value.split('/')
  return parts.map((part, index) => <Fragment key={index}>{index > 0 && <>/<wbr /></>}{part}</Fragment>)
}

function renderCell(cell: ColorCell, roleLabel?: string) {
  if (typeof cell === 'string') return cell.includes('/') ? wrapTokenPath(cell) : cell

  if (cell.kind === 'badge') {
    return <span className="docs-cell-badge">{cell.context}<Badge tone={cell.tone}>{cell.label}</Badge></span>
  }

  if (cell.kind === 'preview') {
    return <span className="docs-contrast-preview" aria-hidden="true" style={{ color: `var(${cell.foreground})`, backgroundColor: `var(${cell.background})` }}>Aa</span>
  }

  return <span className="docs-samples">{cell.items.map(([token, label]) =>
    <span className="docs-sample" key={token}>
      <span className="docs-swatch" aria-hidden="true" style={{ '--swatch-color': `var(${token})` } as CSSProperties} />
      {(roleLabel || label) && <span className="docs-sample-text">
        {roleLabel && <span className="docs-matrix-label">{roleLabel}</span>}
        {label && wrapTokenPath(label)}
      </span>}
    </span>,
  )}</span>
}
