import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardProductExample } from './SectionCardProductExample'
import { SectionCardRestockExample } from './SectionCardRestockExample'
import { SectionCardTitle } from './SectionCardTitle'
import { ShelfCard, type Shelf } from './ShelfCard'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, audit, auditDescription, auditHeadings, cardAnatomy, cardAnatomyHeadings,
  composition, compositionDescription, compositionHeadings, content, contentHeadings, context, contextHeadings,
  description, guidelines, metrics, overviewNote, properties, propertiesHeadings, titleAnatomy, titleAnatomyHeadings,
  tokens, tokensHeadings, variantDescription, variants,
} from './sectionCardDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import variantsIcon from '../assets/design-system/button-states.svg'
import homeIcon from '../assets/design-system/layout-home.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'
import shelfIcon from '../assets/design-system/iconography/graphics-card.svg'

const sections = [
  ['Overview', 'section-card-overview'], ['Anatomy', 'anatomy'], ['Variants', 'variants'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const shelf: Shelf = {
  code: 'A1', name: 'Graphics Cards', description: 'NVIDIA / AMD Series',
  icon: shelfIcon, percentage: 25, available: '142', out: '90', reserved: '180',
}

const statusTones = {
  Required: 'warning', Guideline: 'info', Review: 'warning', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning',
} as const satisfies Record<string, BadgeTone>

function exportSectionCardDocumentation() {
  exportDesignSystemCsv('coretech-section-card.csv', [
    ['Metric', 'Value'], ...metrics.map(([value, label]) => [label, value]),
    [], cardAnatomyHeadings, ...cardAnatomy,
    [], titleAnatomyHeadings, ...titleAnatomy,
    [], propertiesHeadings, ...properties,
    [], ['State', 'Description'], ...variants,
    [], compositionHeadings, ...composition,
    [], tokensHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...content,
    [], accessibilityHeadings, ...accessibility,
    [], auditHeadings, ...audit,
  ])
}

export function SectionCardDocumentation() {
  return <div className="app-shell docs-shell section-card-documentation">
    <DesignSystemNavigation page="Section Card" />
    <main aria-labelledby="section-card-title">
      <TopNavigation variant="design-system" section="Components" page="Section Card" />
      <div className="docs-content" id="section-card-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Section Card" headingId="section-card-title" section="Components"
          description={description} sections={sections} onExport={exportSectionCardDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="section-card-overview-title">
          <SectionCardTitle headingId="section-card-overview-title" icon={packageIcon} action={<Badge>3 components</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="section-card-docs-preview">
              <SectionCardRestockExample />
              <div className="section-card-docs-preview-grid">
                <SectionCardProductExample headingId="section-card-total-products-title" />
                <ShelfCard shelf={shelf} headingId="section-card-shelf-title" />
              </div>
            </div>
            <dl className="docs-metrics">
              {metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p className="section-card-docs-overview-note">{overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="section-card-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="section-card-anatomy-title" icon={searchIcon} action={<Badge>6 parts</Badge>}>Anatomy · Section Card</SectionCardTitle>
          <div className="docs-section-body section-card-docs-card-anatomy">
            <div className="section-card-docs-stage section-card-docs-stage--card" aria-hidden="true" inert>
              <div className="section-card-docs-diagram">
                <SectionCardProductExample />
                {cardAnatomy.map(([part]) => <span className="section-card-docs-marker" data-part={part} key={part}>{part}</span>)}
              </div>
            </div>
            <DesignSystemTable className="section-card-docs-parts" label="Section Card anatomy" headings={cardAnatomyHeadings}
              rows={cardAnatomy.map(([part, name, detail]) => [part, <strong>{name}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-title-anatomy-title">
          <SectionCardTitle headingId="section-card-title-anatomy-title" icon={searchIcon} action={<Badge>4 parts</Badge>}>Anatomy · Section Card Title</SectionCardTitle>
          <div className="docs-section-body">
            <div className="section-card-docs-stage section-card-docs-stage--title" aria-hidden="true" inert>
              <div className="section-card-docs-diagram">
                <SectionCardRestockExample />
                {titleAnatomy.map(([part]) => <span className="section-card-docs-marker" data-part={part} key={part}>{part}</span>)}
              </div>
            </div>
            <DesignSystemTable className="section-card-docs-parts" label="Section Card Title anatomy" headings={titleAnatomyHeadings}
              rows={titleAnatomy.map(([part, name, detail]) => [part, <strong>{name}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-properties-title">
          <SectionCardTitle headingId="section-card-properties-title" icon={gridIcon} action={<Badge>3 components</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="section-card-docs-properties" label="Section Card properties"
              headings={propertiesHeadings} rows={properties} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="variants" aria-labelledby="section-card-variants-title" tabIndex={-1}>
          <SectionCardTitle headingId="section-card-variants-title" icon={variantsIcon} action={<Badge>Section Card Title</Badge>}>Variants</SectionCardTitle>
          <div className="docs-section-body">
            <p>{variantDescription}</p>
            {variants.map(([name, detail]) => <div className="section-card-docs-variant" key={name} data-state={name}>
              <div className="section-card-docs-variant-caption"><h3>{name}</h3><p>{detail}</p></div>
              <div className="section-card-docs-variant-example"><SectionCardTitle icon={homeIcon} headingLevel={3}>Warehouse Overview</SectionCardTitle></div>
            </div>)}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-composition-title">
          <SectionCardTitle headingId="section-card-composition-title" icon={gridIcon} action={<Badge>How parts combine</Badge>}>Composition</SectionCardTitle>
          <div className="docs-section-body">
            <p>{compositionDescription}</p>
            <DesignSystemTable className="section-card-docs-composition" label="Section Card composition" headings={compositionHeadings}
              rows={composition.map(([name, parts, example]) => [name, wrapTokenPath(parts), example])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-tokens-title">
          <SectionCardTitle headingId="section-card-tokens-title" icon={packageIcon} action={<Badge>Semantic only</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="section-card-docs-tokens" label="Section Card tokens" headings={tokensHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone={statusTones[token]}>{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-context-title">
          <SectionCardTitle headingId="section-card-context-title" icon={contextIcon} action={<Badge>32 instances</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="section-card-docs-context" label="Section Cards on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="section-card-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="section-card-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-content-title">
          <SectionCardTitle headingId="section-card-content-title" icon={contentIcon} action={<Badge>Titles</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="section-card-docs-content" label="Section Card title content" headings={contentHeadings} rows={content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="section-card-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="section-card-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="section-card-docs-accessibility" label="Section Card accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, status]) => [name, detail, <Badge tone={statusTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="section-card-audit-title">
          <SectionCardTitle headingId="section-card-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit section-card-docs-audit" label="Section Card audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity]) => [name, where, wrapTokenPath(detail), <Badge tone={statusTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
