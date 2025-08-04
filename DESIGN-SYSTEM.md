# Terminal UI Design System

This document outlines the design philosophy, visual specifications, and component guidelines for the Interactive Terminal Portfolio. Its purpose is twofold: to serve as the single source of truth for development, ensuring consistency, and to demonstrate the systematic, principle-driven approach behind the user interface.

## 1. Design Philosophy

The Terminal UI system is built not just on aesthetics, but on a core philosophy of clarity, control, and character. Every design decision is guided by four key principles.

1.  **Command-Line Aesthetics**: The interface intentionally mimics classic terminal commands and layouts.
    *   **Why?** To create a unique, memorable experience that speaks to technical competence and honors the legacy of computing. It's an interface for builders, thinkers, and problem-solvers.

2.  **Segmented Information Architecture**: Content is strictly compartmentalized into clearly bordered panels.
    *   **Why?** In complex domains like Web3/DeFi, clarity builds trust. Each panel acts as a single "thought block," isolating a piece of information to reduce cognitive load and guide the user through a structured narrative.

3.  **Intentional Hierarchy**: The system uses a strict color and typography hierarchy to direct user attention.
    *   **Why?** To make the interface scannable and intuitive. The user should instinctively know what is a title, what is a key piece of data, and what is descriptive text, allowing them to consume information at their own pace.

4.  **System Feedback Transparency**: All significant user actions and system responses are explicitly logged in a prominent, real-time `SystemLog`.
    *   **Why?** To give the user a sense of complete control and predictability, much like a developer using a well-designed tool. The application's state is never a mystery.

---

## 2. Color System

The palette is inspired by classic monochrome monitors (green-on-black) but modernized for the web with an accent command color (yellow). This creates a balance between nostalgia and functionality. The system supports both a dark (default) and a light theme.

### Dark Theme (Default)

| Role                | Tailwind Class             | Hex Code  | Usage                                                  |
| :------------------ | :------------------------- | :-------- | :----------------------------------------------------- |
| Background          | `bg-dark-bg`               | `#000000` | Main page background.                                  |
| **Command Text**    | `text-dark-text-command`   | `#facc15` | **Level 1 Hierarchy**: Panel titles, commands (`$`).     |
| **Primary Text**    | `text-dark-text-primary`   | `#4ade80` | **Level 2 Hierarchy**: Key labels, important values.     |
| **Secondary Text**  | `text-dark-text-secondary` | `#9ca3af` | **Level 3 Hierarchy**: Descriptions, body copy.          |
| Primary Border      | `border-dark-border`       | `#22c55e` | Main window and primary component borders.             |
| Secondary Border    | `border-dark-border-darker`| `#166534` | Nested panels, creating visual depth.                  |
| Active Element      | `bg-dark-active`           | `#15803d` | Active tab background.                                 |
| Hover State         | `hover:bg-dark-hover`      | `rgba(34, 197, 94, 0.1)` | Subtle feedback for interactive elements. |
| Success State       | `text-dark-success`        | `#4ade80` | Success indicators, metrics.                           |

### Light Theme

| Role                | Tailwind Class              | Hex Code  | Usage                                                  |
| :------------------ | :-------------------------- | :-------- | :----------------------------------------------------- |
| Background          | `bg-light-bg`               | `#f3f4f6` | Main page background.                                  |
| **Command Text**    | `text-light-text-command`   | `#ca8a04` | **Level 1 Hierarchy**: Panel titles, commands (`$`).     |
| **Primary Text**    | `text-light-text-primary`   | `#166534` | **Level 2 Hierarchy**: Key labels, important values.     |
| **Secondary Text**  | `text-light-text-secondary` | `#4b5563` | **Level 3 Hierarchy**: Descriptions, body copy.          |
| Primary Border      | `border-light-border`       | `#15803d` | Main window and primary component borders.             |
| Secondary Border    | `border-light-border-lighter`| `#4ade80`| Nested panels, creating visual depth.                  |
| Active Element      | `bg-light-active`           | `#dcfce7` | Active tab background.                                 |
| Hover State         | `hover:bg-light-hover`      | `rgba(22, 163, 74, 0.1)` | Subtle feedback for interactive elements. |
| Success State       | `text-light-success`        | `#16a34a` | Success indicators, metrics.                           |

---

## 3. Typography

A strict typographic scale ensures consistency and readability.

-   **Font Family**: `font-mono` (`Roboto Mono`) is used exclusively to maintain the terminal aesthetic.
-   **Font Sizes**: A limited set of sizes creates a clean, predictable rhythm.
    -   `text-xs`: The smallest size, for tertiary details like tags and log timestamps.
    -   `text-sm`: The workhorse for all body copy and descriptions.
    -   `text-base`: Used for commands and panel titles to give them prominence.
    -   `text-lg` / `text-xl`: Reserved for key headers to establish a clear screen hierarchy.
-   **Text Styles**: The system avoids `italic` or complex `font-weight` changes. Emphasis is achieved through the color hierarchy or minimal `font-bold` usage.

---

## 4. Component Library

Components are designed as reusable, self-contained modules that follow the core design principles.

### 4.1. Panels
The Panel is the fundamental "atom" of the interface. It is a container with a `1px` border that isolates a single piece of information or a group of related controls. This modularity makes complex information easy to digest. Panels use secondary (darker/lighter) borders to signify that they are content blocks within the main application window.

### 4.2. Progressive Disclosure Components (`Tabs` & `Accordion`)
Instead of overwhelming the user, the system reveals complexity on demand.
-   **Role**: To present a clean summary upfront while providing access to deeper information.
-   **Styling**: These components are styled to appear seamlessly integrated with the content panels they control, using shared borders and active states to create a cohesive feel.

### 4.3. Navigation Elements (`Buttons`, Links)
All interactive elements are designed for clarity and function.
-   **Structure**: Elements are clearly defined interactive targets with `hover` states.
-   **Styling**: Navigation buttons use the primary border color and often include an icon to hint at the action's outcome (e.g., `ArrowLeft` for "Back").

---

## 5. Future Directions

This design system is a living document. Future iterations may explore:
-   **Subtle Animations**: Introducing minimalist transitions for screen and panel states to enhance the user experience without breaking the terminal aesthetic.
-   **Keyboard Navigation**: Expanding support for keyboard-only interaction to fully realize the "power user" feel of a terminal.
-   **Data Visualization**: Developing a component for displaying simple charts or graphs within the established design constraints.