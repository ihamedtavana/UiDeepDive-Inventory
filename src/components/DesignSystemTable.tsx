import type { ReactNode } from 'react'
import { wrapTokenPath } from './wrapTokenPath'

type Props = {
  className: string
  label: string
  headings: readonly string[]
  rows: ReadonlyArray<readonly [string, ...ReactNode[]]>
  renderPreview?: (name: string) => ReactNode
}

export function DesignSystemTable({ className, label, headings, rows, renderPreview }: Props) {
  return <div className="docs-table-container">
    <table role="table" className={`docs-table ${className}`} aria-label={label}>
      <colgroup>{renderPreview && <col />}{headings.map(heading => <col key={heading} />)}</colgroup>
      <thead role="rowgroup"><tr role="row">
        {renderPreview && <th scope="col" role="columnheader">Preview</th>}
        {headings.map(heading => <th key={heading} scope="col" role="columnheader">{heading}</th>)}
      </tr></thead>
      <tbody role="rowgroup">
        {rows.map(([name, ...values]) => <tr key={name} role="row">
          {renderPreview && <td role="cell">{renderPreview(name)}</td>}
          <th scope="row" role="rowheader">{wrapTokenPath(name)}</th>
          {values.map((value, index) => <td role="cell" key={headings[index + 1]}>
            <span className="docs-stacked-label">{headings[index + 1]} </span>{value}
          </td>)}
        </tr>)}
      </tbody>
    </table>
  </div>
}
