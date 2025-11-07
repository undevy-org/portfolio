# Communication Protocol for AI Agents

This document defines how AI agents should communicate with human developers, report progress, flag blockers, and escalate issues in the Interactive Terminal Portfolio project.

---

## Table of Contents

1. [Communication Principles](#communication-principles)
2. [Question Format](#question-format)
3. [Progress Reporting](#progress-reporting)
4. [Blocker Flag System](#blocker-flag-system)
5. [Escalation Procedures](#escalation-procedures)
6. [Pull Request Communication](#pull-request-communication)
7. [Review Response Protocol](#review-response-protocol)
8. [Quick Reference](#quick-reference)

---

## Communication Principles

### Core Values

**1. Clarity Over Brevity**
- Write complete questions with full context
- Don't assume the reader knows your current state
- Include all relevant information in one message

**2. Action-Oriented**
- Every question should have a clear decision needed
- Specify what you'll do after receiving the answer
- Make it easy for humans to respond

**3. Self-Service First**
- Check documentation before asking
- Search past issues and PRs
- Attempt reasonable solutions first

**4. Respect Time**
- Batch questions when possible
- Don't ask repeatedly for the same information
- Be ready to proceed immediately after answer

**5. Transparency**
- Always report current state honestly
- Document what you tried that didn't work
- Admit when you don't understand

---

## Question Format

### Standard Question Template

When you need to ask a question, use this format:

```markdown
## ❓ Question: [Brief Topic]

**Context:** [Which task/feature you're working on]
**Priority:** HIGH / MEDIUM / LOW
**Type:** Clarification / Technical Decision / Architecture / Bug

### Current Understanding
[Explain what you already know and have tried]

Example:
"I'm working on the NotificationBadge component. I understand it should
display unread count and use theme colors. I've reviewed DESIGN-SYSTEM.md
and found similar badge patterns."

### The Question
[Ask specific, answerable questions]

Example:
1. Should the badge support custom background colors, or only theme variants?
2. What's the maximum count to display before showing "99+"?
3. Should there be an animation when count changes?

### Proposed Solution
[If you have ideas, share them]

Example:
"I propose:
1. Support only theme variants (success, error, warning) for consistency
2. Maximum count of 99, then show "99+"
3. Simple fade animation on count change

This follows the patterns in existing components like Alert and Card."

### Impact Assessment
**If we proceed with my proposal:**
- Implementation time: ~2 hours
- Tests required: ~6 test cases
- Documentation needed: Update DESIGN-SYSTEM.md

**If we need to redesign:**
- Potential delay: ~4 hours
- May affect dependent features: [list if any]

### What I Need
[Be explicit about what decision/information you need]

Example:
"I need confirmation on:
1. Color variant approach (theme-only vs custom)
2. Maximum count number
3. Animation requirement (yes/no)

With this information, I can complete implementation by [timeframe]."
```

### Question Priority Levels

**HIGH Priority** (Response needed within hours)
- Blocks critical features
- Affects release timeline
- Breaking changes
- Security concerns
- Deployment issues

**MEDIUM Priority** (Response needed within 1-2 days)
- Blocks single feature
- Design decisions
- API design questions
- Performance optimization approach

**LOW Priority** (Response when convenient)
- Documentation improvements
- Code style preferences
- Nice-to-have features
- Optimization questions

### Good Question Examples

**Example 1: Technical Decision**
```markdown
## ❓ Question: Web3 Connection Error Handling

**Context:** Implementing Web3 wallet connection feature
**Priority:** MEDIUM
**Type:** Technical Decision

### Current Understanding
I'm implementing the wallet connection flow. I've reviewed the Web3 lazy
loading documentation and understand the connection process. The code
successfully connects wallets and stores the address.

### The Question
How should we handle connection errors?

Specific scenarios:
1. User rejects connection in wallet: Should we show a toast or modal?
2. Network mismatch (user on wrong chain): Retry or show error?
3. Wallet not installed: Redirect to wallet download page or just inform?

### Proposed Solution
Based on common Web3 patterns:

1. User rejection: Show brief toast notification
   - Message: "Connection cancelled"
   - Duration: 3 seconds
   - Action: Dismiss automatically

2. Network mismatch: Show modal with action buttons
   - Message: "Please switch to [Network Name]"
   - Actions: "Switch Network" | "Cancel"
   - Auto-attempt network switch via wallet API

3. Wallet not installed: Show modal with download link
   - Message: "No Web3 wallet detected"
   - Action: "Install MetaMask" button
   - Link: Opens MetaMask website

### Impact Assessment
**Proposal implementation:**
- Time: 3-4 hours
- New components: ErrorModal, Toast (if not exists)
- Tests needed: 8-10 test cases
- Dependencies: None

**Alternative (simple alerts):**
- Time: 1 hour
- Uses browser alerts: Not recommended
- Poor UX but faster

### What I Need
Confirmation on:
1. Overall error handling approach (modals/toasts vs other)
2. Should we attempt automatic network switching?
3. Any specific error messages or copy preferences?
```

**Example 2: Architecture Clarification**
```markdown
## ❓ Question: State Management for Notifications

**Context:** Adding notification system to app
**Priority:** HIGH (blocks feature)
**Type:** Architecture

### Current Understanding
The app uses SessionContext for global state and individual component
state for local data. I need to add notification state that's accessible
across multiple components.

I've reviewed:
- SessionContext implementation
- NavigationContext pattern
- Existing state management

### The Question
Where should notification state live?

Options I see:
1. **Add to SessionContext**
   - Pros: Centralized, follows existing pattern
   - Cons: SessionContext is already large

2. **Create NotificationContext**
   - Pros: Separation of concerns, cleaner
   - Cons: Another context provider to wrap

3. **Local state with event emitter**
   - Pros: No context needed
   - Cons: Non-React pattern, harder to test

### Proposed Solution
I recommend Option 2: Create NotificationContext

Rationale:
- Follows the pattern established by NavigationContext
- Clean separation of concerns
- Easy to test in isolation
- Doesn't bloat SessionContext
- Notifications are a distinct feature domain

Structure:
\```javascript
// contexts/NotificationContext.js
- notificationState (array of notifications)
- addNotification(message, type)
- removeNotification(id)
- clearAllNotifications()
\```

### Impact Assessment
**Option 2 implementation:**
- Time: 4-5 hours
- Files: NotificationContext.js, NotificationContext.test.js
- Integration: Wrap app in providers
- Tests: 12-15 test cases
- Documentation: Update ARCHITECTURE.md

### What I Need
1. Confirm architectural approach (or suggest alternative)
2. Any specific requirements for notification data structure?
3. Should notifications persist across page navigations?
```

### Bad Question Examples (Don't Do This)

**❌ Too Vague**
```markdown
How should I build the notification system?
```
Problem: No context, no research shown, too open-ended

**❌ Missing Context**
```markdown
Should I use a modal or a toast?
```
Problem: No explanation of what feature this is for

**❌ No Proposed Solution**
```markdown
I don't know how to handle errors in the Web3 connection.
What should I do?
```
Problem: No research, no attempt at a solution

**❌ Already Documented**
```markdown
What's the commit message format?
```
Problem: This is in COMMIT_CONVENTION.md - check docs first

---

## Progress Reporting

### When to Report Progress

**Report progress when:**
- Starting work on a significant task
- Completing a major milestone
- About to push a PR
- Encountered a blocker
- Changing approach mid-task
- Daily standup (if applicable)

**Don't report when:**
- Making routine commits
- Following normal workflow
- Working autonomously on clear tasks

### Progress Report Format

**For task start:**
```markdown
## 🚀 Starting: [Task Name]

**Task:** [Brief description]
**Estimated time:** [Hours/days]
**Approach:** [High-level plan]
**Expected completion:** [Date/time]

**Dependencies checked:**
- [x] Documentation reviewed
- [x] Similar code examined
- [x] Tests planned
- [x] No blockers identified
```

**For milestone completion:**
```markdown
## ✅ Milestone: [Milestone Name]

**Task:** [Task name]
**Completed:** [What was done]
**Tests:** [Test status]
**Next:** [What's next]

**Changes:**
- File 1: [Brief description]
- File 2: [Brief description]

**Ready for:** Review / Next phase / Testing
```

**For task completion:**
```markdown
## ✅ Completed: [Task Name]

**Task:** [Brief description]
**Time taken:** [Actual time]
**PR:** [Link to PR]

**Summary:**
- [Key change 1]
- [Key change 2]
- [Key change 3]

**Testing:**
- [x] All tests pass
- [x] Manual testing done
- [x] Coverage maintained

**Documentation:**
- [x] Code comments added
- [x] DESIGN-SYSTEM.md updated
- [x] No other docs needed

**Ready for review**
```

### Daily Standup Format (if applicable)

```markdown
## 📊 Daily Update: [Date]

**Yesterday:**
- ✅ Completed NotificationBadge component
- ✅ Added 8 test cases, all passing
- ✅ Updated DESIGN-SYSTEM.md

**Today:**
- 🔄 Will implement notification list component
- 🔄 Write tests for list component
- 🔄 Update context to handle dismissal

**Blockers:**
- None / [Description if any]

**Estimated completion:** [Date]
```

---

## Blocker Flag System

### Blocker Types and Flags

Use emoji flags to indicate blocker severity and type:

| Flag | Type | Meaning | Response Time |
|------|------|---------|---------------|
| 🚨 | CRITICAL | Production broken | Immediate |
| 🔴 | HIGH | Blocks critical path | Within hours |
| 🟡 | MEDIUM | Blocks feature | Within 1-2 days |
| 🟢 | LOW | Nice to resolve | When convenient |
| ❓ | QUESTION | Need clarification | Varies by priority |
| 🤔 | RESEARCH | Need to investigate | Document findings |
| ⚠️ | WARNING | Potential issue | Flag for awareness |

### Blocker Documentation Template

```markdown
## [FLAG] Blocker: [Brief Description]

**Task:** [What you're working on]
**Impact:** [What's blocked]
**Severity:** CRITICAL / HIGH / MEDIUM / LOW
**First noticed:** [Date/time]

### Problem Description
[Clear explanation of what's blocking you]

### What I've Tried
1. [Attempt 1] - [Result]
2. [Attempt 2] - [Result]
3. [Attempt 3] - [Result]

### Relevant Context
- **Branch:** [Branch name if applicable]
- **Files involved:** [List]
- **Related issues:** [Links if any]
- **Documentation consulted:** [List]

### Questions
1. [Specific question 1]
2. [Specific question 2]

### Proposed Solutions
**Option A:** [Description]
- Pros: [List]
- Cons: [List]

**Option B:** [Description]
- Pros: [List]
- Cons: [List]

### What I Need
[Specific decision or information needed]

### Workaround
[If you found a temporary solution, describe it]
OR
[No workaround available - completely blocked]

### Next Steps
**If unblocked:** [What you'll do]
**While waiting:** [Alternative task you can work on]
```

### Blocker Examples

**Example 1: High Priority Blocker**
```markdown
## 🔴 Blocker: Web3 Integration Breaking Production Build

**Task:** Implementing Web3 wallet connection
**Impact:** Production build fails, deployment blocked
**Severity:** HIGH
**First noticed:** 2025-01-27 14:30

### Problem Description
After implementing Web3 lazy loading, the production build fails with:
"Module not found: Can't resolve '@reown/appkit/react'"

Development build works fine. Production build fails at compile time.

### What I've Tried
1. Verified package is in package.json - ✓ Present
2. Deleted node_modules and reinstalled - Still fails
3. Tried different import syntax - No change
4. Checked Next.js dynamic import docs - Following best practices

### Relevant Context
- **Branch:** feat/web3-wallet-connection
- **Files involved:** 
  - src/components/Web3Provider.js
  - src/contexts/Web3Context.js
- **Related issues:** None found
- **Documentation consulted:**
  - Next.js dynamic imports
  - Reown AppKit docs
  - Project ARCHITECTURE.md

### Questions
1. Should Web3 dependencies be in dependencies or devDependencies?
2. Is there a Next.js config needed for external packages?
3. Should we use a different lazy loading approach for production?

### Proposed Solutions
**Option A:** Move to regular (non-lazy) import
- Pros: Will definitely work
- Cons: Increases bundle size by ~2MB

**Option B:** Configure Next.js webpack for external package
- Pros: Keeps lazy loading benefit
- Cons: Need to understand webpack config

### What I Need
Guidance on proper way to handle external package lazy loading in Next.js
production builds. Option A vs Option B, or different approach?

### Workaround
Temporarily reverted Web3 integration - production builds successfully.
Working code is in feat/web3-wallet-connection branch.

### Next Steps
**If unblocked:** Complete Web3 integration PR
**While waiting:** Will work on notification system (unrelated task)
```

**Example 2: Medium Priority Question**
```markdown
## 🟡 Blocker: Design Decision for Error States

**Task:** Creating ErrorScreen template
**Impact:** Delays ErrorScreen completion
**Severity:** MEDIUM
**First noticed:** 2025-01-27

### Problem Description
Need design decision on error screen appearance. Currently there's no
established pattern for full-screen error states in the design system.

I can implement it, but want to ensure it matches project vision.

### What I've Tried
1. Reviewed existing error handling - Found Alert component for inline errors
2. Checked other templates - No full-screen error pattern
3. Reviewed theme variables - Have all colors needed

### Relevant Context
- **Branch:** feat/error-screen-template
- **Files involved:** src/components/templates/ErrorScreen.js
- **Related issues:** None
- **Documentation consulted:** DESIGN-SYSTEM.md, ARCHITECTURE.md

### Questions
1. Should error screens match terminal aesthetic or be more modern?
2. Include retry button or just back to home?
3. Show error details (for developers) or user-friendly only?

### Proposed Solutions
**Option A:** Terminal-style error screen
```
┌─────────────────────────────┐
│  ERROR: SYSTEM FAILURE      │
│                             │
│  Something went wrong.      │
│                             │
│  [Return to Home]           │
└─────────────────────────────┘
```
- Pros: Matches app aesthetic
- Cons: Less friendly for non-technical users

**Option B:** Modern error screen
- Friendly icon
- Clear message
- Obvious action buttons
- Pros: Better UX
- Cons: Breaks terminal aesthetic

### What I Need
Confirmation on which approach aligns with project vision.

### Workaround
Can implement Option A (terminal style) by default, easy to change later.

### Next Steps
**If unblocked:** Complete error screen with approved design
**While waiting:** Will complete tests for other templates
```

---

## Escalation Procedures

### Escalation Levels

**Level 1: Documentation Check**
Before escalating, check:
- Project documentation (ARCHITECTURE.md, DESIGN-SYSTEM.md, etc.)
- Existing code for similar patterns
- Past PRs for similar features
- GitHub issues for related discussions

**Level 2: Self-Research**
If docs don't help:
- Implement a reasonable solution
- Document your reasoning
- Flag for review in PR
- Be ready to change based on feedback

**Level 3: Question (Non-Blocking)**
Use standard question format:
- Post in GitHub Discussions
- Tag: `question`, `ai-agent`
- Continue with other tasks

**Level 4: Blocker (Blocking)**
Use blocker format:
- Create GitHub Issue
- Tag: `blocker`, `ai-agent`, priority label
- Switch to different task

**Level 5: Critical/Urgent**
For production issues:
- Create GitHub Issue with `critical` label
- Add clear `[URGENT]` in title
- Describe immediate impact
- Suggest temporary workaround if possible

### Escalation Decision Tree

```
Issue encountered
    ↓
Can I find answer in docs? ─YES→ Proceed
    ↓ NO
Is this a reasonable assumption? ─YES→ Proceed + document + flag in PR
    ↓ NO
Is this blocking current task? ─NO→ Level 3: Ask question, continue
    ↓ YES
Is this affecting production? ─YES→ Level 5: Critical escalation
    ↓ NO
Level 4: Flag blocker, switch tasks
```

### When NOT to Escalate

**Don't escalate for:**
- Things documented in project files
- Decisions you can make based on existing patterns
- Questions answered in past PRs/issues
- Standard implementation details

**DO proceed autonomously when:**
- Following established patterns
- Making low-risk changes
- Implementing clear requirements
- Following component structure

---

## Pull Request Communication

### PR Title Format

Follow conventional commit format:

```
<type>(<scope>): <description>

Examples:
feat(ui): add notification badge component
fix(auth): correct Web3 connection error handling
refactor(components): simplify accordion state logic
test(organisms): improve header test coverage
docs(design): update component usage guidelines
```

### PR Description Template

```markdown
## Description
[Clear explanation of what this PR does]

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## Motivation and Context
[Why is this change needed? What problem does it solve?]
[Link to related issues if applicable]

## Changes Made
- [Change 1]
- [Change 2]
- [Change 3]

## Testing
- [ ] All existing tests pass
- [ ] Added tests for new features
- [ ] Manual testing completed
- [ ] Tested in multiple themes
- [ ] Tested responsive design
- [ ] No console errors or warnings

### Test Results
```
Test Suites: X passed, X total
Tests:       X passed, X total
Coverage:    X% statements
```

## Documentation
- [ ] Updated code comments
- [ ] Updated DESIGN-SYSTEM.md (if applicable)
- [ ] Updated ARCHITECTURE.md (if applicable)
- [ ] Updated TESTING.md (if applicable)
- [ ] No documentation changes needed

## Screenshots/Videos (if applicable)
[Add screenshots or screen recordings demonstrating the changes]

### Before
[Screenshot]

### After
[Screenshot]

## Checklist
- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## Additional Notes
[Any additional information that reviewers should know]

## AI Agent Notes (optional)
**Autonomy level:** Full / Partial / Supervised
**Questions during development:** [Number]
**Blockers encountered:** [Brief description or "None"]
**Time taken:** [Hours]
**Confidence level:** High / Medium / Low
```

### PR Size Guidelines

**Ideal PR size:**
- Small: <100 lines changed (1-2 hours review)
- Medium: 100-300 lines (2-4 hours review)
- Large: 300-500 lines (4+ hours review)
- Too large: >500 lines (consider splitting)

**When to split PRs:**
- Independent features
- Refactoring + new feature
- Multiple unrelated fixes
- Large architectural changes

---

## Review Response Protocol

### Responding to Review Comments

**For requested changes:**

```markdown
**Reviewer comment:**
> Consider extracting this logic into a custom hook for reusability

**Your response:**
✅ Done - Created `useNotificationState` hook in commit [abc123]

Files:
- src/hooks/useNotificationState.js
- src/hooks/useNotificationState.test.js

Tests: 6 test cases added, all passing
```

**For questions:**

```markdown
**Reviewer comment:**
> Why did you choose this approach over using existing Alert component?

**Your response:**
Good question! Here's my reasoning:

Alert component is designed for inline messages within content. Notifications
need different behavior:
1. Positioned fixed at top-right
2. Auto-dismiss after timeout
3. Stack multiple notifications
4. Different interaction patterns

However, they share styling - I've extracted common styles to a shared
utility. See commit [abc123].

Would you prefer a different approach?
```

**For disagreements:**

```markdown
**Reviewer comment:**
> This should use Context instead of prop drilling

**Your response:**
I understand the concern. Here's my thinking:

This component is only used in one place (MainHub), and only passes
props 2 levels deep (Hub → List → Item). 

Creating a context would add:
- 40+ lines of provider code
- Test complexity (mock provider)
- Extra provider wrap in App

For this use case, prop drilling seems simpler.

However, if you see this expanding to more components, I'm happy to
refactor to Context. What do you think?
```

### Review Response Timeline

**Respond within:**
- Simple questions: Same day
- Requested changes: 1-2 days
- Major refactors: 2-3 days

**If you can't meet timeline:**
```markdown
Thanks for the review! I see the requested changes. I'm currently blocked
on [other task] but will address these by [date]. If urgent, please let
me know and I can reprioritize.
```

---

## Quick Reference

### Communication Checklist

**Before asking a question:**
- [ ] Checked documentation
- [ ] Searched past issues/PRs
- [ ] Attempted reasonable solution
- [ ] Can articulate specific question
- [ ] Have proposed solution ready

**When reporting blocker:**
- [ ] Used proper flag emoji
- [ ] Included all context
- [ ] Documented what I tried
- [ ] Listed specific questions
- [ ] Proposed solutions
- [ ] Identified workaround
- [ ] Have alternative task ready

**When creating PR:**
- [ ] Followed commit convention
- [ ] Used PR template
- [ ] Added clear description
- [ ] Included test results
- [ ] Added screenshots if UI change
- [ ] Checked all boxes
- [ ] Self-reviewed code

**When responding to review:**
- [ ] Address each comment
- [ ] Link to relevant commits
- [ ] Explain reasoning clearly
- [ ] Ask clarifying questions if needed
- [ ] Update PR when done

### Common Phrases

**Good:**
- "I've reviewed [doc] and understand [concept]"
- "I propose [solution] because [reasoning]"
- "I tried [approach] but [result]"
- "I need clarification on [specific point]"
- "This approach follows [existing pattern]"

**Avoid:**
- "I don't know what to do"
- "Should I do X or Y?" (without context)
- "This doesn't work" (without details)
- "I'm stuck" (without showing what you tried)
- "Someone help" (too vague)

### Response Templates

**Acknowledging feedback:**
```
Thanks for the feedback! I'll address these points:
1. [Point 1] - Will do [action]
2. [Point 2] - Good catch, fixing now
3. [Point 3] - Question: [clarification needed]

ETA for updates: [timeframe]
```

**Requesting clarification:**
```
Thanks for the review. Before I proceed, could you clarify:

"[Quote exact comment]"

My understanding is [interpretation]. Is that correct, or did you mean
[alternative interpretation]?

Once confirmed, I'll proceed with the changes.
```

**Confirming completion:**
```
All feedback addressed:

✅ [Change 1] - Commit [hash]
✅ [Change 2] - Commit [hash]
✅ [Change 3] - Commit [hash]

Ready for re-review.
```

---

## Summary

**Key principles:**

1. **Be clear and complete** - Include all context in communications
2. **Be proactive** - Research before asking
3. **Be specific** - Ask answerable questions
4. **Be respectful** - Value reviewer time
5. **Be professional** - Use templates and standards
6. **Be responsive** - Reply to feedback promptly
7. **Be honest** - Report problems immediately
8. **Be solution-oriented** - Always propose solutions

**Communication hierarchy:**
1. Self-service (docs) → 2. Reasonable assumption → 3. Question → 4. Blocker → 5. Critical escalation

Follow this protocol and you'll maintain clear, effective communication while working autonomously.

---

**Related Documents:**
- [TASK-EXECUTION.md](TASK-EXECUTION.md) - Task execution process
- [DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md) - Autonomy guidelines
- [Standard_Task_Workflow_Protocol.md](../../Standard_Task_Workflow_Protocol.md) - Official workflow
- [COMMIT_CONVENTION.md](../../COMMIT_CONVENTION.md) - Commit format