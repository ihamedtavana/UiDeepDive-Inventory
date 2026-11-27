import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ShelfBinCardPreview } from './ShelfBinCardPreview'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import * as data from './shelfBinCardDocumentationData'
import { wrapTokenPath } from './wrapTokenPath'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Shelf & Bin Card'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Required: 'warning', Pass: 'success', Fail: 'error', Fix: 'error',
  Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-shelf-bin-card.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.shelfPartsHeadings, ...data.shelfParts, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function ShelfBinCardDocumentation() {
  return <div className="app-shell docs-shell shelf-bin-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="shelf-bin-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="shelf-bin-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="shelf-bin-overview-title">
          <SectionCardTitle headingId="shelf-bin-overview-title" icon={packageIcon} action={<Badge>Shelf view</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <ShelfBinCardPreview variant="overview" />
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="shelf-bin-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="shelf-bin-anatomy-title" icon={searchIcon} action={<Badge>Bin Card · 6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="shelf-bin-docs-anatomy" label="Bin Card anatomy" headings={data.anatomyHeadings}
              rows={data.anatomy.map(([index, part, detail]) => [index, part, wrapTokenPath(detail)])} rowHeadingColumn={1} />
            <DesignSystemTable className="shelf-bin-docs-parts" label="Shelf Header and Shelf Summary anatomy" headings={data.shelfPartsHeadings}
              rows={data.shelfParts.map(([part, detail]) => [part, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="shelf-bin-properties-title" tabIndex={-1}>
          <SectionCardTitle headingId="shelf-bin-properties-title" icon={propertiesIcon} action={<Badge>7 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="shelf-bin-docs-properties" label="Shelf and bin properties" headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shelf-bin-states-title">
          <SectionCardTitle headingId="shelf-bin-states-title" icon={propertiesIcon} action={<Badge>Bin Card</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <ShelfBinCardPreview variant="states" />
            <DesignSystemTable className="shelf-bin-docs-states" label="Bin Card states" headings={data.statesHeadings}
              rows={data.states.map(([state, background, border]) => [state, wrapTokenPath(background), wrapTokenPath(border)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shelf-bin-tokens-title">
          <SectionCardTitle headingId="shelf-bin-tokens-title" icon={packageIcon} action={<Badge>2 notes</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="shelf-bin-docs-tokens" label="Shelf and bin tokens" headings={data.tokensHeadings}
              rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), wrapTokenPath(note)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shelf-bin-context-title">
          <SectionCardTitle headingId="shelf-bin-context-title" icon={contextIcon} action={<Badge>14 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="shelf-bin-docs-context" label="Shelf and bin variants in context" headings={data.contextHeadings}
              rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="shelf-bin-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="shelf-bin-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="shelf-bin-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="shelf-bin-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="shelf-bin-docs-accessibility" label="Shelf and bin accessibility" headings={data.accessibilityHeadings}
              rows={data.accessibility.map(([check, detail, status]) => [check, wrapTokenPath(detail), <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shelf-bin-audit-title">
          <SectionCardTitle headingId="shelf-bin-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit shelf-bin-docs-audit" label="Shelf and bin audit notes" headings={data.auditHeadings}
              rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
