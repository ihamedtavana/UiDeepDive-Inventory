export const description = 'Top Navigation is the bar above every dashboard page: Breadcrumb on the left, then the primary “New Movement” button, three icon buttons (messages, notifications, settings) and the user Avatar. Breadcrumb and Avatar are separate components and are documented here too.'

export const metrics = [
  ['3', 'Components'],
  ['0', 'Top Navigation properties'],
  ['5', 'Breadcrumb uses in screens'],
  ['8', 'Avatar uses in screens'],
] as const
export const overviewNote = 'Top Navigation (2037:20529) is narrowed to fit the preview. Breadcrumb (2037:20219) and Avatar (2037:20229) are untouched instances.'

export const anatomyHeadings = ['#', 'Part', 'Details'] as const
export const anatomy = [
  ['1', 'Breadcrumb', 'Location (Label/SM-Regular · text/tertiary) · “/” · current page as a Neutral Badge'],
  ['2', 'New Movement', 'Button · Primary · Filled · Medium with plus icon'],
  ['3', 'Icon buttons', 'Messages · Notifications (with brand dot) · Settings — Secondary Filled Icon Buttons'],
  ['4', 'Avatar', '32×32 photo · radius/full'],
  ['5', 'Bar', '1168 wide · Padding/LG · Gap/MD · bottom border/primary/default'],
  ['6', 'Spacing', 'Gap/SM between icon buttons; one raw 8px gap'],
] as const

export const propertiesHeadings = ['Component', 'Property', 'Type', 'Values', 'Default'] as const
export const properties = [
  ['Top Navigation', '—', '—', 'No properties (page name, actions and avatar are fixed)', '—'],
  ['Breadcrumb', 'First Page', 'Text', 'Location', '“New York Central”'],
  ['Breadcrumb', 'Current page', '—', 'Not exposed (nested Badge label)', '“Inventory”'],
  ['Avatar', '—', '—', 'No properties (one fixed photo, one size)', '—'],
] as const

export const tokensHeadings = ['Part', 'Token', 'Note'] as const
export const tokens = [
  ['Bar', 'border/primary/default · Padding/LG · Gap/MD / SM / LG', '1 raw gap (8px)'],
  ['Breadcrumb', 'Label/SM-Regular · text/tertiary · component/badge/filled/Neutral/* · radius/SM', '—'],
  ['Buttons', 'component/button/filled/primary/* · /secondary/* · Radius · Shadow/xs', 'Primary text 2.78:1'],
  ['Notification dot', 'background/brand/primary/default', '—'],
  ['Avatar', 'radius/full', '—'],
] as const

export const contextIntro = 'Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance.'
export const contextHeadings = ['Variant', 'Example', 'Count'] as const
export const context = [
  ['Top Navigation', 'Inventory Dashboard · Final Design - Collapsed · Switch Warehouse 04', '3'],
  ['Breadcrumb', 'Inside Top Navigation, plus 2 direct uses', '2 (+3 nested)'],
  ['Avatar', 'Inside Top Navigation and on SI-11 · Welcome back', '0 (+8 nested)'],
] as const

export const guidelines = [
  ['Keep one primary action in the bar (New Movement).', 'Add a second primary button next to it.'],
  ['Show the current page as the last breadcrumb item.', 'Make the current page a link.'],
  ['Use a fallback (initials or icon) when there is no photo.', 'Leave an empty circle.'],
] as const

export const accessibilityHeadings = ['Check', 'Detail', 'Status'] as const
export const accessibility = [
  ['Landmarks', 'Bar is a <header>; Breadcrumb is <nav aria-label="Breadcrumb"> with aria-current on the last item.', 'Required'],
  ['Icon buttons', 'Messages, Notifications and Settings need aria-labels; the dot needs text (“3 unread”).', 'Required'],
  ['Avatar', 'Needs alt text or opens a labelled account menu.', 'Required'],
  ['Primary button', 'White on brand is 2.78:1 (see Button).', 'Fail'],
  ['Breadcrumb location', 'text/tertiary 2.52:1.', 'Fail'],
] as const

export const auditIntro = 'Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review.'
export const auditHeadings = ['Finding', 'Where', 'Details', 'Severity'] as const
export const audit = [
  ['No properties', 'Top Navigation', 'Nothing is exposed: breadcrumb text, actions and the notification dot are fixed. Expose the breadcrumb (or nest the Breadcrumb component props).', 'Warning'],
  ['Current page not exposed', 'Breadcrumb', 'Only “First Page” is a property; the current page label must be overridden in the nested Badge.', 'Warning'],
  ['Name collision', 'Pagination (2037:20219)', 'The breadcrumb used inside Top Navigation is the component also named “Pagination” (see Pagination page).', 'Error'],
  ['Avatar has no options', 'Avatar', 'One photo, one size, no fallback. It is also reused on the “Welcome back” sign-in screen.', 'Info'],
  ['Raw gap', 'Top Navigation', 'One gap is a raw 8px.', 'Info'],
  ['Layer names', 'Top Navigation', '3 layers keep default names.', 'Info'],
  ['Height', 'Top Navigation', 'Component is 65px high; the docs pages use 57px.', 'Info'],
  ['Not tokenized', 'Preview spacing', 'Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.', 'Not tokenized'],
] as const
