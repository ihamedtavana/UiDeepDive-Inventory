import type { BadgeTone } from './Badge'
import type { StatusTone } from './StatusBadge'

export const badgeDescription = 'Badges are small, non-interactive labels that show a status, a count or a short attribute next to the content they describe. Badge has seven tones; the related Status Indicator is a 16×8 color mark used in lists and legends.'
export const badgeSource = 'Source: component sets “Badge” and “Status Badges” on the 😍 Final page. Badges are not buttons — they never trigger an action.'
export const tonesDescription = 'Tone carries meaning — choose it by what the label says, not by the color you want. Contrast is the label text against the badge background.'
export const statusDescription = 'A 16×8 color mark (component “Status Badges”) used before a label in lists, legends and stat footers — e.g. sidebar shelves and the “In stock / Low / Out” stats. Always pair it with text.'
export const contextDescription = 'Badges on the Inventory Dashboard, grouped by tone. Labels are shown exactly as they appear today.'
export const auditDescription = 'Findings collected while documenting this component. Nothing has been changed in the component or tokens — these are suggestions for the team to review.'

export const metrics = [
  ['Badge tones', '7'],
  ['Badge instances on the dashboard', '37'],
  ['Status Indicator types', '5'],
  ['Status Indicator instances', '18'],
]

export const anatomy = [
  ['1', 'Container', '24px high · fill and 1px border from component/badge/filled/{Tone}/* · radius/SM · padding Padding/XS (vertical), Padding/SM (horizontal) · gap Gap/SM.'],
  ['2', 'Leading icon', 'Optional (Show Leading Icon). Reinforces the status, e.g. a check for Delivered.'],
  ['3', 'Label', 'Label/SM-Regular in the tone’s text-icon token. One to three words or a number.'],
  ['4', 'Trailing icon', 'Optional (Show Trailing Icon). Rarely needed — avoid chevrons, badges are not interactive.'],
]

export const properties = [
  ['Tone', 'Variant', 'Neutral · Gray · Brand · Info · Success · Warning · Error', 'Neutral'],
  ['Appearance', 'Variant', 'Filled (only option)', 'Filled'],
  ['Size', 'Variant', 'Medium (only option, 24px)', 'Medium'],
  ['Label', 'Text', 'Any short string', '“Text”'],
  ['Show Leading Icon', 'Boolean', 'true · false', 'true'],
  ['Leading Icon', 'Instance swap', 'Any icon from the Icon page', '—'],
  ['Show Trailing Icon', 'Boolean', 'true · false', 'true'],
  ['Trailing Icon', 'Instance swap', 'Any icon from the Icon page', '—'],
] as const

export const tones = [
  ['Neutral', '16 Shelves', 'Counts, metadata and neutral attributes.', 'component/badge/filled/Neutral/*', '16 Shelves · 96 SKUs · Synced 2 min ago', '17.18 : 1', 'AA'],
  ['Gray', 'Gray', 'Same tokens as Neutral today — see Audit.', 'component/badge/filled/Neutral/*', '—', '17.18 : 1', 'AA'],
  ['Brand', 'Loading', 'Brand-related or in-progress highlight.', 'component/badge/filled/Brand/*', 'Loading', '2.52 : 1', 'Fail'],
  ['Info', 'Info', 'Informational status.', 'component/badge/filled/Info/*', '—', '6.16 : 1', 'AA'],
  ['Success', 'Delivered', 'Positive or completed state; positive trend.', 'component/badge/filled/Success/*', 'Delivered · Inbound · +3.8%', '4.79 : 1', 'AA'],
  ['Warning', 'In Transit', 'Needs attention soon; partial state.', 'component/badge/filled/Warning/*', '2 Low · In Transit · 160 Low', '4.76 : 1', 'AA'],
  ['Error', 'Out Of Stock', 'Blocking problem or failure.', 'component/badge/filled/Error/*', 'Out Of Stock · 1 Out · 80 Out', '5.91 : 1', 'AA'],
] satisfies ReadonlyArray<readonly [Capitalize<BadgeTone>, string, string, string, string, string, 'AA' | 'Fail']>

export const indicators = [
  ['Green', 'feedback/success/secondary/background', 'In stock, healthy, ready', '4', 'success'],
  ['Yellow', 'feedback/warning/secondary/background', 'Low stock, in progress', '5', 'warning'],
  ['Red', 'feedback/error/secondary/background', 'Out of stock, not started', '5', 'error'],
  ['Brand', 'data-visualization/brand', 'Highlighted series in charts and legends', '3', 'brand'],
  ['Neutral', 'data-visualization/primary', 'Neutral legend item', '1', 'neutral'],
] satisfies ReadonlyArray<readonly [string, string, string, string, StatusTone]>

export const tokens = [
  ['Background', 'component/badge/filled/{Tone}/background/default', 'per tone'],
  ['Border', 'component/badge/filled/{Tone}/border/default', '1px · per tone'],
  ['Label & icon', 'component/badge/filled/{Tone}/text-icon/default', 'per tone'],
  ['Radius', 'radius/SM', '6 px'],
  ['Padding', 'Padding/XS (vertical) · Padding/SM (horizontal)', '4 · 8 px'],
  ['Gap', 'Gap/SM', '4 px'],
  ['Typography', 'Label/SM-Regular', '12 / 16 Regular'],
  ['Status Indicator', 'feedback/{status}/secondary/background · radius/2XS', '16 × 8 px'],
  ['Height', 'Not tokenized', '24 px'],
]

export const context = [
  ['Neutral', '16 Shelves · 4 · ⌘K · Inventory · Synced 2 min ago · 96 SKUs · 2,600 Slots · Atlas Components · SHP-2041 · PcGaming Digital · Order #10482 · From WH-02', '14'],
  ['Error', 'Out Of Stock (10) · 1 Out · 80 Out · Outbond (2)', '14'],
  ['Success', '+3.8% · +160 net · Inbound (3) · Delivered', '6'],
  ['Warning', '2 Low · 160 Low · In Transit', '3'],
  ['Brand', 'Loading', '1'],
] as const

export const guidelines = [
  ['Choose the tone from the meaning of the label (Out Of Stock → Error, Delivered → Success).', 'Use Error for normal states — “Outbound” is a regular movement type, not a failure.'],
  ['Keep labels to one to three words or a number.', 'Put sentences or actions inside a badge — badges are not buttons.'],
  ['Use the Status Indicator with a text label in lists and legends.', 'Use a Status Indicator alone to communicate status.'],
]

export const contentRules = [
  ['Number first', 'Lead with the number for counts.', '2 Low · 80 Out'],
  ['One case', 'Use sentence case consistently.', 'Out Of Stock → Out of stock'],
  ['Check spelling', '“Outbond” appears twice in the recent movements table.', 'Outbond → Outbound'],
  ['Pick the right component', 'Shortcuts (⌘K) and IDs (SHP-2041, Order #10482) are shown as Neutral badges. Consider a dedicated Keyboard key and Tag style.', '⌘K · SHP-2041'],
] as const

export const accessibility = [
  ['Contrast · status tones', 'Neutral, Info, Success, Warning and Error labels meet 4.5:1 on their backgrounds (see Tones).', 'Pass', 'success'],
  ['Contrast · Brand', 'Brand label is 2.52:1 on its tint — below 4.5:1.', 'Fail', 'error'],
  ['Not color alone (1.4.1)', 'The label must state the status; the tone only reinforces it. Status Indicators always need a text label.', 'Guideline', 'info'],
  ['Non-interactive', 'Badges should not be focusable or clickable. If it needs to be clickable, use a Button.', 'Guideline', 'info'],
  ['Live updates', 'Badges that change in real time (Synced 2 min ago, Loading) should be announced politely (aria-live) if the change matters.', 'Guideline', 'info'],
] satisfies ReadonlyArray<readonly [string, string, string, BadgeTone]>

export const audit = [
  ['Duplicate tone', 'Tone = Gray', 'Gray uses exactly the same component/badge/filled/Neutral/* tokens as Neutral. Remove it or give it its own tokens.', 'Warning', 'warning'],
  ['Wrong tone', '“Outbond” badges', 'Outbound movements use the Error tone. Outbound is a normal movement type — use Neutral or Info.', 'Warning', 'warning'],
  ['Typo', 'Recent stock movements', '“Outbond” should be “Outbound” (2 instances).', 'Warning', 'warning'],
  ['Contrast', 'Tone = Brand', '2.52:1 — fails AA for the 12px label.', 'Error', 'error'],
  ['Placeholder properties', 'Appearance · Size', 'Each has a single option (Filled, Medium). Remove them until a second option exists.', 'Info', 'info'],
  ['Defaults', 'Show Leading / Trailing Icon', 'Both icons are on by default; every dashboard instance turns them off.', 'Info', 'info'],
  ['Mixed roles', 'Neutral badges', 'Neutral badges are used for counts, IDs, shortcut keys and metadata. A Tag or Keyboard key style would separate these roles.', 'Info', 'info'],
  ['Status Indicator naming', 'Status Badges', 'Types are named by color (Red, Yellow, Green) instead of meaning (Error, Warning, Success); Brand uses a data-visualization token while the others use feedback tokens.', 'Info', 'info'],
  ['Not tokenized', 'Height · indicator size', 'Badge height (24) and indicator size (16×8) have no size tokens. Anatomy marker positions on this page are fixed values.', 'Not tokenized', 'warning'],
] satisfies ReadonlyArray<readonly [string, string, string, string, BadgeTone]>
