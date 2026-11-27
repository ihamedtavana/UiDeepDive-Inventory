import './MapDocumentation.css'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { MapDocumentationPreview } from './MapDocumentationPreview'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './mapDocumentationData'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Map'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Pass: 'success', Required: 'warning', Fail: 'error', Check: 'warning',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-map.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function MapDocumentation() {
  return <div className="app-shell docs-shell map-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="map-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="map-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="map-overview-title">
          <SectionCardTitle headingId="map-overview-title" icon={packageIcon} action={<Badge>Warehouse Switch</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <MapDocumentationPreview variant="overview" />
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="map-anatomy-title">
          <SectionCardTitle headingId="map-anatomy-title" icon={searchIcon} action={<Badge>5 components</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="map-docs-anatomy" label="Map anatomy"
              headings={data.anatomyHeadings} rows={data.anatomy.map(([component, size, details]) => [component, size, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="map-properties-title">
          <SectionCardTitle headingId="map-properties-title" icon={propertiesIcon} action={<Badge>8 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="map-docs-properties" label="Map properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="map-states-title">
          <SectionCardTitle headingId="map-states-title" icon={propertiesIcon} action={<Badge>Marker · Popover</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <MapDocumentationPreview variant="states" />
            <DesignSystemTable className="map-docs-states" label="Map states"
              headings={data.statesHeadings} rows={data.states.map(([state, dot, ring]) => [state, dot, wrapTokenPath(ring)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="map-tokens-title">
          <SectionCardTitle headingId="map-tokens-title" icon={packageIcon} action={<Badge>2 notes</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="map-docs-tokens" label="Map tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), note])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="map-context-title">
          <SectionCardTitle headingId="map-context-title" icon={contextIcon} action={<Badge>24 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="map-docs-context" label="Map usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="map-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="map-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="map-accessibility-title">
          <SectionCardTitle headingId="map-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="map-docs-accessibility" label="Map accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="map-audit-title">
          <SectionCardTitle headingId="map-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit map-docs-audit" label="Map audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
