# Interactive Terminal Portfolio

This project is an interactive portfolio experience designed to look and feel like a classic computer terminal. It is a standalone Next.js application that can be deployed as a personal portfolio.

**_Architecture Note:_** This repository contains the frontend application. The accompanying headless CMS, a Telegram bot, is an **optional component** and resides in a separate repository: **[undevy-org/telegram-bot](https://github.com/undevy-org/telegram-bot)**.

After authentication, the application transforms into a seamless Single Page Application (SPA) with hash-based routing, ensuring an instant, app-like user experience.

## 🤖 For AI Agents

This project includes comprehensive documentation for autonomous AI agents:

**Start here:** [docs/ai-agent/GETTING-STARTED.md](docs/ai-agent/GETTING-STARTED.md)

Quick commands:
\```bash
# View the AI agent entry point
cat docs/ai-agent/GETTING-STARTED.md | head -50

# Understand the workflow
cat docs/ai-agent/WORKFLOW.md
\```

### For Autonomous Development
AI agents should follow this path:
1. Read `docs/ai-agent/GETTING-STARTED.md`
2. Study `docs/ai-agent/WORKFLOW.md`
3. Execute following `docs/ai-agent/TASK-EXECUTION.md`

## Core Features

-   **Gated & Personalized Access:** The site is accessible only via a unique code (`?code=...`). Based on this code, all content—from greetings to project case studies—is dynamically tailored for the visitor.
-   **Multi-Domain Support:** A single codebase can power multiple, distinctly branded portfolio instances based on the domain name, serving different content and styling.
-   **Two-Tier Deployment:** Features a robust CI/CD pipeline with separate, isolated environments:
    -   **Staging:** Automatically deploys on every push to the `main` branch for immediate testing.
    -   **Production:** Deploys manually via version tags, ensuring only stable, verified code goes live.
-   **Multi-Theme System:** Includes four distinct, built-in themes (Dark, Light, Amber, BSOD) with instant, flicker-free switching. The architecture is built on CSS variables, making it easily extensible.
-   **Single Page Application (SPA) Experience:** After a single data load during authentication, all navigation is instantaneous and handled client-side, with bookmarkable URLs for each screen (`#Timeline`, `#CaseDetail`, etc.).
-   **Zero Layout Shift Navigation:** A stable layout architecture with fixed regions prevents any content jumping or visual flicker. All screen transitions are handled with smooth, accessibility-conscious animations, creating a seamless and predictable user journey.
-   **Dual Authentication System:** Supports both traditional access codes and Web3 wallet login. Users can connect via MetaMask, WalletConnect, etc., using the Reown protocol for a seamless Web3 experience.
-   **Optimized Web3 Loading:** Web3 libraries are lazily loaded only when needed, reducing the initial bundle size by ~50% and improving load times for the majority of users who do not use Web3 authentication.
-   **Decoupled Content Architecture:** All portfolio data is stored in a `content.json` file on the server, completely separate from the application code. This allows content updates without redeploying the app.
-   **Headless CMS via Telegram Bot:** A custom Telegram bot (from a separate repository) serves as a powerful, on-the-go content management system. You can create, edit, delete, and rollback content versions directly from your phone.
-   **Privacy-First Analytics:** A self-hosted Matomo instance provides detailed session tracking while ensuring full data ownership and privacy.
-   **Automated Testing:** The project is covered by a suite of unit and component tests using Jest and React Testing Library to prevent regressions and ensure code quality.
-   **Auto-fill Animation**: Automatic typing animation for access codes when arriving via direct links (e.g., `/?code=XYZ123`), enhancing the terminal experience.
-   **Master Code Access Manager:** Administrative access to view and simulate all system access codes using a special master code, providing complete visibility into the portfolio's access control system.

## Tech Stack

| Category           | Technology         | Purpose & Implementation Details                                       |
| :----------------- | :----------------- | :--------------------------------------------------------------------- |
| **Framework**      | Next.js (React)    | Hybrid architecture: Server-side API for secure data, client-side SPA for UI. |
| **Styling**        | Tailwind CSS       | Powers a highly scalable design system using CSS variables for multi-theme support. |
| **State Mngmt**    | React Context      | A single `SessionContext` manages all shared state across the application. |
| **Testing**        | Jest & RTL         | For unit and component testing, ensuring reliability and preventing regressions. |
| **Web Server**     | Nginx              | Handles web traffic, SSL termination (Let's Encrypt), and reverse proxying. |
| **Process Manager**| PM2                | Keeps the Node.js application alive and handles zero-downtime deployments. |
| **Analytics**      | Matomo (self-hosted) | Runs in Docker, providing privacy-focused analytics with custom tracking. |
| **Containerization**| Docker            | Isolates the Matomo & MariaDB stack for a clean, reproducible environment. |
| **CI/CD**          | GitHub Actions     | Automates the entire deployment pipeline on every push to the `main` branch. |
| **Bot Framework**  | grammY             | A modern framework for building the **separate** Telegram-based CMS.      |
| **Web3** | `wagmi` & `viem` | A collection of React Hooks and utilities for interacting with Ethereum wallets and blockchains. |
| **Web3** | `@reown/appkit` | Powers the user-friendly wallet connection modal (QR code, wallet selection). |

## Local Development Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/undevy-org/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your local values.
    ```bash
    cp .env.example .env.local
    ```
    *Note: The project will run without this, but some features might not work as expected.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Access the local version at `http://localhost:3000`. The development server uses fallback test content by default.

5.  **Run tests:**
    ```bash
    npm test
    ```

## Testing

This project includes a comprehensive test suite using Jest and React Testing Library. The tests act as a safety net to prevent regressions and ensure the core logic behaves as expected.

For a complete guide on our testing philosophy, how to run tests, and what is covered, please see the dedicated  **[Testing Guide](./docs/TESTING.md)**.

## Contributing

This project uses a Pull Request workflow with automated CI/CD. All changes must go through a feature branch and pass automated checks before merging to `main`.

### How to Submit Changes

1.  **Always start from an updated main branch:**
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Create a feature branch with a descriptive name:**
    ```bash
    git checkout -b feat/your-feature-name
    # Examples: feat/add-contact-form, fix/navigation-bug, docs/update-readme
    ```

3.  **Make your changes and test locally:**
    ```bash
    npm run dev     # Test visually in browser
    npm test        # Run the test suite
    npm run lint    # Check for linting issues
    ```

4.  **Commit your changes with a clear message:**
    ```bash
    git add .
    git commit -m "feat: add contact form with email validation"
    ```

5.  **Push your branch to GitHub:**
    ```bash
    git push -u origin feat/your-feature-name
    ```

6.  **Create a Pull Request on GitHub:**
    - Go to the repository on GitHub
    - Click "Pull requests" → "New pull request"
    - Select your branch and click "Create pull request"
    - Add a description of what you changed and why

7.  **Wait for the automated checks:**
    - The `CI Pipeline / Validate and Build` check will automatically run. It performs linting, runs the entire test suite, and verifies that the project can be successfully built.
    - All checks must pass (green checkmarks) before merging.
    - If any check fails, fix the issues locally and push again.

8.  **Merge when ready:**
    - Once all checks are green, click "Merge pull request".
    - The changes will automatically deploy to the **staging environment** (`stage.your-domain.com`) for final review.

### Common CI Check Failures and Solutions

- **Linting errors:** Run `npm run lint` locally to see the issues, then fix them.
- **Test failures:** Run `npm test` to identify failing tests, update your code accordingly.
- **Build errors:** Run `npm run build` locally to reproduce and fix the issue.
- **Package-lock out of sync:** Run `npm install` and commit the updated `package-lock.json`.

## Versioning & Releases

This project follows [Semantic Versioning](https://semver.org/) (SemVer) and uses automated release management.

### Version Format

We use the standard `MAJOR.MINOR.PATCH` format:
- **MAJOR**: Breaking changes that require user action
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes and minor improvements

### Creating a Release (Deploying to Production)

After merging changes to `main` and verifying them on the staging environment, create a release to deploy to production:

```bash
# Automatically determine version based on commits
npm run release

# Or specify version type explicitly
npm run release -- --release-as patch
npm run release -- --release-as minor
npm run release -- --release-as major

# Push the release
git push --follow-tags origin main
```

This will:
1. Update version in `package.json`
2. Update `CHANGELOG.md` automatically
3. Create a git commit and tag
4. Trigger GitHub Actions to create a GitHub Release
5. Deploy the new version to **production** automatically.

### Version Information

The current version is displayed in the application's system log on startup and is pulled directly from `package.json`, ensuring a single source of truth for versioning.

## 📚 Project Documentation

This project maintains comprehensive documentation organized for different audiences. Choose your path below:

### 🗺️ Documentation Map

```
📁 Portfolio Documentation
│
├── 🏠 Root Level
│   ├── README.md (you are here)
│   ├── CHANGELOG.md
│   └── ARCHITECTURE.md
│
└── 📚 docs/
    ├── 🤖 AI Agent Guides
    │   ├── README.md (Start Here)
    │   ├── WORKFLOW.md
    │   ├── DECISION-FRAMEWORK.md
    │   ├── COMMUNICATION-PROTOCOL.md
    │   └── TASK-EXECUTION.md
    │
    ├── 🎨 UI & Design
    │   ├── DESIGN-SYSTEM.md
    │   ├── THEME-GUIDE.md
    │   └── PERSISTENT-SHELL.md
    │
    └── 🔧 Development
        ├── SETUP.md
        ├── GIT-WORKFLOW.md
        ├── TESTING.md
        ├── TESTING-OVERVIEW.md
        └── CONTENT-MODEL.md
```

### 🚀 Quick Start Paths

#### For AI Agents (Claude Code)
**Essential reading (~5 minutes):**
1. [AI Agent Getting Started](./docs/ai-agent/README.md) - Complete orientation
2. [Development Workflow](./docs/ai-agent/WORKFLOW.md) - How to work
3. [Decision Framework](./docs/ai-agent/DECISION-FRAMEWORK.md) - Autonomy guidelines

**Before each task:**
- [Task Execution Protocol](./docs/ai-agent/TASK-EXECUTION.md)
- [Git Workflow Standards](./docs/GIT-WORKFLOW.md)
- [Testing Overview](./docs/TESTING-OVERVIEW.md)

#### For External Developers
**Getting started (~10 minutes):**
1. [Setup & Deployment](./docs/SETUP.md) - Local development setup
2. [Git Workflow](./docs/GIT-WORKFLOW.md) - Contribution standards
3. [Testing Guide](./docs/TESTING.md) - Testing requirements

**Development reference:**
- [Design System](./docs/DESIGN-SYSTEM.md) - UI components & styling
- [Theme Guide](./docs/THEME-GUIDE.md) - 8-theme system
- [Content Model](./docs/CONTENT-MODEL.md) - Content structure

#### For Understanding Architecture
**Deep dive (optional):**
- [System Architecture](./ARCHITECTURE.md) - Complete system design
- [Persistent Shell](./docs/PERSISTENT-SHELL.md) - React patterns
- [Development History](./docs/DEVELOPMENT_HISTORY.md) - Evolution & decisions

### 📖 Complete Documentation Index

Visit the **[Documentation Hub](./docs/)** for the complete, organized documentation index with detailed descriptions of all guides.

### 📝 Project Files
-   **[Changelog](./CHANGELOG.md)** - Version history and release notes
-   **[License](./LICENSE)** - MIT License

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.