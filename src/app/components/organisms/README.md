# Organism Components

Complex, self-contained UI sections combining atoms and molecules.

## Components

### ProfileDataGrid
Structured data display with title and key-value pairs.
- Props: `title`, `data`, `responsive`, `className`
- Combines Panel + CommandTitle + LabelValuePair

### NavigationPanel
Group of navigation buttons with flexible layout.
- Props: `buttons`, `layout`, `className`
- Manages multiple NavigationButtons

### CodeListSection
Specialized list for access codes with variants.
- Props: `title`, `icon`, `codes`, `onCodeClick`, `variant`, `className`
- Variants: 'master', 'special', 'user', 'default'

### ResponsiveCardGrid
Adaptive grid for card-based content.
- Props: `items`, `onItemClick`, `renderCard`, `columns`, `className`
- Handles responsive layouts automatically

### StatisticsGrid
Grid layout for statistical data.
- Props: `stats`, `columns`, `responsive`, `className`
- Flexible input format (object or array)

## Usage

```javascript
import { ProfileDataGrid, NavigationPanel } from '../components/organisms';
```

## Architecture

These organisms are designed to work together:

```javascript
<ProfileDataGrid title="stats" data={userData} />
<NavigationPanel buttons={navButtons} />
```

## Migration Pattern

Organism components encapsulate common UI patterns and reduce code duplication:

- **Atomic (Level 1)**: Basic building blocks
- **Molecular (Level 2)**: Simple combinations
- **Organism (Level 3)**: Complex, self-contained sections
- **Templates (Level 4)**: Full page layouts (future)
