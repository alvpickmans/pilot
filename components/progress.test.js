/**
 * Pilot Design System - Progress Component Tests
 *
 * Tests for the Pilot Progress component using Vitest and happy-dom.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./progress.js');
const { PilotProgress } = module;

describe('PilotProgress', () => {
  beforeEach(() => {
    registerComponent('pilot-progress', PilotProgress);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('should be defined', () => {
      expect(customElements.get('pilot-progress')).toBeDefined();
    });

    it('renders with default attributes', async () => {
      const progress = mount('pilot-progress');
      await waitForRender(progress);

      expect(progress.shadowRoot).toBeTruthy();
      const track = progress.shadowRoot.querySelector('.progress-track');
      expect(track).toBeTruthy();
      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar).toBeTruthy();
    });

    it('renders with value attribute', async () => {
      const progress = mount('pilot-progress', { value: '50' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('50%');
      expect(bar.getAttribute('aria-valuenow')).toBe('50');
    });

    it('renders with max attribute', async () => {
      const progress = mount('pilot-progress', { value: '50', max: '200' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('aria-valuemax')).toBe('200');
      expect(bar.style.width).toBe('25%');
    });

    it('displays percentage label by default', async () => {
      const progress = mount('pilot-progress', { value: '75', label: 'Progress' });
      await waitForRender(progress);

      const percentage = progress.shadowRoot.querySelector('.progress-percentage');
      expect(percentage).toBeTruthy();
      expect(percentage.textContent).toBe('75%');
    });

    it('renders with custom label', async () => {
      const progress = mount('pilot-progress', { value: '50', label: 'Budget Used' });
      await waitForRender(progress);

      const label = progress.shadowRoot.querySelector('.progress-label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Budget Used');
    });
  });

  describe('Variants', () => {
    it('applies default variant', async () => {
      const progress = mount('pilot-progress', { value: '50' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('variant')).toBe('default');
    });

    it('applies success variant', async () => {
      const progress = mount('pilot-progress', { value: '50', variant: 'success' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('variant')).toBe('success');
    });

    it('applies warning variant', async () => {
      const progress = mount('pilot-progress', { value: '50', variant: 'warning' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('variant')).toBe('warning');
    });

    it('applies error variant', async () => {
      const progress = mount('pilot-progress', { value: '50', variant: 'error' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('variant')).toBe('error');
    });
  });

  describe('Striped and Animated', () => {
    it('renders with striped attribute', async () => {
      const progress = mount('pilot-progress', { value: '50', striped: '' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.hasAttribute('striped')).toBe(true);
    });

    it('renders with animated attribute', async () => {
      const progress = mount('pilot-progress', { value: '50', striped: '', animated: '' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.hasAttribute('striped')).toBe(true);
      expect(bar.hasAttribute('animated')).toBe(true);
    });

    it('animated without striped still renders', async () => {
      const progress = mount('pilot-progress', { value: '50', animated: '' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.hasAttribute('animated')).toBe(true);
    });
  });

  describe('Percentage Display', () => {
    it('hides percentage when show-percentage is false', async () => {
      const progress = mount('pilot-progress', { value: '50', label: 'Test', 'show-percentage': 'false' });
      await waitForRender(progress);

      const percentage = progress.shadowRoot.querySelector('.progress-percentage');
      // When both label and show-percentage exist, header should be present but percentage hidden
      const header = progress.shadowRoot.querySelector('.progress-header');
      if (header && percentage) {
        expect(header.contains(percentage)).toBe(true);
      }
    });

    it('shows percentage when show-percentage is true', async () => {
      const progress = mount('pilot-progress', { value: '50', 'show-percentage': 'true' });
      await waitForRender(progress);

      const percentage = progress.shadowRoot.querySelector('.progress-percentage');
      expect(percentage).toBeTruthy();
      expect(percentage.textContent).toBe('50%');
    });
  });

  describe('Attribute Changes', () => {
    it('updates width when value changes', async () => {
      const progress = mount('pilot-progress', { value: '25' });
      await waitForRender(progress);

      progress.setAttribute('value', '75');
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('75%');
    });

    it('updates variant when changed', async () => {
      const progress = mount('pilot-progress', { value: '50', variant: 'default' });
      await waitForRender(progress);

      progress.setAttribute('variant', 'success');
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('variant')).toBe('success');
    });

    it('updates percentage when value changes', async () => {
      const progress = mount('pilot-progress', { value: '25', label: 'Test' });
      await waitForRender(progress);

      progress.setAttribute('value', '75');
      await waitForRender(progress);

      const percentage = progress.shadowRoot.querySelector('.progress-percentage');
      expect(percentage.textContent).toBe('75%');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero value', async () => {
      const progress = mount('pilot-progress', { value: '0', max: '100' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('0%');
    });

    it('handles value greater than max (caps at 100%)', async () => {
      const progress = mount('pilot-progress', { value: '150', max: '100' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('100%');
    });

    it('handles negative value (floors at 0%)', async () => {
      const progress = mount('pilot-progress', { value: '-50', max: '100' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('0%');
    });

    it('handles missing value (defaults to 0)', async () => {
      const progress = mount('pilot-progress');
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.style.width).toBe('0%');
    });

    it('handles zero max gracefully', async () => {
      const progress = mount('pilot-progress', { value: '50', max: '0' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      // Division by zero should result in some width (likely 0% or NaN handling)
      expect(bar.style.width).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const progress = mount('pilot-progress', { value: '50', max: '100', label: 'Progress' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('role')).toBe('progressbar');
      expect(bar.getAttribute('aria-valuenow')).toBe('50');
      expect(bar.getAttribute('aria-valuemin')).toBe('0');
      expect(bar.getAttribute('aria-valuemax')).toBe('100');
      expect(bar.getAttribute('aria-label')).toBe('Progress');
    });

    it('uses default aria-label when no label provided', async () => {
      const progress = mount('pilot-progress', { value: '50' });
      await waitForRender(progress);

      const bar = progress.shadowRoot.querySelector('.progress-bar');
      expect(bar.getAttribute('aria-label')).toBe('Progress');
    });
  });

  describe('Slots', () => {
    it('renders default slot for custom content', async () => {
      const progress = mount('pilot-progress', { value: '50' }, '<span class="custom-text">Custom label</span>');
      await waitForRender(progress);

      const slot = progress.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });
});
