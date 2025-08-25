# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [5.1.1](https://github.com/undevy-org/portfolio/compare/v5.1.0...v5.1.1) (2025-08-25)


### Fixed

* resolve npm registry access issues for CI/CD pipeline ([#71](https://github.com/undevy-org/portfolio/issues/71)) ([33fb4ea](https://github.com/undevy-org/portfolio/commit/33fb4ea1d0b3f2aa9dfd83a1e96a0be6fb38da2e))

## [5.1.0](https://github.com/undevy-org/portfolio/compare/v5.0.2...v5.1.0) (2025-08-25)

### [5.0.2](https://github.com/undevy-org/portfolio/compare/v5.0.1...v5.0.2) (2025-08-25)


### Fixed

* add Web3 access code to build environment ([#69](https://github.com/undevy-org/portfolio/issues/69)) ([6863c32](https://github.com/undevy-org/portfolio/commit/6863c32de8f9cd09e29592290df29a50a3053fe6))

### [5.0.1](https://github.com/undevy-org/portfolio/compare/v5.0.0...v5.0.1) (2025-08-23)

## [5.0.0](https://github.com/undevy-org/portfolio/compare/v4.2.2...v5.0.0) (2025-08-23)


### ⚠ BREAKING CHANGES

* Telegram bot has been moved to github.com/undevy-org/telegram-bot
   - Bot code removed from monorepo
   - CI/CD will be updated to deploy only portfolio
   - Documentation updated to reflect new structure

* refactor: update CI/CD pipeline after bot extraction

- Remove bot deployment steps from deploy.yml
- Simplify deployment to handle only portfolio
- Update deployment notifications
- Remove unused bot-related secrets from workflow

* fix: simplify deployment pipeline and fix SSH issues

- Switch to direct push trigger instead of CI dependency
- Use standard scp for file transfer
- Add proper backup and restore logic
- Remove separate CI workflow
* Telegram bot has been moved to github.com/undevy-org/telegram-bot
   - Bot code removed from monorepo
   - CI/CD will be updated to deploy only portfolio
   - Documentation updated to reflect new structure

* refactor: update CI/CD pipeline after bot extraction

- Remove bot deployment steps from deploy.yml
- Simplify deployment to handle only portfolio
- Update deployment notifications
- Remove unused bot-related secrets from workflow

* Refactor/remove-bot (#66) ([19bd9c2](https://github.com/undevy-org/portfolio/commit/19bd9c22b62853c0357356da7303c6a85b19131f)), closes [#66](https://github.com/undevy-org/portfolio/issues/66)
* Refactor/remove bot (#65) ([35819bc](https://github.com/undevy-org/portfolio/commit/35819bc97b025f129e4be6adefb838f5eaec035c)), closes [#65](https://github.com/undevy-org/portfolio/issues/65)


### Fixed

* simplify deployment pipeline ([#67](https://github.com/undevy-org/portfolio/issues/67)) ([983408d](https://github.com/undevy-org/portfolio/commit/983408d8329a0cb89312f0bb6f4a003641b1a98f))

### [4.2.2](https://github.com/undevy-org/portfolio/compare/v4.2.1...v4.2.2) (2025-08-22)


### Added

* **config:** add license and abstract Web3 access code. ([#64](https://github.com/undevy-org/portfolio/issues/64)) ([d42c9c8](https://github.com/undevy-org/portfolio/commit/d42c9c8533ed3caf714ca7f6707c9da84c0439c9))

### [4.2.1](https://github.com/undevy-org/portfolio/compare/v4.2.0...v4.2.1) (2025-08-22)


### Tests

* add component tests for ScreenWrapper and ThemeSwitcher ([#63](https://github.com/undevy-org/portfolio/issues/63)) ([6861d00](https://github.com/undevy-org/portfolio/commit/6861d00760594057557c87e72bccb47cda26105e))

## [4.2.0](https://github.com/undevy-org/portfolio/compare/v4.1.0...v4.2.0) (2025-08-21)


### ⚠ BREAKING CHANGES

* Removes all .next files from version control

Problem:
- The .next folder was incorrectly tracked in Git
- Only .next/cache/ was in .gitignore instead of entire .next/
- This caused repository bloat and merge conflicts

Solution:
- Fixed .gitignore to ignore entire .next/ directory
- Removed all .next files from repository (git rm --cached)
- Files remain on disk for local development

Impact:
- Repository size will be significantly reduced
- No more merge conflicts from build artifacts
- Cleaner git history going forward

Note: After pulling this change, other developers should:
1. Run 'git pull'
2. Run 'npm run build' to regenerate their local .next

### CRITICAL

* Remove .next from repository and fix .gitignore ([#62](https://github.com/undevy-org/portfolio/issues/62)) ([62b5071](https://github.com/undevy-org/portfolio/commit/62b507171a62c78cd61347982478f71b19c42249))

## [4.1.0](https://github.com/undevy-org/portfolio/compare/v4.0.4...v4.1.0) (2025-08-21)


### Performance

* **ci:** remove src folder from deployment artifacts ([#61](https://github.com/undevy-org/portfolio/issues/61)) ([335fe3e](https://github.com/undevy-org/portfolio/commit/335fe3ea60cf002973278301444cf3210b4f211a))

### [4.0.4](https://github.com/undevy-org/portfolio/compare/v4.0.3...v4.0.4) (2025-08-21)


### Tests

* add workflow to verify .next directory handling ([#59](https://github.com/undevy-org/portfolio/issues/59)) ([e7320d1](https://github.com/undevy-org/portfolio/commit/e7320d1914824392c6d826c72f343f53702f52ca))


### Changed

* **ci/cd:** remove .next rename workaround ([#60](https://github.com/undevy-org/portfolio/issues/60)) ([f429e41](https://github.com/undevy-org/portfolio/commit/f429e41a5d0c0fafff8cf4cb13f3d0740e84d35e))

### [4.0.3](https://github.com/undevy-org/portfolio/compare/v4.0.2...v4.0.3) (2025-08-20)


### Performance

* **ci:** optimize pipeline by eliminating duplicate builds ([#56](https://github.com/undevy-org/portfolio/issues/56)) ([2780048](https://github.com/undevy-org/portfolio/commit/278004806b6f71e9d033fdeb811df25b95317c28))

### [4.0.2](https://github.com/undevy-org/portfolio/compare/v4.0.1...v4.0.2) (2025-08-20)


### Fixed

* **ui:** ProfileBoot Flickering Fix ([#55](https://github.com/undevy-org/portfolio/issues/55)) ([8bad8a9](https://github.com/undevy-org/portfolio/commit/8bad8a9b5e1f1407646fa611afc55616e17b3c94))

### [4.0.1](https://github.com/undevy-org/portfolio/compare/v4.0.0...v4.0.1) (2025-08-20)

### Added
* Centralized version management system using `package.json` as single source of truth
* Automated versioning with `standard-version` tool
* GitHub Actions workflow for automated release creation
* Version display in application startup log from `package.json`

### Changed
* Version is now dynamically imported from `package.json` instead of being hardcoded
* Updated CI/CD pipeline to support versioned releases

### [4.0.0](https://github.com/undevy-org/portfolio/compare/v3.0.0...v4.0.0) (2025-08-20)

### Changed
* Complete overhaul of the layout system to fix visual jumping during navigation
* Refactored all 12 screens to use unified `ScreenWrapper` component
* Implemented fixed regions layout with `StableLayout` component
* Added smooth fade/scale transitions with `AnimatedScreenTransition`

### Fixed
* Visual jumping of AnalyticsPanel and SystemLog during navigation
* Layout shift caused by varying content heights
* Inconsistent wrapper patterns across screens

### [3.0.0] (2025-08-19)

### Added
* Multi-theme architecture with 8 distinct themes (Dark, Light, Amber, BSOD, Synthwave, Operator, Kyoto, Radar)
* Semantic CSS class library for theme-agnostic styling
* Theme persistence using localStorage
* Instant theme switching without page reload

### Changed
* Migrated from Tailwind's `dark:` variant to CSS variables architecture
* Refactored all UI components to use semantic classes
* Complete rewrite of the design system documentation

### Fixed
* React hydration errors caused by theme mismatches
* Server/client HTML inconsistencies

### [2.0.0] (2025-08-02)

### Added
* Telegram-based headless CMS for content management
* Interactive content editing commands (`/add_case`, `/edit_case`, `/delete_case`)
* Version control system for content with history and rollback
* Matomo analytics integration with real-time visitor notifications
* Automated backup system for all content changes

### Changed
* Content management now fully controlled via Telegram bot
* Analytics tracking enhanced for SPA navigation

### [1.0.0] (2025-07-29)

### Added
* Initial release with complete portfolio functionality
* Single Page Application architecture with hash-based routing
* Gated access system with URL-based authentication
* Multi-domain support
* Complete UI component library (Accordion, Tabs, TerminalWindow)
* All content screens (Timeline, CaseDetail, SkillsGrid, Contact)
* CI/CD pipeline with GitHub Actions
* Deployment on DigitalOcean with PM2 and Nginx

---

## Pre-Release Development

For historical development phases before semantic versioning was implemented, see [DEVELOPMENT_HISTORY.md](./DEVELOPMENT_HISTORY.md).