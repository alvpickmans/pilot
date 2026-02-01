/**
 * Pilot Design System - Pagination Component
 *
 * Page controls for navigating transaction history and paginated data.
 * Technical styling with bracket accents and industrial aesthetic.
 */

import { baseStyles } from './shared.js';

// ============================================
// PAGINATION COMPONENT
// ============================================

export class PilotPagination extends HTMLElement {
  static get observedAttributes() {
    return ['total', 'page', 'per-page', 'max-visible', 'show-first-last', 'hide-per-page', 'hide-info', 'compact', 'responsive', 'data-hide-per-page', 'data-hide-info'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Read initial attributes if they exist
    this._total = parseInt(this.getAttribute('total'), 10) || 0;
    this._page = parseInt(this.getAttribute('page'), 10) || 1;
    this._perPage = parseInt(this.getAttribute('per-page'), 10) || 10;
    this._maxVisible = parseInt(this.getAttribute('max-visible'), 10) || 7;
    this._resizeObserver = null;
    this._containerWidth = 0;
    this._currentMaxVisible = null;
    // Check if responsive is explicitly set to false
    const responsiveAttr = this.getAttribute('responsive');
    this._isResponsive = responsiveAttr !== 'false';
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        width: 100%;
        container-type: inline-size;
        container-name: pagination;
      }
      
      .pagination-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        width: 100%;
        flex-wrap: wrap;
      }
      
      .pagination-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        flex-shrink: 0;
      }
      
      .pagination-controls {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        flex-shrink: 0;
      }
      
      .pagination-meta {
        display: flex;
        align-items: center;
        gap: var(--spacing-4, 1rem);
        margin-left: auto;
        flex-shrink: 0;
      }
      
      /* Navigation buttons */
      .nav-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
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
        min-width: 44px;
        min-height: 44px;
      }
      
      .nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--color-brand-primary, #1a1a1a);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        z-index: 0;
      }
      
      .nav-btn:hover::before {
        transform: scaleX(1);
      }
      
      .nav-btn:hover {
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .nav-btn > * {
        position: relative;
        z-index: 1;
      }
      
      .nav-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      .nav-btn[disabled]::before {
        display: none;
      }
      
      /* Page number buttons */
      .page-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        position: relative;
      }
      
      .page-btn:hover {
        border-color: var(--color-brand-primary, #1a1a1a);
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      .page-btn.active {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      .page-btn.active:hover {
        background: var(--color-brand-primary-hover, #242424);
      }
      
      /* Ellipsis */
      .ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        user-select: none;
      }
      
      /* Per page selector */
      .per-page-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        margin-left: var(--spacing-4, 1rem);
        padding-left: var(--spacing-4, 1rem);
        border-left: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
      }
      
      .per-page-label {
        font-size: var(--font-size-xs, 0.75rem);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        color: var(--color-text-secondary, #525252);
      }
      
      .per-page-select {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        min-width: 70px;
      }
      
      .per-page-select:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
      }
      
      /* Info display */
      .page-info {
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-text-secondary, #525252);
        margin-left: var(--spacing-4, 1rem);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-technical, 0.05em);
      }
      
      /* Bracket accents for technical variant */
      .bracket-left,
      .bracket-right {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-1, 0.25rem);
      }
      
      /* Focus states */
      .nav-btn:focus-visible,
      .page-btn:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
      
      /* Page indicator for compact mode */
      .page-indicator {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 0 var(--spacing-3, 0.75rem);
        min-width: 44px;
        min-height: 44px;
      }
      
      .page-indicator-text {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-primary, #1a1a1a);
        text-align: center;
        white-space: nowrap;
      }
      
      /* Compact mode */
      :host([compact]) .nav-btn {
        padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem);
        min-width: 36px;
        min-height: 36px;
      }
      
      :host([compact]) .page-btn {
        width: 36px;
        height: 36px;
      }
      
      :host([compact]) .ellipsis {
        width: 36px;
        height: 36px;
      }
      
      /* Responsive styles using container queries */
      @container pagination (max-width: 640px) {
        .pagination-wrapper {
          flex-wrap: wrap;
          gap: var(--spacing-3, 0.75rem);
        }
        
        .pagination-meta {
          margin-left: 0;
          width: 100%;
          justify-content: flex-start;
          order: 3;
        }
        
        .per-page-container {
          margin-left: 0;
          padding-left: 0;
          border-left: none;
        }
      }
      
      /* Small screen: show compact mode (page/total instead of buttons) */
      @container pagination (max-width: 480px) {
        .pagination-wrapper {
          flex-direction: row;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
        }
        
        .pagination-controls {
          flex-wrap: nowrap;
        }
        
        .pagination-container {
          flex-wrap: nowrap;
        }
        
        /* Hide page buttons, show page indicator */
        .page-buttons {
          display: none;
        }
        
        .page-indicator {
          display: flex;
        }
        
        /* Hide brackets in compact mode */
        .bracket-left,
        .bracket-right {
          display: none;
        }
        
        .pagination-meta {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--spacing-2, 0.5rem);
          width: 100%;
        }
        
        .per-page-container {
          width: 100%;
        }
        
        .page-info {
          margin-left: 0;
        }
      }
      
      /* Large screen: show full mode (page buttons) */
      @container pagination (min-width: 481px) {
        .page-buttons {
          display: flex;
          align-items: center;
          gap: var(--spacing-1, 0.25rem);
        }
        
        .page-indicator {
          display: none;
        }
      }
      
      /* Hide elements when space is constrained */
      :host([data-hide-per-page="true"]) .per-page-container {
        display: none;
      }
      
      :host([data-hide-info="true"]) .page-info {
        display: none;
      }
      
      /* Mobile-optimized touch targets */
      @media (pointer: coarse) {
        .nav-btn,
        .page-btn {
          min-height: 48px;
          min-width: 48px;
        }
        
        .page-btn {
          width: 48px;
          height: 48px;
        }
        
        .ellipsis {
          width: 48px;
          height: 48px;
        }
      }
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
    this._setupResizeObserver();
  }

  disconnectedCallback() {
    this._removeEventListeners();
    this._cleanupResizeObserver();
  }

  _setupResizeObserver() {
    if (!this._isResponsive || typeof ResizeObserver === 'undefined') {
      return;
    }
    
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this._containerWidth = width;
        this._updateResponsiveState(width);
      }
    });
    
    this._resizeObserver.observe(this);
  }

  _cleanupResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  _updateResponsiveState(width) {
    const showPerPage = !this.hasAttribute('hide-per-page');
    const showInfo = !this.hasAttribute('hide-info');
    let needsRender = false;
    
    // Auto-hide per-page selector on small screens
    const shouldHidePerPage = width < 480 && showPerPage;
    const currentHidePerPage = this.getAttribute('data-hide-per-page') === 'true';
    if (shouldHidePerPage !== currentHidePerPage) {
      if (shouldHidePerPage) {
        this.setAttribute('data-hide-per-page', 'true');
      } else {
        this.removeAttribute('data-hide-per-page');
      }
      needsRender = true;
    }
    
    // Auto-hide page info on smaller screens
    const shouldHideInfo = width < 640 && showInfo;
    const currentHideInfo = this.getAttribute('data-hide-info') === 'true';
    if (shouldHideInfo !== currentHideInfo) {
      if (shouldHideInfo) {
        this.setAttribute('data-hide-info', 'true');
      } else {
        this.removeAttribute('data-hide-info');
      }
      needsRender = true;
    }
    
    // Compact mode for very small screens - shows page/total instead of buttons
    const shouldCompactMode = width < 480;
    const currentCompactMode = this.getAttribute('data-compact-mode') === 'true';
    if (shouldCompactMode !== currentCompactMode) {
      if (shouldCompactMode) {
        this.setAttribute('data-compact-mode', 'true');
      } else {
        this.removeAttribute('data-compact-mode');
      }
      needsRender = true;
    }
    
    // Re-render if visibility changed
    if (needsRender) {
      this.render();
    }
  }

  _setupEventListeners() {
    this.shadowRoot.addEventListener('click', this._handleClick.bind(this));
    this.shadowRoot.addEventListener('change', this._handleChange.bind(this));
  }

  _removeEventListeners() {
    this.shadowRoot.removeEventListener('click', this._handleClick.bind(this));
    this.shadowRoot.removeEventListener('change', this._handleChange.bind(this));
  }

  _handleClick(event) {
    const target = event.target.closest('.nav-btn, .page-btn');
    if (!target || target.disabled) return;

    const action = target.dataset.action;
    const pageNum = parseInt(target.dataset.page, 10);

    if (action === 'first') {
      this._goToPage(1);
    } else if (action === 'prev') {
      this._goToPage(this._page - 1);
    } else if (action === 'next') {
      this._goToPage(this._page + 1);
    } else if (action === 'last') {
      this._goToPage(this._totalPages);
    } else if (!isNaN(pageNum)) {
      this._goToPage(pageNum);
    }
  }

  _handleChange(event) {
    if (event.target.classList.contains('per-page-select')) {
      const newPerPage = parseInt(event.target.value, 10);
      this._perPage = newPerPage;
      this._page = 1; // Reset to first page
      this._emitChange();
      this.render();
    }
  }

  _goToPage(page) {
    if (page < 1 || page > this._totalPages || page === this._page) return;
    
    this._page = page;
    this._emitChange();
    this.render();
  }

  _emitChange() {
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        page: this._page,
        perPage: this._perPage,
        total: this._total,
        totalPages: this._totalPages,
        startItem: (this._page - 1) * this._perPage + 1,
        endItem: Math.min(this._page * this._perPage, this._total)
      }
    }));
  }

  get _totalPages() {
    return Math.ceil(this._total / this._perPage);
  }

  _getVisiblePages() {
    const total = this._totalPages;
    const current = this._page;
    // Use responsive max visible if available, otherwise fall back to attribute
    const max = this._currentMaxVisible || this._maxVisible;

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max + 1;
    }

    const pages = [];

    // First page
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Last page
    if (end < total) {
      if (end < total - 1) {
        pages.push('...');
      }
      pages.push(total);
    }

    return pages;
  }

  render() {
    // Ensure page is within valid bounds
    const totalPages = this._totalPages || 1;
    this._page = Math.min(Math.max(this._page, 1), totalPages);

    const visiblePages = this._getVisiblePages();
    const hasFirstLast = this.hasAttribute('show-first-last');
    const showPerPage = !this.hasAttribute('hide-per-page');
    const showInfo = !this.hasAttribute('hide-info');
    const isDataHidePerPage = this.getAttribute('data-hide-per-page') === 'true';
    const isDataHideInfo = this.getAttribute('data-hide-info') === 'true';
    const isCompactMode = this.getAttribute('data-compact-mode') === 'true';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="pagination-wrapper">
        <div class="pagination-container">
          <div class="pagination-controls">
            ${hasFirstLast && !isCompactMode ? `
              <button class="nav-btn" data-action="first" ${this._page === 1 ? 'disabled' : ''} aria-label="First page">
                <span>|&lt;</span>
              </button>
            ` : ''}
            
            <button class="nav-btn" data-action="prev" ${this._page === 1 ? 'disabled' : ''} aria-label="Previous page">
              <span>&lt;</span>
            </button>
            
            <!-- Full mode: show page buttons -->
            <div class="page-buttons">
              <span class="bracket-left">[</span>
              
              ${visiblePages.map(p => {
                if (p === '...') {
                  return '<span class="ellipsis">...</span>';
                }
                return `
                  <button 
                    class="page-btn ${p === this._page ? 'active' : ''}" 
                    data-page="${p}"
                    aria-label="Page ${p}"
                    aria-current="${p === this._page ? 'page' : 'false'}"
                  >
                    ${p}
                  </button>
                `;
              }).join('')}
              
              <span class="bracket-right">]</span>
            </div>
            
            <!-- Compact mode: show page/total -->
            <div class="page-indicator">
              <span class="page-indicator-text">${this._page}/${totalPages}</span>
            </div>
            
            <button class="nav-btn" data-action="next" ${this._page === totalPages || totalPages === 0 ? 'disabled' : ''} aria-label="Next page">
              <span>&gt;</span>
            </button>
            
            ${hasFirstLast && !isCompactMode ? `
              <button class="nav-btn" data-action="last" ${this._page === totalPages || totalPages === 0 ? 'disabled' : ''} aria-label="Last page">
                <span>&gt;|</span>
              </button>
            ` : ''}
          </div>
        </div>
        
        <div class="pagination-meta">
          ${showPerPage && !isDataHidePerPage ? `
            <div class="per-page-container">
              <span class="per-page-label">Per Page</span>
              <select class="per-page-select" aria-label="Items per page">
                <option value="5" ${this._perPage === 5 ? 'selected' : ''}>5</option>
                <option value="10" ${this._perPage === 10 ? 'selected' : ''}>10</option>
                <option value="25" ${this._perPage === 25 ? 'selected' : ''}>25</option>
                <option value="50" ${this._perPage === 50 ? 'selected' : ''}>50</option>
                <option value="100" ${this._perPage === 100 ? 'selected' : ''}>100</option>
              </select>
            </div>
          ` : ''}
          
          ${showInfo && this._total > 0 && !isDataHideInfo ? `
            <span class="page-info">
              ${(this._page - 1) * this._perPage + 1}-${Math.min(this._page * this._perPage, this._total)} of ${this._total}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Update internal state from attributes before re-rendering
      if (name === 'total') {
        this._total = parseInt(newValue, 10) || 0;
      } else if (name === 'page') {
        this._page = parseInt(newValue, 10) || 1;
      } else if (name === 'per-page') {
        this._perPage = parseInt(newValue, 10) || 10;
      } else if (name === 'max-visible') {
        this._maxVisible = parseInt(newValue, 10) || 7;
      } else if (name === 'responsive') {
        this._isResponsive = newValue !== 'false';
        // Re-setup resize observer if responsive state changes
        if (this.isConnected) {
          this._cleanupResizeObserver();
          this._setupResizeObserver();
        }
      }
      // data-hide-per-page and data-hide-info are handled in render() - just trigger re-render
      this.render();
    }
  }

  // Public API
  get page() {
    return this._page;
  }

  set page(value) {
    this.setAttribute('page', value);
  }

  get perPage() {
    return this._perPage;
  }

  set perPage(value) {
    this.setAttribute('per-page', value);
  }

  get total() {
    return this._total;
  }

  set total(value) {
    this.setAttribute('total', value);
  }

  goToPage(page) {
    this._goToPage(page);
  }
}

customElements.define('pilot-pagination', PilotPagination);
