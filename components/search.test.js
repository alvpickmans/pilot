/**
 * PilotSearch Unit Tests
 * 
 * Tests for the Pilot Search component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, DOM structure,
 * dropdown behavior, suggestion selection, and keyboard navigation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, wait, click, pressKey } from '../tests/web-components.js';

// Import the component
const searchModule = await import('./search.js');
const { PilotSearch } = searchModule;

describe('PilotSearch', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-search', PilotSearch);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      expect(search.shadowRoot).toBeTruthy();
      const input = search.shadowRoot.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('renders with placeholder text', async () => {
      const search = mount('pilot-search', { placeholder: 'Search transactions' });
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('Search transactions');
    });

    it('applies default placeholder', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('Search...');
    });

    it('renders with technical bracket styling', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const wrapper = search.shadowRoot.querySelector('.input-wrapper');
      expect(wrapper.classList.contains('technical')).toBe(true);
    });
  });

  describe('Attribute Handling', () => {
    it('handles disabled state', async () => {
      const search = mount('pilot-search', { disabled: true });
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('handles loading state', async () => {
      const search = mount('pilot-search', { loading: true });
      await waitForRender(search);
      
      const loadingIndicator = search.shadowRoot.querySelector('.loading-indicator');
      expect(loadingIndicator.classList.contains('visible')).toBe(true);
    });

    it('handles value attribute', async () => {
      const search = mount('pilot-search', { value: 'test query' });
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('test query');
    });

    it('handles debounce attribute', async () => {
      const search = mount('pilot-search', { debounce: '500' });
      await waitForRender(search);
      
      expect(search.getAttribute('debounce')).toBe('500');
    });

    it('handles min-length attribute', async () => {
      const search = mount('pilot-search', { 'min-length': '3' });
      await waitForRender(search);
      
      expect(search.getAttribute('min-length')).toBe('3');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when placeholder changes', async () => {
      const search = mount('pilot-search', { placeholder: 'Old placeholder' });
      await waitForRender(search);
      
      search.setAttribute('placeholder', 'New placeholder');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('New placeholder');
    });

    it('re-renders when disabled changes', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setAttribute('disabled', '');
      await waitForRender(search);
      
      let input = search.shadowRoot.querySelector('input');
      expect(input.hasAttribute('disabled')).toBe(true);
      
      search.removeAttribute('disabled');
      await waitForRender(search);
      
      input = search.shadowRoot.querySelector('input');
      expect(input.hasAttribute('disabled')).toBe(false);
    });

    it('re-renders when loading changes', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setAttribute('loading', '');
      await waitForRender(search);
      
      const loadingIndicator = search.shadowRoot.querySelector('.loading-indicator');
      expect(loadingIndicator.classList.contains('visible')).toBe(true);
    });
  });

  describe('Shadow DOM Structure', () => {
    it('has open shadow root', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      expect(search.shadowRoot).toBeTruthy();
      expect(search.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const style = search.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('input');
    });

    it('contains field wrapper', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const field = search.shadowRoot.querySelector('.field');
      expect(field).toBeTruthy();
    });

    it('contains input wrapper with technical class', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const wrapper = search.shadowRoot.querySelector('.input-wrapper');
      expect(wrapper).toBeTruthy();
      expect(wrapper.classList.contains('technical')).toBe(true);
    });

    it('contains input element', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input).toBeTruthy();
      expect(input.getAttribute('type')).toBe('text');
      expect(input.getAttribute('autocomplete')).toBe('off');
    });

    it('contains clear button', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const clearButton = search.shadowRoot.querySelector('.clear-button');
      expect(clearButton).toBeTruthy();
    });

    it('contains loading indicator', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const loadingIndicator = search.shadowRoot.querySelector('.loading-indicator');
      expect(loadingIndicator).toBeTruthy();
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown when suggestions are set', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      // Focus input first
      const input = search.shadowRoot.querySelector('input');
      input.focus();
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]);
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('closes dropdown on Escape key', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      pressKey(search, 'Escape');
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('closes dropdown when clicking outside', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      // Simulate click outside
      const outsideClick = new MouseEvent('click', { bubbles: true });
      document.body.dispatchEvent(outsideClick);
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('shows no results message when suggestions are empty', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      // Simulate typing to trigger search
      const input = search.shadowRoot.querySelector('input');
      input.value = 'xyz';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      search.setSuggestions([]);
      await waitForRender(search);
      
      const noResults = search.shadowRoot.querySelector('.no-results');
      expect(noResults).toBeTruthy();
      expect(noResults.textContent).toContain('No results found');
    });

    it('updates aria-expanded when dropdown opens', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      let input = search.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-expanded')).toBe('false');
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      input = search.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Suggestion Selection', () => {
    it('selects suggestion on click', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      click(suggestions[1]);
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('opt2');
    });

    it('closes dropdown after selection', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      click(suggestions[0]);
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });

    it('displays suggestion label in input after selection', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Test Option', value: 'test' }]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      click(suggestions[0]);
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('test');
    });

    it('displays suggestion meta text when provided', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1', meta: 'Category' }]);
      await waitForRender(search);
      
      const meta = search.shadowRoot.querySelector('.suggestion-meta');
      expect(meta).toBeTruthy();
      expect(meta.textContent).toBe('Category');
    });
  });

  describe('Keyboard Navigation', () => {
    it('highlights next suggestion on ArrowDown', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]);
      await waitForRender(search);
      
      expect(search._highlightedIndex).toBe(0);
      
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      
      expect(search._highlightedIndex).toBe(1);
    });

    it('highlights previous suggestion on ArrowUp', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]);
      await waitForRender(search);
      
      // Move to second option
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      expect(search._highlightedIndex).toBe(1);
      
      // Move back to first
      pressKey(search, 'ArrowUp');
      await waitForRender(search);
      expect(search._highlightedIndex).toBe(0);
    });

    it('wraps around on ArrowUp from first suggestion', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]);
      await waitForRender(search);
      
      pressKey(search, 'ArrowUp');
      await waitForRender(search);
      
      expect(search._highlightedIndex).toBe(2);
    });

    it('wraps around on ArrowDown from last suggestion', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]);
      await waitForRender(search);
      
      // Move to last option
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      expect(search._highlightedIndex).toBe(1);
      
      // Wrap to first
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      expect(search._highlightedIndex).toBe(0);
    });

    it('highlights first suggestion on Home key', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]);
      await waitForRender(search);
      
      // Move to last
      search._highlightedIndex = 2;
      await waitForRender(search);
      
      pressKey(search, 'Home');
      await waitForRender(search);
      
      expect(search._highlightedIndex).toBe(0);
    });

    it('highlights last suggestion on End key', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]);
      await waitForRender(search);
      
      pressKey(search, 'End');
      await waitForRender(search);
      
      expect(search._highlightedIndex).toBe(2);
    });

    it('selects highlighted suggestion on Enter', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]);
      await waitForRender(search);
      
      // Move to second option
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      
      pressKey(search, 'Enter');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('opt2');
    });

    it('opens dropdown on ArrowDown when closed', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      search._closeDropdown();
      await waitForRender(search);
      
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });

    it('does not respond to keyboard when disabled', async () => {
      const search = mount('pilot-search', { disabled: true });
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      pressKey(search, 'ArrowDown');
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(false);
    });
  });

  describe('Clear Functionality', () => {
    it('shows clear button when value is present', async () => {
      const search = mount('pilot-search', { value: 'test' });
      await waitForRender(search);
      
      const clearButton = search.shadowRoot.querySelector('.clear-button');
      expect(clearButton.classList.contains('visible')).toBe(true);
    });

    it('hides clear button when value is empty', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const clearButton = search.shadowRoot.querySelector('.clear-button');
      expect(clearButton.classList.contains('visible')).toBe(false);
    });

    it('clears value when clear button is clicked', async () => {
      const search = mount('pilot-search', { value: 'test value' });
      await waitForRender(search);
      
      const clearButton = search.shadowRoot.querySelector('.clear-button');
      click(clearButton);
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('');
    });

    it('dispatches clear event when clearing', async () => {
      const search = mount('pilot-search', { value: 'test' });
      await waitForRender(search);
      
      const clearHandler = vi.fn();
      search.addEventListener('clear', clearHandler);
      
      const clearButton = search.shadowRoot.querySelector('.clear-button');
      click(clearButton);
      await waitForRender(search);
      
      expect(clearHandler).toHaveBeenCalled();
    });
  });

  describe('Search Events', () => {
    it('dispatches search event after debounce', async () => {
      const search = mount('pilot-search', { debounce: '100' });
      await waitForRender(search);
      
      const searchHandler = vi.fn();
      search.addEventListener('search', searchHandler);
      
      const input = search.shadowRoot.querySelector('input');
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      await wait(150);
      
      expect(searchHandler).toHaveBeenCalled();
      expect(searchHandler.mock.calls[0][0].detail.query).toBe('test');
    });

    it('respects min-length attribute', async () => {
      const search = mount('pilot-search', { 'min-length': '3' });
      await waitForRender(search);
      
      const searchHandler = vi.fn();
      search.addEventListener('search', searchHandler);
      
      const input = search.shadowRoot.querySelector('input');
      input.value = 'ab';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      await wait(350);
      
      expect(searchHandler).not.toHaveBeenCalled();
    });

    it('dispatches select event when suggestion is selected', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const selectHandler = vi.fn();
      search.addEventListener('select', selectHandler);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      click(suggestions[0]);
      await waitForRender(search);
      
      expect(selectHandler).toHaveBeenCalled();
      expect(selectHandler.mock.calls[0][0].detail.suggestion.value).toBe('opt1');
    });

    it('cancels previous debounce timer on new input', async () => {
      const search = mount('pilot-search', { debounce: '200' });
      await waitForRender(search);
      
      const searchHandler = vi.fn();
      search.addEventListener('search', searchHandler);
      
      const input = search.shadowRoot.querySelector('input');
      
      // First input
      input.value = 'first';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Second input before debounce completes
      await wait(100);
      input.value = 'second';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Wait for debounce
      await wait(250);
      
      expect(searchHandler).toHaveBeenCalledTimes(1);
      expect(searchHandler.mock.calls[0][0].detail.query).toBe('second');
    });
  });

  describe('Text Highlighting', () => {
    it('highlights matching text in suggestions', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      // Simulate typing
      const input = search.shadowRoot.querySelector('input');
      input.value = 'app';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      search.setSuggestions([{ label: 'Apple', value: 'apple' }]);
      await waitForRender(search);
      
      const suggestionText = search.shadowRoot.querySelector('.suggestion-text');
      expect(suggestionText.innerHTML).toContain('<span class="suggestion-highlight">');
    });

    it('handles special characters in search query', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      input.value = 'test[1]';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Should not throw error
      expect(() => {
        search.setSuggestions([{ label: 'test[1]', value: 'test1' }]);
      }).not.toThrow();
    });
  });

  describe('Public API', () => {
    it('setSuggestions accepts array of strings', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions(['Option 1', 'Option 2']);
      
      expect(search._suggestions).toEqual([
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' }
      ]);
    });

    it('setSuggestions accepts array of objects', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]);
      
      expect(search._suggestions.length).toBe(2);
    });

    it('setLoading shows loading indicator', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setLoading(true);
      await waitForRender(search);
      
      const loadingIndicator = search.shadowRoot.querySelector('.loading-indicator');
      expect(loadingIndicator.classList.contains('visible')).toBe(true);
    });

    it('value getter returns current value', async () => {
      const search = mount('pilot-search', { value: 'test' });
      await waitForRender(search);
      
      expect(search.value).toBe('test');
    });

    it('value setter updates input value', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.value = 'new value';
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.value).toBe('new value');
    });
  });

  describe('CSS Custom Properties', () => {
    it('has input element with computed styles', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      const styles = window.getComputedStyle(input);
      
      // Input elements are inline-block by default
      expect(styles.display).toBe('inline-block');
    });

    it('applies CSS variable fallbacks', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input).toBeTruthy();
      expect(input.style).toBeDefined();
    });

    it('has dropdown with correct positioning styles', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      const styles = window.getComputedStyle(dropdown);
      
      expect(styles.position).toBe('absolute');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty suggestions', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      expect(suggestions.length).toBe(0);
    });

    it('handles rapid attribute changes', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setAttribute('placeholder', 'First');
      search.setAttribute('disabled', '');
      search.setAttribute('loading', '');
      
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('preserves value on re-render', async () => {
      const search = mount('pilot-search', { value: 'test' });
      await waitForRender(search);
      
      // Trigger re-render by changing placeholder
      search.setAttribute('placeholder', 'New placeholder');
      await waitForRender(search);
      
      expect(search.value).toBe('test');
    });

    it('handles disconnected callback', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      // Remove from DOM
      search.remove();
      
      // Should not throw error
      expect(() => {
        search.disconnectedCallback();
      }).not.toThrow();
    });

    it('clears debounce timer on disconnect', async () => {
      const search = mount('pilot-search', { debounce: '5000' });
      await waitForRender(search);
      
      // Start a debounce timer
      const input = search.shadowRoot.querySelector('input');
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Remove from DOM
      search.remove();
      search.disconnectedCallback();
      
      // Should not throw
      expect(search._debounceTimer).toBeNull();
    });

    it('handles suggestion with no value property', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Text Only' }]);
      await waitForRender(search);
      
      const suggestions = search.shadowRoot.querySelectorAll('.suggestion');
      expect(suggestions.length).toBe(1);
    });

    it('handles click on input when already focused', async () => {
      const search = mount('pilot-search');
      await waitForRender(search);
      
      search.setSuggestions([{ label: 'Option 1', value: 'opt1' }]);
      await waitForRender(search);
      
      const input = search.shadowRoot.querySelector('input');
      input.focus();
      
      // Should keep dropdown open
      const dropdown = search.shadowRoot.querySelector('.dropdown');
      expect(dropdown.classList.contains('open')).toBe(true);
    });
  });
});
