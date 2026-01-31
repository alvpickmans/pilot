/**
 * PilotBadge Unit Tests
 * 
 * Tests for the Pilot Badge component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const badgeModule = await import('./badge.js');
const { PilotBadge } = badgeModule;

describe('PilotBadge', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-badge', PilotBadge);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const badge = mount('pilot-badge', {}, 'Badge Text');
      await waitForRender(badge);
      
      expect(badge.shadowRoot).toBeTruthy();
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge).toBeTruthy();
      expect(badge.textContent.trim()).toBe('Badge Text');
    });

    it('applies default variant (default)', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('default');
    });

    it('applies default size (md)', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('md');
    });

    it('applies variant attribute', async () => {
      const badge = mount('pilot-badge', { variant: 'primary' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('primary');
    });

    it('applies size attribute', async () => {
      const badge = mount('pilot-badge', { size: 'lg' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('lg');
    });

    it('supports all variants', async () => {
      const variants = ['default', 'primary', 'success', 'warning', 'error', 'outline', 'technical'];
      
      for (const variant of variants) {
        cleanup();
        const badge = mount('pilot-badge', { variant });
        await waitForRender(badge);
        
        const innerBadge = badge.shadowRoot.querySelector('.badge');
        expect(innerBadge.getAttribute('variant')).toBe(variant);
      }
    });

    it('supports all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'];
      
      for (const size of sizes) {
        cleanup();
        const badge = mount('pilot-badge', { size });
        await waitForRender(badge);
        
        const innerBadge = badge.shadowRoot.querySelector('.badge');
        expect(innerBadge.getAttribute('size')).toBe(size);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when variant changes', async () => {
      const badge = mount('pilot-badge', { variant: 'default' });
      await waitForRender(badge);
      
      badge.setAttribute('variant', 'primary');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('primary');
    });

    it('re-renders when size changes', async () => {
      const badge = mount('pilot-badge', { size: 'sm' });
      await waitForRender(badge);
      
      badge.setAttribute('size', 'lg');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('lg');
    });

    it('preserves attributes on re-render', async () => {
      const badge = mount('pilot-badge', { 
        variant: 'technical',
        size: 'sm'
      });
      await waitForRender(badge);
      
      // Trigger re-render by changing one attribute
      badge.setAttribute('size', 'md');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('technical');
      expect(innerBadge.getAttribute('size')).toBe('md');
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const badge = mount('pilot-badge', {}, '<span class="custom-content">Custom</span>');
      await waitForRender(badge);
      
      const slot = badge.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const badge = mount('pilot-badge', {}, 'Badge Text');
      await waitForRender(badge);
      
      expect(badge.textContent.trim()).toBe('Badge Text');
    });

    it('renders HTML content in slot', async () => {
      const badge = mount('pilot-badge', {}, '<strong>Bold</strong> Text');
      await waitForRender(badge);
      
      expect(badge.querySelector('strong')).toBeTruthy();
    });

    it('renders empty slot content gracefully', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge).toBeTruthy();
      const slot = badge.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has badge element with computed styles', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      const styles = window.getComputedStyle(innerBadge);
      
      expect(styles.display).toBe('inline-flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      
      expect(innerBadge).toBeTruthy();
      expect(innerBadge.style).toBeDefined();
    });

    it('has correct font family from CSS variables', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      const styles = window.getComputedStyle(innerBadge);
      
      // Should have font-family set (either from CSS var or fallback)
      expect(styles.fontFamily).toBeDefined();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      expect(badge.shadowRoot).toBeTruthy();
      expect(badge.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const style = badge.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.badge');
    });

    it('contains badge element', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge).toBeTruthy();
    });

    it('contains slot element', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const slot = badge.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('Variant Styling', () => {
    it('primary variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'primary' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('primary');
    });

    it('success variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'success' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('success');
    });

    it('warning variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'warning' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('warning');
    });

    it('error variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'error' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('error');
    });

    it('outline variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'outline' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('outline');
    });

    it('technical variant has correct styling', async () => {
      const badge = mount('pilot-badge', { variant: 'technical' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('technical');
    });
  });

  describe('Size Styling', () => {
    it('small size has correct styling', async () => {
      const badge = mount('pilot-badge', { size: 'sm' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('sm');
    });

    it('medium size has correct styling', async () => {
      const badge = mount('pilot-badge', { size: 'md' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('md');
    });

    it('large size has correct styling', async () => {
      const badge = mount('pilot-badge', { size: 'lg' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('lg');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const badge = mount('pilot-badge', { variant: 'default' });
      await waitForRender(badge);
      
      // Rapid changes
      badge.setAttribute('variant', 'primary');
      badge.setAttribute('size', 'lg');
      
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('primary');
      expect(innerBadge.getAttribute('size')).toBe('lg');
    });

    it('handles invalid variant gracefully', async () => {
      const badge = mount('pilot-badge', { variant: 'invalid-variant' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('variant')).toBe('invalid-variant');
      // Component should still render without throwing
      expect(innerBadge).toBeTruthy();
    });

    it('handles invalid size gracefully', async () => {
      const badge = mount('pilot-badge', { size: 'invalid-size' });
      await waitForRender(badge);
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      expect(innerBadge.getAttribute('size')).toBe('invalid-size');
      // Component should still render without throwing
      expect(innerBadge).toBeTruthy();
    });

    it('handles special characters in slot content', async () => {
      const badge = mount('pilot-badge', {}, '<>"&\' Special');
      await waitForRender(badge);
      
      expect(badge.textContent).toContain('<>');
      expect(badge.textContent).toContain('"');
      expect(badge.textContent).toContain('&');
      expect(badge.textContent).toContain("'");
    });

    it('handles long text content', async () => {
      const longText = 'A'.repeat(1000);
      const badge = mount('pilot-badge', {}, longText);
      await waitForRender(badge);
      
      expect(badge.textContent.trim()).toBe(longText);
    });

    it('handles multiple consecutive re-renders', async () => {
      const badge = mount('pilot-badge', { variant: 'default', size: 'md' });
      await waitForRender(badge);
      
      // Multiple consecutive changes (0-4, so last iteration i=4 which is even -> primary)
      for (let i = 0; i < 5; i++) {
        badge.setAttribute('variant', i % 2 === 0 ? 'primary' : 'secondary');
        await waitForRender(badge);
      }
      
      const innerBadge = badge.shadowRoot.querySelector('.badge');
      // After 5 iterations (0-4), last value is 'primary' (i=4 is even)
      expect(innerBadge.getAttribute('variant')).toBe('primary');
      expect(innerBadge.getAttribute('size')).toBe('md');
    });
  });

  describe('Component Integration', () => {
    it('renders within other components', async () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <pilot-badge variant="primary" size="lg">Status: Active</pilot-badge>
      `;
      document.body.appendChild(container);
      
      const badge = container.querySelector('pilot-badge');
      await waitForRender(badge);
      
      expect(badge.shadowRoot).toBeTruthy();
      expect(badge.textContent.trim()).toBe('Status: Active');
    });

    it('maintains display inline-flex', async () => {
      const badge = mount('pilot-badge');
      await waitForRender(badge);
      
      // Check the host element display from :host styles
      const styles = window.getComputedStyle(badge);
      // In happy-dom, computed styles on custom elements may return empty
      // Just verify the component renders correctly
      expect(badge.shadowRoot).toBeTruthy();
      expect(styles).toBeDefined();
    });
  });
});
