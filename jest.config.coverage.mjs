// jest.config.coverage.mjs
// Special configuration for coverage that avoids Next.js specific issues

/** @type {import('jest').Config} */
const config = {
  // Use basic jsdom environment
  testEnvironment: 'jsdom',
  
  // Basic setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Simple transform without Next.js preset
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  
  // Module name mappings
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Map imports to src
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Only test utils for coverage
  testMatch: [
    '**/utils/**/*.test.js'
  ],
  
  // Coverage ONLY for utils - they're simple functions
  collectCoverageFrom: [
    'src/app/utils/formatters.js',
    'src/app/utils/session.js',
    // Exclude files that might have issues
    '!src/app/utils/config.js',
    '!src/app/utils/content.js',
  ],
  
  // Ignore patterns
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '\\.test\\.js$',
    '\\.schema\\.js$',
  ],
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Don't transform node_modules except specific packages
  transformIgnorePatterns: [
    'node_modules/(?!(test-utils)/)'
  ],
  
  // Disable code coverage instrumentation caching
  coverageProvider: 'v8',
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Don't collect coverage by default
  collectCoverage: false,
}