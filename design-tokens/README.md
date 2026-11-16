# Figma design tokens

`figma-variables.json` is a snapshot of the Figma file's local variables, collection modes, values and aliases from 2026-11-16. `src/tokens/tokens.css` is generated from that snapshot with `python design-tokens/build.py` when the user explicitly requests a token change.

Import `src/tokens/tokens.css` from the application when its entry point is created. Names include the collection prefix to avoid collisions, such as `--global-...` and `--semantic-colors-...`. Alias relationships are preserved using CSS `var()` references.

All numeric variables are intentionally unitless because Figma FLOAT variables can represent different things. Apply the unit appropriate to their actual use, for example `gap: calc(var(--semantic-spacing-...) * 1px)` for a pixel spacing value. Font weights stay unitless. Confirm the intended units for typography tracking and other ambiguous values against the actual design before using them.

The export includes local Figma variables only; Figma text styles, effect styles and other non-variable design data are not included. Each collection currently has one mode; the generator uses its default mode. The snapshot is not automatically synced. Update the snapshot and rebuild only when the user explicitly requests a token change; do not modify generated tokens during ordinary design or implementation work.
