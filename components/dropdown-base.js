/**
 * Pilot Design System - Dropdown Base Mixin
 *
 * Shared dropdown functionality for components with dropdown/popover behavior.
 * Provides click-outside handling, keyboard navigation, and open/close state management.
 *
 * @example
 * class PilotSelect extends DropdownBase(HTMLElement) {
 *   // Component implementation
 * }
 */

// ============================================
// DROPDOWN BASE MIXIN
// ============================================

export const DropdownBase = (BaseClass) => class extends BaseClass {
  constructor() {
    super();
    this._isOpen = false;
    this._highlightedIndex = -1;
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
    this._keydownHandler = this._handleDropdownKeydown.bind(this);
    this._dropdownListenersAdded = false;
  }

  /**
   * Setup dropdown keyboard listeners
   * Call this in connectedCallback
   */
  _setupDropdownListeners() {
    if (!this._dropdownListenersAdded) {
      this.addEventListener('keydown', this._keydownHandler);
      this._dropdownListenersAdded = true;
    }
  }

  // ============================================
  // DROPDOWN STATE MANAGEMENT
  // ============================================

  /**
   * Toggle dropdown open/closed state
   */
  _toggleDropdown() {
    if (this._isOpen) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  }

  /**
   * Open the dropdown
   * @param {Object} options - Options for opening
   * @param {number} options.highlightIndex - Index to highlight when opening
   * @param {Function} options.onOpen - Callback when dropdown opens
   */
  _openDropdown(options = {}) {
    if (this._isOpen) return;
    
    this._isOpen = true;
    
    // Set highlighted index
    if (options.highlightIndex !== undefined) {
      this._highlightedIndex = options.highlightIndex;
    }
    
    // Add document-level click listener for click-outside handling
    document.addEventListener('click', this._clickOutsideHandler);
    
    // Call onOpen callback if provided
    if (options.onOpen && typeof options.onOpen === 'function') {
      options.onOpen();
    }
    
    // Dispatch open event
    this.dispatchEvent(new CustomEvent('dropdown-open', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Close the dropdown
   * @param {Object} options - Options for closing
   * @param {Function} options.onClose - Callback when dropdown closes
   */
  _closeDropdown(options = {}) {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this._highlightedIndex = -1;
    
    // Remove document-level click listener
    document.removeEventListener('click', this._clickOutsideHandler);
    
    // Call onClose callback if provided
    if (options.onClose && typeof options.onClose === 'function') {
      options.onClose();
    }
    
    // Dispatch close event
    this.dispatchEvent(new CustomEvent('dropdown-close', {
      bubbles: true,
      composed: true
    }));
  }

  // ============================================
  // CLICK OUTSIDE HANDLING
  // ============================================

  /**
   * Handle clicks outside the component
   * @param {MouseEvent} event
   */
  _handleClickOutside(event) {
    // Check if click is outside both light DOM and shadow DOM
    const isOutside = !this.contains(event.target) && 
                      !this.shadowRoot?.contains(event.target);
    
    if (isOutside && this._isOpen) {
      this._closeDropdown();
    }
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================

  /**
   * Handle keyboard navigation for dropdown
   * @param {KeyboardEvent} event
   */
  _handleDropdownKeydown(event) {
    // Allow components to override by checking for disabled state
    if (this.hasAttribute && this.hasAttribute('disabled')) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this._handleDropdownEnter(event);
        break;
      
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._closeDropdown();
        }
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        this._handleDropdownArrowDown(event);
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        this._handleDropdownArrowUp(event);
        break;
      
      case 'Home':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightedIndex = 0;
          this._scrollToHighlighted();
          this._updateHighlightedOption?.();
        }
        break;
      
      case 'End':
        if (this._isOpen && this._getItemCount) {
          event.preventDefault();
          const count = this._getItemCount();
          this._highlightedIndex = count - 1;
          this._scrollToHighlighted();
          this._updateHighlightedOption?.();
        }
        break;
    }
  }

  /**
   * Handle Enter/Space key - can be overridden by components
   * @param {KeyboardEvent} event
   */
  _handleDropdownEnter(event) {
    if (this._isOpen && this._highlightedIndex >= 0) {
      // Component should implement _selectHighlightedItem
      if (this._selectHighlightedItem) {
        this._selectHighlightedItem();
      }
    } else {
      this._toggleDropdown();
    }
  }

  /**
   * Handle ArrowDown key - can be overridden by components
   * @param {KeyboardEvent} event
   */
  _handleDropdownArrowDown(event) {
    if (!this._isOpen) {
      this._openDropdown({ highlightIndex: 0 });
    } else {
      this._highlightNext();
    }
  }

  /**
   * Handle ArrowUp key - can be overridden by components
   * @param {KeyboardEvent} event
   */
  _handleDropdownArrowUp(event) {
    if (!this._isOpen) {
      this._openDropdown({ highlightIndex: this._getItemCount ? this._getItemCount() - 1 : 0 });
    } else {
      this._highlightPrevious();
    }
  }

  /**
   * Highlight next item in dropdown
   */
  _highlightNext() {
    const count = this._getItemCount ? this._getItemCount() : 0;
    if (count === 0) return;
    
    this._highlightedIndex = (this._highlightedIndex + 1) % count;
    this._scrollToHighlighted();
    
    // Update visual state if method exists
    if (this._updateHighlightedOption) {
      this._updateHighlightedOption();
    }
  }

  /**
   * Highlight previous item in dropdown
   */
  _highlightPrevious() {
    const count = this._getItemCount ? this._getItemCount() : 0;
    if (count === 0) return;
    
    this._highlightedIndex = this._highlightedIndex <= 0 
      ? count - 1 
      : this._highlightedIndex - 1;
    this._scrollToHighlighted();
    
    // Update visual state if method exists
    if (this._updateHighlightedOption) {
      this._updateHighlightedOption();
    }
  }

  /**
   * Scroll highlighted item into view
   */
  _scrollToHighlighted() {
    setTimeout(() => {
      const highlighted = this.shadowRoot?.querySelector?.('[data-highlighted="true"], .highlighted');
      if (highlighted && typeof highlighted.scrollIntoView === 'function') {
        highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 0);
  }

  // ============================================
  // CLEANUP
  // ============================================

  /**
   * Clean up dropdown event listeners
   * Call this in disconnectedCallback
   */
  _cleanupDropdown() {
    document.removeEventListener('click', this._clickOutsideHandler);
    this.removeEventListener('keydown', this._keydownHandler);
    this._dropdownListenersAdded = false;
  }
};

export default DropdownBase;
