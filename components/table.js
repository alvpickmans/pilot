/**
 * Pilot Design System - Table Component
 *
 * Data table with sortable columns, row selection, and technical borders.
 * Essential for displaying transaction lists, account summaries, and financial data.
 */

import { baseStyles } from './shared.js';

// ============================================
// TABLE COMPONENT
// ============================================

export class PilotTable extends HTMLElement {
  static get observedAttributes() {
    return ['sortable', 'selectable', 'striped', 'bordered', 'sort-column', 'sort-direction'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._sortColumn = this.getAttribute('sort-column') || '';
    this._sortDirection = this.getAttribute('sort-direction') || 'asc';
    this._selectedRows = new Set();
    this._data = [];
    this._columns = [];
    
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .table-container {
        width: 100%;
        overflow-x: auto;
        position: relative;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        min-width: 100%;
      }
      
      /* Technical border styling */
      :host([bordered]) table {
        border: 1.5px solid #1a1a1a;
      }
      
      :host([bordered]) th,
      :host([bordered]) td {
        border: 1px solid #b3b3b3;
      }
      
      /* Header styling */
      thead {
        background: #f5f5f5;
        border-bottom: 1.5px solid #1a1a1a;
      }
      
      th {
        padding: 0.75rem 1rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: left;
        color: #525252;
        white-space: nowrap;
        position: relative;
      }
      
      th.checkbox-cell {
        width: 48px;
        text-align: center;
      }
      
      /* Sortable headers */
      th.sortable {
        cursor: pointer;
        user-select: none;
        transition: background 150ms;
      }
      
      th.sortable:hover {
        background: #f0f0f0;
      }
      
      th.sortable .th-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .sort-indicator {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        line-height: 0.5;
        color: #6b6b6b;
        opacity: 0.3;
        transition: opacity 150ms;
      }
      
      th.sortable:hover .sort-indicator,
      th.sorted .sort-indicator {
        opacity: 1;
      }
      
      th.sorted .sort-indicator {
        color: #1a1a1a;
      }
      
      .sort-indicator .asc,
      .sort-indicator .desc {
        display: block;
        height: 8px;
      }
      
      .sort-indicator.ascending .asc,
      .sort-indicator.descending .desc {
        color: #1a1a1a;
        font-weight: 700;
      }
      
      /* Body styling */
      tbody {
        background: #ffffff;
      }
      
      td {
        padding: 0.75rem 1rem;
        color: #1a1a1a;
        border-bottom: 1px solid #d4d4d4;
        white-space: nowrap;
      }
      
      td.checkbox-cell {
        width: 48px;
        text-align: center;
      }
      
      /* Row states */
      tbody tr {
        transition: background 150ms;
      }
      
      tbody tr:hover {
        background: #f5f5f5;
      }
      
      /* Striped rows */
      :host([striped]) tbody tr:nth-child(even) {
        background: #f5f5f5;
      }
      
      :host([striped]) tbody tr:nth-child(even):hover {
        background: #f0f0f0;
      }
      
      /* Selected rows */
      tbody tr.selected {
        background: #f0f0f0;
      }
      
      tbody tr.selected td {
        border-bottom-color: #f59e0b;
      }
      
      /* Selection styling */
      :host([selectable]) tbody tr {
        cursor: pointer;
      }
      
      /* Checkbox styling */
      .row-checkbox {
        width: 18px;
        height: 18px;
        border: 1px solid #b3b3b3;
        border-radius: 0;
        background: #ffffff;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        transition: all 150ms;
      }
      
      .row-checkbox:checked {
        background: #1a1a1a;
        border-color: #1a1a1a;
      }
      
      .row-checkbox:checked::after {
        content: '✓';
        color: #ffffff;
        font-size: 0.75rem;
        font-weight: 700;
      }
      
      .row-checkbox:focus {
        outline: 2px solid #f59e0b;
        outline-offset: 2px;
      }
      
      /* Empty state */
      .empty-state {
        padding: 3rem 1rem;
        text-align: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        color: #6b6b6b;
        border-bottom: 1px solid #d4d4d4;
      }
      
      /* Header slot */
      .header-slot {
        margin-bottom: 1rem;
      }
      
      /* Focus states */
      th:focus-visible,
      td:focus-visible {
        outline: 2px solid #f59e0b;
        outline-offset: -2px;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .table-container {
          -webkit-overflow-scrolling: touch;
        }
        
        th, td {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
        }
        
        th {
          font-size: 0.75rem;
        }
      }
    `;
  }

  connectedCallback() {
    this._setupEventListeners();
    this._parseColumns();
    this._parseData();
    this.render();
  }

  disconnectedCallback() {
    this._removeEventListeners();
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
    const th = event.target.closest('th.sortable');
    if (th) {
      const column = th.dataset.column;
      this._sort(column);
      return;
    }

    // Handle row click for selection (if not clicking checkbox directly)
    if (this.hasAttribute('selectable')) {
      const tr = event.target.closest('tbody tr');
      if (tr && !event.target.closest('.row-checkbox')) {
        const index = parseInt(tr.dataset.index, 10);
        this._toggleRowSelection(index);
      }
    }
  }

  _handleChange(event) {
    if (event.target.classList.contains('row-checkbox')) {
      const index = parseInt(event.target.dataset.index, 10);
      const isHeaderCheckbox = event.target.classList.contains('header-checkbox');
      
      if (isHeaderCheckbox) {
        this._toggleAllRows(event.target.checked);
      } else {
        this._toggleRowSelection(index, event.target.checked);
      }
    }
  }

  _parseColumns() {
    // Parse columns from thead > tr > th elements
    const thead = this.querySelector('thead');
    if (thead) {
      const thElements = thead.querySelectorAll('th');
      this._columns = Array.from(thElements).map(th => ({
        key: th.dataset.key || th.textContent.trim().toLowerCase().replace(/\s+/g, '_'),
        label: th.textContent.trim(),
        sortable: th.hasAttribute('data-sortable') || this.hasAttribute('sortable'),
        type: th.dataset.type || 'text'
      }));
    } else {
      // Auto-detect columns from first data row
      const firstRow = this.querySelector('tbody tr');
      if (firstRow) {
        const cells = firstRow.querySelectorAll('td');
        this._columns = Array.from(cells).map((_, index) => ({
          key: `column_${index}`,
          label: `Column ${index + 1}`,
          sortable: this.hasAttribute('sortable'),
          type: 'text'
        }));
      }
    }
  }

  _parseData() {
    const tbody = this.querySelector('tbody');
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      this._data = Array.from(rows).map((row, index) => {
        const cells = row.querySelectorAll('td');
        const rowData = { _index: index };
        
        this._columns.forEach((col, colIndex) => {
          const cell = cells[colIndex];
          rowData[col.key] = cell ? cell.textContent.trim() : '';
          rowData[`_cell_${colIndex}`] = cell ? cell.innerHTML : '';
        });
        
        return rowData;
      });
    }
  }

  _sort(column) {
    if (!this.hasAttribute('sortable')) return;
    
    // Toggle direction if same column
    if (this._sortColumn === column) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortColumn = column;
      this._sortDirection = 'asc';
    }
    
    // Update attributes
    this.setAttribute('sort-column', this._sortColumn);
    this.setAttribute('sort-direction', this._sortDirection);
    
    // Sort the data
    this._data.sort((a, b) => {
      let aVal = a[column] || '';
      let bVal = b[column] || '';
      
      // Try numeric sort
      const aNum = parseFloat(aVal);
      const bNum = parseFloat(bVal);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return this._sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // String sort
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
      
      if (aVal < bVal) return this._sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this._sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    // Emit event
    this.dispatchEvent(new CustomEvent('sort', {
      bubbles: true,
      composed: true,
      detail: {
        column: this._sortColumn,
        direction: this._sortDirection
      }
    }));
    
    this.render();
  }

  _toggleRowSelection(index, forceState = null) {
    const selectable = this.getAttribute('selectable') || 'none';
    if (selectable === 'none') return;
    
    const isSelected = this._selectedRows.has(index);
    const shouldSelect = forceState !== null ? forceState : !isSelected;
    
    if (selectable === 'single') {
      // Clear all selections for single select
      this._selectedRows.clear();
      if (shouldSelect) {
        this._selectedRows.add(index);
      }
    } else {
      // Multi select
      if (shouldSelect) {
        this._selectedRows.add(index);
      } else {
        this._selectedRows.delete(index);
      }
    }
    
    // Update visual state without full re-render
    this._updateSelectionVisuals();
    
    // Emit event
    this.dispatchEvent(new CustomEvent('selection-change', {
      bubbles: true,
      composed: true,
      detail: {
        selectedRows: Array.from(this._selectedRows),
        selectedData: Array.from(this._selectedRows).map(i => this._data[i])
      }
    }));
  }

  _toggleAllRows(selectAll) {
    if (selectAll) {
      this._data.forEach((_, index) => this._selectedRows.add(index));
    } else {
      this._selectedRows.clear();
    }
    
    this._updateSelectionVisuals();
    
    this.dispatchEvent(new CustomEvent('selection-change', {
      bubbles: true,
      composed: true,
      detail: {
        selectedRows: Array.from(this._selectedRows),
        selectedData: Array.from(this._selectedRows).map(i => this._data[i])
      }
    }));
  }

  _updateSelectionVisuals() {
    const rows = this.shadowRoot.querySelectorAll('tbody tr');
    const headerCheckbox = this.shadowRoot.querySelector('.header-checkbox');
    
    rows.forEach((row, index) => {
      const checkbox = row.querySelector('.row-checkbox');
      const isSelected = this._selectedRows.has(parseInt(row.dataset.index, 10));
      
      row.classList.toggle('selected', isSelected);
      if (checkbox) {
        checkbox.checked = isSelected;
      }
    });
    
    if (headerCheckbox) {
      const allSelected = this._data.length > 0 && this._selectedRows.size === this._data.length;
      headerCheckbox.checked = allSelected;
      headerCheckbox.indeterminate = this._selectedRows.size > 0 && !allSelected;
    }
  }

  render() {
    const sortable = this.hasAttribute('sortable');
    const selectable = this.getAttribute('selectable') || 'none';
    const striped = this.hasAttribute('striped');
    const bordered = this.hasAttribute('bordered');
    
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      
      <div class="header-slot">
        <slot name="header"></slot>
      </div>
      
      <div class="table-container">
        <table role="grid" aria-rowcount="${this._data.length + 1}">
          <thead>
            <tr role="row">
              ${selectable !== 'none' ? `
                <th class="checkbox-cell" role="columnheader" scope="col">
                  ${selectable === 'multi' ? `
                    <input 
                      type="checkbox" 
                      class="row-checkbox header-checkbox"
                      aria-label="Select all rows"
                      ${this._selectedRows.size === this._data.length && this._data.length > 0 ? 'checked' : ''}
                    />
                  ` : ''}
                </th>
              ` : ''}
              
              ${this._columns.map(col => `
                <th 
                  class="${sortable && col.sortable ? 'sortable' : ''} ${this._sortColumn === col.key ? 'sorted' : ''}"
                  data-column="${col.key}"
                  role="columnheader"
                  scope="col"
                  aria-sort="${this._sortColumn === col.key ? (this._sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}"
                >
                  <div class="th-content">
                    <span>${col.label}</span>
                    ${sortable && col.sortable ? `
                      <span class="sort-indicator ${this._sortColumn === col.key ? this._sortDirection : ''}">
                        <span class="asc">▲</span>
                        <span class="desc">▼</span>
                      </span>
                    ` : ''}
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          
          <tbody>
            ${this._data.length === 0 ? `
              <tr role="row">
                <td 
                  colspan="${this._columns.length + (selectable !== 'none' ? 1 : 0)}"
                  class="empty-state"
                  role="gridcell"
                >
                  No data available
                </td>
              </tr>
            ` : this._data.map((row, index) => `
              <tr 
                role="row"
                data-index="${index}"
                class="${this._selectedRows.has(index) ? 'selected' : ''}"
                aria-selected="${this._selectedRows.has(index)}"
              >
                ${selectable !== 'none' ? `
                  <td class="checkbox-cell" role="gridcell">
                    <input 
                      type="checkbox" 
                      class="row-checkbox"
                      data-index="${index}"
                      aria-label="Select row ${index + 1}"
                      ${this._selectedRows.has(index) ? 'checked' : ''}
                    />
                  </td>
                ` : ''}
                
                ${this._columns.map((col, colIndex) => `
                  <td role="gridcell" data-column="${col.key}">
                    ${row[`_cell_${colIndex}`] || row[col.key] || ''}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <slot></slot>
    `;
    
    this._attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'sort-column') {
        this._sortColumn = newValue || '';
        this.render();
      } else if (name === 'sort-direction') {
        this._sortDirection = newValue || 'asc';
        this.render();
      } else {
        // Re-parse data when structural attributes change
        this._parseData();
        this.render();
      }
    }
  }

  // Public API
  get selectedRows() {
    return Array.from(this._selectedRows);
  }

  set selectedRows(indices) {
    this._selectedRows = new Set(indices);
    this._updateSelectionVisuals();
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = newData.map((row, index) => ({
      ...row,
      _index: index
    }));
    this._selectedRows.clear();
    this.render();
  }

  clearSelection() {
    this._selectedRows.clear();
    this._updateSelectionVisuals();
  }

  selectAll() {
    this._data.forEach((_, index) => this._selectedRows.add(index));
    this._updateSelectionVisuals();
  }
}

customElements.define('pilot-table', PilotTable);
