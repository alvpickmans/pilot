/**
 * PilotBarChart Unit Tests
 * 
 * Tests for the Pilot Bar Chart component using Vitest and happy-dom.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait } from '../tests/web-components.js';

// Import the components
const barChartModule = await import('./bar-chart.js');
const chartDataModule = await import('./chart-data.js');
const { PilotBarChart } = barChartModule;
const { PilotChartData } = chartDataModule;

describe('PilotBarChart', () => {
  beforeEach(() => {
    registerComponent('pilot-bar-chart', PilotBarChart);
    registerComponent('pilot-chart-data', PilotChartData);
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

    it('renders bars with slotted data', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '75');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const barsContainer = chart.shadowRoot.querySelector('.bars-container');
      expect(barsContainer).toBeTruthy();
      
      const barRows = chart.shadowRoot.querySelectorAll('.bar-row');
      expect(barRows.length).toBe(2);
    });

    it('renders correct labels', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Category A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Category B');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const labels = chart.shadowRoot.querySelectorAll('.bar-label');
      expect(labels[0].textContent).toBe('Category A');
      expect(labels[1].textContent).toBe('Category B');
    });

    it('renders bar tracks', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barTrack = chart.shadowRoot.querySelector('.bar-track');
      expect(barTrack).toBeTruthy();
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill).toBeTruthy();
    });
  });

  describe('Slotted Data Attributes', () => {
    it('parses slotted data correctly', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test');
      data1.setAttribute('value', '42');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('success');
    });

    it('uses max attribute for scaling', async () => {
      const chart = mount('pilot-bar-chart', { max: '200' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('25%');
    });

    it('auto-calculates max when not provided', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const barFills = chart.shadowRoot.querySelectorAll('.bar-fill');
      // First bar: 100/200 = 50%, Second bar: 200/200 = 100%
      expect(barFills[0].style.getPropertyValue('--bar-width')).toBe('50%');
      expect(barFills[1].style.getPropertyValue('--bar-width')).toBe('100%');
    });
  });

  describe('show-values Attribute', () => {
    it('shows values when show-values is set', async () => {
      const chart = mount('pilot-bar-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '1234');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue).toBeTruthy();
      expect(barValue.textContent).toBe('1,234');
    });

    it('hides values when show-values is not set', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue).toBeFalsy();
    });

    it('formats large values with k suffix', async () => {
      const chart = mount('pilot-bar-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '1500');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue.textContent).toBe('1.5k');
    });

    it('formats very large values with M suffix', async () => {
      const chart = mount('pilot-bar-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '2500000');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue.textContent).toBe('2.5M');
    });
  });

  describe('show-legend Attribute', () => {
    it('shows legend when show-legend is set', async () => {
      const chart = mount('pilot-bar-chart', { 'show-legend': true });
      
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
      expect(legendItems.length).toBe(2); // success and error
    });

    it('hides legend when show-legend is not set', async () => {
      const chart = mount('pilot-bar-chart');
      
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
      const chart = mount('pilot-bar-chart', { animated: true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Wait for animation to be triggered
      await wait(100);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.classList.contains('animated')).toBe(true);
    });

    it('sets initial width to 0 when animated', async () => {
      const chart = mount('pilot-bar-chart', { animated: true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      // Initially should have width from style attribute
      expect(barFill.style.width).toBe('0%');
    });
  });

  describe('Color Variants', () => {
    it('supports primary color', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'primary');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('primary');
    });

    it('supports success color', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('success');
    });

    it('supports warning color', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'warning');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('warning');
    });

    it('supports error color', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'error');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('error');
    });

    it('supports info color', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'info');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('info');
    });

    it('defaults to primary color when not specified', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('primary');
    });
  });

  describe('Click Events', () => {
    it('dispatches bar-click event when bar is clicked', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test Category');
      data1.setAttribute('value', '123');
      chart.appendChild(data1);
      
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
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
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
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('bar-click', clickHandler);
      
      const container = chart.shadowRoot.querySelector('.chart-container');
      container.click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when max attribute changes', async () => {
      const chart = mount('pilot-bar-chart', { max: '100' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      let barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('50%');
      
      chart.setAttribute('max', '200');
      await waitForRender(chart);
      
      barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('25%');
    });

    it('re-renders when show-values attribute is added', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.bar-value')).toBeFalsy();
      
      chart.setAttribute('show-values', '');
      await waitForRender(chart);
      
      expect(chart.shadowRoot.querySelector('.bar-value')).toBeTruthy();
    });

    it('re-renders when show-legend attribute is added', async () => {
      const chart = mount('pilot-bar-chart');
      
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

    it('re-renders when orientation attribute changes', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Initially horizontal (default)
      expect(chart.shadowRoot.querySelector('.bar-row')).toBeTruthy();
      expect(chart.shadowRoot.querySelector('.bar-column')).toBeFalsy();
      
      // Change to vertical
      chart.setAttribute('orientation', 'vertical');
      await waitForRender(chart);
      
      // Now should have vertical structure
      expect(chart.shadowRoot.querySelector('.bar-row')).toBeFalsy();
      expect(chart.shadowRoot.querySelector('.bar-column')).toBeTruthy();
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Should have horizontal elements
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow).toBeTruthy();
      
      // Should not have vertical elements
      const barColumn = chart.shadowRoot.querySelector('.bar-column');
      expect(barColumn).toBeFalsy();
    });

    it('renders vertical bars when orientation="vertical"', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '75');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      // Should have vertical elements
      const barsContainer = chart.shadowRoot.querySelector('.bars-container');
      expect(barsContainer.classList.contains('vertical')).toBe(true);
      
      const barColumns = chart.shadowRoot.querySelectorAll('.bar-column');
      expect(barColumns.length).toBe(2);
      
      // Should have vertical fills
      const barFills = chart.shadowRoot.querySelectorAll('.bar-fill-vertical');
      expect(barFills.length).toBe(2);
    });

    it('renders vertical bar labels at bottom', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Category A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label-vertical');
      expect(barLabel).toBeTruthy();
      expect(barLabel.textContent).toBe('Category A');
    });

    it('renders vertical bar tracks with correct structure', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barTrack = chart.shadowRoot.querySelector('.bar-track-vertical');
      expect(barTrack).toBeTruthy();
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill-vertical');
      expect(barFill).toBeTruthy();
    });

    it('calculates vertical bar heights correctly', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '100');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const barFills = chart.shadowRoot.querySelectorAll('.bar-fill-vertical');
      // First bar: 50/100 = 50%, Second bar: 100/100 = 100%
      expect(barFills[0].style.getPropertyValue('--bar-height')).toBe('50%');
      expect(barFills[1].style.getPropertyValue('--bar-height')).toBe('100%');
    });

    it('shows values in vertical mode when show-values is set', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical', 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '1234');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value-vertical');
      expect(barValue).toBeTruthy();
      expect(barValue.textContent).toBe('1,234');
    });

    it('supports colors in vertical mode', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
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
      
      const barFills = chart.shadowRoot.querySelectorAll('.bar-fill-vertical');
      expect(barFills[0].getAttribute('data-color')).toBe('success');
      expect(barFills[1].getAttribute('data-color')).toBe('error');
    });

    it('supports animations in vertical mode', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical', animated: true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Wait for animation to be triggered
      await wait(100);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill-vertical');
      expect(barFill.classList.contains('animated')).toBe(true);
    });

    it('dispatches bar-click events in vertical mode', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test Category');
      data1.setAttribute('value', '123');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('bar-click', clickHandler);
      
      const barColumn = chart.shadowRoot.querySelector('.bar-column');
      barColumn.click();
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: 123,
        label: 'Test Category'
      });
    });

    it('supports legend in vertical mode', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical', 'show-legend': true });
      
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

    it('handles empty state in vertical mode', async () => {
      const chart = mount('pilot-bar-chart', { orientation: 'vertical' });
      await waitForRender(chart);
      
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('NO DATA');
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
    it('handles zero values', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '0');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('0%');
    });

    it('handles negative values as zero', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '-10');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      // Negative values should be treated as 0
      expect(barFill.style.getPropertyValue('--bar-width')).toBe('0%');
    });

    it('handles missing labels gracefully', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      expect(barLabel.textContent).toBe('');
    });

    it('handles many data points', async () => {
      const chart = mount('pilot-bar-chart');
      
      for (let i = 0; i < 20; i++) {
        const data = document.createElement('pilot-chart-data');
        data.setAttribute('label', `Item ${i}`);
        data.setAttribute('value', String(i * 10));
        chart.appendChild(data);
      }
      
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
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barLabel = chart.shadowRoot.querySelector('.bar-label');
      const styles = window.getComputedStyle(barLabel);
      expect(styles.fontFamily).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on bar rows', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('aria-label')).toContain('A');
      expect(barRow.getAttribute('aria-label')).toContain('50');
    });

    it('has role button on clickable bars', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('role')).toBe('button');
    });

    it('has tabindex on bar rows', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '50');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      expect(barRow.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Slot-based Data', () => {
    it('renders bars from slotted pilot-chart-data elements', async () => {
      const chart = mount('pilot-bar-chart');
      
      // Add slotted data elements
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Category A');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'Category B');
      data2.setAttribute('value', '200');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const barRows = chart.shadowRoot.querySelectorAll('.bar-row');
      expect(barRows.length).toBe(2);
      
      const labels = chart.shadowRoot.querySelectorAll('.bar-label');
      expect(labels[0].textContent).toBe('Category A');
      expect(labels[1].textContent).toBe('Category B');
    });

    it('respects color attribute on slotted elements', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Success');
      data1.setAttribute('value', '100');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barFill = chart.shadowRoot.querySelector('.bar-fill');
      expect(barFill.getAttribute('data-color')).toBe('success');
    });

    it('supports slotted data with show-values', async () => {
      const chart = mount('pilot-bar-chart', { 'show-values': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Item A');
      data1.setAttribute('value', '1500');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const barValue = chart.shadowRoot.querySelector('.bar-value');
      expect(barValue).toBeTruthy();
      expect(barValue.textContent).toBe('1.5k');
    });

    it('supports slotted data with legend', async () => {
      const chart = mount('pilot-bar-chart', { 'show-legend': true });
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'A');
      data1.setAttribute('value', '100');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      const data2 = document.createElement('pilot-chart-data');
      data2.setAttribute('label', 'B');
      data2.setAttribute('value', '200');
      data2.setAttribute('color', 'error');
      chart.appendChild(data2);
      
      await waitForRender(chart);
      
      const legend = chart.shadowRoot.querySelector('.legend');
      expect(legend).toBeTruthy();
      
      const legendItems = legend.querySelectorAll('.legend-item');
      expect(legendItems.length).toBe(2);
    });

    it('dispatches bar-click events with slotted data', async () => {
      const chart = mount('pilot-bar-chart');
      
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Test Category');
      data1.setAttribute('value', '123');
      data1.setAttribute('color', 'success');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      const clickHandler = vi.fn();
      chart.addEventListener('bar-click', clickHandler);
      
      const barRow = chart.shadowRoot.querySelector('.bar-row');
      barRow.click();
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: 123,
        label: 'Test Category',
        item: { label: 'Test Category', value: 123, color: 'success' }
      });
    });

    it('re-renders when slotted elements are removed', async () => {
      const chart = mount('pilot-bar-chart');
      
      // Add slotted data
      const data1 = document.createElement('pilot-chart-data');
      data1.setAttribute('label', 'Temp');
      data1.setAttribute('value', '100');
      chart.appendChild(data1);
      
      await waitForRender(chart);
      
      // Remove slotted element
      data1.remove();
      await waitForRender(chart);
      
      // Should now show empty state
      const emptyState = chart.shadowRoot.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });
  });
});

describe('PilotChartData', () => {
  beforeEach(() => {
    registerComponent('pilot-chart-data', PilotChartData);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Component Structure', () => {
    it('is defined as a custom element', () => {
      expect(customElements.get('pilot-chart-data')).toBe(PilotChartData);
    });

    it('has correct observedAttributes', () => {
      expect(PilotChartData.observedAttributes).toEqual(['label', 'value', 'color']);
    });

    it('renders with shadow root', async () => {
      const data = mount('pilot-chart-data');
      await waitForRender(data);
      
      expect(data.shadowRoot).toBeTruthy();
    });

    it('is invisible by default', async () => {
      const data = mount('pilot-chart-data', { label: 'Test', value: '100' });
      await waitForRender(data);
      
      // The component should be hidden
      expect(data.shadowRoot.innerHTML).toContain('display: none');
    });
  });

  describe('Data API', () => {
    it('getData returns correct object', async () => {
      const data = mount('pilot-chart-data', {
        label: 'Test Label',
        value: '42.5',
        color: 'warning'
      });
      await waitForRender(data);
      
      expect(data.getData()).toEqual({
        label: 'Test Label',
        value: 42.5,
        color: 'warning'
      });
    });

    it('returns defaults for missing attributes', async () => {
      const data = mount('pilot-chart-data');
      await waitForRender(data);
      
      expect(data.getData()).toEqual({
        label: '',
        value: 0,
        color: 'primary'
      });
    });

    it('parses numeric values correctly', async () => {
      const data = mount('pilot-chart-data', {
        label: 'Number',
        value: '123.45'
      });
      await waitForRender(data);
      
      expect(data.getData().value).toBe(123.45);
    });

    it('handles invalid numeric values as 0', async () => {
      const data = mount('pilot-chart-data', {
        label: 'Invalid',
        value: 'not-a-number'
      });
      await waitForRender(data);
      
      expect(data.getData().value).toBe(0);
    });
  });

  describe('Attribute Changes', () => {
    it('updates data when attributes change', async () => {
      const data = mount('pilot-chart-data', {
        label: 'Initial',
        value: '100'
      });
      await waitForRender(data);
      
      expect(data.getData().label).toBe('Initial');
      
      data.setAttribute('label', 'Updated');
      await waitForRender(data);
      
      expect(data.getData().label).toBe('Updated');
    });
  });
});
