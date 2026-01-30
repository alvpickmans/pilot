/**
 * Pilot Design System - Input Component
 * 
 * Technical input field with machine-readable styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL INPUT COMPONENT
// ============================================

export class PilotInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'disabled', 'readonly', 'value', 'label', 'hint', 'error'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
      
      input {
        width: 100%;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
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
      
      /* Technical style with brackets */
      .input-wrapper.technical::before,
      .input-wrapper.technical::after {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .input-wrapper.technical::before {
        content: '[';
      }
      
      .input-wrapper.technical::after {
        content: ']';
      }
      
      .input-wrapper.technical input {
        border-left: none;
        border-right: none;
        text-align: center;
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

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-input', PilotInput);
