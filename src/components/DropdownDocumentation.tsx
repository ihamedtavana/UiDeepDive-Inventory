import './DropdownDocumentation.css'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { DropdownPreview } from './DropdownPreview'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './dropdownDocumentationData'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Dropdown'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Required: 'warning', Pass: 'success', Fix: 'error',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-dropdown.csv', [
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

export function DropdownDocumentation() {
  return <div className="app-shell docs-shell dropdown-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="dropdown-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="dropdown-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="dropdown-overview-title">
          <SectionCardTitle headingId="dropdown-overview-title" icon={packageIcon} action={<Badge>Shelf header</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <DropdownPreview variant="overview" />
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="dropdown-anatomy-title">
          <SectionCardTitle headingId="dropdown-anatomy-title" icon={searchIcon} action={<Badge>3 components</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="dropdown-docs-anatomy" label="Dropdown anatomy"
              headings={data.anatomyHeadings} rows={data.anatomy.map(([component, part, details]) => [component, part, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="dropdown-properties-title">
          <SectionCardTitle headingId="dropdown-properties-title" icon={propertiesIcon} action={<Badge>7 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="dropdown-docs-properties" label="Dropdown properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="dropdown-states-title">
          <SectionCardTitle headingId="dropdown-states-title" icon={propertiesIcon} action={<Badge>3 + 5 states</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <DropdownPreview variant="states" />
            <DesignSystemTable className="dropdown-docs-states" label="Dropdown states"
              headings={data.statesHeadings} rows={data.states.map(([state, background, text]) => [state, wrapTokenPath(background), wrapTokenPath(text)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="dropdown-tokens-title">
          <SectionCardTitle headingId="dropdown-tokens-title" icon={packageIcon} action={<Badge>2 notes</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="dropdown-docs-tokens" label="Dropdown tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), note])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="dropdown-context-title">
          <SectionCardTitle headingId="dropdown-context-title" icon={contextIcon} action={<Badge>1 nested</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="dropdown-docs-context" label="Dropdown usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="dropdown-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="dropdown-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="dropdown-accessibility-title">
          <SectionCardTitle headingId="dropdown-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="dropdown-docs-accessibility" label="Dropdown accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="dropdown-audit-title">
          <SectionCardTitle headingId="dropdown-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit dropdown-docs-audit" label="Dropdown audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
