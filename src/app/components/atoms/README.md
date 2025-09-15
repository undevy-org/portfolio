# Atomic Components

This directory contains the foundational atomic components used throughout the application. These components are the building blocks for more complex UI elements.

## Components

### Divider
A semantic separator between content sections.

**Props:**
- `variant`: 'solid' | 'dashed' (default: 'solid')
- `spacing`: Tailwind spacing classes (default: 'my-2')
- `className`: Additional CSS classes

**Usage:**
```jsx
import { Divider } from './atoms';

// Default divider
<Divider />

// Dashed variant with custom spacing
<Divider variant="dashed" spacing="my-4" />
```

### Tag
Small badge elements for categories and metadata.

**Props:**
- `text`: Tag content (required)
- `variant`: 'default' | 'secondary' (default: 'default')
- `size`: 'sm' | 'md' (default: 'sm')
- `className`: Additional CSS classes

**Usage:**
```jsx
import { Tag } from './atoms';

// Default tag
<Tag text="React" />

// Secondary variant with medium size
<Tag text="JavaScript" variant="secondary" size="md" />
```

### Label
Form label elements with optional required indicator.

**Props:**
- `text`: Label text (required)
- `htmlFor`: ID of associated input element
- `required`: Boolean to show required indicator (default: false)
- `className`: Additional CSS classes

**Usage:**
```jsx
import { Label } from './atoms';

// Basic label
<Label text="Name" htmlFor="name-input" />

// Required label
<Label text="Email" htmlFor="email-input" required />
```

### CommandTitle
Terminal-style titles with $ prefix.

**Props:**
- `text`: Title text (required)
- `level`: HTML heading level 'h1'-'h6' (default: 'h3')
- `className`: Additional CSS classes

**Usage:**
```jsx
import { CommandTitle } from './atoms';

// Default h3 title
<CommandTitle text="whoami" />

// h2 title
<CommandTitle text="whoami" level="h2" />
```

### Input
Form input fields with error states.

**Props:**
- `type`: Input type (default: 'text')
- `placeholder`: Placeholder text
- `value`: Input value
- `onChange`: Change handler
- `onKeyDown`: Key down handler
- `error`: Boolean for error state (default: false)
- `disabled`: Disabled state (default: false)
- `autoComplete`: Autocomplete attribute
- `id`: Input ID
- `name`: Input name
- `className`: Additional CSS classes

**Usage:**
```jsx
import { Input } from './atoms';

// Basic input
<Input placeholder="Enter text" />

// Error state
<Input error={true} placeholder="Enter text" />

// Password input
<Input type="password" placeholder="Enter password" />
```

## Index File

The [index.js](file:///Users/undevy/portfolio-project/src/app/components/atoms/index.js) file exports all components for easy importing:

```jsx
import { Divider, Tag, Label, CommandTitle, Input } from './atoms';
```