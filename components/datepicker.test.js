/**
 * Pilot Design System - Datepicker Component Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerComponent, mount, cleanup, waitForRender } from '../tests/web-components.js';

// Import the component
const datepickerModule = await import('./datepicker.js');
const { PilotDatepicker } = datepickerModule;

describe('PilotDatepicker', () => {
  beforeEach(() => {
    registerComponent('pilot-datepicker', PilotDatepicker);
  });

  afterEach(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(customElements.get('pilot-datepicker')).toBeDefined();
  });

  it('should render with default attributes', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    const shadowRoot = datepicker.shadowRoot;
    expect(shadowRoot).toBeTruthy();

    const trigger = shadowRoot.querySelector('.trigger');
    expect(trigger).toBeTruthy();

    const triggerText = shadowRoot.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Select a date');
  });

  it('should render with custom placeholder', async () => {
    const datepicker = mount('pilot-datepicker', { placeholder: 'Pick a date' });
    await waitForRender(datepicker);

    const shadowRoot = datepicker.shadowRoot;
    const triggerText = shadowRoot.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Pick a date');
  });

  it('should render with label', async () => {
    const datepicker = mount('pilot-datepicker', { label: 'Date of Birth' });
    await waitForRender(datepicker);

    const shadowRoot = datepicker.shadowRoot;
    const label = shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Date of Birth');
  });

  it('should open calendar', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open calendar using internal method
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Check the internal state
    expect(datepicker._isOpen).toBe(true);
    
    // Check the DOM
    const calendar = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendar).toBeTruthy();
    expect(calendar.classList.contains('open')).toBe(true);
  });

  it('should close calendar', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open then close using internal methods
    datepicker._openDropdown();
    await waitForRender(datepicker);
    
    datepicker._closeDropdown();
    await waitForRender(datepicker);

    // Check the internal state
    expect(datepicker._isOpen).toBe(false);
    
    // Check the DOM
    const calendar = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendar.classList.contains('open')).toBe(false);
  });

  it('should select a date in single mode', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Find a day button that's not disabled
    const day = datepicker.shadowRoot.querySelector('.day:not(.disabled):not(.other-month)');
    expect(day).toBeTruthy();

    // Get the date from the day element
    const dateStr = day.getAttribute('data-date');
    const date = new Date(dateStr);

    // Select the date using internal method
    datepicker._selectDate(date);
    await waitForRender(datepicker);

    // Calendar should close after selection in single mode
    const calendar = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendar.classList.contains('open')).toBe(false);

    // Value should be set
    expect(datepicker.getAttribute('value')).toBeTruthy();
  });

  it('should support range mode', async () => {
    const datepicker = mount('pilot-datepicker', { mode: 'range' });
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Get first and fifth days
    const days = datepicker.shadowRoot.querySelectorAll('.day:not(.disabled):not(.other-month)');
    
    // Select first date
    const firstDateStr = days[0].getAttribute('data-date');
    const firstDate = new Date(firstDateStr);
    datepicker._selectDate(firstDate);
    await waitForRender(datepicker);

    // Calendar should stay open in range mode after first selection
    expect(datepicker._isOpen).toBe(true);
    const calendar = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendar.classList.contains('open')).toBe(true);

    // Select second date
    const fifthDateStr = days[5].getAttribute('data-date');
    const fifthDate = new Date(fifthDateStr);
    datepicker._selectDate(fifthDate);
    await waitForRender(datepicker);

    // Calendar should close after range is complete
    const calendarAfter = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendarAfter.classList.contains('open')).toBe(false);

    // Value should contain both dates
    const value = datepicker.getAttribute('value');
    expect(value).toContain(',');
  });

  it('should respect min date constraint', async () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 5);

    const datepicker = mount('pilot-datepicker', { min: minDate.toISOString().split('T')[0] });
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Days before min date should be disabled
    const disabledDays = datepicker.shadowRoot.querySelectorAll('.day.disabled');
    expect(disabledDays.length).toBeGreaterThan(0);
  });

  it('should respect max date constraint', async () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() - 5);

    const datepicker = mount('pilot-datepicker', { max: maxDate.toISOString().split('T')[0] });
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Days after max date should be disabled
    const disabledDays = datepicker.shadowRoot.querySelectorAll('.day.disabled');
    expect(disabledDays.length).toBeGreaterThan(0);
  });

  it('should navigate to previous month', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    const monthYear = datepicker.shadowRoot.querySelector('.month-year');
    const initialMonth = monthYear.textContent;

    // Navigate to previous month
    datepicker._previousMonth();
    await waitForRender(datepicker);

    const newMonthYear = datepicker.shadowRoot.querySelector('.month-year');
    expect(newMonthYear.textContent).not.toBe(initialMonth);
  });

  it('should navigate to next month', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open calendar
    datepicker._openDropdown();
    await waitForRender(datepicker);

    const monthYear = datepicker.shadowRoot.querySelector('.month-year');
    const initialMonth = monthYear.textContent;

    // Navigate to next month
    datepicker._nextMonth();
    await waitForRender(datepicker);

    const newMonthYear = datepicker.shadowRoot.querySelector('.month-year');
    expect(newMonthYear.textContent).not.toBe(initialMonth);
  });

  it('should clear selection', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    // Open calendar and select a date
    datepicker._openDropdown();
    await waitForRender(datepicker);

    const day = datepicker.shadowRoot.querySelector('.day:not(.disabled):not(.other-month)');
    const dateStr = day.getAttribute('data-date');
    const date = new Date(dateStr);
    datepicker._selectDate(date);
    await waitForRender(datepicker);

    // Clear selection
    datepicker._clearSelection();
    await waitForRender(datepicker);

    // Value should be empty
    expect(datepicker.getAttribute('value')).toBe('');

    // Trigger text should show placeholder
    const triggerText = datepicker.shadowRoot.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Select a date');
  });

  it('should dispatch change event on selection', async () => {
    const datepicker = mount('pilot-datepicker');
    await waitForRender(datepicker);

    const changeHandler = vi.fn();
    datepicker.addEventListener('change', changeHandler);

    // Open calendar and select a date
    datepicker._openDropdown();
    await waitForRender(datepicker);

    const day = datepicker.shadowRoot.querySelector('.day:not(.disabled):not(.other-month)');
    const dateStr = day.getAttribute('data-date');
    const date = new Date(dateStr);
    datepicker._selectDate(date);
    await waitForRender(datepicker);

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail).toHaveProperty('value');
    expect(changeHandler.mock.calls[0][0].detail).toHaveProperty('startDate');
  });

  it('should format dates according to format attribute', async () => {
    const datepicker = mount('pilot-datepicker', { format: 'DD/MM/YYYY', value: '2026-01-15' });
    await waitForRender(datepicker);

    const shadowRoot = datepicker.shadowRoot;
    const triggerText = shadowRoot.querySelector('.trigger-text');

    // The formatted date should appear in the trigger
    expect(triggerText.textContent).toContain('15/01/2026');
  });

  it('should be disabled when disabled attribute is set', async () => {
    const datepicker = mount('pilot-datepicker', { disabled: true });
    await waitForRender(datepicker);

    const shadowRoot = datepicker.shadowRoot;
    const trigger = shadowRoot.querySelector('.trigger');

    expect(trigger.hasAttribute('disabled')).toBe(true);

    // Try to open calendar - should not work when disabled
    datepicker._openDropdown();
    await waitForRender(datepicker);

    // Calendar should remain closed
    expect(datepicker._isOpen).toBe(false);
    const calendar = datepicker.shadowRoot.querySelector('.calendar');
    expect(calendar.classList.contains('open')).toBe(false);
  });
});
