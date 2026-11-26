export const tabDescription = 'Tab is a segmented control: a gray track (Tab) holding two to five Tab Buttons, one of which is always active. CoreTech uses it to switch the time range of a page and to filter lists and tables in place — never to navigate between pages.'
export const tabSource = 'Source: “Tab” (component with a slot) and “Tab Button” (component set) on the 😍 Final page. The examples above are instances of the real components, relabelled.'

export const metrics = [
  ['Components (Tab, Tab Button)', '2'],
  ['Tab Button variants', '2'],
  ['Tab groups on the dashboard', '3'],
  ['Tab Buttons on the dashboard', '12'],
] as const

export const examples = [
  { label: 'Time range', initial: '30 days', options: [{ label: 'Today' }, { label: '7 days' }, { label: '30 days' }, { label: '90 days' }, { label: 'Custom' }] },
  { label: 'Stock movements', initial: 'All', options: [{ label: 'All' }, { label: 'Inbound' }, { label: 'Outbound' }] },
  { label: 'Products', initial: 'Out', options: [{ label: 'All', value: '691' }, { label: 'In Stock', value: '420' }, { label: 'Low', value: '190' }, { label: 'Out', value: '81' }] },
] as const

export const anatomyHeadings = ['#', 'Part', 'Details']
export const anatomy = [
  ['1', 'Track (Tab)', 'background/surface/tertiary/default · radius/MD · padding Padding/XS (horizontal) · gap Gap/XS between buttons. Holds Tab Buttons in a slot.'],
  ['2', 'Tab Button · Default', 'Same tertiary fill as the track · label Label/SM-Regular in text/secondary/default.'],
  ['3', 'Tab Button · Active', 'background/surface/primary/default · 1px border/primary/default · Shadow/xs · label Label/SM-Default in text/primary/default.'],
  ['4', 'Label', 'Text property. One or two words.'],
  ['5', 'Value (optional)', 'Count after the label (Show Value) · Label/SM-Regular · text/secondary/default.'],
] as const

export const propertyHeadings = ['Component', 'Property', 'Type', 'Values', 'Default']
export const properties = [
  ['Tab', 'Slot', 'Slot', 'Tab Buttons (2–5)', '—'],
  ['Tab Button', 'Type', 'Variant', 'Default · Active', 'Default'],
  ['Tab Button', 'Text', 'Text', 'Short label', '“Today”'],
  ['Tab Button', 'Show Value', 'Boolean', 'true · false', 'true'],
  ['Tab Button', 'Value', 'Text', 'Count, e.g. 420', '“190”'],
] as const

export const variantDescription = 'Tab Button has only Default and Active. Hover, Focused and Disabled are not designed yet — see Audit Notes.'
export const variantHeadings = ['Type', 'Label only', 'Label + value', 'Use']
export const variants = [
  { name: 'Default', label: 'Inbound', countedLabel: 'Low', value: '190', use: 'Every option that is not selected.', isSelected: false },
  { name: 'Active', label: 'All', countedLabel: 'Out', value: '81', use: 'The selected option — exactly one per group.', isSelected: true },
] as const

export const tokenDescription = 'Tab has no component tokens — it uses semantic tokens directly.'
export const tokenHeadings = ['Part', 'Token', 'Value']
export const tokens = [
  ['Track fill', 'background/surface/tertiary/default', '#F5F5F5'],
  ['Track radius · padding · gap', 'radius/MD · Padding/XS · Gap/XS', '8 · 4 · 2 px'],
  ['Button padding · gap', 'Padding/SM · Gap/SM', '8 · 4 px'],
  ['Button radius', 'radius/SM', '6 px'],
  ['Default label', 'Label/SM-Regular · text/secondary/default', '12/16 · #404040'],
  ['Active fill · border', 'background/surface/primary/default · border/primary/default', '#FFFFFF · #EBEBEB'],
  ['Active elevation', 'Shadow/xs', '0 1 2 · 4%'],
  ['Active label', 'Label/SM-Default · text/primary/default', '12/16 Medium · #171717'],
  ['Value', 'Label/SM-Regular · text/secondary/default', '12/16'],
  ['Height', 'Not tokenized', '32 track · 24 button'],
] as const

export const contextHeadings = ['Where', 'Options (active *)', 'Purpose']
export const context = [
  ['Page title bar', 'Today · 7 days · 30 days* · 90 days · Custom', 'Time range for the whole page'],
  ['Recent stock movements (section title)', 'All* · Inbound · Outband', 'Filter the movements table'],
  ['Products (section title)', 'All 691 · In Stock 420 · Low 190 · Out* 81', 'Filter the products table, with result counts'],
] as const

export const guidelines = [
  ['Use Tab to switch views of the same content in place — a time range or a table filter.', 'Use Tab to navigate between pages; the sidebar handles navigation.'],
  ['Offer two to five short options and keep exactly one active.', 'Add more than five options or leave none selected — use a Select instead.'],
  ['Show counts (Show Value) when filtering a list so users can predict the result.', 'Show counts that do not match the filtered result or are not updated.'],
] as const

export const contentHeadings = ['Rule', 'Detail', 'Example']
export const contentRules = [
  ['One or two words', 'Labels name the option, not an action.', 'Inbound · 90 days'],
  ['Parallel wording', 'All options in a group use the same grammar and case.', 'In Stock → In stock'],
  ['Check spelling', '“Outband” appears in the movements filter.', 'Outband → Outbound'],
  ['“All” first', 'When filtering, put the unfiltered option first.', 'All · Inbound · Outbound'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status']
export const accessibility = [
  ['Role & keyboard', 'Implement as a radio group (or tablist when it swaps a panel): one Tab stop for the group, arrow keys move between options.', 'Required', 'warning'],
  ['Selected state', 'Active is shown with fill, border, shadow and a heavier label — not color alone — and must be exposed as aria-checked / aria-selected.', 'Pass', 'success'],
  ['Contrast', 'Default label on the track is 9.51:1.', 'Pass', 'success'],
  ['Target size (2.5.8)', 'Tab Buttons are 24px high — exactly the minimum. Do not make them smaller.', 'Review', 'warning'],
  ['Focus visible', 'No Focused variant exists, so the focus indicator is undefined.', 'Missing', 'error'],
] as const

export const auditDescription = 'Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'
export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity']
export const audit = [
  ['Missing states', 'Tab Button', 'Only Default and Active exist. Hover, Focused and Disabled are needed for implementation.', 'Error', 'error'],
  ['Typo', 'Recent stock movements filter', '“Outband” should be “Outbound”.', 'Warning', 'warning'],
  ['Padding vs height', 'Tab Button', 'Padding/SM (8px) on all sides plus a 16px label needs 32px, but the button is fixed at 24px — the vertical padding is not applied.', 'Info', 'info'],
  ['Layout shift', 'Type = Active', 'The label switches from Regular to Medium weight, so the button gets wider when selected.', 'Info', 'info'],
  ['Naming', 'Tab', 'Behaves as a segmented control (filters content in place). Consider naming it Segmented Control to set the right expectation for developers.', 'Info', 'info'],
  ['Missing descriptions', 'Tab · Tab Button', 'Neither component has a description in Figma.', 'Info', 'info'],
  ['Not tokenized', 'Heights · marker positions', 'Track and button heights have no size tokens. Anatomy marker positions on this page are fixed values.', 'Not tokenized', 'warning'],
] as const
