// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.env.js'],
  testEnvironment: 'jest-environment-jsdom',
  
  // Module name mappings
  moduleNameMapper: {
    // Handle CSS imports
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Paths to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/\\.skip\\.(js|jsx|ts|tsx)$'
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
    'node_modules/(?!(test-utils)/)'
  ],
  
  // Verbose output for better debugging
  verbose: true,
  
  // Bail on first test failure (optional, remove if you want to see all failures)
  bail: false,
  
  // Maximum worker threads (can help with stability)
  maxWorkers: '50%',
}

export default createJestConfig(config)