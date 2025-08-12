/* eslint-env jest */

import fs from 'fs/promises';
import path from 'path';
import { getContentFilePath, getDomainConfig } from './config';

// Mock the fs/promises module
jest.mock('fs/promises');

describe('config utilities', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    // Clears the cache and resets modules before each test
    jest.resetModules();
    // Resets the process.env object
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    // Restore original environment variables
    process.env = OLD_ENV;
  });

  describe('getContentFilePath', () => {
    it('should return the demo content path when isDemoMode is true and demo mode is enabled', () => {
      process.env.ENABLE_DEMO_MODE = 'true';
      const expectedPath = path.join(process.cwd(), 'config', 'demo-content.json');
      expect(getContentFilePath(true)).toBe(expectedPath);
    });

    it('should return the path from CONTENT_FILE_PATH env var if set', () => {
      const testPath = '/test/path/content.json';
      process.env.CONTENT_FILE_PATH = testPath;
      expect(getContentFilePath()).toBe(testPath);
    });

    it('should return the default test content path for non-production environments', () => {
      process.env.NODE_ENV = 'development';
      const expectedPath = path.join(process.cwd(), 'src', 'app', 'test-content.json');
      expect(getContentFilePath()).toBe(expectedPath);
    });

    it('should return the default content path for production when no env var is set', () => {
        process.env.NODE_ENV = 'production';
        const expectedPath = path.join(process.cwd(), 'content.json');
        expect(getContentFilePath()).toBe(expectedPath);
    });
  });

  describe('getDomainConfig', () => {
    const mockDomains = {
      'test.com': { brandingToken: 'test_brand' },
      'localhost': { brandingToken: 'local_brand' }
    };

    beforeEach(() => {
        // Mock fs.readFile to return our test domains
        fs.readFile.mockResolvedValue(JSON.stringify(mockDomains));
    });

    it('should return the correct config for a matching hostname', async () => {
      const config = await getDomainConfig('test.com');
      expect(config.brandingToken).toBe('test_brand');
    });

    it('should return the localhost config for "localhost" hostname', async () => {
      const config = await getDomainConfig('localhost:3000');
      expect(config.brandingToken).toBe('local_brand');
    });

    it('should return a default config for a non-existent domain', async () => {
      const config = await getDomainConfig('unknown.com');
      expect(config.brandingToken).toBe('$terminal_portfolio');
    });

    it('should handle file read errors and return a default config', async () => {
        fs.readFile.mockRejectedValue(new Error('File not found'));
        const config = await getDomainConfig('any.com');
        expect(config.brandingToken).toBe('$terminal_portfolio');
      });
  });
});
