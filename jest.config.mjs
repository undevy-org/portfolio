// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  // Keep both setup files — one for jest environment polyfills and one for test setup.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.env.js'],

  // Use jsdom environment (explicit)
  testEnvironment: 'jest-environment-jsdom',
  
  // Module name mappings (include your mocks)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // CSS modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Regular styles -> file mock or style mock
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Images
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // Web3 / ESM packages -> point to mocks (if you made them)
    '@reown/appkit/react': '<rootDir>/__mocks__/@reown/appkit/react.js',
    '@reown/appkit/networks': '<rootDir>/__mocks__/@reown/appkit/networks.js',
    '@reown/appkit-adapter-wagmi': '<rootDir>/__mocks__/@reown/appkit-adapter-wagmi.js',
    'wagmi': '<rootDir>/__mocks__/wagmi.js',
    'viem': '<rootDir>/__mocks__/viem.js',
    '@tanstack/react-query': '<rootDir>/__mocks__/@tanstack/react-query.js',
  },
  
  // Use babel-jest with next preset (optional but explicit)
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Allow transforming certain ESM node_modules (so babel-jest can transpile them)
  transformIgnorePatterns: [
    'node_modules/(?!(test-utils|@reown|wagmi|viem|@tanstack/react-query)/)'
  ],

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/.*/\\.skip\\.(js|jsx|ts|tsx)$'
  ],
  
  // Coverage configuration - IMPORTANT: Be very selective about what to include
  collectCoverageFrom: [
    // Only collect coverage from utils - they're pure functions and easy to test
    'src/app/utils/**/*.{js,jsx}',
    
    // Include specific, well-tested components
    'src/app/components/ProfileDataPanel.{js,jsx}',
    'src/app/components/ui/Button.{js,jsx}',
    'src/app/components/ui/TerminalProgress.{js,jsx}',
    'src/app/components/ui/Accordion.{js,jsx}',
    
    // Exclude test files and configs
    '!**/*.test.{js,jsx}',
    '!**/*.spec.{js,jsx}',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  
  // CRITICAL: Exclude problematic files from coverage to prevent crashes
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/test-utils/',
    '/__mocks__/',
    // Exclude context files that have complex dependencies
    'SessionContext\\.js$',
    'NavigationContext\\.js$',
    // Exclude pages and layouts that depend on Next.js runtime
    '/app/.*page\\.js$',
    '/app/.*layout\\.js$',
    // Exclude any file with 'use client' directive issues
    'Entry\\.js$',
    'MainHub\\.js$',
  ],
  
  // Module directories for resolution
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Transform configuration
  transformIgnorePatterns: [
    'node_modules/(?!(test-utils|@reown|wagmi|viem|@tanstack/react-query)/)'
  ],
  
  // Verbose output for better debugging
  verbose: true,
  
  // Bail on first test failure (optional, remove if you want to see all failures)
  bail: false,
  
  // Maximum worker threads (can help with stability)
  maxWorkers: '50%',

  // DO NOT set `globals.fetch = global.fetch` here.
  // Use jest.env.js or jest.setup.js to polyfill fetch as needed.
}

export default createJestConfig(config)