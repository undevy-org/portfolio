# Standard Task Workflow Protocol

This protocol outlines the mandatory, step-by-step process for implementing any change in the project. Adhering to this workflow ensures code quality, prevents regressions, maintains a clean history, and automates the release and deployment cycle.

## Overview

The Standard Task Workflow Protocol is a 6-phase process that must be followed for every code change, feature addition, bug fix, or documentation update. This protocol was implemented to establish consistency, maintain quality, and enable automation in our development and deployment processes.

## Prerequisites

Before starting any work, ensure you have:
- Git repository access
- Local development environment set up
- Understanding of conventional commit standards
- Access to project documentation

## Phase 1: Preparation & Branching

**Goal:** To create a clean, isolated environment for your changes, based on the latest version of the project.

### 1.1 Synchronize Your Local `main` Branch
Before starting any new work, ensure your local `main` branch is perfectly in sync with the remote repository on GitHub.

```bash
# In your macOS Terminal, navigate to the project directory
cd /Users/undevy/portfolio-project

# Switch to the main branch
git checkout main

# Pull the latest changes from the remote 'origin'
git pull origin main
```

### 1.2 Create a New Feature Branch
Create a new branch from `main`. The branch name must follow our conventional commit naming standard (`type/description`).

```bash
# Examples of branch names:
# feat/add-contact-form
# fix/header-alignment-issue
# docs/update-readme

git checkout -b <type>/<descriptive-name>

# Real example:
git checkout -b feat/add-image-lightbox
```

**Branch Naming Conventions:**
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

## Phase 2: Development & Local Validation

**Goal:** To write the code and continuously verify its correctness on your local machine. This is an iterative loop.

### 2.1 Code the Changes
Make all necessary code modifications in your preferred editor.

### 2.2 Visually Verify Your Work
Run the local development server to see your changes in the browser.
```bash
npm run dev
```
Open `http://localhost:3000` and confirm the new feature or fix works as intended.

### 2.3 Run the Linter
Check your code for any style or syntax issues.
```bash
npm run lint
```
Fix any errors or warnings that appear.

### 2.4 Run the Test Suite
Ensure your changes have not broken any existing functionality (regressions).
```bash
npm test
```
All tests must pass before you proceed.

### 2.5 Iterate
Continue this code-and-validate cycle until the feature is complete and all local checks are successful.

**Quality Gates:**
- ✅ Visual verification passes
- ✅ ESLint shows no errors
- ✅ All tests pass
- ✅ No console errors

## Phase 3: Documentation Update

**Goal:** To ensure all project documentation accurately reflects the new changes. **Do not skip this step.**

### 3.1 Review and Update Relevant Documents
Based on your changes, update any of the following files. **`CHANGELOG.md` is updated automatically later.**

- `README.md`: Does the project overview or feature list need updating?
- `ARCHITECTURE.md`: Did you change a core part of the system's architecture?
- `DESIGN-SYSTEM.md`: Did you introduce a new UI component or change a core style?
- `SETUP.md`: Does your change affect the deployment or setup process?
- `TESTING.md`: Did you add new tests or change testing procedures?
- Any other relevant documentation.

**Documentation Checklist:**
- [ ] README.md updated if features/setup changed
- [ ] Architecture docs updated if system design changed
- [ ] Design system docs updated if UI components added/modified
- [ ] Testing docs updated if test procedures changed

## Phase 4: Code Review & Continuous Integration (CI)

**Goal:** To get your code into the `main` branch through a safe, automated, and reviewed process.

### 4.1 Commit Your Changes
Stage all your changes and write a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) standard.

```bash
git add .
git commit -m "feat(ui): add lightbox feature to project images"
```

**Conventional Commit Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Common Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### 4.2 Push Your Branch to GitHub
```bash
git push origin feat/add-image-lightbox
```

### 4.3 Create a Pull Request (PR)
- Go to the repository on GitHub
- Click the "Compare & pull request" button for your new branch
- Write a clear title and a description of the changes
- Click "Create pull request"

### 4.4 Await Automated CI Checks
The creation of the PR automatically triggers our `CI Pipeline`. It performs three checks:
- **Linter:** Verifies code style
- **Tests:** Runs the full test suite
- **Build:** Confirms the project builds successfully

The "Merge" button will be blocked until all checks pass.

### 4.5 Merge the Pull Request
Once all checks are green, merge the PR into `main` using the **"Squash and merge"** option. This keeps our `main` branch history clean, with one commit per feature/fix.

## Phase 5: Release & Deployment

**Goal:** To create a new version of the project, update the changelog, and deploy it to production.

### 5.1 Sync Local `main` After Merging
Before creating a release, switch back to `main` and pull the changes you just merged.

```bash
git checkout main
git pull origin main
```

### 5.2 Determine the Version Type
Based on your changes, decide if this is a `patch`, `minor`, or `major` release.
- `patch`: For bug fixes and small improvements
- `minor`: For new, backward-compatible features
- `major`: For breaking changes

### 5.3 Create the Release
Run the release script. This will automatically update `package.json` and `CHANGELOG.md`, then create a commit and a git tag.

```bash
# For a patch release (most common)
npm run release -- --release-as patch

# For a minor release
npm run release -- --release-as minor

# For a major release
npm run release -- --release-as major
```

### 5.4 Push the Release to GitHub
This command pushes the new commit and the new tag, which triggers the final steps.

```bash
git push --follow-tags origin main
```

### 5.5 Monitor Automated Processes
- **GitHub Release:** A GitHub Actions workflow will automatically create a new Release on the repository page
- **Deployment:** The merge to `main` will have already triggered the deployment workflow, which deploys the new version to the server

## Phase 6: Cleanup

**Goal:** To keep the repository clean and tidy.

### 6.1 Delete the Remote Branch
On the merged Pull Request page on GitHub, click the "Delete branch" button.

### 6.2 Delete the Local Branch
```bash
# Ensure you are back on the main branch
git checkout main

# Delete the feature branch you were working on
git branch -D feat/add-image-lightbox
```

## Workflow Validation Checklist

Before completing any phase, verify:

**Phase 1 - Preparation:**
- [ ] Main branch is up to date
- [ ] Feature branch created with proper naming
- [ ] Working in isolated environment

**Phase 2 - Development:**
- [ ] Code changes implemented
- [ ] Visual verification completed
- [ ] Linter passes without errors
- [ ] All tests pass
- [ ] No regressions introduced

**Phase 3 - Documentation:**
- [ ] Relevant documentation updated
- [ ] Changes clearly documented
- [ ] Examples provided where necessary

**Phase 4 - Integration:**
- [ ] Conventional commit message used
- [ ] Pull request created with clear description
- [ ] All CI checks pass
- [ ] Code review completed (if required)

**Phase 5 - Release:**
- [ ] Main branch synchronized
- [ ] Appropriate version type selected
- [ ] Release created successfully
- [ ] Deployment confirmed

**Phase 6 - Cleanup:**
- [ ] Remote branch deleted
- [ ] Local branch deleted
- [ ] Repository is clean

## Quality Gates

The following quality gates must be satisfied at each phase:

### Code Quality Gates
- ESLint must pass with zero errors
- All existing tests must continue to pass
- New functionality must include appropriate tests
- Code must follow established patterns and conventions

### Process Quality Gates
- Conventional commit format must be used
- Pull requests must include clear descriptions
- Documentation must be updated for user-facing changes
- All CI checks must pass before merge

### Release Quality Gates
- Version type must match the nature of changes
- CHANGELOG.md must be automatically updated
- Tags must be properly created and pushed
- Deployment must complete successfully

## Emergency Procedures

### Hotfix Process
For critical production issues:

1. Create hotfix branch from `main`: `git checkout -b hotfix/critical-issue`
2. Follow abbreviated workflow: fix → test → commit → PR
3. Fast-track review process
4. Deploy immediately after merge
5. Follow up with proper documentation

### Rollback Process
If deployment issues are detected:

1. Identify the last known good version
2. Use `git revert` for safer rollback
3. Create emergency release
4. Investigate and document the issue

## Monitoring and Compliance

### Success Metrics
- 100% adherence to 6-phase workflow process
- Zero unauthorized direct commits to main branch
- Average time from feature start to deployment < 1 day
- Automated CI pipeline blocks non-compliant changes

### Compliance Monitoring
- Regular audits of branch history
- Review of commit message standards
- Verification of documentation updates
- Assessment of test coverage maintenance

This completes the entire lifecycle of a task. Following this process rigorously is the key to our project's stability and success.

## Implementation Status

This workflow protocol has been successfully implemented with the following achievements:

### ✅ Completed Implementations
- **Test Infrastructure Enhancement**: Comprehensive test utilities and mock providers
- **Accordion Component Tests**: 18 tests covering all functionality (100% passing)
- **Integration Tests**: 8 test scenarios covering critical user flows (87.5% passing)
- **Documentation Updates**: Updated TESTING.md with new procedures and achievements

### 📊 Current Test Metrics
- **8 test suites** running
- **80+ tests** total
- **Component tests** for critical UI elements
- **Integration tests** for user flows
- **Unit tests** for all utility functions

### 🔄 Continuous Improvements
The workflow protocol continues to evolve based on team feedback and project needs, ensuring optimal development velocity while maintaining quality standards.