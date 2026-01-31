# Pilot Design System

A comprehensive design system featuring industrial and governmental aesthetics, retro-technical visual language, and machine-readable design patterns.

## Overview

This design system captures the precision and clarity of technical documentation, industrial interfaces, and governmental communications. It emphasizes:

- **Industrial Tone**: Serious, authoritative, and functional
- **Retro-Technical**: Visual language inspired by technical manuals, blueprints, and early computing interfaces
- **Machine-Readable**: Clear, scannable layouts with code-printed aesthetics
- **Monochromatic Palette**: Minimalist black, white, and gray scale with amber accents
- **Modular Components**: Atomic design principles for maximum flexibility
- **Technical Diagrams**: System labeling and measurement patterns

## Quick Start

### Installation

```bash
# Include the CSS variables
<link rel="stylesheet" href="styles/variables.css">

# Include the pilot patterns
<link rel="stylesheet" href="styles/patterns.css">

# Include the web components (modular)
<script type="module" src="components/index.js"></script>

# Or use the monolithic bundle (legacy)
<script type="module" src="components.js"></script>
```

### Basic Usage

```html
<!-- Button -->
<pilot-button variant="primary" size="md">
  Execute Command
</pilot-button>

<!-- Card with technical styling -->
<pilot-card variant="technical" padding="lg">
  <h3 slot="header">System Module</h3>
  <p>Module content with technical aesthetic</p>
</pilot-card>

<!-- Terminal display -->
<pilot-terminal show-header title="console" show-prompt>
  npm install industrial-design-system
</pilot-terminal>
```

## Design Tokens

### Color Palette

The color system uses a monochromatic base with functional accent colors:

#### Primitive Colors
- **Black Scale**: 10 shades from near-black (#0a0a0a) to dark gray (#5e5e5e)
- **Gray Scale**: 11 shades from white (#ffffff) to near-black (#0d0d0d)
- **White Scale**: 5 shades of white/off-white
- **Accent Colors**: Amber (warning/highlight), Red (error), Green (success)

#### Semantic Colors
- **Brand**: Primary black (#1a1a1a), secondary grays, amber accent
- **Text**: Primary (#1a1a1a), secondary (#525252), tertiary (#6b6b6b)
- **Background**: Primary white, secondary grays, technical backgrounds
- **Border**: Primary, secondary, technical (heavy), dashed variants
- **Feedback**: Success (green), warning (amber), error (red), info (gray)
- **Technical**: Grid lines, measurements, annotations, highlights

### Typography

#### Font Families
- **Display**: Space Grotesk - For headlines and display text
- **Body**: IBM Plex Sans - For body text and UI elements
- **Mono**: IBM Plex Mono - For code and technical content
- **Technical**: JetBrains Mono - For labels and technical text
- **Industrial**: Chakra Petch - For industrial-style headings

#### Type Scale
- **2xs**: 0.625rem (10px) - Labels, badges
- **xs**: 0.75rem (12px) - Captions, small text
- **sm**: 0.875rem (14px) - Body small
- **base**: 1rem (16px) - Body text
- **lg**: 1.125rem (18px) - Large body
- **xl**: 1.25rem (20px) - Lead text
- **2xl**: 1.5rem (24px) - Small headings
- **3xl**: 1.875rem (30px) - Medium headings
- **4xl**: 2.25rem (36px) - Large headings
- **5xl**: 3rem (48px) - Display text
- **6xl**: 3.75rem (60px) - Large display
- **7xl**: 4.5rem (72px) - Hero text

### Spacing

Based on 4px grid system:
- **0**: 0
- **px**: 1px
- **0.5**: 0.125rem (2px)
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

### Technical Specifications

- **Grid Size**: 8px base grid
- **Module Size**: 48px standard module
- **Border Style**: Solid (1.5px technical borders)
- **Line Style**: Dashed (measurements, annotations)
- **Annotation Style**: Dotted (callouts)

## Web Components

### Button (`<pilot-button>`)

A versatile button component with industrial styling.

**Attributes:**
- `variant`: primary | secondary | outline | ghost | technical
- `size`: sm | md | lg
- `disabled`: Boolean
- `loading`: Boolean

**Example:**
```html
<pilot-button variant="technical" size="lg">
  Initialize System ›
</pilot-button>
```

### Input (`<pilot-input>`)

Form input with technical styling.

**Attributes:**
- `type`: text | password | email | number | etc.
- `placeholder`: String
- `disabled`: Boolean
- `readonly`: Boolean
- `value`: String
- `label`: String
- `hint`: String
- `error`: String
- `technical`: Boolean (adds bracket styling)

**Example:**
```html
<pilot-input 
  label="System ID"
  placeholder="SYS-001"
  technical
></pilot-input>
```

### Card (`<pilot-card>`)

Container component with technical frame options.

**Attributes:**
- `variant`: default | technical
- `padding`: sm | md | lg | xl
- `bordered`: Boolean

**Slots:**
- `header`: Card header content
- Default: Main content
- `footer`: Card footer content

**Example:**
```html
<pilot-card variant="technical" padding="lg" bordered="true">
  <h3 slot="header">MODULE-01</h3>
  <p>System component description</p>
  <div slot="footer">
    <pilot-button variant="outline" size="sm">Details</pilot-button>
  </div>
</pilot-card>
```

### Badge (`<pilot-badge>`)

Status and label badges.

**Attributes:**
- `variant`: default | primary | success | warning | error | outline | technical
- `size`: sm | md | lg

**Example:**
```html
<pilot-badge variant="technical" size="md">
  <status>ONLINE</status>
</pilot-badge>
```

### Terminal (`<pilot-terminal>`)

Terminal/console display component.

**Attributes:**
- `title`: String (window title)
- `show-header`: Boolean
- `show-prompt`: Boolean (shows $ prompt)

**Example:**
```html
<pilot-terminal show-header title="bash" show-prompt>
  git commit -m "Initialize design system"
</pilot-terminal>
```

### Label (`<pilot-label>`)

Technical labeling component.

**Attributes:**
- `variant`: default | technical | code | industrial
- `size`: sm | md | lg
- `prefix`: String (prepends to content)
- `suffix`: String (appends to content)

**Example:**
```html
<pilot-label variant="technical" size="sm" prefix="ID:">
  SYS-001-A
</pilot-label>
```

### Divider (`<pilot-divider>`)

Section dividers with technical styling.

**Attributes:**
- `orientation`: horizontal | vertical
- `variant`: default | dashed | technical
- `label`: String (centered label)

**Example:**
```html
<pilot-divider variant="technical" label="SECTION-01"></pilot-divider>
```

### Grid (`<pilot-grid>`)

CSS Grid container with optional technical grid overlay.

**Attributes:**
- `columns`: 1 | 2 | 3 | 4 | 6 | 12
- `gap`: 0 | 1 | 2 | 3 | 4 | 6 | 8
- `show-grid`: Boolean (shows grid overlay)

**Example:**
```html
<pilot-grid columns="3" gap="4" show-grid>
  <pilot-card>Module 1</pilot-card>
  <pilot-card>Module 2</pilot-card>
  <pilot-card>Module 3</pilot-card>
</pilot-grid>
```

### Panel (`<pilot-panel>`)

Collapsible panel component.

**Attributes:**
- `title`: String
- `collapsible`: Boolean
- `collapsed`: Boolean

**Example:**
```html
<pilot-panel title="CONFIGURATION" collapsible>
  <p>Configuration settings content</p>
</pilot-panel>
```

### Status (`<pilot-status>`)

Status indicator with dot and label.

**Attributes:**
- `variant`: neutral | success | warning | error | info
- `pulse`: Boolean (animated pulse)
- `size`: sm | md | lg

**Example:**
```html
<pilot-status variant="success" pulse>
  SYSTEM ONLINE
</pilot-status>
```

### Code Block (`<pilot-code-block>`)

Syntax-highlighted code display.

**Attributes:**
- `language`: String (language label)
- `filename`: String (file name)
- `show-line-numbers`: Boolean

**Example:**
```html
<pilot-code-block language="javascript" filename="config.js" show-line-numbers>
const system = {
  id: 'SYS-001',
  status: 'online'
};
</pilot-code-block>
```

### Annotation (`<pilot-annotation>`)

Callout boxes for notes and warnings.

**Attributes:**
- `type`: note | warning | important | technical
- `position`: top-left | top-right

**Example:**
```html
<pilot-annotation type="technical">
  Technical specifications and implementation details
</pilot-annotation>
```

### Measurement (`<pilot-measurement>`)

Technical measurement display with lines.

**Attributes:**
- `orientation`: horizontal | vertical
- `value`: String (measurement value)
- `unit`: String (unit suffix)

**Example:**
```html
<pilot-measurement value="240" unit="px"></pilot-measurement>
```

### Modal (`<pilot-modal>`)

Dialog overlay component with technical corner bracket styling.

**Attributes:**
- `open`: Boolean - controls visibility
- `size`: sm | md | lg | full - modal width (default: md)
- `dismissible`: Boolean - allows closing via backdrop/escape (default: true)
- `title`: String - default header text (can be overridden by header slot)

**Slots:**
- `header`: Modal title area (overrides title attribute)
- default: Main content body
- `footer`: Action buttons area

**Methods:**
- `open()` - Opens the modal
- `close()` - Closes the modal

**Features:**
- Focus trap when modal is open
- Close on Escape key (when dismissible)
- Close on backdrop click (when dismissible)
- Smooth open/close transitions
- Prevents body scroll when open
- Technical corner bracket decorations
- Backdrop overlay with blur effect

**Example:**
```html
<!-- Basic modal with title attribute -->
<pilot-modal id="myModal" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <pilot-button variant="ghost" onclick="closeModal()">Cancel</pilot-button>
    <pilot-button variant="primary" onclick="confirm()">Confirm</pilot-button>
  </div>
</pilot-modal>

<!-- Large modal with custom header slot -->
<pilot-modal size="lg">
  <h2 slot="header">Custom Title</h2>
  <p>Content here...</p>
  <div slot="footer">
    <pilot-button variant="outline">Cancel</pilot-button>
    <pilot-button variant="primary">Save</pilot-button>
  </div>
</pilot-modal>

<!-- Non-dismissible modal (requires explicit close) -->
<pilot-modal title="Processing" dismissible="false">
  <pilot-status variant="info" pulse>Processing...</pilot-status>
</pilot-modal>
```

### Select (`<pilot-select>`)

Dropdown component with technical bracket styling for choosing from options.

**Attributes:**
- `multiple`: Boolean - Enable multi-select mode
- `searchable`: Boolean - Enable search/filter within options
- `placeholder`: String - Placeholder text when no selection
- `disabled`: Boolean - Disable the component
- `value`: String - Selected value(s) - comma-separated for multiple
- `label`: String - Label text above the select

**Features:**
- Single and multi-select modes
- Search/filter within options
- Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
- Grouped options support via `<optgroup>` elements
- Disabled state handling
- Technical bracket styling matching input component
- Selected tags display for multi-select
- Change events with selected values

**Example:**
```html
<!-- Single select -->
<pilot-select label="System Type" placeholder="Select system type">
  <option value="production">Production</option>
  <option value="staging">Staging</option>
  <option value="development">Development</option>
</pilot-select>

<!-- Searchable single select -->
<pilot-select label="Environment" placeholder="Select region" searchable>
  <option value="us-east-1">US East 1</option>
  <option value="us-west-1">US West 1</option>
  <option value="eu-west-1">EU West 1</option>
</pilot-select>

<!-- Multi-select with groups -->
<pilot-select label="Services" placeholder="Select services" multiple searchable>
  <optgroup label="Compute">
    <option value="ec2">EC2 Instances</option>
    <option value="lambda">Lambda Functions</option>
  </optgroup>
  <optgroup label="Storage">
    <option value="s3">S3 Buckets</option>
    <option value="rds">RDS Databases</option>
  </optgroup>
</pilot-select>
```

## CSS Patterns

### Technical Grid Backgrounds

```css
.pilot-grid-bg      /* Standard grid */
.pilot-grid-dots    /* Dot grid */
.pilot-grid-crosses /* Cross pattern grid */
```

### Borders & Frames

```css
.pilot-border           /* Heavy technical border */
.pilot-border-corners   /* Border with corner markers */
.pilot-border-brackets  /* Border with bracket decorations */
.pilot-frame            /* Full frame with all corners */
```

### Labels & Annotations

```css
.pilot-label            /* Standard technical label */
.pilot-label-boxed      /* Label with box and corner dots */
.pilot-label-code       /* Code-style label with < > */
.pilot-annotation       /* Annotation box with label */
```

### Measurements

```css
.pilot-measurement              /* Horizontal measurement */
.pilot-measurement-vertical     /* Vertical measurement */
.pilot-measurement-line         /* Measurement line with arrows */
```

### Lines & Connectors

```css
.pilot-line             /* Standard line */
.pilot-line-dashed      /* Dashed line */
.pilot-line-dotted      /* Dotted line */
.pilot-connector        /* Connector with arrow */
.pilot-connector-dots   /* Connector with dots */
```

### Modules & Containers

```css
.pilot-module           /* Module container with ID label */
.pilot-module-header    /* Module header style */
```

### Status Indicators

```css
.pilot-status           /* Status with dot and label */
.pilot-status-dot       /* Status dot (success, warning, error) */
.pilot-status-dot.pulse /* Animated pulse */
```

### Terminal & Code

```css
.pilot-terminal         /* Terminal container */
.pilot-terminal-header  /* Terminal header */
.pilot-terminal-body    /* Terminal content area */
.pilot-code             /* Inline code */
.pilot-code-block       /* Code block container */
```

### Diagram Elements

```css
.pilot-diagram          /* Diagram container with grid */
.pilot-diagram-grid     /* Grid overlay */
.pilot-node             /* Diagram node */
.pilot-connector-path   /* SVG connector path */
```

### Typography Utilities

```css
.pilot-text             /* Technical font with uppercase */
.pilot-mono             /* Monospace font */
.pilot-industrial       /* Industrial font */
.pilot-uppercase        /* Uppercase with letter-spacing */
.pilot-number           /* Tabular numbers */
```

## Design Principles

### 1. Clarity Over Decoration
- Every element serves a functional purpose
- Visual hierarchy is clear and scannable
- Information density is high but organized

### 2. Technical Precision
- Grid-based layouts (8px base)
- Consistent spacing and alignment
- Sharp edges and defined boundaries

### 3. Machine-Readable Aesthetics
- Monospace fonts for technical content
- Tabular numbers for data
- Code-like syntax where appropriate

### 4. Industrial Authority
- Serious, authoritative tone
- Governmental/documentation feel
- No playful or whimsical elements

### 5. Modular Composition
- Atomic design principles
- Components compose together
- Flexible but consistent

## Accessibility

### Color Contrast
All color combinations meet WCAG 2.1 Level AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Keyboard Navigation
- All interactive components are keyboard accessible
- Focus states are clearly visible
- Tab order follows logical flow

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Meaningful text alternatives

### Reduced Motion
- Animations respect `prefers-reduced-motion`
- Essential animations are subtle
- No flashing or rapid movements

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

Web Components use standard Custom Elements API with Shadow DOM.

## Customization

### CSS Variables

Override any design token by redefining CSS variables:

```css
:root {
  --color-brand-primary: #your-color;
  --font-technical: 'Your Font', monospace;
  --pilot-grid-size: 16px;
}
```

### Dark Mode

Enable dark mode by adding `data-theme="dark"` to any element:

```html
<body data-theme="dark">
  <!-- All components automatically adapt -->
</body>
```

## Examples

### System Dashboard

```html
<pilot-grid columns="3" gap="4">
  <pilot-panel title="SYSTEM STATUS" collapsible>
    <pilot-status variant="success" pulse>OPERATIONAL</pilot-status>
    <pilot-divider variant="dashed"></pilot-divider>
    <pilot-label variant="technical">UPTIME: 99.9%</pilot-label>
  </pilot-panel>
  
  <pilot-panel title="MODULES">
    <pilot-card variant="technical" padding="sm">
      <pilot-badge variant="technical" size="sm">MODULE-01</pilot-badge>
      <pilot-status variant="success" size="sm">Active</pilot-status>
    </pilot-card>
  </pilot-panel>
  
  <pilot-panel title="LOGS">
    <pilot-terminal show-prompt>
      System initialized successfully
    </pilot-terminal>
  </pilot-panel>
</pilot-grid>
```

### Technical Documentation

```html
<pilot-card variant="technical" padding="xl">
  <h2 slot="header" class="pilot-industrial">API REFERENCE</h2>
  
  <pilot-annotation type="technical">
    Base endpoint: https://api.system.local/v1
  </pilot-annotation>
  
  <pilot-code-block language="bash" show-line-numbers>
    $ curl -X GET \\
      -H "Authorization: Bearer TOKEN" \\
      https://api.system.local/v1/status
  </pilot-code-block>
  
  <pilot-divider variant="technical" label="PARAMETERS"></pilot-divider>
  
  <pilot-grid columns="2" gap="4">
    <pilot-input 
      label="API Key" 
      technical
      placeholder="key_..."
    ></pilot-input>
    <pilot-input 
      label="Endpoint" 
      technical
      value="/v1/status"
    ></pilot-input>
  </pilot-grid>
</pilot-card>
```

## File Structure

```
├── components/           # Web Components
├── styles/              # CSS files
│   ├── variables.css    # CSS custom properties
│   └── patterns.css     # CSS utility patterns
├── tests/               # Test files
├── docs/                # Documentation
│   ├── DESIGN-PHILOSOPHY.md
│   └── QUICK-REFERENCE.md
├── tokens.json          # Design tokens (JSON format)
├── components.js        # Web Components bundle
├── demo.html           # Interactive demo
└── README.md           # This documentation
```
├── components/           # Web Components (ES modules)
├── tests/               # Test files
├── docs/                # Documentation
│   ├── DESIGN-PHILOSOPHY.md
│   └── QUICK-REFERENCE.md
├── tokens.json          # Design tokens (JSON format)
├── variables.css        # CSS custom properties
├── patterns.css         # CSS utility patterns
├── components.js        # Web Components bundle
├── demo.html           # Interactive demo
└── README.md           # This documentation
```

## Contributing

When adding new components or patterns:

1. Follow the industrial/technical aesthetic
2. Maintain the monochromatic palette
3. Use existing design tokens
4. Ensure accessibility compliance
5. Document all props and variants
6. Provide usage examples

## License

MIT License - See LICENSE file for details

---

**Pilot Design System v1.0.0**
Built for precision, clarity, and technical excellence.
