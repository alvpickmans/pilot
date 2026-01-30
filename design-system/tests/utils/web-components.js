/**
 * Test Utilities for Pilot Design System Web Components
 * 
 * These utilities help with mounting, cleanup, and testing Web Components
 * in both Vitest (happy-dom) and browser environments.
 */

/**
 * Register a custom element if not already defined
 * Prevents errors when re-registering in tests
 */
export function registerComponent(name, ComponentClass) {
  if (!customElements.get(name)) {
    customElements.define(name, ComponentClass);
  }
  return customElements.get(name);
}

/**
 * Create and mount a component to the DOM
 * 
 * @param {string} tagName - Custom element tag name
 * @param {Object} attributes - Attributes to set (supports boolean attributes)
 * @param {string} innerHTML - Inner HTML content (for slots)
 * @returns {HTMLElement} The mounted element
 * 
 * @example
 * const button = mount('pilot-button', { variant: 'primary', disabled: true }, 'Click me');
 */
export function mount(tagName, attributes = {}, innerHTML = '') {
  const element = document.createElement(tagName);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) element.setAttribute(key, '');
    } else if (value !== undefined && value !== null) {
      element.setAttribute(key, String(value));
    }
  });
  
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  document.body.appendChild(element);
  return element;
}

/**
 * Remove all mounted components from the DOM
 * Call this in afterEach() to ensure test isolation
 */
export function cleanup() {
  document.body.innerHTML = '';
}

/**
 * Wait for component to finish rendering
 * Useful after mounting or attribute changes
 * 
 * @param {HTMLElement} element - The element to wait for
 * @returns {Promise<HTMLElement>} The element when rendered
 */
export function waitForRender(element) {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      resolve(element);
    });
  });
}

/**
 * Wait for a specific amount of time
 * Use sparingly - prefer waitForRender or waitForSelector
 * 
 * @param {number} ms - Milliseconds to wait
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait for an element to appear in the DOM
 * Useful for async rendering or conditional content
 * 
 * @param {HTMLElement} root - Root element to search within
 * @param {string} selector - CSS selector
 * @param {number} timeout - Maximum time to wait (ms)
 * @returns {Promise<Element>} The found element
 */
export function waitForSelector(root, selector, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const element = root.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver(() => {
      const el = root.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    
    observer.observe(root, { childList: true, subtree: true });
    
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Simulate a click event on an element
 * 
 * @param {HTMLElement} element - Element to click
 * @param {Object} options - Event options
 */
export function click(element, options = {}) {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    ...options
  });
  element.dispatchEvent(event);
}

/**
 * Simulate keyboard events
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} key - Key to press (e.g., 'Enter', 'Escape', 'Tab')
 * @param {Object} options - Additional event options
 */
export function pressKey(element, key, options = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...options
  });
  element.dispatchEvent(event);
}

/**
 * Get computed styles from shadow DOM element
 * 
 * @param {HTMLElement} element - Element with shadow root
 * @param {string} selector - Selector within shadow DOM
 * @returns {CSSStyleDeclaration} Computed styles
 */
export function getShadowStyles(element, selector) {
  const shadowElement = element.shadowRoot?.querySelector(selector);
  if (!shadowElement) {
    throw new Error(`Element ${selector} not found in shadow DOM`);
  }
  return window.getComputedStyle(shadowElement);
}

/**
 * Check if element is visible (not just in DOM)
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is visible
 */
export function isVisible(element) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0';
}

/**
 * Mock CSS custom properties for testing
 * Call this in test setup if CSS variables aren't available
 */
export function mockCSSVariables() {
  if (typeof window.CSS === 'undefined') {
    window.CSS = {
      supports: () => true,
      escape: (str) => str.replace(/([\x00-\x1f\x7f-\x9f])/g, '\\$1')
    };
  }
}

/**
 * Test helper to check if element has all expected attributes
 * 
 * @param {HTMLElement} element - Element to check
 * @param {Object} expected - Expected attributes
 * @returns {boolean} Whether all attributes match
 */
export function hasAttributes(element, expected) {
  return Object.entries(expected).every(([key, value]) => {
    if (typeof value === 'boolean') {
      return element.hasAttribute(key) === value;
    }
    return element.getAttribute(key) === String(value);
  });
}

/**
 * Create a test fixture with multiple components
 * Useful for testing component interactions
 * 
 * @param {string} html - HTML string to mount
 * @returns {HTMLElement} Container with mounted content
 */
export function createFixture(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}

/**
 * Helper to test attribute changes trigger re-renders
 * 
 * @param {HTMLElement} element - Component element
 * @param {string} attribute - Attribute name
 * @param {string} value - New value
 * @returns {Promise<void>}
 */
export async function changeAttribute(element, attribute, value) {
  element.setAttribute(attribute, value);
  await waitForRender(element);
}

/**
 * Capture console warnings/errors during test
 * Useful for testing error handling
 * 
 * @returns {Object} Object with getWarnings() and getErrors() methods
 */
export function captureConsole() {
  const warnings = [];
  const errors = [];
  
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => warnings.push(args.join(' '));
  console.error = (...args) => errors.push(args.join(' '));
  
  return {
    getWarnings: () => warnings,
    getErrors: () => errors,
    restore: () => {
      console.warn = originalWarn;
      console.error = originalError;
    }
  };
}

/**
 * Mock matchMedia for responsive component testing
 */
export function mockMatchMedia(matches = false) {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches,
      media: '',
      onchange: null,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {}
    };
  };
}

/**
 * ResizeObserver mock for components using it
 */
export class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }
  
  observe(element) {
    this.elements.add(element);
  }
  
  unobserve(element) {
    this.elements.delete(element);
  }
  
  disconnect() {
    this.elements.clear();
  }
  
  // Helper to trigger resize callback in tests
  trigger(entries) {
    this.callback(entries, this);
  }
}

/**
 * Install common mocks for testing
 * Call this in your test setup file
 */
export function installMocks() {
  mockCSSVariables();
  mockMatchMedia();
  
  if (typeof window.ResizeObserver === 'undefined') {
    window.ResizeObserver = MockResizeObserver;
  }
  
  // Mock requestIdleCallback if not available
  if (typeof window.requestIdleCallback === 'undefined') {
    window.requestIdleCallback = (cb) => setTimeout(cb, 1);
  }
}
