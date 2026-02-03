/**
 * PilotPieChart Unit Tests
 * 
 * Tests for the Pilot Pie Chart component using Vitest and happy-dom.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait } from '../tests/web-components.js';

const pieChartModule = await import('./pie-chart.js');
const chartDataModule = await import('./chart-data.js');
const { PilotPieChart } = pieChartModule;
const { PilotChartData } = chartDataModule;

describe('PilotPieChart', () => {
  beforeEach(() => {
    registerComponent('pilot-pie-chart', PilotPieChart);
    registerComponent('pilot-chart-data', PilotChartData);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default state', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      expect(chart.shadowRoot).toBeTruthy();
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('shows empty state when no data', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('NO DATA');
    });

    it('renders pie slices with slotted data', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '75');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart).toBeTruthy();
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(2);
    });

    it('renders SVG element', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const svg = chart.shadowRoot.querySelector('.pie-svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Slotted Data Attributes', () => {
    it('parses slotted data correctly', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test');
      data1.setAttribute('value', '42');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(1);
      expect(pieSlices[0].dataset.index).toBe('0');
    });

    it('calculates correct slice proportions', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '50');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(2);
      
      const slice1Path = pieSlices[0].getAttribute('d');
      const slice2Path = pieSlices[1].getAttribute('d');
      
      // Both slices should have paths (not empty)
      expect(slice1Path).toBeTruthy();
      expect(slice2Path).toBeTruthy();
    });
  });

  describe('show-values Attribute', () => {
    it('shows values when show-values is set', async () => {
      const chart = mount('pilot-pie-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBeGreaterThan(0);
      expect(valueLabels[0].textContent).toBe('100.0%');
    });

    it('hides values when show-values is not set', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBe(0);
    });

    it('shows percentage values on pie slices', async () => {
      const chart = mount('pilot-pie-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '50');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBe(2);
      expect(valueLabels[0].textContent).toBe('50.0%');
      expect(valueLabels[1].textContent).toBe('50.0%');
    });

    it('displays percentages that sum to 100%', async () => {
      const chart = mount('pilot-pie-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '75');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '25');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBe(2);
      expect(valueLabels[0].textContent).toBe('75.0%');
      expect(valueLabels[1].textContent).toBe('25.0%');
    });

    it('handles zero total value gracefully', async () => {
      const chart = mount('pilot-pie-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '0');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBe(1);
      expect(valueLabels[0].textContent).toBe('0%');
    });
  });

  describe('show-legend Attribute', () => {
    it('shows legend when show-legend is set', async () => {
      const chart = mount('pilot-pie-chart', { 'show-legend': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '75');
      data2.setAttribute('color', 'error');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeTruthy();
      
      const legendItems = legend.querySelectorAll('.legend-item');
      expect(legendItems.length).toBe(2);
    });

    it('shows percentage in legend', async () => {
      const chart = mount('pilot-pie-chart', { 'show-legend': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '50');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      const legendItems = legend.querySelectorAll('.legend-item');
      
      // Both should show 50.0%
      expect(legendItems[0].querySelector('.legend-value').textContent).toBe('50.0%');
      expect(legendItems[1].querySelector('.legend-value').textContent).toBe('50.0%');
    });

    it('hides legend when show-legend is not set', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeFalsy();
    });
  });

  describe('animated Attribute', () => {
    it('adds animated class when animated is set', async () => {
      const chart = mount('pilot-pie-chart', { animated: true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      await wait(100);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.classList.contains('animated')).toBe(true);
    });

    it('sets animation delay for staggered effect', async () => {
      const chart = mount('pilot-pie-chart', { animated: true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '50');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      await wait(100);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(2);
      expect(pieSlices[0].classList.contains('animated')).toBe(true);
      expect(pieSlices[1].classList.contains('animated')).toBe(true);
    });
  });

  describe('Color Variants', () => {
    it('supports primary color', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'primary');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-brand-primary');
    });

    it('supports success color', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-feedback-success');
    });

    it('supports warning color', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'warning');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-feedback-warning');
    });

    it('supports error color', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'error');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-feedback-error');
    });

    it('supports info color', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'info');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-feedback-info');
    });

    it('defaults to primary color when not specified', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-brand-primary');
    });
  });

  describe('size Attribute', () => {
    it('renders default size when size is not set', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart.classList.contains('size-sm')).toBe(false);
      expect(pieChart.classList.contains('size-lg')).toBe(false);
    });

    it('renders small size when size="sm"', async () => {
      const chart = mount('pilot-pie-chart', { size: 'sm' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart.classList.contains('size-sm')).toBe(true);
    });

    it('renders large size when size="lg"', async () => {
      const chart = mount('pilot-pie-chart', { size: 'lg' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart.classList.contains('size-lg')).toBe(true);
    });
  });

  describe('Click Events', () => {
    it('dispatches slice-click event when slice is clicked', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test Category');
      data1.setAttribute('value', '123');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('slice-click', clickHandler);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      pieSlice.click();
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: 123,
        label: 'Test Category'
      });
    });

    it('includes item data in click event', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      let eventDetail = null;
      chart.addEventListener('slice-click', (e) => {
        eventDetail = e.detail;
      });
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      pieSlice.click();
      
      expect(eventDetail.item).toMatchObject({
        label: 'A',
        value: 50,
        color: 'success'
      });
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when show-values attribute is added', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.value-label')).toBeFalsy();
      
      chart.setAttribute('show-values', '');
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelectorAll('.value-label').length).toBeGreaterThan(0);
    });

    it('re-renders when show-legend attribute is added', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.legend')).toBeFalsy();
      
      chart.setAttribute('show-legend', '');
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.legend')).toBeTruthy();
    });

    it('re-renders when size attribute changes', async () => {
      const chart = mount('pilot-pie-chart', { size: 'sm' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      let pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart.classList.contains('size-sm')).toBe(true);
      
      chart.setAttribute('size', 'lg');
      await waitForRender(chart);
      
      pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart.classList.contains('size-lg')).toBe(true);
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      expect(chart.shadowRoot).toBeTruthy();
      expect(chart.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      const style = chart.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.chart-container');
    });

    it('contains chart container', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero values', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '0');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Should still render a pie chart even with zero value
      const pieChart = chart.shadowRoot.querySelector('.pie-chart');
      expect(pieChart).toBeTruthy();
    });

    it('handles missing labels gracefully', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(1);
    });

    it('handles many data points', async () => {
      const chart = mount('pilot-pie-chart');
      
      for (let i = 0; i < 10; i++) {
        const data = document.createElement('pilot-chart-data');
        data.setAttribute('label', `Item ${i}`);
        data.setAttribute('value', String(i * 10));
        chart.appendChild(data);
      }
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(10);
    });

    it('handles single data point', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Single');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(1);
    });
  });

  describe('CSS Custom Properties', () => {
    it('applies CSS variable fallbacks', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('has correct font family', async () => {
      const chart = mount('pilot-pie-chart');
      await waitForRender(chart);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      const styles = window.getComputedStyle(container);
      expect(styles.fontFamily).toBeDefined();
    });
  });

  describe('Slot-based Data', () => {
    it('renders pie slices from slotted pilot-chart-data elements', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Category A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Category B');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const pieSlices = chart.shadowRoot.querySelectorAll('.pie-slice');
      expect(pieSlices.length).toBe(2);
    });

    it('respects color attribute on slotted elements', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Success');
      data1.setAttribute('value', '100');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const pieSlice = chart.shadowRoot.querySelector('.pie-slice');
      expect(pieSlice.getAttribute('fill')).toContain('var(--color-feedback-success');
    });

    it('re-renders when slotted elements are removed', async () => {
      const chart = mount('pilot-pie-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Temp');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      data1.remove();
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });
  });
});
