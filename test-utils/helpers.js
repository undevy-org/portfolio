// test-utils/helpers.js
// Helper functions for testing - simplified to work with existing infrastructure

import { waitFor } from '@testing-library/react';

/**
 * Enhanced waitFor with better defaults for async operations
 */
export async function waitForAsync(callback, options = {}) {
  return waitFor(callback, {
    timeout: 3000,
    interval: 100,
    ...options
  });
}

/**
 * Create a mock event for testing event handlers
 */
export function createMockEvent(type = 'click', properties = {}) {
  return {
    type,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: {
      value: '',
      checked: false,
      ...properties.target
    },
    currentTarget: {
      value: '',
      ...properties.currentTarget
    },
    ...properties
  };
}

/**
 * Setup browser-specific mocks that aren't provided by jsdom
 */
export function setupBrowserMocks() {
  // Mock matchMedia for responsive component testing
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });

  // Mock IntersectionObserver for lazy loading components
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() { return []; }
  };

  // Mock ResizeObserver for responsive components
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
}

/**
 * Spy on console methods for testing console output
 */
export function spyOnConsole(method = 'log') {
  const originalMethod = console[method];
  const spy = jest.fn();
  
  console[method] = spy;
  
  return {
    spy,
    restore: () => { console[method] = originalMethod; },
    getLastCall: () => spy.mock.calls[spy.mock.calls.length - 1],
    getAllCalls: () => spy.mock.calls,
    clear: () => spy.mockClear()
  };
}

/**
 * Assert accessibility attributes on an element
 */
export function expectAccessibility(element, attributes) {
  Object.entries(attributes).forEach(([attr, value]) => {
    const ariaAttr = attr.startsWith('aria') ? attr : `aria-${attr}`;
    expect(element).toHaveAttribute(ariaAttr, String(value));
  });
}

/**
 * Create a mock Web3 wallet for testing Web3 functionality
 */
export function createMockWeb3Wallet(options = {}) {
  const {
    address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7',
    chainId = 1,
    connected = true
  } = options;

  return {
    address,
    chainId,
    connected,
    connect: jest.fn().mockResolvedValue({ address, chainId }),
    disconnect: jest.fn().mockResolvedValue(true),
    signMessage: jest.fn().mockResolvedValue('0xmocksignature'),
    getBalance: jest.fn().mockResolvedValue('1000000000000000000'),
    switchChain: jest.fn().mockResolvedValue(true),
    on: jest.fn(),
    off: jest.fn(),
    removeListener: jest.fn()
  };
}

/**
 * Better assertion helper for checking mock function calls
 */
export function expectCalledWith(mockFn, expectedArgs, callIndex = -1) {
  expect(mockFn).toHaveBeenCalled();
  
  const calls = mockFn.mock.calls;
  const targetCall = callIndex === -1 ? calls[calls.length - 1] : calls[callIndex];
  
  if (!targetCall) {
    throw new Error(`Function was not called ${callIndex === -1 ? '' : `at index ${callIndex}`}`);
  }
  
  expectedArgs.forEach((expectedArg, index) => {
    expect(targetCall[index]).toEqual(expectedArg);
  });
}

/**
 * Create a controllable promise for testing async flows
 */
export function createControllablePromise() {
  let resolve, reject;
  
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  
  return {
    promise,
    resolve,
    reject,
    resolveAfter: (value, ms = 100) => {
      setTimeout(() => resolve(value), ms);
    },
    rejectAfter: (error, ms = 100) => {
      setTimeout(() => reject(error), ms);
    }
  };
}

/**
 * Helper to test components that use timers
 */
export function runTimers() {
  jest.runAllTimers();
  return Promise.resolve();
}

/**
 * Create mock file for upload testing
 */
export function createMockFile(name = 'test.pdf', size = 1024, type = 'application/pdf') {
  const file = new File(['a'.repeat(size)], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  Object.defineProperty(file, 'lastModified', { value: Date.now() });
  return file;
}

/**
 * Simulate delay for async testing
 */
export function delay(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms));
}