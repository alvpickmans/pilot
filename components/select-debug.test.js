/**
 * Debug test for select component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, click } from '../tests/web-components.js';

const module = await import('./select.js');
const { PilotSelect } = module;

describe('Debug Select', () => {
  beforeEach(() => {
    registerComponent('pilot-select', PilotSelect);
  });

  afterEach(() => {
    cleanup();
  });

  it('should select option on click', async () => {
    const select = mount('pilot-select', { multiple: true }, `
      <option value="opt1">Option 1</option>
      <option value="opt2">Option 2</option>
      <option value="opt3">Option 3</option>
    `);
    await waitForRender(select);
    
    console.log('Initial value:', select.getAttribute('value'));
    console.log('Options parsed:', select._options.length);
    console.log('Filtered options:', select._filteredOptions.length);
    
    select._openDropdown();
    await waitForRender(select);
    
    console.log('Dropdown open:', select._isOpen);
    
    const options = select.shadowRoot.querySelectorAll('.option');
    console.log('Options found:', options.length);
    
    if (options[0]) {
      console.log('First option data-index:', options[0].getAttribute('data-index'));
      console.log('First option data-value:', options[0].getAttribute('data-value'));
      
      click(options[0]);
      await waitForRender(select);
      
      console.log('Value after click:', select.getAttribute('value'));
      console.log('Selected values:', select._selectedValues);
    }
    
    expect(select.getAttribute('value')).toBe('opt1');
  });
});
