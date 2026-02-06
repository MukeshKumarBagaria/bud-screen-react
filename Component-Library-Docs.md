# ActionButton Component

A dynamic, reusable button component library with 8 variants and full state support.

## Installation

Ensure `react-icons` is installed:
```bash
npm install react-icons
```

## Usage

### Option 1: Pre-configured Buttons

```jsx
import { 
  SubmitButton, 
  RejectButton, 
  ActionButtonGroup 
} from '@/components/ActionButton';

<ActionButtonGroup>
  <SubmitButton>Approve</SubmitButton>
  <RejectButton>Deny</RejectButton>
</ActionButtonGroup>
```

### Option 2: Dynamic Variant

```jsx
import { ActionButton } from '@/components/ActionButton';

<ActionButton variant="draft">Save Draft</ActionButton>
```

## Available Variants

| Variant | Description | Icon |
|---------|-------------|------|
| `submit` | Primary action (blue) | ✓ Check circle |
| `secondary` | Outlined blue | None |
| `reset` | Outlined grey | ↺ History |
| `return` | Yellow background | ← Arrow |
| `draft` | Green pastel | 💾 Save |
| `hold` | Orange pastel | ⏸ Pause |
| `close` | Outlined red | ⊗ Cancel |
| `reject` | Red pastel | ✕ Close |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'submit'` | Button style variant |
| `icon` | ReactNode | variant icon | Custom icon override |
| `showIcon` | boolean | `true` | Show/hide icon |
| `disabled` | boolean | `false` | Disabled state |
| `onClick` | function | - | Click handler |
| `fullWidth` | boolean | `false` | Full width mode |
| `size` | string | `'medium'` | `small`, `medium`, `large` |

## Customization

All colors are defined in `src/index.css` under `:root`. To customize:

```css
:root {
  --btn-submit-bg: #1B6498;
  --btn-submit-hover-bg: #1B557E;
  /* ... */
}
```
