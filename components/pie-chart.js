/**
 * Pilot Design System - Pie Chart Component
 * 
 * Pie/circular chart for displaying categorical data proportions with technical styling.
 * Supports animations, value labels, color coding, legend, and click events.
 * Uses slot-based architecture with pilot-chart-data elements.
 */

import { baseStyles } from './shared.js';

// ============================================
// PIE CHART COMPONENT
// ============================================

export class PilotPieChart extends HTMLElement {
  static get observedAttributes() {
    return ['animated', 'show-values', 'show-legend', 'size'];
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
    this._setupSlotListener();
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
  // SLOT HANDLING
  // ============================================

  _setupSlotListener() {
    this._mutationObserver = new MutationObserver((mutations) => {
      const hasChartDataChanges = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PILOT-CHART-DATA'
        ) ||
        Array.from(mutation.removedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PILOT-CHART-DATA'
        )
      );
      
      if (hasChartDataChanges) {
        this._parseSlottedData();
      }
    });
    
    this._mutationObserver.observe(this, { childList: true });
    this._parseSlottedData();
  }

  _parseSlottedData() {
    const dataElements = this.querySelectorAll('pilot-chart-data');
    
    this._data = Array.from(dataElements).map(el => ({
      label: el.getAttribute('label') || '',
      value: parseFloat(el.getAttribute('value')) || 0,
      color: el.getAttribute('color') || 'primary'
    }));
    
    this.render();
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
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      /* ============================================
         PIE CHART
         ============================================ */
      .pie-chart-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .pie-chart {
        width: var(--pie-size, 300px);
        height: var(--pie-size, 300px);
        position: relative;
      }
      
      .pie-chart.size-sm {
        width: var(--pie-size, 200px);
        height: var(--pie-size, 200px);
      }
      
      .pie-chart.size-lg {
        width: var(--pie-size, 400px);
        height: var(--pie-size, 400px);
      }
      
      /* SVG Pie */
      .pie-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        overflow: visible;
      }
      
      .pie-slice {
        transition: opacity var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        cursor: pointer;
        stroke: var(--color-background-primary, #ffffff);
        stroke-width: 2px;
      }
      
      .pie-slice:hover {
        opacity: 0.8;
      }
      
      .pie-slice:active {
        opacity: 0.6;
      }
      
      .pie-slice.animated {
        opacity: 0;
        animation: sliceFadeIn var(--duration-slow, 500ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
        animation-delay: var(--animation-delay, 0ms);
      }

      @keyframes sliceFadeIn {
        to { opacity: 1; }
      }
      
      /* Technical pattern overlay for slices */
      .pie-slice-pattern {
        pointer-events: none;
        opacity: 0.4;
      }
      
      /* ============================================
          VALUE LABELS
          ============================================ */
      .value-label {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold, 600);
        color: var(--color-text-primary, #1a1a1a);
        text-anchor: middle;
        dominant-baseline: middle;
        pointer-events: none;
        fill: var(--color-text-primary, #1a1a1a);
      }
      
      /* ============================================
         DONUT CENTER (optional visual enhancement)
         ============================================ */
      .pie-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;
      }
      
      .pie-total {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        font-weight: var(--font-weight-bold, 700);
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .pie-total-label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
        margin-top: var(--spacing-1, 0.25rem);
      }
      
      /* ============================================
         LEGEND
         ============================================ */
      .legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-4, 1rem);
        margin-top: var(--spacing-6, 1.5rem);
        padding-top: var(--spacing-4, 1rem);
        border-top: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        width: 100%;
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
        width: 16px;
        height: 16px;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        position: relative;
      }
      
      .legend-color::after {
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
      }
      
      .legend-value {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-weight: var(--font-weight-semibold, 600);
        color: var(--color-text-primary, #1a1a1a);
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
         RESPONSIVE
         ============================================ */
      @media (max-width: 480px) {
        .pie-chart {
          width: var(--pie-size, 240px);
          height: var(--pie-size, 240px);
        }
        
        .pie-chart.size-sm {
          width: var(--pie-size, 160px);
          height: var(--pie-size, 160px);
        }
        
        .pie-chart.size-lg {
          width: var(--pie-size, 280px);
          height: var(--pie-size, 280px);
        }
        
        .legend {
          gap: var(--spacing-3, 0.75rem);
        }
        
        .legend-item {
          font-size: var(--font-size-2xs, 0.625rem);
        }
        
        .value-label {
          font-size: var(--font-size-2xs, 0.625rem);
        }
      }
    `;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  _setupEventListeners() {
    this._clickHandler = this._handleSliceClick.bind(this);
    this.shadowRoot.addEventListener('click', this._clickHandler);
  }

  _removeEventListeners() {
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this._clickHandler);
    }
  }

  _handleSliceClick(e) {
    const sliceElement = e.target.closest('.pie-slice');
    if (sliceElement) {
      const index = parseInt(sliceElement.dataset.index, 10);
      const item = this._data[index];
      if (item) {
        this.dispatchEvent(new CustomEvent('slice-click', {
          detail: { item, index, value: item.value, label: item.label },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  _triggerAnimation() {
    const slices = this.shadowRoot.querySelectorAll('.pie-slice');
    slices.forEach((slice, index) => {
      slice.classList.add('animated');
      slice.style.setProperty('--animation-delay', `${index * 100}ms`);
    });
    this._animationTriggered = true;
  }

  // ============================================
  // DATA CALCULATIONS
  // ============================================

  _getTotalValue() {
    return this._data.reduce((sum, item) => sum + item.value, 0);
  }

  _calculatePieSlices() {
    const total = this._getTotalValue();
    if (total === 0) return [];
    
    let currentAngle = 0;
    const slices = [];
    
    this._data.forEach((item, index) => {
      const percentage = (item.value / total) * 100;
      const startAngle = currentAngle;
      const endAngle = currentAngle + (item.value / total) * 360;
      
      slices.push({
        index,
        item,
        startAngle,
        endAngle,
        percentage
      });
      
      currentAngle = endAngle;
    });
    
    return slices;
  }

  _createSlicePath(startAngle, endAngle, radius, cx, cy) {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }

  _getColorVar(color) {
    if (color === 'primary') {
      return 'var(--color-brand-primary, #1a1a1a)';
    }
    return `var(--color-feedback-${color}, ${this._getColorFallback(color)})`;
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

  _formatPercentage(value, total) {
    if (total > 0 && typeof value === 'number') {
      return ((value / total) * 100).toFixed(1);
    }
    return '0';
  }

  _calculateLabelPosition(angle, radius, cx, cy) {
    const rad = (angle * Math.PI) / 180;
    const labelRadius = radius * 0.7;
    const x = cx + labelRadius * Math.cos(rad);
    const y = cy + labelRadius * Math.sin(rad);
    return { x, y };
  }

  // ============================================
  // RENDER
  // ============================================

  render() {
    const showValues = this.hasAttribute('show-values');
    const showLegend = this.hasAttribute('show-legend');
    const animated = this.hasAttribute('animated');
    const sizeAttr = this.getAttribute('size');
    const sizeClass = sizeAttr ? `size-${sizeAttr}` : '';

    let contentHTML = '';
    
    if (this._data.length === 0) {
      contentHTML = `
        <div class="empty-state">
          NO DATA AVAILABLE
        </div>
      `;
    } else {
      const slices = this._calculatePieSlices();
      const total = this._getTotalValue();
      const pieSize = sizeAttr === 'sm' ? 200 : sizeAttr === 'lg' ? 400 : 300;
      const radius = pieSize / 2;
      const cx = radius;
      const cy = radius;
      
      const slicePaths = slices.map(slice => {
        const pathData = this._createSlicePath(slice.startAngle, slice.endAngle, radius - 2, cx, cy);
        const colorVar = this._getColorVar(slice.item.color);
        
        return `<path 
          class="pie-slice ${animated ? 'animated' : ''}" 
          data-index="${slice.index}"
          d="${pathData}"
          fill="${colorVar}"
        />`;
      }).join('');
      
      const patternOverlayPaths = slices.map(slice => {
        const pathData = this._createSlicePath(slice.startAngle, slice.endAngle, radius - 2, cx, cy);
        return `<path 
          class="pie-slice-pattern" 
          d="${pathData}"
          fill="url(#stripe-pattern)"
        />`;
      }).join('');
      
      const valueLabels = showValues ? slices.map(slice => {
        const midAngle = (slice.startAngle + slice.endAngle) / 2;
        const pos = this._calculateLabelPosition(midAngle, radius, cx, cy);
        return `<text 
          class="value-label" 
          x="${pos.x}" 
          y="${pos.y}"
          transform="rotate(90, ${pos.x}, ${pos.y})"
        >${this._formatPercentage(slice.item.value, total)}%</text>`;
      }).join('') : '';
      
      contentHTML = `
        <div class="pie-chart-wrapper">
          <div class="pie-chart ${sizeClass}">
            <svg class="pie-svg" viewBox="0 0 ${pieSize} ${pieSize}">
              <defs>
                <pattern id="stripe-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
                </pattern>
              </defs>
              ${slicePaths}
              ${patternOverlayPaths}
              ${valueLabels}
            </svg>
          </div>
        </div>
      `;
    }

    let legendHTML = '';
    if (showLegend && this._data.length > 0) {
      const total = this._getTotalValue();
      legendHTML = `
        <div class="legend">
          ${this._data.map((item, index) => {
            const colorVar = this._getColorVar(item.color);
            const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
            return `
              <div class="legend-item" data-index="${index}">
                <span class="legend-color" style="background: ${colorVar};"></span>
                <span>${item.label}</span>
                <span class="legend-value">${percentage}%</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="chart-container">
        ${contentHTML}
        ${legendHTML}
      </div>
      <slot style="display: none;"></slot>
    `;

    if (animated && this.isConnected && !this._animationTriggered && this._data.length > 0) {
      requestAnimationFrame(() => {
        this._triggerAnimation();
      });
    }
  }

  // ============================================
  // ATTRIBUTE CHANGES
  // ============================================

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-pie-chart', PilotPieChart);
