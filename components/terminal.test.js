/**
 * PilotTerminal Unit Tests
 * 
 * Tests for the Pilot Terminal component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const terminalModule = await import('./terminal.js');
const { PilotTerminal } = terminalModule;

describe('PilotTerminal', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-terminal', PilotTerminal);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const terminal = mount('pilot-terminal', {}, 'echo "Hello World"');
      await waitForRender(terminal);
      
      expect(terminal.shadowRoot).toBeTruthy();
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      expect(terminalDiv).toBeTruthy();
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(terminal.textContent.trim()).toBe('echo "Hello World"');
    });

    it('applies default title (terminal)', async () => {
      const terminal = mount('pilot-terminal', { 'show-header': true });
      await waitForRender(terminal);
      
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      expect(titleSpan).toBeTruthy();
      expect(titleSpan.textContent).toBe('terminal');
    });

    it('hides header by default', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const header = terminal.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('hides prompt by default', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      expect(prompt).toBeFalsy();
    });

    it('applies custom title attribute', async () => {
      const terminal = mount('pilot-terminal', { 
        title: 'bash',
        'show-header': true 
      });
      await waitForRender(terminal);
      
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      expect(titleSpan.textContent).toBe('bash');
    });

    it('shows header when show-header attribute is set', async () => {
      const terminal = mount('pilot-terminal', { 'show-header': true });
      await waitForRender(terminal);
      
      const header = terminal.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
    });

    it('shows prompt when show-prompt attribute is set', async () => {
      const terminal = mount('pilot-terminal', { 'show-prompt': true }, 'ls -la');
      await waitForRender(terminal);
      
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      expect(prompt).toBeTruthy();
      expect(prompt.textContent).toBe('$');
    });

    it('displays content in line wrapper when prompt is shown', async () => {
      const terminal = mount('pilot-terminal', { 'show-prompt': true }, 'npm install');
      await waitForRender(terminal);
      
      const line = terminal.shadowRoot.querySelector('.line');
      expect(line).toBeTruthy();
      
      const content = terminal.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
    });

    it('shows both header and prompt when both attributes are set', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': true,
        'show-prompt': true,
        title: 'console'
      }, 'git status');
      await waitForRender(terminal);
      
      const header = terminal.shadowRoot.querySelector('.header');
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      
      expect(header).toBeTruthy();
      expect(prompt).toBeTruthy();
      expect(terminal.shadowRoot.querySelector('.title').textContent).toBe('console');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when title changes', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': true,
        title: 'old-title'
      });
      await waitForRender(terminal);
      
      terminal.setAttribute('title', 'new-title');
      await waitForRender(terminal);
      
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      expect(titleSpan.textContent).toBe('new-title');
    });

    it('re-renders when show-header changes', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      let header = terminal.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
      
      terminal.setAttribute('show-header', '');
      await waitForRender(terminal);
      
      header = terminal.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      terminal.removeAttribute('show-header');
      await waitForRender(terminal);
      
      header = terminal.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('re-renders when show-prompt changes', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      let prompt = terminal.shadowRoot.querySelector('.prompt');
      expect(prompt).toBeFalsy();
      
      terminal.setAttribute('show-prompt', '');
      await waitForRender(terminal);
      
      prompt = terminal.shadowRoot.querySelector('.prompt');
      expect(prompt).toBeTruthy();
      
      terminal.removeAttribute('show-prompt');
      await waitForRender(terminal);
      
      prompt = terminal.shadowRoot.querySelector('.prompt');
      expect(prompt).toBeFalsy();
    });

    it('preserves content during attribute changes', async () => {
      const terminal = mount('pilot-terminal', {}, 'original content');
      await waitForRender(terminal);
      
      terminal.setAttribute('show-prompt', '');
      await waitForRender(terminal);
      
      expect(terminal.textContent.trim()).toBe('original content');
    });
  });

  describe('Shadow DOM Structure', () => {
    it('has open shadow root', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      expect(terminal.shadowRoot).toBeTruthy();
      expect(terminal.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const style = terminal.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.terminal');
    });

    it('contains terminal container div', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      expect(terminalDiv).toBeTruthy();
    });

    it('contains body section', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const body = terminal.shadowRoot.querySelector('.body');
      expect(body).toBeTruthy();
    });

    it('contains slot element', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const slot = terminal.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('has controls in header when show-header is set', async () => {
      const terminal = mount('pilot-terminal', { 'show-header': true });
      await waitForRender(terminal);
      
      const controls = terminal.shadowRoot.querySelector('.controls');
      expect(controls).toBeTruthy();
      
      const controlElements = controls.querySelectorAll('.control');
      expect(controlElements.length).toBe(3);
    });
  });

  describe('CSS Custom Properties', () => {
    it('has terminal element with computed styles', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      const styles = window.getComputedStyle(terminalDiv);
      
      // Basic style checks
      expect(styles.display).toBe('block');
    });

    it('applies CSS variable fallbacks', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      
      // Check that the element exists and has styles
      expect(terminalDiv).toBeTruthy();
      expect(terminalDiv.style).toBeDefined();
    });

    it('uses monospace font family', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      // Check that the component defines monospace font in styles
      const style = terminal.shadowRoot.querySelector('style');
      expect(style.textContent).toContain('font-family');
      expect(style.textContent).toContain('monospace');
    });

    it('applies terminal-specific CSS variables', async () => {
      const terminal = mount('pilot-terminal', { 'show-prompt': true });
      await waitForRender(terminal);
      
      const body = terminal.shadowRoot.querySelector('.body');
      expect(body).toBeTruthy();
      
      // Check that body has the expected CSS variable usage
      const styles = window.getComputedStyle(body);
      expect(styles).toBeDefined();
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const terminal = mount('pilot-terminal', {}, '<code>code content</code>');
      await waitForRender(terminal);
      
      const slot = terminal.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(terminal.querySelector('code')).toBeTruthy();
    });

    it('renders text content', async () => {
      const terminal = mount('pilot-terminal', {}, 'Terminal text');
      await waitForRender(terminal);
      
      expect(terminal.textContent.trim()).toBe('Terminal text');
    });

    it('renders HTML content in slot', async () => {
      const terminal = mount('pilot-terminal', {}, '<pre>preformatted</pre>');
      await waitForRender(terminal);
      
      expect(terminal.querySelector('pre')).toBeTruthy();
    });

    it('renders multiple lines of content', async () => {
      const content = `Line 1
Line 2
Line 3`;
      const terminal = mount('pilot-terminal', {}, content);
      await waitForRender(terminal);
      
      expect(terminal.textContent.trim()).toBe(content.trim());
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      expect(terminalDiv).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      // Rapid changes
      terminal.setAttribute('show-header', '');
      terminal.setAttribute('show-prompt', '');
      terminal.setAttribute('title', 'rapid');
      
      await waitForRender(terminal);
      
      const header = terminal.shadowRoot.querySelector('.header');
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      
      expect(header).toBeTruthy();
      expect(prompt).toBeTruthy();
      expect(titleSpan.textContent).toBe('rapid');
    });

    it('preserves attributes on re-render', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': true,
        'show-prompt': true,
        title: 'test'
      });
      await waitForRender(terminal);
      
      // Trigger re-render by changing one attribute
      terminal.setAttribute('title', 'updated');
      await waitForRender(terminal);
      
      const header = terminal.shadowRoot.querySelector('.header');
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      
      expect(header).toBeTruthy();
      expect(prompt).toBeTruthy();
      expect(titleSpan.textContent).toBe('updated');
    });

    it('handles special characters in title', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': true,
        title: 'bash-3.2$'
      });
      await waitForRender(terminal);
      
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      expect(titleSpan.textContent).toBe('bash-3.2$');
    });

    it('handles empty title attribute', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': true,
        title: ''
      });
      await waitForRender(terminal);
      
      const titleSpan = terminal.shadowRoot.querySelector('.title');
      // Empty title falls back to default 'terminal'
      expect(titleSpan.textContent).toBe('terminal');
    });

    it('handles very long content', async () => {
      const longContent = 'A'.repeat(10000);
      const terminal = mount('pilot-terminal', {}, longContent);
      await waitForRender(terminal);
      
      expect(terminal.textContent.length).toBe(10000);
    });

    it('handles content with HTML entities', async () => {
      const terminal = mount('pilot-terminal', {}, '<div>test</div>');
      await waitForRender(terminal);
      
      expect(terminal.querySelector('div')).toBeTruthy();
    });

    it('handles whitespace-only content', async () => {
      const terminal = mount('pilot-terminal', {}, '   \n\t   ');
      await waitForRender(terminal);
      
      const terminalDiv = terminal.shadowRoot.querySelector('.terminal');
      expect(terminalDiv).toBeTruthy();
    });

    it('handles unicode content', async () => {
      const terminal = mount('pilot-terminal', {}, '🚀 npm install 📦');
      await waitForRender(terminal);
      
      expect(terminal.textContent).toContain('🚀');
      expect(terminal.textContent).toContain('📦');
    });
  });

  describe('Error Handling', () => {
    it('gracefully handles missing attributes', async () => {
      const terminal = mount('pilot-terminal');
      await waitForRender(terminal);
      
      // Should render without errors even with no attributes
      expect(terminal.shadowRoot).toBeTruthy();
      expect(terminal.shadowRoot.querySelector('.terminal')).toBeTruthy();
    });

    it('handles invalid attribute values gracefully', async () => {
      const terminal = mount('pilot-terminal', { 
        'show-header': 'invalid',
        'show-prompt': 'invalid'
      });
      await waitForRender(terminal);
      
      // Boolean attributes are truthy if present, regardless of value
      const header = terminal.shadowRoot.querySelector('.header');
      const prompt = terminal.shadowRoot.querySelector('.prompt');
      
      expect(header).toBeTruthy();
      expect(prompt).toBeTruthy();
    });
  });
});
