# System Architecture

This document provides a detailed technical overview of the Interactive Terminal Portfolio project. It covers the end-to-end architecture, from infrastructure and data flow to the frontend state management model and internal logic.

## 1. High-Level Architecture

The application is a hybrid Next.js application that combines server-side data processing with a client-side Single Page Application (SPA) experience after authentication.

### System Components Diagram
```mermaid
graph TD
    subgraph User
        A[Browser]
    end

    subgraph GitHub
        B[GitHub Actions CI/CD]
    end

    subgraph "DigitalOcean Droplet (Server)"
        C[Nginx Reverse Proxy]
        
        subgraph ProductionEnv [Production Environment]
            D_Prod[PM2 Prod Process]
            E_Prod[Next.js App (Prod)]
            D_Prod --> E_Prod
        end

        subgraph StagingEnv [Staging Environment]
            D_Staging[PM2 Staging Process]
            E_Staging[Next.js App (Staging)]
            D_Staging --> E_Staging
        end
        
        F[Docker Engine]
        G[content.json]

        C -- "yourprimarydomain.com" --> D_Prod
        C -- "stage.yourprimarydomain.com" --> D_Staging
        C -- "analytics.yourprimarydomain.com" --> F
        
        subgraph E_Prod
            E_Client_P[Client-Side SPA]
            E_Server_P[Server-Side API]
        end
        
        subgraph E_Staging
            E_Client_S[Client-Side SPA]
            E_Server_S[Server-Side API]
        end

        subgraph F [Docker Engine]
            F_Matomo[Matomo Container]
            F_DB[MariaDB Container]
            F_Matomo -- "communicates with" --> F_DB
        end

        E_Prod -- "reads & merges" --> G
        E_Staging -- "reads & merges" --> G
    end

    A -- "HTTPS Request" --> C
    B -- "deploys to" --> ProductionEnv
    B -- "deploys to" --> StagingEnv
```

## 2. Authentication & Session Lifecycle

The application supports two parallel authentication methods, with Web3 libraries loading on-demand to optimize initial page load performance.

### 2.1. Code-Based Authentication
1. A user navigates to `/?code=XYZ123`.
2. The client-side app makes a `GET` request to `/api/session?code=XYZ123`.
3. The API reads `content.json`, finds the profile matching the code, merges it with `GLOBAL_DATA`, and returns a complete `sessionData` object.

### 2.2. Session Check vs Demo Mode
The `/api/session` endpoint supports three distinct operation modes:

1. **Session Verification**: `GET /api/session?check=session`
   - Used by the application to verify if an existing session is active
   - Returns 401 if no session exists
   - Does not trigger demo mode, ensuring clean separation of concerns

2. **Demo Mode Activation**: `GET /api/session` (no parameters)
   - Returns demo user data when demo mode is enabled in configuration
   - Only activates when no parameters are provided
   - Used for showcasing the portfolio without authentication

3. **Standard Authentication**: `GET /api/session?code=ACCESS_CODE`
   - Traditional authentication flow with access code
   - Returns personalized session data if code is valid
   - Returns 404 for invalid codes

This separation prevents the critical bug where session checks would inadvertently trigger demo mode authentication.

### 2.3. Web3 Wallet Authentication with Lazy Loading

The Web3 authentication system implements a sophisticated lazy-loading architecture that reduces the initial bundle size by approximately 50%. Since less than 5% of users utilize Web3 authentication, the ~2MB of Web3 libraries (including @reown/appkit, wagmi, viem, and @tanstack/react-query) are loaded only when explicitly needed.

📖 **See docs/THEME-GUIDE.md for complete theme system and 8 supported themes**

#### 2.3.1. Lazy Loading Architecture

The Web3 loading process is orchestrated by three key components working in harmony:

**Web3Manager Component** (`/src/app/components/Web3Manager.js`)
This context provider acts as the central orchestrator for Web3 functionality. It manages the loading lifecycle through several states: `isWeb3Loaded` (libraries downloaded), `isWeb3Ready` (hooks initialized and usable), and `isLoading` (currently loading). The component wraps the entire application at the root layout level but remains dormant until activated, consuming minimal resources in its idle state.

**Web3Bridge Component** (`/src/app/components/Web3Bridge.js`)
Once Web3 libraries are loaded, the Web3Bridge component serves as the critical connection between React's Web3 hooks and the application. This component solves a fundamental architectural challenge: React hooks cannot be conditionally called or dynamically imported, but components can be. The Web3Bridge uses Web3 hooks in the standard React way and communicates their values upward through callbacks, making them available to the entire application through the Web3Manager context.

**useWeb3State Hook** (`/src/app/hooks/useWeb3State.js`)
This custom hook provides a clean, consistent interface for components to access Web3 functionality. It abstracts away the complexity of the lazy loading system, providing safe default values when Web3 isn't loaded and managing the loading flow transparently. Components using this hook simply call `openWeb3Modal()` without needing to understand the underlying lazy loading mechanism.

#### 2.3.2. Loading Flow

The Web3 authentication flow now follows this optimized sequence:

1. **Initial Page Load**: The Entry screen renders with the "WEB3 LOGIN" button visible, but no Web3 libraries are loaded. The application uses webpack's code splitting to create a separate `web3-vendors` chunk that isn't included in the initial bundle.

2. **User Initiates Web3 Login**: When a user clicks the "WEB3 LOGIN" button for the first time, the Entry component calls `openWeb3Modal()` from the `useWeb3State` hook.

3. **Dynamic Library Loading**: The Web3Manager detects that Web3 hasn't been loaded and initiates the loading process. Using Next.js's `dynamic()` function with `ssr: false`, it asynchronously loads the Web3Provider and Web3Bridge components along with their dependencies.

4. **Hook Initialization**: Once loaded, the Web3Bridge component initializes the actual Web3 hooks (`useAppKit`, `useAccount`, `useDisconnect`) and reports their values back to the Web3Manager through the `onWeb3StateChange` callback.

5. **Modal Opening**: After the hooks are ready, the wallet connection modal opens automatically, allowing the user to connect their wallet. The loading state is reflected in the button text, changing from "WEB3 LOGIN" to "LOADING WEB3..." to "CONNECTING...".

6. **Authentication**: Upon successful wallet connection, the client initiates a session using the Web3 shared access code configured in the environment variables, enriching the session data with `isWeb3User: true` and the user's wallet address.

#### 2.3.3. Performance Impact

This lazy loading implementation achieves significant performance improvements:

- **Initial JS Bundle**: Reduced from ~4MB to ~2MB (50% reduction)
- **Time to Interactive**: Improved by approximately 40% for code-authentication users
- **Lighthouse Performance Score**: Increased by 12 points on average
- **Web3 Chunk Size**: ~2MB loaded on-demand only when needed

The optimization is completely transparent to users. The interface remains identical, with the same buttons and interactions. The only difference is that Web3 libraries load just-in-time rather than upfront, ensuring that the 95% of users who authenticate with access codes experience significantly faster page loads without any compromise in functionality for Web3 users.

### 2.4. Entry Screen Auto-Fill Feature

The auto-fill feature provides a seamless authentication experience for users arriving with access codes in the URL. Instead of immediately authenticating and bypassing the Entry screen, users now see a theatrical typing animation that showcases the portfolio's unique character.

#### 2.4.1. Architecture Overview

The auto-fill system involves three main components working in concert:

**SessionContext State Management**
The SessionContext now includes `autoFillCode` state and `setAutoFillCode` setter, providing a clean communication channel between page.js and Entry.js. This avoids prop drilling and maintains architectural consistency.

**Page.js Orchestration**
When detecting a code parameter in the URL, page.js now:
1. Sets the `autoFillCode` in SessionContext instead of immediately authenticating
2. Navigates to the Entry screen
3. Manages race conditions with logout operations through `logoutInProgress` flag
4. Uses refs to track processed codes and prevent duplicate animations

**Entry.js Animation Engine**
The Entry component implements a sophisticated typing animation system:
- Uses `isAnimating` state to control UI element disabled states
- Manages multiple timers through `animationTimersRef` for proper cleanup
- Implements `typeCharacter` recursive function with random delays (100-200ms)
- Handles cleanup on component unmount or logout to prevent memory leaks
- Uses direct state refs (`codeRef`) to avoid stale closures in timer callbacks

#### 2.4.2. Animation Flow

1. **Detection**: User arrives at `/?code=ABC123`
2. **Initialization**: page.js sets `autoFillCode` and navigates to Entry
3. **Visual Feedback**: Input field receives `.auto-filling` CSS class with glow effect
4. **Typing Animation**: Characters appear one by one with natural variation
5. **Auto-Submit**: After 800ms pause, `handleSubmit` is called directly
6. **Cleanup**: All timers cleared, autoFillCode reset, URL cleaned

#### 2.4.3. Race Condition Prevention

The implementation carefully handles several edge cases:

**Logout During Animation**
The `logoutInProgress` flag from SessionContext immediately stops any running animation and clears all timers when logout is initiated.

**Component Unmounting**
All timer IDs are stored in `animationTimersRef` and cleared in the useEffect cleanup function.

**Multiple Navigations**
A `hasStartedAnimation` ref prevents duplicate animations if the effect runs multiple times.

**Stale Closures**
Using refs for mutable values (`codeRef`, `typeCharacterRef`) ensures timer callbacks always have current values.

#### 2.4.4. Visual Design

The animation includes subtle visual enhancements:
- **Glow Effect**: Pulsing box-shadow animation on the input field
- **Disabled States**: All buttons except theme switcher are disabled during animation
- **System Log**: Appropriate messages logged for debugging and user feedback

## 3. Frontend Architecture (SPA Model)

### 3.1. Core State: `SessionContext`
This React Context is the brain of the application. It manages:
-   `sessionData`: The complete, personalized content object for the session.
-   `currentScreen`: The name of the currently visible screen (e.g., `Timeline`, `CaseDetail`). Determines what `ScreenRenderer` displays.
-   `navigationHistory`: An array of visited screen names, used for the "Back" button and breadcrumbs.
-   `selectedItem`: Holds the currently selected object (e.g., the specific case or role the user is viewing).
-   `theme`: The current UI theme (`'dark'` or `'light'`).
-   `autoFillCode`: Access code for auto-fill animation feature.
-   `logoutInProgress`: Flag to coordinate logout across components and prevent race conditions.
-   `Web3 State Handling`: The context now includes an `isWeb3User` flag. To manage the asynchronous nature of wallet disconnection, the `endSession` function dispatches a custom `web3-logout-requested` browser event. This decouples the session termination logic within the context from the wallet disconnection logic handled by `Entry.js`, preventing race conditions.

### 3.2. Routing: `ScreenRenderer` & Hash Routing
-   Navigation is controlled by updating the `currentScreen` state in `SessionContext`.
-   This change triggers the `ScreenRenderer` component to dynamically import and render the correct screen component from `/src/app/screens/`.
-   The URL is updated with a hash to reflect the current screen (e.g., `/#CaseDetail`), enabling deep linking and browser history support.

### 3.3. Component Architecture: Data-Driven Rendering
The application uses a data-driven rendering pattern where parent components pass data structures to child components, which then handle the rendering logic. This is exemplified in the `CaseDetail` → `Tabs` → `TerminalImagePreview` flow:

-   CaseDetail creates arrays of content objects with types (`text`, `list_item`, `image`, etc.)
-   Tabs receives these arrays and maps over them, calling appropriate render functions based on type
-   TerminalImagePreview handles the complex image loading and display logic independently

This pattern ensures separation of concerns: data management stays in parent components while rendering logic is encapsulated in specialized components. This makes the system extensible - new content types can be added by simply extending the type handlers in the rendering components.

### 3.4. Layout Stability Architecture

The application uses a fixed-region layout system to prevent visual disruption during navigation:

#### StableLayout Component
Creates three distinct regions that never change size:
- Top Spacer (desktop only): Flexible height for vertical centering
- Content Region: Fixed 600px on desktop, flexible on mobile
- Bottom Region: Houses AnalyticsPanel and SystemLog

#### TerminalWindow Fixed Mode
When `fixedHeight={true}`:
- Container fills available height (`h-full flex flex-col`)
- Header and breadcrumbs remain fixed
- Content area becomes scrollable (`flex-1 overflow-y-auto`)

#### Animation System
- AnimatedScreenTransition: Orchestrates 400ms transitions
- Exit Phase: 200ms fade-out with 2% scale reduction
- Enter Phase: 200ms fade-in with 2% scale increase
- GPU Optimization: Uses only transform and opacity for performance

#### Unified Wrappers
All screens use `ScreenWrapper` component ensuring:
- Consistent padding (`p-4` / 1rem)
- Screen-specific adjustments via props
- Testability with data attributes

### 3.5. Visual Effects Architecture

The application uses carefully crafted visual effects to enhance the user experience without compromising performance. These effects are designed to be atmospheric rather than distracting, adding personality while maintaining professional polish.

#### HyperspaceTunnel Component
A dynamic SVG animation component that creates a cinematic portal effect during the ProfileBoot sequence. Key features include:

- Responsive Viewport: Dynamically adjusts to screen dimensions rather than using fixed viewBox values
- Theme Integration: Automatically adapts colors using CSS variables (`--color-text-primary`, `--color-border`, etc.)
- Performance Optimized: Uses SVG animations with GPU acceleration, keeping CPU usage minimal
- Layered Animation: Combines multiple effects:
  - Pulsing center vortex point
  - Expanding concentric rings with opacity fade
  - Particle stars moving outward from center
  - Radial gradient backgrounds for depth

The component accepts props for controlling animation state, progress tracking, and completion callbacks, making it fully integrated with the boot sequence flow.

#### Terminal Background Texture
A pure CSS implementation that adds subtle CRT-style visual depth across all screens:

- Dual-Layer Effect: Combines horizontal scanlines (CRT effect) with vertical grid lines (structure)
- Theme-Aware: Each theme defines its own texture color, opacity, and grid spacing through CSS variables
- Performance-First: Uses CSS gradients rather than images or canvas for zero network overhead
- Mobile Optimized: Simplifies to just scanlines on smaller screens to maintain performance
- Non-Intrusive: Applied via pseudo-elements with `pointer-events: none` to never interfere with interactions

#### Auto-Fill Animation Effects
CSS classes for the Entry screen auto-fill feature:

- `.auto-filling`: Applied to input during typing animation
- Glow animation: Pulsing box-shadow effect using CSS keyframes
- Theme-compatible: Uses CSS variables for colors to work across all themes

These visual effects work in harmony with the existing layout stability architecture, ensuring smooth transitions and consistent performance across all devices and themes.

### 3.6. Global Component Placement Strategy

Certain UI components need to appear on specific screens but should be managed at the layout level rather than within individual screens. The ThemeSwitcher component exemplifies this pattern:

**Placement**: ThemeSwitcher is rendered in `layout.js` within `StableLayout`, positioned above the main content children (`{children}`).

**Visibility Control**: CSS classes control when it's visible (`hidden md:block` for desktop-only display). The component itself uses `currentScreen` from SessionContext to determine whether to render.

**Architecture Benefits**:
- Separation of Concerns: Screen components focus on their content, not chrome elements
- Layout Independence: For Entry screen, TerminalWindow returns a Fragment, making it transparent. ThemeSwitcher sits outside this, creating true visual separation
- Reusability: Pattern can be applied to other global UI elements that need screen-specific visibility

**Implementation**:
- Entry screen: TerminalWindow is transparent (Fragment return), ThemeSwitcher appears above content
- ProfileBoot screen: TerminalWindow renders standard container, ThemeSwitcher appears above header
- Other screens: ThemeSwitcher hidden, standard TerminalWindow with header/breadcrumbs

This pattern maintains clean separation between layout-level concerns and screen-specific content while enabling precise control over component visibility across different application states.

## 4. Testing Architecture

The testing infrastructure follows a three-tier pyramid model designed to catch issues at different levels of abstraction while maintaining fast feedback loops. This architecture creates a safety net that enables confident refactoring and feature development.

### 4.1. Testing Infrastructure Design

The foundation of our testing system consists of unit tests for pure utility functions in the `src/app/utils` directory. These functions have no side effects and predictable input-output relationships, making them ideal for comprehensive testing. Each utility function is tested for normal cases, edge cases including null and undefined inputs, and error conditions. This foundation runs in milliseconds and provides immediate feedback during development.

The middle layer comprises component tests for React components, which verify rendering logic, user interactions, and integration with React Context. Components are wrapped in mock providers that simulate the application context while remaining predictable and controllable. These tests use React Testing Library's philosophy of testing components from the user's perspective, focusing on behavior rather than implementation details.

The top tier includes integration tests that verify complete user flows by composing multiple components together. While not true end-to-end tests since they run in Jest's jsdom environment rather than a real browser, they simulate real user behavior patterns and catch integration issues between components. These tests verify navigation flows, data persistence across screens, and session management.

### 4.2. Test Utilities Architecture

The testing infrastructure relies on centralized utilities located in the `test-utils` directory. The `providers.js` file contains mock implementations of React Context providers, particularly the MockSessionProvider that wraps components during testing. The `mocks.js` file houses all mock data in a single location, including user profiles, global data structures, session data, and navigation states, ensuring consistency across all tests and allowing changes to propagate automatically.

Helper utilities in `helpers.js` provide essential functionality for testing, including browser API mocks for APIs that jsdom doesn't provide natively, such as localStorage, matchMedia, IntersectionObserver, and ResizeObserver. These utilities also include Web3 wallet mocks for testing blockchain interactions, event creation helpers for simulating user interactions, and custom assertion helpers that provide better error messages than default Jest matchers.

### 4.3. Testing Challenges with Next.js 13+

The project faces a significant technical challenge with code coverage reporting due to fundamental incompatibilities between Jest's instrumentation system and Next.js 13's architecture. When Jest attempts to add coverage instrumentation to measure which lines of code are executed during tests, it conflicts with Next.js's SWC compiler, particularly when processing files with 'use client' directives and other Next.js-specific syntax.

This incompatibility manifests as "The 'original' argument must be of type function" errors when running tests with the coverage flag. Multiple alternative solutions were explored, including c8 coverage tool based on V8's native coverage, nyc (Istanbul) for traditional instrumentation-based coverage, and custom babel configurations to bypass SWC. However, all these approaches encountered similar incompatibilities with the Next.js 13 architecture.

It's important to note that this limitation affects only coverage metrics reporting. The tests themselves execute successfully and provide the intended safety net for refactoring. As a workaround, manual coverage checking scripts can be used to assess test coverage without relying on automatic instrumentation.

### 4.4. Test Execution Flow

Tests are executed using Jest with configuration defined in `jest.config.mjs`, which integrates with Next.js through the `next/jest` preset. The setup process loads global test configuration from `jest.setup.js`, which imports testing library matchers and sets up browser API mocks. Environment variables are loaded from `.env.local` through `jest.env.js`, ensuring tests run with the same configuration as local development.

Tests are co-located with the code they test, following the pattern of placing `.test.js` files next to their corresponding implementation files. This structure makes it easy to find tests and keeps them closely tied to the code they verify. The current test suite includes seven passing test suites with 62 total tests, covering all critical utility functions and core UI components.

## 5. Backend & CMS Architecture

### 5.1. Headless CMS via Telegram Bot
The bot provides a complete interface for managing `content.json` without direct server access.

```mermaid
graph LR
    subgraph Telegram
        A[Admin User] --> B[grammY Bot]
    end
    
    subgraph "Portfolio Server"
        B -- "HTTPS Request" --> C[Admin API Route<br>(/api/admin/content)]
        C -- "Bearer Token Auth" --> D[Validation & File Ops]
        D -- "reads/writes" --> E[content.json]
        D -- "creates" --> F[Backup Directory]
    end
```
-   Security: The API is protected by a secret Bearer Token. The bot itself is restricted by `ADMIN_USER_ID`.
-   Operations: The bot uses `GET`, `PUT`, and `PATCH` requests to the Admin API to read, overwrite, or modify `content.json`. All changes automatically create a timestamped backup.

## 6. Multi-Domain Logic (Internal)

The application is designed to support multiple domains and display different content accordingly. This logic is private and a core feature of the system.

### 6.1. Domain Detection
-   The domain is detected on the client-side within the `SessionProvider` using `window.location.hostname`.
-   The detected hostname is stored in the `currentDomain` state variable in `SessionContext`.

### 6.2. Dynamic Content Rendering
-   Components subscribe to `currentDomain` from the context.
-   Content is dynamically adjusted using conditional logic.

Example from `Contact.js`:
```javascript
// A simplified example of the logic
const { currentDomain, sessionData } = useSession();

let contactInfo;

if (currentDomain?.includes('secondarydomain')) {
  // Use a specific set of contact details for secondarydomain.com
  contactInfo = {
    email: 'contact@secondarydomain.com',
    telegram: '@secondarydomain_contact',
    // ... other secondarydomain-specific data
  };
} else {
  // Default to the data from content.json for primarydomain.com
  contactInfo = sessionData.contact;
}

// The component then renders the 'contactInfo' object.
```
This pattern allows the single codebase to serve multiple, distinctly branded portfolio instances based on the domain name, without needing separate deployments.

## 7. CI/CD Pipeline Architecture

The project uses GitHub Actions for continuous integration and deployment, implementing a robust two-tier pipeline that ensures code quality and safe deployments to separate staging and production environments.

### 7.1. Pipeline Overview

The CI/CD system is orchestrated by four distinct workflows that handle validation, staging deployment, and production releases.

```mermaid
graph TD
    subgraph "Development"
        A[Feature Branch] -->|Create PR| B(Pull Request)
    end

    subgraph "CI & Validation"
        B --> C{CI Pipeline (ci.yml)}
        C -- "On PR" --> D[Lint, Test, Build]
        C -- "On Merge to Main" --> E[Build & Create Staging Artifact]
    end

    subgraph "Deployment"
        E --> F{Staging Deploy (staging-deploy.yml)}
        F -- "Auto-deploys artifact" --> G[Staging Environment]
        
        H[Version Tag Push] --> I{Release Deploy (release-deploy.yml)}
        I -- "Builds from source" --> J[Production Environment]
    end
    
    H --> K{Create Release Notes (release.yml)}
    K --> L[GitHub Release]
```

Workflow Summary:
1.  Pull Request: A `ci.yml` workflow runs checks (lint, test, build). Merging is blocked until it passes.
2.  Merge to `main`: The same `ci.yml` workflow runs again, but this time it builds a deployment-ready artifact for staging and uploads it.
3.  Staging Deployment: A `staging-deploy.yml` workflow is triggered by the successful completion of the CI run on `main`. It downloads the artifact and deploys it to the staging server. This is fully automatic.
4.  Production Release: A developer manually creates a version tag (e.g., `v5.3.1`). This push triggers two workflows:
    -   `release-deploy.yml`: Builds a fresh release from the tagged source code and deploys it to production using a blue-green strategy.
    -   `release.yml`: Creates a corresponding release on GitHub with automated release notes.

### 7.2. Artifact Strategy

-   PR Verification Artifacts: Lightweight text files confirming that all CI checks passed. Stored for 2 days.
-   Staging Artifacts: A complete, compiled application package created from the `main` branch. Contains only production-necessary files. Stored for 14 days to allow for debugging or re-deployment.
-   Production Artifacts: A `tar.gz` archive of the production build is attached to each GitHub Release for permanent storage and auditing.

### 7.3. Deployment Processes

#### Staging Deployment Process (`staging-deploy.yml`)
1.  Downloads the artifact from the CI run.
2.  Transfers the artifact to `/tmp/` on the server.
3.  Extracts files into a temporary directory.
4.  Applies the staging `.env` file.
5.  Swaps the old staging directory with the new one.
6.  Installs production dependencies.
7.  Starts/restarts the `staging-portfolio` PM2 process on port 3001.

#### Production Deployment Process (`release-deploy.yml`)
1.  Builds the application from the specific version tag source code.
2.  Creates a versioned release package (`tar.gz`).
3.  Uploads the package as a permanent artifact to a new GitHub Release.
4.  Transfers the package to `/tmp/` on the server.
5.  Extracts files into a new versioned directory (e.g., `/home/deployer/releases/portfolio/v5.3.1`).
6.  Applies the production `.env` file.
7.  Atomically switches the `/home/deployer/primarydomain.com` symbolic link to point to the new version directory.
8.  Restarts the `undevy-portfolio` PM2 process.
9.  Performs a health check; if it fails, automatically rolls back the symbolic link.
10. Cleans up old releases, keeping the last three for manual rollback.

### 7.4. GitHub Configuration

Required Secrets:
-   `SSH_HOST`: Production server IP address.
-   `SSH_USER`: Server username for deployment.
-   `SSH_PRIVATE_KEY`: SSH key for server authentication.
-   `PM2_APP_NAME_PORTFOLIO`: PM2 process name for the production portfolio.
-   `NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE`: Default access code for Web3 users.

Branch Protection Rules:
-   `main` branch is protected.
-   Requires a pull request before merging.
-   Requires the `CI Pipeline / Validate and Build` status check to pass.

## 8. Versioning & Release Architecture

The project implements a sophisticated versioning system that ensures consistency across all touchpoints and automates the release process.

### 8.1. Version Management Philosophy

The system follows a single source of truth principle where `package.json` serves as the canonical version reference. This eliminates version drift and manual synchronization errors that commonly occur in multi-file version tracking.

```
package.json (version: "4.0.1")
        ↓
    Imported by
        ↓
SessionContext.js → displays in app log
        ↓
    Read by
        ↓
standard-version → updates & creates tags
        ↓
    Triggers
        ↓
GitHub Actions → creates releases & deploys to production
```

### 8.2. Automated Release Pipeline

The release process is fully automated through a combination of local tooling and CI/CD:

1.  Local Release Creation: Developer runs `npm run release` which triggers `standard-version`.
2.  Version Bumping: Tool analyzes commit messages and determines version increment.
3.  Changelog Generation: Automatically generates changelog entries from conventional commits.
4.  Git Operations: Creates a commit and an annotated tag with the new version.
5.  Push Trigger: `git push --follow-tags` sends changes and the new tag to GitHub.
6.  GitHub Release: A workflow detects the tag push and creates a corresponding GitHub Release.
7.  Production Deployment: A separate workflow detects the tag push, builds the application, and deploys it to the production environment.

### 8.3. Version Visibility

The version is exposed at multiple levels:

-   Source Code: `package.json` contains the authoritative version.
-   Application Runtime: Version displayed in system log on initialization.
-   Git History: Tags mark each version in repository history.
-   GitHub Releases: Public releases with auto-generated release notes.
-   Deployment: Each production deployment is associated with a specific version tag.

### 8.4. Conventional Commits Integration

The system relies on conventional commit messages to automate version determination:

```
feat: → triggers MINOR version bump
fix: → triggers PATCH version bump
BREAKING CHANGE: → triggers MAJOR version bump
chore:, docs:, style: → no version bump (but included in changelog)
```

This creates a self-documenting development flow where commit messages drive both versioning and changelog generation.
