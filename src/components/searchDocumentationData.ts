export const searchDescription = "Search is a single-line input with a search icon, placeholder and an optional keyboard shortcut. CoreTech uses it in two places: global search in the sidebar (⌘K) and in-place filtering in table section titles."

export const searchSource = "Source: component set “Search” on the 😍 Final page. Note: the second example uses an illustrative placeholder (“Search products…”) — the dashboard currently shows “Search SKU, bin…” in both places."

export const metrics = [
  ["Variants (Expanded, Collapsed)", "2"],
  ["Properties", "5"],
  ["Instances on the dashboard", "2"],
  ["Interaction states designed", "0"],
] as const

export const anatomyHeadings = ["#", "Part", "Details"] as const
export const anatomy = [
  ["1", "Field", "background/surface/primary/default · 1px border/primary/default · radius/MD · padding Padding/MD (top, bottom, left), Padding/SM (right) · gap Gap/MD."],
  ["2", "Icon", "search-md, 16px, icon/primary/default (Show Icon, Icon swap)."],
  ["3", "Placeholder", "Label/SM-Regular in text/tertiary/default (Search Text). Describes what can be searched."],
  ["4", "Shortcut", "Neutral Badge showing ⌘K (Show Shortcut). Only for the global search."],
] as const

export const propertiesHeadings = ["Property", "Type", "Values", "Default"] as const
export const properties = [
  ["Layout", "Variant", "Expanded · Collapsed", "Expanded"],
  ["Search Text", "Text", "Placeholder text", "“Search SKU, bin…”"],
  ["Show Icon", "Boolean", "true · false", "true"],
  ["Icon", "Instance swap", "Any icon (default search-md)", "search-md"],
  ["Show Shortcut", "Boolean", "true · false", "true"],
] as const

export const variantsHeadings = ["Layout", "Preview", "Use"] as const
export const variants = [
  ["Expanded", "Search SKU, bin…", "Default. Global search in the sidebar (with ⌘K) and table search in section titles (without shortcut)."],
  ["Collapsed", "Search icon", "Icon-only trigger for narrow spaces, e.g. a collapsed sidebar. Opens the full search on click or ⌘K."],
] as const

export const tokensHeadings = ["Part", "Token", "Value"] as const
export const tokens = [
  ["Field fill", "background/surface/primary/default", "#FFFFFF"],
  ["Field border", "border/primary/default", "1px #EBEBEB"],
  ["Radius", "radius/MD", "8 px"],
  ["Padding", "Padding/MD (top, bottom, left) · Padding/SM (right)", "12 · 8 px"],
  ["Gap", "Gap/MD", "8 px"],
  ["Icon", "icon/primary/default", "16 px"],
  ["Placeholder", "Label/SM-Regular · text/tertiary/default", "12/16 · #A3A3A3"],
  ["Shortcut", "Badge · Tone Neutral", "⌘K"],
  ["Height", "Not tokenized", "36 (sidebar) · 32 (table)"],
] as const

export const contextHeadings = ["Where", "Configuration", "Behaviour"] as const
export const context = [
  ["Sidebar", "Expanded · 232×36 · shortcut ⌘K · “Search SKU, bin…”", "Global search across the warehouse"],
  ["Products section title", "Expanded · 232×32 · no shortcut · “Search SKU, bin…”", "Filters the products table in place"],
] as const

export const contentRulesHeadings = ["Rule", "Detail", "Example"] as const
export const contentRules = [
  ["Start with “Search”", "Then name the searchable objects.", "Search SKU, bin…"],
  ["End with an ellipsis", "Signals that the field is waiting for input.", "Search products…"],
  ["Be specific to the scope", "The table search only searches products.", "Search products…"],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["Label (1.3.1, 4.1.2)", "The field has no visible label. Use aria-label (e.g. “Search products”) and role=\"search\" on the global search.", "Required", "warning"],
  ["Placeholder contrast", "text/tertiary on white is 2.52:1 — placeholders should still meet 4.5:1.", "Fail", "error"],
  ["Field boundary (1.4.11)", "border/primary/default on white is 1.19:1 — the border is the only visible edge of the field and should reach 3:1.", "Fail", "error"],
  ["Focus visible", "No Focused state is designed.", "Missing", "error"],
  ["Shortcut", "⌘K must also be announced (aria-keyshortcuts) and work on Windows as Ctrl+K.", "Guideline", "info"],
] as const

export const auditDescription = "Findings collected while documenting this component. Nothing has been changed in the component or tokens — these are suggestions for the team to review."

export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["Missing states", "Search", "Only the empty state exists. Hover, Focused, Filled (with a typed value and clear button), Disabled and Loading are needed.", "Error", "error"],
  ["Contrast", "Placeholder · border", "Placeholder 2.52:1 and field border 1.19:1 on white.", "Error", "error"],
  ["Same placeholder", "Products section title", "The table search reuses “Search SKU, bin…” from the global search.", "Warning", "warning"],
  ["Two heights", "Dashboard instances", "The sidebar search is 36px high and the table search was resized to 32px. Consider a Size property.", "Info", "info"],
  ["Shortcut as Badge", "Show Shortcut", "⌘K is a Neutral Badge. A dedicated Keyboard key style would separate it from status badges.", "Info", "info"],
  ["Missing description", "Search", "The component set has no description in Figma.", "Info", "info"],
  ["Not tokenized", "Height · marker positions", "Field heights have no size tokens. Anatomy marker positions on this page are fixed values.", "Not tokenized", "warning"],
] as const

export const guidelines = [
  ["Write a placeholder that names what can be searched in that place.", "Reuse the same placeholder everywhere — the table search also says “Search SKU, bin…”."],
  ["Show the ⌘K shortcut only on the global search.", "Show a shortcut on table filters; one shortcut cannot open several fields."],
  ["Keep a visible or programmatic label in addition to the placeholder.", "Rely on the placeholder as the only label — it disappears when the user types."],
] as const
