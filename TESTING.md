# Project Testing Strategy

This document outlines the testing philosophy, tools, and practices for the Interactive Terminal Portfolio project. Its purpose is to ensure code quality, prevent regressions, and provide a clear framework for future development.

## 1. Testing Philosophy

Our approach to testing is guided by the principle of building a "safety net" that allows for confident refactoring and feature development. We follow a practical implementation of the Testing Pyramid, starting with a strong foundation of unit tests and gradually moving towards more complex integration and end-to-end tests.

-   **Test for Behavior, Not Implementation:** We use tools like React Testing Library that encourage testing components from the user's perspective. We care about *what* a component does, not *how* it does it.
-   **Confidence and Reliability:** The primary goal of our test suite is to give us confidence that the application works as expected. Every test should be reliable, fast, and easy to understand.
-   **Start Small, Be Consistent:** We begin by targeting the most critical and easiest-to-test parts of the application—pure functions and simple UI components—to build momentum and establish a solid testing culture.

## 2. Tooling

Our testing stack is composed of industry-standard tools chosen for their robustness and excellent integration with our Next.js environment.

-   **[Jest](https://jestjs.io/):** The primary framework for running tests, managing mocks, and making assertions. It provides a comprehensive, "all-in-one" testing experience.
-   **[React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/):** The standard for testing React components. It helps us write user-centric tests that are resilient to implementation changes.
-   **[Jest-DOM](https://github.com/testing-library/jest-dom):** Adds custom matchers for asserting on DOM nodes (e.g., `toBeInTheDocument()`, `toHaveTextContent()`), making tests more declarative and readable.
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
-   **Location:** `src/app/utils/`
-   **Focus:** We target "pure" functions that have clear inputs and outputs, especially those containing critical business logic.
    -   **Examples:** Utility formatters (`formatters.js`), data transformation logic (`session.js`), and configuration helpers (`config.js`).
-   **Goal:** To verify that the core logic of the application is mathematically and functionally correct in isolation.

### 4.2. Component Tests (Middle Layer)

-   **Scope:** Individual React components.
-   **Location:** Co-located with the component (e.g., `Button.test.js` next to `Button.js`).
-   **Focus:** We test for three main things:
    1.  **Rendering:** Does the component render correctly based on its props?
    2.  **Interaction:** Does the component respond correctly to user events (clicks, input, etc.)?
    3.  **Accessibility:** Basic checks to ensure the component is accessible.
-   **Goal:** To ensure that individual UI building blocks are reliable and behave as expected.

### 4.3. Integration & End-to-End (E2E) Tests (Future)

-   **Integration Tests:** These will test the interaction between multiple components. For example, verifying that clicking an item in `CaseList.js` correctly renders the `CaseDetail.js` screen with the right data. These will still be written within the Jest/RTL environment.
-   **E2E Tests:** These will simulate a complete user journey from start to finish using a tool like Playwright. This is the final layer of our safety net, ensuring that the entire application flow is functional.