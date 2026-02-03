/**
 * Pilot Design System - Chart Data Component
 * 
 * A simple data container component for chart data points.
 * Used as slotted content within chart components (pilot-bar-chart, etc.)
 * Represents a single data point with label, value, and optional color.
 * 
 * @example
 * <pilot-bar-chart>
 *   <pilot-chart-data label="Housing" value="1200" color="error"></pilot-chart-data>
 *   <pilot-chart-data label="Food" value="450" color="warning"></pilot-chart-data>
 * </pilot-bar-chart>
 */

// ============================================
// CHART DATA COMPONENT
// ============================================

export class PilotChartData extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get styles() {
    return `
      :host {
        display: none;
      }
    `;
  }

  render() {
    // This component is invisible - it only holds data
    // Parent chart components read the data attributes
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Notify parent chart component that data changed
      this._notifyParent();
    }
  }

  connectedCallback() {
    // Notify parent chart component on initial connection
    this._notifyParent();
  }

  /**
   * Notify the parent chart component that data has changed
   * This allows the chart to re-render when data items change
   */
  _notifyParent() {
    // Find the closest parent chart component
    const parentChart = this.closest('pilot-bar-chart') || this.closest('pilot-pie-chart') || this.closest('pilot-area-chart');
    if (parentChart && typeof parentChart._parseSlottedData === 'function') {
      parentChart._parseSlottedData();
    }
  }

  /**
   * Get the data object for this chart data point
   * @returns {Object} Data object with label, value, and color
   */
  getData() {
    return {
      label: this.getAttribute('label') || '',
      value: parseFloat(this.getAttribute('value')) || 0,
      color: this.getAttribute('color') || 'primary'
    };
  }
}

customElements.define('pilot-chart-data', PilotChartData);
