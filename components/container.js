/**
 * Pilot Design System - Container Component
 *
 * Max-width wrapper with technical borders for page sections.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL CONTAINER COMPONENT
// ============================================

export class PilotContainer extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'bordered', 'padding'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  _getMaxWidth() {
    const size = this.getAttribute('size') || 'lg';
    const sizes = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      full: '100%'
    };
    return sizes[size] || sizes.lg;
  }

  _getPadding() {
    const padding = this.getAttribute('padding') || 'md';
    const paddings = {
      sm: 'var(--spacing-4, 1rem)',
      md: 'var(--spacing-6, 1.5rem)',
      lg: 'var(--spacing-8, 2rem)',
      xl: 'var(--spacing-12, 3rem)'
    };
    return paddings[padding] || paddings.md;
  }

  get styles() {
    const isBordered = this.hasAttribute('bordered');

    return `
      ${baseStyles}

      :host {
        display: block;
        width: 100%;
      }

      .container {
        width: 100%;
        max-width: ${this._getMaxWidth()};
        margin-left: auto;
        margin-right: auto;
        padding: ${this._getPadding()};
        box-sizing: border-box;
        position: relative;
        background: var(--color-background-primary, #ffffff);
        ${isBordered ? `
          border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        ` : ''}
      }

      /* Technical corner brackets */
      ${isBordered ? `
        .container::before,
        .container::after,
        .corner-br {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border: 2px solid var(--color-border-technical, #1a1a1a);
        }

        .container::before {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
        }

        .container::after {
          top: -2px;
          right: -2px;
          border-left: none;
          border-bottom: none;
        }

        .corner-br {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
          background: transparent;
        }

        .corner-bl {
          position: absolute;
          bottom: -2px;
          left: -2px;
          width: 12px;
          height: 12px;
          border: 2px solid var(--color-border-technical, #1a1a1a);
          border-right: none;
          border-top: none;
          background: transparent;
        }
      ` : ''}

      /* Responsive padding adjustments */
      @media (max-width: 640px) {
        .container {
          padding: var(--spacing-4, 1rem);
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .container {
          background: var(--color-background-primary, #1a1a1a);
        }
      }

      :host([data-theme="dark"]) .container {
        background: var(--color-background-primary, #1a1a1a);
      }
    `;
  }

  render() {
    const isBordered = this.hasAttribute('bordered');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="container">
        ${isBordered ? '<div class="corner-bl"></div><div class="corner-br"></div>' : ''}
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-container', PilotContainer);
