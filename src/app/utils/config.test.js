/* eslint-env jest */

import fs from 'fs/promises';
import path from 'path';
import { getContentFilePath, getDomainConfig } from './config';

// Mock the fs/promises module
jest.mock('fs/promises');

describe('config utilities', () => {
  const OLD_ENV = { ...process.env };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('getContentFilePath', () => {
    it('should return the demo content path when isDemoMode is true and demo mode is enabled', () => {
      process.env.ENABLE_DEMO_MODE = 'true';
      const expectedPath = path.join(process.cwd(), 'config', 'demo-content.json');
      expect(getContentFilePath(true)).toBe(expectedPath);
    });

    it('should return the path from CONTENT_FILE_PATH env var when set', () => {
      const expectedPath = path.join(process.cwd(), 'test-content-local.json');
      expect(getContentFilePath()).toBe(expectedPath);
    });

    it('should return the correct default path when CONTENT_FILE_PATH is not set', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      delete process.env.CONTENT_FILE_PATH;

      process.env.NODE_ENV = 'development';
      const expectedDevPath = path.join(process.cwd(), 'test-content-local.json');
      expect(getContentFilePath()).toBe(expectedDevPath);

      process.env.NODE_ENV = 'production';
      const expectedProdPath = path.join(process.cwd(), 'content.json');
      expect(getContentFilePath()).toBe(expectedProdPath);
      
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('getDomainConfig', () => {
    const mockDomains = {
      'test.com': { brandingToken: 'test_brand' },
      'localhost': { brandingToken: 'local_brand' }
    };

    beforeEach(() => {
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

    it('should return a default config using values from .env.local for a non-existent domain', async () => {
        delete process.env.DEFAULT_PORTFOLIO_TITLE;
        const config = await getDomainConfig('unknown.com');
        expect(config.brandingToken).toBe('$terminal_portfolio');
    });

    it('should handle file read errors and return a default config using .env.local', async () => {
        delete process.env.DEFAULT_PORTFOLIO_TITLE;
        fs.readFile.mockRejectedValue(new Error('File not found'));
        const config = await getDomainConfig('any.com');
        expect(config.brandingToken).toBe('$terminal_portfolio');
      });
  });
});