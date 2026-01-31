/**
 * Pilot Design System - Tabs Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Helper to wait for tabs to be parsed (setTimeout in connectedCallback)
const waitForTabs = () => new Promise(resolve => setTimeout(resolve, 50));

const module = await import('./tabs.js');
const { PilotTabs, PilotTab } = module;

describe('PilotTabs', () => {
  beforeEach(() => {
    registerComponent('pilot-tabs', PilotTabs);
    registerComponent('pilot-tab', PilotTab);
  });

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(customElements.get('pilot-tabs')).toBeDefined();
    expect(customElements.get('pilot-tab')).toBeDefined();
  });

  it('should render tabs from pilot-tab elements', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
      <pilot-tab label="Tab 3">Content 3</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    expect(tabButtons.length).toBe(3);
    expect(tabButtons[0].textContent.trim()).toBe('Tab 1');
    expect(tabButtons[1].textContent.trim()).toBe('Tab 2');
    expect(tabButtons[2].textContent.trim()).toBe('Tab 3');
  });

  it('should show first tab content by default', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[0].classList.contains('active')).toBe(true);
    expect(tabPanels[1].classList.contains('active')).toBe(false);
    expect(tabPanels[0].textContent.trim()).toBe('Content 1');
  });

  it('should switch tabs on click', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    tabButtons[1].click();
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[0].classList.contains('active')).toBe(false);
    expect(tabPanels[1].classList.contains('active')).toBe(true);
    expect(tabButtons[1].classList.contains('active')).toBe(true);
  });

  it('should support active-tab attribute', async () => {
    const tabs = mount('pilot-tabs', { 'active-tab': '1' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    
    expect(tabPanels[1].classList.contains('active')).toBe(true);
    expect(tabButtons[1].classList.contains('active')).toBe(true);
  });

  it('should support disabled tabs', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2" disabled>Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    expect(tabButtons[1].classList.contains('disabled')).toBe(true);
    expect(tabButtons[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('should not switch to disabled tab on click', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2" disabled>Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    tabButtons[1].click();
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[0].classList.contains('active')).toBe(true);
    expect(tabPanels[1].classList.contains('active')).toBe(false);
  });

  it('should support icons in tabs', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1" icon="★">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    const icon = tabButtons[0].querySelector('.tab-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('★');
  });

  it('should dispatch tab-change event', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const changeHandler = vi.fn();
    tabs.addEventListener('tab-change', changeHandler);
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    tabButtons[1].click();
    
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          index: 1,
          tab: expect.objectContaining({ label: 'Tab 2' })
        })
      })
    );
  });

  it('should support keyboard navigation with ArrowRight', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
      <pilot-tab label="Tab 3">Content 3</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    tabs.dispatchEvent(event);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[1].classList.contains('active')).toBe(true);
  });

  it('should support keyboard navigation with ArrowLeft', async () => {
    const tabs = mount('pilot-tabs', { 'active-tab': '1' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    tabs.dispatchEvent(event);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[0].classList.contains('active')).toBe(true);
  });

  it('should support keyboard navigation with Home key', async () => {
    const tabs = mount('pilot-tabs', { 'active-tab': '2' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
      <pilot-tab label="Tab 3">Content 3</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    tabs.dispatchEvent(event);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[0].classList.contains('active')).toBe(true);
  });

  it('should support keyboard navigation with End key', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
      <pilot-tab label="Tab 3">Content 3</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    tabs.dispatchEvent(event);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[2].classList.contains('active')).toBe(true);
  });

  it('should skip disabled tabs with keyboard navigation', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2" disabled>Content 2</pilot-tab>
      <pilot-tab label="Tab 3">Content 3</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    tabs.dispatchEvent(event);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[2].classList.contains('active')).toBe(true);
  });

  it('should support vertical orientation', async () => {
    const tabs = mount('pilot-tabs', { orientation: 'vertical' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const container = tabs.shadowRoot.querySelector('.tabs-container');
    expect(container.classList.contains('vertical')).toBe(true);
    
    const tabList = tabs.shadowRoot.querySelector('.tab-list');
    const computedStyle = window.getComputedStyle(tabList);
    expect(computedStyle.flexDirection).toBe('column');
  });

  it('should support technical variant', async () => {
    const tabs = mount('pilot-tabs', { variant: 'technical' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const container = tabs.shadowRoot.querySelector('.tabs-container');
    expect(container.classList.contains('technical')).toBe(true);
  });

  it('should support underline variant', async () => {
    const tabs = mount('pilot-tabs', { variant: 'underline' }, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const container = tabs.shadowRoot.querySelector('.tabs-container');
    expect(container.classList.contains('underline')).toBe(true);
  });

  it('should update active tab when active-tab attribute changes', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    tabs.setAttribute('active-tab', '1');
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[1].classList.contains('active')).toBe(true);
  });

  it('should have correct ARIA attributes', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const container = tabs.shadowRoot.querySelector('.tabs-container');
    expect(container.getAttribute('role')).toBe('tablist');
    
    const tabButtons = tabs.shadowRoot.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      expect(button.getAttribute('role')).toBe('tab');
      expect(button.hasAttribute('aria-selected')).toBe(true);
    });
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
      expect(panel.getAttribute('role')).toBe('tabpanel');
    });
  });

  it('should get and set activeTab property', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2">Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    expect(tabs.activeTab).toBe(0);
    
    tabs.activeTab = 1;
    await waitForRender(tabs);
    await waitForTabs();
    
    expect(tabs.activeTab).toBe(1);
    
    const tabPanels = tabs.shadowRoot.querySelectorAll('.tab-panel');
    expect(tabPanels[1].classList.contains('active')).toBe(true);
  });

  it('should get tabs array', async () => {
    const tabs = mount('pilot-tabs', {}, `
      <pilot-tab label="Tab 1">Content 1</pilot-tab>
      <pilot-tab label="Tab 2" disabled>Content 2</pilot-tab>
    `);
    
    await waitForRender(tabs);
    await waitForTabs();
    
    const tabsArray = tabs.tabs;
    expect(tabsArray.length).toBe(2);
    expect(tabsArray[0].label).toBe('Tab 1');
    expect(tabsArray[1].disabled).toBe(true);
  });
});

describe('PilotTab', () => {
  beforeEach(() => {
    registerComponent('pilot-tab', PilotTab);
  });

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(customElements.get('pilot-tab')).toBeDefined();
  });

  it('should hide itself when connected', async () => {
    const tab = mount('pilot-tab', { label: 'Test' }, 'Content');
    
    await waitForRender(tab);
    
    expect(tab.style.display).toBe('none');
  });
});
