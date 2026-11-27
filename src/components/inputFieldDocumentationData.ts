export const description = 'Input Field is the labelled text and select field of the side-panel forms. It is used in the Add Stock panel (warehouse, supplier, PO, batch, note) and in every Sign in / Reset password screen. It has a label, a 40px field with optional leading and trailing icons, and helper text.'
export const source = 'All examples above are untouched instances of “Input Field” with real labels from the Add Stock and Sign in screens. Only properties were set.'
export const metrics = [['6', 'States'], ['9', 'Component properties'], ['63', 'Instances on the Final page'], ['2', 'Flows (Add Stock, Auth)']] as const
export const anatomyHeadings = ['#', 'Part', 'Layer', 'Details'] as const
export const anatomy = [
  ['1', 'Label', 'Label', 'Label/SM-Default · text/secondary/default. Always visible above the field.'],
  ['2', 'Field', 'Field', '40px surface with a 1px border, radius/MD and Padding/MD.'],
  ['3', 'Leading icon', 'Leading Icon', 'Optional 16px icon; its slot is controlled by Leading Icon.'],
  ['4', 'Value / placeholder', 'Value', 'Label/MD-Regular. Placeholder uses text/tertiary/default.'],
  ['5', 'Trailing icon', 'Trailing Icon', 'Optional 16px chevron or action; controlled by Trailing Icon.'],
  ['6', 'Helper', 'Helper', 'Caption/SM-Regular. Shows helper text or an error message.'],
] as const
export const propertiesHeadings = ['Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Label', 'Text', 'Any short field label', 'Label'], ['Value', 'Text', 'Text · placeholder', 'Value'],
  ['State', 'Variant', 'Default · Hover · Pressed · Focused · Error · Disabled', 'Default'],
  ['Leading Icon', 'Boolean', 'true · false', 'true'], ['Leading icon', 'Instance swap', 'Any 16px icon', 'package'],
  ['Trailing Icon', 'Boolean', 'true · false', 'false'], ['Trailing icon', 'Instance swap', 'Any 16px icon', 'chevron-down'],
  ['Helper', 'Text', 'Helper or error text', 'Helper text'], ['Show Helper', 'Boolean', 'true · false', 'false'],
] as const
export const variantsHeadings = ['State', 'Preview', 'Use'] as const
export const variants = [
  ['Default', 'Empty field', 'The resting state for an optional or ready-to-fill field.'],
  ['Filled', 'Pars Components', 'Shows entered or selected values.'], ['Focused', 'Keyboard focus ring', 'Only shown during keyboard navigation.'],
  ['Error', 'Required for supplier deliveries', 'Use an actionable message and aria-invalid.'],
  ['Disabled', 'Unavailable field', 'Use only when a field cannot be edited in the current flow.'],
  ['Select', 'New York Central', 'A filled field with a trailing chevron for selection.'],
] as const
export const tokensHeadings = ['Part', 'Token', 'Value'] as const
export const tokens = [
  ['Label', 'Label/SM-Default · text/secondary/default', '12/16'], ['Field', 'background/surface/primary/default', '#FFFFFF'],
  ['Border', 'border/primary/default', '1px #EBEBEB'], ['Error border', 'feedback/error/secondary/border', '#EF4444'],
  ['Radius', 'radius/MD', '8 px'], ['Padding', 'Padding/MD', '12 px'], ['Gap', 'Gap/MD', '8 px'],
  ['Height', 'Not tokenized', '40 px'],
] as const
export const contextHeadings = ['Where', 'Configuration', 'Behaviour'] as const
export const context = [
  ['Add Stock', 'Text · Select · helper', 'Captures warehouse, supplier, PO, batch and note information.'],
  ['Sign in', 'Text · Password · error', 'Collects email and password with validation feedback.'],
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
  ['Pressed state on an input', 'State=Pressed', 'Text inputs have no pressed state. Pressed (accent border) and Focused look almost the same. Remove Pressed or merge it with Focused.', 'Error'],
  ['One component, three jobs', 'Text · select · password', 'Select fields use the trailing chevron and password fields type “••••” into Value. Consider a Type property (Text / Select / Password) with a show-password toggle.', 'Warning'],
  ['Leftover helper text', 'Add Stock instances', 'Many instances keep the default “Helper text” in Helper (hidden). Clear it so it never ships by accident.', 'Warning'],
  ['Contrast', 'Placeholder · helper · border', 'text/tertiary 2.52:1 and border 1.19:1 (same findings as the Color and Search pages).', 'Error'],
  ['Hidden layers', 'All variants', '6 hidden layers inside the variants. Check they are needed.', 'Warning'],
  ['Same as Search?', 'Search (C4)', 'Search and Input Field share the field look but are separate components with different heights (36 vs 40). Align heights or base Search on Input Field.', 'Info'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const
export const guidelines = [
  ['Keep a visible label above every field.', 'Use a placeholder as the only label.'],
  ['Use helper text to clarify an expected format.', 'Use helper text to repeat the label.'],
  ['Make error messages specific and actionable.', 'Only say that a value is invalid.'],
] as const
