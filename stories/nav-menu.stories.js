import { html } from 'lit';

export default {
  title: 'Components/Nav Menu',
  component: 'pilot-nav-menu',
  argTypes: {
    breakpoint: {
      control: 'number',
      description: 'Screen width (px) at which to switch to mobile hamburger menu',
      table: {
        defaultValue: { summary: '768' },
      },
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the navigation sticks to the top of the viewport',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'technical'],
      description: 'Visual style of the navigation (default has standard border, technical has heavier technical styling)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the mobile menu is open (can be set programmatically)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Nav Menu

A responsive navigation menu with hamburger menu for mobile devices. Supports nested items, keyboard navigation, and accessibility features.

### Features
- **Responsive design**: Automatically switches to hamburger menu at breakpoint (default 768px)
- **Nested menus**: Supports dropdown submenus on desktop and expandable sections on mobile
- **Keyboard navigation**: Full accessibility with Tab, Escape, and focus trapping in mobile menu
- **Sticky positioning**: Option to keep nav fixed at top of viewport
- **Variants**: default (standard) and technical (industrial styling)
- **Mobile overlay**: Full-screen mobile menu with backdrop and slide-in panel
- **Skip link**: Includes skip-to-navigation link for accessibility

### Usage
\`\`\`html
<pilot-nav-menu breakpoint="768" sticky variant="default">
  <!-- Brand/Logo slot -->
  <div slot="brand">
    <a href="/" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600;">My Site</a>
  </div>
  
  <!-- Desktop navigation items -->
  <li slot="nav-items"><a href="/">Home</a></li>
  <li slot="nav-items"><a href="/about">About</a></li>
  <li slot="nav-items">
    <a href="/services">Services</a>
    <ul>
      <li><a href="/web">Web Design</a></li>
      <li><a href="/app">App Development</a></li>
    </ul>
  </li>
  
  <!-- Mobile navigation items (if different from desktop) -->
  <li slot="mobile-nav-items"><a href="/">Home</a></li>
  <li slot="mobile-nav-items"><a href="/about">About</a></li>
</pilot-nav-menu>
\`\`\`

### Slots
- **brand**: Optional logo or brand content displayed on the left side
- **nav-items**: Desktop navigation items (li elements with links/buttons and optional nested ul for submenus)
- **mobile-nav-items**: Mobile navigation items (if not provided, typically mirrors nav-items)

### Methods
- **open()**: Opens the mobile menu programmatically
- **close()**: Closes the mobile menu programmatically
- **toggle()**: Toggles the mobile menu open/closed state

### Events
The nav-menu component does not emit custom events. Use standard click handlers on navigation links within the slots to handle navigation.

### Accessibility
- Skip link allows keyboard users to jump directly to navigation
- Focus trap keeps keyboard focus within mobile menu when open
- Escape key closes the mobile menu
- ARIA attributes for menu state (aria-expanded, aria-haspopup, aria-modal)
- Proper semantic HTML with nav, ul, li, and role attributes
        `,
      },
    },
  },
};

const Template = ({ breakpoint, sticky, variant }) => html`
  <div style="position: relative; min-height: 300px; background: #f5f5f5; padding: 1rem;">
    <pilot-nav-menu
      breakpoint=${breakpoint}
      variant=${variant}
      ?sticky=${sticky}
    >
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          PILOT NAV
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items"><a href="#">About</a></li>
      <li slot="nav-items"><a href="#">Services</a></li>
      <li slot="nav-items"><a href="#">Contact</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items"><a href="#">About</a></li>
      <li slot="mobile-nav-items"><a href="#">Services</a></li>
      <li slot="mobile-nav-items"><a href="#">Contact</a></li>
    </pilot-nav-menu>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  breakpoint: 768,
  sticky: false,
  variant: 'default',
};

export const Technical = Template.bind({});
Technical.args = {
  breakpoint: 768,
  sticky: false,
  variant: 'technical',
};

export const Sticky = () => html`
  <div style="position: relative; min-height: 400px; background: #f5f5f5;">
    <pilot-nav-menu sticky variant="default">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          STICKY NAV
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items"><a href="#">Products</a></li>
      <li slot="nav-items"><a href="#">Documentation</a></li>
      <li slot="nav-items"><a href="#">Support</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items"><a href="#">Products</a></li>
      <li slot="mobile-nav-items"><a href="#">Documentation</a></li>
      <li slot="mobile-nav-items"><a href="#">Support</a></li>
    </pilot-nav-menu>
    
    <div style="padding: 2rem; font-family: 'Inter', sans-serif;">
      <p>Scroll down to see the sticky navigation remain at the top of the viewport.</p>
      <div style="height: 200px; background: #e5e5e5; margin-top: 1rem; display: flex; align-items: center; justify-content: center; color: #6b6b6b;">
        Content area
      </div>
    </div>
  </div>
`;

export const WithNestedMenu = () => html`
  <div style="position: relative; min-height: 400px; background: #f5f5f5; padding: 1rem;">
    <pilot-nav-menu variant="default">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          NESTED MENU
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items">
        <a href="#">Products</a>
        <ul>
          <li><a href="#">Web Application</a></li>
          <li><a href="#">Mobile App</a></li>
          <li><a href="#">API Service</a></li>
        </ul>
      </li>
      <li slot="nav-items">
        <a href="#">Resources</a>
        <ul>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Tutorials</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </li>
      <li slot="nav-items"><a href="#">Contact</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items">
        <a href="#">Products</a>
        <ul>
          <li><a href="#">Web Application</a></li>
          <li><a href="#">Mobile App</a></li>
          <li><a href="#">API Service</a></li>
        </ul>
      </li>
      <li slot="mobile-nav-items">
        <a href="#">Resources</a>
        <ul>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Tutorials</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </li>
      <li slot="mobile-nav-items"><a href="#">Contact</a></li>
    </pilot-nav-menu>
    
    <div style="padding: 2rem; font-family: 'Inter', sans-serif;">
      <p>Desktop: Hover over "Products" or "Resources" to see dropdown submenus.</p>
      <p>Mobile: Resize to below 768px and open the hamburger menu to see expandable nested items.</p>
    </div>
  </div>
`;

export const WithIcons = () => html`
  <div style="position: relative; min-height: 300px; background: #f5f5f5; padding: 1rem;">
    <pilot-nav-menu variant="default">
      <div slot="brand">
        <a href="#" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #1a1a1a;">
          <span style="width: 32px; height: 32px; background: #1a1a1a; color: white; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace;">⚡</span>
          <span style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; font-size: 1.25rem;">ICON NAV</span>
        </a>
      </div>
      
      <li slot="nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.25rem;">
          <span>🏠</span> Home
        </a>
      </li>
      <li slot="nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.25rem;">
          <span>📊</span> Dashboard
        </a>
      </li>
      <li slot="nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.25rem;">
          <span>⚙️</span> Settings
        </a>
      </li>
      <li slot="nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.25rem;">
          <span>👤</span> Profile
        </a>
      </li>
      
      <li slot="mobile-nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.5rem;">
          <span>🏠</span> Home
        </a>
      </li>
      <li slot="mobile-nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.5rem;">
          <span>📊</span> Dashboard
        </a>
      </li>
      <li slot="mobile-nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.5rem;">
          <span>⚙️</span> Settings
        </a>
      </li>
      <li slot="mobile-nav-items">
        <a href="#" style="display: flex; align-items: center; gap: 0.5rem;">
          <span>👤</span> Profile
        </a>
      </li>
    </pilot-nav-menu>
  </div>
`;

export const DeeplyNested = () => html`
  <div style="position: relative; min-height: 500px; background: #f5f5f5; padding: 1rem;">
    <pilot-nav-menu variant="technical">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          DEEP NESTING
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items">
        <button>Services</button>
        <ul>
          <li>
            <a href="#">Web Development</a>
            <ul>
              <li><a href="#">Frontend</a></li>
              <li><a href="#">Backend</a></li>
              <li><a href="#">Full Stack</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Design</a>
            <ul>
              <li><a href="#">UI Design</a></li>
              <li><a href="#">UX Research</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li slot="nav-items"><a href="#">About</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items">
        <button>Services</button>
        <ul>
          <li>
            <a href="#">Web Development</a>
            <ul>
              <li><a href="#">Frontend</a></li>
              <li><a href="#">Backend</a></li>
              <li><a href="#">Full Stack</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Design</a>
            <ul>
              <li><a href="#">UI Design</a></li>
              <li><a href="#">UX Research</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li slot="mobile-nav-items"><a href="#">About</a></li>
    </pilot-nav-menu>
    
    <div style="padding: 2rem; font-family: 'Inter', sans-serif;">
      <p>Demonstrates multi-level nested navigation structure.</p>
      <p>Desktop: Nested submenus appear on hover.</p>
      <p>Mobile: Expandable sections with proper indentation for nested items.</p>
    </div>
  </div>
`;

export const CustomBreakpoint = () => html`
  <div style="position: relative; min-height: 300px; background: #f5f5f5; padding: 1rem;">
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; margin: 0 0 1rem 0; color: #6b6b6b;">
      Breakpoint set to 1024px - hamburger appears on screens narrower than 1024px
    </p>
    <pilot-nav-menu breakpoint="1024" variant="default">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          CUSTOM BP
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items"><a href="#">Features</a></li>
      <li slot="nav-items"><a href="#">Pricing</a></li>
      <li slot="nav-items"><a href="#">Contact</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items"><a href="#">Features</a></li>
      <li slot="mobile-nav-items"><a href="#">Pricing</a></li>
      <li slot="mobile-nav-items"><a href="#">Contact</a></li>
    </pilot-nav-menu>
  </div>
`;

export const WithActiveState = () => html`
  <div style="position: relative; min-height: 300px; background: #f5f5f5; padding: 1rem;">
    <pilot-nav-menu variant="default">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          ACTIVE STATE
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items"><a href="#" class="active">Products</a></li>
      <li slot="nav-items"><a href="#">Services</a></li>
      <li slot="nav-items"><a href="#">Contact</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items"><a href="#" class="active">Products</a></li>
      <li slot="mobile-nav-items"><a href="#">Services</a></li>
      <li slot="mobile-nav-items"><a href="#">Contact</a></li>
    </pilot-nav-menu>
  </div>
`;

export const ProgrammaticControl = () => html`
  <div style="position: relative; min-height: 400px; background: #f5f5f5; padding: 1rem;">
    <div style="margin-bottom: 1rem;">
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; margin-right: 0.5rem;"
        @click=${() => {
          const nav = document.getElementById('programmatic-nav');
          if (nav) nav.open();
        }}
      >
        Open Menu
      </button>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: white; cursor: pointer;"
        @click=${() => {
          const nav = document.getElementById('programmatic-nav');
          if (nav) nav.close();
        }}
      >
        Close Menu
      </button>
    </div>
    
    <pilot-nav-menu id="programmatic-nav" variant="default">
      <div slot="brand">
        <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">
          PROGRAMMATIC
        </a>
      </div>
      
      <li slot="nav-items"><a href="#">Home</a></li>
      <li slot="nav-items"><a href="#">About</a></li>
      <li slot="nav-items"><a href="#">Contact</a></li>
      
      <li slot="mobile-nav-items"><a href="#">Home</a></li>
      <li slot="mobile-nav-items"><a href="#">About</a></li>
      <li slot="mobile-nav-items"><a href="#">Contact</a></li>
    </pilot-nav-menu>
    
    <div style="padding: 2rem; font-family: 'Inter', sans-serif;">
      <p>Use the buttons above to programmatically control the mobile menu state.</p>
      <p>Methods available: <code style="font-family: 'IBM Plex Mono', monospace; background: #e5e5e5; padding: 0.125rem 0.25rem;">open()</code>, 
      <code style="font-family: 'IBM Plex Mono', monospace; background: #e5e5e5; padding: 0.125rem 0.25rem;">close()</code>, 
      <code style="font-family: 'IBM Plex Mono', monospace; background: #e5e5e5; padding: 0.125rem 0.25rem;">toggle()</code></p>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Variant</p>
      <pilot-nav-menu variant="default">
        <div slot="brand">
          <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">DEFAULT</a>
        </div>
        <li slot="nav-items"><a href="#">Home</a></li>
        <li slot="nav-items"><a href="#">About</a></li>
        <li slot="nav-items"><a href="#">Contact</a></li>
        <li slot="mobile-nav-items"><a href="#">Home</a></li>
        <li slot="mobile-nav-items"><a href="#">About</a></li>
        <li slot="mobile-nav-items"><a href="#">Contact</a></li>
      </pilot-nav-menu>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Variant</p>
      <pilot-nav-menu variant="technical">
        <div slot="brand">
          <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">TECHNICAL</a>
        </div>
        <li slot="nav-items"><a href="#">Home</a></li>
        <li slot="nav-items"><a href="#">About</a></li>
        <li slot="nav-items"><a href="#">Contact</a></li>
        <li slot="mobile-nav-items"><a href="#">Home</a></li>
        <li slot="mobile-nav-items"><a href="#">About</a></li>
        <li slot="mobile-nav-items"><a href="#">Contact</a></li>
      </pilot-nav-menu>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Nested Submenus</p>
      <pilot-nav-menu variant="default">
        <div slot="brand">
          <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1.25rem;">NESTED</a>
        </div>
        <li slot="nav-items"><a href="#">Home</a></li>
        <li slot="nav-items">
          <a href="#">Products</a>
          <ul>
            <li><a href="#">Web</a></li>
            <li><a href="#">Mobile</a></li>
          </ul>
        </li>
        <li slot="nav-items">
          <a href="#">Services</a>
          <ul>
            <li><a href="#">Design</a></li>
            <li><a href="#">Development</a></li>
          </ul>
        </li>
        <li slot="mobile-nav-items"><a href="#">Home</a></li>
        <li slot="mobile-nav-items">
          <a href="#">Products</a>
          <ul>
            <li><a href="#">Web</a></li>
            <li><a href="#">Mobile</a></li>
          </ul>
        </li>
        <li slot="mobile-nav-items">
          <a href="#">Services</a>
          <ul>
            <li><a href="#">Design</a></li>
            <li><a href="#">Development</a></li>
          </ul>
        </li>
      </pilot-nav-menu>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Sticky Navigation</p>
      <div style="height: 100px; overflow: auto; background: #f5f5f5; position: relative;">
        <pilot-nav-menu sticky variant="default">
          <div slot="brand">
            <a href="#" style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; text-decoration: none; color: #1a1a1a; font-size: 1rem;">STICKY</a>
          </div>
          <li slot="nav-items"><a href="#">Item 1</a></li>
          <li slot="nav-items"><a href="#">Item 2</a></li>
          <li slot="mobile-nav-items"><a href="#">Item 1</a></li>
          <li slot="mobile-nav-items"><a href="#">Item 2</a></li>
        </pilot-nav-menu>
        <div style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.875rem;">
          <p style="margin: 0;">Scroll within this container to see sticky behavior...</p>
          <div style="height: 200px; background: #e5e5e5; margin-top: 1rem; display: flex; align-items: center; justify-content: center;">
            Content area
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Custom Brand Content</p>
      <pilot-nav-menu variant="technical">
        <div slot="brand" style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; background: #f59e0b; display: flex; align-items: center; justify-content: center;">
            <span style="color: #1a1a1a; font-weight: 600;">P</span>
          </div>
          <div>
            <div style="font-family: 'Chakra Petch', sans-serif; font-weight: 600; font-size: 1.125rem; line-height: 1;">PILOT SYSTEM</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; letter-spacing: 0.1em;">v2.4.1</div>
          </div>
        </div>
        <li slot="nav-items"><a href="#">Dashboard</a></li>
        <li slot="nav-items"><a href="#">Analytics</a></li>
        <li slot="nav-items"><a href="#">Settings</a></li>
        <li slot="mobile-nav-items"><a href="#">Dashboard</a></li>
        <li slot="mobile-nav-items"><a href="#">Analytics</a></li>
        <li slot="mobile-nav-items"><a href="#">Settings</a></li>
      </pilot-nav-menu>
    </div>
  </div>
`;
