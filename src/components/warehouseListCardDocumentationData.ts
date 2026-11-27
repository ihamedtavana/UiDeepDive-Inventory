export const description = 'Warehouse List Card is one warehouse in the Switch Warehouse panel: photo, name, location, stock badges and a Radio Button. The panel ends with the Switch Action Bar, which confirms the switch. All three components are documented here.'
export const overviewNote = 'Examples are untouched instances of Warehouse List Card (7697:7208) and Switch Action Bar (7699:7285) with the warehouse names used in the Switch Warehouse screens.'
export const metrics = [
  ['3', 'Components'],
  ['5', 'Card states'],
  ['15', 'Card instances'],
  ['3', 'Switch screens'],
] as const

export const anatomyHeadings = ['#', 'Part', 'Details'] as const
export const anatomy = [
  ['1', 'Card', '328×176 · background/surface/primary/default · border/primary/default · radius/L · Padding/MD · Gap/LG'],
  ['2', 'Photo', 'Warehouse image · radius/MD'],
  ['3', 'Name · location', 'Title/SM-Default · text/primary; Caption/SM-Regular · text/tertiary'],
  ['4', 'Current badge', 'Brand Badge “Current” (Is Current)'],
  ['5', 'Stock badges', '“16 Shelves” Neutral · “2 Low” Warning · “1 Out” Error · “All stocked” Success'],
  ['6', 'Radio Button', '20×20 · Off / On'],
] as const

export const actionAnatomyHeadings = ['Component', 'Parts'] as const
export const actionAnatomy = [
  ['Switch Action Bar', 'Warehouse icon · label (“Current / Selected warehouse”) · name · route “From › To” (Ready, Switching) · Cancel · “Switch to this warehouse” (disabled → primary → loading)'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Warehouse List Card', 'State', 'Variant', 'Default · Hover · Focused · Selected · Disabled', 'Default'],
  ['Warehouse List Card', 'Name · Location', 'Text', 'Any', 'New York Central · New York, United States'],
  ['Warehouse List Card', 'Is Current', 'Boolean', 'true / false', 'false'],
  ['Warehouse List Card', 'Show Low · Show Out · Show All Stocked', 'Boolean', 'true / false', 'true · true · false'],
  ['Radio Button', 'Selected', 'Variant', 'Off · On', 'Off'],
  ['Switch Action Bar', 'State', 'Variant', 'Same Warehouse · Ready · Switching', 'Same Warehouse'],
  ['Switch Action Bar', 'Warehouse · From', 'Text', 'Any', 'New York Central · New York Central'],
] as const

export const statesHeadings = ['State', 'Card', 'Notes'] as const
export const states = [
  ['Default', 'surface/primary · border/primary', 'Radio Off'],
  ['Hover', 'background/surface/primary/hover', '—'],
  ['Focused', 'Focus Ring', '—'],
  ['Selected', 'border/accent/default · Shadow/xs', 'Radio On'],
  ['Disabled', 'Name in text/tertiary', 'Stock badges removed, card 140px high'],
  ['Bar · Same Warehouse', '“Current warehouse”', 'Switch button disabled'],
  ['Bar · Ready', '“Selected warehouse” + route', 'Primary button enabled'],
  ['Bar · Switching', 'Spinner “Switching…”', 'Cancel disabled'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Note'] as const
export const tokens = [
  ['Card', 'background/surface/primary/* · border/primary · border/accent · radius/L · Padding/MD · Gap/LG / MD / SM', '—'],
  ['Badges', 'component/badge/filled/{Brand, Neutral, Warning, Error, Success}/*', 'Brand text 2.52:1'],
  ['Radio', 'border/strong-subtle/default (Off) · brand fill (On)', 'Off ring 2.52:1'],
  ['Action bar', 'background/surface/primary · /secondary · Button tokens · Title/SM · Caption/SM', '—'],
] as const

export const contextIntro = 'Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance.'

export const contextHeadings = ['Variant', 'Example', 'Count'] as const
export const context = [
  ['Card · Default', 'Other warehouses in the list — Switch Warehouse 01, 02, 03', '12'],
  ['Card · Selected', 'Selected warehouse — Switch Warehouse 01, 02, 03', '3'],
  ['Card · Hover · Focused · Disabled', 'Not used in screens', '0'],
  ['Radio · Off / On', 'Inside the cards', '0 (+12 / +3 nested)'],
  ['Bar · Same Warehouse', 'Switch Warehouse — 01 Initial', '1'],
  ['Bar · Ready', '02 Selected from list · 03 Selected on map', '2'],
  ['Bar · Switching', 'Not used in screens', '0'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Group', 'The list is a radiogroup (“Choose a warehouse”); each card is a radio named by the warehouse.', 'Required'],
  ['Radio ring', 'Off ring uses border/strong-subtle (2.52:1) — needs 3:1.', 'Fail'],
  ['Current badge', 'Brand badge text is 2.52:1.', 'Fail'],
  ['Location', 'Location uses text/tertiary (2.52:1).', 'Fail'],
  ['Progress', '“Switching…” should be announced (role="status").', 'Required'],
  ['Radio states', 'Radio Button has no Focused / Disabled state.', 'Check'],
] as const

export const auditIntro = 'Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Stock counts not editable', 'Warehouse List Card', '“16 Shelves”, “2 Low”, “1 Out” are fixed text, so all five warehouses show the same numbers. Add text properties.', 'Error'],
  ['Layout jump', 'State=Disabled', 'Badges disappear and the card shrinks from 176 to 140px.', 'Warning'],
  ['Focused ≈ Selected', 'Warehouse List Card', 'Both show an orange outline; only the radio tells them apart.', 'Info'],
  ['Same default values', 'Switch Action Bar', 'From and Warehouse both default to “New York Central”, so Ready shows “New York Central › New York Central”.', 'Info'],
  ['Radio Button scope', 'Radio Button', 'Only Off / On. Missing Hover, Focused and Disabled.', 'Info'],
  ['Layer names', 'Card · Bar', '5 + 3 layers keep default names (Frame …); 8 hidden layers in the card.', 'Info'],
  ['Contrast', 'Card · Radio', 'Brand badge, location and radio ring are below minimum.', 'Error'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const

export const guidelines = [
  ['Select a card first, then confirm with the action bar.', 'Switch warehouse on a single card click.'],
  ['Show real stock counts for each warehouse.', 'Repeat the same “16 Shelves · 2 Low · 1 Out” on every card.'],
  ['Keep the card height the same in every state.', 'Remove the badges in Disabled.'],
] as const
