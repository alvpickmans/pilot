/**
 * Pilot Design System - Area Chart Component
 *
 * Area/line chart for displaying trends over time with technical styling.
 * Supports animations, value labels, color coding, legend, and click events.
 * Uses slot-based architecture with pilot-chart-data elements.
 */

import { baseStyles } from './shared.js';

// ============================================
// AREA CHART COMPONENT
// ============================================

export class PilotAreaChart extends HTMLElement {
  static get observedAttributes() {
    return ['max', 'animated', 'show-values', 'show-legend', 'orientation'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = [];
    this._animationTriggered = false;
    this._hoverIndex = -1;
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
        position: relative;
      }

      /* ============================================
         CHART SVG
         ============================================ */
      .chart-svg {
        width: 100%;
        height: 300px;
        overflow: visible;
      }

      .chart-svg.size-sm {
        height: 200px;
      }

      .chart-svg.size-lg {
        height: 400px;
      }

      /* ============================================
         GRID LINES
         ============================================ */
      .grid-line {
        stroke: var(--color-border-secondary, #d9d9d9);
        stroke-width: 1;
        stroke-dasharray: 4, 4;
      }

      /* ============================================
         AREA FILL
         ============================================ */
      .area-fill {
        fill-opacity: 0.3;
        transition: fill-opacity var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .area-fill.animated {
        opacity: 0;
        animation: areaFadeIn var(--duration-slow, 500ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
        animation-delay: var(--animation-delay, 0ms);
      }

      @keyframes areaFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ============================================
         LINE
         ============================================ */
      .area-line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-width var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .area-line.animated {
        stroke-dasharray: 2000;
        stroke-dashoffset: 2000;
        animation: lineDraw var(--duration-slow, 500ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
        animation-delay: var(--animation-delay, 100ms);
      }

      @keyframes lineDraw {
        to { stroke-dashoffset: 0; }
      }

      /* ============================================
         DATA POINTS
         ============================================ */
      .data-point {
        fill: var(--color-background-primary, #ffffff);
        stroke-width: 2;
        cursor: pointer;
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .data-point:hover {
        r: 6;
      }

      .data-point.animated {
        opacity: 0;
        animation: pointFadeIn var(--duration-slow, 500ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
        animation-delay: var(--animation-delay, 200ms);
      }

      @keyframes pointFadeIn {
        to { opacity: 1; }
      }

      /* ============================================
         TOOLTIP
         ============================================ */
      .tooltip {
        position: absolute;
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-primary, #1a1a1a);
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-size: var(--font-size-xs, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -100%);
        transition: opacity var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        white-space: nowrap;
        z-index: 10;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .tooltip-label {
        font-weight: var(--font-weight-medium, 500);
        margin-bottom: var(--spacing-1, 0.25rem);
        color: inherit;
      }

      .tooltip-value {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-weight: var(--font-weight-semibold, 600);
        color: inherit;
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
        dominant-baseline: bottom;
        opacity: 0;
        transition: opacity var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .value-label.visible {
        opacity: 1;
      }

      /* ============================================
         X AXIS LABELS
         ============================================ */
      .x-axis-label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
        text-anchor: middle;
      }

      /* ============================================
         Y AXIS LABELS
         ============================================ */
      .y-axis-label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-secondary, #525252);
        text-anchor: end;
        dominant-baseline: middle;
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
        width: 16px;
        height: 4px;
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
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* ============================================
         RESPONSIVE
         ============================================ */
      @media (max-width: 480px) {
        .chart-svg {
          height: 200px;
        }

        .chart-svg.size-lg {
          height: 250px;
        }

        .value-label {
          font-size: var(--font-size-2xs, 0.625rem);
        }

        .x-axis-label {
          font-size: var(--font-size-2xs, 0.625rem);
        }

        .y-axis-label {
          font-size: var(--font-size-2xs, 0.625rem);
        }
      }
    `;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  _setupEventListeners() {
    this._clickHandler = this._handlePointClick.bind(this);
    this._mousemoveHandler = this._handleMouseMove.bind(this);
    this._mouseleaveHandler = this._handleMouseLeave.bind(this);
    this.shadowRoot.addEventListener('click', this._clickHandler);
    this.shadowRoot.addEventListener('mousemove', this._mousemoveHandler);
    this.shadowRoot.addEventListener('mouseleave', this._mouseleaveHandler);
  }

  _removeEventListeners() {
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this._clickHandler);
      this.shadowRoot.removeEventListener('mousemove', this._mousemoveHandler);
      this.shadowRoot.removeEventListener('mouseleave', this._mouseleaveHandler);
    }
  }

  _handlePointClick(e) {
    const pointElement = e.target.closest('.data-point');
    if (pointElement) {
      const index = parseInt(pointElement.dataset.index, 10);
      const item = this._data[index];
      if (item) {
        this.dispatchEvent(new CustomEvent('point-click', {
          detail: { item, index, value: item.value, label: item.label },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  _handleMouseMove(e) {
    const pointElement = e.target.closest('.data-point');
    const showValues = this.hasAttribute('show-values');

    if (pointElement) {
      const index = parseInt(pointElement.dataset.index, 10);
      if (index !== this._hoverIndex) {
        this._hoverIndex = index;
        this._updateTooltip(e.clientX, e.clientY, index);
        if (!showValues) {
          this._toggleValueLabels(true, index);
        }
      } else {
        this._updateTooltip(e.clientX, e.clientY, index);
      }
    } else {
      if (this._hoverIndex !== -1) {
        this._hoverIndex = -1;
        this._hideTooltip();
        if (!showValues) {
          this._toggleValueLabels(false);
        }
      }
    }
  }

  _handleMouseLeave() {
    if (this._hoverIndex !== -1) {
      this._hoverIndex = -1;
      this._hideTooltip();
      if (!this.hasAttribute('show-values')) {
        this._toggleValueLabels(false);
      }
    }
  }

  _updateTooltip(x, y, index) {
    const tooltip = this.shadowRoot.querySelector('.tooltip');
    if (tooltip && this._data[index]) {
      const item = this._data[index];
      const rect = this.getBoundingClientRect();
      const relativeX = x - rect.left;
      const relativeY = y - rect.top;

      tooltip.style.left = `${relativeX}px`;
      tooltip.style.top = `${relativeY - 8}px`;
      tooltip.innerHTML = `
        <div class="tooltip-label">${item.label}</div>
        <div class="tooltip-value">${this._formatValue(item.value)}</div>
      `;
      tooltip.classList.add('visible');
    }
  }

  _hideTooltip() {
    const tooltip = this.shadowRoot.querySelector('.tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  }

  _toggleValueLabels(show, singleIndex = -1) {
    const valueLabels = this.shadowRoot.querySelectorAll('.value-label');
    valueLabels.forEach((label, index) => {
      if (singleIndex === -1 || index === singleIndex) {
        label.classList.toggle('visible', show);
      } else {
        label.classList.remove('visible');
      }
    });
  }

  _triggerAnimation() {
    const animated = this.hasAttribute('animated');
    if (!animated || this._animationTriggered) return;

    const areaFill = this.shadowRoot.querySelector('.area-fill');
    const areaLine = this.shadowRoot.querySelector('.area-line');
    const dataPoints = this.shadowRoot.querySelectorAll('.data-point');

    if (areaFill) {
      areaFill.classList.add('animated');
    }
    if (areaLine) {
      areaLine.classList.add('animated');
    }
    dataPoints.forEach((point, index) => {
      point.classList.add('animated');
      point.style.setProperty('--animation-delay', `${300 + index * 50}ms`);
    });

    this._animationTriggered = true;
  }

  // ============================================
  // DATA CALCULATIONS
  // ============================================

  _getMaxValue() {
    const maxAttr = this.getAttribute('max');
    if (maxAttr) {
      const parsed = parseFloat(maxAttr);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }

    if (this._data.length === 0) return 100;
    const maxValue = Math.max(...this._data.map(d => d.value));
    return maxValue > 0 ? maxValue : 100;
  }

  _getDimensions() {
    const width = this.shadowRoot.querySelector('.chart-svg')?.clientWidth || 600;
    const height = this.shadowRoot.querySelector('.chart-svg')?.clientHeight || 300;
    const padding = { top: 30, right: 20, bottom: 30, left: 50 };
    return { width, height, padding };
  }

  _calculatePoints() {
    if (this._data.length === 0) return { points: [], areaPoints: [] };

    const maxValue = this._getMaxValue();
    const { width, height, padding } = this._getDimensions();
    const isVertical = this.getAttribute('orientation') !== 'horizontal';

    if (isVertical) {
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const stepX = chartWidth / (this._data.length - 1 || 1);

      const points = this._data.map((item, index) => {
        const x = padding.left + (index * stepX);
        const y = padding.top + chartHeight - ((item.value / maxValue) * chartHeight);
        return { x, y, value: item.value, label: item.label };
      });

      const areaPoints = [
        { x: padding.left, y: padding.top + chartHeight },
        ...points,
        { x: padding.left + chartWidth, y: padding.top + chartHeight }
      ];

      return { points, areaPoints };
    } else {
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const stepY = chartHeight / (this._data.length - 1 || 1);

      const points = this._data.map((item, index) => {
        const x = padding.left + ((item.value / maxValue) * chartWidth);
        const y = padding.top + (index * stepY);
        return { x, y, value: item.value, label: item.label };
      });

      const areaPoints = [
        { x: padding.left, y: padding.top },
        ...points,
        { x: padding.left, y: padding.top + chartHeight }
      ];

      return { points, areaPoints };
    }
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

  // ============================================
  // RENDER
  // ============================================

  render() {
    const showValues = this.hasAttribute('show-values');
    const showLegend = this.hasAttribute('show-legend');
    const animated = this.hasAttribute('animated');
    const isVertical = this.getAttribute('orientation') !== 'horizontal';

    let contentHTML = '';

    if (this._data.length === 0) {
      contentHTML = `
        <div class="empty-state">
          NO DATA AVAILABLE
        </div>
      `;
    } else {
      const { points, areaPoints } = this._calculatePoints();
      const maxValue = this._getMaxValue();
      const colorVar = this._getColorVar(this._data[0]?.color || 'primary');

      const { width, height, padding } = this._getDimensions();
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
      const areaPath = areaPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z';

      const gridLines = [];
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight * i) / 4;
        gridLines.push(`<line x1="${padding.left}" y1="${y}" x2="${padding.left + chartWidth}" y2="${y}" class="grid-line"/>`);
      }

      const yAxisLabels = [];
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight * i) / 4;
        const value = maxValue * (1 - i / 4);
        yAxisLabels.push(`<text x="${padding.left - 10}" y="${y}" class="y-axis-label">${this._formatValue(Math.round(value))}</text>`);
      }

      const xAxisLabels = points.map(p => `<text x="${p.x}" y="${padding.top + chartHeight + 20}" class="x-axis-label">${p.label}</text>`).join('');

      const dataPoints = points.map((p, index) => `
        <circle
          class="data-point ${animated ? 'animated' : ''}"
          data-index="${index}"
          cx="${p.x}"
          cy="${p.y}"
          r="4"
          fill="${colorVar}"
          stroke="${colorVar}"
        />
      `).join('');

      const valueLabels = showValues ? points.map((p, index) => `
        <text
          class="value-label visible"
          x="${p.x}"
          y="${p.y - 8}"
        >${this._formatValue(p.value)}</text>
      `).join('') : '';

      contentHTML = `
        <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
          <defs>
            <pattern id="area-pattern-${this._data[0]?.color || 'primary'}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
            </pattern>
          </defs>
          ${gridLines.join('')}
          ${yAxisLabels.join('')}
          <path
            class="area-fill ${animated ? 'animated' : ''}"
            d="${areaPath}"
            fill="${colorVar}"
          />
          <rect
            class="area-fill"
            d="${areaPath}"
            fill="url(#area-pattern-${this._data[0]?.color || 'primary'})"
            x="${padding.left}"
            y="${padding.top}"
            width="${chartWidth}"
            height="${chartHeight}"
            mask="url(#area-mask)"
          />
          <path
            class="area-line ${animated ? 'animated' : ''}"
            d="${linePath}"
            stroke="${colorVar}"
          />
          ${dataPoints}
          ${valueLabels}
          ${xAxisLabels}
        </svg>
        <div class="tooltip"></div>
      `;
    }

    let legendHTML = '';
    if (showLegend && this._data.length > 0) {
      const uniqueColors = [...new Set(this._data.map(d => d.color || 'primary'))];
      legendHTML = `
        <div class="legend">
          ${uniqueColors.map(color => {
            const colorVar = this._getColorVar(color);
            return `
              <div class="legend-item">
                <span class="legend-color" style="background: ${colorVar};"></span>
                <span>${color.toUpperCase()}</span>
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

customElements.define('pilot-area-chart', PilotAreaChart);
