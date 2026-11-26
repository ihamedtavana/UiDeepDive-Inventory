import type { ReactNode } from 'react'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { ProductIdentity } from './ProductIdentity'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, anatomy, anatomyHeadings, audit, auditDescription, auditHeadings,
  cells, cellsDescription, cellsHeadings, composition, compositionDescription, compositionHeadings,
  content, contentHeadings, context, contextHeadings, description, guidelines, metrics,
  movementDate, movementHeadings, movements, overviewNote, properties, propertiesHeadings, tokens, tokensHeadings,
} from './tableDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import cellsIcon from '../assets/design-system/table-cell-types.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'

const sections = [
  ['Overview', 'table-overview'], ['Anatomy', 'anatomy'], ['Cells', 'cells'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const statusTones = {
  Required: 'warning', Fail: 'error', Guideline: 'info', Pass: 'success',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} as const satisfies Record<string, BadgeTone>

const firstMovement = movements[0]
const movementProducts = new Map<string, ReactNode>(movements.map(({ name, sku, image, partner }) => [
  name, renderProduct(name, sku, image, partner),
]))

function renderProduct(name: string, category: string, image: string, partner: string) {
  return <div className="table-docs-product">
    <ProductIdentity name={name} category={category} image={image} />
    <Badge>{partner}</Badge>
  </div>
}

const cellPreviews: Record<typeof cells[number][0], ReactNode> = {
  'Product Details': renderProduct(firstMovement.name, 'Graphics Cards', firstMovement.image, firstMovement.partner),
  Name: <div className="table-docs-name"><strong>GPU-0107</strong><span>A1-L2-S3</span></div>,
  Stock: <><strong>0</strong> / Min 3</>,
  Qty: <strong>+40</strong>,
  Date: <time dateTime="2026-10-29">{movementDate}</time>,
  Badge: <Badge tone="error">Out Of Stock</Badge>,
  Status: 'Inactive',
  'Reserved/Incoming': <strong>+80</strong>,
  'Empty Reserved/Incoming': '-',
}

function renderMovementTable() {
  return <div className="table-docs-preview-table">
    <DesignSystemTable className="table-docs-movements" label="Recent stock movements" headings={movementHeadings}
      rows={movements.map(({ name, type, quantity }) => [
        name, <Badge tone={type === 'Inbound' ? 'success' : 'error'}>{type}</Badge>,
        <strong>{quantity}</strong>, <time dateTime="2026-10-29">{movementDate}</time>,
      ])}
      renderRowHeading={name => movementProducts.get(name) ?? name} />
  </div>
}

function exportTableDocumentation() {
  exportDesignSystemCsv('coretech-table.csv', [
    ['Metric', 'Value'], ...metrics.map(([value, label]) => [label, value]),
    [], [...movementHeadings, 'SKU', 'Transfer detail'],
    ...movements.map(({ name, type, quantity, sku, partner }) => [name, type, quantity, movementDate, sku, partner]),
    [], anatomyHeadings, ...anatomy,
    [], propertiesHeadings, ...properties,
    [], cellsHeadings, ...cells,
    [], compositionHeadings, ...composition,
    [], tokensHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...content,
    [], accessibilityHeadings, ...accessibility,
    [], auditHeadings, ...audit,
  ])
}

export function TableDocumentation() {
  return <div className="app-shell docs-shell table-documentation">
    <DesignSystemNavigation page="Table" />
    <main aria-labelledby="table-title">
      <TopNavigation variant="design-system" section="Components" page="Table" />
      <div className="docs-content" id="table-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Table" headingId="table-title" section="Components"
          description={description} sections={sections} onExport={exportTableDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="table-overview-title">
          <SectionCardTitle headingId="table-overview-title" icon={packageIcon}
            action={<Badge>Table Section + Table Column</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="table-docs-stage">{renderMovementTable()}</div>
            <dl className="docs-metrics">
              {metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="table-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="table-anatomy-title" icon={searchIcon} action={<Badge>6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <div className="table-docs-stage table-docs-stage--anatomy" aria-hidden="true">
              <div className="table-docs-diagram">
                {renderMovementTable()}
                {anatomy.map(([part]) => <span className="table-docs-marker" data-part={part} key={part}>{part}</span>)}
              </div>
            </div>
            <DesignSystemTable className="table-docs-parts" label="Table anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([part, name, detail]) => [part, <strong>{name}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-properties-title">
          <SectionCardTitle headingId="table-properties-title" icon={gridIcon} action={<Badge>2 components</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="table-docs-properties" label="Table properties" headings={propertiesHeadings}
              rows={properties} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="cells" aria-labelledby="table-cells-title" tabIndex={-1}>
          <SectionCardTitle headingId="table-cells-title" icon={cellsIcon} action={<Badge>9 types</Badge>}>Cell Types</SectionCardTitle>
          <div className="docs-section-body">
            <p>{cellsDescription}</p>
            <DesignSystemTable className="table-docs-cells" label="Table cell types" headings={cellsHeadings}
              rows={cells.map(([type, , detail, styles, count]) => [
                type, cellPreviews[type], detail, wrapTokenPath(styles),
                <>{count}<span className="table-docs-uses-label" aria-hidden="true"> uses</span></>,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-composition-title">
          <SectionCardTitle headingId="table-composition-title" icon={gridIcon} action={<Badge>Section + table</Badge>}>Composition</SectionCardTitle>
          <div className="docs-section-body">
            <p>{compositionDescription}</p>
            <DesignSystemTable className="table-docs-composition" label="Table composition" headings={compositionHeadings} rows={composition} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-tokens-title">
          <SectionCardTitle headingId="table-tokens-title" icon={packageIcon} action={<Badge>Semantic only</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="table-docs-tokens" label="Table tokens" headings={tokensHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone={statusTones[token]}>{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-context-title">
          <SectionCardTitle headingId="table-context-title" icon={contextIcon} action={<Badge>3 tables</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="table-docs-context" label="Tables on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="table-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="table-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-content-title">
          <SectionCardTitle headingId="table-content-title" icon={contentIcon} action={<Badge>Headers</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="table-docs-content" label="Table content" headings={contentHeadings} rows={content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="table-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="table-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="table-docs-accessibility" label="Table accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, status]) => [name, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="table-audit-title">
          <SectionCardTitle headingId="table-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit table-docs-audit" label="Table audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity]) => [name, where, detail, <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
