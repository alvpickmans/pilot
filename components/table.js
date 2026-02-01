/**
 * Pilot Design System - Table Component (Option 2: Enhanced CSS)
 *
 * Simplified table component that applies Pilot Design System styling
 * without destroying or hiding the light DOM content. The original table
 * elements remain in the DOM and are styled via ::slotted() selectors.
 */

import { baseStyles } from './shared.js';

// ============================================
// TABLE COMPONENT
// ============================================

export class PilotTable extends HTMLElement {
  static get observedAttributes() {
    return ['bordered', 'striped', 'responsive', 'variant'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._columns = [];
    this._isEmpty = false;
    this._contentObserver = null;
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .table-wrapper {
        width: 100%;
        position: relative;
      }
      
      /* Responsive scrolling container */
      :host([responsive]) .table-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      /* ============================================
         SLOTTED TABLE STYLING
         ============================================ */
      
      ::slotted(table) {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--font-body, 'IBM Plex Sans', sans-serif);
        font-size: var(--font-size-sm, 0.875rem);
        min-width: 100%;
        margin: 0;
      }
      
      /* ============================================
         BORDERED VARIANT - Technical Borders
         ============================================ */
      
      :host([bordered]) ::slotted(table) {
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
      }
      
      :host([bordered]) ::slotted(table) th,
      :host([bordered]) ::slotted(table) td {
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
      }
      
      /* Technical variant with heavy borders */
      :host([bordered][variant="technical"]) ::slotted(table) {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      :host([bordered][variant="technical"]) ::slotted(table) th,
      :host([bordered][variant="technical"]) ::slotted(table) td {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      /* ============================================
         HEADER STYLING - Matches Navigation Component
         ============================================ */
      
      ::slotted(table) thead {
        background: var(--color-background-secondary, #f5f5f5);
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
      }
      
      /* Technical variant - matches nav-menu technical styling */
      :host([variant="technical"]) ::slotted(table) thead {
        background: var(--color-background-technical, #f5f5f5);
        border-bottom: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      ::slotted(table) th {
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        text-align: left;
        color: var(--color-text-primary, #1a1a1a);
        white-space: nowrap;
        position: relative;
        border: 1px solid transparent;
        transition: all var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      /* Technical variant headers */
      :host([variant="technical"]) ::slotted(table) th {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        background: var(--color-background-technical, #f5f5f5);
        border: 1px solid transparent;
      }
      
      /* Hover effect like nav-menu */
      ::slotted(table) th:hover {
        color: var(--color-brand-primary, #1a1a1a);
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      :host([variant="technical"]) ::slotted(table) th:hover {
        background: var(--color-background-primary, #ffffff);
        border-color: var(--color-border-technical, #1a1a1a);
      }
      
      /* Body styling */
      ::slotted(table) tbody {
        background: var(--color-background-primary, #ffffff);
      }
      
      ::slotted(table) td {
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        color: var(--color-text-primary, #1a1a1a);
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        white-space: nowrap;
      }
      
      /* Row hover effect */
      ::slotted(table) tbody tr {
        transition: background var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      ::slotted(table) tbody tr:hover {
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      /* ============================================
         STRIPED ROWS VARIANT
         ============================================ */
      
      :host([striped]) ::slotted(table) tbody tr:nth-child(even) {
        background: var(--color-background-secondary, #f5f5f5);
      }
      
      :host([striped]) ::slotted(table) tbody tr:nth-child(even):hover {
        background: var(--color-gray-100, #e5e5e5);
      }
      
      /* Technical variant striped */
      :host([striped][variant="technical"]) ::slotted(table) tbody tr:nth-child(even) {
        background: var(--color-gray-100, #e5e5e5);
      }
      
      :host([striped][variant="technical"]) ::slotted(table) tbody tr:nth-child(even):hover {
        background: var(--color-gray-200, #d4d4d4);
      }
      
      /* ============================================
         EMPTY STATE
         ============================================ */
      
      .empty-state {
        display: none;
        padding: var(--spacing-12, 3rem) var(--spacing-4, 1rem);
        text-align: center;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        background: var(--color-background-primary, #ffffff);
      }
      
      :host([empty]) .empty-state {
        display: block;
      }
      
      /* Hide slotted table when empty */
      :host([empty]) ::slotted(table) {
        display: none;
      }
      
      /* ============================================
         HEADER SLOT
         ============================================ */
      
      .header-slot {
        margin-bottom: var(--spacing-4, 1rem);
      }
      
      /* ============================================
         RESPONSIVE
         ============================================ */
      
      @media (max-width: 768px) {
        :host([responsive]) ::slotted(table) th,
        :host([responsive]) ::slotted(table) td {
          padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
          font-size: var(--font-size-xs, 0.75rem);
        }
        
        :host([responsive]) ::slotted(table) th {
          font-size: var(--font-size-xs, 0.75rem);
        }
        
        :host([responsive][variant="technical"]) ::slotted(table) th {
          font-size: var(--font-size-xs, 0.75rem);
        }
      }
    `;
  }

  connectedCallback() {
    // Wait for light DOM content to be available
    this._parseColumns();
    this._checkEmptyState();
    
    // Set up observer to detect changes in light DOM
    this._contentObserver = new MutationObserver(() => {
      this._parseColumns();
      this._checkEmptyState();
    });
    
    this._contentObserver.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    if (this._contentObserver) {
      this._contentObserver.disconnect();
    }
  }

  /**
   * Parse column metadata from thead
   * Extracts data-key and other attributes from header cells
   */
  _parseColumns() {
    const table = this.querySelector('table');
    if (!table) {
      this._columns = [];
      return;
    }

    const thead = table.querySelector('thead');
    if (thead) {
      const thElements = thead.querySelectorAll('th');
      this._columns = Array.from(thElements).map(th => ({
        key: th.dataset.key || th.textContent.trim().toLowerCase().replace(/\s+/g, '_'),
        label: th.textContent.trim(),
        type: th.dataset.type || 'text',
        sortable: th.hasAttribute('data-sortable'),
        width: th.dataset.width || null
      }));
    } else {
      // Auto-detect columns from first data row if no thead
      const firstRow = table.querySelector('tbody tr');
      if (firstRow) {
        const cells = firstRow.querySelectorAll('td');
        this._columns = Array.from(cells).map((_, index) => ({
          key: `column_${index}`,
          label: `Column ${index + 1}`,
          type: 'text',
          sortable: false,
          width: null
        }));
      }
    }

    // Store column metadata on the host for external access
    this._columns = this._columns;
  }

  /**
   * Check if the table has any data rows
   */
  _checkEmptyState() {
    const table = this.querySelector('table');
    if (!table) {
      this._isEmpty = true;
    } else {
      const tbody = table.querySelector('tbody');
      if (tbody) {
        const rows = tbody.querySelectorAll('tr');
        this._isEmpty = rows.length === 0;
      } else {
        // No tbody means empty
        this._isEmpty = true;
      }
    }

    // Toggle the empty attribute
    if (this._isEmpty) {
      this.setAttribute('empty', '');
    } else {
      this.removeAttribute('empty');
    }
  }

  /**
   * Get current column metadata
   * @returns {Array} Array of column objects
   */
  get columns() {
    return this._columns;
  }

  /**
   * Check if table is empty
   * @returns {boolean}
   */
  get isEmpty() {
    return this._isEmpty;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      
      <div class="header-slot">
        <slot name="header"></slot>
      </div>
      
      <div class="table-wrapper">
        <slot></slot>
        
        <div class="empty-state" role="status" aria-live="polite">
          No data available
        </div>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Re-check empty state when attributes change
      // (might affect visual state)
      if (name === 'empty') {
        this._checkEmptyState();
      }
    }
  }
}

// Register the custom element
customElements.define('pilot-table', PilotTable);
