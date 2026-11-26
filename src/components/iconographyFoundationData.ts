import type { BadgeTone } from './Badge'

export const iconographyDescription = 'CoreTech uses a single outline icon set: 24×24 masters with a 2px stroke, kept on the Icon page. Icons are placed as instances, resized to the slot (usually 16px), and colored with icon tokens so they follow the same hierarchy as text.'

export const iconLibraryMetrics = [
  ['Icons on the Icon page', '1,321'], ['Groups', '21'],
  ['Master size', '24 × 24'], ['Icons used on the dashboard', '39'],
] as const

export const iconLibraryGroups = [
  ['Layout', '63'], ['Charts', '49'], ['Security', '36'], ['Education', '31'],
  ['Development', '57'], ['Arrows', '92'], ['Finance & eCommerce', '79'], ['General', '193'],
  ['Alerts & feedback', '26'], ['Shapes', '25'], ['Users', '41'], ['Media & devices', '108'],
  ['Images', '29'], ['Communication', '58'], ['Editor', '104'], ['Time', '28'],
  ['Files', '57'], ['Maps & travel', '45'], ['Weather', '52'],
  ['Frame 1', '8', true], ['Hugicon Frame 2', '140', true],
] as const

export const iconSizes = [
  ['24 px', 'Illustrative category icons inside cards.', 'Hardware icons in Shelf cards (graphics-card, ram …)', '8'],
  ['20 px', 'Section title icons.', 'Section Card Title (home-02, package-search, truck-01)', '6'],
  ['16 px', 'Default UI icon — menu items, buttons, inputs, tabs, table actions.', 'Sidebar menu, buttons, search, chevrons', '51'],
  ['12 px', 'Inline status marks only.', 'Shipment progress (truck-01, check)', '3'],
] as const

export const iconColors = [
  ['icon/primary/default', 'Icons next to primary text; default for standalone icons.', '22', '--semantic-colors-icon-primary-default'],
  ['icon/secondary/default', 'Supporting icons — menu items, section titles, inputs.', '9', '--semantic-colors-icon-secondary-default'],
  ['icon/tertiary/default', 'Decorative or disabled icons only (fails 3:1 for meaningful icons).', '11', '--semantic-colors-icon-tertiary-default'],
  ['icon/accent/default', 'Active navigation item.', '1', '--semantic-colors-icon-accent-default'],
  ['icon/inverse/default', 'Icons on dark or brand-filled surfaces.', '3', '--semantic-colors-icon-inverse-default', '--semantic-colors-background-inverse'],
  ['component/button/filled/secondary/text-icon/default', 'Icons inside secondary buttons.', '16', '--component-button-filled-secondary-text-icon-default'],
  ['component/button/borderless/secondary/text-icon/default', 'Icons inside borderless buttons.', '4', '--component-button-borderless-secondary-text-icon-default'],
  ['component/button/filled/primary/text-icon/default', 'Icons inside the primary button.', '1', '--component-button-filled-primary-text-icon-default', '--component-button-filled-primary-background-default'],
  ['component/button/filled/secondary/text-icon/disabled', 'Icons inside disabled buttons.', '1', '--component-button-filled-secondary-text-icon-disabled'],
] as const

export const iconGuidelines = [
  ['Pair icons with a visible label in navigation and buttons.', 'Ship icon-only buttons without an accessible name or tooltip.'],
  ['Color icons with icon/* tokens that match the text level beside them.', 'Use brand orange on icons except for the active navigation item.'],
  ['Pick icons from the main outline groups on the Icon page and keep one family.', 'Mix in icons from the “Hugicon Frame 2” group — the style and stroke differ.'],
  ['Resize the instance from the 24px master to the slot size.', 'Detach an icon or edit its vectors to change it.'],
] as const

export const iconAccessibility = [
  ['Accessible names', 'Icon-only buttons need a label: top-bar messages, notifications and settings, the sidebar collapse button and the “…” row action (dots-horizontal).', 'Required', 'warning'],
  ['Non-text contrast (1.4.11)', 'Meaningful icons need 3:1. icon/secondary is 10.37:1 (pass); icon/tertiary is 2.52:1 and icon/accent is 2.78:1 (fail).', 'Review', 'error'],
  ['Decorative icons', 'Icons that repeat an adjacent label are decorative and should be hidden from screen readers (aria-hidden).', 'Guideline', 'info'],
  ['Not color alone', 'Status icons (e.g. shipment check) must be paired with text such as “Delivered”.', 'Guideline', 'info'],
] as const satisfies ReadonlyArray<readonly [string, string, string, BadgeTone]>

export const iconAudit = [
  ['Fully tokenized', 'Inventory Dashboard', 'All icon colors are bound to tokens and every icon comes from the local Icon page.', 'Pass', 'success'],
  ['Mixed icon families', 'Hugicon Frame 2', '140 icons from a different family sit next to the main set. Remove or move them to a separate page to avoid mixing styles.', 'Warning', 'warning'],
  ['Unnamed groups', 'Frame 1 · Hugicon Frame 2', 'Group names do not describe content. “Frame 1” holds the custom hardware icons — consider “Hardware”.', 'Info', 'info'],
  ['Missing keywords', '148 icons', 'The custom and Hugicon groups have no description keywords, so they are hard to find in the assets panel.', 'Info', 'info'],
  ['Stroke weight', 'Dashboard instances', 'Icons render with 1, 1.2 and 1.5px strokes depending on how they were scaled. Decide on scaled vs. fixed stroke so 16px icons look the same everywhere.', 'Warning', 'warning'],
  ['Contrast', 'icon/tertiary · icon/accent', '2.52:1 and 2.78:1 on white — below 3:1 for meaningful icons.', 'Error', 'error'],
  ['No size tokens', 'Icon sizes', '12, 16, 20 and 24px are used but there are no icon size tokens.', 'Info', 'info'],
  ['Not tokenized', 'Documentation visuals', 'Tile and preview sizes (124px tiles, icon sizes) are fixed values. Icon colors, paddings and radii are bound to tokens.', 'Not tokenized', 'warning'],
] as const satisfies ReadonlyArray<readonly [string, string, string, string, BadgeTone]>
