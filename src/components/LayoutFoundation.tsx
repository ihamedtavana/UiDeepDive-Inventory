import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { LayoutAnatomyDiagram } from './LayoutAnatomyDiagram'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { Sidebar } from './Sidebar'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import {
  layoutAccessibility, layoutAnatomy, layoutAudit, layoutDescription, layoutGrids,
  layoutGuidelines, layoutSidebar, layoutTokens,
} from './layoutFoundationData'
import { wrapTokenPath } from './wrapTokenPath'
import anatomyIcon from '../assets/design-system/layout-home.svg'
import tokensIcon from '../assets/design-system/layout-package.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import sidebarIcon from '../assets/design-system/layout-sidebar.svg'
import guidelinesIcon from '../assets/design-system/layout-check.svg'
import searchIcon from '../assets/design-system/search.svg'
import auditIcon from '../assets/design-system/audit.svg'

const sections = [
  ['Overview', 'layout-overview'], ['Anatomy', 'anatomy'], ['Grid', 'grid'],
  ['Sidebar', 'sidebar'], ['Accessibility', 'accessibility'],
] as const

const anatomyHeadings = ['Element', 'Value', 'Token', 'Notes']
const tokenHeadings = ['Token', 'Value', 'Visual', 'Use for', 'Applied on the dashboard']
const sidebarHeadings = ['Region', 'Content', 'Spacing']
const accessibilityTones = { Missing: 'warning', Guideline: 'info', Review: 'warning' } as const
const auditTones = { Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const
const gridClasses = ['layout-grid--4', 'layout-grid--3', 'layout-grid--split', '']

function exportLayout() {
  exportDesignSystemCsv('coretech-layout-tokens.csv', [
    anatomyHeadings, ...layoutAnatomy,
    [], ['Token', 'Value', 'Use for', 'Applied on the dashboard'],
    ...layoutTokens.map(([name, value, use, applied]) => [name, value, use, applied]),
    [], ['Pattern', 'Dimensions', 'Use for'], ...layoutGrids.map(([name, dimensions, use]) => [name, dimensions, use]),
    [], sidebarHeadings, ...layoutSidebar,
  ])
}

export function LayoutFoundation() {
  return <div className="app-shell docs-shell layout-foundation">
    <DesignSystemNavigation page="Layout" />
    <main aria-labelledby="layout-title">
      <TopNavigation variant="design-system" section="Foundations" page="Layout" />
      <div className="docs-content" id="layout-overview">
        <DesignSystemPageHeader title="Layout" headingId="layout-title" description={layoutDescription}
          sections={sections} onExport={exportLayout} />

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="layout-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="layout-anatomy-title" icon={anatomyIcon} action={<Badge>1440 desktop</Badge>}>Page Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <p>A schematic of the Inventory Dashboard shell (not to scale). Gutters and gaps in the schematic are bound to the real Layout tokens.</p>
            <LayoutAnatomyDiagram />
            <DesignSystemTable className="layout-table layout-table--anatomy" label="Page anatomy" headings={anatomyHeadings}
              rows={layoutAnatomy.map(([name, value, token, notes]) => [
                name, value, token === 'Not tokenized' ? <Badge tone="warning">{token}</Badge> : wrapTokenPath(token), wrapTokenPath(notes),
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="layout-tokens-title">
          <SectionCardTitle headingId="layout-tokens-title" icon={tokensIcon} action={<Badge>3 tokens</Badge>}>Layout Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="layout-table layout-table--tokens" label="Layout tokens" headings={tokenHeadings}
              rows={layoutTokens.map(([name, value, use, applied, token]) => [
                name, value, <span className="layout-token-sample" style={{ '--layout-sample-width': `calc(var(${token}) * 1px)` } as CSSProperties} aria-hidden="true" />,
                use, wrapTokenPath(applied),
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="grid" aria-labelledby="layout-grid-title" tabIndex={-1}>
          <SectionCardTitle headingId="layout-grid-title" icon={gridIcon} action={<Badge>4 patterns</Badge>}>Grid Patterns</SectionCardTitle>
          <div className="docs-section-body">
            <p>There is no column grid style in the file; grids are built with auto layout rows. Four patterns cover the dashboard. All gutters below are bound to Layout/Grid-Gap.</p>
            {layoutGrids.map(([name, dimensions, use, columns], index) => <div className="layout-grid-example" key={name}>
              <div className="layout-grid-label">
                <h3>{name}</h3><p className="docs-muted">{dimensions}</p><p>{use}</p>
              </div>
              <div className={`layout-grid ${gridClasses[index]}`} aria-hidden="true">
                {columns.map(column => <span className="layout-block layout-block--short" key={column}>{column}</span>)}
              </div>
            </div>)}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="sidebar" aria-labelledby="layout-sidebar-title" tabIndex={-1}>
          <SectionCardTitle headingId="layout-sidebar-title" icon={sidebarIcon} action={<Badge>248 px fixed</Badge>}>Sidebar</SectionCardTitle>
          <div className="docs-section-body">
            <p>The sidebar is a fixed-width vertical stack (Padding/SM, Gap/LG). Groups are separated by “Sidebar - Border Spacing” dividers. Shown below: the sidebar from the Inventory Dashboard.</p>
            <div className="layout-sidebar-example">
              <div className="layout-sidebar-stage" role="img" aria-label="Expanded Inventory Dashboard sidebar for New York Central, with warehouse context, navigation, shelves and 75% capacity used.">
                <div inert><Sidebar selectedWarehouse="New York Central" deliveries={[]} onSelectWarehouse={() => {}} isPreview /></div>
              </div>
              <DesignSystemTable className="layout-table layout-table--sidebar" label="Sidebar regions" headings={sidebarHeadings}
                rows={layoutSidebar.map(([region, content, spacing]) => [region, content, wrapTokenPath(spacing)])} />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="layout-guidelines-title">
          <SectionCardTitle headingId="layout-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines layout-guidelines">
            {layoutGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="layout-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="layout-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="layout-table layout-table--accessibility" label="Layout accessibility" headings={['Guideline', 'Detail', 'Status']}
              rows={layoutAccessibility.map(([guideline, detail, status]) => [guideline, detail, <Badge tone={accessibilityTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="layout-audit-title">
          <SectionCardTitle headingId="layout-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>Findings collected while documenting this page. Nothing has been changed in the design — these are suggestions for the team to review.</p>
            <DesignSystemTable className="layout-table layout-table--audit docs-table--audit" label="Layout token audit notes" headings={['Finding', 'Where', 'Details', 'Severity']}
              rows={layoutAudit.map(([finding, where, details, severity]) => [finding, wrapTokenPath(where), wrapTokenPath(details), <Badge tone={auditTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
