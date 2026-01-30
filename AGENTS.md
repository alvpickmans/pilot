# AGENTS.md - Pilot Design System

Guidelines for AI agents working on the Pilot Design System codebase.

## Project Overview
Pure HTML/CSS/JS design system with Web Components. No build tools or dependencies.

## Project Structure
```
design-system/
├── tokens.json          # Design tokens (W3C format)
├── variables.css        # CSS custom properties
├── patterns.css         # CSS utility classes
├── components.js        # Web Components (ES modules)
├── demo.html           # Interactive demo
├── README.md           # Documentation
├── QUICK-REFERENCE.md  # Quick lookup
└── DESIGN-PHILOSOPHY.md # Design rationale
```

## Commands

### Development
```bash
# Open demo in browser
open design-system/demo.html
# Serve locally (any static server)
npx serve design-system/
python3 -m http.server 8000
```

### Testing
```bash
# Manual testing - open demo.html and verify components render
# No automated test suite exists yet
```

### Linting
No linting configured - follow style guidelines below.

## Code Style Guidelines

### JavaScript (Web Components)

**Naming Conventions:**
- Component classes: `PilotComponentName` (PascalCase)
- Custom elements: `pilot-component-name` (kebab-case)
- Private methods: `_methodName` (underscore prefix)
- CSS variables: `--category-name` (kebab-case)

**Component Structure:**
```javascript
class PilotComponent extends HTMLElement {
  static get observedAttributes() {
    return ['attr1', 'attr2'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  get styles() {
    return `/* CSS with CSS variables */`;
  }
  render() {
    // Build shadow DOM
  }
  attributeChangedCallback() {
    this.render();
  }
}
customElements.define('pilot-component', PilotComponent);
```

**Code Patterns:**
- Use template literals for CSS and HTML
- Always use CSS custom properties with fallbacks: `var(--prop, fallback)`
- Implement `observedAttributes` for reactive props
- Re-render on `attributeChangedCallback`
- Use semantic HTML elements inside components

### CSS

**Variable Naming:**
- Colors: `--color-category-scale` (e.g., `--color-gray-500`)
- Typography: `--font-family`, `--font-size-scale`
- Spacing: `--spacing-scale` (e.g., `--spacing-4`)
- Technical: `--pilot-*` for system-specific vars

**Class Naming:**
- Utilities: `.pilot-utility-name` (kebab-case)
- Components: No classes needed (use Shadow DOM)
- Modifiers: `[attribute="value"]` selectors in Shadow DOM

**CSS Structure:**
```css
/* Section comments with = lines */
/* ============================================
   SECTION NAME
   ============================================ */
.pilot-class {
  property: var(--css-variable, fallback);
}
```

### HTML

**Component Usage:**
```html
<pilot-component attribute="value" boolean-attribute>
  <slot-content></slot-content>
</pilot-component>
```

**Slot Naming:**
- `header`: Component header content
- `footer`: Component footer content
- default (unnamed): Main content

## Design System Conventions

### Typography
- Labels/buttons: UPPERCASE with letter-spacing
- Code: Monospace (IBM Plex Mono)
- Technical: JetBrains Mono
- Industrial: Chakra Petch (headings)

### Colors
- Primary: Black `#1a1a1a`
- Background: White `#ffffff`
- Accent: Amber `#f59e0b`
- Semantic: Green (success), Red (error), Gray (info)

### Spacing
- Base grid: 8px
- Scale: 0.25rem (4px) increments
- Standard padding: 1rem (16px)

### Borders
- Standard: 1px solid
- Technical: 1.5px solid (heavy emphasis)
- Radius: 0px (sharp corners)

## Error Handling
- Components should fail gracefully with fallbacks
- Use CSS variable fallbacks: `var(--prop, default)`
- Validate attributes in `attributeChangedCallback`
- Never throw errors that break the page

## Documentation
- Update README.md for new components
- Add to QUICK-REFERENCE.md for quick lookup
- Include usage examples in component JSDoc
- Document all attributes and slots

## Git Conventions
```
feat: add pilot-new-component
fix: correct pilot-button hover state
docs: update README with examples
style: fix CSS indentation
refactor: simplify pilot-card shadow DOM
```

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

Always test in demo.html before committing.
