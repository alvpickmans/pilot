/**
 * PilotStatus Unit Tests
 * 
 * Tests for the Pilot Status component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const statusModule = await import('./status.js');
const { PilotStatus } = statusModule;

describe('PilotStatus', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-status', PilotStatus);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const status = mount('pilot-status', {}, 'Active');
      await waitForRender(status);
      
      expect(status.shadowRoot).toBeTruthy();
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator).toBeTruthy();
      const label = status.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(status.textContent.trim()).toBe('Active');
    });

    it('applies default variant (neutral)', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('neutral');
    });

    it('applies default size (md)', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('size')).toBe('md');
    });

    it('applies variant attribute', async () => {
      const status = mount('pilot-status', { variant: 'success' });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('success');
    });

    it('applies size attribute', async () => {
      const status = mount('pilot-status', { size: 'lg' });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('size')).toBe('lg');
    });

    it('handles pulse state', async () => {
      const status = mount('pilot-status', { pulse: true });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.hasAttribute('pulse')).toBe(true);
    });

    it('supports all variants', async () => {
      const variants = ['success', 'warning', 'error', 'info', 'neutral'];
      
      for (const variant of variants) {
        cleanup();
        const status = mount('pilot-status', { variant });
        await waitForRender(status);
        
        const indicator = status.shadowRoot.querySelector('.indicator');
        expect(indicator.getAttribute('variant')).toBe(variant);
      }
    });

    it('supports all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'];
      
      for (const size of sizes) {
        cleanup();
        const status = mount('pilot-status', { size });
        await waitForRender(status);
        
        const indicator = status.shadowRoot.querySelector('.indicator');
        expect(indicator.getAttribute('size')).toBe(size);
      }
    });

    it('renders without label content', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator).toBeTruthy();
      const label = status.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when variant changes', async () => {
      const status = mount('pilot-status', { variant: 'neutral' });
      await waitForRender(status);
      
      status.setAttribute('variant', 'success');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('success');
    });

    it('re-renders when size changes', async () => {
      const status = mount('pilot-status', { size: 'sm' });
      await waitForRender(status);
      
      status.setAttribute('size', 'lg');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('size')).toBe('lg');
    });

    it('re-renders when pulse changes', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      status.setAttribute('pulse', '');
      await waitForRender(status);
      
      let indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.hasAttribute('pulse')).toBe(true);
      
      status.removeAttribute('pulse');
      await waitForRender(status);
      
      // Re-query after re-render since the DOM was recreated
      indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.hasAttribute('pulse')).toBe(false);
    });

    it('cycles through all variant states', async () => {
      const status = mount('pilot-status', { variant: 'neutral' });
      await waitForRender(status);
      
      const variants = ['success', 'warning', 'error', 'info', 'neutral'];
      
      for (const variant of variants) {
        status.setAttribute('variant', variant);
        await waitForRender(status);
        
        const indicator = status.shadowRoot.querySelector('.indicator');
        expect(indicator.getAttribute('variant')).toBe(variant);
      }
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const status = mount('pilot-status', {}, '<span class="custom-content">Custom</span>');
      await waitForRender(status);
      
      const slot = status.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const status = mount('pilot-status', {}, 'Online');
      await waitForRender(status);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(status.textContent.trim()).toBe('Online');
    });

    it('renders HTML content in slot', async () => {
      const status = mount('pilot-status', {}, '<strong>Active</strong> Status');
      await waitForRender(status);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(status.querySelector('strong')).toBeTruthy();
    });

    it('renders empty slot when no content provided', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const slot = status.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has indicator element with computed styles', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      const styles = window.getComputedStyle(indicator);
      
      // Basic style checks
      expect(styles.width).toBeDefined();
      expect(styles.height).toBeDefined();
    });

    it('has label element with computed styles', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const label = status.shadowRoot.querySelector('.label');
      const styles = window.getComputedStyle(label);
      
      // Basic style checks
      expect(styles.fontFamily).toBeDefined();
      expect(styles.fontSize).toBeDefined();
    });

    it('applies CSS variable fallbacks', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      
      // Check that the element exists and has styles
      expect(indicator).toBeTruthy();
      expect(indicator.style).toBeDefined();
    });

    it('has pulse animation styles when pulse is enabled', async () => {
      const status = mount('pilot-status', { pulse: true });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator).toBeTruthy();
      expect(indicator.hasAttribute('pulse')).toBe(true);
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      expect(status.shadowRoot).toBeTruthy();
      expect(status.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const style = status.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.indicator');
      expect(style.textContent).toContain('.label');
    });

    it('contains indicator element', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator).toBeTruthy();
    });

    it('contains label element', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const label = status.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
    });

    it('has correct DOM structure', async () => {
      const status = mount('pilot-status', { variant: 'success', size: 'lg', pulse: true }, 'Active');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      const label = status.shadowRoot.querySelector('.label');
      
      expect(indicator).toBeTruthy();
      expect(label).toBeTruthy();
      expect(indicator.getAttribute('variant')).toBe('success');
      expect(indicator.getAttribute('size')).toBe('lg');
      expect(indicator.hasAttribute('pulse')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      const label = status.shadowRoot.querySelector('.label');
      expect(indicator).toBeTruthy();
      expect(label).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const status = mount('pilot-status', { variant: 'neutral' });
      await waitForRender(status);
      
      // Rapid changes
      status.setAttribute('variant', 'success');
      status.setAttribute('size', 'lg');
      status.setAttribute('pulse', '');
      
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('success');
      expect(indicator.getAttribute('size')).toBe('lg');
      expect(indicator.hasAttribute('pulse')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const status = mount('pilot-status', { 
        variant: 'error',
        size: 'sm',
        pulse: true 
      });
      await waitForRender(status);
      
      // Trigger re-render by changing one attribute
      status.setAttribute('variant', 'warning');
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('warning');
      expect(indicator.getAttribute('size')).toBe('sm');
      expect(indicator.hasAttribute('pulse')).toBe(true);
    });

    it('handles invalid variant gracefully', async () => {
      const status = mount('pilot-status', { variant: 'invalid-variant' });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('variant')).toBe('invalid-variant');
      // Component should not throw error, just apply the invalid variant
      expect(indicator).toBeTruthy();
    });

    it('handles invalid size gracefully', async () => {
      const status = mount('pilot-status', { size: 'invalid-size' });
      await waitForRender(status);
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      expect(indicator.getAttribute('size')).toBe('invalid-size');
      // Component should not throw error, just apply the invalid size
      expect(indicator).toBeTruthy();
    });

    it('handles special characters in slot content', async () => {
      const status = mount('pilot-status', {}, 'Status: <Active> & "Online"');
      await waitForRender(status);
      
      // HTML tags in textContent get parsed by the browser/DOM
      // We check that the content is preserved (tags may be stripped)
      expect(status.textContent.trim()).toContain('Status:');
      expect(status.textContent.trim()).toContain('Online');
    });

    it('handles long label content', async () => {
      const longText = 'This is a very long status label that might wrap or overflow depending on the container constraints and styling applied to the component';
      const status = mount('pilot-status', {}, longText);
      await waitForRender(status);
      
      expect(status.textContent.trim()).toBe(longText);
      const label = status.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
    });

    it('handles multiple consecutive re-renders', async () => {
      const status = mount('pilot-status', { variant: 'neutral' });
      await waitForRender(status);
      
      // Multiple rapid re-renders (0: success, 1: error, 2: success, 3: error, 4: success)
      for (let i = 0; i < 5; i++) {
        status.setAttribute('variant', i % 2 === 0 ? 'success' : 'error');
        await waitForRender(status);
      }
      
      const indicator = status.shadowRoot.querySelector('.indicator');
      // After 5 iterations (0-4), the last value (i=4, even) should be 'success'
      expect(indicator.getAttribute('variant')).toBe('success');
    });

    it('maintains component integrity after multiple attribute toggles', async () => {
      const status = mount('pilot-status');
      await waitForRender(status);
      
      // Toggle pulse multiple times
      for (let i = 0; i < 3; i++) {
        status.setAttribute('pulse', '');
        await waitForRender(status);
        
        let indicator = status.shadowRoot.querySelector('.indicator');
        expect(indicator.hasAttribute('pulse')).toBe(true);
        
        status.removeAttribute('pulse');
        await waitForRender(status);
        
        indicator = status.shadowRoot.querySelector('.indicator');
        expect(indicator.hasAttribute('pulse')).toBe(false);
      }
    });
  });

  describe('Component Integration', () => {
    it('works with multiple status components', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      
      const status1 = mount('pilot-status', { variant: 'success' }, 'Online');
      const status2 = mount('pilot-status', { variant: 'error' }, 'Offline');
      const status3 = mount('pilot-status', { variant: 'warning', pulse: true }, 'Warning');
      
      await waitForRender(status1);
      await waitForRender(status2);
      await waitForRender(status3);
      
      expect(status1.shadowRoot.querySelector('.indicator').getAttribute('variant')).toBe('success');
      expect(status2.shadowRoot.querySelector('.indicator').getAttribute('variant')).toBe('error');
      expect(status3.shadowRoot.querySelector('.indicator').getAttribute('variant')).toBe('warning');
      expect(status3.shadowRoot.querySelector('.indicator').hasAttribute('pulse')).toBe(true);
      
      container.remove();
    });

    it('maintains independent state across instances', async () => {
      const status1 = mount('pilot-status', { variant: 'success', size: 'sm' }, 'Status 1');
      const status2 = mount('pilot-status', { variant: 'error', size: 'lg', pulse: true }, 'Status 2');
      
      await waitForRender(status1);
      await waitForRender(status2);
      
      // Change status1 only
      status1.setAttribute('variant', 'warning');
      await waitForRender(status1);
      
      // status1 should be updated
      expect(status1.shadowRoot.querySelector('.indicator').getAttribute('variant')).toBe('warning');
      // status2 should remain unchanged
      expect(status2.shadowRoot.querySelector('.indicator').getAttribute('variant')).toBe('error');
      expect(status2.shadowRoot.querySelector('.indicator').getAttribute('size')).toBe('lg');
      expect(status2.shadowRoot.querySelector('.indicator').hasAttribute('pulse')).toBe(true);
    });
  });
});
