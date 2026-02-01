import { html } from 'lit';

export default {
  title: 'Components/Toggle',
  component: 'pilot-toggle',
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is in the on/checked state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    labels: {
      control: 'text',
      description: 'Custom labels for on/off states in format "ON_LABEL|OFF_LABEL" (default: "ON|OFF")',
      table: {
        defaultValue: { summary: 'ON|OFF' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Toggle

A technical switch toggle component for settings with industrial on/off styling.

### Features
- **Toggle states**: Checked/unchecked with smooth animations
- **Custom labels**: Configure on/off text labels (format: "ON|OFF")
- **Keyboard accessible**: Navigate with Tab, toggle with Space or Enter
- **Technical styling**: Industrial design with corner accents and sharp edges
- **Events**: Emits change events with the new checked state

### Usage
\`\`\`html
<!-- Basic toggle with default ON/OFF labels -->
<pilot-toggle></pilot-toggle>

<!-- Toggle with checked state -->
<pilot-toggle checked></pilot-toggle>

<!-- Disabled toggle -->
<pilot-toggle disabled></pilot-toggle>

<!-- Custom labels -->
<pilot-toggle labels="Yes|No"></pilot-toggle>
<pilot-toggle labels="Enabled|Disabled"></pilot-toggle>
<pilot-toggle labels="Active|Inactive"></pilot-toggle>
\`\`\`

### Events

The pilot-toggle component emits the following events:

- **change**: Fired when the toggle state changes (via click or keyboard)
  - Event detail: \`{ checked: boolean }\`
  - Bubbles: true
  
\`\`\`javascript
const toggle = document.querySelector('pilot-toggle');
toggle.addEventListener('change', (event) => {
  console.log('Toggle state:', event.detail.checked);
});
\`\`\`

### Attributes Reference

- \`checked\`: Boolean attribute, sets the toggle to the on state
- \`disabled\`: Boolean attribute, disables interaction
- \`labels\`: String in format "ON_LABEL|OFF_LABEL" (default: "ON|OFF")

### Properties

- \`checked\` (get/set): Boolean representing the toggle state
- \`labels\` (get/set): Object with \`on\` and \`off\` properties
        `,
      },
    },
  },
};

const Template = ({ checked, disabled, labels }) => html`
  <pilot-toggle
    ?checked=${checked}
    ?disabled=${disabled}
    labels=${labels}
  ></pilot-toggle>
`;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  labels: '',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  disabled: false,
  labels: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
  labels: '',
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  checked: true,
  disabled: true,
  labels: '',
};

export const WithLabels = Template.bind({});
WithLabels.args = {
  checked: false,
  disabled: false,
  labels: 'Enabled|Disabled',
};

export const WithCustomLabels = Template.bind({});
WithCustomLabels.args = {
  checked: true,
  disabled: false,
  labels: 'Active|Inactive',
};

export const YesNoLabels = Template.bind({});
YesNoLabels.args = {
  checked: false,
  disabled: false,
  labels: 'Yes|No',
};

export const OnOffLabels = Template.bind({});
OnOffLabels.args = {
  checked: true,
  disabled: false,
  labels: 'ON|OFF',
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default (Unchecked)</p>
      <pilot-toggle></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Checked</p>
      <pilot-toggle checked></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Disabled (Unchecked)</p>
      <pilot-toggle disabled></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Disabled (Checked)</p>
      <pilot-toggle checked disabled></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Custom Labels (Enabled|Disabled)</p>
      <pilot-toggle labels="Enabled|Disabled"></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Custom Labels (Yes|No)</p>
      <pilot-toggle labels="Yes|No" checked></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Custom Labels (Active|Inactive)</p>
      <pilot-toggle labels="Active|Inactive"></pilot-toggle>
    </div>
  </div>
`;

export const AllLabelVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Labels (ON/OFF)</p>
      <pilot-toggle></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Boolean (Yes/No)</p>
      <pilot-toggle labels="Yes|No" checked></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Status (Enabled/Disabled)</p>
      <pilot-toggle labels="Enabled|Disabled"></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">State (Active/Inactive)</p>
      <pilot-toggle labels="Active|Inactive" checked></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Visibility (Show/Hide)</p>
      <pilot-toggle labels="Show|Hide"></pilot-toggle>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Power (Power On/Power Off)</p>
      <pilot-toggle labels="Power On|Power Off" checked></pilot-toggle>
    </div>
  </div>
`;
