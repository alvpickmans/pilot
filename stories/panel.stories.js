import { html } from 'lit';

export default {
  title: 'Components/Panel',
  component: 'pilot-panel',
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title displayed in the header',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the panel can be collapsed/expanded',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the panel is initially collapsed (requires collapsible)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Panel

A collapsible panel component with technical styling and corner bracket decorations.

### Features
- **Collapsible**: Toggle content visibility with expand/collapse button
- **Technical Styling**: Corner bracket markers and technical font styling
- **Title Header**: Optional title displayed in technical header bar
- **Smooth Transitions**: Animated collapse/expand with CSS transitions

### Usage
\`\`\`html
<pilot-panel title="Panel Title" collapsible>
  <p>Panel content goes here</p>
</pilot-panel>
\`\`\`

### Attributes
- **title**: Panel title text (appears in header)
- **collapsible**: Enables expand/collapse functionality
- **collapsed**: Initial collapsed state (works with collapsible)

### Slots
- **default**: Main content area displayed in the panel body

### Events
The panel component does not emit custom events, but the collapsible toggle button toggles the collapsed attribute internally.

### Styling Notes
- Uses technical 1.5px border style
- Corner bracket markers on top-left and top-right
- Title is displayed in JetBrains Mono font (uppercase, letter-spaced)
- Content padding is 1rem (16px)
- Header has technical background (#f5f5f5)
        `,
      },
    },
  },
};

const Template = ({ title, collapsible, collapsed }) => html`
  <pilot-panel
    title=${title}
    ?collapsible=${collapsible}
    ?collapsed=${collapsed}
  >
    <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
      This is the panel content area. You can place any content here, including text, images, or other components.
    </p>
  </pilot-panel>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'Panel Title',
  collapsible: false,
  collapsed: false,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  title: 'Collapsible Panel',
  collapsible: true,
  collapsed: true,
};

export const CollapsibleExpanded = Template.bind({});
CollapsibleExpanded.args = {
  title: 'Collapsible Panel',
  collapsible: true,
  collapsed: false,
};

export const Compact = () => html`
  <pilot-panel title="Compact Panel">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <div style="width: 32px; height: 32px; background: #f59e0b; display: flex; align-items: center; justify-content: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem;">⚡</span>
      </div>
      <div>
        <p style="margin: 0; font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; font-weight: 600;">System Alert</p>
        <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #6b6b6b;">All systems operational</p>
      </div>
    </div>
  </pilot-panel>
`;

export const Technical = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <pilot-panel title="System Configuration" collapsible>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
        <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid #e5e5e5;">
          <span>CPU Usage</span>
          <span style="color: #16a34a;">45%</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid #e5e5e5;">
          <span>Memory</span>
          <span style="color: #16a34a;">2.4GB / 8GB</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid #e5e5e5;">
          <span>Disk I/O</span>
          <span style="color: #f59e0b;">12MB/s</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
          <span>Network</span>
          <span style="color: #16a34a;">Connected</span>
        </div>
      </div>
    </pilot-panel>
    
    <pilot-panel title="API Endpoints" collapsible collapsed>
      <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem;">
        <div style="padding: 0.25rem 0; color: #6b6b6b;">
          <p style="margin: 0;">GET /api/v1/status</p>
          <p style="margin: 0.25rem 0 0 1rem; color: #9b9b9b;">Returns system status</p>
        </div>
        <div style="padding: 0.25rem 0; color: #6b6b6b;">
          <p style="margin: 0;">POST /api/v1/data</p>
          <p style="margin: 0.25rem 0 0 1rem; color: #9b9b9b;">Submit data payload</p>
        </div>
      </div>
    </pilot-panel>
  </div>
`;

export const WithActions = () => html`
  <pilot-panel title="Actions Panel" collapsible>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.5;">
        This panel demonstrates how you can include interactive content. The actions below are styled buttons placed inside the panel content.
      </p>
      <div style="display: flex; gap: 0.5rem;">
        <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em;">
          Save
        </button>
        <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #d4d4d4; background: white; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em;">
          Cancel
        </button>
        <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: none; background: transparent; color: #6b6b6b; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em;">
          Reset
        </button>
      </div>
    </div>
  </pilot-panel>
`;

export const WithContent = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <pilot-panel title="Text Content">
      <p style="margin: 0 0 0.5rem 0; font-family: 'Inter', sans-serif; line-height: 1.6;">
        Panels are versatile containers that can hold any type of content. This example shows text content with proper typography.
      </p>
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.6; color: #6b6b6b;">
        You can include multiple paragraphs, lists, or any other HTML elements within a panel.
      </p>
    </pilot-panel>
    
    <pilot-panel title="Form Elements" collapsible>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <label style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b;">Input Field</label>
          <input type="text" placeholder="Enter value..." style="font-family: 'Inter', sans-serif; padding: 0.5rem; border: 1px solid #d4d4d4; font-size: 0.875rem;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <label style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b;">Select Option</label>
          <select style="font-family: 'Inter', sans-serif; padding: 0.5rem; border: 1px solid #d4d4d4; font-size: 0.875rem; background: white;">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>
    </pilot-panel>
    
    <pilot-panel title="Data Table" collapsible collapsed>
      <table style="width: 100%; font-family: 'Inter', sans-serif; font-size: 0.875rem; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #d4d4d4;">
            <th style="text-align: left; padding: 0.5rem; font-weight: 600;">Name</th>
            <th style="text-align: left; padding: 0.5rem; font-weight: 600;">Status</th>
            <th style="text-align: right; padding: 0.5rem; font-weight: 600;">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 0.5rem;">Item A</td>
            <td style="padding: 0.5rem; color: #16a34a;">Active</td>
            <td style="padding: 0.5rem; text-align: right; font-family: 'JetBrains Mono', monospace;">1,234</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 0.5rem;">Item B</td>
            <td style="padding: 0.5rem; color: #6b6b6b;">Pending</td>
            <td style="padding: 0.5rem; text-align: right; font-family: 'JetBrains Mono', monospace;">567</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;">Item C</td>
            <td style="padding: 0.5rem; color: #dc2626;">Error</td>
            <td style="padding: 0.5rem; text-align: right; font-family: 'JetBrains Mono', monospace;">0</td>
          </tr>
        </tbody>
      </table>
    </pilot-panel>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Static Panel (No Collapse)</p>
      <pilot-panel title="Static Panel">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">This panel has a fixed title and always shows content. No collapse button is displayed.</p>
      </pilot-panel>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Collapsible Expanded</p>
      <pilot-panel title="Collapsible Panel" collapsible>
        <p style="margin: 0; font-family: 'Inter', sans-serif;">This panel can be collapsed. Click the minus button in the header to collapse it.</p>
      </pilot-panel>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Collapsible Collapsed</p>
      <pilot-panel title="Collapsed Panel" collapsible collapsed>
        <p style="margin: 0; font-family: 'Inter', sans-serif;">This content is hidden by default. Click the plus button to expand.</p>
      </pilot-panel>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Without Title</p>
      <pilot-panel>
        <p style="margin: 0; font-family: 'Inter', sans-serif;">This panel has no title attribute, so no header is displayed. Just pure content with technical borders.</p>
      </pilot-panel>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Styling Detail</p>
      <pilot-panel title="Corner Markers Demo">
        <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.6;">
          Notice the corner bracket markers in the top-left and top-right corners. These are created with CSS pseudo-elements and give the panel its distinctive technical/mechanical appearance.
        </p>
      </pilot-panel>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Nested Panels</p>
      <pilot-panel title="Parent Panel" collapsible>
        <p style="margin: 0 0 1rem 0; font-family: 'Inter', sans-serif;">Panels can be nested inside each other for complex layouts.</p>
        <pilot-panel title="Nested Panel" collapsible collapsed>
          <p style="margin: 0; font-family: 'Inter', sans-serif;">This is a nested panel with its own collapse state.</p>
        </pilot-panel>
      </pilot-panel>
    </div>
  </div>
`;
