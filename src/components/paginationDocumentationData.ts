export const description = 'Pagination splits a long table into pages and lets users move between them. In CoreTech it closes the Products table, next to a “Showing 1–5 of 96 products” summary. It is composed entirely of Button instances.'
export const overviewNote = 'The footer above recreates the Products table footer: the summary text plus an instance of the “Pagination” component (5753:52151). The component sits inside a frame named “❗️ Componenets - WIP” on the 😍 Final page, so it may not be final yet.'
export const itemsNote = 'In Figma, Pagination has no properties of its own. Each item is a Button instance; change state by switching the Button variant on that item.'
export const breadcrumbNote = 'A second component is also called “Pagination” (2037:20219), but it is the breadcrumb in the Top Navigation: location text, a “/” separator and the current page as a Neutral Badge. Its only property is “First Page”. It is documented here so the two are not confused — see Audit Notes.'
export const auditNote = 'Findings from the Figma component audit for the team to review.'

export const metrics = [
  ['1', 'Pagination on the dashboard'],
  ['7', 'Button instances inside'],
  ['0', 'Component properties'],
  ['12', 'Pages in the Figma example'],
] as const

export const anatomyHeadings = ['#', 'Part', 'Button variant', 'Details']
export const anatomy = [
  ['1', 'Previous', 'Icon Button · Secondary · Ghost · Disabled', 'chevron-left. Disabled on the first page.'],
  ['2', 'Current page', 'Button · Secondary · Filled', 'The page being shown.'],
  ['3', 'Page', 'Button · Secondary · Ghost', 'Any other page number.'],
  ['4', 'Ellipsis', 'Button · Secondary · Ghost (“…”)', 'Skipped pages.'],
  ['5', 'Last page', 'Button · Secondary · Ghost', 'Total number of pages (12).'],
  ['6', 'Next', 'Icon Button · Secondary · Ghost', 'chevron-right.'],
] as const

export const itemHeadings = ['Item', 'Preview', 'Variant', 'When']
export const items = [
  ['Previous · enabled', '‹', 'Icon Button · Secondary · Ghost · Default', 'Any page after the first'],
  ['Previous · disabled', '‹', 'Icon Button · Secondary · Ghost · Disabled', 'First page'],
  ['Current page', '1', 'Button · Secondary · Filled · Default', 'The page being shown'],
  ['Other page', '2', 'Button · Secondary · Ghost · Default', 'Every other visible page'],
  ['Hover', '3', 'Button · Secondary · Ghost · Hover', 'Pointer over a page'],
  ['Next', '›', 'Icon Button · Secondary · Ghost · Default', 'Any page before the last'],
] as const

export const breadcrumbHeadings = ['Part', 'Details']
export const breadcrumb = [
  ['Location', 'Label/SM-Regular · text/tertiary/default (property “First Page”)'],
  ['Separator', '“/” · Label/SM-Regular · text/tertiary/default'],
  ['Current page', 'Badge · Neutral (e.g. “Inventory”)'],
  ['Spacing', 'Gap/MD'],
] as const

export const tokenHeadings = ['Part', 'Token', 'Value']
export const tokens = [
  ['Item gap', 'Gap/SM', '4 px'],
  ['Item size · radius', 'Button Small · Radius', '32×32 · 8 px'],
  ['Current page', 'component/button/filled/secondary/*', 'White fill · 1px border · Shadow/xs'],
  ['Other pages · arrows', 'component/button/borderless/secondary/*', 'No fill · hover #F5F5F5'],
  ['Label', 'Label/MD-Default', '14/20 Medium'],
  ['Summary text', 'Caption/SM-Regular · text/tertiary/default', '12/16'],
] as const

export const guidelines = [
  ['Pair Pagination with a summary (“Showing 1–5 of 96 products”) on the left of the table footer.', 'Show pagination without telling users how many records there are.'],
  ['Show first, last, current and its neighbours; collapse the rest into an ellipsis.', 'List every page number — 12 buttons do not fit and are hard to scan.'],
  ['Hide Pagination when all rows fit on one page.', 'Show a disabled Pagination with a single page.'],
] as const

export const contentHeadings = ['Rule', 'Detail', 'Example']
export const content = [
  ['Summary format', 'Range, total and object name.', 'Showing 1–5 of 96 products'],
  ['Use an en dash for ranges', 'Not a hyphen.', '1–5'],
  ['Name the object', 'Use the plural noun of the table.', 'products · movements'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status']
export const accessibility = [
  ['Landmark', 'Wrap in <nav aria-label="Pagination">.', 'Required'],
  ['Current page', 'The current page needs aria-current="page" — the Filled style alone is not announced.', 'Required'],
  ['Arrow labels', 'Previous and next Icon Buttons need labels (“Previous page”, “Next page”).', 'Required'],
  ['Ellipsis', 'The “…” is built as a Button; it should be static text (not focusable).', 'Fix'],
  ['Target size (2.5.8)', 'Items are 32×32px with a 4px gap — above the 24×24px minimum.', 'Pass'],
  ['Summary contrast', 'The summary uses text/tertiary (2.52:1).', 'Fail'],
] as const

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity']
export const audit = [
  ['Name collision', 'Pagination (2037:20219)', 'The Top Navigation breadcrumb component is also named “Pagination” (property “First Page”). Rename it to Breadcrumb.', 'Error'],
  ['No properties', 'Pagination (5753:52151)', 'Page numbers, current page and total are hard-coded across 7 Button instances. Properties (current, total) or variants for common states would avoid manual overrides.', 'Warning'],
  ['Ellipsis as button', 'Pagination', '“…” is an interactive Button instance.', 'Warning'],
  ['Shadow on Ghost', 'Page buttons', 'Ghost page buttons inherit Shadow/xs from the Button component (see Button audit).', 'Info'],
  ['WIP location', '❗️ Componenets - WIP', 'The component sits in a WIP frame whose name has a typo (“Componenets”).', 'Info'],
  ['Breadcrumb uses Badge', 'Breadcrumb', 'The current breadcrumb item is a Neutral Badge, and location text uses text/tertiary (2.52:1).', 'Info'],
  ['Missing descriptions', 'Both components', 'Neither component has a description in Figma.', 'Info'],
  ['Not tokenized', 'Marker positions', 'Anatomy marker positions on this page are fixed values. The component itself is fully tokenized through Button.', 'Not tokenized'],
] as const
