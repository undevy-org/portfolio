# 🚀 Git Workflow Standards

This document contains the complete Git workflow standards for the Interactive Terminal Portfolio project, consolidating branch naming, commit conventions, pull requests, code reviews, and merge strategies.

---

## Table of Contents

1. [Complete Task Workflow](#1-complete-task-workflow)
2. [Branch Naming Convention](#2-branch-naming-convention)
3. [Commit Message Standards](#3-commit-message-standards)
4. [Pull Request Process](#4-pull-request-process)
5. [Code Review Guidelines](#5-code-review-guidelines)
6. [Merge Strategy & Cleanup](#6-merge-strategy--cleanup)
7. [Cross-Platform Branch Management](#7-cross-platform-branch-management)

---

## 1. Complete Task Workflow

This section outlines the mandatory, step-by-step process for implementing any change in the project. Following this workflow ensures code quality, prevents regressions, maintains clean history, and automates the release and deployment cycle.

### Phase 1: Preparation & Branching

**Goal:** Create a clean, isolated environment for your changes, based on the latest version of the project.

1. **Synchronize Your Local `main` Branch:**
   Before starting any new work, ensure your local `main` branch is in sync with the remote repository.

   ```bash
   # Switch to the main branch
   git checkout main

   # Pull the latest changes from remote
   git pull origin main
   ```

2. **Create a New Feature Branch:**
   Create a new branch from `main`. The branch name must follow the conventional naming standard (see [Branch Naming Convention](#2-branch-naming-convention)).

   ```bash
   # Examples:
   # feat/add-contact-form
   # fix/header-alignment-issue
   # docs/update-readme

   git checkout -b <type>/<descriptive-name>

   # Real example:
   git checkout -b feat/add-image-lightbox
   ```

### Phase 2: Development & Local Validation

**Goal:** Write code and continuously verify its correctness locally. This is an iterative loop.

1. **Code the Changes:**
   Make all necessary code modifications.

2. **Visually Verify Your Work:**
   Run the local development server to see your changes.
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` and confirm the feature or fix works as intended.

3. **Run the Linter:**
   Check your code for style or syntax issues.
   ```bash
   npm run lint
   ```
   Fix any errors or warnings that appear.

4. **Run the Test Suite:**
   Ensure your changes haven't broken existing functionality.
   ```bash
   npm test
   ```
   All tests must pass before proceeding.

5. **Repeat:** Continue the code-and-validate cycle until the feature is complete and all local checks pass.

### Phase 3: Documentation Update

**Goal:** Ensure all project documentation accurately reflects the new changes. **Do not skip this step.**

1. **Review and Update Relevant Documents:**
   Based on your changes, update any relevant files:
   - `README.md`: Project overview or feature list
   - `ARCHITECTURE.md`: Core system architecture changes
   - `docs/DESIGN-SYSTEM.md`: New UI components or style changes
   - `docs/SETUP.md`: Deployment or setup process changes
   - `docs/TESTING.md`: New testing patterns
   - Any other relevant documentation

   **Note:** `CHANGELOG.md` is updated automatically during the release process.

### Phase 4: Code Review & Continuous Integration (CI)

**Goal:** Get your code into `main` through a safe, automated, and reviewed process.

1. **Commit Your Changes:**
   Stage changes and write a commit message following [Conventional Commits](https://www.conventionalcommits.org/) (see [Commit Message Standards](#3-commit-message-standards)).

   ```bash
   git add .
   git commit -m "feat(ui): add lightbox feature to project images"
   ```

2. **Push Your Branch to GitHub:**
   ```bash
   git push -u origin feat/add-image-lightbox
   ```

3. **Create a Pull Request (PR):**
   - Go to the repository on GitHub
   - Click "Compare & pull request" for your branch
   - Write a clear title and description
   - Click "Create pull request"

4. **Await Automated CI Checks:**
   The PR automatically triggers the CI Pipeline with three checks:
   - **Linter:** Verifies code style
   - **Tests:** Runs the full test suite
   - **Build:** Confirms successful production build

   The "Merge" button is blocked until all checks pass.

5. **Merge the Pull Request:**
   Once all checks are green, merge the PR using **"Squash and merge"** to keep `main` history clean.

### Phase 5: Release & Deployment

**Goal:** Create a new version, update the changelog, and deploy to production.

1. **Sync Local `main` After Merging:**
   Switch back to `main` and pull the merged changes.

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Determine the Version Type:**
   Based on your changes:
   - `patch`: Bug fixes and small improvements
   - `minor`: New, backward-compatible features
   - `major`: Breaking changes

3. **Create the Release:**
   Run the release script to automatically update `package.json` and `CHANGELOG.md`, then create a commit and tag.

   ```bash
   # For a patch release (most common)
   npm run release -- --release-as patch

   # For a minor release
   npm run release -- --release-as minor

   # For a major release
   npm run release -- --release-as major
   ```

4. **Push the Release to GitHub:**
   This pushes the commit and tag, triggering automated processes.

   ```bash
   git push --follow-tags origin main
   ```

5. **Monitor Automated Processes:**
   - **GitHub Release:** Automatically created on the repository page
   - **Deployment:** Automatic deployment to staging and production environments

### Phase 6: Cleanup

**Goal:** Keep the repository clean and organized.

1. **Delete the Remote Branch:**
   On the merged Pull Request page on GitHub, click "Delete branch".

2. **Delete the Local Branch:**
   ```bash
   # Ensure you're on the main branch
   git checkout main

   # Delete the feature branch
   git branch -D feat/add-image-lightbox
   ```

This completes the entire lifecycle of a task. Following this process rigorously ensures project stability and success.

---

## 2. Branch Naming Convention

Use conventional branch naming with the format: `<type>/<brief-description>`

### Required Format
```
<type>/<description-with-hyphens>
```

### Branch Types

| Type | Purpose | Examples |
|------|---------|----------|
| `feat` | New feature | `feat/add-notification-system`, `feat/dark-mode-theming` |
| `fix` | Bug fix | `fix/navigation-mobile-bug`, `fix/session-timeout-issue` |
| `refactor` | Code restructure (no feature changes) | `refactor/simplify-context`, `refactor/extract-custom-hook` |
| `test` | Adding/updating tests | `test/improve-coverage-atoms`, `test/add-integration-tests` |
| `docs` | Documentation changes | `docs/update-component-guide`, `docs/add-testing-examples` |
| `style` | Code style/formatting (not design) | `style/fix-eslint-issues`, `style/format-with-prettier` |
| `perf` | Performance improvements | `perf/optimize-bundle-size`, `perf/lazy-load-components` |
| `chore` | Maintenance/build tasks | `chore/update-dependencies`, `chore/cleanup-unused-code` |

### Naming Rules

- Use lowercase and hyphens only
- Keep descriptions brief but descriptive
- No spaces or special characters
- Start with conventional commit type
- Be specific enough to understand the change

### Examples

**Good Examples:**
```
feat/add-user-profile-validation
fix/mobile-navigation-scroll-bug
refactor/extract-form-validation-hook
test/add-accessibility-test-suite
docs/update-ai-agent-docs
```

**Avoid These:**
```
feature/new-user-stuff         # Too vague, missing hyphen
fix-bug                        # Missing description
NewUserFeature                 # Wrong case and format
feat:add-user-validation       # Wrong separator
component-refactor-button      # Missing type
```

---

## 3. Commit Message Standards

Follow conventional commit format for all commits. See [COMMIT_CONVENTION.md](../COMMIT_CONVENTION.md) for complete reference.

### Required Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Categories

**Core Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (semicolons, formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding missing tests or correcting existing tests
- `chore`: Maintenance tasks, build changes, etc.

**Advanced Types:**
- `build`: Changes affecting the build system
- `ci`: Changes to CI configuration files
- `revert`: Reverts a previous commit

### Scope (Optional but Recommended)

Add scope to categorize the commit:

```
feat(auth): add Web3 wallet connection
test(utils): improve date formatter test coverage
fix(ui): correct button hover state in dark theme
docs(setup): update deployment instructions
```

### Subject Rules

- Use imperative mood: "add" not "added"
- No period at end
- Keep under 50 characters
- Capitalize first word
- Be descriptive but concise

### Body Guidelines

- Separate subject from body with blank line
- Explain what and why, not how
- Wrap at 72 characters
- Include motivation/context

### Footer Guidelines

- Reference issue: `Refs: #123`
- Breaking changes: Start with `BREAKING CHANGE:`
- Co-authored commits: `Co-authored-by: Developer Name <email>`

### Complete Examples

**Simple Commit:**
```
feat(ui): add notification badge component
```

**With Body:**
```
feat(auth): add Web3 wallet connection

Implement wallet connection modal and session integration.
Supports MetaMask, Coinbase, and injected wallets.
Adds connection state to session context.

Tested across all 8 themes and mobile responsive.
Refs: #256
```

**Breaking Change:**
```
refactor(session): redesign SessionContext API

BREAKING CHANGE: SessionContext now uses a single state object
instead of separate useState hooks. Consumers must update imports.

Migration guide:
- Old: const { theme, setTheme } = useSession();
- New: const { theme } = useSession(); and setTheme(newTheme);

Refs: #789
```

**Multiple Co-authors:**
```
feat(docs): add comprehensive testing guide

Co-authored-by: Developer One <dev1@company.com>
Co-authored-by: Developer Two <dev2@company.com>
```

### Commit Message Validation

Commits are validated during CI. Common issues:

❌ **Too vague:** `fix bug`  
✅ **Specific:** `fix(auth): resolve session timeout issue`

❌ **Wrong tense:** `changed button color`  
✅ **Imperative:** `fix(ui): update button hover color`

❌ **Too long:** `feat(ui): add a new component that handles all the notification functionality for the app`  
✅ **Concise:** `feat(notify): add notification center component`

---

## 4. Pull Request Process

### PR Creation Standards

**Title Format:** `type(scope): description`

**Branch Requirements:**
- Created from clean `main` branch
- Descriptive name following branch naming convention
- All work committed to feature branch

**Before Creating PR:**
```bash
# Switch to main and sync
git checkout main && git pull origin main

# Work on feature branch
git checkout -b feat/your-feature
# ... make changes and commits ...

# Final verification before PR
npm test                  # All tests pass
npm run lint             # No linting errors
npm run build            # Production build succeeds
```

### Required PR Template

Use the official GitHub PR template with complete information:

```markdown
## Description
[Clear explanation of what this PR does. Be specific about the problem solved.]

## Type of Change
- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## Motivation and Context
[Why is this change needed? What problem does it solve? Reference issues/PRs.]

## Changes Made
- [Change 1] - Brief description with impact
- [Change 2] - Files affected and what changed
- [Change 3] - Any breaking changes or special considerations

## Testing
- [x] All existing tests pass locally
- [x] Added new tests for new features (X tests added)
- [x] Manual testing completed (browsers/themes tested)
- [x] No console errors or warnings
- [x] Mobile responsive verified
- [x] Tested in multiple themes

### Test Results
```
Test Suites: X passed, X total
Tests:       X passed, X total
Coverage:    X% statements, X% branches, X% functions, X% lines
```

## Documentation
- [x] Updated code comments (X functions documented)
- [x] Updated DESIGN-SYSTEM.md (new components added)
- [x] Updated ARCHITECTURE.md (architecture changes documented)
- [x] Updated TESTING.md (new test patterns documented)
- [ ] No documentation changes needed

## Screenshots/Videos (if applicable)
### Before
![Before screenshot](link)

### After
![After screenshot](link)

## Breaking Changes
[List any breaking changes if applicable]

### Migration Guide
[Steps for upgrading if breaking change]

## Performance Impact
[Any performance implications]

### Bundle Size
- Before: X kB → After: Y kB (change: Z kB)
- Lazy loaded: X kB
- First load impact: Y kB

## Checklist
- [x] My code follows the project's code style
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have updated the documentation
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix/feature works
- [x] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

## AI Agent Notes (optional)
**Autonomy level:** Full / Partial / Supervised
**Questions during development:** X questions asked
**Blockers encountered:** Y (described below)
**Time taken:** Z hours
**Confidence level:** High / Medium / Low
```

### PR Submission Process

1. **Create PR on GitHub**
   - Select your feature branch
   - Choose `main` as base branch
   - Fill out template completely
   - Add relevant labels

2. **Set yourself as assignee**
   - Add yourself as assignee
   - Optionally add reviewers

3. **Initialize CI**
   - Push any final commits to trigger CI
   - Monitor CI pipeline (lint → tests → build)

4. **Address CI Failures**
   ```
   # If tests fail:
   npm test                                    # Run locally
   # Fix issues
   git commit -m "fix: correct test assertions"
   git push

   # If lint fails:
   npm run lint
   # Fix issues
   git commit -m "style: fix eslint errors"
   git push

   # If build fails:
   npm run build
   # Fix issues
   git commit -m "fix: resolve build errors"
   git push
   ```

### PR Review Triggers

**CI must pass before:**
- PR can be merged
- Review comments can be resolved
- Branch protection rules allow merge

**Blocked Actions:**
- Cannot merge until CI is green
- Cannot approve reviews with failed CI
- Stalled PRs automatically notify after 24 hours

---

## 5. Code Review Guidelines

### Review Process

1. **Automated Review First**
   - Wait for CI to complete
   - Check test coverage reports
   - Verify linting passes
   - Review build artifacts

2. **Manual Code Review**
   - Review code changes
   - Verify tests included
   - Check documentation updates
   - Validate functionality

3. **Discussion & Feedback**
   - Request changes if needed
   - Ask questions for clarification
   - Approve or suggest revisions

4. **Final Approval & Merge**
   - Ensure all stakeholders approve
   - Squash and merge per guidelines
   - Close related issues

### Review Criteria

**✅ Must Approve (Blocking)**
- Code follows project conventions
- All tests pass (including new ones)
- Documentation updated correctly
- No security vulnerabilities
- No breaking changes without plan
- Performance not negatively impacted

**❌ Must Fix (Blocking)**
- Fails to build/deploy
- Breaking existing functionality
- Security issues
- Console errors or warnings
- Missing tests for new features
- Non-trivial code without comments
- Readability issues blocking maintenance

**⚠️ Should Consider (Suggestions)**
- Code style inconsistencies
- Performance optimizations
- Additional test coverage
- Alternative implementations
- Documentation improvements
- Future maintainability

### Review Response Protocol

**As a contributor, respond to review feedback:**

**For simple fixes:**
```
✅ Done - Applied suggested changes in commit [abc123]

Files modified:
- src/components/Button.js (fixed prop validation)
- src/components/Button.test.js (added missing test)

Verification:
- All tests pass locally
- Build succeeds
- Linting passes
```

**For complex changes:**
```
Thanks for the review feedback! Here's my response to each point:

**Point 1 - Context usage:**
Good catch. I've refactored to use the NavigationContext pattern instead.
Changed in commit [def456].

**Point 2 - Error handling:**
Added try/catch and user-friendly error messages in commit [ghi789].

**Point 3 - Test coverage:**
Added 5 additional test cases covering edge cases in commit [jkl012].

All changes have been tested:
- Unit tests: ✅ 42/42 passing
- Integration tests: ✅ 8/8 passing
- Manual testing: ✅ Works in all themes

Ready for re-review or additional feedback.
```

**For disagreements:**
```
I appreciate the feedback on the architecture choice.

My reasoning for the current approach:
- [Reason 1 with technical details]
- [Reason 2 with project context]
- [Reason 3 with maintainability impact]

I considered [alternative approach] but chose this for [specific reasons].

I'm open to discussing this further. Would you prefer I change to [alternative]
or can we move forward with the current implementation?

FWIW, the current approach:
- Is used elsewhere in the codebase (X other places)
- Has precedent in similar projects
- Can be easily changed later if needed
```

### Review Time Expectations

**Response Time Goals:**
- **24 hours:** Initial review assignment
- **24-48 hours:** In-depth review completion
- **24 hours:** Response to review comments
- **1 week:** Maximum delay before follow-up

**Urgency Escalation:**
- Production bugs: Review within 4 hours
- Security fixes: Review within 2 hours
- Breaking changes: 24 hours for consensus
- Regular features: 24-48 hours

---

## 6. Merge Strategy & Cleanup

### Squash and Merge Policy

**Why Squash and Merge:**
- Keeps `main` history clean and readable
- Groups related commits into meaningful units
- Enables easy rollbacks if needed
- Simplifies future `git log` analysis
- Reduces commit noise from WIP commits

**When to Squash:**
- Feature branches with multiple commits
- Fix branches with iteration commits
- Refactor branches with intermediate states

**When NOT to Squash:**
- Single logical commit already
- Explicitly requested to preserve history
- Rebases from main requiring specific commits

### Merge Process

**Step-by-Step:**

1. **Get Final Approval**
   - All reviewers approve
   - CI still passing
   - No outstanding blocking comments

2. **Choose Merge Option**
   - Select "Squash and merge"
   - Default commit message uses PR title
   - Override with better message if needed

3. **Enter Merge Commit Message**
   ```
   feat(ui): add notification badge component

   Implements notification badges for items with unread counts.
   Displays number up to 99, then "99+".
   Supports all 8 themes and mobile responsive.

   - Add NotificationBadge atom component
   - Update DESIGN-SYSTEM.md usage docs
   - Add comprehensive test suite (8 tests)
   - Verified accessibility compliance

   Fixes #123
   Refs: #124, #125
   Co-authored-by: Reviewer Name <reviewer@email.com>
   ```

4. **Complete Merge**
   - Click "Squash and merge"
   - Confirm merge commit message
   - Merge completes automatically

5. **Monitor Post-Merge**
   - Staging deployment (automatic via GitHub Actions)
   - Verify staging works correctly
   - Check for any production issues

### Branch Cleanup

**Immediate Cleanup:**
```bash
# After successful merge
git checkout main
git pull origin main                    # Get the merge
git branch -D feat/notification-badge   # Delete local branch

# Delete remote branch (optional, auto-deletes if enabled)
git push origin --delete feat/notification-badge
```

**Cleanup Verification:**
```bash
# Confirm branch gone
git branch -a | grep notification-badge  # Should show nothing
git log --oneline -5                     # Should show the squash commit

# Verify staging deployment
# Check GitHub Actions for staging deployment status
# Test staging URL for functionality
```

---

## 7. Cross-Platform Branch Management

### Collaboration Workflow

**Multi-Developer Branch Workflow:**

1. **Stay Updated**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/my-work
   ```

2. **Regular Rebases (1x daily)**
   ```bash
   git checkout main
   git pull origin main
   git checkout feat/my-work
   git rebase main
   ```

3. **Push with Force After Rebase**
   ```bash
   # After rebase conflicts resolved
   git push origin feat/my-work --force-with-lease
   ```

4. **Clean Rebase During Review**
   ```bash
   # Before PR submission
   git rebase main -i  # Interactive rebase to clean history
   git push origin feat/my-work --force-with-lease
   ```

### Conflict Resolution

**Merge Conflict Process:**
```bash
# When rebase conflicts occur
git status                              # See conflicted files
# Edit files to resolve conflicts
# Remove conflict markers
git add resolved-file.js
git rebase --continue
```

**If stuck during rebase:**
```bash
# Abort and start over
git rebase --abort
git checkout main
git pull origin main
git checkout -b temp-my-work
git cherry-pick [commit-hashes-to-preserve]  # Or merge
```

### Remote Branch Management

**Clean up stale branches:**
```bash
# List remote branches
git branch -r

# Delete merged branches
git push origin --delete feat/old-branch
```

**Find orphaned branches:**
```bash
# Branches not in main
git log --oneline --all --not main --no-merges
```

---

## Essential Git Commands Reference

**Daily Work:**
```bash
# Start work
git checkout main && git pull origin main
git checkout -b feat/new-feature

# During work
git status              # Check state
git add .               # Stage all
git commit -m "feat: description"

# Push work
git push -u origin feat/new-feature

# End day
git add . && git commit -m "wip: describe current state"
```

**Branch Management:**
```bash
# Rebase daily
git checkout main && git pull origin main
git checkout feature-branch && git rebase main

# Clean before PR
git rebase main -i      # Interactive rebase
git push --force-with-lease

# After merge
git checkout main && git pull origin main
git branch -D feature-branch
```

**Fixing Mistakes:**
```bash
# Commit to wrong branch
git stash               # Stash work
git checkout correct-branch
git stash pop          # Restore work

# Commit message wrong
git commit --amend
# Edit message in editor

# Accidental commits
git reset --soft HEAD~2  # Keep changes, uncommit
git reset --hard HEAD~2  # Lose changes
```

---

## Related Documentation

- **[COMMIT_CONVENTION.md](../COMMIT_CONVENTION.md)** - Complete commit message guide
- **[docs/ai-agent/COMMUNICATION-PROTOCOL.md](../ai-agent/COMMUNICATION-PROTOCOL.md)** - Review response guidelines
- **[docs/THE_ULTIMATE_TESTING_ALGORITHM.md](THE_ULTIMATE_TESTING_ALGORITHM.md)** - Complete testing methodology
- **[TESTING-OVERVIEW.md](TESTING-OVERVIEW.md)** - Testing philosophy summary
- **Git Documentation:** Official Git documentation and Pro Git book

---

**Living Document:** This workflow evolves based on team needs and project growth. Update procedures through PR to maintain accuracy.
