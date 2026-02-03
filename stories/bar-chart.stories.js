import { html } from 'lit';

export default {
  title: 'Components/BarChart',
  component: 'pilot-bar-chart',
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data objects with label, value, and optional color',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value for scaling bars (auto-calculated if not provided)',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable animated bar fill on load',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showValues: {
      control: 'boolean',
      description: 'Show value labels at the end of each bar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showLegend: {
      control: 'boolean',
      description: 'Display color legend below the chart',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Bar Chart

A horizontal bar chart component for displaying categorical data with technical styling.

### Features
- **Horizontal bars**: Easy to read and compare categories
- **Animations**: Animated bar fills on component load
- **Value formatting**: Automatic k/M suffix for large numbers (1500 → 1.5k)
- **Color coding**: Five semantic colors for data categorization
- **Legend support**: Optional legend for color reference
- **Click events**: Interactive bars with custom events for drill-down
- **Responsive**: Mobile-friendly with adjusted spacing

### Data Format
The data attribute accepts a JSON array of objects:
\`\`\`javascript
[
  { label: 'Category', value: 100, color: 'success' },
  { label: 'Another', value: 50, color: 'primary' }
]
\`\`\`

### Colors
- **primary** (default): Black bars
- **success**: Green bars for positive data
- **warning**: Amber/orange bars for caution
- **error**: Red bars for negative/problem data
- **info**: Gray bars for neutral/informational

### Events
- **bar-click**: Fired when a bar is clicked. Event detail includes:
  - \`item\`: Full data object
  - \`index\`: Position in data array
  - \`value\`: Numeric value
  - \`label\`: Category label

### Usage
\`\`\`html
<pilot-bar-chart 
  data='[{"label": "A", "value": 50}, {"label": "B", "value": 100}]'
  show-values
  animated>
</pilot-bar-chart>
\`\`\`
        `,
      },
    },
  },
};

const sampleData = [
  { label: 'Housing', value: 1200 },
  { label: 'Food', value: 450 },
  { label: 'Transport', value: 300 },
  { label: 'Utilities', value: 200 },
];

const coloredData = [
  { label: 'Income', value: 5000, color: 'success' },
  { label: 'Expenses', value: 2150, color: 'error' },
  { label: 'Savings', value: 2850, color: 'info' },
];

const quarterlyData = [
  { label: 'Q1', value: 85, color: 'success' },
  { label: 'Q2', value: 120, color: 'success' },
  { label: 'Q3', value: 95, color: 'warning' },
  { label: 'Q4', value: 140, color: 'success' },
];

const Template = ({ data, max, animated, showValues, showLegend }) => html`
  <pilot-bar-chart 
    data=${JSON.stringify(data)}
    max=${max}
    ?animated=${animated}
    ?show-values=${showValues}
    ?show-legend=${showLegend}>
  </pilot-bar-chart>
`;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  max: null,
  animated: false,
  showValues: false,
  showLegend: false,
};

export const WithValues = Template.bind({});
WithValues.args = {
  data: sampleData,
  max: null,
  animated: false,
  showValues: true,
  showLegend: false,
};
WithValues.parameters = {
  docs: {
    description: {
      story: 'Bar chart with value labels displayed at the end of each bar. Large numbers are automatically formatted with k/M suffixes.',
    },
  },
};

export const Animated = Template.bind({});
Animated.args = {
  data: sampleData,
  max: null,
  animated: true,
  showValues: true,
  showLegend: false,
};
Animated.parameters = {
  docs: {
    description: {
      story: 'Bars animate from 0 to their target width on component load. Animation duration is 500ms with a 50ms stagger between bars.',
    },
  },
};

export const WithLegend = Template.bind({});
WithLegend.args = {
  data: coloredData,
  max: 5500,
  animated: false,
  showValues: true,
  showLegend: true,
};
WithLegend.parameters = {
  docs: {
    description: {
      story: 'Color legend displays unique colors used in the data. Useful when multiple color variants are present.',
    },
  },
};

export const ColoredBars = Template.bind({});
ColoredBars.args = {
  data: quarterlyData,
  max: 150,
  animated: false,
  showValues: true,
  showLegend: true,
};
ColoredBars.parameters = {
  docs: {
    description: {
      story: 'Different colors can be assigned to each data point using the color property.',
    },
  },
};

export const AllFeatures = Template.bind({});
AllFeatures.args = {
  data: quarterlyData,
  max: 150,
  animated: true,
  showValues: true,
  showLegend: true,
};
AllFeatures.parameters = {
  docs: {
    description: {
      story: 'Complete feature showcase with animation, values, legend, and color coding.',
    },
  },
};

export const CustomMax = Template.bind({});
CustomMax.args = {
  data: [
    { label: 'A', value: 25 },
    { label: 'B', value: 50 },
    { label: 'C', value: 75 },
  ],
  max: 100,
  animated: true,
  showValues: true,
  showLegend: false,
};
CustomMax.parameters = {
  docs: {
    description: {
      story: 'Using max=100 sets the scale to 0-100, making bars appear at 25%, 50%, and 75% width.',
    },
  },
};

export const LargeNumbers = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Thousands (k suffix)</p>
      <pilot-bar-chart 
        data='[{"label": "Small", "value": 800}, {"label": "Medium", "value": 1500}, {"label": "Large", "value": 2500}]'
        show-values>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Millions (M suffix)</p>
      <pilot-bar-chart 
        data='[{"label": "Revenue", "value": 2500000}, {"label": "Expenses", "value": 1800000}, {"label": "Profit", "value": 700000}]'
        max="3000000"
        show-values>
      </pilot-bar-chart>
    </div>
  </div>
`;
LargeNumbers.parameters = {
  docs: {
    description: {
      story: 'Large numbers are automatically formatted: 1500 becomes 1.5k, 2500000 becomes 2.5M.',
    },
  },
};

export const AllColors = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Primary (Default)</p>
      <pilot-bar-chart 
        data='[{"label": "Value", "value": 75}]'
        max="100">
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Success</p>
      <pilot-bar-chart 
        data='[{"label": "Completed", "value": 90, "color": "success"}]'
        max="100">
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Warning</p>
      <pilot-bar-chart 
        data='[{"label": "Pending", "value": 60, "color": "warning"}]'
        max="100">
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Error</p>
      <pilot-bar-chart 
        data='[{"label": "Failed", "value": 40, "color": "error"}]'
        max="100">
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Info</p>
      <pilot-bar-chart 
        data='[{"label": "Info", "value": 70, "color": "info"}]'
        max="100">
      </pilot-bar-chart>
    </div>
  </div>
`;
AllColors.parameters = {
  docs: {
    description: {
      story: 'All five available color variants demonstrated individually.',
    },
  },
};

export const Interactive = () => {
  const handleBarClick = (e) => {
    alert(`Clicked: ${e.detail.label} - Value: ${e.detail.value}`);
  };

  return html`
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Click any bar to trigger event</p>
      <pilot-bar-chart 
        data='[{"label": "Category A", "value": 2500}, {"label": "Category B", "value": 1800}, {"label": "Category C", "value": 3200}]'
        show-values
        @bar-click=${handleBarClick}>
      </pilot-bar-chart>
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Click events provide item data, index, value, and label for drill-down functionality.',
    },
  },
};

export const RealWorldExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Monthly Budget Overview</div>
      <pilot-bar-chart 
        data='[{"label": "Housing", "value": 1200, "color": "error"}, {"label": "Food", "value": 450, "color": "warning"}, {"label": "Transport", "value": 300, "color": "info"}, {"label": "Utilities", "value": 200, "color": "success"}, {"label": "Entertainment", "value": 150, "color": "primary"}]'
        max="1500"
        show-values
        show-legend>
      </pilot-bar-chart>
    </div>
    
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Quarterly Sales Performance</div>
      <pilot-bar-chart 
        data='[{"label": "Q1", "value": 85000, "color": "success"}, {"label": "Q2", "value": 120000, "color": "success"}, {"label": "Q3", "value": 95000, "color": "warning"}, {"label": "Q4", "value": 145000, "color": "success"}]'
        max="160000"
        show-values
        animated
        show-legend>
      </pilot-bar-chart>
    </div>
  </div>
`;
RealWorldExample.parameters = {
  docs: {
    description: {
      story: 'Real-world usage examples showing budget tracking and sales performance visualization.',
    },
  },
};
