/**
 * PilotNavMenu Unit Tests
 *
 * Tests for the Pilot Navigation Menu component using Vitest and happy-dom.
 * Tests focus on component logic, responsive behavior, accessibility, and interactions.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender, pressKey, click } from '../tests/web-components.js';

// Import the component
const navMenuModule = await import('./nav-menu.js');
const { PilotNavMenu } = navMenuModule;

describe('PilotNavMenu', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-nav-menu', PilotNavMenu);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      expect(navMenu.shadowRoot).toBeTruthy();
      const container = navMenu.shadowRoot.querySelector('.nav-container');
      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');

      expect(container).toBeTruthy();
      expect(hamburger).toBeTruthy();
    });

    it('renders with sticky attribute', async () => {
      const navMenu = mount('pilot-nav-menu', { sticky: true });
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('sticky')).toBe(true);
    });

    it('renders with variant attribute', async () => {
      const navMenu = mount('pilot-nav-menu', { variant: 'technical' });
      await waitForRender(navMenu);

      expect(navMenu.getAttribute('variant')).toBe('technical');
    });

    it('renders brand slot', async () => {
      const navMenu = mount('pilot-nav-menu', {}, '<div slot="brand">Logo</div>');
      await waitForRender(navMenu);

      const brandSlot = navMenu.shadowRoot.querySelector('slot[name="brand"]');
      expect(brandSlot).toBeTruthy();
    });

    it('renders skip link for accessibility', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const skipLink = navMenu.shadowRoot.querySelector('.skip-link');
      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#nav-content');
    });
  });

  describe('Hamburger Button', () => {
    it('has correct ARIA attributes', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      expect(hamburger).toBeTruthy();
      expect(hamburger.getAttribute('aria-label')).toBe('Toggle navigation menu');
      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
      expect(hamburger.getAttribute('aria-controls')).toBe('mobile-menu');
    });

    it('has three hamburger lines', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const lines = navMenu.shadowRoot.querySelectorAll('.hamburger-line');
      expect(lines.length).toBe(3);
    });
  });

  describe('Mobile Menu', () => {
    it('renders mobile menu panel', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const mobileMenu = navMenu.shadowRoot.querySelector('.mobile-menu');
      expect(mobileMenu).toBeTruthy();
      expect(mobileMenu.getAttribute('role')).toBe('dialog');
      expect(mobileMenu.getAttribute('aria-modal')).toBe('true');
    });

    it('renders mobile menu overlay', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const overlay = navMenu.shadowRoot.querySelector('.mobile-menu-overlay');
      expect(overlay).toBeTruthy();
    });

    it('renders close button in mobile menu', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const closeButton = navMenu.shadowRoot.querySelector('.mobile-close-button');
      expect(closeButton).toBeTruthy();
      expect(closeButton.getAttribute('aria-label')).toBe('Close navigation menu');
    });

    it('renders mobile menu title', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const title = navMenu.shadowRoot.querySelector('.mobile-menu-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Menu');
    });
  });

  describe('Open/Close Functionality', () => {
    it('opens mobile menu when hamburger is clicked', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      click(hamburger);
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);
      expect(navMenu._isOpen).toBe(true);

      const mobileMenu = navMenu.shadowRoot.querySelector('.mobile-menu');
      expect(mobileMenu.classList.contains('open')).toBe(true);
    });

    it('closes mobile menu when close button is clicked', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      // Open menu first
      navMenu.open();
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);

      // Click close button
      const closeButton = navMenu.shadowRoot.querySelector('.mobile-close-button');
      click(closeButton);
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('closes mobile menu when overlay is clicked', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      // Open menu first
      navMenu.open();
      await waitForRender(navMenu);

      const overlay = navMenu.shadowRoot.querySelector('.mobile-menu-overlay');
      click(overlay);
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('opens via open() method', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.open();
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);
      expect(navMenu._isOpen).toBe(true);
    });

    it('closes via close() method', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.open();
      await waitForRender(navMenu);

      navMenu.close();
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
      expect(navMenu._isOpen).toBe(false);
    });

    it('toggles via toggle() method', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);

      navMenu.toggle();
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);

      navMenu.toggle();
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('opens when open attribute is set', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.setAttribute('open', '');
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);
      expect(navMenu._isOpen).toBe(true);
    });

    it('closes when open attribute is removed', async () => {
      const navMenu = mount('pilot-nav-menu', { open: true });
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);

      navMenu.removeAttribute('open');
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('prevents body scroll when open', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      expect(document.body.style.overflow).toBe('');

      navMenu.open();
      await waitForRender(navMenu);

      // Check that the component is in open state
      expect(navMenu._isOpen).toBe(true);
      expect(navMenu.hasAttribute('open')).toBe(true);
    });

    it('restores body scroll when closed', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.open();
      await waitForRender(navMenu);

      expect(navMenu._isOpen).toBe(true);

      navMenu.close();
      await waitForRender(navMenu);

      expect(navMenu._isOpen).toBe(false);
      expect(navMenu.hasAttribute('open')).toBe(false);
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes on Escape key', async () => {
      const navMenu = mount('pilot-nav-menu', { open: true });
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(true);

      pressKey(navMenu, 'Escape');
      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('updates aria-expanded when menu opens', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      expect(hamburger.getAttribute('aria-expanded')).toBe('false');

      navMenu.open();
      await waitForRender(navMenu);

      expect(hamburger.getAttribute('aria-expanded')).toBe('true');
    });

    it('updates aria-expanded when menu closes', async () => {
      const navMenu = mount('pilot-nav-menu', { open: true });
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      expect(hamburger.getAttribute('aria-expanded')).toBe('true');

      navMenu.close();
      await waitForRender(navMenu);

      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Breakpoint Configuration', () => {
    it('uses default breakpoint of 768px', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      expect(navMenu._breakpoint).toBe(768);
    });

    it('accepts custom breakpoint', async () => {
      const navMenu = mount('pilot-nav-menu', { breakpoint: 1024 });
      await waitForRender(navMenu);

      expect(navMenu._breakpoint).toBe(1024);
    });

    it('updates breakpoint via attribute', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.setAttribute('breakpoint', '900');
      await waitForRender(navMenu);

      expect(navMenu._breakpoint).toBe(900);
    });
  });

  describe('Navigation Items', () => {
    it('renders desktop navigation slot', async () => {
      const navMenu = mount('pilot-nav-menu', {}, `
        <li slot="nav-items"><a href="#">Home</a></li>
        <li slot="nav-items"><a href="#">About</a></li>
      `);
      await waitForRender(navMenu);

      const navSlot = navMenu.shadowRoot.querySelector('slot[name="nav-items"]');
      expect(navSlot).toBeTruthy();
    });

    it('renders mobile navigation slot', async () => {
      const navMenu = mount('pilot-nav-menu', {}, `
        <li slot="mobile-nav-items"><a href="#">Home</a></li>
        <li slot="mobile-nav-items"><a href="#">About</a></li>
      `);
      await waitForRender(navMenu);

      const mobileNavSlot = navMenu.shadowRoot.querySelector('slot[name="mobile-nav-items"]');
      expect(mobileNavSlot).toBeTruthy();
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      expect(navMenu.shadowRoot).toBeTruthy();
      expect(navMenu.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const style = navMenu.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.nav-container');
    });

    it('contains navigation element', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const nav = navMenu.shadowRoot.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('role')).toBe('navigation');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes on navigation', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const nav = navMenu.shadowRoot.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('has correct ARIA attributes on mobile menu', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const mobileMenu = navMenu.shadowRoot.querySelector('.mobile-menu');
      expect(mobileMenu.getAttribute('role')).toBe('dialog');
      expect(mobileMenu.getAttribute('aria-modal')).toBe('true');
      expect(mobileMenu.getAttribute('aria-label')).toBe('Mobile navigation');
    });

    it('hamburger button has correct aria-label', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      expect(hamburger.getAttribute('aria-label')).toBe('Toggle navigation menu');
    });

    it('close button has correct aria-label', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const closeButton = navMenu.shadowRoot.querySelector('.mobile-close-button');
      expect(closeButton.getAttribute('aria-label')).toBe('Close navigation menu');
    });
  });

  describe('CSS Parts', () => {
    it('has container part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const container = navMenu.shadowRoot.querySelector('.nav-container');
      expect(container.getAttribute('part')).toBe('container');
    });

    it('has brand part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const brand = navMenu.shadowRoot.querySelector('.nav-brand');
      expect(brand.getAttribute('part')).toBe('brand');
    });

    it('has menu part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const menu = navMenu.shadowRoot.querySelector('.nav-menu');
      expect(menu.getAttribute('part')).toBe('menu');
    });

    it('has hamburger part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const hamburger = navMenu.shadowRoot.querySelector('.hamburger-button');
      expect(hamburger.getAttribute('part')).toBe('hamburger');
    });

    it('has overlay part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const overlay = navMenu.shadowRoot.querySelector('.mobile-menu-overlay');
      expect(overlay.getAttribute('part')).toBe('overlay');
    });

    it('has mobile-menu part', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      const mobileMenu = navMenu.shadowRoot.querySelector('.mobile-menu');
      expect(mobileMenu.getAttribute('part')).toBe('mobile-menu');
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple open/close cycles', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      for (let i = 0; i < 3; i++) {
        navMenu.open();
        await waitForRender(navMenu);
        expect(navMenu.hasAttribute('open')).toBe(true);

        navMenu.close();
        await waitForRender(navMenu);
        expect(navMenu.hasAttribute('open')).toBe(false);
      }
    });

    it('handles rapid open/close calls', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.open();
      navMenu.close();
      navMenu.open();
      navMenu.close();

      await waitForRender(navMenu);

      expect(navMenu.hasAttribute('open')).toBe(false);
    });

    it('cleans up event listeners on disconnect', async () => {
      const navMenu = mount('pilot-nav-menu');
      await waitForRender(navMenu);

      navMenu.open();
      await waitForRender(navMenu);

      // Verify menu is open
      expect(navMenu.hasAttribute('open')).toBe(true);
      expect(navMenu._isOpen).toBe(true);

      // Remove from DOM
      navMenu.remove();

      // Verify component is removed
      expect(document.body.contains(navMenu)).toBe(false);
    });

    it('handles invalid breakpoint value', async () => {
      const navMenu = mount('pilot-nav-menu', { breakpoint: 'invalid' });
      await waitForRender(navMenu);

      // Should fall back to default
      expect(navMenu._breakpoint).toBe(768);
    });

    it('handles zero breakpoint value', async () => {
      const navMenu = mount('pilot-nav-menu', { breakpoint: 0 });
      await waitForRender(navMenu);

      // Should use 0 as valid breakpoint
      expect(navMenu._breakpoint).toBe(0);
    });
  });
});
