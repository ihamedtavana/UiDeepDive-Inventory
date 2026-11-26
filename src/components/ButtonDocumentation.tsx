import { Badge } from './Badge'
import { Button } from './Button'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, anatomy, audit, auditDescription, buttonDescription, contentRules, context, contextDescription,
  guidelines, metrics, overviewSource, properties, stateHeadings, statesDescription, tokens, tokensDescription,
  variantHeadings, variantsDescription,
} from './buttonDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import search from '../assets/design-system/search.svg'
import grid from '../assets/design-system/layout-grid.svg'
import statesIcon from '../assets/design-system/button-states.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import chevron from '../assets/design-system/button-anatomy-chevron.svg'
import check from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'
import plus from '../assets/design-system/iconography/plus.svg'
import exportIcon from '../assets/design-system/export.svg'
import bell from '../assets/iconBell.svg'
import dots from '../assets/design-system/iconography/dots-horizontal.svg'

const sections = [
  ['Overview', 'button-overview'], ['Variants', 'variants'], ['States', 'states'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const matrixRows = [
  ['Primary · Filled', 'primary', 'filled'],
  ['Secondary · Filled', 'secondary', 'filled'],
  ['Primary · Ghost', 'primary', 'ghost'],
  ['Secondary · Ghost', 'secondary', 'ghost'],
] as const
const sizes = [['small', false], ['medium', false], ['small', true], ['medium', true]] as const
const previewStates = ['default', 'hover', 'pressed', 'focused', 'disabled'] as const
const anatomyHeadings = ['#', 'Part', 'Details']
const propertyHeadings = ['Property', 'Type', 'Values', 'Default']
const tokenHeadings = ['Part', 'Token', 'Value']
const contextHeadings = ['Variant', 'Example', 'Count']
const contentHeadings = ['Rule', 'Detail', 'Example']
const accessibilityHeadings = ['Check', 'Detail', 'Status']
const auditHeadings = ['Finding', 'Where', 'Details', 'Severity']

function exportButtonDocumentation() {
  exportDesignSystemCsv('coretech-button.csv', [
    ['Metric', 'Value'], ...metrics,
    [], anatomyHeadings, ...anatomy,
    [], propertyHeadings, ...properties,
    [], variantHeadings, ...matrixRows.map(([name]) => [name, '32 px', '40 px', '32 px', '40 px']),
    [], stateHeadings, ...matrixRows.map(([name]) => [name, ...stateHeadings.slice(1)]),
    [], tokenHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don’t"], ...guidelines,
    [], contentHeadings, ...contentRules,
    [], accessibilityHeadings, ...accessibility.map(([name, detail, status]) => [name, detail, status]),
    [], auditHeadings, ...audit.map(([name, where, detail, severity]) => [name, where, detail, severity]),
  ])
}

export function ButtonDocumentation() {
  return <div className="app-shell docs-shell button-documentation">
    <DesignSystemNavigation page="Button" />
    <main aria-labelledby="button-title">
      <TopNavigation variant="design-system" section="Components" page="Button" />
      <div className="docs-content" id="button-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Button" headingId="button-title" section="Components"
          description={buttonDescription} sections={sections} onExport={exportButtonDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="button-overview-title">
          <SectionCardTitle headingId="button-overview-title" icon={packageIcon} isIconTinted action={<Badge>Button set</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="button-docs-preview" role="group" aria-label="Interactive button examples">
              <Button hierarchy="primary"><img src={plus} alt="" />New Movement</Button>
              <Button onClick={exportButtonDocumentation}><img src={exportIcon} alt="" />Export</Button>
              <Button hierarchy="primary" appearance="ghost">Show All</Button>
              <Button appearance="ghost">View log</Button>
              <Button isIconOnly aria-label="Notifications" title="Notifications"><img src={bell} alt="" /></Button>
              <Button isIconOnly appearance="ghost" aria-label="More actions" title="More actions"><img src={dots} alt="" /></Button>
            </div>
            <dl className="docs-metrics">
              {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{overviewSource}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-anatomy-title">
          <SectionCardTitle headingId="button-anatomy-title" icon={search} isIconTinted action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body button-docs-anatomy">
            <div className="button-docs-anatomy-stage" aria-hidden="true" inert>
              <div className="button-docs-anatomy-example">
                <Button hierarchy="primary" size="medium" data-button-preview="focused">
                  <img src={plus} alt="" />Button<img src={chevron} alt="" />
                </Button>
                {anatomy.map(([number]) => <span className="button-docs-marker" key={number} data-part={number}>{number}</span>)}
              </div>
            </div>
            <DesignSystemTable className="button-docs-parts" label="Button anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([number, part, detail]) => [number, <strong>{part}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-properties-title">
          <SectionCardTitle headingId="button-properties-title" icon={grid} isIconTinted action={<Badge>11 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="button-docs-properties" label="Button properties" headings={propertyHeadings} rows={properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="variants" aria-labelledby="button-variants-title" tabIndex={-1}>
          <SectionCardTitle headingId="button-variants-title" icon={grid} isIconTinted action={<Badge>Type × Hierarchy × Appearance × Size</Badge>}>Variants</SectionCardTitle>
          <div className="docs-section-body">
            <p>{variantsDescription}</p>
            <DesignSystemTable className="docs-table--matrix docs-table--button button-docs-variants" label="Button variants" headings={variantHeadings}
              rows={matrixRows.map(([name, hierarchy, appearance]) => [
                name, ...sizes.map(([size, isIconOnly], column) =>
                  <Button key={variantHeadings[column + 1]} hierarchy={hierarchy} appearance={appearance} size={size}
                    isIconOnly={isIconOnly} inert aria-hidden="true">
                    <img src={plus} alt="" />{!isIconOnly && 'Button'}
                  </Button>,
                ),
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="states" aria-labelledby="button-states-title" tabIndex={-1}>
          <SectionCardTitle headingId="button-states-title" icon={statesIcon} isIconTinted action={<Badge>5 states</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <p>{statesDescription}</p>
            <DesignSystemTable className="docs-table--matrix docs-table--button button-docs-states" label="Button states" headings={stateHeadings}
              rows={matrixRows.map(([name, hierarchy, appearance]) => [
                name, ...previewStates.map(state =>
                  <Button key={state} hierarchy={hierarchy} appearance={appearance} data-button-preview={state}
                    disabled={state === 'disabled'} inert aria-hidden="true">Button</Button>,
                ),
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-tokens-title">
          <SectionCardTitle headingId="button-tokens-title" icon={packageIcon} isIconTinted action={<Badge>Component + semantic</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <p>{tokensDescription}</p>
            <DesignSystemTable className="button-docs-tokens" label="Button tokens" headings={tokenHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone="warning">{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-context-title">
          <SectionCardTitle headingId="button-context-title" icon={contextIcon} isIconTinted action={<Badge>39 instances</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{contextDescription}</p>
            <DesignSystemTable className="button-docs-context" label="Button use on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="button-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="button-usage-title" icon={check} isIconTinted>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-content-title">
          <SectionCardTitle headingId="button-content-title" icon={contentIcon} isIconTinted action={<Badge>Labels</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="button-docs-content-rules" label="Button label rules" headings={contentHeadings} rows={contentRules} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="button-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="button-accessibility-title" icon={search} isIconTinted action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="button-docs-accessibility" label="Button accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, status, tone]) => [name, wrapTokenPath(detail), <Badge tone={tone}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="button-audit-title">
          <SectionCardTitle headingId="button-audit-title" icon={contextIcon} isIconTinted action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit button-docs-audit" label="Button audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity, tone]) => [name, where, wrapTokenPath(detail), <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
