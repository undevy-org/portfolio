// jest.setup.js
// Enhanced setup for better coverage support

import '@testing-library/jest-dom'
import { setupBrowserMocks } from './test-utils/helpers'

// Setup browser API mocks that jsdom doesn't provide
setupBrowserMocks();

// Mock Next.js router since it's not available in test environment
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/'
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  }
}));

// Mock lucide-react icons to avoid import issues
jest.mock('lucide-react', () => ({
  ChevronDown: () => 'ChevronDown',
  ChevronUp: () => 'ChevronUp',
  ChevronLeft: () => 'ChevronLeft',
  ChevronRight: () => 'ChevronRight',
  X: () => 'X',
  Menu: () => 'Menu',
  Moon: () => 'Moon',
  Sun: () => 'Sun',
  Terminal: () => 'Terminal',
  Code: () => 'Code',
  User: () => 'User',
  Mail: () => 'Mail',
  Github: () => 'Github',
  Linkedin: () => 'Linkedin',
  Twitter: () => 'Twitter',
  // Add any other icons your app uses
}));

// Suppress specific React warnings during tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Warning: useLayoutEffect') ||
       args[0].includes('Not wrapped in act') ||
       args[0].includes('createRoot()'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('componentWillReceiveProps')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test utilities
global.testUtils = {
  nextTick: () => new Promise(resolve => process.nextTick(resolve)),
  flushPromises: () => new Promise(resolve => setImmediate(resolve)),
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};