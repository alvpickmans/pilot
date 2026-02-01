import { html } from 'lit';

export default {
  title: 'Components/Table',
  component: 'pilot-table',
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    selectable: {
      control: 'select',
      options: ['none', 'single', 'multi'],
      description: 'Row selection mode (none, single, or multi)',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped row styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Enable technical border styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Table

A data table component with sortable columns, row selection, and technical styling.

### Features
- **Sortable columns**: Click headers to sort (ascending/descending)
- **Row selection**: Single or multi-select modes with checkboxes
- **Technical styling**: Industrial borders and uppercase headers
- **Striped rows**: Alternating row colors for better readability
- **Responsive**: Horizontal scroll on small screens
- **Empty state**: Automatic empty state display

### Usage
\`\`\`html
<pilot-table sortable striped>
  <thead>
    <tr>
      <th data-key="name" data-sortable>Name</th>
      <th data-key="value" data-sortable>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Item 1</td><td>100</td></tr>
    <tr><td>Item 2</td><td>200</td></tr>
  </tbody>
</pilot-table>
\`\`\`

### Data Structure
The table reads data from the light DOM:
- \`<thead>\` with \`<th>\` elements (use \`data-key\` for column identification)
- \`<tbody>\` with \`<tr>\` and \`<td>\` elements

### Events
- **sort**: Fired when a column is sorted. Event detail includes:
  - \`column\`: The column key that was sorted
  - \`direction\`: 'asc' or 'desc'
- **selection-change**: Fired when row selection changes. Event detail includes:
  - \`selectedRows\`: Array of selected row indices
  - \`selectedData\`: Array of selected row data objects

### Slots
- **header**: Optional header content displayed above the table
        `,
      },
    },
  },
};

const sampleData = {
  transactions: {
    headers: ['Transaction ID', 'Date', 'Amount', 'Status'],
    keys: ['transaction', 'date', 'amount', 'status'],
    rows: [
      ['TRX-001', '2026-01-15', '$1,250.00', 'Completed'],
      ['TRX-002', '2026-01-16', '$3,400.00', 'Pending'],
      ['TRX-003', '2026-01-17', '$890.50', 'Completed'],
      ['TRX-004', '2026-01-18', '$12,000.00', 'Failed'],
    ],
  },
  accounts: {
    headers: ['Account', 'Type', 'Balance'],
    keys: ['account', 'type', 'balance'],
    rows: [
      ['ACC-1001', 'Checking', '$5,420.00'],
      ['ACC-1002', 'Savings', '$15,000.00'],
      ['ACC-1003', 'Investment', '$125,000.00'],
      ['ACC-1004', 'Credit Card', '-$1,200.00'],
      ['ACC-1005', 'Business', '$45,200.00'],
    ],
  },
  systems: {
    headers: ['System ID', 'Region', 'Status', 'Uptime'],
    keys: ['system', 'region', 'status', 'uptime'],
    rows: [
      ['SYS-01', 'US-East', 'Active', '99.9%'],
      ['SYS-02', 'US-West', 'Active', '99.8%'],
      ['SYS-03', 'EU-Central', 'Maintenance', '0%'],
      ['SYS-04', 'AP-South', 'Active', '99.7%'],
    ],
  },
};

const Template = ({ sortable, selectable, striped, bordered, dataSet = 'transactions' }) => {
  const data = sampleData[dataSet];
  const sortableAttr = sortable ? 'sortable' : '';
  const selectableAttr = selectable !== 'none' ? `selectable="${selectable}"` : '';
  const stripedAttr = striped ? 'striped' : '';
  const borderedAttr = bordered ? 'bordered' : '';
  
  return html`
    <pilot-table 
      ${sortableAttr} 
      ${selectableAttr} 
      ${stripedAttr} 
      ${borderedAttr}
    >
      <thead>
        <tr>
          ${data.headers.map((header, i) => html`
            <th data-key="${data.keys[i]}" ${sortable ? 'data-sortable' : ''}>${header}</th>
          `)}
        </tr>
      </thead>
      <tbody>
        ${data.rows.map(row => html`
          <tr>${row.map(cell => html`<td>${cell}</td>`)}</tr>
        `)}
      </tbody>
    </pilot-table>
  `;
};

export const Default = Template.bind({});
Default.args = {
  sortable: false,
  selectable: 'none',
  striped: false,
  bordered: false,
  dataSet: 'transactions',
};

export const Sortable = Template.bind({});
Sortable.args = {
  sortable: true,
  selectable: 'none',
  striped: false,
  bordered: false,
  dataSet: 'accounts',
};

export const Striped = Template.bind({});
Striped.args = {
  sortable: false,
  selectable: 'none',
  striped: true,
  bordered: false,
  dataSet: 'accounts',
};

export const Bordered = Template.bind({});
Bordered.args = {
  sortable: false,
  selectable: 'none',
  striped: false,
  bordered: true,
  dataSet: 'transactions',
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  sortable: false,
  selectable: 'single',
  striped: false,
  bordered: false,
  dataSet: 'systems',
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  sortable: false,
  selectable: 'multi',
  striped: false,
  bordered: false,
  dataSet: 'systems',
};

export const FullFeatured = Template.bind({});
FullFeatured.args = {
  sortable: true,
  selectable: 'multi',
  striped: true,
  bordered: true,
  dataSet: 'systems',
};

export const EmptyState = () => html`
  <pilot-table>
    <thead>
      <tr>
        <th data-key="id">ID</th>
        <th data-key="name">Name</th>
        <th data-key="status">Status</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </pilot-table>
`;

export const WithHeaderSlot = () => html`
  <pilot-table sortable striped>
    <div slot="header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; font-weight: 600;">
        Transaction History
      </span>
      <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; text-transform: uppercase;">
        Export CSV
      </button>
    </div>
    <thead>
      <tr>
        <th data-key="transaction" data-sortable>Transaction ID</th>
        <th data-key="date" data-sortable>Date</th>
        <th data-key="amount" data-sortable>Amount</th>
        <th data-key="status" data-sortable>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>TRX-001</td><td>2026-01-15</td><td>$1,250.00</td><td>Completed</td></tr>
      <tr><td>TRX-002</td><td>2026-01-16</td><td>$3,400.00</td><td>Pending</td></tr>
      <tr><td>TRX-003</td><td>2026-01-17</td><td>$890.50</td><td>Completed</td></tr>
      <tr><td>TRX-004</td><td>2026-01-18</td><td>$12,000.00</td><td>Failed</td></tr>
      <tr><td>TRX-005</td><td>2026-01-19</td><td>$2,500.00</td><td>Completed</td></tr>
    </tbody>
  </pilot-table>
`;

export const FinancialData = () => html`
  <pilot-table sortable striped selectable="multi" bordered>
    <div slot="header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; font-weight: 600;">
        Account Summary
      </span>
      <div style="display: flex; gap: 0.5rem;">
        <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #d4d4d4; background: white; cursor: pointer;">
          Filter
        </button>
        <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;">
          Export
        </button>
      </div>
    </div>
    <thead>
      <tr>
        <th data-key="account" data-sortable>Account Number</th>
        <th data-key="type" data-sortable>Type</th>
        <th data-key="holder" data-sortable>Holder</th>
        <th data-key="balance" data-sortable>Balance</th>
        <th data-key="status" data-sortable>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>****4521</td><td>Checking</td><td>John Doe</td><td>$5,420.00</td><td>Active</td></tr>
      <tr><td>****7892</td><td>Savings</td><td>John Doe</td><td>$15,000.00</td><td>Active</td></tr>
      <tr><td>****1234</td><td>Investment</td><td>Jane Smith</td><td>$125,000.00</td><td>Active</td></tr>
      <tr><td>****5678</td><td>Credit Card</td><td>John Doe</td><td>-$1,200.00</td><td>Active</td></tr>
      <tr><td>****9012</td><td>Business</td><td>Acme Corp</td><td>$45,200.00</td><td>Active</td></tr>
      <tr><td>****3456</td><td>Savings</td><td>Jane Smith</td><td>$8,750.00</td><td>Active</td></tr>
    </tbody>
  </pilot-table>
`;

export const SystemLogs = () => html`
  <pilot-table selectable="single" bordered>
    <div slot="header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; font-weight: 600;">
        System Logs
      </span>
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b6b6b;">
        1,240 entries
      </span>
    </div>
    <thead>
      <tr>
        <th data-key="timestamp">Timestamp</th>
        <th data-key="level">Level</th>
        <th data-key="service">Service</th>
        <th data-key="message">Message</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>2026-01-20 14:32:01</td><td style="color: #16a34a;">INFO</td><td>core</td><td>System initialized successfully</td></tr>
      <tr><td>2026-01-20 14:32:05</td><td style="color: #6b6b6b;">DEBUG</td><td>database</td><td>Database connection established</td></tr>
      <tr><td>2026-01-20 14:33:12</td><td style="color: #f59e0b;">WARN</td><td>memory</td><td>High memory usage detected: 85%</td></tr>
      <tr><td>2026-01-20 14:35:00</td><td style="color: #dc2626;">ERROR</td><td>network</td><td>Connection timeout on port 8080</td></tr>
      <tr><td>2026-01-20 14:35:45</td><td style="color: #16a34a;">INFO</td><td>api</td><td>API request processed: 200ms</td></tr>
      <tr><td>2026-01-20 14:36:10</td><td style="color: #6b6b6b;">DEBUG</td><td>cache</td><td>Cache invalidated: user_session</td></tr>
    </tbody>
  </pilot-table>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default (Basic Table)</p>
      <pilot-table>
        <thead>
          <tr>
            <th data-key="id">ID</th>
            <th data-key="name">Name</th>
            <th data-key="value">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>001</td><td>Alpha</td><td>100</td></tr>
          <tr><td>002</td><td>Beta</td><td>200</td></tr>
          <tr><td>003</td><td>Gamma</td><td>300</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Sortable Columns</p>
      <pilot-table sortable>
        <thead>
          <tr>
            <th data-key="name" data-sortable>Name</th>
            <th data-key="category" data-sortable>Category</th>
            <th data-key="amount" data-sortable>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Charlie</td><td>Group A</td><td>300</td></tr>
          <tr><td>Alpha</td><td>Group B</td><td>100</td></tr>
          <tr><td>Bravo</td><td>Group A</td><td>200</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Striped Rows</p>
      <pilot-table striped>
        <thead>
          <tr>
            <th data-key="item">Item</th>
            <th data-key="qty">Quantity</th>
            <th data-key="price">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Widget A</td><td>10</td><td>$25.00</td></tr>
          <tr><td>Widget B</td><td>5</td><td>$50.00</td></tr>
          <tr><td>Widget C</td><td>20</td><td>$12.50</td></tr>
          <tr><td>Widget D</td><td>8</td><td>$75.00</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Bordered (Technical Style)</p>
      <pilot-table bordered>
        <thead>
          <tr>
            <th data-key="system">System</th>
            <th data-key="status">Status</th>
            <th data-key="uptime">Uptime</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Server-01</td><td>Online</td><td>99.9%</td></tr>
          <tr><td>Server-02</td><td>Online</td><td>99.8%</td></tr>
          <tr><td>Server-03</td><td>Offline</td><td>0%</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Multi-Selectable</p>
      <pilot-table selectable="multi" striped bordered>
        <thead>
          <tr>
            <th data-key="task">Task</th>
            <th data-key="priority">Priority</th>
            <th data-key="due">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Update documentation</td><td>Medium</td><td>2026-02-01</td></tr>
          <tr><td>Fix critical bug</td><td>High</td><td>2026-01-25</td></tr>
          <tr><td>Code review</td><td>Low</td><td>2026-02-10</td></tr>
          <tr><td>Deploy to production</td><td>High</td><td>2026-01-22</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Full-Featured (Sortable + Multi-Select + Striped + Bordered)</p>
      <pilot-table sortable selectable="multi" striped bordered>
        <thead>
          <tr>
            <th data-key="id" data-sortable>ID</th>
            <th data-key="product" data-sortable>Product</th>
            <th data-key="category" data-sortable>Category</th>
            <th data-key="price" data-sortable>Price</th>
            <th data-key="stock" data-sortable>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>PRD-001</td><td>Laptop Pro</td><td>Electronics</td><td>$1,299.00</td><td>45</td></tr>
          <tr><td>PRD-002</td><td>Wireless Mouse</td><td>Accessories</td><td>$29.99</td><td>120</td></tr>
          <tr><td>PRD-003</td><td>USB-C Hub</td><td>Accessories</td><td>$79.99</td><td>85</td></tr>
          <tr><td>PRD-004</td><td>Monitor 4K</td><td>Electronics</td><td>$499.00</td><td>23</td></tr>
          <tr><td>PRD-005</td><td>Mechanical Keyboard</td><td>Accessories</td><td>$149.99</td><td>67</td></tr>
          <tr><td>PRD-006</td><td>Webcam HD</td><td>Electronics</td><td>$89.99</td><td>94</td></tr>
        </tbody>
      </pilot-table>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Empty State</p>
      <pilot-table>
        <thead>
          <tr>
            <th data-key="id">ID</th>
            <th data-key="name">Name</th>
            <th data-key="status">Status</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </pilot-table>
    </div>
  </div>
`;
