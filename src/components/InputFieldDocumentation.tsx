import { Badge, type BadgeTone } from './Badge'
import { DesignSystemNavigation } from './DesignSystemNavigation'
import { DesignSystemPageHeader } from './DesignSystemPageHeader'
import { DesignSystemTable } from './DesignSystemTable'
import { InputField } from './InputField'
import { SectionCard } from './SectionCard'
import { SectionCardTitle } from './SectionCardTitle'
import { TopNavigation } from './TopNavigation'
import { exportDesignSystemCsv } from './exportDesignSystemCsv'
import { wrapTokenPath } from './wrapTokenPath'
import * as data from './inputFieldDocumentationData'
import packageIcon from '../assets/design-system/layout-package.svg'
import searchIcon from '../assets/design-system/search.svg'
import statesIcon from '../assets/design-system/quantity-states.svg'
import checkIcon from '../assets/design-system/layout-check.svg'
import contentIcon from '../assets/design-system/button-content.svg'
import auditIcon from '../assets/design-system/audit.svg'
import leadingIcon from '../assets/stock-marker-pin-01.svg'
import chevronDown from '../assets/iconChevronDown.svg'

const sections = [['Overview', 'input-overview'], ['Anatomy', 'anatomy'], ['Items', 'variants'], ['Usage', 'usage'], ['Accessibility', 'accessibility']] as const
const tones = { Required: 'warning', Pass: 'success', Fail: 'error', Error: 'error', Warning: 'warning', Info: 'info', 'Not tokenized': 'warning' } as const satisfies Record<string, BadgeTone>
const Preview = ({ label, placeholder, value, error, helper, hasTrailingIcon = false }: { label: string; placeholder?: string; value?: string; error?: string; helper?: string; hasTrailingIcon?: boolean }) => <InputField label={label} placeholder={placeholder} defaultValue={value} error={error} helper={helper} leadingIcon={leadingIcon} trailingIcon={hasTrailingIcon ? chevronDown : undefined} readOnly />

function exportInputFieldDocumentation() {
  exportDesignSystemCsv('coretech-input-field.csv', [
    ['Metric', 'Value'], ...data.metrics.map(([value, label]) => [label, value]),
    [], data.anatomyHeadings, ...data.anatomy,
    [], data.propertiesHeadings, ...data.properties,
    [], data.statesHeadings, ...data.states,
    [], data.tokensHeadings, ...data.tokens,
    [], data.contextHeadings, ...data.context,
    [], ['Do', "Don't"], ...data.guidelines,
    [], data.contentHeadings, ...data.content,
    [], data.accessibilityHeadings, ...data.accessibility,
    [], data.auditHeadings, ...data.audit,
  ])
}

export function InputFieldDocumentation() { return <div className="app-shell docs-shell input-field-documentation"><DesignSystemNavigation page="Input Field" /><main aria-labelledby="input-field-title"><TopNavigation variant="design-system" section="Components" page="Input Field" /><div className="docs-content" id="input-overview" tabIndex={-1}>
  <DesignSystemPageHeader title="Input Field" headingId="input-field-title" section="Components" status="In review" description={data.description} sections={sections} onExport={exportInputFieldDocumentation} />
  <SectionCard className="docs-section" aria-labelledby="input-overview-title"><SectionCardTitle headingId="input-overview-title" icon={packageIcon} action={<Badge>Add Stock · Auth</Badge>}>Overview</SectionCardTitle><div className="docs-section-body"><div className="input-docs-preview"><div><Preview label="Supplier" value="Pars Components" helper="Helper text" /><span>Filled</span></div><div><Preview label="Batch / lot" placeholder="Optional" /><span>Default (empty)</span></div><div><Preview label="Reference / PO" value="e.g. PO-2026-0418" error="Required for supplier deliveries" /><span>Error</span></div><div><Preview label="Warehouse" value="New York Central" hasTrailingIcon /><span>Select (trailing chevron)</span></div></div><dl className="docs-metrics">{data.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>{data.source}</p></div></SectionCard>
  <SectionCard className="docs-section" id="anatomy" aria-labelledby="input-anatomy-title" tabIndex={-1}>
    <SectionCardTitle headingId="input-anatomy-title" icon={searchIcon} action={<Badge>5 parts</Badge>}>Anatomy</SectionCardTitle>
    <div className="docs-section-body">
      <DesignSystemTable className="input-docs-parts" label="Input Field anatomy" headings={data.anatomyHeadings}
        rows={data.anatomy.map(([number, part, layer, detail]) => [number, part, layer, wrapTokenPath(detail)])} rowHeadingColumn={1} />
    </div>
  </SectionCard>
  <SectionCard className="docs-section" aria-labelledby="input-properties-title"><SectionCardTitle headingId="input-properties-title" icon={statesIcon} action={<Badge>9 properties</Badge>}>Properties</SectionCardTitle><div className="docs-section-body"><DesignSystemTable className="input-docs-properties" label="Input Field properties" headings={data.propertiesHeadings} rows={data.properties} /></div></SectionCard>
  <SectionCard className="docs-section" id="variants" aria-labelledby="input-states-title" tabIndex={-1}>
    <SectionCardTitle headingId="input-states-title" icon={statesIcon} action={<Badge>6 states</Badge>}>States</SectionCardTitle>
    <div className="docs-section-body">
      <div className="input-docs-preview" aria-hidden="true" inert>
        {data.states.map(([state]) => (
          <div key={state} data-state={state}>
            <InputField label="Label" placeholder="Value" defaultValue={state === 'Default' ? undefined : 'Value'}
              helper="Helper text" error={state === 'Error' ? 'Helper text' : undefined}
              leadingIcon={leadingIcon} disabled={state === 'Disabled'} readOnly />
            <span>{state}</span>
          </div>
        ))}
      </div>
      <DesignSystemTable className="input-docs-states" label="Input Field states" headings={data.statesHeadings}
        rows={data.states.map(([state, ...details]) => [state, ...details.map(wrapTokenPath)])} />
    </div>
  </SectionCard>
  <SectionCard className="docs-section" aria-labelledby="input-tokens-title"><SectionCardTitle headingId="input-tokens-title" icon={packageIcon} action={<Badge>All tokenized</Badge>}>Tokens</SectionCardTitle><div className="docs-section-body"><DesignSystemTable className="input-docs-tokens" label="Input Field tokens" headings={data.tokensHeadings} rows={data.tokens.map(([part, token, value]) => [part, wrapTokenPath(token), value])} /></div></SectionCard>
  <SectionCard className="docs-section" aria-labelledby="input-context-title">
    <SectionCardTitle headingId="input-context-title" icon={auditIcon} action={<Badge>60 in screens</Badge>}>In Context</SectionCardTitle>
    <div className="docs-section-body">
      <p>{data.contextNote}</p>
      <DesignSystemTable className="input-docs-context" label="Input Field context" headings={data.contextHeadings} rows={data.context} />
    </div>
  </SectionCard>
  <SectionCard className="docs-section" id="usage" aria-labelledby="input-usage-title" tabIndex={-1}><SectionCardTitle headingId="input-usage-title" icon={checkIcon}>Usage Guidelines</SectionCardTitle><div className="docs-section-body docs-guidelines">{data.guidelines.flatMap(([doText, dontText]) => [<article className="docs-example-card" key={doText}><Badge tone="success">Do</Badge><p>{doText}</p></article>, <article className="docs-example-card" key={dontText}><Badge tone="error">Don't</Badge><p>{dontText}</p></article>])}</div></SectionCard>
  <SectionCard className="docs-section" aria-labelledby="input-content-title"><SectionCardTitle headingId="input-content-title" icon={contentIcon} action={<Badge>Labels &amp; helpers</Badge>}>Content</SectionCardTitle><div className="docs-section-body"><DesignSystemTable className="input-docs-content" label="Input Field content" headings={data.contentHeadings} rows={data.content} /></div></SectionCard>
  <SectionCard className="docs-section" id="accessibility" aria-labelledby="input-accessibility-title" tabIndex={-1}><SectionCardTitle headingId="input-accessibility-title" icon={searchIcon} action={<Badge>WCAG 2.2</Badge>}>Accessibility</SectionCardTitle><div className="docs-section-body"><DesignSystemTable className="input-docs-accessibility" label="Input Field accessibility" headings={data.accessibilityHeadings} rows={data.accessibility.map(([check, detail, status]) => [check, detail, <Badge tone={tones[status]}>{status}</Badge>])} /></div></SectionCard>
  <SectionCard className="docs-section" aria-labelledby="input-audit-title"><SectionCardTitle headingId="input-audit-title" icon={auditIcon} action={<Badge>For review</Badge>}>Audit Notes</SectionCardTitle><div className="docs-section-body"><p>Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review.</p><DesignSystemTable className="docs-table--audit input-docs-audit" label="Input Field audit notes" headings={data.auditHeadings} rows={data.audit.map(([finding, where, detail, severity]) => [finding, where, detail, <Badge tone={tones[severity]}>{severity}</Badge>])} /></div></SectionCard>
</div></main></div> }
