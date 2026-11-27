import './AuthDocumentation.css'
import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './authDocumentationData'
import contextIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Auth'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Pass: 'success', Required: 'warning', Fail: 'error', Error: 'error',
  Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-auth.csv', [
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

export function AuthDocumentation() {
  return <div className="app-shell docs-shell auth-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="auth-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="auth-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="auth-overview-title">
          <SectionCardTitle headingId="auth-overview-title" icon={packageIcon} action={<Badge>Login / Register</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="auth-anatomy-title">
          <SectionCardTitle headingId="auth-anatomy-title" icon={searchIcon} action={<Badge>6 components</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="auth-docs-anatomy" label="Auth anatomy"
              headings={data.anatomyHeadings} rows={data.anatomy.map(([component, size, details]) => [component, size, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="auth-properties-title">
          <SectionCardTitle headingId="auth-properties-title" icon={propertiesIcon} action={<Badge>Per component</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="auth-docs-properties" label="Auth properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="auth-states-title">
          <SectionCardTitle headingId="auth-states-title" icon={propertiesIcon} action={<Badge>Step Icon · OTP</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="auth-docs-states" label="Auth states"
              headings={data.statesHeadings} rows={data.states.map(([state, boxes, helper]) => [state, wrapTokenPath(boxes), helper])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="auth-tokens-title">
          <SectionCardTitle headingId="auth-tokens-title" icon={packageIcon} action={<Badge>1 note</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="auth-docs-tokens" label="Auth tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), wrapTokenPath(note)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="auth-context-title">
          <SectionCardTitle headingId="auth-context-title" icon={contextIcon} action={<Badge>55 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="auth-docs-context" label="Auth usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="auth-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="auth-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="auth-accessibility-title">
          <SectionCardTitle headingId="auth-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="auth-docs-accessibility" label="Auth accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="auth-audit-title">
          <SectionCardTitle headingId="auth-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit auth-docs-audit" label="Auth audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
