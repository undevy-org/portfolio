# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.3.0](https://github.com/undevy-org/portfolio/compare/v5.2.2...v5.3.0) (2025-08-29)


### ⚠ BREAKING CHANGES

* Production deployments no longer automatic on main branch

### Added

* implement two-tier deployment with staging and production environments ([#76](https://github.com/undevy-org/portfolio/issues/76)) ([4130090](https://github.com/undevy-org/portfolio/commit/4130090421dbb0bea2254a282a28bad7ef763b18))


* Feat/two-tier-deployment (#77) ([7734c00](https://github.com/undevy-org/portfolio/commit/7734c0061af35bc25a23481dc557e1127880a6cc)), closes [#77](https://github.com/undevy-org/portfolio/issues/77)

### [5.2.2](https://github.com/undevy-org/portfolio/compare/v5.2.1...v5.2.2) (2025-08-26)


### ⚠ BREAKING CHANGES

* Requires new env vars and GitHub secrets setup

* fix: remove build-time env validation

Config no longer requires env vars during build phase
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

### Documentation

* add testing strategy and update README ([90a4cff](https://github.com/undevy-org/portfolio/commit/90a4cff2ddaffe0cca1fc8665b97cae694bb7389))


### Performance

* **ci:** optimize pipeline by eliminating duplicate builds ([#56](https://github.com/undevy-org/portfolio/issues/56)) ([d09aa38](https://github.com/undevy-org/portfolio/commit/d09aa388800c638e895cd66d017b1aa27f22f8f5))
* **ci:** remove src folder from deployment artifacts ([#61](https://github.com/undevy-org/portfolio/issues/61)) ([a4c7268](https://github.com/undevy-org/portfolio/commit/a4c726884ba9b988d129d21b2bcfe14244ef6851))


### CRITICAL

* Remove .next from repository and fix .gitignore ([#62](https://github.com/undevy-org/portfolio/issues/62)) ([62b5071](https://github.com/undevy-org/portfolio/commit/62b507171a62c78cd61347982478f71b19c42249))


### Tests

* add component tests for ScreenWrapper and ThemeSwitcher ([#63](https://github.com/undevy-org/portfolio/issues/63)) ([6861d00](https://github.com/undevy-org/portfolio/commit/6861d00760594057557c87e72bccb47cda26105e))
* add workflow to verify .next directory handling ([#59](https://github.com/undevy-org/portfolio/issues/59)) ([23512bc](https://github.com/undevy-org/portfolio/commit/23512bc8ef9e41b29d215053c64b36d605437bfd))
* verify branch protection rules are working ([#24](https://github.com/undevy-org/portfolio/issues/24)) ([7f994f0](https://github.com/undevy-org/portfolio/commit/7f994f0f1bf248ff60eccef191665a4e98a768e5))


### Added

* Add animated ASCII art to ProfileBoot screen ([#16](https://github.com/undevy-org/portfolio/issues/16)) ([250056f](https://github.com/undevy-org/portfolio/commit/250056fe973e26134ae02dda823dce67e865b921))
* add CI pipeline for code validation and artifact creation ([#23](https://github.com/undevy-org/portfolio/issues/23)) ([da3b02e](https://github.com/undevy-org/portfolio/commit/da3b02e0f180fc2c7d453b8d3f0ea11a7d1cbc94))
* anonymize codebase for portability ([#17](https://github.com/undevy-org/portfolio/issues/17)) ([4c0ef95](https://github.com/undevy-org/portfolio/commit/4c0ef95b8493edf4ce5c57995e40aa5d40ea06e2))
* **architecture:** implement persistent application shell pattern ([#72](https://github.com/undevy-org/portfolio/issues/72)) ([63fde77](https://github.com/undevy-org/portfolio/commit/63fde77475c93883421bac1f7b92e89e6f46b4fb))
* **config:** add license and abstract Web3 access code. ([#64](https://github.com/undevy-org/portfolio/issues/64)) ([d42c9c8](https://github.com/undevy-org/portfolio/commit/d42c9c8533ed3caf714ca7f6707c9da84c0439c9))
* Expand unit and component test coverage ([57ad35d](https://github.com/undevy-org/portfolio/commit/57ad35d48e3167181448c34cb8d6a9825951ee0a))
* Full codebase anonymization ([e9e6015](https://github.com/undevy-org/portfolio/commit/e9e60151bcb26da1c3a85a8479d669729b62c836))
* Hide analytics panel on ProfileBoot screen ([#14](https://github.com/undevy-org/portfolio/issues/14)) ([c051bc7](https://github.com/undevy-org/portfolio/commit/c051bc78bd45aaeb1fdd507eae0a2feb7dfa39af))
* implement artifact-based deployment ([#27](https://github.com/undevy-org/portfolio/issues/27)) ([422d97d](https://github.com/undevy-org/portfolio/commit/422d97d026fbd10121bee100bc446ae3d79525d4))
* Implement Content Linting Test for content.json ([#26](https://github.com/undevy-org/portfolio/issues/26)) ([6ce20bc](https://github.com/undevy-org/portfolio/commit/6ce20bc80a9d93b4b6f82b643c14186b555a64ed))
* implement demo mode functionality ([#52](https://github.com/undevy-org/portfolio/issues/52)) ([19823e9](https://github.com/undevy-org/portfolio/commit/19823e9c608a4b1fdaec64ba9bf01757fb7ec23b))
* Implement initial unit test coverage for core utilities ([a1988db](https://github.com/undevy-org/portfolio/commit/a1988dbf54b2cca958f19320ff23e4c4e625eb9b))
* optimize artifact retention - 14d for main, 2d for PRs ([#39](https://github.com/undevy-org/portfolio/issues/39)) ([a7c8ea5](https://github.com/undevy-org/portfolio/commit/a7c8ea540fc2b1144335323d9b245d5faad42185))
* redesign Entry screen with new layout and theme switcher ([#49](https://github.com/undevy-org/portfolio/issues/49)) ([830dff2](https://github.com/undevy-org/portfolio/commit/830dff2d006c86724210d15146a17a86a5c18f65))
* replace case count display with level-based progress system ([#44](https://github.com/undevy-org/portfolio/issues/44)) ([8eefb6d](https://github.com/undevy-org/portfolio/commit/8eefb6d1e315d273c23db5002c9de75d27fc200a))
* **ui:** implement stable layout architecture to eliminate layout shift ([#53](https://github.com/undevy-org/portfolio/issues/53)) ([1e76ebe](https://github.com/undevy-org/portfolio/commit/1e76ebed4655f63e1e10bb4d4dcee7a44cb39b11))
* **ui:** introduce four new themes and enhance theme switcher ([#51](https://github.com/undevy-org/portfolio/issues/51)) ([ed041e6](https://github.com/undevy-org/portfolio/commit/ed041e6cce57d52177c4a299ebe3532f3dd673b8))
* **ui:** New boot animation ([a4a3b97](https://github.com/undevy-org/portfolio/commit/a4a3b976f3681f188c7cd56885b94fb93535ab30))
* **ui:** New boot animation ([6e1edbe](https://github.com/undevy-org/portfolio/commit/6e1edbe05f5f2c2dcd2354f784d2b6dd84444ce9))
* **ui:** New updated loader component ([8a11fbd](https://github.com/undevy-org/portfolio/commit/8a11fbdd88ea95854f58cdab384d1a9116789977))


### Fixed

* add missing type definitions for React and csstype ([9bb26a7](https://github.com/undevy-org/portfolio/commit/9bb26a73406c10a178226b414c20a9e25e3a37bf))
* add Web3 access code to build environment ([#69](https://github.com/undevy-org/portfolio/issues/69)) ([6863c32](https://github.com/undevy-org/portfolio/commit/6863c32de8f9cd09e29592290df29a50a3053fe6))
* correct artifact creation in CI pipeline ([#31](https://github.com/undevy-org/portfolio/issues/31)) ([ea51b7d](https://github.com/undevy-org/portfolio/commit/ea51b7df0bf746136b2ab07c1e92ff165ba36b52))
* DESIGN-SYSTEM.md document ([6ec4544](https://github.com/undevy-org/portfolio/commit/6ec454482f9713b21777d2bb4257bab1d1d192cb))
* Implement comprehensive refinements to NPM fallback strategy ([#74](https://github.com/undevy-org/portfolio/issues/74)) ([98ea0e0](https://github.com/undevy-org/portfolio/commit/98ea0e001e6198715421f1433b9f7c29520e7434))
* preserve project images during deployment ([03821aa](https://github.com/undevy-org/portfolio/commit/03821aa3445bd243a4f5f2ab408cd07848c2a567))
* resolve npm registry access issues for CI/CD pipeline ([#71](https://github.com/undevy-org/portfolio/issues/71)) ([33fb4ea](https://github.com/undevy-org/portfolio/commit/33fb4ea1d0b3f2aa9dfd83a1e96a0be6fb38da2e))
* simplify deployment pipeline ([#67](https://github.com/undevy-org/portfolio/issues/67)) ([983408d](https://github.com/undevy-org/portfolio/commit/983408d8329a0cb89312f0bb6f4a003641b1a98f))
* src/app/utils/config.js ([5ec37e8](https://github.com/undevy-org/portfolio/commit/5ec37e87df9e6b3d64e84d6f53e5d5224bf8374b))
* **ui:** Layouts ([#50](https://github.com/undevy-org/portfolio/issues/50)) ([e3a9c1b](https://github.com/undevy-org/portfolio/commit/e3a9c1b201275e9b21dfa94da466ced226dc9420))
* **ui:** ProfileBoot Flickering Fix ([#55](https://github.com/undevy-org/portfolio/issues/55)) ([905652e](https://github.com/undevy-org/portfolio/commit/905652e9a0b986b521689273720c236010479575))
* update dependencies to remove deprecated packages ([290cc1c](https://github.com/undevy-org/portfolio/commit/290cc1ce3984245ffd69607b63a16600e5727c27))
* update dependencies to remove deprecated packages ([a9b206c](https://github.com/undevy-org/portfolio/commit/a9b206ceca41fb55fae3f5ae567bbcb97fa0a553))


### Changed

* Centralize repetitive styles into utility classes ([#42](https://github.com/undevy-org/portfolio/issues/42)) ([c4ce0ec](https://github.com/undevy-org/portfolio/commit/c4ce0ecd7461daf03c070515b973a1da75ac1ce0))
* **ci/cd:** remove .next rename workaround ([#60](https://github.com/undevy-org/portfolio/issues/60)) ([da7c203](https://github.com/undevy-org/portfolio/commit/da7c203d8b02aca00269c50aba81419e0ef2e0f2))
* complete redesign of CI/CD pipeline architecture ([#37](https://github.com/undevy-org/portfolio/issues/37)) ([efd4b81](https://github.com/undevy-org/portfolio/commit/efd4b81475d2d10df751775531a76189d5f9a7fc))
* **release:** 4.0.1 ([c7775d7](https://github.com/undevy-org/portfolio/commit/c7775d777ee78ef5fadc92d999325bbaac9f0d52))
* **release:** 4.0.2 ([4beec27](https://github.com/undevy-org/portfolio/commit/4beec273e262614849441e6307f76de5d1461600))
* **release:** 4.0.3 ([b223f14](https://github.com/undevy-org/portfolio/commit/b223f140407a401460c8fbd38b00efaf94de5587))
* **release:** 4.0.4 ([c85242c](https://github.com/undevy-org/portfolio/commit/c85242c587759e8b8d6bbb440b6d60074c67ddac))
* **release:** 4.1.0 ([d5b0a12](https://github.com/undevy-org/portfolio/commit/d5b0a12df8f3520cef0cd897f462e939f2606164))
* **release:** 4.2.0 ([f47f373](https://github.com/undevy-org/portfolio/commit/f47f37304cf1c2cfc3091ba823f2fc40471a7e98))
* **release:** 4.2.1 ([40c4b8b](https://github.com/undevy-org/portfolio/commit/40c4b8ba9a9095b89394f1ef946fe59ff2b38312))
* **release:** 4.2.2 ([7c3b7e4](https://github.com/undevy-org/portfolio/commit/7c3b7e49738523f4eb6835fdc3af577bb4aaa552))
* **release:** 5.0.0 ([cfa8388](https://github.com/undevy-org/portfolio/commit/cfa8388f36a257598975d205b7f74405db6ffc77))
* **release:** 5.0.1 ([82c5616](https://github.com/undevy-org/portfolio/commit/82c5616f9541df79e06fe8e65136b4acb1c078a3))
* **release:** 5.0.2 ([57a0037](https://github.com/undevy-org/portfolio/commit/57a00372f0f9861e67d273267aecb9010a85e899))
* **release:** 5.1.0 ([1a04685](https://github.com/undevy-org/portfolio/commit/1a04685fb6cae0e21c8f7e6e823279dc41f8c2b5))
* **release:** 5.1.1 ([8da9e2d](https://github.com/undevy-org/portfolio/commit/8da9e2de44cc5c098a35cb18ff7b01cf9cbf5e7e))
* **release:** 5.1.2 ([4621633](https://github.com/undevy-org/portfolio/commit/4621633512d8b330a815d064bd6de1ec1416b0d4))
* **release:** 5.2.0 ([5618253](https://github.com/undevy-org/portfolio/commit/56182537d18b6431e5961510885c17e1bffe9abe))
* Remove unnecessary comments ([c0224b6](https://github.com/undevy-org/portfolio/commit/c0224b6fcebda144f29fad0b596ff9bc24c44fa9))
* Snapshot of main as stable version ([036263c](https://github.com/undevy-org/portfolio/commit/036263cb716ffc8018ee86bc829e8e0301138b18))
* trigger CI/CD pipeline with empty commit ([cfefc5b](https://github.com/undevy-org/portfolio/commit/cfefc5b54833379c0e128f1b09717955437d1efe))
* Untrack local and backup files ([5e05545](https://github.com/undevy-org/portfolio/commit/5e0554575fd94d0d35cd7a659a0263e211aeca9e))


* Docs/restructure documentation (#75) ([bf319b4](https://github.com/undevy-org/portfolio/commit/bf319b47d2cab210c1b9e7cc525c579cd94f19c2)), closes [#75](https://github.com/undevy-org/portfolio/issues/75) [#17](https://github.com/undevy-org/portfolio/issues/17) [#18](https://github.com/undevy-org/portfolio/issues/18) [#16](https://github.com/undevy-org/portfolio/issues/16) [#23](https://github.com/undevy-org/portfolio/issues/23) [#24](https://github.com/undevy-org/portfolio/issues/24) [#27](https://github.com/undevy-org/portfolio/issues/27) [#28](https://github.com/undevy-org/portfolio/issues/28) [#30](https://github.com/undevy-org/portfolio/issues/30)
* Refactor/remove-bot (#66) ([19bd9c2](https://github.com/undevy-org/portfolio/commit/19bd9c22b62853c0357356da7303c6a85b19131f)), closes [#66](https://github.com/undevy-org/portfolio/issues/66)
* Refactor/remove bot (#65) ([35819bc](https://github.com/undevy-org/portfolio/commit/35819bc97b025f129e4be6adefb838f5eaec035c)), closes [#65](https://github.com/undevy-org/portfolio/issues/65)
* Feature/anonymize codebase (#18) ([8bf72c7](https://github.com/undevy-org/portfolio/commit/8bf72c72595d8d13b843927068fc0714e95fa922)), closes [#18](https://github.com/undevy-org/portfolio/issues/18)

## [5.2.0](https://github.com/undevy-org/portfolio/compare/v5.1.2...v5.2.0) (2025-08-26)


### Fixed

* Implement comprehensive refinements to NPM fallback strategy ([#74](https://github.com/undevy-org/portfolio/issues/74)) ([98ea0e0](https://github.com/undevy-org/portfolio/commit/98ea0e001e6198715421f1433b9f7c29520e7434))

### [5.1.2](https://github.com/undevy-org/portfolio/compare/v5.1.1...v5.1.2) (2025-08-25)

>>>>>>> bf319b47d2cab210c1b9e7cc525c579cd94f19c2
### [5.2.1](https://github.com/undevy-org/portfolio/compare/v5.2.0...v5.2.1) (2025-08-26)

## [5.2.0](https://github.com/undevy-org/portfolio/compare/v5.1.2...v5.2.0) (2025-08-26)


### Fixed

* Implement comprehensive refinements to NPM fallback strategy ([#74](https://github.com/undevy-org/portfolio/issues/74)) ([98ea0e0](https://github.com/undevy-org/portfolio/commit/98ea0e001e6198715421f1433b9f7c29520e7434))

### [5.1.2](https://github.com/undevy-org/portfolio/compare/v5.1.1...v5.1.2) (2025-08-25)
=======
## [5.2.0](https://github.com/undevy-org/portfolio/compare/v5.1.2...v5.2.0) (2025-08-26)


### Fixed

* Implement comprehensive refinements to NPM fallback strategy ([#74](https://github.com/undevy-org/portfolio/issues/74)) ([98ea0e0](https://github.com/undevy-org/portfolio/commit/98ea0e001e6198715421f1433b9f7c29520e7434))

### [5.1.2](https://github.com/undevy-org/portfolio/compare/v5.1.1...v5.1.2) (2025-08-25)

>>>>>>> bf319b47d2cab210c1b9e7cc525c579cd94f19c2

### Added

* **architecture:** implement persistent application shell pattern ([#72](https://github.com/undevy-org/portfolio/issues/72)) ([63fde77](https://github.com/undevy-org/portfolio/commit/63fde77475c93883421bac1f7b92e89e6f46b4fb))

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