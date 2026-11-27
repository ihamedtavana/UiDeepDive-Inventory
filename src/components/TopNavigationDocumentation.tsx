import './TopNavigationDocumentation.css'
import { Avatar } from './Avatar'
import { Badge, type BadgeTone } from './Badge'
import { Breadcrumb } from './Breadcrumb'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './topNavigationDocumentationData'
import avatar from '../assets/top0_imgAvatar.png'
import checkIcon from '../assets/design-system/layout-check.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import packageSearchIcon from '../assets/design-system/audit.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import searchIcon from '../assets/design-system/search.svg'

const page = 'Top Navigation'
const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const statusTones = {
  Required: 'warning', Fail: 'error', Warning: 'warning', Error: 'error', Info: 'info', 'Not tokenized': 'warning',
} satisfies Record<string, BadgeTone>

function exportDocumentation() {
  exportDesignSystemCsv('coretech-top-navigation.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function TopNavigationDocumentation() {
  return <div className="app-shell docs-shell top-navigation-documentation">
    <DesignSystemNavigation page={page} />
    <main aria-labelledby="top-navigation-title">
      <TopNavigation variant="design-system" section="Components" page={page} />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title={page} headingId="top-navigation-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="top-navigation-overview-title">
          <SectionCardTitle headingId="top-navigation-overview-title" icon={packageIcon} action={<Badge>Dashboard</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="top-navigation-docs-preview">
              <figure>
                <TopNavigation />
                <figcaption>Top Navigation</figcaption>
              </figure>
              <figure>
                <Breadcrumb location="New York Central" page="Inventory" />
                <figcaption>Breadcrumb</figcaption>
              </figure>
              <figure>
                <Avatar src={avatar} alt="Account avatar" />
                <figcaption>Avatar</figcaption>
              </figure>
            </div>
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" tabIndex={-1} aria-labelledby="top-navigation-anatomy-title">
          <SectionCardTitle headingId="top-navigation-anatomy-title" icon={searchIcon} action={<Badge>6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="top-navigation-docs-anatomy" label="Top Navigation anatomy"
              headings={data.anatomyHeadings} rowHeadingColumn={1}
              rows={data.anatomy.map(([number, part, details]) => [number, part, wrapTokenPath(details)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" tabIndex={-1} aria-labelledby="top-navigation-properties-title">
          <SectionCardTitle headingId="top-navigation-properties-title" icon={propertiesIcon} action={<Badge>1 property</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="top-navigation-docs-properties" label="Top Navigation properties"
              headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="top-navigation-tokens-title">
          <SectionCardTitle headingId="top-navigation-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="top-navigation-docs-tokens" label="Top Navigation tokens"
              headings={data.tokensHeadings} rows={data.tokens.map(([part, token, note]) => [part, wrapTokenPath(token), note])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="top-navigation-context-title">
          <SectionCardTitle headingId="top-navigation-context-title" icon={packageSearchIcon} action={<Badge>3 bars</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="top-navigation-docs-context" label="Top Navigation usage in screens"
              headings={data.contextHeadings} rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" tabIndex={-1} aria-labelledby="top-navigation-usage-title">
          <SectionCardTitle headingId="top-navigation-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" tabIndex={-1} aria-labelledby="top-navigation-accessibility-title">
          <SectionCardTitle headingId="top-navigation-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="top-navigation-docs-accessibility" label="Top Navigation accessibility"
              headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="top-navigation-audit-title">
          <SectionCardTitle headingId="top-navigation-audit-title" icon={packageSearchIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit top-navigation-docs-audit" label="Top Navigation audit notes"
              headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, detail, <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
