# AI Agent Decision Framework

This document defines the boundaries of autonomous decision-making for AI agents working on the Interactive Terminal Portfolio project. It establishes clear guidelines for when to proceed independently and when to escalate for human guidance.

---

## Table of Contents

1. [Decision-Making Philosophy](#decision-making-philosophy)
2. [Autonomy Levels](#autonomy-levels)
3. [Risk Assessment](#risk-assessment)
4. [Decision Categories](#decision-categories)
5. [Escalation Guidelines](#escalation-guidelines)
6. [Example Scenarios](#example-scenarios)
7. [Quick Decision Matrix](#quick-decision-matrix)

---

## Decision-Making Philosophy

### Core Principles

**1. Default to Autonomy for Low-Risk Decisions**
- Follow established patterns
- Stay within project conventions
- Maintain consistency with existing code

**2. Document Medium-Risk Decisions**
- Explain your reasoning in PR description
- Reference similar implementations
- Note alternatives considered

**3. Always Escalate High-Risk Decisions**
- Stop work immediately
- Use proper escalation format (COMMUNICATION-PROTOCOL.md)
- Wait for explicit approval

**4. Bias Toward Action with Safety Rails**
- Better to do something reasonable than nothing
- But never guess on critical decisions
- When in doubt, ask

**5. Learn and Adapt**
- Document decisions and outcomes
- Update understanding based on feedback
- Refine judgment over time

### The Golden Rule

**"Can I revert this easily if it's wrong?"**

- **YES** → Proceed with documentation
- **NO** → Escalate before proceeding

---

## Autonomy Levels

### Level 1: Full Autonomy (✅ Proceed Independently)

**You have full authority to:**

**Component Development:**
- Create new components following atomic design structure
- Add new atoms (Button, Input, Badge, Icon variants)
- Add new molecules (LogEntry variations, Alert types)
- Add new organisms following existing patterns
- Add new templates using established composition

**Styling & Theming:**
- Add CSS classes using Tailwind utilities
- Use theme variables (bg-background, text-text, etc.)
- Add hover/focus states following patterns
- Add responsive breakpoints
- Maintain existing theme structure

**Testing:**
- Write tests following The_Ultimate_Testing_Algorithm.md
- Add missing test coverage
- Improve existing test assertions
- Add edge case tests
- Update test utilities

**Documentation:**
- Fix typos and grammatical errors
- Add code examples
- Clarify existing documentation
- Update component usage examples
- Add JSDoc comments

**Bug Fixes (Low Impact):**
- Fix typos in code
- Fix CSS alignment issues
- Fix broken links
- Fix console warnings
- Fix linter errors

**Code Improvements:**
- Extract duplicated code
- Rename variables for clarity
- Add PropTypes/type definitions
- Improve code comments
- Remove unused code

**Characteristics of Level 1 decisions:**
- Low or no risk of breaking existing functionality
- Easily reversible
- Follow established patterns exactly
- Don't require architectural decisions
- Impact single component or small scope

### Level 2: Documented Autonomy (⚠️ Proceed with Documentation)

**You can proceed, but must document your approach:**

**Component Refactoring:**
- Restructure component internals
- Extract logic to custom hooks
- Simplify complex components
- Change component composition
- Optimize performance

**Dependencies:**
- Add well-known npm packages
- Update existing dependencies (minor versions)
- Add new utility libraries
- Add new testing libraries

**State Management:**
- Add local component state
- Add new custom hooks
- Modify existing hooks (non-breaking)
- Add derived state calculations

**Performance Optimization:**
- Add memoization (useMemo, useCallback)
- Implement lazy loading
- Optimize re-renders
- Add code splitting

**Testing Enhancements:**
- Add integration tests
- Improve test utilities
- Add new testing patterns
- Refactor test structure

**Documentation Updates:**
- Restructure documentation sections
- Add new documentation pages
- Update architecture documentation
- Add development guides

**Bug Fixes (Medium Impact):**
- Fix logic errors affecting single feature
- Fix navigation issues
- Fix state management bugs
- Fix rendering issues

**Required documentation:**
```markdown
## Decision Documentation

**Decision:** [What you decided to do]

**Reasoning:** [Why you chose this approach]

**Alternatives Considered:**
1. Option A - Rejected because [reason]
2. Option B - Rejected because [reason]

**Implementation Approach:**
[High-level plan]

**Risks:**
[Potential issues to watch for]

**Rollback Plan:**
[How to revert if needed]
```

**Characteristics of Level 2 decisions:**
- Medium risk of impact
- Reversible with effort
- Adapt existing patterns
- Affect multiple components or features
- Require thoughtful design choices

### Level 3: Mandatory Escalation (❌ Always Ask First)

**You must escalate before proceeding:**

**Architecture Changes:**
- Modify SessionContext structure
- Modify NavigationContext structure
- Change state management approach
- Add new Context providers
- Change component hierarchy fundamentally

**Breaking Changes:**
- Change public component APIs
- Modify prop interfaces (removing/renaming)
- Change function signatures
- Alter data structures
- Change URL structure or routing

**Web3 Integration:**
- Modify wallet connection logic
- Change Web3 provider configuration
- Add new blockchain interactions
- Modify authentication flow
- Change wallet state management

**Multi-Domain Logic:**
- Modify domain detection
- Change content switching logic
- Alter domain-specific behavior
- Add new domain support

**Security Concerns:**
- Authentication changes
- Authorization logic
- Sensitive data handling
- API security
- Input validation for security

**Performance Critical:**
- Bundle size increases >100KB
- Changes affecting initial load time
- Database query modifications
- Large-scale refactoring

**Content Schema:**
- Change content.json structure
- Modify session data format
- Alter configuration format

**CI/CD Pipeline:**
- Modify GitHub Actions workflows
- Change deployment process
- Alter build configuration
- Modify testing pipeline

**Major Dependencies:**
- Upgrade major versions (Next.js, React)
- Change core libraries
- Remove key dependencies
- Add large dependencies (>1MB)

**Characteristics of Level 3 decisions:**
- High risk of breaking functionality
- Difficult or impossible to revert
- Require new patterns
- Affect system-wide behavior
- Need architectural consensus

---

## Risk Assessment

### How to Assess Risk

**Ask these questions:**

1. **Scope of Impact**
   - How many components/files affected? (1-2 = low, 3-5 = medium, 6+ = high)
   - How many users affected? (none/few = low, some = medium, all = high)

2. **Reversibility**
   - Can I git revert easily? (yes = low, with effort = medium, no = high)
   - Will data be lost? (no = low, maybe = medium, yes = high)

3. **Pattern Alignment**
   - Following existing pattern exactly? (yes = low, adapting = medium, new = high)
   - Similar code exists? (yes = low, somewhat = medium, no = high)

4. **External Dependencies**
   - Affects external systems? (no = low, indirect = medium, direct = high)
   - Requires coordination? (no = low, maybe = medium, yes = high)

5. **Complexity**
   - Straightforward implementation? (yes = low, moderate = medium, complex = high)
   - Need to understand multiple systems? (no = low, some = medium, many = high)

**Risk Score:**
- **0-5 points:** Low risk (Level 1 - Proceed)
- **6-10 points:** Medium risk (Level 2 - Document and proceed)
- **11+ points:** High risk (Level 3 - Escalate)

### Risk Assessment Examples

**Example 1: Adding a badge variant**
- Scope: 1 file, 0 users during dev
- Reversibility: Easy git revert
- Pattern: Exact match to existing variants
- Dependencies: None
- Complexity: Straightforward
**Score: 0 - Low Risk**

**Example 2: Refactoring component logic**
- Scope: 1 component, used in 3 places
- Reversibility: Git revert possible
- Pattern: Adapting existing pattern
- Dependencies: None
- Complexity: Moderate
**Score: 6 - Medium Risk**

**Example 3: Changing SessionContext API**
- Scope: Core system, affects 50+ components
- Reversibility: Difficult, needs migration
- Pattern: New approach
- Dependencies: Affects all features
- Complexity: High
**Score: 15 - High Risk**

---

## Decision Categories

### Category 1: Component Design

**Low Risk (Proceed):**
- Adding props to existing components
- Adding new component variants
- Changing internal component structure (no API change)
- Adding conditional rendering
- Adding default props

**Medium Risk (Document):**
- Extracting components from existing components
- Combining multiple components
- Changing component hierarchy
- Major internal refactoring

**High Risk (Escalate):**
- Changing component prop interfaces
- Removing components in use
- Changing component responsibilities
- Architectural redesign

### Category 2: State Management

**Low Risk (Proceed):**
- Adding useState for local state
- Adding useEffect for side effects
- Using existing context values
- Adding derived state

**Medium Risk (Document):**
- Creating new custom hooks
- Extracting state logic
- Adding complex state interactions
- Optimizing state updates

**High Risk (Escalate):**
- Modifying existing contexts
- Changing global state structure
- Adding new context providers
- Altering state management approach

### Category 3: Styling & Theming

**Low Risk (Proceed):**
- Adding Tailwind utility classes
- Using theme variables
- Adding hover/focus states
- Responsive breakpoints
- Minor layout adjustments

**Medium Risk (Document):**
- Creating new utility class combinations
- Adding new theme-specific styles
- Major layout restructuring
- Adding animations

**High Risk (Escalate):**
- Modifying theme variable structure
- Changing global styles
- Adding new themes
- Altering CSS architecture

### Category 4: Testing

**Low Risk (Proceed):**
- Adding unit tests
- Improving test coverage
- Adding test assertions
- Fixing failing tests
- Adding edge case tests

**Medium Risk (Document):**
- Creating new test utilities
- Adding integration tests
- Restructuring test files
- Adding new testing patterns

**High Risk (Escalate):**
- Changing test infrastructure
- Modifying Jest configuration
- Changing test philosophy
- Removing significant tests

### Category 5: Performance

**Low Risk (Proceed):**
- Adding useMemo for expensive calculations
- Adding useCallback for functions
- Optimizing renders in single component
- Adding React.memo

**Medium Risk (Document):**
- Implementing code splitting
- Adding lazy loading
- Optimizing bundle size
- Adding prefetching

**High Risk (Escalate):**
- Major bundle restructuring
- Changing build configuration
- Altering loading strategies
- Infrastructure changes

### Category 6: Dependencies

**Low Risk (Proceed):**
- Updating patch versions
- Adding well-known utilities (lodash, date-fns)
- Adding icon libraries
- Adding testing libraries

**Medium Risk (Document):**
- Adding new UI libraries
- Updating minor versions
- Adding build tools
- Adding medium-sized dependencies

**High Risk (Escalate):**
- Upgrading major versions (Next.js, React)
- Adding large dependencies (>1MB)
- Removing core dependencies
- Changing dependency strategy

---

## Escalation Guidelines

### When to Escalate Immediately

**Stop work and escalate if:**
- ❌ You're unsure if your approach will work
- ❌ The task requires breaking changes
- ❌ Multiple approaches seem equally valid
- ❌ The impact affects core functionality
- ❌ Security or data integrity is involved
- ❌ You need to modify critical systems (contexts, routing)
- ❌ The decision has long-term architectural implications

### How to Escalate

Use the format from COMMUNICATION-PROTOCOL.md:

```markdown
## 🔴 Decision Required: [Brief Topic]

**Task:** [What you're working on]
**Decision Needed:** [Specific decision]
**Impact:** [Who/what is affected]

### Context
[What you're trying to achieve]

### Options Considered
**Option A:** [Description]
- Pros: [List]
- Cons: [List]
- Implementation effort: [Estimate]

**Option B:** [Description]
- Pros: [List]
- Cons: [List]
- Implementation effort: [Estimate]

### My Recommendation
[Which option you prefer and why]

### Questions
1. [Specific question 1]
2. [Specific question 2]

### What I Need
[Clear decision on which approach to take]

### Timeline
[When you need the decision by]
```

### Escalation Response Times

**Expected response times:**
- **Critical (production broken):** Within hours
- **High (blocking feature):** Within 1 day
- **Medium (blocking task):** Within 2 days
- **Low (nice to clarify):** Within 1 week

**While waiting:**
- Document your current thinking
- Prepare both approaches if feasible
- Work on unrelated tasks
- Don't stay idle

---

## Example Scenarios

### Scenario 1: Adding a New Button Variant

**Situation:**
You need to add a "danger" variant to the Button component.

**Analysis:**
- Scope: 1 file, no breaking changes
- Reversibility: Easy
- Pattern: Exact match to existing variants
- Dependencies: None
- Complexity: Simple

**Decision: ✅ Proceed Independently (Level 1)**

**Implementation:**
```javascript
const variants = {
  primary: 'bg-terminal-green text-background',
  secondary: 'bg-gray-500 text-white',
  danger: 'bg-red-500 text-white hover:bg-red-600', // New variant
};
```

**Testing:**
```javascript
it('should render danger variant', () => {
  render(<Button variant="danger">Delete</Button>);
  expect(screen.getByRole('button')).toHaveClass('bg-red-500');
});
```

**Documentation:**
Add to DESIGN-SYSTEM.md under Button component.

### Scenario 2: Refactoring Complex Component

**Situation:**
The MainHub component has become too large (300 lines). You want to extract sections into separate components.

**Analysis:**
- Scope: 1 file → multiple files, affects navigation
- Reversibility: Possible with effort
- Pattern: Common refactoring pattern
- Dependencies: May affect child components
- Complexity: Moderate

**Decision: ⚠️ Document and Proceed (Level 2)**

**Documentation in PR:**
```markdown
## Refactoring Decision

**Decision:** Split MainHub into smaller components

**Reasoning:**
- MainHub is 300+ lines
- Violates single responsibility principle
- Difficult to test and maintain

**Approach:**
1. Extract NavigationSection → new component
2. Extract ProjectList → new component
3. Keep MainHub as coordinator
4. Preserve all existing functionality

**Alternatives Considered:**
- Keep as-is: Not maintainable long-term
- Complete rewrite: Too risky

**Risks:**
- Potential prop-drilling
- May need additional context

**Rollback Plan:**
- Single commit, easy to revert
- All tests must pass
```

### Scenario 3: Changing SessionContext Structure

**Situation:**
You think SessionContext should use a single state object instead of multiple useState calls.

**Analysis:**
- Scope: Core system, 50+ components affected
- Reversibility: Very difficult, needs migration
- Pattern: New approach
- Dependencies: System-wide
- Complexity: High

**Decision: ❌ Escalate (Level 3)**

**Escalation:**
```markdown
## 🔴 Architecture Decision Required: SessionContext Redesign

**Task:** Improving SessionContext performance and maintainability

**Decision Needed:** Should we redesign SessionContext API?

### Context
SessionContext currently uses multiple useState calls (10+), causing
unnecessary re-renders when any single value changes.

### Current Problems
- Re-renders entire app on any state change
- 50+ components consume this context
- Performance impact on theme switching
- Difficult to add new state values

### Options Considered

**Option A: Redesign with useReducer**
- Pros: Better performance, single state object, easier to debug
- Cons: Breaking change, migration effort, learning curve
- Implementation: 20+ hours, affects 50+ files
- Breaking change: Yes - all consumers need updates

**Option B: Add optimization with useMemo**
- Pros: Non-breaking, quick to implement
- Cons: Band-aid solution, doesn't solve root cause
- Implementation: 4 hours, no breaking changes
- Breaking change: No

**Option C: Keep current approach**
- Pros: No work needed
- Cons: Performance issues persist
- Implementation: 0 hours
- Breaking change: No

### My Recommendation
Option A - despite the breaking change, it's the right long-term solution.
However, I need approval for:

1. Breaking change - Is this acceptable?
2. Migration strategy - Should we provide a codemod?
3. Timeline - Is 20+ hours reasonable for this?
4. Documentation - What level of migration guide is needed?

### Questions
1. Is a breaking change acceptable at this stage?
2. Should we do this incrementally or all at once?
3. Do we need backwards compatibility layer?
4. Should I create a proof-of-concept first?

### What I Need
- Approval for breaking change, OR
- Direction to pursue Option B instead

### Timeline
Blocking optimization work, would like decision by end of week
```

### Scenario 4: Adding New npm Package

**Situation:**
You want to add `date-fns` for date formatting instead of writing custom logic.

**Analysis:**
- Scope: Utility, affects date formatting only
- Reversibility: Easy to remove
- Pattern: Common dependency addition
- Dependencies: Well-maintained, popular library
- Complexity: Simple integration

**Decision: ⚠️ Document and Proceed (Level 2)**

**Documentation in PR:**
```markdown
## Dependency Addition

**Added:** date-fns (11.9kB gzipped)

**Reasoning:**
- Need consistent date formatting across app
- date-fns is industry standard
- Smaller than moment.js
- Tree-shakeable
- Well-maintained (40k+ stars)

**Alternatives:**
- Custom implementation: More code, more bugs
- Intl.DateTimeFormat: Limited formatting options
- moment.js: Too large (67kB gzipped)

**Usage:**
\```javascript
import { format } from 'date-fns';

format(new Date(), 'MMM dd, yyyy');
\```

**Bundle Impact:**
- Size: +11.9kB gzipped
- Tree-shakeable: Only import what we use
- Total bundle: 2.01MB → 2.02MB (+0.5%)
```

### Scenario 5: Fixing Urgent Production Bug

**Situation:**
Users report that theme switching is broken in production.

**Analysis:**
- Scope: Critical, affects all users
- Reversibility: Must fix immediately
- Pattern: Emergency fix
- Dependencies: May affect many components
- Complexity: Unknown until investigated

**Decision: ❌ Investigate and Report (Level 3)**

**Process:**
1. **Reproduce the bug** in production
2. **Investigate locally** to find root cause
3. **Escalate immediately** with findings
4. **Wait for approval** of fix approach
5. **Implement fix** following approved approach
6. **Deploy immediately** after review

**Escalation:**
```markdown
## 🚨 CRITICAL: Production Bug - Theme Switching Broken

**Impact:** ALL users affected
**Severity:** Critical
**First Reported:** 2025-01-27 10:30 AM

### Problem
Users cannot switch themes. Current theme persists despite selection.

### Root Cause (Preliminary)
localStorage.setItem('theme', newTheme) failing silently in production.
Possible cause: CSP (Content Security Policy) blocking localStorage.

### Proposed Fix
**Quick Fix (1 hour):**
- Add fallback to sessionStorage
- Add error handling
- Show user notification if storage fails

**Proper Fix (4 hours):**
- Investigate CSP configuration
- Fix storage permissions
- Add proper error handling
- Add monitoring for storage failures

### Recommendation
Deploy quick fix immediately, then schedule proper fix.

### Questions
1. Can I deploy quick fix now without full review?
2. Should I investigate CSP first or fix symptoms?
3. Do we have monitoring for client-side errors?

### What I Need
- Immediate approval for quick fix, OR
- Different approach if you see better option

### Timeline
URGENT - Users affected now
Can deploy fix in 1 hour if approved
```

---

## Quick Decision Matrix

| Scenario | Risk Level | Action | Documentation |
|----------|-----------|--------|---------------|
| New component following pattern | Low | ✅ Proceed | Code comments + DESIGN-SYSTEM.md |
| Adding button variant | Low | ✅ Proceed | Code comments + DESIGN-SYSTEM.md |
| Fixing typo | Low | ✅ Proceed | None (self-explanatory) |
| Adding tests | Low | ✅ Proceed | Test descriptions |
| Refactoring component | Medium | ⚠️ Document + Proceed | PR description with reasoning |
| Adding dependency | Medium | ⚠️ Document + Proceed | PR description with justification |
| Performance optimization | Medium | ⚠️ Document + Proceed | PR description with benchmarks |
| Changing Context API | High | ❌ Escalate | Full escalation format |
| Breaking change | High | ❌ Escalate | Full escalation format |
| Architecture change | High | ❌ Escalate | Full escalation format |
| Security concern | High | ❌ Escalate | Full escalation format |
| Production emergency | Critical | ❌ Escalate + Investigate | Critical escalation format |

---

## Quick Reference

### Decision Checklist

Before making any decision, ask:

- [ ] What's the scope of impact?
- [ ] Can I easily revert this?
- [ ] Does this follow existing patterns?
- [ ] Are there external dependencies?
- [ ] How complex is the implementation?
- [ ] Is this a breaking change?
- [ ] Do I fully understand the implications?

**If ANY concern → Escalate**

### Escalation Triggers

Escalate immediately if:
- 🚨 Production is broken
- 🚨 Security vulnerability identified
- 🚨 Data loss possible
- 🛑 Breaking change required
- 🛑 Architecture decision needed
- 🛑 Multiple valid approaches exist
- 🛑 Impact unclear or wide-reaching
- ⚠️ Unsure after 15 minutes of research

### Autonomous Triggers

Proceed independently if:
- ✅ Following existing pattern exactly
- ✅ Low/no risk of breaking things
- ✅ Easily reversible
- ✅ Single component/file impact
- ✅ Tests will catch any issues
- ✅ Similar code exists as example

---

## Summary

**Key Principles:**

1. **Bias toward autonomy** - for low-risk decisions
2. **Document medium-risk** - explain your thinking
3. **Always escalate high-risk** - better safe than sorry
4. **When in doubt, ask** - 15-minute rule
5. **Learn from feedback** - refine judgment over time

**Remember:**
- Your judgment will improve with experience
- Feedback is learning, not criticism
- Better to ask and learn than to break and fix
- Document your reasoning always

**The goal is autonomous, high-quality development with appropriate safety rails.**

---

**Related Documents:**
- [GETTING-STARTED.md](GETTING-STARTED.md) - Project orientation
- [WORKFLOW.md](WORKFLOW.md) - Development process
- [TASK-EXECUTION.md](TASK-EXECUTION.md) - Execution procedures
- [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md) - Escalation format