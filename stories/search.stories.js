import { html } from 'lit';

export default {
  title: 'Components/Search',
  component: 'pilot-search',
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
      table: {
        defaultValue: { summary: 'Search...' },
      },
    },
    debounce: {
      control: 'number',
      description: 'Debounce delay in milliseconds before dispatching search event',
      table: {
        defaultValue: { summary: '300' },
      },
    },
    minLength: {
      control: 'number',
      description: 'Minimum number of characters required before showing suggestions',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the search input',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator (spinner) instead of clear button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'Current search value (can also be set via attribute)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the search field',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Search

A search input component with autocomplete dropdown for finding transactions and accounts.
Features debounced search, keyboard navigation, and highlighted matches.

### Features
- **Debounced Search**: Configurable delay before dispatching search events
- **Autocomplete Dropdown**: Shows suggestions with highlighted matches
- **Keyboard Navigation**: Full accessibility with arrow keys, Enter, Escape, Home, End
- **Loading State**: Spinner indicator for async operations
- **Clear Button**: One-click clear functionality
- **Min-length Threshold**: Only show suggestions after minimum characters typed
- **Technical Styling**: Bracket notation with industrial aesthetic

### Usage
\`\`\`html
<!-- Basic search -->
<pilot-search placeholder="Search transactions..."></pilot-search>

<!-- With debounce and min-length -->
<pilot-search debounce="500" min-length="3"></pilot-search>

<!-- Disabled state -->
<pilot-search disabled></pilot-search>
\`\`\`

### Events
- **search**: Dispatched after debounce delay when user types
  - \`detail.query\`: The search query string
- **select**: Dispatched when user selects a suggestion
  - \`detail.suggestion\`: The selected suggestion object { label, value, meta? }
- **clear**: Dispatched when the clear button is clicked

### Public Methods
- **setSuggestions(suggestions)**: Set suggestions array to display in dropdown
  - \`suggestions\`: Array of strings or objects { label, value, meta? }
- **setLoading(isLoading)**: Toggle loading state programmatically
  - \`isLoading\`: Boolean to show/hide loading spinner

### Keyboard Navigation
- **ArrowDown**: Open dropdown and highlight first/next item
- **ArrowUp**: Highlight previous item
- **Enter**: Select highlighted item
- **Escape**: Close dropdown
- **Home**: Jump to first suggestion
- **End**: Jump to last suggestion
        `,
      },
    },
  },
};

const Template = ({ placeholder, debounce, minLength, disabled, loading, value, label }) => html`
  <div style="max-width: 400px;">
    ${label ? html`<label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">${label}</label>` : ''}
    <pilot-search
      placeholder=${placeholder}
      debounce=${debounce}
      min-length=${minLength}
      ?disabled=${disabled}
      ?loading=${loading}
      value=${value}
    ></pilot-search>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
  debounce: 300,
  minLength: 1,
  disabled: false,
  loading: false,
  value: '',
  label: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: 'Search term',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'Disabled value',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...Default.args,
  placeholder: 'Search accounts, transactions, or documents...',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Search',
  placeholder: 'Enter search term',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
  value: 'Searching...',
};

export const WithDebounce = Template.bind({});
WithDebounce.args = {
  ...Default.args,
  debounce: 1000,
  label: 'Debounced Search (1s)',
};

export const WithMinLength = Template.bind({});
WithMinLength.args = {
  ...Default.args,
  minLength: 3,
  label: 'Minimum 3 Characters',
};

export const SearchWithSuggestions = () => {
  const handleSearch = (e) => {
    const query = e.detail.query.toLowerCase();
    const search = e.target;
    
    // Simulate async search with mock data
    const mockData = [
      { label: 'Account: Checking', value: 'checking', meta: 'ACC-001' },
      { label: 'Account: Savings', value: 'savings', meta: 'ACC-002' },
      { label: 'Transaction: Grocery Store', value: 'txn-1', meta: '$45.67' },
      { label: 'Transaction: Gas Station', value: 'txn-2', meta: '$32.50' },
      { label: 'Document: Invoice #1234', value: 'doc-1', meta: 'PDF' },
      { label: 'Document: Receipt #5678', value: 'doc-2', meta: 'IMG' },
    ];
    
    const filtered = mockData.filter(item => 
      item.label.toLowerCase().includes(query)
    );
    
    search.setLoading(true);
    setTimeout(() => {
      search.setLoading(false);
      search.setSuggestions(filtered);
    }, 300);
  };

  return html`
    <div style="max-width: 400px;">
      <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Live Search Demo</label>
      <pilot-search
        placeholder="Type to search..."
        debounce="300"
        @search=${handleSearch}
      ></pilot-search>
      <p style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: #6b6b6b; margin-top: 0.5rem;">
        Try typing: "account", "transaction", "document", or "checking"
      </p>
    </div>
  `;
};
SearchWithSuggestions.storyName = 'With Live Suggestions';

export const EventDemo = () => {
  const handleSearch = (e) => {
    const detail = e.detail;
    const output = document.getElementById('search-output');
    if (output) {
      output.textContent = `search: ${JSON.stringify(detail, null, 2)}`;
    }
  };

  const handleSelect = (e) => {
    const detail = e.detail;
    const output = document.getElementById('search-output');
    if (output) {
      output.textContent = `select: ${JSON.stringify(detail, null, 2)}`;
    }
  };

  const handleClear = (e) => {
    const output = document.getElementById('search-output');
    if (output) {
      output.textContent = 'clear: Search cleared';
    }
  };

  const setSuggestions = (e) => {
    const query = e.detail.query.toLowerCase();
    const search = e.target;
    
    const suggestions = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
    ].filter(item => item.label.toLowerCase().includes(query));
    
    search.setSuggestions(suggestions);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <pilot-search 
        id="event-search"
        placeholder="Type to trigger events..."
        @search=${setSuggestions}
        @select=${handleSelect}
        @clear=${handleClear}
      ></pilot-search>
      
      <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem;">
        <p style="font-weight: 600; margin-bottom: 0.5rem;">Event detail:</p>
        <pre id="search-output" style="background: #f5f5f5; padding: 1rem; border: 1px solid #d4d4d4; margin: 0;">Type or select to see event data</pre>
      </div>
    </div>
  `;
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default</p>
      <pilot-search placeholder="Search..."></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Value</p>
      <pilot-search value="Pre-filled search"></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Label</p>
      <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Search Query</label>
      <pilot-search placeholder="Enter search term"></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Custom Placeholder</p>
      <pilot-search placeholder="Search accounts, transactions, or documents..."></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Disabled</p>
      <pilot-search disabled value="Disabled search field"></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Loading State</p>
      <pilot-search loading value="Searching..."></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Long Debounce (1s)</p>
      <pilot-search debounce="1000" placeholder="Waits 1 second..."></pilot-search>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Minimum 3 Characters</p>
      <pilot-search min-length="3" placeholder="Type at least 3 chars..."></pilot-search>
    </div>
  </div>
`;
