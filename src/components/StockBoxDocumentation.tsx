import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { StockBox, type StockBoxProps } from './StockBox'
import { StockBoxCompact } from './StockBoxCompact'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import * as data from './stockBoxDocumentationData'
import stockBoxStyles from './StockBox.module.css'
import { wrapTokenPath } from './wrapTokenPath'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Required: 'warning', Fix: 'error', Fail: 'error', Error: 'error',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

type BoxExample = Pick<StockBoxProps, 'state' | 'adding' | 'pose' | 'width'> & { caption: string }
const filling = { state: 'filling', adding: 18, caption: 'Filling' } as const
const over = { state: 'over', adding: 25, caption: 'Over capacity' } as const
const success = { state: 'success', adding: 18, caption: 'Success' } as const
const states: readonly BoxExample[] = [
  { state: 'empty', adding: 0, caption: 'Empty' },
  filling,
  { state: 'full', adding: 22, caption: 'Full', width: 240 },
  over,
  { state: 'saving', adding: 18, caption: 'Saving' },
  success,
  { state: 'error', adding: 18, caption: 'Error' },
]
const poses: readonly BoxExample[] = [
  { state: 'empty', adding: 0, pose: 'half-open', caption: 'Pose · Half open' },
  { state: 'empty', adding: 0, pose: 'units-above', caption: 'Units above' },
  { ...success, pose: 'hop', caption: 'Hop' },
]
const slotStyles = [stockBoxStyles.slot_free, stockBoxStyles.slot_have, stockBoxStyles.slot_add, stockBoxStyles.slot_ok, stockBoxStyles.slot_over]

function boxPreview({ caption, width = 237.6, ...example }: BoxExample) {
  const addedStock = example.state === 'success' ? 'saved' : 'being added'
  const content = example.adding ? `2 of 24 on hand, ${example.adding} ${addedStock}` : '2 of 24 on hand'
  return <figure key={caption}>
    <StockBox {...example} width={width} onHand={2} isAnimated={false} hasMinimum
      ariaLabel={`${caption}. ${content}. Minimum stock: 6.`} />
    <figcaption>{caption}</figcaption>
  </figure>
}

function exportStockBoxDocumentation() {
  exportDesignSystemCsv('coretech-stock-box.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.slotsHeadings, ...data.slots, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function StockBoxDocumentation() {
  return <div className="app-shell docs-shell stock-box-documentation">
    <DesignSystemNavigation page="Stock Box" />
    <main aria-labelledby="stock-box-title">
      <TopNavigation variant="design-system" section="Components" page="Stock Box" />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Stock Box" headingId="stock-box-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportStockBoxDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="stock-box-overview-title">
          <SectionCardTitle headingId="stock-box-overview-title" icon={packageIcon} action={<Badge>Add Stock · Shelf</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="stock-box-docs-preview stock-box-docs-overview-preview">
              {[{ ...filling, caption: 'Stock Box · Filling' }, over, success].map(boxPreview)}
              <figure><StockBoxCompact onHand={24} /><figcaption>Stock Box / Compact</figcaption></figure>
            </div>
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="stock-box-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="stock-box-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="stock-box-docs-parts" label="Stock Box anatomy" headings={data.anatomyHeadings}
              rows={data.anatomy.map(([index, part, detail]) => [index, part, wrapTokenPath(detail)])} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="stock-box-properties-title" tabIndex={-1}>
          <SectionCardTitle headingId="stock-box-properties-title" icon={propertiesIcon} action={<Badge>Stock Box · 3</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="stock-box-docs-properties" label="Stock Box properties" headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="stock-box-states-title">
          <SectionCardTitle headingId="stock-box-states-title" icon={propertiesIcon} action={<Badge>7 states</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <div className="stock-box-docs-preview stock-box-docs-states-preview">{states.map(boxPreview)}</div>
            <DesignSystemTable className="stock-box-docs-states" label="Stock Box states" headings={data.statesHeadings} rows={data.states} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="stock-box-motion-title">
          <SectionCardTitle headingId="stock-box-motion-title" icon={propertiesIcon} action={<Badge>Sub-components</Badge>}>Slot &amp; Motion</SectionCardTitle>
          <div className="docs-section-body">
            <div className="stock-box-docs-preview stock-box-docs-motion-preview">
              <ul className="stock-box-docs-slot-samples" aria-label="Stock Box slot kinds">
                {data.slots.map(([label], index) => <li key={label}>
                  <svg width="16" height="12" aria-hidden="true"><rect className={slotStyles[index]} width="16" height="12" /></svg>
                  {label}
                </li>)}
              </ul>
              {poses.map(boxPreview)}
            </div>
            <DesignSystemTable className="stock-box-docs-slots" label="Stock Box slot kinds" headings={data.slotsHeadings}
              rows={data.slots.map(([kind, token, meaning]) => [kind, wrapTokenPath(token), meaning])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="stock-box-tokens-title">
          <SectionCardTitle headingId="stock-box-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="stock-box-docs-tokens" label="Stock Box tokens" headings={data.tokensHeadings}
              rows={data.tokens.map(([part, token, value]) => [part, wrapTokenPath(token), value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="stock-box-context-title">
          <SectionCardTitle headingId="stock-box-context-title" icon={contextIcon} action={<Badge>16 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="stock-box-docs-context" label="Stock Box in context" headings={data.contextHeadings}
              rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="stock-box-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="stock-box-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="stock-box-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="stock-box-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="stock-box-docs-accessibility" label="Stock Box accessibility" headings={data.accessibilityHeadings}
              rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="stock-box-audit-title">
          <SectionCardTitle headingId="stock-box-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit stock-box-docs-audit" label="Stock Box audit notes" headings={data.auditHeadings}
              rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
