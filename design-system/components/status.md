System status modules

Visual: Compact status tiles with a label, numeric readout, and a small status indicator (dot or bar) in the primary color.

States
- Default: neutral status tile with label and metric readout.
- OK: greenish accent, but since we’re minimal and e‑ink friendly, use tone0 for indicator to keep to monochrome; for color semantics, lean on typography emphasis.
- Warning/Error: use the primary color with bold weight and a small caption; on e‑ink, use tone0 for indicator and bold numeric readout.
- Disabled: lower contrast and muted typography.

E‑Ink mode variation
- Status indicator uses solid tone0; numeric reads use tone0 with bold display size for emphasis.
