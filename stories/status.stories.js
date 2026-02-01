import { html } from 'lit';

export default {
  title: 'Components/Status',
  component: 'pilot-status',
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'info'],
      description: 'Visual style indicating the status type',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    pulse: {
      control: 'boolean',
      description: 'Whether to show an animated pulse effect',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the status indicator dot',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Status label text (slot content)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Status

A status indicator component with animated pulse option for showing system or application states.

### Features
- **Variants**: neutral, success, warning, error, info
- **Sizes**: sm, md, lg for the indicator dot
- **Pulse animation**: Animated fade effect to draw attention to active statuses
- **Semantic colors**: Each variant maps to appropriate feedback colors
- **Technical typography**: JetBrains Mono font for consistent industrial aesthetic

### Usage
\`\`\`html
<pilot-status variant="success" size="md" pulse>Operational</pilot-status>
\`\`\`

### Variants
- **neutral** (default): Gray indicator for neutral/undefined states
- **success**: Green indicator for positive/successful states
- **warning**: Amber/Orange indicator for caution states
- **error**: Red indicator for error/problem states
- **info**: Dark gray indicator for informational states

### Slot
- **default**: The status label text displayed next to the indicator

### Events
The status component does not emit events. It is a static display component.
        `,
      },
    },
  },
};

const Template = ({ label, variant, pulse, size }) => html`
  <pilot-status variant=${variant} size=${size} ?pulse=${pulse}>
    ${label}
  </pilot-status>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Status',
  variant: 'neutral',
  size: 'md',
  pulse: false,
};

export const Success = Template.bind({});
Success.args = {
  label: 'Operational',
  variant: 'success',
  size: 'md',
  pulse: false,
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Degraded',
  variant: 'warning',
  size: 'md',
  pulse: false,
};

export const Error = Template.bind({});
Error.args = {
  label: 'Critical',
  variant: 'error',
  size: 'md',
  pulse: false,
};

export const Info = Template.bind({});
Info.args = {
  label: 'Info',
  variant: 'info',
  size: 'md',
  pulse: false,
};

export const WithPulse = Template.bind({});
WithPulse.args = {
  label: 'Active',
  variant: 'success',
  size: 'md',
  pulse: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
  variant: 'success',
  size: 'sm',
  pulse: false,
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  variant: 'success',
  size: 'md',
  pulse: false,
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large',
  variant: 'success',
  size: 'lg',
  pulse: false,
};

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
    <pilot-status variant="neutral">Neutral</pilot-status>
    <pilot-status variant="success">Success</pilot-status>
    <pilot-status variant="warning">Warning</pilot-status>
    <pilot-status variant="error">Error</pilot-status>
    <pilot-status variant="info">Info</pilot-status>
  </div>
`;

export const AllStatesWithPulse = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
    <pilot-status variant="neutral" pulse>Neutral (Pulsing)</pilot-status>
    <pilot-status variant="success" pulse>Success (Pulsing)</pilot-status>
    <pilot-status variant="warning" pulse>Warning (Pulsing)</pilot-status>
    <pilot-status variant="error" pulse>Error (Pulsing)</pilot-status>
    <pilot-status variant="info" pulse>Info (Pulsing)</pilot-status>
  </div>
`;

export const Sizes = () => html`
  <div style="display: flex; gap: 2rem; align-items: center;">
    <pilot-status variant="success" size="sm">Small (6px)</pilot-status>
    <pilot-status variant="success" size="md">Medium (8px)</pilot-status>
    <pilot-status variant="success" size="lg">Large (12px)</pilot-status>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Variants (Static)</p>
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <pilot-status variant="neutral">Neutral - Default state</pilot-status>
        <pilot-status variant="success">Success - Operational</pilot-status>
        <pilot-status variant="warning">Warning - Degraded performance</pilot-status>
        <pilot-status variant="error">Error - Critical failure</pilot-status>
        <pilot-status variant="info">Info - Informational message</pilot-status>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Variants (With Pulse)</p>
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <pilot-status variant="neutral" pulse>Neutral - Processing</pilot-status>
        <pilot-status variant="success" pulse>Success - Active</pilot-status>
        <pilot-status variant="warning" pulse>Warning - Attention needed</pilot-status>
        <pilot-status variant="error" pulse>Error - Critical alert</pilot-status>
        <pilot-status variant="info" pulse>Info - Syncing</pilot-status>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Size Variations</p>
      <div style="display: flex; gap: 2rem; align-items: center;">
        <pilot-status variant="success" size="sm">Small</pilot-status>
        <pilot-status variant="success" size="md">Medium</pilot-status>
        <pilot-status variant="success" size="lg">Large</pilot-status>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Real-World Example: System Dashboard</p>
      <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
        <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600;">System Status Dashboard</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <pilot-status variant="success" size="sm">API Gateway</pilot-status>
          <pilot-status variant="success" size="sm">Database</pilot-status>
          <pilot-status variant="warning" pulse size="sm">Cache Layer</pilot-status>
          <pilot-status variant="success" size="sm">Message Queue</pilot-status>
          <pilot-status variant="error" pulse size="sm">Email Service</pilot-status>
          <pilot-status variant="success" size="sm">Storage</pilot-status>
        </div>
      </div>
    </div>
  </div>
`;
