import { useState } from 'react'
import { Badge, type BadgeTone } from './Badge'
import { Breadcrumb } from './Breadcrumb'
import { Button } from './Button'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { Pagination } from './Pagination'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, anatomy, anatomyHeadings, audit, auditHeadings, auditNote,
  breadcrumb, breadcrumbHeadings, breadcrumbNote, content, contentHeadings, description,
  guidelines, itemHeadings, items, itemsNote, metrics, overviewNote, tokenHeadings, tokens,
} from './paginationDocumentationData'
import auditIcon from '../assets/design-system/audit.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import breadcrumbIcon from '../assets/design-system/pagination-breadcrumb.svg'
import contentIcon from '../assets/design-system/pagination-content.svg'
import statesIcon from '../assets/design-system/pagination-states.svg'
import searchIcon from '../assets/design-system/search.svg'

const sections = [
  ['Overview', 'pagination-overview'], ['Anatomy', 'anatomy'], ['Items', 'items'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const tones = {
  Required: 'warning', Fix: 'error', Pass: 'success', Fail: 'error',
  Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} as const satisfies Record<string, BadgeTone>

const productCount = 96
const pageSize = 5
const pageCount = Math.ceil(productCount / pageSize)
const anatomyPages = [1, 2, 3, 12]
const markerColumns = [1, 2, 3, 5, 6, 7]

function exportPaginationDocumentation() {
  exportDesignSystemCsv('coretech-pagination.csv', [
    ['Metric', 'Value'], ...metrics.map(([value, label]) => [label, value]),
    [], anatomyHeadings, ...anatomy,
    [], itemHeadings, ...items,
    [], breadcrumbHeadings, ...breadcrumb,
    [], tokenHeadings, ...tokens,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...content,
    [], accessibilityHeadings, ...accessibility,
    [], auditHeadings, ...audit,
  ])
}

export function PaginationDocumentation() {
  const [page, setPage] = useState(1)
  const firstNeighbour = Math.min(Math.max(page - 1, 1), pageCount - 2)
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
    .filter(number => number === 1 || number === pageCount || (number >= firstNeighbour && number < firstNeighbour + 3))
  const firstProduct = (page - 1) * pageSize + 1
  const lastProduct = Math.min(page * pageSize, productCount)
  const range = firstProduct === lastProduct ? firstProduct : `${firstProduct}–${lastProduct}`

  return <div className="app-shell docs-shell pagination-documentation">
    <DesignSystemNavigation page="Pagination" />
    <main aria-labelledby="pagination-title">
      <TopNavigation variant="design-system" section="Components" page="Pagination" />
      <div className="docs-content" id="pagination-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Pagination" headingId="pagination-title" section="Components"
          description={description} sections={sections} onExport={exportPaginationDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="pagination-overview-title">
          <SectionCardTitle headingId="pagination-overview-title" icon={packageIcon} action={<Badge>Products table</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="pagination-docs-stage pagination-docs-stage--overview">
              <div className="pagination-docs-footer">
                <span role="status">Showing {range} of {productCount} products</span>
                <Pagination label="Pagination" page={page} pageCount={pageCount} pages={pages} onPageChange={setPage} />
              </div>
            </div>
            <dl className="docs-metrics">
              {metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="pagination-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="pagination-anatomy-title" icon={searchIcon} action={<Badge>6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <div className="pagination-docs-stage pagination-docs-stage--anatomy" inert>
              <div className="pagination-docs-diagram">
                <Pagination label="Pagination anatomy preview" page={1} pageCount={12} pages={anatomyPages} />
                {anatomy.map(([number], index) => <span className="pagination-docs-marker"
                  style={{ gridColumn: markerColumns[index] }} key={number}>{number}</span>)}
              </div>
            </div>
            <DesignSystemTable className="pagination-docs-parts" label="Pagination anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([number, name, variant, detail]) => [number, name, <strong>{variant}</strong>, detail])} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="pagination-items-title" tabIndex={-1}>
          <SectionCardTitle headingId="pagination-items-title" icon={statesIcon} action={<Badge>Built from Button</Badge>}>Items &amp; States</SectionCardTitle>
          <div className="docs-section-body">
            <p>{itemsNote}</p>
            <DesignSystemTable className="pagination-docs-items" label="Pagination items and states" headings={itemHeadings}
              rows={items.map(([item, preview, variant, when]) => {
                const isArrow = preview === '‹' || preview === '›'
                return [item, <div className="pagination-docs-item-preview" inert>
                  <Button isIconOnly={isArrow} appearance={item === 'Current page' ? 'filled' : 'ghost'}
                    disabled={item === 'Previous · disabled'} data-button-preview={item === 'Hover' ? 'hover' : undefined}>
                    {isArrow ? <span className={`pagination-chevron${preview === '‹' ? ' pagination-chevron--previous' : ''}`} /> : preview}
                  </Button>
                </div>, <strong>{variant}</strong>, when]
              })} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="pagination-breadcrumb-title">
          <SectionCardTitle headingId="pagination-breadcrumb-title" icon={breadcrumbIcon} action={<Badge>Named “Pagination”</Badge>}>Related: Breadcrumb</SectionCardTitle>
          <div className="docs-section-body">
            <p>{breadcrumbNote}</p>
            <div className="pagination-docs-stage"><Breadcrumb location="New York Central" page="Inventory" label="Example breadcrumb" /></div>
            <DesignSystemTable className="pagination-docs-breadcrumb" label="Breadcrumb parts" headings={breadcrumbHeadings}
              rows={breadcrumb.map(([part, details]) => [part, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="pagination-tokens-title">
          <SectionCardTitle headingId="pagination-tokens-title" icon={packageIcon} action={<Badge>Inherited from Button</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="pagination-docs-tokens" label="Pagination tokens" headings={tokenHeadings}
              rows={tokens.map(([part, token, value]) => [part, <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="pagination-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="pagination-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="pagination-content-title">
          <SectionCardTitle headingId="pagination-content-title" icon={contentIcon} action={<Badge>Summary</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="pagination-docs-content" label="Pagination content" headings={contentHeadings} rows={content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="pagination-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="pagination-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="pagination-docs-accessibility" label="Pagination accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={tones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="pagination-audit-title">
          <SectionCardTitle headingId="pagination-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditNote}</p>
            <DesignSystemTable className="docs-table--audit pagination-docs-audit" label="Pagination audit notes" headings={auditHeadings}
              rows={audit.map(([finding, where, detail, severity]) => [finding, where, detail, <Badge tone={tones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
