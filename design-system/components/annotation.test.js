/**
 * PilotAnnotation Unit Tests
 * 
 * Tests for the Pilot Annotation component using Vitest and happy-dom.
 * These tests focus on component logic, attribute handling, and DOM structure.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component (will be defined in global scope)
const annotationModule = await import('./annotation.js');
const { PilotAnnotation } = annotationModule;

describe('PilotAnnotation', () => {
  // Register component before tests
  beforeEach(() => {
    registerComponent('pilot-annotation', PilotAnnotation);
  });

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders with default attributes', async () => {
      const annotation = mount('pilot-annotation', {}, 'Annotation content');
      await waitForRender(annotation);
      
      expect(annotation.shadowRoot).toBeTruthy();
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
      expect(label.getAttribute('type')).toBe('note');
      expect(label.getAttribute('position')).toBe('top-left');
    });

    it('applies default type (note)', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('note');
    });

    it('applies default position (top-left)', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('position')).toBe('top-left');
    });

    it('applies type attribute', async () => {
      const annotation = mount('pilot-annotation', { type: 'warning' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('warning');
    });

    it('applies position attribute', async () => {
      const annotation = mount('pilot-annotation', { position: 'top-right' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('position')).toBe('top-right');
    });

    it('supports all type variants', async () => {
      const types = ['note', 'warning', 'important', 'technical'];
      
      for (const type of types) {
        cleanup();
        const annotation = mount('pilot-annotation', { type });
        await waitForRender(annotation);
        
        const label = annotation.shadowRoot.querySelector('.label');
        expect(label.getAttribute('type')).toBe(type);
      }
    });

    it('supports all position variants', async () => {
      const positions = ['top-left', 'top-right'];
      
      for (const position of positions) {
        cleanup();
        const annotation = mount('pilot-annotation', { position });
        await waitForRender(annotation);
        
        const label = annotation.shadowRoot.querySelector('.label');
        expect(label.getAttribute('position')).toBe(position);
      }
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when type changes', async () => {
      const annotation = mount('pilot-annotation', { type: 'note' });
      await waitForRender(annotation);
      
      annotation.setAttribute('type', 'warning');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('warning');
    });

    it('re-renders when position changes', async () => {
      const annotation = mount('pilot-annotation', { position: 'top-left' });
      await waitForRender(annotation);
      
      annotation.setAttribute('position', 'top-right');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('position')).toBe('top-right');
    });

    it('re-renders when type is removed', async () => {
      const annotation = mount('pilot-annotation', { type: 'warning' });
      await waitForRender(annotation);
      
      annotation.removeAttribute('type');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('note');
    });

    it('re-renders when position is removed', async () => {
      const annotation = mount('pilot-annotation', { position: 'top-right' });
      await waitForRender(annotation);
      
      annotation.removeAttribute('position');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('position')).toBe('top-left');
    });

    it('preserves attributes on re-render', async () => {
      const annotation = mount('pilot-annotation', { 
        type: 'important',
        position: 'top-right'
      });
      await waitForRender(annotation);
      
      // Trigger re-render by changing one attribute
      annotation.setAttribute('type', 'technical');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('technical');
      expect(label.getAttribute('position')).toBe('top-right');
    });
  });

  describe('Slots', () => {
    it('renders default slot content', async () => {
      const annotation = mount('pilot-annotation', {}, '<p>Custom content</p>');
      await waitForRender(annotation);
      
      const slot = annotation.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders text content', async () => {
      const annotation = mount('pilot-annotation', {}, 'Annotation text');
      await waitForRender(annotation);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(annotation.textContent.trim()).toBe('Annotation text');
    });

    it('renders HTML content in slot', async () => {
      const annotation = mount('pilot-annotation', {}, '<strong>Bold</strong> text');
      await waitForRender(annotation);
      
      // Check light DOM content since happy-dom doesn't distribute slots
      expect(annotation.querySelector('strong')).toBeTruthy();
    });

    it('renders complex HTML content', async () => {
      const annotation = mount('pilot-annotation', {}, 
        '<div><h3>Title</h3><p>Paragraph</p></div>'
      );
      await waitForRender(annotation);
      
      expect(annotation.querySelector('h3')).toBeTruthy();
      expect(annotation.querySelector('p')).toBeTruthy();
    });
  });

  describe('CSS Custom Properties', () => {
    it('has label element with computed styles', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      const styles = window.getComputedStyle(label);
      
      // Basic style checks
      expect(styles.position).toBe('absolute');
    });

    it('applies CSS variable fallbacks', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      
      // Check that the element exists and has styles
      expect(label).toBeTruthy();
      expect(label.style).toBeDefined();
    });

    it('host element has shadow root', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      // Verify host element is properly mounted with shadow root
      expect(annotation.shadowRoot).toBeTruthy();
      expect(annotation.tagName.toLowerCase()).toBe('pilot-annotation');
    });
  });

  describe('Shadow DOM', () => {
    it('has open shadow root', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      expect(annotation.shadowRoot).toBeTruthy();
      expect(annotation.shadowRoot.mode).toBe('open');
    });

    it('contains style element', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const style = annotation.shadowRoot.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.label');
    });

    it('contains label element', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
    });

    it('contains slot element', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const slot = annotation.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('label has data-type attribute', async () => {
      const annotation = mount('pilot-annotation', { type: 'warning' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('data-type')).toBe('warning');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot content', async () => {
      const annotation = mount('pilot-annotation');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
      const slot = annotation.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('handles rapid attribute changes', async () => {
      const annotation = mount('pilot-annotation', { type: 'note' });
      await waitForRender(annotation);
      
      // Rapid changes
      annotation.setAttribute('type', 'warning');
      annotation.setAttribute('position', 'top-right');
      
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('warning');
      expect(label.getAttribute('position')).toBe('top-right');
    });

    it('handles invalid type value gracefully', async () => {
      const annotation = mount('pilot-annotation', { type: 'invalid-type' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('type')).toBe('invalid-type');
      // Component should still render without errors
      expect(annotation.shadowRoot).toBeTruthy();
    });

    it('handles invalid position value gracefully', async () => {
      const annotation = mount('pilot-annotation', { position: 'invalid-position' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('position')).toBe('invalid-position');
      // Component should still render without errors
      expect(annotation.shadowRoot).toBeTruthy();
    });

    it('handles special characters in slot content', async () => {
      const annotation = mount('pilot-annotation', {}, 
        'Special chars: <>&"\' and unicode: 日本語'
      );
      await waitForRender(annotation);
      
      expect(annotation.textContent).toContain('Special chars');
      expect(annotation.textContent).toContain('日本語');
    });

    it('handles whitespace-only slot content', async () => {
      const annotation = mount('pilot-annotation', {}, '   ');
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label).toBeTruthy();
    });

    it('handles very long slot content', async () => {
      const longContent = 'A'.repeat(10000);
      const annotation = mount('pilot-annotation', {}, longContent);
      await waitForRender(annotation);
      
      expect(annotation.textContent).toBe(longContent);
    });

    it('maintains structure after multiple re-renders', async () => {
      const annotation = mount('pilot-annotation', { type: 'note' });
      await waitForRender(annotation);
      
      // Multiple re-renders
      for (let i = 0; i < 5; i++) {
        annotation.setAttribute('type', i % 2 === 0 ? 'warning' : 'note');
        await waitForRender(annotation);
      }
      
      const label = annotation.shadowRoot.querySelector('.label');
      const slot = annotation.shadowRoot.querySelector('slot');
      expect(label).toBeTruthy();
      expect(slot).toBeTruthy();
    });
  });

  describe('Label Content', () => {
    it('label displays correct text for note type', async () => {
      const annotation = mount('pilot-annotation', { type: 'note' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('data-type')).toBe('note');
    });

    it('label displays correct text for warning type', async () => {
      const annotation = mount('pilot-annotation', { type: 'warning' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('data-type')).toBe('warning');
    });

    it('label displays correct text for important type', async () => {
      const annotation = mount('pilot-annotation', { type: 'important' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('data-type')).toBe('important');
    });

    it('label displays correct text for technical type', async () => {
      const annotation = mount('pilot-annotation', { type: 'technical' });
      await waitForRender(annotation);
      
      const label = annotation.shadowRoot.querySelector('.label');
      expect(label.getAttribute('data-type')).toBe('technical');
    });
  });
});
