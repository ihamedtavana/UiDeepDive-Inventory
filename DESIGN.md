---
tokens:
  colors:
    brand: "var(--brand-brand-500)" # #FA7324
    background: "var(--semantic-colors-background-primary)" # #FFFFFF
    surface-secondary: "var(--semantic-colors-background-surface-secondary-default)" # #FAFAFA
    text-primary: "var(--semantic-colors-text-primary-default)" # #171717
    text-secondary: "var(--semantic-colors-text-secondary-default)" # #404040
    border: "var(--semantic-colors-border-primary-default)" # #EBEBEB
    error: "var(--global-colors-red-700)" # #B91C1C
    warning: "var(--global-colors-yellow-700)" # #A16207
    success: "var(--global-colors-green-700)" # #15803D
    info: "var(--global-colors-blue-700)" # #1D4ED8
  typography:
    family: "Roboto"
    mono: "Roboto Mono"
    display-lg: { size: 24px, line-height: 28px, weight: 600 }
    title-md: { size: 16px, line-height: 20px, weight: 600 }
    title-sm: { size: 14px, line-height: 20px, weight: 600 }
    body-md: { size: 14px, line-height: 20px, weight: 500 }
    body-sm: { size: 12px, line-height: 16px, weight: 500 }
  spacing:
    gap-xs: 2px
    gap-sm: 4px
    gap-md: 8px
    gap-lg: 12px
    gap-xl: 16px
    gap-2xl: 24px
    section-gap: 32px
    grid-gap: 16px
    page-gutter: 8px
  radius:
    none: 0px
    xs: 4px
    sm: 6px
    md: 8px
    l: 12px
    xl: 16px
    full: 999px
  components:
    button-primary:
      background: "var(--component-button-filled-primary-background-default)"
      text: "var(--component-button-filled-primary-text-icon-default)"
      radius: "var(--component-radius)"
---

# Design System

## Overview

This document describes the project's existing design tokens and implementation guidelines. Figma is the primary reference for layout, visual details, and component states. The generated `src/tokens/tokens.css` is the source of truth for token values; the front matter above is a concise reference, not a replacement for it. Numeric CSS tokens are unitless and need an appropriate unit when used.

## Color

Use semantic color tokens for backgrounds, text, borders, icons, and feedback; use component tokens where available. The brand palette is orange, the neutral palette supports surfaces and text, and red, yellow, green, and blue provide feedback colors. Do not hardcode colors in UI code. Choose accessible foreground and background combinations.

## Typography

Use the semantic typography tokens for font family, size, line height, and weight. Roboto is the primary family; Roboto Mono is available for monospaced content. Match the text hierarchy and actual type styles in Figma.

## Spacing

Use semantic gap, padding, and layout tokens before choosing global spacing values. Match spacing and dimensions to Figma rather than assuming every element uses the same interval.

## Radius

Use semantic radius tokens and component-specific radius tokens. Select the appropriate corner treatment from the design; use the full radius for pill or circular shapes when specified.

## Component Guidelines

Reuse components from `src/components` where applicable. Prefer component tokens for their visual properties and semantic tokens for shared roles. Follow the Figma design for variants, content, dimensions, and states. Use semantic HTML, meaningful image alternatives, and keyboard-accessible controls.

## Responsive Rules

The primary design is desktop at 1440px. Complete and obtain approval for desktop before starting mobile. Mobile breakpoints and behavior are not yet specified here; derive them from the approved desktop design and flag decisions or missing interactions for review.

## Interaction Patterns

Implement hover, focus, disabled, loading, and error states when present in Figma. Preserve visible keyboard focus and provide clear feedback for actions and errors. Use the relevant state tokens where available; do not infer unspecified visual details as established design decisions.
