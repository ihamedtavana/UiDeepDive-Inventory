export const description = 'Sidebar is the left navigation of the dashboard. It is assembled from seven components: Sidebar (the whole panel, Expanded / Collapsed), Sidebar - Logo, Sidebar - Warehouse Card, Search, Sidebar - Main Menu, Sidebar - Shelves, Sidebar - Menu Button (every row) and Sidebar - Border Spacing (the dividers).'
export const overviewNote = 'All examples are untouched instances. Search is documented on its own page (C4).'
export const contextIntro = 'Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance.'
export const auditIntro = 'Findings collected while documenting this family. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'

export const metrics = [
  ['7', 'Components'],
  ['2', 'Layouts (Expanded / Collapsed)'],
  ['102', 'Menu Button instances in screens'],
  ['6', 'Screens using the Sidebar'],
] as const

export const anatomyHeadings = ['#', 'Part', 'Component', 'Details']
export const anatomy = [
  ['1', 'Logo + collapse', 'Sidebar - Logo', '“CoreTech” Title/MD · brand mark · collapse Icon Button'],
  ['2', 'Warehouse', 'Sidebar - Warehouse Card', 'Photo · “Warehouse” label · name · stock badges · “Switch Warehouse” row with counter'],
  ['3', 'Search', 'Search', '⌘K global search (C4)'],
  ['4', 'Main Menu', 'Sidebar - Main Menu', 'Group label + 7 Menu Buttons (Overview … Reports & Analytics)'],
  ['5', 'Shelves', 'Sidebar - Shelves', 'Group label + 8 Menu Buttons with status badge and shelf code (A1 … C2)'],
  ['6', 'Capacity card', '(no component)', '“Warehouse…” card with 75% capacity bar and “11 SKUs need restock” — built inline'],
  ['7', 'Footer', 'Sidebar - Menu Button', 'Setting · Help & Support'],
  ['—', 'Dividers', 'Sidebar - Border Spacing', '232×2 line between groups'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default']
export const properties = [
  ['Sidebar', 'State', 'Variant', 'Expanded · Collapsed', 'Expanded'],
  ['Sidebar - Main Menu / Shelves / Logo', 'Layout', 'Variant', 'Expanded · Collapsed', 'Expanded'],
  ['Sidebar - Logo', 'Title', 'Text', 'Any', '“CoreTech”'],
  ['Sidebar - Warehouse Card', 'Warehouse Name', 'Text', 'Any', '“New York Central”'],
  ['Sidebar - Menu Button', 'Status · Layout', 'Variant', 'Default · Active · Hover × Expanded · Collapsed', 'Default · Expanded'],
  ['Sidebar - Menu Button', 'Menu Button Text · Counter', 'Text', 'Any', '“Products” · “96”'],
  ['Sidebar - Menu Button', 'Icon · Show Icon · Show Counter · Show Status Badge', 'Swap · Boolean', '—', 'package · true · true · true'],
  ['Sidebar - Border Spacing', '—', '—', 'No properties', '—'],
] as const

export const statesHeadings = ['State', 'Background', 'Text / icon']
export const states = [
  ['Default', 'none', 'text/secondary · icon/secondary'],
  ['Hover', 'background/surface/secondary/default', 'text/secondary'],
  ['Active', 'background/surface/primary + Shadow/xs', 'Accent icon, text/primary'],
  ['Collapsed', 'Icon only (or status badge + code for shelves)', 'Label hidden — see Accessibility'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Note']
export const tokens = [
  ['Panel', 'background/surface/secondary/default · Padding/SM · Gap/LG', '—'],
  ['Menu Button', 'Padding/SM · Padding/MD · Gap/MD · radius/MD · Label/MD-Regular · text/secondary · icon/secondary', 'Counter: Caption/SM-Regular · text/tertiary'],
  ['Status badge', 'feedback/error/secondary/background (default red) · radius/2XS', 'Set per shelf'],
  ['Warehouse Card', 'background/surface/primary · border/primary · radius/L · Shadow/xs · Badge tokens', '—'],
  ['Logo', 'background/brand/primary/default · background/primary · radius/L', 'background/primary is outside background/surface/…'],
  ['Divider', 'border/primary/default', '—'],
] as const

export const contextHeadings = ['Variant', 'Example', 'Count']
export const context = [
  ['Sidebar · Expanded', 'Inventory Dashboard — New York Central · Switch Warehouse 04', '2'],
  ['Sidebar · Collapsed', 'Final Design - Collapsed · Switch Warehouse 01, 02, 03', '4'],
  ['Logo · Main Menu · Shelves', 'Inside every Sidebar (Expanded / Collapsed)', '0 (+6 each)'],
  ['Menu Button · Default', 'Every menu and shelf row inside the Sidebar', '0 (+96 nested)'],
  ['Menu Button · Active', '“Overview” in each Sidebar', '0 (+6 nested)'],
  ['Menu Button · Hover', 'Not used in screens', '0'],
  ['Warehouse Card', 'Inside the expanded Sidebar', '0 (+2 nested)'],
  ['Border Spacing', 'Dividers inside the Sidebar, plus 3 direct uses', '3 (+26 nested)'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status']
export const accessibility = [
  ['Landmark', 'Wrap in <nav aria-label="Main">; group headings (“Main Menu”, “Shelves”) as list labels.', 'Required'],
  ['Current page', 'Active item needs aria-current="page".', 'Required'],
  ['Collapsed labels', 'Collapsed items are icon-only — they need aria-label and a tooltip.', 'Required'],
  ['Shelf status', 'Red / yellow / green bars carry meaning with color only.', 'Fix'],
  ['Counters · labels', 'Counters, “Warehouse” and group labels use text/tertiary (2.52:1).', 'Fail'],
  ['Target size', 'Rows are 32px high.', 'Pass'],
] as const

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity']
export const audit = [
  ['Shelf name mismatch', 'Sidebar - Shelves', '“Graphic Cards” here, “Graphics Cards” in Shelf Card, Shelf Header and Bin Picker.', 'Error'],
  ['Capacity card not a component', 'Sidebar', 'The “Warehouse…” capacity card at the bottom is built inline, and its title is cut off (“Warehouse…”).', 'Warning'],
  ['Fixed stock badges', 'Sidebar - Warehouse Card', '“16 Shelves · 2 Low · 1 Out” is fixed text (same issue as Warehouse List Card).', 'Warning'],
  ['Layer names', 'Sidebar', '46 layers keep default names (Frame …) — plus 10 in Logo, 5 in Warehouse Card.', 'Info'],
  ['Raw padding', 'Sidebar', '2 padding values (4px) are not linked to tokens.', 'Info'],
  ['Property naming', 'Sidebar vs parts', 'The panel uses “State”, its parts use “Layout” for the same Expanded / Collapsed choice.', 'Info'],
  ['No Focused state', 'Sidebar - Menu Button', 'Default / Hover / Active only.', 'Warning'],
  ['No descriptions', 'All seven', 'None has a component description.', 'Info'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const

export const guidelines = [
  ['Keep one Active item that matches the current page.', 'Mark more than one item Active.'],
  ['Use the shelf code (A1, B2) next to the shelf name.', 'Show shelf status by color only.'],
  ['Use the same shelf names as the rest of the product.', 'Write “Graphic Cards” here and “Graphics Cards” elsewhere.'],
] as const
