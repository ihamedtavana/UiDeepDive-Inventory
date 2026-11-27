export const description = 'Quantity Stepper is the − / + quantity field of the Add Stock panel. Under it, Quantity Preset chips set common amounts in one tap (Fill bin, To minimum, +5, +10, +20). Both are documented here because they always appear together.'
export const source = "Examples are untouched instances of “Quantity Stepper” (5970:81216) and “Quantity Preset” (6672:11628) with the values used in the Add Stock flow. Preset counts include the ones reused as bin cells inside Bin Picker (see Audit)."
export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."
export const auditIntro = "Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const metrics = [
  ["6", "Stepper states"],
  ["5", "Preset states"],
  ["9", "Stepper instances"],
  ["76", "Preset instances"],
] as const

export const anatomyHeadings = ["#", "Part", "Details"] as const
export const anatomy = [
  ["1", "Field", "320×56 · background/surface/primary/default · border/primary/default · radius/MD · Padding/SM–MD"],
  ["2", "Decrease (−)", "Icon-only control · component/button/borderless/secondary/text-icon/* · Radius"],
  ["3", "Value", "Display/LG. text/tertiary when empty (Default), text/primary when filled."],
  ["4", "Unit", "“units” · Label/MD-Regular · text/tertiary/default. Fixed text — not a property."],
  ["5", "Increase (+)", "Same as Decrease."],
  ["6", "Helper", "Caption/SM-Regular · text/tertiary/default; feedback/error/primary/text in Error. Shows the bin capacity."],
] as const

export const presetAnatomyHeadings = ["#", "Preset part", "Details"] as const
export const presetAnatomy = [
  ["1", "Container", "32px high · Padding/MD · Gap/XS · Radius · component/button/filled/secondary/* tokens"],
  ["2", "Text", "Label/MD-Default — the action (Fill bin, To minimum, +5)."],
  ["3", "Value", "Optional “· 24” — the amount the action will set. Hidden for +N presets."],
] as const

export const propertiesHeadings = ["Component", "Property", "Type", "Values", "Default"] as const
export const properties = [
  ["Quantity Stepper", "State", "Variant", "Default · Filled · Pressed · Focused · Error · Disabled", "Default"],
  ["Quantity Stepper", "Value", "Text", "Number", "“20”"],
  ["Quantity Stepper", "Helper", "Text", "Capacity hint or error", "“Room for 24 more in this bin”"],
  ["Quantity Stepper", "Show Helper", "Boolean", "true / false", "true"],
  ["Quantity Preset", "State", "Variant", "Default · Hover · Focused · Selected · Disabled", "Default"],
  ["Quantity Preset", "Text", "Text", "Action label", "“Fill bin”"],
  ["Quantity Preset", "Value", "Text", "Amount", "“24”"],
  ["Quantity Preset", "Show Value", "Boolean", "true / false", "true"],
] as const

export const statesHeadings = ["State", "Stepper", "Preset"] as const
export const states = [
  ["Default", "Empty. Value in text/tertiary.", "Secondary filled button look, raw drop shadow."],
  ["Filled", "Value in text/primary.", "—"],
  ["Hover", "—", "component/button/filled/secondary/*/hover"],
  ["Pressed", "border/accent/default.", "—"],
  ["Focused", "Focus Ring.", "Focus Ring."],
  ["Selected", "—", "background/brand/tertiary · border/accent-subtle · text/accent"],
  ["Error", "feedback/error/secondary/border · error helper.", "—"],
  ["Disabled", "surface/secondary · both buttons disabled.", "*/disable tokens · no shadow"],
] as const

export const tokensHeadings = ["Part", "Token", "Value"] as const
export const tokens = [
  ["Stepper field", "background/surface/primary/default · border/primary/default · radius/MD", "White · 1px · 8px"],
  ["Stepper spacing", "Padding/SM · Padding/MD · Gap/SM · Gap/MD", "8 · 12 · 4 · 8 px"],
  ["Value · unit", "Display/LG · Label/MD-Regular", "—"],
  ["− / + icons", "component/button/borderless/secondary/text-icon/default · /disabled", "—"],
  ["Preset", "component/button/filled/secondary/background · border · text-icon (default / hover / disable)", "—"],
  ["Preset selected", "background/brand/tertiary/default · border/accent-subtle/default · text/accent/default", "—"],
  ["Preset shadow", "Drop shadow (not linked to Shadow/xs)", "Not tokenized"],
] as const

export const contextHeadings = ["Variant", "Example", "Count"] as const
export const context = [
  ["Stepper · Default", "Add Stock Flow (value 0)", "2"],
  ["Stepper · Filled", "Add Stock Flow · D2 · Validation", "2"],
  ["Stepper · Pressed", "Add Stock Flow", "2"],
  ["Stepper · Error", "Add Stock Flow (30 units, over capacity)", "2"],
  ["Stepper · Disabled", "Add Stock Flow", "1"],
  ["Stepper · Focused", "Not used in screens", "0"],
  ["Preset · Default", "Preset row in Add Stock, plus S1–S4 bin cells inside Bin Picker", "35 (+15 nested)"],
  ["Preset · Disabled", "Disabled presets and “Full” bin cells", "5 (+8 nested)"],
  ["Preset · Selected", "A bin cell inside Bin Picker", "0 (+1 nested)"],
  ["Preset · Hover · Focused", "Not used in screens", "0"],
] as const

export const contentHeadings = ["Rule", "Detail", "Example"] as const
export const content = [
  ["Capacity helper", "One wording everywhere.", "Room for 24 in bin A1-L2-S3"],
  ["Preset labels", "Verb or +N, sentence case.", "Fill bin · To minimum · +10"],
  ["Over-capacity error", "Say the limit and the next step (Callout below).", "30 units won’t fit in this bin"],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["Role", "Use <input type=\"number\"> (spinbutton) with a visible label; − / + are buttons.", "Required"],
  ["Button labels", "− and + are icon-only: aria-label “Decrease quantity” / “Increase quantity”.", "Required"],
  ["Value contrast", "Empty value, unit and helper use text/tertiary (2.52:1).", "Fail"],
  ["Preset selected", "Selected preset text uses text/accent (2.52:1) and needs aria-pressed.", "Fail"],
  ["Target size", "Presets are 32px high; stepper buttons sit in a 56px field.", "Pass"],
] as const

export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["Preset reused as bin cell", "Bin Picker", "Quantity Preset is used for the S1–S4 / “Full” cells of Bin Picker. A bin cell is a different control (single choice in a grid) — give it its own component.", "Warning"],
  ["Raw shadow", "Quantity Preset", "The drop shadow is not linked to the Shadow/xs effect style.", "Warning"],
  ["No description", "Quantity Preset", "The component set has no description.", "Info"],
  ["Unit not editable", "Quantity Stepper", "“units” is fixed text. Add a Unit text property (units, boxes, pallets).", "Info"],
  ["Pressed state", "Quantity Stepper", "Same as Input Field: an input has no pressed state; Pressed and Focused look alike.", "Warning"],
  ["No per-button disabled", "Quantity Stepper", "Only the whole stepper can be disabled. − should disable at 0 and + at bin capacity.", "Info"],
  ["Helper wording", "Default vs instances", "Default says “Room for 24 more in this bin”, screens say “Room for 24 in bin A1-L2-S3”. Pick one.", "Info"],
  ["Hover too subtle", "Quantity Preset", "Hover is hard to tell from Default.", "Info"],
  ["Contrast", "Value · helper · selected preset", "text/tertiary 2.52:1 and text/accent 2.52:1.", "Error"],
  ["Not tokenized", "Preview spacing", "Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.", "Not tokenized"],
] as const

export const guidelines = [
  ["Show the bin capacity in the helper so people know the limit before they type.", "Silently clamp a value that is over capacity."],
  ["Use presets for the 3–5 amounts people add most often.", "Add more presets than fit on one row."],
  ["Hide the value on relative presets (+5, +10).", "Show “· 24” on a +5 preset."],
] as const
