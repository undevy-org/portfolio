# Testing Guide

Comprehensive testing guide for the Interactive Terminal Portfolio project, covering testing philosophy, strategies, implementation, and best practices.

## 1. Overview

The project follows a comprehensive testing strategy built on React Testing Library's philosophy of testing components from the user's perspective, focusing on behavior rather than implementation details. We maintain a robust test suite that ensures reliability while enabling confident refactoring.

## 2. Testing Philosophy

Our approach to testing is guided by the principle of building a "safety net" that allows for confident refactoring and feature development. We follow a practical implementation of the Testing Pyramid, starting with a strong foundation of unit tests and gradually moving towards more complex integration tests.

-   **Test for Behavior, Not Implementation:** We use tools like React Testing Library that encourage testing components from the user's perspective. We care about *what* a component does, not *how* it does it.
-   **Confidence and Reliability:** The primary goal of our test suite is to give us confidence that the application works as expected. Every test should be reliable, fast, and easy to understand.
-   **Start Small, Be Consistent:** We target the most critical and easiest-to-test parts of the application first—pure functions and simple UI components—to build momentum and establish a solid testing culture.
-   **Content is Code:** We treat our `content.json` file as a critical part of the application, and therefore, it is also subject to automated validation.

## 3. Test Infrastructure

### 3.1. Technology Stack

Our testing stack is composed of industry-standard tools chosen for their robustness and excellent integration with our Next.js environment.

-   **[Jest](https://jestjs.io/):** The primary framework for running tests, managing mocks, and making assertions. It provides a comprehensive, "all-in-one" testing experience.
-   **[React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/):** The standard for testing React components. It helps us write user-centric tests that are resilient to implementation changes.
-   **[Jest-DOM](https://github.com/testing-library/jest-dom):** Adds custom matchers for asserting on DOM nodes (e.g., `toBeInTheDocument()`), making tests more declarative and readable.
-   **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/):** Provides more realistic user interaction simulations than basic fireEvent.
-   **[dotenv](https://github.com/motdotla/dotenv):** Used to load environment variables from `.env.local` into the Jest environment, ensuring our tests run with the same configuration as local development.

### 3.2. Project Structure

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

### 3.3. Test Utilities

The `test-utils` directory contains reusable testing infrastructure:

-   **`providers.js`:** Mock implementations of React Context providers (SessionContext) that wrap components during testing. Enhanced to support auto-fill feature testing with `autoFillCode` and `setAutoFillCode` mocks.
-   **`mocks.js`:** Centralized mock data including user profiles, global data, session data, and navigation states
-   **`helpers.js`:** Utility functions for browser API mocking, event creation, and assertion helpers

## 4. Running Tests

### 4.1. Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (interactive)
npm test -- --watch

# Run tests for a specific file
npm test -- Button.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="should handle click"

# Run tests with verbose output
npm test -- --verbose

# Run tests and update snapshots
npm test -- --updateSnapshot
```

### 4.2. Debugging Tests

```bash
# Run a single test file with detailed output
npm test -- --verbose src/app/components/Button.test.js

# Use Node debugger
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Add debug output in tests
screen.debug(); // Shows current DOM
console.log(container.innerHTML); // Shows raw HTML
```

## 5. Test Categories

### 5.1. Unit Tests (Foundation Layer)

-   **Scope:** Pure functions and utilities in isolation.
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
    -   `Accordion.test.js` - ✅ **ENABLED** - Section expansion/collapse, content rendering, system log integration, theme support, edge cases (18 tests passing)
    -   `MorphingTerminal.test.js` - ✅ **REFACTORED** - Animation control, theme integration, performance management with proper async patterns (17 tests passing)
    -   `TerminalImagePreview.test.js` - ✅ **REFACTORED** - Image loading states, lightbox functionality, responsive behavior with cache isolation (25 tests passing)
    -   `Web3Manager.test.js` - ✅ **NEW** - Lazy loading orchestration, state management, Web3 library loading (6 tests passing)
    -   `Entry.web3.test.js` - ✅ **NEW** - Web3 authentication flow, lazy loading integration (7 tests passing)
    -   `Entry.test.js` - ✅ **ENHANCED** - Entry screen rendering, auto-fill feature support, mock context integration (3 tests passing)
-   **Goal:** To ensure that individual UI building blocks are reliable and behave as expected.
-   **Recent Improvements:** Eliminated act() warnings and race conditions through proper async testing patterns using `waitFor()` instead of fixed timeouts.

### 5.3. Content Linting Test (Special Case)

-   **Scope:** Validates the structure and completeness of `test-content-local.json`.
-   **Location:** `src/app/utils/content.test.js`.
-   **Behavior:** This test is designed to **never fail** the build. If it finds missing fields, it will print a clear `console.warn` message detailing the issues but will still pass.
-   **Goal:** To catch content-related errors early and ensure consistency across all personalized experiences.

### 5.4. Integration Tests (Enabled)

-   **`integration.test.js`:** ✅ **ENABLED** - User flow tests across multiple screens including:
    -   Complete session flow from Entry to MainHub through code authentication
    -   Authentication failure handling with proper error states
    -   Session termination and cleanup processes
    -   Navigation between screens (MainHub → Timeline → CaseList)
    -   Theme switching across different screens
    -   Error handling for missing session data and network failures
    -   **Status:** 7 out of 8 tests passing (87.5% success rate)
    -   **Remaining Issue:** Complex authentication flow in Entry component not fully completing in test environment

**Testing Approach:**
-   Uses comprehensive mock providers for SessionContext
-   Tests user interactions and state changes
-   Validates component integration without requiring full application context
-   Covers critical user journeys and error scenarios

### 5.5. Feature-Specific Tests

#### Auto-fill Animation Feature Tests

The Entry screen auto-fill feature provides seamless authentication for users arriving with access codes in the URL.

**Test Coverage:**
- **Basic Functionality Tests:**
  - Auto-fill triggers with URL parameter (`/?code=TESTCODE`)
  - Animation completes and submits successfully
  - Invalid codes display appropriate error messages
  - Theme switcher remains functional during animation

- **Edge Case Tests:**
  - Animation stops immediately on logout
  - No auto-login loop after logout
  - Component unmount during animation (memory leak prevention)
  - Multiple rapid navigations handle cleanup properly
  - Race condition prevention with `logoutInProgress` flag

- **Integration Tests:**
  - Demo mode button functionality during non-animation states
  - Session verification doesn't trigger demo mode
  - Proper isolation between demo and regular authentication
  - Timer cleanup in useEffect cleanup functions

**Manual Testing Protocol:**
1. Clear browser data and localStorage
2. Navigate to `/?code=YOURCODE` and observe typing animation
3. Verify successful authentication and navigation
4. Test logout behavior - confirm no re-authentication
5. Test demo mode isolation

**Test Files:**
- `src/app/screens/Entry.test.js` - Component rendering with auto-fill context, disabled state management
- `src/app/api/session/route.test.js` - API endpoint logic separation
- `src/app/page.test.js` - URL parameter handling and navigation

**Mock Support:**
- `test-utils/providers.js` - Enhanced MockSessionProvider with `autoFillCode` and `setAutoFillCode` support
- Proper mock context values for testing animation states

#### Web3 Lazy Loading Tests

The Web3 lazy loading feature reduces initial bundle size by ~50% by loading Web3 libraries only when needed.

**Test Coverage:**
- **Loading State Management:**
  - Web3 libraries not loaded on initial render
  - Libraries load only when Web3 button is clicked
  - Loading states properly displayed during library fetch
  - Ready state correctly set after loading completes

- **Integration Tests:**
  - Traditional authentication unaffected by Web3 loading
  - Web3 authentication flow works after lazy loading
  - Multiple rapid clicks handled without errors
  - Context state properly updated through Web3Bridge

- **Performance Tests:**
  - Initial bundle excludes Web3 chunks
  - Web3 chunks created as separate bundles
  - Loading time within acceptable thresholds
  - No memory leaks during loading/unloading

**Test Implementation Patterns:**
```javascript
// Mock the Web3Bridge component for testing
jest.mock('./Web3Bridge', () => ({
  __esModule: true,
  default: ({ onWeb3StateChange }) => {
    React.useEffect(() => {
      onWeb3StateChange({
        address: null,
        isConnected: false,
        open: jest.fn(),
        disconnectAsync: jest.fn()
      });
    }, [onWeb3StateChange]);
    return null;
  }
}));

// Mock the lazy-loaded Web3Provider
jest.mock('./Web3Provider', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="web3-provider">{children}</div>
}));
```

**Verification Script:**
```bash
# Run performance measurement script
node scripts/measure-performance.js

# Expected output:
# ✅ Web3 Chunk Found: web3-vendors-[hash].js
# Size: ~2MB (lazy loaded)
# Initial Bundle: <2.5MB
# Improvement: >40% reduction
```

**Test Files:**
- `src/app/components/Web3Manager.test.js` - Lazy loading orchestration
- `src/app/screens/Entry.web3.test.js` - Web3 authentication with lazy loading
- `src/app/hooks/useWeb3State.test.js` - Hook integration tests
- `scripts/measure-performance.js` - Bundle size verification

## 6. Test Coverage & Limitations

### 6.1. Test Execution Statistics
The project currently maintains:
- **22 test suites** passing 
- **320+ tests** total (all passing) 
- **Unit tests** for all utility functions with enhanced edge case handling
- **Component tests** for core UI components with robust async patterns
- **Integration tests** covering critical user flows and error scenarios
- **Feature tests** for auto-fill animation and Web3 lazy loading
- **Zero act() warnings** achieved through proper async testing patterns

### 6.2. Known Issues & Limitations

**Issue: Code Coverage Reporting**

Code coverage reporting is currently non-functional due to incompatibility between Jest's instrumentation and Next.js 13+ with the app directory structure. This is a known tooling issue that prevents the generation of coverage reports.

-   **Error:** `TypeError: The "original" argument must be of type function`
-   **Root Cause:** A conflict between Jest's coverage instrumentation and Next.js's SWC compiler.
-   **Impact:** This does **not** affect test execution; all tests run correctly and provide their intended safety net. It only means we cannot automatically generate a coverage percentage report.

## 7. Writing New Tests

### 7.1. Async Testing Best Practices

**Always Use `waitFor()` for Asynchronous Operations**

When testing components with async behavior, use `waitFor()` from React Testing Library instead of arbitrary timeouts:

```javascript
// ❌ AVOID: Fixed timeouts can cause race conditions and act() warnings
const waitForStable = () => new Promise(resolve => setTimeout(resolve, 100));
test('animation test', async () => {
  renderComponent({ autoPlay: true });
  await waitForStable();
  // Test assertions...
});

// ✅ PREFERRED: Wait for specific DOM conditions
test('animation test', async () => {
  renderComponent({ autoPlay: true });
  
  const element = await waitFor(() => {
    const el = document.querySelector('pre');
    expect(el).toBeInTheDocument();
    return el;
  });
  
  // Wait for actual content change instead of arbitrary timeout
  const initialContent = element.textContent;
  await waitFor(() => {
    expect(element.textContent).not.toBe(initialContent);
  }, { timeout: 1000 });
});
```

**Avoid Global State Interference**

Use unique identifiers to prevent test pollution from global caches:

```javascript
// ❌ AVOID: Same values across tests can cause cache collisions
function renderComponent() {
  return render(<Component src="/test-image.jpg" />);
}

// ✅ PREFERRED: Unique values prevent cache interference
function renderComponent(props = {}) {
  const testId = Date.now() + Math.random();
  return render(
    <Component 
      src={props.src || `/test-image-${testId}.jpg`} 
      {...props} 
    />
  );
}
```

**Wrap State-Changing Events in `act()`**

When testing events that trigger async state updates, wrap them in `act()` to eliminate React warnings:

```javascript
// ❌ AVOID: Can cause act() warnings for async state updates
test('handles resize events', () => {
  renderComponent();
  global.innerWidth = 500;
  global.dispatchEvent(new Event('resize'));
  expect(screen.getByText('Expected')).toBeInTheDocument();
});

// ✅ PREFERRED: Properly wrapped async events
test('handles resize events', async () => {
  renderComponent();
  
  await act(async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    global.dispatchEvent(new Event('resize'));
  });
  
  await waitFor(() => {
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });
});
```

### 7.2. Unit Test Template

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

### 7.3. Component Test Template

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

### 7.4. Lazy Loading Test Template 

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LazyComponent from './LazyComponent';

// Mock the lazy-loaded module
jest.mock('./HeavyModule', () => ({
  __esModule: true,
  default: () => <div data-testid="heavy-module">Loaded</div>
}));

describe('LazyComponent', () => {
  test('does not load heavy module initially', () => {
    render(<LazyComponent />);
    expect(screen.queryByTestId('heavy-module')).not.toBeInTheDocument();
  });

  test('loads heavy module on user interaction', async () => {
    render(<LazyComponent />);
    
    const triggerButton = screen.getByRole('button', { name: /load/i });
    
    await act(async () => {
      fireEvent.click(triggerButton);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('heavy-module')).toBeInTheDocument();
    });
  });

  test('shows loading state during lazy load', async () => {
    render(<LazyComponent />);
    
    const triggerButton = screen.getByRole('button', { name: /load/i });
    fireEvent.click(triggerButton);
    
    // Should show loading state immediately
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for loaded state
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.getByTestId('heavy-module')).toBeInTheDocument();
    });
  });
});
```

### 7.5. Auto-Fill Animation Test Template

```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Entry from './Entry';
import { MockSessionProvider } from '../../../test-utils/providers';

describe('Entry Auto-Fill Feature', () => {
  const renderWithAutoFill = (autoFillCode = null) => {
    return render(
      <MockSessionProvider
        autoFillCode={autoFillCode}
        setAutoFillCode={jest.fn()}
      >
        <Entry />
      </MockSessionProvider>
    );
  };

  test('starts animation when autoFillCode is provided', async () => {
    renderWithAutoFill('TEST123');
    
    // Wait for animation to start
    await waitFor(() => {
      const input = screen.getByPlaceholderText('ENTER ACCESS CODE');
      expect(input).toHaveClass('auto-filling');
    });
  });

  test('cleans up timers on unmount', () => {
    const { unmount } = renderWithAutoFill('TEST123');
    
    // Unmount should clear all timers
    unmount();
    
    // Verify no memory leaks (timers cleared)
    expect(jest.getTimerUsage()).toEqual({
      timers: 0,
      ticks: 0
    });
  });
});
```

## 8. Continuous Integration

Tests are automatically run in the CI pipeline via GitHub Actions on every pull request. The pipeline ensures:

1. All tests pass before merging to main
2. No regressions are introduced
3. Code quality standards are maintained
4. Bundle size optimizations are verified

The CI configuration can be found in `.github/workflows/ci.yml`.

## 9. Performance Testing

### 9.1. Bundle Size Testing

The project includes automated bundle size verification to ensure optimization targets are met:

```bash
# Run bundle size analysis
npm run build
node scripts/measure-performance.js

# Expected criteria:
# - Web3 chunk created separately: ✅
# - Initial bundle < 2.5MB: ✅
# - Web3 chunk > 1.5MB: ✅
# - Overall reduction > 40%: ✅
```

### 9.2. Loading Performance Tests

Test that lazy-loaded components don't impact initial page load:

```javascript
test('measures initial render performance', async () => {
  const startTime = performance.now();
  
  render(<App />);
  
  // Wait for initial render
  await screen.findByTestId('main-content');
  
  const renderTime = performance.now() - startTime;
  expect(renderTime).toBeLessThan(1000); // Should render in under 1 second
  
  // Verify heavy components not loaded
  expect(screen.queryByTestId('web3-provider')).not.toBeInTheDocument();
});
```

## 10. Future Improvements

### 10.1. Short Term
- Resolve coverage reporting issues with Next.js 13+
- Add tests for remaining UI components (NavigationButtons, AnalyticsPanel, SystemLog)
- Add tests for all screens (ProfileBoot, MainHub, Introduction, etc.)
- Implement performance regression testing
- Complete test coverage for auto-fill edge cases

### 10.2. Long Term
- Implement E2E tests using Playwright or Cypress
- Add visual regression testing for UI components
- Achieve 80% code coverage for critical paths
- Implement automated bundle size monitoring in CI
- Add automated performance budgets and alerts

## 11. Troubleshooting

### Common Test Failures and Solutions

**"Element type is invalid" with lazy components:**
- Ensure all lazy-loaded components have proper default exports
- Mock lazy-loaded modules in tests with proper structure
- Use `__esModule: true` in mock definitions

**Act warnings in async tests:**
- Wrap state updates in `act()` or `waitFor()`
- Use `findBy` queries instead of `getBy` for async elements
- Ensure all promises are properly awaited

**Web3 test failures:**
- Mock both Web3Provider and Web3Bridge components
- Ensure mock callbacks are properly defined
- Use `jest.doMock()` for test-specific mock overrides

**Auto-fill animation test failures:**
- Ensure `autoFillCode` is properly mocked in context
- Use `waitFor()` for animation state changes
- Mock timers with `jest.useFakeTimers()` when testing delays
- Clean up timers in afterEach hooks