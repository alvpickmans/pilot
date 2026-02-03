import { html } from 'lit';

export default {
  title: 'Components/BarChart',
  component: 'pilot-bar-chart',
  argTypes: {
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Chart orientation - horizontal (default) or vertical (column chart)',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Bar Chart

A bar chart component for displaying categorical data with technical styling. Supports both horizontal (default) and vertical orientations.

### Features
- **Horizontal bars**: Easy to read and compare categories
- **Vertical bars (Column Chart)**: Alternative orientation with bars growing bottom-to-top
- **Animations**: Animated bar fills on component load
- **Value formatting**: Automatic k/M suffix for large numbers (1500 → 1.5k)
- **Color coding**: Five semantic colors for data categorization
- **Legend support**: Optional legend for color reference
- **Click events**: Interactive bars with custom events for drill-down
- **Responsive**: Mobile-friendly with adjusted spacing
- **Slot-based data**: Use \`pilot-chart-data\` elements for an HTML-native API

### Data Format

Use \`pilot-chart-data\` elements as children:

\`\`\`html
<pilot-bar-chart show-values>
  <pilot-chart-data label="Housing" value="1200" color="error"></pilot-chart-data>
  <pilot-chart-data label="Food" value="450" color="warning"></pilot-chart-data>
  <pilot-chart-data label="Transport" value="300" color="info"></pilot-chart-data>
</pilot-bar-chart>
\`\`\`

### Colors
- **primary** (default): Black bars
- **success**: Green bars for positive data
- **warning**: Amber/orange bars for caution
- **error**: Red bars for negative/problem data
- **info**: Gray bars for neutral/informational

### Orientation
- **horizontal** (default): Bars extend left-to-right, labels on the left
- **vertical**: Bars grow bottom-to-top (column chart style), labels at the bottom, values on top

### Events
- **bar-click**: Fired when a bar is clicked. Event detail includes:
  - \`item\`: Full data object
  - \`index\`: Position in data array
  - \`value\`: Numeric value
  - \`label\`: Category label

### Usage
\`\`\`html
<!-- Horizontal (default) -->
<pilot-bar-chart show-values>
  <pilot-chart-data label="A" value="50"></pilot-chart-data>
  <pilot-chart-data label="B" value="100"></pilot-chart-data>
</pilot-bar-chart>

<!-- Vertical orientation (Column Chart) -->
<pilot-bar-chart orientation="vertical" show-values show-legend>
  <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
  <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
</pilot-bar-chart>
\`\`\`

### Architecture
The bar chart uses a composable slot-based architecture:
- **pilot-bar-chart**: The container that renders the chart
- **pilot-chart-data**: Data point components that hold label, value, and color

This pattern allows for:
- Progressive enhancement
- Better DOM visibility for debugging
- Potential CSS styling of individual data items
- Reusability across different chart types (future pilot-line-chart, pilot-pie-chart)
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

// Template
const SlotTemplate = ({ max, animated, showValues, showLegend, orientation, items }) => html`
  <pilot-bar-chart 
    max=${max}
    ?animated=${animated}
    ?show-values=${showValues}
    ?show-legend=${showLegend}
    orientation=${orientation}>
    ${items.map(item => html`
      <pilot-chart-data 
        label=${item.label} 
        value=${item.value}
        color=${item.color || 'primary'}>
      </pilot-chart-data>
    `)}
  </pilot-bar-chart>
`;

export const Default = SlotTemplate.bind({});
Default.args = {
  items: sampleData,
  max: null,
  animated: false,
  showValues: false,
  showLegend: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default bar chart using slot-based pilot-chart-data elements. This is the recommended approach.',
    },
  },
};

export const SlotBased = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic Slot Usage</p>
      <pilot-bar-chart>
        <pilot-chart-data label="Item A" value="75"></pilot-chart-data>
        <pilot-chart-data label="Item B" value="50"></pilot-chart-data>
        <pilot-chart-data label="Item C" value="100"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Colors</p>
      <pilot-bar-chart show-values>
        <pilot-chart-data label="Success" value="90" color="success"></pilot-chart-data>
        <pilot-chart-data label="Warning" value="60" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Error" value="40" color="error"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With All Features</p>
      <pilot-bar-chart max="150" show-values show-legend animated>
        <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
  </div>
`;
SlotBased.parameters = {
  docs: {
    description: {
      story: 'Examples of the recommended slot-based approach using pilot-chart-data elements. More readable and maintainable than JSON attributes.',
    },
  },
};

export const WithValues = SlotTemplate.bind({});
WithValues.args = {
  items: sampleData,
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

export const Animated = SlotTemplate.bind({});
Animated.args = {
  items: sampleData,
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

export const WithLegend = SlotTemplate.bind({});
WithLegend.args = {
  items: coloredData,
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

export const ColoredBars = SlotTemplate.bind({});
ColoredBars.args = {
  items: quarterlyData,
  max: 150,
  animated: false,
  showValues: true,
  showLegend: true,
};
ColoredBars.parameters = {
  docs: {
    description: {
      story: 'Different colors can be assigned to each data point using the color attribute on pilot-chart-data elements.',
    },
  },
};

export const AllFeatures = SlotTemplate.bind({});
AllFeatures.args = {
  items: quarterlyData,
  max: 150,
  animated: true,
  showValues: true,
  showLegend: true,
};
AllFeatures.parameters = {
  docs: {
    description: {
      story: 'Complete feature showcase with animation, values, legend, and color coding using slot-based data.',
    },
  },
};

export const CustomMax = SlotTemplate.bind({});
CustomMax.args = {
  items: [
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
      <pilot-bar-chart show-values>
        <pilot-chart-data label="Small" value="800"></pilot-chart-data>
        <pilot-chart-data label="Medium" value="1500"></pilot-chart-data>
        <pilot-chart-data label="Large" value="2500"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Millions (M suffix)</p>
      <pilot-bar-chart max="3000000" show-values>
        <pilot-chart-data label="Revenue" value="2500000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Expenses" value="1800000" color="error"></pilot-chart-data>
        <pilot-chart-data label="Profit" value="700000" color="info"></pilot-chart-data>
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
      <pilot-bar-chart max="100">
        <pilot-chart-data label="Value" value="75"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Success</p>
      <pilot-bar-chart max="100">
        <pilot-chart-data label="Completed" value="90" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Warning</p>
      <pilot-bar-chart max="100">
        <pilot-chart-data label="Pending" value="60" color="warning"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Error</p>
      <pilot-bar-chart max="100">
        <pilot-chart-data label="Failed" value="40" color="error"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Info</p>
      <pilot-bar-chart max="100">
        <pilot-chart-data label="Info" value="70" color="info"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
  </div>
`;
AllColors.parameters = {
  docs: {
    description: {
      story: 'All five available color variants demonstrated individually using slot-based data.',
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
      <pilot-bar-chart show-values @bar-click=${handleBarClick}>
        <pilot-chart-data label="Category A" value="2500"></pilot-chart-data>
        <pilot-chart-data label="Category B" value="1800"></pilot-chart-data>
        <pilot-chart-data label="Category C" value="3200"></pilot-chart-data>
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

export const Vertical = SlotTemplate.bind({});
Vertical.args = {
  items: quarterlyData,
  max: 150,
  animated: true,
  showValues: true,
  showLegend: true,
  orientation: 'vertical',
};
Vertical.parameters = {
  docs: {
    description: {
      story: 'Vertical orientation (column chart style) with bars growing from bottom to top. Labels are at the bottom and values appear above the bars.',
    },
  },
};

export const VerticalBasic = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic Vertical</p>
      <pilot-bar-chart orientation="vertical">
        <pilot-chart-data label="A" value="75"></pilot-chart-data>
        <pilot-chart-data label="B" value="50"></pilot-chart-data>
        <pilot-chart-data label="C" value="100"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical with Colors</p>
      <pilot-bar-chart orientation="vertical" show-values>
        <pilot-chart-data label="Success" value="90" color="success"></pilot-chart-data>
        <pilot-chart-data label="Warning" value="60" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Error" value="40" color="error"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical with All Features</p>
      <pilot-bar-chart orientation="vertical" max="150" show-values show-legend animated>
        <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
  </div>
`;
VerticalBasic.parameters = {
  docs: {
    description: {
      story: 'Examples of vertical (column) chart orientation. Bars grow from bottom to top with labels at the bottom.',
    },
  },
};

export const OrientationComparison = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Horizontal (Default)</p>
      <pilot-bar-chart show-values show-legend animated>
        <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical (Column Chart)</p>
      <pilot-bar-chart orientation="vertical" show-values show-legend animated>
        <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
  </div>
`;
OrientationComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of horizontal (default) and vertical orientations using the same data set.',
    },
  },
};

export const RealWorldExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Monthly Budget Overview</div>
      <pilot-bar-chart max="1500" show-values show-legend>
        <pilot-chart-data label="Housing" value="1200" color="error"></pilot-chart-data>
        <pilot-chart-data label="Food" value="450" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Transport" value="300" color="info"></pilot-chart-data>
        <pilot-chart-data label="Utilities" value="200" color="success"></pilot-chart-data>
        <pilot-chart-data label="Entertainment" value="150" color="primary"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Quarterly Sales Performance</div>
      <pilot-bar-chart max="160000" show-values animated show-legend>
        <pilot-chart-data label="Q1" value="85000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95000" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="145000" color="success"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
    
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Annual Sales by Month (Vertical)</div>
      <pilot-bar-chart orientation="vertical" max="50000" show-values animated>
        <pilot-chart-data label="Jan" value="35000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="42000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="38000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="45000" color="success"></pilot-chart-data>
        <pilot-chart-data label="May" value="48000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Jun" value="32000" color="warning"></pilot-chart-data>
      </pilot-bar-chart>
    </div>
  </div>
`;
RealWorldExample.parameters = {
  docs: {
    description: {
      story: 'Real-world usage examples showing budget tracking, quarterly sales (horizontal), and monthly sales trends (vertical).',
    },
  },
};
