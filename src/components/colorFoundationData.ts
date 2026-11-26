import type { BadgeTone } from './Badge'

type Token = `--${string}`
type Sample = readonly [token: Token, label?: string]
export type ColorCell = string
  | { kind: 'samples'; items: readonly Sample[] }
  | { kind: 'preview'; foreground: Token; background: Token }
  | { kind: 'badge'; label: string; tone: BadgeTone; context?: string }

export type ColorTableSpec = {
  layout: 'token' | 'feedback' | 'roles' | 'badge' | 'button' | 'focus' | 'contrast' | 'audit'
  headings: readonly string[]
  rows: readonly (readonly ColorCell[])[]
}

type ColorSection = {
  id: string
  title: string
  label: string
  description?: string
  tables: readonly ColorTableSpec[]
}

const samples = (items: readonly Sample[]): ColorCell => ({ kind: 'samples', items })
const swatch = (token: Token, label?: string) => samples([[token, label]])
const badge = (label: string, tone: BadgeTone, context?: string): ColorCell => ({ kind: 'badge', label, tone, context })
const contrast = (foreground: Token, background: Token): ColorCell => ({ kind: 'preview', foreground, background })

const textAndIcon: ColorSection = {
  id: "text-icon",
  title: "Text & Icon",
  label: "10 tokens",
  description: "Text and icon colors share the same scale. Pair icon tokens with the text token of the same level (primary with primary, secondary with secondary).",
  tables: [
    {
      layout: "token",
      headings: ["", "Token", "Value", "Alias", "Usage"],
      rows: [
        [swatch("--semantic-colors-text-primary-default"), "text/primary/default", "#171717", "neutral/900", "Headings, metric values and primary labels."],
        [swatch("--semantic-colors-icon-primary-default"), "icon/primary/default", "#171717", "neutral/900", "Default icons next to primary text."],
        [
          swatch("--semantic-colors-icon-secondary-default"),
          "icon/secondary/default",
          "#404040",
          "neutral/700",
          "Supporting icons in menus, inputs and section titles.",
        ],
        [swatch("--semantic-colors-icon-tertiary-default"), "icon/tertiary/default", "#A3A3A3", "neutral/400", "Decorative or disabled icons."],
        [swatch("--semantic-colors-icon-accent-default"), "icon/accent/default", "#FA7324", "brand/500", "Active navigation icon and brand-highlighted icons."],
        [swatch("--semantic-colors-icon-inverse-default"), "icon/inverse/default", "#FFFFFF", "colors/white", "Icons on dark or brand-filled surfaces."],
        [swatch("--semantic-colors-text-secondary-default"), "text/secondary/default", "#404040", "neutral/700", "Body copy, descriptions and secondary labels."],
        [
          swatch("--semantic-colors-text-tertiary-default"),
          "text/tertiary/default",
          "#A3A3A3",
          "neutral/400",
          "Placeholders, captions, metric and axis labels. Never for essential information.",
        ],
        [
          swatch("--semantic-colors-text-accent-default"),
          "text/accent/default",
          "#FA7324",
          "brand/500",
          "Links and borderless brand actions such as “Show All” and “View log”.",
        ],
        [
          swatch("--semantic-colors-text-inverse-default"),
          "text/inverse/default",
          "#FFFFFF",
          "colors/white",
          "Text on dark or brand-filled surfaces (primary button label).",
        ],
      ],
    },
  ],
}

const surfaces: ColorSection = {
  id: "surface-background",
  title: "Surface & Background",
  label: "16 tokens",
  description: "Surfaces build depth without shadows: the page canvas is secondary, panels and cards are primary, and headers inside cards are tertiary.",
  tables: [
    {
      layout: "token",
      headings: ["", "Token", "Value", "Alias", "Usage"],
      rows: [
        [
          swatch("--semantic-colors-background-brand-indicator-default"),
          "background/brand/indicator/default",
          "#FA7324",
          "brand/500",
          "Active indicators — progress segments, active dots and markers.",
        ],
        [
          swatch("--semantic-colors-background-brand-primary-default"),
          "background/brand/primary/default",
          "#FA7324",
          "brand/500",
          "Primary action and brand emphasis. Use once per view.",
        ],
        [
          swatch("--semantic-colors-background-brand-primary-hover"),
          "background/brand/primary/hover",
          "#D5621F",
          "brand/600",
          "Hover state of brand-filled elements.",
        ],
        [
          swatch("--semantic-colors-background-brand-primary-pressed"),
          "background/brand/primary/pressed",
          "#B2521A",
          "brand/700",
          "Pressed state of brand-filled elements.",
        ],
        [
          swatch("--semantic-colors-background-brand-tertiary-default"),
          "background/brand/tertiary/default",
          "#FFF1E9",
          "brand/50",
          "Light brand tint for selected areas and brand badges.",
        ],
        [swatch("--semantic-colors-background-brand-tertiary-hover"), "background/brand/tertiary/hover", "#FEDDCA", "brand/100", "Hover on brand-tinted elements."],
        [swatch("--semantic-colors-background-inverse"), "background/inverse", "#171717", "neutral/900", "Highest-contrast dark background."],
        [
          swatch("--semantic-colors-background-primary"),
          "background/primary",
          "#FFFFFF",
          "colors/white",
          badge("Duplicate", "warning", "Root-level white background."),
        ],
        [
          swatch("--semantic-colors-background-secondary"),
          "background/secondary",
          "#FAFAFA",
          "neutral/50",
          badge("Duplicate", "warning", "Page canvas behind the main content panel."),
        ],
        [
          swatch("--semantic-colors-background-surface-inverse-default"),
          "background/surface/inverse/default",
          "#262626",
          "neutral/800",
          "Dark surfaces such as chart tooltips.",
        ],
        [
          swatch("--semantic-colors-background-surface-primary-default"),
          "background/surface/primary/default",
          "#FFFFFF",
          "colors/white",
          "Default surface for cards, tables, sidebar items and main content.",
        ],
        [
          swatch("--semantic-colors-background-surface-primary-hover"),
          "background/surface/primary/hover",
          "#F5F5F5",
          "neutral/100",
          "Hover on interactive items placed on a primary surface.",
        ],
        [
          swatch("--semantic-colors-background-surface-primary-pressed"),
          "background/surface/primary/pressed",
          "#EBEBEB",
          "neutral/200",
          "Pressed state of interactive items on a primary surface.",
        ],
        [
          swatch("--semantic-colors-background-surface-secondary-default"),
          "background/surface/secondary/default",
          "#FAFAFA",
          "neutral/50",
          "Subtle secondary surface — page canvas, neutral badge fill.",
        ],
        [
          swatch("--semantic-colors-background-surface-secondary-hover"),
          "background/surface/secondary/hover",
          "#F5F5F5",
          "neutral/100",
          "Hover on items placed on a secondary surface.",
        ],
        [
          swatch("--semantic-colors-background-surface-tertiary-default"),
          "background/surface/tertiary/default",
          "#F5F5F5",
          "neutral/100",
          "Card titles, table headers and segmented-tab tracks.",
        ],
      ],
    },
  ],
}

const borders: ColorSection = {
  id: "border",
  title: "Border",
  label: "6 tokens",
  tables: [
    {
      layout: "token",
      headings: ["", "Token", "Value", "Alias", "Usage"],
      rows: [
        [
          swatch("--semantic-colors-border-primary-default"),
          "border/primary/default",
          "#EBEBEB",
          "neutral/200",
          "Default border for cards, tables, inputs and dividers.",
        ],
        [swatch("--semantic-colors-border-secondary-default"), "border/secondary/default", "#F5F5F5", "neutral/100", "Subtle inner dividers inside a card."],
        [
          swatch("--semantic-colors-border-tertiary-default"),
          "border/tertiary/default",
          "#FAFAFA",
          "neutral/50",
          "Faintest separator, for use on secondary surfaces.",
        ],
        [swatch("--semantic-colors-border-accent-default"), "border/accent/default", "#FA7324", "brand/500", "Focused or selected elements."],
        [
          swatch("--semantic-colors-border-accent-subtle-default"),
          "border/accent-subtle/default",
          "#FDC3A1",
          "brand/200",
          "Brand-tinted borders such as brand badges and highlighted cards.",
        ],
        [swatch("--semantic-colors-border-inverse-default"), "border/inverse/default", "#FFFFFF", "colors/white", "Borders on dark or brand-filled surfaces."],
      ],
    },
  ],
}

const feedback: ColorSection = {
  id: "feedback",
  title: "Feedback",
  label: "32 tokens",
  description: "Each status — Error, Warning, Success and Info — follows the same structure, so a component can switch status by swapping only the status name in the token path.",
  tables: [
    {
      layout: "feedback",
      headings: ["Status", "Tint bg", "Tint border", "Tint text", "Tint icon", "Solid", "Text", "Icon", "Strong tint"],
      rows: [
        [
          "Error",
          swatch("--semantic-colors-feedback-error-primary-background", "#FEF2F2"),
          swatch("--semantic-colors-feedback-error-primary-border", "#FECACA"),
          swatch("--semantic-colors-feedback-error-primary-text", "#B91C1C"),
          swatch("--semantic-colors-feedback-error-primary-icon", "#B91C1C"),
          swatch("--semantic-colors-feedback-error-secondary-background", "#EF4444"),
          swatch("--semantic-colors-feedback-error-secondary-text", "#B91C1C"),
          swatch("--semantic-colors-feedback-error-secondary-icon", "#B91C1C"),
          swatch("--semantic-colors-feedback-error-tertiary-background", "#FEE2E2"),
        ],
        [
          "Warning",
          swatch("--semantic-colors-feedback-warning-primary-background", "#FEFCE8"),
          swatch("--semantic-colors-feedback-warning-primary-border", "#FEF08A"),
          swatch("--semantic-colors-feedback-warning-primary-text", "#A16207"),
          swatch("--semantic-colors-feedback-warning-primary-icon", "#A16207"),
          swatch("--semantic-colors-feedback-warning-secondary-background", "#EAB308"),
          swatch("--semantic-colors-feedback-warning-secondary-text", "#A16207"),
          swatch("--semantic-colors-feedback-warning-secondary-icon", "#A16207"),
          swatch("--semantic-colors-feedback-warning-tertiary-background", "#FEF9C3"),
        ],
        [
          "Success",
          swatch("--semantic-colors-feedback-success-primary-background", "#F0FDF4"),
          swatch("--semantic-colors-feedback-success-primary-border", "#BBF7D0"),
          swatch("--semantic-colors-feedback-success-primary-text", "#15803D"),
          swatch("--semantic-colors-feedback-success-primary-icon", "#15803D"),
          swatch("--semantic-colors-feedback-success-secondary-background", "#22C55E"),
          swatch("--semantic-colors-feedback-success-secondary-text", "#15803D"),
          swatch("--semantic-colors-feedback-success-secondary-icon", "#15803D"),
          swatch("--semantic-colors-feedback-success-tertiary-background", "#DCFCE7"),
        ],
        [
          "Info",
          swatch("--semantic-colors-feedback-info-primary-background", "#EFF6FF"),
          swatch("--semantic-colors-feedback-info-primary-border", "#BFDBFE"),
          swatch("--semantic-colors-feedback-info-primary-text", "#1D4ED8"),
          swatch("--semantic-colors-feedback-info-primary-icon", "#1D4ED8"),
          swatch("--semantic-colors-feedback-info-secondary-background", "#3B82F6"),
          swatch("--semantic-colors-feedback-info-secondary-text", "#1D4ED8"),
          swatch("--semantic-colors-feedback-info-secondary-icon", "#1D4ED8"),
          swatch("--semantic-colors-feedback-info-tertiary-background", "#DBEAFE"),
        ],
      ],
    },
    {
      layout: "roles",
      headings: ["Role", "Usage"],
      rows: [
        ["feedback/{status}/primary/background", "Background of status badges, banners and alerts."],
        ["feedback/{status}/primary/border", "Border of status badges and alerts."],
        ["feedback/{status}/primary/text · primary/icon", "Text and icons placed on the tinted background."],
        ["feedback/{status}/secondary/background", "Solid indicator — status dots, legend markers, progress fills."],
        ["feedback/{status}/secondary/text · secondary/icon", "Status text and icons placed on neutral surfaces."],
        ["feedback/{status}/tertiary/background", "Stronger tint for hover or emphasis on status surfaces."],
      ],
    },
  ],
}

const dataVisualization: ColorSection = {
  id: "data-visualization",
  title: "Data Visualization",
  label: "9 tokens",
  description: "Chart colors are separate from UI colors so charts can evolve without affecting components. Brand orange marks the series that matters most.",
  tables: [
    {
      layout: "token",
      headings: ["", "Token", "Value", "Alias", "Usage"],
      rows: [
        [swatch("--semantic-colors-data-visualization-primary"), "data-visualization/primary", "#404040", "neutral/700", "Main neutral series."],
        [swatch("--semantic-colors-data-visualization-secondary"), "data-visualization/secondary", "#A3A3A3", "neutral/400", "Secondary or inactive series."],
        [
          swatch("--semantic-colors-data-visualization-tertiary"),
          "data-visualization/tertiary",
          "#EBEBEB",
          "neutral/200",
          "Empty track of progress bars and gridlines.",
        ],
        [
          swatch("--semantic-colors-data-visualization-brand"),
          "data-visualization/brand",
          "#FA7324",
          "brand/500",
          "Highlighted series and filled progress segments.",
        ],
        [
          swatch("--semantic-colors-data-visualization-highlight"),
          "data-visualization/highlight",
          "#FDC3A1",
          "brand/200",
          "Light brand series, e.g. comparison bars.",
        ],
        [swatch("--semantic-colors-data-visualization-warning"), "data-visualization/warning", "#EAB308", "colors/yellow/500", "Warning series and status dots."],
        [
          swatch("--semantic-colors-data-visualization-positive"),
          "data-visualization/positive",
          "#22C55E",
          "colors/green/500",
          "Positive series and success status dots.",
        ],
        [
          swatch("--semantic-colors-data-visualization-negative"),
          "data-visualization/negative",
          "#EF4444",
          "colors/red/500",
          "Negative series and error status dots.",
        ],
        [
          swatch("--semantic-colors-data-visualization-neutral"),
          "data-visualization/neutral",
          "#FFFFFF",
          "colors/white",
          "Background inside charts and tooltip surface.",
        ],
      ],
    },
  ],
}

const componentTokens: ColorSection = {
  id: "component-tokens",
  title: "Component Tokens",
  label: "47 tokens",
  description: "Component tokens are the last layer. They point to semantic or global values and are only used inside the component they are named after. Badge and Button are the components with dedicated tokens today.",
  tables: [
    {
      layout: "badge",
      headings: ["Badge tone", "Background", "Text / Icon", "Border"],
      rows: [
        [
          badge("Neutral", "neutral"),
          swatch("--component-badge-filled-neutral-background-default", "…/Neutral/background/default"),
          swatch("--component-badge-filled-neutral-text-icon-default", "…/Neutral/text-icon/default"),
          swatch("--component-badge-filled-neutral-border-default", "…/Neutral/border/default"),
        ],
        [
          badge("Brand", "brand"),
          swatch("--component-badge-filled-brand-background-default", "…/Brand/background/default"),
          swatch("--component-badge-filled-brand-text-icon-default", "…/Brand/text-icon/default"),
          swatch("--component-badge-filled-brand-border-default", "…/Brand/border/default"),
        ],
        [
          badge("Warning", "warning"),
          swatch("--component-badge-filled-warning-background-default", "…/Warning/background/default"),
          swatch("--component-badge-filled-warning-text-icon-default", "…/Warning/text-icon/default"),
          swatch("--component-badge-filled-warning-border-default", "…/Warning/border/default"),
        ],
        [
          badge("Error", "error"),
          swatch("--component-badge-filled-error-background-default", "…/Error/background/default"),
          swatch("--component-badge-filled-error-text-icon-default", "…/Error/text-icon/default"),
          swatch("--component-badge-filled-error-border-default", "…/Error/border/default"),
        ],
        [
          badge("Success", "success"),
          swatch("--component-badge-filled-success-background-default", "…/Success/background/default"),
          swatch("--component-badge-filled-success-text-icon-default", "…/Success/text-icon/default"),
          swatch("--component-badge-filled-success-border-default", "…/Success/border/default"),
        ],
        [
          badge("Info", "info"),
          swatch("--component-badge-filled-info-background-default", "…/Info/background/default"),
          swatch("--component-badge-filled-info-text-icon-default", "…/Info/text-icon/default"),
          swatch("--component-badge-filled-info-border-default", "…/Info/border/default"),
        ],
      ],
    },
    {
      layout: "button",
      headings: ["Button", "Default", "Hover", "Pressed", "Focused", "Disabled"],
      rows: [
        [
          "Filled · Primary",
          samples([
            ["--component-button-filled-primary-background-default", "BG #FA7324"],
            ["--component-button-filled-primary-text-icon-default", "Text #FFFFFF"],
          ]),
          swatch("--component-button-filled-primary-background-hover", "BG #D5621F"),
          swatch("--component-button-filled-primary-background-pressed", "BG #B2521A"),
          swatch("--component-button-filled-primary-background-focused", "BG #FA7324"),
          samples([
            ["--component-button-filled-primary-background-disable", "BG #FFFFFF"],
            ["--component-button-filled-primary-border-disabled", "Border #EBEBEB"],
            ["--component-button-filled-primary-text-icon-disabled", "Text #A3A3A3"],
          ]),
        ],
        [
          "Filled · Secondary",
          samples([
            ["--component-button-filled-secondary-background-default", "BG #FFFFFF"],
            ["--component-button-filled-secondary-border-default", "Border #EBEBEB"],
            ["--component-button-filled-secondary-text-icon-default", "Text #171717"],
          ]),
          samples([
            ["--component-button-filled-secondary-background-hover", "BG #F5F5F5"],
            ["--component-button-filled-secondary-border-hover", "Border #EBEBEB"],
          ]),
          samples([
            ["--component-button-filled-secondary-background-pressed", "BG #EBEBEB"],
            ["--component-button-filled-secondary-border-pressed", "Border #EBEBEB"],
          ]),
          samples([
            ["--component-button-filled-secondary-background-focused", "BG #FFFFFF"],
            ["--component-button-filled-secondary-border-focused", "Border #FAFAFA"],
          ]),
          samples([
            ["--component-button-filled-secondary-background-disable", "BG #FFFFFF"],
            ["--component-button-filled-secondary-border-disabled", "Border #EBEBEB"],
            ["--component-button-filled-secondary-text-icon-disabled", "Text #A3A3A3"],
          ]),
        ],
        [
          "Borderless · Primary",
          swatch("--component-button-borderless-primary-text-icon-default", "Text #FA7324"),
          swatch("--component-button-borderless-primary-background-hover", "BG #FFF1E9"),
          swatch("--component-button-borderless-primary-background-pressed", "BG #FEDDCA"),
          "—",
          swatch("--component-button-borderless-primary-text-icon-disabled", "Text #A3A3A3"),
        ],
        [
          "Borderless · Secondary",
          swatch("--component-button-borderless-secondary-text-icon-default", "Text #171717"),
          swatch("--component-button-borderless-secondary-background-hover", "BG #F5F5F5"),
          swatch("--component-button-borderless-secondary-background-pressed", "BG #EBEBEB"),
          "—",
          swatch("--component-button-borderless-secondary-text-icon-disabled", "Text #A3A3A3"),
        ],
      ],
    },
    {
      layout: "focus",
      headings: ["", "Token", "Usage"],
      rows: [
        [swatch("--component-focus-ring-color"), "component/focus-ring/color", "Focus ring for every interactive component (keyboard focus)."],
      ],
    },
  ],
}

const accessibility: ColorSection = {
  id: "accessibility",
  title: "Accessibility",
  label: "WCAG 2.2",
  description: "Contrast ratios are calculated from the current token values. Body text needs 4.5:1 (AA); text 18.66px bold / 24px regular and UI graphics need 3:1.",
  tables: [
    {
      layout: "contrast",
      headings: ["Preview", "Foreground", "Background", "Ratio", "Result"],
      rows: [
        [
          contrast("--semantic-colors-text-primary-default", "--semantic-colors-background-surface-primary-default"),
          "text/primary/default",
          "background/surface/primary/default",
          "17.93 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-text-secondary-default", "--semantic-colors-background-surface-primary-default"),
          "text/secondary/default",
          "background/surface/primary/default",
          "10.37 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-text-tertiary-default", "--semantic-colors-background-surface-primary-default"),
          "text/tertiary/default",
          "background/surface/primary/default",
          "2.52 : 1",
          badge("Fail", "error"),
        ],
        [
          contrast("--semantic-colors-text-accent-default", "--semantic-colors-background-surface-primary-default"),
          "text/accent/default",
          "background/surface/primary/default",
          "2.78 : 1",
          badge("Fail", "error"),
        ],
        [
          contrast("--semantic-colors-text-primary-default", "--semantic-colors-background-surface-tertiary-default"),
          "text/primary/default",
          "background/surface/tertiary/default",
          "16.44 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-text-inverse-default", "--semantic-colors-background-brand-primary-default"),
          "text/inverse/default",
          "background/brand/primary/default",
          "2.78 : 1",
          badge("Fail", "error"),
        ],
        [
          contrast("--component-badge-filled-brand-text-icon-default", "--component-badge-filled-brand-background-default"),
          "component/badge/filled/Brand/text-icon/default",
          "component/badge/filled/Brand/background/default",
          "2.52 : 1",
          badge("Fail", "error"),
        ],
        [
          contrast("--semantic-colors-feedback-error-primary-text", "--semantic-colors-feedback-error-primary-background"),
          "feedback/error/primary/text",
          "feedback/error/primary/background",
          "5.91 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-feedback-warning-primary-text", "--semantic-colors-feedback-warning-primary-background"),
          "feedback/warning/primary/text",
          "feedback/warning/primary/background",
          "4.76 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-feedback-success-primary-text", "--semantic-colors-feedback-success-primary-background"),
          "feedback/success/primary/text",
          "feedback/success/primary/background",
          "4.79 : 1",
          badge("AA", "success"),
        ],
        [
          contrast("--semantic-colors-feedback-info-primary-text", "--semantic-colors-feedback-info-primary-background"),
          "feedback/Info/primary/text",
          "feedback/Info/primary/background",
          "6.16 : 1",
          badge("AA", "success"),
        ],
      ],
    },
  ],
}

const auditNotes: ColorSection = {
  id: "audit-notes",
  title: "Token Audit Notes",
  label: "For review",
  description: "Findings collected while documenting this page. Nothing has been changed in the token file — these are suggestions for the team to review.",
  tables: [
    {
      layout: "audit",
      headings: ["Finding", "Tokens", "Details", "Severity"],
      rows: [
        [
          "Duplicate tokens",
          "background/primary · background/secondary",
          "Same values as background/surface/primary/default and background/surface/secondary/default. The dashboard root frame uses background/secondary. Consider deprecating the root-level aliases.",
          badge("Warning", "warning"),
        ],
        [
          "Inconsistent naming",
          "component/button/filled/*/background/disable",
          "Background uses “disable” while border and text use “disabled”. Rename to “disabled”.",
          badge("Warning", "warning"),
        ],
        [
          "Inconsistent casing",
          "feedback/Info/*",
          "“Info” is capitalised while error, warning and success are lowercase. Rename to feedback/info.",
          badge("Warning", "warning"),
        ],
        [
          "Contrast",
          "text/inverse on background/brand/primary",
          "White on brand orange is 2.78:1 — below 4.5:1 for the 14px primary button label. Consider brand/600 for filled buttons or a larger/bolder label.",
          badge("Error", "error"),
        ],
        [
          "Contrast",
          "text/tertiary/default",
          "2.52:1 on white. Keep it for placeholders and non-essential captions only; metric labels may need text/secondary.",
          badge("Error", "error"),
        ],
        [
          "Contrast",
          "text/accent/default · badge Brand text-icon",
          "Brand orange text is 2.78:1 on white and 2.52:1 on the Brand badge tint — below 4.5:1 for 12–14px text (“Show All”, “View log”, Brand badges). Consider brand/600 or darker for text-only use.",
          badge("Error", "error"),
        ],
        [
          "Focus visibility",
          "component/button/filled/secondary/border/focused",
          "Focused border (#FAFAFA) is lighter than the default border, so focus depends entirely on component/focus-ring/color.",
          badge("Info", "info"),
        ],
        [
          "Not tokenized",
          "Documentation layout",
          "Swatch sizes (16, 32, 64 px), the preview chip and table column widths are fixed values — the system has no sizing tokens. Used on this page only.",
          badge("Not tokenized", "warning"),
        ],
      ],
    },
  ],
}

export const colorSections = [textAndIcon, surfaces, borders, feedback, dataVisualization, componentTokens, accessibility, auditNotes]
