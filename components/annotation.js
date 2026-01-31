/**
 * Pilot Design System - Annotation Component
 * 
 * Callout box for technical notes and warnings.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL ANNOTATION COMPONENT
// ============================================

export class PilotAnnotation extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'position'];
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
        padding: var(--spacing-4, 1rem);
        border: 1px dashed var(--color-border-dashed, #8a8a8a);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .label {
        position: absolute;
        top: 0;
        left: var(--spacing-4, 1rem);
        transform: translateY(-50%);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-2xs, 0.625rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-pilot-annotation, #525252);
        background: var(--color-background-primary, #ffffff);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .label::before {
        content: attr(data-type);
      }
      
      .label[type="note"]::before { content: 'NOTE'; }
      .label[type="warning"]::before { content: 'WARNING'; }
      .label[type="important"]::before { content: 'IMPORTANT'; }
      .label[type="technical"]::before { content: 'TECHNICAL'; }
      
      /* Position variants */
      .label[position="top-left"] {
        left: var(--spacing-4, 1rem);
        right: auto;
      }
      
      .label[position="top-right"] {
        left: auto;
        right: var(--spacing-4, 1rem);
      }
      
      /* Corner brackets */
      :host::before,
      :host::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 1px dashed var(--color-border-dashed, #8a8a8a);
      }
      
      :host::before {
        top: -1px;
        left: -1px;
        border-right: none;
        border-bottom: none;
      }
      
      :host::after {
        bottom: -1px;
        right: -1px;
        border-left: none;
        border-top: none;
      }
    `;
  }

  render() {
    const type = this.getAttribute('type') || 'note';
    const position = this.getAttribute('position') || 'top-left';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="label" type="${type}" position="${position}" data-type="${type}"></span>
      <slot></slot>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-annotation', PilotAnnotation);
