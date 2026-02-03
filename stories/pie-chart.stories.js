import { html } from 'lit';

export default {
  title: 'Components/PieChart',
  component: 'pilot-pie-chart',
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Enable animated sector expansion on load',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showValues: {
      control: 'boolean',
      description: 'Show value labels on pie slices',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showLegend: {
      control: 'boolean',
      description: 'Display color legend below chart',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chart size - small (200px), medium (300px), or large (400px)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Pie Chart

A circular chart component for displaying categorical data proportions with technical styling. Uses SVG for crisp rendering at any size.

### Features
- **Circular display**: Intuitive representation of proportions
- **Animations**: Animated sector expansion on component load
- **Value labels**: Optional percentage labels displayed on pie slices (matching legend)
- **Color coding**: Five semantic colors for data categorization
- **Legend support**: Optional legend showing labels and percentages
- **Click events**: Interactive slices with custom events for drill-down
- **Responsive**: Mobile-friendly with adjusted sizing
- **Slot-based data**: Use \`pilot-chart-data\` elements for an HTML-native API
- **Size variants**: Small (200px), medium (300px), and large (400px) options
- **Striped pattern**: Technical diagonal stripes overlay on pie slices for visual consistency with bar chart

### Data Format

Use \`pilot-chart-data\` elements as children:

\`\`\`html
<pilot-pie-chart show-values>
  <pilot-chart-data label="Housing" value="1200" color="error"></pilot-chart-data>
  <pilot-chart-data label="Food" value="450" color="warning"></pilot-chart-data>
  <pilot-chart-data label="Transport" value="300" color="info"></pilot-chart-data>
</pilot-pie-chart>
\`\`\`

### Colors
- **primary** (default): Black sectors
- **success**: Green sectors for positive data
- **warning**: Amber/orange sectors for caution
- **error**: Red sectors for negative/problem data
- **info**: Gray sectors for neutral/informational

### Size Options
- **sm**: Small (200px diameter)
- **md** (default): Medium (300px diameter)
- **lg**: Large (400px diameter)

### Events
- **slice-click**: Fired when a slice is clicked. Event detail includes:
  - \`item\`: Full data object
  - \`index\`: Position in data array
  - \`value\`: Numeric value
  - \`label\`: Category label

### Usage
\`\`\`html
<!-- Basic pie chart -->
<pilot-pie-chart>
  <pilot-chart-data label="A" value="50"></pilot-chart-data>
  <pilot-chart-data label="B" value="100"></pilot-chart-data>
</pilot-pie-chart>

<!-- With all features (shows percentages on slices and in legend) -->
<pilot-pie-chart show-values show-legend animated size="lg">
  <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
  <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
</pilot-pie-chart>
\`\`\`

### Architecture
The pie chart uses a composable slot-based architecture:
- **pilot-pie-chart**: The container that renders the chart
- **pilot-chart-data**: Data point components that hold label, value, and color

This pattern allows for:
- Progressive enhancement
- Better DOM visibility for debugging
- Potential CSS styling of individual data items
- Reusability across different chart types
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
const SlotTemplate = ({ animated, showValues, showLegend, size, items }) => html`
  <pilot-pie-chart 
    ?animated=${animated}
    ?show-values=${showValues}
    ?show-legend=${showLegend}
    size=${size}>
    ${items.map(item => html`
      <pilot-chart-data 
        label=${item.label} 
        value=${item.value}
        color=${item.color || 'primary'}>
      </pilot-chart-data>
    `)}
  </pilot-pie-chart>
`;

export const Default = SlotTemplate.bind({});
Default.args = {
  items: sampleData,
  animated: false,
  showValues: false,
  showLegend: false,
  size: 'md',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default pie chart using slot-based pilot-chart-data elements. This is the recommended approach.',
    },
  },
};

export const SlotBased = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic Slot Usage</p>
      <pilot-pie-chart>
        <pilot-chart-data label="Item A" value="75"></pilot-chart-data>
        <pilot-chart-data label="Item B" value="50"></pilot-chart-data>
        <pilot-chart-data label="Item C" value="100"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Colors</p>
      <pilot-pie-chart show-values>
        <pilot-chart-data label="Success" value="90" color="success"></pilot-chart-data>
        <pilot-chart-data label="Warning" value="60" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Error" value="40" color="error"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With All Features</p>
      <pilot-pie-chart show-values show-legend animated>
        <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
  </div>
`;
SlotBased.parameters = {
  docs: {
    description: {
      story: 'Examples of recommended slot-based approach using pilot-chart-data elements. More readable and maintainable than JSON attributes.',
    },
  },
};

export const WithValues = SlotTemplate.bind({});
WithValues.args = {
  items: sampleData,
  animated: false,
  showValues: true,
  showLegend: false,
  size: 'md',
};
WithValues.parameters = {
  docs: {
    description: {
      story: 'Pie chart with percentage labels displayed on each slice. Percentages match those shown in the legend for consistency.',
    },
  },
};

export const Animated = SlotTemplate.bind({});
Animated.args = {
  items: sampleData,
  animated: true,
  showValues: true,
  showLegend: false,
  size: 'md',
};
Animated.parameters = {
  docs: {
    description: {
      story: 'Slices animate from invisible to visible on component load. Animation duration is 500ms with a 100ms stagger between slices.',
    },
  },
};

export const WithLegend = SlotTemplate.bind({});
WithLegend.args = {
  items: coloredData,
  animated: false,
  showValues: true,
  showLegend: true,
  size: 'md',
};
WithLegend.parameters = {
  docs: {
    description: {
      story: 'Color legend displays all categories with their percentage of total. Useful when multiple color variants are present.',
    },
  },
};

export const ColoredSlices = SlotTemplate.bind({});
ColoredSlices.args = {
  items: quarterlyData,
  animated: false,
  showValues: true,
  showLegend: true,
  size: 'md',
};
ColoredSlices.parameters = {
  docs: {
    description: {
      story: 'Different colors can be assigned to each data point using the color attribute on pilot-chart-data elements.',
    },
  },
};

export const AllFeatures = SlotTemplate.bind({});
AllFeatures.args = {
  items: quarterlyData,
  animated: true,
  showValues: true,
  showLegend: true,
  size: 'md',
};
AllFeatures.parameters = {
  docs: {
    description: {
      story: 'Complete feature showcase with animation, values, legend, and color coding using slot-based data.',
    },
  },
};

export const SmallSize = SlotTemplate.bind({});
SmallSize.args = {
  items: [
    { label: 'A', value: 35, color: 'success' },
    { label: 'B', value: 42, color: 'success' },
    { label: 'C', value: 23, color: 'warning' },
  ],
  animated: false,
  showValues: true,
  showLegend: false,
  size: 'sm',
};
SmallSize.parameters = {
  docs: {
    description: {
      story: 'Small size (200px diameter) for compact displays or dashboard widgets.',
    },
  },
};

export const LargeSize = SlotTemplate.bind({});
LargeSize.args = {
  items: [
    { label: 'A', value: 35, color: 'success' },
    { label: 'B', value: 42, color: 'success' },
    { label: 'C', value: 23, color: 'warning' },
  ],
  animated: false,
  showValues: true,
  showLegend: false,
  size: 'lg',
};
LargeSize.parameters = {
  docs: {
    description: {
      story: 'Large size (400px diameter) for presentations or detailed displays.',
    },
  },
};

export const SizeComparison = () => html`
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; align-items: start;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small (200px)</p>
      <pilot-pie-chart size="sm" show-values>
        <pilot-chart-data label="A" value="35" color="success"></pilot-chart-data>
        <pilot-chart-data label="B" value="42" color="success"></pilot-chart-data>
        <pilot-chart-data label="C" value="23" color="warning"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Medium (300px)</p>
      <pilot-pie-chart size="md" show-values>
        <pilot-chart-data label="A" value="35" color="success"></pilot-chart-data>
        <pilot-chart-data label="B" value="42" color="success"></pilot-chart-data>
        <pilot-chart-data label="C" value="23" color="warning"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large (400px)</p>
      <pilot-pie-chart size="lg" show-values>
        <pilot-chart-data label="A" value="35" color="success"></pilot-chart-data>
        <pilot-chart-data label="B" value="42" color="success"></pilot-chart-data>
        <pilot-chart-data label="C" value="23" color="warning"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
  </div>
`;
SizeComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of all three size variants: small (200px), medium (300px), and large (400px).',
    },
  },
};

export const LargeNumbers = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Thousands (k suffix)</p>
      <pilot-pie-chart show-values show-legend>
        <pilot-chart-data label="Small" value="800"></pilot-chart-data>
        <pilot-chart-data label="Medium" value="1500"></pilot-chart-data>
        <pilot-chart-data label="Large" value="2500"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Millions (M suffix)</p>
      <pilot-pie-chart show-values show-legend>
        <pilot-chart-data label="Revenue" value="2500000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Expenses" value="1800000" color="error"></pilot-chart-data>
        <pilot-chart-data label="Profit" value="700000" color="info"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
  </div>
`;
LargeNumbers.parameters = {
  docs: {
    description: {
      story: 'Pie chart showing percentages regardless of raw value magnitude. Values are displayed as consistent percentages on slices and in legend.',
    },
  },
};

export const AllColors = () => html`
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Primary (Default)</p>
      <pilot-pie-chart size="sm">
        <pilot-chart-data label="Value" value="75"></pilot-chart-data>
        <pilot-chart-data label="Other" value="25"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Success</p>
      <pilot-pie-chart size="sm">
        <pilot-chart-data label="Completed" value="90" color="success"></pilot-chart-data>
        <pilot-chart-data label="Remaining" value="10" color="primary"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Warning</p>
      <pilot-pie-chart size="sm">
        <pilot-chart-data label="Pending" value="60" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Done" value="40" color="primary"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Error</p>
      <pilot-pie-chart size="sm">
        <pilot-chart-data label="Failed" value="40" color="error"></pilot-chart-data>
        <pilot-chart-data label="Passed" value="60" color="primary"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Info</p>
      <pilot-pie-chart size="sm">
        <pilot-chart-data label="Info" value="70" color="info"></pilot-chart-data>
        <pilot-chart-data label="Other" value="30" color="primary"></pilot-chart-data>
      </pilot-pie-chart>
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
  const handleSliceClick = (e) => {
    alert(`Clicked: ${e.detail.label} - Value: ${e.detail.value}`);
  };

  return html`
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Click any slice to trigger event</p>
      <pilot-pie-chart show-values @slice-click=${handleSliceClick}>
        <pilot-chart-data label="Category A" value="2500"></pilot-chart-data>
        <pilot-chart-data label="Category B" value="1800"></pilot-chart-data>
        <pilot-chart-data label="Category C" value="3200"></pilot-chart-data>
      </pilot-pie-chart>
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
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Monthly Budget Distribution</div>
      <pilot-pie-chart show-values show-legend>
        <pilot-chart-data label="Housing" value="1200" color="error"></pilot-chart-data>
        <pilot-chart-data label="Food" value="450" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Transport" value="300" color="info"></pilot-chart-data>
        <pilot-chart-data label="Utilities" value="200" color="success"></pilot-chart-data>
        <pilot-chart-data label="Entertainment" value="150" color="primary"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Revenue Sources</div>
      <pilot-pie-chart show-values show-legend animated>
        <pilot-chart-data label="Product Sales" value="5000000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Services" value="2500000" color="success"></pilot-chart-data>
        <pilot-chart-data label="Licensing" value="1500000" color="info"></pilot-chart-data>
        <pilot-chart-data label="Other" value="500000" color="warning"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
    
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Project Status Overview</div>
      <pilot-pie-chart show-values show-legend size="sm">
        <pilot-chart-data label="Completed" value="42" color="success"></pilot-chart-data>
        <pilot-chart-data label="In Progress" value="28" color="warning"></pilot-chart-data>
        <pilot-chart-data label="On Hold" value="15" color="info"></pilot-chart-data>
        <pilot-chart-data label="Not Started" value="10" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Cancelled" value="5" color="error"></pilot-chart-data>
      </pilot-pie-chart>
    </div>
  </div>
`;
RealWorldExample.parameters = {
  docs: {
    description: {
      story: 'Real-world usage examples showing budget distribution, revenue sources breakdown, and project status overview.',
    },
  },
};
