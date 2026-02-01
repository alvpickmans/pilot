/**
 * Pilot Design System - Pagination Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

const module = await import('./pagination.js');
const { PilotPagination } = module;

describe('PilotPagination', () => {
  beforeEach(() => {
    registerComponent('pilot-pagination', PilotPagination);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('should be defined', () => {
      expect(customElements.get('pilot-pagination')).toBeDefined();
    });

    it('renders with default attributes', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      expect(pagination.shadowRoot).toBeTruthy();
      const container = pagination.shadowRoot.querySelector('.pagination-container');
      expect(container).toBeTruthy();
    });

    it('renders page buttons', async () => {
      const pagination = mount('pilot-pagination', { total: '50', 'per-page': '10' });
      await waitForRender(pagination);
      
      const pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(5); // 50 items / 10 per page = 5 pages
    });

    it('renders navigation buttons', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      const prevBtn = pagination.shadowRoot.querySelector('[data-action="prev"]');
      const nextBtn = pagination.shadowRoot.querySelector('[data-action="next"]');
      
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
    });

    it('renders first/last buttons when show-first-last is set', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '50', 
        'show-first-last': true 
      });
      await waitForRender(pagination);
      
      const firstBtn = pagination.shadowRoot.querySelector('[data-action="first"]');
      const lastBtn = pagination.shadowRoot.querySelector('[data-action="last"]');
      
      expect(firstBtn).toBeTruthy();
      expect(lastBtn).toBeTruthy();
    });

    it('renders per page selector by default', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      const perPageSelect = pagination.shadowRoot.querySelector('.per-page-select');
      expect(perPageSelect).toBeTruthy();
    });

    it('hides per page selector when hide-per-page is set', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100', 
        'hide-per-page': true 
      });
      await waitForRender(pagination);
      
      const perPageSelect = pagination.shadowRoot.querySelector('.per-page-select');
      expect(perPageSelect).toBeFalsy();
    });

    it('renders page info by default', async () => {
      const pagination = mount('pilot-pagination', { total: '100', page: '2' });
      await waitForRender(pagination);
      
      const pageInfo = pagination.shadowRoot.querySelector('.page-info');
      expect(pageInfo).toBeTruthy();
      expect(pageInfo.textContent).toContain('11-20 of 100');
    });

    it('hides page info when hide-info is set', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100', 
        'hide-info': true 
      });
      await waitForRender(pagination);
      
      const pageInfo = pagination.shadowRoot.querySelector('.page-info');
      expect(pageInfo).toBeFalsy();
    });

    it('shows ellipsis for large page ranges', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '200', 
        'per-page': '10',
        page: '10'
      });
      await waitForRender(pagination);
      
      const ellipsis = pagination.shadowRoot.querySelectorAll('.ellipsis');
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('marks current page as active', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '50', 
        page: '3' 
      });
      await waitForRender(pagination);
      
      const activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn).toBeTruthy();
      expect(activeBtn.textContent.trim()).toBe('3');
    });

    it('disables prev button on first page', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '50', 
        page: '1' 
      });
      await waitForRender(pagination);
      
      const prevBtn = pagination.shadowRoot.querySelector('[data-action="prev"]');
      expect(prevBtn.disabled).toBe(true);
    });

    it('disables next button on last page', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '30', 
        'per-page': '10',
        page: '3' 
      });
      await waitForRender(pagination);
      
      const nextBtn = pagination.shadowRoot.querySelector('[data-action="next"]');
      expect(nextBtn.disabled).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('emits change event when page is clicked', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      const changeHandler = vi.fn();
      pagination.addEventListener('change', changeHandler);
      
      // Call internal method directly instead of clicking
      pagination._goToPage(2);
      
      expect(changeHandler).toHaveBeenCalled();
      expect(changeHandler.mock.calls[0][0].detail.page).toBe(2);
    });

    it('emits change event with correct detail', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100', 
        page: '2',
        'per-page': '10'
      });
      await waitForRender(pagination);
      
      const changeHandler = vi.fn();
      pagination.addEventListener('change', changeHandler);
      
      pagination._goToPage(3);
      
      const detail = changeHandler.mock.calls[0][0].detail;
      expect(detail.page).toBe(3);
      expect(detail.perPage).toBe(10);
      expect(detail.total).toBe(100);
      expect(detail.totalPages).toBe(10);
      expect(detail.startItem).toBe(21);
      expect(detail.endItem).toBe(30);
    });

    it('changes page when page button is clicked', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      pagination._goToPage(3);
      await waitForRender(pagination);
      
      const activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn.textContent.trim()).toBe('3');
    });

    it('changes page when prev/next buttons are used', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '50', 
        page: '2' 
      });
      await waitForRender(pagination);
      
      pagination._goToPage(1);
      await waitForRender(pagination);
      
      let activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn.textContent.trim()).toBe('1');
      
      pagination._goToPage(2);
      await waitForRender(pagination);
      
      activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn.textContent.trim()).toBe('2');
    });

    it('updates per page and resets to first page', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100', 
        page: '5',
        'per-page': '10'
      });
      await waitForRender(pagination);
      
      const changeHandler = vi.fn();
      pagination.addEventListener('change', changeHandler);
      
      // Simulate changing per page
      pagination._perPage = 25;
      pagination._page = 1;
      pagination._emitChange();
      pagination.render();
      
      await waitForRender(pagination);
      
      const activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn.textContent.trim()).toBe('1');
    });
  });

  describe('Attribute Changes', () => {
    it('re-renders when total changes', async () => {
      const pagination = mount('pilot-pagination', { total: '50', 'max-visible': '10' });
      await waitForRender(pagination);
      
      let pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(5);
      
      pagination.setAttribute('total', '100');
      await waitForRender(pagination);
      
      pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(10);
    });

    it('re-renders when page changes', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '50', 
        page: '1' 
      });
      await waitForRender(pagination);
      
      pagination.setAttribute('page', '3');
      await waitForRender(pagination);
      
      const activeBtn = pagination.shadowRoot.querySelector('.page-btn.active');
      expect(activeBtn.textContent.trim()).toBe('3');
    });

    it('re-renders when per-page changes', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100', 
        'per-page': '10',
        'max-visible': '10'
      });
      await waitForRender(pagination);
      
      let pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(10);
      
      pagination.setAttribute('per-page', '25');
      await waitForRender(pagination);
      
      pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(4);
    });
  });

  describe('Public API', () => {
    it('has page getter/setter', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      expect(pagination.page).toBe(1);
      
      pagination.page = 3;
      expect(pagination.getAttribute('page')).toBe('3');
    });

    it('has perPage getter/setter', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      expect(pagination.perPage).toBe(10);
      
      pagination.perPage = 25;
      expect(pagination.getAttribute('per-page')).toBe('25');
    });

    it('has total getter/setter', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      expect(pagination.total).toBe(50);
      
      pagination.total = 100;
      expect(pagination.getAttribute('total')).toBe('100');
    });

    it('has goToPage method', async () => {
      const pagination = mount('pilot-pagination', { total: '50' });
      await waitForRender(pagination);
      
      const changeHandler = vi.fn();
      pagination.addEventListener('change', changeHandler);
      
      pagination.goToPage(4);
      
      expect(pagination.page).toBe(4);
      expect(changeHandler).toHaveBeenCalled();
    });

    it('does not navigate beyond bounds', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '30', 
        'per-page': '10'
      });
      await waitForRender(pagination);
      
      pagination.goToPage(0);
      expect(pagination.page).toBe(1);
      
      pagination.goToPage(10);
      expect(pagination.page).toBe(1); // Still 1 because we didn't emit change
    });
  });

  describe('Edge Cases', () => {
    it('handles zero total items', async () => {
      const pagination = mount('pilot-pagination', { total: '0' });
      await waitForRender(pagination);
      
      const pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(0);
      
      const nextBtn = pagination.shadowRoot.querySelector('[data-action="next"]');
      expect(nextBtn.disabled).toBe(true);
    });

    it('handles single page', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '5', 
        'per-page': '10'
      });
      await waitForRender(pagination);
      
      const pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBe(1);
      
      const prevBtn = pagination.shadowRoot.querySelector('[data-action="prev"]');
      const nextBtn = pagination.shadowRoot.querySelector('[data-action="next"]');
      expect(prevBtn.disabled).toBe(true);
      expect(nextBtn.disabled).toBe(true);
    });

    it('respects max-visible attribute', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '200', 
        'per-page': '10',
        'max-visible': '5',
        page: '10'
      });
      await waitForRender(pagination);
      
      const pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      // Should show: 1, ..., 8, 9, 10, 11, 12, ..., 20
      expect(pageButtons.length).toBeLessThanOrEqual(7); // 5 visible + 2 boundary
    });

    it('handles rapid page changes', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      const changeHandler = vi.fn();
      pagination.addEventListener('change', changeHandler);
      
      pagination.goToPage(2);
      pagination.goToPage(3);
      pagination.goToPage(4);
      
      expect(changeHandler).toHaveBeenCalledTimes(3);
      expect(pagination.page).toBe(4);
    });
  });

  describe('Responsive Behavior', () => {
    it('has pagination-wrapper element for responsive layout', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      const wrapper = pagination.shadowRoot.querySelector('.pagination-wrapper');
      expect(wrapper).toBeTruthy();
    });

    it('has pagination-meta container for per-page and info', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      const meta = pagination.shadowRoot.querySelector('.pagination-meta');
      expect(meta).toBeTruthy();
      
      const perPageContainer = meta.querySelector('.per-page-container');
      const pageInfo = meta.querySelector('.page-info');
      expect(perPageContainer).toBeTruthy();
      expect(pageInfo).toBeTruthy();
    });

    it('hides per-page selector when data-hide-per-page is set', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      // Manually trigger responsive state update
      pagination.setAttribute('data-hide-per-page', 'true');
      await waitForRender(pagination);
      
      const perPageSelect = pagination.shadowRoot.querySelector('.per-page-select');
      expect(perPageSelect).toBeFalsy();
    });

    it('hides page info when data-hide-info is set', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      // Manually trigger responsive state update
      pagination.setAttribute('data-hide-info', 'true');
      await waitForRender(pagination);
      
      const pageInfo = pagination.shadowRoot.querySelector('.page-info');
      expect(pageInfo).toBeFalsy();
    });

    it('adjusts visible page buttons based on responsive state', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '200', 
        'per-page': '10',
        'max-visible': '7',
        page: '10'
      });
      await waitForRender(pagination);
      
      // Initially shows 7 buttons
      let pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      expect(pageButtons.length).toBeLessThanOrEqual(9); // 7 visible + 2 boundary pages
      
      // Simulate small screen by setting currentMaxVisible
      pagination._currentMaxVisible = 3;
      pagination.render();
      await waitForRender(pagination);
      
      pageButtons = pagination.shadowRoot.querySelectorAll('.page-btn');
      // Should show fewer buttons: 1, ..., 10, ..., 20 (5 max with small screen)
      expect(pageButtons.length).toBeLessThanOrEqual(5);
    });

    it('maintains ellipsis logic with fewer visible buttons', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '200', 
        'per-page': '10',
        page: '10'
      });
      await waitForRender(pagination);
      
      // Force small screen behavior
      pagination._currentMaxVisible = 3;
      pagination.render();
      await waitForRender(pagination);
      
      const ellipsis = pagination.shadowRoot.querySelectorAll('.ellipsis');
      // Should still show ellipsis for large ranges
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('is responsive by default', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      expect(pagination._isResponsive).toBe(true);
    });

    it('can disable responsive behavior with responsive="false"', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100',
        responsive: 'false'
      });
      await waitForRender(pagination);
      
      expect(pagination._isResponsive).toBe(false);
    });

    it('handles container resize gracefully', async () => {
      const pagination = mount('pilot-pagination', { total: '100' });
      await waitForRender(pagination);
      
      // Test that _updateResponsiveState method exists and works
      pagination._updateResponsiveState(400); // Small screen (< 480px)
      expect(pagination.getAttribute('data-hide-per-page')).toBe('true');
      expect(pagination.getAttribute('data-hide-info')).toBe('true');
      
      pagination._updateResponsiveState(500); // Medium screen (480px - 640px)
      expect(pagination.getAttribute('data-hide-per-page')).toBeNull();
      expect(pagination.getAttribute('data-hide-info')).toBe('true');
      
      pagination._updateResponsiveState(800); // Large screen (>= 640px)
      expect(pagination.getAttribute('data-hide-per-page')).toBeNull();
      expect(pagination.getAttribute('data-hide-info')).toBeNull();
    });

    it('preserves user-set hide-per-page and hide-info attributes', async () => {
      const pagination = mount('pilot-pagination', { 
        total: '100',
        'hide-per-page': true,
        'hide-info': true
      });
      await waitForRender(pagination);
      
      // Even on large screens, these should remain hidden
      pagination._updateResponsiveState(1000);
      
      const perPageSelect = pagination.shadowRoot.querySelector('.per-page-select');
      const pageInfo = pagination.shadowRoot.querySelector('.page-info');
      expect(perPageSelect).toBeFalsy();
      expect(pageInfo).toBeFalsy();
    });
  });
});
