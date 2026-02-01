import { html } from 'lit';

export default {
  title: 'Components/Badge',
  component: 'pilot-badge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'outline', 'technical'],
      description: 'Visual style of the badge',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Badge text content (slot)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Badge

A technical status badge with industrial styling and multiple variants.

### Features
- **Variants**: default, primary, success, warning, error, outline, technical
- **Sizes**: sm, md, lg
- **Technical styling**: JetBrains Mono font for consistent industrial aesthetic
- **Uppercase text**: All badges display text in uppercase
- **Semantic colors**: Each variant maps to appropriate feedback colors
- **Technical variant**: Code-like styling with angle brackets

### Usage
\`\`\`html
<pilot-badge variant="success" size="md">Verified</pilot-badge>
\`\`\`

### Variants
- **default**: Light gray background for neutral states
- **primary**: Dark background with white text for emphasis
- **success**: Green background for positive states
- **warning**: Amber/orange background for caution states
- **error**: Red background for error/problem states
- **outline**: Transparent background with border for subtle emphasis
- **technical**: Code-like styling with angle brackets (< >)

### Slot
- **default**: The badge label text displayed inside the badge

### Events
The badge component does not emit events. It is a static display component.
        `,
      },
    },
  },
};

const Template = ({ label, variant, size }) => html`
  <pilot-badge variant=${variant} size=${size}>
    ${label}
  </pilot-badge>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Badge',
  variant: 'default',
  size: 'md',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
  variant: 'primary',
  size: 'md',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success',
  variant: 'success',
  size: 'md',
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Warning',
  variant: 'warning',
  size: 'md',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Error',
  variant: 'error',
  size: 'md',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline',
  variant: 'outline',
  size: 'md',
};

export const Technical = Template.bind({});
Technical.args = {
  label: 'Technical',
  variant: 'technical',
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
  variant: 'success',
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  variant: 'success',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large',
  variant: 'success',
  size: 'lg',
};

export const Variants = () => html`
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
    <pilot-badge variant="default">Default</pilot-badge>
    <pilot-badge variant="primary">Primary</pilot-badge>
    <pilot-badge variant="success">Success</pilot-badge>
    <pilot-badge variant="warning">Warning</pilot-badge>
    <pilot-badge variant="error">Error</pilot-badge>
    <pilot-badge variant="outline">Outline</pilot-badge>
    <pilot-badge variant="technical">Technical</pilot-badge>
  </div>
`;

export const Sizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: flex-start;">
    <pilot-badge variant="primary" size="sm">Small</pilot-badge>
    <pilot-badge variant="primary" size="md">Medium</pilot-badge>
    <pilot-badge variant="primary" size="lg">Large</pilot-badge>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Variants</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
        <pilot-badge variant="default">Default</pilot-badge>
        <pilot-badge variant="primary">Primary</pilot-badge>
        <pilot-badge variant="success">Success</pilot-badge>
        <pilot-badge variant="warning">Warning</pilot-badge>
        <pilot-badge variant="error">Error</pilot-badge>
        <pilot-badge variant="outline">Outline</pilot-badge>
        <pilot-badge variant="technical">Technical</pilot-badge>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Size Variations</p>
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <pilot-badge variant="success" size="sm">Small</pilot-badge>
        <pilot-badge variant="success" size="md">Medium</pilot-badge>
        <pilot-badge variant="success" size="lg">Large</pilot-badge>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Real-World Example: Status Indicators</p>
      <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
        <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600;">Feature Flags</div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <pilot-badge variant="success" size="sm">Enabled</pilot-badge>
          <pilot-badge variant="error" size="sm">Disabled</pilot-badge>
          <pilot-badge variant="warning" size="sm">Beta</pilot-badge>
          <pilot-badge variant="outline" size="sm">Experimental</pilot-badge>
          <pilot-badge variant="technical" size="sm">API_v2</pilot-badge>
        </div>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Real-World Example: Plan Tags</p>
      <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
        <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600;">Subscription Plans</div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <pilot-badge variant="default" size="md">Free</pilot-badge>
          <pilot-badge variant="primary" size="md">Pro</pilot-badge>
          <pilot-badge variant="success" size="md">Enterprise</pilot-badge>
          <pilot-badge variant="warning" size="md">Legacy</pilot-badge>
        </div>
      </div>
    </div>
  </div>
`;
