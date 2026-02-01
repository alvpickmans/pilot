import { html } from 'lit';

export default {
  title: 'Components/Label',
  component: 'pilot-label',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'technical', 'code', 'industrial'],
      description: 'Visual style variant of the label',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the label',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    prefix: {
      control: 'text',
      description: 'Optional prefix text to display before the label content',
      table: {
        defaultValue: { summary: '' },
      },
    },
    suffix: {
      control: 'text',
      description: 'Optional suffix text to display after the label content',
      table: {
        defaultValue: { summary: '' },
      },
    },
    content: {
      control: 'text',
      description: 'Main content text for the label (slot content)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Label

A technical label component with various styling variants and sizing options.

### Features
- **Variants**: default, technical (boxed), code (monospace), industrial (bold)
- **Sizes**: sm, md, lg
- **Typography**: Uses technical font (JetBrains Mono) with uppercase styling
- **Prefixes/Suffixes**: Optional decorative text before/after the main content
- **Code variant**: Monospace font with lowercase text support

### Usage
\`\`\`html
<pilot-label variant="technical" size="md" prefix="[">System Status</pilot-label>
\`\`\`

### Slots
- **default**: Main content text for the label

### Events
The label component does not emit events.
        `,
      },
    },
  },
};

const Template = ({ content, variant, size, prefix, suffix }) => html`
  <pilot-label
    variant=${variant}
    size=${size}
    prefix=${prefix}
    suffix=${suffix}
  >
    ${content}
  </pilot-label>
`;

export const Default = Template.bind({});
Default.args = {
  content: 'Label Text',
  variant: 'default',
  size: 'md',
  prefix: '',
  suffix: '',
};

export const Variants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default</p>
      <pilot-label>System Status</pilot-label>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical (Boxed)</p>
      <pilot-label variant="technical">Technical Label</pilot-label>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Code (Monospace)</p>
      <pilot-label variant="code">Code Label</pilot-label>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Industrial (Bold)</p>
      <pilot-label variant="industrial">Industrial Label</pilot-label>
    </div>
  </div>
`;

export const Sizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small (sm)</p>
      <pilot-label size="sm">Small Label</pilot-label>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Medium (md) - Default</p>
      <pilot-label size="md">Medium Label</pilot-label>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large (lg)</p>
      <pilot-label size="lg">Large Label</pilot-label>
    </div>
  </div>
`;

export const WithIcon = Template.bind({});
WithIcon.args = {
  content: 'Status',
  variant: 'default',
  size: 'md',
  prefix: '[',
  suffix: ']',
};
WithIcon.parameters = {
  docs: {
    description: {
      story: 'Use prefix and suffix attributes to add decorative brackets, icons, or other text around the label content.',
    },
  },
};

export const Uppercase = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default, Technical, Industrial (Uppercase)</p>
      <div style="display: flex; gap: 1rem;">
        <pilot-label>Default</pilot-label>
        <pilot-label variant="technical">Technical</pilot-label>
        <pilot-label variant="industrial">Industrial</pilot-label>
      </div>
    </div>
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Code (Mixed Case)</p>
      <pilot-label variant="code">MixedCase Label</pilot-label>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Variant</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <pilot-label size="sm">Small</pilot-label>
        <pilot-label size="md">Medium</pilot-label>
        <pilot-label size="lg">Large</pilot-label>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Variant (Boxed)</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <pilot-label variant="technical" size="sm">Small</pilot-label>
        <pilot-label variant="technical" size="md">Medium</pilot-label>
        <pilot-label variant="technical" size="lg">Large</pilot-label>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Code Variant (Monospace)</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <pilot-label variant="code" size="sm">Small</pilot-label>
        <pilot-label variant="code" size="md">Medium</pilot-label>
        <pilot-label variant="code" size="lg">Large</pilot-label>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Industrial Variant (Bold)</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <pilot-label variant="industrial" size="sm">Small</pilot-label>
        <pilot-label variant="industrial" size="md">Medium</pilot-label>
        <pilot-label variant="industrial" size="lg">Large</pilot-label>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Prefix/Suffix</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <pilot-label prefix="[">Bracketed</pilot-label>
        <pilot-label suffix=">">Arrow</pilot-label>
        <pilot-label variant="technical" prefix="{">JSON Style</pilot-label>
        <pilot-label variant="technical" suffix="}">JSON Style</pilot-label>
      </div>
    </div>
  </div>
`;
