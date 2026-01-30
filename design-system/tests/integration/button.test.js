/**
 * PilotButton Integration Tests
 * 
 * These tests run in real browsers using @web/test-runner and Playwright.
 * They test accessibility, shadow DOM structure, and user interactions.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '../../components/button.js';

describe('PilotButton Integration', () => {
  describe('Accessibility', () => {
    it('passes a11y audit for default button', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      await expect(el).to.be.accessible();
    });

    it('passes a11y audit for primary button', async () => {
      const el = await fixture(html`<pilot-button variant="primary">Click me</pilot-button>`);
      await expect(el).to.be.accessible();
    });

    it('passes a11y audit for disabled button', async () => {
      const el = await fixture(html`<pilot-button disabled>Click me</pilot-button>`);
      await expect(el).to.be.accessible();
    });

    it('passes a11y audit for loading button', async () => {
      const el = await fixture(html`<pilot-button loading>Loading</pilot-button>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('Shadow DOM Structure', () => {
    it('renders correct shadow DOM structure', async () => {
      const el = await fixture(html`<pilot-button variant="primary" size="lg">Click me</pilot-button>`);
      
      expect(el).shadowDom.to.equal(`
        <button variant="primary" size="lg">
          <slot></slot>
        </button>
      `);
    });

    it('renders with default variant and size', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      
      expect(el).shadowDom.to.equal(`
        <button variant="secondary" size="md">
          <slot></slot>
        </button>
      `);
    });

    it('matches semantic snapshot', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('matches snapshot for all variants', async () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'technical'];
      
      for (const variant of variants) {
        const el = await fixture(html`<pilot-button variant="${variant}">Button</pilot-button>`);
        await expect(el).shadowDom.to.equalSnapshot({ 
          name: `button-variant-${variant}` 
        });
      }
    });
  });

  describe('User Interactions', () => {
    it('responds to click events', async () => {
      const el = await fixture(html`<pilot-button>Click me</pilot-button>`);
      let clicked = false;
      
      el.addEventListener('click', () => { clicked = true; });
      el.shadowRoot.querySelector('button').click();
      
      expect(clicked).to.be.true;
    });

    it('does not respond when disabled', async () => {
      const el = await fixture(html`<pilot-button disabled>Click me</pilot-button>`);
      let clicked = false;
      
      el.addEventListener('click', () => { clicked = true; });
      const button = el.shadowRoot.querySelector('button');
      
      expect(button.disabled).to.be.true;
      
      // Try clicking
      button.click();
      expect(clicked).to.be.false;
    });

    it('does not respond when loading', async () => {
      const el = await fixture(html`<pilot-button loading>Loading</pilot-button>`);
      let clicked = false;
      
      el.addEventListener('click', () => { clicked = true; });
      const button = el.shadowRoot.querySelector('button');
      
      // Loading state should prevent clicks
      button.click();
      expect(clicked).to.be.false;
    });

    it('triggers focus on button when focused', async () => {
      const el = await fixture(html`<pilot-button>Focus me</pilot-button>`);
      const button = el.shadowRoot.querySelector('button');
      
      button.focus();
      expect(document.activeElement).to.equal(el);
    });
  });

  describe('Attribute Changes', () => {
    it('updates variant attribute', async () => {
      const el = await fixture(html`<pilot-button variant="secondary">Button</pilot-button>`);
      
      el.setAttribute('variant', 'primary');
      await el.updateComplete;
      
      const button = el.shadowRoot.querySelector('button');
      expect(button.getAttribute('variant')).to.equal('primary');
    });

    it('updates size attribute', async () => {
      const el = await fixture(html`<pilot-button size="sm">Button</pilot-button>`);
      
      el.setAttribute('size', 'lg');
      await el.updateComplete;
      
      const button = el.shadowRoot.querySelector('button');
      expect(button.getAttribute('size')).to.equal('lg');
    });

    it('toggles disabled state', async () => {
      const el = await fixture(html`<pilot-button>Button</pilot-button>`);
      
      el.setAttribute('disabled', '');
      await el.updateComplete;
      
      let button = el.shadowRoot.querySelector('button');
      expect(button.hasAttribute('disabled')).to.be.true;
      
      el.removeAttribute('disabled');
      await el.updateComplete;
      
      button = el.shadowRoot.querySelector('button');
      expect(button.hasAttribute('disabled')).to.be.false;
    });
  });

  describe('Styling', () => {
    it('has correct display style', async () => {
      const el = await fixture(html`<pilot-button>Button</pilot-button>`);
      const button = el.shadowRoot.querySelector('button');
      
      const styles = window.getComputedStyle(button);
      expect(styles.display).to.equal('inline-flex');
    });

    it('technical variant has correct structure', async () => {
      const el = await fixture(html`<pilot-button variant="technical">Button</pilot-button>`);
      const button = el.shadowRoot.querySelector('button');
      
      expect(button.getAttribute('variant')).to.equal('technical');
    });
  });

  describe('Slot Content', () => {
    it('renders text slot content', async () => {
      const el = await fixture(html`<pilot-button>Text Content</pilot-button>`);
      
      expect(el.textContent).to.equal('Text Content');
    });

    it('renders HTML slot content', async () => {
      const el = await fixture(html`<pilot-button><strong>Bold</strong> Text</pilot-button>`);
      
      const strong = el.querySelector('strong');
      expect(strong).to.not.be.null;
      expect(strong.textContent).to.equal('Bold');
    });

    it('renders icon slot content', async () => {
      const el = await fixture(html`
        <pilot-button>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7"/>
          </svg>
          With Icon
        </pilot-button>
      `);
      
      const svg = el.querySelector('svg');
      expect(svg).to.not.be.null;
    });
  });

  describe('DOM Diffing', () => {
    it('ignores specific attributes in comparison', async () => {
      const el = await fixture(html`<pilot-button id="test-btn">Button</pilot-button>`);
      
      await expect(el).dom.to.equal(`<pilot-button id="test-btn">Button</pilot-button>`);
    });

    it('compares light DOM correctly', async () => {
      const el = await fixture(html`<pilot-button>Light DOM Content</pilot-button>`);
      
      await expect(el).lightDom.to.equal(`<pilot-button>Light DOM Content</pilot-button>`);
    });
  });
});
