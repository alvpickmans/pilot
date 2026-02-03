/**
 * PilotBarChart Unit Tests
 * 
 * Tests for the Pilot Bar Chart component using Vitest and happy-dom.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait } from '../tests/web-components.js';

// Import the component
const module = await import('./bar-chart.js');
const { PilotBarChart } = module;

describe('PilotBarChart', () => {
  beforeEach(() => {
    registerComponent('pilot-bar-chart', PilotBarChart);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default state', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      expect(chart.shadowRoot).toBeTruthy();
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('shows empty state when no data', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('NO DATA');
    });

    it('renders bars with data', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 },
        { label: 'B', value: 75 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barsContainer = chart.shadowRoot.querySelector('.bars-container');
      expect(barsContainer).toBeTruthy();
      
      const barRows = chart.shadowRoot.querySelectorAll('.bar-row');
      expect(barRows.length).toBe(2);
    });

    it('renders correct labels', async () => {
      const data = JSON.stringify([
        { label: 'Category A', value: 100 },
        { label: 'Category B', value: 200 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const labels = chart.shadowRoot.querySelectorAll('.bar-label');
      expect(labels[0].textContent).toBe('Category A');
      expect(labels[1].textContent).toBe('Category B');
    });

    it('renders bar tracks', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barTrack = chart.shadowRoot.querySelector('.bar-track');
      expect(barTrack).toBeTruthy();
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill).toBeTruthy();
    });
  });

  describe('Data Attributes', () => {
    it('parses data attribute correctly', async () => {
      const data = JSON.stringify([
        { label: 'Test', value: 42, color: 'success' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('success');
    });

    it('handles invalid JSON gracefully', async () => {
      const chart = mount('pilot-bar-chart', { data: 'invalid json' });
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });

    it('uses max attribute for scaling', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data, max: '200' });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('25%');
    });

    it('auto-calculates max when not provided', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 100 },
        { label: 'B', value: 200 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFills = chart.shadowRoot.querySelectorAll('.bar-fill');
      // First bar: 100/200 = 50%, Second bar: 200/200 = 100%
      expect(barFills[0].style.getPropertyValue('--bar-width')).toBe('50%');
      expect(barFills[1].style.getPropertyValue('--bar-width')).toBe('100%');
    });
  });

  describe('show-values Attribute', () => {
    it('shows values when show-values is set', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 1234 }
      ]);
      const chart = mount('pilot-bar-chart', { data, 'show-values': true });
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue).toBeTruthy();
      expect(barValue.textContent).toBe('1,234');
    });

    it('hides values when show-values is not set', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 100 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue).toBeFalsy();
    });

    it('formats large values with k suffix', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 1500 }
      ]);
      const chart = mount('pilot-bar-chart', { data, 'show-values': true });
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue.textContent).toBe('1.5k');
    });

    it('formats very large values with M suffix', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 2500000 }
      ]);
      const chart = mount('pilot-bar-chart', { data, 'show-values': true });
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue.textContent).toBe('2.5M');
    });
  });

  describe('show-legend Attribute', () => {
    it('shows legend when show-legend is set', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'success' },
        { label: 'B', value: 75, color: 'error' }
      ]);
      const chart = mount('pilot-bar-chart', { data, 'show-legend': true });
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeTruthy();
      
      const legendItems = legend.querySelectorAll('.legend-item');
      expect(legendItems.length).toBe(2); // success and error
    });

    it('hides legend when show-legend is not set', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeFalsy();
    });
  });

  describe('animated Attribute', () => {
    it('adds animated class when animated is set', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data, animated: true });
      await waitForRender(chart);
      
      // Wait for animation to be triggered
      await wait(100);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.classList.contains('animated')).toBe(true);
    });

    it('sets initial width to 0 when animated', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data, animated: true });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      // Initially should have width from style attribute
      expect(barFill.style.width).toBe('0%');
    });
  });

  describe('Color Variants', () => {
    it('supports primary color', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'primary' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('primary');
    });

    it('supports success color', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'success' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('success');
    });

    it('supports warning color', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'warning' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('warning');
    });

    it('supports error color', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'error' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('error');
    });

    it('supports info color', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'info' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('info');
    });

    it('defaults to primary color when not specified', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('primary');
    });
  });

  describe('Click Events', () => {
    it('dispatches bar-click event when bar is clicked', async () => {
      const data = JSON.stringify([
        { label: 'Test Category', value: 123 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('bar-click', clickHandler);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      barRow.click();
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: 123,
        label: 'Test Category'
      });
    });

    it('includes item data in click event', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50, color: 'success' }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      let eventDetail = null;
      chart.addEventListener('bar-click', (e) => {
        eventDetail = e.detail;
      });
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      barRow.click();
      
      expect(eventDetail.item).toMatchObject({
        label: 'A',
        value: 50,
        color: 'success'
      });
    });

    it('does not dispatch event when clicking non-bar area', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('bar-click', clickHandler);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      container.click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when data attribute changes', async () => {
      const chart = mount('pilot-bar-chart', { 
        data: JSON.stringify([{ label: 'A', value: 50 }]) 
      });
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelectorAll('.bar-row').length).toBe(1);
      
      chart.setAttribute('data', JSON.stringify([
        { label: 'A', value: 50 },
        { label: 'B', value: 100 }
      ]));
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelectorAll('.bar-row').length).toBe(2);
    });

    it('re-renders when max attribute changes', async () => {
      const chart = mount('pilot-bar-chart', { 
        data: JSON.stringify([{ label: 'A', value: 50 }]),
        max: '100'
      });
      await waitForRender(chart);
      
      let barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('50%');
      
      chart.setAttribute('max', '200');
      await waitForRender(chart);
      
      barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('25%');
    });

    it('re-renders when show-values attribute is added', async () => {
      const chart = mount('pilot-bar-chart', { 
        data: JSON.stringify([{ label: 'A', value: 100 }])
      });
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.bar-value')).toBeFalsy();
      
      chart.setAttribute('show-values', '');
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.bar-value')).toBeTruthy();
    });

    it('re-renders when show-legend attribute is added', async () => {
      const chart = mount('pilot-bar-chart', { 
        data: JSON.stringify([{ label: 'A', value: 100, color: 'success' }])
      });
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.legend')).toBeFalsy();
      
      chart.setAttribute('show-legend', '');
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.legend')).toBeTruthy();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      expect(chart.shadowRoot).toBeTruthy();
      expect(chart.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      const style = chart.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.chart-container');
    });

    it('contains chart container', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty array data', async () => {
      const chart = mount('pilot-bar-chart', { data: '[]' });
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });

    it('handles zero values', async () => {
      const data = JSON.stringify([
        { label: 'A', value: 0 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('0%');
    });

    it('handles negative values as zero', async () => {
      const data = JSON.stringify([
        { label: 'A', value: -10 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      // Negative values should be treated as 0
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('0%');
    });

    it('handles missing labels gracefully', async () => {
      const data = JSON.stringify([
        { value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      expect(barLabel.textContent).toBe('');
    });

    it('handles rapid data changes', async () => {
      const chart = mount('pilot-bar-chart', { 
        data: JSON.stringify([{ label: 'A', value: 50 }])
      });
      await waitForRender(chart);
      
      // Rapid changes
      chart.setAttribute('data', JSON.stringify([{ label: 'B', value: 100 }]));
      chart.setAttribute('max', '200');
      
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      expect(barLabel.textContent).toBe('B');
    });

    it('handles special characters in labels', async () => {
      const data = JSON.stringify([
        { label: '<>&"\' Special', value: 50 }
      ]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      expect(barLabel.textContent).toContain('<');
      expect(barLabel.textContent).toContain('>');
      expect(barLabel.textContent).toContain('&');
    });

    it('handles many data points', async () => {
      const data = Array.from({ length: 20 }, (_, i) => ({
        label: `Item ${i}`,
        value: i * 10
      }));
      const chart = mount('pilot-bar-chart', { data: JSON.stringify(data) });
      await waitForRender(chart);
      
      const barRows = chart.shadowRoot.querySelectorAll('.bar-row');
      expect(barRows.length).toBe(20);
    });
  });

  describe('CSS Custom Properties', () => {
    it('applies CSS variable fallbacks', async () => {
      const chart = mount('pilot-bar-chart');
      await waitForRender(chart);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('has correct font family on labels', async () => {
      const data = JSON.stringify([{ label: 'A', value: 50 }]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      const styles = window.getComputedStyle(barLabel);
      expect(styles.fontFamily).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on bar rows', async () => {
      const data = JSON.stringify([{ label: 'A', value: 50 }]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('aria-label')).toContain('A');
      expect(barRow.getAttribute('aria-label')).toContain('50');
    });

    it('has role button on clickable bars', async () => {
      const data = JSON.stringify([{ label: 'A', value: 50 }]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('role')).toBe('button');
    });

    it('has tabindex on bar rows', async () => {
      const data = JSON.stringify([{ label: 'A', value: 50 }]);
      const chart = mount('pilot-bar-chart', { data });
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('tabindex')).toBe('0');
    });
  });
});
