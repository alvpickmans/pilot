import { html } from 'lit';

export default {
  title: 'Components/Input',
  component: 'pilot-input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type attribute',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    value: {
      control: 'text',
      description: 'Current input value',
      table: {
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
      table: {
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input field',
      table: {
        defaultValue: { summary: '' },
      },
    },
    hint: {
      control: 'text',
      description: 'Hint text displayed below the input field (shown only when no error)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input field',
      table: {
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input field',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Make the input field read-only',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    technical: {
      control: 'boolean',
      description: 'Enable technical bracket styling [ input ]',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark the input as required (sets native required attribute)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Input

A technical input field with machine-readable styling and form field support.

### Features
- **Input types**: text, password, email, number, tel, url
- **Form field**: Label, hint text, and error message support
- **States**: disabled, readonly, error
- **Technical styling**: Bracket notation [ input ] for industrial aesthetic
- **Smart re-rendering**: Value updates don't cause focus loss during typing

### Usage
\`\`\`html
<pilot-input label="Email" placeholder="Enter your email" type="email"></pilot-input>

<pilot-input label="Password" type="password" hint="Must be at least 8 characters"></pilot-input>

<pilot-input label="Amount" error="Invalid amount" value="abc" type="number"></pilot-input>

<pilot-input technical value="[ TECH ]"></pilot-input>
\`\`\`

### Events
The pilot-input component uses the native input element's events. Since it's a Web Component with Shadow DOM, you can listen to these events on the pilot-input element:

- **input**: Fired when the input value changes (during typing)
  - Access the value via: \`event.target.value\` or the shadow DOM input
- **change**: Fired when the input value changes and loses focus (blur)
- **focus**: Fired when the input gains focus
- **blur**: Fired when the input loses focus

Note: The component synchronizes the native input value to the 'value' attribute on blur.

### Attributes Reference
All standard HTML input attributes can be set on the component:
- \`type\`: Input type (text, password, email, number, tel, url)
- \`value\`: Current value
- \`placeholder\`: Placeholder text
- \`disabled\`: Disable the input
- \`readonly\`: Read-only mode
- \`required\`: Required field (native HTML5 validation)

Component-specific attributes:
- \`label\`: Label text above the field
- \`hint\`: Helper text below the field
- \`error\`: Error message (shows in red, replaces hint)
- \`technical\`: Enable bracket notation styling
        `,
      },
    },
  },
};

const Template = ({ type, value, placeholder, label, hint, error, disabled, readonly, technical, required }) => html`
  <pilot-input
    type=${type}
    value=${value}
    placeholder=${placeholder}
    label=${label}
    hint=${hint}
    error=${error}
    ?disabled=${disabled}
    ?readonly=${readonly}
    ?technical=${technical}
    ?required=${required}
  ></pilot-input>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  value: '',
  placeholder: '',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  readonly: false,
  technical: false,
  required: false,
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: 'Hello World',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'Disabled value',
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  readonly: true,
  value: 'Read-only value',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...Default.args,
  placeholder: 'Enter your text here...',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Email Address',
  type: 'email',
};

export const WithHint = Template.bind({});
WithHint.args = {
  ...Default.args,
  label: 'Password',
  type: 'password',
  hint: 'Must be at least 8 characters with one number',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  label: 'Email Address',
  type: 'email',
  value: 'invalid-email',
  error: 'Please enter a valid email address',
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  label: 'Required Field',
  required: true,
};

export const Technical = Template.bind({});
Technical.args = {
  ...Default.args,
  technical: true,
  value: 'TECH-001',
};

export const PasswordType = Template.bind({});
PasswordType.args = {
  ...Default.args,
  type: 'password',
  label: 'Password',
  placeholder: 'Enter password',
};

export const NumberType = Template.bind({});
NumberType.args = {
  ...Default.args,
  type: 'number',
  label: 'Quantity',
  value: '42',
};

export const EmailType = Template.bind({});
EmailType.args = {
  ...Default.args,
  type: 'email',
  label: 'Email',
  placeholder: 'user@example.com',
};

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Default</p>
      <pilot-input placeholder="Enter text"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Label</p>
      <pilot-input label="Full Name" placeholder="John Doe"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Hint</p>
      <pilot-input label="Username" hint="Letters and numbers only, no spaces"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Error</p>
      <pilot-input label="Password" type="password" value="short" error="Password must be at least 8 characters"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Disabled</p>
      <pilot-input value="Disabled input" disabled></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Read-only</p>
      <pilot-input value="Read-only value" readonly></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Required</p>
      <pilot-input label="Required Field" required></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Technical Style</p>
      <pilot-input technical value="TECH-001"></pilot-input>
    </div>
  </div>
`;

export const AllTypes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Text (default)</p>
      <pilot-input type="text" label="Text" value="Sample text"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Password</p>
      <pilot-input type="password" label="Password" value="secret123"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Email</p>
      <pilot-input type="email" label="Email" value="user@example.com"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Number</p>
      <pilot-input type="number" label="Number" value="12345"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Tel</p>
      <pilot-input type="tel" label="Phone" value="+1-555-123-4567"></pilot-input>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">URL</p>
      <pilot-input type="url" label="Website" value="https://example.com"></pilot-input>
    </div>
  </div>
`;
