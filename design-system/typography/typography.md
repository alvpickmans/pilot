Typography System
=================

Overview
- Primary industrial font: DIN 1451 (or a licensed clone) for a disciplined, legible, machine-readable look.
- Secondary monospace/technical font: IBM Plex Mono (or JetBrains Mono) for code blocks, labels, and data lean visuals.
- Use cases emphasize high contrast, tight tracking on labels, and uniform leading to reinforce the technical tone.

Font Families
- Primary: DIN 1451, Arial, sans-serif
- Mono: IBM Plex Mono, Consolas, monospace

Sizing Scale and Rhythm
- Base unit: 8 px grid; typographic scale steps: 10, 12, 14, 16, 20, 24, 32, 40, 48
- Vertical rhythm: leading = 1.25x to 1.5x of font size depending on importance
- Line height examples (CSS-friendly):
  - caption: 1.2em
  - body: 1.5em
  - heading: 1.15em

Typesetting Rules
- Character spacing: tighter tracking for uppercase labels; normal tracking for body text
- Leading: no more than 1.5x line-height for dense blocks
- Block spacing: 8–16 px between blocks depending on context
- Alignment: left-aligned; in data blocks, consider monospaced alignment for columns

Labeling Conventions
- All-caps for IDs and codes: U-XYZ-0001, D-IT-002, O-USA-001
- Prefixes and tags must follow a fixed length and be zero-padded where appropriate
- Codes are machine-readable when printed on labels and device tags

Usage Notes
- Reserve the monospace font for code blocks, IDs, and tables; use the sans for body copy
- Maintain consistent font weights: regular for body, medium for subheadings, bold for labels
- Ensure accessible contrast against the background
