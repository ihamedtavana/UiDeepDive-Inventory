import type { CSSProperties } from 'react'
import { Badge } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import {
  iconAccessibility, iconAudit, iconColors, iconGuidelines, iconLibraryGroups,
  iconLibraryMetrics, iconSizes, iconographyDescription,
} from './iconographyFoundationData'
import { iconGallery } from './iconographyGallery'
import { wrapTokenPath } from './wrapTokenPath'
import libraryIcon from '../assets/design-system/audit.svg'
import sizesIcon from '../assets/design-system/data-visualization.svg'
import searchIcon from '../assets/design-system/search.svg'
import gridIcon from '../assets/design-system/layout-grid.svg'
import guidelinesIcon from '../assets/design-system/guidelines.svg'
import package12 from '../assets/design-system/iconography/package-12.svg'
import package16 from '../assets/imgPackage.svg'
import package20 from '../assets/design-system/layout-package.svg'
import graphicsCard from '../assets/design-system/iconography/graphics-card.svg'

const sections = [
  ['Overview', 'iconography-overview'], ['Sizes', 'sizes'], ['Color', 'color'],
  ['In Use', 'in-use'], ['Accessibility', 'accessibility'],
] as const
const sizeHeadings = ['Size', 'Use for', 'Example on the dashboard', 'Used']
const colorHeadings = ['Token', 'Use for', 'Used']
const sizePreviews = {
  '24 px': [graphicsCard, 24], '20 px': [package20, 20], '16 px': [package16, 16], '12 px': [package12, 12],
} as const

function exportIconography() {
  exportDesignSystemCsv('coretech-iconography.csv', [
    ['Group', 'Icons'], ...iconLibraryGroups.map(([group, count]) => [group, count]),
    [], sizeHeadings, ...iconSizes,
    [], colorHeadings, ...iconColors.map(([token, use, count]) => [token, use, count]),
    [], ['Icon', 'Size', 'Category'],
    ...iconGallery.flatMap(([category, size, entries]) => entries.map(([name]) => [name, String(size), category])),
  ])
}

export function IconographyFoundation() {
  return <div className="app-shell docs-shell iconography-foundation">
    <DesignSystemNavigation page="Iconography" />
    <main aria-labelledby="iconography-title">
      <TopNavigation variant="design-system" section="Foundations" page="Iconography" />
      <div className="docs-content" id="iconography-overview">
        <DesignSystemPageHeader title="Iconography" headingId="iconography-title" description={iconographyDescription}
          sections={sections} onExport={exportIconography} />

        <SectionCard className="docs-section" aria-labelledby="icon-library-title">
          <SectionCardTitle headingId="icon-library-title" icon={libraryIcon} isIconTinted action={<Badge>Icon page</Badge>}>Icon Library</SectionCardTitle>
          <div className="docs-section-body">
            <dl className="docs-metrics">
              {iconLibraryMetrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>Icons are organised in groups on the Icon page. Each master is a 24×24 component with a 2px outline stroke and search keywords in its description (for example “package, box, container, cube, code”).</p>
            <dl className="iconography-groups">
              {iconLibraryGroups.map(([group, count, isHighlighted]) =>
                <div key={group} className={isHighlighted ? 'is-highlighted' : undefined}>
                  <dt>{group}</dt><dd>{count}</dd>
                </div>)}
            </dl>
            <p>Highlighted: “Frame 1” holds the 8 custom hardware icons and “Hugicon Frame 2” holds 140 icons from a different icon family — see Audit Notes.</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="sizes" aria-labelledby="icon-sizes-title" tabIndex={-1}>
          <SectionCardTitle headingId="icon-sizes-title" icon={sizesIcon} isIconTinted action={<Badge>4 sizes</Badge>}>Sizes</SectionCardTitle>
          <div className="docs-section-body">
            <p>Masters are drawn at 24px and resized per slot. 16px is the default in product UI.</p>
            <DesignSystemTable className="iconography-table iconography-table--sizes" label="Icon sizes" headings={sizeHeadings}
              rows={iconSizes} renderPreview={name => {
                const [src, size] = sizePreviews[name as keyof typeof sizePreviews]
                return <img className="iconography-preview" src={src} width={size} height={size} alt="" />
              }} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="color" aria-labelledby="icon-color-title" tabIndex={-1}>
          <SectionCardTitle headingId="icon-color-title" icon={searchIcon} isIconTinted action={<Badge>Icon tokens</Badge>}>Color</SectionCardTitle>
          <div className="docs-section-body">
            <p>{wrapTokenPath('Icons use the icon/* tokens, or the text-icon token of the component they sit in. Match the icon level to the text next to it.')}</p>
            <DesignSystemTable className="iconography-table iconography-table--colors" label="Icon color tokens" headings={colorHeadings}
              rows={iconColors.map(([token, use, count]) => [token, use, count])}
              renderPreview={name => {
                const color = iconColors.find(([token]) => token === name)
                if (!color) return null
                const [, , , foreground, background] = color
                return <span className={background ? 'iconography-color-chip' : 'iconography-color-preview'} aria-hidden="true"
                  style={{
                    color: `var(${foreground})`,
                    backgroundColor: background ? `var(${background})` : undefined,
                    '--iconography-package': `url("${package16}")`,
                  } as CSSProperties} />
              }} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="in-use" aria-labelledby="icons-in-use-title" tabIndex={-1}>
          <SectionCardTitle headingId="icons-in-use-title" icon={gridIcon} isIconTinted action={<Badge>39 icons</Badge>}>Icons in Use</SectionCardTitle>
          <div className="docs-section-body">
            <p>Every icon currently used on the Inventory Dashboard. All come from the Icon page and are colored with tokens.</p>
            {iconGallery.map(([label, size, entries]) => <div className="iconography-gallery" key={label}>
              <h3>{label}</h3>
              <ul className="iconography-tiles">
                {entries.map(([name, src]) => <li key={name}>
                  <span className="iconography-tile-icon" aria-hidden="true"
                    style={{ width: size, height: size, maskImage: `url("${src}")` }} />
                  {name}
                </li>)}
              </ul>
            </div>)}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="icon-guidelines-title">
          <SectionCardTitle headingId="icon-guidelines-title" icon={guidelinesIcon} isIconTinted>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {iconGuidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{wrapTokenPath(doText)}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="icon-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="icon-accessibility-title" icon={searchIcon} isIconTinted action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="iconography-table iconography-table--accessibility" label="Icon accessibility" headings={['Guideline', 'Detail', 'Status']}
              rows={iconAccessibility.map(([name, details, status, tone]) => [name, wrapTokenPath(details), <Badge tone={tone}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="icon-audit-title">
          <SectionCardTitle headingId="icon-audit-title" icon={libraryIcon} isIconTinted action={<Badge>For review</Badge>}>Token Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>Findings collected while documenting this page. Nothing has been changed in the icons — these are suggestions for the team to review.</p>
            <DesignSystemTable className="iconography-table iconography-table--audit docs-table--audit" label="Icon token audit notes" headings={['Finding', 'Where', 'Details', 'Severity']}
              rows={iconAudit.map(([name, where, details, severity, tone]) => [name, wrapTokenPath(where), details, <Badge tone={tone}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
