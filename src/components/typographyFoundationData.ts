const sizeTokens = {
  12: 'type/size/xs',
  14: 'type/size/sm',
  16: 'type/size/base',
  24: 'type/size/2xl',
}

const leadingTokens = {
  16: 'type/leading/1',
  20: 'type/leading/2',
  28: 'type/leading/4',
}

export const typographyWeights = {
  400: { label: 'Regular', token: 'type/weight/normal' },
  500: { label: 'Medium', token: 'type/weight/medium' },
  600: { label: 'SemiBold', token: 'type/weight/semibold' },
}

export const typeScale = [
  ['Display/LG', 'Display/LG', '1,240', 24, 28, 600, 12],
  ['Title/MD', 'Title/MD', 'New York Central', 16, 20, 600, 1],
  ['Title/SM-Default', 'Title/SM/default', 'Graphics Cards', 14, 20, 600, 45],
  ['Body/MD', 'Body/MD', 'Body text, medium', 14, 20, 500, 0],
  ['Label/MD-Default', 'Label/MD/default', 'View Shelf', 14, 20, 500, 26],
  ['Label/MD-Regular', 'Label/MD/regular', 'Overview', 14, 20, 400, 17],
  ['Title/SM-Regular', 'Title/SM/regular', 'Warehouse Overview', 14, 20, 400, 6],
  ['Caption/SM-Strong', 'Caption/SM/Strong', 'GPU-0107', 12, 16, 600, 56],
  ['Body/SM-Default', 'Body/SM/default', 'Available', 12, 16, 500, 54],
  ['Caption/SM-Default', 'Caption/SM/Default', 'Out Of Stock', 12, 16, 500, 6],
  ['Label/SM-Default', 'Label/SM/default', 'GeForce RTX 4070 Super', 12, 16, 500, 16],
  ['Body/SM-Regular', 'Body/SM/regular', 'Mid-Tower & Full-Tower', 12, 16, 400, 15],
  ['Caption/SM-Regular', 'Caption/SM/Regular', 'Total shelves', 12, 16, 400, 149],
  ['Label/SM-Regular', 'Label/SM/regular', 'Total Products', 12, 16, 400, 90],
] as const

export const typographyRoles = [
  ['Display', 'Display/LG', 'Key numbers and KPIs — the value a user should see first.', '“1,240” in Total Products, “75%” capacity'],
  ['Title', 'Title/MD · Title/SM-Default · Title/SM-Regular', 'Page, section and card titles; strong values inside cards.', '“New York Central”, “Warehouse Overview”, shelf names'],
  ['Label', 'Label/MD-* · Label/SM-*', 'Interactive and UI text — buttons, menu items, tabs, inputs, table cells.', '“View Shelf”, sidebar items, product names'],
  ['Body', 'Body/MD · Body/SM-*', 'Descriptive copy and secondary values; supporting text under titles.', '“Available”, “Mid-Tower & Full-Tower”'],
  ['Caption', 'Caption/SM-*', 'Smallest text — metadata, table headers, axis labels, codes and badges.', '“Total shelves”, “GPU-0107”, chart axis'],
] as const

export const typographyContext = [
  ['Card title', 'Total Products', 'Label/SM-Regular'],
  ['Trend badge', '+3.8%', 'Label/SM-Regular'],
  ['Main value', '1,240', 'Display/LG'],
  ['Unit', 'Products', 'Caption/SM-Regular'],
  ['Stat value', '1,921', 'Title/SM-Default'],
  ['Stat label', 'Available', 'Body/SM-Default'],
] as const

export const semanticTypographyTokens = typeScale.map(([style, path, , size, leading, weight]) => ({
  style,
  metrics: [
    [`${path}/Fontsize`, sizeTokens[size], size],
    [`${path}/Lineheight`, leadingTokens[leading], leading],
    [`${path}/Weight`, typographyWeights[weight].token, weight],
  ] as const,
}))

export const globalTypographyTokens = [
  ['type/family/roboto', 'Roboto', 'Fontname (all styles)'],
  [sizeTokens[12], 12, 'All SM styles'],
  [sizeTokens[14], 14, 'Title/SM, Label/MD, Body/MD'],
  [sizeTokens[16], 16, 'Title/MD'],
  [sizeTokens[24], 24, 'Display/LG'],
  [leadingTokens[16], 16, '12px styles'],
  [leadingTokens[20], 20, '14px and 16px styles'],
  [leadingTokens[28], 28, 'Display/LG'],
  [typographyWeights[400].token, 400, '*-Regular styles'],
  [typographyWeights[500].token, 500, '*-Default (Body, Label, Caption), Body/MD'],
  [typographyWeights[600].token, 600, 'Display, Title/MD, Title/SM-Default, Caption/SM-Strong'],
] as const

export const typographyGuidelines = [
  ['Apply a text style to every text layer, so size, line height and weight stay linked to tokens.', 'Set font size or weight by hand — 4 text layers on the dashboard currently have no style.'],
  ['Use Display/LG for the one key number in a card or summary row.', 'Use Display for titles or long text — it is reserved for numbers.'],
  ['Use Label styles for interactive text (buttons, tabs, menu items, table cells) and Caption for metadata.', 'Use Caption for buttons or links; 12px regular is too quiet for actions.'],
] as const

export const typographyAccessibility = [
  ['Minimum size', 'The smallest styles are 12px (all SM styles). Fine for metadata, labels and table cells; avoid 12px for paragraphs longer than two lines.', 'Review', 'warning'],
  ['Line height', 'Ratios: 12/16 = 1.33, 14/20 = 1.43, 16/20 = 1.25, 24/28 = 1.17. Containers must not clip text when a user increases line height to 1.5× (WCAG 1.4.12).', 'Check layouts', 'info'],
  ['Hierarchy', 'Hierarchy is created with size and weight, not color alone — titles stay readable in grayscale.', 'Pass', 'success'],
  ['Color contrast', 'Text styles carry no color. Pair them with text tokens; text/tertiary and text/accent fail 4.5:1 for 12–14px (see Color → Accessibility).', 'Review', 'warning'],
  ['Text resize', 'Use hug or auto-height text boxes so content reflows at 200% zoom; avoid fixed-height text containers.', 'Guideline', 'info'],
] as const

export const typographyAudit = [
  ['Duplicate styles', 'Body/SM-Regular · Label/SM-Regular · Caption/SM-Regular', 'All three are 12/16 Regular. Same for the *-Default trio (12/16 Medium), Title/SM-Regular = Label/MD-Regular (14/20 Regular) and Body/MD = Label/MD-Default (14/20 Medium). Either document the intent of each role or merge.', 'Warning', 'warning'],
  ['Unused style', 'Body/MD', 'Not used on the Inventory Dashboard. Confirm it is needed before documenting it as a core style.', 'Warning', 'warning'],
  ['Ambiguous naming', '*-Default', '“Default” means Medium in Body, Label and Caption but SemiBold in Title/SM-Default. Consider naming by weight (e.g. -Medium, -Semibold).', 'Warning', 'warning'],
  ['Inconsistent casing', 'Caption/SM/Regular/* vs Label/SM/regular/*', 'Token paths mix “Regular/Default/Strong” and “regular/default”. Pick one casing.', 'Warning', 'warning'],
  ['Missing suffix', 'Title/MD · Body/MD', 'Siblings carry a weight suffix (-Default, -Regular) but these two do not.', 'Info', 'info'],
  ['Unstyled text', 'Inventory Dashboard', '4 text layers have no text style applied, so they are not linked to typography tokens.', 'Error', 'error'],
  ['Not tokenized', 'Typeface specimen', 'The 64px “Aa” specimen uses a raw size (no style that large exists). Font family is still bound to Fontname. Used on this page only.', 'Not tokenized', 'warning'],
] as const
