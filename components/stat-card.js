/**
 * Pilot Design System - Stat Card Component
 *
 * Metric display card with trend indicator for financial KPIs.
 */

import { baseStyles } from './shared.js';

// ============================================
// STAT CARD COMPONENT
// ============================================

export class PilotStatCard extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'label', 'trend', 'trend-label', 'icon', 'loading', 'variant'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get styles() {
    return `
      ${baseStyles}
      
      :host {
        display: block;
      }
      
      .stat-card {
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        border-radius: var(--border-radius-none, 0);
        padding: var(--spacing-4, 1rem);
        position: relative;
        overflow: hidden;
      }
      
      /* Technical variant with corner brackets */
      .stat-card[variant="technical"] {
        border: none;
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .stat-card[variant="technical"]::before,
      .stat-card[variant="technical"]::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
      }
      
      .stat-card[variant="technical"]::before {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }
      
      .stat-card[variant="technical"]::after {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }
      
      .content {
        position: relative;
        z-index: 1;
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-3, 0.75rem);
      }
      
      .label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-text-secondary, #525252);
      }
      
      .value-container {
        display: flex;
        align-items: baseline;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .value {
        font-family: var(--font-industrial, 'Chakra Petch', sans-serif);
        font-size: var(--font-size-3xl, 1.875rem);
        font-weight: var(--font-weight-bold, 700);
        color: var(--color-text-primary, #1a1a1a);
        line-height: 1.2;
      }
      
      .trend-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        margin-top: var(--spacing-3, 0.75rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .trend {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .trend[positive] {
        color: var(--color-feedback-success, #16a34a);
      }
      
      .trend[negative] {
        color: var(--color-feedback-error, #dc2626);
      }
      
      .trend-icon {
        display: inline-flex;
        font-size: var(--font-size-sm, 0.875rem);
      }
      
      .trend-label {
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      /* Skeleton loading state */
      .stat-card[loading="true"] .label,
      .stat-card[loading="true"] .value,
      .stat-card[loading="true"] .trend,
      .stat-card[loading="true"] .trend-label,
      .stat-card[loading="true"] .icon {
        background: linear-gradient(
          90deg,
          var(--color-background-secondary, #f5f5f5) 25%,
          var(--color-background-primary, #ffffff) 50%,
          var(--color-background-secondary, #f5f5f5) 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        color: transparent;
        border-radius: var(--border-radius-none, 0);
      }
      
      .stat-card[loading="true"] .label {
        width: 60%;
        height: 0.75rem;
      }
      
      .stat-card[loading="true"] .value {
        width: 40%;
        height: 2.5rem;
      }
      
      .stat-card[loading="true"] .trend {
        width: 30%;
        height: 0.75rem;
      }
      
      .stat-card[loading="true"] .trend-label {
        width: 50%;
        height: 0.75rem;
      }
      
      .stat-card[loading="true"] .icon {
        width: 32px;
        height: 32px;
      }
      
      @keyframes skeleton-loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `;
  }

  render() {
    const value = this.getAttribute('value') || '';
    const label = this.getAttribute('label') || '';
    const trend = this.getAttribute('trend');
    const trendLabel = this.getAttribute('trend-label') || '';
    const icon = this.getAttribute('icon');
    const loading = this.getAttribute('loading') === 'true';
    const variant = this.getAttribute('variant') || 'default';

    const trendNum = trend ? parseFloat(trend) : null;
    const isPositive = trendNum !== null && trendNum >= 0;
    const isNegative = trendNum !== null && trendNum < 0;
    const trendIcon = isPositive ? '▲' : isNegative ? '▼' : '';
    const trendDisplay = trendNum !== null ? `${Math.abs(trendNum)}%` : '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="stat-card" variant="${variant}" loading="${loading}">
        <div class="content">
          <div class="header">
            <span class="label">${label}</span>
            ${icon ? `<span class="icon">${icon}</span>` : ''}
          </div>
          <div class="value-container">
            <span class="value">${value}</span>
          </div>
          ${trend !== null ? `
            <div class="trend-container">
              <span class="trend" ${isPositive ? 'positive' : ''} ${isNegative ? 'negative' : ''}>
                <span class="trend-icon">${trendIcon}</span>
                ${trendDisplay}
              </span>
              ${trendLabel ? `<span class="trend-label">${trendLabel}</span>` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-stat-card', PilotStatCard);
