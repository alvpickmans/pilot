# Testing Guide for Pilot Design System

This directory contains comprehensive tests for the Pilot Design System Web Components.

## Testing Architecture

We use a **hybrid approach** combining two testing tools:

1. **Vitest + happy-dom** - Fast unit tests (~100ms per test)
2. **@web/test-runner + Playwright** - Real browser integration tests

## Directory Structure

```
tests/
├── unit/                    # Vitest unit tests
│   ├── button.test.js
│   ├── card.test.js
│   ├── input.test.js
│   └── ...
├── integration/             # Web Test Runner tests
│   ├── button.test.js
│   ├── modal.test.js
│   └── ...
├── setup/                   # Test configuration
│   ├── vitest-setup.js
│   └── wtr-setup.js
└── utils/                   # Test utilities
    └── web-components.js
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests once
npm run test:unit

# Run in watch mode (re-runs on file changes)
npm run test:unit:watch

# Run with UI for debugging
npm run test:unit:ui

# Run with coverage report
npm run test:coverage
```

### Integration Tests (Web Test Runner)

```bash
# Run all integration tests
npm run test:integration

# Run in watch mode
npm run test:integration:watch

# Run only accessibility tests
npm run test:a11y
```

### All Tests

```bash
# Run both unit and integration tests
npm test
```

## Writing Tests

### Unit Test Example (Vitest)

```javascript
import { describe, it, expect } from 'vitest';
import { mount, cleanup, waitForRender } from '../utils/web-components.js';
import { PilotButton } from '../../components/button.js';

describe('PilotButton', () => {
  afterEach(() => cleanup());

  it('renders with default attributes', async () => {
    const button = mount('pilot-button', {}, 'Click me');
    await waitForRender(button);
    
    expect(button.shadowRoot).toBeTruthy();
    const innerButton = button.shadowRoot.querySelector('button');
    expect(innerButton.textContent).toBe('Click me');
  });
});
```

### Integration Test Example (@open-wc/testing)

```javascript
import { fixture, html, expect } from '@open-wc/testing';
import '../../components/button.js';

describe('PilotButton Integration', () => {
  it('passes a11y audit', async () => {
    const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
    await expect(el).to.be.accessible();
  });

  it('renders correct shadow DOM', async () => {
    const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
    expect(el).shadowDom.to.equal(`
      <button variant="secondary" size="md">
        <slot></slot>
      </button>
    `);
  });
});
```

## Test Utilities

The `tests/utils/web-components.js` file provides helpful utilities:

- `registerComponent(name, ComponentClass)` - Register custom elements safely
- `mount(tagName, attributes, innerHTML)` - Create and mount components
- `cleanup()` - Remove all mounted components
- `waitForRender(element)` - Wait for component to render
- `click(element)` - Simulate click events
- `pressKey(element, key)` - Simulate keyboard events

## Test Coverage Goals

| Component | Unit | Integration | A11y |
|-----------|------|-------------|------|
| button    | 100% | 100%        | 100% |
| card      | 100% | 100%        | 100% |
| input     | 100% | 100%        | 100% |
| modal     | 100% | 100%        | 100% |
| select    | 100% | 100%        | 100% |
| terminal  | 90%  | 80%         | 80%  |
| badge     | 90%  | 80%         | 80%  |

## Best Practices

### 1. Test Structure

```javascript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Initial render, attributes, slots
  });
  
  describe('Attribute Changes', () => {
    // observedAttributes tests
  });
  
  describe('User Interactions', () => {
    // Click, keyboard, focus
  });
  
  describe('Accessibility', () => {
    // ARIA, keyboard nav
  });
});
```

### 2. Test Naming

Use descriptive test names:
- ✅ "should render disabled state when disabled attribute is set"
- ❌ "test disabled"

### 3. Test Isolation

Always clean up after tests:
```javascript
afterEach(() => {
  cleanup();
});
```

### 4. Async Tests

Always await async operations:
```javascript
it('renders correctly', async () => {
  const button = mount('pilot-button');
  await waitForRender(button);
  expect(button.shadowRoot).toBeTruthy();
});
```

## Troubleshooting

### Common Issues

**1. "customElements is not defined"**
- Solution: Ensure happy-dom environment is configured in vitest.config.js

**2. "Cannot read properties of null (reading 'shadowRoot')"**
- Solution: Add `await waitForRender(element)` after mounting

**3. Tests pass individually but fail together**
- Solution: Ensure `cleanup()` is called in `afterEach()`

**4. Browser tests timeout**
- Solution: Increase timeout in web-test-runner.config.js

## CI/CD Integration

Tests run automatically on GitHub Actions for:
- Pull requests to `main` branch
- Pushes to `main` and `develop` branches

See `.github/workflows/test.yml` for configuration.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/)
- [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/)
- [Testing Library](https://testing-library.com/)
