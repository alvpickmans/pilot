/**
 * Pilot Design System - Commodity Input Component
 *
 * Input component with currency symbol and decimal formatting for financial amounts.
 */

import { baseStyles } from './shared.js';

// ============================================
// COMMODITY INPUT COMPONENT
// ============================================

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹',
  BRL: 'R$',
  MXN: 'MX$',
  KRW: '₩',
  RUB: '₽',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  TRY: '₺',
  ZAR: 'R',
  NZD: 'NZ$',
  SGD: 'S$',
  HKD: 'HK$',
  TWD: 'NT$',
  THB: '฿',
  IDR: 'Rp',
  PHP: '₱',
  MYR: 'RM',
  VND: '₫',
  COP: 'COL$',
  ARS: 'AR$',
  CLP: 'CL$',
  PEN: 'S/',
  UYU: '$U',
  AED: 'د.إ',
  SAR: '﷼',
  ILS: '₪',
  EGP: '£',
  NGN: '₦',
  KES: 'KSh',
  GHS: '₵',
  PKR: '₨',
  BDT: '৳',
  LKR: '₨',
  NPR: '₨',
  MMK: 'K',
  KHR: '៛',
  LAK: '₭',
  MNT: '₮',
  KZT: '₸',
  UZS: 'soʻm',
  TJS: 'SM',
  TMT: 'm',
  AZN: '₼',
  GEL: '₾',
  AMD: '֏',
  BYN: 'Br',
  MDL: 'L',
  UAH: '₴',
  HUF: 'Ft',
  CZK: 'Kč',
  RON: 'lei',
  BGN: 'лв',
  HRK: 'kn',
  RSD: 'din',
  MKD: 'ден',
  BAM: 'KM',
  ALL: 'L',
  ISK: 'kr',
  GIP: '£',
  FOK: 'kr',
  GGP: '£',
  IMP: '£',
  JEP: '£',
  SHP: '£',
  TTD: 'TT$',
  BBD: 'Bds$',
  BZD: 'BZ$',
  XCD: 'EC$',
  BSD: 'B$',
  BMD: 'BD$',
  KYD: 'CI$',
  FJD: 'FJ$',
  SBD: 'SI$',
  TOP: 'T$',
  WST: 'WS$',
  PGK: 'K',
  VUV: 'VT',
  KID: '$',
  TVD: '$',
  CKD: '$',
  PND: '$',
  SRD: '$',
  GYD: '$',
  BBD: 'Bds$',
  XOF: 'CFA',
  XAF: 'FCFA',
  XPF: 'CFP',
  XDR: 'SDR',
};

export class PilotCommodityInput extends HTMLElement {
  static get observedAttributes() {
    return ['currency', 'decimals', 'min', 'max', 'allow-negative', 'placeholder', 'disabled', 'readonly', 'label', 'hint', 'error', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rawValue = '';
    this._formattedValue = '';
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}

      :host {
        display: block;
        width: 100%;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2, 0.5rem);
      }

      label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
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
      }

      input {
        width: 100%;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 0.75rem);
        padding-left: calc(var(--spacing-4, 1rem) + 1.5rem);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      input::placeholder {
        color: var(--color-text-tertiary, #6b6b6b);
      }

      input:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
      }

      input[disabled] {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-disabled, #8a8a8a);
        cursor: not-allowed;
      }

      .hint, .error {
        font-family: var(--font-body, 'IBM Plex Sans', sans-serif);
        font-size: var(--font-size-xs, 0.75rem);
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
      }

      .hint {
        color: var(--color-text-tertiary, #6b6b6b);
      }

      .error {
        color: var(--color-feedback-error, #dc2626);
      }

      .error::before {
        content: '⚠';
      }

      :host([error]) input {
        border-color: var(--color-feedback-error, #dc2626);
      }

      :host([error]) input:focus {
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
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
    const currency = this.getAttribute('currency') || 'USD';
    return CURRENCY_SYMBOLS[currency] || currency;
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
    const input = event.target;
    // Show raw value on focus for easier editing
    if (this._rawValue) {
      input.value = this._rawValue;
    }
  }

  _setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.addEventListener('input', this._handleInput.bind(this));
      input.addEventListener('blur', this._handleBlur.bind(this));
      input.addEventListener('focus', this._handleFocus.bind(this));
    }
  }

  connectedCallback() {
    this._setupEventListeners();
  }

  disconnectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.removeEventListener('input', this._handleInput.bind(this));
      input.removeEventListener('blur', this._handleBlur.bind(this));
      input.removeEventListener('focus', this._handleFocus.bind(this));
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

      // Re-render on attribute changes, but preserve input value for non-value changes
      const input = this.shadowRoot.querySelector('input');
      const currentValue = input ? input.value : '';
      const isFocused = input && document.activeElement === input;

      this.render();

      // Restore the input value if it was being edited and not a value attribute change
      if (input && isFocused && name !== 'value' && name !== 'decimals') {
        input.value = currentValue;
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
