# **Terminal UI Design System**

This document outlines the design philosophy, architectural principles, and component guidelines for the Interactive Terminal Portfolio. It serves as the single source of truth for the project's UI/UX, ensuring consistency, maintainability, and a systematic, principle-driven approach to development. This version reflects the shift to a flexible, multi-theme architecture powered by CSS variables.

**🌟 Component Library Integration**: This design system now powers a comprehensive Storybook component library with 56 documented components for isolated development and testing.

## **1. Design Philosophy**

The Terminal UI system is built not just on aesthetics, but on a core philosophy of clarity, control, and character. Every design decision is guided by five key principles.

-   **1.1. Command-Line Aesthetics**: The interface intentionally mimics classic terminal commands and layouts.
    *   **Why?** To create a unique, memorable experience that speaks to technical competence and honors the legacy of computing. It's an interface for builders, thinkers, and problem-solvers.

-   **1.2. Segmented Information Architecture**: Content is strictly compartmentalized into clearly bordered panels.
    *   **Why?** In complex domains like Web3/DeFi, clarity builds trust. Each panel acts as a single "thought block," isolating a piece of information to reduce cognitive load and guide the user through a structured narrative.

-   **1.3. Intentional Hierarchy**: The system uses a strict color and typography hierarchy to direct user attention.
    *   **Why?** To make the interface scannable and intuitive. The user should instinctively know what is a title, what is a key piece of data, and what is descriptive text, allowing them to consume information at their own pace.

-   **1.4. System Feedback Transparency**: All significant user actions and system responses are explicitly logged in a prominent, real-time `SystemLog`.
    *   **Why?** To give the user a sense of complete control and predictability, much like a developer using a well-designed tool. The application's state is never a mystery.

-   **1.5. Atmospheric Depth**: Subtle visual effects like CRT-style background textures and hyperspace animations create an immersive, cinematic experience.
    *   **Why?** To elevate the portfolio from a static document to an interactive journey. These effects are carefully calibrated to enhance rather than distract, adding personality while maintaining professional polish.

## **2. Theming Architecture: How It Works**

Our theming system is designed for instant, client-side theme switching without page reloads or hydration errors. It is built on a modern, scalable foundation of CSS variables.

### **2.1. The Core Idea: CSS Variables & `data-theme`**

We control themes exclusively via a `data-theme` attribute on the root `<html>` element. This attribute acts as a switch that instantly changes the values of all our CSS color variables, causing the entire UI to re-render with the new palette. This is our single source of truth for theming.

### **2.2. The Two Layers of Styling**

Our system is organized into two distinct layers, ensuring a clear separation of concerns.

1.  **Layer 1: Global CSS (`globals.css`)**: Here, we define semantic CSS variables (e.g., `--color-bg`, `--color-text-primary`). For each supported theme (e.g., `[data-theme='light']`), we assign the appropriate color values to these variables.

2.  **Layer 2: Semantic Classes (`globals.css`)**: We create a library of reusable, semantic utility classes (e.g., `.bg-main`, `.text-primary`). These classes use the CSS variables, making them automatically theme-aware. **Components should only use these classes.**

### **2.3. How a Theme is Applied (The Flow)**

The theme-switching process is a clean, predictable flow:

1.  A user clicks the theme toggle button in the `TerminalWindow`.
2.  The `toggleTheme` function in `SessionContext.js` updates the `theme` state (e.g., from `'dark'` to `'light'`).
3.  The `ThemeManager.js` component, subscribed to this state, updates the root `<html>` element's attribute: `<html data-theme="light">`.
4.  The browser immediately applies the new set of CSS variables defined in `globals.css` under the `[data-theme='light']` selector.
5.  All components styled with our semantic classes (e.g., `.bg-main`) instantly re-render with the new colors, with zero flicker.

### **2.4. Theme Intent**

To support components with complex visual effects that differ fundamentally between light and dark backgrounds (e.g., glows vs. shadows), we've introduced the concept of a theme "intent". Each theme is categorized as either `'dark'` or `'light'` in a configuration object within `SessionContext.js`.

**Why?** This allows components like `MorphingTerminal` to apply different sets of CSS rules based on the theme's nature without needing to know about specific theme names like 'amber' or 'bsod'. For example, dark-intent themes might use a `text-shadow` to create a glow effect, while light-intent themes use a subtle shadow to mimic printed text.

```javascript
// Example from SessionContext.js
export const themeConfig = {
  dark: { intent: 'dark' },
  light: { intent: 'light' },
  // ...
  kyoto: { intent: 'light' },
  radar: { intent: 'dark' }
};
```

## **3. Color Palettes**

The following tables define the color palette for each supported theme. Each theme provides a full spectrum of 17 semantic color variables plus 3 texture effect variables.

### **3.1. How to Read These Tables**

-   **Role:** The semantic purpose of the color in the UI.
-   **CSS Variable:** The variable name to be used in `globals.css`.
-   **Hex/RGBA Value:** The raw color value.

### **3.2. Dark Theme (Default)**

| CSS Variable             | Value                  |
| :----------------------- | :--------------------- |
| `--color-bg`             | `#000000`              |
| `--color-text-white`     | `#ffffff`              |
| `--color-text-primary`   | `#86efac`              |
| `--color-text-secondary` | `#9ca3af`              |
| `--color-text-tertiary`  | `#6b7280`              |
| `--color-text-command`   | `#eab308`              |
| `--color-border`         | `#22c55e`              |
| `--color-border-darker`  | `#166534`              |
| `--color-active`         | `#15803d`              |
| `--color-error`          | `#dc2626`              |
| `--color-success`        | `#4ade80`              |
| `--color-input-bg`       | `#111827`              |
| `--color-hover`          | `rgba(34, 197, 94, 0.1)` |
| `--color-accent`         | `#22d3ee`              |
| `--color-btn-bg`         | `rgba(255, 255, 255, 0.07)` |
| `--color-btn-bg-hover`   | `rgba(255, 255, 255, 0.09)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `34, 197, 94`          |
| `--texture-opacity`      | `0.03`                 |
| `--texture-grid-size`    | `100px`                |

### **3.3. Light Theme**

| CSS Variable             | Value                   |
| :----------------------- | :---------------------- |
| `--color-bg`             | `#ffffff`               |
| `--color-text-white`     | `#0a0a0a`               |
| `--color-text-primary`   | `#065f46`               |
| `--color-text-secondary` | `#4b5563`               |
| `--color-text-tertiary`  | `#6b7280`               |
| `--color-text-command`   | `#b45309`               |
| `--color-border`         | `#10b981`               |
| `--color-border-darker`  | `#059669`               |
| `--color-active`         | `#d1fae5`               |
| `--color-error`          | `#ef4444`               |
| `--color-success`        | `#22c55e`               |
| `--color-input-bg`       | `#f9fafb`               |
| `--color-hover`          | `rgba(5, 150, 105, 0.1)` |
| `--color-accent`         | `#0891b2`               |
| `--color-btn-bg`         | `rgba(5, 150, 105, 0.05)` |
| `--color-btn-bg-hover`   | `rgba(5, 150, 105, 0.1)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `59, 130, 246`         |
| `--texture-opacity`      | `0.02`                 |
| `--texture-grid-size`    | `120px`                |

### **3.4. Amber Theme**

| CSS Variable             | Value                    |
| :----------------------- | :----------------------- |
| `--color-bg`             | `#1C140D`                |
| `--color-text-white`     | `#FFB86C`                |
| `--color-text-primary`   | `#FFB86C`                |
| `--color-text-secondary` | `#D9A15D`                |
| `--color-text-tertiary`  | `#B38A4D`                |
| `--color-text-command`   | `#FFD173`                |
| `--color-border`         | `#FF9F1C`                |
| `--color-border-darker`  | `#8B5A00`                |
| `--color-active`         | `#FF8C00`                |
| `--color-error`          | `#FF6B6B`                |
| `--color-success`        | `#50FA7B`                |
| `--color-input-bg`       | `#261A12`                |
| `--color-hover`          | `rgba(255, 184, 108, 0.08)` |
| `--color-accent`         | `#8BE9FD`                |
| `--color-btn-bg`         | `rgba(255, 184, 108, 0.05)` |
| `--color-btn-bg-hover`   | `rgba(255, 184, 108, 0.1)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `251, 146, 60`         |
| `--texture-opacity`      | `0.05`                 |
| `--texture-grid-size`    | `100px`                |

### **3.5. BSOD Theme**

| CSS Variable             | Value                    |
| :----------------------- | :----------------------- |
| `--color-bg`             | `#0B4DA8`                |
| `--color-text-white`     | `#FFFFFF`                |
| `--color-text-primary`   | `#FFFFFF`                |
| `--color-text-secondary` | `#CFE9FF`                |
| `--color-text-tertiary`  | `#9EC7FF`                |
| `--color-text-command`   | `#E1F0FF`                |
| `--color-border`         | `#E6F3FF`                |
| `--color-border-darker`  | `#7FB3FF`                |
| `--color-active`         | `#0066FF`                |
| `--color-error`          | `#FF6B6B`                |
| `--color-success`        | `#00D084`                |
| `--color-input-bg`       | `#073A93`                |
| `--color-hover`          | `rgba(230, 243, 255, 0.06)` |
| `--color-accent`         | `#88B8FF`                |
| `--color-btn-bg`         | `rgba(230, 243, 255, 0.08)` |
| `--color-btn-bg-hover`   | `rgba(230, 243, 255, 0.15)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `255, 255, 255`        |
| `--texture-opacity`      | `0.08`                 |
| `--texture-grid-size`    | `80px`                 |

### **3.6. Synthwave Theme**

| CSS Variable             | Value                    |
| :----------------------- | :----------------------- |
| `--color-bg`             | `#1A103C`                |
| `--color-text-white`     | `#FF00E5`                |
| `--color-text-primary`   | `#FF00E5`                |
| `--color-text-secondary` | `#00BFFF`                |
| `--color-text-tertiary`  | `#7B61FF`                |
| `--color-text-command`   | `#F7B801`                |
| `--color-border`         | `#FF00E5`                |
| `--color-border-darker`  | `#00BFFF`                |
| `--color-active`         | `#4C00A4`                |
| `--color-error`          | `#FF1B1B`                |
| `--color-success`        | `#39FF14`                |
| `--color-input-bg`       | `#2C1E5C`                |
| `--color-hover`          | `rgba(255, 0, 229, 0.1)` |
| `--color-accent`         | `#00F6FF`                |
| `--color-btn-bg`         | `rgba(255, 0, 229, 0.08)` |
| `--color-btn-bg-hover`   | `rgba(255, 0, 229, 0.12)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `236, 72, 153`         |
| `--texture-opacity`      | `0.04`                 |
| `--texture-grid-size`    | `100px`                |

### **3.7. Operator Theme**

| CSS Variable             | Value                  |
| :----------------------- | :--------------------- |
| `--color-bg`             | `#1E0000`              |
| `--color-text-white`     | `#FF4100`              |
| `--color-text-primary`   | `#FF4100`              |
| `--color-text-secondary` | `#FFA500`              |
| `--color-text-tertiary`  | `#B37400`              |
| `--color-text-command`   | `#FF4100`              |
| `--color-border`         | `#FF4100`              |
| `--color-border-darker`  | `#FFA500`              |
| `--color-active`         | `#5D1800`              |
| `--color-error`          | `#FFFF00`              |
| `--color-success`        | `#A8FF00`              |
| `--color-input-bg`       | `#1A1A1A`              |
| `--color-hover`          | `rgba(255, 65, 0, 0.1)` |
| `--color-accent`         | `#FFA500`              |
| `--color-btn-bg`         | `rgba(255, 65, 0, 0.08)` |
| `--color-btn-bg-hover`   | `rgba(255, 65, 0, 0.12)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `251, 191, 36`         |
| `--texture-opacity`      | `0.03`                 |
| `--texture-grid-size`    | `100px`                |

### **3.8. Kyoto Theme**

| CSS Variable             | Value                  |
| :----------------------- | :--------------------- |
| `--color-bg`             | `#B0B0B0`              |
| `--color-text-white`     | `#1A1A1A`              |
| `--color-text-primary`   | `#1A1A1A`              |
| `--color-text-secondary` | `#4A4A4A`              |
| `--color-text-tertiary`  | `#7A7A7A`              |
| `--color-text-command`   | `#D95D39`              |
| `--color-border`         | `#1A1A1A`              |
| `--color-border-darker`  | `#4A4A4A`              |
| `--color-active`         | `#8E8E8E`              |
| `--color-error`          | `#A80000`              |
| `--color-success`        | `#0A6D0A`              |
| `--color-input-bg`       | `#8E8E8E`              |
| `--color-hover`          | `rgba(74, 74, 74, 0.1)` |
| `--color-accent`         | `#39D9D9`              |
| `--color-btn-bg`         | `rgba(26, 26, 26, 0.05)` |
| `--color-btn-bg-hover`   | `rgba(26, 26, 26, 0.1)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `220, 38, 38`          |
| `--texture-opacity`      | `0.03`                 |
| `--texture-grid-size`    | `110px`                |

### **3.9. Radar Theme**

| CSS Variable             | Value                     |
| :----------------------- | :------------------------ |
| `--color-bg`             | `#3C4D3A`                 |
| `--color-text-white`     | `#B3E2A7`                 |
| `--color-text-primary`   | `#B3E2A7`                 |
| `--color-text-secondary` | `#8BAA85`                 |
| `--color-text-tertiary`  | `#5A5A5A`                 |
| `--color-text-command`   | `#D98E39`                 |
| `--color-border`         | `#2A2A2A`                 |
| `--color-border-darker`  | `#2A2A2A`                 |
| `--color-active`         | `#2F3D2D`                 |
| `--color-error`          | `#D94639`                 |
| `--color-success`        | `#65B354`                 |
| `--color-input-bg`       | `#32402F`                 |
| `--color-hover`          | `rgba(179, 226, 167, 0.1)` |
| `--color-accent`         | `#54B3B3`                 |
| `--color-btn-bg`         | `rgba(179, 226, 167, 0.05)` |
| `--color-btn-bg-hover`   | `rgba(179, 226, 167, 0.1)` |
| **Texture Effects**      |                        |
| `--texture-line-color`   | `34, 197, 94`          |
| `--texture-opacity`      | `0.04`                 |
| `--texture-grid-size`    | `90px`                 |


## **4. Semantic Class Library**

This is the library of approved, theme-aware classes defined in `globals.css`. Components should **only** use these classes for styling.

### **4.1. Text & Color Classes**
-   `.text-primary`: For primary labels and important values.
-   `.text-secondary`: For body copy, descriptions, and less important text.
-   `.text-command`: For titles, prompts (`$`), and key commands.
-   `.text-white-black`: For text that needs high contrast against a solid background (white on dark themes, black on light).
-   `.text-success` / `.text-error`: For status indicators.

### **4.2. Background & Border Classes**
-   `.bg-main`: For the main background of panels and windows.
-   `.bg-hover`: For backgrounds that apply on hover, also used for static subtle backgrounds.
-   `.bg-active`: For active UI elements like tabs.
-   `.border-primary`: For primary borders (main window, buttons).
-   `.border-secondary`: For secondary, less prominent borders (internal panels, dividers).

### **4.3. Composite Component Classes**
-   `.panel-full`: A complete panel with border, padding, and theme-aware colors.
-   `.btn-command`: The standard button style, including border, color, and hover effects.
-   `.input-base`: The standard input field style.
-   `.tag-badge`: The standard style for tags.

### **4.4. Specialized UI Classes**
-   `.cursor-terminal`: For terminal-style cursors (includes pointer-events: none).
-   `.progress-track`: Background for progress bar tracks.
-   `.progress-fill`: Fill color for progress bar indicators.

### **4.5. Usage Example: Building a Panel**

This system dramatically simplifies component markup.

```jsx
// A panel built using semantic classes. It will automatically adapt to any theme.
<div className="panel-full mb-4">
  <h3 className="title-command">$profile_data</h3>
  <div className="grid">
    <span className="text-primary">$title:</span>
    <span className="text-secondary">Senior Developer</span>
  </div>
</div>
```

## **5. Typography**

A strict typographic scale ensures consistency and readability.

-   **Font Family**: `font-mono` (`IBM Plex Mono`) is used exclusively to maintain the terminal aesthetic.
-   **Font Sizes**: A limited set of sizes creates a clean, predictable rhythm: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`.
-   **Text Styles**: Emphasis is achieved through the color hierarchy, not font weight or style.

## **6. Layout & Animation System**

This section defines the structural rules, spacing, and motion design of the application, ensuring a consistent and fluid user experience with zero layout shift.

### **6.1. Layout & Sizing**
-   **Stable Architecture**: The main application window uses a fixed-height layout on desktop to prevent any content jumping during navigation.
-   **Desktop Layout**: On screens wider than 768px, the main content area has a maximum height of `700px`, with internal scrolling for longer content.
-   **Mobile Layout**: On screens narrower than 768px, the layout is flexible, adapting to the height of the content.
-   **Panel Positioning**: The `AnalyticsPanel` and `SystemLog` are fixed to the bottom of the content area, providing a stable context throughout the user journey.

### **6.2. Animation & Transitions**
-   **Screen Transitions**: Navigation between screens is handled by a smooth fade and scale animation to create a seamless flow.
-   **Timings**: The total transition time is 400ms, composed of a 200ms exit animation (fade out, scale down to 0.98) and a 200ms enter animation (fade in, scale up from 1.02).
-   **Accessibility**: All animations respect the `prefers-reduced-motion` media query, disabling transitions for users who prefer it.

### **6.3. Spacing System**
A consistent spacing scale is used throughout the application to maintain visual rhythm.
-   **Screen Padding**: All screens have a global padding of `1rem` (16px), managed by the `ScreenWrapper` component.
-   **Section Spacing**: Vertical spacing between panels on content-heavy screens is `1rem` (`space-y-4`).
-   **Panel Spacing**: The space between the `AnalyticsPanel` and `SystemLog` is `0.5rem` (`space-y-2`).

## **7. Component Guidelines**

-   **Panels:** The fundamental "atom" of the interface, built using the `.panel-full` class. They isolate information.
-   **Buttons:** Interactive elements styled with `.btn-command`. They must be theme-agnostic and receive their icon as a component reference prop (`icon={IconComponent}`).
-   **Tabs & Accordions:** These components use `.bg-active` and `.border-secondary` to feel integrated with the panels they belong to.

## **8. Developer's Guide: How to Extend the System**

### **8.1. How to Style a New Component**

1.  **Use Semantic Classes First:** Always start by using the classes from our library (`.panel-full`, `.text-primary`, etc.).
2.  **Use Tailwind for Layout:** Use standard Tailwind utilities for layout (`flex`, `grid`, `p-4`, `gap-2`, etc.).
3.  **Avoid Direct Color/Theme Logic:** **NEVER** use theme-dependent logic (`theme === 'dark'`) or direct color classes (`bg-green-500`, `dark:bg-black`) in a component. If a required style is missing, extend the semantic library.
4.  **No Inline Styles for Colors:** Never use inline styles with CSS variables for colors. Instead, create a new semantic class in `globals.css` if needed.

### **8.2. How to Add a New Theme**

Adding a new theme is a simple, three-step process:

1.  **Define CSS Variables:** Add a new `[data-theme='matrix']` block in `globals.css` and define all the color variables with your theme's values.
2.  **Update Theme Configuration:** In `src/app/context/SessionContext.js`, add the new theme's name to the `themes` array and add an entry for it in the `themeConfig` object, defining its `intent` as either `'dark'` or `'light'`.
3.  **Add Theme Icon:** Add an icon for the new theme to the `themeIcons` dictionary in `src/app/components/ui/ThemeSwitcher.js` and `src/app/layouts/TerminalWindow.js`.

## **9. Component Library Integration: Storybook Development**

This section covers the comprehensive Storybook component library that powers isolated component development, testing, and visual documentation for the Terminal UI System.

### **9.1. Component Architecture Overview**

The component library follows a structured architecture with 56 documented components across four priority categories:

- **📊 P1: Core UI Components (16 components)** - Atomic primitives with minimal dependencies
- **🏗️ P2: Layout Components (11 components)** - Structured layout patterns and composition
- **⚡ P3: Feature Components (16 components)** - Business logic and external integrations
- **🖥️ P4: Screen Components (13 components)** - Complete page-level implementations

### **9.2. Story Development Standards**

All component stories must follow the established template structure and quality standards:

#### **Story File Structure**
```javascript
// {ComponentName}.stories.js within component directory
src/app/components/
├── atoms/Button/
│   ├── Button.js
│   ├── Button.stories.js      // Primary stories
│   ├── Button.mdx            // Custom documentation
│   └── Button.fixtures.js    // Mock data
```

#### **Story Organization**
- **Title**: `Category/ComponentName` format (e.g., `'Atoms/CommandTitle'`)
- **Layout**: `centered`, `fullscreen`, or `padded` based on component type
- **Decorators**: Appropriate mock providers for component dependencies
- **ArgTypes**: Complete prop definitions with controls and descriptions
- **Stories**: Default, variants, states, edge cases, and interactions

### **9.3. Component Development Workflow**

#### **Creating a New Component**

1. **Plan Component Architecture**
   - Define component purpose and use cases
   - Analyze dependencies (SessionContext, Web3, router)
   - Assign appropriate priority category

2. **Implement Component**
   - Use semantic classes from this design system
   - Follow component prop patterns from similar components
   - Include proper TypeScript/PropTypes if available

3. **Create Stories**
   - Generate from template in `STORY_TEMPLATE.md`
   - Cover all significant use cases and variants
   - Test with Storybook development server

4. **Add Documentation**
   - Include inline story descriptions
   - Create MDX documentation for complex components
   - Update component inventory

#### **Component Categories and Examples**

**📊 P1: Core UI Components**
```typescript
// Simple, reusable primitives
CommandTitle: text, level → Semantic title with $ prefix
Button: onClick, variant, disabled → Interactive element
Input: value, onChange, error → Form input field
Divider: → Visual separator
Tag: text, variant → Content categorization
```

**🏗️ P2: Layout Components**
```typescript
// Structured layout patterns
Panel: children → Contained content area
NavigationButton: screen, label, onClick → SessionContext navigation
ResponsiveCardGrid: items, onItemClick → Data grid display
DetailViewTemplate: metadata, content → Complex layout composition
```

**⚡ P3: Feature Components**
```typescript
// Business logic and external integrations
AnalyticsPanel: → Matomo integration display
Web3Manager: → Wallet connection management
ThemeSwitcher: → Client-side theme management
MatomoTracker: → Analytics service integration
```

**🖥️ P4: Screen Components**
```typescript
// Complete page implementations
Entry: → Authentication screen with Web3
ProfileBoot: → Initial profile setup screen
CaseDetail: → Individual case study display
Contact: → Contact form and information
```

### **9.4. Testing and Quality Assurance**

#### **Story Validation Criteria**
- [ ] **Title Format**: Follows `{Category}/{ComponentName}` convention
- [ ] **Decorators**: Appropriate mocks for component dependencies
- [ ] **ArgTypes**: Complete prop definitions with controls
- [ ] **Stories**: Cover default, variants, states, and interactions
- [ ] **Documentation**: Component purpose and usage guidelines
- [ ] **Accessibility**: ARIA labels and keyboard navigation confirm
- [ ] **Responsive**: Tested across viewport sizes in Storybook
- [ ] **Interactions**: Critical flows tested with `@storybook/test`
- [ ] **Themes**: Verified across all theme variants

#### **Component Inventory Tracking**
- All 56 components documented with categories
- Dependencies mapped (SessionContext, Web3, external APIs)
- Complexity scoring (Low/Medium/High priority)
- Implementation status tracking

### **9.5. Development Tool Integration**

The component library integrates with modern development workflows:

#### **Vite-Powered Storybook**
- Lightning-fast development server with Vite
- Hot module replacement for instant updates
- Optimized build for production deployment

#### **Interactive Documentation**
- Live component playgrounds
- Property control panels for real-time testing
- Visual regression testing capabilities
- Theme switching directly in Storybook

#### **Automated Quality Checks**
- Story validation scripts (pre-commit hooks)
- Component coverage reporting
- Automated visual testing integration

### **9.6. Mock Infrastructure**

Comprehensive mock system for isolated component testing:

#### **SessionContext Mock**
- Full context provider simulation
- Authentication state management
- Navigation mock callbacks
- Theme state persistence

#### **Web3 Mock System**
- Wagmi provider simulation
- @reown/appkit wallet interface mocks
- Chain network state management
- Transaction/contract interaction stubs

#### **External Service Mocks**
- Matomo analytics service stubs
- Router/navigation simulation
- Browser API mocking (localStorage, etc.)

### **9.7. Component Usage Guidelines**

#### **Import Best Practices**
```javascript
// ✅ Preferred: Semantic imports from component libraries
import { Button, Input, Label } from '@/components/ui';

// ✅ Acceptable: Direct component imports for complex needs
import CommandTitle from '@/components/atoms/CommandTitle';
```

#### **Component Composition Guidelines**
```jsx
// ✅ Recommended: Use semantic classes for styling
<div className="panel-full mb-4">
  <CommandTitle text="user-profile" level="h3" />
  <div className="text-primary">
    Senior Frontend Developer
  </div>
</div>

// ❌ Avoid: Theme-dependent styling logic
<div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
  Theme-dependent styles not allowed
</div>
```

#### **Story Creation Standards**
```javascript
// ✅ Complete story with all required elements
export default {
  title: 'UI/Atoms/CommandTitle',
  component: CommandTitle,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Description...' } }
  },
  argTypes: {
    text: { control: 'text', description: 'The text...' },
    level: { control: 'select', options: ['h1', 'h2', 'h3'] }
  }
};

export const Default = {
  args: { text: 'terminal', level: 'h3' },
  parameters: { docs: { description: { story: '...' } } }
};

// ❌ Incomplete story
export const Incomplete = {
  args: { children: 'Wrong prop name' } // Doesn't match component props
};
```

### **9.8. Maintenance and Evolution**

#### **Regular Component Reviews**
- Monthly audit of unused/mockable components
- Performance profiling and optimization
- Theme compatibility verification
- Dependency relationship updates

#### **Automated Maintenance Tasks**
- Story generation automation scripts
- Component health monitoring
- Coverage reporting automation
- Breaking change detection

### **8.3. Implementation Best Practices**

1.  **Theme Manager Behavior:** The `ThemeManager` component should only set the `data-theme` attribute and add necessary semantic classes without overwriting existing body classes (especially font-related classes from Next.js).
2.  **Single Source of Truth:** The `data-theme` attribute is the only mechanism for theme switching. No legacy class-based theming should be used.
3.  **CSS Variable Consistency:** All themes must define the complete set of CSS variables to ensure consistent behavior across the application.
