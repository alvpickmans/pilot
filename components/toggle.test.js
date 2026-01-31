/**
 * PilotToggle Unit Tests
 * 
 * Tests for the Pilot Toggle component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const toggleModule = await import('./toggle.js');
const { PilotToggle } = toggleModule;

describe('PilotToggle', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-toggle', PilotToggle);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      expect(toggle.shadowRoot).toBeTruthy();
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track).toBeTruthy();
    });

    it('renders with default labels (ON/OFF)', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      expect(labels.length).toBe(2);
      expect(labels[0].textContent).toBe('OFF');
      expect(labels[1].textContent).toBe('ON');
    });

    it('applies unchecked state by default', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.classList.contains('checked')).toBe(false);
      expect(track.getAttribute('aria-checked')).toBe('false');
    });

    it('applies checked state when attribute is set', async () => {
      const toggle = mount('pilot-toggle', { checked: true });
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.classList.contains('checked')).toBe(true);
      expect(track.getAttribute('aria-checked')).toBe('true');
    });

    it('applies disabled state', async () => {
      const toggle = mount('pilot-toggle', { disabled: true });
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.hasAttribute('disabled')).toBe(true);
      expect(track.getAttribute('tabindex')).toBe('-1');
    });

    it('renders custom labels', async () => {
      const toggle = mount('pilot-toggle', { labels: 'Enabled|Disabled' });
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      expect(labels[0].textContent).toBe('Disabled');
      expect(labels[1].textContent).toBe('Enabled');
    });

    it('has hidden checkbox input for accessibility', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const checkbox = toggle.shadowRoot.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeTruthy();
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when checked changes', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      toggle.setAttribute('checked', '');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.classList.contains('checked')).toBe(true);
    });

    it('re-renders when checked is removed', async () => {
      const toggle = mount('pilot-toggle', { checked: true });
      await waitForRender(toggle);
      
      toggle.removeAttribute('checked');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.classList.contains('checked')).toBe(false);
    });

    it('re-renders when disabled changes', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      toggle.setAttribute('disabled', '');
      await waitForRender(toggle);
      
      let track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.hasAttribute('disabled')).toBe(true);
      
      toggle.removeAttribute('disabled');
      await waitForRender(toggle);
      
      // Re-query after re-render since the DOM was recreated
      track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.hasAttribute('disabled')).toBe(false);
    });

    it('re-renders when labels change', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      toggle.setAttribute('labels', 'Yes|No');
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      expect(labels[0].textContent).toBe('No');
      expect(labels[1].textContent).toBe('Yes');
    });
  });

  describe('Interaction', () => {
    it('toggles on click', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      track.click();
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(true);
    });

    it('toggles off on second click', async () => {
      const toggle = mount('pilot-toggle', { checked: true });
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      track.click();
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(false);
    });

    it('does not toggle when disabled', async () => {
      const toggle = mount('pilot-toggle', { disabled: true });
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      track.click();
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(false);
    });

    it('toggles on Enter key', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      toggle.dispatchEvent(event);
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(true);
    });

    it('toggles on Space key', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      toggle.dispatchEvent(event);
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(true);
    });

    it('does not toggle on other keys', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      toggle.dispatchEvent(event);
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(false);
    });

    it('does not toggle on keydown when disabled', async () => {
      const toggle = mount('pilot-toggle', { disabled: true });
      await waitForRender(toggle);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      toggle.dispatchEvent(event);
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(false);
    });

    it('dispatches change event on toggle', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const changeHandler = vi.fn();
      toggle.addEventListener('change', changeHandler);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      track.click();
      await waitForRender(toggle);
      
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail.checked).toBe(true);
    });
  });

  describe('CSS Custom Properties', () => {
    it('has toggle track with computed styles', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      const styles = window.getComputedStyle(track);
      
      // Basic style checks
      expect(styles.cursor).toBe('pointer');
    });

    it('applies CSS variable fallbacks', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      
      // Check that the element exists and has styles
      expect(track).toBeTruthy();
      expect(track.style).toBeDefined();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      expect(toggle.shadowRoot).toBeTruthy();
      expect(toggle.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const style = toggle.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.toggle-track');
    });

    it('contains toggle track element', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track).toBeTruthy();
    });

    it('contains toggle thumb element', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const thumb = toggle.shadowRoot.querySelector('.toggle-thumb');
      expect(thumb).toBeTruthy();
    });

    it('contains both label elements', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      expect(labels.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('has role switch', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.getAttribute('role')).toBe('switch');
    });

    it('has aria-checked attribute', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.getAttribute('aria-checked')).toBe('false');
    });

    it('updates aria-checked when toggled', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      track.click();
      await waitForRender(toggle);
      
      const updatedTrack = toggle.shadowRoot.querySelector('.toggle-track');
      expect(updatedTrack.getAttribute('aria-checked')).toBe('true');
    });

    it('is focusable by default', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.getAttribute('tabindex')).toBe('0');
    });

    it('is not focusable when disabled', async () => {
      const toggle = mount('pilot-toggle', { disabled: true });
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid toggling', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      
      // Rapid clicks
      track.click();
      track.click();
      track.click();
      
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const toggle = mount('pilot-toggle', { 
        checked: true,
        disabled: true,
        labels: 'Active|Inactive'
      });
      await waitForRender(toggle);
      
      // Trigger re-render by changing one attribute
      toggle.removeAttribute('disabled');
      await waitForRender(toggle);
      
      const track = toggle.shadowRoot.querySelector('.toggle-track');
      expect(track.classList.contains('checked')).toBe(true);
      expect(track.hasAttribute('disabled')).toBe(false);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      expect(labels[0].textContent).toBe('Inactive');
      expect(labels[1].textContent).toBe('Active');
    });

    it('handles empty labels attribute', async () => {
      const toggle = mount('pilot-toggle', { labels: '' });
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      // Should fall back to default labels
      expect(labels[0].textContent).toBe('OFF');
      expect(labels[1].textContent).toBe('ON');
    });

    it('handles malformed labels attribute', async () => {
      const toggle = mount('pilot-toggle', { labels: 'Single' });
      await waitForRender(toggle);
      
      const labels = toggle.shadowRoot.querySelectorAll('.toggle-label');
      // Should fall back to default labels when format is wrong
      expect(labels[0].textContent).toBe('OFF');
      expect(labels[1].textContent).toBe('ON');
    });
  });

  describe('Properties', () => {
    it('has checked property getter', async () => {
      const toggle = mount('pilot-toggle', { checked: true });
      await waitForRender(toggle);
      
      expect(toggle.checked).toBe(true);
    });

    it('has checked property setter', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      toggle.checked = true;
      await waitForRender(toggle);
      
      expect(toggle.hasAttribute('checked')).toBe(true);
    });

    it('has labels property getter', async () => {
      const toggle = mount('pilot-toggle', { labels: 'Yes|No' });
      await waitForRender(toggle);
      
      expect(toggle.labels).toEqual({ on: 'Yes', off: 'No' });
    });

    it('has labels property setter', async () => {
      const toggle = mount('pilot-toggle');
      await waitForRender(toggle);
      
      toggle.labels = { on: 'Enabled', off: 'Disabled' };
      await waitForRender(toggle);
      
      expect(toggle.getAttribute('labels')).toBe('Enabled|Disabled');
    });
  });
});
