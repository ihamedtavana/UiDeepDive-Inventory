export const description = 'Input Field is the labelled text and select field of the side-panel forms. It is used in the Add Stock panel (warehouse, supplier, PO, batch, note) and in every Sign in / Reset password screen. It has a label, a 40px field with optional leading and trailing icons, and helper text.'
export const source = 'All examples above are untouched instances of “Input Field” (5970:81257) with real labels from the Add Stock and Sign in screens. Only properties were set.'
export const metrics = [['6', 'States'], ['9', 'Component properties'], ['63', 'Instances on the Final page'], ['2', 'Flows (Add Stock, Auth)']] as const
export const anatomyHeadings = ['#', 'Part', 'Layer', 'Details'] as const
export const anatomy = [
  ['1', 'Label', 'Label', 'Label/SM-Default · text/secondary/default. Always visible above the field.'],
  ['2', 'Field', 'Field', '256×40 container · background/surface/primary/default · border/primary/default · radius/MD · Padding/MD · Gap/MD'],
  ['3', 'Leading icon', 'Leading Icon', '16px icon (instance swap) · icon/secondary/default. On by default.'],
  ['4', 'Value / placeholder', 'Value', 'Label/MD-Regular. text/tertiary/default when empty (placeholder), text/primary/default when filled.'],
  ['5', 'Trailing icon', 'Trailing Icon', 'Off by default. Turned on for select fields (chevron) — the same component is used for text and select.'],
  ['6', 'Helper text', 'Helper', 'Caption/SM-Regular · text/tertiary/default. Becomes the error message in the Error state.'],
] as const
export const propertiesHeadings = ['Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['State', 'Variant', 'Default · Filled · Pressed · Focused · Error · Disabled', 'Default'],
  ['Label', 'Text', 'Any', '“Label”'], ['Value', 'Text', 'Placeholder or value', '“Value”'],
  ['Helper', 'Text', 'Any', '“Helper text”'], ['Show Helper', 'Boolean', 'true / false', 'true'],
  ['Show Leading Icon', 'Boolean', 'true / false', 'true'], ['Show Trailing Icon', 'Boolean', 'true / false', 'false'],
  ['Leading Icon', 'Instance swap', 'Any 16px icon', 'marker-pin'], ['Trailing Icon', 'Instance swap', 'Any 16px icon', 'chevron-down'],
] as const
export const statesHeadings = ['State', 'Field', 'Border', 'Value text', 'When'] as const
export const states = [
  ['Default', 'surface/primary', 'border/primary/default', 'text/tertiary (placeholder)', 'Empty field'],
  ['Filled', 'surface/primary', 'border/primary/default', 'text/primary', 'Has a value'],
  ['Pressed', 'surface/primary', 'border/accent/default', 'text/primary', 'Pointer down — see Audit'],
  ['Focused', 'surface/primary', 'border/primary + Focus Ring', 'text/primary', 'Keyboard focus'],
  ['Error', 'surface/primary', 'feedback/error/secondary/border', 'text/primary', 'Validation failed; helper = message'],
  ['Disabled', 'surface/secondary', 'border/primary/default', 'text/tertiary', 'Not editable'],
] as const
export const tokensHeadings = ['Part', 'Token', 'Value'] as const
export const tokens = [
  ['Field background', 'background/surface/primary/default · surface/secondary (Disabled)', 'White · Gray 50'],
  ['Border', 'border/primary/default · border/accent/default · feedback/error/secondary/border', '1px'],
  ['Radius', 'radius/MD', '8 px'], ['Padding · gap', 'Padding/MD · Gap/MD', '12 px · 8 px'],
  ['Label', 'Label/SM-Default · text/secondary/default', '12/16 Medium'],
  ['Value', 'Label/MD-Regular · text/primary or text/tertiary', '14/20 Regular'],
  ['Helper', 'Caption/SM-Regular · text/tertiary/default · feedback/error/primary/text', '12/16'],
  ['Icons', 'icon/secondary/default', '16 px'],
] as const
export const contextHeadings = ['Variant', 'Example', 'Count'] as const
export const contextNote = 'Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance.'
export const context = [
  ['Filled', 'Add Stock fields (Warehouse, Shelf, Supplier, PO, Received on) and Sign in / Reset password fields — 13 screens', '36'],
  ['Default', 'Empty fields: Batch / lot, Note, Password — 10 screens', '21 (+1 nested)'],
  ['Error', 'D2 · Validation (Reference / PO) · RC-03 (Confirm new password)', '2'],
  ['Disabled', 'SU-10 · Sign Up · Creating account', '1'],
  ['Pressed · Focused', 'Not used in screens', '0'],
] as const
export const contentHeadings = ['Rule', 'Detail', 'Example'] as const
export const content = [
  ['Labels are nouns', 'Short, sentence case, no colon.', 'Supplier · Reference / PO · Batch / lot'],
  ['Placeholders show format', 'Use “e.g.” for a sample value, “Optional” for optional fields.', 'e.g. PO-2026-0418'],
  ['Errors say how to fix', 'State the rule, not just that it failed.', 'Required for supplier deliveries'],
] as const
export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Label', 'The visible Label must be the field’s <label> (for/id).', 'Required'],
  ['Placeholder contrast', 'Placeholder and helper use text/tertiary (2.52:1) — below 4.5:1.', 'Fail'],
  ['Field border', 'border/primary/default is 1.19:1 on white — the border is the only edge of the field (needs 3:1).', 'Fail'],
  ['Error message', 'Link the helper to the field with aria-describedby and set aria-invalid in Error.', 'Required'],
  ['Focus', 'Focused shows a Focus Ring around the field.', 'Pass'], ['Target size', 'Field is 40px high.', 'Pass'],
] as const
export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['Pressed state on an input', 'State=Pressed', 'Text inputs have no pressed state. Pressed (accent border) and Focused look almost the same. Remove Pressed or merge it with Focused.', 'Warning'],
  ['One component, three jobs', 'Text · select · password', 'Select fields use the trailing chevron and password fields type “••••” into Value. Consider a Type property (Text / Select / Password) with a show-password toggle.', 'Info'],
  ['Leftover helper text', 'Add Stock instances', 'Many instances keep the default “Helper text” in Helper (hidden). Clear it so it never ships by accident.', 'Info'],
  ['Contrast', 'Placeholder · helper · border', 'text/tertiary 2.52:1 and border 1.19:1 (same findings as the Color and Search pages).', 'Error'],
  ['Hidden layers', 'All variants', '6 hidden layers inside the variants. Check they are needed.', 'Info'],
  ['Same as Search?', 'Search (C4)', 'Search and Input Field share the field look but are separate components with different heights (36 vs 40). Align heights or base Search on Input Field.', 'Info'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const
export const guidelines = [
  ['Keep the label visible above the field — it names the field for the whole form.', 'Use the placeholder as the only label.'],
  ['Use the trailing chevron only when the field opens a list (Warehouse, Shelf).', 'Show a chevron on a free-text field.'],
  ['Turn Show Helper off when there is nothing useful to say.', 'Leave the default “Helper text” in hidden or empty helpers.'],
] as const
