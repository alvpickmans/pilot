import { html } from 'lit';

export default {
  title: 'Components/Annotation',
  component: 'pilot-annotation',
  argTypes: {
    type: {
      control: 'select',
      options: ['note', 'warning', 'important', 'technical'],
      description: 'The type of annotation which determines the label text',
      table: {
        defaultValue: { summary: 'note' },
      },
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right'],
      description: 'Position of the label within the annotation box',
      table: {
        defaultValue: { summary: 'top-left' },
      },
    },
    content: {
      control: 'text',
      description: 'Content to display inside the annotation',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Annotation

A callout box for technical notes and warnings with industrial styling.

### Features
- **Types**: note, warning, important, technical (each with distinct label)
- **Positions**: top-left, top-right label placement
- **Styling**: Dashed border with corner bracket accents
- **Typography**: Technical/monospace label styling

### Usage
\`\`\`html
<pilot-annotation type="warning" position="top-left">
  This is a warning message that requires attention.
</pilot-annotation>
\`\`\`

### Slots
- **default**: Main content area for the annotation message

### Events
The annotation component does not emit events.
        `,
      },
    },
  },
};

const Template = ({ type, position, content }) => html`
  <pilot-annotation type=${type} position=${position}>
    ${content}
  </pilot-annotation>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'note',
  position: 'top-left',
  content: 'This is a default annotation. Use it to highlight important information that users should be aware of.',
};

export const Note = Template.bind({});
Note.args = {
  type: 'note',
  position: 'top-left',
  content: 'This is a note annotation. Notes provide additional context or supplementary information that is helpful but not critical.',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  position: 'top-left',
  content: 'This is a warning annotation. Warnings indicate potential issues or cautionary information that requires attention.',
};

export const Important = Template.bind({});
Important.args = {
  type: 'important',
  position: 'top-left',
  content: 'This is an important annotation. Important callouts highlight critical information that users must not overlook.',
};

export const Technical = Template.bind({});
Technical.args = {
  type: 'technical',
  position: 'top-left',
  content: 'This is a technical annotation. Technical notes provide implementation details, specifications, or technical requirements.',
};

export const PositionTopLeft = Template.bind({});
PositionTopLeft.args = {
  type: 'note',
  position: 'top-left',
  content: 'This annotation has its label positioned at the top-left corner (default).',
};

export const PositionTopRight = Template.bind({});
PositionTopRight.args = {
  type: 'note',
  position: 'top-right',
  content: 'This annotation has its label positioned at the top-right corner.',
};

export const WithRichContent = () => html`
  <pilot-annotation type="technical" position="top-left">
    <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
      <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Implementation Details</p>
      <p style="margin: 0 0 0.5rem 0; color: #525252;">
        The following code snippet demonstrates proper usage:
      </p>
      <code style="display: block; background: #f0f0f0; padding: 0.75rem; font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; border: 1px solid #d4d4d4;">
        const annotation = document.querySelector('pilot-annotation');
        annotation.setAttribute('type', 'warning');
      </code>
    </div>
  </pilot-annotation>
`;

export const MultipleAnnotations = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <pilot-annotation type="note" position="top-left">
      <span style="font-family: 'Inter', sans-serif;">
        <strong>Note:</strong> This feature is available in version 2.0 and above.
      </span>
    </pilot-annotation>
    
    <pilot-annotation type="warning" position="top-right">
      <span style="font-family: 'Inter', sans-serif;">
        <strong>Warning:</strong> Changing this setting will reset all cached data.
      </span>
    </pilot-annotation>
    
    <pilot-annotation type="important" position="top-left">
      <span style="font-family: 'Inter', sans-serif;">
        <strong>Important:</strong> This action cannot be undone once confirmed.
      </span>
    </pilot-annotation>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Types (Top-Left Position)</p>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <pilot-annotation type="note" position="top-left">
          <span style="font-family: 'Inter', sans-serif;">Note annotation - provides additional context or helpful information.</span>
        </pilot-annotation>
        
        <pilot-annotation type="warning" position="top-left">
          <span style="font-family: 'Inter', sans-serif;">Warning annotation - indicates potential issues requiring attention.</span>
        </pilot-annotation>
        
        <pilot-annotation type="important" position="top-left">
          <span style="font-family: 'Inter', sans-serif;">Important annotation - highlights critical information not to be overlooked.</span>
        </pilot-annotation>
        
        <pilot-annotation type="technical" position="top-left">
          <span style="font-family: 'Inter', sans-serif;">Technical annotation - provides implementation details and specifications.</span>
        </pilot-annotation>
      </div>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">All Types (Top-Right Position)</p>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <pilot-annotation type="note" position="top-right">
          <span style="font-family: 'Inter', sans-serif;">Note annotation with top-right label positioning.</span>
        </pilot-annotation>
        
        <pilot-annotation type="warning" position="top-right">
          <span style="font-family: 'Inter', sans-serif;">Warning annotation with top-right label positioning.</span>
        </pilot-annotation>
        
        <pilot-annotation type="important" position="top-right">
          <span style="font-family: 'Inter', sans-serif;">Important annotation with top-right label positioning.</span>
        </pilot-annotation>
        
        <pilot-annotation type="technical" position="top-right">
          <span style="font-family: 'Inter', sans-serif;">Technical annotation with top-right label positioning.</span>
        </pilot-annotation>
      </div>
    </div>
  </div>
`;

export const AllPositions = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Position: Top-Left (Default)</p>
      <pilot-annotation type="note" position="top-left">
        <span style="font-family: 'Inter', sans-serif;">The label is positioned at the top-left of the annotation box.</span>
      </pilot-annotation>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Position: Top-Right</p>
      <pilot-annotation type="note" position="top-right">
        <span style="font-family: 'Inter', sans-serif;">The label is positioned at the top-right of the annotation box.</span>
      </pilot-annotation>
    </div>
  </div>
`;
