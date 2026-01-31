/**
 * Pilot Design System - Tabs Component
 *
 * Tab navigation component for switching between content sections.
 * Supports horizontal/vertical orientation, variants, overflow handling, and disabled tabs.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL TABS COMPONENT
// ============================================

export class PilotTabs extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'orientation', 'active-tab'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tabs = [];
    this._activeTab = 0;
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .tabs-container {
        display: flex;
        width: 100%;
      }
      
      .tabs-container.horizontal {
        flex-direction: column;
      }
      
      .tabs-container.vertical {
        flex-direction: row;
      }
      
      /* Tab List */
      .tab-list {
        display: flex;
        position: relative;
      }
      
      .tabs-container.horizontal .tab-list {
        flex-direction: row;
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--color-border-primary, #b3b3b3) transparent;
      }
      
      .tabs-container.horizontal .tab-list::-webkit-scrollbar {
        height: 4px;
      }
      
      .tabs-container.horizontal .tab-list::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .tabs-container.horizontal .tab-list::-webkit-scrollbar-thumb {
        background: var(--color-border-primary, #b3b3b3);
        border-radius: 0;
      }
      
      .tabs-container.vertical .tab-list {
        flex-direction: column;
        border-right: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        min-width: 200px;
        overflow-y: auto;
        max-height: 100%;
      }
      
      /* Tab Button */
      .tab-button {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        background: transparent;
        border: none;
        color: var(--color-text-secondary, #525252);
        cursor: pointer;
        transition: color 80ms ease-out, background-color 80ms ease-out;
        white-space: nowrap;
        position: relative;
        will-change: color, background-color;
      }
      
      .tabs-container.vertical .tab-button {
        text-align: left;
        justify-content: flex-start;
        border-right: 3px solid transparent;
        margin-right: -1px;
      }
      
      .tabs-container.horizontal .tab-button {
        border-bottom: 3px solid transparent;
        margin-bottom: -1px;
      }
      
      .tab-button:hover:not(.disabled) {
        color: var(--color-text-primary, #1a1a1a);
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      .tab-button.active {
        color: var(--color-brand-primary, #1a1a1a);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .tabs-container.horizontal .tab-button.active {
        border-bottom-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .tabs-container.vertical .tab-button.active {
        border-right-color: var(--color-brand-primary, #1a1a1a);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .tab-button.disabled {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      .tab-button:focus {
        outline: none;
        box-shadow: inset 0 0 0 2px rgba(245, 158, 11, 0.3);
      }
      
      .tab-button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: -2px;
      }
      
      /* Technical Variant */
      .tabs-container.technical .tab-button {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        border: var(--border-width-1, 1px) solid transparent;
      }
      
      .tabs-container.technical.horizontal .tab-button {
        border-bottom: var(--border-width-technical, 1.5px) solid var(--color-border-primary, #b3b3b3);
        margin-bottom: 0;
      }
      
      .tabs-container.technical.horizontal .tab-button.active {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-bottom-color: var(--color-background-primary, #ffffff);
        background: var(--color-background-primary, #ffffff);
        margin-bottom: -1.5px;
      }
      
      .tabs-container.technical.vertical .tab-button {
        border-right: var(--border-width-technical, 1.5px) solid var(--color-border-primary, #b3b3b3);
        margin-right: 0;
      }
      
      .tabs-container.technical.vertical .tab-button.active {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-right-color: var(--color-background-primary, #ffffff);
        background: var(--color-background-primary, #ffffff);
        margin-right: -1.5px;
      }
      
      /* Underline Variant */
      .tabs-container.underline .tab-button {
        position: relative;
      }
      
      .tabs-container.underline.horizontal .tab-button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-brand-primary, #1a1a1a);
        transform: scaleX(0);
        transition: transform 100ms ease-out;
        will-change: transform;
      }
      
      .tabs-container.underline.horizontal .tab-button.active::after {
        transform: scaleX(1);
      }
      
      .tabs-container.underline.vertical .tab-button::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--color-brand-primary, #1a1a1a);
        transform: scaleY(0);
        transition: transform 100ms ease-out;
        will-change: transform;
      }
      
      .tabs-container.underline.vertical .tab-button.active::after {
        transform: scaleY(1);
      }
      
      /* Tab Icon */
      .tab-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-base, 1rem);
      }
      
      /* Tab Content */
      .tab-content {
        flex: 1;
        padding: var(--spacing-4, 1rem);
      }
      
      .tabs-container.vertical .tab-content {
        padding-left: var(--spacing-6, 1.5rem);
      }
      
      .tab-panel {
        display: none;
      }
      
      .tab-panel.active {
        display: block;
        animation: fadeIn 100ms ease-out;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      /* Overflow Indicator */
      .overflow-indicator {
        display: none;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2, 0.5rem);
        color: var(--color-text-tertiary, #6b6b6b);
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .tabs-container.horizontal.has-overflow .overflow-indicator {
        display: flex;
      }
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
    // Use setTimeout to ensure child elements are fully parsed
    setTimeout(() => {
      this._parseTabs();
      this._updateActiveTab();
      this.render();
    }, 0);
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    this._keydownHandler = this._handleKeydown.bind(this);
    this.addEventListener('keydown', this._keydownHandler);
  }

  _removeEventListeners() {
    this.removeEventListener('keydown', this._keydownHandler);
  }

  _parseTabs() {
    const tabElements = this.querySelectorAll('pilot-tab');
    this._tabs = Array.from(tabElements).map((tab, index) => ({
      label: tab.getAttribute('label') || `Tab ${index + 1}`,
      icon: tab.getAttribute('icon') || '',
      disabled: tab.hasAttribute('disabled'),
      content: tab.innerHTML,
      index: index
    }));
  }

  _updateActiveTab() {
    const activeTabAttr = this.getAttribute('active-tab');
    if (activeTabAttr !== null) {
      const index = parseInt(activeTabAttr, 10);
      if (!isNaN(index) && index >= 0 && index < this._tabs.length) {
        this._activeTab = index;
      }
    }
  }

  _handleKeydown(event) {
    if (this._tabs.length === 0) return;

    const orientation = this.getAttribute('orientation') || 'horizontal';
    const isHorizontal = orientation === 'horizontal';

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this._activateNextTab();
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this._activatePreviousTab();
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          this._activateNextTab();
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          this._activatePreviousTab();
        }
        break;
      case 'Home':
        event.preventDefault();
        this._activateFirstTab();
        break;
      case 'End':
        event.preventDefault();
        this._activateLastTab();
        break;
    }
  }

  _activateNextTab() {
    let nextIndex = this._activeTab;
    do {
      nextIndex = (nextIndex + 1) % this._tabs.length;
    } while (this._tabs[nextIndex]?.disabled && nextIndex !== this._activeTab);
    
    if (!this._tabs[nextIndex]?.disabled) {
      this._setActiveTab(nextIndex);
    }
  }

  _activatePreviousTab() {
    let prevIndex = this._activeTab;
    do {
      prevIndex = prevIndex <= 0 ? this._tabs.length - 1 : prevIndex - 1;
    } while (this._tabs[prevIndex]?.disabled && prevIndex !== this._activeTab);
    
    if (!this._tabs[prevIndex]?.disabled) {
      this._setActiveTab(prevIndex);
    }
  }

  _activateFirstTab() {
    const firstEnabled = this._tabs.findIndex(tab => !tab.disabled);
    if (firstEnabled !== -1) {
      this._setActiveTab(firstEnabled);
    }
  }

  _activateLastTab() {
    const lastEnabled = this._tabs.length - 1 - [...this._tabs].reverse().findIndex(tab => !tab.disabled);
    if (lastEnabled >= 0 && lastEnabled < this._tabs.length) {
      this._setActiveTab(lastEnabled);
    }
  }

  _setActiveTab(index) {
    if (index === this._activeTab || this._tabs[index]?.disabled) return;
    
    this._activeTab = index;
    
    // Update visual state immediately before any async operations
    this._updateVisualState();
    
    // Dispatch event asynchronously to not block the UI update
    requestAnimationFrame(() => {
      this.setAttribute('active-tab', index);
      
      this.dispatchEvent(new CustomEvent('tab-change', {
        detail: { 
          index: index, 
          tab: this._tabs[index] 
        },
        bubbles: true
      }));
    });
  }

  _updateVisualState() {
    const tabButtons = this.shadowRoot.querySelectorAll('.tab-button');
    const tabPanels = this.shadowRoot.querySelectorAll('.tab-panel');
    
    tabButtons.forEach((button, index) => {
      button.classList.toggle('active', index === this._activeTab);
      button.setAttribute('aria-selected', index === this._activeTab);
      button.setAttribute('tabindex', index === this._activeTab ? '0' : '-1');
    });
    
    tabPanels.forEach((panel, index) => {
      panel.classList.toggle('active', index === this._activeTab);
    });
  }

  _checkOverflow() {
    const container = this.shadowRoot.querySelector('.tabs-container');
    const tabList = this.shadowRoot.querySelector('.tab-list');
    
    if (container && tabList) {
      const hasOverflow = tabList.scrollWidth > tabList.clientWidth;
      container.classList.toggle('has-overflow', hasOverflow);
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const orientation = this.getAttribute('orientation') || 'horizontal';
    
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="tabs-container ${variant} ${orientation}" role="tablist" aria-orientation="${orientation}">
        <div class="tab-list">
          ${this._tabs.map((tab, index) => `
            <button 
              class="tab-button ${index === this._activeTab ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}"
              role="tab"
              aria-selected="${index === this._activeTab}"
              aria-disabled="${tab.disabled}"
              tabindex="${index === this._activeTab ? '0' : '-1'}"
              data-index="${index}"
            >
              ${tab.icon ? `<span class="tab-icon">${tab.icon}</span>` : ''}
              <span>${tab.label}</span>
            </button>
          `).join('')}
        </div>
        <div class="overflow-indicator">...</div>
        <div class="tab-content">
          ${this._tabs.map((tab, index) => `
            <div 
              class="tab-panel ${index === this._activeTab ? 'active' : ''}"
              role="tabpanel"
              aria-labelledby="tab-${index}"
            >
              ${tab.content}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this._attachEventListeners();
    
    // Check for overflow after render
    requestAnimationFrame(() => this._checkOverflow());
  }

  _attachEventListeners() {
    const tabButtons = this.shadowRoot.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(button.getAttribute('data-index'), 10);
        this._setActiveTab(index);
      });
    });
    
    // Handle window resize for overflow check
    this._resizeHandler = () => this._checkOverflow();
    window.addEventListener('resize', this._resizeHandler);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active-tab' && oldValue !== newValue) {
      const newIndex = parseInt(newValue, 10);
      if (!isNaN(newIndex) && newIndex !== this._activeTab) {
        this._activeTab = newIndex;
        this._updateVisualState();
      }
    } else if (name === 'variant' || name === 'orientation') {
      this.render();
    }
  }

  get activeTab() {
    return this._activeTab;
  }

  set activeTab(index) {
    const newIndex = parseInt(index, 10);
    if (!isNaN(newIndex) && newIndex >= 0 && newIndex < this._tabs.length) {
      this._setActiveTab(newIndex);
    }
  }

  get tabs() {
    return [...this._tabs];
  }
}

// ============================================
// TAB ITEM COMPONENT
// ============================================

export class PilotTab extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Tab content is managed by PilotTabs
    this.style.display = 'none';
  }
}

customElements.define('pilot-tabs', PilotTabs);
customElements.define('pilot-tab', PilotTab);
