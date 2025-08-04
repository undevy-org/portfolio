# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Added
-   Analytics System Overhaul: The Telegram bot's analytics module has been completely stabilized. Real-time visitor notifications are now reliable, displaying the full, accurate user journey and correct company name based on the access code.
-   New Border Tokens: Added `dark-border-darker` and `light-border-lighter` to `tailwind.config.js` to create more visual depth in nested panels.

### Changed
-   Complete UI Refactoring: Rebuilt all major screens to use a consistent, theme-based design system. This improves visual hierarchy, readability, and maintainability across the application.
-   Data Parsing Resilience: Significantly improved data extraction functions for the Matomo API. The system is now resilient to unexpected or malformed data, preventing crashes.
-   API Security: Enhanced API security by moving sensitive credentials to environment variables.

### Fixed
-   Critical Runtime Errors: Resolved multiple critical bugs, including a `map is not a function` crash in the Accordion component and several `TypeError` crashes in the analytics module, ensuring smoother application performance.

### Removed
-   Redundant UI Elements: Removed non-essential technical IDs from the user interface to improve clarity and focus on content.

---

## [Previous Milestones]

### Phase 6: Headless CMS & Analytics
-   [COMPLETED] Interactive Content Editing: Implemented a full suite of interactive commands (`/add_case`, `/edit_case`, `/delete_case`) allowing for complete case study management directly from Telegram. Developed a state management system for handling multi-step user conversations.
-   [COMPLETED] Version Control System: Created a robust versioning system for `content.json` with commands to view history (`/history`), restore backups (`/rollback`), and compare versions (`/diff`).
-   [COMPLETED] Core CMS Foundation: Built a secure backend API with automated backups and a `grammY`-based Telegram bot with restricted admin access.

### Phase 5: Content Implementation
-   [COMPLETED] All Screens Built: Developed all remaining content screens, including `Timeline`, `CaseDetail`, `SkillsGrid`, and `Contact`, creating a complete and functional portfolio experience.
-   [COMPLETED] Reusable UI Components: Created and styled core UI components like `Accordion` and `Tabs` to support dynamic content presentation.

### Phase 4: UI Foundation & State Management
-   [COMPLETED] Single Page Application (SPA) Architecture: Refactored the project into an SPA after authentication, enabling instant client-side navigation with hash-based routing.
-   [COMPLETED] Global State Management: Implemented a global `SessionContext` to manage theme, navigation, and all shared client-side state.

### Phase 1-3: Infrastructure & Automation
-   [COMPLETED] CI/CD Pipeline: Established a complete CI/CD workflow using GitHub Actions for automated testing and deployment.
-   [COMPLETED] Infrastructure Deployment: Deployed the full stack on a DigitalOcean Droplet, including the Next.js app (managed by PM2), a self-hosted Matomo analytics instance (in Docker), and Nginx as a reverse proxy with SSL.
-   [COMPLETED] Project Scaffolding: Initialized the Next.js project, implemented the core gated-access logic, and set up all foundational documentation.