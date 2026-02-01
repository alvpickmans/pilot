import { html } from 'lit';

export default {
  title: 'Components/Card',
  component: 'pilot-card',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'technical'],
      description: 'Visual style of the card (default has standard border, technical has corner brackets)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Internal padding of the card',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to use a technical/heavy border (1.5px solid)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Card

A container component with technical frame styling for organizing content.

### Features
- **Variants**: default (standard border), technical (corner bracket styling)
- **Padding**: sm, md, lg, xl sizes
- **Border styles**: Standard (1px) or technical (1.5px) border
- **Slots**: header, default content, and footer

### Usage
\`\`\`html
<pilot-card variant="default" padding="md">
  <div slot="header">Card Header</div>
  <div>Card content goes here</div>
  <div slot="footer">Card Footer</div>
</pilot-card>
\`\`\`

### Slots
- **header**: Optional header content displayed at the top with a bottom border
- **default**: Main content area
- **footer**: Optional footer content displayed at the bottom with a top border

### Events
The card component does not emit events directly, but content within slots (such as buttons) can trigger their own events.
        `,
      },
    },
  },
};

const Template = ({ variant, padding, bordered }) => html`
  <pilot-card variant=${variant} padding=${padding} ?bordered=${bordered}>
    <h3 style="margin: 0 0 0.5rem 0; font-family: 'Chakra Petch', sans-serif;">Card Title</h3>
    <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
      This is the main content area of the card. You can put any content here.
    </p>
  </pilot-card>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  padding: 'md',
  bordered: false,
};

export const Technical = Template.bind({});
Technical.args = {
  variant: 'technical',
  padding: 'md',
  bordered: false,
};

export const Bordered = Template.bind({});
Bordered.args = {
  variant: 'default',
  padding: 'md',
  bordered: true,
};

export const SmallPadding = Template.bind({});
SmallPadding.args = {
  variant: 'default',
  padding: 'sm',
  bordered: false,
};

export const LargePadding = Template.bind({});
LargePadding.args = {
  variant: 'default',
  padding: 'lg',
  bordered: false,
};

export const ExtraLargePadding = Template.bind({});
ExtraLargePadding.args = {
  variant: 'default',
  padding: 'xl',
  bordered: false,
};

export const WithHeaderFooter = () => html`
  <pilot-card padding="md">
    <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 1rem;">Card with Header & Footer</h3>
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b6b6b;">ID: #001</span>
    </div>
    <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
      This card demonstrates the use of both the <code>header</code> and <code>footer</code> slots. 
      The header appears at the top with a border below it, and the footer appears at the bottom with a border above it.
    </p>
    <div slot="footer" style="display: flex; gap: 0.5rem;">
      <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.25rem 0.75rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;">Action 1</button>
      <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.25rem 0.75rem; border: 1px solid #d4d4d4; background: white; cursor: pointer;">Action 2</button>
    </div>
  </pilot-card>
`;

export const WithImage = () => html`
  <pilot-card padding="none" variant="default">
    <img 
      src="https://picsum.photos/400/200" 
      alt="Placeholder" 
      style="width: 100%; height: 200px; object-fit: cover; display: block;"
    />
    <div style="padding: 1rem;">
      <h3 style="margin: 0 0 0.5rem 0; font-family: 'Chakra Petch', sans-serif;">Card with Image</h3>
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5; color: #6b6b6b;">
        This card uses padding="none" on the card itself, then adds padding to the content area manually.
      </p>
    </div>
  </pilot-card>
`;

export const Compact = () => html`
  <pilot-card variant="technical" padding="sm">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 0; display: flex; align-items: center; justify-content: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 1rem;">⚡</span>
      </div>
      <div>
        <p style="margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; font-weight: 600;">Compact Card</p>
        <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #6b6b6b;">Small padding, technical style</p>
      </div>
    </div>
  </pilot-card>
`;

export const Clickable = () => html`
  <pilot-card 
    variant="default" 
    padding="md" 
    style="cursor: pointer;"
    onclick="alert('Card clicked!')"
  >
    <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 1rem;">Clickable Card</h3>
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">→</span>
    </div>
    <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
      This card is wrapped in a clickable container. In production, you might wrap the card in an anchor tag 
      or add a click handler to navigate to a detail page.
    </p>
    <div slot="footer" style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: #6b6b6b;">
      Last updated: 2 hours ago
    </div>
  </pilot-card>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default (Standard Border)</p>
      <pilot-card padding="md">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Standard card with 1px border</p>
      </pilot-card>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical (Corner Brackets)</p>
      <pilot-card variant="technical" padding="md">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Technical card with corner bracket styling</p>
      </pilot-card>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Bordered (1.5px Technical Border)</p>
      <pilot-card bordered padding="md">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Card with emphasized technical border</p>
      </pilot-card>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Padding Sizes</p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pilot-card padding="sm">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">SM padding (0.75rem)</p>
        </pilot-card>
        <pilot-card padding="md">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">MD padding (1rem)</p>
        </pilot-card>
        <pilot-card padding="lg">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">LG padding (1.5rem)</p>
        </pilot-card>
        <pilot-card padding="xl">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">XL padding (2rem)</p>
        </pilot-card>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Header & Footer Slots</p>
      <pilot-card variant="technical" padding="lg">
        <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Chakra Petch', sans-serif; font-weight: 600;">System Status</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #16a34a;">● OPERATIONAL</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
          <p style="margin: 0 0 0.5rem 0;">All systems are running normally.</p>
          <p style="margin: 0; color: #6b6b6b; font-size: 0.875rem;">Last check: 2026-02-01 14:30:00 UTC</p>
        </div>
        <div slot="footer" style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: #6b6b6b;">
          <div style="display: flex; justify-content: space-between;">
            <span>Uptime: 99.9%</span>
            <span>v2.4.1</span>
          </div>
        </div>
      </pilot-card>
    </div>
  </div>
`;
