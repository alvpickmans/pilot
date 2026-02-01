import { html } from 'lit';

export default {
  title: 'Components/Datepicker',
  component: 'pilot-datepicker',
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Selection mode - single date or date range',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
    value: {
      control: 'text',
      description: 'Selected date(s) - single: YYYY-MM-DD, range: YYYY-MM-DD,YYYY-MM-DD',
      table: {
        defaultValue: { summary: '' },
      },
    },
    min: {
      control: 'text',
      description: 'Minimum selectable date (YYYY-MM-DD)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    max: {
      control: 'text',
      description: 'Maximum selectable date (YYYY-MM-DD)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    format: {
      control: 'text',
      description: 'Date format pattern (e.g., YYYY-MM-DD, DD/MM/YYYY)',
      table: {
        defaultValue: { summary: 'YYYY-MM-DD' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the datepicker',
      table: {
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
      table: {
        defaultValue: { summary: 'Select a date' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the datepicker is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Datepicker

A technical date picker with industrial styling supporting both single date and range selection.

### Features
- **Modes**: Single date selection or date range selection
- **Constraints**: Min/max date restrictions
- **Formatting**: Customizable date format patterns
- **Navigation**: Month/year navigation with keyboard support
- **Accessibility**: Full keyboard navigation (Arrow keys, Enter, Escape, Space)
- **Calendar Grid**: 7-column grid layout with weekday headers
- **Range Display**: Visual range highlighting (start, end, and in-between)
- **Today Indicator**: Highlighted border for current date
- **Clear Function**: Built-in clear button

### Events
- **change**: Dispatched when date selection changes
  - \`detail.value\`: The formatted date string
  - \`detail.startDate\`: Start Date object (null if single mode)
  - \`detail.endDate\`: End Date object (null if single mode or incomplete range)

### Keyboard Navigation
- **Enter/Space**: Open calendar or select focused date
- **Escape**: Close calendar
- **ArrowLeft/ArrowRight**: Navigate days
- **ArrowUp/ArrowDown**: Navigate weeks

### Usage
\`\`\`html
<!-- Single date selection -->
<pilot-datepicker mode="single" label="Select Date"></pilot-datepicker>

<!-- Date range selection -->
<pilot-datepicker mode="range" label="Date Range"></pilot-datepicker>

<!-- With min/max constraints -->
<pilot-datepicker min="2024-01-01" max="2024-12-31"></pilot-datepicker>

<!-- With initial value -->
<pilot-datepicker value="2024-03-15"></pilot-datepicker>

<!-- Range with initial value -->
<pilot-datepicker mode="range" value="2024-03-01,2024-03-15"></pilot-datepicker>
\`\`\`
        `,
      },
    },
  },
};

const Template = ({ mode, value, min, max, format, label, placeholder, disabled }) => html`
  <pilot-datepicker
    mode=${mode}
    value=${value}
    min=${min}
    max=${max}
    format=${format}
    label=${label}
    placeholder=${placeholder}
    ?disabled=${disabled}
  ></pilot-datepicker>
`;

export const Default = Template.bind({});
Default.args = {
  mode: 'single',
  value: '',
  min: '',
  max: '',
  format: 'YYYY-MM-DD',
  label: '',
  placeholder: 'Select a date',
  disabled: false,
};

export const WithValue = Template.bind({});
WithValue.args = {
  mode: 'single',
  value: '2024-06-15',
  min: '',
  max: '',
  format: 'YYYY-MM-DD',
  label: '',
  placeholder: 'Select a date',
  disabled: false,
};
WithValue.storyName = 'With Value';

export const Range = Template.bind({});
Range.args = {
  mode: 'range',
  value: '2024-03-01,2024-03-15',
  min: '',
  max: '',
  format: 'YYYY-MM-DD',
  label: 'Date Range',
  placeholder: 'Select date range',
  disabled: false,
};

export const MinMaxDates = Template.bind({});
MinMaxDates.args = {
  mode: 'single',
  value: '',
  min: '2024-01-01',
  max: '2024-12-31',
  format: 'YYYY-MM-DD',
  label: 'Constrained Date',
  placeholder: 'Select within 2024',
  disabled: false,
};
MinMaxDates.storyName = 'Min/Max Dates';

export const Disabled = Template.bind({});
Disabled.args = {
  mode: 'single',
  value: '2024-06-15',
  min: '',
  max: '',
  format: 'YYYY-MM-DD',
  label: '',
  placeholder: 'Select a date',
  disabled: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  mode: 'single',
  value: '',
  min: '',
  max: '',
  format: 'YYYY-MM-DD',
  label: 'Start Date',
  placeholder: 'Choose a date',
  disabled: false,
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  mode: 'single',
  value: '2024-06-15',
  min: '',
  max: '',
  format: 'DD/MM/YYYY',
  label: 'Custom Format',
  placeholder: 'Select a date',
  disabled: false,
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Single Date Selection</h4>
      <pilot-datepicker mode="single" label="Select Date" placeholder="Choose a date"></pilot-datepicker>
    </div>
    
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Date Range Selection</h4>
      <pilot-datepicker mode="range" label="Date Range" placeholder="Select range"></pilot-datepicker>
    </div>
    
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">With Pre-selected Value</h4>
      <pilot-datepicker mode="single" label="With Value" value="2024-06-15"></pilot-datepicker>
    </div>
    
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">With Min/Max Constraints</h4>
      <pilot-datepicker mode="single" label="Constrained" min="2024-01-01" max="2024-12-31" placeholder="Select in 2024"></pilot-datepicker>
    </div>
    
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Disabled State</h4>
      <pilot-datepicker mode="single" label="Disabled" value="2024-06-15" disabled></pilot-datepicker>
    </div>
    
    <div>
      <h4 style="margin: 0 0 0.5rem 0; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Custom Placeholder</h4>
      <pilot-datepicker mode="single" label="Custom Placeholder" placeholder="Pick your date..."></pilot-datepicker>
    </div>
  </div>
`;