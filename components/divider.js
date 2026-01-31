/**
 * Pilot Design System - Divider Component
 * 
 * Section separator with technical styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL DIVIDER COMPONENT
// ============================================

export class PilotDivider extends HTMLElement {
  static get observedAttributes() {
    return ['orientation', 'variant', 'label'];
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
      
      .divider {
        display: flex;
        align-items: center;
        width: 100%;
      }
      
      .divider[orientation="vertical"] {
        flex-direction: column;
        height: 100%;
        width: auto;
      }
      
      .line {
        flex: 1;
        border: none;
        border-top: 1px solid var(--color-border-primary, #b3b3b3);
      }
      
      .divider[orientation="vertical"] .line {
        border-top: none;
        border-left: 1px solid var(--color-border-primary, #b3b3b3);
        flex: 1;
        width: 0;
      }
      
      .divider[variant="dashed"] .line {
        border-top-style: dashed;
      }
      
      .divider[variant="dashed"][orientation="vertical"] .line {
        border-left-style: dashed;
        border-top: none;
      }
      
      .divider[variant="technical"] .line {
        border-top: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      .divider[variant="technical"][orientation="vertical"] .line {
        border-left: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-top: none;
      }
      
      .label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-tertiary, #6b6b6b);
        padding: 0 var(--spacing-4, 1rem);
        white-space: nowrap;
      }
      
      .divider[orientation="vertical"] .label {
        padding: var(--spacing-4, 1rem) 0;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
    `;
  }

  render() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    const variant = this.getAttribute('variant') || 'default';
    const label = this.getAttribute('label') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="divider" orientation="${orientation}" variant="${variant}">
        <div class="line"></div>
        ${label ? `<span class="label">${label}</span>` : ''}
        ${label ? '<div class="line"></div>' : ''}
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-divider', PilotDivider);
