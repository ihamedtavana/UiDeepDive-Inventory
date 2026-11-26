export const description = 'Section Card is the container family that structures every CoreTech page. It has three parts: Section Card Title (the 64px header of a page section), Section Card (a self-contained card with its own title) and Card Title (the gray title bar inside a card). Content goes into slots.'

export const overviewNote = 'Above: the “Needs Restock” Section Card Title, the “Total Products” overview card and the “Shelf A1” shelf card, as they appear on the Inventory Dashboard (instances, unchanged). Source components live on the 😍 Final page.'

export const variantDescription = 'Section Card Title has two states that differ only in shape: Expanded rounds the top corners (radius/L) so a body can attach below; Collapsed rounds all four corners so the title stands alone. The collapse chevron is placed in the slot per instance. Section Card and Card Title have no variants — they adapt through slots.'

export const compositionDescription = 'A page section is a Section Card Title (Expanded) with a body directly below it. The body is either a Table Section or a hand-built frame with the same border and bottom radius. Section Cards sit inside that body in a grid.'

export const auditDescription = 'Findings collected while documenting this component family. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'

export const metrics = [
  ['3', 'Components in the family'],
  ['6', 'Section Card Titles on the dashboard'],
  ['13', 'Section Cards on the dashboard'],
  ['13', 'Card Titles on the dashboard'],
] as const

export const variants = [
  ['Expanded', 'Default. The section body is visible below the title.'],
  ['Collapsed', 'The section body is hidden; the chevron points to expand. Use for long pages where users scan section titles.'],
] as const

export const guidelines = [
  ['Start every page section with a Section Card Title and attach its body directly below.', 'Leave a gap between the title and its body or round the body’s top corners — they must read as one surface.'],
  ['Use Section Card for self-contained summaries that sit in a grid.', 'Nest a Section Card inside another Section Card.'],
  ['Put at most two or three items in the title slot (badges, tab, one action).', 'Overload the title slot — move filters and bulk actions into the section body.'],
] as const

export const cardAnatomyHeadings = ['#', 'Part', 'Details'] as const
export const cardAnatomy = [
  ['1', 'Container', 'Section Card · background/surface/primary/default · 1px border/primary/default · radius/L · padding Padding/MD · gap Gap/LG.'],
  ['2', 'Card Title', 'Nested Card Title component · surface tertiary · 1px border · radius/MD · padding Padding/SM · 40px high.'],
  ['3', 'Icon', 'Optional 16px icon (Show Icon Left, Icon Left).'],
  ['4', 'Title', 'Label/SM-Regular in text/primary/default (Title).'],
  ['5', 'Title slot', 'Right-aligned slot for a Badge, trend or small action (gap Gap/MD).'],
  ['6', 'Body slot', 'Card content: metrics, progress, lists, buttons (gap Gap/LG).'],
] as const

export const titleAnatomyHeadings = ['#', 'Part', 'Details'] as const
export const titleAnatomy = [
  ['1', 'Container', '64px high · no fill · 1px border/primary/default · top corners radius/L · padding Padding/LG · space-between.'],
  ['2', 'Icon', 'Optional 20px icon (Show Icon Left, Icon Left).'],
  ['3', 'Title', 'Title/SM-Regular in text/primary/default (Title).'],
  ['4', 'Actions slot', 'Right-aligned slot (gap Gap/MD) for Badges, Tab, Search, Buttons or the collapse chevron.'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Section Card Title', 'State', 'Variant', 'Expanded · Collapsed', 'Expanded'],
  ['Section Card Title', 'Title', 'Text', 'Section name', '“Warehouse Overview”'],
  ['Section Card Title', 'Show Icon Left / Icon Left', 'Boolean · Swap', '20px icon', 'home-02'],
  ['Section Card Title', 'Slot', 'Slot', 'Actions', '—'],
  ['Section Card', 'Slot (×2)', 'Slot', 'Card Title + body content', '—'],
  ['Card Title', 'Title', 'Text', 'Card name', '“Warehouse Storage”'],
  ['Card Title', 'Show Icon Left / Icon Left', 'Boolean · Swap', '16px icon', 'package-search'],
  ['Card Title', 'Slot', 'Slot', 'Badge or small action', '—'],
] as const

export const compositionHeadings = ['Pattern', 'Built from', 'Example'] as const
export const composition = [
  ['Section with table', 'Section Card Title + Table Section', 'Needs Restock, Products, Recent stock movements'],
  ['Section with card grid', 'Section Card Title + body frame (Padding/LG · Padding/MD, Gap/LG) + Section Cards', 'Warehouse Overview (shelf cards)'],
  ['Section with chart or list', 'Section Card Title + body frame', 'Inventory movement, Shipments On Road'],
  ['Standalone card row', 'Section Cards in a 4-column row (Layout/Grid-Gap)', 'Overview cards at the top of the page'],
  ['Sidebar card', 'Section Card at 232px inside the sidebar', 'Warehouse Storage'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Value'] as const
export const tokens = [
  ['Section Card fill · border', 'background/surface/primary/default · border/primary/default', '#FFFFFF · 1px #EBEBEB'],
  ['Section Card radius · padding · gap', 'radius/L · Padding/MD · Gap/LG', '12 · 12 · 12 px'],
  ['Card Title fill · border', 'background/surface/tertiary/default (instances) · border/primary/default', '#F5F5F5 · 1px'],
  ['Card Title radius · padding', 'radius/MD · Padding/SM', '8 · 8 px'],
  ['Card Title text', 'Label/SM-Regular · text/primary/default', '12/16'],
  ['Section Card Title border · radius', 'border/primary/default · radius/L (top)', '1px · 12 px'],
  ['Section Card Title padding · gap', 'Padding/LG · Gap/MD', '16 · 8 px'],
  ['Section Card Title text', 'Title/SM-Regular · text/primary/default', '14/20'],
  ['Heights', 'Not tokenized', 'Card Title 40 · Section Card Title 64'],
] as const

export const contextHeadings = ['Component', 'Where · size', 'Titles'] as const
export const context = [
  ['Section Card Title', 'Page sections · 1136, 756 and 364px wide', 'Warehouse Overview · Needs Restock · Inventory movement · Recent stock movements · Shipments On Road · Products'],
  ['Section Card', 'Overview row 272×168 (4) · shelf grid 360×328 (8) · sidebar 232×200 (1)', 'Total Products · Stock health · Inbound vs outbound · Warehouse Storage · Shelf A1–C2'],
  ['Card Title', 'Inside every Section Card', 'Same as Section Card titles'],
] as const

export const contentHeadings = ['Rule', 'Detail', 'Example'] as const
export const content = [
  ['Name the content, not the action', 'Titles describe what the section shows.', 'Needs restock · Shipments on road'],
  ['One case', 'Titles mix Title Case (Shipments On Road, Needs Restock) and sentence case (Inventory movement, Recent stock movements).', 'Shipments On Road → Shipments on road'],
  ['Keep it short', 'Two to four words; details go in badges or the body.', 'Inbound vs outbound'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Headings (1.3.1)', 'Section Card Title text should be an h2; Card Title text an h3. Size alone (14 vs 12px) does not convey structure to screen readers.', 'Required'],
  ['Regions', 'Each section can be a <section> labelled by its title (aria-labelledby).', 'Guideline'],
  ['Collapse button', 'The chevron must expose aria-expanded and aria-controls, and have a label (“Collapse Warehouse Overview”).', 'Required'],
  ['Card boundary (1.4.11)', 'Cards are separated by a 1.19:1 border. That is acceptable for decorative grouping, but not if the border is the only cue for an interactive card.', 'Review'],
] as const

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Override vs main', 'Card Title', 'The main component uses background/surface/secondary/default, but every instance inside Section Card is overridden to surface/tertiary. Update the main component so instances do not need overrides.', 'Warning'],
  ['No body component', 'Section bodies', 'Section Card Title has no matching body component; each section body is a hand-built frame (e.g. Warehouse Shelves Card, Inventory Movement Card). A “Section Body” component would keep border, radius and padding consistent.', 'Warning'],
  ['Title casing', 'Section and card titles', 'Mixed Title Case and sentence case across sections and cards.', 'Warning'],
  ['Duplicate slot properties', 'Section Card', 'The component exposes two slot properties (Slot#2033:69 and Slot#2033:70) for one visible slot.', 'Info'],
  ['Size drift', 'Overview cards', 'One overview card is 169px high while the others are 168px.', 'Info'],
  ['Layer names', 'Card Title · Section Card Title', 'Text layers keep the default names (“Warehouse Storage”, “Warehouse Overview”) on every instance, which makes the layers panel and code export confusing.', 'Info'],
  ['Missing descriptions', 'All three components', 'None of the components has a description in Figma.', 'Info'],
  ['Not tokenized', 'Heights · marker positions', 'Card Title (40) and Section Card Title (64) heights have no size tokens. Anatomy marker positions on this page are fixed values.', 'Not tokenized'],
] as const
