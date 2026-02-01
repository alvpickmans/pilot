/**
 * Pilot Design System - Theme Toggle Component
 * 
 * Global theme toggle that manages dark/light mode across the entire application.
 * Persists user preference to localStorage and respects system preference as fallback.
 * Applies theme by setting data-theme attribute on the document root.
 */

import { baseStyles } from './shared.js';

// ============================================
// THEME TOGGLE COMPONENT
// ============================================

export class PilotThemeToggle extends HTMLElement {
  static get observedAttributes() {
    return ['storage-key', 'show-label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isDark = false;
    this._storageKey = 'pilot-theme';
    this._showLabel = false;
    this._systemPrefersDark = false;
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      :host([hidden]) {
        display: none;
      }
      
      .theme-toggle {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        padding: var(--spacing-2, 0.5rem);
        background: transparent;
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        border-radius: var(--border-radius-none, 0);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-text-secondary, #525252);
      }
      
      .theme-toggle:hover {
        border-color: var(--color-border-technical, #1a1a1a);
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .theme-toggle:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
      
      .theme-toggle:active {
        transform: translateY(1px);
      }
      
      .theme-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }
      
      .theme-icon svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
      
      .theme-label {
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
      }
      
      /* Screen reader only text */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
  }

  connectedCallback() {
    this._parseAttributes();
    this._detectSystemPreference();
    this._loadSavedPreference();
    this._applyTheme();
    this._setupEventListeners();
    this.render();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _parseAttributes() {
    const storageKey = this.getAttribute('storage-key');
    if (storageKey) {
      this._storageKey = storageKey;
    }
    
    this._showLabel = this.hasAttribute('show-label');
  }

  _detectSystemPreference() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this._systemPrefersDark = mediaQuery.matches;
      
      // Listen for system preference changes
      mediaQuery.addEventListener('change', (e) => {
        this._systemPrefersDark = e.matches;
        // Only apply if user hasn't set a preference
        if (!this._hasUserPreference()) {
          this._isDark = e.matches;
          this._applyTheme();
          this._updateVisualState();
        }
      });
    }
  }

  _hasUserPreference() {
    try {
      return localStorage.getItem(this._storageKey) !== null;
    } catch (e) {
      return false;
    }
  }

  _loadSavedPreference() {
    try {
      const saved = localStorage.getItem(this._storageKey);
      if (saved === 'dark') {
        this._isDark = true;
      } else if (saved === 'light') {
        this._isDark = false;
      } else {
        // No saved preference, use system preference
        this._isDark = this._systemPrefersDark;
      }
    } catch (e) {
      // localStorage not available, use system preference
      this._isDark = this._systemPrefersDark;
    }
  }

  _savePreference() {
    try {
      localStorage.setItem(this._storageKey, this._isDark ? 'dark' : 'light');
    } catch (e) {
      // localStorage not available, ignore
    }
  }

  _applyTheme() {
    const root = document.documentElement;
    if (this._isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }

  _setupEventListeners() {
    this._clickHandler = this._handleClick.bind(this);
    this._keydownHandler = this._handleKeydown.bind(this);
    
    this.addEventListener('click', this._clickHandler);
    this.addEventListener('keydown', this._keydownHandler);
  }

  _removeEventListeners() {
    this.removeEventListener('click', this._clickHandler);
    this.removeEventListener('keydown', this._keydownHandler);
  }

  _handleClick(event) {
    event.preventDefault();
    this._toggleTheme();
  }

  _handleKeydown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._toggleTheme();
    }
  }

  _toggleTheme() {
    this._isDark = !this._isDark;
    this._applyTheme();
    this._savePreference();
    this._updateVisualState();
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('themechange', {
      detail: { 
        theme: this._isDark ? 'dark' : 'light',
        isDark: this._isDark 
      },
      bubbles: true
    }));
  }

  _updateVisualState() {
    // Update icon if needed
    this.render();
  }

  _getSunIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 001.06 1.06l1.591-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z"/>
    </svg>`;
  }

  _getMoonIcon() {
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
    </svg>`;
  }

  render() {
    const icon = this._isDark ? this._getMoonIcon() : this._getSunIcon();
    const label = this._isDark ? 'Dark' : 'Light';
    const ariaLabel = `Switch to ${this._isDark ? 'light' : 'dark'} mode`;

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <button 
        class="theme-toggle" 
        type="button"
        aria-label="${ariaLabel}"
        title="${ariaLabel}"
      >
        <span class="theme-icon" aria-hidden="true">
          ${icon}
        </span>
        ${this._showLabel ? `<span class="theme-label">${label}</span>` : ''}
        <span class="sr-only">${ariaLabel}</span>
      </button>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'storage-key' && newValue) {
      this._storageKey = newValue;
    } else if (name === 'show-label') {
      this._showLabel = this.hasAttribute('show-label');
      this.render();
    }
  }

  // Public API
  get theme() {
    return this._isDark ? 'dark' : 'light';
  }

  set theme(value) {
    const newIsDark = value === 'dark';
    if (newIsDark !== this._isDark) {
      this._isDark = newIsDark;
      this._applyTheme();
      this._savePreference();
      this.render();
    }
  }

  get isDark() {
    return this._isDark;
  }

  // Reset to system preference
  resetToSystem() {
    try {
      localStorage.removeItem(this._storageKey);
    } catch (e) {
      // Ignore
    }
    this._isDark = this._systemPrefersDark;
    this._applyTheme();
    this.render();
  }
}

customElements.define('pilot-theme-toggle', PilotThemeToggle);
