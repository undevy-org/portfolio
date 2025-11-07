# AI Agent Workflow Guide

This document defines the complete development cycle for autonomous AI agents working on the Interactive Terminal Portfolio project. Follow this workflow for every task to ensure consistent quality and maintainability.

---

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Task Selection & Assessment](#task-selection--assessment)
3. [Development Cycle](#development-cycle)
4. [Quality Standards](#quality-standards)
5. [Git Workflow](#git-workflow)
6. [Testing Requirements](#testing-requirements)
7. [Documentation Requirements](#documentation-requirements)
8. [Review Process](#review-process)
9. [Deployment & Release](#deployment--release)
10. [Common Scenarios](#common-scenarios)

---

## Workflow Overview

### The Complete Cycle

```
Select Task → Assess Risk → Create Branch → Implement → Test → Document → PR → Review → Merge → Deploy
```

### Time Estimates by Task Type

| Task Type | Time Estimate | Complexity |
|-----------|---------------|------------|
| Small bug fix | 1-2 hours | Low |
| New component | 2-4 hours | Low-Medium |
| Component refactor | 3-6 hours | Medium |
| New feature | 4-8 hours | Medium-High |
| Architecture change | 8+ hours | High |

### Success Criteria

A task is complete when:
- ✅ All tests pass (including new tests)
- ✅ Linter passes with no errors
- ✅ Build succeeds
- ✅ Documentation is updated
- ✅ PR is approved and merged
- ✅ Changes deploy successfully to staging

---

## Task Selection & Assessment

### Phase 1: Finding Work

**Option A: Review Recent Changes (Recommended)**

```bash
# Check recent activity
git log --oneline --since="2 weeks ago"

# View recent releases
cat CHANGELOG.md | head -100

# Check development phases
cat docs/DEVELOPMENT_HISTORY.md | grep "Phase"
```

Look for:
- Incomplete features mentioned
- Areas marked for improvement
- Test coverage gaps
- Documentation needing updates
- Code marked with TODO comments

**Option B: Check Open Issues**

Review GitHub Issues for:
- `good-first-issue` label
- `enhancement` label
- `bug` label matching your expertise
- Issues in current project phase

**Option C: Propose Improvements**

If you identify improvement opportunities:
1. Verify it's not already planned
2. Check alignment with project direction (review CHANGELOG.md trends)
3. Create proposal issue before implementing
4. Get approval for architectural changes

### Phase 2: Task Assessment

Use the **Risk Assessment Framework:**

**LOW RISK** (Proceed independently)
- Adding new component following existing patterns
- Writing missing tests
- Fixing typos/documentation
- Adding CSS classes per design system
- Small UI improvements within established screens

**MEDIUM RISK** (Document approach, proceed)
- Refactoring existing components
- Adding new npm dependencies
- Modifying CI/CD workflows
- Changing theme configurations
- Adding new API routes
- Performance optimizations

**HIGH RISK** (Always ask first)
- Breaking changes to public APIs
- Architecture modifications
- SessionContext structure changes
- NavigationContext structure changes
- Web3 integration changes
- Multi-domain logic changes
- Database or content schema changes

**Decision Point:**
- Low risk → Proceed to Phase 3
- Medium risk → Document approach in PR, proceed
- High risk → Stop and escalate (see COMMUNICATION-PROTOCOL.md)

### Phase 3: Requirements Verification

**Ask yourself:**
1. Do I understand what needs to be done?
2. Do I know how to implement it?
3. Are there dependencies I need to wait for?
4. Is this aligned with project direction?
5. Do I have all information needed?

**If NO to any:**
- Document specific questions
- Use COMMUNICATION-PROTOCOL.md format
- Get clarification before proceeding

**If YES to all:**
- Proceed to Development Cycle

---

## Development Cycle

### Phase 1: Preparation

**1.1. Sync with Main Branch**

```bash
# Ensure you're on main
git checkout main

# Get latest changes
git pull origin main

# Verify clean state
git status  # Should show "nothing to commit, working tree clean"

# Verify tests pass
npm test

# Verify build works
npm run build
```

**1.2. Create Feature Branch**

Follow conventional branch naming:

```bash
# Format: <type>/<brief-description>
git checkout -b <type>/<description>
```

**Branch naming examples:**
```bash
# Features
git checkout -b feat/notification-badge
git checkout -b feat/dark-mode-improvements

# Fixes
git checkout -b fix/navigation-mobile-bug
git checkout -b fix/theme-switching-delay

# Refactoring
git checkout -b refactor/simplify-context
git checkout -b refactor/extract-custom-hook

# Tests
git checkout -b test/improve-coverage-atoms
git checkout -b test/add-integration-tests

# Documentation
git checkout -b docs/update-component-guide
git checkout -b docs/add-testing-examples

# Performance
git checkout -b perf/optimize-bundle-size
git checkout -b perf/lazy-load-components

# Chores
git checkout -b chore/update-dependencies
git checkout -b chore/cleanup-unused-code
```

**1.3. Plan Implementation**

Before coding, plan your approach:
- Which files will be affected?
- What components/functions will change?
- What new files are needed?
- How will this be tested?
- What documentation needs updating?

Write this down in notes or PR description draft.

### Phase 2: Implementation

**2.1. Follow Project Structure**

Respect the atomic design hierarchy:

```javascript
// src/components/atoms/ - Basic UI elements
// Example: Button, Input, Badge, Icon
export default function Button({ children, variant = 'primary', onClick }) {
  const variants = {
    primary: 'bg-terminal-green text-background',
    secondary: 'bg-gray-500 text-white',
  };
  
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

// src/components/molecules/ - Composite components
// Example: LogEntry, Alert, Accordion
export default function Alert({ message, type = 'info' }) {
  // Uses atoms: Icon, Button
  return (
    <div className="flex items-center gap-2 p-4 border">
      <Icon name={type} />
      <span>{message}</span>
    </div>
  );
}

// src/components/organisms/ - Complex components
// Example: Header, Navigation, Timeline
export default function Header() {
  // Uses molecules and atoms
  // More complex logic and state
}

// src/components/templates/ - Page layouts
// Example: LoadingScreen, ErrorScreen, MainHub
export default function LoadingScreen() {
  // Composes organisms, molecules, atoms
  // Defines page structure
}
```

**2.2. Code Quality Standards**

**Component Structure:**
```javascript
// File: src/components/[category]/ComponentName.js

/**
 * ComponentName - Brief description
 * 
 * @param {Object} props - Component properties
 * @param {string} props.required - Required prop
 * @param {string} [props.optional='default'] - Optional prop with default
 * @returns {JSX.Element}
 */
export default function ComponentName({ required, optional = 'default' }) {
  // 1. Hooks (always at top)
  const { theme } = useSession();
  const [state, setState] = useState(initialState);
  
  // 2. Derived values
  const computedValue = useMemo(() => {
    return expensive(state);
  }, [state]);
  
  // 3. Event handlers
  const handleClick = useCallback(() => {
    setState(newState);
  }, []);
  
  // 4. Effects (if needed)
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 5. Render logic
  if (!required) return null;
  
  return (
    <div className="flex items-center">
      {/* JSX */}
    </div>
  );
}
```

**Styling Guidelines:**
```javascript
// Use Tailwind utility classes
<div className="flex items-center gap-2 p-4">

// Use theme variables for colors
<div className="bg-background text-text border-terminal-green">

// For hover/focus states
<button className="hover:bg-terminal-green/10 focus:ring-2 focus:ring-terminal-green">

// Responsive design
<div className="flex flex-col md:flex-row gap-4">

// Conditional classes
<div className={`base-class ${isActive ? 'active-class' : 'inactive-class'}`}>
```

**Context Usage:**
```javascript
import { useSession } from '@/contexts/SessionContext';
import { useNavigation } from '@/contexts/NavigationContext';

export default function Component() {
  // SessionContext - for theme, auth, global state
  const { 
    theme,           // Current theme
    sessionData,     // Content data
    isAuthenticated, // Auth status
    setTheme         // Theme setter
  } = useSession();
  
  // NavigationContext - for navigation
  const { 
    currentScreen,   // Current screen
    navigateTo,      // Navigate to screen
    canGoBack,       // Can go back?
    goBack           // Go back
  } = useNavigation();
  
  // Use contexts appropriately
  return <div className="text-text">{sessionData.title}</div>;
}
```

**2.3. Continuous Validation**

Run these frequently during development:

```bash
# Terminal 1: Development server
npm run dev
# → http://localhost:3000
# → Hot reload on changes
# → Check browser console for errors

# Terminal 2: Test watch mode
npm test -- --watch
# → Re-runs tests on changes
# → Shows immediate feedback

# As needed: Linter
npm run lint
# → Fix style issues as you go

# Before commit: Build
npm run build
# → Verify production build works
```

**Validation checklist:**
- [ ] Component renders correctly
- [ ] Props work as expected
- [ ] State updates properly
- [ ] Context values accessible
- [ ] All themes look good
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] No console warnings

---

## Quality Standards

### Code Quality

**Required:**
- ✅ No linter errors
- ✅ No console errors or warnings
- ✅ PropTypes or TypeScript types defined
- ✅ JSDoc comments on all exports
- ✅ Meaningful variable/function names
- ✅ DRY principle applied
- ✅ No hardcoded values (use constants/config)

**Recommended:**
- 📝 Extract complex logic to custom hooks
- 📝 Keep components small (<200 lines)
- 📝 Use composition over inheritance
- 📝 Prefer functional components
- 📝 Use meaningful commit messages

### Performance Standards

**Required:**
- ✅ No unnecessary re-renders
- ✅ Lazy loading for large components
- ✅ Optimized images
- ✅ Minimal bundle size increase (<100KB)

**Check bundle size:**
```bash
npm run build
# Check .next/static/chunks/ sizes
```

### Accessibility Standards

**Required:**
- ✅ Semantic HTML elements
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Sufficient color contrast
- ✅ Focus indicators visible

---

## Git Workflow

### Integration with Standard_Task_Workflow_Protocol.md

This section implements the official workflow defined in Standard_Task_Workflow_Protocol.md. Follow these steps precisely.

### Commit Process

**Stage changes:**
```bash
# Review what changed
git status
git diff

# Stage specific files (preferred)
git add src/components/atoms/NewComponent.js
git add src/components/atoms/NewComponent.test.js

# Or stage all (use carefully)
git add .
```

**Commit with conventional format:**

Reference: [COMMIT_CONVENTION.md](../../COMMIT_CONVENTION.md)

```bash
# Format: <type>(<scope>): <subject>
git commit -m "type(scope): description"

# Examples:
git commit -m "feat(ui): add notification badge component"
git commit -m "fix(navigation): correct back button on mobile"
git commit -m "test(atoms): improve button test coverage"
git commit -m "docs(design): update badge usage examples"
git commit -m "refactor(hooks): simplify useTheme logic"
```

**Commit types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (not CSS)
- `refactor`: Code restructure
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**For breaking changes:**
```bash
git commit -m "feat(context)!: redesign SessionContext API

BREAKING CHANGE: SessionContext now uses single state object.
Migration guide: [details]

Refs: #123"
```

### Push and Pull Request

**Push branch:**
```bash
# First push
git push -u origin feat/notification-badge

# Subsequent pushes
git push
```

**Create Pull Request:**

On GitHub, use this PR template:

```markdown
## Description
[Clear explanation of what this PR does]

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Motivation and Context
[Why is this needed? What problem does it solve?]

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] All existing tests pass
- [ ] Added tests for new features
- [ ] Manual testing completed
- [ ] Tested in multiple themes
- [ ] Tested responsive design
- [ ] No console errors

### Test Results
```
Test Suites: X passed, X total
Tests:       X passed, X total
Coverage:    X%
```

## Documentation
- [ ] Code comments added
- [ ] DESIGN-SYSTEM.md updated (if applicable)
- [ ] ARCHITECTURE.md updated (if applicable)
- [ ] No documentation changes needed

## Screenshots
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests prove fix/feature works
- [ ] All tests pass locally
```

---

## Testing Requirements

### Comprehensive Testing Strategy

Reference: [TESTING.md](../TESTING.md) and [The_Ultimate_Testing_Algorithm.md](../../The_Ultimate_Testing_Algorithm.md)

**Every component must have:**

1. **Rendering Tests**
   - Renders without crashing
   - Renders with default props
   - Renders with all prop variations

2. **Props Tests**
   - Required props display correctly
   - Optional props work
   - Default props apply

3. **Interaction Tests**
   - Click handlers fire
   - Input changes work
   - Keyboard events work
   - Form submissions work

4. **State Tests**
   - State updates correctly
   - State changes trigger re-render
   - State persists appropriately

5. **Context Tests**
   - Uses context values correctly
   - Responds to context changes
   - Works with different context values

6. **Edge Case Tests**
   - Null/undefined props
   - Empty arrays
   - Error states
   - Loading states

### Test Structure

```javascript
// ComponentName.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './ComponentName';
import { MockSessionProvider } from '../../../test-utils/providers';

// Helper function
const renderComponent = (props = {}, contextOverrides = {}) => {
  return render(
    <MockSessionProvider {...contextOverrides}>
      <ComponentName {...props} />
    </MockSessionProvider>
  );
};

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      renderComponent();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    it('should display prop values correctly', () => {
      renderComponent({ label: 'Test' });
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
  
  describe('User Interactions', () => {
    it('should handle click events', () => {
      const handleClick = jest.fn();
      renderComponent({ onClick: handleClick });
      
      fireEvent.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('Context Integration', () => {
    it('should use theme from context', () => {
      renderComponent({}, { theme: 'dark' });
      
      const element = screen.getByTestId('themed-element');
      expect(element).toHaveClass('dark-theme');
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle null props gracefully', () => {
      renderComponent({ data: null });
      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });
});
```

### Coverage Requirements

**Minimum thresholds:**
- Statements: >80%
- Branches: >80%
- Functions: >80%
- Lines: >80%

**Check coverage:**
```bash
npm test -- --coverage

# View detailed report
open coverage/lcov-report/index.html
```

---

## Documentation Requirements

### What to Document

Reference: Standard_Task_Workflow_Protocol.md Phase 3

**For new components:**
Update [docs/DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md):

```markdown
### ComponentName

**Purpose:** Brief description

**Category:** Atom / Molecule / Organism / Template

**Usage:**
\```jsx
import ComponentName from '@/components/[category]/ComponentName';

<ComponentName
  required="value"
  optional="value"
/>
\```

**Props:**
- `required` (string, required) - Description
- `optional` (string, optional, default: 'value') - Description

**Variants:**
- `default` - Default appearance
- `alternative` - Alternative style

**Examples:**
\```jsx
// Basic usage
<ComponentName required="value" />

// With optional props
<ComponentName required="value" optional="custom" />
\```

**Theme Support:**
All themes supported. Uses `bg-background` and `text-text` variables.
```

**For architecture changes:**
Update [ARCHITECTURE.md](../../ARCHITECTURE.md):
- New contexts or providers
- State management changes
- Routing modifications
- Data flow changes

**For testing patterns:**
Update [docs/TESTING.md](../TESTING.md):
- New test utilities
- New mock patterns
- Testing strategy changes

**For deployment changes:**
Update [docs/SETUP.md](../SETUP.md):
- Environment variables
- Configuration changes
- Build process modifications

### Code Comments

**Required comments:**
```javascript
/**
 * Function description
 * 
 * @param {string} param1 - Description
 * @param {number} param2 - Description
 * @returns {boolean} Description
 */
function complexFunction(param1, param2) {
  // Complex logic explanation
  const result = doSomething();
  
  // Why this workaround is needed
  if (edgeCase) {
    return handleEdgeCase();
  }
  
  return result;
}
```

**Don't comment:**
- Obvious code
- What code does (code should be self-explanatory)
- Commented-out code (delete it)

**Do comment:**
- Why code exists
- Complex algorithms
- Workarounds
- Performance optimizations
- Security considerations

---

## Review Process

### CI/CD Pipeline

When you create a PR, CI automatically runs:

```
Pull Request Created
    ↓
CI Pipeline (ci.yml)
    ↓
┌─────────┬─────────┬─────────┐
│ Linter  │  Tests  │  Build  │
│ (1 min) │ (3 min) │ (2 min) │
└─────────┴─────────┴─────────┘
    ↓
All Pass? → Merge button enabled
    ↓
Fail? → Fix and push again
```

**If CI fails:**
1. Read error logs carefully
2. Fix the issue locally
3. Test the fix
4. Commit and push
5. CI runs again automatically

### Review Expectations

**Reviewer will check:**
- Code quality and clarity
- Test coverage
- Documentation completeness
- Adherence to patterns
- Performance implications
- Security considerations

**Your responsibilities:**
- Respond to all comments
- Address all requested changes
- Ask for clarification if needed
- Update PR description if scope changes

### Responding to Reviews

**For requested changes:**
```markdown
✅ Done - Extracted to custom hook in commit [abc123]

Files:
- src/hooks/useNotification.js
- src/hooks/useNotification.test.js
```

**For questions:**
```markdown
Good question! Here's my reasoning:

[Explanation]

However, if you prefer [alternative], I'm happy to change it.
```

**For disagreements:**
```markdown
I understand your concern. Here's my thinking:

[Your reasoning]

I'm open to discussing alternatives. What do you think about:
- Option A: [description]
- Option B: [description]
```

---

## Deployment & Release

### Automatic Staging Deployment

**After PR merge:**
```
PR Merged to main
    ↓
CI runs again
    ↓
Build artifact created
    ↓
Staging Deploy (staging-deploy.yml)
    ↓
Deploy to staging environment
    ↓
Verify at staging URL
```

**Staging verification:**
1. Wait for deployment to complete (check GitHub Actions)
2. Visit staging environment
3. Test your changes
4. Verify no regressions

### Production Release

**Production deploys require a version tag:**

```bash
# Update local main
git checkout main
git pull origin main

# Create release (automatically determines version)
npm run release

# Or manually specify version type
npm run release -- --release-as patch  # Bug fixes
npm run release -- --release-as minor  # New features
npm run release -- --release-as major  # Breaking changes

# Push release
git push --follow-tags origin main
```

**This triggers:**
1. CHANGELOG.md update
2. Version bump in package.json
3. Git tag creation
4. GitHub Release creation
5. Production deployment
6. Automated release notes

---

## Common Scenarios

### Scenario 1: Adding a New Component

**Example: Adding a NotificationBadge component**

1. **Plan**
   - Location: `src/components/atoms/NotificationBadge.js`
   - Props: `count`, `variant`
   - Tests: rendering, variants, count display, zero state

2. **Create branch**
   ```bash
   git checkout -b feat/notification-badge
   ```

3. **Implement**
   ```javascript
   // src/components/atoms/NotificationBadge.js
   export default function NotificationBadge({ count, variant = 'default' }) {
     if (count === 0) return null;
     
     const displayCount = count > 99 ? '99+' : count;
     
     return (
       <span className="badge">{displayCount}</span>
     );
   }
   ```

4. **Write tests**
   ```javascript
   // src/components/atoms/NotificationBadge.test.js
   describe('NotificationBadge', () => {
     it('should render count', () => { /* test */ });
     it('should show 99+ for count > 99', () => { /* test */ });
     it('should not render when count is 0', () => { /* test */ });
   });
   ```

5. **Update docs**
   Add to DESIGN-SYSTEM.md with usage examples

6. **Commit and PR**
   ```bash
   git add .
   git commit -m "feat(ui): add notification badge component"
   git push -u origin feat/notification-badge
   ```

### Scenario 2: Fixing a Bug

**Example: Navigation back button not working on mobile**

1. **Reproduce bug**
   - Test on mobile
   - Identify root cause
   - Verify in code

2. **Create branch**
   ```bash
   git checkout -b fix/navigation-mobile-bug
   ```

3. **Implement fix**
   ```javascript
   // Fix the issue
   const handleBack = () => {
     if (window.innerWidth < 768) {
       // Mobile-specific fix
       goBack();
     } else {
       // Desktop behavior
       goBack();
     }
   };
   ```

4. **Add test**
   ```javascript
   it('should handle back button on mobile', () => {
     // Mock mobile viewport
     global.innerWidth = 375;
     // Test back button
   });
   ```

5. **Commit and PR**
   ```bash
   git commit -m "fix(navigation): correct back button behavior on mobile devices"
   ```

### Scenario 3: Refactoring

**Example: Extracting common logic to custom hook**

1. **Identify pattern**
   - Multiple components use same logic
   - Good candidate for extraction

2. **Create branch**
   ```bash
   git checkout -b refactor/extract-use-theme-hook
   ```

3. **Create hook**
   ```javascript
   // src/hooks/useTheme.js
   export function useTheme() {
     const { theme, setTheme } = useSession();
     
     const isDark = theme === 'dark';
     const isLight = theme === 'light';
     
     return { theme, setTheme, isDark, isLight };
   }
   ```

4. **Update components**
   Replace duplicated logic with hook

5. **Write tests**
   Test the hook in isolation

6. **Commit and PR**
   ```bash
   git commit -m "refactor(hooks): extract theme logic to useTheme hook

   - Created useTheme custom hook
   - Updated 5 components to use hook
   - Reduced code duplication by ~30 lines"
   ```

---

## Quick Reference

### Daily Workflow

```bash
# Morning: Sync with main
git checkout main && git pull origin main

# Start work
git checkout -b feat/your-feature

# During work
npm run dev    # Terminal 1
npm test -- --watch  # Terminal 2

# Before commit
npm test && npm run lint && npm run build

# Commit and push
git add .
git commit -m "feat(scope): description"
git push

# After merge
git checkout main && git pull origin main
git branch -D feat/your-feature
```

### Decision Tree

```
Task selected
    ↓
Requirements clear? ─NO→ Ask questions
    ↓ YES
Risk assessment
    ↓
High risk? ─YES→ Get approval first
    ↓ NO
Create branch
    ↓
Implement + test + document
    ↓
Tests pass? ─NO→ Fix tests
    ↓ YES
Lint pass? ─NO→ Fix lint
    ↓ YES
Build pass? ─NO→ Fix build
    ↓ YES
Commit + push + PR
    ↓
CI pass? ─NO→ Fix issues
    ↓ YES
Get review
    ↓
Changes requested? ─YES→ Address feedback
    ↓ NO
Merge
    ↓
Verify staging
    ↓
Done! 🎉
```

### Essential Commands

```bash
# Development
npm run dev          # Start dev server
npm test             # Run all tests
npm test -- --watch  # Watch mode
npm run lint         # Check style
npm run build        # Production build

# Git
git status           # Check status
git diff             # See changes
git log --oneline -10  # Recent commits
git branch --show-current  # Current branch

# Testing
npm test Button.test.js  # Specific file
npm test -- --coverage   # With coverage
npm test -- --testNamePattern="renders"  # Pattern match
```

---

## Summary

**Key Principles:**

1. **Quality over speed** - Take time to do it right
2. **Test everything** - No code without tests
3. **Document changes** - Keep docs current
4. **Follow patterns** - Consistency matters
5. **Ask when uncertain** - Better than guessing
6. **Review carefully** - Learn from feedback
7. **Deploy incrementally** - Small, safe changes

**Success = Reliable, maintainable code that ships**

Follow this workflow for every task, and you'll maintain high quality while working autonomously.

---

**Related Documents:**
- [GETTING-STARTED.md](GETTING-STARTED.md) - Project orientation
- [DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md) - Autonomy guidelines
- [TASK-EXECUTION.md](TASK-EXECUTION.md) - Detailed procedures
- [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md) - How to communicate
- [Standard_Task_Workflow_Protocol.md](../../Standard_Task_Workflow_Protocol.md) - Official protocol
- [TESTING.md](../TESTING.md) - Testing strategy
- [COMMIT_CONVENTION.md](../../COMMIT_CONVENTION.md) - Commit format