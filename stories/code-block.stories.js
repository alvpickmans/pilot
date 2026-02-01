import { html } from 'lit';

export default {
  title: 'Components/Code Block',
  component: 'pilot-code-block',
  argTypes: {
    language: {
      control: 'text',
      description: 'Programming language displayed in the header tag',
      table: {
        defaultValue: { summary: '' },
      },
    },
    filename: {
      control: 'text',
      description: 'Filename displayed in the header',
      table: {
        defaultValue: { summary: '' },
      },
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Display line numbers alongside the code',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    code: {
      control: 'text',
      description: 'Code content (uses default slot)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Code Block

A syntax-highlighted code display component with line numbers and language tagging.

### Features
- **Language tag**: Displays programming language in header badge
- **Filename**: Shows filename in header alongside or instead of language
- **Line numbers**: Optional line numbers with proper indentation
- **Monospace styling**: Uses IBM Plex Mono font family
- **Technical aesthetic**: Industrial styling with sharp corners and technical color scheme

### Usage
\`\`\`html
<pilot-code-block language="javascript">
function hello() {
  console.log('Hello, World!');
}
</pilot-code-block>
\`\`\`

\`\`\`html
<pilot-code-block language="python" filename="example.py" show-line-numbers>
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
</pilot-code-block>
\`\`\`

### Attributes Reference
- \`language\`: Programming language (e.g., javascript, python, css, html)
- \`filename\`: Source filename to display
- \`show-line-numbers\`: Boolean attribute to enable line numbers

### Slots
- **Default slot**: The code content to display

### Styling
The component uses CSS custom properties:
- \`--font-mono\`: Font family (defaults to IBM Plex Mono)
- \`--color-background-code\`: Code background color
- \`--color-text-code\`: Code text color
- \`--pilot-code-block-padding\`: Padding inside code block (default: 1.5rem)
        `,
      },
    },
  },
};

const Template = ({ language, filename, showLineNumbers, code }) => html`
  <pilot-code-block
    language=${language}
    filename=${filename}
    ?show-line-numbers=${showLineNumbers}
  >
    ${code}
  </pilot-code-block>
`;

export const Default = Template.bind({});
Default.args = {
  language: '',
  filename: '',
  showLineNumbers: false,
  code: `function greet(name) {
  return 'Hello, ' + name + '!';
}`,
};

export const WithLanguage = Template.bind({});
WithLanguage.args = {
  ...Default.args,
  language: 'javascript',
  code: `const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};`,
};

export const WithLineNumbers = Template.bind({});
WithLineNumbers.args = {
  ...Default.args,
  language: 'javascript',
  showLineNumbers: true,
  code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <Loading />;
  
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
};

export const WithFilename = Template.bind({});
WithFilename.args = {
  ...Default.args,
  language: 'typescript',
  filename: 'api-service.ts',
  showLineNumbers: true,
  code: `interface User {
  id: number;
  name: string;
  email: string;
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}`,
};

export const Python = Template.bind({});
Python.args = {
  language: 'python',
  filename: 'data_processor.py',
  showLineNumbers: true,
  code: `import pandas as pd
from typing import List, Dict

class DataProcessor:
    def __init__(self, data: pd.DataFrame):
        self.data = data
    
    def filter_by_column(self, column: str, value: str) -> pd.DataFrame:
        return self.data[self.data[column] == value]
    
    def get_summary(self) -> Dict:
        return {
            'count': len(self.data),
            'columns': list(self.data.columns),
            'memory_usage': self.data.memory_usage(deep=True).sum()
        }`,
};

export const CSS = Template.bind({});
CSS.args = {
  language: 'css',
  filename: 'styles.css',
  showLineNumbers: true,
  code: `.component {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-200);
}

.component:hover {
  background: var(--color-gray-200);
  transition: background-color 0.2s ease;
}

@media (max-width: 768px) {
  .component {
    padding: 1rem;
  }
}`,
};

export const HTML = Template.bind({});
HTML.args = {
  language: 'html',
  filename: 'index.html',
  showLineNumbers: true,
  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <p>Hello, World!</p>
  </main>
</body>
</html>`,
};

export const Shell = Template.bind({});
Shell.args = {
  language: 'bash',
  filename: 'setup.sh',
  showLineNumbers: true,
  code: `#!/bin/bash

# Setup script for the project
set -e

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Running tests..."
npm test

echo "Setup complete!"`,
};

export const JSON = Template.bind({});
JSON.args = {
  language: 'json',
  filename: 'package.json',
  showLineNumbers: true,
  code: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.0"
  }
}`,
};

export const SQL = Template.bind({});
SQL.args = {
  language: 'sql',
  filename: 'query.sql',
  showLineNumbers: true,
  code: `SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 100;`,
};

export const DifferentLanguages = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">JavaScript</p>
      <pilot-code-block language="javascript" show-line-numbers>
const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
};</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Python</p>
      <pilot-code-block language="python" show-line-numbers>
def process_data(items):
    results = []
    for item in items:
        results.append(item.upper())
    return results</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">CSS</p>
      <pilot-code-block language="css" show-line-numbers>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">HTML</p>
      <pilot-code-block language="html" show-line-numbers>
<div class="card">
  <h2>Card Title</h2>
  <p>Card description here.</p>
  <button>Click me</button>
</div></pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Rust</p>
      <pilot-code-block language="rust" show-line-numbers>
fn main() {
    let name = "World";
    println!("Hello, {}!", name);
}</pilot-code-block>
    </div>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Basic (no header)</p>
      <pilot-code-block>
const x = 10;
const y = 20;
const sum = x + y;</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Language</p>
      <pilot-code-block language="javascript">
function multiply(a, b) {
  return a * b;
}</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Filename</p>
      <pilot-code-block filename="config.json">
{
  "name": "app",
  "version": "1.0.0"
}</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Language & Filename</p>
      <pilot-code-block language="typescript" filename="app.ts">
interface Config {
  name: string;
  version: string;
}</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Line Numbers</p>
      <pilot-code-block language="javascript" show-line-numbers>
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const names = users.map(u => u.name);</pilot-code-block>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Complete Example</p>
      <pilot-code-block language="python" filename="main.py" show-line-numbers>
#!/usr/bin/env python3
"""Main application entry point."""

import sys
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <input>")
        sys.exit(1)
    
    input_path = Path(sys.argv[1])
    print(f"Processing: {input_path}")

if __name__ == "__main__":
    main()</pilot-code-block>
    </div>
  </div>
`;
