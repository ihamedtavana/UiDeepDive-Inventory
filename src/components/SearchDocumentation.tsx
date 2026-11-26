import { useRef } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { Search } from './Search'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  accessibility, accessibilityHeadings, anatomy, anatomyHeadings, audit, auditDescription, auditHeadings,
  contentRules, contentRulesHeadings, context, contextHeadings, guidelines, metrics, properties, propertiesHeadings,
  searchDescription, searchSource, tokens, tokensHeadings, variants, variantsHeadings,
} from './searchDocumentationData'
import fieldIcon from '../assets/design-system/search-small.svg'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import variantsIcon from '../assets/design-system/layout-sidebar.svg'
import contextIcon from '../assets/design-system/button-context.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'

const sections = [
  ['Overview', 'search-overview'], ['Anatomy', 'anatomy'], ['Variants', 'variants'],
  ['Usage', 'usage'], ['Accessibility', 'accessibility'],
] as const

const variantRows = variants.map(([name, preview, use]) => [
  name,
  <div className="search-docs-sample">
    <div inert aria-hidden="true"><Search icon={fieldIcon} isCollapsed={name === 'Collapsed'} /></div>
    <span className="visually-hidden">{preview}</span>
  </div>,
  use,
] as const)

function exportSearchDocumentation() {
  exportDesignSystemCsv('coretech-search.csv', [
    ['Metric', 'Value'], ...metrics,
    [], anatomyHeadings, ...anatomy,
    [], propertiesHeadings, ...properties,
    [], variantsHeadings, ...variants,
    [], tokensHeadings, ...tokens,
    [], contextHeadings, ...context,
    [], ['Do', "Don't"], ...guidelines,
    [], contentRulesHeadings, ...contentRules,
    [], accessibilityHeadings, ...accessibility.map(([name, detail, status]) => [name, detail, status]),
    [], auditHeadings, ...audit.map(([name, where, detail, severity]) => [name, where, detail, severity]),
  ])
}

export function SearchDocumentation() {
  const expandedSearch = useRef<HTMLInputElement>(null)

  return <div className="app-shell docs-shell search-documentation">
    <DesignSystemNavigation page="Search" />
    <main aria-labelledby="search-title">
      <TopNavigation variant="design-system" section="Components" page="Search" />
      <div className="docs-content" id="search-overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Search" headingId="search-title" section="Components"
          description={searchDescription} sections={sections} onExport={exportSearchDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="search-overview-title">
          <SectionCardTitle headingId="search-overview-title" icon={packageIcon} action={<Badge>Search</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="search-docs-preview">
              <Search icon={fieldIcon} inputRef={expandedSearch} />
              <Search icon={fieldIcon} aria-label="Search products" placeholder="Search products…" hasShortcut={false} />
              <Search icon={fieldIcon} isCollapsed aria-label="Focus the expanded search example"
                onExpand={() => expandedSearch.current?.focus()} />
            </div>
            <dl className="docs-metrics">
              {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{searchSource}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="search-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="search-anatomy-title" icon={searchIcon} action={<Badge>4 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body search-docs-anatomy">
            <div className="search-docs-anatomy-stage" inert aria-hidden="true">
              <div className="search-docs-anatomy-example">
                <Search icon={fieldIcon} />
                {anatomy.map(([number]) => <span className="search-docs-marker" key={number} data-part={number}>{number}</span>)}
              </div>
            </div>
            <DesignSystemTable className="search-docs-parts" label="Search anatomy" headings={anatomyHeadings}
              rows={anatomy.map(([number, part, detail]) => [number, <strong>{part}</strong>, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="search-properties-title">
          <SectionCardTitle headingId="search-properties-title" icon={gridIcon} action={<Badge>5 properties</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-properties" label="Search properties" headings={propertiesHeadings} rows={properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="variants" aria-labelledby="search-variants-title" tabIndex={-1}>
          <SectionCardTitle headingId="search-variants-title" icon={variantsIcon} action={<Badge>2 variants</Badge>}>Variants</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-variants" label="Search variants" headings={variantsHeadings} rows={variantRows} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="search-tokens-title">
          <SectionCardTitle headingId="search-tokens-title" icon={packageIcon} action={<Badge>Semantic only</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-tokens" label="Search tokens" headings={tokensHeadings}
              rows={tokens.map(([part, token, value]) => [part, token === 'Not tokenized'
                ? <Badge tone="warning">{token}</Badge> : <strong>{wrapTokenPath(token)}</strong>, value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="search-context-title">
          <SectionCardTitle headingId="search-context-title" icon={contextIcon} action={<Badge>2 instances</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-context" label="Search use on the dashboard" headings={contextHeadings} rows={context} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="search-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="search-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="search-content-title">
          <SectionCardTitle headingId="search-content-title" icon={contentIcon} action={<Badge>Placeholder</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-content-rules" label="Search placeholder rules" headings={contentRulesHeadings} rows={contentRules} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="search-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="search-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="search-docs-accessibility" label="Search accessibility" headings={accessibilityHeadings}
              rows={accessibility.map(([name, detail, status, tone]) => [name, wrapTokenPath(detail), <Badge tone={tone}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="search-audit-title">
          <SectionCardTitle headingId="search-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{auditDescription}</p>
            <DesignSystemTable className="docs-table--audit search-docs-audit" label="Search audit notes" headings={auditHeadings}
              rows={audit.map(([name, where, detail, severity, tone]) => [name, where, wrapTokenPath(detail), <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
