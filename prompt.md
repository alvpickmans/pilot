# Agent Prompt: Create Pilot Design System Component

Use this prompt when creating a new Web Component for the Pilot Design System.

## Initial Setup

1. **Find the next ready task:**
   ```bash
   bd ready
   ```
   
   **Priority Order:** Always tackle tasks by priority level:
   - **P0 (Critical)** - Fix bugs, blockers, or critical features first
   - **P1 (High)** - Important features and improvements next
   - **P2 (Medium)** - New components and enhancements
   - **P3 (Low)** - Nice-to-have features last
   
   When multiple tasks are ready, pick the highest priority one.

2. **Show task details:**
    ```bash
    bd show <task-id>
    ```

## Component Development Workflow

### 1. Study Existing Components

Read similar existing components to understand patterns:
```bash
# List all components
ls components/*.js

# Read a similar component (e.g., select.js for dropdowns, input.js for form elements)
cat components/select.js
```

Key patterns to follow:
- Component class name: `PilotComponentName` (PascalCase)
- Custom element name: `pilot-component-name` (kebab-case)
- Private methods: `_methodName` (underscore prefix)
- CSS variables with fallbacks: `var(--prop, fallback)`
- Technical bracket styling for form elements
- Use `attributeChangedCallback` for reactive props
- Re-render on attribute changes

### 2. Create Component File

Create `components/<component-name>.js`:

```javascript
/**
 * Pilot Design System - ComponentName Component
 *
 * Brief description of what the component does.
 */

import { baseStyles } from './shared.js';

export class PilotComponentName extends HTMLElement {
  static get observedAttributes() {
    return ['attr1', 'attr2', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Initialize state
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
      }
      
      /* Component styles using CSS variables */
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    // Add event listeners
  }

  _removeEventListeners() {
    // Clean up event listeners
  }

  render() {
    // Build shadow DOM
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <!-- Component HTML -->
    `;
    
    this._attachEventListeners();
  }

  _attachEventListeners() {
    // Attach event listeners to rendered elements
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('pilot-component-name', PilotComponentName);
```

### 3. Export Component

Add export to `components/index.js`:
```javascript
export { PilotComponentName } from './component-name.js';
```

### 4. Create Tests

Create `components/<component-name>.test.js`:

```javascript
/**
 * Pilot Design System - ComponentName Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./component-name.js');
const { PilotComponentName } = module;

describe('PilotComponentName', () => {
  beforeEach(() => {
    registerComponent('pilot-component-name', PilotComponentName);
  });

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(customElements.get('pilot-component-name')).toBeDefined();
  });

  // Add more tests following existing patterns
});
```

**Testing Tips:**
- When components re-render their entire shadow DOM (using `innerHTML`), DOM references become stale
- **Solution:** Call internal methods directly instead of clicking:
  ```javascript
  // ❌ Avoid: Clicking can fail due to DOM replacement
  trigger.click();
  
  // ✅ Better: Call internal methods directly
  component._openDropdown(); // or _toggleCalendar(), etc.
  await waitForRender(component);
  ```
- Always re-query elements after `waitForRender()` when the component might have re-rendered

### 5. Add to Demo

Add examples to `demo.html` in an appropriate section:

```html
<section class="demo-section">
  <h2 class="demo-title">Component Name</h2>
  <p class="demo-subtitle">Brief description</p>
  
  <div class="demo-grid demo-grid-2">
    <div class="component-showcase">
      <pilot-component-name 
        attribute="value"
      ></pilot-component-name>
    </div>
  </div>
</section>
```

Update component count in footer if needed.

### 6. Run Tests

```bash
# Run all tests
npm test

# Run specific component tests
npm test -- components/<component-name>.test.js
```

All tests must pass before committing.

## Landing the Plane

### 1. Sync and Close Task

```bash
bd sync
bd close <task-id>
```

### 2. Commit Changes

```bash
git add -A
git commit -m "feat: add pilot-component-name

- Feature 1
- Feature 2
- Tests included
- Added to demo.html"
```

### 3. Push to Remote

```bash
git push
```

**Note:** If SSH keys are not configured, the push will fail. In that case:
1. Document that manual push is required
2. Provide the commit hash and branch info
3. User will need to push manually

### 4. Verify

```bash
git status  # Should show "up to date with origin"
```

## Design System Conventions

### CSS Variables
- Colors: `--color-category-scale` (e.g., `--color-gray-500`)
- Typography: `--font-family`, `--font-size-scale`
- Spacing: `--spacing-scale` (e.g., `--spacing-4`)
- Always use fallbacks: `var(--prop, fallback)`

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

### Borders
- Standard: 1px solid
- Technical: 1.5px solid (heavy emphasis)
- Radius: 0px (sharp corners)

## Resources

- AGENTS.md - Full guidelines and conventions
- components/shared.js - Shared utilities and base styles
- tests/web-components.js - Test utilities
- demo.html - Component showcase

## Example Task Reference

For a complete example, see:
- Task: pilot-8xa (Create pilot-datepicker component)
- Files: components/datepicker.js, components/datepicker.test.js
- Commit: de9146e
