/**
 * Pilot Design System - Modal Component
 * 
 * Dialog overlay with technical corner bracket styling.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL MODAL COMPONENT
// ============================================

export class PilotModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'size', 'dismissible', 'title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._keydownHandler = this._handleKeydown.bind(this);
    this._clickHandler = this._handleBackdropClick.bind(this);
    this._focusTrapHandler = this._handleFocusTrap.bind(this);
    this._lastFocusedElement = null;
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: var(--pilot-modal-z-index, 1000);
      }
      
      :host([open]) {
        display: block;
      }
      
      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        background-image: radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px);
        background-size: 4px 4px;
        opacity: 0;
        transition: opacity var(--duration-normal, 250ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      :host([open]) .backdrop {
        opacity: 1;
      }
      
      .modal-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        width: 100%;
        max-height: 95vh;
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        opacity: 0;
        transition: all var(--duration-normal, 250ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      :host([open]) .modal-container {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      
      /* Size variants */
      .modal-container[size="sm"] {
        max-width: 400px;
      }
      
      .modal-container[size="md"] {
        max-width: 600px;
      }
      
      .modal-container[size="lg"] {
        max-width: 900px;
      }
      
      .modal-container[size="full"] {
        max-width: 95vw;
        max-height: 95vh;
      }
      
      /* Corner brackets */
      .modal-container::before,
      .modal-container::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
        z-index: 1;
        pointer-events: none;
      }
      
      .modal-container::before {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }
      
      .modal-container::after {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }
      
      /* Additional corner brackets */
      .corner-bracket-tl,
      .corner-bracket-tr,
      .corner-bracket-bl,
      .corner-bracket-br {
        position: absolute;
        width: 24px;
        height: 24px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
        pointer-events: none;
        z-index: 1;
      }
      
      .corner-bracket-tl {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }
      
      .corner-bracket-tr {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
      }
      
      .corner-bracket-bl {
        bottom: 0;
        left: 0;
        border-right: none;
        border-top: none;
      }
      
      .corner-bracket-br {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }
      
      .modal-header {
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
        background: var(--color-background-technical, #f5f5f5);
        flex-shrink: 0;
      }
      
      .modal-title {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-primary, #1a1a1a);
        margin: 0;
      }
      
      .modal-body {
        padding: var(--spacing-6, 1.5rem);
        overflow-y: auto;
        flex: 1;
      }
      
      .modal-footer {
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        border-top: 1px solid var(--color-border-secondary, #d4d4d4);
        background: var(--color-background-secondary, #f5f5f5);
        flex-shrink: 0;
      }
      
      /* Focus trap indicator */
      .modal-container:focus {
        outline: none;
      }
      
      /* Close button */
      .close-button {
        position: absolute;
        top: var(--spacing-3, 0.75rem);
        right: var(--spacing-3, 0.75rem);
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-2, 0.5rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-text-secondary, #525252);
        transition: color var(--duration-fast, 150ms);
        z-index: 2;
        line-height: 1;
      }
      
      .close-button:hover {
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .close-button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
    `;
  }

  render() {
    const open = this.hasAttribute('open');
    const size = this.getAttribute('size') || 'md';
    const dismissible = this.getAttribute('dismissible') !== 'false';
    const title = this.getAttribute('title') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="backdrop" part="backdrop"></div>
      <div 
        class="modal-container" 
        size="${size}" 
        part="modal"
        role="dialog"
        aria-modal="true"
        ${title ? `aria-labelledby="modal-title"` : ''}
        tabindex="-1"
      >
        <div class="corner-bracket-tl"></div>
        <div class="corner-bracket-tr"></div>
        <div class="corner-bracket-bl"></div>
        <div class="corner-bracket-br"></div>
        
        ${dismissible ? `
          <button class="close-button" aria-label="Close modal" part="close-button">
            ×
          </button>
        ` : ''}
        
        ${title ? `
          <div class="modal-header" part="header">
            <h2 class="modal-title" id="modal-title">${title}</h2>
            <slot name="header"></slot>
          </div>
        ` : `
          <div class="modal-header" part="header" style="display: none;">
            <slot name="header"></slot>
          </div>
        `}
        
        <div class="modal-body" part="body">
          <slot></slot>
        </div>
        
        <div class="modal-footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    // Add event listeners
    if (dismissible) {
      const closeButton = this.shadowRoot.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => this.close());
      }
    }

    // Setup focus trap and event listeners when opened
    if (open) {
      this._setupModal();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      const isOpen = newValue !== null;
      if (isOpen) {
        this._setupModal();
      } else {
        this._teardownModal();
      }
    }
    this.render();
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }

  _setupModal() {
    // Store last focused element
    this._lastFocusedElement = document.activeElement;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    document.addEventListener('keydown', this._keydownHandler);
    this.addEventListener('click', this._clickHandler);
    
    // Focus the modal
    setTimeout(() => {
      const modal = this.shadowRoot.querySelector('.modal-container');
      if (modal) {
        modal.focus();
      }
    }, 0);
  }

  _teardownModal() {
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove event listeners
    document.removeEventListener('keydown', this._keydownHandler);
    this.removeEventListener('click', this._clickHandler);
    
    // Restore focus
    if (this._lastFocusedElement) {
      this._lastFocusedElement.focus();
      this._lastFocusedElement = null;
    }
  }

  _handleKeydown(event) {
    if (event.key === 'Escape') {
      const dismissible = this.getAttribute('dismissible') !== 'false';
      if (dismissible) {
        this.close();
      }
    }
    
    // Handle Tab key for focus trap
    if (event.key === 'Tab') {
      this._handleFocusTrap(event);
    }
  }

  _handleBackdropClick(event) {
    const dismissible = this.getAttribute('dismissible') !== 'false';
    if (dismissible && event.target === this) {
      this.close();
    }
  }

  _handleFocusTrap(event) {
    const modal = this.shadowRoot.querySelector('.modal-container');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable || document.activeElement === modal) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

customElements.define('pilot-modal', PilotModal);
