## Project
- React + TypeScript + Vite. UI lives in `src/components`.
- Figma source: https://www.figma.com/design/7mKvYS6GfWwRv0NcpUxYGz/T01---Ui-Deep-Dive---Tea-A--D?node-id=1-12&p=f&t=MEtM4sQ52GwTyaJB-0
- If you cannot open or inspect the Figma project, inform the user; do not claim to have inspected it.

## Commands
- Install: `pnpm install`
- Test: `pnpm test` (must pass)

## Code style
- Components in PascalCase, one per file.
- Boolean props start with `is` or `has`.

## Design system
- Read `DESIGN.md` before any UI work.
- Match the Figma design closely, including layout, spacing, typography, colors, dimensions, and component states.
- Use the UI UX Pro MAX (uupm) skill to support design quality and UI/UX principles while keeping Figma as the primary design source. If the skill is unavailable, inform the user.
- Never hardcode colors, spacing, or radius; use tokens from `src/tokens`.
- Reuse existing components from `src/components` before creating new ones. If an existing component lacks a required variant, add the variant to the design system rather than creating a separate one-off component.
- Keep component names consistent between Figma and code, using meaningful names instead of generic or copied layer names.
- Map Figma variants to component props with the same names, while following the boolean prop naming rule above.
- If a required token or component is missing entirely, stop the affected work and ask the user before creating or substituting it. Continue independent work where possible. Token changes remain subject to the `src/tokens/` boundary below.
- Implement Hover, Focus, Disabled, Loading, and Error states when present in the design.

## Responsive design
- The primary design is desktop at 1440px. Complete the desktop version and obtain user approval before starting mobile.
- After desktop approval, adapt and test the mobile version based on the desktop design.
- Inform the user when mobile needs manual design decisions, a mobile-specific interaction is missing, or something does not work correctly.

## Accessibility
- Support keyboard interaction.
- Provide alternative text (`alt`) for meaningful images.
- Follow basic accessibility principles in interactive components.

## Verification
- After each change, run the page, compare it with Figma, and fix any issues found. If verification is blocked, inform the user.

## Boundaries
- Do not add, change, delete, or regenerate files in `src/tokens/` during normal design or implementation work. Modify this directory only when the user explicitly requests a token addition or change, and limit changes to the requested scope.
