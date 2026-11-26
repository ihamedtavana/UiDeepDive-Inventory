import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { StatusBadge } from './StatusBadge'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, anatomy, audit, auditDescription, badgeDescription, badgeSource, contentRules,
  context, contextDescription, guidelines, indicators, metrics, properties, statusDescription,
  tokens, tones, tonesDescription,
} from './badgeDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import tonesIcon from '../assets/design-system/badge-tones.svg'
import statusIcon from '../assets/design-system/badge-status.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'
import leadingIcon from '../assets/design-system/badge-anatomy-leading.svg'
import trailingIcon from '../assets/design-system/badge-anatomy-trailing.svg'

const sections = [
  ['Overview', 'badge-overview'], ['Tones', 'tones'], ['Status', 'status'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const anatomyHeadings = ['#', 'Part', 'Details']
const propertyHeadings = ['Property', 'Type', 'Values', 'Default']
const toneHeadings = ['Tone', 'Use for', 'Tokens', 'On the dashboard', 'Contrast']
const statusHeadings = ['Type', 'Token', 'Meaning', 'Used']
const tokenHeadings = ['Part', 'Token', 'Value']
const contextHeadings = ['Tone', 'Labels on the dashboard', 'Count']
const contentHeadings = ['Rule', 'Detail', 'Example']
const accessibilityHeadings = ['Check', 'Detail', 'Status']
const auditHeadings = ['Finding', 'Where', 'Details', 'Severity']

const toneRows = tones.map(([name, , usage, token, example, ratio, result]) => [
  name, usage, <strong>{wrapTokenPath(token)}</strong>, example,
  <span className="badge-docs-contrast"><strong>{ratio}</strong><Badge tone={result === 'AA' ? 'success' : 'error'}>{result}</Badge></span>,
] as const)

function exportBadgeDocumentation() {
  exportDesignSystemCsv('coretech-badge.csv', [
    ['Metric', 'Value'], ...metrics,
    [], anatomyHeadings, ...anatomy,
    [], propertyHeadings, ...properties,
    [], [...toneHeadings, 'Result'], ...tones.map(([name, , usage, token, example, ratio, result]) => [name, usage, token, example, ratio, result]),
    [], statusHeadings, ...indicators.map(([name, token, meaning, count]) => [name, token, meaning, count]),
    [], tokenHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...contentRules,
    [], accessibilityHeadings, ...accessibility.map(([name, detail, result]) => [name, detail, result]),
    [], auditHeadings, ...audit.map(([name, where, detail, severity]) => [name, where, detail, severity]),
  ])
}

export function BadgeDocumentation() {
  return <div className="app-shell docs-shell badge-documentation">
    <DesignSystemNavigation page="Badge" />
    <main aria-labelledby="badge-title">
      <TopNavigation variant="design-system" section="Components" page="Badge" />
      <div className="docs-content" id="badge-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Badge" headingId="badge-title" section="Components"
          description={badgeDescription} sections={sections} onExport={exportBadgeDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="badge-overview-title">
          <SectionCardTitle headingId="badge-overview-title" icon={packageIcon} action={<Badge>Badge + Status Indicator</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="badge-docs-preview">
              <div className="badge-docs-preview-tones" role="group" aria-label="Badge examples">
                {tones.map(([name, example]) => <Badge key={name} tone={name.toLowerCase() as BadgeTone}>{example}</Badge>)}
              </div>
              <div className="badge-docs-preview-indicators" aria-hidden="true">
                {indicators.map(([name, , , , tone]) => <StatusBadge key={name} tone={tone} />)}
              </div>
            </div>
            <dl className="docs-metrics">
              {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{badgeSource}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-anatomy-title">
          <SectionCardTitle headingId="badge-anatomy-title" icon={searchIcon} action={<Badge>4 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body badge-docs-anatomy">
            <div className="badge-docs-anatomy-stage" aria-hidden="true">
              <div className="badge-docs-anatomy-example">
                <Badge tone="success" leadingIcon={<img src={leadingIcon} alt="" />} trailingIcon={<img src={trailingIcon} alt="" />}>Delivered</Badge>
                {anatomy.map(([number]) => <span className="badge-docs-marker" key={number} data-part={number}>{number}</span>)}
              </div>
            </div>
            <DesignSystemTable className="badge-docs-parts" label="Badge anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([number, part, detail]) => [number, <strong>{part}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-properties-title">
          <SectionCardTitle headingId="badge-properties-title" icon={gridIcon} action={<Badge>8 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="badge-docs-properties" label="Badge properties" headings={propertyHeadings} rows={properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="tones" aria-labelledby="badge-tones-title" tabIndex={-1}>
          <SectionCardTitle headingId="badge-tones-title" icon={tonesIcon} action={<Badge>7 tones</Badge>}>Tones</SectionCardTitle>
          <div className="docs-section-body">
            <p>{tonesDescription}</p>
            <div className="badge-docs-tone-table">
              <DesignSystemTable className="badge-docs-tones" label="Badge tones" headings={toneHeadings}
                renderRowHeading={name => <Badge tone={name.toLowerCase() as BadgeTone}>{name}</Badge>} rows={toneRows} />
            </div>
            <ul className="badge-docs-tone-cards" role="list" aria-label="Badge tones">
              {toneRows.map(([name, ...values]) => <li key={name}>
                <h3><Badge tone={name.toLowerCase() as BadgeTone}>{name}</Badge></h3>
                <dl>{values.map((value, index) => <div key={toneHeadings[index + 1]}>
                  <dt>{toneHeadings[index + 1]}</dt><dd>{value}</dd>
                </div>)}</dl>
              </li>)}
            </ul>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="status" aria-labelledby="badge-status-title" tabIndex={-1}>
          <SectionCardTitle headingId="badge-status-title" icon={statusIcon} action={<Badge>Status Badges</Badge>}>Status Indicator</SectionCardTitle>
          <div className="docs-section-body">
            <p>{statusDescription}</p>
            <DesignSystemTable className="badge-docs-status" label="Status indicators" headings={statusHeadings} previewHeading="Mark"
              renderPreview={name => {
                const indicator = indicators.find(([type]) => type === name)
                return indicator && <StatusBadge tone={indicator[4]} />
              }}
              rows={indicators.map(([name, token, meaning, count]) => [name, <strong>{wrapTokenPath(token)}</strong>, meaning, count])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-tokens-title">
          <SectionCardTitle headingId="badge-tokens-title" icon={packageIcon} action={<Badge>Component + semantic</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="badge-docs-tokens" label="Badge tokens" headings={tokenHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone="warning">{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-context-title">
          <SectionCardTitle headingId="badge-context-title" icon={contextIcon} action={<Badge>37 instances</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{contextDescription}</p>
            <DesignSystemTable className="badge-docs-context" label="Badge use on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="badge-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="badge-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines badge-docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-content-title">
          <SectionCardTitle headingId="badge-content-title" icon={contentIcon} action={<Badge>Labels</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="badge-docs-content-rules" label="Badge label rules" headings={contentHeadings} rows={contentRules} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="badge-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="badge-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="badge-docs-accessibility" label="Badge accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, result, tone]) => [name, detail, <Badge tone={tone}>{result}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="badge-audit-title">
          <SectionCardTitle headingId="badge-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit badge-docs-audit" label="Badge audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity, tone]) => [name, where, wrapTokenPath(detail), <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
