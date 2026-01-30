/**
 * Pilot Design System - Grid Component
 * 
 * CSS Grid layout component with optional grid overlay.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL GRID COMPONENT
// ============================================

export class PilotGrid extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'gap', 'show-grid'];
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
        position: relative;
      }
      
      .grid {
        display: grid;
        position: relative;
      }
      
      .grid[columns="1"] { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .grid[columns="2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid[columns="3"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .grid[columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .grid[columns="6"] { grid-template-columns: repeat(6, minmax(0, 1fr)); }
      .grid[columns="12"] { grid-template-columns: repeat(12, minmax(0, 1fr)); }
      
      .grid[gap="0"] { gap: 0; }
      .grid[gap="1"] { gap: var(--spacing-1, 0.25rem); }
      .grid[gap="2"] { gap: var(--spacing-2, 0.5rem); }
      .grid[gap="3"] { gap: var(--spacing-3, 0.75rem); }
      .grid[gap="4"] { gap: var(--spacing-4, 1rem); }
      .grid[gap="6"] { gap: var(--spacing-6, 1.5rem); }
      .grid[gap="8"] { gap: var(--spacing-8, 2rem); }
      
      /* Technical grid overlay */
      .grid-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: 
          linear-gradient(to right, var(--color-pilot-grid, #d4d4d4) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-pilot-grid, #d4d4d4) 1px, transparent 1px);
        background-size: var(--pilot-grid-size, 8px) var(--pilot-grid-size, 8px);
        opacity: 0.3;
      }
      
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }
    `;
  }

  render() {
    const columns = this.getAttribute('columns') || '1';
    const gap = this.getAttribute('gap') || '4';
    const showGrid = this.hasAttribute('show-grid');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="grid" columns="${columns}" gap="${gap}">
        ${showGrid ? '<div class="grid-overlay"></div>' : ''}
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-grid', PilotGrid);
