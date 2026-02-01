import { html } from 'lit';

export default {
  title: 'Components/Grid',
  component: 'pilot-grid',
  argTypes: {
    columns: {
      control: 'select',
      options: ['1', '2', '3', '4', '6', '12'],
      description: 'Number of columns in the grid (CSS Grid template columns)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '6', '8'],
      description: 'Gap size between grid cells (in 0.25rem increments)',
      table: {
        defaultValue: { summary: '4' },
      },
    },
    showGrid: {
      control: 'boolean',
      description: 'Display a technical grid overlay for alignment visualization',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Grid

A CSS Grid layout component with optional technical grid overlay for alignment visualization.

### Features
- **CSS Grid Layout**: Uses CSS Grid with minmax() columns for responsive layouts
- **Configurable Columns**: Support for 1, 2, 3, 4, 6, or 12 columns
- **Flexible Gaps**: Configurable gap spacing (0, 1, 2, 3, 4, 6, 8 in 0.25rem units)
- **Grid Overlay**: Optional technical grid overlay to visualize alignment
- **Responsive**: Grid cells automatically adjust to available space
- **Technical Styling**: Uses CSS custom properties with fallbacks for consistent spacing

### Usage

#### Basic Grid
\`\`\`html
<pilot-grid columns="3" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</pilot-grid>
\`\`\`

#### With Grid Overlay
\`\`\`html
<pilot-grid columns="4" gap="2" show-grid>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</pilot-grid>
\`\`\`

#### Nested Grids
\`\`\`html
<pilot-grid columns="2" gap="4">
  <div>
    <pilot-grid columns="3" gap="2">
      <div>Nested 1</div>
      <div>Nested 2</div>
      <div>Nested 3</div>
    </pilot-grid>
  </div>
  <div>Parent Item 2</div>
</pilot-grid>
\`\`\`

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| columns | string | '1' | Number of columns (1, 2, 3, 4, 6, or 12) |
| gap | string | '4' | Gap size (0, 1, 2, 3, 4, 6, or 8) |
| show-grid | boolean | false | Display technical grid overlay |

### Slots

- **default**: The content to be arranged in the grid. Each direct child becomes a grid cell.

### CSS Custom Properties

The component uses these CSS custom properties with fallbacks:
- \`--spacing-1\` through \`--spacing-8\`: For gap sizes
- \`--color-pilot-grid\`: Grid overlay line color (default: #d4d4d4)
- \`--pilot-grid-size\`: Grid overlay cell size (default: 8px)

### Events

The grid component does not emit custom events. It is a presentational layout component.

### Responsive Behavior

Grid columns use \`minmax(0, 1fr)\` which allows cells to:
- Shrink to 0 width if necessary (for responsive layouts)
- Expand equally to fill available space

For true responsive behavior (e.g., 1 column on mobile, 3 on desktop), combine with media queries or use CSS Grid directly on a container element.
        `,
      },
    },
  },
};

const demoCardStyle = `
  background: #f5f5f5;
  border: 1px solid #d4d4d4;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  text-align: center;
`;

const demoCardStyleColored = (color) => `
  background: ${color}20;
  border: 1px solid ${color};
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  text-align: center;
  color: ${color};
`;

const Template = ({ columns, gap, showGrid }) => html`
  <pilot-grid columns=${columns} gap=${gap} ?show-grid=${showGrid}>
    <div style=${demoCardStyle}>Item 1</div>
    <div style=${demoCardStyle}>Item 2</div>
    <div style=${demoCardStyle}>Item 3</div>
    <div style=${demoCardStyle}>Item 4</div>
    <div style=${demoCardStyle}>Item 5</div>
    <div style=${demoCardStyle}>Item 6</div>
  </pilot-grid>
`;

export const Default = Template.bind({});
Default.args = {
  columns: '3',
  gap: '4',
  showGrid: false,
};

export const Columns = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">1 Column</p>
      <pilot-grid columns="1" gap="4">
        <div style=${demoCardStyle}>Full Width</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">2 Columns</p>
      <pilot-grid columns="2" gap="4">
        <div style=${demoCardStyleColored('#16a34a')}>Column 1</div>
        <div style=${demoCardStyleColored('#16a34a')}>Column 2</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">3 Columns</p>
      <pilot-grid columns="3" gap="4">
        <div style=${demoCardStyleColored('#2563eb')}>Column 1</div>
        <div style=${demoCardStyleColored('#2563eb')}>Column 2</div>
        <div style=${demoCardStyleColored('#2563eb')}>Column 3</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">4 Columns</p>
      <pilot-grid columns="4" gap="4">
        <div style=${demoCardStyleColored('#9333ea')}>Col 1</div>
        <div style=${demoCardStyleColored('#9333ea')}>Col 2</div>
        <div style=${demoCardStyleColored('#9333ea')}>Col 3</div>
        <div style=${demoCardStyleColored('#9333ea')}>Col 4</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">6 Columns</p>
      <pilot-grid columns="6" gap="2">
        <div style=${demoCardStyleColored('#dc2626')}>1</div>
        <div style=${demoCardStyleColored('#dc2626')}>2</div>
        <div style=${demoCardStyleColored('#dc2626')}>3</div>
        <div style=${demoCardStyleColored('#dc2626')}>4</div>
        <div style=${demoCardStyleColored('#dc2626')}>5</div>
        <div style=${demoCardStyleColored('#dc2626')}>6</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">12 Columns (Grid System)</p>
      <pilot-grid columns="12" gap="2">
        <div style=${demoCardStyleColored('#f59e0b')}>1</div>
        <div style=${demoCardStyleColored('#f59e0b')}>2</div>
        <div style=${demoCardStyleColored('#f59e0b')}>3</div>
        <div style=${demoCardStyleColored('#f59e0b')}>4</div>
        <div style=${demoCardStyleColored('#f59e0b')}>5</div>
        <div style=${demoCardStyleColored('#f59e0b')}>6</div>
        <div style=${demoCardStyleColored('#f59e0b')}>7</div>
        <div style=${demoCardStyleColored('#f59e0b')}>8</div>
        <div style=${demoCardStyleColored('#f59e0b')}>9</div>
        <div style=${demoCardStyleColored('#f59e0b')}>10</div>
        <div style=${demoCardStyleColored('#f59e0b')}>11</div>
        <div style=${demoCardStyleColored('#f59e0b')}>12</div>
      </pilot-grid>
    </div>
  </div>
`;

export const Gutter = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">No Gap (gap="0")</p>
      <pilot-grid columns="3" gap="0">
        <div style="background: #e5e5e5; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-align: center;">Item 1</div>
        <div style="background: #d4d4d4; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-align: center;">Item 2</div>
        <div style="background: #e5e5e5; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-align: center;">Item 3</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small Gap (gap="1") - 0.25rem</p>
      <pilot-grid columns="3" gap="1">
        <div style=${demoCardStyleColored('#16a34a')}>Item 1</div>
        <div style=${demoCardStyleColored('#16a34a')}>Item 2</div>
        <div style=${demoCardStyleColored('#16a34a')}>Item 3</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default Gap (gap="4") - 1rem</p>
      <pilot-grid columns="3" gap="4">
        <div style=${demoCardStyleColored('#2563eb')}>Item 1</div>
        <div style=${demoCardStyleColored('#2563eb')}>Item 2</div>
        <div style=${demoCardStyleColored('#2563eb')}>Item 3</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large Gap (gap="8") - 2rem</p>
      <pilot-grid columns="3" gap="8">
        <div style=${demoCardStyleColored('#9333ea')}>Item 1</div>
        <div style=${demoCardStyleColored('#9333ea')}>Item 2</div>
        <div style=${demoCardStyleColored('#9333ea')}>Item 3</div>
      </pilot-grid>
    </div>
  </div>
`;

export const ShowGrid = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Without Grid Overlay</p>
      <pilot-grid columns="4" gap="4">
        <div style=${demoCardStyle}>Card 1</div>
        <div style=${demoCardStyle}>Card 2</div>
        <div style=${demoCardStyle}>Card 3</div>
        <div style=${demoCardStyle}>Card 4</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Grid Overlay (show-grid)</p>
      <pilot-grid columns="4" gap="4" show-grid>
        <div style=${demoCardStyle}>Card 1</div>
        <div style=${demoCardStyle}>Card 2</div>
        <div style=${demoCardStyle}>Card 3</div>
        <div style=${demoCardStyle}>Card 4</div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Grid Overlay with 12-Column Layout</p>
      <pilot-grid columns="12" gap="2" show-grid>
        <div style="${demoCardStyle} grid-column: span 4;">Span 4</div>
        <div style="${demoCardStyle} grid-column: span 4;">Span 4</div>
        <div style="${demoCardStyle} grid-column: span 4;">Span 4</div>
        <div style="${demoCardStyle} grid-column: span 6;">Span 6</div>
        <div style="${demoCardStyle} grid-column: span 6;">Span 6</div>
        <div style="${demoCardStyle} grid-column: span 3;">Span 3</div>
        <div style="${demoCardStyle} grid-column: span 3;">Span 3</div>
        <div style="${demoCardStyle} grid-column: span 3;">Span 3</div>
        <div style="${demoCardStyle} grid-column: span 3;">Span 3</div>
      </pilot-grid>
    </div>
  </div>
`;

export const Responsive = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Responsive Cards (Resize Container)</p>
      <pilot-grid columns="4" gap="4">
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          font-family: 'Chakra Petch', sans-serif;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        ">
          <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">📊</span>
          <span style="font-size: 0.875rem;">Analytics</span>
        </div>
        <div style="
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 1.5rem;
          font-family: 'Chakra Petch', sans-serif;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        ">
          <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎨</span>
          <span style="font-size: 0.875rem;">Design</span>
        </div>
        <div style="
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          padding: 1.5rem;
          font-family: 'Chakra Petch', sans-serif;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        ">
          <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚡</span>
          <span style="font-size: 0.875rem;">Performance</span>
        </div>
        <div style="
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          color: #1a1a1a;
          padding: 1.5rem;
          font-family: 'Chakra Petch', sans-serif;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        ">
          <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔒</span>
          <span style="font-size: 0.875rem;">Security</span>
        </div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Auto-Sizing Content</p>
      <pilot-grid columns="3" gap="4">
        <div style="${demoCardStyle} min-height: 100px; display: flex; align-items: center; justify-content: center;">
          Variable height content that automatically fills the cell
        </div>
        <div style="${demoCardStyle} min-height: 150px; display: flex; align-items: center; justify-content: center;">
          Taller content<br>More lines<br>Here
        </div>
        <div style="${demoCardStyle} min-height: 80px; display: flex; align-items: center; justify-content: center;">
          Short
        </div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">12-Column System (Span Classes)</p>
      <pilot-grid columns="12" gap="2">
        <div style="
          background: #1a1a1a;
          color: white;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          grid-column: span 12;
        ">
          Header (12 columns)
        </div>
        <div style="
          background: #f5f5f5;
          border: 1px solid #d4d4d4;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          grid-column: span 3;
          min-height: 200px;
        ">
          Sidebar<br>(3 columns)
        </div>
        <div style="
          background: #f5f5f5;
          border: 1px solid #d4d4d4;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          grid-column: span 9;
          min-height: 200px;
        ">
          Main Content<br>(9 columns)
        </div>
        <div style="
          background: #6b6b6b;
          color: white;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          grid-column: span 12;
        ">
          Footer (12 columns)
        </div>
      </pilot-grid>
    </div>
  </div>
`;

export const Nested = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Nested Grid Inside Grid Cell</p>
      <pilot-grid columns="2" gap="4">
        <div style="${demoCardStyleColored('#2563eb')}">
          <p style="margin: 0 0 1rem 0; font-weight: bold;">Parent Cell 1</p>
          <pilot-grid columns="2" gap="2">
            <div style="background: #3b82f6; color: white; padding: 0.5rem; font-size: 0.625rem;">Nested 1A</div>
            <div style="background: #60a5fa; color: white; padding: 0.5rem; font-size: 0.625rem;">Nested 1B</div>
            <div style="background: #93c5fd; color: #1a1a1a; padding: 0.5rem; font-size: 0.625rem;">Nested 1C</div>
            <div style="background: #bfdbfe; color: #1a1a1a; padding: 0.5rem; font-size: 0.625rem;">Nested 1D</div>
          </pilot-grid>
        </div>
        <div style="${demoCardStyleColored('#16a34a')}">
          <p style="margin: 0 0 1rem 0; font-weight: bold;">Parent Cell 2</p>
          <pilot-grid columns="3" gap="1">
            <div style="background: #22c55e; color: white; padding: 0.5rem; font-size: 0.625rem;">A</div>
            <div style="background: #4ade80; color: #1a1a1a; padding: 0.5rem; font-size: 0.625rem;">B</div>
            <div style="background: #86efac; color: #1a1a1a; padding: 0.5rem; font-size: 0.625rem;">C</div>
          </pilot-grid>
        </div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Complex Nested Layout</p>
      <pilot-grid columns="3" gap="4">
        <div style="${demoCardStyleColored('#dc2626')}">
          <p style="margin: 0 0 0.5rem 0; font-size: 0.625rem; text-transform: uppercase;">Section 1</p>
          <pilot-grid columns="2" gap="2">
            <div style="background: #fca5a5; padding: 0.5rem; font-size: 0.625rem;">Item 1</div>
            <div style="background: #fecaca; padding: 0.5rem; font-size: 0.625rem;">Item 2</div>
          </pilot-grid>
        </div>
        <div style="${demoCardStyleColored('#f59e0b')}">
          <p style="margin: 0 0 0.5rem 0; font-size: 0.625rem; text-transform: uppercase;">Section 2</p>
          <pilot-grid columns="1" gap="2">
            <div style="background: #fcd34d; padding: 0.5rem; font-size: 0.625rem;">Item A</div>
            <div style="background: #fde68a; padding: 0.5rem; font-size: 0.625rem;">Item B</div>
          </pilot-grid>
        </div>
        <div style="${demoCardStyleColored('#9333ea')}">
          <p style="margin: 0 0 0.5rem 0; font-size: 0.625rem; text-transform: uppercase;">Section 3</p>
          <pilot-grid columns="4" gap="1">
            <div style="background: #d8b4fe; padding: 0.5rem; font-size: 0.625rem;">1</div>
            <div style="background: #e9d5ff; padding: 0.5rem; font-size: 0.625rem;">2</div>
            <div style="background: #f3e8ff; padding: 0.5rem; font-size: 0.625rem;">3</div>
            <div style="background: #faf5ff; padding: 0.5rem; font-size: 0.625rem;">4</div>
          </pilot-grid>
        </div>
      </pilot-grid>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Deeply Nested Grid</p>
      <pilot-grid columns="1" gap="4">
        <div style="${demoCardStyle}">
          <p style="margin: 0 0 1rem 0; font-weight: bold;">Level 1 (1 column)</p>
          <pilot-grid columns="2" gap="4">
            <div style="background: #e5e5e5; padding: 1rem;">
              <p style="margin: 0 0 0.5rem 0; font-size: 0.625rem;">Level 2A (2 columns)</p>
              <pilot-grid columns="3" gap="2">
                <div style="background: #d4d4d4; padding: 0.5rem; font-size: 0.625rem;">L3-1</div>
                <div style="background: #c4c4c4; padding: 0.5rem; font-size: 0.625rem;">L3-2</div>
                <div style="background: #b4b4b4; padding: 0.5rem; font-size: 0.625rem;">L3-3</div>
              </pilot-grid>
            </div>
            <div style="background: #e5e5e5; padding: 1rem;">
              <p style="margin: 0 0 0.5rem 0; font-size: 0.625rem;">Level 2B (2 columns)</p>
              <pilot-grid columns="2" gap="2">
                <div style="background: #d4d4d4; padding: 0.5rem; font-size: 0.625rem;">L3-A</div>
                <div style="background: #c4c4c4; padding: 0.5rem; font-size: 0.625rem;">L3-B</div>
              </pilot-grid>
            </div>
          </pilot-grid>
        </div>
      </pilot-grid>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 1rem; color: #1a1a1a; font-weight: bold;">All Column Configurations</p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pilot-grid columns="1" gap="2">
          <div style=${demoCardStyle}>1 Column</div>
        </pilot-grid>

        <pilot-grid columns="2" gap="2">
          <div style=${demoCardStyle}>2 Cols</div>
          <div style=${demoCardStyle}>2 Cols</div>
        </pilot-grid>

        <pilot-grid columns="3" gap="2">
          <div style=${demoCardStyle}>3 Cols</div>
          <div style=${demoCardStyle}>3 Cols</div>
          <div style=${demoCardStyle}>3 Cols</div>
        </pilot-grid>

        <pilot-grid columns="4" gap="2">
          <div style=${demoCardStyle}>4 Cols</div>
          <div style=${demoCardStyle}>4 Cols</div>
          <div style=${demoCardStyle}>4 Cols</div>
          <div style=${demoCardStyle}>4 Cols</div>
        </pilot-grid>

        <pilot-grid columns="6" gap="2">
          <div style=${demoCardStyle}>6</div>
          <div style=${demoCardStyle}>6</div>
          <div style=${demoCardStyle}>6</div>
          <div style=${demoCardStyle}>6</div>
          <div style=${demoCardStyle}>6</div>
          <div style=${demoCardStyle}>6</div>
        </pilot-grid>

        <pilot-grid columns="12" gap="2">
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
          <div style=${demoCardStyle}>12</div>
        </pilot-grid>
      </div>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 1rem; color: #1a1a1a; font-weight: bold;">All Gap Sizes</p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="0"</span>
          <pilot-grid columns="3" gap="0">
            <div style="background: #e5e5e5; padding: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; text-align: center;">A</div>
            <div style="background: #d4d4d4; padding: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; text-align: center;">B</div>
            <div style="background: #e5e5e5; padding: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; text-align: center;">C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="1" (0.25rem)</span>
          <pilot-grid columns="3" gap="1">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="2" (0.5rem)</span>
          <pilot-grid columns="3" gap="2">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="3" (0.75rem)</span>
          <pilot-grid columns="3" gap="3">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="4" (1rem) - Default</span>
          <pilot-grid columns="3" gap="4">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="6" (1.5rem)</span>
          <pilot-grid columns="3" gap="6">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>

        <div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.625rem; color: #6b6b6b; display: block; margin-bottom: 0.25rem;">gap="8" (2rem)</span>
          <pilot-grid columns="3" gap="8">
            <div style=${demoCardStyle}>A</div>
            <div style=${demoCardStyle}>B</div>
            <div style=${demoCardStyle}>C</div>
          </pilot-grid>
        </div>
      </div>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 1rem; color: #1a1a1a; font-weight: bold;">Real-World Layout Examples</p>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Dashboard Cards</p>
          <pilot-grid columns="4" gap="4">
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 1.5rem;
              font-family: 'Inter', sans-serif;
            ">
              <p style="margin: 0; font-size: 0.75rem; color: #6b6b6b; text-transform: uppercase; letter-spacing: 0.05em;">Total Revenue</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; font-family: 'JetBrains Mono', monospace;">$48,250</p>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #16a34a;">+12.5% from last month</p>
            </div>
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 1.5rem;
              font-family: 'Inter', sans-serif;
            ">
              <p style="margin: 0; font-size: 0.75rem; color: #6b6b6b; text-transform: uppercase; letter-spacing: 0.05em;">Active Users</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; font-family: 'JetBrains Mono', monospace;">2,845</p>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #16a34a;">+8.2% from last month</p>
            </div>
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 1.5rem;
              font-family: 'Inter', sans-serif;
            ">
              <p style="margin: 0; font-size: 0.75rem; color: #6b6b6b; text-transform: uppercase; letter-spacing: 0.05em;">Conversion Rate</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; font-family: 'JetBrains Mono', monospace;">3.24%</p>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #dc2626;">-2.1% from last month</p>
            </div>
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 1.5rem;
              font-family: 'Inter', sans-serif;
            ">
              <p style="margin: 0; font-size: 0.75rem; color: #6b6b6b; text-transform: uppercase; letter-spacing: 0.05em;">Avg. Session</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; font-family: 'JetBrains Mono', monospace;">4m 32s</p>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #16a34a;">+15.3% from last month</p>
            </div>
          </pilot-grid>
        </div>

        <div>
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Image Gallery (3 columns)</p>
          <pilot-grid columns="3" gap="4">
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 1
            </div>
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 2
            </div>
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 3
            </div>
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 4
            </div>
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 5
            </div>
            <div style="
              background: #f5f5f5;
              border: 1px solid #d4d4d4;
              aspect-ratio: 16/9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Chakra Petch', sans-serif;
              color: #6b6b6b;
            ">
              Image 6
            </div>
          </pilot-grid>
        </div>

        <div>
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Feature Grid with Icons</p>
          <pilot-grid columns="3" gap="6">
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 2rem;
              text-align: center;
              font-family: 'Inter', sans-serif;
            ">
              <div style="
                width: 48px;
                height: 48px;
                background: #f59e0b;
                margin: 0 auto 1rem auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
              ">⚡</div>
              <h3 style="margin: 0 0 0.5rem 0; font-family: 'Chakra Petch', sans-serif; font-size: 1rem;">Fast Performance</h3>
              <p style="margin: 0; font-size: 0.875rem; color: #6b6b6b; line-height: 1.5;">Optimized for speed and efficiency with minimal overhead.</p>
            </div>
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 2rem;
              text-align: center;
              font-family: 'Inter', sans-serif;
            ">
              <div style="
                width: 48px;
                height: 48px;
                background: #2563eb;
                color: white;
                margin: 0 auto 1rem auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
              ">🔒</div>
              <h3 style="margin: 0 0 0.5rem 0; font-family: 'Chakra Petch', sans-serif; font-size: 1rem;">Secure by Default</h3>
              <p style="margin: 0; font-size: 0.875rem; color: #6b6b6b; line-height: 1.5;">Built-in security features to protect your data.</p>
            </div>
            <div style="
              background: white;
              border: 1px solid #d4d4d4;
              padding: 2rem;
              text-align: center;
              font-family: 'Inter', sans-serif;
            ">
              <div style="
                width: 48px;
                height: 48px;
                background: #16a34a;
                color: white;
                margin: 0 auto 1rem auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
              ">🚀</div>
              <h3 style="margin: 0 0 0.5rem 0; font-family: 'Chakra Petch', sans-serif; font-size: 1rem;">Easy Deployment</h3>
              <p style="margin: 0; font-size: 0.875rem; color: #6b6b6b; line-height: 1.5;">Deploy anywhere with zero configuration required.</p>
            </div>
          </pilot-grid>
        </div>
      </div>
    </div>

    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 1rem; color: #1a1a1a; font-weight: bold;">With Grid Overlay (show-grid)</p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pilot-grid columns="4" gap="4" show-grid>
          <div style=${demoCardStyle}>With</div>
          <div style=${demoCardStyle}>Grid</div>
          <div style=${demoCardStyle}>Overlay</div>
          <div style=${demoCardStyle}>Enabled</div>
        </pilot-grid>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #6b6b6b; margin-top: 0.5rem;">
        The grid overlay displays a technical grid pattern behind the content to help visualize alignment.
      </p>
    </div>
  </div>
`;
