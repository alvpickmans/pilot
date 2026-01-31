/**
 * Pilot Design System - Search Component
 * 
 * Search input with autocomplete dropdown for finding transactions and accounts.
 * Features debounced search, keyboard navigation, and highlighted matches.
 */

import { baseStyles } from './shared.js';

// ============================================
// SEARCH COMPONENT
// ============================================

export class PilotSearch extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'debounce', 'min-length', 'disabled', 'loading'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._highlightedIndex = -1;
    this._suggestions = [];
    this._searchQuery = '';
    this._debounceTimer = null;
    this._selectedValue = '';
    
    // Create the initial DOM structure once
    this._createDOM();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
        position: relative;
      }
      
      .field {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      
      /* Technical bracket styling */
      .input-wrapper.technical::before,
      .input-wrapper.technical::after {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .input-wrapper.technical::before {
        content: '[';
      }
      
      .input-wrapper.technical::after {
        content: ']';
      }
      
      input {
        flex: 1;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        min-height: 44px;
      }
      
      .input-wrapper.technical input {
        border-left: none;
        border-right: none;
      }
      
      input::placeholder {
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      input:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
      }
      
      input[disabled] {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-disabled, #8a8a8a);
        cursor: not-allowed;
      }
      
      .input-actions {
        position: absolute;
        right: var(--spacing-3, 0.75rem);
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .clear-button {
        background: none;
        border: none;
        padding: var(--spacing-1, 0.25rem);
        cursor: pointer;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        line-height: 1;
        display: none;
      }
      
      .clear-button.visible {
        display: block;
      }
      
      .clear-button:hover {
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .loading-indicator {
        display: none;
        width: 16px;
        height: 16px;
        border: 2px solid var(--color-border-primary, #b3b3b3);
        border-top-color: var(--color-brand-primary, #1a1a1a);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      
      .loading-indicator.visible {
        display: block;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: var(--spacing-1, 0.25rem);
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-height: 300px;
        overflow: hidden;
        display: none;
        flex-direction: column;
      }
      
      .dropdown.open {
        display: flex;
      }
      
      .suggestions-container {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-1, 0.25rem) 0;
      }
      
      .suggestion {
        display: flex;
        align-items: center;
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        cursor: pointer;
        transition: background var(--duration-fast, 150ms);
      }
      
      .suggestion:hover,
      .suggestion.highlighted {
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      .suggestion.selected {
        background: var(--color-background-technical, #f5f5f5);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .suggestion-text {
        flex: 1;
      }
      
      .suggestion-highlight {
        background: var(--color-brand-accent, #f59e0b);
        color: var(--color-text-primary, #1a1a1a);
        padding: 0 2px;
      }
      
      .suggestion-meta {
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-text-tertiary, #6b6b6b);
        margin-left: var(--spacing-2, 0.5rem);
      }
      
      .no-results {
        padding: var(--spacing-4, 1rem);
        text-align: center;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      .no-results-icon {
        font-size: var(--font-size-xl, 1.25rem);
        margin-bottom: var(--spacing-2, 0.5rem);
      }
    `;
  }

  _createDOM() {
    const placeholder = this.getAttribute('placeholder') || 'Search...';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');
    const hasValue = this._selectedValue.length > 0;

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        <div class="input-wrapper technical">
          <input 
            type="text"
            placeholder="${placeholder}"
            value="${this._selectedValue}"
            ${disabled ? 'disabled' : ''}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${this._isOpen}"
            aria-haspopup="listbox"
          />
          <div class="input-actions">
            <div class="loading-indicator ${loading ? 'visible' : ''}"></div>
            <button class="clear-button ${hasValue && !loading ? 'visible' : ''}" aria-label="Clear search">×</button>
          </div>
        </div>
        <div class="dropdown ${this._isOpen ? 'open' : ''}" role="listbox">
          <div class="suggestions-container"></div>
        </div>
      </div>
    `;

    // Cache DOM references
    this._input = this.shadowRoot.querySelector('input');
    this._dropdown = this.shadowRoot.querySelector('.dropdown');
    this._suggestionsContainer = this.shadowRoot.querySelector('.suggestions-container');
    this._loadingIndicator = this.shadowRoot.querySelector('.loading-indicator');
    this._clearButton = this.shadowRoot.querySelector('.clear-button');

    this._attachEventListeners();
  }

  connectedCallback() {
    // Initialize value from attribute if present (attributes are now available)
    if (this.hasAttribute('value')) {
      this._selectedValue = this.getAttribute('value') || '';
      this._searchQuery = this._selectedValue;
      if (this._input) {
        this._input.value = this._selectedValue;
      }
      this._updateClearButton();
    }
    
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }
  }

  _setupEventListeners() {
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
    this._keydownHandler = this._handleKeydown.bind(this);
    
    document.addEventListener('click', this._clickOutsideHandler);
    this.addEventListener('keydown', this._keydownHandler);
  }

  _removeEventListeners() {
    document.removeEventListener('click', this._clickOutsideHandler);
    this.removeEventListener('keydown', this._keydownHandler);
  }

  _handleClickOutside(event) {
    if (!this.contains(event.target) && !this.shadowRoot.contains(event.target)) {
      this._closeDropdown();
    }
  }

  _handleKeydown(event) {
    if (this.hasAttribute('disabled')) return;

    switch (event.key) {
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this._isOpen && this._suggestions.length > 0) {
          this._openDropdown();
        } else if (this._isOpen) {
          this._highlightNext();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this._isOpen) {
          this._highlightPrevious();
        }
        break;
      case 'Enter':
        if (this._isOpen && this._highlightedIndex >= 0) {
          event.preventDefault();
          this._selectSuggestion(this._suggestions[this._highlightedIndex]);
        }
        break;
      case 'Home':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightedIndex = 0;
          this._scrollToHighlighted();
          this._renderSuggestions();
        }
        break;
      case 'End':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightedIndex = this._suggestions.length - 1;
          this._scrollToHighlighted();
          this._renderSuggestions();
        }
        break;
    }
  }

  _highlightNext() {
    if (this._suggestions.length === 0) return;
    this._highlightedIndex = (this._highlightedIndex + 1) % this._suggestions.length;
    this._scrollToHighlighted();
    this._renderSuggestions();
  }

  _highlightPrevious() {
    if (this._suggestions.length === 0) return;
    this._highlightedIndex = this._highlightedIndex <= 0 
      ? this._suggestions.length - 1 
      : this._highlightedIndex - 1;
    this._scrollToHighlighted();
    this._renderSuggestions();
  }

  _scrollToHighlighted() {
    setTimeout(() => {
      const highlighted = this.shadowRoot.querySelector('.suggestion.highlighted');
      if (highlighted && typeof highlighted.scrollIntoView === 'function') {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    }, 0);
  }

  _openDropdown() {
    this._isOpen = true;
    this._highlightedIndex = this._suggestions.length > 0 ? 0 : -1;
    this._updateDropdownState();
  }

  _closeDropdown() {
    this._isOpen = false;
    this._highlightedIndex = -1;
    this._updateDropdownState();
  }

  _updateDropdownState() {
    if (this._dropdown) {
      this._dropdown.classList.toggle('open', this._isOpen);
    }
    if (this._input) {
      this._input.setAttribute('aria-expanded', this._isOpen);
    }
    this._renderSuggestions();
  }

  _renderSuggestions() {
    if (!this._suggestionsContainer) return;

    const minLength = parseInt(this.getAttribute('min-length')) || 1;
    
    if (this._suggestions.length === 0 && this._searchQuery.length >= minLength) {
      this._suggestionsContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">⚲</div>
          <div>No results found</div>
        </div>
      `;
    } else {
      this._suggestionsContainer.innerHTML = this._suggestions.map((suggestion, index) => {
        const isHighlighted = index === this._highlightedIndex;
        const highlightedLabel = this._highlightMatch(suggestion.label, this._searchQuery);
        
        return `
          <div 
            class="suggestion ${isHighlighted ? 'highlighted' : ''}"
            role="option"
            aria-selected="${isHighlighted}"
            data-index="${index}"
          >
            <span class="suggestion-text">${highlightedLabel}</span>
            ${suggestion.meta ? `<span class="suggestion-meta">${suggestion.meta}</span>` : ''}
          </div>
        `;
      }).join('');
    }

    // Re-attach suggestion click handlers
    const suggestions = this._suggestionsContainer.querySelectorAll('.suggestion');
    suggestions.forEach((suggestion) => {
      suggestion.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(suggestion.getAttribute('data-index'));
        if (this._suggestions[index]) {
          this._selectSuggestion(this._suggestions[index]);
        }
      });
      
      suggestion.addEventListener('mouseenter', () => {
        const index = parseInt(suggestion.getAttribute('data-index'));
        this._highlightedIndex = index;
        // Update highlighting without full re-render
        suggestions.forEach((s, i) => {
          s.classList.toggle('highlighted', i === index);
          s.setAttribute('aria-selected', i === index);
        });
      });
    });
  }

  _updateClearButton() {
    if (this._clearButton) {
      const hasValue = this._selectedValue.length > 0;
      const loading = this.hasAttribute('loading');
      this._clearButton.classList.toggle('visible', hasValue && !loading);
    }
  }

  _updateLoadingState() {
    if (this._loadingIndicator) {
      const loading = this.hasAttribute('loading');
      this._loadingIndicator.classList.toggle('visible', loading);
    }
    this._updateClearButton();
  }

  _handleInput(event) {
    const value = event.target.value;
    this._searchQuery = value;
    this._selectedValue = value;
    
    // Update clear button visibility without re-rendering entire component
    this._updateClearButton();
    
    // Clear previous debounce timer
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    const minLength = parseInt(this.getAttribute('min-length')) || 1;
    
    if (value.length < minLength) {
      this._suggestions = [];
      this._closeDropdown();
      return;
    }

    // Dispatch search event for external handling
    const debounceMs = parseInt(this.getAttribute('debounce')) || 300;
    
    this._debounceTimer = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('search', {
        detail: { query: value },
        bubbles: true
      }));
    }, debounceMs);
  }

  _selectSuggestion(suggestion) {
    this._selectedValue = suggestion.value || suggestion.label;
    this._searchQuery = this._selectedValue;
    this._closeDropdown();
    
    // Update input value directly without re-rendering
    if (this._input) {
      this._input.value = this._selectedValue;
    }
    
    this._updateClearButton();

    this.dispatchEvent(new CustomEvent('select', {
      detail: { suggestion },
      bubbles: true
    }));
  }

  _clearValue() {
    this._selectedValue = '';
    this._searchQuery = '';
    this._suggestions = [];
    this._closeDropdown();
    
    if (this._input) {
      this._input.value = '';
      this._input.focus();
    }
    
    this._updateClearButton();

    this.dispatchEvent(new CustomEvent('clear', {
      bubbles: true
    }));
  }

  _highlightMatch(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${this._escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
  }

  _escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Public method to set suggestions from external source
  setSuggestions(suggestions) {
    this._suggestions = suggestions.map(s => {
      if (typeof s === 'string') {
        return { label: s, value: s };
      }
      return s;
    });
    
    // Open dropdown if we have suggestions and not disabled
    if (this._suggestions.length > 0 && !this.hasAttribute('disabled')) {
      this._isOpen = true;
      this._highlightedIndex = 0;
    } else {
      this._isOpen = false;
      this._highlightedIndex = -1;
    }
    
    this._updateDropdownState();
  }

  // Public method to set loading state
  setLoading(isLoading) {
    if (isLoading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
    this._updateLoadingState();
  }

  _attachEventListeners() {
    if (this._input && !this.hasAttribute('disabled')) {
      this._input.addEventListener('input', (e) => this._handleInput(e));
      this._input.addEventListener('focus', () => {
        if (this._suggestions.length > 0 && !this._isOpen) {
          this._openDropdown();
        }
      });
    }

    if (this._clearButton) {
      this._clearButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this._clearValue();
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && newValue !== oldValue) {
      this._selectedValue = newValue || '';
      this._searchQuery = this._selectedValue;
      if (this._input) {
        this._input.value = this._selectedValue;
      }
      this._updateClearButton();
    } else if (name === 'placeholder' && this._input) {
      this._input.setAttribute('placeholder', newValue || 'Search...');
    } else if (name === 'disabled' && this._input) {
      if (newValue !== null) {
        this._input.setAttribute('disabled', '');
      } else {
        this._input.removeAttribute('disabled');
      }
    } else if (name === 'loading') {
      this._updateLoadingState();
    }
  }

  get value() {
    return this._selectedValue;
  }

  set value(val) {
    this._selectedValue = val || '';
    this._searchQuery = this._selectedValue;
    if (this._input) {
      this._input.value = this._selectedValue;
    }
    this._updateClearButton();
  }
}

customElements.define('pilot-search', PilotSearch);
