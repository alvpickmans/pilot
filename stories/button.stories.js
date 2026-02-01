import { html } from 'lit';

export default {
  title: 'Components/Button',
  component: 'pilot-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'technical'],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'secondary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Button text content',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Button

A technical button with industrial styling and multiple variants.

### Features
- **Variants**: primary, secondary, outline, ghost, technical
- **Sizes**: sm, md, lg
- **States**: disabled, loading
- **Animations**: Smooth fill animation on hover
- **Accessibility**: Full keyboard navigation and focus states

### Usage
\`\`\`html
<pilot-button variant="primary" size="md">Click Me</pilot-button>
\`\`\`
        `,
      },
    },
  },
};

const Template = ({ label, variant, size, disabled, loading }) => html`
  <pilot-button
    variant=${variant}
    size=${size}
    ?disabled=${disabled}
    ?loading=${loading}
  >
    ${label}
  </pilot-button>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  variant: 'secondary',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline Button',
  variant: 'outline',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: 'Ghost Button',
  variant: 'ghost',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Technical = Template.bind({});
Technical.args = {
  label: 'Technical Button',
  variant: 'technical',
  size: 'md',
  disabled: false,
  loading: false,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Button',
  variant: 'secondary',
  size: 'sm',
  disabled: false,
  loading: false,
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Button',
  variant: 'secondary',
  size: 'lg',
  disabled: false,
  loading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  variant: 'primary',
  size: 'md',
  disabled: true,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading...',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: true,
};

export const AllVariants = () => html`
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
    <pilot-button variant="primary">Primary</pilot-button>
    <pilot-button variant="secondary">Secondary</pilot-button>
    <pilot-button variant="outline">Outline</pilot-button>
    <pilot-button variant="ghost">Ghost</pilot-button>
    <pilot-button variant="technical">Technical</pilot-button>
  </div>
`;

export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: flex-start;">
    <pilot-button variant="primary" size="sm">Small</pilot-button>
    <pilot-button variant="primary" size="md">Medium</pilot-button>
    <pilot-button variant="primary" size="lg">Large</pilot-button>
  </div>
`;

export const AllStates = () => html`
  <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start;">
    <div style="display: flex; gap: 1rem;">
      <pilot-button variant="primary">Normal</pilot-button>
      <pilot-button variant="primary" disabled>Disabled</pilot-button>
      <pilot-button variant="primary" loading>Loading</pilot-button>
    </div>
  </div>
`;
