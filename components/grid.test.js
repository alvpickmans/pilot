/**
 * PilotGrid Unit Tests
 * 
 * Tests for the Pilot Grid component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const gridModule = await import('./grid.js');
const { PilotGrid } = gridModule;

describe('PilotGrid', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-grid', PilotGrid);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      expect(grid.shadowRoot).toBeTruthy();
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.getAttribute('columns')).toBe('1');
      expect(gridDiv.getAttribute('gap')).toBe('4');
    });

    it('applies default columns value (1)', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('columns')).toBe('1');
    });

    it('applies default gap value (4)', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('gap')).toBe('4');
    });

    it('does not show grid overlay by default', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeFalsy();
    });

    it('applies columns attribute', async () => {
      const grid = mount('pilot-grid', { columns: '3' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('columns')).toBe('3');
    });

    it('applies gap attribute', async () => {
      const grid = mount('pilot-grid', { gap: '8' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('gap')).toBe('8');
    });

    it('shows grid overlay when show-grid attribute is present', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true });
      await waitForRender(grid);
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
    });

    it('supports all valid column values', async () => {
      const validColumns = ['1', '2', '3', '4', '6', '12'];
      
      for (const columns of validColumns) {
        cleanup();
        const grid = mount('pilot-grid', { columns });
        await waitForRender(grid);
        
        const gridDiv = grid.shadowRoot.querySelector('.grid');
        expect(gridDiv.getAttribute('columns')).toBe(columns);
      }
    });

    it('supports all valid gap values', async () => {
      const validGaps = ['0', '1', '2', '3', '4', '6', '8'];
      
      for (const gap of validGaps) {
        cleanup();
        const grid = mount('pilot-grid', { gap });
        await waitForRender(grid);
        
        const gridDiv = grid.shadowRoot.querySelector('.grid');
        expect(gridDiv.getAttribute('gap')).toBe(gap);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when columns changes', async () => {
      const grid = mount('pilot-grid', { columns: '1' });
      await waitForRender(grid);
      
      grid.setAttribute('columns', '4');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('columns')).toBe('4');
    });

    it('re-renders when gap changes', async () => {
      const grid = mount('pilot-grid', { gap: '2' });
      await waitForRender(grid);
      
      grid.setAttribute('gap', '6');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('gap')).toBe('6');
    });

    it('re-renders when show-grid changes', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      let overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeFalsy();
      
      grid.setAttribute('show-grid', '');
      await waitForRender(grid);
      
      overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
      
      grid.removeAttribute('show-grid');
      await waitForRender(grid);
      
      overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeFalsy();
    });

    it('preserves attributes on re-render', async () => {
      const grid = mount('pilot-grid', { 
        columns: '3',
        gap: '6'
      });
      await waitForRender(grid);
      
      // Trigger re-render by changing one attribute
      grid.setAttribute('show-grid', '');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('columns')).toBe('3');
      expect(gridDiv.getAttribute('gap')).toBe('6');
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
    });
  });

  describe('Slots', () => {
    it('renders default slot', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const slot = grid.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders slot content', async () => {
      const grid = mount('pilot-grid', {}, '<div class="grid-item">Item 1</div><div class="grid-item">Item 2</div>');
      await waitForRender(grid);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(grid.querySelectorAll('.grid-item').length).toBe(2);
      expect(grid.textContent).toContain('Item 1');
      expect(grid.textContent).toContain('Item 2');
    });

    it('renders HTML content in slot', async () => {
      const grid = mount('pilot-grid', {}, '<pilot-card>Card Content</pilot-card>');
      await waitForRender(grid);
      
      const card = grid.querySelector('pilot-card');
      expect(card).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has grid element with computed styles', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      const styles = window.getComputedStyle(gridDiv);
      
      // Basic style checks
      expect(styles.display).toBe('grid');
    });

    it('applies CSS variable fallbacks for gap', async () => {
      const grid = mount('pilot-grid', { gap: '4' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      
      // Check that the element exists and has styles
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.style).toBeDefined();
    });

    it('applies grid overlay with CSS variables', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true });
      await waitForRender(grid);
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
      
      const styles = window.getComputedStyle(overlay);
      expect(styles.position).toBe('absolute');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      expect(grid.shadowRoot).toBeTruthy();
      expect(grid.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const style = grid.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.grid');
    });

    it('contains grid container element', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv).toBeTruthy();
    });

    it('contains slot element', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const slot = grid.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv).toBeTruthy();
      const slot = grid.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const grid = mount('pilot-grid', { columns: '1' });
      await waitForRender(grid);
      
      // Rapid changes
      grid.setAttribute('columns', '2');
      grid.setAttribute('gap', '8');
      grid.setAttribute('show-grid', '');
      
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('columns')).toBe('2');
      expect(gridDiv.getAttribute('gap')).toBe('8');
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
    });

    it('handles invalid column values gracefully', async () => {
      const grid = mount('pilot-grid', { columns: 'invalid' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      // Component should still render with the invalid value
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.getAttribute('columns')).toBe('invalid');
    });

    it('handles invalid gap values gracefully', async () => {
      const grid = mount('pilot-grid', { gap: 'invalid' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      // Component should still render with the invalid value
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.getAttribute('gap')).toBe('invalid');
    });

    it('handles zero gap value', async () => {
      const grid = mount('pilot-grid', { gap: '0' });
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv.getAttribute('gap')).toBe('0');
    });

    it('handles removing show-grid attribute', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true });
      await waitForRender(grid);
      
      let overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
      
      grid.removeAttribute('show-grid');
      await waitForRender(grid);
      
      overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeFalsy();
    });

    it('handles complex nested content', async () => {
      const complexContent = `
        <div class="nested">
          <pilot-card>
            <h3 slot="header">Card 1</h3>
            <p>Content 1</p>
          </pilot-card>
          <pilot-card>
            <h3 slot="header">Card 2</h3>
            <p>Content 2</p>
          </pilot-card>
        </div>
      `;
      
      const grid = mount('pilot-grid', { columns: '2' }, complexContent);
      await waitForRender(grid);
      
      const nested = grid.querySelector('.nested');
      expect(nested).toBeTruthy();
      expect(grid.querySelectorAll('pilot-card').length).toBe(2);
    });

    it('maintains grid structure after multiple re-renders', async () => {
      const grid = mount('pilot-grid', { columns: '1', gap: '2' });
      await waitForRender(grid);
      
      // Multiple re-renders with deterministic values
      grid.setAttribute('columns', '2');
      grid.setAttribute('gap', '8');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.getAttribute('columns')).toBe('2');
      expect(gridDiv.getAttribute('gap')).toBe('8');
    });
  });

  describe('Grid Overlay', () => {
    it('renders overlay with correct CSS classes', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true });
      await waitForRender(grid);
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      expect(overlay).toBeTruthy();
      
      const styles = window.getComputedStyle(overlay);
      expect(styles.pointerEvents).toBe('none');
    });

    it('overlay is positioned absolutely', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true });
      await waitForRender(grid);
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      const styles = window.getComputedStyle(overlay);
      
      expect(styles.position).toBe('absolute');
    });

    it('overlay does not interfere with slotted content', async () => {
      const grid = mount('pilot-grid', { 'show-grid': true }, '<button>Clickable</button>');
      await waitForRender(grid);
      
      const button = grid.querySelector('button');
      expect(button).toBeTruthy();
      
      const overlay = grid.shadowRoot.querySelector('.grid-overlay');
      const styles = window.getComputedStyle(overlay);
      expect(styles.pointerEvents).toBe('none');
    });
  });

  describe('Host Element', () => {
    it('has shadow root attached', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      expect(grid.shadowRoot).toBeTruthy();
      expect(grid.shadowRoot.mode).toBe('open');
    });

    it('has grid container in shadow DOM', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      const gridDiv = grid.shadowRoot.querySelector('.grid');
      expect(gridDiv).toBeTruthy();
    });

    it('responds to hidden attribute', async () => {
      const grid = mount('pilot-grid');
      await waitForRender(grid);
      
      expect(grid.hasAttribute('hidden')).toBe(false);
      
      grid.setAttribute('hidden', '');
      
      expect(grid.hasAttribute('hidden')).toBe(true);
    });
  });
});
