import { html } from 'lit';

export default {
  title: 'Components/Modal',
  component: 'pilot-modal',
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Size of the modal',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed by clicking the backdrop, close button, or pressing Escape',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      control: 'text',
      description: 'Title displayed in the modal header',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Pilot Modal

A dialog overlay component with technical corner bracket styling for displaying content in a focused view.

### Features
- **Size variants**: Small (400px), Medium (600px), Large (900px), Full screen (95vw/95vh)
- **Dismissible control**: Option to prevent closing via backdrop click or Escape key
- **Focus trap**: Automatically traps focus within the modal when open
- **Body scroll lock**: Prevents background scrolling when modal is open
- **Accessibility**: Full keyboard navigation with Tab, Shift+Tab, and Escape support
- **Technical styling**: Corner bracket decorations for industrial aesthetic

### Usage
\`\`\`html
<!-- Basic modal -->
<pilot-modal title="Modal Title" size="md">
  <p>Modal content goes here</p>
</pilot-modal>

<!-- Programmatic control -->
<script>
  const modal = document.querySelector('pilot-modal');
  modal.open();  // Open the modal
  modal.close(); // Close the modal
</script>
\`\`\`

### Slots
- **header**: Additional content in the modal header (displayed next to title)
- **default**: Main content area of the modal
- **footer**: Footer content (typically action buttons)

### Events
The modal component does not emit custom events. Use standard click handlers on buttons within the footer slot to handle actions.

### Methods
- **open()**: Opens the modal programmatically
- **close()**: Closes the modal programmatically
        `,
      },
    },
  },
};

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.open();
  }
};

const closeModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.close();
  }
};

const Template = ({ open, size, dismissible, title }) => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => {
        // Reset and open modal for story demo
        const modal = document.getElementById('story-modal');
        if (modal) {
          modal.setAttribute('size', size);
          if (dismissible === false) {
            modal.setAttribute('dismissible', 'false');
          } else {
            modal.removeAttribute('dismissible');
          }
          if (title) {
            modal.setAttribute('title', title);
          } else {
            modal.removeAttribute('title');
          }
          modal.open();
        }
      }}
    >
      Open Modal
    </button>
    
    <pilot-modal id="story-modal" size=${size} ?dismissible=${dismissible !== false} title=${title}>
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.6;">
        This is the modal content area. You can put any content here including text, images, forms, or other components.
      </p>
    </pilot-modal>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  open: false,
  size: 'md',
  dismissible: true,
  title: 'Modal Title',
};

export const Small = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('small-modal')}
    >
      Open Small Modal
    </button>
    
    <pilot-modal id="small-modal" size="sm" title="Small Modal">
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.6;">
        This is a small modal (400px max-width). Good for simple messages, confirmations, or quick actions.
      </p>
    </pilot-modal>
  </div>
`;

export const Large = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('large-modal')}
    >
      Open Large Modal
    </button>
    
    <pilot-modal id="large-modal" size="lg" title="Large Modal">
      <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
        <p style="margin: 0 0 1rem 0;">
          This is a large modal (900px max-width). Good for complex forms, detailed information, or data-heavy interfaces.
        </p>
        <p style="margin: 0;">
          The large size provides plenty of space for content while still maintaining the technical corner bracket styling and all the accessibility features.
        </p>
      </div>
    </pilot-modal>
  </div>
`;

export const FullScreen = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('full-modal')}
    >
      Open Full Screen Modal
    </button>
    
    <pilot-modal id="full-modal" size="full" title="Full Screen Modal">
      <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
        <p style="margin: 0 0 1rem 0;">
          This is a full screen modal (95vw x 95vh). Great for immersive experiences, detailed workflows, or when you need maximum screen real estate.
        </p>
        <p style="margin: 0;">
          The full size modal takes up most of the screen while still showing the backdrop underneath. Perfect for complex multi-step processes.
        </p>
      </div>
    </pilot-modal>
  </div>
`;

export const WithForm = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('form-modal')}
    >
      Open Form Modal
    </button>
    
    <pilot-modal id="form-modal" size="md" title="Edit Profile">
      <div style="display: flex; flex-direction: column; gap: 1rem; font-family: 'Inter', sans-serif;">
        <div>
          <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #525252;">Name</label>
          <input type="text" value="John Doe" style="width: 100%; padding: 0.5rem; border: 1px solid #d4d4d4; font-family: 'Inter', sans-serif;" />
        </div>
        <div>
          <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #525252;">Email</label>
          <input type="email" value="john@example.com" style="width: 100%; padding: 0.5rem; border: 1px solid #d4d4d4; font-family: 'Inter', sans-serif;" />
        </div>
        <div>
          <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #525252;">Bio</label>
          <textarea rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid #d4d4d4; font-family: 'Inter', sans-serif; resize: vertical;">Software engineer with a passion for design systems.</textarea>
        </div>
      </div>
      
      <div slot="footer" style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <button 
          style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #d4d4d4; background: white; cursor: pointer;"
          @click=${() => closeModal('form-modal')}
        >
          Cancel
        </button>
        <button 
          style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
          @click=${() => {
            alert('Profile saved!');
            closeModal('form-modal');
          }}
        >
          Save Changes
        </button>
      </div>
    </pilot-modal>
  </div>
`;

export const ConfirmDialog = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('confirm-modal')}
    >
      Open Confirm Dialog
    </button>
    
    <pilot-modal id="confirm-modal" size="sm" title="Confirm Delete">
      <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
        <p style="margin: 0; color: #dc2626;">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </div>
      
      <div slot="footer" style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <button 
          style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #d4d4d4; background: white; cursor: pointer;"
          @click=${() => closeModal('confirm-modal')}
        >
          Cancel
        </button>
        <button 
          style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #dc2626; background: #dc2626; color: white; cursor: pointer;"
          @click=${() => {
            alert('Item deleted!');
            closeModal('confirm-modal');
          }}
        >
          Delete
        </button>
      </div>
    </pilot-modal>
  </div>
`;

export const NonDismissible = () => html`
  <div style="padding: 1rem;">
    <p style="font-family: 'Inter', sans-serif; margin: 0 0 1rem 0; color: #6b6b6b;">
      This modal has <code style="font-family: 'IBM Plex Mono', monospace; background: #f5f5f5; padding: 0.125rem 0.25rem;">dismissible="false"</code>. 
      You must click the action button to close it (Escape and backdrop click are disabled).
    </p>
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('nondismissible-modal')}
    >
      Open Non-Dismissible Modal
    </button>
    
    <pilot-modal id="nondismissible-modal" size="sm" title="Required Action" dismissible="false">
      <p style="margin: 0; font-family: 'Inter', sans-serif; line-height: 1.6;">
        This modal cannot be dismissed by clicking outside or pressing Escape. You must explicitly take an action.
      </p>
      
      <div slot="footer" style="display: flex; gap: 0.75rem; justify-content: center;">
        <button 
          style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
          @click=${() => closeModal('nondismissible-modal')}
        >
          Acknowledge
        </button>
      </div>
    </pilot-modal>
  </div>
`;

export const WithHeaderSlot = () => html`
  <div style="padding: 1rem;">
    <button 
      style="font-family: 'IBM Plex Mono', monospace; padding: 0.75rem 1.5rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
      @click=${() => openModal('header-slot-modal')}
    >
      Open Modal with Custom Header
    </button>
    
    <pilot-modal id="header-slot-modal" size="md" title="System Status">
      <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="width: 8px; height: 8px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #16a34a;">OPERATIONAL</span>
      </div>
      
      <div style="font-family: 'Inter', sans-serif; line-height: 1.6;">
        <p style="margin: 0 0 1rem 0;">
          All systems are running normally. This modal demonstrates using the header slot to add custom elements alongside the title.
        </p>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b6b6b;">
          <p style="margin: 0;">Last check: 2026-02-01 14:30:00 UTC</p>
          <p style="margin: 0;">Uptime: 99.9%</p>
        </div>
      </div>
    </pilot-modal>
  </div>
`;

export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Small Modal</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-small')}
      >
        Open Small
      </button>
      <pilot-modal id="all-small" size="sm" title="Small">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">400px max-width</p>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Medium Modal</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-medium')}
      >
        Open Medium
      </button>
      <pilot-modal id="all-medium" size="md" title="Medium">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">600px max-width</p>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Large Modal</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-large')}
      >
        Open Large
      </button>
      <pilot-modal id="all-large" size="lg" title="Large">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">900px max-width</p>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Full Screen Modal</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-full')}
      >
        Open Full
      </button>
      <pilot-modal id="all-full" size="full" title="Full Screen">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">95vw x 95vh</p>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Header Slot</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-header')}
      >
        Open with Header
      </button>
      <pilot-modal id="all-header" size="md" title="With Header Slot">
        <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #f59e0b;">[ CUSTOM ]</span>
        </div>
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Custom content in header slot</p>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">With Footer Slot</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-footer')}
      >
        Open with Footer
      </button>
      <pilot-modal id="all-footer" size="md" title="With Footer Slot">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Custom content in footer slot</p>
        <div slot="footer" style="display: flex; gap: 0.5rem;">
          <button style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.25rem 0.75rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;">Action</button>
        </div>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Non-Dismissible</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-nondismissible')}
      >
        Open Non-Dismissible
      </button>
      <pilot-modal id="all-nondismissible" size="sm" title="Non-Dismissible" dismissible="false">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Cannot be closed by clicking outside or pressing Escape</p>
        <div slot="footer" style="display: flex; justify-content: center;">
          <button 
            style="font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 0.25rem 0.75rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer;"
            @click=${() => closeModal('all-nondismissible')}
          >
            Close
          </button>
        </div>
      </pilot-modal>
    </div>
    
    <div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: #6b6b6b;">Without Title</p>
      <button 
        style="font-family: 'IBM Plex Mono', monospace; padding: 0.5rem 1rem; border: 1px solid #1a1a1a; background: #1a1a1a; color: white; cursor: pointer; font-size: 0.875rem;"
        @click=${() => openModal('all-notitle')}
      >
        Open No Title
      </button>
      <pilot-modal id="all-notitle" size="md">
        <p style="margin: 0; font-family: 'Inter', sans-serif;">Modal without a title attribute</p>
      </pilot-modal>
    </div>
  </div>
`;
