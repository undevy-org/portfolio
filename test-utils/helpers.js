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

/**
 * Advanced debugging utilities for test development
 */
export const TestDebugger = {
  /**
   * Log component render tree for debugging
   */
  logRenderTree: (container, label = 'Component Tree') => {
    console.group(`🌳 ${label}`);
    console.log(container.innerHTML);
    console.groupEnd();
  },

  /**
   * Log all available roles and accessible names
   */
  logAccessibleElements: (container) => {
    const elements = container.querySelectorAll('*');
    const roles = new Map();
    
    elements.forEach(el => {
      const role = el.getAttribute('role') || el.tagName.toLowerCase();
      const name = el.getAttribute('aria-label') || el.textContent?.trim() || '';
      
      if (!roles.has(role)) {
        roles.set(role, []);
      }
      
      if (name) {
        roles.get(role).push(name.substring(0, 50));
      }
    });
    
    console.group('♿ Accessible Elements');
    for (const [role, names] of roles) {
      if (names.length > 0) {
        console.log(`${role}:`, names);
      }
    }
    console.groupEnd();
  },

  /**
   * Monitor function calls on mock objects
   */
  monitorMockCalls: (mockFn, label) => {
    const originalFn = mockFn;
    const wrappedFn = jest.fn((...args) => {
      console.log(`📞 ${label} called with:`, args);
      return originalFn(...args);
    });
    
    // Copy over existing mock properties
    Object.keys(originalFn).forEach(key => {
      if (key !== 'mockImplementation') {
        wrappedFn[key] = originalFn[key];
      }
    });
    
    return wrappedFn;
  },

  /**
   * Capture and log CSS classes applied to elements
   */
  logElementClasses: (element, label = 'Element') => {
    const classes = Array.from(element.classList);
    console.log(`🎨 ${label} classes:`, classes);
    return classes;
  },

  /**
   * Debug async state changes in components
   */
  waitForStateChange: async (checkFn, timeout = 5000, interval = 100) => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        const result = checkFn();
        if (result) {
          console.log('✅ State change detected');
          return result;
        }
      } catch (error) {
        // Continue waiting
      }
      
      await delay(interval);
    }
    
    console.warn('⏱️ State change timeout');
    throw new Error(`State change not detected within ${timeout}ms`);
  },

  /**
   * Log component props for debugging
   */
  logComponentProps: (component, label = 'Component') => {
    if (component && component.props) {
      console.group(`⚙️ ${label} Props`);
      Object.entries(component.props).forEach(([key, value]) => {
        console.log(`${key}:`, typeof value === 'function' ? '[Function]' : value);
      });
      console.groupEnd();
    }
  }
};

/**
 * Test data fixtures for consistent testing
 */
export const TestFixtures = {
  /**
   * Common test scenarios for different component states
   */
  componentStates: {
    loading: { isLoading: true, data: null, error: null },
    loaded: { isLoading: false, data: { test: 'data' }, error: null },
    error: { isLoading: false, data: null, error: new Error('Test error') },
    empty: { isLoading: false, data: [], error: null }
  },

  /**
   * Mock user interaction events
   */
  userEvents: {
    click: (element) => ({ type: 'click', target: element }),
    keyDown: (key) => ({ type: 'keydown', key, code: key }),
    change: (value) => ({ type: 'change', target: { value } }),
    submit: () => ({ type: 'submit', preventDefault: jest.fn() })
  },

  /**
   * Common viewport sizes for responsive testing
   */
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
    wide: { width: 1920, height: 1080 }
  }
};

/**
 * Performance testing utilities
 */
export const PerformanceTestUtils = {
  /**
   * Measure component render time
   */
  measureRenderTime: async (renderFn) => {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    const renderTime = end - start;
    console.log(`⏱️ Render time: ${renderTime.toFixed(2)}ms`);
    
    return { result, renderTime };
  },

  /**
   * Test for memory leaks in component lifecycle
   */
  checkMemoryLeaks: (component) => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    return {
      start: () => {
        return performance.memory?.usedJSHeapSize || 0;
      },
      check: () => {
        const currentMemory = performance.memory?.usedJSHeapSize || 0;
        const memoryDiff = currentMemory - initialMemory;
        
        if (memoryDiff > 1000000) { // 1MB threshold
          console.warn('⚠️ Potential memory leak detected:', `${memoryDiff} bytes`);
        }
        
        return memoryDiff;
      }
    };
  }
};