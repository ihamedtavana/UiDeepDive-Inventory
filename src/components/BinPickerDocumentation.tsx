import { useState } from 'react'
import { Badge } from './Badge'
import { BinPicker } from './BinPicker'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { BIN_CAPACITY } from './stockInventory'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './binPickerDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import propertiesIcon from '../assets/design-system/button-states.svg'
import contextIcon from '../assets/design-system/audit.svg'
import checkIcon from '../assets/design-system/layout-check.svg'

const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const badgeTones = { Required: 'warning', Fix: 'error', Fail: 'error', Check: 'warning', Warning: 'warning', Error: 'error', Info: 'info', 'Not tokenized': 'warning' } as const
const fullBins = new Set(['A1-L3-S1', 'A1-L3-S2', 'A1-L2-S1', 'A1-L1-S4'])
const bins = [3, 2, 1].flatMap(level => [1, 2, 3, 4].map(slot => {
  const label = `S${slot}`
  const id = `A1-L${level}-${label}`
  const isFull = fullBins.has(id)
  return { id, label, used: isFull ? BIN_CAPACITY : 0, room: isFull ? 0 : BIN_CAPACITY }
}))

function exportBinPickerDocumentation() {
  exportDesignSystemCsv('coretech-bin-picker.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function BinPickerDocumentation() {
  const [defaultSelection, setDefaultSelection] = useState('')
  const [errorSelection, setErrorSelection] = useState('')

  return <div className="app-shell docs-shell bin-picker-documentation">
    <DesignSystemNavigation page="Bin Picker" />
    <main aria-labelledby="bin-picker-title">
      <TopNavigation variant="design-system" section="Components" page="Bin Picker" />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Bin Picker" headingId="bin-picker-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportBinPickerDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="bin-picker-overview-title">
          <SectionCardTitle headingId="bin-picker-overview-title" icon={packageIcon} action={<Badge>Add Stock panel</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="bin-picker-docs-preview">
              <figure>
                <BinPicker variant="documentation" shelf="A1 · Graphics Cards" defaultBin="A1-L2-S3"
                  bins={bins} selectedBin={defaultSelection} onSelect={setDefaultSelection} />
                <figcaption>Default</figcaption>
              </figure>
              <figure>
                <BinPicker variant="documentation" shelf="A1 · Graphics Cards" defaultBin=""
                  errorMessage="Choose a bin for these 20 units" bins={bins} selectedBin={errorSelection} onSelect={setErrorSelection} />
                <figcaption>Error — no bin chosen</figcaption>
              </figure>
            </div>
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.overviewNote}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="bin-picker-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="bin-picker-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="bin-picker-docs-parts" label="Bin Picker anatomy" headings={data.anatomyHeadings}
              rows={data.anatomy.map(([number, part, detail]) => [number, part, wrapTokenPath(detail)])} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="bin-picker-properties-title" tabIndex={-1}>
          <SectionCardTitle headingId="bin-picker-properties-title" icon={propertiesIcon} action={<Badge>1 property</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="bin-picker-docs-properties" label="Bin Picker properties" headings={data.propertiesHeadings} rows={data.properties} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="bin-picker-states-title">
          <SectionCardTitle headingId="bin-picker-states-title" icon={propertiesIcon} action={<Badge>2 states</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="bin-picker-docs-states" label="Bin Picker states" headings={data.statesHeadings}
              rows={data.states.map(([state, border, message, size]) => [state, wrapTokenPath(border), wrapTokenPath(message), size])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="bin-picker-tokens-title">
          <SectionCardTitle headingId="bin-picker-tokens-title" icon={packageIcon} action={<Badge>1 misuse</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="bin-picker-docs-tokens" label="Bin Picker tokens" headings={data.tokensHeadings}
              rows={data.tokens.map(([part, token, value]) => [part, wrapTokenPath(token), wrapTokenPath(value)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="bin-picker-context-title">
          <SectionCardTitle headingId="bin-picker-context-title" icon={contextIcon} action={<Badge>3 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="bin-picker-docs-context" label="Bin Picker in context" headings={data.contextHeadings}
              rows={data.context.map(([tone, example, count]) => [tone, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="bin-picker-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="bin-picker-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="bin-picker-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="bin-picker-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="bin-picker-docs-accessibility" label="Bin Picker accessibility" headings={data.accessibilityHeadings}
              rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={badgeTones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="bin-picker-audit-title">
          <SectionCardTitle headingId="bin-picker-audit-title" icon={contextIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit bin-picker-docs-audit" label="Bin Picker audit notes" headings={data.auditHeadings}
              rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, wrapTokenPath(detail), <Badge tone={badgeTones[severity]}>{severity}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
