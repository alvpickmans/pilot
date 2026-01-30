# Quick Start: Testing Implementation

This guide will get you up and running with testing in 10 minutes.

## Prerequisites

- Node.js 18+ installed
- Pilot Design System codebase

## Step 1: Install Dependencies (2 minutes)

```bash
cd design-system
npm install
```

This installs:
- Vitest + happy-dom (fast unit testing)
- @web/test-runner + Playwright (browser testing)
- @open-wc/testing (Web Component helpers)
- Testing Library (DOM assertions)

## Step 2: Run Your First Test (1 minute)

```bash
# Run unit tests
npm run test:unit

# You should see:
# ✓ tests/unit/button.test.js (15 tests)
# Test Files  1 passed (1)
# Tests  15 passed (15)
```

## Step 3: Run Tests in Watch Mode (ongoing)

```bash
# Unit tests with hot reload
npm run test:unit:watch

# Now edit tests/unit/button.test.js and watch tests re-run automatically
```

## Step 4: Try the UI (optional)

```bash
# Open Vitest UI in browser
npm run test:unit:ui

# Navigate to http://localhost:51204/__vitest__/
```

## Step 5: Run Integration Tests (2 minutes)

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run integration tests in real browsers
npm run test:integration

# You should see tests running in Chrome and Firefox
```

## What's Been Set Up

### Files Created

```
design-system/
├── package.json                    # Dependencies and scripts
├── vitest.config.js               # Vitest configuration
├── web-test-runner.config.js      # Web Test Runner configuration
├── TESTING-PLAN.md                # Comprehensive testing strategy
├── tests/
│   ├── README.md                  # Testing documentation
│   ├── setup/
│   │   └── vitest-setup.js        # Test environment setup
│   ├── utils/
│   │   └── web-components.js      # Test helpers
│   ├── unit/
│   │   └── button.test.js         # Sample unit tests
│   └── integration/
│       └── button.test.js         # Sample integration tests
```

### Test Utilities Available

```javascript
import { 
  mount,           // Create and mount component
  cleanup,         // Clean up DOM
  waitForRender,   // Wait for component render
  click,           // Simulate click
  pressKey         // Simulate key press
} from './tests/utils/web-components.js';
```

## Next Steps

### 1. Write Tests for Your Next Component

Copy `tests/unit/button.test.js` and adapt it:

```bash
cp tests/unit/button.test.js tests/unit/card.test.js
# Edit tests/unit/card.test.js for PilotCard
```

### 2. Run All Tests

```bash
npm test
```

### 3. Check Coverage

```bash
npm run test:coverage
# Open coverage/index.html in browser
```

### 4. Add CI/CD

Copy this into `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npx playwright install
      - run: npm run test:integration
```

## Common Commands Cheat Sheet

```bash
# Unit tests
npm run test:unit              # Run once
npm run test:unit:watch        # Watch mode
npm run test:unit:ui           # UI mode

# Integration tests
npm run test:integration       # Run once
npm run test:integration:watch # Watch mode
npm run test:a11y             # Accessibility only

# All tests
npm test                      # Run everything
npm run test:coverage         # With coverage report
```

## Troubleshooting

**Tests fail with "Cannot find module"**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Playwright browsers not found**
```bash
npx playwright install
```

**Tests timeout**
```bash
# Increase timeout in vitest.config.js
testTimeout: 10000
```

## Success Criteria

You've successfully set up testing when:
- [ ] `npm run test:unit` passes with 15+ tests
- [ ] `npm run test:integration` passes in Chrome and Firefox
- [ ] Watch mode re-runs tests on file changes
- [ ] Coverage report generates successfully

## Need Help?

- Read the full [Testing Plan](./TESTING-PLAN.md)
- Check [tests/README.md](./tests/README.md)
- Review sample tests in `tests/unit/button.test.js`

---

**Time to complete:** 10 minutes  
**Tests running:** ✅ 15 unit tests + integration tests  
**Next:** Write tests for remaining 14 components
