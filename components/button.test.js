/**
 * PilotButton Unit Tests
 * 
 * Tests for the Pilot Button component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const buttonModule = await import('./button.js');
const { PilotButton } = buttonModule;

describe('PilotButton', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-button', PilotButton);
  });

  // Clean up after each test
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
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(button.textContent.trim()).toBe('Click me');
    });

    it('applies default variant (secondary)', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('variant')).toBe('secondary');
    });

    it('applies default size (md)', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('size')).toBe('md');
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

    it('supports all variants', async () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'technical'];
      
      for (const variant of variants) {
        cleanup();
        const button = mount('pilot-button', { variant });
        await waitForRender(button);
        
        const innerButton = button.shadowRoot.querySelector('button');
        expect(innerButton.getAttribute('variant')).toBe(variant);
      }
    });

    it('supports all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'];
      
      for (const size of sizes) {
        cleanup();
        const button = mount('pilot-button', { size });
        await waitForRender(button);
        
        const innerButton = button.shadowRoot.querySelector('button');
        expect(innerButton.getAttribute('size')).toBe(size);
      }
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

    it('re-renders when disabled changes', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      button.setAttribute('disabled', '');
      await waitForRender(button);
      
      let innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.hasAttribute('disabled')).toBe(true);
      
      button.removeAttribute('disabled');
      await waitForRender(button);
      
      // Re-query after re-render since the DOM was recreated
      innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.hasAttribute('disabled')).toBe(false);
    });

    it('re-renders when loading changes', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      button.setAttribute('loading', '');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.hasAttribute('loading')).toBe(true);
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const button = mount('pilot-button', {}, '<span class="custom-content">Custom</span>');
      await waitForRender(button);
      
      const slot = button.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const button = mount('pilot-button', {}, 'Button Text');
      await waitForRender(button);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(button.textContent.trim()).toBe('Button Text');
    });

    it('renders HTML content in slot', async () => {
      const button = mount('pilot-button', {}, '<strong>Bold</strong> Text');
      await waitForRender(button);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(button.querySelector('strong')).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has button element with computed styles', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      const styles = window.getComputedStyle(innerButton);
      
      // Basic style checks
      expect(styles.display).toBe('inline-flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      
      // Check that the element exists and has styles
      expect(innerButton).toBeTruthy();
      expect(innerButton.style).toBeDefined();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      expect(button.shadowRoot).toBeTruthy();
      expect(button.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const style = button.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('button');
    });

    it('contains button element', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const button = mount('pilot-button');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const button = mount('pilot-button', { variant: 'secondary' });
      await waitForRender(button);
      
      // Rapid changes
      button.setAttribute('variant', 'primary');
      button.setAttribute('size', 'lg');
      button.setAttribute('disabled', '');
      
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('variant')).toBe('primary');
      expect(innerButton.getAttribute('size')).toBe('lg');
      expect(innerButton.hasAttribute('disabled')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const button = mount('pilot-button', { 
        variant: 'technical',
        size: 'sm',
        disabled: true 
      });
      await waitForRender(button);
      
      // Trigger re-render by changing one attribute
      button.setAttribute('loading', '');
      await waitForRender(button);
      
      const innerButton = button.shadowRoot.querySelector('button');
      expect(innerButton.getAttribute('variant')).toBe('technical');
      expect(innerButton.getAttribute('size')).toBe('sm');
      expect(innerButton.hasAttribute('disabled')).toBe(true);
      expect(innerButton.hasAttribute('loading')).toBe(true);
    });
  });
});
