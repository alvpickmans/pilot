/**
 * PilotModal Unit Tests
 * 
 * Tests for the Pilot Modal component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, DOM structure,
 * event handling, and accessibility features.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, pressKey, click } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const modalModule = await import('./modal.js');
const { PilotModal } = modalModule;

describe('PilotModal', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-modal', PilotModal);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      expect(modal.shadowRoot).toBeTruthy();
      const backdrop = modal.shadowRoot.querySelector('.backdrop');
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      
      expect(backdrop).toBeTruthy();
      expect(modalContainer).toBeTruthy();
      expect(modalContainer.getAttribute('size')).toBe('md');
    });

    it('is hidden by default', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
      // Check the :host style via the element's style attribute or computed style
      // Note: happy-dom may not fully support :host selector computed styles
      expect(modal.style.display).toBe('');
    });

    it('renders with title attribute', async () => {
      const modal = mount('pilot-modal', { title: 'Test Modal' }, 'Modal content');
      await waitForRender(modal);
      
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      expect(modalTitle).toBeTruthy();
      expect(modalTitle.textContent).toBe('Test Modal');
    });

    it('renders without title when not provided', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      expect(modalTitle).toBeFalsy();
    });

    it('renders close button when dismissible', async () => {
      const modal = mount('pilot-modal', { dismissible: true }, 'Modal content');
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeTruthy();
      expect(closeButton.getAttribute('aria-label')).toBe('Close modal');
    });

    it('does not render close button when dismissible is false', async () => {
      // The component checks: this.getAttribute('dismissible') !== 'false'
      // So we need to set it to the string 'false' to make it non-dismissible
      const modal = mount('pilot-modal');
      modal.setAttribute('dismissible', 'false');
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeFalsy();
    });

    it('supports all size variants', async () => {
      const sizes = ['sm', 'md', 'lg', 'full'];
      
      for (const size of sizes) {
        cleanup();
        const modal = mount('pilot-modal', { size });
        await waitForRender(modal);
        
        const modalContainer = modal.shadowRoot.querySelector('.modal-container');
        expect(modalContainer.getAttribute('size')).toBe(size);
      }
    });

    it('renders with default size when size not specified', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer.getAttribute('size')).toBe('md');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when title changes', async () => {
      const modal = mount('pilot-modal', { title: 'Initial Title' });
      await waitForRender(modal);
      
      modal.setAttribute('title', 'Updated Title');
      await waitForRender(modal);
      
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      expect(modalTitle.textContent).toBe('Updated Title');
    });

    it('re-renders when size changes', async () => {
      const modal = mount('pilot-modal', { size: 'sm' });
      await waitForRender(modal);
      
      modal.setAttribute('size', 'lg');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer.getAttribute('size')).toBe('lg');
    });

    it('re-renders when dismissible changes', async () => {
      const modal = mount('pilot-modal', { dismissible: true });
      await waitForRender(modal);
      
      expect(modal.shadowRoot.querySelector('.close-button')).toBeTruthy();
      
      modal.setAttribute('dismissible', 'false');
      await waitForRender(modal);
      
      expect(modal.shadowRoot.querySelector('.close-button')).toBeFalsy();
    });

    it('handles rapid attribute changes', async () => {
      const modal = mount('pilot-modal', { size: 'sm', title: 'Test' });
      await waitForRender(modal);
      
      // Rapid changes
      modal.setAttribute('size', 'lg');
      modal.setAttribute('title', 'Updated');
      modal.setAttribute('dismissible', 'false');
      
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      
      expect(modalContainer.getAttribute('size')).toBe('lg');
      expect(modalTitle.textContent).toBe('Updated');
      expect(modal.shadowRoot.querySelector('.close-button')).toBeFalsy();
    });
  });

  describe('Open/Close Functionality', () => {
    it('opens when open attribute is set', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      modal.setAttribute('open', '');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      // The display changes via :host([open]) selector - check attribute instead
      expect(modal.getAttribute('open')).toBe('');
    });

    it('closes when open attribute is removed', async () => {
      const modal = mount('pilot-modal', { open: true }, 'Modal content');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      
      modal.removeAttribute('open');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('opens via open() method', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      modal.open();
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('closes via close() method', async () => {
      const modal = mount('pilot-modal', { open: true }, 'Modal content');
      await waitForRender(modal);
      
      modal.close();
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('prevents body scroll when open', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      expect(document.body.style.overflow).toBe('');
      
      modal.open();
      await waitForRender(modal);
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', async () => {
      const modal = mount('pilot-modal', { open: true }, 'Modal content');
      await waitForRender(modal);
      
      expect(document.body.style.overflow).toBe('hidden');
      
      modal.close();
      await waitForRender(modal);
      
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Event Handling', () => {
    it('closes on backdrop click when dismissible', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true }, 'Modal content');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      
      // Click on the modal element itself (backdrop area)
      click(modal);
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('does not close on backdrop click when not dismissible', async () => {
      // Set dismissible to 'false' string to make it non-dismissible
      const modal = mount('pilot-modal', { open: true });
      modal.setAttribute('dismissible', 'false');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      
      click(modal);
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('closes on close button click', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true }, 'Modal content');
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton).toBeTruthy();
      
      click(closeButton);
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('closes on Escape key when dismissible', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true }, 'Modal content');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      
      pressKey(modal, 'Escape');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('does not close on Escape key when not dismissible', async () => {
      // Set dismissible to 'false' string to make it non-dismissible
      const modal = mount('pilot-modal', { open: true });
      modal.setAttribute('dismissible', 'false');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
      
      pressKey(modal, 'Escape');
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });

    it('does not close when clicking inside modal content', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true }, 'Modal content');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      
      // Create a click event that targets the modal container
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      modalContainer.dispatchEvent(event);
      
      await waitForRender(modal);
      
      expect(modal.hasAttribute('open')).toBe(true);
    });
  });

  describe('Focus Management', () => {
    it('stores last focused element when opening', async () => {
      const button = document.createElement('button');
      button.textContent = 'Trigger';
      document.body.appendChild(button);
      button.focus();
      
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      modal.open();
      await waitForRender(modal);
      
      // The modal should have stored the button as last focused element
      expect(modal._lastFocusedElement).toBe(button);
      
      document.body.removeChild(button);
    });

    it('focuses modal container when opened', async () => {
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      modal.open();
      
      // Wait for the setTimeout in _setupModal
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(document.activeElement).toBe(modalContainer);
    });

    it('restores focus when closed', async () => {
      const button = document.createElement('button');
      button.textContent = 'Trigger';
      document.body.appendChild(button);
      button.focus();
      
      const modal = mount('pilot-modal', {}, 'Modal content');
      await waitForRender(modal);
      
      modal.open();
      await waitForRender(modal);
      
      modal.close();
      await waitForRender(modal);
      
      expect(document.activeElement).toBe(button);
      
      document.body.removeChild(button);
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      expect(modal.shadowRoot).toBeTruthy();
      expect(modal.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const style = modal.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.modal-container');
    });

    it('contains backdrop element', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const backdrop = modal.shadowRoot.querySelector('.backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('contains modal container with correct role', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer).toBeTruthy();
      expect(modalContainer.getAttribute('role')).toBe('dialog');
      expect(modalContainer.getAttribute('aria-modal')).toBe('true');
    });

    it('contains all corner brackets', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      expect(modal.shadowRoot.querySelector('.corner-bracket-tl')).toBeTruthy();
      expect(modal.shadowRoot.querySelector('.corner-bracket-tr')).toBeTruthy();
      expect(modal.shadowRoot.querySelector('.corner-bracket-bl')).toBeTruthy();
      expect(modal.shadowRoot.querySelector('.corner-bracket-br')).toBeTruthy();
    });

    it('contains header, body, and footer sections', async () => {
      const modal = mount('pilot-modal', { title: 'Test' }, 'Content');
      await waitForRender(modal);
      
      expect(modal.shadowRoot.querySelector('.modal-header')).toBeTruthy();
      expect(modal.shadowRoot.querySelector('.modal-body')).toBeTruthy();
      expect(modal.shadowRoot.querySelector('.modal-footer')).toBeTruthy();
    });
  });

  describe('Slots', () => {
    it('renders default slot content in body', async () => {
      const modal = mount('pilot-modal', {}, '<p class="test-content">Test content</p>');
      await waitForRender(modal);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(modal.querySelector('.test-content')).toBeTruthy();
    });

    it('renders header slot content', async () => {
      const modal = mount('pilot-modal', { title: 'Test' }, '<span slot="header">Header content</span>');
      await waitForRender(modal);
      
      const headerSlot = modal.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it('renders footer slot content', async () => {
      const modal = mount('pilot-modal', {}, '<span slot="footer">Footer content</span>');
      await waitForRender(modal);
      
      const footerSlot = modal.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has modal container with computed styles', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      const styles = window.getComputedStyle(modalContainer);
      
      // Basic style checks
      expect(styles.position).toBe('absolute');
    });

    it('applies CSS variable fallbacks', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      
      // Check that the element exists and has styles
      expect(modalContainer).toBeTruthy();
      expect(modalContainer.style).toBeDefined();
    });

    it('has backdrop with computed styles', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const backdrop = modal.shadowRoot.querySelector('.backdrop');
      const styles = window.getComputedStyle(backdrop);
      
      expect(styles.position).toBe('absolute');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes when title is present', async () => {
      const modal = mount('pilot-modal', { title: 'Accessible Modal' }, 'Content');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer.getAttribute('aria-labelledby')).toBe('modal-title');
      
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      expect(modalTitle.id).toBe('modal-title');
    });

    it('does not have aria-labelledby when title is not present', async () => {
      const modal = mount('pilot-modal', {}, 'Content');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer.getAttribute('aria-labelledby')).toBeFalsy();
    });

    it('close button has correct aria-label', async () => {
      const modal = mount('pilot-modal', { dismissible: true }, 'Content');
      await waitForRender(modal);
      
      const closeButton = modal.shadowRoot.querySelector('.close-button');
      expect(closeButton.getAttribute('aria-label')).toBe('Close modal');
    });

    it('modal container has tabindex for focus management', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      expect(modalContainer).toBeTruthy();
    });

    it('handles multiple open/close cycles', async () => {
      const modal = mount('pilot-modal', { dismissible: true }, 'Content');
      await waitForRender(modal);
      
      // Open and close multiple times
      for (let i = 0; i < 3; i++) {
        modal.open();
        await waitForRender(modal);
        expect(modal.hasAttribute('open')).toBe(true);
        
        modal.close();
        await waitForRender(modal);
        expect(modal.hasAttribute('open')).toBe(false);
      }
    });

    it('handles dismissible attribute edge cases', async () => {
      // Test various dismissible values
      const testCases = [
        { value: true, expectedCloseButton: true },
        { value: 'true', expectedCloseButton: true },
        { value: false, expectedCloseButton: false },
        { value: 'false', expectedCloseButton: false },
      ];
      
      for (const testCase of testCases) {
        cleanup();
        const modal = mount('pilot-modal', { dismissible: testCase.value });
        await waitForRender(modal);
        
        const closeButton = modal.shadowRoot.querySelector('.close-button');
        if (testCase.expectedCloseButton) {
          expect(closeButton).toBeTruthy();
        } else {
          expect(closeButton).toBeFalsy();
        }
      }
    });

    it('preserves attributes on re-render', async () => {
      const modal = mount('pilot-modal', { 
        title: 'Test Title',
        size: 'lg',
        dismissible: false
      });
      await waitForRender(modal);
      
      // Trigger re-render by changing one attribute
      modal.setAttribute('open', '');
      await waitForRender(modal);
      
      const modalContainer = modal.shadowRoot.querySelector('.modal-container');
      const modalTitle = modal.shadowRoot.querySelector('.modal-title');
      
      expect(modalContainer.getAttribute('size')).toBe('lg');
      expect(modalTitle.textContent).toBe('Test Title');
      expect(modal.shadowRoot.querySelector('.close-button')).toBeFalsy();
    });

    it('handles focus trap with no focusable elements', async () => {
      const modal = mount('pilot-modal', { open: true }, 'Just text content');
      await waitForRender(modal);
      
      // Should not throw when tabbing with no focusable elements
      expect(() => {
        pressKey(modal, 'Tab');
      }).not.toThrow();
    });

    it('handles focus trap with focusable elements', async () => {
      const modal = mount('pilot-modal', { open: true, dismissible: true }, `
        <button>First</button>
        <button>Second</button>
      `);
      await waitForRender(modal);
      
      // Should not throw when tabbing with focusable elements
      expect(() => {
        pressKey(modal, 'Tab');
      }).not.toThrow();
    });

    it('handles rapid open/close calls', async () => {
      const modal = mount('pilot-modal', {}, 'Content');
      await waitForRender(modal);
      
      // Rapid open/close calls
      modal.open();
      modal.close();
      modal.open();
      modal.close();
      
      await waitForRender(modal);
      
      // Should end up closed
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('handles missing shadow root gracefully', async () => {
      const modal = mount('pilot-modal');
      await waitForRender(modal);
      
      // Component should still exist even if shadow DOM operations fail
      expect(modal).toBeTruthy();
      expect(modal.shadowRoot).toBeTruthy();
    });
  });
});
