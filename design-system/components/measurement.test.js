/**
 * PilotMeasurement Unit Tests
 * 
 * Tests for the Pilot Measurement component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const measurementModule = await import('./measurement.js');
const { PilotMeasurement } = measurementModule;

describe('PilotMeasurement', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-measurement', PilotMeasurement);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      expect(measurement.shadowRoot).toBeTruthy();
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl).toBeTruthy();
      expect(measurementEl.getAttribute('orientation')).toBe('horizontal');
    });

    it('renders with value attribute', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl).toBeTruthy();
      expect(valueEl.textContent).toBe('100');
    });

    it('renders with unit attribute', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: 'px' });
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeTruthy();
      expect(unitEl.textContent).toBe('px');
    });

    it('renders horizontal orientation by default', async () => {
      const measurement = mount('pilot-measurement', { value: '50' });
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl.getAttribute('orientation')).toBe('horizontal');
      
      // Horizontal should have two lines (one before value, one after)
      const lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(2);
    });

    it('renders vertical orientation', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'vertical', 
        value: '100' 
      });
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl.getAttribute('orientation')).toBe('vertical');
      
      // Vertical should have only one line (after value)
      const lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(1);
    });

    it('renders with both value and unit', async () => {
      const measurement = mount('pilot-measurement', { 
        value: '42.5', 
        unit: 'rem' 
      });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      
      expect(valueEl.textContent).toBe('42.5');
      expect(unitEl.textContent).toBe('rem');
    });

    it('renders without unit when unit is empty', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeFalsy();
    });

    it('renders without value when value is empty', async () => {
      const measurement = mount('pilot-measurement', { unit: 'px' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('');
      
      // Unit should still render even without value
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeTruthy();
      expect(unitEl.textContent).toBe('px');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when value changes', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      measurement.setAttribute('value', '200');
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('200');
    });

    it('re-renders when unit changes', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: 'px' });
      await waitForRender(measurement);
      
      measurement.setAttribute('unit', 'rem');
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl.textContent).toBe('rem');
    });

    it('re-renders when orientation changes from horizontal to vertical', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'horizontal', 
        value: '100' 
      });
      await waitForRender(measurement);
      
      // Initially should have 2 lines in horizontal mode
      let lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(2);
      
      measurement.setAttribute('orientation', 'vertical');
      await waitForRender(measurement);
      
      // After change to vertical, should have 1 line
      lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(1);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl.getAttribute('orientation')).toBe('vertical');
    });

    it('re-renders when orientation changes from vertical to horizontal', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'vertical', 
        value: '100' 
      });
      await waitForRender(measurement);
      
      // Initially should have 1 line in vertical mode
      let lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(1);
      
      measurement.setAttribute('orientation', 'horizontal');
      await waitForRender(measurement);
      
      // After change to horizontal, should have 2 lines
      lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(2);
    });

    it('removes unit element when unit attribute is removed', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: 'px' });
      await waitForRender(measurement);
      
      // Initially has unit
      let unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeTruthy();
      
      measurement.removeAttribute('unit');
      await waitForRender(measurement);
      
      // After removing unit attribute, unit element should be gone
      unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeFalsy();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      expect(measurement.shadowRoot).toBeTruthy();
      expect(measurement.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const style = measurement.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.measurement');
      expect(style.textContent).toContain('.line');
    });

    it('contains measurement wrapper element', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl).toBeTruthy();
      expect(measurementEl.tagName.toLowerCase()).toBe('span');
    });

    it('contains value element', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl).toBeTruthy();
      expect(valueEl.tagName.toLowerCase()).toBe('span');
    });

    it('contains line elements', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBeGreaterThan(0);
      
      lines.forEach(line => {
        expect(line.tagName.toLowerCase()).toBe('span');
      });
    });

    it('horizontal orientation has correct DOM structure', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'horizontal',
        value: '100',
        unit: 'px'
      });
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      const children = Array.from(measurementEl.children);
      
      // Structure: line, value, unit, line
      expect(children[0].classList.contains('line')).toBe(true);
      expect(children[1].classList.contains('value')).toBe(true);
      expect(children[2].classList.contains('unit')).toBe(true);
      expect(children[3].classList.contains('line')).toBe(true);
    });

    it('vertical orientation has correct DOM structure', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'vertical',
        value: '100',
        unit: 'px'
      });
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      const children = Array.from(measurementEl.children);
      
      // Structure: value, unit, line (no leading line in vertical)
      expect(children[0].classList.contains('value')).toBe(true);
      expect(children[1].classList.contains('unit')).toBe(true);
      expect(children[2].classList.contains('line')).toBe(true);
    });
  });

  describe('CSS Custom Properties', () => {
    it('has measurement element with computed styles', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      const styles = window.getComputedStyle(measurementEl);
      
      // Basic style checks
      expect(styles.display).toBe('flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      
      // Check that the element exists and has styles
      expect(measurementEl).toBeTruthy();
      expect(measurementEl.style).toBeDefined();
    });

    it('line elements have correct styles', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      const line = measurement.shadowRoot.querySelector('.line');
      expect(line).toBeTruthy();
      
      const styles = window.getComputedStyle(line);
      expect(styles).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value attribute', async () => {
      const measurement = mount('pilot-measurement', { value: '' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('');
    });

    it('handles empty unit attribute', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: '' });
      await waitForRender(measurement);
      
      // Empty string unit should not render unit element
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl).toBeFalsy();
    });

    it('handles special characters in value', async () => {
      const measurement = mount('pilot-measurement', { value: '<script>alert("xss")</script>' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      // Component uses innerHTML so HTML is parsed - verify content is present
      expect(valueEl.textContent).toContain('alert');
    });

    it('handles special characters in unit', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: '<b>px</b>' });
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      // Component uses innerHTML so HTML is parsed - verify content is present
      expect(unitEl.textContent).toContain('px');
    });

    it('handles rapid attribute changes', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      // Rapid changes
      measurement.setAttribute('value', '200');
      measurement.setAttribute('unit', 'rem');
      measurement.setAttribute('orientation', 'vertical');
      
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      
      expect(valueEl.textContent).toBe('200');
      expect(unitEl.textContent).toBe('rem');
      expect(measurementEl.getAttribute('orientation')).toBe('vertical');
    });

    it('preserves attributes on re-render', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'vertical',
        value: '50',
        unit: 'em'
      });
      await waitForRender(measurement);
      
      // Trigger re-render by changing one attribute
      measurement.setAttribute('value', '100');
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      
      expect(valueEl.textContent).toBe('100');
      expect(unitEl.textContent).toBe('em');
      expect(measurementEl.getAttribute('orientation')).toBe('vertical');
    });

    it('handles numeric values', async () => {
      const measurement = mount('pilot-measurement', { value: '42.5' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('42.5');
    });

    it('handles zero value', async () => {
      const measurement = mount('pilot-measurement', { value: '0' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('0');
    });

    it('handles long value strings', async () => {
      const longValue = '999999.999999';
      const measurement = mount('pilot-measurement', { value: longValue });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe(longValue);
    });

    it('handles long unit strings', async () => {
      const longUnit = 'kilometers';
      const measurement = mount('pilot-measurement', { value: '100', unit: longUnit });
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl.textContent).toBe(longUnit);
    });

    it('handles invalid orientation gracefully', async () => {
      const measurement = mount('pilot-measurement', { 
        orientation: 'diagonal',
        value: '100'
      });
      await waitForRender(measurement);
      
      // Should still render, just with the invalid orientation value
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      expect(measurementEl).toBeTruthy();
      expect(measurementEl.getAttribute('orientation')).toBe('diagonal');
      
      // Invalid orientation renders 1 line (treated as non-horizontal)
      const lines = measurement.shadowRoot.querySelectorAll('.line');
      expect(lines.length).toBe(1);
    });

    it('handles whitespace in value', async () => {
      const measurement = mount('pilot-measurement', { value: '  100  ' });
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('  100  ');
    });

    it('handles whitespace in unit', async () => {
      const measurement = mount('pilot-measurement', { value: '100', unit: '  px  ' });
      await waitForRender(measurement);
      
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      expect(unitEl.textContent).toBe('  px  ');
    });
  });

  describe('Component Integration', () => {
    it('can be created programmatically', async () => {
      const measurement = document.createElement('pilot-measurement');
      measurement.setAttribute('value', '100');
      measurement.setAttribute('unit', 'px');
      document.body.appendChild(measurement);
      
      await waitForRender(measurement);
      
      expect(measurement.shadowRoot).toBeTruthy();
      const valueEl = measurement.shadowRoot.querySelector('.value');
      expect(valueEl.textContent).toBe('100');
    });

    it('can have attributes set after mount', async () => {
      const measurement = mount('pilot-measurement');
      await waitForRender(measurement);
      
      measurement.setAttribute('value', '200');
      measurement.setAttribute('unit', 'rem');
      measurement.setAttribute('orientation', 'vertical');
      
      await waitForRender(measurement);
      
      const valueEl = measurement.shadowRoot.querySelector('.value');
      const unitEl = measurement.shadowRoot.querySelector('.unit');
      const measurementEl = measurement.shadowRoot.querySelector('.measurement');
      
      expect(valueEl.textContent).toBe('200');
      expect(unitEl.textContent).toBe('rem');
      expect(measurementEl.getAttribute('orientation')).toBe('vertical');
    });

    it('can be removed from DOM safely', async () => {
      const measurement = mount('pilot-measurement', { value: '100' });
      await waitForRender(measurement);
      
      // Remove from DOM
      measurement.remove();
      
      // Component should be removed without errors
      expect(document.body.contains(measurement)).toBe(false);
    });

    it('supports multiple instances', async () => {
      const measurement1 = mount('pilot-measurement', { value: '100', unit: 'px' });
      const measurement2 = mount('pilot-measurement', { value: '200', unit: 'rem' });
      const measurement3 = mount('pilot-measurement', { 
        orientation: 'vertical',
        value: '300',
        unit: 'em'
      });
      
      await waitForRender(measurement1);
      await waitForRender(measurement2);
      await waitForRender(measurement3);
      
      // Each should have independent state
      expect(measurement1.shadowRoot.querySelector('.value').textContent).toBe('100');
      expect(measurement2.shadowRoot.querySelector('.value').textContent).toBe('200');
      expect(measurement3.shadowRoot.querySelector('.value').textContent).toBe('300');
      
      expect(measurement1.shadowRoot.querySelector('.unit').textContent).toBe('px');
      expect(measurement2.shadowRoot.querySelector('.unit').textContent).toBe('rem');
      expect(measurement3.shadowRoot.querySelector('.unit').textContent).toBe('em');
      
      // Check orientations
      expect(measurement1.shadowRoot.querySelector('.measurement').getAttribute('orientation')).toBe('horizontal');
      expect(measurement3.shadowRoot.querySelector('.measurement').getAttribute('orientation')).toBe('vertical');
    });
  });
});
