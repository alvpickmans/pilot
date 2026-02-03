import { html } from 'lit';

export default {
  title: 'Components/AreaChart',
  component: 'pilot-area-chart',
  argTypes: {
    max: {
      control: 'number',
      description: 'Maximum value for scaling chart (auto-calculated if not provided)',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable animated line draw and area fill on load',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showValues: {
      control: 'boolean',
      description: 'Show value labels on data points',
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Chart orientation - vertical (default) or horizontal',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Area Chart

An area chart component for displaying trends over time with technical styling. Features filled area below the line with optional grid lines and axis labels.

### Features
- **Line chart with filled area**: Visualizes trends and cumulative data
- **Animations**: Animated line draw and area fade on component load
- **Value formatting**: Automatic k/M suffix for large numbers (1500 → 1.5k)
- **Color coding**: Five semantic colors for data categorization
- **Legend support**: Optional legend for color reference
- **Click events**: Interactive data points with custom events for drill-down
- **Tooltips**: Hover over points to see detailed values
- **Responsive**: Mobile-friendly with adjusted spacing
- **Slot-based data**: Use \`pilot-chart-data\` elements for an HTML-native API
- **Grid lines**: Dashed horizontal reference lines for easier reading
- **Axis labels**: X-axis (categories) and Y-axis (values) labels

### Data Format

Use \`pilot-chart-data\` elements as children:

\`\`\`html
<pilot-area-chart show-values>
  <pilot-chart-data label="Jan" value="50" color="primary"></pilot-chart-data>
  <pilot-chart-data label="Feb" value="75" color="primary"></pilot-chart-data>
  <pilot-chart-data label="Mar" value="60" color="primary"></pilot-chart-data>
</pilot-area-chart>
\`\`\`

### Colors
- **primary** (default): Black line and area
- **success**: Green for positive/growth data
- **warning**: Amber/orange for caution
- **error**: Red for negative/problem data
- **info**: Gray for neutral/informational

### Orientation
- **vertical** (default): Line goes left-to-right, values on Y-axis
- **horizontal**: Line goes top-to-bottom, values on X-axis

### Events
- **point-click**: Fired when a data point is clicked. Event detail includes:
  - \`item\`: Full data object
  - \`index\`: Position in data array
  - \`value\`: Numeric value
  - \`label\`: Category label

### Usage
\`\`\`html
<!-- Vertical (default) -->
<pilot-area-chart show-values animated>
  <pilot-chart-data label="Jan" value="50"></pilot-chart-data>
  <pilot-chart-data label="Feb" value="75"></pilot-chart-data>
  <pilot-chart-data label="Mar" value="100"></pilot-chart-data>
</pilot-area-chart>

<!-- Horizontal orientation -->
<pilot-area-chart orientation="horizontal" show-values show-legend>
  <pilot-chart-data label="Q1" value="85" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q2" value="120" color="success"></pilot-chart-data>
  <pilot-chart-data label="Q3" value="95" color="warning"></pilot-chart-data>
  <pilot-chart-data label="Q4" value="140" color="success"></pilot-chart-data>
</pilot-area-chart>
\`\`\`

### Architecture
The area chart uses a composable slot-based architecture:
- **pilot-area-chart**: The container that renders the chart
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

const monthlyData = [
  { label: 'Jan', value: 50 },
  { label: 'Feb', value: 75 },
  { label: 'Mar', value: 60 },
  { label: 'Apr', value: 90 },
  { label: 'May', value: 110 },
  { label: 'Jun', value: 85 },
];

const quarterlyData = [
  { label: 'Q1', value: 1000, color: 'primary' },
  { label: 'Q2', value: 1500, color: 'primary' },
  { label: 'Q3', value: 1200, color: 'primary' },
  { label: 'Q4', value: 1800, color: 'primary' },
];

const coloredTrendData = [
  { label: 'Week 1', value: 3200, color: 'success' },
  { label: 'Week 2', value: 4100, color: 'success' },
  { label: 'Week 3', value: 2800, color: 'warning' },
  { label: 'Week 4', value: 5200, color: 'success' },
  { label: 'Week 5', value: 4600, color: 'success' },
];

const errorTrendData = [
  { label: '00:00', value: 5, color: 'error' },
  { label: '04:00', value: 12, color: 'error' },
  { label: '08:00', value: 8, color: 'error' },
  { label: '12:00', value: 25, color: 'error' },
  { label: '16:00', value: 15, color: 'error' },
  { label: '20:00', value: 7, color: 'error' },
];

const performanceData = [
  { label: 'Server A', value: 95, color: 'success' },
  { label: 'Server B', value: 88, color: 'success' },
  { label: 'Server C', value: 72, color: 'warning' },
  { label: 'Server D', value: 91, color: 'success' },
];

// Template
const SlotTemplate = ({ max, animated, showValues, showLegend, orientation, items }) => html`
  <pilot-area-chart 
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
  </pilot-area-chart>
`;

export const Default = SlotTemplate.bind({});
Default.args = {
  items: monthlyData,
  max: null,
  animated: false,
  showValues: false,
  showLegend: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default area chart using slot-based pilot-chart-data elements. This is the recommended approach.',
    },
  },
};

export const SlotBased = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic Slot Usage</p>
      <pilot-area-chart>
        <pilot-chart-data label="Jan" value="50"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="75"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="60"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="90"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Colors</p>
      <pilot-area-chart show-values>
        <pilot-chart-data label="Jan" value="200" color="success"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="350" color="success"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="280" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="450" color="success"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With All Features</p>
      <pilot-area-chart show-values show-legend animated>
        <pilot-chart-data label="Q1" value="1000" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="1500" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="1200" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="1800" color="primary"></pilot-chart-data>
      </pilot-area-chart>
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
  items: monthlyData,
  max: null,
  animated: false,
  showValues: true,
  showLegend: false,
};
WithValues.parameters = {
  docs: {
    description: {
      story: 'Area chart with value labels displayed above each data point. Large numbers are automatically formatted with k/M suffixes.',
    },
  },
};

export const Animated = SlotTemplate.bind({});
Animated.args = {
  items: monthlyData,
  max: null,
  animated: true,
  showValues: true,
  showLegend: false,
};
Animated.parameters = {
  docs: {
    description: {
      story: 'The area fills with a fade animation and the line draws from left-to-right. Animation duration is 500ms with staggered data points.',
    },
  },
};

export const WithLegend = SlotTemplate.bind({});
WithLegend.args = {
  items: quarterlyData,
  max: 2000,
  animated: false,
  showValues: true,
  showLegend: true,
};
WithLegend.parameters = {
  docs: {
    description: {
      story: 'Color legend displays unique colors used in data. Useful when multiple color variants are present.',
    },
  },
};

export const ColoredTrend = SlotTemplate.bind({});
ColoredTrend.args = {
  items: coloredTrendData,
  max: null,
  animated: true,
  showValues: true,
  showLegend: false,
};
ColoredTrend.parameters = {
  docs: {
    description: {
      story: 'Different colors can be assigned to each data point using the color attribute on pilot-chart-data elements.',
    },
  },
};

export const AllFeatures = SlotTemplate.bind({});
AllFeatures.args = {
  items: coloredTrendData,
  max: null,
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

export const ErrorTrend = () => html`
  <div>
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Error Rate Over Time</p>
    <pilot-area-chart show-values animated>
      <pilot-chart-data label="00:00" value="5" color="error"></pilot-chart-data>
      <pilot-chart-data label="04:00" value="12" color="error"></pilot-chart-data>
      <pilot-chart-data label="08:00" value="8" color="error"></pilot-chart-data>
      <pilot-chart-data label="12:00" value="25" color="error"></pilot-chart-data>
      <pilot-chart-data label="16:00" value="15" color="error"></pilot-chart-data>
      <pilot-chart-data label="20:00" value="7" color="error"></pilot-chart-data>
    </pilot-area-chart>
  </div>
`;
ErrorTrend.parameters = {
  docs: {
    description: {
      story: 'Using error color variant to visualize negative metrics like error rates over time.',
    },
  },
};

export const PerformanceMetrics = () => html`
  <div>
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Server Performance</p>
    <pilot-area-chart show-values show-legend animated>
      <pilot-chart-data label="Server A" value="95" color="success"></pilot-chart-data>
      <pilot-chart-data label="Server B" value="88" color="success"></pilot-chart-data>
      <pilot-chart-data label="Server C" value="72" color="warning"></pilot-chart-data>
      <pilot-chart-data label="Server D" value="91" color="success"></pilot-chart-data>
    </pilot-area-chart>
  </div>
`;
PerformanceMetrics.parameters = {
  docs: {
    description: {
      story: 'Displaying performance metrics with mixed color coding. Warning indicates servers below optimal performance.',
    },
  },
};

export const CustomMax = SlotTemplate.bind({});
CustomMax.args = {
  items: [
    { label: 'Jan', value: 25 },
    { label: 'Feb', value: 50 },
    { label: 'Mar', value: 75 },
    { label: 'Apr', value: 60 },
  ],
  max: 100,
  animated: true,
  showValues: true,
  showLegend: false,
};
CustomMax.parameters = {
  docs: {
    description: {
      story: 'Using max=100 sets the Y-axis scale to 0-100, making values appear at their percentage of the max.',
    },
  },
};

export const LargeNumbers = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Thousands (k suffix)</p>
      <pilot-area-chart show-values animated>
        <pilot-chart-data label="Jan" value="800"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="1500"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="1200"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="2500"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Millions (M suffix)</p>
      <pilot-area-chart show-values animated>
        <pilot-chart-data label="Q1" value="2.5"></pilot-chart-data>
        <pilot-chart-data label="Q2" value="3.2"></pilot-chart-data>
        <pilot-chart-data label="Q3" value="2.8"></pilot-chart-data>
        <pilot-chart-data label="Q4" value="4.1"></pilot-chart-data>
      </pilot-area-chart>
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
      <pilot-area-chart max="100">
        <pilot-chart-data label="A" value="75"></pilot-chart-data>
        <pilot-chart-data label="B" value="50"></pilot-chart-data>
        <pilot-chart-data label="C" value="90"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Success</p>
      <pilot-area-chart max="100" show-values>
        <pilot-chart-data label="Growth" value="85" color="success"></pilot-chart-data>
        <pilot-chart-data label="Stable" value="92" color="success"></pilot-chart-data>
        <pilot-chart-data label="Peak" value="98" color="success"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Warning</p>
      <pilot-area-chart max="100" show-values>
        <pilot-chart-data label="Decline" value="60" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Drop" value="45" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Low" value="30" color="warning"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Error</p>
      <pilot-area-chart max="100" show-values>
        <pilot-chart-data label="Critical" value="90" color="error"></pilot-chart-data>
        <pilot-chart-data label="High" value="75" color="error"></pilot-chart-data>
        <pilot-chart-data label="Medium" value="55" color="error"></pilot-chart-data>
      </pilot-area-chart>
    </div>
  </div>
`;
AllColors.parameters = {
  docs: {
    description: {
      story: 'All available color variants demonstrated individually using slot-based data.',
    },
  },
};

export const Interactive = () => {
  const handlePointClick = (e) => {
    alert(`Clicked: ${e.detail.label} - Value: ${e.detail.value}`);
  };

  return html`
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Click any point to trigger event</p>
      <pilot-area-chart show-values @point-click=${handlePointClick}>
        <pilot-chart-data label="Week 1" value="3200"></pilot-chart-data>
        <pilot-chart-data label="Week 2" value="4100"></pilot-chart-data>
        <pilot-chart-data label="Week 3" value="2800"></pilot-chart-data>
        <pilot-chart-data label="Week 4" value="5200"></pilot-chart-data>
      </pilot-area-chart>
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Click events provide item data, index, value, and label for drill-down functionality. Hover over points to see tooltips.',
    },
  },
};

export const Horizontal = SlotTemplate.bind({});
Horizontal.args = {
  items: performanceData,
  max: 100,
  animated: true,
  showValues: true,
  showLegend: true,
  orientation: 'horizontal',
};
Horizontal.parameters = {
  docs: {
    description: {
      story: 'Horizontal orientation with the line flowing from top to bottom. Labels appear on Y-axis and values on X-axis.',
    },
  },
};

export const OrientationComparison = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical (Default)</p>
      <pilot-area-chart show-values show-legend animated>
        <pilot-chart-data label="Jan" value="50" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="75" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="60" color="primary"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="90" color="primary"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Horizontal</p>
      <pilot-area-chart orientation="horizontal" show-values show-legend animated>
        <pilot-chart-data label="Server A" value="95" color="success"></pilot-chart-data>
        <pilot-chart-data label="Server B" value="88" color="success"></pilot-chart-data>
        <pilot-chart-data label="Server C" value="72" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Server D" value="91" color="success"></pilot-chart-data>
      </pilot-area-chart>
    </div>
  </div>
`;
OrientationComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of vertical (default) and horizontal orientations using different data sets.',
    },
  },
};

export const RealWorldExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Monthly Revenue Trend</div>
      <pilot-area-chart show-values animated>
        <pilot-chart-data label="Jan" value="4200" color="success"></pilot-chart-data>
        <pilot-chart-data label="Feb" value="5100" color="success"></pilot-chart-data>
        <pilot-chart-data label="Mar" value="3800" color="warning"></pilot-chart-data>
        <pilot-chart-data label="Apr" value="6200" color="success"></pilot-chart-data>
        <pilot-chart-data label="May" value="7500" color="success"></pilot-chart-data>
        <pilot-chart-data label="Jun" value="6800" color="success"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Server Health Monitoring</div>
      <pilot-area-chart show-values show-legend animated>
        <pilot-chart-data label="00:00" value="98" color="success"></pilot-chart-data>
        <pilot-chart-data label="04:00" value="96" color="success"></pilot-chart-data>
        <pilot-chart-data label="08:00" value="94" color="success"></pilot-chart-data>
        <pilot-chart-data label="12:00" value="88" color="warning"></pilot-chart-data>
        <pilot-chart-data label="16:00" value="92" color="success"></pilot-chart-data>
        <pilot-chart-data label="20:00" value="97" color="success"></pilot-chart-data>
      </pilot-area-chart>
    </div>

    <div style="background: #f5f5f5; padding: 1.5rem; border: 1px solid #d4d4d4;">
      <div style="font-family: 'Chakra Petch', sans-serif; font-size: 0.875rem; margin-bottom: 1rem; font-weight: 600; text-transform: uppercase;">Error Rate Tracking</div>
      <pilot-area-chart show-values animated>
        <pilot-chart-data label="Mon" value="8" color="error"></pilot-chart-data>
        <pilot-chart-data label="Tue" value="15" color="error"></pilot-chart-data>
        <pilot-chart-data label="Wed" value="12" color="error"></pilot-chart-data>
        <pilot-chart-data label="Thu" value="22" color="error"></pilot-chart-data>
        <pilot-chart-data label="Fri" value="18" color="error"></pilot-chart-data>
      </pilot-area-chart>
    </div>
  </div>
`;
RealWorldExample.parameters = {
  docs: {
    description: {
      story: 'Real-world usage examples showing monthly revenue trends, server health monitoring, and error rate tracking.',
    },
  },
};
