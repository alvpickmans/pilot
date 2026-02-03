/**
 * Pilot Design System - Stat Card Tests
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./stat-card.js');
const { PilotStatCard } = module;

describe('PilotStatCard', () => {
  beforeEach(() => {
    registerComponent('pilot-stat-card', PilotStatCard);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('should be defined', () => {
      expect(customElements.get('pilot-stat-card')).toBeDefined();
    });

    it('renders with default attributes', async () => {
      const statCard = mount('pilot-stat-card');
      await waitForRender(statCard);
      
      expect(statCard.shadowRoot).toBeTruthy();
      const cardElement = statCard.shadowRoot.querySelector('.stat-card');
      expect(cardElement).toBeTruthy();
    });

    it('renders with value attribute', async () => {
      const statCard = mount('pilot-stat-card', { value: '$12,500' });
      await waitForRender(statCard);
      
      const valueElement = statCard.shadowRoot.querySelector('.value');
      expect(valueElement.textContent).toBe('$12,500');
    });

    it('renders with label attribute', async () => {
      const statCard = mount('pilot-stat-card', { label: 'Total Revenue' });
      await waitForRender(statCard);
      
      const labelElement = statCard.shadowRoot.querySelector('.label');
      expect(labelElement.textContent).toBe('Total Revenue');
    });

    it('renders with icon attribute', async () => {
      const statCard = mount('pilot-stat-card', { icon: '💰', value: '100', label: 'Test' });
      await waitForRender(statCard);
      
      const iconElement = statCard.shadowRoot.querySelector('.icon');
      expect(iconElement).toBeTruthy();
      expect(iconElement.textContent).toBe('💰');
    });
  });

  describe('Trend Indicators', () => {
    it('renders positive trend with up arrow', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '85%',
        label: 'Success Rate',
        trend: '12.5',
        'trend-label': 'vs last month'
      });
      await waitForRender(statCard);
      
      const trendElement = statCard.shadowRoot.querySelector('.trend');
      expect(trendElement).toBeTruthy();
      expect(trendElement.getAttribute('positive')).toBe('');
      expect(trendElement.textContent).toContain('▲');
      expect(trendElement.textContent).toContain('12.5%');
    });

    it('renders negative trend with down arrow', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '$8,200',
        label: 'Expenses',
        trend: '-5.3',
        'trend-label': 'vs last month'
      });
      await waitForRender(statCard);
      
      const trendElement = statCard.shadowRoot.querySelector('.trend');
      expect(trendElement).toBeTruthy();
      expect(trendElement.getAttribute('negative')).toBe('');
      expect(trendElement.textContent).toContain('▼');
      expect(trendElement.textContent).toContain('5.3%');
    });

    it('renders trend label', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '100',
        label: 'Test',
        trend: '5',
        'trend-label': 'since yesterday'
      });
      await waitForRender(statCard);
      
      const trendLabelElement = statCard.shadowRoot.querySelector('.trend-label');
      expect(trendLabelElement).toBeTruthy();
      expect(trendLabelElement.textContent).toBe('since yesterday');
    });

    it('does not render trend section when trend is not provided', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '100',
        label: 'Test'
      });
      await waitForRender(statCard);
      
      const trendContainer = statCard.shadowRoot.querySelector('.trend-container');
      expect(trendContainer).toBeFalsy();
    });
  });

  describe('Loading State', () => {
    it('renders in loading state', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '100',
        label: 'Test',
        loading: 'true'
      });
      await waitForRender(statCard);
      
      const cardElement = statCard.shadowRoot.querySelector('.stat-card');
      expect(cardElement.getAttribute('loading')).toBe('true');
    });
  });

  describe('Variant', () => {
    it('renders default variant', async () => {
      const statCard = mount('pilot-stat-card', { value: '100', label: 'Test' });
      await waitForRender(statCard);
      
      const cardElement = statCard.shadowRoot.querySelector('.stat-card');
      expect(cardElement.getAttribute('variant')).toBe('default');
    });

    it('renders technical variant', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '100',
        label: 'Test',
        variant: 'technical'
      });
      await waitForRender(statCard);
      
      const cardElement = statCard.shadowRoot.querySelector('.stat-card');
      expect(cardElement.getAttribute('variant')).toBe('technical');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when value changes', async () => {
      const statCard = mount('pilot-stat-card', { value: '100', label: 'Test' });
      await waitForRender(statCard);
      
      statCard.setAttribute('value', '200');
      await waitForRender(statCard);
      
      const valueElement = statCard.shadowRoot.querySelector('.value');
      expect(valueElement.textContent).toBe('200');
    });

    it('re-renders when trend changes', async () => {
      const statCard = mount('pilot-stat-card', { 
        value: '100',
        label: 'Test',
        trend: '5'
      });
      await waitForRender(statCard);
      
      statCard.setAttribute('trend', '-10');
      await waitForRender(statCard);
      
      const trendElement = statCard.shadowRoot.querySelector('.trend');
      expect(trendElement.getAttribute('negative')).toBe('');
      expect(trendElement.textContent).toContain('10%');
    });

    it('re-renders when loading changes', async () => {
      const statCard = mount('pilot-stat-card', { value: '100', label: 'Test' });
      await waitForRender(statCard);
      
      statCard.setAttribute('loading', 'true');
      await waitForRender(statCard);
      
      const cardElement = statCard.shadowRoot.querySelector('.stat-card');
      expect(cardElement.getAttribute('loading')).toBe('true');
    });
  });

  describe('Complete Examples', () => {
    it('renders complete financial KPI card', async () => {
      const statCard = mount('pilot-stat-card', {
        value: '$124,500',
        label: 'Total Revenue',
        trend: '12.5',
        'trend-label': 'vs last month',
        icon: '💰'
      });
      await waitForRender(statCard);
      
      expect(statCard.shadowRoot.querySelector('.value').textContent).toBe('$124,500');
      expect(statCard.shadowRoot.querySelector('.label').textContent).toBe('Total Revenue');
      expect(statCard.shadowRoot.querySelector('.trend')).toBeTruthy();
      expect(statCard.shadowRoot.querySelector('.icon')).toBeTruthy();
    });

    it('renders metric with negative trend', async () => {
      const statCard = mount('pilot-stat-card', {
        value: '23',
        label: 'Open Issues',
        trend: '-8.3',
        'trend-label': 'vs last week',
        icon: '🐛'
      });
      await waitForRender(statCard);
      
      const trendElement = statCard.shadowRoot.querySelector('.trend');
      expect(trendElement.getAttribute('negative')).toBe('');
    });
  });
});
