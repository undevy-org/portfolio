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
-   **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/):** Provides more realistic user interaction simulations than basic fireEvent.
-   **[dotenv](https://github.com/motdotla/dotenv):** Used to load environment variables from `.env.local` into the Jest environment, ensuring our tests run with the same configuration as local development.
-   **Future Tools:**
    -   **[Playwright](https://playwright.dev/) / [Cypress](https://www.cypress.io/):** Slated for future implementation of End-to-End (E2E) tests that simulate full user journeys in a real browser.

## 3. Test Infrastructure

### 3.1. Directory Structure
```
portfolio-project/
├── jest.config.mjs          # Main Jest configuration
├── jest.setup.js            # Global test setup
├── jest.env.js              # Environment variable loading
├── __mocks__/               # Mock files for static assets
│   ├── styleMock.js         # CSS import mock
│   └── fileMock.js          # Image/file import mock
├── test-utils/              # Testing utilities
│   ├── providers.js         # Mock context providers
│   ├── mocks.js            # Centralized mock data
│   └── helpers.js          # Testing helper functions
└── src/app/
    ├── utils/              # Utility functions
    │   └── *.test.js       # Co-located unit tests
    └── components/         # React components
        └── *.test.js       # Co-located component tests
```

### 3.2. Test Utilities

The `test-utils` directory contains reusable testing infrastructure:

-   **`providers.js`:** Mock implementations of React Context providers (SessionContext) that wrap components during testing
-   **`mocks.js`:** Centralized mock data including user profiles, global data, session data, and navigation states
-   **`helpers.js`:** Utility functions for browser API mocking, event creation, and assertion helpers

## 4. How to Run Tests

All tests can be executed with a single command from the project root.

### 4.1. Running All Tests
```bash
# Run all tests in watch mode (default for local development)
npm test

# Run all tests once (for CI environments)
npm test -- --watchAll=false
```

### 4.2. Running Specific Tests
```bash
# Run tests for a single specific file
npm test -- formatters.test.js

# Run tests in a specific directory
npm test -- src/app/utils

# Run tests matching a pattern in the test name
npm test -- --testNamePattern="should handle null"
```

## 5. What We Test

Our testing strategy is broken down by type, forming our version of the Testing Pyramid.

### 5.1. Unit Tests (Foundation)

-   **Scope:** Single, isolated functions or modules.
-   **Location:** Primarily in `src/app/utils/`.
-   **Coverage:** 
    -   `formatters.test.js` - Screen name formatting, date calculations (enhanced with null handling and edge cases)
    -   `session.test.js` - Session data merging, case study filtering (enhanced with defensive programming)
    -   `config.test.js` - Environment configuration, domain detection
    -   `content.test.js` - Content structure validation (warning-only linter)
-   **Goal:** To verify that the core logic of the application is correct in isolation.

### 5.2. Component Tests (Middle Layer)

-   **Scope:** Individual React components.
-   **Location:** Co-located with the component (e.g., `Button.test.js` next to `Button.js`).
-   **Coverage:**
    -   `Button.test.js` - Click handlers, disabled states, icon rendering
    -   `TerminalProgress.test.js` - Loading animations, progress updates
    -   `ProfileDataPanel.test.js` - Data rendering with SessionContext
    -   `ScreenWrapper.test.js` - Layout wrapper behavior, conditional padding, screen-specific classes
    -   `ThemeSwitcher.test.js` - Theme selection, conditional rendering, accessibility attributes
-   **Goal:** To ensure that individual UI building blocks are reliable and behave as expected.

### 5.3. Content Linting Test (Special Case)

-   **Scope:** Validates the structure and completeness of `test-content-local.json`.
-   **Location:** `src/app/utils/content.test.js`.
-   **Behavior:** This test is designed to **never fail** the build. If it finds missing fields, it will print a clear `console.warn` message detailing the issues but will still pass.
-   **Goal:** To catch content-related errors early and ensure consistency across all personalized experiences.

### 5.4. Integration Tests (Future/Skipped)

Currently, we have two integration test files that are temporarily skipped:

-   **`Accordion.test.js.skip`:** Comprehensive tests for the Accordion component, including system log integration and accessibility. Skipped pending verification of component structure compatibility.
-   **`integration.test.js.skip`:** User flow tests for navigation between screens and session termination. Skipped due to missing component dependencies.

## 6. Test Coverage & Limitations

### 6.1. Test Execution Statistics
The project currently maintains:
- **7 test suites** passing
- **62 tests** total (59 passing, 3 todo)
- **Unit tests** for all utility functions with enhanced edge case handling
- **Component tests** for core UI components

### 6.2. Known Issues & Limitations

**Issue: Code Coverage Reporting**

Code coverage reporting is currently non-functional due to incompatibility between Jest's instrumentation and Next.js 13+ with the app directory structure. This is a known tooling issue that prevents the generation of coverage reports.

-   **Error:** `TypeError: The "original" argument must be of type function`
-   **Root Cause:** A conflict between Jest's coverage instrumentation and Next.js's SWC compiler.
-   **Impact:** This does **not** affect test execution; all tests run correctly and provide their intended safety net. It only means we cannot automatically generate a coverage percentage report.

## 7. Writing New Tests

### 7.1. Unit Test Template

```javascript
import { functionToTest } from './module';
import { MOCK_DATA } from '../../../test-utils/mocks';

describe('functionToTest', () => {
  it('should handle normal case', () => {
    const result = functionToTest('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(functionToTest(null)).toBe('');
    expect(functionToTest(undefined)).toBe('');
  });

  it('should handle error conditions', () => {
    expect(() => functionToTest(invalidInput)).toThrow();
  });
});
```

### 7.2. Component Test Template

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from './Component';
import { MockSessionProvider } from '../../../test-utils/providers';

describe('Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <MockSessionProvider>
        <Component {...props} />
      </MockSessionProvider>
    );
  };

  it('should render correctly', () => {
    renderComponent();
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

## 8. Continuous Integration

Tests are automatically run in the CI pipeline via GitHub Actions on every pull request. The pipeline ensures:

1. All tests pass before merging to main
2. No regressions are introduced
3. Code quality standards are maintained

The CI configuration can be found in `.github/workflows/ci.yml`.

## 9. Future Improvements

### 9.1. Short Term
- Resolve coverage reporting issues with Next.js 13+
- Enable and verify Accordion component tests
- Enable integration tests once component dependencies are implemented
- Add tests for remaining UI components (NavigationButtons, AnalyticsPanel, SystemLog, MorphingTerminal)

### 9.2. Long Term
- Implement E2E tests using Playwright or Cypress
- Add visual regression testing for UI components
- Achieve 80% code coverage for critical paths
- Implement performance testing for key user flows
- Add tests for all screens (Entry, ProfileBoot, MainHub, Introduction, etc.)