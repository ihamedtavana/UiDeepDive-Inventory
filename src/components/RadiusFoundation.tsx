import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import {
  componentRadius, nestingLevels, radiusAccessibility, radiusAudit, radiusAuditDescription,
  radiusDescription, radiusGuidelines, radiusJoinedDescription, radiusNestingDescription, radiusScale,
  radiusScaleDescription,
} from './radiusFoundationData'
import { wrapTokenPath } from './wrapTokenPath'
import scaleIcon from '../assets/design-system/data-visualization.svg'
import nestingIcon from '../assets/design-system/spacing-layout.svg'
import joinedIcon from '../assets/design-system/spacing-padding.svg'
import guidelinesIcon from '../assets/design-system/spacing-guidelines.svg'
import searchIcon from '../assets/design-system/search.svg'
import auditIcon from '../assets/design-system/spacing-context.svg'

const sections = [
  ['Overview', 'radius-overview'], ['Scale', 'radius-scale'], ['Nesting', 'radius-nesting'],
  ['In Context', 'joined-surfaces'], ['Accessibility', 'accessibility'],
] as const

const scaleFields = ['Value', 'Alias', 'Usage', 'Used']
const nestingHeadings = ['Level', 'Token', 'Value']
const accessibilityTones = { Guideline: 'info', Review: 'warning' } as const
const auditTones = { Pass: 'success', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const
const joinedExamples = [
  { variant: 'split', tone: 'success', label: 'Do', description: 'Correct — split corners' },
  { variant: 'rounded', tone: 'error', label: "Don't", description: 'Avoid — all corners rounded' },
] as const

function exportRadius() {
  exportDesignSystemCsv('coretech-radius-tokens.csv', [
    ['Token', ...scaleFields], ...radiusScale,
    [], ['Component token', ...scaleFields], ...componentRadius,
    [], nestingHeadings, ...nestingLevels,
  ])
}

function renderRadiusPreview(name: string) {
  const token = name === 'Radius' ? '--component-radius' : `--semantic-${name.toLowerCase().replace('/', '-')}`
  const style = { borderRadius: `calc(var(${token}) * 1px)` } satisfies CSSProperties
  return <span className="radius-preview" style={style} aria-hidden="true" />
}

function radiusRows(tokens: readonly (typeof radiusScale[number] | typeof componentRadius[number])[]) {
  return tokens.map(([name, value, alias, usage, count]) => [
    name, value, wrapTokenPath(alias), usage, count === 'Unused' ? <Badge tone="warning">Unused</Badge> : count,
  ] as const)
}

export function RadiusFoundation() {
  return <div className="app-shell docs-shell radius-foundation">
    <DesignSystemNavigation page="Radius" />
    <main aria-labelledby="radius-title">
      <TopNavigation variant="design-system" section="Foundations" page="Radius" />
      <div className="docs-content" id="radius-overview">
        <DesignSystemPageHeader title="Radius" headingId="radius-title" description={radiusDescription}
          sections={sections} onExport={exportRadius} />

        <SectionCard className="docs-section" id="radius-scale" aria-labelledby="radius-scale-title" tabIndex={-1}>
          <SectionCardTitle headingId="radius-scale-title" icon={scaleIcon} action={<Badge>{radiusScale.length} tokens</Badge>}>Radius Scale</SectionCardTitle>
          <div className="docs-section-body">
            <p>{radiusScaleDescription}</p>
            <DesignSystemTable className="radius-table radius-table--scale" label="Semantic radius scale"
              headings={['Token', ...scaleFields]} rows={radiusRows(radiusScale)} renderPreview={renderRadiusPreview} />
            <DesignSystemTable className="radius-table radius-table--scale" label="Component radius"
              headings={['Component token', ...scaleFields]} rows={radiusRows(componentRadius)} renderPreview={renderRadiusPreview} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="radius-nesting" aria-labelledby="radius-nesting-title" tabIndex={-1}>
          <SectionCardTitle headingId="radius-nesting-title" icon={nestingIcon} action={<Badge>Step down</Badge>}>Nesting</SectionCardTitle>
          <div className="docs-section-body">
            <p>{radiusNestingDescription}</p>
            <div className="radius-nesting">
              <div className="radius-nesting-panel" role="img" aria-label="Nested radius levels from outside in: main panel XL, section L, card title MD, badge SM, and indicator 2XS">
                <span>Main panel · radius/XL</span>
                <div className="radius-nesting-section">
                  <span>Section · radius/L</span>
                  <div className="radius-nesting-title">
                    <span>Card title · radius/MD</span>
                    <div className="radius-nesting-badge">
                      <span>Badge · radius/SM</span>
                      <span className="radius-nesting-indicator" />
                    </div>
                  </div>
                </div>
              </div>
              <DesignSystemTable className="radius-table radius-table--nesting" label="Radius by level" headings={nestingHeadings}
                rows={nestingLevels.map(([level, token, value]) => [level, wrapTokenPath(token), value])} />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="joined-surfaces" aria-labelledby="joined-surfaces-title" tabIndex={-1}>
          <SectionCardTitle headingId="joined-surfaces-title" icon={joinedIcon} action={<Badge>Split corners</Badge>}>Joined Surfaces</SectionCardTitle>
          <div className="docs-section-body">
            <p>{radiusJoinedDescription}</p>
            <div className="docs-guidelines radius-joined">
              {joinedExamples.map(({ variant, tone, label, description }) => <figure key={variant} className={`radius-joined-example radius-joined-example--${variant}`}>
                <div aria-hidden="true">
                  <div className="radius-joined-title">Section title</div>
                  <div className="radius-joined-body">Section body</div>
                </div>
                <figcaption><Badge tone={tone}>{label}</Badge>{description}</figcaption>
              </figure>)}
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="radius-guidelines" aria-labelledby="radius-guidelines-title" tabIndex={-1}>
          <SectionCardTitle headingId="radius-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines radius-guidelines">
            {radiusGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="radius-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="radius-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="radius-table radius-table--accessibility" label="Radius accessibility"
              headings={['Guideline', 'Detail', 'Status']} rows={radiusAccessibility.map(([guideline, detail, status]) => [
                guideline, wrapTokenPath(detail), <Badge tone={accessibilityTones[status]}>{status}</Badge>,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="radius-audit" aria-labelledby="radius-audit-title" tabIndex={-1}>
          <SectionCardTitle headingId="radius-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{radiusAuditDescription}</p>
            <DesignSystemTable className="radius-table radius-table--audit docs-table--audit" label="Radius token audit notes"
              headings={['Finding', 'Tokens', 'Details', 'Severity']} rows={radiusAudit.map(([finding, token, details, severity]) => [
                finding, wrapTokenPath(token), wrapTokenPath(details), <Badge tone={auditTones[severity]}>{severity}</Badge>,
              ])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
