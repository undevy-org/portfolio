# Molecular Components

This directory contains molecular components that combine atomic components into common UI patterns.

## Components

### Panel
Standard container with border and padding.
- Props: `children`, `noPadding`, `className`
- Uses semantic `panel-base` and `panel-theme` classes

### LabelValuePair
Key-value display pattern for data presentation.
- Props: `label`, `value`, `responsive`, `className`
- `responsive`: Enables mobile-friendly grid layout
- Always uses monospace font

### NavigationButton
Button with integrated navigation and logging.
- Props: `screen`, `label`, `icon`, `onClick`, `logMessage`, `className`
- `onClick`: Called before navigation for additional actions
- `logMessage`: Custom log message (default: "NAVIGATE: {label}")
- Automatically handles navigation and activity logging

### SectionHeader
Header with icon and command-style title.
- Props: `title`, `icon`, `className`
- Combines icon with CommandTitle component

### ListItem
Flexible list item with various marker styles.
- Props: `text`, `marker`, `className`
- Supports bullets, numbers, checkmarks
- Auto-detects marker type for styling

## Usage

Import from the molecules directory:
```javascript
import { Panel, LabelValuePair } from '../components/molecules';
```

## Special Cases

- **AnalyticsPanel**: Use `responsive={true}` for LabelValuePair
- **Navigation with state**: Pass onClick for setting state before navigation
