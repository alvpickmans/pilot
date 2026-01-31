/**
 * Pilot Design System - Label Component
 * 
 * Technical label with various styling variants.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL LABEL COMPONENT
// ============================================

export class PilotLabel extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'prefix', 'suffix'];
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
        display: inline-flex;
      }
      
      .label {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .label[size="sm"] {
        font-size: var(--font-size-2xs, 0.625rem);
      }
      
      .label[size="md"] {
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .label[size="lg"] {
        font-size: var(--font-size-sm, 0.875rem);
      }
      
      .prefix, .suffix {
        color: var(--color-text-tertiary, #6b6b6b);
        opacity: 0.7;
      }
      
      /* Technical variant with box */
      .label[variant="technical"] {
        border: 1px solid var(--color-border-primary, #b3b3b3);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      /* Code variant */
      .label[variant="code"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        text-transform: none;
        letter-spacing: var(--letter-spacing-code, 0.01em);
        background: var(--color-background-code, #e5e5e5);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
        border-radius: var(--border-radius-sm, 0.125rem);
      }
      
      /* Industrial variant */
      .label[variant="industrial"] {
        font-family: var(--font-industrial, 'Chakra Petch', sans-serif);
        font-weight: var(--font-weight-bold, 700);
        letter-spacing: var(--letter-spacing-wider, 0.05em);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';
    const prefix = this.getAttribute('prefix') || '';
    const suffix = this.getAttribute('suffix') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="label" variant="${variant}" size="${size}">
        ${prefix ? `<span class="prefix">${prefix}</span>` : ''}
        <slot></slot>
        ${suffix ? `<span class="suffix">${suffix}</span>` : ''}
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-label', PilotLabel);
