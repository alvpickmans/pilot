/**
 * PilotContainer Unit Tests
 *
 * Tests for the Pilot Container component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const containerModule = await import('./container.js');
const { PilotContainer } = containerModule;

describe('PilotContainer', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-container', PilotContainer);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      expect(container.shadowRoot).toBeTruthy();
      const containerDiv = container.shadowRoot.querySelector('.container');
      expect(containerDiv).toBeTruthy();
    });

    it('has default size of lg (1024px)', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      expect(containerDiv).toBeTruthy();
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1024px');
    });

    it('has default padding of md (1.5rem)', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('1.5rem');
    });

    it('does not have bordered corners by default', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const cornerBl = container.shadowRoot.querySelector('.corner-bl');
      const cornerBr = container.shadowRoot.querySelector('.corner-br');
      expect(cornerBl).toBeFalsy();
      expect(cornerBr).toBeFalsy();
    });
  });

  describe('Size Attribute', () => {
    it('applies sm size (640px)', async () => {
      const container = mount('pilot-container', { size: 'sm' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('640px');
    });

    it('applies md size (768px)', async () => {
      const container = mount('pilot-container', { size: 'md' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('768px');
    });

    it('applies lg size (1024px)', async () => {
      const container = mount('pilot-container', { size: 'lg' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1024px');
    });

    it('applies xl size (1280px)', async () => {
      const container = mount('pilot-container', { size: 'xl' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1280px');
    });

    it('applies full size (100%)', async () => {
      const container = mount('pilot-container', { size: 'full' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('100%');
    });
  });

  describe('Padding Attribute', () => {
    it('applies sm padding (1rem)', async () => {
      const container = mount('pilot-container', { padding: 'sm' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('1rem');
    });

    it('applies md padding (1.5rem)', async () => {
      const container = mount('pilot-container', { padding: 'md' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('1.5rem');
    });

    it('applies lg padding (2rem)', async () => {
      const container = mount('pilot-container', { padding: 'lg' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('2rem');
    });

    it('applies xl padding (3rem)', async () => {
      const container = mount('pilot-container', { padding: 'xl' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('3rem');
    });
  });

  describe('Bordered Attribute', () => {
    it('renders technical border when bordered attribute is present', async () => {
      const container = mount('pilot-container', { bordered: true });
      await waitForRender(container);

      const cornerBl = container.shadowRoot.querySelector('.corner-bl');
      const cornerBr = container.shadowRoot.querySelector('.corner-br');
      expect(cornerBl).toBeTruthy();
      expect(cornerBr).toBeTruthy();
    });

    it('has technical border styling when bordered', async () => {
      const container = mount('pilot-container', { bordered: true });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.border).toContain('solid');
    });

    it('removes borders when bordered attribute is removed', async () => {
      const container = mount('pilot-container', { bordered: true });
      await waitForRender(container);

      let cornerBl = container.shadowRoot.querySelector('.corner-bl');
      expect(cornerBl).toBeTruthy();

      container.removeAttribute('bordered');
      await waitForRender(container);

      cornerBl = container.shadowRoot.querySelector('.corner-bl');
      expect(cornerBl).toBeFalsy();
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when size changes', async () => {
      const container = mount('pilot-container', { size: 'sm' });
      await waitForRender(container);

      let containerDiv = container.shadowRoot.querySelector('.container');
      let styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('640px');

      container.setAttribute('size', 'xl');
      await waitForRender(container);

      containerDiv = container.shadowRoot.querySelector('.container');
      styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1280px');
    });

    it('re-renders when padding changes', async () => {
      const container = mount('pilot-container', { padding: 'sm' });
      await waitForRender(container);

      let containerDiv = container.shadowRoot.querySelector('.container');
      let styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('1rem');

      container.setAttribute('padding', 'xl');
      await waitForRender(container);

      containerDiv = container.shadowRoot.querySelector('.container');
      styles = window.getComputedStyle(containerDiv);
      expect(styles.padding).toBe('3rem');
    });

    it('preserves all attributes on re-render', async () => {
      const container = mount('pilot-container', {
        size: 'md',
        padding: 'lg',
        bordered: true
      });
      await waitForRender(container);

      // Trigger re-render by changing size
      container.setAttribute('size', 'xl');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1280px');
      expect(styles.padding).toBe('2rem');

      const cornerBl = container.shadowRoot.querySelector('.corner-bl');
      expect(cornerBl).toBeTruthy();
    });
  });

  describe('Slots', () => {
    it('renders default slot', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const slot = container.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders slot content', async () => {
      const container = mount('pilot-container', {}, '<div class="content">Test Content</div>');
      await waitForRender(container);

      const content = container.querySelector('.content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Test Content');
    });

    it('renders nested components in slot', async () => {
      const container = mount('pilot-container', {}, '<pilot-button>Button</pilot-button>');
      await waitForRender(container);

      const button = container.querySelector('pilot-button');
      expect(button).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('is centered with margin auto', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.marginLeft).toBe('auto');
      expect(styles.marginRight).toBe('auto');
    });

    it('takes full width of parent', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.width).toBe('100%');
    });

    it('has proper box-sizing', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.boxSizing).toBe('border-box');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      expect(container.shadowRoot).toBeTruthy();
      expect(container.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const style = container.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.container');
    });

    it('contains container element', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      expect(containerDiv).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      expect(containerDiv).toBeTruthy();
      const slot = container.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const container = mount('pilot-container', { size: 'sm' });
      await waitForRender(container);

      // Rapid changes
      container.setAttribute('size', 'md');
      container.setAttribute('padding', 'xl');
      container.setAttribute('bordered', '');

      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('768px');
      expect(styles.padding).toBe('3rem');

      const cornerBl = container.shadowRoot.querySelector('.corner-bl');
      expect(cornerBl).toBeTruthy();
    });

    it('handles invalid size gracefully', async () => {
      const container = mount('pilot-container', { size: 'invalid' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      // Component should still render with the invalid value
      expect(containerDiv).toBeTruthy();
    });

    it('handles invalid padding gracefully', async () => {
      const container = mount('pilot-container', { padding: 'invalid' });
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      // Component should still render with the invalid value
      expect(containerDiv).toBeTruthy();
    });

    it('maintains structure after multiple re-renders', async () => {
      const container = mount('pilot-container', { size: 'sm', padding: 'sm' });
      await waitForRender(container);

      // Multiple re-renders with deterministic values
      container.setAttribute('size', 'xl');
      container.setAttribute('padding', 'xl');
      await waitForRender(container);

      const containerDiv = container.shadowRoot.querySelector('.container');
      expect(containerDiv).toBeTruthy();
      const styles = window.getComputedStyle(containerDiv);
      expect(styles.maxWidth).toBe('1280px');
      expect(styles.padding).toBe('3rem');
    });

    it('handles complex nested content', async () => {
      const complexContent = `
        <div class="section">
          <h2>Section Title</h2>
          <pilot-card>
            <h3 slot="header">Card Header</h3>
            <p>Card content goes here</p>
          </pilot-card>
        </div>
      `;

      const container = mount('pilot-container', { size: 'lg' }, complexContent);
      await waitForRender(container);

      const section = container.querySelector('.section');
      expect(section).toBeTruthy();
      expect(container.querySelector('h2').textContent).toBe('Section Title');
    });
  });

  describe('Responsive Behavior', () => {
    it('responds to hidden attribute', async () => {
      const container = mount('pilot-container');
      await waitForRender(container);

      expect(container.hasAttribute('hidden')).toBe(false);

      container.setAttribute('hidden', '');

      expect(container.hasAttribute('hidden')).toBe(true);
    });
  });
});
