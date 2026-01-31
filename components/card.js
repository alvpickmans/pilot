/**
 * Pilot Design System - Card Component
 * 
 * Container component with technical frame styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL CARD COMPONENT
// ============================================

export class PilotCard extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'padding', 'bordered'];
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
      }
      
      .card {
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        border-radius: var(--border-radius-none, 0);
        overflow: hidden;
        position: relative;
      }
      
      .card[bordered="true"] {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      /* Technical variant with corner brackets */
      .card[variant="technical"] {
        border: none;
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .card[variant="technical"]::before,
      .card[variant="technical"]::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
      }
      
      .card[variant="technical"]::before {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }
      
      .card[variant="technical"]::after {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }
      
      .content {
        position: relative;
        z-index: 1;
      }
      
      .content[padding="sm"] { padding: var(--spacing-3, 0.75rem); }
      .content[padding="md"] { padding: var(--spacing-4, 1rem); }
      .content[padding="lg"] { padding: var(--spacing-6, 1.5rem); }
      .content[padding="xl"] { padding: var(--spacing-8, 2rem); }
      
      /* Header slot styling */
      ::slotted([slot="header"]) {
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
        padding-bottom: var(--spacing-3, 0.75rem);
        margin-bottom: var(--spacing-3, 0.75rem);
      }
      
      /* Footer slot styling */
      ::slotted([slot="footer"]) {
        border-top: 1px solid var(--color-border-secondary, #d4d4d4);
        padding-top: var(--spacing-3, 0.75rem);
        margin-top: var(--spacing-3, 0.75rem);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const padding = this.getAttribute('padding') || 'md';
    const bordered = this.getAttribute('bordered') || 'false';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="card" variant="${variant}" bordered="${bordered}">
        <div class="content" padding="${padding}">
          <slot name="header"></slot>
          <slot></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-card', PilotCard);
