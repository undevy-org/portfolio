# Changelog

All notable changes to this project will be documented in this file.

---

## [Phase 7] - Interactive UI & System Stabilization

This major phase introduced a key interactive feature for case studies and included a comprehensive overhaul of the UI, analytics system, and project documentation to improve stability and maintainability.

### New Feature: Interactive Image Previews
-   Introduced the `TerminalImagePreview` Component: A new, custom component that displays images within an ASCII-style frame. It features a `[ SHOW IMAGE ]` button, lazy loading with an animated progress bar, and a full-size lightbox modal for viewing.
-   Extended Content Model: The `case_details` object in `content.json` now supports an `images` field, allowing images to be embedded directly within case study tabs (e.g., Challenge, Solution).
-   Integrated System Logging: All user interactions with images (loading, opening/closing lightbox) are now tracked in the `SystemLog` for full transparency.

### System & UI Overhaul
-   Complete UI Refactoring: Rebuilt all major screens using a consistent, theme-based design system, unifying the visual hierarchy and improving readability.
-   Analytics System Stabilization: Completely refactored the Telegram bot's analytics module. Real-time notifications are now reliable, with accurate user journey tracking and correct company name lookups.
-   Improved Data Resilience: Hardened the Matomo API data parsing functions, making the system resilient to unexpected data formats and preventing crashes.
-   Critical Bug Fixes: Resolved multiple runtime errors, including crashes in the Accordion component and analytics module.

### Documentation Rework
-   Comprehensive Documentation Overhaul: Restructured the entire project documentation suite (`README.md`, `ARCHITECTURE.md`, `SETUP.md`, etc.) to establish clear, non-redundant roles for each document and improve clarity for both internal and external audiences.

---

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