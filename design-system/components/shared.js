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
