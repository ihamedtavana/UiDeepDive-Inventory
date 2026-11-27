import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { PercentageContainer } from './PercentageContainer'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { ShelfCard, type Shelf } from './ShelfCard'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, anatomy, anatomyHeadings, audit, auditHeadings, auditNote,
  content, contentHeadings, context, contextHeadings, contextNote, description, guidelines, metrics,
  overviewNote, percentages, properties, propertiesHeadings, tokens, tokensHeadings, variantsHeadings, variantsNote,
} from './progressBarDocumentationData'
import auditIcon from '../assets/design-system/audit.svg'
import chartIcon from '../assets/design-system/data-visualization.svg'
import checkIcon from '../assets/design-system/guidelines.svg'
import contentIcon from '../assets/design-system/pagination-content.svg'
import graphicsCardIcon from '../assets/design-system/iconography/graphics-card.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import variantsIcon from '../assets/design-system/pagination-states.svg'

const sections = [
  ['Overview', 'progress-overview'], ['Anatomy', 'anatomy'], ['Variants', 'variants'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const shelf: Shelf = {
  code: 'A1', name: 'Graphics Cards', description: 'NVIDIA / AMD Series', icon: graphicsCardIcon,
  percentage: 25, available: '142', out: '90', reserved: '180',
}

const tones = {
  Matches: 'success', 'Hand-adjusted': 'warning', Required: 'warning', Review: 'warning',
  Pass: 'success', Fail: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} as const satisfies Record<string, BadgeTone>

function exportProgressBarDocumentation() {
  exportDesignSystemCsv('coretech-progress-bar.csv', [
    ['Metric', 'Value'], ...metrics.map(([value, label]) => [label, value]),
    [], anatomyHeadings, ...anatomy,
    [], propertiesHeadings, ...properties,
    [], variantsHeadings, ...percentages.map(percentage => [`${percentage}%`, `${percentage}%`, `${percentage}%`]),
    [], tokensHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...content,
    [], accessibilityHeadings, ...accessibility,
    [], auditHeadings, ...audit,
  ])
}

export function ProgressBarDocumentation() {
  return <div className="app-shell docs-shell progress-bar-documentation">
    <DesignSystemNavigation page="Progress Bar" />
    <main aria-labelledby="progress-bar-title">
      <TopNavigation variant="design-system" section="Components" page="Progress Bar" />
      <div className="docs-content" id="progress-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Progress Bar" headingId="progress-bar-title" section="Components"
          status="In progress" description={description} sections={sections} onExport={exportProgressBarDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="progress-overview-title">
          <SectionCardTitle headingId="progress-overview-title" icon={chartIcon} action={<Badge>Percentage Container</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="progress-docs-stage progress-docs-overview">
              <div className="summary-capacity">
                <div><strong>75%</strong><span>Capacity Used</span></div>
                <PercentageContainer percentage={75} />
              </div>
              <ShelfCard shelf={shelf} headingId="progress-shelf-title" />
            </div>
            <dl className="docs-metrics">
              {metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="progress-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="progress-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <div className="progress-docs-anatomy">
              <div className="progress-docs-stage progress-docs-anatomy-stage" aria-hidden="true">
                <div className="progress-docs-diagram">
                  <PercentageContainer percentage={75} />
                  {anatomy.map(([number]) => <span className={`progress-docs-marker progress-docs-marker--${number}`} key={number}>{number}</span>)}
                </div>
              </div>
              <DesignSystemTable className="progress-docs-parts" label="Progress Bar anatomy" headings={anatomyHeadings}
                rows={anatomy.map(([number, part, detail]) => [number, part, wrapTokenPath(detail)])} rowHeadingColumn={1} />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="progress-properties-title">
          <SectionCardTitle headingId="progress-properties-title" icon={gridIcon} action={<Badge>3 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="progress-docs-properties" label="Progress Bar properties" headings={propertiesHeadings}
              rows={properties} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="variants" aria-labelledby="progress-variants-title" tabIndex={-1}>
          <SectionCardTitle headingId="progress-variants-title" icon={variantsIcon} action={<Badge>10 variants</Badge>}>Variants</SectionCardTitle>
          <div className="docs-section-body">
            <p>{variantsNote}</p>
            <DesignSystemTable className="progress-docs-variants" label="Progress Bar variants" headings={variantsHeadings}
              rows={percentages.map(percentage => [
                `${percentage}%`,
                <PercentageContainer percentage={percentage} size="small" label="SM example" />,
                <PercentageContainer percentage={percentage} size="medium" label="MD example" />,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="progress-tokens-title">
          <SectionCardTitle headingId="progress-tokens-title" icon={packageIcon} action={<Badge>Data visualization</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="progress-docs-tokens" label="Progress Bar tokens" headings={tokensHeadings}
              rows={tokens.map(([part, token, value]) => [
                part, token === 'Not tokenized' ? <Badge tone={tones[token]}>{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="progress-context-title">
          <SectionCardTitle headingId="progress-context-title" icon={auditIcon} action={<Badge>10 bars</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{contextNote}</p>
            <DesignSystemTable className="progress-docs-context" label="Progress Bar in context" headings={contextHeadings}
              rows={context.map(([where, label, variant, active, status]) => [
                where, <strong>{label}</strong>, variant, active, <Badge tone={tones[status]}>{status}</Badge>,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="progress-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="progress-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="progress-content-title">
          <SectionCardTitle headingId="progress-content-title" icon={contentIcon} action={<Badge>Labels</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="progress-docs-content" label="Progress Bar content" headings={contentHeadings} rows={content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="progress-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="progress-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="progress-docs-accessibility" label="Progress Bar accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={tones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="progress-audit-title">
          <SectionCardTitle headingId="progress-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditNote}</p>
            <DesignSystemTable className="docs-table--audit progress-docs-audit" label="Progress Bar audit notes" headings={auditHeadings}
              rows={audit.map(([finding, where, detail, severity]) => [
                finding, wrapTokenPath(where), detail, <Badge tone={tones[severity]}>{severity}</Badge>,
              ])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
