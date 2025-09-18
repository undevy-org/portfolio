# Template Migration Guide

## Before & After Examples

### StandardScreenTemplate Migration

**BEFORE** (`src/app/screens/Timeline.js`)
```javascript
// ~25 lines of duplicated layout code
import ScreenWrapper from '../components/ScreenWrapper';
import NavigationPanel from '../components/organisms/NavigationPanel';
import ResponsiveCardGrid from '../components/organisms/ResponsiveCardGrid';
import { FolderGit2, Settings2 } from 'lucide-react';

export default function Timeline() {
  // ... role data processing

  return (
    <ScreenWrapper>
      <ResponsiveCardGrid
        items={roles}
        onItemClick={handleRoleClick}
        columns={1}
        className="mb-3"
      />

      <div className="mt-5">
        <NavigationPanel buttons={[
          { screen: 'CaseList', label: 'READ CASES', icon: FolderGit2, logMessage: 'NAVIGATE: case studies' },
          { screen: 'SkillsGrid', label: 'VIEW SKILLS', icon: Settings2, logMessage: 'NAVIGATE: skills matrix' }
        ]} layout="row" />
      </div>
    </ScreenWrapper>
  );
}
```

**AFTER** (Same functionality, ~5 lines of template usage)
```javascript
import { StandardScreenTemplate } from '../components/templates';
import ResponsiveCardGrid from '../components/organisms/ResponsiveCardGrid';
import { FolderGit2, Settings2 } from 'lucide-react';

export default function Timeline() {
  // ... same role data processing

  return (
    <StandardScreenTemplate
      title="experience"
      navigationButtons={[
        { screen: 'CaseList', label: 'READ CASES', icon: FolderGit2, logMessage: 'NAVIGATE: case studies' },
        { screen: 'SkillsGrid', label: 'VIEW SKILLS', icon: Settings2, logMessage: 'NAVIGATE: skills matrix' }
      ]}
    >
      <ResponsiveCardGrid
        items={roles}
        onItemClick={handleRoleClick}
        columns={1}
        className="mb-3"
      />
    </StandardScreenTemplate>
  );
}
```

**Impact**: -67% code reduction, +100% reusability

---

### DetailViewTemplate Migration

**BEFORE** (`src/app/screens/CaseDetail.js`)
```javascript
// ~80 lines of complex layout
const tabs = [
  { id: 'challenge', label: 'challenge', content: [...] },
  { id: 'approach', label: 'approach', content: [...] },
  // ... more tabs
];

return (
  <ScreenWrapper>
    <Panel><CommandTitle />{/*title*/}</Panel>
    <Tabs tabs={tabs} defaultTab="challenge" />
    {/* Navigation buttons */}
  </ScreenWrapper>
);
```

**AFTER** (Template handles all layout complexity)
```javascript
// ~25 lines, focus on data transformation
const content = [
  { label: 'challenge', content: <ChallengeSection /> },
  { label: 'approach', content: <ApproachSection /> },
  // ... more sections
];

return (
  <DetailViewTemplate
    entityType="case"
    title={caseData.title}
    metadata={metadata}
    tags={caseData.tags}
    content={content}
    displayMode="tabs"
    onBack={handleBack}
    additionalButtons={[{screen: 'SkillsGrid', ...}]}
  />
);
```

**Impact**: -70% code reduction, consistent user experience

---

### ListViewTemplate Migration

**BEFORE** (`src/app/screens/CaseList.js`)
```javascript
// ~60 lines of layout + access level logic
const accessLevel = calculateLevels(...);
const accessInfo = determineLevel(...);

return (
  <ScreenWrapper>
    <Panel>
      {/* Custom access level display */}
      <TerminalProgress ... />
      {/* Unlock hints */}
    </Panel>
    <ResponsiveCardGrid items={caseItems} onItemClick={handleClick} />
  </ScreenWrapper>
);
```

**AFTER** (Logic and presentation separated)
```javascript
// Data processing remains, layout abstracted
const accessLevel = calculateAccess(cases, totalCases);

return (
  <ListViewTemplate
    items={caseItems}
    onItemClick={handleCaseClick}
    accessLevel={{
      current: unlockedCount,
      max: totalCases,
      percentage: accessPercentage,
      label: `${unlockedCount}/${totalCases} available`
    }}
  />
);
```

**Impact**: -50% code reduction, access level handling centralized

---

## Migration Checklist

### Pre-Migration
- [ ] Identify screens with similar layouts
- [ ] Review data flow patterns (state, handlers)
- [ ] Check responsive requirements
- [ ] Validate accessibility needs

### During Migration
- [ ] Map screen properties to template props
- [ ] Extract business logic from presentation
- [ ] Test visual parity (layout, spacing, responsiveness)
- [ ] Verify interaction handlers work correctly
- [ ] Check accessibility with screen readers

### Post-Migration
- [ ] Remove unused imports
- [ ] Update component documentation
- [ ] Add to template usage examples
- [ ] Review for opportunities to use new template features

### Testing Requirements
- [ ] All 354+ tests pass
- [ ] ESLint clean (0 warnings/errors)
- [ ] Visual regression tests pass
- [ ] Accessibility audit clean
- [ ] Performance metrics unchanged

---

## Common Patterns & Solutions

### 1. Custom Item Rendering
**Problem**: Existing screen has unique item display
**Solution**: Use `renderCard` prop
```javascript
<DetailViewTemplate
  renderCard={(item, index) => <CustomItem item={item} />}
/>
```

### 2. Conditional Content Sections
**Problem**: Some screens don't need all sections
**Solution**: Filter content array
```javascript
content={[
  {label: 'Always', content: <Always />},
  hasOptional && {label: 'Optional', content: <Optional />}
].filter(Boolean)
```

### 3. State Management Preservation
**Problem**: Template doesn't manage local state
**Solution**: Keep state in screen, pass to template
```javascript
// Screen manages state
const [expanded, setExpanded] = useState(false);

// Template receives props
<ListViewTemplate
  items={items}
  isExpanded={expanded}
  onToggle={setExpanded}
/>
```

### 4. Navigation Handler Extraction
**Problem**: Templates need specific navigation patterns
**Solution**: Pass handlers as props (templates call, don't define)
```javascript
<StandardScreenTemplate
  navigationButtons={[{
    onClick: () => { logNavigation(); navigate('/destination'); },
    label: 'GO'
  }]}
/>
```

---

## Performance Considerations

### Bundle Size Monitoring
```bash
# Check bundle increase after each migration
npm run build  # Should stay < 5% above baseline
```

### Runtime Optimization
- Templates memoize expensive computations
- Use `React.memo` for complex renders
- Avoid inline objects in template props (use `useMemo`)

### Lazy Loading
```javascript
// Templates support dynamic imports for heavy content
const Cases = lazy(() => import('./screens/Cases'));

<ListViewTemplate
  items={cases}
  renderCard={(case) => <Cases case={case} />}
/>
```

---

## Troubleshooting Guide

### Common Issues

**1. Template prop mismatch**
```
Error: Property 'invalidProp' does not exist
```
**Solution**: Check template prop interface, ensure exact prop names

**2. Styling differences**
```
Layout looks off after migration
```
**Solution**: Compare template default styles, add `className` overrides if needed

**3. Handler not firing**
```
Button click does nothing
```
**Solution**: Ensure handlers passed as functions, not results: `onBack={handleBack}` not `onBack={handleBack()}`
```

**4. Missing imports**
```
Template not found in bundle
```
**Solution**: Check import from `'../components/templates'` and that component is exported in `index.js`

---

## Success Metrics

### Code Quality
- [ ] Code duplication < 10% across migrated screens
- [ ] Template functions clearly tested
- [ ] JSDoc complete for all components

### Developer Experience
- [ ] Easy to add new screens using existing templates
- [ ] Clear error messages when props are missing/invalid
- [ ] Documentation includes real examples from migrated screens

### User Experience
- [ ] No visible changes after migration
- [ ] Consistent behavior across similar screens
- [ ] Improved performance through optimized rendering
