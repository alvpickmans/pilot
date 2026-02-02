/**
 * Pilot Design System - Badge Component
 * 
 * Status badge with technical styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL BADGE COMPONENT
// ============================================

export class PilotBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size'];
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
      
      .badge {
        display: inline-flex;
        align-items: center;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-secondary, #525252);
      }
      
      .badge[size="sm"] {
        font-size: var(--font-size-2xs, 0.625rem);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
      }
      
      .badge[size="md"] {
        font-size: var(--font-size-xs, 0.75rem);
        padding: var(--spacing-1, 0.25rem) var(--spacing-3, 0.75rem);
      }
      
      .badge[size="lg"] {
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
      }
      
      .badge[variant="primary"] {
        background: var(--color-brand-primary, #1a1a1a);
        border-color: var(--color-brand-primary, #1a1a1a);
        color: #ffffff;
      }
      
      .badge[variant="success"] {
        background: var(--color-feedback-success, #16a34a);
        border-color: var(--color-feedback-success, #16a34a);
        color: #ffffff;
      }
      
      .badge[variant="warning"] {
        background: var(--color-feedback-warning, #d97706);
        border-color: var(--color-feedback-warning, #d97706);
        color: #ffffff;
      }
      
      .badge[variant="error"] {
        background: var(--color-feedback-error, #dc2626);
        border-color: var(--color-feedback-error, #dc2626);
        color: #ffffff;
      }
      
      .badge[variant="outline"] {
        background: transparent;
      }
      
      /* Technical variant with code-like brackets */
      .badge[variant="technical"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        background: var(--color-background-technical, #f5f5f5);
        border: 2px solid var(--color-border-technical, #1a1a1a);
        position: relative;
      }
      
      .badge[variant="technical"]::before {
        content: '<';
        margin-right: var(--spacing-1, 0.25rem);
        opacity: 0.5;
      }
      
      .badge[variant="technical"]::after {
        content: '>';
        margin-left: var(--spacing-1, 0.25rem);
        opacity: 0.5;
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="badge" variant="${variant}" size="${size}">
        <slot></slot>
      </span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-badge', PilotBadge);
