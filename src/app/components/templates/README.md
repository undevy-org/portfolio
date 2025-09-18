# Template Component Library

## Overview

Templates are the highest level of the atomic design hierarchy, composing organisms to create complete page layouts. They eliminate code duplication by providing reusable patterns for common screen structures.

```
Atoms ← Molecules ← Organisms ← Templates
  ✅      ✅        ✅         ✅
```

## Available Templates

### 1. StandardScreenTemplate
**Purpose**: Generic template for displaying content with optional header data and navigation.

**Use Cases**:
- Introduction screens
- Timeline displays
- Skills grids
- Simple content pages

**Props**:
- `title?: string` - Optional top-level title
- `className?: string` - Additional CSS classes
- `headerData?: object` - Data for header ProfileDataGrid (auto-placed before content)
- `headerDataTitle?: string` - Title for header ProfileDataGrid
- `headerDataBeforeChildren?: boolean = true` - Position header before or after children
- `children: ReactNode` - Main content area
- `navigationButtons?: Array<ButtonProps>` - Bottom navigation buttons

### 2. DetailViewTemplate
**Purpose**: Specialized template for entity detail pages with tabs, accordion, or panels display.

**Use Cases**:
- Case study details
- Skill descriptions with proficiency
- Role information with summaries
- Any detail view with metadata sections

**Display Modes**:
- `tabs` - Horizontal tabs with content switching
- `accordion` - Expandable sections
- `sections` - Individual panels (default)

**Props**:
- `entityType: 'case'|'skill'|'role'` - Affects metadata styling hints
- `title: string` - Entity name/title
- `subtitle?: string` - Secondary title (role company, skill description)
- `metadata?: object` - Key-value metadata pairs
- `tags?: string[]` - Tag labels
- `proficiency?: {level: string, value: number}` - Skill proficiency display
- `content: Array<{label: string, content: ReactNode}>` - Content sections
- `displayMode?: 'tabs'|'accordion'|'sections' = 'sections'` - Content organization
- `onBack: () => void` - Back navigation handler
- `backLabel?: string = 'BACK'` - Back button text
- `additionalButtons?: Array<ButtonProps>` - Extra navigation buttons

### 3. ListViewTemplate
**Purpose**: Template for displaying collections of items, with optional access controls.

**Use Cases**:
- Case lists with access levels
- Menu navigation (MainHub)
- Item grids with progress tracking
- Filtered collections

**Props**:
- `title?: string` - Optional page title
- `items: Array<Item>` - Items to display
- `onItemClick?: (item) => void` - Item click handler
- `renderCard?: (item, index) => ReactNode` - Custom item renderer
- `variant?: 'menu'|'list' = 'list'` - Visual appearance variant
- `accessLevel?: {current, max, percentage, label, nextLevel, isMaxLevel}` - Access control info
- `showProgress?: boolean = true` - Display progress bar for access
- `emptyState?: ReactNode` - Custom empty state component
- `navigationButtons?: Array<ButtonProps>` - Bottom action buttons

## Usage Guidelines

### When to Use Templates

**StandardScreenTemplate**
- Single content screen with optional data header
- Navigation between related screens
- Simple information display

**DetailViewTemplate**
- Complex entity information requiring multiple sections
- Content that benefits from tabs/accordion organization
- Entity details with metadata and actions

**ListViewTemplate**
- Collections of items where patterns emerge
- Screens requiring access level restrictions
- Lists needing custom item rendering

### Design Philosophy

1. **Configuration over Convention**: Explicit props prevent hidden assumptions
2. **Progressive Enhancement**: Optional props add features without breaking base functionality
3. **Composition First**: Templates work together (e.g., NavigationButton in multiple templates)
4. **Semantic Defaulting**: Sensible defaults that match design system expectations

### Migration Process

1. **Identify Pattern**: Find screens sharing similar layout structures
2. **Extract Configuration**: Determine what needs to be passed as props
3. **Create Template**: Build flexible component with conditional rendering
4. **Validate Parity**: Ensure visual and functional equivalence
5. **Update Screens**: Replace hardcoded layouts with template calls

### Template-specific Considerations

**Responsive Design**:
- All templates maintain mobile/desktop layouts
- Cards reorder appropriately for screen size
- Navigation stacks on mobile

**Accessibility**:
- Semantic HTML structure maintained
- Screen reader announcements provided
- Keyboard navigation supported

**Performance**:
- Lazy loading where appropriate
- Memoization of computational props
- Optimized re-renders

## Adding New Templates

1. Follow the established prop naming conventions
2. Include comprehensive JSDoc documentation
3. Add to `templates/index.js` exports
4. Write tests covering all prop combinations
5. Update this README with usage examples

## Common Patterns & Solutions

### Custom Item Rendering
```javascript
<ListViewTemplate
  items={data}
  renderCard={(item) => (
    <CustomItemComponent item={item} />
  )}
/>
```

### Conditional Content Display
```javascript
<DetailViewTemplate
  content={[
    {label: 'Info', content: <Info />},
    hasDetails && {label: 'Details', content: <Details />}
  ].filter(Boolean)}
/>
```

### Access-Gated Lists
```javascript
<ListViewTemplate
  accessLevel={{
    current: unlockedCount,
    max: totalCount,
    percentage: (unlockedCount/totalCount)*100,
    label: `${unlockedCount}/${totalCount} available`
  }}
  items={availableItems}
/>
```

## Testing Approach

- **Unit**: Component logic and prop handling
- **Integration**: Template composition with organisms
- **Visual**: Screenshot comparison after migration
- **E2E**: Navigation between templated screens

## Code Organization

```
src/app/components/templates/
├── README.md                     # This documentation
├── index.js                      # Template exports
├── StandardScreenTemplate.js     # Universal content template
├── DetailViewTemplate.js         # Entity detail pages
└── ListViewTemplate.js           # Item collections
