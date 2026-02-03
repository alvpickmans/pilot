/**
 * Pilot Design System - Progress Component
 *
 * Linear progress bars for budgets and goals with percentage labels.
 */

import { baseStyles } from './shared.js';

// ============================================
// PROGRESS COMPONENT
// ============================================

export class PilotProgress extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'variant', 'striped', 'animated', 'label', 'show-percentage'];
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
        width: 100%;
      }
      
      .progress-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2, 0.5rem);
        width: 100%;
      }
      
      .progress-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
      }
      
      .progress-label {
        color: var(--color-text-secondary, #525252);
      }
      
      .progress-percentage {
        color: var(--color-text-primary, #1a1a1a);
        font-weight: var(--font-weight-bold, 700);
      }
      
      /* Technical measurement variant */
      .progress-track {
        position: relative;
        width: 100%;
        height: 8px;
        background: var(--color-background-secondary, #f5f5f5);
        border: 1px solid var(--color-border-secondary, #d4d4d4);
        overflow: hidden;
      }
      
      /* Technical bracket styling */
      .progress-track.technical {
        border: 2px solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .progress-track.technical::before,
      .progress-track.technical::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 14px;
        border-top: 2px solid var(--color-border-technical, #1a1a1a);
        border-bottom: 2px solid var(--color-border-technical, #1a1a1a);
        z-index: 1;
      }
      
      .progress-track.technical::before {
        left: 2px;
        border-left: 2px solid var(--color-border-technical, #1a1a1a);
      }
      
      .progress-track.technical::after {
        right: 2px;
        border-right: 2px solid var(--color-border-technical, #1a1a1a);
      }
      
      .progress-bar {
        height: 100%;
        background: var(--color-brand-primary, #1a1a1a);
        transition: width var(--duration-normal, 250ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        position: relative;
      }
      
      /* Variant styles */
      .progress-bar[variant="success"] {
        background: var(--color-feedback-success, #16a34a);
      }
      
      .progress-bar[variant="warning"] {
        background: var(--color-feedback-warning, #d97706);
      }
      
      .progress-bar[variant="error"] {
        background: var(--color-feedback-error, #dc2626);
      }
      
      /* Striped animation */
      .progress-bar[striped] {
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.15) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(255, 255, 255, 0.15) 75%,
          transparent 75%,
          transparent
        );
        background-size: 1rem 1rem;
      }
      
      .progress-bar[striped][animated] {
        animation: progress-stripe 1s linear infinite;
      }
      
      @keyframes progress-stripe {
        0% {
          background-position: 1rem 0;
        }
        100% {
          background-position: 0 0;
        }
      }
      
      /* Hidden label */
      :host([show-percentage="false"]) .progress-percentage {
        display: none;
      }
    `;
  }

  render() {
    const value = parseFloat(this.getAttribute('value')) || 0;
    const max = parseFloat(this.getAttribute('max')) || 100;
    const variant = this.getAttribute('variant') || 'default';
    const striped = this.hasAttribute('striped');
    const animated = this.hasAttribute('animated');
    const labelAttr = this.getAttribute('label') || '';
    const showPercentage = this.getAttribute('show-percentage') !== 'false';

    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const percentageInt = Math.round(percentage);

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="progress-container">
        ${labelAttr || showPercentage ? `
          <div class="progress-header">
            ${labelAttr ? `<span class="progress-label">${labelAttr}</span>` : ''}
            ${showPercentage ? `<span class="progress-percentage">${percentageInt}%</span>` : ''}
          </div>
        ` : ''}
        <div class="progress-track">
          <div 
            class="progress-bar" 
            variant="${variant}" 
            ${striped ? 'striped' : ''}
            ${animated ? 'animated' : ''}
            style="width: ${percentage}%"
            role="progressbar"
            aria-valuenow="${value}"
            aria-valuemin="0"
            aria-valuemax="${max}"
            aria-label="${labelAttr || 'Progress'}"
          ></div>
        </div>
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('pilot-progress', PilotProgress);
