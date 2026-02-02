/**
 * Pilot Design System - Navigation Menu Component
 *
 * Responsive navigation menu with hamburger menu for mobile devices.
 * Supports nested items, keyboard navigation, and accessibility features.
 */

import { baseStyles, backdropStyles } from './shared.js';

// ============================================
// NAVIGATION MENU COMPONENT
// ============================================

export class PilotNavMenu extends HTMLElement {
  static get observedAttributes() {
    return ['breakpoint', 'sticky', 'variant', 'open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._breakpoint = 768;
    this._processedNavItems = new WeakSet();
    this._processedMobileNavItems = new WeakSet();
    this._keydownHandler = this._handleKeydown.bind(this);
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
    this._resizeHandler = this._handleResize.bind(this);
    this._injectGlobalStyles();
    this.render();
  }

  _injectGlobalStyles() {
    // Inject global styles for slotted nav items (light DOM elements)
    if (!document.getElementById('pilot-nav-menu-styles')) {
      const style = document.createElement('style');
      style.id = 'pilot-nav-menu-styles';
      style.textContent = `
        /* Pilot Nav Menu - Slotted Content Styles */
        li[slot="nav-items"] {
          position: relative;
          list-style: none;
          z-index: 100;
        }
        
        li[slot="nav-items"] > a,
        li[slot="nav-items"] > button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          font-family: var(--font-technical, 'JetBrains Mono', monospace);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text-primary, #1a1a1a);
          border: 1px solid transparent;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: none;
        }
        
        li[slot="nav-items"] > a:hover,
        li[slot="nav-items"] > button:hover {
          color: var(--color-text-primary, #1a1a1a);
          background: var(--color-background-secondary, #f5f5f5);
          border-color: var(--color-border-primary, #b3b3b3);
        }
        
        li[slot="nav-items"] > a:focus-visible,
        li[slot="nav-items"] > button:focus-visible {
          outline: 2px solid var(--color-brand-accent, #f59e0b);
          outline-offset: 2px;
        }
        
        li[slot="nav-items"] > a.active,
        li[slot="nav-items"] > button.active {
          color: var(--color-text-primary, #1a1a1a);
          background: var(--color-background-secondary, #f5f5f5);
          border-color: var(--color-border-technical, #1a1a1a);
        }
        
        /* Nested menu indicator */
        li[slot="nav-items"] > a[data-has-children]::after,
        li[slot="nav-items"] > button[data-has-children]::after {
          content: '▼';
          font-size: 0.6em;
          margin-left: 0.25rem;
          transition: transform 150ms;
        }
        
        li[slot="nav-items"].expanded > a[data-has-children]::after,
        li[slot="nav-items"].expanded > button[data-has-children]::after {
          transform: rotate(180deg);
        }
        
        /* Submenu styles */
        li[slot="nav-items"] > ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: var(--color-background-primary, #ffffff);
          border: 1px solid var(--color-border-secondary, #d4d4d4);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          list-style: none;
          margin: 0.25rem 0 0 0;
          padding: 0.5rem 0;
          z-index: 1000;
        }
        
        /* Show submenu when parent is expanded */
        li[slot="nav-items"].expanded > ul,
        li[slot="nav-items"] > ul.expanded {
          display: block;
        }

        /* Submenu visibility for nested items */
        li[slot="nav-items"] li.expanded > ul {
          display: block;
        }
        
        li[slot="nav-items"] > ul > li > a,
        li[slot="nav-items"] > ul > li > button {
          padding: 0.5rem 1rem;
          border: none;
          text-transform: none;
          font-size: 0.875rem;
        }
        
        li[slot="nav-items"] > ul > li > a:hover,
        li[slot="nav-items"] > ul > li > button:hover {
          background: var(--color-background-secondary, #f5f5f5);
        }
        
        /* Mobile Navigation Styles */
        li[slot="mobile-nav-items"] {
          list-style: none;
          border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
        }
        
        li[slot="mobile-nav-items"] > a,
        li[slot="mobile-nav-items"] > button {
          justify-content: space-between;
          width: 100%;
          padding: 1rem 1.5rem;
        }
        
        li[slot="mobile-nav-items"] > a.active,
        li[slot="mobile-nav-items"] > button.active {
          border-left: 3px solid var(--color-border-technical, #1a1a1a);
        }
        
        /* Mobile expand icon */
        li[slot="mobile-nav-items"] > a > .expand-icon,
        li[slot="mobile-nav-items"] > button > .expand-icon {
          font-size: 0.7em;
          transition: transform 150ms;
        }
        
        li[slot="mobile-nav-items"].expanded > a > .expand-icon,
        li[slot="mobile-nav-items"].expanded > button > .expand-icon {
          transform: rotate(180deg);
        }
        
        /* Mobile submenu styles */
        li[slot="mobile-nav-items"] > ul {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
          background: var(--color-background-secondary, #f5f5f5);
        }
        
        li[slot="mobile-nav-items"].expanded > ul {
          display: block;
        }
        
        li[slot="mobile-nav-items"] > ul > li > a,
        li[slot="mobile-nav-items"] > ul > li > button {
          padding-left: 2rem;
          text-transform: none;
          font-size: 0.875rem;
        }
        
        li[slot="mobile-nav-items"] > ul > li > ul > li > a,
        li[slot="mobile-nav-items"] > ul > li > ul > li > button {
          padding-left: 3rem;
        }
        
        /* Nested mobile nav items (added by JS via _processMobileSubmenu) */
        .nav-item--mobile {
          border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
          list-style: none;
        }

        .nav-item--mobile > a,
        .nav-item--mobile > button {
          justify-content: space-between;
          width: 100%;
          padding: 1rem 1.5rem;
        }

        .nav-item--mobile > a.active,
        .nav-item--mobile > button.active {
          border-left: 3px solid var(--color-border-technical, #1a1a1a);
        }

        /* Nested submenu items with increased indentation */
        .mobile-nav-submenu .nav-item--mobile > a,
        .mobile-nav-submenu .nav-item--mobile > button {
          padding-left: 2rem;
          text-transform: none;
          font-size: 0.875rem;
        }

        .mobile-nav-submenu .mobile-nav-submenu .nav-item--mobile > a,
        .mobile-nav-submenu .mobile-nav-submenu .nav-item--mobile > button {
          padding-left: 3rem;
        }

        /* Mobile submenu container */
        .mobile-nav-submenu {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
          background: var(--color-background-secondary, #f5f5f5);
        }

        .nav-item--mobile.expanded > .mobile-nav-submenu {
          display: block;
        }
      `;
      document.head.appendChild(style);
    }
  }

  get styles() {
    const breakpoint = this._breakpoint;

    return `
      ${baseStyles}
      ${backdropStyles}

      :host {
        display: block;
        width: 100%;
      }

      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: var(--pilot-nav-z-index, 100);
      }

      .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        background: var(--color-background-primary, #ffffff);
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
      }

      :host([variant="technical"]) .nav-container {
        background: var(--color-background-technical, #f5f5f5);
        border-bottom: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }

      /* Logo/Brand Slot */
      .nav-brand {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      /* Desktop Navigation */
      .nav-menu {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
        justify-content: center;
      }

      /* Actions Slot */
      .nav-actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-3, 0.75rem);
        flex-shrink: 0;
        margin-left: auto;
      }

      .nav-item {
        position: relative;
        z-index: 100;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        text-decoration: none;
        color: var(--color-text-primary, #1a1a1a);
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: background var(--duration-fast, 150ms);
      }

      :host([variant="technical"]) .nav-link {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
      }

      .nav-link:hover {
        background: var(--color-background-secondary, #f5f5f5);
      }

      :host([variant="technical"]) .nav-link:hover {
        background: var(--color-background-secondary, #f5f5f5);
      }

      .nav-link:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: -2px;
      }

      .nav-link.active {
        background: var(--color-background-secondary, #f5f5f5);
        border-left: 3px solid var(--color-brand-primary, #1a1a1a);
      }

      /* Nested Menu Indicator */
      .nav-link[data-has-children]::after {
        content: '▼';
        font-size: 0.6em;
        margin-left: var(--spacing-1, 0.25rem);
        transition: transform var(--duration-fast, 150ms);
      }

      .nav-item.expanded > .nav-link[data-has-children]::after {
        transform: rotate(180deg);
      }

      /* Nested Menu (Desktop Dropdown) */
      .nav-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        box-shadow: var(--shadow-md, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        list-style: none;
        margin: var(--spacing-1, 0.25rem) 0 0 0;
        padding: var(--spacing-2, 0.5rem) 0;
        z-index: 1000;
      }

      :host([variant="technical"]) .nav-submenu {
        background: var(--color-background-technical, #f5f5f5);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        box-shadow: var(--shadow-lg, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      }

      .nav-submenu .nav-link {
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        border: none;
        text-transform: none;
        font-size: var(--font-size-sm, 0.875rem);
      }

      .nav-submenu .nav-link:hover {
        background: var(--color-background-secondary, #f5f5f5);
      }

      /* Slotted content styles for main nav items */
      ::slotted(li[slot="nav-items"] > a),
      ::slotted(li[slot="nav-items"] > button),
      ::slotted(li[slot="nav-items"] > ul > li > a),
      ::slotted(li[slot="nav-items"] > ul > li > button) {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        text-decoration: none;
        color: var(--color-text-primary, #1a1a1a);
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: background var(--duration-fast, 150ms);
      }

      ::slotted(li[slot="nav-items"] > a:hover),
      ::slotted(li[slot="nav-items"] > button:hover),
      ::slotted(li[slot="nav-items"] > ul > li > a:hover),
      ::slotted(li[slot="nav-items"] > ul > li > button:hover) {
        background: var(--color-background-secondary, #f5f5f5);
      }

      ::slotted(li[slot="nav-items"] > a:focus-visible),
      ::slotted(li[slot="nav-items"] > button:focus-visible),
      ::slotted(li[slot="nav-items"] > ul > li > a:focus-visible),
      ::slotted(li[slot="nav-items"] > ul > li > button:focus-visible) {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: -2px;
      }

      ::slotted(li[slot="nav-items"] > a.active),
      ::slotted(li[slot="nav-items"] > button.active),
      ::slotted(li[slot="nav-items"] > ul > li > a.active),
      ::slotted(li[slot="nav-items"] > ul > li > button.active) {
        background: var(--color-background-secondary, #f5f5f5);
        border-left: 3px solid var(--color-brand-primary, #1a1a1a);
      }

      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > a),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > button),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > a),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > button) {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
      }

      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > a:hover),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > button:hover),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > a:hover),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > button:hover) {
        background: var(--color-background-secondary, #f5f5f5);
      }

      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > a.active),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > button.active),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > a.active),
      :host([variant="technical"]) ::slotted(li[slot="nav-items"] > ul > li > button.active) {
        border-left-color: var(--color-border-technical, #1a1a1a);
      }

      /* Slotted content styles for nested menus */
      ::slotted(li[slot="nav-items"] ul) {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        box-shadow: var(--shadow-md, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        list-style: none;
        margin: var(--spacing-1, 0.25rem) 0 0 0;
        padding: var(--spacing-2, 0.5rem) 0;
        z-index: 1000;
      }

      :host([variant="technical"]) ::slotted(li[slot="nav-items"] ul) {
        background: var(--color-background-technical, #f5f5f5);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        box-shadow: var(--shadow-lg, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      }

      ::slotted(li[slot="nav-items"].expanded ul) {
        display: block;
      }

      ::slotted(li[slot="nav-items"] ul li) {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ::slotted(li[slot="nav-items"] ul li a),
      ::slotted(li[slot="nav-items"] ul li button) {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: none;
        text-decoration: none;
        color: var(--color-text-primary, #1a1a1a);
        border: none;
        background: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        transition: all var(--duration-fast, 150ms);
      }

      ::slotted(li[slot="nav-items"] ul li a:hover),
      ::slotted(li[slot="nav-items"] ul li button:hover) {
        background: var(--color-background-secondary, #f5f5f5);
      }

      ::slotted(li[slot="nav-items"] ul li a:focus-visible),
      ::slotted(li[slot="nav-items"] ul li button:focus-visible) {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: -2px;
      }

      /* Hamburger Button (Mobile) */
      .hamburger-button {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        padding: var(--spacing-2, 0.5rem);
        background: none;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        cursor: pointer;
        transition: all var(--duration-technical, 200ms);
      }

      :host([variant="technical"]) .hamburger-button {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-technical, #f5f5f5);
      }

      .hamburger-button:hover {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-border-technical, #1a1a1a);
      }

      .hamburger-button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }

      .hamburger-line {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--color-text-primary, #1a1a1a);
        margin: 3px 0;
        transition: all var(--duration-normal, 250ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .hamburger-button[aria-expanded="true"] .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .hamburger-button[aria-expanded="true"] .hamburger-line:nth-child(2) {
        opacity: 0;
      }

      .hamburger-button[aria-expanded="true"] .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }

      /* Mobile Menu Overlay - uses shared backdrop styles */
      .mobile-menu-overlay {
        display: none;
        position: fixed;
        z-index: var(--pilot-nav-overlay-z-index, 99);
      }

      .mobile-menu-overlay.open {
        display: block;
      }

      /* Mobile Menu Panel */
      .mobile-menu {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        width: 80%;
        max-width: 320px;
        height: 100vh;
        background: var(--color-background-primary, #ffffff);
        border-left: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        box-shadow: var(--shadow-lg, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
        z-index: var(--pilot-nav-mobile-z-index, 101);
        transform: translateX(100%);
        transition: transform var(--duration-normal, 250ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        overflow-y: auto;
      }

      :host([variant="technical"]) .mobile-menu {
        background: var(--color-background-technical, #f5f5f5);
        border-left: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }

      .mobile-menu.open {
        display: block;
        transform: translateX(0);
      }

      .mobile-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        border-bottom: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
      }

      :host([variant="technical"]) .mobile-menu-header {
        border-bottom: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }

      .mobile-menu-title {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-primary, #1a1a1a);
        margin: 0;
      }

      .mobile-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: none;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        cursor: pointer;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-text-secondary, #525252);
        transition: all var(--duration-fast, 150ms);
      }

      :host([variant="technical"]) .mobile-close-button {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }

      .mobile-close-button:hover {
        color: var(--color-text-primary, #1a1a1a);
        background: var(--color-background-secondary, #f5f5f5);
      }

      .mobile-close-button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }

      .mobile-nav-menu {
        list-style: none;
        margin: 0;
        padding: var(--spacing-4, 1rem) 0;
      }

      .mobile-actions {
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        border-top: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host([variant="technical"]) .mobile-actions {
        border-top: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }

      .nav-item--mobile {
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }

      :host([variant="technical"]) .nav-item--mobile {
        border-bottom: 1px solid var(--color-border-primary, #b3b3b3);
      }

      .nav-link--mobile {
        justify-content: space-between;
        width: 100%;
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
      }

      .nav-link--mobile.active {
        border-left: 3px solid var(--color-border-technical, #1a1a1a);
      }

      /* Mobile Nested Menu */
      .mobile-nav-submenu {
        display: none;
        list-style: none;
        margin: 0;
        padding: 0;
        background: var(--color-background-secondary, #f5f5f5);
      }

      :host([variant="technical"]) .mobile-nav-submenu {
        background: var(--color-gray-100, #e5e5e5);
      }

      .nav-item--mobile.expanded > .mobile-nav-submenu {
        display: block;
      }

      .mobile-nav-submenu .nav-link--mobile {
        padding-left: var(--spacing-8, 2rem);
        text-transform: none;
        font-size: var(--font-size-sm, 0.875rem);
      }

      .mobile-nav-submenu .mobile-nav-submenu .nav-link--mobile {
        padding-left: var(--spacing-12, 3rem);
      }

      .expand-icon {
        font-size: 0.7em;
        transition: transform var(--duration-fast, 150ms);
      }

      .nav-item--mobile.expanded > .nav-link--mobile .expand-icon {
        transform: rotate(180deg);
      }

      /* Responsive Breakpoint */
      @media (max-width: ${breakpoint}px) {
        .nav-menu {
          display: none;
        }

        .nav-actions {
          display: none;
        }

        .hamburger-button {
          display: flex;
        }
      }

      /* Prevent body scroll when mobile menu is open */
      :host([open]) {
        overflow: hidden;
      }

      /* Skip Link for Accessibility */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        z-index: 10000;
        transition: top var(--duration-fast, 150ms);
      }

      .skip-link:focus {
        top: 0;
      }
    `;
  }

  render() {
    const sticky = this.hasAttribute('sticky');
    const variant = this.getAttribute('variant') || 'default';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>

      <a href="#nav-content" class="skip-link">Skip to navigation</a>

      <nav class="nav-container" part="container" role="navigation" aria-label="Main navigation">
        <div class="nav-brand" part="brand">
          <slot name="brand"></slot>
        </div>

        <!-- Desktop Menu -->
        <ul class="nav-menu" part="menu" role="menubar">
          <slot name="nav-items"></slot>
        </ul>

        <!-- Actions Slot -->
        <div class="nav-actions" part="actions">
          <slot name="actions"></slot>
        </div>

        <!-- Hamburger Button -->
        <button
          class="hamburger-button"
          part="hamburger"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay backdrop" part="overlay" aria-hidden="true"></div>

      <!-- Mobile Menu Panel -->
      <div
        id="mobile-menu"
        class="mobile-menu"
        part="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div class="mobile-menu-header" part="mobile-header">
          <h2 class="mobile-menu-title">Menu</h2>
          <button
            class="mobile-close-button"
            part="close-button"
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>
        <ul class="mobile-nav-menu" part="mobile-nav" role="menu">
          <slot name="mobile-nav-items"></slot>
        </ul>
        
        <!-- Mobile Actions -->
        <div class="mobile-actions" part="mobile-actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <div id="nav-content"></div>
    `;

    this._attachEventListeners();
  }

  _attachEventListeners() {
    // Hamburger button click
    const hamburger = this.shadowRoot.querySelector('.hamburger-button');
    if (hamburger) {
      hamburger.addEventListener('click', () => this._toggleMenu());
    }

    // Close button click
    const closeButton = this.shadowRoot.querySelector('.mobile-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => this._closeMenu());
    }

    // Overlay click
    const overlay = this.shadowRoot.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this._closeMenu());
    }

    // Handle slotted content for desktop
    const navSlot = this.shadowRoot.querySelector('slot[name="nav-items"]');
    if (navSlot) {
      navSlot.addEventListener('slotchange', () => this._processNavItems(navSlot));
    }

    // Handle slotted content for mobile
    const mobileNavSlot = this.shadowRoot.querySelector('slot[name="mobile-nav-items"]');
    if (mobileNavSlot) {
      mobileNavSlot.addEventListener('slotchange', () => this._processMobileNavItems(mobileNavSlot));
    }

    // Handle actions slot
    const actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]');
    if (actionsSlot) {
      actionsSlot.addEventListener('slotchange', () => {
        const assigned = actionsSlot.assignedElements();
        if (assigned.length > 0) {
          // Actions are present, ensure container is visible
          const actionsContainer = this.shadowRoot.querySelector('.nav-actions');
          if (actionsContainer) {
            actionsContainer.style.display = 'flex';
          }
        }
      });
    }

    // Listen for theme changes
    this._themeChangeHandler = (e) => {
      // Force re-render to pick up new CSS variable values
      this._updateThemeStyles();
    };
    document.addEventListener('themechange', this._themeChangeHandler);
  }

  _updateThemeStyles() {
    // The CSS variables will auto-update, but we can force a reflow if needed
    const container = this.shadowRoot.querySelector('.nav-container');
    if (container) {
      // Trigger a reflow to ensure styles are recalculated
      container.style.setProperty('--pilot-theme-update', Date.now());
    }
  }

  _processNavItems(slot) {
    const items = slot.assignedElements();
    items.forEach(item => {
      if (item.tagName === 'LI') {
        // Skip if already processed
        if (this._processedNavItems.has(item)) {
          return;
        }
        this._processedNavItems.add(item);

        item.classList.add('nav-item');
        item.setAttribute('role', 'none');

        const link = item.querySelector('a, button');
        if (link) {
          link.classList.add('nav-link');
          link.setAttribute('role', 'menuitem');

          // Check for nested menu
          const submenu = item.querySelector('ul');
          if (submenu) {
            link.setAttribute('data-has-children', 'true');
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            submenu.classList.add('nav-submenu');
            submenu.setAttribute('role', 'menu');

            // Process submenu items
            const subItems = submenu.querySelectorAll('li');
            subItems.forEach(subItem => {
              subItem.classList.add('nav-item');
              subItem.setAttribute('role', 'none');
              const subLink = subItem.querySelector('a, button');
              if (subLink) {
                subLink.classList.add('nav-link');
                subLink.setAttribute('role', 'menuitem');
              }
            });

            // Toggle submenu on click
            link.addEventListener('click', (e) => {
              if (submenu) {
                e.preventDefault();
                this._toggleSubmenu(item, link);
              }
            });
          } else {
            // Close all submenus when clicking a nav item without children
            link.addEventListener('click', () => {
              this._closeAllSubmenus();
            });
          }
        }
      }
    });
  }

  _closeAllSubmenus() {
    // Close all desktop submenus (nav items are in light DOM, not shadow DOM)
    // Query all li elements with slot="nav-items" that are expanded
    const navItems = this.querySelectorAll('li[slot="nav-items"].expanded');
    navItems.forEach(item => {
      item.classList.remove('expanded');
      const link = item.querySelector('a, button');
      if (link) {
        link.setAttribute('aria-expanded', 'false');
      }
    });

    // Also close any nested submenus within nav items
    const nestedItems = this.querySelectorAll('li[slot="nav-items"] li.expanded');
    nestedItems.forEach(item => {
      item.classList.remove('expanded');
      const link = item.querySelector('a, button');
      if (link) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  }

  _processMobileNavItems(slot) {
    const items = slot.assignedElements();
    items.forEach(item => {
      if (item.tagName === 'LI') {
        // Skip if already processed
        if (this._processedMobileNavItems.has(item)) {
          return;
        }
        this._processedMobileNavItems.add(item);

        item.classList.add('nav-item', 'nav-item--mobile');

        const link = item.querySelector('a, button');
        if (link) {
          link.classList.add('nav-link', 'nav-link--mobile');

          // Check for nested menu
          const submenu = item.querySelector('ul');
          if (submenu) {
            // Add expand icon
            const expandIcon = document.createElement('span');
            expandIcon.classList.add('expand-icon');
            expandIcon.textContent = '▼';
            expandIcon.setAttribute('aria-hidden', 'true');
            link.appendChild(expandIcon);

            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            submenu.classList.add('mobile-nav-submenu');

            // Process submenu items recursively
            this._processMobileSubmenu(submenu, 1);

            // Toggle submenu on click
            link.addEventListener('click', (e) => {
              e.preventDefault();
              this._toggleMobileSubmenu(item, link);
            });
          }

          // Close menu on link click (if no submenu)
          if (!submenu) {
            link.addEventListener('click', () => {
              this._closeMenu();
            });
          }
        }
      }
    });
  }

  _processMobileSubmenu(submenu, depth) {
    const items = submenu.querySelectorAll(':scope > li');
    items.forEach(item => {
      item.classList.add('nav-item', 'nav-item--mobile');

      const link = item.querySelector('a, button');
      if (link) {
        link.classList.add('nav-link', 'nav-link--mobile');

        const nestedSubmenu = item.querySelector('ul');
        if (nestedSubmenu) {
          const expandIcon = document.createElement('span');
          expandIcon.classList.add('expand-icon');
          expandIcon.textContent = '▼';
          expandIcon.setAttribute('aria-hidden', 'true');
          link.appendChild(expandIcon);

          link.setAttribute('aria-haspopup', 'true');
          link.setAttribute('aria-expanded', 'false');
          nestedSubmenu.classList.add('mobile-nav-submenu');

          this._processMobileSubmenu(nestedSubmenu, depth + 1);

          link.addEventListener('click', (e) => {
            e.preventDefault();
            this._toggleMobileSubmenu(item, link);
          });
        }
      }
    });
  }

  _toggleSubmenu(item, link) {
    const isExpanded = item.classList.contains('expanded');

    // Close all other submenus at the same level
    const siblings = item.parentElement.querySelectorAll(':scope > li.expanded');
    siblings.forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove('expanded');
        const siblingLink = sibling.querySelector('a, button');
        if (siblingLink) {
          siblingLink.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Toggle current submenu
    if (isExpanded) {
      item.classList.remove('expanded');
      link.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('expanded');
      link.setAttribute('aria-expanded', 'true');
    }
  }

  _toggleMobileSubmenu(item, link) {
    const isExpanded = item.classList.contains('expanded');

    if (isExpanded) {
      item.classList.remove('expanded');
      link.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('expanded');
      link.setAttribute('aria-expanded', 'true');
    }
  }

  _toggleMenu() {
    if (this._isOpen) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _openMenu() {
    this._isOpen = true;
    this.setAttribute('open', '');

    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    const overlay = this.shadowRoot.querySelector('.mobile-menu-overlay');
    const hamburger = this.shadowRoot.querySelector('.hamburger-button');

    if (mobileMenu) {
      mobileMenu.classList.add('open');
    }
    if (overlay) {
      overlay.classList.add('open');
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'true');
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Add event listeners
    document.addEventListener('keydown', this._keydownHandler);
    document.addEventListener('click', this._clickOutsideHandler);

      // Focus first menu item
      setTimeout(() => {
        const firstLink = this.shadowRoot.querySelector('.nav-link--mobile');
        if (firstLink) {
          firstLink.focus();
        }
      }, 100);
  }

  _closeMenu() {
    this._isOpen = false;
    this.removeAttribute('open');

    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    const overlay = this.shadowRoot.querySelector('.mobile-menu-overlay');
    const hamburger = this.shadowRoot.querySelector('.hamburger-button');

    if (mobileMenu) {
      mobileMenu.classList.remove('open');
    }
    if (overlay) {
      overlay.classList.remove('open');
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }

    // Restore body scroll
    document.body.style.overflow = '';

    // Remove event listeners
    document.removeEventListener('keydown', this._keydownHandler);
    document.removeEventListener('click', this._clickOutsideHandler);

    // Return focus to hamburger button
    if (hamburger) {
      hamburger.focus();
    }
  }

  _handleKeydown(event) {
    if (event.key === 'Escape') {
      this._closeMenu();
    }

    // Handle Tab key for focus trap
    if (event.key === 'Tab' && this._isOpen) {
      this._handleFocusTrap(event);
    }
  }

  _handleFocusTrap(event) {
    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    if (!mobileMenu) return;

    const focusableElements = mobileMenu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  _handleClickOutside(event) {
    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    const hamburger = this.shadowRoot.querySelector('.hamburger-button');

    // Use composedPath() to handle shadow DOM event retargeting
    // event.target is retargeted to the host element in shadow DOM,
    // so we need the full path to check if click was inside mobile menu or hamburger
    const path = event.composedPath();
    const clickedInsideMenu = path.includes(mobileMenu);
    const clickedInsideHamburger = path.includes(hamburger);

    if (mobileMenu && !clickedInsideMenu && !clickedInsideHamburger) {
      this._closeMenu();
    }
  }

  _handleResize() {
    // Close mobile menu if window is resized above breakpoint
    if (this._isOpen && window.innerWidth > this._breakpoint) {
      this._closeMenu();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'breakpoint' && newValue !== null) {
      const parsed = parseInt(newValue, 10);
      this._breakpoint = isNaN(parsed) ? 768 : parsed;
      this.render();
    } else if (name === 'open') {
      // Use targeted updates for open attribute to preserve event listeners
      if (newValue !== null && !this._isOpen) {
        this._openMenu();
      } else if (newValue === null && this._isOpen) {
        this._closeMenu();
      }
    }
    // Note: 'sticky' and 'variant' attributes are handled via CSS :host selectors
    // No need to re-render for these
  }

  connectedCallback() {
    // Initialize breakpoint from attribute
    const breakpointAttr = this.getAttribute('breakpoint');
    if (breakpointAttr !== null) {
      const parsed = parseInt(breakpointAttr, 10);
      this._breakpoint = isNaN(parsed) ? 768 : parsed;
    }
    
    // Window resize listener for responsive behavior
    window.addEventListener('resize', this._resizeHandler);
    
    // Note: Slotted content is processed via slotchange event listeners
    // in _attachEventListeners(), which is called from render()
  }

  disconnectedCallback() {
    // Clean up event listeners
    document.removeEventListener('keydown', this._keydownHandler);
    document.removeEventListener('click', this._clickOutsideHandler);
    window.removeEventListener('resize', this._resizeHandler);
    document.removeEventListener('themechange', this._themeChangeHandler);

    // Restore body scroll if component is removed while menu is open
    if (this._isOpen) {
      document.body.style.overflow = '';
    }
  }

  // Public API
  open() {
    this._openMenu();
  }

  close() {
    this._closeMenu();
  }

  toggle() {
    this._toggleMenu();
  }
}

customElements.define('pilot-nav-menu', PilotNavMenu);
