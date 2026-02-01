/**
 * Pilot Design System - Commodity Input Component
 *
 * Input component with currency symbol and decimal formatting for financial amounts.
 */

import { baseStyles, formFieldStyles, inputBaseStyles } from './shared.js';

// ============================================
// COMMODITY INPUT COMPONENT
// ============================================

export class PilotCommodityInput extends HTMLElement {
  static get observedAttributes() {
    return ['currency', 'currency-symbol', 'decimals', 'min', 'max', 'allow-negative', 'placeholder', 'disabled', 'readonly', 'label', 'hint', 'error', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rawValue = '';
    this._formattedValue = '';
    this._isUserEditing = false;

    // Store bound event handler references for proper cleanup
    this._boundHandleInput = this._handleInput.bind(this);
    this._boundHandleBlur = this._handleBlur.bind(this);
    this._boundHandleFocus = this._handleFocus.bind(this);

    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      ${formFieldStyles}
      ${inputBaseStyles}

      :host {
        display: block;
        width: 100%;
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      .currency-symbol {
        position: absolute;
        left: var(--spacing-4, 1rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-secondary, #525252);
        pointer-events: none;
        z-index: 1;
        white-space: nowrap;
      }

      input {
        padding-left: var(--symbol-padding, calc(var(--spacing-4, 1rem) + 1.5rem));
      }

      .negative-indicator {
        position: absolute;
        right: var(--spacing-4, 1rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-feedback-error, #dc2626);
        pointer-events: none;
      }
    `;
  }

  _getCurrencySymbol() {
    // Check for user-defined currency symbol first
    const userSymbol = this.getAttribute('currency-symbol');
    if (userSymbol) {
      return userSymbol;
    }

    // Use Intl API to get currency symbol from currency code
    const currency = this.getAttribute('currency') || 'USD';
    
    try {
      // Use Intl.NumberFormat to extract the currency symbol
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      
      // Format a value and extract the currency symbol
      const parts = formatter.formatToParts(1);
      const symbolPart = parts.find(part => part.type === 'currency');
      
      if (symbolPart) {
        return symbolPart.value;
      }
    } catch (e) {
      // Intl API not available or currency code invalid
    }
    
    // Fallback to currency code itself
    return currency;
  }

  _getDecimals() {
    const decimals = parseInt(this.getAttribute('decimals'), 10);
    return isNaN(decimals) ? 2 : decimals;
  }

  _formatValue(value) {
    if (!value && value !== 0) return '';

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';

    const decimals = this._getDecimals();

    // Format with thousands separator and decimal places
    // Note: We don't enforce constraints here - that's for validation
    const isNegative = numValue < 0;
    const absValue = Math.abs(numValue);

    const parts = absValue.toFixed(decimals).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Add thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formatted = formattedInteger;
    if (decimals > 0) {
      formatted += '.' + decimalPart;
    }

    if (isNegative) {
      formatted = '-' + formatted;
    }

    return formatted;
  }

  _parseValue(formattedValue) {
    if (!formattedValue) return null;

    // Remove currency symbol and thousands separators
    const cleanValue = formattedValue
      .replace(/[^\d.-]/g, '')
      .replace(/\.{2,}/g, '.');

    const numValue = parseFloat(cleanValue);
    return isNaN(numValue) ? null : numValue;
  }

  _validateValue(value) {
    const errors = [];

    if (value === null || value === undefined || value === '') {
      return errors;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      errors.push('Invalid number');
      return errors;
    }

    const min = parseFloat(this.getAttribute('min'));
    const max = parseFloat(this.getAttribute('max'));
    const allowNegative = this.hasAttribute('allow-negative');

    if (!allowNegative && numValue < 0) {
      errors.push('Negative values not allowed');
    }

    if (!isNaN(min) && numValue < min) {
      errors.push(`Minimum value is ${this._formatValue(min)}`);
    }

    if (!isNaN(max) && numValue > max) {
      errors.push(`Maximum value is ${this._formatValue(max)}`);
    }

    return errors;
  }

  _handleInput(event) {
    const input = event.target;
    const rawValue = input.value;

    // Mark that user is currently editing
    this._isUserEditing = true;

    // Allow typing, but filter out invalid characters
    const cleanedValue = rawValue.replace(/[^\d.,\-]/g, '');

    // Prevent multiple decimal points
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      input.value = parts[0] + '.' + parts.slice(1).join('');
    } else {
      input.value = cleanedValue;
    }

    this._rawValue = input.value;

    // Parse and validate
    const parsedValue = this._parseValue(this._rawValue);
    const errors = this._validateValue(parsedValue);

    if (errors.length > 0) {
      this.setAttribute('error', errors[0]);
    } else {
      this.removeAttribute('error');
    }

    // Dispatch input event
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: parsedValue, rawValue: this._rawValue }
    }));
  }

  _handleBlur(event) {
    // Mark that user has finished editing
    this._isUserEditing = false;
    
    const input = event.target;
    const parsedValue = this._parseValue(input.value);

    if (parsedValue !== null) {
      // Format the value on blur
      const formatted = this._formatValue(parsedValue);
      input.value = formatted;
      this._formattedValue = formatted;

      // Validate
      const errors = this._validateValue(parsedValue);
      if (errors.length > 0) {
        this.setAttribute('error', errors[0]);
      } else {
        this.removeAttribute('error');
      }
    }

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: parsedValue, formattedValue: this._formattedValue }
    }));
  }

  _handleFocus(event) {
    // Mark that user is starting to edit
    this._isUserEditing = true;
    
    const input = event.target;
    // Show raw value on focus for easier editing
    if (this._rawValue) {
      input.value = this._rawValue;
    }
  }

  _setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.addEventListener('input', this._boundHandleInput);
      input.addEventListener('blur', this._boundHandleBlur);
      input.addEventListener('focus', this._boundHandleFocus);
    }
  }

  connectedCallback() {
    this._setupEventListeners();
  }

  disconnectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.removeEventListener('input', this._boundHandleInput);
      input.removeEventListener('blur', this._boundHandleBlur);
      input.removeEventListener('focus', this._boundHandleFocus);
    }
  }

  render() {
    const currencySymbol = this._getCurrencySymbol();
    const placeholder = this.getAttribute('placeholder') || '0.00';
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const label = this.getAttribute('label') || '';
    const hint = this.getAttribute('hint') || '';
    const error = this.getAttribute('error') || '';
    const value = this.getAttribute('value') || '';
    const allowNegative = this.hasAttribute('allow-negative');

    // Format initial value if provided
    if (value && !this._formattedValue) {
      const parsedValue = this._parseValue(value);
      if (parsedValue !== null) {
        this._formattedValue = this._formatValue(parsedValue);
        this._rawValue = value;
      }
    }

    const displayValue = this._formattedValue || value || '';
    const parsedValue = this._parseValue(displayValue);
    const isNegative = parsedValue !== null && parsedValue < 0;

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ''}
        <div class="input-wrapper">
          <span class="currency-symbol">${currencySymbol}</span>
          <input
            type="text"
            placeholder="${placeholder}"
            value="${displayValue}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            inputmode="decimal"
          />
          ${allowNegative && isNegative ? '<span class="negative-indicator">EXPENSE</span>' : ''}
        </div>
        ${error ? `<div class="error">${error}</div>` : ''}
        ${hint && !error ? `<div class="hint">${hint}</div>` : ''}
      </div>
    `;

    this._setupEventListeners();
    // Wait for next frame to ensure DOM is fully laid out
    requestAnimationFrame(() => this._updateSymbolPadding());
  }

  _updateSymbolPadding() {
    const symbol = this.shadowRoot.querySelector('.currency-symbol');
    const input = this.shadowRoot.querySelector('input');
    
    if (symbol && input) {
      // Calculate the width of the symbol plus consistent spacing
      const symbolWidth = symbol.offsetWidth;
      const basePadding = 16; // 1rem = 16px default
      const gap = 8; // 0.5rem gap between symbol and input text
      const totalPadding = basePadding + symbolWidth + gap;
      
      // Set the CSS variable for dynamic padding
      input.style.setProperty('--symbol-padding', `${totalPadding}px`);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // When value or decimals attribute changes, reset formatted value to force reformat
      if (name === 'value' || name === 'decimals') {
        this._formattedValue = '';
        if (name === 'value') {
          this._rawValue = newValue || '';
        }
      }

      // Don't re-render if user is currently editing (typing)
      // This prevents focus loss during typing
      if (this._isUserEditing && (name === 'value' || name === 'error')) {
        return;
      }

      // Re-render on attribute changes, but preserve input value for non-value changes
      const input = this.shadowRoot.querySelector('input');
      const currentValue = input ? input.value : '';
      const isFocused = input && document.activeElement === input;

      this.render();

      // Restore the input value if it was being edited and not a value attribute change
      if (input && isFocused && name !== 'value' && name !== 'decimals') {
        input.value = currentValue;
      }
      
      // Update symbol padding after render (especially for currency changes)
      if (name === 'currency' || name === 'currency-symbol') {
        requestAnimationFrame(() => this._updateSymbolPadding());
      }
    }
  }

  // Public API methods
  getValue() {
    const input = this.shadowRoot.querySelector('input');
    return this._parseValue(input ? input.value : '');
  }

  setValue(value) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this._rawValue = String(value);
      this._formattedValue = this._formatValue(numValue);
      this.render();
    }
  }

  validate() {
    const value = this.getValue();
    const errors = this._validateValue(value);

    if (errors.length > 0) {
      this.setAttribute('error', errors[0]);
      return false;
    } else {
      this.removeAttribute('error');
      return true;
    }
  }

  clear() {
    this._rawValue = '';
    this._formattedValue = '';
    this.removeAttribute('value');
    this.removeAttribute('error');
    this.render();
  }
}

customElements.define('pilot-commodity-input', PilotCommodityInput);
