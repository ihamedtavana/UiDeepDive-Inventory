import { useId, useState } from 'react'
import { Badge, type BadgeTone } from './Badge'
import { Button } from './Button'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { QuantityStepper } from './QuantityStepper'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './quantityStepperDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import statesIcon from '../assets/design-system/quantity-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'
import auditIcon from '../assets/design-system/audit.svg'

const sections = [['Overview', 'overview'], ['Anatomy', 'anatomy'], ['Items', 'items'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const tones = { Required: 'warning', Pass: 'success', Fail: 'error', Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const satisfies Record<string, BadgeTone>
const capacity = 24
const capacityHint = 'Room for 24 in bin A1-L2-S3'
const presets = [
  { text: 'Fill bin · 24', caption: 'Preset · Fill bin', value: capacity, isRelative: false },
  { text: 'To minimum · 4', caption: 'Preset · To minimum', value: 4, isRelative: false },
  { text: '+5', caption: 'Preset · +5', value: 5, isRelative: true },
  { text: '+10', caption: 'Preset · Selected', value: 10, isRelative: true },
] as const
const stepperStates = ['Default', 'Filled', 'Pressed', 'Focused', 'Error', 'Disabled'] as const
const presetStates = ['Default', 'Hover', 'Focused', 'Selected', 'Disabled'] as const

function exportQuantityStepperDocumentation() {
  exportDesignSystemCsv('coretech-quantity-stepper.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]), [],
    data.anatomyHeadings, ...data.anatomy, [],
    data.presetAnatomyHeadings, ...data.presetAnatomy, [],
    data.propertiesHeadings, ...data.properties, [],
    data.statesHeadings, ...data.states, [],
    data.tokensHeadings, ...data.tokens, [],
    data.contextHeadings, ...data.context, [],
    ['Do', "Don't"], ...data.guidelines, [],
    data.contentHeadings, ...data.content, [],
    data.accessibilityHeadings, ...data.accessibility, [],
    data.auditHeadings, ...data.audit,
  ])
}

export function QuantityStepperDocumentation() {
  const firstLabelId = useId()
  const errorLabelId = useId()
  const [quantity, setQuantity] = useState('20')
  const [errorQuantity, setErrorQuantity] = useState('30')
  const [selectedPreset, setSelectedPreset] = useState<number | null>(10)

  const changeQuantity = (value: string) => {
    if (value !== quantity) setSelectedPreset(null)
    setQuantity(value)
  }

  return <div className="app-shell docs-shell quantity-stepper-documentation">
    <DesignSystemNavigation page="Quantity Stepper" />
    <main aria-labelledby="quantity-stepper-title">
      <TopNavigation variant="design-system" section="Components" page="Quantity Stepper" />
      <div className="docs-content" id="overview" tabIndex={-1}>
        <DesignSystemPageHeader title="Quantity Stepper" headingId="quantity-stepper-title" section="Components" status="In review"
          description={data.description} sections={sections} onExport={exportQuantityStepperDocumentation} />

        <SectionCard className="docs-section" aria-labelledby="quantity-overview-title">
          <SectionCardTitle headingId="quantity-overview-title" icon={packageIcon} action={<Badge>Add Stock panel</Badge>}>Overview</SectionCardTitle>
          <div className="docs-section-body">
            <div className="quantity-docs-preview quantity-docs-overview-preview">
              <figure className="quantity-docs-stepper-example">
                <QuantityStepper variant="documentation" labelId={firstLabelId} value={quantity} helper={capacityHint}
                  hasError={Number(quantity) > capacity} isDisabled={false} onChange={changeQuantity} />
                <figcaption id={firstLabelId}>Quantity Stepper · Filled</figcaption>
              </figure>
              <figure className="quantity-docs-stepper-example">
                <QuantityStepper variant="documentation" labelId={errorLabelId} value={errorQuantity} helper={capacityHint}
                  hasError={Number(errorQuantity) > capacity} isDisabled={false} onChange={setErrorQuantity} />
                <figcaption id={errorLabelId}>Quantity Stepper · Error (over capacity)</figcaption>
              </figure>
              {presets.map(({ text, caption, value, isRelative }) => <figure key={text}>
                <Button className="quantity-docs-preset" aria-pressed={selectedPreset === value}
                  disabled={isRelative && Number(quantity) >= 999} onClick={() => {
                    setQuantity(String(isRelative ? Math.min(999, Number(quantity) + value) : value))
                    setSelectedPreset(value)
                  }}>{text}</Button>
                <figcaption>{caption}</figcaption>
              </figure>)}
            </div>
            <dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{data.source}</p>
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="anatomy" aria-labelledby="quantity-anatomy-title" tabIndex={-1}>
          <SectionCardTitle headingId="quantity-anatomy-title" icon={searchIcon} action={<Badge>Stepper · 6 parts</Badge>}>Anatomy</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="quantity-docs-parts" label="Stepper anatomy" headings={data.anatomyHeadings}
              rows={data.anatomy.map(([number, part, detail]) => [number, part, wrapTokenPath(detail)])} />
            <DesignSystemTable className="quantity-docs-parts" label="Preset anatomy" headings={data.presetAnatomyHeadings}
              rows={data.presetAnatomy.map(([number, part, detail]) => [number, part, wrapTokenPath(detail)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="items" aria-labelledby="quantity-properties-title" tabIndex={-1}>
          <SectionCardTitle headingId="quantity-properties-title" icon={statesIcon} action={<Badge>Stepper 4 · Preset 4</Badge>}>Properties</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="quantity-docs-properties" label="Quantity Stepper and Preset properties"
              headings={data.propertiesHeadings} rows={data.properties} rowHeadingColumn={1} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="quantity-states-title">
          <SectionCardTitle headingId="quantity-states-title" icon={statesIcon} action={<Badge>6 + 5 states</Badge>}>States</SectionCardTitle>
          <div className="docs-section-body">
            <div className="quantity-docs-preview">
              {stepperStates.map(state => <figure className="quantity-docs-stepper-example" key={state}>
                <div inert aria-hidden="true" data-stepper-preview={state}>
                  <QuantityStepper variant="documentation" value={state === 'Default' ? '' : '20'} placeholder="20"
                    helper="Room for 24 more in this bin" hasError={state === 'Error'} isDisabled={state === 'Disabled'} onChange={() => {}} />
                </div>
                <figcaption>{state}</figcaption>
              </figure>)}
              <div className="quantity-docs-preset-states">
                {presetStates.map(state => <figure key={state}>
                  <div inert aria-hidden="true">
                    <Button className="quantity-docs-preset" data-button-preview={state.toLowerCase()}
                      aria-pressed={state === 'Selected'} disabled={state === 'Disabled'}>Fill bin · 24</Button>
                  </div>
                  <figcaption>{state === 'Default' ? 'Preset · Default' : state}</figcaption>
                </figure>)}
              </div>
            </div>
            <DesignSystemTable className="quantity-docs-states" label="Quantity Stepper and Preset states" headings={data.statesHeadings}
              rows={data.states.map(([state, stepper, preset]) => [state, wrapTokenPath(stepper), wrapTokenPath(preset)])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="quantity-tokens-title">
          <SectionCardTitle headingId="quantity-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="quantity-docs-tokens" label="Quantity Stepper and Preset tokens" headings={data.tokensHeadings}
              rows={data.tokens.map(([part, token, value]) => [part, wrapTokenPath(token), value])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="quantity-context-title">
          <SectionCardTitle headingId="quantity-context-title" icon={auditIcon} action={<Badge>9 + 40 in screens</Badge>}>In Context</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.contextIntro}</p>
            <DesignSystemTable className="quantity-docs-context" label="Quantity Stepper and Preset in context" headings={data.contextHeadings}
              rows={data.context.map(([variant, example, count]) => [variant, example, <span className="docs-muted">{count}</span>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="usage" aria-labelledby="quantity-usage-title" tabIndex={-1}>
          <SectionCardTitle headingId="quantity-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle>
          <div className="docs-section-body docs-guidelines">
            {data.guidelines.flatMap(([doText, dontText]) => [
              <article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>,
              <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>,
            ])}
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="quantity-content-title">
          <SectionCardTitle headingId="quantity-content-title" icon={contentIcon} action={<Badge>Helpers &amp; presets</Badge>}>Content</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="quantity-docs-content" label="Quantity Stepper and Preset content" headings={data.contentHeadings} rows={data.content} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" id="accessibility" aria-labelledby="quantity-accessibility-title" tabIndex={-1}>
          <SectionCardTitle headingId="quantity-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle>
          <div className="docs-section-body">
            <DesignSystemTable className="quantity-docs-accessibility" label="Quantity Stepper and Preset accessibility" headings={data.accessibilityHeadings}
              rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={tones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>

        <SectionCard className="docs-section" aria-labelledby="quantity-audit-title">
          <SectionCardTitle headingId="quantity-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle>
          <div className="docs-section-body">
            <p>{data.auditIntro}</p>
            <DesignSystemTable className="docs-table--audit quantity-docs-audit" label="Quantity Stepper and Preset audit notes" headings={data.auditHeadings}
              rows={data.audit.map(([finding, where, detail, status]) => [finding, where, wrapTokenPath(detail), <Badge tone={tones[status]}>{status}</Badge>])} />
          </div>
        </SectionCard>
      </div>
    </main>
  </div>
}
