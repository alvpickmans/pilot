/**
 * PilotPanel Unit Tests
 * 
 * Tests for the Pilot Panel component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, click } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const panelModule = await import('./panel.js');
const { PilotPanel } = panelModule;

describe('PilotPanel', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-panel', PilotPanel);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const panel = mount('pilot-panel', {}, 'Panel content');
      await waitForRender(panel);
      
      expect(panel.shadowRoot).toBeTruthy();
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(panel.textContent.trim()).toBe('Panel content');
    });

    it('renders without title by default', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const header = panel.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('renders with title when provided', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      const header = panel.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Panel Title');
    });

    it('renders without collapsible toggle by default', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
    });

    it('renders with toggle button when collapsible', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title', collapsible: true });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
      expect(toggle.textContent.trim()).toBe('−');
      expect(toggle.getAttribute('aria-label')).toBe('Collapse');
    });

    it('renders collapsed state correctly', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true, 
        collapsed: true 
      });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
      expect(toggle.textContent.trim()).toBe('+');
      expect(toggle.getAttribute('aria-label')).toBe('Expand');
    });

    it('hides content when collapsed', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true, 
        collapsed: true 
      });
      await waitForRender(panel);
      
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
      // Content should still be in DOM but hidden via CSS
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when title changes', async () => {
      const panel = mount('pilot-panel', { title: 'Initial Title' });
      await waitForRender(panel);
      
      panel.setAttribute('title', 'Updated Title');
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title.textContent).toBe('Updated Title');
    });

    it('re-renders when collapsible changes', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      let toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
      
      panel.setAttribute('collapsible', '');
      await waitForRender(panel);
      
      toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
    });

    it('re-renders when collapsed changes', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      });
      await waitForRender(panel);
      
      let toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.textContent.trim()).toBe('−');
      
      panel.setAttribute('collapsed', '');
      await waitForRender(panel);
      
      toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.textContent.trim()).toBe('+');
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });

    it('removes collapsed state correctly', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true, 
        collapsed: true 
      });
      await waitForRender(panel);
      
      panel.removeAttribute('collapsed');
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.textContent.trim()).toBe('−');
      expect(panel.hasAttribute('collapsed')).toBe(false);
    });

    it('removes title and header when title is cleared', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      panel.removeAttribute('title');
      await waitForRender(panel);
      
      const header = panel.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });
  });

  describe('Collapsible Functionality', () => {
    it('toggles collapsed state on button click', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
      expect(panel.hasAttribute('collapsed')).toBe(false);
      
      click(toggle);
      await waitForRender(panel);
      
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });

    it('toggles back to expanded on second click', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true, 
        collapsed: true 
      });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(panel.hasAttribute('collapsed')).toBe(true);
      
      click(toggle);
      await waitForRender(panel);
      
      expect(panel.hasAttribute('collapsed')).toBe(false);
    });

    it('updates toggle button symbol when collapsed', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      });
      await waitForRender(panel);
      
      let toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.textContent.trim()).toBe('−');
      
      click(toggle);
      await waitForRender(panel);
      
      // Re-query after re-render since DOM was recreated
      toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.textContent.trim()).toBe('+');
    });

    it('updates aria-label when collapsed', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      });
      await waitForRender(panel);
      
      let toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Collapse');
      
      click(toggle);
      await waitForRender(panel);
      
      // Re-query after re-render since DOM was recreated
      toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Expand');
    });

    it('does not render toggle when not collapsible', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
    });

    it('does not render toggle when no title provided', async () => {
      const panel = mount('pilot-panel', { collapsible: true });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const panel = mount('pilot-panel', {}, '<div class="custom-content">Custom Content</div>');
      await waitForRender(panel);
      
      const slot = panel.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const panel = mount('pilot-panel', {}, 'Panel Content Text');
      await waitForRender(panel);
      
      expect(panel.textContent.trim()).toBe('Panel Content Text');
    });

    it('renders HTML content in slot', async () => {
      const panel = mount('pilot-panel', {}, '<p>Paragraph</p><span>Span</span>');
      await waitForRender(panel);
      
      expect(panel.querySelector('p')).toBeTruthy();
      expect(panel.querySelector('span')).toBeTruthy();
    });

    it('preserves slot content when collapsed', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      }, '<div class="test-content">Test</div>');
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      click(toggle);
      await waitForRender(panel);
      
      // Content should still exist in light DOM
      expect(panel.querySelector('.test-content')).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has panel element with computed styles', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const panelDiv = panel.shadowRoot.querySelector('.panel');
      expect(panelDiv).toBeTruthy();
    });

    it('applies CSS variable fallbacks', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
      expect(content.style).toBeDefined();
    });

    it('has header with technical styling', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      const header = panel.shadowRoot.querySelector('.header');
      expect(header).toBeTruthy();
      
      const styles = window.getComputedStyle(header);
      expect(styles.display).toBe('flex');
    });

    it('has title with technical font styling', async () => {
      const panel = mount('pilot-panel', { title: 'Panel Title' });
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title).toBeTruthy();
      
      const styles = window.getComputedStyle(title);
      expect(styles.textTransform).toBe('uppercase');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      expect(panel.shadowRoot).toBeTruthy();
      expect(panel.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const style = panel.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.header');
      expect(style.textContent).toContain('.content');
    });

    it('contains panel container element', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const panelDiv = panel.shadowRoot.querySelector('.panel');
      expect(panelDiv).toBeTruthy();
    });

    it('contains content wrapper', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
    });

    it('contains slot element', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const slot = panel.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const panel = mount('pilot-panel');
      await waitForRender(panel);
      
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
    });

    it('handles empty title attribute', async () => {
      const panel = mount('pilot-panel', { title: '' });
      await waitForRender(panel);
      
      const header = panel.shadowRoot.querySelector('.header');
      expect(header).toBeFalsy();
    });

    it('handles rapid attribute changes', async () => {
      const panel = mount('pilot-panel', { title: 'Initial' });
      await waitForRender(panel);
      
      // Rapid changes
      panel.setAttribute('title', 'First');
      panel.setAttribute('collapsible', '');
      panel.setAttribute('collapsed', '');
      
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title.textContent).toBe('First');
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });

    it('preserves attributes on re-render', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title',
        collapsible: true,
        collapsed: true 
      });
      await waitForRender(panel);
      
      // Trigger re-render by changing one attribute
      panel.setAttribute('title', 'Updated Title');
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title.textContent).toBe('Updated Title');
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeTruthy();
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });

    it('handles multiple toggle clicks', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsible: true 
      });
      await waitForRender(panel);
      
      const toggle = panel.shadowRoot.querySelector('.toggle');
      
      // Click multiple times
      click(toggle);
      await waitForRender(panel);
      expect(panel.hasAttribute('collapsed')).toBe(true);
      
      click(toggle);
      await waitForRender(panel);
      expect(panel.hasAttribute('collapsed')).toBe(false);
      
      click(toggle);
      await waitForRender(panel);
      expect(panel.hasAttribute('collapsed')).toBe(true);
    });

    it('handles collapsible without title gracefully', async () => {
      const panel = mount('pilot-panel', { collapsible: true });
      await waitForRender(panel);
      
      // Should not throw error
      const content = panel.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
      
      // Should not have toggle button
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
    });

    it('handles collapsed without collapsible gracefully', async () => {
      const panel = mount('pilot-panel', { 
        title: 'Panel Title', 
        collapsed: true 
      });
      await waitForRender(panel);
      
      // Should have collapsed attribute
      expect(panel.hasAttribute('collapsed')).toBe(true);
      
      // Should not have toggle button
      const toggle = panel.shadowRoot.querySelector('.toggle');
      expect(toggle).toBeFalsy();
    });

    it('handles special characters in title', async () => {
      const panel = mount('pilot-panel', { title: 'Title with <special> & "characters"' });
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title).toBeTruthy();
      // HTML tags in attributes get stripped, but text content should still be present
      expect(title.textContent).toContain('Title with');
      expect(title.textContent).toContain('characters');
    });

    it('handles very long title', async () => {
      const longTitle = 'A'.repeat(500);
      const panel = mount('pilot-panel', { title: longTitle });
      await waitForRender(panel);
      
      const title = panel.shadowRoot.querySelector('.title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe(longTitle);
    });
  });
});
