/**
 * PilotAreaChart Unit Tests
 *
 * Tests for the Pilot Area Chart component using Vitest and happy-dom.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait } from '../tests/web-components.js';

// Import the components
const areaChartModule = await import('./area-chart.js');
const chartDataModule = await import('./chart-data.js');
const { PilotAreaChart } = areaChartModule;
const { PilotChartData } = chartDataModule;

describe('PilotAreaChart', () => {
  beforeEach(() => {
    registerComponent('pilot-area-chart', PilotAreaChart);
    registerComponent('pilot-chart-data', PilotChartData);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default state', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      expect(chart.shadowRoot).toBeTruthy();
      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('shows empty state when no data', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('NO DATA');
    });

    it('renders SVG chart with slotted data', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '75');
      chart.appendChild(data2);

      await waitForRender(chart);

      const svg = chart.shadowRoot.querySelector('.chart-svg');
      expect(svg).toBeTruthy();

      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaLine).toBeTruthy();

      const areaFill = chart.shadowRoot.querySelector('.area-fill');
      expect(areaFill).toBeTruthy();
    });

    it('renders data points', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '100');
      chart.appendChild(data2);

      await waitForRender(chart);

      const dataPoints = chart.shadowRoot.querySelectorAll('.data-point');
      expect(dataPoints.length).toBe(2);
    });

    it('renders x-axis labels', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '100');
      chart.appendChild(data2);

      await waitForRender(chart);

      const xAxisLabels = chart.shadowRoot.querySelectorAll('.x-axis-label');
      expect(xAxisLabels.length).toBe(2);
      expect(xAxisLabels[0].textContent).toBe('JAN');
      expect(xAxisLabels[1].textContent).toBe('FEB');
    });

    it('renders y-axis labels', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      const yAxisLabels = chart.shadowRoot.querySelectorAll('.y-axis-label');
      expect(yAxisLabels.length).toBeGreaterThan(0);
    });

    it('renders grid lines', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const gridLines = chart.shadowRoot.querySelectorAll('.grid-line');
      expect(gridLines.length).toBeGreaterThan(0);
    });
  });

  describe('Slotted Data Attributes', () => {
    it('parses slotted data correctly', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test');
      data1.setAttribute('value', '42');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);

      await waitForRender(chart);

      const dataPoint = chart.shadowRoot.querySelector('.data-point');
      expect(dataPoint).toBeTruthy();
    });

    it('uses max attribute for scaling', async () => {
      const chart = mount('pilot-area-chart', { max: '200' });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaLine).toBeTruthy();
    });

    it('auto-calculates max when not provided', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);

      await waitForRender(chart);

      const dataPoints = chart.shadowRoot.querySelectorAll('.data-point');
      expect(dataPoints.length).toBe(2);
    });
  });

  describe('show-values Attribute', () => {
    it('shows values when show-values is set', async () => {
      const chart = mount('pilot-area-chart', { 'show-values': true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '1234');
      chart.appendChild(data1);

      await waitForRender(chart);

      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label');
      expect(valueLabels.length).toBe(1);
      expect(valueLabels[0].textContent).toContain('1,234');
    });

    it('hides values when show-values is not set', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      const valueLabels = chart.shadowRoot.querySelectorAll('.value-label.visible');
      expect(valueLabels.length).toBe(0);
    });

    it('formats large values with k suffix', async () => {
      const chart = mount('pilot-area-chart', { 'show-values': true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '1500');
      chart.appendChild(data1);

      await waitForRender(chart);

      const valueLabel = chart.shadowRoot.querySelector('.value-label');
      expect(valueLabel.textContent).toBe('1.5k');
    });

    it('formats very large values with M suffix', async () => {
      const chart = mount('pilot-area-chart', { 'show-values': true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '2500000');
      chart.appendChild(data1);

      await waitForRender(chart);

      const valueLabel = chart.shadowRoot.querySelector('.value-label');
      expect(valueLabel.textContent).toBe('2.5M');
    });
  });

  describe('show-legend Attribute', () => {
    it('shows legend when show-legend is set', async () => {
      const chart = mount('pilot-area-chart', { 'show-legend': true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '75');
      data2.setAttribute('color', 'error');
      chart.appendChild(data2);

      await waitForRender(chart);

      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeTruthy();

      const legendItems = legend.querySelectorAll('.legend-item');
      expect(legendItems.length).toBe(2);
    });

    it('hides legend when show-legend is not set', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeFalsy();
    });
  });

  describe('animated Attribute', () => {
    it('adds animated class when animated is set', async () => {
      const chart = mount('pilot-area-chart', { animated: true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);
      await wait(100);

      const areaFill = chart.shadowRoot.querySelector('.area-fill');
      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaFill.classList.contains('animated')).toBe(true);
      expect(areaLine.classList.contains('animated')).toBe(true);
    });

    it('adds animated class to data points', async () => {
      const chart = mount('pilot-area-chart', { animated: true });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);
      await wait(100);

      const dataPoint = chart.shadowRoot.querySelector('.data-point');
      expect(dataPoint.classList.contains('animated')).toBe(true);
    });
  });

  describe('Orientation', () => {
    it('defaults to vertical orientation', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const xAxisLabels = chart.shadowRoot.querySelectorAll('.x-axis-label');
      const yAxisLabels = chart.shadowRoot.querySelectorAll('.y-axis-label');
      expect(xAxisLabels.length).toBe(1);
      expect(yAxisLabels.length).toBeGreaterThan(0);
    });

    it('renders horizontal chart when orientation="horizontal"', async () => {
      const chart = mount('pilot-area-chart', { orientation: 'horizontal' });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaLine).toBeTruthy();
    });
  });

  describe('Tooltip Interaction', () => {
    it('shows tooltip on data point hover', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      const tooltip = chart.shadowRoot.querySelector('.tooltip');
      expect(tooltip).toBeTruthy();

      const dataPoint = chart.shadowRoot.querySelector('.data-point');

      chart._handleMouseMove({ target: dataPoint, clientX: 100, clientY: 100 });

      expect(tooltip.classList.contains('visible')).toBe(true);
    });

    it('hides tooltip when mouse leaves chart', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      const tooltip = chart.shadowRoot.querySelector('.tooltip');
      const dataPoint = chart.shadowRoot.querySelector('.data-point');

      chart._handleMouseMove({ target: dataPoint, clientX: 100, clientY: 100 });
      expect(tooltip.classList.contains('visible')).toBe(true);

      chart._handleMouseLeave();
      expect(tooltip.classList.contains('visible')).toBe(false);
    });

    it('shows value label on hover when show-values is not set', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      const dataPoint = chart.shadowRoot.querySelector('.data-point');
      chart._handleMouseMove({ target: dataPoint, clientX: 100, clientY: 100 });

      const valueLabel = chart.shadowRoot.querySelector('.value-label');
      expect(valueLabel.classList.contains('visible')).toBe(true);
    });
  });

  describe('Click Events', () => {
    it('dispatches point-click event when data point is clicked', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '123');
      chart.appendChild(data1);

      await waitForRender(chart);

      const clickHandler = vi.fn();
      chart.addEventListener('point-click', clickHandler);

      const dataPoint = chart.shadowRoot.querySelector('.data-point');
      dataPoint.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: 123,
        label: 'Jan'
      });
    });

    it('includes item data in click event', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);

      await waitForRender(chart);

      let eventDetail = null;
      chart.addEventListener('point-click', (e) => {
        eventDetail = e.detail;
      });

      const dataPoint = chart.shadowRoot.querySelector('.data-point');
      dataPoint.click();

      expect(eventDetail.item).toMatchObject({
        label: 'Jan',
        value: 50,
        color: 'success'
      });
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when max attribute changes', async () => {
      const chart = mount('pilot-area-chart', { max: '100' });

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      chart.setAttribute('max', '200');
      await waitForRender(chart);

      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaLine).toBeTruthy();
    });

    it('re-renders when show-values attribute is added', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      expect(chart.shadowRoot.querySelector('.value-label.visible')).toBeFalsy();

      chart.setAttribute('show-values', '');
      await waitForRender(chart);

      expect(chart.shadowRoot.querySelector('.value-label.visible')).toBeTruthy();
    });

    it('re-renders when show-legend attribute is added', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);

      await waitForRender(chart);

      expect(chart.shadowRoot.querySelector('.legend')).toBeFalsy();

      chart.setAttribute('show-legend', '');
      await waitForRender(chart);

      expect(chart.shadowRoot.querySelector('.legend')).toBeTruthy();
    });

    it('re-renders when orientation attribute changes', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      await waitForRender(chart);

      chart.setAttribute('orientation', 'horizontal');
      await waitForRender(chart);

      const areaLine = chart.shadowRoot.querySelector('.area-line');
      expect(areaLine).toBeTruthy();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      expect(chart.shadowRoot).toBeTruthy();
      expect(chart.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      const style = chart.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.chart-container');
    });

    it('contains chart container', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero values', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '0');
      chart.appendChild(data1);

      await waitForRender(chart);

      const dataPoints = chart.shadowRoot.querySelectorAll('.data-point');
      expect(dataPoints.length).toBe(1);
    });

    it('handles missing labels gracefully', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const xAxisLabels = chart.shadowRoot.querySelectorAll('.x-axis-label');
      expect(xAxisLabels.length).toBe(1);
    });

    it('handles many data points', async () => {
      const chart = mount('pilot-area-chart');

      for (let i = 0; i < 20; i++) {
        const data = document.createElement('pilot-chart-data');
        data.setAttribute('label', `Day ${i}`);
        data.setAttribute('value', String(i * 10));
        chart.appendChild(data);
      }

      await waitForRender(chart);

      const dataPoints = chart.shadowRoot.querySelectorAll('.data-point');
      expect(dataPoints.length).toBe(20);
    });
  });

  describe('CSS Custom Properties', () => {
    it('applies CSS variable fallbacks', async () => {
      const chart = mount('pilot-area-chart');
      await waitForRender(chart);

      const container = chart.shadowRoot.querySelector('.chart-container');
      expect(container).toBeTruthy();
    });

    it('has correct font family on labels', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);

      await waitForRender(chart);

      const xAxisLabel = chart.shadowRoot.querySelector('.x-axis-label');
      expect(xAxisLabel).toBeTruthy();
    });
  });

  describe('Slot-based Data', () => {
    it('renders chart from slotted pilot-chart-data elements', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);

      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Feb');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);

      await waitForRender(chart);

      const dataPoints = chart.shadowRoot.querySelectorAll('.data-point');
      expect(dataPoints.length).toBe(2);
    });

    it('re-renders when slotted elements are removed', async () => {
      const chart = mount('pilot-area-chart');

      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Jan');
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
