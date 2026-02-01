import { html } from 'lit';

export default {
  title: 'Components/Divider',
  component: 'pilot-divider',
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider (horizontal or vertical)',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'dashed', 'technical'],
      description: 'Visual style of the divider line',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional text label displayed in the center of the divider',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Divider

A section separator component with technical styling for visual content organization.

### Features
- **Orientation**: horizontal or vertical layout
- **Variants**: default (solid), dashed, technical (thicker line)
- **Labels**: Optional centered text label with technical typography
- **Responsive**: Adapts to container dimensions

### Usage
\`\`\`html
<pilot-divider orientation="horizontal" variant="default" label="SECTION A"></pilot-divider>
\`\`\`

### Attributes
- **orientation**: 'horizontal' (default) or 'vertical' - Sets the divider direction
- **variant**: 'default' (solid 1px line), 'dashed' (dashed line), or 'technical' (thicker 1.5px line)
- **label**: Optional text string displayed centered between two divider lines

### Events
The divider component does not emit events.
        `,
      },
    },
  },
};

const Template = ({ orientation, variant, label }) => html`
  <pilot-divider
    orientation=${orientation}
    variant=${variant}
    label=${label}
  ></pilot-divider>
`;

export const Default = Template.bind({});
Default.args = {
  orientation: 'horizontal',
  variant: 'default',
  label: '',
};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
  variant: 'default',
  label: '',
};
Vertical.parameters = {
  docs: {
    description: {
      story: 'A vertical divider that spans the full height of its container.',
    },
  },
};

export const WithText = Template.bind({});
WithText.args = {
  orientation: 'horizontal',
  variant: 'default',
  label: 'SECTION DIVIDER',
};
WithText.parameters = {
  docs: {
    description: {
      story: 'A divider with a centered text label, displayed in technical uppercase typography.',
    },
  },
};

export const WithIcon = () => html`
  <pilot-divider
    orientation="horizontal"
    variant="default"
    label="⚡ FEATURED"
  ></pilot-divider>
`;
WithIcon.parameters = {
  docs: {
    description: {
      story: 'A divider with a label that includes an icon. Icons can be added as part of the label text.',
    },
  },
};

export const Dashed = Template.bind({});
Dashed.args = {
  orientation: 'horizontal',
  variant: 'dashed',
  label: '',
};
Dashed.parameters = {
  docs: {
    description: {
      story: 'A dashed line divider, useful for secondary separations or in forms.',
    },
  },
};

export const Thick = Template.bind({});
Thick.args = {
  orientation: 'horizontal',
  variant: 'technical',
  label: '',
};
Thick.parameters = {
  docs: {
    description: {
      story: 'A technical divider with a thicker 1.5px line weight for emphasis.',
    },
  },
};

export const TechnicalWithLabel = Template.bind({});
TechnicalWithLabel.args = {
  orientation: 'horizontal',
  variant: 'technical',
  label: 'TECHNICAL SECTION',
};
TechnicalWithLabel.parameters = {
  docs: {
    description: {
      story: 'A technical variant divider with a label, combining both visual styles.',
    },
  },
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem; max-width: 600px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default (Solid Line)</p>
      <pilot-divider orientation="horizontal" variant="default"></pilot-divider>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Dashed Line</p>
      <pilot-divider orientation="horizontal" variant="dashed"></pilot-divider>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical (Thicker Line)</p>
      <pilot-divider orientation="horizontal" variant="technical"></pilot-divider>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Label</p>
      <pilot-divider orientation="horizontal" variant="default" label="SECTION TITLE"></pilot-divider>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical with Label</p>
      <pilot-divider orientation="horizontal" variant="technical" label="TECHNICAL HEADER"></pilot-divider>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Label with Icon</p>
      <pilot-divider orientation="horizontal" variant="default" label="🔒 SECURE SECTION"></pilot-divider>
    </div>
    
    <div style="display: flex; gap: 1rem; height: 150px; border: 1px dashed #d4d4d4; padding: 1rem; align-items: stretch;">
      <div style="flex: 1;">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Content area A</p>
      </div>
      <pilot-divider orientation="vertical" variant="default"></pilot-divider>
      <div style="flex: 1;">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Content area B</p>
      </div>
      <pilot-divider orientation="vertical" variant="technical"></pilot-divider>
      <div style="flex: 1;">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Content area C</p>
      </div>
    </div>
    
    <div style="display: flex; gap: 1rem; height: 150px; border: 1px dashed #d4d4d4; padding: 1rem; align-items: stretch;">
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Top</p>
      </div>
      <pilot-divider orientation="vertical" variant="dashed" label="OR"></pilot-divider>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Bottom</p>
      </div>
    </div>
  </div>
`;
AllVariants.parameters = {
  docs: {
    description: {
      story: 'A comprehensive showcase of all divider variants, orientations, and label combinations.',
    },
  },
};
