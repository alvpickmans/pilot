/**
 * Pilot Design System - Measurement Component
 * 
 * Technical measurement display with lines.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL MEASUREMENT COMPONENT
// ============================================

export class PilotMeasurement extends HTMLElement {
  static get observedAttributes() {
    return ['orientation', 'value', 'unit'];
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
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
      }
      
      .measurement {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        color: var(--color-pilot-measurement, #8a8a8a);
        font-size: var(--font-size-xs, 0.75rem);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
      }
      
      .line {
        flex: 1;
        height: 1px;
        background: var(--color-pilot-measurement, #8a8a8a);
        min-width: 20px;
      }
      
      .measurement[orientation="vertical"] {
        flex-direction: column;
      }
      
      .measurement[orientation="vertical"] .line {
        width: 1px;
        height: 20px;
        min-width: auto;
        min-height: 20px;
      }
      
      .value {
        font-weight: var(--font-weight-semibold, 600);
        color: var(--color-text-secondary, #525252);
      }
      
      .unit {
        font-size: var(--font-size-2xs, 0.625rem);
        text-transform: uppercase;
      }
    `;
  }

  render() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    const value = this.getAttribute('value') || '';
    const unit = this.getAttribute('unit') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="measurement" orientation="${orientation}">
        ${orientation === 'horizontal' ? '<span class="line"></span>' : ''}
        <span class="value">${value}</span>
        ${unit ? `<span class="unit">${unit}</span>` : ''}
        <span class="line"></span>
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-measurement', PilotMeasurement);
