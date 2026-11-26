import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { OverviewCard } from './OverviewCard'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { DesignSystemTable } from './DesignSystemTable'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import {
  globalTypographyTokens, semanticTypographyTokens, typeScale, typographyAccessibility,
  typographyAudit, typographyContext, typographyGuidelines, typographyRoles, typographyWeights,
} from './typographyFoundationData'
import rolesIcon from '../assets/design-system/architecture.svg'
import contextIcon from '../assets/design-system/audit.svg'
import tokensIcon from '../assets/design-system/component.svg'
import scaleIcon from '../assets/design-system/data-visualization.svg'
import guidelinesIcon from '../assets/design-system/guidelines.svg'
import productsIcon from '../assets/design-system/page-status.svg'
import searchIcon from '../assets/design-system/search.svg'

const sections = [
  ['Overview', 'typeface'], ['Scale', 'type-scale'], ['Roles', 'roles'],
  ['Tokens', 'typography-tokens'], ['Accessibility', 'accessibility'],
] as const

const scaleHeadings = ['Style', 'Preview', 'Size / Line height', 'Weight', 'Used']
const semanticHeadings = ['Style', 'Font size', 'Line height', 'Weight']
const globalHeadings = ['Global token', 'Value', 'Used by']
const productStats = [['1,921', 'Available'], ['90', 'Out Stock'], ['180', 'Reserved']] as const

function previewStyle(path: string): CSSProperties {
  const token = `--semantic-typography-${path.toLowerCase().replaceAll('/', '-')}`
  return {
    fontSize: `calc(var(${token}-fontsize) * 1px)`,
    lineHeight: `calc(var(${token}-lineheight) * 1px)`,
    fontWeight: `var(${token}-weight)`,
  }
}

function exportTypography() {
  exportDesignSystemCsv('coretech-typography-tokens.csv', [
    scaleHeadings,
    ...typeScale.map(([style, , preview, size, leading, weight, uses]) => [style, preview, `${size} / ${leading} px`, weight, uses]),
    [],
    semanticHeadings,
    ...semanticTypographyTokens.map(({ style, metrics }) => [style, ...metrics.map(([path, alias, value]) => `${path} · ${alias} · ${value}`)]),
    [],
    globalHeadings,
    ...globalTypographyTokens,
  ])
}

export function TypographyFoundation() {
  return <div className="app-shell docs-shell typography-foundation">
    <DesignSystemNavigation page="Typography" />
    <main aria-labelledby="typography-title">
      <TopNavigation variant="design-system" section="Foundations" page="Typography" />
      <div className="docs-content">
        <DesignSystemPageHeader title="Typography" headingId="typography-title" sections={sections} onExport={exportTypography}
          description="Typography sets the rhythm of every CoreTech screen. The system uses one typeface — Roboto — in three weights and four sizes, organised into five roles: Display, Title, Label, Body and Caption. Every text layer must use a text style; each style is bound to typography tokens for family, size, line height and weight." />

        <SectionCard className="docs-section" id="typeface" aria-labelledby="typeface-title" tabIndex={-1}>
          <SectionCardTitle headingId="typeface-title" icon={searchIcon} action={<Badge>Roboto</Badge>}>Typeface</SectionCardTitle>
          <div className="docs-section-body typography-typeface">
            <article className="docs-example-card">
              <h3 className="card-title">Specimen</h3>
              <p className="typography-specimen" aria-hidden="true">Aa</p>
              <div className="typography-typeface-name">
                <span style={previewStyle('Title/MD')}>Roboto</span>
                <Badge tone="warning">Not tokenized · 64px specimen</Badge>
              </div>
              <p>Token: Fontname → type/family/roboto. A neutral, highly legible grotesque with compact numerals — well suited to dense data tables and metrics.</p>
            </article>
            <article className="docs-example-card">
              <h3 className="card-title">Weights</h3>
              <dl className="typography-weights">
                {Object.entries(typographyWeights).map(([value, { label, token }]) => <div key={token}>
                  <dt style={{ fontWeight: `var(--global-${token.replaceAll('/', '-')})` }}>{label} · {value}</dt>
                  <dd className="docs-muted">{wrapTokenPath(token)}</dd>
                </div>)}
              </dl>
              <p style={previewStyle('Label/MD/regular')}>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 · $ % + − / &amp;</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="type-scale" aria-labelledby="type-scale-title" tabIndex={-1}>
          <SectionCardTitle headingId="type-scale-title" icon={scaleIcon} action={<Badge>{typeScale.length} styles</Badge>}>Type Scale</SectionCardTitle>
          <div className="docs-section-body">
            <p>All 14 text styles, from largest to smallest. “Used” counts the text layers using each style on the Inventory Dashboard.</p>
            <DesignSystemTable className="typography-table typography-table--scale" label="Type Scale" headings={scaleHeadings}
              rows={typeScale.map(([style, path, preview, size, leading, weight, uses]) => [
                style, <span style={previewStyle(path)}>{preview}</span>, `${size} / ${leading} px`,
                `${typographyWeights[weight].label} · ${weight}`, uses > 0 ? uses : <Badge tone="warning">Unused</Badge>,
              ])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="roles" aria-labelledby="roles-title" tabIndex={-1}>
          <SectionCardTitle headingId="roles-title" icon={rolesIcon} action={<Badge>{typographyRoles.length} roles</Badge>}>Roles</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="typography-table typography-table--roles" label="Roles" headings={['Role', 'Styles', 'Use for', 'Example on the dashboard']}
              rows={typographyRoles.map(([role, styles, usage, example]) => [role, wrapTokenPath(styles), usage, example])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="in-context" aria-labelledby="in-context-title" tabIndex={-1}>
          <SectionCardTitle headingId="in-context-title" icon={contextIcon}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>How styles combine in a real component — the Total Products overview card from the Inventory Dashboard.</p>
            <div className="typography-context">
              <div className="typography-context-example">
                <OverviewCard title="Total Products" icon={productsIcon} badge="+3.8%" isPositive>
                  <div className="overview-card-body">
                    <div className="overview-reading"><strong>1,240</strong><span>Products</span></div>
                    <div className="overview-stats">{productStats.map(([value, label]) => <div className="overview-stat" key={label}>
                      <strong>{value}</strong><div>{label}</div>
                    </div>)}</div>
                  </div>
                </OverviewCard>
              </div>
              <DesignSystemTable className="typography-table typography-table--context" label="Typography in context" headings={['Element', 'Text', 'Style']}
                rows={typographyContext.map(([element, text, style]) => [element, text, wrapTokenPath(style)])} />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="typography-tokens" aria-labelledby="typography-tokens-title" tabIndex={-1}>
          <SectionCardTitle headingId="typography-tokens-title" icon={tokensIcon} action={<Badge>{typeScale.length * 3 + 1} tokens</Badge>}>Typography Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <p>Each text style is bound to four semantic tokens: the shared Fontname plus its own size, line height and weight. Semantic tokens alias a small global scale (type/size, type/leading, type/weight).</p>
            <DesignSystemTable className="typography-table typography-table--semantic" label="Semantic typography tokens" headings={semanticHeadings}
              rows={semanticTypographyTokens.map(({ style, metrics }) => [style, ...metrics.map(([path, alias, value]) =>
                <span className="typography-token" key={path}><strong>{wrapTokenPath(path)}</strong><span className="docs-muted">{wrapTokenPath(alias)} · {value}</span></span>,
              )])} />
            <DesignSystemTable className="typography-table typography-table--global" label="Global typography tokens" headings={globalHeadings} rows={globalTypographyTokens} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage-guidelines" aria-labelledby="usage-guidelines-title" tabIndex={-1}>
          <SectionCardTitle headingId="usage-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines typography-guidelines">
            {typographyGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="typography-table typography-table--accessibility" label="Typography accessibility" headings={['Guideline', 'Detail', 'Status']}
              rows={typographyAccessibility.map(([name, detail, status, tone]) => [name, detail, <Badge tone={tone}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="token-audit-notes" aria-labelledby="token-audit-notes-title" tabIndex={-1}>
          <SectionCardTitle headingId="token-audit-notes-title" icon={contextIcon} action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>Findings collected while documenting this page. Nothing has been changed in the styles or tokens — these are suggestions for the team to review.</p>
            <DesignSystemTable className="typography-table typography-table--audit docs-table--audit" label="Token Audit Notes" headings={['Finding', 'Tokens / Styles', 'Details', 'Severity']}
              rows={typographyAudit.map(([finding, tokens, details, severity, tone]) => [finding, wrapTokenPath(tokens), details, <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
