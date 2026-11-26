import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { OverviewCard } from './OverviewCard'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import {
  gapDescription, gapTokens, layoutDescription, layoutTokens, paddingDescription, paddingTokens,
  scaleDescription, spacingAccessibility, spacingAudit, spacingAuditDescription, spacingContext,
  spacingContextDescription, spacingDescription, spacingGuidelines, spacingScale,
} from './spacingFoundationData'
import { wrapTokenPath } from './wrapTokenPath'
import scaleIcon from '../assets/design-system/data-visualization.svg'
import productIcon from '../assets/design-system/page-status.svg'
import searchIcon from '../assets/design-system/search.svg'
import contextIcon from '../assets/design-system/spacing-context.svg'
import gapIcon from '../assets/design-system/spacing-gap.svg'
import guidelinesIcon from '../assets/design-system/spacing-guidelines.svg'
import layoutIcon from '../assets/design-system/spacing-layout.svg'
import paddingIcon from '../assets/design-system/spacing-padding.svg'

const sections = [
  ['Overview', 'spacing-overview'], ['Scale', 'spacing-scale'], ['Semantic', 'gap'],
  ['In Context', 'spacing-context'], ['Accessibility', 'accessibility'],
] as const

const groups = [
  { id: 'gap', title: 'Gap', icon: gapIcon, description: gapDescription, tokens: gapTokens },
  { id: 'padding', title: 'Padding', icon: paddingIcon, description: paddingDescription, tokens: paddingTokens },
  { id: 'layout', title: 'Layout', icon: layoutIcon, description: layoutDescription, tokens: layoutTokens },
] as const

const scaleHeadings = ['Global token', 'Value', 'Visual', 'Semantic tokens using it']
const semanticHeadings = ['Token', 'Value', 'Alias', 'Visual', 'Usage', 'Used']
const contextHeadings = ['Area', 'Token', 'Value']
const accessibilityHeadings = ['Guideline', 'Detail', 'Status']
const auditHeadings = ['Finding', 'Tokens', 'Details', 'Severity']
const productStats = [['1,921', 'Available'], ['90', 'Out Stock'], ['180', 'Reserved']]
const accessibilityTones = { Pass: 'success', Review: 'warning', Guideline: 'info' } as const
const auditTones = { Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const

function exportSpacing() {
  exportDesignSystemCsv('coretech-spacing-tokens.csv', [
    ['Global token', 'Value', 'Semantic tokens using it'],
    ...spacingScale.map(([step, value, aliases]) => [`spacing/${step}`, `${value} px`, aliases]),
    ...groups.flatMap(({ title, tokens }) => [
      [], [title], ['Token', 'Value', 'Alias', 'Usage', 'Used'],
      ...tokens.map(([token, value, alias, usage, used]) => [token, `${value} px`, alias, usage, used || 'Unused']),
    ]),
    [], contextHeadings, ...spacingContext,
  ])
}

function sampleStyle(token: string): CSSProperties {
  return { '--spacing-sample-value': `calc(var(--${token}) * 1px)` } as CSSProperties
}

export function SpacingFoundation() {
  return <div className="app-shell docs-shell spacing-foundation">
    <DesignSystemNavigation page="Spacing" />
    <main aria-labelledby="spacing-title">
      <TopNavigation variant="design-system" section="Foundations" page="Spacing" />
      <div className="docs-content" id="spacing-overview">
        <DesignSystemPageHeader title="Spacing" headingId="spacing-title" description={spacingDescription}
          sections={sections} onExport={exportSpacing} />

        <SectionCard className="docs-section" id="spacing-scale" aria-labelledby="spacing-scale-title" tabIndex={-1}>
          <SectionCardTitle headingId="spacing-scale-title" icon={scaleIcon} action={<Badge>4px base</Badge>}>Spacing Scale</SectionCardTitle>
          <div className="docs-section-body">
            <p>{scaleDescription}</p>
            <DesignSystemTable className="spacing-table spacing-table--scale" label="Spacing Scale" headings={scaleHeadings}
              rows={spacingScale.map(([step, value, aliases]) => [
                `spacing/${step}`, `${value} px`,
                <span className="spacing-sample spacing-sample--bar" style={sampleStyle(`global-spacing-${step}`)} aria-hidden="true" />,
                wrapTokenPath(aliases),
              ])} />
          </div>
        </SectionCard>

        {groups.map(({ id, title, icon, description, tokens }) =>
          <SectionCard className="docs-section" id={id} key={id} aria-labelledby={`${id}-title`} tabIndex={-1}>
            <SectionCardTitle headingId={`${id}-title`} icon={icon} action={<Badge>{tokens.length} tokens</Badge>}>{title}</SectionCardTitle>
            <div className="docs-section-body">
              <p>{description}</p>
              <DesignSystemTable className="spacing-table spacing-table--semantic" label={title} headings={semanticHeadings}
                rows={tokens.map(([token, value, alias, usage, used]) => [
                  token, `${value} px`, wrapTokenPath(alias),
                  <span className={`spacing-sample spacing-sample--${id === 'layout' ? 'bar' : id}`}
                    style={sampleStyle(`semantic-spacing-${token.toLowerCase().replaceAll('/', '-')}`)} aria-hidden="true">
                    {id === 'gap' && <><span /><span /><span /></>}
                    {id === 'padding' && <span />}
                  </span>,
                  usage, used || <Badge tone="warning">Unused</Badge>,
                ])} />
            </div>
          </SectionCard>,
        )}

        <SectionCard className="docs-section" id="spacing-context" aria-labelledby="spacing-context-title" tabIndex={-1}>
          <SectionCardTitle headingId="spacing-context-title" icon={contextIcon}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{spacingContextDescription}</p>
            <div className="spacing-context">
              <figure className="spacing-context-example">
                <OverviewCard title="Total Products" icon={productIcon} badge="+3.8%" isPositive>
                  <div className="overview-card-body">
                    <div className="overview-reading"><strong>1,240</strong><span>Products</span></div>
                    <div className="overview-stats">{productStats.map(([value, label]) =>
                      <div className="overview-stat" key={label}><strong>{value}</strong><div>{label}</div></div>,
                    )}</div>
                  </div>
                </OverviewCard>
                <figcaption>Card: Padding/MD · Gap/LG<br />Card title: Padding/SM</figcaption>
              </figure>
              <DesignSystemTable className="spacing-table spacing-table--context" label="Spacing in context" headings={contextHeadings}
                rows={spacingContext.map(([area, token, value]) => [area, wrapTokenPath(token), value])} />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="spacing-guidelines" aria-labelledby="spacing-guidelines-title" tabIndex={-1}>
          <SectionCardTitle headingId="spacing-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines spacing-guidelines">
            {spacingGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="spacing-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="spacing-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="spacing-table spacing-table--accessibility" label="Spacing accessibility" headings={accessibilityHeadings}
              rows={spacingAccessibility.map(([guideline, detail, status]) => [
                guideline, detail, <Badge tone={accessibilityTones[status]}>{status}</Badge>,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="spacing-audit" aria-labelledby="spacing-audit-title" tabIndex={-1}>
          <SectionCardTitle headingId="spacing-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{spacingAuditDescription}</p>
            <DesignSystemTable className="spacing-table spacing-table--audit docs-table--audit" label="Token Audit Notes" headings={auditHeadings}
              rows={spacingAudit.map(([finding, tokens, details, severity]) => [
                finding, wrapTokenPath(tokens), details, <Badge tone={auditTones[severity]}>{severity}</Badge>,
              ])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
