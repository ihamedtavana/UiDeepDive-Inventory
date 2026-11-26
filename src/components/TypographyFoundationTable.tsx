import type { ReactNode } from 'react'
import { wrapTokenPath } from './wrapTokenPath'

type Props = {
  layout: 'scale' | 'roles' | 'context' | 'semantic' | 'global' | 'accessibility' | 'audit'
  label: string
  headings: readonly string[]
  rows: ReadonlyArray<readonly [string, ...ReactNode[]]>
}

export function TypographyFoundationTable({ layout, label, headings, rows }: Props) {
  const layoutClass = layout === 'audit' ? ' docs-table--audit' : ''
  return <div className="docs-table-container">
    <table role="table" className={`docs-table typography-table typography-table--${layout}${layoutClass}`} aria-label={label}>
      <colgroup>{headings.map(heading => <col key={heading} />)}</colgroup>
      <thead role="rowgroup"><tr role="row">
        {headings.map(heading => <th key={heading} scope="col" role="columnheader">{heading}</th>)}
      </tr></thead>
      <tbody role="rowgroup">
        {rows.map(([name, ...values]) => <tr key={name} role="row">
          <th scope="row" role="rowheader">{wrapTokenPath(name)}</th>
          {values.map((value, index) => <td role="cell" key={headings[index + 1]}>
            <span className="docs-stacked-label">{headings[index + 1]} </span>{value}
          </td>)}
        </tr>)}
      </tbody>
    </table>
  </div>
}
