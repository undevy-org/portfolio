# 🤖 AI Agent - Start Here!

Welcome to the Interactive Terminal Portfolio project!

---

## 🎯 Your Mission

You are an autonomous AI agent assigned to develop and maintain this Next.js/React portfolio application. Your role is to execute tasks independently while following established patterns and escalating when needed.

**This project is:**
- A sophisticated terminal-inspired portfolio built with Next.js 15 and React 19
- Component-based architecture following atomic design principles
- 8 unique themes with CSS variable system
- Comprehensive testing infrastructure (300+ tests)
- Automated CI/CD with blue-green deployments
- Web3 wallet integration with lazy loading

---

## 📚 Essential Reading Path

Follow this sequence - each document builds on the previous:

### 1️⃣ **Orientation** 
**This document:** Project overview, navigation, and first steps

### 2️⃣ **[WORKFLOW.md](WORKFLOW.md)** ⭐ CRITICAL
**Complete development methodology:**
- Task selection and assessment
- Development cycle (Plan → Execute → Test → Document)
- Git workflow integration
- Quality standards
- Release process

### 3️⃣ **[DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md)** 
**Autonomy guidelines:**
- When to act independently
- When to ask questions
- Risk assessment
- Escalation procedures

### 4️⃣ **[TASK-EXECUTION.md](TASK-EXECUTION.md)** (Reference as needed)
**Step-by-step procedures:**
- Pre-execution checklist
- Implementation steps
- Testing requirements
- Documentation updates
- PR creation process

### 5️⃣ **[COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md)** (Reference as needed)
**Team communication:**
- Question format and templates
- Progress reporting
- Blocker documentation
- Review response protocol

---

## 🗺️ Project Navigation

### Quick Status Check

```bash
# What changed recently?
git log --oneline -10

# View recent releases
cat CHANGELOG.md | head -100

# Understand project evolution
cat docs/DEVELOPMENT_HISTORY.md | grep "Phase"

# Check current project state
git status
```

### Key Documentation Map

**Architecture & Design:**
```bash
# How does the system work?
cat ARCHITECTURE.md | less

# What are our UI patterns?
cat docs/DESIGN-SYSTEM.md | less

# Component structure and theming
cat docs/PERSISTENT-SHELL.md | less
```

**Development Process:**
```bash
# Official workflow protocol
cat Standard_Task_Workflow_Protocol.md | less

# Testing methodology
cat docs/TESTING.md | less
cat The_Ultimate_Testing_Algorithm.md | less

# Commit message format
cat COMMIT_CONVENTION.md | less
```

---

## 🏗️ Project Structure

```
portfolio-project/
│
├── src/                          # Application code
│   ├── app/                     # Next.js App Router
│   │   ├── page.js             # Main entry point
│   │   ├── layout.js           # Root layout
│   │   └── globals.css         # Global styles + theme variables
│   │
│   ├── components/              # React components (atomic design)
│   │   ├── atoms/              # Basic UI: Button, Input, Badge, Icon
│   │   ├── molecules/          # Composite: LogEntry, Alert, Accordion
│   │   ├── organisms/          # Complex: Header, Navigation, Timeline
│   │   └── templates/          # Layouts: LoadingScreen, ErrorScreen
│   │
│   ├── contexts/               # React Context providers
│   │   ├── SessionContext.js  # Theme, auth, global state
│   │   └── NavigationContext.js # Screen navigation, history
│   │
│   ├── screens/                # Full screen components
│   │   ├── LoadingScreen.js   # Initial loading state
│   │   ├── AccessScreen.js    # Authentication screen
│   │   ├── MainHub.js         # Main navigation hub
│   │   └── ... (other screens)
│   │
│   └── utils/                  # Utility functions
│       ├── validators.js      # Input validation
│       └── formatters.js      # Data formatting
│
├── __tests__/                  # Test suites
│   ├── components/            # Component tests
│   ├── contexts/              # Context tests
│   ├── utils/                 # Utility tests
│   └── test-utils/            # Testing helpers
│       └── providers.js       # Mock providers for tests
│
├── public/                     # Static assets
│   └── images/                # Images and icons
│
├── docs/                       # Documentation
│   ├── ai-agent/              # Your documentation (this folder!)
│   ├── SETUP.md               # Deployment guide
│   ├── TESTING.md             # Testing strategy
│   ├── DESIGN-SYSTEM.md       # UI components guide
│   └── ... (other docs)
│
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yml             # Lint, test, build
│       ├── staging-deploy.yml # Auto-deploy to staging
│       └── release-deploy.yml # Production deployment
│
├── ARCHITECTURE.md             # Technical deep-dive
├── CHANGELOG.md                # Version history
├── DEVELOPMENT_HISTORY.md      # Project evolution
├── Standard_Task_Workflow_Protocol.md # Official workflow
├── The_Ultimate_Testing_Algorithm.md  # Testing guide
└── COMMIT_CONVENTION.md        # Commit format rules
```

---

## 🎯 Current Project State

### Recent Achievements (from CHANGELOG.md)

**Version 6.0.4** (Current)
- ✅ UI refactoring complete (70% code reduction)
- ✅ Component-based architecture established
- ✅ Web3 lazy loading (2MB bundle size reduction)
- ✅ 300+ tests passing
- ✅ 8 themes fully functional (dark, light, amber, bsod, synthwave, operator, kyoto, radar)
- ✅ Atomic design hierarchy implemented

**Recent Focus Areas:**
- Component library development
- Visual consistency improvements
- Performance optimization
- Testing infrastructure

### Technology Stack

**Core Framework:**
- **Next.js:** 15.4.7 (App Router with React Server Components)
- **React:** 19.1.0 (latest stable)
- **Node.js:** 18+ required

**Styling:**
- **Tailwind CSS:** Utility-first styling
- **CSS Variables:** Theme system (8 themes)
- **Font:** IBM Plex Mono (terminal aesthetic)

**State Management:**
- **SessionContext:** Global state (theme, auth, session data)
- **NavigationContext:** Navigation state and history
- **Component State:** Local state with useState/useReducer

**Testing:**
- **Jest:** Test runner
- **React Testing Library:** Component testing
- **Coverage:** >80% target across all modules

**Web3 Integration:**
- **Reown/WalletConnect:** Wallet connection
- **Lazy Loading:** Optimized bundle splitting
- **Multiple Wallets:** MetaMask, Coinbase, WalletConnect

**CI/CD:**
- **GitHub Actions:** Automated workflows
- **Linting:** ESLint for code quality
- **Type Checking:** PropTypes (migrating to TypeScript considerations)

---

## 🚀 Quick Start Commands

### Development
```bash
# Start development server (with hot reload)
npm run dev
# → Runs on http://localhost:3000
# → Auto-reloads on file changes
# → Shows compilation errors in browser

# Run tests in watch mode
npm test -- --watch
# → Re-runs tests on file changes
# → Interactive test runner

# Run linter
npm run lint
# → Checks code style
# → Must pass before PR merge

# Build for production
npm run build
# → Creates optimized production build
# → Tests if everything compiles correctly
```

### Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test Button.test.js

# Run tests with coverage report
npm test -- --coverage

# Run tests matching pattern
npm test -- --testNamePattern="renders correctly"
```

### Git Workflow
```bash
# Start new task
git checkout main
git pull origin main
git checkout -b feat/your-feature-name

# Check status
git status

# Stage and commit
git add .
git commit -m "feat(scope): your message"

# Push and create PR
git push origin feat/your-feature-name
```

---

## 📋 Your First Task

### Step 1: Read Core Workflow (Required)

**Before doing anything else, read [WORKFLOW.md](WORKFLOW.md) completely.**

This is non-negotiable. The workflow document contains:
- Complete development cycle
- Quality standards
- Testing requirements
- Git conventions
- Release process

**Time investment:** 30 minutes  
**Return:** Weeks of avoided mistakes

### Step 2: Identify a Task

**Option A: Check Recent Work (Recommended for first task)**

```bash
# Look at recent changes to understand current focus
cat CHANGELOG.md | head -50

# See what's been worked on recently
git log --oneline --since="2 weeks ago"

# Check development history for current phase
cat docs/DEVELOPMENT_HISTORY.md | grep "Phase"
```

Look for:
- Incomplete features mentioned
- Areas marked "TODO" in code comments
- Test coverage gaps
- Documentation that needs updating

**Option B: Review Open Issues**

Check GitHub Issues for:
- Issues labeled `good-first-issue`
- Issues labeled `enhancement`
- Bug reports that match your skill level

**Option C: Propose an Improvement**

If you see something that could be better:
1. Check if it's already documented as needed
2. Verify it aligns with project direction
3. Create a proposal issue before implementing

### Step 3: Assess the Task

**Use [DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md) to evaluate:**

**Low-risk tasks (proceed independently):**
- Adding a new component following existing patterns
- Writing tests for existing components
- Fixing typos or improving documentation
- Adding CSS classes using design system
- Small UI improvements

**Medium-risk tasks (document your approach):**
- Refactoring existing components
- Adding new npm dependencies
- Modifying existing APIs
- Performance optimizations

**High-risk tasks (always ask first):**
- Breaking changes to public APIs
- Architecture modifications
- Changes to SessionContext or NavigationContext
- Web3 integration changes
- Multi-theme system changes

### Step 4: Execute Following [TASK-EXECUTION.md](TASK-EXECUTION.md)

Follow the step-by-step process:
1. Pre-execution checklist
2. Create feature branch
3. Implement changes
4. Write comprehensive tests
5. Update documentation
6. Create PR with detailed description

### Step 5: Complete and Learn

After your first task:
- Review what went well
- Note what was confusing
- Consider suggesting documentation improvements
- Move to next task

---

## 🎓 Key Concepts You Need to Understand

### 1. Atomic Design Component Structure

The project uses atomic design methodology:

**Atoms** (Basic building blocks)
- Individual UI elements: Button, Input, Badge, Icon
- No dependencies on other components
- Highly reusable
- Example: `<Button variant="primary">Click</Button>`

**Molecules** (Simple combinations)
- Combine atoms into functional groups
- Example: LogEntry (Icon + Text), Alert (Icon + Message + Button)
- Still fairly simple and reusable

**Organisms** (Complex components)
- Major sections: Header, Navigation, Timeline
- Can contain molecules and atoms
- More specialized functionality

**Templates** (Page layouts)
- Full screen structures: LoadingScreen, ErrorScreen, MainHub
- Compose organisms, molecules, and atoms
- Define page structure

**Where to add new components:**
- Simple UI element → atoms/
- Combination of atoms → molecules/
- Complex feature → organisms/
- Full screen → templates/

### 2. Theme System

8 themes implemented via CSS variables:

```css
/* Each theme defines variables like: */
--background: #0a0e14;
--text: #e6e6e6;
--terminal-green: #00ff00;
/* ... etc */
```

**When creating components:**
```javascript
// Use theme variables, not hardcoded colors
<div className="bg-background text-text border-terminal-green">
  {/* Content */}
</div>

// For hover states
<button className="hover:bg-terminal-green/10">
  {/* Content */}
</button>
```

**Testing themes:**
- All themes must look good
- Test at least dark and light
- Use theme switcher in dev mode

### 3. Context System

**SessionContext** - Global application state
```javascript
import { useSession } from '@/contexts/SessionContext';

function Component() {
  const { 
    theme,           // Current theme name
    sessionData,     // Content data
    isAuthenticated, // Auth status
    setTheme         // Theme setter
  } = useSession();
}
```

**NavigationContext** - Screen navigation
```javascript
import { useNavigation } from '@/contexts/NavigationContext';

function Component() {
  const { 
    currentScreen,  // Current screen name
    navigateTo,     // Navigate function
    canGoBack,      // Can go back?
    goBack          // Go back function
  } = useNavigation();
}
```

**When to use contexts:**
- Need theme info → useSession
- Need navigation → useNavigation
- Need session data → useSession
- Don't use if you can pass props

### 4. Testing Philosophy

**Every component needs tests:**
- Rendering test (does it render?)
- Props test (do props work?)
- Interaction test (do clicks work?)
- State test (does state update?)
- Context test (does it use context correctly?)
- Edge cases (nulls, empty arrays, errors)

**Use The_Ultimate_Testing_Algorithm.md:**
1. Read component completely
2. Identify dependencies
3. Map rendering conditions
4. List interactions
5. Write tests progressively (simple → complex)

**Coverage requirement:** >80% across the board

### 5. Conventional Commits

**Every commit message follows this format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Common types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (not CSS)
- `refactor`: Code change (no feature/fix)
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
git commit -m "feat(ui): add notification badge component"
git commit -m "fix(navigation): correct back button on mobile"
git commit -m "docs(design): update button usage examples"
git commit -m "test(atoms): improve button test coverage"
```

**Why this matters:**
- Automated changelog generation
- Automated version bumping
- Clear history
- Easy to understand changes

### 6. Pull Request Process

**Workflow:**
```
Create branch
    ↓
Make changes
    ↓
Write tests
    ↓
Update docs
    ↓
Commit (conventional format)
    ↓
Push branch
    ↓
Create PR
    ↓
CI runs (lint, test, build)
    ↓
Get review
    ↓
Address feedback
    ↓
Squash and merge
    ↓
Auto-deploy to staging
    ↓
Manual tag for production
```

**PR Requirements:**
- All tests pass
- Linter passes
- Build succeeds
- Documentation updated
- Conventional commit format
- Descriptive PR description

---

## 🚨 Critical Reminders

### What You MUST Do

1. **Always start from clean main branch**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Always run tests before pushing**
   ```bash
   npm test
   npm run lint
   ```

3. **Always update documentation with code changes**
   - New component? Update DESIGN-SYSTEM.md
   - Changed architecture? Update ARCHITECTURE.md
   - New pattern? Update relevant docs

4. **Always follow Standard_Task_Workflow_Protocol.md**
   - Create feature branch
   - Make changes
   - Test thoroughly
   - Update docs
   - Create PR
   - Get review
   - Squash merge
   - Delete branch

5. **Always use conventional commits**
   - Format: `type(scope): subject`
   - See COMMIT_CONVENTION.md for details

### What You MUST NEVER Do

1. **NEVER commit directly to main**
   - Always use feature branches
   - Always create PRs
   - Always get CI approval

2. **NEVER skip testing**
   - Write tests for new code
   - Verify existing tests pass
   - Maintain >80% coverage

3. **NEVER ignore linter errors**
   - Fix all linting issues
   - Don't use disable comments without reason
   - Follow project code style

4. **NEVER push without documenting**
   - Update relevant docs
   - Add code comments
   - Explain complex logic

5. **NEVER assume - ask when uncertain**
   - Use COMMUNICATION-PROTOCOL.md format
   - Better to ask than break something
   - Document your reasoning

### When to Ask Questions

**Ask immediately if:**
- Requirements are unclear or contradictory
- Technical approach is uncertain
- Breaking changes might be needed
- Architecture decisions are required
- You're stuck for more than 15 minutes

**Use [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md) format:**
```markdown
## ❓ Question: [Brief Topic]

**Context:** [What you're working on]
**Priority:** HIGH / MEDIUM / LOW

### Current Understanding
[What you know]

### The Question
[Specific questions]

### Proposed Solution
[Your ideas]

### What I Need
[Decision/info needed]
```

---

## 📊 Success Metrics

### You're Doing Well When:

**Code Quality:**
- ✅ All tests pass first time
- ✅ Linter approves without changes
- ✅ Build succeeds first try
- ✅ CI pipeline is green

**Process:**
- ✅ Following workflow protocol
- ✅ Creating clear PRs
- ✅ Documentation stays current
- ✅ Using conventional commits

**Autonomy:**
- ✅ Completing tasks without constant questions
- ✅ Making appropriate decisions
- ✅ Escalating when truly needed
- ✅ Following established patterns

**Collaboration:**
- ✅ Clear communication
- ✅ Responsive to feedback
- ✅ Helpful PR descriptions
- ✅ Thoughtful questions

### Warning Signs:

**Red Flags:**
- ❌ CI failing repeatedly
- ❌ Making same mistakes
- ❌ Ignoring existing patterns
- ❌ Not writing tests
- ❌ Skipping documentation

**If you see these:**
1. Stop and review this guide
2. Review the specific process document
3. Ask for clarification
4. Don't continue with uncertainty

---

## 🔄 Daily Workflow

### Starting Your Day

```bash
# 1. Update your local repository
git checkout main
git pull origin main

# 2. Check recent changes
git log --oneline -10

# 3. Review what you're working on
git branch --show-current

# 4. If no branch, review CHANGELOG.md for ideas
cat CHANGELOG.md | head -50

# 5. If you have a branch, check status
git status
```

### During Development

```bash
# Run dev server in one terminal
npm run dev

# Run tests in watch mode in another
npm test -- --watch

# Check your work frequently
npm run lint
```

### Before Pushing

```bash
# Final checks
npm test
npm run lint
npm run build

# Review changes
git diff

# Commit with conventional format
git add .
git commit -m "feat(scope): description"

# Push
git push origin your-branch
```

### End of Day

```bash
# Commit any work in progress
git add .
git commit -m "wip: description of current state"
git push origin your-branch

# Or stash if not ready to commit
git stash save "WIP: current work description"
```

---

## 📚 Additional Resources

### For Component Development
- **DESIGN-SYSTEM.md** - Complete component library and usage guidelines
- **ARCHITECTURE.md** - Technical architecture and design decisions
- **PERSISTENT-SHELL.md** - SPA architecture and state management

### For Testing
- **TESTING.md** - Testing philosophy and strategies
- **The_Ultimate_Testing_Algorithm.md** - Step-by-step testing guide
- **test-utils/providers.js** - Mock providers for testing

### For Deployment
- **SETUP.md** - Complete deployment guide
- **.github/workflows/** - CI/CD configuration

### For Understanding History
- **CHANGELOG.md** - What changed and when
- **DEVELOPMENT_HISTORY.md** - How the project evolved
- **Git history** - `git log --graph --oneline`

---

## 🎯 Quick Decision Tree

```
New task?
    ↓
Read WORKFLOW.md? ─NO→ Go read it now!
    ↓ YES
Understand requirements? ─NO→ Ask questions (COMMUNICATION-PROTOCOL.md)
    ↓ YES
Assess risk (DECISION-FRAMEWORK.md)
    ↓
High risk? ─YES→ Ask before proceeding
    ↓ NO (Low/Medium)
Create branch
    ↓
Implement (TASK-EXECUTION.md)
    ↓
Write tests (The_Ultimate_Testing_Algorithm.md)
    ↓
Update docs
    ↓
All tests pass? ─NO→ Fix tests
    ↓ YES
Linter pass? ─NO→ Fix lint errors
    ↓ YES
Build succeeds? ─NO→ Fix build errors
    ↓ YES
Commit (COMMIT_CONVENTION.md)
    ↓
Push & create PR
    ↓
CI pass? ─NO→ Fix issues
    ↓ YES
Get review
    ↓
Approved? ─NO→ Address feedback
    ↓ YES
Squash merge
    ↓
Delete branch
    ↓
Next task! 🎉
```

---

## 🤝 Getting Help

### Documentation Hierarchy

1. **Check this guide first** - Answers most orientation questions
2. **Check workflow docs** - WORKFLOW.md, TASK-EXECUTION.md
3. **Check technical docs** - ARCHITECTURE.md, DESIGN-SYSTEM.md
4. **Check code examples** - Existing similar components
5. **Check git history** - Past PRs for similar features
6. **Ask using COMMUNICATION-PROTOCOL.md** - Well-formatted questions

### Common Scenarios

**"I don't know where to start"**
→ You're in the right place! Read this entire document.

**"I don't know what to work on"**
→ Check CHANGELOG.md for recent focus areas, then select a related improvement.

**"I don't know how to implement X"**
→ Find similar existing code, follow that pattern.

**"I'm stuck on a technical problem"**
→ After 15 minutes, ask a question using COMMUNICATION-PROTOCOL.md format.

**"I don't know if my approach is correct"**
→ Check DECISION-FRAMEWORK.md risk levels, then either proceed or ask.

**"CI is failing and I don't know why"**
→ Read the error logs, search similar issues, then ask if still unclear.

---

## ✅ Getting Started Checklist

Before starting your first task:

**Orientation:**
- [ ] Read this entire document (you're almost done!)
- [ ] Read WORKFLOW.md completely
- [ ] Skim DECISION-FRAMEWORK.md
- [ ] Skim TASK-EXECUTION.md
- [ ] Skim COMMUNICATION-PROTOCOL.md

**Setup:**
- [ ] Can run `npm run dev` successfully
- [ ] Can run `npm test` successfully
- [ ] Can run `npm run lint` successfully
- [ ] Can run `npm run build` successfully

**Understanding:**
- [ ] Understand atomic design structure
- [ ] Understand theme system
- [ ] Understand context usage
- [ ] Understand testing requirements
- [ ] Understand Git workflow

**Documentation:**
- [ ] Know where to find component docs (DESIGN-SYSTEM.md)
- [ ] Know where to find architecture docs (ARCHITECTURE.md)
- [ ] Know where to find testing docs (TESTING.md)
- [ ] Know how to write commits (COMMIT_CONVENTION.md)
- [ ] Know how to ask questions (COMMUNICATION-PROTOCOL.md)

**Ready to Work:**
- [ ] Selected first task (small, low-risk)
- [ ] Assessed risk level
- [ ] Have clear requirements
- [ ] Ready to follow TASK-EXECUTION.md

---

## 🚀 You're Ready!

You now have everything you need to start contributing effectively.

**Next steps:**
1. **Read [WORKFLOW.md](WORKFLOW.md)** - This is mandatory before any work
2. **Review [DECISION-FRAMEWORK.md](DECISION-FRAMEWORK.md)** - Understand autonomy boundaries
3. **Select a task** - Start small, build confidence
4. **Follow [TASK-EXECUTION.md](TASK-EXECUTION.md)** - Execute systematically
5. **Communicate using [COMMUNICATION-PROTOCOL.md](COMMUNICATION-PROTOCOL.md)** - When needed

**Remember:**
- Quality over speed
- Testing is not optional
- Documentation is code
- Ask when uncertain
- Follow established patterns
- Incremental progress

**You've got this! 🎉**