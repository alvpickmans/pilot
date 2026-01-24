Button — Outline, minimal, label‑forward

Visual: A rectangular, hairline bordered button with monochrome text. Uses the primary color for the border and text on light surfaces; on active states, invert with white text on the primary border fill.

States
- Default: border 1px solid var(--color-primary); text color var(--color-primary); background #FFF.
- Hover: subtle fill or elevation cue (e.g., background #F8F8F8) with border unchanged.
- Active: background var(--color-primary); color #FFF; border remains 1px solid var(--color-primary).
- Disabled: opacity 0.4; cursor not-allowed.

E‑Ink mode variation
- Outline remains hairline, but ensure border is at least 2px for legibility and strong contrast against off-white backgrounds.
- When fully filled in e‑ink, prefer solid fill of tone0 with white text for readability.

Implementation notes
- Use the 8px baseline grid for padding: vertical padding 8px; horizontal padding 12px (adjust with viewport).
- Typography: use the primary sans for label readability; avoid small caps or decorative fonts.
- Accessibility: ensure color contrast remains ≥ 4.5:1 for normal text on light surfaces.
