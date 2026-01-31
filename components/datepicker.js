/**
 * Pilot Design System - Datepicker Component
 *
 * Date range picker with grid-based calendar for selecting dates and ranges.
 * Supports single date and range selection modes with month/year navigation.
 */

import { baseStyles, formFieldStyles, dropdownBaseStyles } from './shared.js';
import { DropdownBase } from './dropdown-base.js';

// ============================================
// TECHNICAL DATEPICKER COMPONENT
// ============================================

export class PilotDatepicker extends DropdownBase(HTMLElement) {
  static get observedAttributes() {
    return ['mode', 'min', 'max', 'format', 'value', 'label', 'disabled', 'placeholder'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._currentDate = new Date();
    this._selectedStartDate = null;
    this._selectedEndDate = null;
    this._hoverDate = null;
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      ${formFieldStyles}
      ${dropdownBaseStyles}

      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .datepicker-wrapper {
        position: relative;
      }

      /* Technical bracket styling - datepicker-specific with absolute positioning */
      .datepicker-wrapper.technical::before,
      .datepicker-wrapper.technical::after {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-2, 0.5rem);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }

      .datepicker-wrapper.technical::before {
        content: '[';
        left: 0;
      }

      .datepicker-wrapper.technical::after {
        content: ']';
        right: 0;
      }

      .datepicker-wrapper.technical .trigger {
        border-left: none;
        border-right: none;
        padding-left: var(--spacing-8, 2rem);
        padding-right: var(--spacing-8, 2rem);
      }

      .calendar {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: var(--spacing-1, 0.25rem);
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: none;
        flex-direction: column;
        padding: var(--spacing-4, 1rem);
      }

      .calendar.open {
        display: flex;
      }

      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-4, 1rem);
        padding-bottom: var(--spacing-3, 0.75rem);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }

      .month-year {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-primary, #1a1a1a);
      }

      .nav-buttons {
        display: flex;
        gap: var(--spacing-2, 0.5rem);
      }

      .nav-btn {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        border: 1px solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms);
        min-width: 36px;
        min-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-btn:hover {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-brand-primary, #1a1a1a);
      }

      .nav-btn:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
      }

      .nav-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .weekday-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: var(--spacing-1, 0.25rem);
        margin-bottom: var(--spacing-2, 0.5rem);
      }

      .weekday {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
        text-align: center;
        padding: var(--spacing-2, 0.5rem);
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: minmax(36px, auto);
        gap: var(--spacing-1, 0.25rem);
      }

      .day.placeholder {
        visibility: hidden;
        pointer-events: none;
      }

      .day {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms);
        min-height: 36px;
      }

      .day:hover:not(.disabled):not(.selected) {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-border-primary, #b3b3b3);
      }

      .day:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
      }

      .day.other-month {
        color: var(--color-text-tertiary, #6b6b6b);
      }

      .day.disabled {
        color: var(--color-text-disabled, #8a8a8a);
        cursor: not-allowed;
        opacity: 0.5;
      }

      .day.selected {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }

      .day.range-start {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }

      .day.range-end {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }

      .day.in-range {
        background: var(--color-background-technical, #f5f5f5);
        border-color: var(--color-border-primary, #b3b3b3);
      }

      .day.today {
        border-color: var(--color-brand-accent, #f59e0b);
        border-width: 2px;
      }

      .calendar-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: var(--spacing-4, 1rem);
        padding-top: var(--spacing-3, 0.75rem);
        border-top: 1px solid var(--color-border-secondary, #d4d4d4);
      }

      .selected-range {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-text-secondary, #525252);
      }

      .clear-btn {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        border: 1px solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-fast, 150ms);
      }

      .clear-btn:hover {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-brand-primary, #1a1a1a);
      }

      .clear-btn:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
      }
    `;
  }

  connectedCallback() {
    this._setupDropdownListeners();
    this._parseValue();
  }

  disconnectedCallback() {
    this._cleanupDropdown();
  }

  /**
   * Override _handleDropdownKeydown for datepicker-specific keyboard navigation
   */
  _handleDropdownKeydown(event) {
    if (this.hasAttribute('disabled')) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this._toggleDropdown();
        break;
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'ArrowLeft':
        if (this._isOpen) {
          event.preventDefault();
          this._navigateDays(-1);
        }
        break;
      case 'ArrowRight':
        if (this._isOpen) {
          event.preventDefault();
          this._navigateDays(1);
        }
        break;
      case 'ArrowUp':
        if (this._isOpen) {
          event.preventDefault();
          this._navigateDays(-7);
        }
        break;
      case 'ArrowDown':
        if (this._isOpen) {
          event.preventDefault();
          this._navigateDays(7);
        }
        break;
    }
  }

  _navigateDays(days) {
    const focusedDay = this.shadowRoot.querySelector('.day:focus');
    if (focusedDay) {
      const dateStr = focusedDay.getAttribute('data-date');
      if (dateStr) {
        const currentDate = new Date(dateStr);
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);

        // Check if we need to change month
        if (newDate.getMonth() !== this._currentDate.getMonth() ||
            newDate.getFullYear() !== this._currentDate.getFullYear()) {
          this._currentDate = new Date(newDate);
          this.render();
        }

        // Focus the new day after render
        setTimeout(() => {
          const newDay = this.shadowRoot.querySelector(`[data-date="${this._formatDate(newDate)}"]`);
          if (newDay) newDay.focus();
        }, 0);
      }
    }
  }

  _parseValue() {
    const value = this.getAttribute('value');
    const mode = this.getAttribute('mode') || 'single';

    if (value) {
      if (mode === 'range') {
        const [start, end] = value.split(',').map(v => v.trim());
        if (start) this._selectedStartDate = new Date(start);
        if (end) this._selectedEndDate = new Date(end);
      } else {
        this._selectedStartDate = new Date(value);
        this._selectedEndDate = null;
      }
    }
  }

  _formatDate(date) {
    if (!date || isNaN(date.getTime())) return '';
    const format = this.getAttribute('format') || 'YYYY-MM-DD';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  }

  _parseDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  _isDateDisabled(date) {
    const min = this._parseDate(this.getAttribute('min'));
    const max = this._parseDate(this.getAttribute('max'));

    if (min && date < min) return true;
    if (max && date > max) return true;

    return false;
  }

  _isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  _isDateInRange(date) {
    if (!this._selectedStartDate || !this._selectedEndDate) return false;
    return date > this._selectedStartDate && date < this._selectedEndDate;
  }

  _getCalendarDays() {
    const year = this._currentDate.getFullYear();
    const month = this._currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Previous month days (only enough to fill the first week)
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isOtherMonth: true,
        isVisible: false
      });
    }

    // Current month days (always visible)
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isOtherMonth: false,
        isVisible: true
      });
    }

    // Next month days (only enough to complete the last week)
    const totalDaysNeeded = days.length;
    const remainingDays = (7 - (totalDaysNeeded % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isOtherMonth: true,
        isVisible: false
      });
    }

    return days;
  }

  _getMonthYearLabel() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[this._currentDate.getMonth()]} ${this._currentDate.getFullYear()}`;
  }

  _getTriggerText() {
    const mode = this.getAttribute('mode') || 'single';

    if (mode === 'range') {
      if (this._selectedStartDate && this._selectedEndDate) {
        return `${this._formatDate(this._selectedStartDate)} - ${this._formatDate(this._selectedEndDate)}`;
      } else if (this._selectedStartDate) {
        return `${this._formatDate(this._selectedStartDate)} - ...`;
      }
    } else {
      if (this._selectedStartDate) {
        return this._formatDate(this._selectedStartDate);
      }
    }

    return this.getAttribute('placeholder') || 'Select a date';
  }

  /**
   * Override _openDropdown from DropdownBase for datepicker-specific behavior
   */
  _openDropdown(options = {}) {
    if (this.hasAttribute('disabled')) return;
    
    const onOpen = () => {
      // Focus first day of month
      setTimeout(() => {
        const firstDay = this.shadowRoot.querySelector('.day:not(.other-month)');
        if (firstDay) firstDay.focus();
      }, 0);
    };
    
    super._openDropdown({ ...options, onOpen });
    this.render();
  }

  /**
   * Override _closeDropdown from DropdownBase
   */
  _closeDropdown(options = {}) {
    super._closeDropdown(options);
    this.render();
  }

  _previousMonth() {
    this._currentDate.setMonth(this._currentDate.getMonth() - 1);
    this._updateCalendarGrid();
  }

  _nextMonth() {
    this._currentDate.setMonth(this._currentDate.getMonth() + 1);
    this._updateCalendarGrid();
  }

  _updateCalendarGrid() {
    const mode = this.getAttribute('mode') || 'single';
    const today = new Date();
    const days = this._getCalendarDays();

    // Update month/year label
    const monthYearLabel = this.shadowRoot.querySelector('.month-year');
    if (monthYearLabel) {
      monthYearLabel.textContent = this._getMonthYearLabel();
    }

    // Update calendar grid - only render visible days
    const calendarGrid = this.shadowRoot.querySelector('.calendar-grid');
    if (calendarGrid) {
      const visibleDays = days.filter(day => day.isVisible);
      calendarGrid.innerHTML = visibleDays.map(day => {
        const dateStr = this._formatDate(day.date);
        const isDisabled = this._isDateDisabled(day.date);
        const isSelected = this._isSameDay(day.date, this._selectedStartDate) ||
                          this._isSameDay(day.date, this._selectedEndDate);
        const isRangeStart = this._isSameDay(day.date, this._selectedStartDate) && mode === 'range';
        const isRangeEnd = this._isSameDay(day.date, this._selectedEndDate) && mode === 'range';
        const isInRange = this._isDateInRange(day.date);
        const isToday = this._isSameDay(day.date, today);

        return `
          <button
            class="day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isInRange ? 'in-range' : ''} ${isToday ? 'today' : ''}"
            data-date="${dateStr}"
            ${isDisabled ? 'disabled' : ''}
            aria-label="${day.date.toDateString()}${isSelected ? ' (selected)' : ''}${isToday ? ' (today)' : ''}"
            tabindex="0"
          >
            ${day.date.getDate()}
          </button>
        `;
      }).join('');
    }

    // Re-attach event listeners to new day buttons
    this._attachDayEventListeners();
  }

  _attachDayEventListeners() {
    const days = this.shadowRoot.querySelectorAll('.day:not(.disabled)');
    days.forEach(day => {
      day.addEventListener('click', (e) => {
        e.stopPropagation();
        const dateStr = day.getAttribute('data-date');
        const date = new Date(dateStr);
        this._selectDate(date);
      });
    });
  }

  _selectDate(date) {
    if (this._isDateDisabled(date)) return;

    const mode = this.getAttribute('mode') || 'single';

    if (mode === 'range') {
      if (!this._selectedStartDate || (this._selectedStartDate && this._selectedEndDate)) {
        // Start new range
        this._selectedStartDate = date;
        this._selectedEndDate = null;
      } else {
        // Complete range
        if (date < this._selectedStartDate) {
          this._selectedEndDate = this._selectedStartDate;
          this._selectedStartDate = date;
        } else {
          this._selectedEndDate = date;
        }
        this._closeDropdown();
      }
    } else {
      this._selectedStartDate = date;
      this._selectedEndDate = null;
      this._closeDropdown();
    }

    this._updateValue();
    this._updateCalendarGrid();
  }

  _clearSelection() {
    this._selectedStartDate = null;
    this._selectedEndDate = null;
    this._updateValue();
    this._updateCalendarGrid();
  }

  _updateValue() {
    const mode = this.getAttribute('mode') || 'single';
    let value = '';

    if (mode === 'range') {
      if (this._selectedStartDate && this._selectedEndDate) {
        value = `${this._formatDate(this._selectedStartDate)},${this._formatDate(this._selectedEndDate)}`;
      } else if (this._selectedStartDate) {
        value = this._formatDate(this._selectedStartDate);
      }
    } else {
      if (this._selectedStartDate) {
        value = this._formatDate(this._selectedStartDate);
      }
    }

    this.setAttribute('value', value);

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: value,
        startDate: this._selectedStartDate,
        endDate: this._selectedEndDate
      },
      bubbles: true
    }));
  }

  render() {
    const disabled = this.hasAttribute('disabled');
    const label = this.getAttribute('label') || '';
    const mode = this.getAttribute('mode') || 'single';
    const min = this._parseDate(this.getAttribute('min'));
    const max = this._parseDate(this.getAttribute('max'));

    const today = new Date();
    const days = this._getCalendarDays();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ''}
        <div class="datepicker-wrapper technical">
          <button
            class="trigger"
            ${disabled ? 'disabled' : ''}
            aria-haspopup="dialog"
            aria-expanded="${this._isOpen}"
          >
            <span class="trigger-text ${!this._selectedStartDate ? 'placeholder' : ''}">${this._getTriggerText()}</span>
            <span class="trigger-icon ${this._isOpen ? 'open' : ''}">▼</span>
          </button>
          <div class="calendar ${this._isOpen ? 'open' : ''}" role="dialog" aria-label="Calendar">
            <div class="calendar-header">
              <span class="month-year">${this._getMonthYearLabel()}</span>
              <div class="nav-buttons">
                <button class="nav-btn" data-nav="prev" aria-label="Previous month">‹</button>
                <button class="nav-btn" data-nav="next" aria-label="Next month">›</button>
              </div>
            </div>
            <div class="weekday-header">
              ${weekdays.map(day => `<div class="weekday">${day}</div>`).join('')}
            </div>
            <div class="calendar-grid">
              ${days.filter(day => day.isVisible).map(day => {
                const dateStr = this._formatDate(day.date);
                const isDisabled = this._isDateDisabled(day.date);
                const isSelected = this._isSameDay(day.date, this._selectedStartDate) ||
                                  this._isSameDay(day.date, this._selectedEndDate);
                const isRangeStart = this._isSameDay(day.date, this._selectedStartDate) && mode === 'range';
                const isRangeEnd = this._isSameDay(day.date, this._selectedEndDate) && mode === 'range';
                const isInRange = this._isDateInRange(day.date);
                const isToday = this._isSameDay(day.date, today);

                return `
                  <button
                    class="day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isInRange ? 'in-range' : ''} ${isToday ? 'today' : ''}"
                    data-date="${dateStr}"
                    ${isDisabled ? 'disabled' : ''}
                    aria-label="${day.date.toDateString()}${isSelected ? ' (selected)' : ''}${isToday ? ' (today)' : ''}"
                    tabindex="0"
                  >
                    ${day.date.getDate()}
                  </button>
                `;
              }).join('')}
            </div>
            <div class="calendar-footer">
              <span class="selected-range">
                ${mode === 'range' && this._selectedStartDate ?
                  (this._selectedEndDate ?
                    `${this._formatDate(this._selectedStartDate)} - ${this._formatDate(this._selectedEndDate)}` :
                    'Select end date...') :
                  ''}
              </span>
              <button class="clear-btn" data-action="clear">Clear</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this._attachEventListeners();
  }

  _attachEventListeners() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    const navButtons = this.shadowRoot.querySelectorAll('[data-nav]');
    const clearBtn = this.shadowRoot.querySelector('[data-action="clear"]');

    if (trigger && !this.hasAttribute('disabled')) {
      trigger.addEventListener('click', () => this._toggleDropdown());
    }

    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nav = btn.getAttribute('data-nav');
        if (nav === 'prev') {
          this._previousMonth();
        } else if (nav === 'next') {
          this._nextMonth();
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._clearSelection();
      });
    }

    // Attach day button listeners
    this._attachDayEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this._parseValue();
      this.render();
    } else if (name === 'mode' || name === 'min' || name === 'max' || name === 'format' || name === 'label' || name === 'disabled' || name === 'placeholder') {
      this.render();
    }
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(val) {
    this.setAttribute('value', val);
  }
}

customElements.define('pilot-datepicker', PilotDatepicker);
