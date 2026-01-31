/**
 * Vitest Setup File
 * 
 * This file runs before each test file to set up the testing environment.
 * It configures mocks, polyfills, and global test utilities.
 */

import '@testing-library/jest-dom';
import { installMocks, cleanup } from './web-components.js';

// Install common mocks
installMocks();

// Clean up DOM after each test
afterEach(() => {
  cleanup();
  
  // Reset any global state
  document.body.style.cssText = '';
  document.documentElement.style.cssText = '';
});

// Global error handler to catch unhandled errors
global.onerror = (err) => {
  console.error('Unhandled error in test:', err);
};

// Extend expect with custom matchers if needed
expect.extend({
  // Example custom matcher
  toBeInShadowDOM(received, selector) {
    const shadowElement = received.shadowRoot?.querySelector(selector);
    const pass = shadowElement !== null;
    
    return {
      pass,
      message: () => 
        pass 
          ? `expected element not to have "${selector}" in shadow DOM`
          : `expected element to have "${selector}" in shadow DOM`
    };
  }
});
