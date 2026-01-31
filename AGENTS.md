# AGENTS.md - Pilot Design System

Guidelines for AI agents working on the Pilot Design System codebase.

## Project Overview
Pure HTML/CSS/JS design system with Web Components. No build tools or dependencies.

## Project Structure
```
├── components/          # Web Components (ES modules)
│   ├── index.js        # Main entry point
│   ├── shared.js       # Shared utilities
│   └── *.js            # Individual components
├── styles/             # CSS files
│   ├── variables.css   # CSS custom properties
│   └── patterns.css    # CSS utility classes
├── tests/              # Test files
├── docs/               # Documentation
│   ├── DESIGN-PHILOSOPHY.md
│   └── QUICK-REFERENCE.md
├── tokens.json         # Design tokens (W3C format)
├── components.js       # Web Components bundle
├── demo.html          # Interactive demo
└── README.md          # Documentation
```

## Commands

### Development
```bash
# Open demo in browser
open demo.html
# Serve locally (any static server)
npx serve .
python3 -m http.server 8000
```

### Testing
```bash
# Run unit tests (Vitest + happy-dom - no browser required)
bun run test:unit

# Run tests in watch mode during development
bun run test:unit:watch

# Run tests with coverage report
bun run test:coverage
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

**Performance - Avoid Full Re-renders on User Input:**
When handling user interactions (clicks, keyboard input), avoid calling `render()` which rebuilds the entire shadow DOM. Instead, update only the changed elements directly:

```javascript
// ❌ BAD: Full re-render causes lag
_handleClick() {
  this._isChecked = !this._isChecked;
  this.render(); // Rebuilds entire DOM - slow!
}

// ✅ GOOD: Targeted updates are instant
_handleClick() {
  this._isChecked = !this._isChecked;
  this._updateVisualState(); // Updates only what changed
}

_updateVisualState() {
  const track = this.shadowRoot.querySelector('.toggle-track');
  const labels = this.shadowRoot.querySelectorAll('.toggle-label');
  
  if (track) {
    track.classList.toggle('checked', this._isChecked);
    track.setAttribute('aria-checked', this._isChecked);
  }
  
  if (labels.length === 2) {
    labels[0].classList.toggle('active', !this._isChecked);
    labels[1].classList.toggle('active', this._isChecked);
  }
}
```

**When to use full re-render:**
- Initial component creation (constructor)
- Structural changes (adding/removing elements, changing labels)
- Attribute changes from outside the component (attributeChangedCallback)

**When to use targeted updates:**
- User interactions (clicks, keypresses)
- Toggle state changes
- Visual state updates that don't change DOM structure

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

## Testing Tips for Web Components

### Testing Components with Re-rendering
When a component re-renders its entire shadow DOM (using `innerHTML`), DOM references become stale. This affects tests that click elements:

**Problem:** Clicking a trigger button that calls `render()` replaces the entire shadow DOM, making subsequent queries fail.

**Solution:** Use internal methods directly in tests instead of clicking:
```javascript
// ❌ Avoid: Clicking can fail due to DOM replacement
const trigger = shadowRoot.querySelector('.trigger');
trigger.click();  // This triggers render() which replaces the DOM
const calendar = shadowRoot.querySelector('.calendar');  // Stale reference!

// ✅ Better: Call internal methods directly
datepicker._openCalendar();  // Or _toggleDropdown(), etc.
await waitForRender(datepicker);
const calendar = datepicker.shadowRoot.querySelector('.calendar');
expect(calendar.classList.contains('open')).toBe(true);
```

**Always re-query elements after `waitForRender()`** when the component might have re-rendered.

### Test Utilities
Import test helpers from `tests/web-components.js`:
```javascript
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';
```

Use `waitForRender()` after any operation that triggers re-rendering.

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

**SSH Permission Issues:**
If you encounter "Permission denied (publickey)" when pushing:
1. The remote uses SSH authentication (`git@github.com:...`)
2. SSH keys are not configured in this environment
3. DO NOT ask the user how to proceed
4. Simply skip the push and inform the user that manual push is required
5. Document the situation in your handoff summary
