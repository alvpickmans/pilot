/**
 * Pilot Design System - Status Component
 * 
 * Status indicator with animated pulse option.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL STATUS COMPONENT
// ============================================

export class PilotStatus extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'pulse', 'size'];
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
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .indicator {
        width: 8px;
        height: 8px;
        border-radius: var(--border-radius-full, 9999px);
        background: var(--color-gray-400, #8a8a8a);
        border: 2px solid transparent;
        box-shadow: 0 0 0 1px var(--color-background-primary, #ffffff);
      }
      
      .indicator[size="sm"] {
        width: 6px;
        height: 6px;
      }
      
      .indicator[size="lg"] {
        width: 12px;
        height: 12px;
      }
      
      .indicator[variant="success"] {
        background: var(--color-feedback-success, #16a34a);
      }
      
      .indicator[variant="warning"] {
        background: var(--color-feedback-warning, #d97706);
      }
      
      .indicator[variant="error"] {
        background: var(--color-feedback-error, #dc2626);
      }
      
      .indicator[variant="info"] {
        background: var(--color-feedback-info, #525252);
      }
      
      .indicator[variant="neutral"] {
        background: var(--color-gray-400, #8a8a8a);
      }
      
      .indicator[pulse] {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      
      .label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'neutral';
    const pulse = this.hasAttribute('pulse');
    const size = this.getAttribute('size') || 'md';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="indicator" variant="${variant}" size="${size}" ${pulse ? 'pulse' : ''}></span>
      <span class="label"><slot></slot></span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-status', PilotStatus);
