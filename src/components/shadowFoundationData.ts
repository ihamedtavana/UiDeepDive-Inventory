export const shadowDescription = 'CoreTech is a flat system. Depth comes from surface colors and 1px borders, not from shadows. A single effect style — Shadow/xs — lifts small interactive elements such as buttons, the active menu item and the active tab just enough to feel touchable.'

export const shadowMetrics = [
  ['Effect style (Shadow/xs)', 1],
  ['Semantic elevation tokens', 5],
  ['Global shadow levels', 10],
  ['Layers using Shadow/xs', 42],
] as const

export const shadowProperties = [
  ['Color', 'xs/color', 'shadow/xs/color', 'rgba(0,0,0,0.04)'],
  ['Offset X', 'xs/offsetX', 'shadow/xs/offsetX', '0'],
  ['Offset Y', 'xs/offsetY', 'shadow/xs/offsetY', '1'],
  ['Blur', 'xs/radius', 'shadow/xs/radius', '2'],
  ['Spread', 'xs/spread', 'shadow/xs/spread', '0'],
] as const

export const shadowScale = [
  { name: 'none', detail: 'y 0 · blur 0' },
  { name: '2xs', detail: 'y 1 · blur 0' },
  { name: 'xs', detail: 'y 1 · blur 2' },
  { name: 'sm', detail: '2 layers · y 1 · blur 3', hasTwoLayers: true },
  { name: 'DEFAULT', detail: '2 layers · y 4 · blur 6', hasTwoLayers: true },
  { name: 'md', detail: '2 layers · y 10 · blur 15', hasTwoLayers: true },
  { name: 'lg', detail: '2 layers · y 20 · blur 25', hasTwoLayers: true },
  { name: 'xl', detail: '2 layers · y 20 · blur 25', hasTwoLayers: true },
  { name: '2xl', detail: 'y 25 · blur 50' },
  { name: 'inner', detail: 'y 2 · blur 4', isInset: true },
] satisfies ReadonlyArray<{ name: string; detail: string; hasTwoLayers?: boolean; isInset?: boolean }>

export const shadowDepth = [
  ['Page canvas', 'background/secondary', '—', 'None'],
  ['Main content panel', 'background/surface/primary/default', 'border/primary/default', 'None'],
  ['Section, card, table', 'background/surface/primary/default', 'border/primary/default', 'None'],
  ['Card title, table header', 'background/surface/tertiary/default', 'border/primary/default', 'None'],
  ['Raised control (button, active menu item, active tab)', 'background/surface/primary/default', 'border/primary/default', 'Shadow/xs'],
  ['Floating (chart tooltip)', 'surface per component', '—', 'Shadow/xs'],
] as const

export const shadowGuidelines = [
  ['Build structure with surface tokens and 1px borders; reserve Shadow/xs for raised interactive elements.', 'Add shadows to cards, sections or tables — the system is intentionally flat.'],
  ['Apply the Shadow/xs effect style so the shadow stays linked to tokens.', 'Create local shadows or apply global shadow tokens directly to layers.'],
  ['Ask for a new semantic elevation level before designing dropdowns, popovers or modals.', 'Stretch Shadow/xs to floating overlays — at 4% opacity it cannot separate layers.'],
] as const

export const shadowAccessibility = [
  ['Shadow is decorative', 'Shadow/xs (4% black) adds almost no contrast. It must never be the only thing that shows a control’s edge or state.', 'Guideline'],
  ['Non-text contrast (1.4.11)', 'border/primary/default on white is 1.19:1. Where a border is the only visible edge of an input (e.g. Search), WCAG asks for 3:1.', 'Review'],
  ['Focus', 'Focus must use component/focus-ring/color, not a shadow change.', 'Guideline'],
] as const

export const shadowAudit = [
  ['Duplicate level', 'shadow/lg · shadow/xl', 'shadow/xl has exactly the same values as shadow/lg (20/25/-5 and 8/10/-6). One of them is likely a copy-paste error.', 'Error'],
  ['Single semantic level', 'Semantic Elevation', 'Only xs is exposed. Overlays (dropdown, tooltip, modal) have no semantic elevation yet.', 'Warning'],
  ['Naming', 'xs/color, xs/offsetX …', 'Semantic elevation tokens have no namespace (e.g. elevation/xs/color) and are hard to find next to radius and spacing tokens.', 'Warning'],
  ['Inconsistent scope', 'xs/*', 'All five elevation tokens are scoped to ALL_SCOPES and appear in every property picker. Limit to Effect color / Effect float.', 'Warning'],
  ['Naming', 'shadow/DEFAULT · shadow/sm/color1', 'Uppercase DEFAULT and numbered layers (color1/color2) differ from the rest of the token naming.', 'Info'],
  ['Raw shadows', 'Top bar (old — hidden)', '4 local shadows live in the hidden legacy top bar. Remove the legacy layer to keep the file clean.', 'Info'],
  ['Not tokenized', 'Documentation visuals', 'Preview tile sizes (96×56 px) have no size tokens. Shadows, colors and radii in the previews are bound to tokens.', 'Not tokenized'],
] as const
