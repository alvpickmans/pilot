import { html } from 'lit';

export default {
  title: 'Components/Container',
  component: 'pilot-container',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width constraint',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Enable technical corner brackets and borders',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Inner padding size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Container

A max-width wrapper component with technical border styling for page sections.

### Features
- **Max-Width Constraints**: Choose from sm (640px), md (768px), lg (1024px - default), xl (1280px), or full (100%)
- **Centered Alignment**: Always centered within its parent
- **Technical Borders**: Optional corner bracket decorations with technical styling
- **Responsive**: Automatically adjusts padding on smaller screens

### Usage
\`\`\`html
<pilot-container size="lg" bordered padding="lg">
  <pilot-card>
    <h3 slot="header">Content</h3>
    <p>Your content goes here...</p>
  </pilot-card>
</pilot-container>
\`\`\`

### Attributes
- **size**: Max-width constraint - sm | md | lg (default) | xl | full
- **bordered**: Boolean - adds technical corner bracket decorations
- **padding**: Inner padding size - sm | md (default) | lg | xl

### Slots
- **default**: Main content area - accepts any HTML or components

### Styling Notes
- Uses CSS custom properties for responsive design
- Corner brackets are 12px with 2px border (technical style)
- Responsive: Padding reduces to sm (1rem) on screens <640px
- Always centered with auto margins
- Box-sizing: border-box for predictable sizing
        `,
      },
    },
  },
};

const Template = ({ size, bordered, padding }) => html`
  <pilot-container
    size=${size}
    ?bordered=${bordered}
    padding=${padding}
  >
    <div style="
      background: #f5f5f5;
      border: 1px solid #d4d4d4;
      padding: 1rem;
      font-family: 'Inter', sans-serif;
    ">
      <p style="margin: 0; font-weight: 600; font-size: 1rem;">Container Content</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: #6b6b6b;">
        Size: ${size} | Bordered: ${bordered} | Padding: ${padding}
      </p>
    </div>
  </pilot-container>
`;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  bordered: false,
  padding: 'md',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  bordered: false,
  padding: 'md',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  bordered: false,
  padding: 'md',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  bordered: false,
  padding: 'md',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  bordered: false,
  padding: 'md',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  size: 'full',
  bordered: false,
  padding: 'md',
};

export const BorderedSmall = Template.bind({});
BorderedSmall.args = {
  size: 'sm',
  bordered: true,
  padding: 'md',
};

export const BorderedMedium = Template.bind({});
BorderedMedium.args = {
  size: 'md',
  bordered: true,
  padding: 'md',
};

export const BorderedLarge = Template.bind({});
BorderedLarge.args = {
  size: 'lg',
  bordered: true,
  padding: 'md',
};

export const BorderedXL = Template.bind({});
BorderedXL.args = {
  size: 'xl',
  bordered: true,
  padding: 'md',
};

export const PaddingVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small Padding (1rem)</p>
      <pilot-container size="md" bordered padding="sm">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Content with small padding</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Medium Padding (1.5rem) - Default</p>
      <pilot-container size="md" bordered padding="md">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Content with medium padding</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large Padding (2rem)</p>
      <pilot-container size="md" bordered padding="lg">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Content with large padding</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Extra Large Padding (3rem)</p>
      <pilot-container size="md" bordered padding="xl">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Content with XL padding</p>
        </div>
      </pilot-container>
    </div>
  </div>
`;

export const SizeComparison = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small (640px)</p>
      <pilot-container size="sm" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Compact container for focused content</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Medium (768px)</p>
      <pilot-container size="md" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Good for tablet layouts</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large (1024px) - Default</p>
      <pilot-container size="lg" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Standard container for main content (default)</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Extra Large (1280px)</p>
      <pilot-container size="xl" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Wide container for dashboards and complex layouts</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Full Width (100%)</p>
      <pilot-container size="full" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Spans full width of parent</p>
        </div>
      </pilot-container>
    </div>
  </div>
`;

export const TechnicalStyling = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Without Borders</p>
      <pilot-container size="md" padding="lg">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 1rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Clean container without corner brackets</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Technical Borders</p>
      <pilot-container size="md" bordered padding="lg">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 1rem;">
          <p style="margin: 0 0 0.5rem 0; font-family: 'Inter', sans-serif; font-weight: 600;">Technical Styling Applied</p>
          <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #6b6b6b;">
            Notice the corner bracket markers in all four corners. These give the container its distinctive technical/mechanical appearance.
          </p>
        </div>
      </pilot-container>
    </div>
  </div>
`;

export const WithNestedContent = () => html`
  <pilot-container size="lg" bordered padding="xl">
    <div style="font-family: 'Inter', sans-serif;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; font-size: 1.125rem;">Dashboard Container</p>
      <p style="margin: 0 0 1.5rem 0; color: #6b6b6b; line-height: 1.6;">
        This demonstrates a real-world use case with nested content inside a bordered container.
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 1rem; text-align: center;">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #1a1a1a;">95%</p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b6b6b;">Uptime</p>
        </div>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 1rem; text-align: center;">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #1a1a1a;">2.4s</p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b6b6b;">Latency</p>
        </div>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 1rem; text-align: center;">
          <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #1a1a1a;">1.2K</p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b6b6b;">Requests</p>
        </div>
      </div>
      
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0; font-size: 0.75rem; color: #6b6b6b; font-family: 'JetBrains Mono', monospace;">
          Last updated: 2026-02-03 14:30 UTC
        </p>
      </div>
    </div>
  </pilot-container>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Container (lg, no borders)</p>
      <pilot-container>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Simple container with default settings</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Technical Borders</p>
      <pilot-container size="md" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Container with corner brackets</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Extra Large with Borders and XL Padding</p>
      <pilot-container size="xl" bordered padding="xl">
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Maximum space with technical styling</p>
        </div>
      </pilot-container>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Full Width Bordered</p>
      <pilot-container size="full" bordered>
        <div style="background: #f5f5f5; border: 1px solid #d4d4d4; padding: 0.5rem;">
          <p style="margin: 0; font-family: 'Inter', sans-serif;">Spans entire width with technical borders</p>
        </div>
      </pilot-container>
    </div>
  </div>
`;
