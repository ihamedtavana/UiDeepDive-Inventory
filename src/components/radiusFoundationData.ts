export const radiusDescription = 'Radius gives CoreTech its soft, contained look. Eight semantic tokens — from none to full — cover every corner in the product. Larger containers get larger radii and every nested level steps down, so shapes stay concentric and calm.'
export const radiusScaleDescription = 'Each preview is bound to its token, so the shape always matches the current value. Every corner on the Inventory Dashboard uses one of these tokens — there are no raw radius values.'
export const radiusNestingDescription = 'Radius steps down at every nested level: main panel XL → section L → card title MD → badge SM → indicator 2XS. A child never has a larger radius than its parent. The demo below is built with the real tokens.'
export const radiusJoinedDescription = 'When two surfaces form one container, only the outer corners are rounded. On the dashboard, Section Card Title rounds its top corners with radius/L and the Table Section or section body below rounds only its bottom corners — together they read as one card.'
export const radiusAuditDescription = 'Findings collected while documenting this page. Nothing has been changed in the tokens — these are suggestions for the team to review.'

export const radiusScale = [
  ['radius/none', '0 px', 'radius/0', 'Square corners — full-bleed images, table cells, edges that touch another surface.', 'Unused'],
  ['radius/2XS', '2 px', 'radius/0_5', 'Tiny marks — status dots, legend indicators, progress segments.', '120'],
  ['radius/XS', '4 px', 'radius/1', 'Small data shapes such as chart bars.', '24'],
  ['radius/SM', '6 px', 'radius/1_5', 'Compact controls — badges, tab buttons, chart bar tracks.', '244'],
  ['radius/MD', '8 px', 'radius/2', 'Standard controls — inputs, search, menu items, card titles, thumbnails.', '316'],
  ['radius/L', '12 px', 'radius/3', 'Cards and sections — Section Card, Section Title, Table Section.', '92'],
  ['radius/XL', '16 px', 'radius/4', 'Largest container — the main content panel.', '4'],
  ['radius/full', '999 px', 'radius/Full', 'Pills and circles — avatars, profile container, percentage segments.', '2092'],
] as const

export const componentRadius = [
  ['Radius', '8 px', 'radius/MD', 'Component token used by Button for all sizes and hierarchies.', '156'],
] as const

export const nestingLevels = [
  ['Main content panel', 'radius/XL', '16 px'],
  ['Section card, section title, table section', 'radius/L', '12 px'],
  ['Card title, input, menu item, thumbnail', 'radius/MD', '8 px'],
  ['Badge, tab button', 'radius/SM', '6 px'],
  ['Chart bar', 'radius/XS', '4 px'],
  ['Status dot, indicator, progress segment', 'radius/2XS', '2 px'],
  ['Avatar, pill', 'radius/full', '999 px'],
] as const

export const radiusGuidelines = [
  ['Step the radius down one or more sizes each time you nest a surface.', 'Give a child the same or a larger radius than its parent — corners stop being concentric.'],
  ['Use radius/full for pills, avatars and dots.', 'Type 999 or another large number to make a pill.'],
  ['Use radius/none where a surface meets an edge or another surface.', 'Round corners that touch a neighbour — it creates gaps and visual noise.'],
] as const

export const radiusAccessibility = [
  ['Focus indicator', 'The focus ring (component/focus-ring/color) should follow the element’s radius so focus is clearly tied to the control.', 'Guideline'],
  ['Shape is not state', 'Rounded vs square must never be the only cue for selected or disabled — pair with color, border or text.', 'Guideline'],
  ['Small pills', 'radius/full on small targets must still keep the 24×24px target area (WCAG 2.5.8).', 'Review'],
] as const

export const radiusAudit = [
  ['Fully tokenized', 'Inventory Dashboard', 'Every corner radius on the dashboard is bound to a token — no raw values found.', 'Pass'],
  ['Naming', 'radius/L', 'Uses “L” while every other scale uses “LG” (Gap/LG, Padding/LG, Display/LG). Consider radius/LG.', 'Warning'],
  ['Component token naming', 'Radius (Component Tokens)', 'Used by Button 156 times but not namespaced like other component tokens. Consider component/button/radius.', 'Warning'],
  ['Inconsistent scope', 'radius/2XS', 'Scoped to ALL_SCOPES while the other radius tokens are limited to Corner radius.', 'Warning'],
  ['Code syntax', 'radius/XL', 'Only radius/XL has a Web code syntax (var(--semantic-radius-xl)); the other tokens have none. Add code syntax to all tokens before handoff.', 'Warning'],
  ['Unused token', 'radius/none', 'Not used on the Inventory Dashboard.', 'Info'],
  ['Mixed tokens', 'Chart bar', 'Chart bars use both radius/XS and radius/2XS. Pick one for consistency.', 'Info'],
  ['Not tokenized', 'Documentation visuals', 'Preview shape sizes (64×40, 16×8 px) have no size tokens. Radius, padding and colors in the demos are bound to tokens.', 'Not tokenized'],
] as const
