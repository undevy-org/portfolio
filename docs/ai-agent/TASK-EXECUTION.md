# Task Execution Protocol for AI Agents

This document provides the complete step-by-step process for executing any task in the Interactive Terminal Portfolio project. Follow this protocol rigorously to ensure consistent quality and maintainability.

---

## Table of Contents

1. [Pre-Execution Phase](#pre-execution-phase)
2. [Execution Phase](#execution-phase)
3. [Testing Phase](#testing-phase)
4. [Documentation Phase](#documentation-phase)
5. [Review Phase](#review-phase)
6. [Completion Phase](#completion-phase)
7. [Blocker Handling](#blocker-handling)
8. [React Component Specifics](#react-component-specifics)

---

## Pre-Execution Phase

### Step 1: Understand the Project State

Before starting any work, establish complete context:

```bash
# Check recent changes
git log --oneline -10

# Review recent commits
git log --oneline --since="1 week ago"

# Check current branch
git branch --show-current

# Ensure you're on main and it's up to date
git checkout main
git pull origin main
```

**Verification checklist:**
- [ ] Current branch is `main`
- [ ] No uncommitted changes (`git status` is clean)
- [ ] Local main matches remote (`git pull` shows "Already up to date")
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)

### Step 2: Analyze the Task

Read and understand the complete task requirements:

**Ask yourself:**
1. What exactly needs to be implemented?
2. Which files will be affected?
3. What components/modules are involved?
4. Are there dependencies on other tasks?
5. What is the expected outcome?
6. How will success be measured?

**Risk assessment:**
- **Low risk:** New component following existing patterns
- **Medium risk:** Refactoring existing code, adding dependencies
- **High risk:** Architecture changes, breaking changes

**Decision point:** If the task is high-risk or requirements are unclear, STOP and escalate (see [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md)).

### Step 3: Review Relevant Documentation

Identify and read applicable documentation:

```bash
# For component development
cat docs/DESIGN-SYSTEM.md

# For architecture understanding
cat ARCHITECTURE.md

# For testing strategy
cat docs/TESTING.md

# For workflow protocol
cat Standard_Task_Workflow_Protocol.md
```

**Documentation map:**
- Creating UI components → `docs/DESIGN-SYSTEM.md`
- Testing components → `docs/TESTING.md` + `The_Ultimate_Testing_Algorithm.md`
- Architecture changes → `ARCHITECTURE.md`
- Deployment concerns → `docs/SETUP.md`

### Step 4: Create Feature Branch

Follow the conventional branch naming convention:

```bash
# Format: <type>/<brief-description>
git checkout -b <type>/<description>

# Examples:
git checkout -b feat/add-notification-system
git checkout -b fix/navigation-mobile-bug
git checkout -b refactor/simplify-context-structure
git checkout -b test/improve-coverage-organisms
git checkout -b docs/update-component-guidelines
```

**Branch naming rules:**
- Use lowercase and hyphens
- Keep it brief but descriptive
- Use conventional commit types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `chore`

---

## Execution Phase

### Step 5: Implement the Change

Follow these principles during implementation:

**A. Code Organization**
```
src/
├── components/
│   ├── atoms/          # Basic UI elements (Button, Input, Badge)
│   ├── molecules/      # Composite components (LogEntry, Alert)
│   ├── organisms/      # Complex components (Header, Navigation)
│   └── templates/      # Page layouts (LoadingScreen, ErrorScreen)
```

**B. Component Creation Pattern**

When creating a new component:

```javascript
// src/components/[category]/ComponentName.js

/**
 * ComponentName - Brief description
 * 
 * @param {Object} props - Component properties
 * @param {string} props.requiredProp - Description
 * @param {string} [props.optionalProp] - Description
 */
export default function ComponentName({ requiredProp, optionalProp = 'default' }) {
  // Implementation
}
```

**C. Styling Guidelines**

```javascript
// Use Tailwind classes with semantic structure
<div className="flex items-center gap-2 p-4 bg-background text-text">
  {/* Content */}
</div>

// For theme support, use CSS variables
<div className="border-terminal-green hover:bg-terminal-green/10">
  {/* Content */}
</div>
```

**D. Context Usage**

```javascript
import { useSession } from '@/contexts/SessionContext';
import { useNavigation } from '@/contexts/NavigationContext';

export default function ComponentName() {
  const { theme, sessionData } = useSession();
  const { currentScreen, navigateTo } = useNavigation();
  
  // Implementation
}
```

### Step 6: Continuous Local Validation

Test your changes continuously during development:

```bash
# Start development server
npm run dev
# → Open http://localhost:3000

# In another terminal: Run tests in watch mode
npm test -- --watch

# Run linter
npm run lint

# Check types (if using TypeScript)
npm run type-check
```

**Validation loop:**
1. Make code change
2. Visual check in browser
3. Run relevant tests
4. Fix any issues
5. Repeat

**Common issues checklist:**
- [ ] Component renders without errors
- [ ] Props are passed correctly
- [ ] State updates work as expected
- [ ] Context values are accessible
- [ ] Theme switching works
- [ ] Responsive design looks good
- [ ] No console errors or warnings

---

## Testing Phase

### Step 7: Write Comprehensive Tests

Follow the testing algorithm from `The_Ultimate_Testing_Algorithm.md`:

**A. Test File Structure**

```javascript
// ComponentName.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './ComponentName';
import { MockSessionProvider, MockNavigationProvider } from '../../../test-utils/providers';

// Helper function for rendering with context
const renderComponent = (props = {}, contextOverrides = {}) => {
  return render(
    <MockSessionProvider {...contextOverrides}>
      <MockNavigationProvider>
        <ComponentName {...props} />
      </MockNavigationProvider>
    </MockSessionProvider>
  );
};

describe('ComponentName', () => {
  // Tests go here
});
```

**B. Test Coverage Requirements**

Write tests for:
1. **Basic rendering** - Component renders without crashing
2. **Props handling** - All props display correctly
3. **User interactions** - Clicks, inputs, keyboard events
4. **State changes** - Component updates properly
5. **Context integration** - Uses context values correctly
6. **Edge cases** - Null props, empty arrays, error states
7. **Conditional rendering** - Different states/branches

**C. Test Execution**

```bash
# Run all tests
npm test

# Run tests for specific file
npm test ComponentName.test.js

# Run tests with coverage
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

**Required thresholds:**
- Statements: >80%
- Branches: >80%
- Functions: >80%
- Lines: >80%

### Step 8: Verify Build Success

```bash
# Clean build
npm run build

# Check for build errors or warnings
# Build output should be in .next/ directory

# Test production build locally (optional)
npm run start
```

**Build verification checklist:**
- [ ] No TypeScript errors
- [ ] No build warnings
- [ ] All pages compile successfully
- [ ] Static generation works (if applicable)
- [ ] Image optimization succeeds

---

## Documentation Phase

### Step 9: Update Documentation

**Integration with Standard_Task_Workflow_Protocol.md:**

This step corresponds to **Phase 3: Documentation Update** in the standard workflow.

**Required documentation updates:**

**A. Component Documentation**

If you created a new component, document it in `docs/DESIGN-SYSTEM.md`:

```markdown
### ComponentName

**Purpose:** Brief description of what this component does

**Usage:**
\```jsx
import ComponentName from '@/components/[category]/ComponentName';

<ComponentName
  requiredProp="value"
  optionalProp="value"
/>
\```

**Props:**
- `requiredProp` (string, required) - Description
- `optionalProp` (string, optional, default: 'value') - Description

**Variants:**
- Default variant
- Alternative variant

**Example:**
[Screenshot or code example]
```

**B. Architecture Documentation**

If you changed architecture, update `ARCHITECTURE.md`:
- New contexts or providers
- State management changes
- Routing modifications
- Data flow alterations

**C. Testing Documentation**

If you added new testing patterns, update `docs/TESTING.md`:
- New test utilities
- New mock patterns
- Testing strategy changes

**D. Setup/Deployment Documentation**

If you changed deployment process, update `docs/SETUP.md`:
- New environment variables
- Configuration changes
- Build process modifications

### Step 10: Write Commit Message

Follow conventional commit format from `COMMIT_CONVENTION.md`:

```bash
# Format: <type>(<scope>): <subject>
#
# <body>
#
# <footer>

# Examples:

# Simple feature
git commit -m "feat(ui): add notification badge component"

# Bug fix with scope
git commit -m "fix(navigation): correct back button behavior on mobile devices"

# With body
git commit -m "feat(auth): add Web3 wallet connection

- Implement wallet connection dialog
- Add connection state management
- Update session context with wallet address

Refs: #123"

# Breaking change
git commit -m "feat(context)!: redesign SessionContext API

BREAKING CHANGE: SessionContext now uses a single state object
instead of separate useState hooks. Consumers must update imports.

Migration guide:
- Old: const { theme, setTheme } = useSession();
- New: const { theme } = useSession(); and setTheme(newTheme);

Refs: #456"
```

**Commit message rules:**
- Keep subject line under 50 characters
- Use imperative mood ("add feature" not "added feature")
- No period at the end of subject
- Separate subject from body with blank line
- Body explains what and why, not how
- Reference issues in footer

### Step 11: Stage and Commit Changes

```bash
# Check what changed
git status

# Review changes
git diff

# Stage specific files
git add src/components/atoms/NewComponent.js
git add src/components/atoms/NewComponent.test.js
git add docs/DESIGN-SYSTEM.md

# Or stage all changes (use carefully)
git add .

# Commit with message
git commit -m "feat(ui): add notification badge component"

# Verify commit
git log -1 --stat
```

---

## Review Phase

### Step 12: Push Branch and Create Pull Request

**Integration with Standard_Task_Workflow_Protocol.md:**

This step corresponds to **Phase 4: Code Review & Continuous Integration**.

```bash
# Push your branch to GitHub
git push origin feat/add-notification-system

# If this is your first push for this branch
git push --set-upstream origin feat/add-notification-system
```

**On GitHub:**

1. Click "Compare & pull request" button
2. Fill in PR template:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Added NotificationBadge component
- Updated DESIGN-SYSTEM.md with new component
- Added comprehensive tests

## Testing
- [ ] All tests pass locally
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Documentation
- [ ] Updated relevant documentation
- [ ] Added/updated code comments
- [ ] Updated DESIGN-SYSTEM.md (if applicable)

## Screenshots (if applicable)
[Add screenshots or GIFs]

## Checklist
- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
```

### Step 13: Monitor CI Checks

The CI pipeline will automatically run:

1. **Linter** - Code style verification
2. **Tests** - Full test suite
3. **Build** - Production build verification

**CI Workflow:**
```
Pull Request Created
    ↓
CI Pipeline Triggered (ci.yml)
    ↓
┌─────────┬─────────┬─────────┐
│ Linter  │  Tests  │  Build  │
└─────────┴─────────┴─────────┘
    ↓
All Checks Pass ✅
    ↓
Merge Button Enabled
```

**If CI fails:**

1. Review the error logs on GitHub
2. Fix the issue locally
3. Commit the fix
4. Push to the same branch
5. CI will run again automatically

```bash
# Fix the issue
# ... make changes ...

# Commit fix
git add .
git commit -m "fix(tests): correct test assertion"

# Push - this triggers CI again
git push
```

### Step 14: Address Review Feedback

**When reviewer requests changes:**

1. Read all feedback carefully
2. Make requested changes
3. Commit with descriptive messages
4. Push to the same branch
5. Respond to comments on GitHub

```bash
# Make changes based on review
# ... fix issues ...

# Commit with reference to review
git add .
git commit -m "refactor(ui): simplify component logic per review"

# Push updates
git push
```

**Review conversation example:**

Reviewer comment:
> Consider extracting this logic into a custom hook for reusability

Your response:
> Good suggestion! I've extracted it into `useNotificationState` hook in `src/hooks/useNotificationState.js` and added tests. Updated in commit abc123.

---

## Completion Phase

### Step 15: Merge Pull Request

**Integration with Standard_Task_Workflow_Protocol.md:**

This step corresponds to **Phase 4: Code Review & CI** (merge step).

**When all checks pass:**

1. Get approval from reviewer
2. Use **"Squash and merge"** option on GitHub
3. Confirm merge

**Why squash merge?**
- Keeps main branch history clean
- One commit per feature/fix
- Easier to revert if needed
- Better changelog generation

**After merge:**
- GitHub Actions will automatically deploy to staging
- Production deployment requires a version tag (see release process)

### Step 16: Cleanup

```bash
# Switch back to main
git checkout main

# Pull the merged changes
git pull origin main

# Delete local branch
git branch -D feat/add-notification-system

# Delete remote branch (if not auto-deleted by GitHub)
git push origin --delete feat/add-notification-system
```

### Step 17: Verify Deployment

**Staging verification:**

Wait for automatic deployment to staging environment:

1. Check GitHub Actions for deployment status
2. Visit staging environment
3. Verify your changes are live
4. Test functionality in staging

**If staging deployment fails:**
- Review deployment logs in GitHub Actions
- Check for environment-specific issues
- Fix and create a new PR if needed

---

## Blocker Handling

### When You're Blocked

**Definition of a blocker:**
- Requirements are unclear or contradictory
- Technical approach is uncertain
- Breaking change might be needed
- External dependency missing
- Architectural decision required

**Blocker protocol:**

1. **Stop work immediately** - Don't waste time guessing
2. **Document the blocker** using the format from COMMUNICATION-PROTOCOL.md
3. **Escalate properly** - Create a discussion issue on GitHub
4. **Move to next task** - Don't wait idle

### Blocker Documentation Format

Create a GitHub Discussion with this template:

```markdown
## 🚧 Blocker: [Brief Description]

**Task:** [Which task you were working on]
**Priority:** HIGH / MEDIUM / LOW
**Estimated Impact:** [Time lost if not resolved]

### Current Understanding
[What you know about the task so far]

### The Blocker
[What specifically is blocking you]

### Specific Questions
1. Question one?
2. Question two?
3. Question three?

### Possible Approaches
[If you have ideas, list them]
1. Approach A: ...
2. Approach B: ...

### Current State
- **Branch:** [Your current branch if work started]
- **Files Affected:** [List of files]
- **Code Written:** [Amount/description]
- **Can Be Reviewed:** YES / NO

### What I Need
[Specific information or decision needed to proceed]
```

### Blocker Priority Levels

**HIGH Priority:**
- Blocks critical features
- Affects multiple tasks
- Deadline approaching
- Breaking changes involved

**MEDIUM Priority:**
- Blocks single task
- Workaround might exist
- Non-critical feature

**LOW Priority:**
- Nice-to-have clarification
- Optimization question
- Documentation improvement

### Moving Forward

**While waiting for blocker resolution:**

1. **Document your progress**
   ```bash
   git add .
   git commit -m "wip: notification system - blocked on API design"
   git push origin feat/add-notification-system
   ```

2. **Create WIP PR** (Work In Progress)
   - Mark as draft
   - Explain the blocker in description
   - Link to the discussion

3. **Switch to different task**
   - Review CHANGELOG.md for other tasks
   - Pick something unrelated
   - Follow this same protocol

---

## React Component Specifics

### Component Development Checklist

**For new components:**

- [ ] **Structure**
  - [ ] Component file in correct category (atoms/molecules/organisms/templates)
  - [ ] Test file alongside component
  - [ ] Proper imports and exports

- [ ] **Props**
  - [ ] PropTypes or TypeScript types defined
  - [ ] Default values for optional props
  - [ ] Props documented with JSDoc comments

- [ ] **Context Integration**
  - [ ] Uses SessionContext if theme-dependent
  - [ ] Uses NavigationContext if navigation-related
  - [ ] Context providers wrapped in tests

- [ ] **Styling**
  - [ ] Tailwind classes used consistently
  - [ ] Theme variables used (e.g., `text-text`, `bg-background`)
  - [ ] Responsive design considered
  - [ ] All themes tested

- [ ] **Testing**
  - [ ] Renders without crashing
  - [ ] Props render correctly
  - [ ] User interactions work
  - [ ] Context integration tested
  - [ ] Edge cases covered
  - [ ] Coverage >80%

- [ ] **Documentation**
  - [ ] Added to DESIGN-SYSTEM.md
  - [ ] Usage examples provided
  - [ ] Props documented
  - [ ] Variants explained

### Common Patterns

**Pattern 1: Simple Presentational Component**

```javascript
// src/components/atoms/Badge.js

/**
 * Badge - Display small labeled status indicators
 * 
 * @param {Object} props
 * @param {string} props.label - Badge text
 * @param {string} [props.variant='default'] - Visual variant
 */
export default function Badge({ label, variant = 'default' }) {
  const variantClasses = {
    default: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}
```

**Pattern 2: Component with State**

```javascript
// src/components/molecules/Accordion.js

import { useState } from 'react';

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-terminal-green">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left hover:bg-terminal-green/10"
      >
        {title}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-terminal-green">
          {children}
        </div>
      )}
    </div>
  );
}
```

**Pattern 3: Component with Context**

```javascript
// src/components/organisms/ThemeToggle.js

import { useSession } from '@/contexts/SessionContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useSession();

  const themes = ['dark', 'light', 'amber', 'synthwave'];

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-background text-text border border-terminal-green"
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
```

### Testing React Components

**Follow The_Ultimate_Testing_Algorithm.md:**

1. Read component completely
2. Identify dependencies
3. Map rendering conditions
4. List user interactions
5. Create test file with provider wrapper
6. Write progressive tests (simple → complex)
7. Clean up and organize

**Example test structure:**

```javascript
describe('Accordion', () => {
  describe('Rendering', () => {
    it('should render with title', () => {
      renderComponent({ title: 'Test' });
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should initially be closed', () => {
      renderComponent({ title: 'Test', children: 'Content' });
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should open on click', () => {
      renderComponent({ title: 'Test', children: 'Content' });
      
      fireEvent.click(screen.getByText('Test'));
      
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should close when opened and clicked again', () => {
      renderComponent({ title: 'Test', children: 'Content' });
      
      // Open
      fireEvent.click(screen.getByText('Test'));
      expect(screen.getByText('Content')).toBeInTheDocument();
      
      // Close
      fireEvent.click(screen.getByText('Test'));
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });
});
```

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm test                 # Run tests
npm run lint             # Check code style
npm run build            # Build for production

# Git workflow
git checkout main        # Switch to main
git pull origin main     # Update main
git checkout -b feat/X   # Create feature branch
git add .                # Stage changes
git commit -m "feat: X"  # Commit with message
git push origin feat/X   # Push branch

# After merge
git checkout main        # Back to main
git pull origin main     # Get merged changes
git branch -D feat/X     # Delete local branch
```

### Decision Tree

```
Task assigned
    ↓
Requirements clear? ─NO→ Escalate to human
    ↓ YES
Risk level? ─HIGH→ Escalate to human
    ↓ LOW/MEDIUM
Create branch
    ↓
Implement
    ↓
Write tests
    ↓
Update docs
    ↓
Commit & push
    ↓
Create PR
    ↓
CI checks pass? ─NO→ Fix issues
    ↓ YES
Get review
    ↓
Approved? ─NO→ Address feedback
    ↓ YES
Merge (squash)
    ↓
Cleanup
    ↓
Done ✅
```

### When to Ask Questions

- **Requirements unclear** → Ask immediately
- **Technical approach uncertain** → Ask before coding
- **Breaking change needed** → Ask before implementing
- **Stuck for >15 minutes** → Ask for guidance
- **CI failing mysteriously** → Ask for help
- **Review feedback unclear** → Ask for clarification

---

## Summary

**Key principles:**

1. **Always start from clean main branch**
2. **Understand before implementing**
3. **Test continuously during development**
4. **Document all changes**
5. **Follow conventional commit format**
6. **Use squash merge for clean history**
7. **Clean up after merge**
8. **Escalate blockers immediately**

**Success = Task completed + Tests passing + Docs updated + PR merged + Branch cleaned up**

Follow this protocol for every task, and you'll maintain high quality while working autonomously.

---

**Related Documents:**
- [Standard_Task_Workflow_Protocol.md](../../Standard_Task_Workflow_Protocol.md) - Official workflow protocol
- [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md) - How to communicate with team
- [DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md) - When to act autonomously
- [The_Ultimate_Testing_Algorithm.md](../../The_Ultimate_Testing_Algorithm.md) - Testing methodology
- [COMMIT_CONVENTION.md](../../COMMIT_CONVENTION.md) - Commit message format