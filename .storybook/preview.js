import '../styles/variables.css';
import '../styles/patterns.css';

// Import all Pilot components for Storybook
import '../components/annotation.js';
import '../components/badge.js';
import '../components/button.js';
import '../components/card.js';
import '../components/code-block.js';
import '../components/commodity-input.js';
import '../components/datepicker.js';
import '../components/divider.js';
import '../components/grid.js';
import '../components/input.js';
import '../components/label.js';
import '../components/measurement.js';
import '../components/modal.js';
import '../components/nav-menu.js';
import '../components/pagination.js';
import '../components/panel.js';
import '../components/search.js';
import '../components/select.js';
import '../components/status.js';
import '../components/tabs.js';
import '../components/terminal.js';
import '../components/toggle.js';

// Theme decorator to sync background color with data-theme attribute
const themeDecorator = (storyFn, context) => {
  const { backgrounds } = context.globals;
  const storyRoot = document.querySelector('#storybook-root');
  
  if (storyRoot) {
    // Check if background is dark (common dark values in Storybook)
    const isDark = backgrounds?.value === '#1a1a1a' || 
                   backgrounds?.value === '#0d0d0d' ||
                   backgrounds?.value === '#000000' ||
                   backgrounds?.value === '#2d2d2d' ||
                   backgrounds?.value?.includes('dark') ||
                   (backgrounds?.value && parseInt(backgrounds.value.replace('#', ''), 16) < 0x444444);
    
    if (isDark) {
      storyRoot.setAttribute('data-theme', 'dark');
    } else {
      storyRoot.removeAttribute('data-theme');
    }
  }
  
  return storyFn();
};

export const decorators = [themeDecorator];

// Configure backgrounds with dark mode option
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#1a1a1a',
      },
      {
        name: 'gray',
        value: '#f5f5f5',
      },
    ],
  },
};
