/**
 * Pilot Design System - Terminal Component
 * 
 * Console/terminal display with dark theme.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL TERMINAL COMPONENT
// ============================================

export class PilotTerminal extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'show-header', 'show-prompt'];
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
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
      }
      
      .terminal {
        background: var(--color-black-300, #1a1a1a);
        border: var(--border-width-2, 2px) solid var(--color-black-400, #242424);
        border-radius: var(--border-radius-none, 0);
        overflow: hidden;
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        background: var(--color-black-400, #242424);
        border-bottom: 1px solid var(--color-black-500, #2d2d2d);
      }
      
      .title {
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-gray-400, #8a8a8a);
      }
      
      .controls {
        display: flex;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .control {
        width: 12px;
        height: 12px;
        border: 1px solid var(--color-gray-600, #525252);
        border-radius: var(--border-radius-none, 0);
      }
      
      .body {
        padding: var(--pilot-terminal-padding, 1rem);
        color: var(--color-gray-200, #d4d4d4);
        font-size: var(--font-size-sm, 0.875rem);
        line-height: var(--line-height-technical, 1.2);
        overflow-x: auto;
      }
      
      .line {
        display: flex;
        gap: var(--spacing-2, 0.5rem);
        margin-bottom: var(--spacing-1, 0.25rem);
      }
      
      .prompt {
        color: var(--color-amber-500, #f59e0b);
        user-select: none;
      }
      
      .content {
        color: var(--color-gray-200, #d4d4d4);
      }
      
      .comment {
        color: var(--color-gray-600, #525252);
      }
      
      .keyword {
        color: var(--color-amber-400, #fbbf24);
      }
      
      .string {
        color: var(--color-green-400, #4ade80);
      }
      
      ::slotted(pre) {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      ::slotted(code) {
        font-family: inherit;
      }
    `;
  }

  render() {
    const title = this.getAttribute('title') || 'terminal';
    const showHeader = this.hasAttribute('show-header');
    const showPrompt = this.hasAttribute('show-prompt');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="terminal">
        ${showHeader ? `
          <div class="header">
            <span class="title">${title}</span>
            <div class="controls">
              <span class="control"></span>
              <span class="control"></span>
              <span class="control"></span>
            </div>
          </div>
        ` : ''}
        <div class="body">
          ${showPrompt ? `
            <div class="line">
              <span class="prompt">$</span>
              <span class="content"><slot></slot></span>
            </div>
          ` : '<slot></slot>'}
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

customElements.define('pilot-terminal', PilotTerminal);
