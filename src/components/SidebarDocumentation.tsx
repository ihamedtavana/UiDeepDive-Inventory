import './SidebarDocumentation.css'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { SidebarDocumentationPreview } from './SidebarDocumentationPreview'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './sidebarDocumentationData'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Sidebar'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Pass: 'success', Required: 'warning', Fix: 'error', Fail: 'error', Error: 'error',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-sidebar.csv', [
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

export function SidebarDocumentation() {
  return <div className="app-shell docs-shell sidebar-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="sidebar-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="sidebar-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="sidebar-overview-title">
          <SectionCardTitle headingId="sidebar-overview-title" icon={packageIcon} action={<Badge>Dashboard</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <SidebarDocumentationPreview variant="overview" />
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="sidebar-anatomy-title">
          <SectionCardTitle headingId="sidebar-anatomy-title" icon={searchIcon} action={<Badge>Top to bottom</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="sidebar-docs-anatomy" label="Sidebar anatomy"
              headings={data.anatomyHeadings} rowHeadingColumn={1} rows={data.anatomy.map(([number, part, component, details]) => [number, part, component, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="sidebar-properties-title">
          <SectionCardTitle headingId="sidebar-properties-title" icon={propertiesIcon} action={<Badge>Per component</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="sidebar-docs-properties" label="Sidebar properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="sidebar-states-title">
          <SectionCardTitle headingId="sidebar-states-title" icon={propertiesIcon} action={<Badge>6 variants</Badge>}>Menu Button states</SectionCardTitle>
          <div className="docs-section-body">
            <SidebarDocumentationPreview variant="states" />
            <DesignSystemTable className="sidebar-docs-states" label="Sidebar states"
              headings={data.statesHeadings} rows={data.states.map(([state, boxes, helper]) => [state, wrapTokenPath(boxes), wrapTokenPath(helper)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="sidebar-tokens-title">
          <SectionCardTitle headingId="sidebar-tokens-title" icon={packageIcon} action={<Badge>1 note</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="sidebar-docs-tokens" label="Sidebar tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), wrapTokenPath(note)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="sidebar-context-title">
          <SectionCardTitle headingId="sidebar-context-title" icon={contextIcon} action={<Badge>6 Sidebars</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="sidebar-docs-context" label="Sidebar usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="sidebar-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="sidebar-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="sidebar-accessibility-title">
          <SectionCardTitle headingId="sidebar-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="sidebar-docs-accessibility" label="Sidebar accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="sidebar-audit-title">
          <SectionCardTitle headingId="sidebar-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit sidebar-docs-audit" label="Sidebar audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
