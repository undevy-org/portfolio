// jest.setup.js
// Enhanced test setup: safe, idempotent global mocks and small helpers.
// Keep this file minimal and rely on jest.env.js for heavy polyfills (fetch, etc).

import '@testing-library/jest-dom'
import { setupBrowserMocks } from './test-utils/helpers'

// Ensure browser-like APIs are present. Let setupBrowserMocks implement the project's canonical mocks.
// If a particular API is missing, we add a safe fallback below (without force-overwriting existing polyfills).
try {
  setupBrowserMocks()
} catch (err) {
  // If the helper throws (not present), we continue with local fallbacks below.
  // Do not rethrow here to keep tests running.
  console.warn('[jest.setup] setupBrowserMocks() failed or is missing:', err?.message || err)
}

// SAFE fallbacks (only define if not already defined)

// fetch: prefer a polyfill (jest.env.js). Only stub if completely missing.
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    })
  )
}

// window.location: define safely if not writable
if (typeof window !== 'undefined') {
  try {
    // don't overwrite if jsdom already provides a working location
    if (!window.location || typeof window.location.href === 'undefined') {
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
          href: 'http://localhost:3000',
          origin: 'http://localhost:3000',
          pathname: '/',
          search: '',
          hash: '',
          replace: jest.fn(),
          reload: jest.fn(),
        },
      })
    }
  } catch (err) {
    // If defining fails, don't crash tests.
    console.warn('[jest.setup] could not define window.location:', err?.message || err)
  }

  // window.open fallback
  if (typeof window.open === 'undefined') {
    window.open = jest.fn()
  }
}

// localStorage fallback (only if not already provided by setupBrowserMocks)
if (typeof global.localStorage === 'undefined') {
  const localStorageMock = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => undefined),
    removeItem: jest.fn(() => undefined),
    clear: jest.fn(() => undefined),
  }
  global.localStorage = localStorageMock
}

// IntersectionObserver fallback
if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() { return [] }
  }
}

// ResizeObserver fallback
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  }
}

// Mock next/navigation for app-router tests (keep predictable)
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  }
}))

// Mock lucide-react icons to avoid import/render issues.
// Return simple functional components for compatibility with React renderers.
jest.mock('lucide-react', () => {
  const makeIcon = (name) => {
    return (props) => {
      // return a simple element so tests can query by role/text if needed
      // keep it minimal to avoid cluttering snapshots
      return name
    }
  }

  return {
    ChevronDown: makeIcon('ChevronDown'),
    ChevronUp: makeIcon('ChevronUp'),
    ChevronLeft: makeIcon('ChevronLeft'),
    ChevronRight: makeIcon('ChevronRight'),
    X: makeIcon('X'),
    Menu: makeIcon('Menu'),
    Moon: makeIcon('Moon'),
    Sun: makeIcon('Sun'),
    Terminal: makeIcon('Terminal'),
    Code: makeIcon('Code'),
    User: makeIcon('User'),
    Mail: makeIcon('Mail'),
    Github: makeIcon('Github'),
    Linkedin: makeIcon('Linkedin'),
    Twitter: makeIcon('Twitter'),
    // Add other icons as plain stubs if needed
  }
})

// Suppress specific expected noisy warnings, but DO NOT swallow everything.
const originalError = console.error
const originalWarn = console.warn

const ERROR_SUPPRESSION_PATTERNS = [
  'Warning: ReactDOM.render',
  'Warning: useLayoutEffect',
  'Not wrapped in act',
  'createRoot()',
  'Warning: An update to', // common act() warnings
]

const WARN_SUPPRESSION_PATTERNS = [
  'componentWillReceiveProps',
]

beforeAll(() => {
  console.error = (...args) => {
    const first = typeof args[0] === 'string' ? args[0] : ''
    if (ERROR_SUPPRESSION_PATTERNS.some(p => first.includes(p))) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.warn = (...args) => {
    const first = typeof args[0] === 'string' ? args[0] : ''
    if (WARN_SUPPRESSION_PATTERNS.some(p => first.includes(p))) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Clear mocks between tests (keeps test isolation)
afterEach(() => {
  jest.clearAllMocks()
})

// Global test utilities
global.testUtils = {
  nextTick: () => new Promise(resolve => process.nextTick(resolve)),
  flushPromises: () => new Promise(resolve => setImmediate(resolve)),
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
}

global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))