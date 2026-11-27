export const description = "Bin Picker is the shelf grid in the Add Stock panel where the user chooses which bin the stock goes into. It shows one shelf (levels L3–L1, slots S1–S4); full bins are disabled. It has a Default and an Error state."
export const overviewNote = "Both examples are untouched instances of “Bin Picker” (6713:11639). The header and grid content are fixed in the component."
export const metrics = [
  ["2", "States"],
  ["1", "Component property"],
  ["12", "Bin cells (3 levels × 4)"],
  ["3", "Instances on the Final page"],
] as const

export const anatomyHeadings = ["#", "Part", "Details"] as const
export const anatomy = [
  ["1", "Container", "501 wide · background/surface/secondary/default · border/primary/default · radius/MD · Padding/MD"],
  ["2", "Shelf title", "“Shelf A1 · Graphics Cards” · Label/SM-Default · text/primary/default"],
  ["3", "Selection / message", "“Bin A1-L2-S3” · Label/SM-Regular · text/secondary. In Error: feedback/error/primary/text."],
  ["4", "Level label", "L3 / L2 / L1 · Caption/SM-Regular · text/tertiary/default"],
  ["5", "Bin cell", "Quantity Preset instance (Text = S1–S4 or “Full”, value hidden). Full = Disabled."],
] as const

export const propertiesHeadings = ["Property", "Type", "Values", "Default"] as const
export const properties = [
  ["State", "Variant", "Default · Error", "Default"],
  ["Shelf / bin text", "—", "Not exposed (fixed text)", "—"],
  ["Cell states", "—", "Set on each nested Quantity Preset", "—"],
] as const

export const statesHeadings = ["State", "Border", "Message", "Cell size"] as const
export const states = [
  ["Default", "border/primary/default", "Selected bin id (text/secondary)", "32px high"],
  ["Error", "data-visualization/negative", "“Choose a bin for these 20 units” (feedback/error/primary/text)", "24px high — smaller than Default"],
] as const

export const tokensHeadings = ["Part", "Token", "Value"] as const
export const tokens = [
  ["Container", "background/surface/secondary/default · border/primary/default · radius/MD", "—"],
  ["Error border", "data-visualization/negative", "Should be feedback/error/secondary/border"],
  ["Spacing", "Padding/MD · Gap/MD · Gap/XS", "12 · 8 · 2 px"],
  ["Cells", "component/button/filled/secondary/* (default / disable)", "From Quantity Preset"],
  ["Text", "Label/SM-Default · Label/SM-Regular · Caption/SM-Regular", "—"],
] as const

export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."
export const contextHeadings = ["Variant", "Example", "Count"] as const
export const context = [
  ["Default", "Add Stock Flow", "2"],
  ["Error", "Add Stock Flow (no bin chosen)", "1"],
] as const

export const guidelines = [
  ["Show the selected bin both in the grid and in the header.", "Only name the selected bin in the header text."],
  ["Disable full bins and label them “Full”.", "Hide full bins — the grid must keep its shape."],
  ["Keep the cell size the same in every state.", "Shrink the grid to show an error."],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["Grouping", "Use a radiogroup labelled by the shelf title; each bin is a radio (“Level 2, slot 3”).", "Required"],
  ["Selected bin", "No cell shows a selected state — selection is only in the header text.", "Fix"],
  ["Level labels", "L1–L3 use text/tertiary (2.42:1 on surface/secondary).", "Fail"],
  ["Disabled cells", "“Full” text is 2.52:1 — fine for disabled controls, but the reason should be announced.", "Required"],
  ["Target size", "Error cells are 24px high — the minimum (2.5.8). Default cells are 32px.", "Check"],
] as const

export const auditIntro = "Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review."
export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["No selected cell", "Bin Picker", "The chosen bin (A1-L2-S3) is not highlighted in the grid. Add a Selected state to the bin cell.", "Error"],
  ["Layout jump", "State=Error", "Cells shrink from 32 to 24px and the card from 162 to 138px when the error shows.", "Warning"],
  ["Wrong error token", "State=Error", "Border uses data-visualization/negative instead of feedback/error/secondary/border.", "Warning"],
  ["Cells are Quantity Preset", "Bin cells", "The grid reuses Quantity Preset. A dedicated “Bin Cell” (Default / Hover / Selected / Full / Focused) would be clearer.", "Warning"],
  ["Nothing exposed", "Properties", "Shelf name, selected bin and message are fixed text — every use needs overrides.", "Info"],
  ["No description", "Bin Picker", "The component set has no description; 1 layer keeps a default name.", "Info"],
  ["Not tokenized", "Preview spacing", "Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.", "Not tokenized"],
] as const
