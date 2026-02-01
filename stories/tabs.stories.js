import { html } from 'lit';

export default {
  title: 'Components/Tabs',
  component: 'pilot-tabs',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'technical', 'underline'],
      description: 'Visual style of the tabs',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    activeTab: {
      control: 'number',
      description: 'Index of the currently active tab',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Tabs

A tab navigation component for switching between content sections with industrial styling.

### Features
- **Variants**: default, technical, underline
- **Orientations**: horizontal (top), vertical (side)
- **Keyboard Navigation**: Arrow keys, Home/End for accessibility
- **Overflow Handling**: Horizontal scroll with indicator for many tabs
- **Disabled Tabs**: Skip disabled tabs during navigation
- **Icons**: Optional icon support on tab labels

### Usage
\`\`\`html
<pilot-tabs variant="default" orientation="horizontal" active-tab="0">
  <pilot-tab label="Tab 1">Content for tab 1</pilot-tab>
  <pilot-tab label="Tab 2" icon="⚡">Content for tab 2</pilot-tab>
  <pilot-tab label="Tab 3" disabled>Disabled tab content</pilot-tab>
</pilot-tabs>
\`\`\`

### Child Component: pilot-tab

The \`pilot-tab\` element defines individual tabs with the following attributes:

| Attribute | Type | Description |
|-----------|------|-------------|
| \`label\` | string | **Required.** The text displayed on the tab button |
| \`icon\` | string | Optional icon or emoji displayed before the label |
| \`disabled\` | boolean | When present, disables the tab and skips it in keyboard navigation |

### Slots
- **default (pilot-tab children)**: Each \`pilot-tab\` child provides both the tab label and its associated content panel. The content inside each \`pilot-tab\` is shown when that tab is active.

### Events
- **tab-change**: Fired when the active tab changes
  - \`detail\`: \`{ index: number, tab: { label, icon, disabled, content, index } }\`
  - \`bubbles\`: true

### Keyboard Navigation
- **ArrowRight** (horizontal): Move to next enabled tab
- **ArrowLeft** (horizontal): Move to previous enabled tab
- **ArrowDown** (vertical): Move to next enabled tab
- **ArrowUp** (vertical): Move to previous enabled tab
- **Home**: Jump to first enabled tab
- **End**: Jump to last enabled tab
- Disabled tabs are automatically skipped during keyboard navigation.
        `,
      },
    },
  },
};

const Template = ({ variant, orientation, activeTab }) => html`
  <pilot-tabs
    variant=${variant}
    orientation=${orientation}
    active-tab=${activeTab}
    @tab-change=${(e) => console.log('Tab changed:', e.detail)}
  >
    <pilot-tab label="Overview">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Overview</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          This is the overview tab content. It provides a high-level summary of the section.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Details">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Details</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          This tab contains detailed information with more technical specifications and data.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Settings">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Settings</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Configure options and preferences in this settings panel.
        </p>
      </div>
    </pilot-tab>
  </pilot-tabs>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  orientation: 'horizontal',
  activeTab: 0,
};

export const Vertical = Template.bind({});
Vertical.args = {
  variant: 'default',
  orientation: 'vertical',
  activeTab: 0,
};

export const WithIcons = () => html`
  <pilot-tabs variant="default" orientation="horizontal" active-tab="0">
    <pilot-tab label="Dashboard" icon="📊">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Dashboard</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Welcome to your dashboard. View key metrics and analytics here.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Analytics" icon="📈">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Analytics</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Detailed analytics and reporting data is displayed in this section.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Users" icon="👥">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Users</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Manage user accounts, permissions, and access controls.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Settings" icon="⚙️">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Settings</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Configure system settings and application preferences.
        </p>
      </div>
    </pilot-tab>
  </pilot-tabs>
`;

export const ManyTabs = () => html`
  <div style="max-width: 600px;">
    <pilot-tabs variant="default" orientation="horizontal" active-tab="0">
      <pilot-tab label="General">General settings content</pilot-tab>
      <pilot-tab label="Security">Security configuration panel</pilot-tab>
      <pilot-tab label="Notifications">Notification preferences</pilot-tab>
      <pilot-tab label="Privacy">Privacy and data settings</pilot-tab>
      <pilot-tab label="Integrations">Third-party integrations</pilot-tab>
      <pilot-tab label="Billing">Billing and subscription info</pilot-tab>
      <pilot-tab label="Team">Team member management</pilot-tab>
      <pilot-tab label="API">API keys and documentation</pilot-tab>
      <pilot-tab label="Webhooks">Webhook configuration</pilot-tab>
      <pilot-tab label="Advanced">Advanced system options</pilot-tab>
    </pilot-tabs>
  </div>
`;

export const DisabledTabs = () => html`
  <pilot-tabs variant="default" orientation="horizontal" active-tab="0">
    <pilot-tab label="Active Tab">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Active Tab</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          This tab is fully active and interactive. You can navigate to it normally.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Disabled Tab" disabled>
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Disabled Tab</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          This content is not accessible because the tab is disabled.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Another Active">
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Another Active Tab</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          Use arrow keys to navigate. Notice how the disabled tab is automatically skipped.
        </p>
      </div>
    </pilot-tab>
    <pilot-tab label="Also Disabled" disabled>
      <div style="font-family: 'Inter', sans-serif;">
        <h3 style="margin: 0 0 1rem 0; font-family: 'Chakra Petch', sans-serif;">Also Disabled</h3>
        <p style="margin: 0; line-height: 1.6; color: #525252;">
          This tab is also disabled and will be skipped during keyboard navigation.
        </p>
      </div>
    </pilot-tab>
  </pilot-tabs>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Variant (Horizontal)</p>
      <pilot-tabs variant="default" orientation="horizontal" active-tab="0">
        <pilot-tab label="Tab 1">Default style content for tab 1</pilot-tab>
        <pilot-tab label="Tab 2">Default style content for tab 2</pilot-tab>
        <pilot-tab label="Tab 3">Default style content for tab 3</pilot-tab>
      </pilot-tabs>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Variant (Horizontal)</p>
      <pilot-tabs variant="technical" orientation="horizontal" active-tab="1">
        <pilot-tab label="Tab A">Technical style with border emphasis</pilot-tab>
        <pilot-tab label="Tab B">Active tab with technical borders</pilot-tab>
        <pilot-tab label="Tab C">Technical monospace typography</pilot-tab>
      </pilot-tabs>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Underline Variant (Horizontal)</p>
      <pilot-tabs variant="underline" orientation="horizontal" active-tab="2">
        <pilot-tab label="First">Underline indicator with animation</pilot-tab>
        <pilot-tab label="Second">Smooth scale animation on indicator</pilot-tab>
        <pilot-tab label="Third">Clean minimal underline style</pilot-tab>
      </pilot-tabs>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Variant (Vertical)</p>
      <pilot-tabs variant="default" orientation="vertical" active-tab="0" style="height: 200px;">
        <pilot-tab label="Section 1">Vertical tab layout content</pilot-tab>
        <pilot-tab label="Section 2">Right-side border indicator</pilot-tab>
        <pilot-tab label="Section 3">Fixed width tab list (200px)</pilot-tab>
      </pilot-tabs>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Variant (Vertical)</p>
      <pilot-tabs variant="technical" orientation="vertical" active-tab="1" style="height: 200px;">
        <pilot-tab label="Panel A">Technical vertical styling</pilot-tab>
        <pilot-tab label="Panel B">Border emphasis on active</pilot-tab>
        <pilot-tab label="Panel C">Industrial frame aesthetic</pilot-tab>
      </pilot-tabs>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Underline Variant (Vertical)</p>
      <pilot-tabs variant="underline" orientation="vertical" active-tab="2" style="height: 200px;">
        <pilot-tab label="Item 1">Vertical underline indicator</pilot-tab>
        <pilot-tab label="Item 2">Scale Y animation effect</pilot-tab>
        <pilot-tab label="Item 3">Right-side animated line</pilot-tab>
      </pilot-tabs>
    </div>
  </div>
`;
