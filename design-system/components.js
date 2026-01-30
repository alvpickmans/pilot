/**
 * Pilot Design System - Web Components
 * 
 * Native Web Components for maximum framework compatibility.
 * Retro-technical aesthetic with industrial and governmental tone.
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

const createStyles = (css) => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
};

const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

// ============================================
// BASE STYLES
// ============================================

const baseStyles = `
  :host {
    display: block;
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: inherit;
  }
  
  :host([hidden]) {
    display: none;
  }
`;

// ============================================
// TECHNICAL BUTTON COMPONENT
// ============================================

class PilotButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
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
        display: inline-block;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2, 0.5rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        cursor: pointer;
        transition: all var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        position: relative;
        overflow: hidden;
      }
      
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--color-brand-primary, #1a1a1a);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--duration-technical, 200ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
        z-index: 0;
      }
      
      button:hover::before {
        transform: scaleX(1);
      }
      
      button:hover {
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      button > * {
        position: relative;
        z-index: 1;
      }
      
      /* Sizes */
      button[size="sm"] {
        padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      button[size="md"] {
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
      }
      
      button[size="lg"] {
        padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
        font-size: var(--font-size-base, 1rem);
      }
      
      /* Variants */
      button[variant="primary"] {
        background: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
        border-color: var(--color-brand-primary, #1a1a1a);
      }
      
      button[variant="primary"]::before {
        background: var(--color-brand-primary-hover, #242424);
      }
      
      button[variant="secondary"] {
        background: var(--color-background-secondary, #f5f5f5);
        border-color: var(--color-border-primary, #b3b3b3);
      }
      
      button[variant="outline"] {
        background: transparent;
      }
      
      button[variant="ghost"] {
        background: transparent;
        border-color: transparent;
      }
      
      button[variant="ghost"]:hover {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-primary, #1a1a1a);
      }
      
      button[variant="ghost"]::before {
        display: none;
      }
      
      /* Technical variant - for code/machine aesthetic */
      button[variant="technical"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        border: 2px solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-technical, #f5f5f5);
        position: relative;
      }
      
      button[variant="technical"]::after {
        content: '›';
        margin-left: var(--spacing-2, 0.5rem);
        font-weight: var(--font-weight-bold, 700);
      }
      
      /* States */
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      button[loading] {
        pointer-events: none;
      }
      
      button[loading]::after {
        content: '';
        width: 1em;
        height: 1em;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: var(--spacing-2, 0.5rem);
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--color-brand-accent, #f59e0b);
        outline-offset: 2px;
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'secondary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <button 
        variant="${variant}" 
        size="${size}"
        ${disabled ? 'disabled' : ''}
        ${loading ? 'loading' : ''}
      >
        <slot></slot>
      </button>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-button', PilotButton);

// ============================================
// TECHNICAL INPUT COMPONENT
// ============================================

class PilotInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'disabled', 'readonly', 'value', 'label', 'hint', 'error'];
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
      
      .field {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2, 0.5rem);
      }
      
      label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      
      input {
        width: 100%;
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-primary, #ffffff);
        color: var(--color-text-primary, #1a1a1a);
        transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
      }
      
      input::placeholder {
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      input:focus {
        outline: none;
        border-color: var(--color-brand-primary, #1a1a1a);
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
      }
      
      input[disabled] {
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-disabled, #8a8a8a);
        cursor: not-allowed;
      }
      
      /* Technical style with brackets */
      .input-wrapper.technical::before,
      .input-wrapper.technical::after {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-lg, 1.125rem);
        color: var(--color-border-primary, #b3b3b3);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .input-wrapper.technical::before {
        content: '[';
      }
      
      .input-wrapper.technical::after {
        content: ']';
      }
      
      .input-wrapper.technical input {
        border-left: none;
        border-right: none;
        text-align: center;
      }
      
      .hint, .error {
        font-family: var(--font-body, 'IBM Plex Sans', sans-serif);
        font-size: var(--font-size-xs, 0.75rem);
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
      }
      
      .hint {
        color: var(--color-text-tertiary, #6b6b6b);
      }
      
      .error {
        color: var(--color-feedback-error, #dc2626);
      }
      
      .error::before {
        content: '⚠';
      }
      
      :host([error]) input {
        border-color: var(--color-feedback-error, #dc2626);
      }
      
      :host([error]) input:focus {
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
      }
    `;
  }

  render() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const value = this.getAttribute('value') || '';
    const label = this.getAttribute('label') || '';
    const hint = this.getAttribute('hint') || '';
    const error = this.getAttribute('error') || '';
    const technical = this.hasAttribute('technical');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ''}
        <div class="input-wrapper ${technical ? 'technical' : ''}">
          <input 
            type="${type}"
            placeholder="${placeholder}"
            value="${value}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          />
        </div>
        ${error ? `<div class="error">${error}</div>` : ''}
        ${hint && !error ? `<div class="hint">${hint}</div>` : ''}
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-input', PilotInput);

// ============================================
// TECHNICAL CARD COMPONENT
// ============================================

class PilotCard extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'padding', 'bordered'];
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
      
      .card {
        background: var(--color-background-primary, #ffffff);
        border: var(--border-width-1, 1px) solid var(--color-border-secondary, #d4d4d4);
        border-radius: var(--border-radius-none, 0);
        overflow: hidden;
        position: relative;
      }
      
      .card[bordered="true"] {
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      /* Technical variant with corner brackets */
      .card[variant="technical"] {
        border: none;
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .card[variant="technical"]::before,
      .card[variant="technical"]::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
      }
      
      .card[variant="technical"]::before {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }
      
      .card[variant="technical"]::after {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }
      
      .content {
        position: relative;
        z-index: 1;
      }
      
      .content[padding="sm"] { padding: var(--spacing-3, 0.75rem); }
      .content[padding="md"] { padding: var(--spacing-4, 1rem); }
      .content[padding="lg"] { padding: var(--spacing-6, 1.5rem); }
      .content[padding="xl"] { padding: var(--spacing-8, 2rem); }
      
      /* Header slot styling */
      ::slotted([slot="header"]) {
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
        padding-bottom: var(--spacing-3, 0.75rem);
        margin-bottom: var(--spacing-3, 0.75rem);
      }
      
      /* Footer slot styling */
      ::slotted([slot="footer"]) {
        border-top: 1px solid var(--color-border-secondary, #d4d4d4);
        padding-top: var(--spacing-3, 0.75rem);
        margin-top: var(--spacing-3, 0.75rem);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const padding = this.getAttribute('padding') || 'md';
    const bordered = this.getAttribute('bordered') || 'false';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="card" variant="${variant}" bordered="${bordered}">
        <div class="content" padding="${padding}">
          <slot name="header"></slot>
          <slot></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-card', PilotCard);

// ============================================
// TECHNICAL BADGE COMPONENT
// ============================================

class PilotBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size'];
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
        display: inline-flex;
      }
      
      .badge {
        display: inline-flex;
        align-items: center;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
        border-radius: var(--border-radius-none, 0);
        background: var(--color-background-secondary, #f5f5f5);
        color: var(--color-text-secondary, #525252);
      }
      
      .badge[size="sm"] {
        font-size: var(--font-size-2xs, 0.625rem);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
      }
      
      .badge[size="md"] {
        font-size: var(--font-size-xs, 0.75rem);
        padding: var(--spacing-1, 0.25rem) var(--spacing-3, 0.75rem);
      }
      
      .badge[size="lg"] {
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
      }
      
      .badge[variant="primary"] {
        background: var(--color-brand-primary, #1a1a1a);
        border-color: var(--color-brand-primary, #1a1a1a);
        color: var(--color-text-inverse, #ffffff);
      }
      
      .badge[variant="success"] {
        background: var(--color-feedback-success, #16a34a);
        border-color: var(--color-feedback-success, #16a34a);
        color: var(--color-text-inverse, #ffffff);
      }
      
      .badge[variant="warning"] {
        background: var(--color-feedback-warning, #d97706);
        border-color: var(--color-feedback-warning, #d97706);
        color: var(--color-text-inverse, #ffffff);
      }
      
      .badge[variant="error"] {
        background: var(--color-feedback-error, #dc2626);
        border-color: var(--color-feedback-error, #dc2626);
        color: var(--color-text-inverse, #ffffff);
      }
      
      .badge[variant="outline"] {
        background: transparent;
      }
      
      /* Technical variant with code-like brackets */
      .badge[variant="technical"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        background: var(--color-background-technical, #f5f5f5);
        border: 2px solid var(--color-border-technical, #1a1a1a);
        position: relative;
      }
      
      .badge[variant="technical"]::before {
        content: '<';
        margin-right: var(--spacing-1, 0.25rem);
        opacity: 0.5;
      }
      
      .badge[variant="technical"]::after {
        content: '>';
        margin-left: var(--spacing-1, 0.25rem);
        opacity: 0.5;
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="badge" variant="${variant}" size="${size}">
        <slot></slot>
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-badge', PilotBadge);

// ============================================
// TECHNICAL TERMINAL COMPONENT
// ============================================

class PilotTerminal extends HTMLElement {
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

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-terminal', PilotTerminal);

// ============================================
// TECHNICAL LABEL COMPONENT
// ============================================

class PilotLabel extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'prefix', 'suffix'];
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
        display: inline-flex;
      }
      
      .label {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
      
      .label[size="sm"] {
        font-size: var(--font-size-2xs, 0.625rem);
      }
      
      .label[size="md"] {
        font-size: var(--font-size-xs, 0.75rem);
      }
      
      .label[size="lg"] {
        font-size: var(--font-size-sm, 0.875rem);
      }
      
      .prefix, .suffix {
        color: var(--color-text-tertiary, #6b6b6b);
        opacity: 0.7;
      }
      
      /* Technical variant with box */
      .label[variant="technical"] {
        border: 1px solid var(--color-border-primary, #b3b3b3);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      /* Code variant */
      .label[variant="code"] {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        text-transform: none;
        letter-spacing: var(--letter-spacing-code, 0.01em);
        background: var(--color-background-code, #e5e5e5);
        padding: var(--spacing-0-5, 0.125rem) var(--spacing-2, 0.5rem);
        border-radius: var(--border-radius-sm, 0.125rem);
      }
      
      /* Industrial variant */
      .label[variant="industrial"] {
        font-family: var(--font-industrial, 'Chakra Petch', sans-serif);
        font-weight: var(--font-weight-bold, 700);
        letter-spacing: var(--letter-spacing-wider, 0.05em);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';
    const prefix = this.getAttribute('prefix') || '';
    const suffix = this.getAttribute('suffix') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="label" variant="${variant}" size="${size}">
        ${prefix ? `<span class="prefix">${prefix}</span>` : ''}
        <slot></slot>
        ${suffix ? `<span class="suffix">${suffix}</span>` : ''}
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-label', PilotLabel);

// ============================================
// TECHNICAL DIVIDER COMPONENT
// ============================================

class PilotDivider extends HTMLElement {
  static get observedAttributes() {
    return ['orientation', 'variant', 'label'];
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
      
      .divider {
        display: flex;
        align-items: center;
        width: 100%;
      }
      
      .divider[orientation="vertical"] {
        flex-direction: column;
        height: 100%;
        width: auto;
      }
      
      .line {
        flex: 1;
        border: none;
        border-top: 1px solid var(--color-border-primary, #b3b3b3);
      }
      
      .divider[orientation="vertical"] .line {
        border-top: none;
        border-left: 1px solid var(--color-border-primary, #b3b3b3);
        flex: 1;
        width: 0;
      }
      
      .divider[variant="dashed"] .line {
        border-top-style: dashed;
      }
      
      .divider[variant="dashed"][orientation="vertical"] .line {
        border-left-style: dashed;
        border-top: none;
      }
      
      .divider[variant="technical"] .line {
        border-top: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
      }
      
      .divider[variant="technical"][orientation="vertical"] .line {
        border-left: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        border-top: none;
      }
      
      .label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-tertiary, #6b6b6b);
        padding: 0 var(--spacing-4, 1rem);
        white-space: nowrap;
      }
      
      .divider[orientation="vertical"] .label {
        padding: var(--spacing-4, 1rem) 0;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
    `;
  }

  render() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    const variant = this.getAttribute('variant') || 'default';
    const label = this.getAttribute('label') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="divider" orientation="${orientation}" variant="${variant}">
        <div class="line"></div>
        ${label ? `<span class="label">${label}</span>` : ''}
        ${label ? '<div class="line"></div>' : ''}
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-divider', PilotDivider);

// ============================================
// TECHNICAL GRID COMPONENT
// ============================================

class PilotGrid extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'gap', 'show-grid'];
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
        position: relative;
      }
      
      .grid {
        display: grid;
        position: relative;
      }
      
      .grid[columns="1"] { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .grid[columns="2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid[columns="3"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .grid[columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .grid[columns="6"] { grid-template-columns: repeat(6, minmax(0, 1fr)); }
      .grid[columns="12"] { grid-template-columns: repeat(12, minmax(0, 1fr)); }
      
      .grid[gap="0"] { gap: 0; }
      .grid[gap="1"] { gap: var(--spacing-1, 0.25rem); }
      .grid[gap="2"] { gap: var(--spacing-2, 0.5rem); }
      .grid[gap="3"] { gap: var(--spacing-3, 0.75rem); }
      .grid[gap="4"] { gap: var(--spacing-4, 1rem); }
      .grid[gap="6"] { gap: var(--spacing-6, 1.5rem); }
      .grid[gap="8"] { gap: var(--spacing-8, 2rem); }
      
      /* Technical grid overlay */
      .grid-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: 
          linear-gradient(to right, var(--color-pilot-grid, #d4d4d4) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-pilot-grid, #d4d4d4) 1px, transparent 1px);
        background-size: var(--pilot-grid-size, 8px) var(--pilot-grid-size, 8px);
        opacity: 0.3;
      }
      
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }
    `;
  }

  render() {
    const columns = this.getAttribute('columns') || '1';
    const gap = this.getAttribute('gap') || '4';
    const showGrid = this.hasAttribute('show-grid');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="grid" columns="${columns}" gap="${gap}">
        ${showGrid ? '<div class="grid-overlay"></div>' : ''}
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-grid', PilotGrid);

// ============================================
// TECHNICAL PANEL COMPONENT
// ============================================

class PilotPanel extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'collapsible', 'collapsed'];
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
        border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a);
        background: var(--color-background-primary, #ffffff);
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
        background: var(--color-background-technical, #f5f5f5);
        border-bottom: 1px solid var(--color-border-secondary, #d4d4d4);
      }
      
      .title {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-primary, #1a1a1a);
        display: flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .title::before {
        content: '▸';
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-tertiary, #6b6b6b);
        transition: transform var(--duration-fast, 150ms);
      }
      
      :host([collapsed]) .title::before {
        transform: rotate(-90deg);
      }
      
      .toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-1, 0.25rem);
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: var(--font-size-sm, 0.875rem);
        color: var(--color-text-secondary, #525252);
        transition: color var(--duration-fast, 150ms);
      }
      
      .toggle:hover {
        color: var(--color-text-primary, #1a1a1a);
      }
      
      .content {
        padding: var(--spacing-4, 1rem);
        transition: all var(--duration-normal, 250ms);
      }
      
      :host([collapsed]) .content {
        display: none;
      }
      
      /* Technical corner markers */
      :host {
        position: relative;
      }
      
      :host::before,
      :host::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border: 2px solid var(--color-border-technical, #1a1a1a);
        z-index: 1;
      }
      
      :host::before {
        top: -2px;
        left: -2px;
        border-right: none;
        border-bottom: none;
      }
      
      :host::after {
        top: -2px;
        right: -2px;
        border-left: none;
        border-bottom: none;
      }
    `;
  }

  render() {
    const title = this.getAttribute('title') || '';
    const collapsible = this.hasAttribute('collapsible');
    const collapsed = this.hasAttribute('collapsed');

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="panel">
        ${title ? `
          <div class="header">
            <span class="title">${title}</span>
            ${collapsible ? `
              <button class="toggle" aria-label="${collapsed ? 'Expand' : 'Collapse'}">
                ${collapsed ? '+' : '−'}
              </button>
            ` : ''}
          </div>
        ` : ''}
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

    if (collapsible) {
      const toggle = this.shadowRoot.querySelector('.toggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleAttribute('collapsed');
        });
      }
    }
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-panel', PilotPanel);

// ============================================
// TECHNICAL STATUS COMPONENT
// ============================================

class PilotStatus extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'pulse', 'size'];
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
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2, 0.5rem);
      }
      
      .indicator {
        width: 8px;
        height: 8px;
        border-radius: var(--border-radius-full, 9999px);
        background: var(--color-gray-400, #8a8a8a);
        border: 2px solid transparent;
        box-shadow: 0 0 0 1px var(--color-background-primary, #ffffff);
      }
      
      .indicator[size="sm"] {
        width: 6px;
        height: 6px;
      }
      
      .indicator[size="lg"] {
        width: 12px;
        height: 12px;
      }
      
      .indicator[variant="success"] {
        background: var(--color-feedback-success, #16a34a);
      }
      
      .indicator[variant="warning"] {
        background: var(--color-feedback-warning, #d97706);
      }
      
      .indicator[variant="error"] {
        background: var(--color-feedback-error, #dc2626);
      }
      
      .indicator[variant="info"] {
        background: var(--color-feedback-info, #525252);
      }
      
      .indicator[variant="neutral"] {
        background: var(--color-gray-400, #8a8a8a);
      }
      
      .indicator[pulse] {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      
      .label {
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-medium, 500);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-text-secondary, #525252);
      }
    `;
  }

  render() {
    const variant = this.getAttribute('variant') || 'neutral';
    const pulse = this.hasAttribute('pulse');
    const size = this.getAttribute('size') || 'md';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="indicator" variant="${variant}" size="${size}" ${pulse ? 'pulse' : ''}></span>
      <span class="label"><slot></slot></span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-status', PilotStatus);

// ============================================
// TECHNICAL CODE-BLOCK COMPONENT
// ============================================

class PilotCodeBlock extends HTMLElement {
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

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-code-block', PilotCodeBlock);

// ============================================
// TECHNICAL ANNOTATION COMPONENT
// ============================================

class PilotAnnotation extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'position'];
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
        position: relative;
        padding: var(--spacing-4, 1rem);
        border: 1px dashed var(--color-border-dashed, #8a8a8a);
        background: var(--color-background-technical, #f5f5f5);
      }
      
      .label {
        position: absolute;
        top: 0;
        left: var(--spacing-4, 1rem);
        transform: translateY(-50%);
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
        font-size: var(--font-size-2xs, 0.625rem);
        font-weight: var(--font-weight-semibold, 600);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
        text-transform: uppercase;
        color: var(--color-pilot-annotation, #525252);
        background: var(--color-background-primary, #ffffff);
        padding: 0 var(--spacing-2, 0.5rem);
      }
      
      .label::before {
        content: attr(data-type);
      }
      
      .label[type="note"]::before { content: 'NOTE'; }
      .label[type="warning"]::before { content: 'WARNING'; }
      .label[type="important"]::before { content: 'IMPORTANT'; }
      .label[type="technical"]::before { content: 'TECHNICAL'; }
      
      /* Position variants */
      .label[position="top-left"] {
        left: var(--spacing-4, 1rem);
        right: auto;
      }
      
      .label[position="top-right"] {
        left: auto;
        right: var(--spacing-4, 1rem);
      }
      
      /* Corner brackets */
      :host::before,
      :host::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 1px dashed var(--color-border-dashed, #8a8a8a);
      }
      
      :host::before {
        top: -1px;
        left: -1px;
        border-right: none;
        border-bottom: none;
      }
      
      :host::after {
        bottom: -1px;
        right: -1px;
        border-left: none;
        border-top: none;
      }
    `;
  }

  render() {
    const type = this.getAttribute('type') || 'note';
    const position = this.getAttribute('position') || 'top-left';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="label" type="${type}" position="${position}" data-type="${type}"></span>
      <slot></slot>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-annotation', PilotAnnotation);

// ============================================
// TECHNICAL MEASUREMENT COMPONENT
// ============================================

class PilotMeasurement extends HTMLElement {
  static get observedAttributes() {
    return ['orientation', 'value', 'unit'];
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
        display: inline-flex;
        align-items: center;
        font-family: var(--font-technical, 'JetBrains Mono', monospace);
      }
      
      .measurement {
        display: flex;
        align-items: center;
        gap: var(--spacing-1, 0.25rem);
        color: var(--color-pilot-measurement, #8a8a8a);
        font-size: var(--font-size-xs, 0.75rem);
        letter-spacing: var(--letter-spacing-technical, 0.05em);
      }
      
      .line {
        flex: 1;
        height: 1px;
        background: var(--color-pilot-measurement, #8a8a8a);
        min-width: 20px;
      }
      
      .measurement[orientation="vertical"] {
        flex-direction: column;
      }
      
      .measurement[orientation="vertical"] .line {
        width: 1px;
        height: 20px;
        min-width: auto;
        min-height: 20px;
      }
      
      .value {
        font-weight: var(--font-weight-semibold, 600);
        color: var(--color-text-secondary, #525252);
      }
      
      .unit {
        font-size: var(--font-size-2xs, 0.625rem);
        text-transform: uppercase;
      }
    `;
  }

  render() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    const value = this.getAttribute('value') || '';
    const unit = this.getAttribute('unit') || '';

    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <span class="measurement" orientation="${orientation}">
        ${orientation === 'horizontal' ? '<span class="line"></span>' : ''}
        <span class="value">${value}</span>
        ${unit ? `<span class="unit">${unit}</span>` : ''}
        <span class="line"></span>
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('pilot-measurement', PilotMeasurement);

// Export for module usage
export {
  PilotButton,
  PilotInput,
  PilotCard,
  PilotBadge,
  PilotTerminal,
  PilotLabel,
  PilotDivider,
  PilotGrid,
  PilotPanel,
  PilotStatus,
  PilotCodeBlock,
  PilotAnnotation,
  PilotMeasurement
};
