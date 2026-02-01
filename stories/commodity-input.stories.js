import { html } from 'lit';

export default {
  title: 'Components/Commodity Input',
  component: 'pilot-commodity-input',
  argTypes: {
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'],
      description: 'Currency code (ISO 4217) for automatic symbol detection',
      table: {
        defaultValue: { summary: 'USD' },
      },
    },
    currencySymbol: {
      control: 'text',
      description: 'Custom currency symbol (overrides currency code)',
    },
    decimals: {
      control: 'number',
      description: 'Number of decimal places',
      table: {
        defaultValue: { summary: '2' },
      },
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative values (shows EXPENSE indicator)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        defaultValue: { summary: '0.00' },
      },
    },
    label: {
      control: 'text',
      description: 'Field label',
    },
    hint: {
      control: 'text',
      description: 'Help text below input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Make input read-only',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Commodity Input

A specialized input component for financial amounts with currency formatting and validation.

### Features
- **Currency Support**: Automatic symbol detection from currency codes (USD, EUR, etc.)
- **Custom Symbols**: Override with any currency symbol
- **Decimal Formatting**: Configurable decimal places with thousands separators
- **Validation**: Min/max constraints, negative value control
- **Visual Feedback**: EXPENSE indicator for negative values
- **Accessibility**: Full keyboard navigation and ARIA support

### Usage
\`\`\`html
<pilot-commodity-input 
  currency="USD" 
  value="1234.56"
  label="Amount"
></pilot-commodity-input>
\`\`\`

### Events
- **input**: Fired while typing. Event detail includes:
  - \`value\`: Parsed numeric value
  - \`rawValue\`: Raw input string
- **change**: Fired on blur after editing. Event detail includes:
  - \`value\`: Parsed numeric value
  - \`formattedValue\`: Formatted display string

### Methods
- \`getValue()\`: Get current numeric value
- \`setValue(value)\`: Set value programmatically
- \`validate()\`: Validate current value
- \`clear()\`: Clear input and errors
        `,
      },
    },
  },
};

const Template = ({ currency, currencySymbol, decimals, value, min, max, allowNegative, placeholder, label, hint, error, disabled, readonly }) => html`
  <pilot-commodity-input
    currency=${currency}
    currency-symbol=${currencySymbol}
    decimals=${decimals}
    value=${value}
    min=${min}
    max=${max}
    ?allow-negative=${allowNegative}
    placeholder=${placeholder}
    label=${label}
    hint=${hint}
    error=${error}
    ?disabled=${disabled}
    ?readonly=${readonly}
  ></pilot-commodity-input>
`;

export const Default = Template.bind({});
Default.args = {
  currency: 'USD',
  decimals: 2,
  value: '',
  placeholder: '0.00',
  label: 'Amount',
  hint: 'Enter the transaction amount',
  allowNegative: false,
  disabled: false,
  readonly: false,
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: '1234.56',
  label: 'Payment Amount',
  hint: 'Total payment including tax',
};

export const Euros = Template.bind({});
Euros.args = {
  ...Default.args,
  currency: 'EUR',
  value: '2500.00',
  label: 'Price (EUR)',
};

export const BritishPounds = Template.bind({});
BritishPounds.args = {
  ...Default.args,
  currency: 'GBP',
  value: '1500.50',
  label: 'Amount (GBP)',
};

export const JapaneseYen = Template.bind({});
JapaneseYen.args = {
  ...Default.args,
  currency: 'JPY',
  decimals: 0,
  value: '10000',
  label: 'Amount (JPY)',
  hint: 'Japanese Yen - no decimals',
};

export const CustomSymbol = Template.bind({});
CustomSymbol.args = {
  ...Default.args,
  currencySymbol: 'BTC',
  value: '0.5',
  decimals: 8,
  label: 'Bitcoin Amount',
  hint: 'Using custom currency symbol',
};

export const NoDecimals = Template.bind({});
NoDecimals.args = {
  ...Default.args,
  decimals: 0,
  value: '5000',
  label: 'Quantity',
  hint: 'Whole numbers only',
};

export const NegativeValue = Template.bind({});
NegativeValue.args = {
  ...Default.args,
  allowNegative: true,
  value: '-500.00',
  label: 'Adjustment',
  hint: 'Negative values indicate refunds',
};

export const WithConstraints = Template.bind({});
WithConstraints.args = {
  ...Default.args,
  min: 0,
  max: 10000,
  value: '5000',
  label: 'Budget Allocation',
  hint: 'Enter amount between $0 and $10,000',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  value: '-100',
  error: 'Negative values not allowed',
  label: 'Deposit Amount',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  value: '1000.00',
  disabled: true,
  label: 'Locked Amount',
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  value: '5000.00',
  readonly: true,
  label: 'Confirmed Total',
};

export const Minimal = Template.bind({});
Minimal.args = {
  currency: 'USD',
  decimals: 2,
  value: '',
};

export const AllCurrencies = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">USD - US Dollar</p>
      <pilot-commodity-input currency="USD" value="1234.56" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">EUR - Euro</p>
      <pilot-commodity-input currency="EUR" value="1234.56" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">GBP - British Pound</p>
      <pilot-commodity-input currency="GBP" value="1234.56" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">JPY - Japanese Yen (no decimals)</p>
      <pilot-commodity-input currency="JPY" value="10000" decimals="0" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">CAD - Canadian Dollar</p>
      <pilot-commodity-input currency="CAD" value="1234.56" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">AUD - Australian Dollar</p>
      <pilot-commodity-input currency="AUD" value="1234.56" label="Amount"></pilot-commodity-input>
    </div>
  </div>
`;

export const States = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Normal</p>
      <pilot-commodity-input currency="USD" value="1000.00" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">With Hint</p>
      <pilot-commodity-input currency="USD" value="1000.00" label="Amount" hint="Enter the transaction amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">With Error</p>
      <pilot-commodity-input currency="USD" value="-100" label="Amount" error="Negative values not allowed"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Disabled</p>
      <pilot-commodity-input currency="USD" value="1000.00" label="Amount" disabled></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Read-only</p>
      <pilot-commodity-input currency="USD" value="1000.00" label="Amount" readonly></pilot-commodity-input>
    </div>
  </div>
`;

export const DecimalOptions = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">0 Decimals (Whole Numbers)</p>
      <pilot-commodity-input currency="USD" value="1000" decimals="0" label="Quantity"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">2 Decimals (Standard Currency)</p>
      <pilot-commodity-input currency="USD" value="1000.00" decimals="2" label="Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">4 Decimals (Precise)</p>
      <pilot-commodity-input currency="USD" value="1000.0000" decimals="4" label="Precise Amount"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">8 Decimals (Cryptocurrency)</p>
      <pilot-commodity-input currency-symbol="BTC" value="0.12345678" decimals="8" label="Bitcoin Amount"></pilot-commodity-input>
    </div>
  </div>
`;

export const ValidationExamples = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Min/Max Constraints (0 - 10,000)</p>
      <pilot-commodity-input currency="USD" value="5000" min="0" max="10000" label="Budget" hint="Enter value between $0 and $10,000"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Positive Only (no negative)</p>
      <pilot-commodity-input currency="USD" value="1000" label="Deposit" hint="Only positive values allowed"></pilot-commodity-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem;">Allow Negative (shows EXPENSE)</p>
      <pilot-commodity-input currency="USD" value="-500" allow-negative label="Adjustment" hint="Negative values indicate expenses"></pilot-commodity-input>
    </div>
  </div>
`;
