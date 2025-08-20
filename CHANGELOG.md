# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 4.0.1 (2025-08-20)


### ⚠ BREAKING CHANGES

* **ui:** Complete overhaul of the layout system

## Problem Solved
- Fixed visual jumping of AnalyticsPanel and SystemLog during navigation
- Eliminated layout shift caused by varying content heights
- Resolved inconsistent wrapper patterns across screens

## Architecture Changes

### New Components
- StableLayout: Creates fixed regions for content and panels
- AnimatedScreenTransition: Orchestrates smooth fade/scale transitions
- ScreenWrapper: Unified wrapper replacing inconsistent patterns
- Modified TerminalWindow: Added fixedHeight mode with internal scroll

### Layout Structure
Before: Centered flex layout causing recalculation on every navigation
After: Fixed regions with stable boundaries

Desktop: 700px fixed container with top/bottom spacers for centering
Mobile: Flexible height filling available viewport space

### Screen Refactoring
All 12 screens now use ScreenWrapper instead of individual wrappers:
- Removed: Various p-4, max-w-md mx-auto, space-y-4 patterns
- Added: Consistent ScreenWrapper with intelligent defaults
* Requires new env vars and GitHub secrets setup

* fix: remove build-time env validation

Config no longer requires env vars during build phase

### Features

* Add animated ASCII art to ProfileBoot screen ([#16](https://github.com/undevy-org/portfolio/issues/16)) ([250056f](https://github.com/undevy-org/portfolio/commit/250056fe973e26134ae02dda823dce67e865b921))
* Add basic site structure and navigation ([19b15a8](https://github.com/undevy-org/portfolio/commit/19b15a84c1472d6315316eda032d5821832d9212))
* add CI pipeline for code validation and artifact creation ([#23](https://github.com/undevy-org/portfolio/issues/23)) ([da3b02e](https://github.com/undevy-org/portfolio/commit/da3b02e0f180fc2c7d453b8d3f0ea11a7d1cbc94))
* add Matomo analytics integration to Telegram bot ([2037c30](https://github.com/undevy-org/portfolio/commit/2037c3047a7b26106fb1a75f55fa1a04520c2a4a))
* Add Telegram-based CMS for content management ([51c565a](https://github.com/undevy-org/portfolio/commit/51c565a973c435e63aa1625810669aad132a2d52))
* add terminal-style image preview component for case studies ([946b52d](https://github.com/undevy-org/portfolio/commit/946b52dd9b060e7b5bf28fa104a343fdf77d6822))
* **analytics:** Implement robust SPA tracking and notification system ([0f4a7b6](https://github.com/undevy-org/portfolio/commit/0f4a7b65c35f5c2bbbfad2bd02375ccd25b29bf6))
* anonymize codebase for portability ([#17](https://github.com/undevy-org/portfolio/issues/17)) ([4c0ef95](https://github.com/undevy-org/portfolio/commit/4c0ef95b8493edf4ce5c57995e40aa5d40ea06e2))
* **bot, ci:** implement Telegram CMS and dual deployment pipeline ([0e80414](https://github.com/undevy-org/portfolio/commit/0e80414b10941b100485434fd6363ba18addcf49))
* **bot, ci:** implement Telegram CMS and dual deployment pipeline ([5cb009c](https://github.com/undevy-org/portfolio/commit/5cb009c3cfb79d335f71f38d978c8eb877107529))
* **bot:** add interactive case management commands ([b8900ed](https://github.com/undevy-org/portfolio/commit/b8900edeef2ce5752415bb5a8aca85e9f611938e))
* Complete Phase 5 - implement all screens and UI components ([753f6e6](https://github.com/undevy-org/portfolio/commit/753f6e674ae2bdc64366443f03b9e9464a4aa868))
* Complete SPA transformation with hash routing ([946f2bb](https://github.com/undevy-org/portfolio/commit/946f2bb440fea577f8456d58f39f5a7933a9deb2))
* **content:** Build dynamic 'About Me' page with components ([a061764](https://github.com/undevy-org/portfolio/commit/a061764f78c89a25734490a8cc36f92d916d9d23))
* **content:** Complete the /overview section with Value Prop page ([1a28682](https://github.com/undevy-org/portfolio/commit/1a286826a8fad48c929ee8f123b5ed192dc82990))
* Deploy application and configure Nginx ([c71e127](https://github.com/undevy-org/portfolio/commit/c71e127b1b11b3217ffa3bf16ae73b1cd0c0f63e))
* Expand unit and component test coverage ([57ad35d](https://github.com/undevy-org/portfolio/commit/57ad35d48e3167181448c34cb8d6a9825951ee0a))
* Full codebase anonymization ([8b59554](https://github.com/undevy-org/portfolio/commit/8b5955415a9bbb1a6eddf5be5e8e123b85fbb8b7))
* Hide analytics panel on ProfileBoot screen ([#14](https://github.com/undevy-org/portfolio/issues/14)) ([c051bc7](https://github.com/undevy-org/portfolio/commit/c051bc78bd45aaeb1fdd507eae0a2feb7dfa39af))
* implement artifact-based deployment ([#27](https://github.com/undevy-org/portfolio/issues/27)) ([422d97d](https://github.com/undevy-org/portfolio/commit/422d97d026fbd10121bee100bc446ae3d79525d4))
* Implement Content Linting Test for content.json ([#26](https://github.com/undevy-org/portfolio/issues/26)) ([91db183](https://github.com/undevy-org/portfolio/commit/91db183301c0c75869d9c577630789dec19f1930))
* implement demo mode functionality ([#52](https://github.com/undevy-org/portfolio/issues/52)) ([620d101](https://github.com/undevy-org/portfolio/commit/620d1014119c3109525596ac95daf3bdd05afea1))
* Implement initial gated access logic ([3806255](https://github.com/undevy-org/portfolio/commit/3806255227194871a8bab77a07679c7f437e28b8))
* Implement initial unit test coverage for core utilities ([a1988db](https://github.com/undevy-org/portfolio/commit/a1988dbf54b2cca958f19320ff23e4c4e625eb9b))
* Install and configure Matomo on the server ([52fd3f3](https://github.com/undevy-org/portfolio/commit/52fd3f30324577e7abb91185e09509aa4fc15e4f))
* Integrate Matomo tracking with custom dimensions ([4228eab](https://github.com/undevy-org/portfolio/commit/4228eabc5e739c6fabeca2c94b92fc71c5e7a1dd))
* **navigation, ui:** Implement advanced navigation and complete UI unification ([50bd31d](https://github.com/undevy-org/portfolio/commit/50bd31d7c598436f0bbf5baf2c5cccc2f23b4618))
* optimize artifact retention - 14d for main, 2d for PRs ([#39](https://github.com/undevy-org/portfolio/issues/39)) ([db2636b](https://github.com/undevy-org/portfolio/commit/db2636be75c87c29ff050328ff49bc71c0ed7b6e))
* redesign Entry screen with new layout and theme switcher ([#49](https://github.com/undevy-org/portfolio/issues/49)) ([e0f37b5](https://github.com/undevy-org/portfolio/commit/e0f37b5b2fa7ee5513dc3864649d6705bae13025))
* replace case count display with level-based progress system ([#44](https://github.com/undevy-org/portfolio/issues/44)) ([75cab02](https://github.com/undevy-org/portfolio/commit/75cab0276dfdb215478f6c4a1c7a97803e869150))
* **state:** Introduce SessionContext and apply layout globally ([4724165](https://github.com/undevy-org/portfolio/commit/4724165adc8402c7b5b33893005c9932cd3f0b25))
* **ui:** First Profile Boot Animation ([9b1273c](https://github.com/undevy-org/portfolio/commit/9b1273cd4727df642b3f6560d3408d467a3f8f49))
* **ui:** Implement consistent design system across all screens ([18d063f](https://github.com/undevy-org/portfolio/commit/18d063f11a1a43eea98bac46717ce56de260f762))
* **ui:** Implement dynamic theme switching ([4b386b9](https://github.com/undevy-org/portfolio/commit/4b386b9fa4704d8e4fd4168f6ecd636329cac017))
* **ui:** Implement responsive layout and header navigation ([3015c37](https://github.com/undevy-org/portfolio/commit/3015c37b87441dc24fb33db602de6024316f4983))
* **ui:** implement responsive layouts and style consistency ([51ec500](https://github.com/undevy-org/portfolio/commit/51ec50058a2d55aba181cafb34172b5c5bf10d97))
* **ui:** implement stable layout architecture to eliminate layout shift ([#53](https://github.com/undevy-org/portfolio/issues/53)) ([eafb961](https://github.com/undevy-org/portfolio/commit/eafb961720d10084da87ff521448a0ab362fdfd5))
* **ui:** introduce four new themes and enhance theme switcher ([#51](https://github.com/undevy-org/portfolio/issues/51)) ([ca95bb8](https://github.com/undevy-org/portfolio/commit/ca95bb8490d2b46f754c59cad65414fbb6e2f484))
* **ui:** Minor mobile UI improvements ([f038e3b](https://github.com/undevy-org/portfolio/commit/f038e3b79212e894e31d6616d85b9829dd616968))
* **ui:** New boot animation ([8a688ea](https://github.com/undevy-org/portfolio/commit/8a688ea60bbbed606aab8c76224ae62c0d52c1e7))
* **ui:** New boot animation ([63fe2b7](https://github.com/undevy-org/portfolio/commit/63fe2b75057e0344041e945a44b0f5ab25d362c3))
* **ui:** New updated loader component ([8a11fbd](https://github.com/undevy-org/portfolio/commit/8a11fbdd88ea95854f58cdab384d1a9116789977))
* **ui:** Updated Contact Screen ([77e31f6](https://github.com/undevy-org/portfolio/commit/77e31f634a21b44e76e9c2c352a8deaf05f0d000))
* **web3:** Implement Web3 authentication with known logout race condition ([5570c51](https://github.com/undevy-org/portfolio/commit/5570c51faf404347614bab3faeac80bd56e19a1f))


### Bug Fixes

* add missing type definitions for React and csstype ([9bb26a7](https://github.com/undevy-org/portfolio/commit/9bb26a73406c10a178226b414c20a9e25e3a37bf))
* aggressive multi-method access code extraction with full debugging ([3088e9c](https://github.com/undevy-org/portfolio/commit/3088e9c3a8dcaca7aa004612819ee9509f47d83d))
* **analytics:** Enhance visit check logic and improve notification formatting ([e059513](https://github.com/undevy-org/portfolio/commit/e0595135a4c36fe0bb794ecf11869e75de2f08fb))
* **build:** Wrap page content in Suspense to fix build error ([27afa77](https://github.com/undevy-org/portfolio/commit/27afa77d8d923f4c2f614e4bf30edf4351c2d30b))
* **ci:** Pass ADMIN_TOKEN to build process ([1042093](https://github.com/undevy-org/portfolio/commit/1042093252f35a79128ed0df256667ae5c8fd8ed))
* **ci:** Source nvm before running commands on server ([6abba24](https://github.com/undevy-org/portfolio/commit/6abba24055cbedc622c012e07c3db57dd67930a5))
* Close button now properly clears session and URL parameters ([d0d791f](https://github.com/undevy-org/portfolio/commit/d0d791f91c804affb0b01934cbb8865b07c6ef33))
* correct artifact creation in CI pipeline ([#31](https://github.com/undevy-org/portfolio/issues/31)) ([ea51b7d](https://github.com/undevy-org/portfolio/commit/ea51b7df0bf746136b2ab07c1e92ff165ba36b52))
* correct telegram bot deployment path ([0fcbe6b](https://github.com/undevy-org/portfolio/commit/0fcbe6b13ec3f06a45d4a188bfcadbbaa17e94be))
* Corrected Matomo tracker URL to use HTTPS to fix Mixed Content error ([323fc65](https://github.com/undevy-org/portfolio/commit/323fc658542a74f1059c6abb0978909e2282297e))
* DESIGN-SYSTEM.md document ([f2c7c81](https://github.com/undevy-org/portfolio/commit/f2c7c816ac1d72ac56fc8e056c3385d40eaac2d2))
* Improve analytics processing resilience and accuracy ([e4ccd36](https://github.com/undevy-org/portfolio/commit/e4ccd36b958305fd86dc23474bd71cabbc667aae))
* preserve project images during deployment ([d08f36b](https://github.com/undevy-org/portfolio/commit/d08f36b1f8d1e4fca427304dd7a35b8c7169c860))
* Remove lucide-react dependency for successful build ([813c362](https://github.com/undevy-org/portfolio/commit/813c3621a9be0b88b4a6f5c00063be48e52f3279))
* rollback to working MatomoTracker with minimal changes ([dff3f16](https://github.com/undevy-org/portfolio/commit/dff3f16eefc7b308d40a5c1b1335b49a2c797731))
* src/app/utils/config.js ([64a7ddb](https://github.com/undevy-org/portfolio/commit/64a7ddbf48a70de81c11611b6f608dbcf0ef971f))
* **style:** Restore correct font implementation in root layout ([73d4fe3](https://github.com/undevy-org/portfolio/commit/73d4fe3595101e773d3fd42493b96a6b45a88155))
* **ui:** Apply responsive fixes and update documentation ([2029bd0](https://github.com/undevy-org/portfolio/commit/2029bd057bb10124d8ecc94a97f708eec00101bd))
* **ui:** Layouts ([#50](https://github.com/undevy-org/portfolio/issues/50)) ([437f01e](https://github.com/undevy-org/portfolio/commit/437f01ede140bb6fcaddaa994a79e396138d0514))
* **ui:** Log out problem fix ([6dc159d](https://github.com/undevy-org/portfolio/commit/6dc159df9464870ad79dddf951d6f30b989f0719))
* **ui:** Minor mobile version layout fixes ([eb86052](https://github.com/undevy-org/portfolio/commit/eb86052fd3195bffe3a482db0deb7b5ddf85c3a0))
* **ui:** Minor UI fixes ([8bf55fb](https://github.com/undevy-org/portfolio/commit/8bf55fb0d8d20c3fb76de8ccd74f5149d9d7c350))
* **ui:** Minor UI mobile improvements ([3fc4832](https://github.com/undevy-org/portfolio/commit/3fc4832f02db572c1e8695177ca1246f7077ad01))
* **ui:** Terminal Window border bug ([13143ce](https://github.com/undevy-org/portfolio/commit/13143ce366136eca208a9b6094fb836f12f25da7))
* update dependencies to remove deprecated packages ([290cc1c](https://github.com/undevy-org/portfolio/commit/290cc1ce3984245ffd69607b63a16600e5727c27))
* update dependencies to remove deprecated packages ([a9b206c](https://github.com/undevy-org/portfolio/commit/a9b206ceca41fb55fae3f5ae567bbcb97fa0a553))


* Feature/anonymize codebase (#18) ([8bf72c7](https://github.com/undevy-org/portfolio/commit/8bf72c72595d8d13b843927068fc0714e95fa922)), closes [#18](https://github.com/undevy-org/portfolio/issues/18)

# Changelog

All notable changes to this project will be documented in this file.

---

##  Current Development Focus [IN PROGRESS]

This section outlines the major initiatives that are currently under active development.

### Initiative 1: Testing Infrastructure & Code Quality
-   Goal: To build a comprehensive testing suite that ensures code quality, prevents regressions, and enables confident refactoring.
-   Current Status: A foundational testing architecture using Jest and React Testing Library is in place. Unit tests for all critical utility functions and component tests for core UI elements have been created.
-   Next Steps: Resolve known incompatibilities with Next.js 13+ code coverage reporting. Enable and complete integration tests for full user flows.

### Initiative 2: Enhanced User Experience & Navigation
-   Goal: To refine the user journey by creating more immersive interactive experiences and improving navigation clarity.
-   Current Status: A stable navigation system with hierarchical breadcrumbs and a temporal session trace is implemented. The `ProfileBoot` sequence and `TerminalImagePreview` component provide rich, animated user feedback.
-   Next Steps: Continue to optimize component rendering to eliminate any remaining UI flicker during navigation. Further refine the navigation control logic for edge cases.

### Initiative 3: Layout Stability & Smooth Transitions [COMPLETED]
- Goal: Eliminate all layout shift during navigation and add smooth transitions between screens
- Status: Successfully implemented a fixed-region architecture with StableLayout component
- Key Achievements:
  - Zero CLS (Cumulative Layout Shift) across all navigation paths
  - Smooth 400ms fade/scale transitions between screens
  - Unified ScreenWrapper component replacing 12 different wrapper patterns
  - Fixed 700px container on desktop with internal scrolling
  - Responsive mobile layout with flexible height
- Technical Implementation:
  - StableLayout creates three fixed regions (spacer/content/spacer)
  - TerminalWindow operates in fixedHeight mode with overflow scroll
  - AnimatedScreenTransition orchestrates enter/exit animations
  - All screens refactored to use consistent ScreenWrapper

---

## [Phase 7] - UI Architecture & Theming System Refactor [COMPLETED]

This was a foundational overhaul of the entire styling system, moving from a rigid two-theme setup to a highly scalable, multi-theme architecture. This refactoring eliminated critical hydration errors, improved performance, and dramatically simplified future UI development.

### Multi-Theme Architecture via CSS Variables
-   Architectural Shift: Migrated the entire color system from Tailwind's `dark:` variant to a modern, robust architecture based on CSS variables and a `data-theme` attribute on the root HTML element.
-   Expanded Palette: Introduced six new creative themes ("Amber", "BSOD", "Synthwave", "Operator", "Kyoto", and "Radar") in addition to the existing Dark and Light modes. The system now supports eight distinct themes.
-   Instant, Flicker-Free Switching: Implemented a theme management system (`ThemeManager.js` and `SessionContext.js`) that allows for instantaneous, client-side theme changes with zero page reloads or layout shifts.

### Semantic CSS Class Library
-   Centralized Styling: Created a comprehensive library of semantic, theme-agnostic utility classes in `globals.css` (e.g., `.text-primary`, `.border-secondary`, `.btn-command`).
-   Component Refactoring: Refactored all UI components (`Button`, `Accordion`, `Tabs`, `TerminalWindow`, etc.) to use this new semantic library, completely decoupling them from theme-specific logic. This resolved numerous React hydration errors caused by server/client HTML mismatches.

### System & Documentation Updates
-   Theme Persistence: Added functionality to save the user's selected theme to `localStorage`, ensuring their choice is remembered across sessions.
-   Updated Design System: Completely rewrote the `DESIGN-SYSTEM.md` document to reflect the new architecture, providing a clear guide for developers on how to use and extend the theming system.

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