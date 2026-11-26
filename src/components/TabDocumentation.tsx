import { useState } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { Tab } from './Tab'
import { TabButton } from './TabButton'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, anatomy, anatomyHeadings, audit, auditDescription, auditHeadings,
  contentHeadings, contentRules, context, contextHeadings, examples, guidelines, metrics, properties, propertyHeadings,
  tabDescription, tabSource, tokenDescription, tokenHeadings, tokens, variantDescription, variantHeadings, variants,
} from './tabDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import statesIcon from '../assets/design-system/button-states.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'

const sections = [
  ['Overview', 'tab-overview'], ['Anatomy', 'anatomy'], ['Variants', 'variants'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const anatomyOptions = examples[2].options.filter(({ label }) => label !== 'In Stock')
const variantRows = variants.map(({ name, label, countedLabel, value, use, isSelected }) => [
  name,
  <TabButton isStatic isSelected={isSelected}>{label}</TabButton>,
  <TabButton isStatic isSelected={isSelected} value={value}>{countedLabel}</TabButton>,
  use,
] as const)

function exportTabDocumentation() {
  exportDesignSystemCsv('coretech-tab.csv', [
    ['Metric', 'Value'], ...metrics,
    [], anatomyHeadings, ...anatomy,
    [], propertyHeadings, ...properties,
    [], variantHeadings, ...variants.map(({ name, label, countedLabel, value, use }) => [name, label, `${countedLabel} · ${value}`, use]),
    [], tokenHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentHeadings, ...contentRules,
    [], accessibilityHeadings, ...accessibility.map(([name, detail, status]) => [name, detail, status]),
    [], auditHeadings, ...audit.map(([name, where, detail, severity]) => [name, where, detail, severity]),
  ])
}

export function TabDocumentation() {
  const [selections, setSelections] = useState<readonly string[]>(examples.map(({ initial }) => initial))

  return <div className="app-shell docs-shell tab-documentation">
    <DesignSystemNavigation page="Tab" />
    <main aria-labelledby="tab-title">
      <TopNavigation variant="design-system" section="Components" page="Tab" />
      <div className="docs-content" id="tab-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Tab" headingId="tab-title" section="Components"
          description={tabDescription} sections={sections} onExport={exportTabDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="tab-overview-title">
          <SectionCardTitle headingId="tab-overview-title" icon={packageIcon} action={<Badge>Tab + Tab Button</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="tab-docs-preview">
              {examples.map(({ label, options }, index) => <Tab key={label} label={label} options={options} selected={selections[index]}
                onChangeSelection={selection => setSelections(current => current.map((value, group) => group === index ? selection : value))} />)}
            </div>
            <dl className="docs-metrics">
              {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{tabSource}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="tab-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="tab-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body tab-docs-anatomy">
            <div className="tab-docs-anatomy-stage" aria-hidden="true">
              <div className="tab-docs-anatomy-example">
                <Tab label="Tab anatomy">
                  {anatomyOptions.map(({ label, value }) => <TabButton key={label} isStatic isSelected={label === 'Out'} value={value}>{label}</TabButton>)}
                </Tab>
                {anatomy.map(([number]) => <span className="tab-docs-marker" key={number} data-part={number}>{number}</span>)}
              </div>
            </div>
            <DesignSystemTable className="tab-docs-parts" label="Tab anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([number, part, detail]) => [number, <strong>{part}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="tab-properties-title">
          <SectionCardTitle headingId="tab-properties-title" icon={gridIcon} action={<Badge>5 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="tab-docs-properties" label="Tab properties" headings={propertyHeadings} rows={properties} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="variants" aria-labelledby="tab-variants-title" tabIndex={-1}>
          <SectionCardTitle headingId="tab-variants-title" icon={statesIcon} action={<Badge>2 variants</Badge>}>Variants &amp; States</SectionCardTitle>
          <div className="docs-section-body">
            <p>{variantDescription}</p>
            <div className="tab-docs-variant-table">
              <DesignSystemTable className="tab-docs-variants" label="Tab Button variants" headings={variantHeadings} rows={variantRows} />
            </div>
            <ul className="tab-docs-variant-cards" role="list" aria-label="Tab Button variants">
              {variantRows.map(([name, ...values]) => <li key={name}>
                <h3>{name}</h3>
                <dl>{values.map((value, index) => <div key={variantHeadings[index + 1]}>
                  <dt>{variantHeadings[index + 1]}</dt><dd>{value}</dd>
                </div>)}</dl>
              </li>)}
            </ul>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="tab-tokens-title">
          <SectionCardTitle headingId="tab-tokens-title" icon={packageIcon} action={<Badge>Semantic only</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <p>{tokenDescription}</p>
            <DesignSystemTable className="tab-docs-tokens" label="Tab tokens" headings={tokenHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone="warning">{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="tab-context-title">
          <SectionCardTitle headingId="tab-context-title" icon={contextIcon} action={<Badge>3 groups</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="tab-docs-context" label="Tab use on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="tab-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="tab-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines tab-docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="tab-content-title">
          <SectionCardTitle headingId="tab-content-title" icon={contentIcon} action={<Badge>Labels</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="tab-docs-content-rules" label="Tab label rules" headings={contentHeadings} rows={contentRules} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="tab-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="tab-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="tab-docs-accessibility" label="Tab accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, status, tone]) => [name, detail, <Badge tone={tone}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="tab-audit-title">
          <SectionCardTitle headingId="tab-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit tab-docs-audit" label="Tab audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity, tone]) => [name, where, wrapTokenPath(detail), <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
