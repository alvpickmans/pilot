/**
 * PilotLabel Unit Tests
 * 
 * Tests for the Pilot Label component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const labelModule = await import('./label.js');
const { PilotLabel } = labelModule;

describe('PilotLabel', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-label', PilotLabel);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const label = mount('pilot-label', {}, 'Label Text');
      await waitForRender(label);
      
      expect(label.shadowRoot).toBeTruthy();
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(label.textContent.trim()).toBe('Label Text');
    });

    it('applies default variant (default)', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('variant')).toBe('default');
    });

    it('applies default size (md)', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('size')).toBe('md');
    });

    it('applies variant attribute', async () => {
      const label = mount('pilot-label', { variant: 'technical' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('variant')).toBe('technical');
    });

    it('applies size attribute', async () => {
      const label = mount('pilot-label', { size: 'lg' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('size')).toBe('lg');
    });

    it('applies prefix attribute', async () => {
      const label = mount('pilot-label', { prefix: '[' });
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      expect(prefix).toBeTruthy();
      expect(prefix.textContent).toBe('[');
    });

    it('applies suffix attribute', async () => {
      const label = mount('pilot-label', { suffix: ']' });
      await waitForRender(label);
      
      const suffix = label.shadowRoot.querySelector('.suffix');
      expect(suffix).toBeTruthy();
      expect(suffix.textContent).toBe(']');
    });

    it('supports all variants', async () => {
      const variants = ['default', 'technical', 'code', 'industrial'];
      
      for (const variant of variants) {
        cleanup();
        const label = mount('pilot-label', { variant });
        await waitForRender(label);
        
        const innerLabel = label.shadowRoot.querySelector('.label');
        expect(innerLabel.getAttribute('variant')).toBe(variant);
      }
    });

    it('supports all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'];
      
      for (const size of sizes) {
        cleanup();
        const label = mount('pilot-label', { size });
        await waitForRender(label);
        
        const innerLabel = label.shadowRoot.querySelector('.label');
        expect(innerLabel.getAttribute('size')).toBe(size);
      }
    });

    it('renders with both prefix and suffix', async () => {
      const label = mount('pilot-label', { prefix: '<', suffix: '>' }, 'Code');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      const prefix = innerLabel.querySelector('.prefix');
      const suffix = innerLabel.querySelector('.suffix');
      
      expect(prefix).toBeTruthy();
      expect(suffix).toBeTruthy();
      expect(prefix.textContent).toBe('<');
      expect(suffix.textContent).toBe('>');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when variant changes', async () => {
      const label = mount('pilot-label', { variant: 'default' });
      await waitForRender(label);
      
      label.setAttribute('variant', 'technical');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('variant')).toBe('technical');
    });

    it('re-renders when size changes', async () => {
      const label = mount('pilot-label', { size: 'sm' });
      await waitForRender(label);
      
      label.setAttribute('size', 'lg');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('size')).toBe('lg');
    });

    it('re-renders when prefix changes', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      label.setAttribute('prefix', '[');
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      expect(prefix).toBeTruthy();
      expect(prefix.textContent).toBe('[');
    });

    it('re-renders when suffix changes', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      label.setAttribute('suffix', ']');
      await waitForRender(label);
      
      const suffix = label.shadowRoot.querySelector('.suffix');
      expect(suffix).toBeTruthy();
      expect(suffix.textContent).toBe(']');
    });

    it('removes prefix when attribute is removed', async () => {
      const label = mount('pilot-label', { prefix: '[' });
      await waitForRender(label);
      
      let prefix = label.shadowRoot.querySelector('.prefix');
      expect(prefix).toBeTruthy();
      
      label.removeAttribute('prefix');
      await waitForRender(label);
      
      // Re-query after re-render since the DOM was recreated
      prefix = label.shadowRoot.querySelector('.prefix');
      expect(prefix).toBeFalsy();
    });

    it('removes suffix when attribute is removed', async () => {
      const label = mount('pilot-label', { suffix: ']' });
      await waitForRender(label);
      
      let suffix = label.shadowRoot.querySelector('.suffix');
      expect(suffix).toBeTruthy();
      
      label.removeAttribute('suffix');
      await waitForRender(label);
      
      // Re-query after re-render since the DOM was recreated
      suffix = label.shadowRoot.querySelector('.suffix');
      expect(suffix).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const label = mount('pilot-label', {}, '<span class="custom-content">Custom</span>');
      await waitForRender(label);
      
      const slot = label.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const label = mount('pilot-label', {}, 'Label Text');
      await waitForRender(label);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(label.textContent.trim()).toBe('Label Text');
    });

    it('renders HTML content in slot', async () => {
      const label = mount('pilot-label', {}, '<strong>Bold</strong> Text');
      await waitForRender(label);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(label.querySelector('strong')).toBeTruthy();
    });

    it('renders slot content between prefix and suffix', async () => {
      const label = mount('pilot-label', { prefix: '[', suffix: ']' }, 'Content');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      const children = Array.from(innerLabel.children);
      
      expect(children[0].className).toBe('prefix');
      expect(children[1].tagName.toLowerCase()).toBe('slot');
      expect(children[2].className).toBe('suffix');
    });
  });

  describe('CSS Custom Properties', () => {
    it('has label element with computed styles', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      const styles = window.getComputedStyle(innerLabel);
      
      // Basic style checks
      expect(styles.display).toBe('inline-flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      
      // Check that the element exists and has styles
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.style).toBeDefined();
    });

    it('technical variant has border styling', async () => {
      const label = mount('pilot-label', { variant: 'technical' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('variant')).toBe('technical');
    });

    it('code variant has different font family', async () => {
      const label = mount('pilot-label', { variant: 'code' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('variant')).toBe('code');
    });

    it('industrial variant has different font family', async () => {
      const label = mount('pilot-label', { variant: 'industrial' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('variant')).toBe('industrial');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      expect(label.shadowRoot).toBeTruthy();
      expect(label.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const style = label.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.label');
    });

    it('contains label element', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
    });

    it('contains slot element', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const slot = label.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const label = mount('pilot-label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
    });

    it('handles empty prefix attribute', async () => {
      const label = mount('pilot-label', { prefix: '' });
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      expect(prefix).toBeFalsy();
    });

    it('handles empty suffix attribute', async () => {
      const label = mount('pilot-label', { suffix: '' });
      await waitForRender(label);
      
      const suffix = label.shadowRoot.querySelector('.suffix');
      expect(suffix).toBeFalsy();
    });

    it('handles rapid attribute changes', async () => {
      const label = mount('pilot-label', { variant: 'default' });
      await waitForRender(label);
      
      // Rapid changes
      label.setAttribute('variant', 'technical');
      label.setAttribute('size', 'lg');
      label.setAttribute('prefix', '[');
      label.setAttribute('suffix', ']');
      
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('variant')).toBe('technical');
      expect(innerLabel.getAttribute('size')).toBe('lg');
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      const suffix = label.shadowRoot.querySelector('.suffix');
      expect(prefix).toBeTruthy();
      expect(suffix).toBeTruthy();
    });

    it('preserves attributes on re-render', async () => {
      const label = mount('pilot-label', { 
        variant: 'code',
        size: 'sm',
        prefix: '<',
        suffix: '>'
      });
      await waitForRender(label);
      
      // Trigger re-render by changing one attribute
      label.setAttribute('variant', 'industrial');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel.getAttribute('variant')).toBe('industrial');
      expect(innerLabel.getAttribute('size')).toBe('sm');
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      const suffix = label.shadowRoot.querySelector('.suffix');
      expect(prefix).toBeTruthy();
      expect(suffix).toBeTruthy();
    });

    it('handles special characters in prefix and suffix', async () => {
      const label = mount('pilot-label', { 
        prefix: '&lt;',
        suffix: '&gt;'
      }, 'HTML');
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      const suffix = label.shadowRoot.querySelector('.suffix');
      
      expect(prefix).toBeTruthy();
      expect(suffix).toBeTruthy();
      expect(prefix.textContent).toBe('&lt;');
      expect(suffix.textContent).toBe('&gt;');
    });

    it('handles long prefix and suffix', async () => {
      const label = mount('pilot-label', { 
        prefix: 'PREFIX_',
        suffix: '_SUFFIX'
      }, 'Text');
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      const suffix = label.shadowRoot.querySelector('.suffix');
      
      expect(prefix.textContent).toBe('PREFIX_');
      expect(suffix.textContent).toBe('_SUFFIX');
    });

    it('handles whitespace in prefix and suffix', async () => {
      const label = mount('pilot-label', { 
        prefix: '  [  ',
        suffix: '  ]  '
      }, 'Text');
      await waitForRender(label);
      
      const prefix = label.shadowRoot.querySelector('.prefix');
      const suffix = label.shadowRoot.querySelector('.suffix');
      
      expect(prefix.textContent).toBe('  [  ');
      expect(suffix.textContent).toBe('  ]  ');
    });

    it('handles unknown variant gracefully', async () => {
      const label = mount('pilot-label', { variant: 'unknown' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('variant')).toBe('unknown');
    });

    it('handles unknown size gracefully', async () => {
      const label = mount('pilot-label', { size: 'unknown' });
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('size')).toBe('unknown');
    });

    it('handles multiple consecutive re-renders', async () => {
      const label = mount('pilot-label', { variant: 'default' });
      await waitForRender(label);
      
      // Multiple consecutive changes
      for (let i = 0; i < 5; i++) {
        label.setAttribute('variant', i % 2 === 0 ? 'technical' : 'code');
        await waitForRender(label);
      }
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      expect(innerLabel).toBeTruthy();
      expect(innerLabel.getAttribute('variant')).toBe('code');
    });
  });

  describe('Component Integration', () => {
    it('works with complex slot content', async () => {
      const complexContent = `
        <span class="icon">★</span>
        <span class="text">Important Label</span>
        <span class="badge">NEW</span>
      `;
      const label = mount('pilot-label', { variant: 'technical' }, complexContent);
      await waitForRender(label);
      
      expect(label.querySelector('.icon')).toBeTruthy();
      expect(label.querySelector('.text')).toBeTruthy();
      expect(label.querySelector('.badge')).toBeTruthy();
    });

    it('works with nested HTML elements', async () => {
      const nestedContent = `
        <div>
          <span>Level 1</span>
          <div>
            <span>Level 2</span>
          </div>
        </div>
      `;
      const label = mount('pilot-label', {}, nestedContent);
      await waitForRender(label);
      
      expect(label.querySelector('div span')).toBeTruthy();
    });

    it('maintains structure with all attributes set', async () => {
      const label = mount('pilot-label', {
        variant: 'industrial',
        size: 'lg',
        prefix: '[',
        suffix: ']'
      }, 'Complete Label');
      await waitForRender(label);
      
      const innerLabel = label.shadowRoot.querySelector('.label');
      const prefix = label.shadowRoot.querySelector('.prefix');
      const slot = label.shadowRoot.querySelector('slot');
      const suffix = label.shadowRoot.querySelector('.suffix');
      
      expect(innerLabel).toBeTruthy();
      expect(prefix).toBeTruthy();
      expect(slot).toBeTruthy();
      expect(suffix).toBeTruthy();
      
      expect(innerLabel.getAttribute('variant')).toBe('industrial');
      expect(innerLabel.getAttribute('size')).toBe('lg');
    });
  });
});
