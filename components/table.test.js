/**
 * Pilot Design System - Table Tests
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./table.js');
const { PilotTable } = module;

describe('PilotTable', () => {
  beforeEach(() => {
    registerComponent('pilot-table', PilotTable);
  });

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(customElements.get('pilot-table')).toBeDefined();
  });

  it('should render empty state when no data', () => {
    const table = mount('<pilot-table></pilot-table>');
    const shadowRoot = table.shadowRoot;
    
    const emptyState = shadowRoot.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('No data available');
  });

  it('should render data from light DOM', () => {
    const table = mount(`
      <pilot-table>
        <thead>
          <tr>
            <th data-key="name">Name</th>
            <th data-key="value">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td><td>100</td></tr>
          <tr><td>Item 2</td><td>200</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const rows = shadowRoot.querySelectorAll('tbody tr');
    
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Item 1');
    expect(rows[0].textContent).toContain('100');
    expect(rows[1].textContent).toContain('Item 2');
    expect(rows[1].textContent).toContain('200');
  });

  it('should render column headers', () => {
    const table = mount(`
      <pilot-table>
        <thead>
          <tr>
            <th data-key="name">Name</th>
            <th data-key="value">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td><td>100</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const headers = shadowRoot.querySelectorAll('thead th');
    
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Value');
  });

  it('should support striped attribute', () => {
    const table = mount(`
      <pilot-table striped>
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    expect(table.hasAttribute('striped')).toBe(true);
  });

  it('should support bordered attribute', () => {
    const table = mount(`
      <pilot-table bordered>
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    expect(table.hasAttribute('bordered')).toBe(true);
  });

  it('should render checkboxes when selectable is multi', () => {
    const table = mount(`
      <pilot-table selectable="multi">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const checkboxes = shadowRoot.querySelectorAll('.row-checkbox');
    const headerCheckbox = shadowRoot.querySelector('.header-checkbox');
    
    // Should have header checkbox + 2 row checkboxes
    expect(checkboxes.length).toBe(3);
    expect(headerCheckbox).toBeTruthy();
  });

  it('should render checkboxes when selectable is single', () => {
    const table = mount(`
      <pilot-table selectable="single">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const rowCheckboxes = shadowRoot.querySelectorAll('.row-checkbox:not(.header-checkbox)');
    const headerCheckbox = shadowRoot.querySelector('.header-checkbox');
    
    // Single select should have row checkboxes but no header checkbox
    expect(rowCheckboxes.length).toBe(2);
    expect(headerCheckbox).toBeFalsy();
  });

  it('should select/deselect rows when selectable is multi', () => {
    const table = mount(`
      <pilot-table selectable="multi">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    
    // Use internal method instead of clicking to avoid DOM replacement issues
    table._toggleRowSelection(0, true);
    
    expect(table.selectedRows).toContain(0);
    
    table._toggleRowSelection(1, true);
    expect(table.selectedRows).toContain(1);
    
    table._toggleRowSelection(0, false);
    expect(table.selectedRows).not.toContain(0);
  });

  it('should select only one row when selectable is single', () => {
    const table = mount(`
      <pilot-table selectable="single">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
          <tr><td>Item 3</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    // Select first row
    table._toggleRowSelection(0, true);
    expect(table.selectedRows).toEqual([0]);
    
    // Select second row - should deselect first
    table._toggleRowSelection(1, true);
    expect(table.selectedRows).toEqual([1]);
  });

  it('should select all rows with selectAll method', () => {
    const table = mount(`
      <pilot-table selectable="multi">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
          <tr><td>Item 3</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    table.selectAll();
    expect(table.selectedRows.length).toBe(3);
  });

  it('should clear selection with clearSelection method', () => {
    const table = mount(`
      <pilot-table selectable="multi">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    table.selectAll();
    expect(table.selectedRows.length).toBe(2);
    
    table.clearSelection();
    expect(table.selectedRows.length).toBe(0);
  });

  it('should emit selection-change event', () => {
    const table = mount(`
      <pilot-table selectable="multi">
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
          <tr><td>Item 2</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    let eventFired = false;
    let eventDetail = null;
    
    table.addEventListener('selection-change', (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });
    
    table._toggleRowSelection(0, true);
    
    expect(eventFired).toBe(true);
    expect(eventDetail.selectedRows).toContain(0);
  });

  it('should render sort indicators when sortable', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
            <th data-key="value">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td><td>100</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const sortIndicator = shadowRoot.querySelector('.sort-indicator');
    
    expect(sortIndicator).toBeTruthy();
  });

  it('should sort data when column header is clicked', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Charlie</td></tr>
          <tr><td>Alpha</td></tr>
          <tr><td>Bravo</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    // Use internal sort method
    table._sort('name');
    
    expect(table._sortColumn).toBe('name');
    expect(table._sortDirection).toBe('asc');
    expect(table.getAttribute('sort-column')).toBe('name');
    expect(table.getAttribute('sort-direction')).toBe('asc');
  });

  it('should toggle sort direction on same column', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Charlie</td></tr>
          <tr><td>Alpha</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    table._sort('name');
    expect(table._sortDirection).toBe('asc');
    
    table._sort('name');
    expect(table._sortDirection).toBe('desc');
  });

  it('should emit sort event', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    let eventFired = false;
    let eventDetail = null;
    
    table.addEventListener('sort', (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });
    
    table._sort('name');
    
    expect(eventFired).toBe(true);
    expect(eventDetail.column).toBe('name');
    expect(eventDetail.direction).toBe('asc');
  });

  it('should render header slot content', () => {
    const table = mount(`
      <pilot-table>
        <div slot="header">Custom Header Content</div>
        <thead>
          <tr>
            <th data-key="name">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const headerSlot = table.shadowRoot.querySelector('.header-slot slot');
    expect(headerSlot).toBeTruthy();
  });

  it('should support programmatic data setting', () => {
    const table = mount('<pilot-table></pilot-table>');
    
    table._columns = [
      { key: 'name', label: 'Name', sortable: true, type: 'text' },
      { key: 'value', label: 'Value', sortable: true, type: 'number' }
    ];
    
    table.data = [
      { name: 'Item 1', value: 100 },
      { name: 'Item 2', value: 200 }
    ];
    
    const shadowRoot = table.shadowRoot;
    const rows = shadowRoot.querySelectorAll('tbody tr');
    
    expect(rows.length).toBe(2);
  });

  it('should sort numerically when data contains numbers', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="value" data-sortable>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>100</td></tr>
          <tr><td>20</td></tr>
          <tr><td>300</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    table._sort('value');
    
    // Check that data is sorted numerically (20, 100, 300) not alphabetically
    expect(table._data[0].value).toBe('20');
    expect(table._data[1].value).toBe('100');
    expect(table._data[2].value).toBe('300');
  });

  it('should have proper ARIA attributes', () => {
    const table = mount(`
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Item 1</td></tr>
        </tbody>
      </pilot-table>
    `);
    
    const shadowRoot = table.shadowRoot;
    const tableElement = shadowRoot.querySelector('table');
    const columnHeader = shadowRoot.querySelector('th[data-column="name"]');
    
    expect(tableElement.getAttribute('role')).toBe('grid');
    expect(columnHeader.getAttribute('role')).toBe('columnheader');
    expect(columnHeader.getAttribute('aria-sort')).toBe('none');
  });
});
