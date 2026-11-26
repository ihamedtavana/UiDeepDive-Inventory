import graphicsCard from '../assets/raw4_0.png'
import processor from '../assets/raw4_1.png'
import storage from '../assets/raw4_4.png'
import powerSupply from '../assets/raw4_5.png'
import caseImage from '../assets/raw4_8.png'

export const description = 'Tables list inventory records — products, movements and restock items — in rows that can be scanned and compared. A table is built from Table Section (the container with a header slot and a rows slot) and Table Column (typed cells such as Product Details, Name, Stock and Badge).'
export const overviewNote = 'Above: the “Recent stock movements” table from the Inventory Dashboard (instance, unchanged). Source: “Table Section” and “Table Column” on the 😍 Final page.'
export const cellsDescription = 'Each cell type is a variant of Table Column. Previews below are instances of the real variants.'
export const compositionDescription = 'A table always sits under a Section Card Title (Expanded). The title slot carries table-level controls — Badges with totals, a Tab filter, Search and a primary action — and Pagination closes the table when there are more rows than fit.'
export const auditDescription = 'Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'

export const metrics = [
  ['3', 'Tables on the dashboard'],
  ['9', 'Table Column types'],
  ['75', 'Cells (Table Column instances)'],
  ['15', 'Rows (72px each)'],
] as const

export const movementHeadings = ['Product', 'Type', 'Qty', 'Date'] as const
export const movementDate = '29 Oct 2026'
export const movements = [
  { name: 'GeForce RTX 4070 Super', sku: 'GPU-0104', partner: 'Atlas Components', type: 'Inbound', quantity: '+40', image: graphicsCard },
  { name: 'Intel Core i7 14700K', sku: 'CPU-0108', partner: 'SHP-2041', type: 'Inbound', quantity: '+12', image: processor },
  { name: '990 Pro 1TB', sku: 'STO-0102', partner: 'PcGaming Digital', type: 'Outbound', quantity: '-120', image: storage },
  { name: 'RM850e', sku: 'PSU-0101', partner: 'Order #10482', type: 'Outbound', quantity: '-20', image: powerSupply },
  { name: 'Lancool 216', sku: 'CAS-0102', partner: 'From WH-02', type: 'Inbound', quantity: '+20', image: caseImage },
] as const

export const anatomyHeadings = ['#', 'Part', 'Details'] as const
export const anatomy = [
  ['1', 'Table Section', 'background/surface/primary/default · 1px border/primary/default · bottom corners radius/L · padding Padding/LG. Attaches below a Section Card Title.'],
  ['2', 'Header row', 'Frame named “Card Title” inside Table Section · surface tertiary · 1px border · radius/MD · padding Padding/SM (vertical) · header slot gap Gap/LG.'],
  ['3', 'Header label', 'Label/SM-Regular in text/primary/default. Column widths are set per header text.'],
  ['4', 'Row', '72px frame · background/surface/primary/default · bottom border/primary/default · padding 12px (vertical) · gap 12px. Rows are not a component.'],
  ['5', 'Cell', 'Table Column instance with a Type (Product Details, Name, Stock, Qty, Date, Badge…).'],
  ['6', 'Typed cell', 'Badge-type cell shows a status Badge; other types use Caption/Body text styles.'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Table Section', 'Slot', 'Slot', 'Header labels (in the header row)', '—'],
  ['Table Section', 'Slot 2', 'Slot', 'Rows', '—'],
  ['Table Column', 'Type', 'Variant', 'Product Details · Name · Stock · Qty · Date · Badge · Status · Reserved/Incoming · Empty Reserved/Incoming', 'Product Details'],
  ['Table Column', 'Show Transfer Detail', 'Boolean', 'true · false', 'true'],
] as const

export const cellsHeadings = ['Type', 'Preview', 'Content', 'Text styles', 'Used'] as const
export const cells = [
  ['Product Details', 'GeForce RTX 4070 Super · Graphics Cards · Atlas Components', 'Image thumbnail, product name, category and an optional supplier badge.', 'Label/SM-Default · Body/SM-Regular', '15'],
  ['Name', 'GPU-0107 · A1-L2-S3', 'Code (e.g. SKU) over a secondary line (e.g. bin).', 'Caption/SM-Strong · Body/SM-Regular', '10'],
  ['Stock', '0 / Min 3', 'Current stock with the minimum after a slash.', 'Caption/SM-Strong · Caption/SM-Regular', '10'],
  ['Qty', '+40', 'Signed quantity of a movement.', 'Caption/SM-Strong', '5'],
  ['Date', movementDate, 'Date of the record.', 'Caption/SM-Regular · text/tertiary', '5'],
  ['Badge', 'Out Of Stock', 'Status Badge (e.g. Out Of Stock, Inbound).', 'Badge', '15'],
  ['Status', 'Inactive', 'Plain status text (e.g. Inactive).', 'Body/SM-Regular · text/tertiary', '5'],
  ['Reserved/Incoming', '+80', 'Reserved or incoming amount.', 'Caption/SM-Strong', '3'],
  ['Empty Reserved/Incoming', '-', 'Dash placeholder when there is no value.', 'Caption/SM-Strong · text/tertiary', '7'],
] as const

export const compositionHeadings = ['Layer', 'Component', 'Notes'] as const
export const composition = [
  ['Section title', 'Section Card Title', 'Title + table controls in the slot'],
  ['Container', 'Table Section', 'Bottom corners radius/L; joins the title above'],
  ['Header row', 'Frame inside Table Section', 'One label per column; widths match the cells below'],
  ['Rows', 'Hand-built frames (72px)', 'One Table Column per cell; bottom border'],
  ['Row action', 'Icon Button · Secondary · Filled (…) or Button “Add stock”', 'Last column, right-aligned'],
  ['Footer', '“Showing 1–5 of 96 products” + Pagination', 'Products table only'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Value'] as const
export const tokens = [
  ['Container fill · border', 'background/surface/primary/default · border/primary/default', '#FFFFFF · 1px'],
  ['Container radius · padding', 'radius/L (bottom) · Padding/LG', '12 · 16 px'],
  ['Header row', 'background/surface/tertiary/default · border/primary/default · radius/MD · Padding/SM', '#F5F5F5 · 8 px'],
  ['Header label', 'Label/SM-Regular · text/primary/default', '12/16'],
  ['Column gap', 'Gap/LG', '12 px'],
  ['Row border', 'border/primary/default (bottom)', '1px'],
  ['Row padding · gap', 'Not tokenized', '12 · 12 px'],
  ['Primary cell text', 'Caption/SM-Strong · Label/SM-Default · text/primary/default', '12/16'],
  ['Secondary cell text', 'Body/SM-Regular · Caption/SM-Regular · text/tertiary/default', '12/16'],
  ['Row height', 'Not tokenized', '72 px'],
] as const

export const contextHeadings = ['Table', 'Columns', 'Title slot'] as const
export const context = [
  ['Needs Restock', 'Product · SKU & Bin · Stock · Status · Action (Add stock)', '80 Out · 160 Low · Show All'],
  ['Recent stock movements', 'Product · Type · Qty · Date', 'Tab (All · Inbound · Outbound) · View log'],
  ['Products', 'Product · SKU & Bin · Stock · Reserved · Incoming · Stock · Product status · … + pagination', 'Search · Tab with counts · Add product'],
] as const

export const guidelines = [
  ['Lead with the identifying column (product) and end with the row action.', 'Hide the row action in the middle of the row or show more than one action button per row.'],
  ['Right-align numbers when they are compared (Stock, Qty) and keep units in the header.', 'Mix formats in one column — e.g. “0 / Min 3” next to plain numbers.'],
  ['Use a Badge cell for status and plain text for secondary facts.', 'Use colored badges for neutral data such as supplier names when status badges are in the same row.'],
] as const

export const contentHeadings = ['Rule', 'Detail', 'Example'] as const
export const content = [
  ['Unique headers', 'The Products table has two columns called “Stock”; the second one holds status badges.', 'Stock → Status'],
  ['Short nouns', 'One or two words, no verbs.', 'SKU & Bin · Qty'],
  ['Consistent empty values', 'Use one placeholder for “no value” across tables.', '— (dash)'],
  ['Dates', 'Use one date format everywhere.', movementDate],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Table semantics (1.3.1)', 'Render as a real <table> with <th scope="col"> headers so screen readers announce column names for each cell.', 'Required'],
  ['Row actions', '“Add stock” and “…” repeat in every row — their accessible names must include the product (e.g. “Add stock for GeForce RTX 4070 Super”).', 'Required'],
  ['Secondary text contrast', 'Secondary cell text and “Inactive” use text/tertiary (2.52:1) — below 4.5:1.', 'Fail'],
  ['Images', 'Product thumbnails need alt text or should be marked decorative when the name is next to them.', 'Guideline'],
  ['Status not color alone', 'Status badges include text (Out Of Stock, Inbound) — color only reinforces it.', 'Pass'],
] as const

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Rows are not components', 'All tables', 'Rows are hand-built frames; their 12px padding and gap are raw values. A Table Row component (with hover and selected states) would tokenize them.', 'Warning'],
  ['Raw fill', 'Table Column · Type = Status', 'The Status variant has an unbound (raw) fill.', 'Warning'],
  ['Duplicate header', 'Products table', 'Two columns are labelled “Stock”.', 'Warning'],
  ['Fixed column widths', 'All tables', 'Column widths are set per header and per cell; changing one column means editing every row.', 'Warning'],
  ['Content-specific variants', 'Table Column', 'Types like “Reserved/Incoming” and “Empty Reserved/Incoming” describe content, not layout. Generic types (Text, Number, Badge, Media, Empty) would scale to new tables.', 'Info'],
  ['Confusing names', 'Table Section · Table Column', 'The header row frame is named “Card Title”; “Show Transfer Detail” does not explain what it shows; the footer text layer is named “Model”.', 'Info'],
  ['Missing states', 'Rows', 'No hover, selected or loading row states; no empty table state.', 'Warning'],
  ['Header alignment', 'Header slot', 'The header labels start at a different x offset in Needs Restock (1px) than in the other tables (9px).', 'Info'],
  ['Not tokenized', 'Row height · padding · marker positions', 'Row height (72), row padding and gap (12) have no tokens. Anatomy marker positions on this page are fixed values.', 'Not tokenized'],
] as const
