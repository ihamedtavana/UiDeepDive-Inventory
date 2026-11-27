export const description = "The Shelf view shows one shelf as a 3 × 4 grid of Bin Cards. It is built from three components: Shelf Header (back button, shelf title, section switcher and shelf chips), Shelf Summary (capacity and stock status totals) and Bin Card (one bin, with a Stock Box / Compact and a status badge)."

export const overviewNote = "Examples are instances of Shelf Header (7744:7688), Shelf Summary (7744:7713) and Bin Card (7743:7908). The two wide components are narrowed to fit the preview; nothing else is changed."

export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."

export const auditIntro = "Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const anatomyHeadings = ["#","Part","Details"]
export const anatomy = [
  ["1","Card","254×188 · background/surface/primary/default · border/primary/default · radius/L · Padding/MD · Gap/LG"],
  ["2","Bin ID","“A1-L2-S3” · Caption/SM-Strong · text/primary/default"],
  ["3","Status badge","Slot (Badge) — In stock · Low stock · Out of stock · Full"],
  ["4","Stock Box / Compact","Closed carton with 24 slots"],
  ["5","Product · SKU","Title/SM-Default · text/primary; SKU Caption/SM-Regular · text/tertiary"],
  ["6","Quantity","“15/24” · Label/SM-Default + Caption/SM-Regular (fixed text)"],
] as const

export const shelfPartsHeadings = ["Component","Parts"]
export const shelfParts = [
  ["Shelf Header","Back button “All shelves” · shelf icon · context (“New York Central · Section A”) · title · Section dropdown · shelf chips A1 / A2 / A3"],
  ["Shelf Summary","Units on hand / capacity (186 /288) · % capacity used · segmented capacity bar · counts: In stock · Low stock · Out of stock · Full"],
] as const

export const propertiesHeadings = ["Component","Property","Type","Values","Default"]
export const properties = [
  ["Bin Card","State","Variant","Default · Hover · Focused · Pressed","Default"],
  ["Bin Card","Bin ID · Product · SKU · Min","Text","Any","A1-L2-S3 · GeForce RTX 4070 Super · GPU-0107"],
  ["Bin Card","Badge","Slot","Status Badge instance","Empty"],
  ["Shelf Header","Context · Shelf title","Text","Any","“A1” · “Graphics Cards”"],
  ["Shelf Header","Shelf icon","Instance swap","Any icon","—"],
  ["Shelf Summary","—","—","No properties","—"],
] as const

export const statesHeadings = ["State","Background","Border"]
export const states = [
  ["Default","background/surface/primary/default","border/primary/default"],
  ["Hover","background/surface/primary/hover","border/primary/default"],
  ["Focused","background/surface/primary/default","Focus Ring"],
  ["Pressed","background/surface/primary/pressed","border/primary/default"],
] as const

export const tokensHeadings = ["Part","Token","Note"]
export const tokens = [
  ["Bin Card","background/surface/primary/* · border/primary/default · radius/L · Padding/MD · Gap/LG / XS / SM","—"],
  ["Shelf Header","Button · Dropdown tokens · Title/MD · Label/SM · Caption/SM · radius/MD / SM / 2XS","Icon strokes use text/primary/default"],
  ["Shelf Summary","Display/LG · Title/SM · Caption/SM · data-visualization/brand / tertiary / primary · feedback/*/secondary/background","Uses spacing/0 and radius/full (global)"],
  ["Shelf chips","feedback/error · feedback/warning /secondary/background","—"],
] as const

export const contextHeadings = ["Variant","Example","Count"]
export const context = [
  ["Bin Card · Default","Shelf Section — all 12 bins","12"],
  ["Bin Card · Hover · Focused · Pressed","Not used in screens","0"],
  ["Shelf Header","Shelf Section","1"],
  ["Shelf Summary","Shelf Section","1"],
] as const

export const accessibilityHeadings = ["Check","Detail","Status"]
export const accessibility = [
  ["Card name","Bin Card is a link/button: name it “A1-L2-S3, GeForce RTX 4070 Super, 15 of 24, In stock”.","Required"],
  ["Focus","Focused shows a Focus Ring.","Pass"],
  ["Secondary text","SKU, “/24”, context and summary labels use text/tertiary (2.52:1).","Fail"],
  ["Shelf chips","A1 / A2 / A3 chips show status by color only.","Fix"],
  ["Grid","Expose levels as rows (L3–L1) so the grid reads in shelf order.","Required"],
] as const

export const auditHeadings = ["Finding","Where","Details","Severity"]
export const audit = [
  ["Quantity is fixed text","Bin Card","All 12 cards show “15/24” — including Out of stock and Low stock bins whose boxes look empty. Add a Quantity property and fix the data.","Error"],
  ["Summary numbers disagree","Shelf Summary","186 / 288 = 65%, but the card says 75% Capacity Used. 12 cards × 15 = 180, not 186.","Error"],
  ["No properties","Shelf Summary","Every number and the bar are fixed. Needs text properties (or a data note for dev).","Warning"],
  ["Property name","Bin Card","“SKU · Min” shows only the SKU; the minimum is not shown anywhere.","Info"],
  ["Token misuse","Shelf Header · Dropdown","Icon strokes are bound to text/primary/default instead of an icon token.","Warning"],
  ["Global tokens used","Shelf Summary","Uses spacing/0 and radius/full directly instead of semantic tokens.","Info"],
  ["Default text","Shelf Header","Context default is “A1”, but the screen shows “New York Central · Section A”.","Info"],
  ["Missing states","Bin Card","No Selected or Disabled state.","Info"],
  ["Not tokenized","Preview spacing","Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.","Not tokenized"],
] as const

export const metrics = [
  ["3","Components"],
  ["4","Bin Card states"],
  ["12","Bin Cards per shelf"],
  ["1","Shelf Section screen"],
] as const

export const guidelines = [
  ["Show quantity, status badge and box fill that agree with each other.","Show “Out of stock” with 15/24 units."],
  ["Keep the 3 × 4 grid in the same order as the physical shelf (L3 at the top).","Sort bins by status."],
  ["Label shelf chips with text (A1, A2, A3) and a legend for their color.","Use chip color alone to show shelf status."],
] as const
