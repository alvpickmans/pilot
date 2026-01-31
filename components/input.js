/**
 * Pilot Design System - Input Component
 * 
 * Technical input field with machine-readable styling.
 */

import { baseStyles, formFieldStyles, inputBaseStyles, technicalBracketStyles } from './shared.js';

// ============================================
// TECHNICAL INPUT COMPONENT
// ============================================

export class PilotInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'disabled', 'readonly', 'value', 'label', 'hint', 'error', 'technical'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isUserEditing = false;
    
    // Store event handler references for proper cleanup
    this._handleFocus = () => {
      this._isUserEditing = true;
    };
    this._handleBlur = () => {
      this._isUserEditing = false;
      const input = this.shadowRoot.querySelector('input');
      if (input) {
        this.setAttribute('value', input.value);
      }
    };
    this._handleInput = () => {
      // Don't re-render on input - value synced on blur
    };
    
    this.render();
  }

  connectedCallback() {
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.addEventListener('focus', this._handleFocus);
      input.addEventListener('blur', this._handleBlur);
      input.addEventListener('input', this._handleInput);
    }
  }

  _removeEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.removeEventListener('focus', this._handleFocus);
      input.removeEventListener('blur', this._handleBlur);
      input.removeEventListener('input', this._handleInput);
    }
  }

  get styles() {
    return `
      ${baseStyles}
      ${formFieldStyles}
      ${inputBaseStyles}
      ${technicalBracketStyles}

      :host {
        display: block;
        width: 100%;
      }
    `;
  }

  render() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const value = this.getAttribute('value') || '';
    const label = this.getAttribute('label') || '';
    const hint = this.getAttribute('hint') || '';
    const error = this.getAttribute('error') || '';
    const technical = this.hasAttribute('technical');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ''}
        <div class="input-wrapper ${technical ? 'technical' : ''}">
          <input 
            type="${type}"
            placeholder="${placeholder}"
            value="${value}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          />
        </div>
        ${error ? `<div class="error">${error}</div>` : ''}
        ${hint && !error ? `<div class="hint">${hint}</div>` : ''}
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Don't re-render if user is currently editing (typing)
    // This prevents focus loss during typing
    if (this._isUserEditing && name === 'value') {
      return;
    }
    
    // For non-value attributes or when not editing, re-render
    this.render();
    
    // Re-attach event listeners after render
    this._setupEventListeners();
  }
}

customElements.define('pilot-input', PilotInput);
