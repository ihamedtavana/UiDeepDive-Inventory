import type { ReactNode } from 'react'
import { wrapTokenPath } from './wrapTokenPath'

type Props = {
  className: string
  label: string
  headings: readonly string[]
  rows: ReadonlyArray<readonly [string, ...ReactNode[]]>
  renderPreview?: (name: string) => ReactNode
  previewHeading?: string
  renderRowHeading?: (name: string) => ReactNode
  rowHeadingColumn?: number
}

export function DesignSystemTable({ className, label, headings, rows, renderPreview, previewHeading = 'Preview', renderRowHeading = wrapTokenPath, rowHeadingColumn = 0 }: Props) {
  return <div className="docs-table-container">
    <table role="table" className={`docs-table ${className}`} aria-label={label}>
      <colgroup>{renderPreview && <col />}{headings.map(heading => <col key={heading} />)}</colgroup>
      <thead role="rowgroup"><tr role="row">
        {renderPreview && <th scope="col" role="columnheader">{previewHeading}</th>}
        {headings.map(heading => <th key={heading} scope="col" role="columnheader">{heading}</th>)}
      </tr></thead>
      <tbody role="rowgroup">
        {rows.map(([name, ...values], rowIndex) => <tr key={`${rowIndex}-${name}`} role="row">
          {renderPreview && <td role="cell">{renderPreview(name)}</td>}
          {[name, ...values].map((value, index) => index === rowHeadingColumn
            ? <th scope="row" role="rowheader" key={headings[index]}>{typeof value === 'string' ? renderRowHeading(value) : value}</th>
            : <td role="cell" key={headings[index]}>
              <span className="docs-stacked-label">{headings[index]} </span>{value}
            </td>)}
        </tr>)}
      </tbody>
    </table>
  </div>
}
