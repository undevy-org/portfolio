# Project Testing Strategy

This document outlines the testing philosophy, tools, and practices for the Interactive Terminal Portfolio project. Its purpose is to ensure code quality, prevent regressions, and provide a clear framework for future development.

## 1. Testing Philosophy

Our approach to testing is guided by the principle of building a "safety net" that allows for confident refactoring and feature development. We follow a practical implementation of the Testing Pyramid, starting with a strong foundation of unit tests and gradually moving towards more complex integration tests.

-   **Test for Behavior, Not Implementation:** We use tools like React Testing Library that encourage testing components from the user's perspective. We care about *what* a component does, not *how* it does it.
-   **Confidence and Reliability:** The primary goal of our test suite is to give us confidence that the application works as expected. Every test should be reliable, fast, and easy to understand.
-   **Start Small, Be Consistent:** We target the most critical and easiest-to-test parts of the application first—pure functions and simple UI components—to build momentum and establish a solid testing culture.
-   **Content is Code:** We treat our `content.json` file as a critical part of the application, and therefore, it is also subject to automated validation.

## 2. Tooling

Our testing stack is composed of industry-standard tools chosen for their robustness and excellent integration with our Next.js environment.

-   **[Jest](https://jestjs.io/):** The primary framework for running tests, managing mocks, and making assertions. It provides a comprehensive, "all-in-one" testing experience.
-   **[React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/):** The standard for testing React components. It helps us write user-centric tests that are resilient to implementation changes.
-   **[Jest-DOM](https://github.com/testing-library/jest-dom):** Adds custom matchers for asserting on DOM nodes (e.g., `toBeInTheDocument()`), making tests more declarative and readable.
-   **[dotenv](https://github.com/motdotla/dotenv):** Used to load environment variables from `.env.local` into the Jest environment, ensuring our tests run with the same configuration as local development.
-   **Future Tools:**
    -   **[Playwright](https://playwright.dev/) / [Cypress](https://www.cypress.io/):** Slated for future implementation of End-to-End (E2E) tests that simulate full user journeys in a real browser.

## 3. How to Run Tests

All tests can be executed with a single command from the project root:

```bash
npm test
```

This command will run Jest in watch mode by default, automatically re-running tests when files are changed. To run all tests once (for example, in a CI environment), use:

```bash
npm test -- --watchAll=false
```

## 4. What We Test

Our testing strategy is broken down by type, forming our version of the Testing Pyramid.

### 4.1. Unit Tests (Foundation)

-   **Scope:** Single, isolated functions or modules.
-   **Location:** Primarily in `src/app/utils/`.
-   **Focus:** We target "pure" functions that have clear inputs and outputs, especially those containing critical business logic.
    -   **Examples:** Utility formatters (`formatters.js`), data transformation logic (`session.js`), and configuration helpers (`config.js`).
-   **Goal:** To verify that the core logic of the application is correct in isolation.

### 4.2. Component Tests (Middle Layer)

-   **Scope:** Individual React components.
-   **Location:** Co-located with the component (e.g., `Button.test.js` next to `Button.js`).
-   **Focus:** We test for three main things:
    1.  **Rendering:** Does the component render correctly based on its props and context?
    2.  **Interaction:** Does it respond correctly to user events (clicks, input, etc.)?
    3.  **State:** Does it handle different states (e.g., loading, disabled, empty) correctly?
-   **Goal:** To ensure that individual UI building blocks are reliable and behave as expected.

### 4.3. Content Linting Test (A Special Case)

-   **Scope:** Validates the structure and completeness of `test-content-local.json`.
-   **Location:** `src/app/utils/content.test.js`.
-   **Focus:** This unique test acts as a "linter for content." It checks each profile against a predefined schema (`content.schema.js`) to ensure all required fields are present.
-   **Behavior:** This test is designed to **never fail** the build. If it finds missing fields, it will print a clear `console.warn` message detailing the issues but will still pass. This allows it to act as an informative warning system in CI/CD without blocking deployments for non-critical content omissions.
-   **Goal:** To catch content-related errors early and ensure consistency across all personalized experiences.

### 4.4. Integration & End-to-End (E2E) Tests (Future)

-   **Integration Tests:** These will test the interaction between multiple components. For example, verifying that clicking an item in `CaseList.js` correctly renders the `CaseDetail.js` screen.
-   **E2E Tests:** These will simulate a complete user journey from start to finish. This is the final layer of our safety net.