/**
 * Pilot Design System - Bar Chart Component
 * 
 * Horizontal bar chart for displaying data by category with technical styling.
 * Supports animations, value labels, color coding, and click events.
 */

import { baseStyles } from './shared.js';

// ============================================
// BAR CHART COMPONENT
// ============================================

export class PilotBarChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'max', 'animated', 'show-values', 'show-legend'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = [];
    this._animationTriggered = false;
    this.render();
  }

  connectedCallback() {
    this._setupEventListeners();
    // Trigger animation after mount if animated
    if (this.hasAttribute('animated') && !this._animationTriggered) {
      requestAnimationFrame(() => {
        this._triggerAnimation();
      });
    }
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  // ============================================
  // GETTERS
  // ============================================

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .chart-container {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        width: 100%;
      }
      
      /* ============================================
         BARS CONTAINER
         ============================================ */
      .bars-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3, 0.75rem);
      }
      
      /* ============================================
         BAR ROW
         ============================================ */
      .bar-row {
        display: flex;
        align-items: center;
        gap: var(--spacing-3, 0.75rem);
        cursor: pointer;
        transition: opacity var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      .bar-row:hover {
        opacity: 0.8;
      }
      
      .bar-row:active {
        opacity: 0.6;
      }
      
      /* ============================================
         BAR LABEL
         ============================================ */
      .bar-label {
        min-width: 100px;
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
        text-align: right;
        flex-shrink: 0;
      }
      
      /* ============================================
         BAR TRACK
         ============================================ */
      .bar-track {
        flex: 1;
        height: 24px;
        background: var(--color-background-secondary, #f5f5f5);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        position: relative;
        overflow: hidden;
      }
      
      /* ============================================
         BAR FILL
         ============================================ */
      .bar-fill {
        height: 100%;
        background: var(--color-brand-primary, #1a1a1a);
        width: 0;
        transition: width var(--duration-slow, 500ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        position: relative;
      }
      
      .bar-fill.animated {
        width: var(--bar-width, 0%);
      }
      
      /* Technical pattern overlay */
      .bar-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.1) 2px,
          rgba(255, 255, 255, 0.1) 4px
        );
        pointer-events: none;
      }
      
      /* ============================================
         BAR VALUE
         ============================================ */
      .bar-value {
        min-width: 60px;
        font-size: var(--font-size-sm, 0.875rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-weight: var(--font-weight-semibold, 600);
        color: var(--color-text-primary, #1a1a1a);
        text-align: left;
        flex-shrink: 0;
      }
      
      /* ============================================
         LEGEND
         ============================================ */
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-4, 1rem);
        margin-top: var(--spacing-4, 1rem);
        padding-top: var(--spacing-4, 1rem);
        border-top: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
        font-size: var(--font-size-xs, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .legend-color {
        width: 12px;
        height: 12px;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
      }
      
      /* ============================================
         EMPTY STATE
         ============================================ */
      .empty-state {
        padding: var(--spacing-8, 2rem);
        text-align: center;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        border: var(--border-width-1, 1px) dashed var(--color-border-primary, #b3b3b3);
      }
      
      /* ============================================
         COLOR VARIANTS
         ============================================ */
      .bar-fill[data-color="primary"] {
        background: var(--color-brand-primary, #1a1a1a);
      }
      
      .bar-fill[data-color="success"] {
        background: var(--color-feedback-success, #16a34a);
      }
      
      .bar-fill[data-color="warning"] {
        background: var(--color-feedback-warning, #d97706);
      }
      
      .bar-fill[data-color="error"] {
        background: var(--color-feedback-error, #dc2626);
      }
      
      .bar-fill[data-color="info"] {
        background: var(--color-feedback-info, #525252);
      }
      
      /* ============================================
         RESPONSIVE
         ============================================ */
      @media (max-width: 480px) {
        .bar-label {
          min-width: 80px;
          font-size: var(--font-size-2xs, 0.625rem);
        }
        
        .bar-track {
          height: 20px;
        }
        
        .bar-value {
          min-width: 50px;
          font-size: var(--font-size-xs, 0.75rem);
        }
        
        .bar-row {
          gap: var(--spacing-2, 0.5rem);
        }
      }
    `;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  _setupEventListeners() {
    this._clickHandler = this._handleBarClick.bind(this);
    this.shadowRoot.addEventListener('click', this._clickHandler);
  }

  _removeEventListeners() {
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this._clickHandler);
    }
  }

  _handleBarClick(e) {
    const barRow = e.target.closest('.bar-row');
    if (barRow) {
      const index = parseInt(barRow.dataset.index, 10);
      const item = this._data[index];
      if (item) {
        this.dispatchEvent(new CustomEvent('bar-click', {
          detail: { item, index, value: item.value, label: item.label },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  _triggerAnimation() {
    const barFills = this.shadowRoot.querySelectorAll('.bar-fill');
    barFills.forEach((fill, index) => {
      // Stagger animations slightly
      setTimeout(() => {
        fill.classList.add('animated');
      }, index * 50);
    });
    this._animationTriggered = true;
  }

  // ============================================
  // DATA PARSING
  // ============================================

  _parseData() {
    const dataAttr = this.getAttribute('data');
    if (!dataAttr) {
      this._data = [];
      return;
    }

    try {
      const parsed = JSON.parse(dataAttr);
      if (Array.isArray(parsed)) {
        this._data = parsed.map(item => ({
          label: item.label || '',
          value: typeof item.value === 'number' ? item.value : 0,
          color: item.color || 'primary'
        }));
      } else {
        this._data = [];
      }
    } catch (e) {
      this._data = [];
    }
  }

  _getMaxValue() {
    const maxAttr = this.getAttribute('max');
    if (maxAttr) {
      const parsed = parseFloat(maxAttr);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    
    // Auto-calculate max from data
    if (this._data.length === 0) return 100;
    const maxValue = Math.max(...this._data.map(d => d.value));
    return maxValue > 0 ? maxValue : 100;
  }

  // ============================================
  // RENDER
  // ============================================

  render() {
    this._parseData();
    
    const maxValue = this._getMaxValue();
    const showValues = this.hasAttribute('show-values');
    const showLegend = this.hasAttribute('show-legend');
    const animated = this.hasAttribute('animated');

    // Build legend if needed
    let legendHTML = '';
    if (showLegend && this._data.length > 0) {
      const uniqueColors = [...new Set(this._data.map(d => d.color || 'primary'))];
      legendHTML = `
        <div class="legend">
          ${uniqueColors.map(color => `
            <div class="legend-item">
              <span class="legend-color" style="background: var(--color-${color === 'primary' ? 'brand-primary' : `feedback-${color}`}, ${this._getColorFallback(color)});"></span>
              <span>${color.toUpperCase()}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Build bars
    let barsHTML = '';
    if (this._data.length === 0) {
      barsHTML = `
        <div class="empty-state">
          NO DATA AVAILABLE
        </div>
      `;
    } else {
      barsHTML = `
        <div class="bars-container">
          ${this._data.map((item, index) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            const color = item.color || 'primary';
            
            return `
              <div class="bar-row" data-index="${index}" role="button" tabindex="0" aria-label="${item.label}: ${item.value}">
                <div class="bar-label">${item.label}</div>
                <div class="bar-track">
                  <div 
                    class="bar-fill ${animated ? 'animated' : ''}" 
                    data-color="${color}"
                    style="--bar-width: ${percentage}%; width: ${animated ? percentage : 0}%;"
                  ></div>
                </div>
                ${showValues ? `<div class="bar-value">${this._formatValue(item.value)}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="chart-container">
        ${barsHTML}
        ${legendHTML}
      </div>
    `;

    // If animated and already connected, trigger animation
    if (animated && this.isConnected && !this._animationTriggered) {
      requestAnimationFrame(() => {
        this._triggerAnimation();
      });
    }
  }

  _getColorFallback(color) {
    const fallbacks = {
      'primary': '#1a1a1a',
      'success': '#16a34a',
      'warning': '#d97706',
      'error': '#dc2626',
      'info': '#525252'
    };
    return fallbacks[color] || fallbacks['primary'];
  }

  _formatValue(value) {
    if (typeof value === 'number') {
      // Format large numbers with k/m suffix
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      }
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'k';
      }
      return value.toLocaleString();
    }
    return String(value);
  }

  // ============================================
  // ATTRIBUTE CHANGES
  // ============================================

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Reset animation flag when data changes
      if (name === 'data') {
        this._animationTriggered = false;
      }
      this.render();
    }
  }
}

customElements.define('pilot-bar-chart', PilotBarChart);
