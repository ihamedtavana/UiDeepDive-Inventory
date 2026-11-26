import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { ColorFoundationTable } from './ColorFoundationTable'
import { colorSections, type ColorCell } from './colorFoundationData'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import architectureIcon from '../assets/design-system/architecture.svg'
import paletteIcon from '../assets/design-system/palette.svg'
import searchIcon from '../assets/design-system/search.svg'
import surfaceIcon from '../assets/design-system/surface.svg'
import feedbackIcon from '../assets/design-system/feedback.svg'
import dataIcon from '../assets/design-system/data-visualization.svg'
import componentIcon from '../assets/design-system/component.svg'
import guidelinesIcon from '../assets/design-system/guidelines.svg'
import auditIcon from '../assets/design-system/audit.svg'

const sections = [
  ['Overview', 'color-architecture'],
  ['Palette', 'palette'],
  ['Semantic', 'text-icon'],
  ['Component', 'component-tokens'],
  ['Accessibility', 'accessibility'],
] as const

const architecture = [
  ['83', 'Global color tokens'],
  ['22', 'Brand & neutral tokens'],
  ['73', 'Semantic color tokens'],
  ['47', 'Component color tokens'],
]
const layers = [
  { title: '1 · Global', name: 'colors/orange/500', token: '--global-colors-orange-500', description: 'Raw palette values. Never applied directly to UI — they only feed semantic tokens.' },
  { title: '2 · Semantic', name: 'background/brand/primary/default', token: '--semantic-colors-background-brand-primary-default', description: 'Describes a purpose (text, icon, surface, border, feedback, data). The default choice for any custom UI.' },
  { title: '3 · Component', name: 'component/button/filled/primary/background/default', token: '--component-button-filled-primary-background-default', description: 'Binds a semantic purpose to one component and state. Use only inside that component.' },
]
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const ramps = [
  { name: 'Brand', values: ['#FFF1E9', '#FEDDCA', '#FDC3A1', '#FCA775', '#FB8C4B', '#FA7324', '#D5621F', '#B2521A', '#8F4215', '#703410', '#57280C'] },
  { name: 'Neutral', values: ['#FAFAFA', '#F5F5F5', '#EBEBEB', '#D4D4D4', '#A3A3A3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0A0A0A'] },
]
const guidelines = [
  ['Use semantic tokens such as text/primary/default in product UI.', 'Pick a global value such as colors/neutral/900 or a raw hex because it “looks right”.'],
  ['Reserve brand orange for the primary action, active navigation and the data series that matters most.', 'Use brand orange for errors or warnings — feedback has its own scale.'],
  ['Pair a status color with a label or icon, like the status dot + text used in the sidebar.', 'Rely on color alone to communicate status.'],
]
const sectionIcons: Record<string, string> = {
  'text-icon': searchIcon,
  'surface-background': surfaceIcon,
  border: architectureIcon,
  feedback: feedbackIcon,
  'data-visualization': dataIcon,
  'component-tokens': componentIcon,
  accessibility: searchIcon,
  'audit-notes': auditIcon,
}

export function ColorFoundation() {
  const [semanticSections, otherSections] = [colorSections.slice(0, 6), colorSections.slice(6)]

  return <div className="app-shell docs-shell">
    <DesignSystemNavigation />
    <main aria-labelledby="color-title">
      <TopNavigation variant="design-system" section="Foundations" page="Color" />
      <div className="docs-content">
        <DesignSystemPageHeader title="Color" headingId="color-title" sections={sections} onExport={exportColorDocumentation}
          description="Color in CoreTech communicates hierarchy, state and brand. Every color is delivered as a token in three layers: Global tokens hold the raw palette, Semantic tokens describe a purpose (text, icon, surface, border, feedback, data), and Component tokens bind those purposes to a specific component. Always reach for the most specific token available — never a raw hex value." />
        <SectionCard className="docs-section" id="color-architecture" aria-labelledby="color-architecture-title" tabIndex={-1}>
          <SectionCardTitle headingId="color-architecture-title" icon={architectureIcon} action={<Badge>3 layers</Badge>}>Color Architecture</SectionCardTitle>
          <div className="docs-section-body">
            <dl className="docs-metrics">
              {architecture.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <div className="docs-layers">
              {layers.map(({ title, name, token, description }) => <article className="docs-example-card" key={title}>
                <h3 className="card-title">{title}</h3>
                <div className="docs-layer-sample">
                  <span className="docs-swatch" aria-hidden="true" style={{ '--swatch-color': `var(${token})` } as CSSProperties} />
                  <div><strong>{wrapTokenPath(name)}</strong><span className="docs-muted">#FA7324</span></div>
                </div>
                <p>{description}</p>
              </article>)}
            </div>
          </div>
        </SectionCard>
        <SectionCard className="docs-section" id="palette" aria-labelledby="palette-title" tabIndex={-1}>
          <SectionCardTitle headingId="palette-title" icon={paletteIcon} action={<Badge>Global</Badge>}>Palette</SectionCardTitle>
          <div className="docs-section-body">
            <p>Brand and neutral ramps are the raw material of the system. They are documented for reference only — in product UI always use the semantic token that points to these values.</p>
            {ramps.map(({ name, values }) => {
              const family = name.toLowerCase()
              return <article className="docs-example-card" key={name}>
                <h3 className="card-title">{name} ramp</h3>
                <ul className="docs-ramp">
                  {steps.map((step, index) => <li key={step}>
                    <span className="docs-swatch" aria-hidden="true" style={{ '--swatch-color': `var(--${family}-${family}-${step})` } as CSSProperties} />
                    <strong>{step}</strong><span className="docs-muted">{values[index]}</span>
                  </li>)}
                </ul>
                <p className="docs-muted">Collection: {name} Tokens · e.g. {family}/50</p>
              </article>
            })}
          </div>
        </SectionCard>
        {semanticSections.map(renderColorSection)}
        <SectionCard className="docs-section" aria-labelledby="usage-guidelines-title">
          <SectionCardTitle headingId="usage-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>
        {otherSections.map(renderColorSection)}
      </div>
    </main>
  </div>
}

function renderColorSection({ id, title, label, description, tables }: (typeof colorSections)[number]) {
  return <SectionCard className="docs-section" id={id} aria-labelledby={`${id}-title`} tabIndex={-1} key={id}>
    <SectionCardTitle headingId={`${id}-title`} icon={sectionIcons[id]} action={<Badge>{label}</Badge>}>{title}</SectionCardTitle>
    <div className="docs-section-body">
      {description && <p>{description}</p>}
      {tables.map(table => <ColorFoundationTable key={table.layout} table={table} label={title} />)}
    </div>
  </SectionCard>
}

function exportColorDocumentation() {
  const serializeCell = (cell: ColorCell): string => {
    if (typeof cell === 'string') return cell
    if (cell.kind === 'badge') return [cell.context, cell.label].filter(Boolean).join(' · ')
    if (cell.kind === 'preview') return `${cell.foreground} on ${cell.background}`
    return cell.items.map(([token, label]) => label ? `${token} (${label})` : token).join(' · ')
  }
  const rows = [
    ['Palette', 'Token', 'Value'],
    ...ramps.flatMap(({ name, values }) => steps.map((step, index) => [name, `${name.toLowerCase()}/${step}`, values[index]])),
    ...colorSections.flatMap(({ title, tables }) => tables.flatMap(table => [
      [],
      [title],
      table.headings,
      ...table.rows.map(row => row.map(serializeCell)),
    ])),
  ]
  exportDesignSystemCsv('coretech-color-tokens.csv', rows)
}
