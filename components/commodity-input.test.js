/**
 * Pilot Design System - Commodity Input Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./commodity-input.js');
const { PilotCommodityInput } = module;

describe('PilotCommodityInput', () => {
  beforeEach(() => {
    registerComponent('pilot-commodity-input', PilotCommodityInput);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Component Definition', () => {
    it('should be defined', () => {
      expect(customElements.get('pilot-commodity-input')).toBeDefined();
    });

    it('should have correct class name', () => {
      expect(PilotCommodityInput.name).toBe('PilotCommodityInput');
    });
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      expect(input.shadowRoot).toBeTruthy();
      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput).toBeTruthy();
    });

    it('renders with USD currency symbol by default', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol).toBeTruthy();
      expect(symbol.textContent).toBe('$');
    });

    it('renders with specified currency symbol', async () => {
      const input = mount('pilot-commodity-input', { currency: 'EUR' });
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('€');
    });

    it('renders with GBP symbol', async () => {
      const input = mount('pilot-commodity-input', { currency: 'GBP' });
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('£');
    });

    it('renders with custom currency-symbol attribute', async () => {
      const input = mount('pilot-commodity-input', { 'currency-symbol': 'BTC' });
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('BTC');
    });

    it('custom currency-symbol takes precedence over currency code', async () => {
      const input = mount('pilot-commodity-input', { currency: 'USD', 'currency-symbol': '★' });
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('★');
    });

    it('renders label when provided', async () => {
      const input = mount('pilot-commodity-input', { label: 'Amount' });
      await waitForRender(input);

      const label = input.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Amount');
    });

    it('renders hint when provided', async () => {
      const input = mount('pilot-commodity-input', { hint: 'Enter amount' });
      await waitForRender(input);

      const hint = input.shadowRoot.querySelector('.hint');
      expect(hint).toBeTruthy();
      expect(hint.textContent).toBe('Enter amount');
    });

    it('renders error message when provided', async () => {
      const input = mount('pilot-commodity-input', { error: 'Invalid amount' });
      await waitForRender(input);

      const error = input.shadowRoot.querySelector('.error');
      expect(error).toBeTruthy();
      expect(error.textContent).toBe('Invalid amount');
    });

    it('does not render hint when error is present', async () => {
      const input = mount('pilot-commodity-input', {
        hint: 'This is a hint',
        error: 'This is an error'
      });
      await waitForRender(input);

      const hint = input.shadowRoot.querySelector('.hint');
      const error = input.shadowRoot.querySelector('.error');
      expect(hint).toBeFalsy();
      expect(error).toBeTruthy();
    });

    it('handles disabled state', async () => {
      const input = mount('pilot-commodity-input', { disabled: true });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('disabled')).toBe(true);
    });

    it('handles readonly state', async () => {
      const input = mount('pilot-commodity-input', { readonly: true });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.hasAttribute('readonly')).toBe(true);
    });
  });

  describe('Value Formatting', () => {
    it('formats value with thousands separator', async () => {
      const input = mount('pilot-commodity-input', { value: '1234567.89' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('1,234,567.89');
    });

    it('formats value with 2 decimals by default', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.5' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('1,234.50');
    });

    it('formats value with custom decimals', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.5678', decimals: '4' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('1,234.5678');
    });

    it('formats value with 0 decimals', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.56', decimals: '0' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('1,235');
    });

    it('handles negative values when allow-negative is set', async () => {
      const input = mount('pilot-commodity-input', { value: '-1234.56', 'allow-negative': '' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('-1,234.56');

      const indicator = input.shadowRoot.querySelector('.negative-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator.textContent).toBe('EXPENSE');
    });

    it('preserves negative value in display when allow-negative is not set', async () => {
      const input = mount('pilot-commodity-input', { value: '-1234.56' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      // Value is displayed as negative but will be validated on blur
      expect(innerInput.value).toBe('-1,234.56');
    });
  });

  describe('Validation', () => {
    it('validates min constraint', async () => {
      const input = mount('pilot-commodity-input', { min: '100', value: '50' });
      await waitForRender(input);

      // Trigger blur to validate
      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.dispatchEvent(new Event('blur', { bubbles: true }));
      await waitForRender(input);

      expect(input.hasAttribute('error')).toBe(true);
    });

    it('validates max constraint', async () => {
      const input = mount('pilot-commodity-input', { max: '1000', value: '1500' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.dispatchEvent(new Event('blur', { bubbles: true }));
      await waitForRender(input);

      expect(input.hasAttribute('error')).toBe(true);
    });

    it('validates negative values when not allowed', async () => {
      const input = mount('pilot-commodity-input', { value: '-100' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.dispatchEvent(new Event('blur', { bubbles: true }));
      await waitForRender(input);

      expect(input.hasAttribute('error')).toBe(true);
    });

    it('passes validation for valid values', async () => {
      const input = mount('pilot-commodity-input', { min: '10', max: '1000', value: '500' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.dispatchEvent(new Event('blur', { bubbles: true }));
      await waitForRender(input);

      expect(input.hasAttribute('error')).toBe(false);
    });
  });

  describe('Event Handling', () => {
    it('dispatches input event on value change', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      let eventDetail = null;

      input.addEventListener('input', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });

      innerInput.value = '1234.56';
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(eventFired).toBe(true);
      expect(eventDetail).toBeTruthy();
    });

    it('dispatches change event on blur', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      let eventFired = false;
      let eventDetail = null;

      input.addEventListener('change', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });

      innerInput.value = '1234.56';
      innerInput.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(eventFired).toBe(true);
      expect(eventDetail).toBeTruthy();
    });

    it('filters invalid characters on input', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.value = 'abc123.45xyz';
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(innerInput.value).toBe('123.45');
    });
  });

  describe('Public API', () => {
    it('getValue returns parsed numeric value', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.56' });
      await waitForRender(input);

      const value = input.getValue();
      expect(value).toBe(1234.56);
    });

    it('setValue updates the input value', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      input.setValue(9876.54);
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('9,876.54');
    });

    it('validate returns true for valid values', async () => {
      const input = mount('pilot-commodity-input', { value: '500', min: '100', max: '1000' });
      await waitForRender(input);

      const isValid = input.validate();
      expect(isValid).toBe(true);
      expect(input.hasAttribute('error')).toBe(false);
    });

    it('validate returns false for invalid values', async () => {
      const input = mount('pilot-commodity-input', { value: '50', min: '100' });
      await waitForRender(input);

      const isValid = input.validate();
      expect(isValid).toBe(false);
      expect(input.hasAttribute('error')).toBe(true);
    });

    it('clear removes value and error', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.56', error: 'Error message' });
      await waitForRender(input);

      input.clear();
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('');
      expect(input.hasAttribute('error')).toBe(false);
      expect(input.hasAttribute('value')).toBe(false);
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when currency changes', async () => {
      const input = mount('pilot-commodity-input', { currency: 'USD' });
      await waitForRender(input);

      input.setAttribute('currency', 'EUR');
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('€');
    });

    it('re-renders when currency-symbol changes', async () => {
      const input = mount('pilot-commodity-input', { 'currency-symbol': '$' });
      await waitForRender(input);

      input.setAttribute('currency-symbol', '€');
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('€');
    });

    it('re-renders when decimals changes', async () => {
      const input = mount('pilot-commodity-input', { value: '1234.5678', decimals: '2' });
      await waitForRender(input);

      input.setAttribute('decimals', '4');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('1,234.5678');
    });

    it('re-renders when value changes', async () => {
      const input = mount('pilot-commodity-input', { value: '100' });
      await waitForRender(input);

      input.setAttribute('value', '200');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('200.00');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      expect(input.shadowRoot).toBeTruthy();
      expect(input.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const style = input.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
    });

    it('contains input element', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput).toBeTruthy();
    });

    it('contains currency symbol element', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value', async () => {
      const input = mount('pilot-commodity-input', { value: '' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('');
    });

    it('handles zero value', async () => {
      const input = mount('pilot-commodity-input', { value: '0' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('0.00');
    });

    it('handles very large values', async () => {
      const input = mount('pilot-commodity-input', { value: '999999999.99' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      expect(innerInput.value).toBe('999,999,999.99');
    });

    it('handles unknown currency code', async () => {
      const input = mount('pilot-commodity-input', { currency: 'XYZ' });
      await waitForRender(input);

      const symbol = input.shadowRoot.querySelector('.currency-symbol');
      expect(symbol.textContent).toBe('XYZ');
    });

    it('handles multiple decimal points', async () => {
      const input = mount('pilot-commodity-input');
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.value = '123.45.67';
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));

      // Should clean up to valid number
      expect(innerInput.value).not.toContain('..');
    });

    it('preserves input value during attribute changes', async () => {
      const input = mount('pilot-commodity-input', { value: '1000' });
      await waitForRender(input);

      const innerInput = input.shadowRoot.querySelector('input');
      innerInput.focus();
      innerInput.value = '2000';

      // Change an attribute
      input.setAttribute('currency', 'EUR');
      await waitForRender(input);

      // Value should be preserved since input was focused
      expect(innerInput.value).toBe('2000');
    });
  });

  describe('Currency Support', () => {
    const currencies = [
      { code: 'USD', symbol: '$' },
      { code: 'EUR', symbol: '€' },
      { code: 'GBP', symbol: '£' },
      { code: 'JPY', symbol: '¥' },
      { code: 'CAD', symbol: 'CA$' },
      { code: 'AUD', symbol: 'A$' },
      { code: 'CHF', symbol: 'CHF' },
      { code: 'CNY', symbol: 'CN¥' },
      { code: 'INR', symbol: '₹' },
      { code: 'BRL', symbol: 'R$' },
    ];

    currencies.forEach(({ code, symbol }) => {
      it(`renders correct symbol for ${code}`, async () => {
        const input = mount('pilot-commodity-input', { currency: code });
        await waitForRender(input);

        const currencySymbol = input.shadowRoot.querySelector('.currency-symbol');
        expect(currencySymbol.textContent).toBe(symbol);
      });
    });
  });
});
