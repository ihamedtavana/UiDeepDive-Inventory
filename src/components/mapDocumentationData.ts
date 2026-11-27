export const description = 'The map on the right of the Switch Warehouse panel shows every warehouse and the routes between them. It is a family of five components: Map Canvas (static world map), Map Marker, Map Popover, Map Goods Dot (goods in transit) and Route Motion Demo (prototype of the route animation).'
export const overviewNote = 'Map Canvas (7699:7323, 1133×884, views Overview and Tokyo focus) is too large for this preview — see it in the Switch Warehouse screens. All other examples are untouched instances.'
export const metrics = [
  ['5', 'Components'],
  ['8', 'Marker variants'],
  ['8', 'Popover variants'],
  ['3', 'Switch screens'],
] as const

export const anatomyHeadings = ['Component', 'Size', 'Details'] as const
export const anatomy = [
  ['Map Canvas', '1133×884', 'Static world map + route arcs. View: Overview / Tokyo focus.'],
  ['Map Marker', '32×32', 'Hit area 32×32 with a centred brand dot (background/brand/primary/default, white 2px ring). Current adds an outer ring (border/accent-subtle); Focused adds the Focus Ring.'],
  ['Map Popover', '248×98', 'Name (Title/SM) · location (Caption/SM · text/tertiary) · Current badge (Brand) · stock badges · pointer. Placement: Above / Below / Right / Left.'],
  ['Map Goods Dot', '10×10', 'Small dot that travels along a route.'],
  ['Route Motion Demo', '360×120', '4 steps for Smart Animate: Start (fade in) · Mid-route · Arrive (fade out) · Pause.'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Map Canvas', 'View', 'Variant', 'Overview · Tokyo focus', 'Overview'],
  ['Map Marker', 'State', 'Variant', 'Default · Hover · Focused · Selected', 'Default'],
  ['Map Marker', 'Current', 'Variant', 'No · Yes', 'No'],
  ['Map Popover', 'Status', 'Variant', 'Current · Selected', 'Current'],
  ['Map Popover', 'Placement', 'Variant', 'Above · Below · Right · Left', 'Above'],
  ['Map Popover', 'Name · Location', 'Text', 'Any', 'New York Central · New York, United States'],
  ['Route Motion Demo', 'Step', 'Variant', '1 Start · 2 Mid-route · 3 Arrive · 4 Pause', '1 Start'],
  ['Map Goods Dot', '—', '—', 'No properties', '—'],
] as const

export const statesHeadings = ['Marker state', 'Dot', 'Ring'] as const
export const states = [
  ['Default', '11px brand dot', '—'],
  ['Hover', '13px', '—'],
  ['Focused', '—', 'Focus Ring (component/focus-ring/color)'],
  ['Selected', '14px', '—'],
  ['Current = Yes', 'Dot inside a white disc', 'border/accent-subtle/default, 1.5px'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Note'] as const
export const tokens = [
  ['Marker dot', 'background/brand/primary/default', '2.78:1 on the map'],
  ['Marker ring', 'Stroke bound to background/surface/primary/default', 'Background token used as a stroke'],
  ['Focus', 'component/focus-ring/color', '—'],
  ['Popover', 'background/surface/primary · border/primary · radius/L · radius/SM · Padding/MD / SM / XS · Gap/MD / SM', '4 paddings are raw 8px'],
  ['Popover badges', 'component/badge/filled/{Brand, Neutral, Warning, Error}/*', '—'],
] as const

export const contextIntro = 'Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance.'

export const contextHeadings = ['Variant', 'Example', 'Count'] as const
export const context = [
  ['Canvas · Overview', '01 Initial · 03 Selected on map', '2'],
  ['Canvas · Tokyo focus', '02 Selected from list', '1'],
  ['Marker · Default · No', 'Other warehouses — 01, 02, 03', '8'],
  ['Marker · Selected · No', '02 · 03', '2'],
  ['Marker · Selected · Yes', '01 Initial', '1'],
  ['Marker · Default · Yes', '03 Selected on map', '1'],
  ['Goods Dot', 'Along the routes — 01, 02, 03', '7'],
  ['Popover · Current · Above', '01 Initial', '1'],
  ['Popover · Selected · Above / Right', '02 · 03', '2'],
  ['Route Motion Demo', 'Not used (prototype only)', '0'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Alternative', 'The warehouse list is the accessible alternative to the map — keep it complete.', 'Pass'],
  ['Markers', 'Each marker is a button named by the warehouse; 32×32 hit area.', 'Required'],
  ['Marker contrast', 'Brand dot is 2.78:1 — just under 3:1 for graphics.', 'Fail'],
  ['Current vs Selected', 'The difference is a thin ring — add a shape or label.', 'Check'],
  ['Motion', 'Route animation must stop with prefers-reduced-motion.', 'Required'],
] as const

export const auditIntro = 'Findings collected while documenting this family. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'

export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Raw padding', 'Map Popover', '4 padding values (8px) are not linked to tokens.', 'Warning'],
  ['Layer names', 'Map Popover', '20 layers keep default names (Frame …).', 'Info'],
  ['Token misuse', 'Map Marker', 'The white ring stroke uses background/surface/primary/default.', 'Info'],
  ['Hard-to-see states', 'Map Marker', 'Default / Hover / Selected differ only by 2–3px in dot size.', 'Warning'],
  ['Hidden layers', 'Map Marker', '4 hidden layers inside the variants.', 'Info'],
  ['Prototype only', 'Route Motion Demo', '0 instances in screens; steps 1, 3 and 4 look the same (only opacity changes). Mark it “prototype only”.', 'Info'],
  ['Stock badges fixed', 'Map Popover', 'Same fixed “16 Shelves · 2 Low · 1 Out” text as the list card.', 'Warning'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const

export const guidelines = [
  ['Keep the map in sync with the list: selecting either one selects both.', 'Make the map the only way to choose a warehouse.'],
  ['Place the popover so it never covers the selected marker.', 'Let the popover run off the map edge.'],
  ['Keep route motion slow and subtle; pause between loops.', 'Animate all routes at once.'],
] as const
