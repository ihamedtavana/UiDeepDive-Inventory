export const buttonDescription = 'Buttons trigger actions. CoreTech has one Button component with two types (Button and Icon Button), two hierarchies (Primary, Secondary), two appearances (Filled, Ghost), two sizes (Small 32, Medium 40) and five states. Use the variant whose emphasis matches the importance of the action.'

export const overviewSource = 'Source: component set “Button” on the 😍 Final page. Set description: “Button and Icon Button. Hierarchy = Primary / Secondary; Appearance = Filled / Ghost; Size = Small (32) / Medium (40); State = Default / Hover / Pressed / Focused / Disabled.”'

export const metrics = [
  ['Variants', '80'],
  ['Variant properties', '5'],
  ['Instances on the dashboard', '39'],
  ['Most used: Secondary · Filled · Small', '15'],
] as const

export const anatomy = [
  ['1', 'Container', 'Fill and border from component/button/* tokens · radius Radius (8) · padding Padding/SM (vertical), Padding/MD (horizontal) · gap Gap/MD.'],
  ['2', 'Leading icon', 'Optional 16px icon (Show Leading Icon). Use for a verb-reinforcing glyph such as plus or upload.'],
  ['3', 'Label', 'Label/MD-Default, colored with the text-icon token of the variant.'],
  ['4', 'Trailing icon', 'Optional 16px icon (Show Trailing Icon). Use for chevrons on menus and disclosures.'],
  ['5', 'Focus ring', 'Visible only in the Focused state; colored with component/focus-ring/color.'],
] as const

export const properties = [
  ['Type', 'Variant', 'Button · Icon Button', 'Button'],
  ['Hierarchy', 'Variant', 'Primary · Secondary', 'Primary'],
  ['Appearance', 'Variant', 'Filled · Ghost', 'Filled'],
  ['Size', 'Variant', 'Small (32px) · Medium (40px)', 'Small'],
  ['State', 'Variant', 'Default · Hover · Pressed · Focused · Disabled', 'Default'],
  ['Label', 'Text', 'Any string', '“Button”'],
  ['Show Leading Icon', 'Boolean', 'true · false', 'true'],
  ['Leading Icon', 'Instance swap', 'Any 24px icon from the Icon page', '—'],
  ['Show Trailing Icon', 'Boolean', 'true · false', 'true'],
  ['Trailing Icon', 'Instance swap', 'Any icon — also the glyph of Icon Button', '—'],
  ['Show Badge', 'Boolean', 'Notification dot on Icon Button', 'false'],
] as const

export const variantsDescription = 'Hierarchy sets emphasis (Primary = brand, Secondary = neutral). Appearance sets weight (Filled has a container, Ghost has none until hover). Medium (40px) is for page-level actions such as the page header; Small (32px) is the default.'

export const variantHeadings = [
  'Hierarchy · Appearance',
  'Button · Small (32)',
  'Button · Medium (40)',
  'Icon · Small',
  'Icon · Medium',
] as const

export const statesDescription = 'Every variant has the same five states. Focused shows the focus ring; Disabled removes color and fill so the button reads as unavailable.'

export const stateHeadings = [
  'Hierarchy · Appearance',
  'Default',
  'Hover',
  'Pressed',
  'Focused',
  'Disabled',
] as const

export const tokensDescription = 'Button colors come from component tokens (see Foundations → Color → Component Tokens for every value). Spacing, radius and type come from shared tokens.'

export const tokens = [
  ['Background', 'component/button/{filled|borderless}/{primary|secondary}/background/{state}', 'per state'],
  ['Border', 'component/button/filled/secondary/border/{state} · filled/primary/border/disabled', '1px'],
  ['Label & icon', 'component/button/{filled|borderless}/{primary|secondary}/text-icon/{default|disabled}', 'per state'],
  ['Focus ring', 'component/focus-ring/color', '#FA7324'],
  ['Radius', 'Radius (component token) → radius/MD', '8 px'],
  ['Padding', 'Padding/SM (vertical) · Padding/MD (horizontal)', '8 · 12 px'],
  ['Gap', 'Gap/MD', '8 px'],
  ['Typography', 'Label/MD-Default', '14 / 20 Medium'],
  ['Elevation', 'Shadow/xs — Secondary variants', '0 1 2 · 4%'],
  ['Height', 'Not tokenized', '32 / 40 px'],
  ['Icon size', 'Not tokenized', '16 px'],
] as const

export const contextDescription = 'How Button is used on the Inventory Dashboard today.'

export const context = [
  ['Secondary · Filled · Small', '“View Shelf” on shelf cards, “Add stock” in the restock table, “11 SKUs need restock”', '15'],
  ['Icon · Secondary · Filled · Small', 'Top bar utilities and the “…” row action in the products table', '9'],
  ['Secondary · Ghost · Small', 'Pagination page numbers (2, 3, …, 12)', '4'],
  ['Icon · Secondary · Ghost · Small', 'Section collapse chevrons in section titles', '4'],
  ['Primary · Ghost · Small', '“Show All”, “View log”, “View All”', '3'],
  ['Primary · Filled · Small', '“New Movement” in the top bar, “Add product”', '2'],
  ['Secondary · Filled · Medium', '“Export” in the page title bar', '1'],
  ['Icon · Secondary · Filled · Small · Disabled', 'Disabled icon action', '1'],
] as const

export const guidelines = [
  ['Use one Primary · Filled button per view for the main action (e.g. “New Movement”).', 'Place several Primary · Filled buttons side by side — users lose the main action.'],
  ['Use Secondary · Filled for repeated actions in cards and tables (“View Shelf”, “Add stock”).', 'Use Primary for actions that repeat in every row or card.'],
  ['Use Ghost for inline, low-emphasis actions such as “Show All” in a section title.', 'Use Ghost for the main page action — it has no container and is easy to miss.'],
  ['Give every Icon Button a tooltip and accessible name.', 'Use an Icon Button when the icon’s meaning is not obvious — use a labelled Button instead.'],
] as const

export const contentRules = [
  ['Start with a verb', 'Say what happens when the button is pressed.', 'Add stock · Export · View shelf'],
  ['Keep it short', 'One to three words; no punctuation.', 'Show all'],
  ['Use one case', 'The dashboard mixes Title Case and sentence case. Pick one (sentence case recommended) and apply it everywhere.', 'View Shelf → View shelf'],
  ['Be specific in repeated actions', 'When the same button repeats, the surrounding row or card must make the target clear for screen readers.', '“Add stock” + product name in aria-label'],
] as const

export const accessibility = [
  ['Target size (2.5.8)', 'Small is 32×32px and Medium 40×40px — above the 24×24px minimum.', 'Pass', 'success'],
  ['Contrast · Secondary', 'Label on Secondary · Filled is 17.93:1.', 'Pass', 'success'],
  ['Contrast · Primary Filled', 'White label on brand orange is 2.78:1 — below 4.5:1 for a 14px Medium label.', 'Fail', 'error'],
  ['Contrast · Primary Ghost', 'Orange label on white is 2.78:1 — below 4.5:1.', 'Fail', 'error'],
  ['Focus visible (2.4.7)', 'Focused state shows a focus ring in component/focus-ring/color around the button.', 'Pass', 'success'],
  ['Accessible name (4.1.2)', 'Icon Buttons need an aria-label; repeated buttons (“View Shelf”) should include the target in the label.', 'Required', 'warning'],
  ['Disabled', 'Disabled buttons are exempt from contrast rules but should explain why they are unavailable where possible.', 'Guideline', 'info'],
] as const

export const auditDescription = 'Findings collected while documenting this component. Nothing has been changed in the component or tokens — these are suggestions for the team to review.'

export const audit = [
  ['Contrast', 'Primary · Filled / Ghost', '2.78:1 and 2.78:1 — both fail AA for the label. Consider brand/600 for the filled background and Ghost text.', 'Error', 'error'],
  ['Naming mismatch', 'Appearance = Ghost', 'The variant is called “Ghost” but its tokens are called “borderless”. Align the names.', 'Warning', 'warning'],
  ['Shadow on Ghost', 'Secondary · Ghost (Default, Hover), Icon · Ghost', 'Ghost variants carry Shadow/xs although they have no container in the default state.', 'Warning', 'warning'],
  ['Label casing', 'Dashboard instances', '“View Shelf”, “Show All”, “New Movement” use Title Case; “Add stock”, “View log” use sentence case.', 'Warning', 'warning'],
  ['Size by fixed height', 'Size = Medium', 'Small and Medium use the same padding tokens; Medium is 40px only because of a fixed height.', 'Info', 'info'],
  ['Unused padding', 'Type = Icon Button', 'Icon Button has Padding/MD bound horizontally but a fixed 32/40px width, so the padding has no effect.', 'Info', 'info'],
  ['Defaults', 'Show Leading / Trailing Icon', 'Both icons are on by default; almost every instance turns them off. Consider default = false.', 'Info', 'info'],
  ['Component token naming', 'Radius', 'The radius token is not namespaced (component/button/radius would match the color tokens).', 'Info', 'info'],
  ['Not tokenized', 'Height · icon size', 'Button heights (32, 40) and icon size (16) have no size tokens. Anatomy marker positions on this page are fixed values.', 'Not tokenized', 'warning'],
] as const
