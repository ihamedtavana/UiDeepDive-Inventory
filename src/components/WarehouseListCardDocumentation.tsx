import './WarehouseListCardDocumentation.css'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { WarehouseListCardPreview } from './WarehouseListCardPreview'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './warehouseListCardDocumentationData'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Warehouse List Card'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Required: 'warning', Fail: 'error', Check: 'warning', Error: 'error',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-warehouse-list-card.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.actionAnatomyHeadings, ...data.actionAnatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function WarehouseListCardDocumentation() {
  return <div className="app-shell docs-shell warehouse-card-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="warehouse-list-card-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="warehouse-list-card-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="warehouse-list-card-overview-title">
          <SectionCardTitle headingId="warehouse-list-card-overview-title" icon={packageIcon} action={<Badge>Warehouse Switch</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <WarehouseListCardPreview variant="overview" />
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="warehouse-list-card-anatomy-title">
          <SectionCardTitle headingId="warehouse-list-card-anatomy-title" icon={searchIcon} action={<Badge>Card · 6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="warehouse-card-docs-anatomy" label="Warehouse List Card anatomy"
              headings={data.anatomyHeadings} rows={data.anatomy.map(([number, part, details]) => [number, part, wrapTokenPath(details)])} />
            <DesignSystemTable className="warehouse-card-docs-action-anatomy" label="Switch Action Bar anatomy"
              headings={data.actionAnatomyHeadings} rows={data.actionAnatomy} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="warehouse-list-card-properties-title">
          <SectionCardTitle headingId="warehouse-list-card-properties-title" icon={propertiesIcon} action={<Badge>12 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="warehouse-card-docs-properties" label="Warehouse List Card properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="warehouse-list-card-states-title">
          <SectionCardTitle headingId="warehouse-list-card-states-title" icon={propertiesIcon} action={<Badge>Card · Radio · Bar</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <WarehouseListCardPreview variant="states" />
            <DesignSystemTable className="warehouse-card-docs-states" label="Warehouse List Card states"
              headings={data.statesHeadings} rows={data.states.map(([state, background, text]) => [state, wrapTokenPath(background), wrapTokenPath(text)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="warehouse-list-card-tokens-title">
          <SectionCardTitle headingId="warehouse-list-card-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="warehouse-card-docs-tokens" label="Warehouse List Card tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), note])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="warehouse-list-card-context-title">
          <SectionCardTitle headingId="warehouse-list-card-context-title" icon={contextIcon} action={<Badge>18 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="warehouse-card-docs-context" label="Warehouse List Card usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="warehouse-list-card-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="warehouse-list-card-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="warehouse-list-card-accessibility-title">
          <SectionCardTitle headingId="warehouse-list-card-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="warehouse-card-docs-accessibility" label="Warehouse List Card accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="warehouse-list-card-audit-title">
          <SectionCardTitle headingId="warehouse-list-card-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit warehouse-card-docs-audit" label="Warehouse List Card audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
