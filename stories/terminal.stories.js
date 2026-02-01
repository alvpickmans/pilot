import { html } from 'lit';

export default {
  title: 'Components/Terminal',
  component: 'pilot-terminal',
  argTypes: {
    title: {
      control: 'text',
      description: 'Terminal title displayed in the header (requires show-header)',
      table: {
        defaultValue: { summary: 'terminal' },
      },
    },
    showHeader: {
      control: 'boolean',
      description: 'Display header bar with title and control indicators',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showPrompt: {
      control: 'boolean',
      description: 'Display command prompt ($) before content',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    content: {
      control: 'text',
      description: 'Terminal content (uses default slot)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Terminal

A console/terminal display component with a dark theme and technical aesthetic.

### Features
- **Dark theme**: Dark background with amber accent colors for terminal authenticity
- **Optional header**: Title bar with control indicators (similar to window controls)
- **Command prompt**: Optional prompt character ($) for command-line representation
- **Syntax highlighting classes**: Built-in CSS classes for styling terminal content:
  - \`.comment\` - Gray color for comments
  - \`.keyword\` - Amber color for keywords
  - \`.string\` - Green color for strings
- **Monospace typography**: Uses IBM Plex Mono font family
- **Technical aesthetic**: Sharp corners, technical color scheme, industrial styling

### Usage
\`\`\`html
<pilot-terminal show-header title="bash">
  npm install
  npm run build
</pilot-terminal>
\`\`\`

\`\`\`html
<pilot-terminal show-header show-prompt title="console">
  ls -la
</pilot-terminal>
\`\`\`

### Attributes
- **title**: Terminal title displayed in the header (default: "terminal")
- **show-header**: Boolean attribute to display the header bar
- **show-prompt**: Boolean attribute to display the command prompt ($)

### Slots
- **Default slot**: The terminal content to display (can be plain text, HTML, or slotted pre/code elements)

### Styling
The component uses CSS custom properties:
- \`--font-mono\`: Font family (defaults to IBM Plex Mono)
- \`--color-black-300\`: Terminal background color (default: #1a1a1a)
- \`--color-black-400\`: Header background and border color
- \`--color-gray-200\`: Content text color (default: #d4d4d4)
- \`--color-amber-500\`: Prompt color (default: #f59e0b)
- \`--pilot-terminal-padding\`: Padding inside terminal (default: 1rem)

### Content Styling
When placing content inside the terminal, you can use these CSS classes for syntax highlighting:
\`\`\`html
<pilot-terminal>
  <span class="comment"># This is a comment</span><br>
  <span class="keyword">function</span> hello() {<br>
  &nbsp;&nbsp;console.log(<span class="string">"Hello, World!"</span>);<br>
  }
</pilot-terminal>
\`\`\`
        `,
      },
    },
  },
};

const Template = ({ title, showHeader, showPrompt, content }) => html`
  <pilot-terminal
    title=${title}
    ?show-header=${showHeader}
    ?show-prompt=${showPrompt}
  >
    ${content}
  </pilot-terminal>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'terminal',
  showHeader: false,
  showPrompt: false,
  content: 'This is a simple terminal output message.',
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  title: 'bash',
  showHeader: true,
  showPrompt: false,
  content: 'System ready. Waiting for commands...',
};

export const WithPrompt = Template.bind({});
WithPrompt.args = {
  title: 'terminal',
  showHeader: false,
  showPrompt: true,
  content: 'npm install pilot-design-system',
};

export const WithOutput = Template.bind({});
WithOutput.args = {
  title: 'console',
  showHeader: true,
  showPrompt: false,
  content: html`
    <div style="font-family: 'IBM Plex Mono', monospace; line-height: 1.4;">
      <div style="color: #4ade80;">✓ Build completed successfully</div>
      <div style="color: #d4d4d4; margin-top: 0.5rem;">Compiled 42 modules in 1.2s</div>
      <div style="color: #9b9b9b; margin-top: 0.25rem;">Output: dist/bundle.js (125 kB)</div>
    </div>
  `,
};

export const WithError = Template.bind({});
WithError.args = {
  title: 'error',
  showHeader: true,
  showPrompt: false,
  content: html`
    <div style="font-family: 'IBM Plex Mono', monospace; line-height: 1.4;">
      <div style="color: #f87171;">✗ Error: Module not found</div>
      <div style="color: #d4d4d4; margin-top: 0.5rem;">Cannot resolve 'fs' in ./src/utils.js</div>
      <div style="color: #9b9b9b; margin-top: 0.25rem;">Line 15: import fs from 'fs';</div>
    </div>
  `,
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  title: 'logs',
  showHeader: true,
  showPrompt: false,
  content: html`
    <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.4;">
      <div>[2024-01-15T10:30:01Z] INFO: Server starting on port 3000</div>
      <div>[2024-01-15T10:30:01Z] INFO: Connected to database</div>
      <div>[2024-01-15T10:30:02Z] INFO: Cache initialized</div>
      <div>[2024-01-15T10:30:03Z] WARN: High memory usage detected: 78%</div>
      <div>[2024-01-15T10:30:04Z] INFO: Worker process #1 started</div>
      <div>[2024-01-15T10:30:04Z] INFO: Worker process #2 started</div>
      <div>[2024-01-15T10:30:05Z] INFO: Worker process #3 started</div>
      <div>[2024-01-15T10:30:06Z] INFO: Worker process #4 started</div>
      <div>[2024-01-15T10:30:07Z] DEBUG: Cache hit ratio: 94%</div>
      <div>[2024-01-15T10:30:08Z] INFO: Background job scheduler started</div>
      <div>[2024-01-15T10:30:09Z] INFO: WebSocket server listening</div>
      <div>[2024-01-15T10:30:10Z] INFO: Ready to accept connections</div>
      <div>[2024-01-15T10:31:15Z] INFO: GET /api/status 200 23ms</div>
      <div>[2024-01-15T10:31:16Z] INFO: GET /api/users 200 45ms</div>
      <div>[2024-01-15T10:31:18Z] INFO: POST /api/users 201 67ms</div>
      <div>[2024-01-15T10:31:20Z] INFO: GET /api/users/42 200 12ms</div>
      <div>[2024-01-15T10:31:22Z] INFO: DELETE /api/users/42 204 8ms</div>
      <div>[2024-01-15T10:31:25Z] INFO: GET /api/logs 200 34ms</div>
    </div>
  `,
};

export const WithHeaderAndPrompt = Template.bind({});
WithHeaderAndPrompt.args = {
  title: 'zsh',
  showHeader: true,
  showPrompt: true,
  content: 'git commit -m "feat: add terminal component"',
};

export const WithSyntaxHighlighting = () => html`
  <pilot-terminal show-header title="javascript" style="--pilot-terminal-padding: 1.5rem;">
    <pre style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; line-height: 1.6;"><span style="color: #525252;">// Configure the terminal component</span>
<span style="color: #fbbf24;">const</span> terminal = document.<span style="color: #fbbf24;">createElement</span>(<span style="color: #4ade80;">'pilot-terminal'</span>);

terminal.<span style="color: #fbbf24;">setAttribute</span>(<span style="color: #4ade80;">'title'</span>, <span style="color: #4ade80;">'bash'</span>);
terminal.<span style="color: #fbbf24;">setAttribute</span>(<span style="color: #4ade80;">'show-header'</span>, <span style="color: #4ade80;">''</span>);
terminal.<span style="color: #fbbf24;">setAttribute</span>(<span style="color: #4ade80;">'show-prompt'</span>, <span style="color: #4ade80;">''</span>);

terminal.textContent = <span style="color: #4ade80;">'npm run build'</span>;
document.body.<span style="color: #fbbf24;">appendChild</span>(terminal);</pre>
  </pilot-terminal>
`;

export const CommandHistory = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <pilot-terminal show-header show-prompt title="history" style="--pilot-terminal-padding: 1.25rem;">
      <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; line-height: 1.8;">
        <div style="display: flex; gap: 0.5rem;">
          <span style="color: #f59e0b;">1</span>
          <span style="color: #9b9b9b;">ls -la</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <span style="color: #f59e0b;">2</span>
          <span style="color: #9b9b9b;">cd projects/pilot</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <span style="color: #f59e0b;">3</span>
          <span style="color: #9b9b9b;">git status</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <span style="color: #f59e0b;">4</span>
          <span style="color: #d4d4d4;">npm install</span>
          <span style="color: #525252;"><-- current</span>
        </div>
      </div>
    </pilot-terminal>
  </div>
`;

export const MultipleTerminals = () => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Server Logs</p>
      <pilot-terminal show-header title="server">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.5;">
          <div style="color: #4ade80;">Server running on port 3000</div>
          <div style="color: #9b9b9b;">Connected to MongoDB</div>
        </div>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Build Output</p>
      <pilot-terminal show-header title="webpack">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.5;">
          <div style="color: #4ade80;">✓ Compiled successfully</div>
          <div style="color: #d4d4d4;">42 modules built</div>
        </div>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Test Results</p>
      <pilot-terminal show-header title="jest">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.5;">
          <div style="color: #4ade80;">PASS 12 tests</div>
          <div style="color: #f59e0b;">SKIP 2 tests</div>
        </div>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Git Status</p>
      <pilot-terminal show-header title="git" show-prompt>
        <span style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem;">git log --oneline -5</span>
      </pilot-terminal>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic (no header, no prompt)</p>
      <pilot-terminal>
        Simple text output without any styling
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Header</p>
      <pilot-terminal show-header title="bash">
        npm run dev
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Prompt</p>
      <pilot-terminal show-prompt>
        echo "Hello, World!"
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Header and Prompt</p>
      <pilot-terminal show-header show-prompt title="console">
        ls -la
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Rich Content (Success Message)</p>
      <pilot-terminal show-header title="deploy" style="--pilot-terminal-padding: 1.25rem;">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; line-height: 1.6;">
          <div style="color: #4ade80; font-weight: 500;">✓ Deployment successful</div>
          <div style="color: #d4d4d4; margin-top: 0.5rem;">
            Site live at: <span style="color: #f59e0b;">https://example.com</span>
          </div>
          <div style="color: #9b9b9b; margin-top: 0.25rem;">
            Build time: 23s | Size: 1.2MB
          </div>
        </div>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Rich Content (Error Message)</p>
      <pilot-terminal show-header title="error" style="--pilot-terminal-padding: 1.25rem;">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; line-height: 1.6;">
          <div style="color: #f87171; font-weight: 500;">✗ Build failed</div>
          <div style="color: #d4d4d4; margin-top: 0.5rem;">
            src/components/App.tsx:42:15
          </div>
          <div style="color: #9b9b9b; margin-top: 0.25rem;">
            Type 'string' is not assignable to type 'number'
          </div>
        </div>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Code Block</p>
      <pilot-terminal show-header title="config.json">
        <pre style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; line-height: 1.6;">{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "build": "webpack --mode production"
  }
}</pre>
      </pilot-terminal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Log Output</p>
      <pilot-terminal show-header title="system" style="--pilot-terminal-padding: 1rem;">
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.5;">
          <div><span style="color: #4ade80;">[INFO]</span> System initialized</div>
          <div><span style="color: #f59e0b;">[WARN]</span> Low disk space: 15% remaining</div>
          <div><span style="color: #60a5fa;">[DEBUG]</span> Connection pool: 5/10 active</div>
          <div><span style="color: #4ade80;">[INFO]</span> Background jobs queued: 3</div>
        </div>
      </pilot-terminal>
    </div>
  </div>
`;
