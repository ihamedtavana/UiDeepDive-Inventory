export const description = "Stock Box is the illustrated carton that shows how full a bin is. 24 slots fill from the bottom: dark = on hand, orange = being added, green = saved, red = over capacity. It is the hero of the Add Stock panel, and a compact closed version sits in every Bin Card. Four components make up the family."

export const overviewNote = "Family: Stock Box (6006:87028), Stock Box / Slot (6006:86112), Stock Box / Motion Pose (6006:87029) and Stock Box / Compact (8402:21051). All examples are untouched instances."

export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."

export const auditIntro = "Findings collected while documenting this family. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const metrics = [
  ['4', 'Components in the family'],
  ['7', 'Stock Box states'],
  ['24', 'Slots per box'],
  ['16 + 16', 'Box + Compact instances'],
] as const

export const anatomyHeadings = ["#", "Part", "Details"] as const
export const anatomy = [
  ["1", "Carton", "Outline illustration · border/strong/default, border/strong-subtle · background/surface/* fills. Flaps open or closed by state."],
  ["2", "Slot grid", "24 × Stock Box / Slot (16×12, radius/2XS, Gap/SM), filling from the bottom row."],
  ["3", "Minimum line", "Dashed line at the minimum stock level · border/accent-subtle/default."],
  ["4", "Min label", "“Min 6” · Caption/SM-Default · text/secondary/default (Show minimum)."],
  ["5", "Tape / check", "Closed states show tape; Success adds a check badge · feedback/success/secondary/background."],
] as const

export const propertiesHeadings = ["Component", "Property", "Type", "Values", "Default"] as const
export const properties = [
  ["Stock Box", "State", "Variant", "Empty · Filling · Full · Over capacity · Saving · Success · Error", "Empty"],
  ["Stock Box", "Min label", "Text", "“Min N”", "“Min 6”"],
  ["Stock Box", "Show minimum", "Boolean", "true / false", "true"],
  ["Stock Box / Slot", "Kind", "Variant", "Free · On hand · Adding · Saved · Over", "Free"],
  ["Stock Box / Motion Pose", "Pose", "Variant", "Closed · Half open · Units above · Units landed · Shake · Sweep start · Sweep end · Hop", "Closed"],
  ["Stock Box / Compact", "—", "—", "No properties (slots are overridden per instance)", "—"],
] as const

export const statesHeadings = ["State", "Carton", "Slots", "When"] as const
export const states = [
  ["Empty", "Open", "On hand only", "Panel opened, nothing entered"],
  ["Filling", "Open", "On hand + Adding (orange)", "Quantity entered"],
  ["Full", "Closed, tape", "All 24 filled", "Quantity fills the bin exactly"],
  ["Over capacity", "Open, extra units above", "Adding + Over (red) above the box", "Quantity > free slots"],
  ["Saving", "Closed, tape", "Adding, faded", "Request in progress"],
  ["Success", "Closed, check", "Saved (green)", "Stock added"],
  ["Error", "Open", "Same as Filling", "Save failed — see Audit"],
] as const

export const slotsHeadings = ["Slot kind", "Token", "Meaning"] as const
export const slots = [
  ["Free", "data-visualization/tertiary", "Empty capacity (1.19:1 on white)"],
  ["On hand", "data-visualization/primary", "Units already in the bin"],
  ["Adding", "data-visualization/brand", "Units in this action"],
  ["Saved", "feedback/success (green)", "Units just saved"],
  ["Over", "data-visualization/negative", "Units that do not fit"],
] as const

export const tokensHeadings = ["Part", "Token", "Value"] as const
export const tokens = [
  ["Carton lines", "border/strong/default · border/strong-subtle/default · border/inverse/default", "—"],
  ["Carton fills", "background/surface/primary · /secondary · /primary/pressed", "—"],
  ["Slots", "data-visualization/tertiary · /primary · /brand · /negative · feedback/success/secondary/background", "—"],
  ["Slot shape · gap", "radius/2XS · Gap/SM", "—"],
  ["Min line · label", "border/accent-subtle/default · Caption/SM-Default · text/secondary", "—"],
] as const

export const contextHeadings = ["Variant", "Example", "Count"] as const
export const context = [
  ["Filling", "Add Stock Flow · D2 · Validation", "6"],
  ["Over capacity", "Add Stock Flow · A1 and D5 (bin changed)", "5"],
  ["Empty", "Add Stock Flow", "2"],
  ["Success", "Add Stock Flow", "2"],
  ["Saving", "Add Stock Flow", "1"],
  ["Full · Error", "Not used in screens", "0"],
  ["Slot (all kinds)", "Inside Stock Box and Compact instances", "0 (+800 nested)"],
  ["Compact", "Bin Cards in Shelf Section", "0 (+12 nested)"],
  ["Motion Pose", "Not used (prototype only)", "0"],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["Text alternative", "The box is a picture of a number: give it a label, e.g. “Bin A1-L2-S3: 4 of 24 on hand, adding 20”.", "Required"],
  ["Color only", "On hand / Adding / Saved / Over differ only by color.", "Fix"],
  ["Free slots", "data-visualization/tertiary is 1.19:1 — free capacity is almost invisible.", "Fail"],
  ["Motion", "Shake / hop animations must respect prefers-reduced-motion.", "Required"],
] as const

export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["Error looks like Filling", "State=Error", "The Error variant is visually the same as Filling — nothing shows that saving failed.", "Error"],
  ["Capacity fixed at 24", "Stock Box · Compact", "Every box has exactly 24 slots. Bins with other capacities cannot be shown.", "Warning"],
  ["Compact has no properties", "Stock Box / Compact", "Fill level is changed by overriding slots in each Bin Card. A Fill / Level property would remove manual work.", "Warning"],
  ["Heavy component", "Stock Box", "~370 layers per variant (24 slot instances each); 1,400 slot instances on the Final page.", "Info"],
  ["Prototype-only parts", "Motion Pose", "Motion Pose has 0 instances in screens. Keep it, but mark it “prototype only” in its name or description.", "Info"],
  ["Contrast", "Free slots", "data-visualization/tertiary 1.19:1.", "Error"],
  ["Not tokenized", "Preview spacing", "Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.", "Not tokenized"],
] as const

export const guidelines = [
  ["Pair the box with the quantity and capacity in text (Quantity Stepper helper).", "Rely on the slot colors alone to explain the state."],
  ["Use Motion Poses only to prototype the add / save animation.", "Place Motion Poses in production screens."],
  ["Use Compact inside cards and lists.", "Scale the full Stock Box down for cards."],
] as const
