Pattern & Texture System
=======================

- Machine-printed textures: subtle scanlines and microdots to evoke printed forms
- Dot-matrix and analog printer noise: used as background texture at low opacity to avoid legibility loss
- Grain and micro-textures: light noise to reduce flatness on large surfaces
- Striped/encoded patterns: diagonal stripes for hazard zones; monospaced glyphs to imply data streams
- Pattern rules: keep textures low-contrast; always ensure content remains readable

Texture Tokens (CSS-friendly)
- --texture-scan: linear-gradient(to bottom, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0) 51%)
- --texture-dots: radial-gradient(circle at 0 0, rgba(0,0,0,0.05) 1px, transparent 1px) 0 0/8px 8px
