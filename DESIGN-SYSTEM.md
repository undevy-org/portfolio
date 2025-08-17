# **Terminal UI Design System**

This document outlines the design philosophy, architectural principles, and component guidelines for the Interactive Terminal Portfolio. It serves as the single source of truth for the project's UI/UX, ensuring consistency, maintainability, and a systematic, principle-driven approach to development. This version reflects the shift to a flexible, multi-theme architecture powered by CSS variables.

## **1. Design Philosophy**

The Terminal UI system is built not just on aesthetics, but on a core philosophy of clarity, control, and character. Every design decision is guided by four key principles.

-   **1.1. Command-Line Aesthetics**: The interface intentionally mimics classic terminal commands and layouts.
    *   **Why?** To create a unique, memorable experience that speaks to technical competence and honors the legacy of computing. It's an interface for builders, thinkers, and problem-solvers.

-   **1.2. Segmented Information Architecture**: Content is strictly compartmentalized into clearly bordered panels.
    *   **Why?** In complex domains like Web3/DeFi, clarity builds trust. Each panel acts as a single "thought block," isolating a piece of information to reduce cognitive load and guide the user through a structured narrative.

-   **1.3. Intentional Hierarchy**: The system uses a strict color and typography hierarchy to direct user attention.
    *   **Why?** To make the interface scannable and intuitive. The user should instinctively know what is a title, what is a key piece of data, and what is descriptive text, allowing them to consume information at their own pace.

-   **1.4. System Feedback Transparency**: All significant user actions and system responses are explicitly logged in a prominent, real-time `SystemLog`.
    *   **Why?** To give the user a sense of complete control and predictability, much like a developer using a well-designed tool. The application's state is never a mystery.

## **2. Theming Architecture: How It Works**

Our theming system is designed for instant, client-side theme switching without page reloads or hydration errors. It is built on a modern, scalable foundation of CSS variables.

### **2.1. The Core Idea: CSS Variables & `data-theme`**

Instead of relying on Tailwind's `dark:` variant, we control the theme via a `data-theme` attribute on the root `<html>` element. This attribute acts as a switch that instantly changes the values of all our CSS color variables, causing the entire UI to re-render with the new palette.

### **2.2. The Three Layers of Styling**

Our system is organized into three distinct layers, ensuring a clear separation of concerns.

1.  **Layer 1: Tailwind Config (`tailwind.config.mjs`)**: This is where we define all our raw color values as named "tokens" (e.g., `'dark-bg'`, `'amber-text-primary'`). This file is our master color library.

2.  **Layer 2: Global CSS (`globals.css`)**: Here, we define semantic CSS variables (e.g., `--color-bg`, `--color-text-primary`). For each supported theme (e.g., `[data-theme='light']`), we assign the appropriate color tokens from Tailwind to these variables.

3.  **Layer 3: Semantic Classes (`globals.css`)**: We create a library of reusable, semantic utility classes (e.g., `.bg-main`, `.text-primary`). These classes use the CSS variables, making them automatically theme-aware. **Components should only use these classes.**

### **2.3. How a Theme is Applied (The Flow)**

The theme-switching process is a clean, predictable flow:

1.  A user clicks the theme toggle button in the `TerminalWindow`.
2.  The `toggleTheme` function in `SessionContext.js` updates the `theme` state (e.g., from `'dark'` to `'light'`).
3.  The `ThemeManager.js` component, subscribed to this state, updates the root `<html>` element's attribute: `<html data-theme="light">`.
4.  The browser immediately applies the new set of CSS variables defined in `globals.css` under the `[data-theme='light']` selector.
5.  All components styled with our semantic classes (e.g., `.bg-main`) instantly re-render with the new colors, with zero flicker.

## **3. Color Palettes**

The following tables define the color palette for each supported theme.

### **3.1. How to Read These Tables**

-   **Role:** The semantic purpose of the color in the UI.
-   **CSS Variable:** The variable name to be used in `globals.css`.
-   **Hex/RGBA Value:** The raw color value.

### **3.2. Dark Theme (Default)**

| Role             | CSS Variable               | Value                  |
| :--------------- | :------------------------- | :--------------------- |
| Background       | `--color-bg`               | `#000000`              |
| Primary Text     | `--color-text-primary`     | `#86efac`              |
| Secondary Text   | `--color-text-secondary`   | `#9ca3af`              |
| Command Text     | `--color-text-command`     | `#eab308`              |
| Primary Border   | `--color-border`           | `#22c55e`              |
| Secondary Border | `--color-border-darker`    | `#166534`              |
| Active Element   | `--color-active`           | `#15803d`              |
| Hover State      | `--color-hover`            | `rgba(34, 197, 94, 0.1)` |

### **3.3. Light Theme**

| Role             | CSS Variable               | Value                  |
| :--------------- | :------------------------- | :--------------------- |
| Background       | `--color-bg`               | `#ffffff`              |
| Primary Text     | `--color-text-primary`     | `#065f46`              |
| Secondary Text   | `--color-text-secondary`   | `#4b5563`              |
| Command Text     | `--color-text-command`     | `#b45309`              |
| Primary Border   | `--color-border`           | `#10b981`              |
| Secondary Border | `--color-border-darker`    | `#059669`              |
| Active Element   | `--color-active`           | `#d1fae5`              |
| Hover State      | `--color-hover`            | `rgba(5, 150, 105, 0.1)` |

### **3.4. Amber Theme**

| Role             | CSS Variable               | Value                   |
| :--------------- | :------------------------- | :---------------------- |
| Background       | `--color-bg`               | `#1C140D`               |
| Primary Text     | `--color-text-primary`     | `#FFB86C`               |
| Secondary Text   | `--color-text-secondary`   | `#D9A15D`               |
| Command Text     | `--color-text-command`     | `#FFD173`               |
| Primary Border   | `--color-border`           | `#FF9F1C`               |
| Secondary Border | `--color-border-darker`    | `#8B5A00`               |
| Active Element   | `--color-active`           | `#FF8C00`               |
| Hover State      | `--color-hover`            | `rgba(255, 184, 108, 0.08)` |

### **3.5. BSOD Theme**

| Role             | CSS Variable               | Value                   |
| :--------------- | :------------------------- | :---------------------- |
| Background       | `--color-bg`               | `#0B4DA8`               |
| Primary Text     | `--color-text-primary`     | `#FFFFFF`               |
| Secondary Text   | `--color-text-secondary`   | `#CFE9FF`               |
| Command Text     | `--color-text-command`     | `#E1F0FF`               |
| Primary Border   | `--color-border`           | `#E6F3FF`               |
| Secondary Border | `--color-border-darker`    | `#7FB3FF`               |
| Active Element   | `--color-active`           | `#0066FF`               |
| Hover State      | `--color-hover`            | `rgba(230, 243, 255, 0.06)` |

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
-   `.bg-hover`: To be used with the `:hover` pseudo-class for subtle feedback.
-   `.bg-active`: For active UI elements like tabs.
-   `.border-primary`: For primary borders (main window, buttons).
-   `.border-secondary`: For secondary, less prominent borders (internal panels, dividers).

### **4.3. Composite Component Classes**
-   `.panel-full`: A complete panel with border, padding, and theme-aware colors.
-   `.btn-command`: The standard button style, including border, color, and hover effects.
-   `.input-base`: The standard input field style.
-   `.tag-badge`: The standard style for tags.

### **4.4. Usage Example: Building a Panel**

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

## **6. Component Guidelines**

-   **Panels:** The fundamental "atom" of the interface, built using the `.panel-full` class. They isolate information.
-   **Buttons:** Interactive elements styled with `.btn-command`. They must be theme-agnostic and receive their icon as a component reference prop (`icon={IconComponent}`).
-   **Tabs & Accordions:** These components use `.bg-active` and `.border-secondary` to feel integrated with the panels they belong to.

## **7. Developer's Guide: How to Extend the System**

### **7.1. How to Style a New Component**

1.  **Use Semantic Classes First:** Always start by using the classes from our library (`.panel-full`, `.text-primary`, etc.).
2.  **Use Tailwind for Layout:** Use standard Tailwind utilities for layout (`flex`, `grid`, `p-4`, `gap-2`, etc.).
3.  **Avoid Direct Color/Theme Logic:** **NEVER** use theme-dependent logic (`theme === 'dark'`) or direct color classes (`bg-green-500`, `dark:bg-black`) in a component. If a required style is missing, extend the semantic library.

### **7.2. How to Add a New Theme**

Adding a fifth theme is a simple, four-step process:

1.  **Add Color Tokens:** Define the new theme's color palette in `tailwind.config.mjs` (e.g., `'matrix-bg': '#0D2B0D'`).
2.  **Define CSS Variables:** Add a new `[data-theme='matrix']` block in `globals.css` and map your new tokens to the CSS variables (`--color-bg: theme('colors.matrix-bg');`).
3.  **Update Theme Array:** Add the new theme's name (`'matrix'`) to the `themes` array in `src/app/context/SessionContext.js`.
4.  **Add Theme Icon:** Add an icon for the new theme to the `themeIcons` dictionary in `src/app/layouts/TerminalWindow.js`.