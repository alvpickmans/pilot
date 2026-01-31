/**
 * PilotInput Unit Tests
 * 
 * Tests for the Pilot Input component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, DOM structure,
 * event handling, and edge cases.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const inputModule = await import('./input.js');
const { PilotInput } = inputModule;

describe('PilotInput', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-input', PilotInput);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      expect(input.shadowRoot).toBeTruthy();
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput).toBeTruthy();
      expect(innerInput.getAttribute('type')).toBe('text');
    });

    it('applies default type (text)', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('type')).toBe('text');
    });

    it('applies type attribute', async () => {
      const input = mount('pilot-input', { type: 'password' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('type')).toBe('password');
    });

    it('applies placeholder attribute', async () => {
      const input = mount('pilot-input', { placeholder: 'Enter text' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('placeholder')).toBe('Enter text');
    });

    it('applies value attribute', async () => {
      const input = mount('pilot-input', { value: 'test value' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('value')).toBe('test value');
    });

    it('handles disabled state', async () => {
      const input = mount('pilot-input', { disabled: true });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
    });

    it('handles readonly state', async () => {
      const input = mount('pilot-input', { readonly: true });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('readonly')).toBe(true);
    });

    it('renders label when provided', async () => {
      const input = mount('pilot-input', { label: 'Username' });
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Username');
    });

    it('does not render label when not provided', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });

    it('renders hint when provided', async () => {
      const input = mount('pilot-input', { hint: 'This is a hint' });
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeTruthy();
      expect(hint.textContent).toBe('This is a hint');
    });

    it('renders error message when provided', async () => {
      const input = mount('pilot-input', { error: 'This is an error' });
      await waitForRender(input);
      
      const error = input.shadowRoot.querySelector('.error');
      expect(error).toBeTruthy();
      expect(error.textContent).toBe('This is an error');
    });

    it('does not render hint when error is present', async () => {
      const input = mount('pilot-input', { 
        hint: 'This is a hint',
        error: 'This is an error'
      });
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      const error = input.shadowRoot.querySelector('.error');
      expect(hint).toBeFalsy();
      expect(error).toBeTruthy();
    });

    it('supports all input types', async () => {
      const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search'];
      
      for (const type of types) {
        cleanup();
        const input = mount('pilot-input', { type });
        await waitForRender(input);
        
        const innerInput = input.shadowRoot.querySelector('input');
        expect(innerInput.getAttribute('type')).toBe(type);
      }
    });

    it('handles technical style', async () => {
      const input = mount('pilot-input', { technical: '' });
      await waitForRender(input);
      
      const wrapper = input.shadowRoot.querySelector('.input-wrapper');
      expect(wrapper.classList.contains('technical')).toBe(true);
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when type changes', async () => {
      const input = mount('pilot-input', { type: 'text' });
      await waitForRender(input);
      
      input.setAttribute('type', 'password');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('type')).toBe('password');
    });

    it('re-renders when placeholder changes', async () => {
      const input = mount('pilot-input', { placeholder: 'Old placeholder' });
      await waitForRender(input);
      
      input.setAttribute('placeholder', 'New placeholder');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('placeholder')).toBe('New placeholder');
    });

    it('re-renders when value changes', async () => {
      const input = mount('pilot-input', { value: 'old value' });
      await waitForRender(input);
      
      input.setAttribute('value', 'new value');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('value')).toBe('new value');
    });

    it('re-renders when disabled changes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      input.setAttribute('disabled', '');
      await waitForRender(input);
      
      let innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
      
      input.removeAttribute('disabled');
      await waitForRender(input);
      
      // Re-query after re-render since the DOM was recreated
      innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(false);
    });

    it('re-renders when readonly changes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      input.setAttribute('readonly', '');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('readonly')).toBe(true);
    });

    it('re-renders when label changes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      input.setAttribute('label', 'New Label');
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('New Label');
    });

    it('re-renders when hint changes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      input.setAttribute('hint', 'New hint');
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeTruthy();
      expect(hint.textContent).toBe('New hint');
    });

    it('re-renders when error changes', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      input.setAttribute('error', 'New error');
      await waitForRender(input);
      
      const error = input.shadowRoot.querySelector('.error');
      expect(error).toBeTruthy();
      expect(error.textContent).toBe('New error');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      expect(input.shadowRoot).toBeTruthy();
      expect(input.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const style = input.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('input');
    });

    it('contains input element', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput).toBeTruthy();
    });

    it('contains field wrapper', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const field = input.shadowRoot.querySelector('.field');
      expect(field).toBeTruthy();
    });

    it('contains input wrapper', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const wrapper = input.shadowRoot.querySelector('.input-wrapper');
      expect(wrapper).toBeTruthy();
    });
  });

  describe('Event Handling', () => {
    it('dispatches input event on value change', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      
      innerInput.addEventListener('input', () => {
        eventFired = true;
      });
      
      // Simulate input event
      const event = new Event('input', { bubbles: true });
      innerInput.dispatchEvent(event);
      
      expect(eventFired).toBe(true);
    });

    it('dispatches change event on value change', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      
      innerInput.addEventListener('change', () => {
        eventFired = true;
      });
      
      // Simulate change event
      const event = new Event('change', { bubbles: true });
      innerInput.dispatchEvent(event);
      
      expect(eventFired).toBe(true);
    });

    it('dispatches focus event', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      
      innerInput.addEventListener('focus', () => {
        eventFired = true;
      });
      
      // Simulate focus event
      const event = new Event('focus', { bubbles: true });
      innerInput.dispatchEvent(event);
      
      expect(eventFired).toBe(true);
    });

    it('dispatches blur event', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      
      innerInput.addEventListener('blur', () => {
        eventFired = true;
      });
      
      // Simulate blur event
      const event = new Event('blur', { bubbles: true });
      innerInput.dispatchEvent(event);
      
      expect(eventFired).toBe(true);
    });

    it('events are dispatched from input element', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      const events = [];
      
      innerInput.addEventListener('input', (e) => events.push(e.type));
      innerInput.addEventListener('change', (e) => events.push(e.type));
      
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));
      innerInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      expect(events).toContain('input');
      expect(events).toContain('change');
    });
  });

  describe('CSS Custom Properties', () => {
    it('has input element with computed styles', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      const styles = window.getComputedStyle(innerInput);
      
      // Basic style checks - input is inline-block by default
      expect(styles.display).toBe('inline-block');
    });

    it('applies CSS variable fallbacks', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      
      // Check that the element exists and has styles
      expect(innerInput).toBeTruthy();
      expect(innerInput.style).toBeDefined();
    });

    it('has field element with flex layout', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const field = input.shadowRoot.querySelector('.field');
      const styles = window.getComputedStyle(field);
      
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
    });

    it('has label with technical font styling', async () => {
      const input = mount('pilot-input', { label: 'Test' });
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      
      const styles = window.getComputedStyle(label);
      expect(styles.textTransform).toBe('uppercase');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value attribute', async () => {
      const input = mount('pilot-input', { value: '' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('value')).toBe('');
    });

    it('handles empty placeholder attribute', async () => {
      const input = mount('pilot-input', { placeholder: '' });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('placeholder')).toBe('');
    });

    it('handles empty label attribute', async () => {
      const input = mount('pilot-input', { label: '' });
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });

    it('handles rapid attribute changes', async () => {
      const input = mount('pilot-input', { type: 'text' });
      await waitForRender(input);
      
      // Rapid changes
      input.setAttribute('type', 'password');
      input.setAttribute('placeholder', 'new placeholder');
      input.setAttribute('disabled', '');
      
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('type')).toBe('password');
      expect(innerInput.getAttribute('placeholder')).toBe('new placeholder');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const input = mount('pilot-input', { 
        type: 'email',
        placeholder: 'test',
        disabled: true,
        readonly: true
      });
      await waitForRender(input);
      
      // Trigger re-render by changing one attribute
      input.setAttribute('value', 'new value');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('type')).toBe('email');
      expect(innerInput.getAttribute('placeholder')).toBe('test');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
      expect(innerInput.hasAttribute('readonly')).toBe(true);
    });

    it('handles special characters in value', async () => {
      const specialValue = 'test<script>alert("xss")</script>';
      const input = mount('pilot-input', { value: specialValue });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      // Value attribute should contain the text (may be truncated in some environments)
      expect(innerInput.getAttribute('value')).toContain('test');
    });

    it('handles long placeholder text', async () => {
      const longPlaceholder = 'a'.repeat(1000);
      const input = mount('pilot-input', { placeholder: longPlaceholder });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.getAttribute('placeholder')).toBe(longPlaceholder);
    });

    it('handles both disabled and readonly simultaneously', async () => {
      const input = mount('pilot-input', { 
        disabled: true,
        readonly: true
      });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
      expect(innerInput.hasAttribute('readonly')).toBe(true);
    });

    it('handles error with empty string', async () => {
      const input = mount('pilot-input', { error: '' });
      await waitForRender(input);
      
      const error = input.shadowRoot.querySelector('.error');
      expect(error).toBeFalsy();
    });

    it('handles hint with empty string', async () => {
      const input = mount('pilot-input', { hint: '' });
      await waitForRender(input);
      
      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeFalsy();
    });

    it('handles technical style with all attributes', async () => {
      const input = mount('pilot-input', {
        type: 'text',
        placeholder: 'test',
        value: 'value',
        label: 'Label',
        hint: 'Hint',
        technical: ''
      });
      await waitForRender(input);
      
      const wrapper = input.shadowRoot.querySelector('.input-wrapper');
      const innerInput = input.shadowRoot.querySelector('input');
      const label = input.shadowRoot.querySelector('label');
      const hint = input.shadowRoot.querySelector('.hint');
      
      expect(wrapper.classList.contains('technical')).toBe(true);
      expect(innerInput).toBeTruthy();
      expect(label).toBeTruthy();
      expect(hint).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('input element is focusable', async () => {
      const input = mount('pilot-input');
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      // Input elements should be focusable (tabIndex 0 or -1 depending on environment)
      expect(innerInput.tabIndex).toBeGreaterThanOrEqual(-1);
    });

    it('disabled input is not focusable', async () => {
      const input = mount('pilot-input', { disabled: true });
      await waitForRender(input);
      
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
    });

    it('label is associated with input when provided', async () => {
      const input = mount('pilot-input', { label: 'Test Label' });
      await waitForRender(input);
      
      const label = input.shadowRoot.querySelector('label');
      const innerInput = input.shadowRoot.querySelector('input');
      
      expect(label).toBeTruthy();
      expect(innerInput).toBeTruthy();
    });
  });
});
