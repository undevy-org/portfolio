# Interactive Terminal Portfolio

This project is an interactive portfolio experience designed to look and feel like a classic computer terminal. It features a unique gated access system, dynamic content personalization, and a headless CMS powered by a Telegram bot.

After authentication, the application transforms into a seamless Single Page Application (SPA) with hash-based routing, ensuring an instant, app-like user experience.

## Core Features

-   **Gated & Personalized Access:** The site is accessible only via a unique code (`?code=...`). Based on this code, all content—from greetings to project case studies—is dynamically tailored for the visitor.
-   **Single Page Application (SPA) Experience:** After a single data load during authentication, all navigation is instantaneous and handled client-side, with bookmarkable URLs for each screen (`#Timeline`, `#CaseDetail`, etc.).
-   **Dual Authentication System:** Supports both traditional access codes and Web3 wallet login. Users can connect via MetaMask, WalletConnect, etc., using the Reown protocol for a seamless Web3 experience.
-   **Decoupled Content Architecture:** All portfolio data is stored in a `content.json` file on the server, completely separate from the application code. This allows content updates without redeploying the app.
-   **Headless CMS via Telegram Bot:** A custom Telegram bot serves as a powerful, on-the-go content management system. You can create, edit, delete, and rollback content versions directly from your phone.
-   **Privacy-First Analytics:** A self-hosted Matomo instance provides detailed session tracking while ensuring full data ownership and privacy.

## Tech Stack

| Category           | Technology         | Purpose & Implementation Details                                       |
| :----------------- | :----------------- | :--------------------------------------------------------------------- |
| **Framework**      | Next.js (React)    | Hybrid architecture: Server-side API for secure data, client-side SPA for UI. |
| **Styling**        | Tailwind CSS       | Powers a custom, themeable design system emulating a terminal aesthetic. |
| **State Mngmt**    | React Context      | A single `SessionContext` manages all shared state across the application. |
| **Web Server**     | Nginx              | Handles web traffic, SSL termination (Let's Encrypt), and reverse proxying. |
| **Process Manager**| PM2                | Keeps the Node.js application alive and handles zero-downtime deployments. |
| **Analytics**      | Matomo (self-hosted) | Runs in Docker, providing privacy-focused analytics with custom tracking. |
| **Containerization**| Docker            | Isolates the Matomo & MariaDB stack for a clean, reproducible environment. |
| **CI/CD**          | GitHub Actions     | Automates the entire deployment pipeline on every push to the `main` branch. |
| **Bot Framework**  | grammY             | A modern framework for building the Telegram-based CMS.                  |
| **Web3** | `wagmi` & `viem` | A collection of React Hooks and utilities for interacting with Ethereum wallets and blockchains. |
| **Web3** | `@reown/appkit` | Powers the user-friendly wallet connection modal (QR code, wallet selection). |

## Local Development Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/undevy-org/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Access the local version at `http://localhost:3000/?code=LOCAL_TEST`.

## Project Documentation

This project is thoroughly documented. For more details, please see the following files:

-   **[`SETUP.md`](./SETUP.md):** A comprehensive guide to deploying your own instance from scratch.
-   **[`CHANGELOG.md`](./CHANGELOG.md):** A detailed history of all notable changes and project milestones.
-   **[`CONTENT_MODEL.md`](./CONTENT_MODEL.md):** A definitive guide to the structure of the `content.json` file.
-   **[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md):** A detailed overview of the custom terminal-inspired design system, including color palettes, typography, component guidelines, and theming instructions for consistent UI/UX across the portfolio.
