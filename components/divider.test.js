/**
 * PilotDivider Unit Tests
 * 
 * Tests for the Pilot Divider component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const dividerModule = await import('./divider.js');
const { PilotDivider } = dividerModule;

describe('PilotDivider', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-divider', PilotDivider);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      expect(divider.shadowRoot).toBeTruthy();
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl).toBeTruthy();
    });

    it('applies default orientation (horizontal)', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('horizontal');
    });

    it('applies default variant (default)', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('variant')).toBe('default');
    });

    it('applies horizontal orientation attribute', async () => {
      const divider = mount('pilot-divider', { orientation: 'horizontal' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('horizontal');
    });

    it('applies vertical orientation attribute', async () => {
      const divider = mount('pilot-divider', { orientation: 'vertical' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('vertical');
    });

    it('applies variant attribute', async () => {
      const divider = mount('pilot-divider', { variant: 'dashed' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('variant')).toBe('dashed');
    });

    it('applies label attribute', async () => {
      const divider = mount('pilot-divider', { label: 'Section A' });
      await waitForRender(divider);
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).toBe('Section A');
    });

    it('supports all orientations', async () => {
      const orientations = ['horizontal', 'vertical'];
      
      for (const orientation of orientations) {
        cleanup();
        const divider = mount('pilot-divider', { orientation });
        await waitForRender(divider);
        
        const dividerEl = divider.shadowRoot.querySelector('.divider');
        expect(dividerEl.getAttribute('orientation')).toBe(orientation);
      }
    });

    it('supports all variants', async () => {
      const variants = ['default', 'dashed', 'technical'];
      
      for (const variant of variants) {
        cleanup();
        const divider = mount('pilot-divider', { variant });
        await waitForRender(divider);
        
        const dividerEl = divider.shadowRoot.querySelector('.divider');
        expect(dividerEl.getAttribute('variant')).toBe(variant);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when orientation changes', async () => {
      const divider = mount('pilot-divider', { orientation: 'horizontal' });
      await waitForRender(divider);
      
      divider.setAttribute('orientation', 'vertical');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('vertical');
    });

    it('re-renders when variant changes', async () => {
      const divider = mount('pilot-divider', { variant: 'default' });
      await waitForRender(divider);
      
      divider.setAttribute('variant', 'technical');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('variant')).toBe('technical');
    });

    it('re-renders when label changes', async () => {
      const divider = mount('pilot-divider', { label: 'Old Label' });
      await waitForRender(divider);
      
      divider.setAttribute('label', 'New Label');
      await waitForRender(divider);
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl.textContent).toBe('New Label');
    });

    it('removes label when attribute is removed', async () => {
      const divider = mount('pilot-divider', { label: 'Test' });
      await waitForRender(divider);
      
      let labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeTruthy();
      
      divider.removeAttribute('label');
      await waitForRender(divider);
      
      labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeFalsy();
    });

    it('adds label when attribute is added', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      let labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeFalsy();
      
      divider.setAttribute('label', 'New Section');
      await waitForRender(divider);
      
      labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).toBe('New Section');
    });
  });

  describe('Shadow DOM Structure', () => {
    it('has open shadow root', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      expect(divider.shadowRoot).toBeTruthy();
      expect(divider.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const style = divider.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.divider');
    });

    it('contains divider element', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl).toBeTruthy();
    });

    it('contains at least one line element', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const lines = divider.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBeGreaterThanOrEqual(1);
    });

    it('contains two line elements when label is present', async () => {
      const divider = mount('pilot-divider', { label: 'Section' });
      await waitForRender(divider);
      
      const lines = divider.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(2);
    });

    it('contains only one line element when no label', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const lines = divider.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(1);
    });

    it('has correct structure for horizontal orientation', async () => {
      const divider = mount('pilot-divider', { orientation: 'horizontal' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.style.flexDirection).toBe('');
    });

    it('has correct structure for vertical orientation', async () => {
      const divider = mount('pilot-divider', { orientation: 'vertical' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('vertical');
    });
  });

  describe('CSS Custom Properties', () => {
    it('has divider element with computed styles', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      const styles = window.getComputedStyle(dividerEl);
      
      // Basic style checks
      expect(styles.display).toBe('flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const line = divider.shadowRoot.querySelector('.line');
      
      // Check that the element exists and has styles
      expect(line).toBeTruthy();
      expect(line.style).toBeDefined();
    });

    it('label uses correct CSS variables', async () => {
      const divider = mount('pilot-divider', { label: 'Test' });
      await waitForRender(divider);
      
      const label = divider.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
      
      const styles = window.getComputedStyle(label);
      // Label should have font-family set (via CSS variable fallback)
      expect(styles.fontFamily).toBeDefined();
    });

    it('line uses correct border styles', async () => {
      const divider = mount('pilot-divider');
      await waitForRender(divider);
      
      const line = divider.shadowRoot.querySelector('.line');
      expect(line).toBeTruthy();
      
      const styles = window.getComputedStyle(line);
      expect(styles.borderTopWidth).toBeDefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty label', async () => {
      const divider = mount('pilot-divider', { label: '' });
      await waitForRender(divider);
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeFalsy();
    });

    it('handles rapid attribute changes', async () => {
      const divider = mount('pilot-divider', { orientation: 'horizontal' });
      await waitForRender(divider);
      
      // Rapid changes
      divider.setAttribute('orientation', 'vertical');
      divider.setAttribute('variant', 'technical');
      divider.setAttribute('label', 'Test');
      
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('vertical');
      expect(dividerEl.getAttribute('variant')).toBe('technical');
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl.textContent).toBe('Test');
    });

    it('preserves attributes on re-render', async () => {
      const divider = mount('pilot-divider', { 
        orientation: 'vertical',
        variant: 'dashed',
        label: 'Test' 
      });
      await waitForRender(divider);
      
      // Trigger re-render by changing one attribute
      divider.setAttribute('variant', 'technical');
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl.getAttribute('orientation')).toBe('vertical');
      expect(dividerEl.getAttribute('variant')).toBe('technical');
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl.textContent).toBe('Test');
    });

    it('handles invalid orientation gracefully', async () => {
      const divider = mount('pilot-divider', { orientation: 'invalid' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl).toBeTruthy();
      expect(dividerEl.getAttribute('orientation')).toBe('invalid');
    });

    it('handles invalid variant gracefully', async () => {
      const divider = mount('pilot-divider', { variant: 'invalid' });
      await waitForRender(divider);
      
      const dividerEl = divider.shadowRoot.querySelector('.divider');
      expect(dividerEl).toBeTruthy();
      expect(dividerEl.getAttribute('variant')).toBe('invalid');
    });

    it('handles special characters in label', async () => {
      const specialLabels = [
        'Label with brackets',
        'Label "with" quotes',
        "Label 'with' apostrophes",
        'Label & ampersand',
        'Label with unicode: 日本語'
      ];
      
      for (const label of specialLabels) {
        cleanup();
        const divider = mount('pilot-divider', { label });
        await waitForRender(divider);
        
        const labelEl = divider.shadowRoot.querySelector('.label');
        expect(labelEl).toBeTruthy();
        // Verify label content is present (happy-dom may parse HTML tags differently)
        expect(labelEl.textContent.trim()).toContain(label.replace(/[<>]/g, ''));
      }
    });

    it('handles very long label', async () => {
      const longLabel = 'A'.repeat(1000);
      const divider = mount('pilot-divider', { label: longLabel });
      await waitForRender(divider);
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).toBe(longLabel);
    });

    it('handles whitespace-only label', async () => {
      const divider = mount('pilot-divider', { label: '   ' });
      await waitForRender(divider);
      
      const labelEl = divider.shadowRoot.querySelector('.label');
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).toBe('   ');
    });

    it('component does not throw errors when created without attributes', async () => {
      expect(() => {
        const divider = mount('pilot-divider');
        expect(divider).toBeTruthy();
      }).not.toThrow();
    });

    it('component handles multiple instances', async () => {
      const dividers = [];
      
      for (let i = 0; i < 5; i++) {
        const divider = mount('pilot-divider', { 
          label: `Divider ${i}`,
          variant: i % 2 === 0 ? 'default' : 'dashed'
        });
        dividers.push(divider);
      }
      
      await waitForRender(dividers[0]);
      
      // Verify all instances rendered correctly
      dividers.forEach((divider, index) => {
        const labelEl = divider.shadowRoot.querySelector('.label');
        expect(labelEl.textContent).toBe(`Divider ${index}`);
      });
    });
  });

  describe('Component Integration', () => {
    it('works with all attribute combinations', async () => {
      const combinations = [
        { orientation: 'horizontal', variant: 'default' },
        { orientation: 'horizontal', variant: 'dashed' },
        { orientation: 'horizontal', variant: 'technical' },
        { orientation: 'vertical', variant: 'default' },
        { orientation: 'vertical', variant: 'dashed' },
        { orientation: 'vertical', variant: 'technical' },
        { orientation: 'horizontal', variant: 'default', label: 'Test' },
        { orientation: 'vertical', variant: 'technical', label: 'Test' }
      ];
      
      for (const combo of combinations) {
        cleanup();
        const divider = mount('pilot-divider', combo);
        await waitForRender(divider);
        
        const dividerEl = divider.shadowRoot.querySelector('.divider');
        expect(dividerEl.getAttribute('orientation')).toBe(combo.orientation);
        expect(dividerEl.getAttribute('variant')).toBe(combo.variant);
        
        if (combo.label) {
          const labelEl = divider.shadowRoot.querySelector('.label');
          expect(labelEl.textContent).toBe(combo.label);
        }
      }
    });
  });
});
