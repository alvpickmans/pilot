Toggle — Rectangular, label‑aligned, bitwise control

Visual: A compact rectangular control with a label to the right. Active state shows the fill or outline change to the primary color depending on surface.

States
- Default: rectangle with 1px border in primary color; label aligned to the right in primary color or neutral text on light surfaces.
- Hover: border or fill subtly intensifies (e.g., border darkens, subtle fill).
- Active: filled rectangle in primary color with white label text; border remains 1px primary.
- Disabled: reduced opacity; non‑interactive.

E‑Ink mode variation
- Use filled state with tone0 on a white surface for high contrast.
- Avoid small toggles; scale up by 1.25x on e‑ink to preserve readability.

Layout notes
- Always reserve label space on the right; align vertically to midline of the control for a crisp, engineered look.
- Grid: use 8px rhythm for padding and 4px for gaps between label and switch.
