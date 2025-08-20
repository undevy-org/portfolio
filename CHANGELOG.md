# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [4.0.3](https://github.com/undevy-org/portfolio/compare/v4.0.2...v4.0.3) (2025-08-20)


### Performance

* **ci:** optimize pipeline by eliminating duplicate builds ([#56](https://github.com/undevy-org/portfolio/issues/56)) ([2780048](https://github.com/undevy-org/portfolio/commit/278004806b6f71e9d033fdeb811df25b95317c28))

### [4.0.2](https://github.com/undevy-org/portfolio/compare/v4.0.1...v4.0.2) (2025-08-20)


### Fixed

* **ui:** ProfileBoot Flickering Fix ([#55](https://github.com/undevy-org/portfolio/issues/55)) ([8bad8a9](https://github.com/undevy-org/portfolio/commit/8bad8a9b5e1f1407646fa611afc55616e17b3c94))

## [4.0.1] - 2025-08-20

### Added
- Centralized version management system using `package.json` as single source of truth
- Automated versioning with `standard-version` tool
- GitHub Actions workflow for automated release creation
- Version display in application startup log from `package.json`

### Changed
- Version is now dynamically imported from `package.json` instead of being hardcoded
- Updated CI/CD pipeline to support versioned releases

## [4.0.0] - 2025-08-20

### Changed
- Complete overhaul of the layout system to fix visual jumping during navigation
- Refactored all 12 screens to use unified `ScreenWrapper` component
- Implemented fixed regions layout with `StableLayout` component
- Added smooth fade/scale transitions with `AnimatedScreenTransition`

### Fixed
- Visual jumping of AnalyticsPanel and SystemLog during navigation
- Layout shift caused by varying content heights
- Inconsistent wrapper patterns across screens

## [3.0.0] - 2025-08-19

### Added
- Multi-theme architecture with 8 distinct themes (Dark, Light, Amber, BSOD, Synthwave, Operator, Kyoto, Radar)
- Semantic CSS class library for theme-agnostic styling
- Theme persistence using localStorage
- Instant theme switching without page reload

### Changed
- Migrated from Tailwind's `dark:` variant to CSS variables architecture
- Refactored all UI components to use semantic classes
- Complete rewrite of the design system documentation

### Fixed
- React hydration errors caused by theme mismatches
- Server/client HTML inconsistencies

## [2.0.0] - 2025-08-02

### Added
- Telegram-based headless CMS for content management
- Interactive content editing commands (`/add_case`, `/edit_case`, `/delete_case`)
- Version control system for content with history and rollback
- Matomo analytics integration with real-time visitor notifications
- Automated backup system for all content changes

### Changed
- Content management now fully controlled via Telegram bot
- Analytics tracking enhanced for SPA navigation

## [1.0.0] - 2025-07-29

### Added
- Initial release with complete portfolio functionality
- Single Page Application architecture with hash-based routing
- Gated access system with URL-based authentication
- Multi-domain support (undevy.com, foxous.design)
- Complete UI component library (Accordion, Tabs, TerminalWindow)
- All content screens (Timeline, CaseDetail, SkillsGrid, Contact)
- CI/CD pipeline with GitHub Actions
- Deployment on DigitalOcean with PM2 and Nginx

---

## Pre-Release Development

For historical development phases before semantic versioning was implemented, see [DEVELOPMENT_HISTORY.md](./DEVELOPMENT_HISTORY.md).