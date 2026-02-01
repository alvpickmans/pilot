import { html } from 'lit';

export default {
  title: 'Components/Measurement',
  component: 'pilot-measurement',
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the measurement lines',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    value: {
      control: 'text',
      description: 'The measurement value displayed between the lines',
      table: {
        defaultValue: { summary: '' },
      },
    },
    unit: {
      control: 'text',
      description: 'Unit suffix displayed after the value (e.g., px, mm, cm)',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Measurement

A technical measurement display component with extending lines, designed for technical specifications and dimension annotations.

### Features
- **Orientation**: Horizontal (default) or vertical measurement lines
- **Value display**: Numeric or text values centered between lines
- **Unit support**: Optional unit suffix with uppercase styling
- **Technical aesthetic**: Uses JetBrains Mono font with subtle color
- **Flexible sizing**: Lines extend to fill available space

### Usage
\`\`\`html
<!-- Basic horizontal measurement with value -->
<pilot-measurement value="120" unit="px"></pilot-measurement>

<!-- Vertical measurement -->
<pilot-measurement orientation="vertical" value="240" unit="mm"></pilot-measurement>

<!-- Just lines without value (decorative) -->
<pilot-measurement></pilot-measurement>
\`\`\`

### Attributes
- **orientation**: 'horizontal' (default) or 'vertical' - direction of the measurement lines
- **value**: The measurement value to display (string, can include decimals)
- **unit**: Unit suffix displayed after the value (e.g., px, mm, cm, in)

### Events
The pilot-measurement component is a static display component and does not dispatch any events.
        `,
      },
    },
  },
};

const Template = ({ orientation, value, unit }) => html`
  <pilot-measurement
    orientation=${orientation}
    value=${value}
    unit=${unit}
  ></pilot-measurement>
`;

export const Default = Template.bind({});
Default.args = {
  orientation: 'horizontal',
  value: '',
  unit: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: '120',
};

export const WithUnit = Template.bind({});
WithUnit.args = {
  ...Default.args,
  value: '240',
  unit: 'px',
};

export const DifferentUnits = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Pixels (px)</p>
      <pilot-measurement value="1920" unit="px"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Millimeters (mm)</p>
      <pilot-measurement value="210" unit="mm"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Centimeters (cm)</p>
      <pilot-measurement value="29.7" unit="cm"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Inches (in)</p>
      <pilot-measurement value="11.7" unit="in"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Percentage (%)</p>
      <pilot-measurement value="100" unit="%"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Points (pt)</p>
      <pilot-measurement value="12" unit="pt"></pilot-measurement>
    </div>
  </div>
`;

export const Precision = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Integer</p>
      <pilot-measurement value="100" unit="px"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">One Decimal</p>
      <pilot-measurement value="99.9" unit="%"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Two Decimals</p>
      <pilot-measurement value="29.97" unit="cm"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">High Precision</p>
      <pilot-measurement value="3.14159" unit="rad"></pilot-measurement>
    </div>
  </div>
`;

export const Compact = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 200px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Compact - Width only</p>
      <pilot-measurement value="120" unit="px"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Compact - Text value</p>
      <pilot-measurement value="S" unit="size"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Compact - No value</p>
      <pilot-measurement></pilot-measurement>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Horizontal - Basic</p>
      <pilot-measurement value="1920" unit="px"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Horizontal - Value only</p>
      <pilot-measurement value="1080"></pilot-measurement>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Horizontal - Lines only</p>
      <pilot-measurement></pilot-measurement>
    </div>
    
    <div style="display: flex; gap: 2rem; align-items: center; height: 100px;">
      <div>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical - Full</p>
        <pilot-measurement orientation="vertical" value="1080" unit="px"></pilot-measurement>
      </div>
      
      <div>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical - Value only</p>
        <pilot-measurement orientation="vertical" value="720"></pilot-measurement>
      </div>
      
      <div>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Vertical - Lines only</p>
        <pilot-measurement orientation="vertical"></pilot-measurement>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Mixed Use Case - Layout Dimensions</p>
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="border: 1px solid #d4d4d4; padding: 1rem; position: relative; width: 300px;">
          <pilot-measurement value="300" unit="px" style="position: absolute; top: -20px; left: 0; right: 0;"></pilot-measurement>
          <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 0.875rem;">Content area</p>
        </div>
        <pilot-measurement orientation="vertical" value="60" unit="px"></pilot-measurement>
      </div>
    </div>
  </div>
`;
