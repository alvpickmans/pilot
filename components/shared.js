/**
 * Pilot Design System - Shared Utilities
 * 
 * Common utilities and base styles used across all components.
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const createStyles = (css) => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
};

export const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

// ============================================
// BASE STYLES
// ============================================

export const baseStyles = `
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
// FORM FIELD STYLES
// ============================================

export const formFieldStyles = `
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
`;

// ============================================
// INPUT BASE STYLES
// ============================================

export const inputBaseStyles = `
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

  :host([error]) input {
    border-color: var(--color-feedback-error, #dc2626);
  }

  :host([error]) input:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

// ============================================
// TECHNICAL BRACKET STYLES
// ============================================

export const technicalBracketStyles = `
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrapper.technical::before,
  .input-wrapper.technical::after {
    font-family: var(--font-mono, 'IBM Plex Mono', monospace);
    font-size: var(--font-size-lg, 1.125rem);
    color: var(--color-border-primary, #b3b3b3);
    padding: 0 var(--spacing-2, 0.5rem);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .input-wrapper.technical::before {
    content: '[';
    left: 0;
  }

  .input-wrapper.technical::after {
    content: ']';
    right: 0;
  }

  .input-wrapper.technical input {
    border-left: none;
    border-right: none;
    padding-left: var(--spacing-8, 2rem);
    padding-right: var(--spacing-8, 2rem);
    text-align: center;
    width: 100%;
  }
`;

// ============================================
// DROPDOWN BASE STYLES
// ============================================

export const dropdownBaseStyles = `
  .trigger {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-mono, 'IBM Plex Mono', monospace);
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
    border: var(--border-width-1, 1px) solid var(--color-border-primary, #b3b3b3);
    border-radius: var(--border-radius-none, 0);
    background: var(--color-background-primary, #ffffff);
    color: var(--color-text-primary, #1a1a1a);
    cursor: pointer;
    transition: all var(--duration-fast, 150ms) var(--easing-technical, cubic-bezier(0.4, 0, 0.2, 1));
    min-height: 44px;
  }

  .trigger:hover {
    border-color: var(--color-brand-primary, #1a1a1a);
  }

  .trigger:focus {
    outline: none;
    border-color: var(--color-brand-primary, #1a1a1a);
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  .trigger[disabled] {
    background: var(--color-background-secondary, #f5f5f5);
    color: var(--color-text-disabled, #8a8a8a);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .trigger-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trigger-text.placeholder {
    color: var(--color-text-tertiary, #6b6b6b);
  }

  .trigger-icon {
    margin-left: var(--spacing-2, 0.5rem);
    transition: transform var(--duration-fast, 150ms);
    font-size: var(--font-size-xs, 0.75rem);
  }

  .trigger-icon.open {
    transform: rotate(180deg);
  }

  .dropdown {
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
    max-height: 300px;
    overflow: hidden;
    display: none;
    flex-direction: column;
  }

  .dropdown.open {
    display: flex;
  }
`;
