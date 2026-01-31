/**
 * Pilot Design System - Select Component
 * 
 * Dropdown component with technical bracket styling for choosing from options.
 * Supports single/multi-select, search/filter, keyboard navigation, and grouped options.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL SELECT COMPONENT
// ============================================

export class PilotSelect extends HTMLElement {
  static get observedAttributes() {
    return ['multiple', 'searchable', 'placeholder', 'disabled', 'value', 'label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._selectedValues = [];
    this._filteredOptions = [];
    this._highlightedIndex = -1;
    this._optionElements = [];
    this._searchQuery = '';
    this._options = []; // Initialize _options to prevent undefined errors
    this._isSearching = false; // Track when user is typing in search box
    this.render();
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
      
      label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      
      /* Technical bracket styling */
      .select-wrapper.technical::before,
      .select-wrapper.technical::after {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .select-wrapper.technical::before {
        content: '[';
      }
      
      .select-wrapper.technical::after {
        content: ']';
      }
      
      .trigger {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        min-height: 44px;
      }
      
      .select-wrapper.technical .trigger {
        border-left: none;
        border-right: none;
      }
      
      .trigger:hover {
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .trigger:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
      }
      
      .trigger[disabled] {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-disabled, #8a8a8a);
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .trigger-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .trigger-text.placeholder {
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      .trigger-icon {
        margin-left: var(--spacing-2, 0.5rem);
        transition: transform var(--duration-fast, 150ms);
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .trigger-icon.open {
        transform: rotate(180deg);
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
      
      .search-container {
        padding: var(--spacing-2, 0.5rem);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }
      
      .search-input {
        width: 100%;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        border: 1px solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
      }
      
      .search-input:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .options-container {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-1, 0.25rem) 0;
      }
      
      .option {
        display: flex;
        align-items: center;
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        cursor: pointer;
        transition: background var(--duration-fast, 150ms);
      }
      
      .option:hover,
      .option.highlighted {
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      .option.selected {
        background: var(--color-background-technical, #f5f5f5);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .option.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .option-checkbox {
        width: 16px;
        height: 16px;
        border: 1px solid var(--color-border-primary, #b3b3b3);
        margin-right: var(--spacing-2, 0.5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .option.selected .option-checkbox {
        background: var(--color-brand-primary, #1a1a1a);
        border-color: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
      }
      
      .option-group {
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-tertiary, #6b6b6b);
        background: var(--color-background-secondary, #f5f5f5);
        margin-top: var(--spacing-1, 0.25rem);
      }
      
      .no-results {
        padding: var(--spacing-4, 1rem);
        text-align: center;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      .selected-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-1, 0.25rem);
        margin-top: var(--spacing-2, 0.5rem);
      }
      
      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem);
        background: var(--color-background-technical, #f5f5f5);
        border: 1px solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
      }
      
      .tag-remove {
        cursor: pointer;
        font-size: var(--font-size-sm, 0.875rem);
        line-height: 1;
        padding: 0 2px;
      }
      
      .tag-remove:hover {
        color: var(--color-feedback-error, #dc2626);
      }
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
    this._parseOptions();
    this._updateSelectedValues();
    // Re-render now that options are parsed
    this.render();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
    this._keydownHandler = this._handleKeydown.bind(this);
    this._slotChangeHandler = this._handleSlotChange.bind(this);
    
    document.addEventListener('click', this._clickOutsideHandler);
    this.addEventListener('keydown', this._keydownHandler);
    
    // Listen for slot changes to re-parse options when they change dynamically
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', this._slotChangeHandler);
    }
  }

  _removeEventListeners() {
    document.removeEventListener('click', this._clickOutsideHandler);
    this.removeEventListener('keydown', this._keydownHandler);
    
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      slot.removeEventListener('slotchange', this._slotChangeHandler);
    }
  }

  _handleSlotChange() {
    this._parseOptions();
    this.render();
  }

  _parseOptions() {
    // Query light DOM directly instead of using slot.assignedElements()
    // since the slot is hidden with display: none
    const lightDomOptions = this.querySelectorAll('option');
    const lightDomOptgroups = this.querySelectorAll('optgroup');
    
    this._options = [];

    // Process standalone options (not in optgroups)
    lightDomOptions.forEach(option => {
      // Skip options that are inside optgroups - we'll process those separately
      if (!option.closest('optgroup')) {
        this._options.push({
          value: option.getAttribute('value') || option.textContent.trim(),
          label: option.textContent.trim(),
          disabled: option.hasAttribute('disabled'),
          group: null
        });
      }
    });

    // Process optgroups and their options
    lightDomOptgroups.forEach(optgroup => {
      const groupLabel = optgroup.getAttribute('label') || '';
      const options = optgroup.querySelectorAll('option');
      options.forEach(option => {
        this._options.push({
          value: option.getAttribute('value') || option.textContent.trim(),
          label: option.textContent.trim(),
          disabled: option.hasAttribute('disabled'),
          group: groupLabel
        });
      });
    });

    this._filteredOptions = [...this._options];
  }

  _updateSelectedValues() {
    const value = this.getAttribute('value');
    const multiple = this.hasAttribute('multiple');

    if (value) {
      if (multiple) {
        this._selectedValues = value.split(',').map(v => v.trim()).filter(v => v);
      } else {
        this._selectedValues = [value];
      }
    } else {
      this._selectedValues = [];
    }
  }

  _filterOptions(query) {
    // Ensure options are parsed before filtering
    if (this._options.length === 0 && this.querySelector('option, optgroup')) {
      this._parseOptions();
    }
    
    if (!query) {
      this._filteredOptions = [...this._options];
    } else {
      const lowerQuery = query.toLowerCase();
      this._filteredOptions = this._options.filter(option => 
        option.label.toLowerCase().includes(lowerQuery)
      );
    }
    this._highlightedIndex = this._filteredOptions.length > 0 ? 0 : -1;
    // Only re-render the options list, not the entire component
    this._renderOptionsList();
  }

  _renderOptionsList() {
    const optionsContainer = this.shadowRoot.querySelector('.options-container');
    if (!optionsContainer) return;

    const multiple = this.hasAttribute('multiple');
    let currentGroup = null;

    if (this._filteredOptions.length === 0) {
      optionsContainer.innerHTML = `
        <div class="no-results">No results found</div>
      `;
    } else {
      optionsContainer.innerHTML = this._filteredOptions.map((option, index) => {
        const isSelected = this._selectedValues.includes(option.value);
        const isHighlighted = index === this._highlightedIndex;
        const groupHeader = option.group && option.group !== currentGroup 
          ? (currentGroup = option.group, `<div class="option-group">${option.group}</div>`) 
          : '';
        
        return `${groupHeader}
          <div 
            class="option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${option.disabled ? 'disabled' : ''}"
            role="option"
            aria-selected="${isSelected}"
            data-value="${option.value}"
          >
            ${multiple ? `<span class="option-checkbox">${isSelected ? '✓' : ''}</span>` : ''}
            <span>${option.label}</span>
          </div>
        `;
      }).join('');
    }

    // Re-attach event listeners to new option elements
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        const optionData = this._filteredOptions.find(o => o.value === value);
        if (optionData) {
          this._selectOption(optionData);
        }
      });
      option.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        const index = this._filteredOptions.findIndex(o => o.value === value);
        this._highlightedIndex = index;
        // Update visual highlighting via CSS only, no re-render
        options.forEach((s, i) => {
          s.classList.toggle('highlighted', i === index);
          s.setAttribute('aria-selected', i === index);
        });
      });
    });
  }

  _handleClickOutside(event) {
    if (!this.contains(event.target) && !this.shadowRoot.contains(event.target)) {
      this._closeDropdown();
    }
  }

  _handleKeydown(event) {
    if (this.hasAttribute('disabled')) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this._isOpen && this._highlightedIndex >= 0) {
          this._selectOption(this._filteredOptions[this._highlightedIndex]);
        } else {
          this._toggleDropdown();
        }
        break;
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this._isOpen) {
          this._openDropdown();
        } else {
          this._highlightNext();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this._isOpen) {
          this._openDropdown();
        } else {
          this._highlightPrevious();
        }
        break;
      case 'Home':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightedIndex = 0;
          this._scrollToHighlighted();
        }
        break;
      case 'End':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightedIndex = this._filteredOptions.length - 1;
          this._scrollToHighlighted();
        }
        break;
    }
  }

  _highlightNext() {
    if (this._filteredOptions.length === 0) return;
    this._highlightedIndex = (this._highlightedIndex + 1) % this._filteredOptions.length;
    this._scrollToHighlighted();
    // Only update the options list, don't do full re-render
    this._updateHighlightedOption();
  }

  _highlightPrevious() {
    if (this._filteredOptions.length === 0) return;
    this._highlightedIndex = this._highlightedIndex <= 0 
      ? this._filteredOptions.length - 1 
      : this._highlightedIndex - 1;
    this._scrollToHighlighted();
    // Only update the options list, don't do full re-render
    this._updateHighlightedOption();
  }

  _updateHighlightedOption() {
    const options = this.shadowRoot.querySelectorAll('.option');
    options.forEach((option, index) => {
      option.classList.toggle('highlighted', index === this._highlightedIndex);
      option.setAttribute('aria-selected', index === this._highlightedIndex);
    });
  }

  _scrollToHighlighted() {
    setTimeout(() => {
      const highlighted = this.shadowRoot.querySelector('.option.highlighted');
      if (highlighted && typeof highlighted.scrollIntoView === 'function') {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    }, 0);
  }

  _toggleDropdown() {
    if (this._isOpen) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  }

  _openDropdown() {
    this._isOpen = true;
    this._highlightedIndex = this._filteredOptions.length > 0 ? 0 : -1;
    this.render();
    
    // Focus search input if searchable
    if (this.hasAttribute('searchable')) {
      setTimeout(() => {
        const searchInput = this.shadowRoot.querySelector('.search-input');
        if (searchInput) searchInput.focus();
      }, 0);
    }
  }

  _closeDropdown() {
    this._isOpen = false;
    this._searchQuery = '';
    this._filteredOptions = [...this._options];
    this._highlightedIndex = -1;
    this.render();
  }

  _selectOption(option) {
    if (option.disabled) return;

    const multiple = this.hasAttribute('multiple');
    const searchable = this.hasAttribute('searchable');

    if (multiple) {
      const index = this._selectedValues.indexOf(option.value);
      if (index > -1) {
        this._selectedValues.splice(index, 1);
      } else {
        this._selectedValues.push(option.value);
      }
    } else {
      this._selectedValues = [option.value];
      // Defer closing to allow click event to complete before DOM is destroyed
      setTimeout(() => this._closeDropdown(), 0);
    }

    const value = multiple ? this._selectedValues.join(',') : this._selectedValues[0];
    this.setAttribute('value', value);
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this._selectedValues, option },
      bubbles: true
    }));

    // Avoid full re-render when dropdown is open and searchable to prevent focus loss
    if (multiple && this._isOpen && searchable) {
      this._updateTriggerAndTags();
      this._updateOptionStates();
    } else {
      this.render();
    }
  }

  _updateTriggerAndTags() {
    const triggerText = this.shadowRoot.querySelector('.trigger-text');
    const selectedTags = this.shadowRoot.querySelector('.selected-tags');
    const multiple = this.hasAttribute('multiple');
    const placeholder = this.getAttribute('placeholder') || 'Select an option';

    const selectedLabels = this._selectedValues.map(value => {
      const option = this._options.find(o => o.value === value);
      return option ? option.label : value;
    });

    if (triggerText) {
      const text = selectedLabels.length > 0 
        ? (multiple ? `${selectedLabels.length} selected` : selectedLabels[0])
        : placeholder;
      triggerText.textContent = text;
      triggerText.classList.toggle('placeholder', selectedLabels.length === 0);
    }

    if (multiple) {
      const field = this.shadowRoot.querySelector('.field');
      if (field) {
        // Remove existing tags container if present
        const existingTags = field.querySelector('.selected-tags');
        if (existingTags) {
          existingTags.remove();
        }
        
        // Add new tags if there are selections
        if (selectedLabels.length > 0) {
          const tagsContainer = document.createElement('div');
          tagsContainer.className = 'selected-tags';
          tagsContainer.innerHTML = selectedLabels.map((label, index) => `
            <span class="tag">
              ${label}
              <span class="tag-remove" data-value="${this._selectedValues[index]}">×</span>
            </span>
          `).join('');
          field.appendChild(tagsContainer);
          
          // Attach event listeners to new remove buttons
          const tagRemoves = tagsContainer.querySelectorAll('.tag-remove');
          tagRemoves.forEach(remove => {
            remove.addEventListener('click', (e) => {
              e.stopPropagation();
              this._removeTag(remove.getAttribute('data-value'));
            });
          });
        }
      }
    }
  }

  _updateOptionStates() {
    const options = this.shadowRoot.querySelectorAll('.option');
    const multiple = this.hasAttribute('multiple');
    
    options.forEach((optionEl) => {
      const value = optionEl.getAttribute('data-value');
      const isSelected = this._selectedValues.includes(value);
      
      optionEl.classList.toggle('selected', isSelected);
      optionEl.setAttribute('aria-selected', isSelected);
      
      if (multiple) {
        const checkbox = optionEl.querySelector('.option-checkbox');
        if (checkbox) {
          checkbox.textContent = isSelected ? '✓' : '';
        }
      }
    });
  }

  _removeTag(value) {
    const index = this._selectedValues.indexOf(value);
    if (index > -1) {
      this._selectedValues.splice(index, 1);
      const newValue = this._selectedValues.join(',');
      this.setAttribute('value', newValue);
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this._selectedValues },
        bubbles: true
      }));
      
      // Avoid full re-render when dropdown is open and searchable to prevent focus loss
      const searchable = this.hasAttribute('searchable');
      if (this._isOpen && searchable) {
        this._updateTriggerAndTags();
        this._updateOptionStates();
      } else {
        this.render();
      }
    }
  }

  render() {
    // Ensure options are parsed before rendering
    if (this._options.length === 0 && this.querySelector('option, optgroup')) {
      this._parseOptions();
    }
    
    const multiple = this.hasAttribute('multiple');
    const searchable = this.hasAttribute('searchable');
    const placeholder = this.getAttribute('placeholder') || 'Select an option';
    const disabled = this.hasAttribute('disabled');
    const label = this.getAttribute('label') || '';

    const selectedLabels = this._selectedValues.map(value => {
      const option = this._options.find(o => o.value === value);
      return option ? option.label : value;
    });

    const triggerText = selectedLabels.length > 0 
      ? (multiple ? `${selectedLabels.length} selected` : selectedLabels[0])
      : placeholder;

    let currentGroup = null;

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ''}
        <div class="select-wrapper technical">
          <button 
            class="trigger" 
            ${disabled ? 'disabled' : ''}
            aria-haspopup="listbox"
            aria-expanded="${this._isOpen}"
          >
            <span class="trigger-text ${selectedLabels.length === 0 ? 'placeholder' : ''}">${triggerText}</span>
            <span class="trigger-icon ${this._isOpen ? 'open' : ''}">▼</span>
          </button>
          <div class="dropdown ${this._isOpen ? 'open' : ''}" role="listbox">
            ${searchable && this._isOpen ? `
              <div class="search-container">
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search..."
                  value="${this._searchQuery}"
                />
              </div>
            ` : ''}
            <div class="options-container">
              ${this._filteredOptions.length === 0 ? `
                <div class="no-results">No results found</div>
              ` : this._filteredOptions.map((option, index) => {
                const isSelected = this._selectedValues.includes(option.value);
                const isHighlighted = index === this._highlightedIndex;
                const groupHeader = option.group && option.group !== currentGroup 
                  ? (currentGroup = option.group, `<div class="option-group">${option.group}</div>`) 
                  : '';
                
                return `${groupHeader}
                  <div 
                    class="option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${option.disabled ? 'disabled' : ''}"
                    role="option"
                    aria-selected="${isSelected}"
                    data-value="${option.value}"
                  >
                    ${multiple ? `<span class="option-checkbox">${isSelected ? '✓' : ''}</span>` : ''}
                    <span>${option.label}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        ${multiple && selectedLabels.length > 0 ? `
          <div class="selected-tags">
            ${selectedLabels.map((label, index) => `
              <span class="tag">
                ${label}
                <span class="tag-remove" data-value="${this._selectedValues[index]}">×</span>
              </span>
            `).join('')}
          </div>
        ` : ''}
        <slot style="display: none;"></slot>
      </div>
    `;

    this._attachEventListeners();
  }

  _attachEventListeners() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    const options = this.shadowRoot.querySelectorAll('.option');
    const searchInput = this.shadowRoot.querySelector('.search-input');
    const tagRemoves = this.shadowRoot.querySelectorAll('.tag-remove');

    if (trigger && !this.hasAttribute('disabled')) {
      trigger.addEventListener('click', () => this._toggleDropdown());
    }

    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        const optionData = this._filteredOptions.find(o => o.value === value);
        if (optionData) {
          this._selectOption(optionData);
        }
      });
      option.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        const index = this._filteredOptions.findIndex(o => o.value === value);
        this._highlightedIndex = index;
        // Don't re-render on mouseenter - just update the index for keyboard nav
        // Visual highlighting is handled by CSS :hover
      });
    });

    if (searchInput) {
      // Store reference to keep focus
      this._searchInput = searchInput;
      
      // Track when user is actively searching to prevent re-rendering
      searchInput.addEventListener('focus', () => {
        this._isSearching = true;
      });
      searchInput.addEventListener('blur', () => {
        this._isSearching = false;
      });
      
      searchInput.addEventListener('input', (e) => {
        this._searchQuery = e.target.value;
        this._filterOptions(this._searchQuery);
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
        }
      });
    }

    tagRemoves.forEach(remove => {
      remove.addEventListener('click', (e) => {
        e.stopPropagation();
        this._removeTag(remove.getAttribute('data-value'));
      });
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Parse options if they haven't been parsed yet (e.g., when attributes are set before connectedCallback)
    if (this._options.length === 0 && this.querySelector('option, optgroup')) {
      this._parseOptions();
    }
    
    // Don't re-render if user is actively searching (typing in search box)
    // This prevents the search input from losing focus
    if (this._isSearching && name !== 'disabled') {
      // Still update internal state for value changes, but don't re-render
      if (name === 'value') {
        this._updateSelectedValues();
      }
      return;
    }
    
    if (name === 'value') {
      this._updateSelectedValues();
      this.render();
    } else if (name === 'multiple' || name === 'searchable' || name === 'placeholder' || name === 'disabled' || name === 'label') {
      this.render();
    }
  }

  get value() {
    return this.hasAttribute('multiple') ? [...this._selectedValues] : this._selectedValues[0] || '';
  }

  set value(val) {
    if (Array.isArray(val)) {
      this._selectedValues = [...val];
      this.setAttribute('value', val.join(','));
    } else {
      this._selectedValues = val ? [val] : [];
      this.setAttribute('value', val || '');
    }
    this.render();
  }
}

customElements.define('pilot-select', PilotSelect);
