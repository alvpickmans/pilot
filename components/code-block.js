/**
 * Pilot Design System - Code Block Component
 * 
 * Syntax-highlighted code display with line numbers.
 */

import { baseStyles } from './shared.js';

// ============================================
// TECHNICAL CODE-BLOCK COMPONENT
// ============================================

export class PilotCodeBlock extends HTMLElement {
  static get observedAttributes() {
    return ['language', 'filename', 'show-line-numbers'];
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
      
      .code-block {
        background: var(--color-background-code, #e5e5e5);
        border: 1px solid var(--color-border-secondary, #d4d4d4);
        border-radius: var(--border-radius-none, 0);
        overflow: hidden;
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
        background: var(--color-gray-100, #e5e5e5);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }
      
      .language {
        font-size: var(--font-size-2xs, 0.625rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-tertiary, #6b6b6b);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
        background: var(--color-gray-200, #d4d4d4);
        border-radius: var(--border-radius-sm, 0.125rem);
      }
      
      .filename {
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--color-text-secondary, #525252);
      }
      
      .body {
        position: relative;
        overflow-x: auto;
      }
      
      pre {
        margin: 0;
        padding: var(--pilot-code-block-padding, 1.5rem);
        font-size: var(--font-size-sm, 0.875rem);
        line-height: var(--line-height-technical, 1.2);
        color: var(--color-text-code, #2a2a2a);
        white-space: pre;
        word-wrap: normal;
        overflow-x: auto;
      }
      
      code {
        font-family: inherit;
        display: block;
      }
      
      /* Line numbers */
      .with-line-numbers pre {
        padding-left: 3.5rem;
        counter-reset: line;
      }
      
      .with-line-numbers code {
        position: relative;
      }
      
      .with-line-numbers code > div {
        position: relative;
        padding-left: var(--spacing-4, 1rem);
      }
      
      .with-line-numbers code > div::before {
        counter-increment: line;
        content: counter(line);
        position: absolute;
        left: -3rem;
        width: 2.5rem;
        text-align: right;
        color: var(--color-text-tertiary, #6b6b6b);
        font-size: var(--font-size-xs, 0.75rem);
      }
    `;
  }

  render() {
    const language = this.getAttribute('language') || '';
    const filename = this.getAttribute('filename') || '';
    const showLineNumbers = this.hasAttribute('show-line-numbers');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="code-block">
        ${(language || filename) ? `
          <div class="header">
            ${filename ? `<span class="filename">${filename}</span>` : ''}
            ${language ? `<span class="language">${language}</span>` : ''}
          </div>
        ` : ''}
        <div class="body ${showLineNumbers ? 'with-line-numbers' : ''}">
          <pre><code><slot></slot></code></pre>
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

customElements.define('pilot-code-block', PilotCodeBlock);
