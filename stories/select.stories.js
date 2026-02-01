import { html } from 'lit';

export default {
  title: 'Components/Select',
  component: 'pilot-select',
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value(s). For multiple, use comma-separated values',
      table: {
        defaultValue: { summary: '' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode. Allows selecting multiple options with checkboxes',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter functionality. Shows search input in dropdown',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no option is selected',
      table: {
        defaultValue: { summary: 'Select an option' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select field',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Select

A dropdown component with technical bracket styling for choosing from options.
Supports single/multi-select, search/filter, keyboard navigation, and grouped options.

### Features
- **Single/Multi-select**: Toggle between single and multiple selection modes
- **Searchable**: Filter options with real-time search
- **Keyboard navigation**: Full accessibility with arrow keys, Enter, Escape
- **Grouped options**: Organize options with optgroup elements
- **Virtual scrolling**: Performance optimized for large lists (50+ items)
- **Technical styling**: Bracket notation [ option ] for industrial aesthetic

### Usage
\`\`\`html
<pilot-select>
  <option value="opt1">Option 1</option>
  <option value="opt2">Option 2</option>
</pilot-select>

<pilot-select multiple searchable label="Select items">
  <option value="a">Item A</option>
  <option value="b">Item B</option>
</pilot-select>
\`\`\`

### Events
- **change**: Fired when selection changes
  - \`detail.value\`: Array of selected values (or single value)
  - \`detail.option\`: The option object that triggered the change

### Slots
Use standard HTML \`<option>\` and \`<optgroup>\` elements as children:
\`\`\`html
<pilot-select>
  <option value="1">First Option</option>
  <option value="2" disabled>Disabled Option</option>
  <optgroup label="Group Name">
    <option value="g1">Grouped Option</option>
  </optgroup>
</pilot-select>
\`\`\`
        `,
      },
    },
  },
};

const defaultOptions = html`
  <option value="">Select an option</option>
  <option value="opt1">Option 1</option>
  <option value="opt2">Option 2</option>
  <option value="opt3">Option 3</option>
  <option value="opt4">Option 4</option>
`;

const Template = ({ value, multiple, searchable, placeholder, disabled, label }) => html`
  <pilot-select
    value=${value}
    ?multiple=${multiple}
    ?searchable=${searchable}
    placeholder=${placeholder}
    ?disabled=${disabled}
    label=${label}
  >
    <option value="opt1">Option 1</option>
    <option value="opt2">Option 2</option>
    <option value="opt3">Option 3</option>
    <option value="opt4">Option 4</option>
  </pilot-select>
`;

export const Default = Template.bind({});
Default.args = {
  value: '',
  multiple: false,
  searchable: false,
  placeholder: 'Select an option',
  disabled: false,
  label: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: 'opt2',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...Default.args,
  placeholder: 'Choose your option...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'opt1',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Select an option',
};

export const Searchable = Template.bind({});
Searchable.args = {
  ...Default.args,
  searchable: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...Default.args,
  multiple: true,
  value: 'opt1,opt3',
};

export const MultipleSearchable = Template.bind({});
MultipleSearchable.args = {
  ...Default.args,
  multiple: true,
  searchable: true,
  value: 'opt2,opt4',
};

export const WithOptgroups = () => html`
  <pilot-select label="Select by category">
    <optgroup label="Group A">
      <option value="a1">Option A1</option>
      <option value="a2">Option A2</option>
      <option value="a3">Option A3</option>
    </optgroup>
    <optgroup label="Group B">
      <option value="b1">Option B1</option>
      <option value="b2">Option B2</option>
      <option value="b3">Option B3</option>
    </optgroup>
    <option value="standalone">Standalone Option</option>
  </pilot-select>
`;

export const WithDisabledOptions = () => html`
  <pilot-select label="Some options disabled">
    <option value="1">Enabled Option 1</option>
    <option value="2" disabled>Disabled Option</option>
    <option value="3">Enabled Option 3</option>
    <option value="4">Enabled Option 4</option>
  </pilot-select>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default</p>
      <pilot-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Label</p>
      <pilot-select label="Choose an option">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Searchable</p>
      <pilot-select searchable>
        <option value="1">Apple</option>
        <option value="2">Banana</option>
        <option value="3">Cherry</option>
        <option value="4">Date</option>
        <option value="5">Elderberry</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Multi-select</p>
      <pilot-select multiple value="1,3">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Multi-select + Searchable</p>
      <pilot-select multiple searchable value="2,4">
        <option value="1">Red</option>
        <option value="2">Green</option>
        <option value="3">Blue</option>
        <option value="4">Yellow</option>
        <option value="5">Purple</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Disabled</p>
      <pilot-select disabled value="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </pilot-select>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Groups</p>
      <pilot-select>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
        </optgroup>
      </pilot-select>
    </div>
  </div>
`;

export const LargeList = () => html`
  <div style="max-width: 400px;">
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">60 items (virtual scrolling)</p>
    <pilot-select searchable label="Select a number">
      ${Array.from({ length: 60 }, (_, i) => html`<option value="${i + 1}">Option ${i + 1}</option>`)}
    </pilot-select>
  </div>
`;

export const EventDemo = () => {
  const handleChange = (e) => {
    const detail = e.detail;
    const output = document.getElementById('select-output');
    if (output) {
      output.textContent = JSON.stringify(detail, null, 2);
    }
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pilot-select 
        id="event-select"
        label="Select to trigger change event"
        @change=${handleChange}
      >
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      </pilot-select>
      
      <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem;">
        <p style="font-weight: 600; margin-bottom: 0.5rem;">Event detail:</p>
        <pre id="select-output" style="background: #f5f5f5; padding: 1rem; border: 1px solid #d4d4d4; margin: 0;">Select an option to see event data</pre>
      </div>
    </div>
  `;
};
