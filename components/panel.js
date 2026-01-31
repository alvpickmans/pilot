/**
 * Pilot Design System - Panel Component
 * 
 * Collapsible panel with technical styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL PANEL COMPONENT
// ============================================

export class PilotPanel extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'collapsible', 'collapsed'];
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
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-primary, #ffffff);
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        background: var(--color-background-technical, #f5f5f5);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }
      
      .title {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-primary, #1a1a1a);
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .title::before {
        content: '▸';
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        transition: transform var(--duration-fast, 150ms);
      }
      
      :host([collapsed]) .title::before {
        transform: rotate(-90deg);
      }
      
      .toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-1, 0.25rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-secondary, #525252);
        transition: color var(--duration-fast, 150ms);
      }
      
      .toggle:hover {
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .content {
        padding: var(--spacing-4, 1rem);
        transition: all var(--duration-normal, 250ms);
      }
      
      :host([collapsed]) .content {
        display: none;
      }
      
      /* Technical corner markers */
      :host {
        position: relative;
      }
      
      :host::before,
      :host::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
        z-index: 1;
      }
      
      :host::before {
        top: -2px;
        left: -2px;
        border-right: none;
        border-bottom: none;
      }
      
      :host::after {
        top: -2px;
        right: -2px;
        border-left: none;
        border-bottom: none;
      }
    `;
  }

  render() {
    const title = this.getAttribute('title') || '';
    const collapsible = this.hasAttribute('collapsible');
    const collapsed = this.hasAttribute('collapsed');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="panel">
        ${title ? `
          <div class="header">
            <span class="title">${title}</span>
            ${collapsible ? `
              <button class="toggle" aria-label="${collapsed ? 'Expand' : 'Collapse'}">
                ${collapsed ? '+' : '−'}
              </button>
            ` : ''}
          </div>
        ` : ''}
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

    if (collapsible) {
      const toggle = this.shadowRoot.querySelector('.toggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleAttribute('collapsed');
        });
      }
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-panel', PilotPanel);
