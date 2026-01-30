# Prompt: Implement pilot-modal Component

## Task
Implement the `pilot-modal` web component for the Pilot Design System.

## Component Specification

### Purpose
A dialog overlay component for confirmations and forms with technical corner bracket styling that matches the industrial/technical aesthetic of the design system.

### Requirements

**Visual Design:**
- Technical corner bracket decorations (using ::before and ::after pseudo-elements)
- Backdrop overlay with blur effect
- Sharp corners (border-radius: 0)
- Technical border styling (1.5px solid)
- Industrial/technical color scheme using CSS variables

**Functionality:**
- Focus trap when modal is open (keep focus within modal)
- Close on Escape key
- Close on backdrop click (if dismissible)
- Smooth open/close transitions
- Prevent body scroll when open

**Slots:**
- `header`: Modal title area
- default: Main content body
- `footer`: Action buttons area

**Attributes:**
- `open`: Boolean - controls visibility
- `size`: sm | md | lg | full - modal width (default: md)
- `dismissible`: Boolean - allows closing via backdrop/escape (default: true)
- `title`: String - default header text (can be overridden by header slot)

### Technical Implementation

**Web Component Structure:**
```javascript
class PilotModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'size', 'dismissible', 'title'];
  }
  
  // Standard Pilot component structure per AGENTS.md
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
}
```

**CSS Requirements:**
- Use CSS custom properties with fallbacks (var(--prop, fallback))
- Technical styling:
  - Corner brackets using ::before/::after on modal container
  - Backdrop: rgba(0, 0, 0, 0.5) with backdrop-filter: blur(4px)
  - Border: var(--border-width-technical, 1.5px) solid var(--color-border-technical, #1a1a1a)
  - Background: var(--color-background-primary, #ffffff)
- Size variants:
  - sm: max-width: 400px
  - md: max-width: 600px
  - lg: max-width: 900px
  - full: max-width: 95vw, max-height: 95vh

**Accessibility:**
- role="dialog"
- aria-modal="true"
- aria-labelledby pointing to title
- Focus trap implementation
- Escape key handler

### Files to Modify
1. `design-system/components.js` - Add PilotModal class
2. `design-system/demo.html` - Add modal examples
3. `design-system/README.md` - Document the component
4. `design-system/QUICK-REFERENCE.md` - Add quick reference

### Testing Checklist
- [ ] Modal opens when `open` attribute is set
- [ ] Modal closes when `open` attribute is removed
- [ ] Backdrop click closes modal (when dismissible)
- [ ] Escape key closes modal (when dismissible)
- [ ] Focus is trapped within modal when open
- [ ] Body scroll is prevented when open
- [ ] All size variants render correctly
- [ ] Corner brackets display correctly
- [ ] Slots (header, default, footer) work properly
- [ ] Works in Chrome, Firefox, Safari, Edge

### Example Usage
```html
<!-- Basic modal -->
<pilot-modal id="myModal" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <pilot-button variant="ghost" onclick="closeModal()">Cancel</pilot-button>
    <pilot-button variant="primary" onclick="confirm()">Confirm</pilot-button>
  </div>
</pilot-modal>

<!-- Large modal with custom header -->
<pilot-modal size="lg" dismissible="false">
  <h2 slot="header">Custom Title</h2>
  <p>Content here...</p>
</pilot-modal>
```

### Design References
- Look at existing components (pilot-card, pilot-panel) for technical styling patterns
- Use the same color variables and spacing scale
- Follow the component structure from AGENTS.md
- Maintain the industrial/technical aesthetic

## Acceptance Criteria
1. Component renders correctly with all attributes
2. All functionality works (open/close, focus trap, keyboard nav)
3. Styling matches design system aesthetic
4. Documentation is complete
5. Demo examples are added
6. All tests pass (manual testing in demo.html)

## Priority
P0 - Critical foundation component

## Dependencies
None - this is a foundational component that others depend on
