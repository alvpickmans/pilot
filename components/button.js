/**
 * Pilot Design System - Button Component
 * 
 * Technical button with industrial styling and multiple variants.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL BUTTON COMPONENT
// ============================================

export class PilotButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
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
        display: inline-block;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2, 0.5rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        position: relative;
        overflow: hidden;
      }
      
      /* Light underline hover effect - matches text color */
      button {
        position: relative;
      }
      
      button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: currentColor;
        opacity: 0.3;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      button:hover::after {
        transform: scaleX(1);
      }
      
      /* Loading button - no underline to avoid conflicts with spinner */
      button[loading]::after {
        display: none;
      }
      
      button > * {
        position: relative;
        z-index: 1;
      }
      
      /* Sizes */
      button[size="sm"] {
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      button[size="md"] {
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
      }
      
      button[size="lg"] {
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        font-size: var(--font-size-base, 1rem);
      }
      
      /* Variants */
      button[variant="primary"] {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-white-100, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      /* Primary button maintains white text always */
      button[variant="primary"]:hover {
        color: var(--color-white-100, #ffffff);
        background: var(--color-brand-primary-hover, #242424);
      }
      
      /* Primary button maintains white text in dark mode */
      :host-context([data-theme="dark"]) button[variant="primary"] {
        color: var(--color-white-100, #ffffff);
      }
      
      button[variant="secondary"] {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-border-primary, #b3b3b3);
      }
      
      button[variant="outline"] {
        background: transparent;
      }
      
      button[variant="ghost"] {
        background: transparent;
        border-color: transparent;
      }
      
      button[variant="ghost"]:hover {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-primary, #1a1a1a);
      }
      
      /* Technical variant - for code/machine aesthetic */
      button[variant="technical"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        border: 2px solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-technical, #f5f5f5);
        position: relative;
      }
      
      button[variant="technical"]::after {
        content: '›';
        margin-left: var(--spacing-2, 0.5rem);
        font-weight: var(--font-weight-bold, 700);
      }
      
      /* States */
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      button[loading] {
        pointer-events: none;
      }
      
      button[loading]::after {
        content: '';
        width: 1em;
        height: 1em;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: var(--spacing-2, 0.5rem);
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'secondary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <button 
        variant="${variant}" 
        size="${size}"
        ${disabled ? 'disabled' : ''}
        ${loading ? 'loading' : ''}
      >
        <slot></slot>
      </button>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-button', PilotButton);
