/**
 * Pilot Design System - Toggle Component
 * 
 * Switch toggle component for settings with industrial on/off styling.
 * Supports custom labels, smooth animations, and keyboard accessibility.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL TOGGLE COMPONENT
// ============================================

export class PilotToggle extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'labels'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isChecked = false;
    this._labels = { on: 'ON', off: 'OFF' };
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-3, 0.75rem);
      }
      
      :host([hidden]) {
        display: none;
      }
      
      .toggle-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .toggle-label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
        user-select: none;
        transition: color var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      .toggle-label.active {
        color: var(--color-brand-primary, #1a1a1a);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .toggle-track {
        position: relative;
        width: 48px;
        height: 24px;
        background: var(--color-background-secondary, #f5f5f5);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        cursor: pointer;
        transition: background-color 150ms var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1)),
                    border-color 150ms var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        overflow: hidden;
        will-change: background-color, border-color;
      }
      
      /* Technical corner accents */
      .toggle-track::before,
      .toggle-track::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        border: 1px solid var(--color-border-technical, #1a1a1a);
        transition: all var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      .toggle-track::before {
        top: 2px;
        left: 2px;
        border-right: none;
        border-bottom: none;
      }
      
      .toggle-track::after {
        bottom: 2px;
        right: 2px;
        border-left: none;
        border-top: none;
      }
      
      .toggle-track:hover {
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .toggle-track:hover::before,
      .toggle-track:hover::after {
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .toggle-track.checked {
        background: var(--color-brand-primary, #1a1a1a);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .toggle-track.checked::before,
      .toggle-track.checked::after {
        border-color: var(--color-text-inverse, #ffffff);
      }
      
      .toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        background: var(--color-brand-primary, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        transition: transform 150ms var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        will-change: transform;
      }
      
      /* Technical accent on thumb */
      .toggle-thumb::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border: 1px solid var(--color-text-inverse, #ffffff);
        opacity: 0.5;
      }
      
      .toggle-track.checked .toggle-thumb {
        transform: translateX(24px);
        background: var(--color-background-primary, #ffffff);
      }
      
      .toggle-track.checked .toggle-thumb::before {
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      /* Disabled state */
      .toggle-track[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      .toggle-label.disabled {
        opacity: 0.5;
      }
      
      /* Focus state */
      .toggle-track:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
      }
      
      .toggle-track:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
      
      /* Hidden input for accessibility */
      input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
    this._parseLabels();
    this._updateCheckedState();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    this._clickHandler = this._handleClick.bind(this);
    this._keydownHandler = this._handleKeydown.bind(this);
    
    // Use capture phase for faster response
    this.addEventListener('click', this._clickHandler, true);
    this.addEventListener('keydown', this._keydownHandler);
  }

  _removeEventListeners() {
    this.removeEventListener('click', this._clickHandler, true);
    this.removeEventListener('keydown', this._keydownHandler);
  }

  _parseLabels() {
    const labelsAttr = this.getAttribute('labels');
    if (labelsAttr) {
      const parts = labelsAttr.split('|').map(l => l.trim());
      if (parts.length === 2) {
        this._labels = { on: parts[0], off: parts[1] };
      }
    }
  }

  _updateCheckedState() {
    this._isChecked = this.hasAttribute('checked');
  }

  _handleClick(event) {
    if (this.hasAttribute('disabled')) return;
    
    // Don't toggle if clicking on the hidden input directly
    if (event.target.tagName === 'INPUT') return;
    
    this._toggle();
  }

  _handleKeydown(event) {
    if (this.hasAttribute('disabled')) return;
    
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this._toggle();
        break;
    }
  }

  _toggle() {
    this._isChecked = !this._isChecked;
    
    // Update visual state immediately (before setAttribute to avoid lag)
    this._updateVisualState();
    
    // Dispatch change event immediately
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this._isChecked },
      bubbles: true
    }));
    
    // Update attribute asynchronously to avoid blocking the UI
    requestAnimationFrame(() => {
      if (this._isChecked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    });
  }

  _updateVisualState() {
    const track = this.shadowRoot.querySelector('.toggle-track');
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    const labels = this.shadowRoot.querySelectorAll('.toggle-label');
    
    if (track) {
      track.classList.toggle('checked', this._isChecked);
      track.setAttribute('aria-checked', this._isChecked);
    }
    
    if (checkbox) {
      checkbox.checked = this._isChecked;
    }
    
    if (labels.length === 2) {
      labels[0].classList.toggle('active', !this._isChecked);
      labels[1].classList.toggle('active', this._isChecked);
    }
  }

  render() {
    const disabled = this.hasAttribute('disabled');
    const offLabelActive = !this._isChecked;
    const onLabelActive = this._isChecked;

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="toggle-container">
        <span class="toggle-label ${offLabelActive ? 'active' : ''} ${disabled ? 'disabled' : ''}">${this._labels.off}</span>
        <div 
          class="toggle-track ${this._isChecked ? 'checked' : ''}" 
          role="switch"
          aria-checked="${this._isChecked}"
          tabindex="${disabled ? '-1' : '0'}"
          ${disabled ? 'disabled' : ''}
        >
          <input 
            type="checkbox" 
            ${this._isChecked ? 'checked' : ''}
            ${disabled ? 'disabled' : ''}
            tabindex="-1"
          />
          <div class="toggle-thumb"></div>
        </div>
        <span class="toggle-label ${onLabelActive ? 'active' : ''} ${disabled ? 'disabled' : ''}">${this._labels.on}</span>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') {
      const newChecked = this.hasAttribute('checked');
      if (newChecked !== this._isChecked) {
        this._isChecked = newChecked;
        this._updateVisualState();
      }
    } else if (name === 'disabled') {
      // Only re-render for disabled/labels as they affect structure
      this.render();
    } else if (name === 'labels') {
      this._parseLabels();
      this.render();
    }
  }

  get checked() {
    return this._isChecked;
  }

  set checked(value) {
    const newValue = Boolean(value);
    if (newValue !== this._isChecked) {
      this._isChecked = newValue;
      if (this._isChecked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
      this._updateVisualState();
    }
  }

  get labels() {
    return { ...this._labels };
  }

  set labels(value) {
    if (typeof value === 'object' && value.on && value.off) {
      this._labels = { on: value.on, off: value.off };
      this.setAttribute('labels', `${value.on}|${value.off}`);
    }
    this.render();
  }
}

customElements.define('pilot-toggle', PilotToggle);
