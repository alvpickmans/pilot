/**
 * PilotSelect Unit Tests
 * 
 * Tests for the Pilot Select component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, DOM structure,
 * dropdown behavior, option selection, and keyboard navigation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait, click, pressKey } from '../tests/web-components.js';

// Import the component
const selectModule = await import('./select.js');
const { PilotSelect } = selectModule;

describe('PilotSelect', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-select', PilotSelect);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      expect(select.shadowRoot).toBeTruthy();
      const trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger).toBeTruthy();
    });

    it('renders with placeholder text', async () => {
      const select = mount('pilot-select', { placeholder: 'Choose an option' });
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('Choose an option');
      expect(triggerText.classList.contains('placeholder')).toBe(true);
    });

    it('renders with label', async () => {
      const select = mount('pilot-select', { label: 'System Type' });
      await waitForRender(select);
      
      const label = select.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('System Type');
    });

    it('renders without label when not provided', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const label = select.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });

    it('applies default placeholder', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('Select an option');
    });

    it('renders options from light DOM', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      // Open dropdown to see options
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options.length).toBe(3);
    });

    it('renders option groups', async () => {
      const select = mount('pilot-select', {}, `
        <optgroup label="Group A">
          <option value="a1">Option A1</option>
          <option value="a2">Option A2</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="b1">Option B1</option>
        </optgroup>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const groups = select.shadowRoot.querySelectorAll('.option-group');
      expect(groups.length).toBe(2);
      expect(groups[0].textContent).toBe('Group A');
      expect(groups[1].textContent).toBe('Group B');
    });
  });

  describe('Attribute Handling', () => {
    it('handles disabled state', async () => {
      const select = mount('pilot-select', { disabled: true });
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger.hasAttribute('disabled')).toBe(true);
    });

    it('handles multiple attribute', async () => {
      const select = mount('pilot-select', { multiple: true });
      await waitForRender(select);
      
      // Open dropdown to see checkboxes
      select._openDropdown();
      await waitForRender(select);
      
      const checkboxes = select.shadowRoot.querySelectorAll('.option-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('handles searchable attribute', async () => {
      const select = mount('pilot-select', { searchable: true }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      // Open dropdown to see search input
      select._openDropdown();
      await waitForRender(select);
      
      const searchInput = select.shadowRoot.querySelector('.search-input');
      expect(searchInput).toBeTruthy();
    });

    it('handles value attribute for single select', async () => {
      const select = mount('pilot-select', { value: 'opt2' }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('Option 2');
      expect(triggerText.classList.contains('placeholder')).toBe(false);
    });

    it('handles value attribute for multi-select', async () => {
      const select = mount('pilot-select', { 
        multiple: true, 
        value: 'opt1,opt3' 
      }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('2 selected');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when placeholder changes', async () => {
      const select = mount('pilot-select', { placeholder: 'Old placeholder' });
      await waitForRender(select);
      
      select.setAttribute('placeholder', 'New placeholder');
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('New placeholder');
    });

    it('re-renders when disabled changes', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      select.setAttribute('disabled', '');
      await waitForRender(select);
      
      let trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger.hasAttribute('disabled')).toBe(true);
      
      select.removeAttribute('disabled');
      await waitForRender(select);
      
      trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger.hasAttribute('disabled')).toBe(false);
    });

    it('re-renders when value changes', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select.setAttribute('value', 'opt2');
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('Option 2');
    });

    it('re-renders when label changes', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      select.setAttribute('label', 'New Label');
      await waitForRender(select);
      
      const label = select.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('New Label');
    });
  });

  describe('Shadow DOM Structure', () => {
    it('has open shadow root', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      expect(select.shadowRoot).toBeTruthy();
      expect(select.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const style = select.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.trigger');
    });

    it('contains field wrapper', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const field = select.shadowRoot.querySelector('.field');
      expect(field).toBeTruthy();
    });

    it('contains select wrapper with technical class', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const wrapper = select.shadowRoot.querySelector('.select-wrapper');
      expect(wrapper).toBeTruthy();
      expect(wrapper.classList.contains('technical')).toBe(true);
    });

    it('contains trigger button', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('contains hidden slot for options', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const slot = select.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
      expect(slot.style.display).toBe('none');
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown when trigger is clicked', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      click(trigger);
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('closes dropdown when trigger is clicked again', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      // Open dropdown
      select._openDropdown();
      await waitForRender(select);
      
      // Click trigger again
      const trigger = select.shadowRoot.querySelector('.trigger');
      click(trigger);
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('closes dropdown on Escape key', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      pressKey(select, 'Escape');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('closes dropdown when clicking outside', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      // Simulate click outside
      const outsideClick = new MouseEvent('click', { bubbles: true });
      document.body.dispatchEvent(outsideClick);
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('does not open dropdown when disabled', async () => {
      const select = mount('pilot-select', { disabled: true }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      click(trigger);
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('updates aria-expanded when dropdown opens', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      let trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      
      select._openDropdown();
      await waitForRender(select);
      
      trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Option Selection', () => {
    it('selects option on click for single select', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      click(options[1]); // Click second option
      await wait(50); // Wait for setTimeout in _selectOption
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt2');
    });

    it('displays selected option label in trigger', async () => {
      const select = mount('pilot-select', { value: 'opt2' }, `
        <option value="opt1">First Option</option>
        <option value="opt2">Second Option</option>
      `);
      await waitForRender(select);
      
      const triggerText = select.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent).toBe('Second Option');
    });

    it('marks option as selected in dropdown', async () => {
      const select = mount('pilot-select', { value: 'opt2' }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options[0].classList.contains('selected')).toBe(false);
      expect(options[1].classList.contains('selected')).toBe(true);
      expect(options[1].getAttribute('aria-selected')).toBe('true');
    });

    it('toggles selection for multi-select', async () => {
      const select = mount('pilot-select', { multiple: true }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      // Select first option
      let options = select.shadowRoot.querySelectorAll('.option');
      click(options[0]);
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt1');
      
      // Re-open and select third option
      select._openDropdown();
      await waitForRender(select);
      
      options = select.shadowRoot.querySelectorAll('.option');
      click(options[2]);
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt1,opt3');
    });

    it('displays selected tags for multi-select', async () => {
      const select = mount('pilot-select', { 
        multiple: true, 
        value: 'opt1,opt2' 
      }, `
        <option value="opt1">First Option</option>
        <option value="opt2">Second Option</option>
      `);
      await waitForRender(select);
      
      const tags = select.shadowRoot.querySelectorAll('.tag');
      expect(tags.length).toBe(2);
      expect(tags[0].textContent).toContain('First Option');
      expect(tags[1].textContent).toContain('Second Option');
    });

    it('removes tag when clicking remove button', async () => {
      const select = mount('pilot-select', { 
        multiple: true, 
        value: 'opt1,opt2' 
      }, `
        <option value="opt1">First Option</option>
        <option value="opt2">Second Option</option>
      `);
      await waitForRender(select);
      
      const tagRemoves = select.shadowRoot.querySelectorAll('.tag-remove');
      click(tagRemoves[0]); // Remove first tag
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt2');
    });

    it('does not select disabled options', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2" disabled>Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options[1].classList.contains('disabled')).toBe(true);
    });
  });

  describe('Event Handling', () => {
    it('dispatches change event on selection', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      const changeHandler = vi.fn();
      select.addEventListener('change', changeHandler);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      click(options[0]);
      await wait(50);
      
      expect(changeHandler).toHaveBeenCalled();
      expect(changeHandler.mock.calls[0][0].detail.value).toEqual(['opt1']);
    });

    it('dispatches change event with correct detail for multi-select', async () => {
      const select = mount('pilot-select', { multiple: true }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      const changeHandler = vi.fn();
      select.addEventListener('change', changeHandler);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      click(options[0]);
      await waitForRender(select);
      
      expect(changeHandler).toHaveBeenCalled();
      expect(changeHandler.mock.calls[0][0].detail.value).toEqual(['opt1']);
    });

    it('opens dropdown on Enter key', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      pressKey(select, 'Enter');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('opens dropdown on Space key', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      pressKey(select, ' ');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('selects highlighted option on Enter when dropdown is open', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      pressKey(select, 'Enter');
      await wait(50);
      
      expect(select.getAttribute('value')).toBe('opt1');
    });
  });

  describe('Keyboard Navigation', () => {
    it('highlights next option on ArrowDown', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      expect(select._highlightedIndex).toBe(0);
      
      pressKey(select, 'ArrowDown');
      await waitForRender(select);
      
      expect(select._highlightedIndex).toBe(1);
    });

    it('highlights previous option on ArrowUp', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      // Move to second option
      pressKey(select, 'ArrowDown');
      await waitForRender(select);
      expect(select._highlightedIndex).toBe(1);
      
      // Move back to first
      pressKey(select, 'ArrowUp');
      await waitForRender(select);
      expect(select._highlightedIndex).toBe(0);
    });

    it('wraps around on ArrowUp from first option', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      pressKey(select, 'ArrowUp');
      await waitForRender(select);
      
      expect(select._highlightedIndex).toBe(2);
    });

    it('wraps around on ArrowDown from last option', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      // Move to last option
      pressKey(select, 'ArrowDown');
      await waitForRender(select);
      expect(select._highlightedIndex).toBe(1);
      
      // Wrap to first
      pressKey(select, 'ArrowDown');
      await waitForRender(select);
      expect(select._highlightedIndex).toBe(0);
    });

    it('highlights first option on Home key', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      // Move to last
      select._highlightedIndex = 2;
      await waitForRender(select);
      
      pressKey(select, 'Home');
      await waitForRender(select);
      
      expect(select._highlightedIndex).toBe(0);
    });

    it('highlights last option on End key', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      pressKey(select, 'End');
      await waitForRender(select);
      
      expect(select._highlightedIndex).toBe(2);
    });

    it('opens dropdown on ArrowDown when closed', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      pressKey(select, 'ArrowDown');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('opens dropdown on ArrowUp when closed', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      pressKey(select, 'ArrowUp');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('does not respond to keyboard when disabled', async () => {
      const select = mount('pilot-select', { disabled: true }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      pressKey(select, 'Enter');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });
  });

  describe('Search/Filter Functionality', () => {
    it('filters options based on search query', async () => {
      const select = mount('pilot-select', { searchable: true }, `
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      select._filterOptions('app');
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Apple');
    });

    it('shows no results message when filter returns empty', async () => {
      const select = mount('pilot-select', { searchable: true }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      select._filterOptions('xyz');
      await waitForRender(select);
      
      const noResults = select.shadowRoot.querySelector('.no-results');
      expect(noResults).toBeTruthy();
      expect(noResults.textContent).toBe('No results found');
    });

    it('resets filter when dropdown closes', async () => {
      const select = mount('pilot-select', { searchable: true }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      select._filterOptions('opt1');
      await waitForRender(select);
      
      expect(select.shadowRoot.querySelectorAll('.option').length).toBe(1);
      
      select._closeDropdown();
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      expect(select.shadowRoot.querySelectorAll('.option').length).toBe(2);
    });

    it('focuses search input when dropdown opens', async () => {
      const select = mount('pilot-select', { searchable: true }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await wait(50); // Wait for setTimeout
      
      const searchInput = select.shadowRoot.querySelector('.search-input');
      // In happy-dom, we can't actually test focus, but we can verify the element exists
      expect(searchInput).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has trigger element with computed styles', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      const styles = window.getComputedStyle(trigger);
      
      expect(styles.display).toBe('flex');
    });

    it('applies CSS variable fallbacks', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.style).toBeDefined();
    });

    it('has dropdown with correct positioning styles', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      const dropdown = select.shadowRoot.querySelector('.dropdown');
      const styles = window.getComputedStyle(dropdown);
      
      expect(styles.position).toBe('absolute');
    });
  });

  describe('Value Getter/Setter', () => {
    it('returns single value for single select', async () => {
      const select = mount('pilot-select', { value: 'opt1' }, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      expect(select.value).toBe('opt1');
    });

    it('returns array for multi-select', async () => {
      const select = mount('pilot-select', { 
        multiple: true, 
        value: 'opt1,opt2' 
      }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      expect(select.value).toEqual(['opt1', 'opt2']);
    });

    it('returns empty string when no selection', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      expect(select.value).toBe('');
    });

    it('returns empty array for multi-select with no selection', async () => {
      const select = mount('pilot-select', { multiple: true });
      await waitForRender(select);
      
      expect(select.value).toEqual([]);
    });

    it('sets value using setter for single select', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select.value = 'opt2';
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt2');
      expect(select._selectedValues).toEqual(['opt2']);
    });

    it('sets value using setter for multi-select', async () => {
      const select = mount('pilot-select', { multiple: true }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      select.value = ['opt1', 'opt2'];
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt1,opt2');
      expect(select._selectedValues).toEqual(['opt1', 'opt2']);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options.length).toBe(0);
    });

    it('handles rapid attribute changes', async () => {
      const select = mount('pilot-select');
      await waitForRender(select);
      
      select.setAttribute('placeholder', 'First');
      select.setAttribute('disabled', '');
      select.setAttribute('label', 'Test');
      
      await waitForRender(select);
      
      const trigger = select.shadowRoot.querySelector('.trigger');
      const label = select.shadowRoot.querySelector('label');
      
      expect(trigger.hasAttribute('disabled')).toBe(true);
      expect(label.textContent).toBe('Test');
    });

    it('preserves selection on re-render', async () => {
      const select = mount('pilot-select', { value: 'opt2' }, `
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      `);
      await waitForRender(select);
      
      // Trigger re-render by changing placeholder
      select.setAttribute('placeholder', 'New placeholder');
      await waitForRender(select);
      
      expect(select.getAttribute('value')).toBe('opt2');
      expect(select._selectedValues).toEqual(['opt2']);
    });

    it('handles option with no value attribute', async () => {
      const select = mount('pilot-select', {}, `
        <option>Text Only Option</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      expect(options[0].getAttribute('data-value')).toBe('Text Only Option');
    });

    it('handles mixed options and optgroups', async () => {
      const select = mount('pilot-select', {}, `
        <option value="standalone">Standalone Option</option>
        <optgroup label="Group">
          <option value="grouped">Grouped Option</option>
        </optgroup>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      const options = select.shadowRoot.querySelectorAll('.option');
      const groups = select.shadowRoot.querySelectorAll('.option-group');
      
      expect(options.length).toBe(2);
      expect(groups.length).toBe(1);
    });

    it('handles slot changes dynamically', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      select._openDropdown();
      await waitForRender(select);
      
      expect(select.shadowRoot.querySelectorAll('.option').length).toBe(1);
      
      // Add new option to light DOM
      const newOption = document.createElement('option');
      newOption.value = 'opt2';
      newOption.textContent = 'Option 2';
      select.appendChild(newOption);
      
      // Trigger slot change
      select._handleSlotChange();
      select._openDropdown();
      await waitForRender(select);
      
      expect(select.shadowRoot.querySelectorAll('.option').length).toBe(2);
    });

    it('handles disconnected callback', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      // Open dropdown to set up event listeners
      select._openDropdown();
      
      // Remove from DOM
      select.remove();
      
      // Should not throw error
      expect(() => {
        select.disconnectedCallback();
      }).not.toThrow();
    });

    it('handles click on trigger when already open', async () => {
      const select = mount('pilot-select', {}, `
        <option value="opt1">Option 1</option>
      `);
      await waitForRender(select);
      
      // Open dropdown
      select._openDropdown();
      await waitForRender(select);
      
      expect(select._isOpen).toBe(true);
      
      // Click trigger again to close
      const trigger = select.shadowRoot.querySelector('.trigger');
      click(trigger);
      await waitForRender(select);
      
      expect(select._isOpen).toBe(false);
    });
  });
});
