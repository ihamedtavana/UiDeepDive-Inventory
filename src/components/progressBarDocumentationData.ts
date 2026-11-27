export const description = 'Progress Bar shows how full something is — warehouse capacity or shelf stock health — as a row of segments with a 0–100 scale underneath. In Figma it is the component “Percentage Container”, built from many “Percentage Segment” instances.'
export const overviewNote = 'Above: the Warehouse capacity metric and the Shelf A1 card from the Inventory Dashboard (unchanged). Source: “Percentage Container” and “Percentage Segment” on the 😍 Final page.'

export const metrics = [
  ['10', 'Variants (5 values × 2 sizes)'],
  ['10', 'Progress bars on the dashboard'],
  ['518', 'Segment instances inside them'],
  ['25%', 'Smallest step between variants'],
] as const

export const anatomyHeadings = ['#', 'Part', 'Details'] as const
export const anatomy = [
  ['1', 'Track', 'Row of 4×16px segments · gap Gap/XS (2px).'],
  ['2', 'Active segment', 'Percentage Segment · State = Active · data-visualization/brand · radius/full.'],
  ['3', 'Inactive segment', 'Percentage Segment · State = Default · data-visualization/tertiary · radius/full.'],
  ['4', 'Scale', '0, 20, 40, 60, 80, 100 · Caption/SM-Regular · text/tertiary/default · 8px below the track (Gap/MD).'],
  ['5', 'Value label (outside)', 'The percentage (e.g. “75%” or “25%”) is placed outside the component by each card.'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Percentage Container', 'Percentage', 'Variant', '0 · 25 · 50 · 75 · 100', '0'],
  ['Percentage Container', 'Size', 'Variant', 'SM (208px) · MD (336px)', 'SM'],
  ['Percentage Segment', 'State', 'Variant', 'Default · Active', 'Default'],
] as const

export const variantsNote = 'Percentage is set in 25% steps. Size only changes the width (SM fits a 232px sidebar card, MD fits a 360px shelf card).'
export const variantsHeadings = ['Percentage', 'Size = SM (208px)', 'Size = MD (336px)'] as const
export const percentages = [0, 25, 50, 75, 100] as const

export const tokensHeadings = ['Part', 'Token', 'Value'] as const
export const tokens = [
  ['Active segment', 'data-visualization/brand', '#FA7324'],
  ['Inactive segment', 'data-visualization/tertiary', '#EBEBEB'],
  ['Segment radius', 'radius/full', '999'],
  ['Segment gap', 'Gap/XS', '2 px'],
  ['Track to scale', 'Gap/MD', '8 px'],
  ['Scale labels', 'Caption/SM-Regular · text/tertiary/default', '12/16'],
  ['Segment size', 'Not tokenized', '4 × 16 px'],
  ['Scale label gap', 'Not tokenized', '4 px'],
] as const

export const contextNote = 'Every bar on the dashboard, with the label shown next to it, the variant set on the instance and the share of segments that are actually active.'
export const contextHeadings = ['Where', 'Label', 'Variant set', 'Active segments', 'Status'] as const
export const context = [
  ['Sidebar · Warehouse Storage', '75%', '75 · SM', '26 / 35 (74%)', 'Matches'],
  ['Overview · Warehouse capacity', '75%', '75 · SM', '26 / 35 (74%)', 'Matches'],
  ['Shelf A1', '25%', '25 · MD', '14 / 56 (25%)', 'Matches'],
  ['Shelf A2', '48%', '50 · MD', '27 / 56 (48%)', 'Hand-adjusted'],
  ['Shelf A3', '18%', '25 · MD', '10 / 56 (18%)', 'Hand-adjusted'],
  ['Shelf B1', '52%', '50 · MD', '29 / 56 (52%)', 'Hand-adjusted'],
  ['Shelf B2', '42%', '50 · MD', '24 / 56 (43%)', 'Hand-adjusted'],
  ['Shelf B3', '88%', '75 · MD', '49 / 56 (88%)', 'Hand-adjusted'],
  ['Shelf C1', '92%', '100 · MD', '52 / 56 (93%)', 'Hand-adjusted'],
  ['Shelf C2', '20%', '25 · MD', '11 / 56 (20%)', 'Hand-adjusted'],
] as const

export const guidelines = [
  ['Always show the exact value as text next to the bar (e.g. “Stock health 25%”).', 'Rely on the bar alone — segments only approximate the value.'],
  ['Use the bar for a single “how full” value between 0 and 100.', 'Use it for counts, trends or values above 100%.'],
  ['Keep the brand color for “filled”; signal risk with a Badge or text next to it.', 'Recolor segments by hand to show warnings — there are no warning or error segment states.'],
] as const

export const contentHeadings = ['Rule', 'Detail', 'Example'] as const
export const content = [
  ['Name the measure', 'Put what is being measured above the bar.', 'Stock health · Capacity used'],
  ['Whole percentages', 'No decimals in cards.', '75%'],
  ['Consistent naming', 'The overview uses “Capacity Used” and “Stock health” — pick one case.', 'Capacity used · Stock health'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Semantics (4.1.2)', 'Expose as role="meter" (capacity, stock health) with aria-valuenow, aria-valuemin, aria-valuemax and a label; hide the 50+ segments from screen readers.', 'Required'],
  ['Filled vs empty (1.4.11)', 'Active segments are 2.78:1 and empty segments 1.19:1 against white. The empty part is hard to see; the visible percentage text carries the value.', 'Review'],
  ['Value as text', 'The percentage is always shown as text next to the bar.', 'Pass'],
  ['Scale contrast', 'Scale labels use text/tertiary (2.52:1).', 'Fail'],
] as const

export const auditNote = 'Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'
export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Hand-adjusted bars', '7 of 10 instances', 'The Percentage variant only has 25% steps, so segments were switched on or off by hand to match labels like 48%, 88% and 92%. The variant shown in the properties panel (e.g. 75 for 88%) no longer matches the bar.', 'Warning'],
  ['Many nested instances', 'Percentage Container', 'Each bar is 35–56 separate segment instances (518 in total). A single fill shape bound to a width or percentage would be lighter and easier to set.', 'Warning'],
  ['Naming', 'Percentage Container · Size', 'The component is named “Percentage Container” but behaves as a progress bar/meter; “Size” only changes width (208 vs 336px).', 'Info'],
  ['No status states', 'Percentage Segment', 'Only Default and Active. Capacity at 92% or stock health at 18% looks the same as a healthy value.', 'Info'],
  ['Different segment counts', 'SM vs MD', 'SM has 35 segments and MD 56, so one segment means a different percentage in each size.', 'Info'],
  ['Missing descriptions', 'Both components', 'Neither component has a description in Figma.', 'Info'],
  ['Not tokenized', 'Segment size · scale gap · marker positions', 'Segment size (4×16) and the scale label gap (4) are raw values. Anatomy marker positions on this page are fixed values.', 'Not tokenized'],
] as const
