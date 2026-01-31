# Pilot Design System - Quick Reference

## Installation

```html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/patterns.css">

<!-- Modular components (recommended) -->
<script type="module" src="components/index.js"></script>

<!-- Or monolithic bundle (legacy) -->
<script type="module" src="components.js"></script>
```

## Web Components

### Button
```html
<pilot-button variant="primary|secondary|outline|ghost|technical" size="sm|md|lg" disabled loading>
  Button Text
</pilot-button>
```

### Input
```html
<pilot-input 
  type="text"
  label="Label"
  placeholder="Placeholder"
  hint="Hint text"
  error="Error message"
  technical
></pilot-input>
```

### Card
```html
<pilot-card variant="technical" padding="sm|md|lg|xl" bordered="true">
  <h3 slot="header">Header</h3>
  Content
  <div slot="footer">Footer</div>
</pilot-card>
```

### Badge
```html
<pilot-badge variant="primary|success|warning|error|outline|technical" size="sm|md|lg">
  Badge Text
</pilot-badge>
```

### Terminal
```html
<pilot-terminal show-header title="console" show-prompt>
  Command line content
</pilot-terminal>
```

### Label
```html
<pilot-label variant="technical|code|industrial" size="sm|md|lg" prefix="PRE" suffix="SUF">
  Label Text
</pilot-label>
```

### Divider
```html
<pilot-divider variant="dashed|technical" label="SECTION" orientation="horizontal|vertical"></pilot-divider>
```

### Grid
```html
<pilot-grid columns="1|2|3|4|6|12" gap="0|1|2|3|4|6|8" show-grid>
  <!-- Grid items -->
</pilot-grid>
```

### Panel
```html
<pilot-panel title="TITLE" collapsible collapsed>
  Panel content
</pilot-panel>
```

### Status
```html
<pilot-status variant="success|warning|error|neutral" pulse size="sm|md|lg">
  Status Text
</pilot-status>
```

### Code Block
```html
<pilot-code-block language="js" filename="file.js" show-line-numbers>
  Code content here
</pilot-code-block>
```

### Annotation
```html
<pilot-annotation type="note|warning|important|technical" position="top-left|top-right">
  Annotation content
</pilot-annotation>
```

### Measurement
```html
<pilot-measurement orientation="horizontal|vertical" value="240" unit="px"></pilot-measurement>
```

### Modal
```html
<pilot-modal id="modal-id" title="Modal Title" size="sm|md|lg|full" dismissible>
  <h3 slot="header">Custom Header</h3>
  Modal content here...
  <div slot="footer">
    <pilot-button onclick="document.getElementById('modal-id').close()">Close</pilot-button>
  </div>
</pilot-modal>

<!-- Open via JavaScript -->
<script>
  document.getElementById('modal-id').open();
</script>
```

### Select
```html
<!-- Single select -->
<pilot-select label="Label" placeholder="Select an option">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</pilot-select>

<!-- Searchable -->
<pilot-select label="Searchable" searchable>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</pilot-select>

<!-- Multi-select with groups -->
<pilot-select label="Multi-select" multiple searchable>
  <optgroup label="Group 1">
    <option value="g1a">Group 1 A</option>
    <option value="g1b">Group 1 B</option>
  </optgroup>
  <optgroup label="Group 2">
    <option value="g2a">Group 2 A</option>
  </optgroup>
</pilot-select>
```

## CSS Utility Classes

### Grid Backgrounds
- `.pilot-grid-bg` - Standard grid
- `.pilot-grid-dots` - Dot grid
- `.pilot-grid-crosses` - Cross pattern

### Borders
- `.pilot-border` - Heavy border
- `.pilot-border-corners` - Border with corner markers
- `.pilot-border-brackets` - Border with brackets
- `.pilot-frame` - Full frame with corners

### Labels
- `.pilot-label` - Standard label
- `.pilot-label-boxed` - Boxed with corner dots
- `.pilot-label-code` - Code-style with < >

### Measurements
- `.pilot-measurement` - Horizontal measurement
- `.pilot-measurement-vertical` - Vertical measurement
- `.pilot-measurement-line` - Line with arrows

### Lines
- `.pilot-line` - Standard line
- `.pilot-line-dashed` - Dashed line
- `.pilot-line-dotted` - Dotted line
- `.pilot-connector` - Connector with arrow
- `.pilot-connector-dots` - Connector with dots

### Modules
- `.pilot-module` - Module with ID label
- `.pilot-module-header` - Module header

### Status
- `.pilot-status` - Status with dot
- `.pilot-status-dot` - Status dot
- `.pilot-status-dot.pulse` - Animated pulse

### Terminal
- `.pilot-terminal` - Terminal container
- `.pilot-terminal-header` - Terminal header
- `.pilot-terminal-body` - Terminal body
- `.pilot-terminal-prompt` - Prompt ($)

### Code
- `.pilot-code` - Inline code
- `.pilot-code-block` - Code block

### Typography
- `.pilot-text` - Technical font + uppercase
- `.pilot-mono` - Monospace font
- `.pilot-industrial` - Industrial font
- `.pilot-uppercase` - Uppercase + letter-spacing
- `.pilot-number` - Tabular numbers

## Design Tokens

### Colors
```css
/* Brand */
var(--color-brand-primary)        /* #1a1a1a */
var(--color-brand-accent)         /* #f59e0b */

/* Text */
var(--color-text-primary)         /* #1a1a1a */
var(--color-text-secondary)       /* #525252 */
var(--color-text-tertiary)        /* #6b6b6b */

/* Background */
var(--color-background-primary)   /* #ffffff */
var(--color-background-secondary) /* #f5f5f5 */

/* Border */
var(--color-border-primary)       /* #b3b3b3 */
var(--color-border-technical)     /* #1a1a1a */
```

### Typography
```css
/* Fonts */
var(--font-display)               /* Space Grotesk */
var(--font-body)                  /* IBM Plex Sans */
var(--font-mono)                  /* IBM Plex Mono */
var(--font-technical)             /* JetBrains Mono */
var(--font-industrial)            /* Chakra Petch */

/* Sizes */
var(--font-size-xs)               /* 0.75rem */
var(--font-size-sm)               /* 0.875rem */
var(--font-size-base)             /* 1rem */
var(--font-size-lg)               /* 1.125rem */
var(--font-size-xl)               /* 1.25rem */
```

### Spacing
```css
var(--spacing-1)                  /* 0.25rem (4px) */
var(--spacing-2)                  /* 0.5rem (8px) */
var(--spacing-4)                  /* 1rem (16px) */
var(--spacing-6)                  /* 1.5rem (24px) */
var(--spacing-8)                  /* 2rem (32px) */
```

### Technical Specs
```css
var(--pilot-grid-size)        /* 8px */
var(--pilot-module-size)      /* 48px */
var(--border-width-technical)     /* 1.5px */
```

## Dark Mode

Add `data-theme="dark"` to any element:

```html
<body data-theme="dark">
  <!-- All components adapt automatically -->
</body>
```

## Common Patterns

### System Dashboard
```html
<pilot-grid columns="3" gap="4">
  <pilot-panel title="STATUS" collapsible>
    <pilot-status variant="success" pulse>ONLINE</pilot-status>
  </pilot-panel>
  <pilot-panel title="MODULES">
    <pilot-badge variant="technical">MODULE-01</pilot-badge>
  </pilot-panel>
  <pilot-panel title="LOGS">
    <pilot-terminal show-prompt>System ready</pilot-terminal>
  </pilot-panel>
</pilot-grid>
```

### API Documentation
```html
<pilot-card variant="technical" padding="xl">
  <h2 slot="header">API REFERENCE</h2>
  <pilot-annotation type="technical">
    Endpoint: /api/v1/resource
  </pilot-annotation>
  <pilot-code-block language="bash" show-line-numbers>
    curl -X GET /api/v1/resource
  </pilot-code-block>
</pilot-card>
```

### Form Layout
```html
<pilot-grid columns="2" gap="4">
  <pilot-input label="System ID" technical></pilot-input>
  <pilot-input label="Access Code" type="password" technical></pilot-input>
</pilot-grid>
<pilot-button variant="technical" size="lg">Submit ›</pilot-button>
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

---

**Pilot Design System v1.0.0**
