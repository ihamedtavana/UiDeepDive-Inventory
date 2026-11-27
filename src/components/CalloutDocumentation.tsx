import { useState } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { StockCallout } from './StockCallout'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './calloutDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import contextIcon from '../assets/design-system/audit.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'

const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const badgeTones = { Pass: 'success', Required: 'warning', Warning: 'warning', Error: 'error', Info: 'info', 'Not tokenized': 'warning' } as const
const previewTones = { Info: 'info', Success: 'success', Warning: 'warning', Error: 'error' } as const

function exportCalloutDocumentation() {
  exportDesignSystemCsv('coretech-callout.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.tonesHeadings, ...data.tones, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.contentHeadings, ...data.content, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function CalloutDocumentation() {
  const [isQuantityAdjusted, setIsQuantityAdjusted] = useState(false)
  const [isCodeResent, setIsCodeResent] = useState(false)

  return <div className="app-shell docs-shell callout-documentation">
    <DesignSystemNavigation page="Callout" />
    <main aria-labelledby="callout-title">
      <TopNavigation variant="design-system" section="Components" page="Callout" />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Callout" headingId="callout-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportCalloutDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="callout-overview-title">
          <SectionCardTitle headingId="callout-overview-title" icon={packageIcon} action={<Badge>3 flows</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="callout-docs-preview">
              <figure>
                <StockCallout variant="design-system" tone={isQuantityAdjusted ? 'success' : 'error'}
                  title={isQuantityAdjusted ? 'Quantity updated to 24 units' : '30 units won’t fit in this bin'} hasAction
                  action={isQuantityAdjusted ? 'Reset' : 'Action'}
                  actionLabel={isQuantityAdjusted ? 'Reset the Add Stock example' : 'Action: Set quantity to 24'}
                  onAction={() => setIsQuantityAdjusted(current => !current)}>
                  {isQuantityAdjusted ? '24 units fit in the selected bin.' : 'Add 24 here now, or split the delivery across bins.'}
                </StockCallout>
                <figcaption>Error · Add Stock</figcaption>
              </figure>
              <figure>
                <StockCallout variant="design-system" tone="success" title="Switched to Frankfurt Hub">
                  Dashboard data now reflects this warehouse.
                </StockCallout>
                <figcaption>Success · Warehouse Switch</figcaption>
              </figure>
              <figure>
                <StockCallout variant="design-system" tone={isCodeResent ? 'info' : 'warning'}
                  title={isCodeResent ? 'New code sent' : 'This code has expired'} hasAction
                  action={isCodeResent ? 'Reset' : 'Action'}
                  actionLabel={isCodeResent ? 'Reset the email OTP example' : 'Action: Send a new code'}
                  onAction={() => setIsCodeResent(current => !current)}>
                  {isCodeResent ? 'Check your email for the new code.' : 'Send a new code to continue.'}
                </StockCallout>
                <figcaption>Warning · Email OTP</figcaption>
              </figure>
              <figure className="callout-docs-title-example">
                <StockCallout variant="design-system" tone="info" title="New code sent" />
                <figcaption>Info · title only</figcaption>
              </figure>
            </div>
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="callout-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="callout-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="callout-docs-parts" label="Callout anatomy" headings={data.anatomyHeadings}
              rows={data.anatomy.map(([number, part, detail]) => [number, part, wrapTokenPath(detail)])} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="callout-properties-title" tabIndex={-1}>
          <SectionCardTitle headingId="callout-properties-title" icon={propertiesIcon} action={<Badge>5 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="callout-docs-properties" label="Callout properties" headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="callout-tones-title">
          <SectionCardTitle headingId="callout-tones-title" icon={propertiesIcon} action={<Badge>4 tones</Badge>}>Tones</SectionCardTitle>
          <div className="docs-section-body">
            <div className="callout-docs-preview">
              {data.tones.map(([tone]) => <figure key={tone}>
                <StockCallout variant="design-system" tone={previewTones[tone]} title="Callout title" hasAction>
                  Supporting text that explains what happened and what to do next.
                </StockCallout>
                <figcaption>{tone}</figcaption>
              </figure>)}
            </div>
            <DesignSystemTable className="callout-docs-tones" label="Callout tones" headings={data.tonesHeadings} rows={data.tones} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="callout-tokens-title">
          <SectionCardTitle headingId="callout-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="callout-docs-tokens" label="Callout tokens" headings={data.tokensHeadings}
              rows={data.tokens.map(([part, token, value]) => [part, wrapTokenPath(token), value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="callout-context-title">
          <SectionCardTitle headingId="callout-context-title" icon={contextIcon} action={<Badge>22 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="callout-docs-context" label="Callout in context" headings={data.contextHeadings}
              rows={data.context.map(([tone, example, count]) => [tone, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="callout-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="callout-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="callout-content-title">
          <SectionCardTitle headingId="callout-content-title" icon={contentIcon} action={<Badge>Voice</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="callout-docs-content" label="Callout content" headings={data.contentHeadings} rows={data.content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="callout-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="callout-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="callout-docs-accessibility" label="Callout accessibility" headings={data.accessibilityHeadings}
              rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={badgeTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="callout-audit-title">
          <SectionCardTitle headingId="callout-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit callout-docs-audit" label="Callout audit notes" headings={data.auditHeadings}
              rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={badgeTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
