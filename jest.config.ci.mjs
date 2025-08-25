// jest.config.ci.mjs
// Optimized Jest configuration for CI environments
// This config prioritizes speed and reliability for automated testing

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  // Base configuration
  displayName: 'CI Pipeline Tests',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Performance optimizations for CI
  maxWorkers: '50%', // Use half the available cores for better resource management
  testTimeout: 15000, // Shorter timeout for faster feedback
  workerIdleMemoryLimit: '512MB', // Limit memory per worker
  
  // Test selection and execution
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)',
    '<rootDir>/test-utils/**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  
  // Exclude slow integration tests by default in CI
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/scripts/',
    // Optionally skip integration tests for faster CI
    process.env.CI_SKIP_INTEGRATION === 'true' ? '<rootDir>/src/app/integration.test.js' : ''
  ].filter(Boolean),
  
  // Module handling optimizations
  moduleNameMapper: {
    // Static asset mocks for faster execution
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    
    // Path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/app/utils/$1',
    '^@/test-utils/(.*)$': '<rootDir>/test-utils/$1'
  },
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { 
          targets: { node: 'current' },
          modules: 'commonjs'
        }],
        ['@babel/preset-react', { 
          runtime: 'automatic' 
        }]
      ]
    }]
  },
  
  // Environment setup
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },
  
  // Coverage configuration (disabled in CI for speed)
  collectCoverage: process.env.CI_COLLECT_COVERAGE === 'true',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/page.js',
    '!src/app/layout.js',
    '!**/__tests__/**',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/*.spec.{js,jsx,ts,tsx}'
  ],
  
  // Reporting optimizations
  reporters: ['default'],
  
  // Cache configuration for faster subsequent runs
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  
  // Error handling
  bail: 1, // Stop on first test failure for faster feedback
  verbose: false, // Reduce output verbosity in CI
  silent: process.env.CI_SILENT_TESTS === 'true',
  
  // Global setup
  globals: {
    'process.env': {
      NODE_ENV: 'test',
      NEXT_PUBLIC_APP_ENV: 'test'
    }
  },
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Extensions to resolve
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  
  // Clear mocks between tests for reliability
  clearMocks: true,
  restoreMocks: true,
  
  // Ignore patterns for faster scanning
  watchPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/build/',
    '<rootDir>/dist/'
  ]
};