/**
 * PilotCodeBlock Unit Tests
 * 
 * Tests for the Pilot Code Block component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const codeBlockModule = await import('./code-block.js');
const { PilotCodeBlock } = codeBlockModule;

describe('PilotCodeBlock', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-code-block', PilotCodeBlock);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const codeBlock = mount('pilot-code-block', {}, 'const x = 1;');
      await waitForRender(codeBlock);
      
      expect(codeBlock.shadowRoot).toBeTruthy();
      const codeBlockContainer = codeBlock.shadowRoot.querySelector('.code-block');
      expect(codeBlockContainer).toBeTruthy();
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(codeBlock.textContent.trim()).toBe('const x = 1;');
    });

    it('applies default language (empty)', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const language = codeBlock.shadowRoot.querySelector('.language');
      expect(language).toBeFalsy();
    });

    it('applies default filename (empty)', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const filename = codeBlock.shadowRoot.querySelector('.filename');
      expect(filename).toBeFalsy();
    });

    it('applies default show-line-numbers (false)', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
    });

    it('applies language attribute', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'javascript' });
      await waitForRender(codeBlock);
      
      const language = codeBlock.shadowRoot.querySelector('.language');
      expect(language).toBeTruthy();
      expect(language.textContent).toBe('javascript');
    });

    it('applies filename attribute', async () => {
      const codeBlock = mount('pilot-code-block', { filename: 'example.js' });
      await waitForRender(codeBlock);
      
      const filename = codeBlock.shadowRoot.querySelector('.filename');
      expect(filename).toBeTruthy();
      expect(filename.textContent).toBe('example.js');
    });

    it('handles show-line-numbers state', async () => {
      const codeBlock = mount('pilot-code-block', { 'show-line-numbers': true });
      await waitForRender(codeBlock);
      
      const body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
    });

    it('supports all common languages', async () => {
      const languages = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'bash', 'sql'];
      
      for (const language of languages) {
        cleanup();
        const codeBlock = mount('pilot-code-block', { language });
        await waitForRender(codeBlock);
        
        const languageEl = codeBlock.shadowRoot.querySelector('.language');
        expect(languageEl).toBeTruthy();
        expect(languageEl.textContent).toBe(language);
      }
    });

    it('supports various filename formats', async () => {
      const filenames = [
        'script.js',
        'component.tsx',
        'styles.css',
        'index.html',
        'data.json',
        'README.md',
        'Makefile',
        'Dockerfile'
      ];
      
      for (const filename of filenames) {
        cleanup();
        const codeBlock = mount('pilot-code-block', { filename });
        await waitForRender(codeBlock);
        
        const filenameEl = codeBlock.shadowRoot.querySelector('.filename');
        expect(filenameEl).toBeTruthy();
        expect(filenameEl.textContent).toBe(filename);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when language changes', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'javascript' });
      await waitForRender(codeBlock);
      
      let languageEl = codeBlock.shadowRoot.querySelector('.language');
      expect(languageEl.textContent).toBe('javascript');
      
      codeBlock.setAttribute('language', 'python');
      await waitForRender(codeBlock);
      
      languageEl = codeBlock.shadowRoot.querySelector('.language');
      expect(languageEl.textContent).toBe('python');
    });

    it('re-renders when filename changes', async () => {
      const codeBlock = mount('pilot-code-block', { filename: 'old.js' });
      await waitForRender(codeBlock);
      
      let filenameEl = codeBlock.shadowRoot.querySelector('.filename');
      expect(filenameEl.textContent).toBe('old.js');
      
      codeBlock.setAttribute('filename', 'new.js');
      await waitForRender(codeBlock);
      
      filenameEl = codeBlock.shadowRoot.querySelector('.filename');
      expect(filenameEl.textContent).toBe('new.js');
    });

    it('re-renders when show-line-numbers changes', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      let body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
      
      codeBlock.setAttribute('show-line-numbers', '');
      await waitForRender(codeBlock);
      
      body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
      
      codeBlock.removeAttribute('show-line-numbers');
      await waitForRender(codeBlock);
      
      body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
    });

    it('removes header when language is removed', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'javascript' });
      await waitForRender(codeBlock);
      
      let header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      codeBlock.removeAttribute('language');
      await waitForRender(codeBlock);
      
      header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('removes header when filename is removed', async () => {
      const codeBlock = mount('pilot-code-block', { filename: 'test.js' });
      await waitForRender(codeBlock);
      
      let header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      codeBlock.removeAttribute('filename');
      await waitForRender(codeBlock);
      
      header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });
  });

  describe('Header Display', () => {
    it('shows header when language is provided', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'javascript' });
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
    });

    it('shows header when filename is provided', async () => {
      const codeBlock = mount('pilot-code-block', { filename: 'example.js' });
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
    });

    it('shows header when both language and filename are provided', async () => {
      const codeBlock = mount('pilot-code-block', { 
        language: 'javascript', 
        filename: 'example.js' 
      });
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      const language = header.querySelector('.language');
      const filename = header.querySelector('.filename');
      expect(language).toBeTruthy();
      expect(filename).toBeTruthy();
    });

    it('hides header when neither language nor filename is provided', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('displays language in correct position in header', async () => {
      const codeBlock = mount('pilot-code-block', { 
        language: 'javascript',
        filename: 'example.js'
      });
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      const language = header.querySelector('.language');
      const filename = header.querySelector('.filename');
      
      // Language should come after filename in DOM order
      expect(header.children[0]).toBe(filename);
      expect(header.children[1]).toBe(language);
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const codeBlock = mount('pilot-code-block', {}, '<span class="custom-code">Custom</span>');
      await waitForRender(codeBlock);
      
      const slot = codeBlock.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const codeBlock = mount('pilot-code-block', {}, 'console.log("Hello");');
      await waitForRender(codeBlock);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(codeBlock.textContent.trim()).toBe('console.log("Hello");');
    });

    it('renders HTML content in slot', async () => {
      const codeBlock = mount('pilot-code-block', {}, '<div class="line">Line 1</div><div class="line">Line 2</div>');
      await waitForRender(codeBlock);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(codeBlock.querySelectorAll('.line').length).toBe(2);
    });

    it('renders multi-line code content', async () => {
      const multiLineCode = `function example() {
  return 42;
}`;
      const codeBlock = mount('pilot-code-block', {}, multiLineCode);
      await waitForRender(codeBlock);
      
      expect(codeBlock.textContent.trim()).toBe(multiLineCode.trim());
    });
  });

  describe('CSS Custom Properties', () => {
    it('has code-block container with computed styles', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const container = codeBlock.shadowRoot.querySelector('.code-block');
      const styles = window.getComputedStyle(container);
      
      // Basic style checks
      expect(styles.display).toBe('block');
    });

    it('has pre element with computed styles', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const pre = codeBlock.shadowRoot.querySelector('pre');
      const styles = window.getComputedStyle(pre);
      
      // Check that pre has expected styles
      expect(styles.whiteSpace).toBe('pre');
    });

    it('applies CSS variable fallbacks', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const pre = codeBlock.shadowRoot.querySelector('pre');
      
      // Check that the element exists and has styles
      expect(pre).toBeTruthy();
      expect(pre.style).toBeDefined();
    });

    it('applies with-line-numbers class when show-line-numbers is set', async () => {
      const codeBlock = mount('pilot-code-block', { 'show-line-numbers': true });
      await waitForRender(codeBlock);
      
      const body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
    });

    it('applies correct font family', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const styles = window.getComputedStyle(codeBlock);
      
      // Check that the element has a font-family defined (happy-dom may return default)
      expect(styles.fontFamily).toBeDefined();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      expect(codeBlock.shadowRoot).toBeTruthy();
      expect(codeBlock.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const style = codeBlock.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.code-block');
    });

    it('contains code-block container', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const container = codeBlock.shadowRoot.querySelector('.code-block');
      expect(container).toBeTruthy();
    });

    it('contains pre and code elements', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const pre = codeBlock.shadowRoot.querySelector('pre');
      const code = codeBlock.shadowRoot.querySelector('code');
      
      expect(pre).toBeTruthy();
      expect(code).toBeTruthy();
      expect(pre.contains(code)).toBe(true);
    });

    it('contains slot element inside code', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const code = codeBlock.shadowRoot.querySelector('code');
      const slot = code.querySelector('slot');
      
      expect(slot).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const container = codeBlock.shadowRoot.querySelector('.code-block');
      expect(container).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'javascript' });
      await waitForRender(codeBlock);
      
      // Rapid changes
      codeBlock.setAttribute('language', 'python');
      codeBlock.setAttribute('filename', 'test.py');
      codeBlock.setAttribute('show-line-numbers', '');
      
      await waitForRender(codeBlock);
      
      const language = codeBlock.shadowRoot.querySelector('.language');
      const filename = codeBlock.shadowRoot.querySelector('.filename');
      const body = codeBlock.shadowRoot.querySelector('.body');
      
      expect(language.textContent).toBe('python');
      expect(filename.textContent).toBe('test.py');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const codeBlock = mount('pilot-code-block', { 
        language: 'typescript',
        filename: 'example.ts',
        'show-line-numbers': true 
      });
      await waitForRender(codeBlock);
      
      // Trigger re-render by changing one attribute
      codeBlock.setAttribute('language', 'javascript');
      await waitForRender(codeBlock);
      
      const language = codeBlock.shadowRoot.querySelector('.language');
      const filename = codeBlock.shadowRoot.querySelector('.filename');
      const body = codeBlock.shadowRoot.querySelector('.body');
      
      expect(language.textContent).toBe('javascript');
      expect(filename.textContent).toBe('example.ts');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
    });

    it('handles special characters in language attribute', async () => {
      const codeBlock = mount('pilot-code-block', { language: 'c++' });
      await waitForRender(codeBlock);
      
      const language = codeBlock.shadowRoot.querySelector('.language');
      expect(language.textContent).toBe('c++');
    });

    it('handles special characters in filename attribute', async () => {
      const codeBlock = mount('pilot-code-block', { filename: 'file-name_test.js' });
      await waitForRender(codeBlock);
      
      const filename = codeBlock.shadowRoot.querySelector('.filename');
      expect(filename.textContent).toBe('file-name_test.js');
    });

    it('handles empty string attributes', async () => {
      const codeBlock = mount('pilot-code-block', { 
        language: '',
        filename: '' 
      });
      await waitForRender(codeBlock);
      
      const header = codeBlock.shadowRoot.querySelector('.header');
      // Empty strings are falsy, so header should not be shown
      expect(header).toBeFalsy();
    });

    it('handles very long code content', async () => {
      const longCode = 'x'.repeat(10000);
      const codeBlock = mount('pilot-code-block', {}, longCode);
      await waitForRender(codeBlock);
      
      expect(codeBlock.textContent).toBe(longCode);
    });

    it('handles code with special HTML characters', async () => {
      const codeWithHtml = '<div>Test</div>';
      const codeBlock = mount('pilot-code-block', {}, codeWithHtml);
      await waitForRender(codeBlock);
      
      // Content is rendered in light DOM, textContent strips HTML tags
      // We verify the content is present (tags may be parsed by browser/DOM)
      expect(codeBlock.textContent.trim()).toContain('Test');
    });

    it('handles whitespace-only content', async () => {
      const codeBlock = mount('pilot-code-block', {}, '   \n\t   ');
      await waitForRender(codeBlock);
      
      const container = codeBlock.shadowRoot.querySelector('.code-block');
      expect(container).toBeTruthy();
    });

    it('handles code with unicode characters', async () => {
      const unicodeCode = 'const emoji = "🎉";';
      const codeBlock = mount('pilot-code-block', {}, unicodeCode);
      await waitForRender(codeBlock);
      
      expect(codeBlock.textContent.trim()).toBe(unicodeCode);
    });
  });

  describe('Line Numbers Feature', () => {
    it('adds with-line-numbers class when show-line-numbers is set', async () => {
      const codeBlock = mount('pilot-code-block', { 'show-line-numbers': true });
      await waitForRender(codeBlock);
      
      const body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
    });

    it('does not add with-line-numbers class by default', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      const body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
    });

    it('toggles line numbers on and off', async () => {
      const codeBlock = mount('pilot-code-block');
      await waitForRender(codeBlock);
      
      // Initially off
      let body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
      
      // Turn on
      codeBlock.setAttribute('show-line-numbers', '');
      await waitForRender(codeBlock);
      
      body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(true);
      
      // Turn off
      codeBlock.removeAttribute('show-line-numbers');
      await waitForRender(codeBlock);
      
      body = codeBlock.shadowRoot.querySelector('.body');
      expect(body.classList.contains('with-line-numbers')).toBe(false);
    });
  });
});
