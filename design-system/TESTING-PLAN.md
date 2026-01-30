# Testing Strategy for Pilot Design System

## Executive Summary

This document outlines a comprehensive testing strategy for the Pilot Design System's Web Components. After evaluating multiple options, we recommend a **hybrid approach** combining Vitest for fast unit tests and @web/test-runner for browser-based integration tests.

## Testing Options Analysis

### Option 1: Vitest + happy-dom (Recommended for Unit Tests)

**Pros:**
- Fast execution (~100ms per test)
- Modern ES modules support (no transpilation needed)
- Native TypeScript support
- Excellent DX with watch mode and UI
- Snapshot testing built-in
- Matches the project's modern, dependency-free philosophy

**Cons:**
- happy-dom/jsdom don't fully support all Web Component APIs
- Shadow DOM testing requires workarounds
- No real browser rendering

**Best for:** Component logic, attribute handling, event testing

### Option 2: @open-wc/testing + @web/test-runner

**Pros:**
- Purpose-built for Web Components
- Runs in real browsers (Chrome, Firefox, WebKit)
- Excellent Shadow DOM support
- Built-in accessibility testing (chai-a11y-axe)
- Semantic DOM diffing
- Hot module replacement in watch mode

**Cons:**
- Slower than Vitest (browser startup time)
- More complex configuration
- Additional dependencies

**Best for:** Integration tests, accessibility tests, visual regression

### Option 3: Playwright

**Pros:**
- Full browser automation
- Excellent for visual regression testing
- Cross-browser testing
- Can test user interactions realistically

**Cons:**
- Slowest option
- Overkill for component unit tests
- Heavy dependency

**Best for:** E2E testing, visual regression, complex interactions

### Option 4: Jest + jsdom

**Pros:**
- Industry standard
- Large ecosystem

**Cons:**
- Requires ESM configuration gymnastics
- Slower than Vitest
- More configuration needed
- Not as modern as Vitest

**Verdict:** Not recommended - Vitest is a better modern alternative

## Recommended Architecture

```
design-system/
├── tests/
│   ├── unit/                 # Vitest tests (fast)
│   │   ├── button.test.js
│   │   ├── card.test.js
│   │   └── ...
│   ├── integration/          # Web Test Runner (browser)
│   │   ├── button.test.js
│   │   ├── modal.test.js
│   │   └── ...
│   ├── setup/                # Test setup files
│   │   ├── vitest-setup.js
│   │   └── wtr-setup.js
│   └── fixtures/             # Test fixtures
├── vitest.config.js          # Vitest configuration
├── web-test-runner.config.js # WTR configuration
└── package.json
```

## Implementation Plan

### Phase 1: Foundation (Week 1)

#### 1.1 Setup Vitest for Unit Testing

```bash
npm init -y
npm install -D vitest happy-dom @testing-library/dom @testing-library/jest-dom
```

**vitest.config.js:**
```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup/vitest-setup.js'],
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['components/**/*.js'],
      exclude: ['components/index.js', 'components/shared.js']
    }
  },
  resolve: {
    conditions: ['browser']
  }
});
```

**tests/setup/vitest-setup.js:**
```javascript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/dom';

// Mock CSS custom properties for tests
global.CSS = {
  supports: () => true,
  escape: (str) => str
};

// Clean up after each test
afterEach(() => {
  cleanup();
  // Clear custom elements registry between tests
  if (window.customElements) {
    // Note: Can't actually clear registry, but we can track what's defined
  }
});
```

#### 1.2 Setup Web Test Runner for Integration Testing

```bash
npm install -D @web/test-runner @web/test-runner-playwright @open-wc/testing @open-wc/semantic-dom-diff chai-a11y-axe
```

**web-test-runner.config.js:**
```javascript
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'tests/integration/**/*.test.js',
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    // playwrightLauncher({ product: 'webkit' }) // Uncomment for Safari
  ],
  coverage: true,
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: 5000
    }
  }
};
```

### Phase 2: Unit Tests with Vitest (Week 2)

#### 2.1 Create Test Utilities

**tests/utils/web-components.js:**
```javascript
/**
 * Helper to register a custom element for testing
 * Handles cleanup and re-registration
 */
export async function registerComponent(name, ComponentClass) {
  if (!customElements.get(name)) {
    customElements.define(name, ComponentClass);
  }
  return customElements.get(name);
}

/**
 * Create and mount a component
 */
export function mount(tagName, attributes = {}, innerHTML = '') {
  const element = document.createElement(tagName);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) element.setAttribute(key, '');
    } else {
      element.setAttribute(key, value);
    }
  });
  
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  document.body.appendChild(element);
  return element;
}

/**
 * Cleanup mounted components
 */
export function cleanup() {
  document.body.innerHTML = '';
}

/**
 * Wait for component to render
 */
export function waitForRender(element) {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      resolve(element);
    });
  });
}
```

#### 2.2 Write Unit Tests for Each Component

**Example: tests/unit/button.test.js**

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, cleanup, waitForRender } from '../utils/web-components.js';
import { PilotButton } from '../../components/button.js';

describe('PilotButton', () => {
  beforeEach(() => {
    if (!customElements.get('pilot-button')) {
      customElements.define('pilot-button', PilotButton);
    }
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const button = mount('pilot-button', {}, 'Click me');
      await waitForRender(button);
      
      expect(button.shadowRoot).toBeTruthy();
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton).toBeTruthy();
      expect(innerButton.textContent).toBe('Click me');
    });

    it('applies variant attribute', async () => {
      const button = mount('pilot-button', { variant: 'primary' });
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('variant')).toBe('primary');
    });

    it('applies size attribute', async () => {
      const button = mount('pilot-button', { size: 'lg' });
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('size')).toBe('lg');
    });

    it('handles disabled state', async () => {
      const button = mount('pilot-button', { disabled: true });
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.hasAttribute('disabled')).toBe(true);
    });

    it('handles loading state', async () => {
      const button = mount('pilot-button', { loading: true });
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.hasAttribute('loading')).toBe(true);
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when variant changes', async () => {
      const button = mount('pilot-button', { variant: 'secondary' });
      await waitForRender(button);
      
      button.setAttribute('variant', 'primary');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('variant')).toBe('primary');
    });

    it('re-renders when size changes', async () => {
      const button = mount('pilot-button', { size: 'sm' });
      await waitForRender(button);
      
      button.setAttribute('size', 'lg');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('size')).toBe('lg');
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const button = mount('pilot-button', {}, '<span>Custom Content</span>');
      await waitForRender(button);
      
      const slot = button.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('applies CSS variables with fallbacks', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      const styles = getComputedStyle(innerButton);
      
      // Check that styles are applied (actual values depend on CSS)
      expect(styles.display).toBe('inline-flex');
    });
  });
});
```

### Phase 3: Integration Tests with Web Test Runner (Week 3)

#### 3.1 Setup Open WC Testing

**tests/setup/wtr-setup.js:**
```javascript
import { chaiA11yAxe } from 'chai-a11y-axe';
import { fixture, html } from '@open-wc/testing';

// Make fixture available globally for convenience
window.fixture = fixture;
window.html = html;

// Configure chai
typeof window.chai !== 'undefined' && window.chai.use(chaiA11yAxe);
```

#### 3.2 Write Integration Tests

**Example: tests/integration/button.test.js**

```javascript
import { fixture, html, expect } from '@open-wc/testing';
import '../../components/button.js';

describe('PilotButton Integration', () => {
  describe('Accessibility', () => {
    it('passes a11y audit for default button', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      await expect(el).to.be.accessible();
    });

    it('passes a11y audit for disabled button', async () => {
      const el = await fixture(html`<pilot-button disabled>Click me</pilot-button>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('Shadow DOM', () => {
    it('renders correct shadow DOM structure', async () => {
      const el = await fixture(html`<pilot-button variant="primary">Click me</pilot-button>`);
      
      expect(el).shadowDom.to.equal(`
        <button variant="primary" size="md">
          <slot></slot>
        </button>
      `);
    });

    it('matches semantic snapshot', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('User Interactions', () => {
    it('responds to click events', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      let clicked = false;
      
      el.addEventListener('click', () => { clicked = true; });
      el.shadowRoot.querySelector('button').click();
      
      expect(clicked).to.be.true;
    });

    it('does not respond when disabled', async () => {
      const el = await fixture(html`<pilot-button disabled>Click me</pilot-button>`);
      let clicked = false;
      
      el.addEventListener('click', () => { clicked = true; });
      const button = el.shadowRoot.querySelector('button');
      
      expect(button.disabled).to.be.true;
    });
  });

  describe('Visual States', () => {
    it('applies hover styles', async () => {
      const el = await fixture(html`<pilot-button>Hover me</pilot-button>`);
      const button = el.shadowRoot.querySelector('button');
      
      // Trigger hover (browser-specific)
      button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      
      // Check that styles change (actual implementation depends on CSS)
      const styles = getComputedStyle(button, '::before');
      expect(styles.transform).to.not.be.empty;
    });
  });
});
```

### Phase 4: Component-Specific Test Suites (Week 4)

#### 4.1 Complex Component Tests (Modal)

**tests/unit/modal.test.js:**

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, cleanup, waitForRender } from '../utils/web-components.js';
import { PilotModal } from '../../components/modal.js';

describe('PilotModal', () => {
  beforeEach(() => {
    if (!customElements.get('pilot-modal')) {
      customElements.define('pilot-modal', PilotModal);
    }
  });

  afterEach(() => {
    cleanup();
    // Restore body overflow
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('is hidden by default', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
      expect(modal.style.display).toBe('none');
    });

    it('shows when open attribute is set', async () => {
      const modal = mount('pilot-modal', { open: true });
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('renders with title', async () => {
      const modal = mount('pilot-modal', { title: 'Test Modal' });
      await waitForRender(modal);
      
      const title = modal.shadowRoot.querySelector('.modal-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Test Modal');
    });

    it('renders close button when dismissible', async () => {
      const modal = mount('pilot-modal', { dismissible: true });
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeTruthy();
    });

    it('hides close button when not dismissible', async () => {
      const modal = mount('pilot-modal', { dismissible: false });
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeFalsy();
    });
  });

  describe('Methods', () => {
    it('opens with open() method', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      modal.open();
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('closes with close() method', async () => {
      const modal = mount('pilot-modal', { open: true });
      await waitForRender(modal);
      
      modal.close();
      expect(modal.hasAttribute('open')).toBe(false);
    });
  });

  describe('Event Handling', () => {
    it('closes on Escape key when dismissible', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true });
      await waitForRender(modal);
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('does not close on Escape when not dismissible', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: false });
      await waitForRender(modal);
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('closes on backdrop click when dismissible', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true });
      await waitForRender(modal);
      
      modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
      expect(modal.hasAttribute('open')).toBe(false);
    });
  });

  describe('Focus Management', () => {
    it('traps focus within modal', async () => {
      const modal = mount('pilot-modal', { open: true });
      await waitForRender(modal);
      
      const container = modal.shadowRoot.querySelector('.modal-container');
      expect(document.activeElement).toBe(container);
    });

    it('restores focus on close', async () => {
      const triggerButton = document.createElement('button');
      document.body.appendChild(triggerButton);
      triggerButton.focus();
      
      const modal = mount('pilot-modal', { open: true });
      await waitForRender(modal);
      
      modal.close();
      expect(document.activeElement).toBe(triggerButton);
      
      triggerButton.remove();
    });
  });

  describe('Body Scroll', () => {
    it('prevents body scroll when open', async () => {
      mount('pilot-modal', { open: true });
      await waitForRender();
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', async () => {
      const modal = mount('pilot-modal', { open: true });
      await waitForRender(modal);
      
      modal.close();
      expect(document.body.style.overflow).toBe('');
    });
  });
});
```

#### 4.2 Input Component Tests

**tests/unit/input.test.js:**

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, cleanup, waitForRender } from '../utils/web-components.js';
import { PilotInput } from '../../components/input.js';

describe('PilotInput', () => {
  beforeEach(() => {
    if (!customElements.get('pilot-input')) {
      customElements.define('pilot-input', PilotInput);
    }
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default type text', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.type).toBe('text');
    });

    it('renders with specified type', async () => {
      const input = mount('pilot-input', { type: 'password' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.type).toBe('password');
    });

    it('renders with placeholder', async () => {
      const input = mount('pilot-input', { placeholder: 'Enter text' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.placeholder).toBe('Enter text');
    });

    it('renders with value', async () => {
      const input = mount('pilot-input', { value: 'test value' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('test value');
    });

    it('renders label when provided', async () => {
      const input = mount('pilot-input', { label: 'Username' });
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Username');
    });

    it('renders hint when provided', async () => {
      const input = mount('pilot-input', { hint: 'Helper text' });
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeTruthy();
      expect(hint.textContent).toBe('Helper text');
    });

    it('renders error when provided', async () => {
      const input = mount('pilot-input', { error: 'Error message' });
      await waitForRender(input);
      
      const error = input.shadowRoot.querySelector('.error');
      expect(error).toBeTruthy();
      expect(error.textContent).toBe('Error message');
    });

    it('hides hint when error is present', async () => {
      const input = mount('pilot-input', { 
        hint: 'Helper text', 
        error: 'Error message' 
      });
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeFalsy();
    });
  });

  describe('States', () => {
    it('handles disabled state', async () => {
      const input = mount('pilot-input', { disabled: true });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.disabled).toBe(true);
    });

    it('handles readonly state', async () => {
      const input = mount('pilot-input', { readonly: true });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.readOnly).toBe(true);
    });

    it('applies error styling', async () => {
      const input = mount('pilot-input', { error: 'Error' });
      await waitForRender(input);
      
      expect(input.hasAttribute('error')).toBe(true);
    });
  });

  describe('Technical Variant', () => {
    it('applies technical styling when attribute present', async () => {
      const input = mount('pilot-input', { technical: true });
      await waitForRender(input);
      
      const wrapper = input.shadowRoot.querySelector('.input-wrapper');
      expect(wrapper.classList.contains('technical')).toBe(true);
    });
  });
});
```

### Phase 5: Test Scripts & CI/CD (Week 5)

#### 5.1 Package.json Scripts

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:ui": "vitest --ui",
    "test:integration": "web-test-runner",
    "test:integration:watch": "web-test-runner --watch",
    "test:coverage": "vitest run --coverage",
    "test:a11y": "web-test-runner --group a11y"
  }
}
```

#### 5.2 GitHub Actions Workflow

**.github/workflows/test.yml:**

```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright
      run: npx playwright install
    
    - name: Run integration tests
      run: npm run test:integration
```

## Component Test Coverage Matrix

| Component | Unit Tests | Integration Tests | A11y Tests | Priority |
|-----------|-----------|-------------------|------------|----------|
| button | ✅ Full | ✅ Full | ✅ Full | High |
| card | ✅ Full | ✅ Full | ✅ Full | High |
| input | ✅ Full | ✅ Full | ✅ Full | High |
| modal | ✅ Full | ✅ Full | ✅ Full | High |
| select | ✅ Full | ✅ Full | ✅ Full | High |
| terminal | ✅ Full | ✅ Basic | ✅ Basic | Medium |
| badge | ✅ Full | ✅ Basic | ✅ Basic | Medium |
| label | ✅ Full | ✅ Basic | ✅ Basic | Medium |
| status | ✅ Full | ✅ Basic | ✅ Basic | Medium |
| code-block | ✅ Full | ✅ Basic | ✅ Basic | Medium |
| annotation | ✅ Full | ✅ Basic | ✅ Basic | Low |
| measurement | ✅ Full | ✅ Basic | ✅ Basic | Low |
| divider | ✅ Basic | ✅ Basic | ✅ Basic | Low |
| grid | ✅ Basic | ✅ Basic | ✅ Basic | Low |
| panel | ✅ Full | ✅ Basic | ✅ Basic | Medium |

## Testing Best Practices

### 1. Test Structure

```javascript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Tests for initial render, attributes, slots
  });
  
  describe('Attribute Changes', () => {
    // Tests for observedAttributes
  });
  
  describe('User Interactions', () => {
    // Tests for clicks, keyboard, focus
  });
  
  describe('Accessibility', () => {
    // Tests for ARIA, keyboard navigation
  });
  
  describe('Edge Cases', () => {
    // Tests for error states, empty values
  });
});
```

### 2. Naming Conventions

- Test files: `component-name.test.js`
- Test descriptions: "should [expected behavior] when [condition]"
- Example: "should render disabled state when disabled attribute is set"

### 3. Mocking Guidelines

```javascript
// Mock CSS custom properties if needed
window.CSS = {
  supports: () => true
};

// Mock requestAnimationFrame for animations
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Mock custom elements for isolation
const originalDefine = customElements.define;
beforeEach(() => {
  customElements.define = vi.fn((name, ctor) => {
    if (!customElements.get(name)) {
      originalDefine.call(customElements, name, ctor);
    }
  });
});
```

### 4. Accessibility Testing Checklist

- [ ] Component passes axe-core audit
- [ ] Keyboard navigation works
- [ ] Focus management is correct
- [ ] ARIA attributes are appropriate
- [ ] Color contrast meets WCAG 2.1 AA

## Migration Path

### For Existing Projects

1. **Week 1:** Setup Vitest, write tests for 3 high-priority components
2. **Week 2:** Complete unit tests for all components
3. **Week 3:** Setup Web Test Runner, write integration tests
4. **Week 4:** Add accessibility tests, CI/CD integration
5. **Week 5:** Documentation, team training

### Gradual Adoption

If full implementation is too heavy:
1. Start with Vitest only (fastest to implement)
2. Add Web Test Runner later for critical components
3. Add Playwright for visual regression when needed

## Conclusion

This testing strategy provides:
- **Fast feedback** via Vitest unit tests
- **Real browser validation** via Web Test Runner
- **Comprehensive coverage** of all 15 components
- **Accessibility assurance** via automated a11y tests
- **CI/CD integration** for quality gates

The hybrid approach balances speed and accuracy while maintaining the project's philosophy of modern, clean tooling without unnecessary dependencies.

## Next Steps

1. Review and approve this plan
2. Create package.json with test dependencies
3. Implement Phase 1 (Vitest setup)
4. Begin writing tests for high-priority components (button, input, modal)
5. Iterate and refine based on team feedback
