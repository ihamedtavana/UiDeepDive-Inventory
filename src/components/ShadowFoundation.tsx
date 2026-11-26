import { Badge } from './Badge'
import { Button } from './Button'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { SidebarMenuButton } from './SidebarMenuButton'
import { Tab } from './Tab'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import {
  shadowAccessibility, shadowAudit, shadowDepth, shadowDescription, shadowGuidelines, shadowMetrics,
  shadowProperties, shadowScale,
} from './shadowFoundationData'
import { wrapTokenPath } from './wrapTokenPath'
import modelIcon from '../assets/design-system/surface.svg'
import effectIcon from '../assets/design-system/component.svg'
import scaleIcon from '../assets/design-system/data-visualization.svg'
import depthIcon from '../assets/design-system/architecture.svg'
import guidelinesIcon from '../assets/design-system/guidelines.svg'
import searchIcon from '../assets/design-system/search.svg'
import auditIcon from '../assets/design-system/audit.svg'
import activeItemIcon from '../assets/design-system/shadow-package-active.svg'
import exportIcon from '../assets/design-system/export.svg'

const sections = [
  ['Overview', 'shadow-overview'], ['Shadow/xs', 'shadow-xs'], ['Scale', 'shadow-scale'],
  ['Depth', 'shadow-depth'], ['Accessibility', 'accessibility'],
] as const

const propertyHeadings = ['Property', 'Semantic token', 'Global token', 'Value']
const depthHeadings = ['Layer', 'Surface', 'Border', 'Shadow']
const accessibilityTones = { Guideline: 'info', Review: 'warning' } as const
const auditTones = { Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const

function exportShadow() {
  exportDesignSystemCsv('coretech-shadow-tokens.csv', [
    propertyHeadings, ...shadowProperties,
    [], ['Global shadow level', 'Preview details'], ...shadowScale.map(({ name, detail }) => [`shadow/${name}`, detail]),
    [], depthHeadings, ...shadowDepth,
  ])
}

function shadowLayer(token: string, layer = '') {
  return ['offsetx', 'offsety', 'radius', 'spread'].map(part => `calc(var(${token}-${part}${layer}) * 1px)`)
    .concat(`var(${token}-color${layer})`).join(' ')
}

export function ShadowFoundation() {
  return <div className="app-shell docs-shell shadow-foundation">
    <DesignSystemNavigation page="Shadow" />
    <main aria-labelledby="shadow-title">
      <TopNavigation variant="design-system" section="Foundations" page="Shadow" />
      <div className="docs-content" id="shadow-overview">
        <DesignSystemPageHeader title="Shadow" headingId="shadow-title" description={shadowDescription}
          sections={sections} onExport={exportShadow} />

        <SectionCard className="docs-section" aria-labelledby="shadow-model-title">
          <SectionCardTitle headingId="shadow-model-title" icon={modelIcon} action={<Badge>Flat system</Badge>}>Elevation Model</SectionCardTitle>
          <div className="docs-section-body">
            <dl className="docs-metrics">
              {shadowMetrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>Elevation has two layers. Global shadow tokens (shadow/none → shadow/2xl, inner) hold a full Tailwind-style scale. Only one level is exposed to product UI: the Semantic Elevation tokens xs/* feed the Shadow/xs effect style, which is the only shadow designers should apply.</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="shadow-xs" aria-labelledby="shadow-xs-title" tabIndex={-1}>
          <SectionCardTitle headingId="shadow-xs-title" icon={effectIcon} action={<Badge>Effect style</Badge>}>Shadow/xs</SectionCardTitle>
          <div className="docs-section-body">
            <div className="shadow-spec">
              <div className="shadow-stage">
                <div className="shadow-effect" style={{ boxShadow: shadowLayer('--semantic-elevation-xs') }}>
                  <strong>Shadow/xs</strong><span className="docs-muted">0 1 2 0 · 4% black</span>
                </div>
              </div>
              <DesignSystemTable className="shadow-table shadow-table--effect" label="Shadow/xs properties" headings={propertyHeadings}
                rows={shadowProperties.map(([name, semantic, global, value]) => [name, wrapTokenPath(semantic), wrapTokenPath(global), value])} />
            </div>
            <p>Used on: Button, Sidebar - Menu Button (active), Tab Button (active), Sidebar - Warehouse Card, Badge Dot, Chart tooltip.</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="shadow-scale" aria-labelledby="shadow-scale-title" tabIndex={-1}>
          <SectionCardTitle headingId="shadow-scale-title" icon={scaleIcon} action={<Badge>Reference only</Badge>}>Global Shadow Scale</SectionCardTitle>
          <div className="docs-section-body">
            <p>The full global scale, previewed with effects bound to the global tokens. These levels are not exposed as semantic tokens or effect styles yet — use them only when the team adds a new elevation level.</p>
            <ul className="shadow-scale">
              {shadowScale.map(({ name, detail, hasTwoLayers, isInset }) => {
                const token = `--global-shadow-${name.toLowerCase()}`
                const boxShadow = hasTwoLayers ? `${shadowLayer(token, '1')}, ${shadowLayer(token, '2')}` : `${isInset ? 'inset ' : ''}${shadowLayer(token)}`
                return <li key={name}>
                  <span className="shadow-swatch" style={{ boxShadow }} aria-hidden="true" />
                  <div className="shadow-scale-label">
                    <strong>shadow/{name}</strong><span className="docs-muted">{detail}</span>
                    {name === 'xs' && <Badge tone="success">Exposed as Shadow/xs</Badge>}
                  </div>
                </li>
              })}
            </ul>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="shadow-depth" aria-labelledby="shadow-depth-title" tabIndex={-1}>
          <SectionCardTitle headingId="shadow-depth-title" icon={depthIcon}>Depth in Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>How the dashboard builds depth layer by layer. Only raised interactive elements get a shadow.</p>
            <figure className="shadow-depth-example">
              <div className="shadow-depth-controls" inert>
                <SidebarMenuButton icon={activeItemIcon} isSelected>Overview</SidebarMenuButton>
                <Button size="medium"><img src={exportIcon} alt="" />Export</Button>
                <Tab selected="30 days" onSelect={() => {}} onCustom={() => {}} />
              </div>
              <figcaption className="docs-muted">Active menu item · Secondary button · Active tab — all use Shadow/xs</figcaption>
            </figure>
            <DesignSystemTable className="shadow-table shadow-table--depth" label="Depth by layer" headings={depthHeadings}
              rows={shadowDepth.map(([layer, surface, border, shadow]) => [layer, wrapTokenPath(surface), wrapTokenPath(border), shadow === 'None' ? shadow : <Badge>{shadow}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shadow-guidelines-title">
          <SectionCardTitle headingId="shadow-guidelines-title" icon={guidelinesIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines shadow-guidelines">
            {shadowGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="shadow-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="shadow-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="shadow-table shadow-table--accessibility" label="Shadow accessibility" headings={['Guideline', 'Detail', 'Status']}
              rows={shadowAccessibility.map(([guideline, detail, status]) => [guideline, wrapTokenPath(detail), <Badge tone={accessibilityTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="shadow-audit-title">
          <SectionCardTitle headingId="shadow-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>Findings collected while documenting this page. Nothing has been changed in the tokens or styles — these are suggestions for the team to review.</p>
            <DesignSystemTable className="shadow-table shadow-table--audit docs-table--audit" label="Shadow token audit notes" headings={['Finding', 'Tokens', 'Details', 'Severity']}
              rows={shadowAudit.map(([finding, token, details, severity]) => [finding, wrapTokenPath(token), wrapTokenPath(details), <Badge tone={auditTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
