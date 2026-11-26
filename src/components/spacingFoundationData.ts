export const spacingDescription = "Spacing keeps CoreTech dense but calm. All space comes from one 4px-based global scale, exposed through three semantic groups: Gap for space between siblings, Padding for space inside containers, and Layout for page-level structure. Use the semantic token that matches the job — never a raw number."

export const scaleDescription = "The global scale (spacing/0 → spacing/96) has 34 steps from 0 to 384px. CoreTech UI currently uses seven of them, all through semantic tokens. The bars below are bound to the tokens, so they always show the real value."

export const spacingScale = [
  ['0_5', 2, 'Gap/XS'],
  ['1', 4, 'Gap/SM · Padding/XS'],
  ['2', 8, 'Gap/MD · Padding/SM · Layout/Page-Gutter'],
  ['3', 12, 'Gap/LG · Padding/MD'],
  ['4', 16, 'Gap/XL · Padding/LG · Layout/Grid-Gap'],
  ['6', 24, 'Gap/2XL · Padding/XL'],
  ['8', 32, 'Gap/3XL · Layout/Section-Gap'],
] as const

export const gapDescription = "Gap tokens set the space between siblings in an auto-layout frame (itemSpacing)."

export const gapTokens = [
  ['Gap/XS', 2, 'spacing/0_5', 'Tightest pairing — icon + counter, label + indicator.', 13],
  ['Gap/SM', 4, 'spacing/1', 'Icon to label, inline items, chips inside a row.', 127],
  ['Gap/MD', 8, 'spacing/2', 'Default gap between related controls and list items.', 242],
  ['Gap/LG', 12, 'spacing/3', 'Between blocks inside a card (title, body, footer).', 57],
  ['Gap/XL', 16, 'spacing/4', 'Between cards in a row and between metric groups.', 23],
  ['Gap/2XL', 24, 'spacing/6', 'Between distinct groups inside a section.', 4],
  ['Gap/3XL', 32, 'spacing/8', 'Largest gap; prefer Layout/Section-Gap for sections.', 9],
] as const

export const paddingDescription = "Padding tokens set the space between a container edge and its content. Note: Padding is one step larger than Gap at the same size name (Gap/SM = 4, Padding/SM = 8)."

export const paddingTokens = [
  ['Padding/XS', 4, 'spacing/1', 'Compact controls — badges, tab buttons, small icon buttons.', 81],
  ['Padding/SM', 8, 'spacing/2', 'Buttons, menu items, inputs, card titles and table headers.', 336],
  ['Padding/MD', 12, 'spacing/3', 'Cards, table rows and dense containers.', 198],
  ['Padding/LG', 16, 'spacing/4', 'Section titles, section bodies and large panels.', 148],
  ['Padding/XL', 24, 'spacing/6', 'Spacious containers such as modals and empty states.', 0],
] as const

export const layoutDescription = "Layout tokens describe page-level structure and should be used only on page, panel and grid containers."

export const layoutTokens = [
  ['Layout/Page-Gutter', 8, 'spacing/2', 'Outer page padding and the gap between sidebar and main panel.', 4],
  ['Layout/Section-Gap', 32, 'spacing/8', 'Vertical space between page sections.', 1],
  ['Layout/Grid-Gap', 16, 'spacing/4', 'Gutter between columns and cards in a grid.', 4],
] as const

export const spacingContextDescription = "Where each token lives in the Inventory Dashboard structure — from the page edge down to a card title."

export const spacingContext = [
  ['Page edge, sidebar to main panel', 'Layout/Page-Gutter', '8 px'],
  ['Sidebar inner padding', 'Padding/SM', '8 px'],
  ['Sidebar groups', 'Gap/LG', '12 px'],
  ['Between page sections', 'Layout/Section-Gap', '32 px'],
  ['Section title padding', 'Padding/LG', '16 px'],
  ['Section body padding (top/bottom · sides)', 'Padding/LG · Padding/MD', '16 · 12 px'],
  ['Between overview cards', 'Gap/XL / Layout/Grid-Gap', '16 px'],
  ['Card padding', 'Padding/MD', '12 px'],
  ['Between card title and card body', 'Gap/LG', '12 px'],
  ['Card title padding', 'Padding/SM', '8 px'],
  ['Table header padding (vertical)', 'Padding/SM', '8 px'],
  ['Table row padding (vertical)', 'Padding/MD', '12 px'],
] as const

export const spacingGuidelines = [
  ['Use Gap tokens for itemSpacing and Padding tokens for container padding.', 'Use a Gap token as padding (or the reverse) just because the number matches.'],
  ['Pick the nearest semantic token and keep the layout on the scale.', 'Type a raw value — 191 spacing values on the dashboard are not linked to tokens.'],
  ['Use Layout/Section-Gap between sections and Layout/Page-Gutter at the page edge.', 'Use Gap/3XL or Gap/XL for page structure; layout tokens can change independently.'],
] as const

export const spacingAccessibility = [
  ['Target size (2.5.8)', 'Sidebar menu buttons (32px high) and icon buttons (32×32) meet the 24×24px minimum.', 'Pass'],
  ['Tab buttons', 'Segmented tab buttons are 24px high — exactly the minimum. Keep Gap/XS–SM between them and do not make them smaller.', 'Review'],
  ['Grouping', 'Larger gaps between groups than within them (e.g. Gap/LG inside cards, Layout/Section-Gap between sections) make structure readable without extra borders.', 'Pass'],
  ['Text spacing (1.4.12)', 'Padding must leave room for text to grow — use hug-height containers so increased line or letter spacing does not clip.', 'Guideline'],
] as const

export const spacingAuditDescription = "Findings collected while documenting this page. Nothing has been changed in the tokens — these are suggestions for the team to review."

export const spacingAudit = [
  ['Raw values', 'Inventory Dashboard', '191 spacing values are not bound to tokens — most common: itemSpacing 12 (37), 8 (33), 4 (27) and padding 2 (48), 12 (30). About 87% of spacing is tokenized.', 'Error'],
  ['Off-scale values', 'padding 9 · 36 · itemSpacing 114 · 141', 'Values outside the scale. The large gaps are likely fixed spacing used instead of “space between”.', 'Warning'],
  ['Missing token', '2px padding', 'Padding 2 is used 48 times but there is no 2px padding token (Padding/XS = 4). Add one or move those layers to 4.', 'Info'],
  ['Confusing size names', 'Gap/* vs Padding/*', 'Gap/SM = 4 while Padding/SM = 8 (same offset at every size). Easy to pick the wrong one; consider aligning names to values.', 'Warning'],
  ['Inconsistent scope', 'Gap/3XL', 'Scoped to ALL_SCOPES while every other spacing token is limited to Gap — it appears in radius, size and stroke pickers.', 'Warning'],
  ['Unused token', 'Padding/XL', 'Not used on the Inventory Dashboard.', 'Info'],
  ['Not tokenized', 'Documentation visuals', 'Demo block sizes (16, 24 px) have no size tokens. Bars, gaps and paddings in the demos are bound to the real spacing tokens.', 'Not tokenized'],
] as const
