Design System Starter: Minimal, E‑Ink Friendly Brutalist

Overview
- A compact, engineering‑inspired design system optimized for ultra‑low contrast and e‑ink displays, while still looking modern on normal screens.
- Visual language: brutalist tech‑industrial with thin rules, monospaced details, clear grids, and retro calibration motifs.
- Dual typography: a high‑legibility grotesk/geometric sans for headlines and a monospaced secondary for logs, telemetry, and labels.
- Layout is grid‑driven with strict rhythm, safe zones, and deliberate grid breaks for emphasis.

What’s included
- Color tokens (primary, secondary, backgrounds, and e‑ink mode)
- Typography tokens (primary and secondary type systems, sizes, leading, tracking, weights)
- Grid and spacing system (baseline grid, breakpoints, safe zones)
- UI components (buttons, toggles, tabs, cards, dividers, captions, and charts) with e‑ink variations
- Icons and micro‑graphics (monochrome, 1–2 px strokes, crosshairs, scanlines, ticks)
- Motion guidance (optional; minimal and e‑ink safe)
- Example screens (textual mockups) for common surfaces

How to use
- Pull tokens from design-system/tokens and wire into your UI framework of choice.
- Follow the grid in design-system/grid.json and respect baseline rhythm of 8px.
- Use the e‑ink mode when designing for e‑ink devices or accessibility scenarios.

Notes
- The palette is intentionally extremely minimal to maximize legibility and consistency across devices, including e‑ink.
- All colors are provided in HEX, RGB, and WCAG notes for contrast planning.
- Example screens are textual mockups to guide layout decisions; adapt typography and spacing to your product surface.

Files and structure
- design-system/
  - tokens/
- grid/
- components/
- icons/
- examples/

Design tokens and usage guidelines are the primary source of truth.

Next steps
- Review the color and typography tokens; adapt to your brand as needed.
- Start implementing components against the grid and tokens.
- Create real SVG icons based on the provided style guide.
- Build the provided example screens in your UI framework and iterate with feedback.

If you want, I can add a starter CSS/SCSS or TS/JSON schema for token usage in your project.
