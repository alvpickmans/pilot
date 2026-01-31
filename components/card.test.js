/**
 * PilotCard Unit Tests
 * 
 * Tests for the Pilot Card component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
// We need to import it to trigger the custom element definition
const cardModule = await import('./card.js');
const { PilotCard } = cardModule;

describe('PilotCard', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-card', PilotCard);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const card = mount('pilot-card', {}, 'Card Content');
      await waitForRender(card);
      
      expect(card.shadowRoot).toBeTruthy();
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement).toBeTruthy();
      expect(card.textContent.trim()).toBe('Card Content');
    });

    it('applies default variant (default)', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('variant')).toBe('default');
    });

    it('applies default padding (md)', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(contentElement.getAttribute('padding')).toBe('md');
    });

    it('applies default bordered (false)', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('bordered')).toBe('false');
    });

    it('applies variant attribute', async () => {
      const card = mount('pilot-card', { variant: 'technical' });
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('variant')).toBe('technical');
    });

    it('applies padding attribute', async () => {
      const card = mount('pilot-card', { padding: 'lg' });
      await waitForRender(card);
      
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(contentElement.getAttribute('padding')).toBe('lg');
    });

    it('applies bordered attribute', async () => {
      const card = mount('pilot-card', { bordered: 'true' });
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('bordered')).toBe('true');
    });

    it('supports all variants', async () => {
      const variants = ['default', 'technical'];
      
      for (const variant of variants) {
        cleanup();
        const card = mount('pilot-card', { variant });
        await waitForRender(card);
        
        const cardElement = card.shadowRoot.querySelector('.card');
        expect(cardElement.getAttribute('variant')).toBe(variant);
      }
    });

    it('supports all padding values', async () => {
      const paddings = ['sm', 'md', 'lg', 'xl'];
      
      for (const padding of paddings) {
        cleanup();
        const card = mount('pilot-card', { padding });
        await waitForRender(card);
        
        const contentElement = card.shadowRoot.querySelector('.content');
        expect(contentElement.getAttribute('padding')).toBe(padding);
      }
    });

    it('supports bordered true and false', async () => {
      const borderedValues = ['true', 'false'];
      
      for (const bordered of borderedValues) {
        cleanup();
        const card = mount('pilot-card', { bordered });
        await waitForRender(card);
        
        const cardElement = card.shadowRoot.querySelector('.card');
        expect(cardElement.getAttribute('bordered')).toBe(bordered);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when variant changes', async () => {
      const card = mount('pilot-card', { variant: 'default' });
      await waitForRender(card);
      
      card.setAttribute('variant', 'technical');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('variant')).toBe('technical');
    });

    it('re-renders when padding changes', async () => {
      const card = mount('pilot-card', { padding: 'sm' });
      await waitForRender(card);
      
      card.setAttribute('padding', 'xl');
      await waitForRender(card);
      
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(contentElement.getAttribute('padding')).toBe('xl');
    });

    it('re-renders when bordered changes', async () => {
      const card = mount('pilot-card', { bordered: 'false' });
      await waitForRender(card);
      
      card.setAttribute('bordered', 'true');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement.getAttribute('bordered')).toBe('true');
    });

    it('preserves all attributes on re-render', async () => {
      const card = mount('pilot-card', { 
        variant: 'technical',
        padding: 'lg',
        bordered: 'true'
      });
      await waitForRender(card);
      
      // Trigger re-render by changing one attribute
      card.setAttribute('padding', 'sm');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      const contentElement = card.shadowRoot.querySelector('.content');
      
      expect(cardElement.getAttribute('variant')).toBe('technical');
      expect(contentElement.getAttribute('padding')).toBe('sm');
      expect(cardElement.getAttribute('bordered')).toBe('true');
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const card = mount('pilot-card', {}, '<div class="custom-content">Custom</div>');
      await waitForRender(card);
      
      const slots = card.shadowRoot.querySelectorAll('slot');
      expect(slots.length).toBeGreaterThanOrEqual(1);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(card.querySelector('.custom-content')).toBeTruthy();
    });

    it('renders text content', async () => {
      const card = mount('pilot-card', {}, 'Card Text');
      await waitForRender(card);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(card.textContent.trim()).toBe('Card Text');
    });

    it('renders header slot content', async () => {
      const card = mount('pilot-card', {}, '<div slot="header">Header Content</div>');
      await waitForRender(card);
      
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
      
      // Check light DOM content
      expect(card.querySelector('[slot="header"]')).toBeTruthy();
    });

    it('renders footer slot content', async () => {
      const card = mount('pilot-card', {}, '<div slot="footer">Footer Content</div>');
      await waitForRender(card);
      
      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
      
      // Check light DOM content
      expect(card.querySelector('[slot="footer"]')).toBeTruthy();
    });

    it('renders all slots together', async () => {
      const card = mount('pilot-card', {}, `
        <div slot="header">Header</div>
        <div>Main Content</div>
        <div slot="footer">Footer</div>
      `);
      await waitForRender(card);
      
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const defaultSlot = card.shadowRoot.querySelector('slot:not([name])');
      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      
      expect(headerSlot).toBeTruthy();
      expect(defaultSlot).toBeTruthy();
      expect(footerSlot).toBeTruthy();
    });

    it('renders HTML content in slots', async () => {
      const card = mount('pilot-card', {}, `
        <h2 slot="header"><strong>Bold</strong> Header</h2>
        <p>Paragraph with <em>emphasis</em></p>
        <button slot="footer">Action</button>
      `);
      await waitForRender(card);
      
      // Check light DOM content
      expect(card.querySelector('h2 strong')).toBeTruthy();
      expect(card.querySelector('p em')).toBeTruthy();
      expect(card.querySelector('button')).toBeTruthy();
    });
  });

  describe('Shadow DOM Structure', () => {
    it('has open shadow root', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      expect(card.shadowRoot).toBeTruthy();
      expect(card.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const style = card.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.card');
    });

    it('contains card container element', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement).toBeTruthy();
    });

    it('contains content wrapper element', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(contentElement).toBeTruthy();
    });

    it('has correct DOM hierarchy', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const style = card.shadowRoot.querySelector('style');
      const cardElement = card.shadowRoot.querySelector('.card');
      const contentElement = card.shadowRoot.querySelector('.content');
      
      // Style should be first child
      expect(style).toBeTruthy();
      
      // Card should contain content
      expect(cardElement).toBeTruthy();
      expect(contentElement).toBeTruthy();
      expect(cardElement.contains(contentElement)).toBe(true);
    });
  });

  describe('CSS Custom Properties', () => {
    it('has card element with computed styles', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      const styles = window.getComputedStyle(cardElement);
      
      // Basic style checks
      expect(styles.display).toBe('block');
    });

    it('applies CSS variable fallbacks', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      const contentElement = card.shadowRoot.querySelector('.content');
      
      // Check that elements exist and have styles
      expect(cardElement).toBeTruthy();
      expect(cardElement.style).toBeDefined();
      expect(contentElement).toBeTruthy();
      expect(contentElement.style).toBeDefined();
    });

    it('has styles for technical variant', async () => {
      const card = mount('pilot-card', { variant: 'technical' });
      await waitForRender(card);
      
      const style = card.shadowRoot.querySelector('style');
      expect(style.textContent).toContain('variant="technical"');
      expect(style.textContent).toContain('::before');
      expect(style.textContent).toContain('::after');
    });

    it('has styles for bordered state', async () => {
      const card = mount('pilot-card', { bordered: 'true' });
      await waitForRender(card);
      
      const style = card.shadowRoot.querySelector('style');
      expect(style.textContent).toContain('bordered="true"');
    });

    it('has styles for all padding values', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const style = card.shadowRoot.querySelector('style');
      expect(style.textContent).toContain('padding="sm"');
      expect(style.textContent).toContain('padding="md"');
      expect(style.textContent).toContain('padding="lg"');
      expect(style.textContent).toContain('padding="xl"');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const card = mount('pilot-card');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(cardElement).toBeTruthy();
      expect(contentElement).toBeTruthy();
    });

    it('handles whitespace-only content', async () => {
      const card = mount('pilot-card', {}, '   \n\t   ');
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const card = mount('pilot-card', { variant: 'default' });
      await waitForRender(card);
      
      // Rapid changes
      card.setAttribute('variant', 'technical');
      card.setAttribute('padding', 'xl');
      card.setAttribute('bordered', 'true');
      
      await waitForRender(card);
      
      const cardElement = card.shadowRoot.querySelector('.card');
      const contentElement = card.shadowRoot.querySelector('.content');
      
      expect(cardElement.getAttribute('variant')).toBe('technical');
      expect(contentElement.getAttribute('padding')).toBe('xl');
      expect(cardElement.getAttribute('bordered')).toBe('true');
    });

    it('handles invalid variant gracefully', async () => {
      const card = mount('pilot-card', { variant: 'invalid' });
      await waitForRender(card);
      
      // Should still render with the invalid value
      const cardElement = card.shadowRoot.querySelector('.card');
      expect(cardElement).toBeTruthy();
      expect(cardElement.getAttribute('variant')).toBe('invalid');
    });

    it('handles invalid padding gracefully', async () => {
      const card = mount('pilot-card', { padding: 'invalid' });
      await waitForRender(card);
      
      // Should still render with the invalid value
      const contentElement = card.shadowRoot.querySelector('.content');
      expect(contentElement).toBeTruthy();
      expect(contentElement.getAttribute('padding')).toBe('invalid');
    });

    it('preserves content on attribute changes', async () => {
      const card = mount('pilot-card', {}, 'Original Content');
      await waitForRender(card);
      
      // Change attributes
      card.setAttribute('variant', 'technical');
      card.setAttribute('padding', 'lg');
      await waitForRender(card);
      
      // Content should still be there
      expect(card.textContent.trim()).toBe('Original Content');
    });

    it('handles special characters in content', async () => {
      const specialContent = '<script>alert("xss")</script>';
      const card = mount('pilot-card', {}, specialContent);
      await waitForRender(card);
      
      // Content should be preserved as text
      expect(card.textContent).toContain('alert');
    });

    it('handles multiple cards on same page', async () => {
      const card1 = mount('pilot-card', { variant: 'default' }, 'Card 1');
      const card2 = mount('pilot-card', { variant: 'technical' }, 'Card 2');
      const card3 = mount('pilot-card', { padding: 'lg' }, 'Card 3');
      
      await waitForRender(card1);
      await waitForRender(card2);
      await waitForRender(card3);
      
      expect(card1.shadowRoot.querySelector('.card').getAttribute('variant')).toBe('default');
      expect(card2.shadowRoot.querySelector('.card').getAttribute('variant')).toBe('technical');
      expect(card3.shadowRoot.querySelector('.content').getAttribute('padding')).toBe('lg');
    });
  });
});
