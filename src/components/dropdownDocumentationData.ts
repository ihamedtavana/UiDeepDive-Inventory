export const description = "Dropdown is the compact select used in the Shelf header to switch section (“Section A”). It is made of three components: Dropdown (the trigger), Dropdown Option (one row) and Dropdown Menu Base (the open list)."
export const overviewNote = "Examples are untouched instances of Dropdown (8446:23462) and Dropdown Menu Base (8448:24289). The first one uses the label from the Shelf screen."
export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."
export const auditIntro = "Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const metrics = [
  ["3", "Components"],
  ["3 + 5", "Trigger + option states"],
  ["1", "Dropdown in screens (nested)"],
  ["0", "Menu Base instances"],
] as const

export const anatomyHeadings = ["Component", "Part", "Details"] as const
export const anatomy = [
  ["Dropdown", "Trigger", "155×32 · background/surface/primary/default · border/primary/default · Radius (button token) · Padding/SM–MD · Gap/MD · Shadow/xs"],
  ["Dropdown", "Leading icon · label · chevron", "16px icon (default “plus”) · Label/MD-Default · text/primary/default · chevron flips when Open"],
  ["Dropdown Option", "Row", "32px · Padding/SM–MD · Gap/MD · Radius · optional leading icon · Label/MD-Default"],
  ["Dropdown Menu Base", "Menu", "200 wide · background/surface/primary/default · border/primary/default · radius/MD · Padding/XS · Gap/SM · 4 options"],
] as const

export const propertiesHeadings = ["Component", "Property", "Type", "Values", "Default"] as const
export const properties = [
  ["Dropdown", "State", "Variant", "Default · Focused · Open", "Default"],
  ["Dropdown", "Label", "Text", "Any", "“Select option”"],
  ["Dropdown", "Leading Icon / Show Leading Icon", "Swap · Boolean", "Any icon · true/false", "plus · true"],
  ["Dropdown Option", "State", "Variant", "Default · Hover · Pressed · Focused · Disabled", "Default"],
  ["Dropdown Option", "Label", "Text", "Any", "“Option”"],
  ["Dropdown Option", "Leading Icon / Show Leading Icon", "Swap · Boolean", "Any icon · true/false", "plus · true"],
  ["Dropdown Menu Base", "—", "—", "No properties", "—"],
] as const

export const statesHeadings = ["State", "Background", "Text"] as const
export const states = [
  ["Trigger · Default / Focused / Open", "surface/primary · border/primary (+ Focus Ring when Focused)", "text/primary"],
  ["Option · Default", "none", "text/primary"],
  ["Option · Hover", "background/surface/primary/hover", "text/primary"],
  ["Option · Pressed", "background/surface/primary/pressed", "text/primary"],
  ["Option · Focused", "Focus Ring", "text/primary"],
  ["Option · Disabled", "none", "text/tertiary"],
] as const

export const tokensHeadings = ["Part", "Token", "Note"] as const
export const tokens = [
  ["Surfaces", "background/surface/primary/default · /hover · /pressed", "—"],
  ["Border · radius", "border/primary/default · Radius · radius/MD", "Radius is the Button component token"],
  ["Spacing", "Padding/XS · Padding/SM · Padding/MD · Gap/SM · Gap/MD", "—"],
  ["Text", "Label/MD-Default · text/primary · text/tertiary", "—"],
  ["Icons", "Stroke bound to text/primary/default", "Should be an icon token"],
  ["Shadow", "Shadow/xs on trigger and options", "Options have no fill"],
] as const

export const contextHeadings = ["Variant", "Example", "Count"] as const
export const context = [
  ["Dropdown · Default", "Inside Shelf Header (“Section A”)", "0 (+1 nested)"],
  ["Dropdown · Focused · Open", "Not used in screens", "0"],
  ["Dropdown Option (all states)", "Not used in screens", "0"],
  ["Dropdown Menu Base", "Not used in screens", "0"],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["Pattern", "Trigger is a button with aria-haspopup=\"listbox\" and aria-expanded; options are role=\"option\".", "Required"],
  ["Selected option", "No Selected state — aria-selected has nothing to map to.", "Fix"],
  ["Keyboard", "Arrow keys move between options; Esc closes and returns focus to the trigger.", "Required"],
  ["Focus", "Trigger and options have a Focused state.", "Pass"],
  ["Target size", "32px rows.", "Pass"],
] as const

export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["Menu Base not used", "Dropdown Menu Base", "0 instances — the open menu in the screens is not built from it.", "Warning"],
  ["No selected option", "Dropdown Option", "There is no Selected / Checked state.", "Warning"],
  ["Missing trigger states", "Dropdown", "No Hover, Disabled or Error state.", "Info"],
  ["Shadow on transparent rows", "Dropdown Option", "Options carry Shadow/xs but have no background (same issue as Ghost buttons).", "Info"],
  ["Token misuse", "All three", "Icon strokes use text/primary/default; the trigger borrows the Button “Radius” token.", "Warning"],
  ["Odd default icon", "Dropdown · Option", "Leading icon defaults to “plus” and is on by default.", "Info"],
  ["Two selects", "Input Field vs Dropdown", "Input Field (with chevron) and Dropdown are both selects. Document when to use each.", "Info"],
  ["No descriptions", "All three", "None of the three has a component description.", "Info"],
  ["Not tokenized", "Preview spacing", "Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.", "Not tokenized"],
] as const

export const guidelines = [
  ["Use Dropdown for short lists (2–7 items) that switch the view in place.", "Use it inside forms — use Input Field (select) there."],
  ["Show the current value as the label (“Section A”).", "Keep “Select option” after something is chosen."],
  ["Mark the current option in the open menu.", "Open a menu with no sign of the current choice."],
] as const
