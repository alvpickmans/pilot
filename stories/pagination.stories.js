import { html } from 'lit';

export default {
  title: 'Components/Pagination',
  component: 'pilot-pagination',
  argTypes: {
    total: {
      control: 'number',
      description: 'Total number of items to paginate',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    page: {
      control: 'number',
      description: 'Current page number (1-based)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    perPage: {
      control: 'select',
      options: [5, 10, 25, 50, 100],
      description: 'Number of items per page',
      table: {
        defaultValue: { summary: '10' },
      },
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum number of page buttons to show',
      table: {
        defaultValue: { summary: '7' },
      },
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first and last navigation buttons',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hidePerPage: {
      control: 'boolean',
      description: 'Hide the items per page selector',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hideInfo: {
      control: 'boolean',
      description: 'Hide the page info text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Use compact mode with smaller buttons',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior (auto-hide elements on small screens)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Pagination

A pagination component for navigating through paginated data with industrial styling.

### Features
- **Navigation**: Previous/Next buttons with optional First/Last buttons
- **Page buttons**: Configurable number of visible page buttons
- **Per-page selector**: Dropdown to change items per page
- **Page info**: Shows current range and total items
- **Responsive**: Auto-adapts to container width
- **Compact mode**: Smaller buttons for dense layouts

### Usage
\`\`\`html
<pilot-pagination total="100" page="1" per-page="10"></pilot-pagination>
\`\`\`

### Events
- **change**: Fired when page or per-page changes. Event detail includes:
  - \`page\`: Current page number
  - \`perPage\`: Items per page
  - \`total\`: Total number of items
  - \`totalPages\`: Total number of pages
  - \`startItem\`: First item on current page
  - \`endItem\`: Last item on current page
        `,
      },
    },
  },
};

const Template = ({ total, page, perPage, maxVisible, showFirstLast, hidePerPage, hideInfo, compact, responsive }) => html`
  <pilot-pagination
    total=${total}
    page=${page}
    per-page=${perPage}
    max-visible=${maxVisible}
    ?show-first-last=${showFirstLast}
    ?hide-per-page=${hidePerPage}
    ?hide-info=${hideInfo}
    ?compact=${compact}
    ?responsive=${responsive}
  ></pilot-pagination>
`;

export const Default = Template.bind({});
Default.args = {
  total: 100,
  page: 1,
  perPage: 10,
  maxVisible: 7,
  showFirstLast: false,
  hidePerPage: false,
  hideInfo: false,
  compact: false,
  responsive: true,
};

export const WithFirstLast = Template.bind({});
WithFirstLast.args = {
  ...Default.args,
  showFirstLast: true,
};

export const Compact = Template.bind({});
Compact.args = {
  ...Default.args,
  compact: true,
};

export const LargeDataset = Template.bind({});
LargeDataset.args = {
  ...Default.args,
  total: 1000,
  page: 50,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  ...Default.args,
  total: 100,
  page: 5,
};

export const LastPage = Template.bind({});
LastPage.args = {
  ...Default.args,
  total: 100,
  page: 10,
};

export const FewPages = Template.bind({});
FewPages.args = {
  ...Default.args,
  total: 25,
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  ...Default.args,
  total: 500,
  page: 25,
  maxVisible: 5,
};

export const WithoutPerPage = Template.bind({});
WithoutPerPage.args = {
  ...Default.args,
  hidePerPage: true,
};

export const WithoutInfo = Template.bind({});
WithoutInfo.args = {
  ...Default.args,
  hideInfo: true,
};

export const Minimal = Template.bind({});
Minimal.args = {
  ...Default.args,
  hidePerPage: true,
  hideInfo: true,
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Default</p>
      <pilot-pagination total="100" page="5"></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">With First/Last Buttons</p>
      <pilot-pagination total="100" page="5" show-first-last></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Compact Mode</p>
      <pilot-pagination total="100" page="5" compact></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Minimal (no per-page, no info)</p>
      <pilot-pagination total="100" page="5" hide-per-page hide-info></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Large Dataset (1000 items)</p>
      <pilot-pagination total="1000" page="50" per-page="10"></pilot-pagination>
    </div>
  </div>
`;

export const PerPageOptions = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">5 per page</p>
      <pilot-pagination total="100" page="1" per-page="5"></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">25 per page</p>
      <pilot-pagination total="100" page="1" per-page="25"></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">50 per page</p>
      <pilot-pagination total="100" page="1" per-page="50"></pilot-pagination>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">100 per page</p>
      <pilot-pagination total="1000" page="1" per-page="100"></pilot-pagination>
    </div>
  </div>
`;

export const ResponsiveDemo = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase;">
      Resize container to see responsive behavior
    </p>
    <div style="resize: horizontal; overflow: auto; border: 1px solid #ccc; padding: 1rem; min-width: 320px;">
      <pilot-pagination total="100" page="5" responsive></pilot-pagination>
    </div>
  </div>
`;
