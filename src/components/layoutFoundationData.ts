export const layoutDescription = "CoreTech screens follow one shell: a fixed 248px sidebar and a fluid main panel on a 1440px desktop frame. Inside the panel, content is a vertical stack of sections separated by Layout/Section-Gap, and every row of cards uses one of four grid patterns with Layout/Grid-Gap as the gutter."

export const layoutAnatomy = [
  ["Frame", "1440 px", "—", "Desktop artboard"],
  ["Page gutter", "8 px", "Layout/Page-Gutter", "Frame padding, sidebar to main panel"],
  ["Sidebar", "248 px", "— (fixed width)", "Navigation and context"],
  ["Main panel", "1168 px", "— (fills remaining width)", "radius/XL, border/primary/default"],
  ["Top navigation", "65 px", "Padding/LG", "Breadcrumb and global actions"],
  ["Content inset", "16 px", "Not tokenized", "Content frame is positioned absolutely inside the main panel"],
  ["Content width", "1136 px", "—", "Width every grid aligns to"],
  ["Section gap", "32 px", "Layout/Section-Gap", "Between page sections"],
] as const

export const layoutTokens = [
  ["Layout/Page-Gutter", "8 px", "Outer page padding and the gap between sidebar and main panel.", "Root frame padding (the gap uses Gap/MD)", "--semantic-spacing-layout-page-gutter"],
  ["Layout/Section-Gap", "32 px", "Vertical space between page sections.", "Dashboard Content stack", "--semantic-spacing-layout-section-gap"],
  ["Layout/Grid-Gap", "16 px", "Gutter between columns in a card grid.", "Overview Cards, Shelf rows", "--semantic-spacing-layout-grid-gap"],
] as const

export const layoutGrids = [
  ["4 columns", "272 px each · gutter 16", "Overview / KPI cards", ["1", "2", "3", "4"]],
  ["3 columns", "360 px each · gutter 16", "Shelf cards, entity cards", ["1", "2", "3"]],
  ["2 : 1 split", "756 + 364 px · gutter 16", "Main content + side list (activity + shipments)", ["2/3", "1/3"]],
  ["Full width", "1136 px · gutter 16", "Tables, charts, section headers", ["1"]],
] as const

export const layoutSidebar = [
  ["Logo", "Product mark + collapse button", "—"],
  ["Context card", "Current warehouse, status badges, switch action", "Shadow/xs"],
  ["Search", "Global search with ⌘K shortcut", "Divider above and below"],
  ["Main menu", "Primary navigation (Sidebar - Menu Button)", "Gap/SM between items"],
  ["Shelves", "Secondary list with status indicator + code", "Gap/SM between items"],
  ["Storage card", "Section Card summary with progress + action", "Padding/MD"],
  ["Footer", "Setting and Help & Support", "Gap/SM"],
] as const

export const layoutGuidelines = [
  ["Build pages with auto layout and Layout tokens so sections reflow when content changes.", "Position content absolutely — the dashboard’s content frame currently sits at a fixed x/y inside the main panel."],
  ["Make grid columns FILL and use Layout/Grid-Gap as the gutter.", "Fix column widths in pixels (e.g. 756 + 364) — they break at any other width."],
  ["Keep one gutter per grid in both directions.", "Mix gutters in one grid — the shelf grid uses 16px between columns but 12px between rows."],
] as const

export const layoutAccessibility = [
  ["Reflow (1.4.10)", "Only a 1440px desktop layout exists. Define how the shell behaves at smaller widths and at 400% zoom (e.g. collapsible sidebar, stacked grids).", "Missing"],
  ["Reading & focus order", "Layer order should match visual order: sidebar, top navigation, then sections top to bottom, left to right.", "Guideline"],
  ["Text resize (1.4.4)", "Fixed-height containers (the main panel is fixed height) can clip content at 200% text size. Prefer hug height.", "Review"],
  ["Landmarks", "Sidebar, top navigation and main content map to nav, header and main landmarks in code.", "Guideline"],
] as const

export const layoutAudit = [
  ["Absolute layout", "Main Content", "The main panel has no auto layout and a fixed height; the content frame sits at x 16 / y 97. The 16px inset and 32px offset are not tokenized.", "Warning"],
  ["Fixed column widths", "Inventory Activity and Shipments", "Columns are fixed at 756 and 364px instead of filling the row.", "Warning"],
  ["Raw gap", "Overview Tabs/Default", "Uses a 114px gap instead of “space between”.", "Warning"],
  ["Mixed gutters", "Shelf Card Grid", "Rows use Layout/Grid-Gap (16) between columns but Gap/LG (12) between rows.", "Info"],
  ["Token choice", "Root frame · Activity row", "Root gap uses Gap/MD and the activity row uses Gap/XL where Layout/Page-Gutter and Layout/Grid-Gap describe the intent (same values).", "Info"],
  ["No grid styles", "File", "No layout grid styles or column grids are defined. Consider a 12-column grid style for the 1136px content area.", "Info"],
  ["Single breakpoint", "Inventory Dashboard", "Only a 1440px desktop frame exists; no responsive rules are documented.", "Warning"],
  ["Not tokenized", "Documentation visuals", "Schematic block heights, the 170/200/270px demo widths and label column widths are fixed values. Gaps, paddings and gutters in the demos are bound to tokens.", "Not tokenized"],
] as const
