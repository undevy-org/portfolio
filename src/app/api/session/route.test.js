// src/app/api/session/route.test.js
import { GET } from './route';
import fs from 'fs/promises';
import path from 'path';
import { getContentFilePath, isDemoModeEnabled, loadContent } from '../../utils/config';
import { mergeSessionData } from '../../utils/session';

// Mock the utility functions
jest.mock('../../utils/config', () => ({
  getContentFilePath: jest.fn(),
  isDemoModeEnabled: jest.fn(),
  loadContent: jest.fn()
}));

// Mock mergeSessionData separately since it's imported from session utils
jest.mock('../../utils/session', () => ({
  mergeSessionData: jest.fn()
}));

// Mock fs
jest.mock('fs/promises', () => ({
  readFile: jest.fn()
}));

// Mock next/server
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((data, options = {}) => {
        return {
          status: options.status || 200,
          json: async () => data,
          headers: new Map()
        };
      })
    }
  };
});

describe('Session API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Master Code Authentication', () => {
    it('should return master access data when master code is provided', async () => {
      // Set up environment
      process.env.MASTER_CODE = 'LERUSIK';
      process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE = '0XDEFI2311';
      
      // Mock content file reading
      const mockContentData = {
        'USER123': {
          profileName: 'John Doe',
          contactEmail: 'john@example.com'
        },
        'GLOBAL_DATA': {}
      };
      
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockContentData));
      
      // Create a mock request using a plain object (simpler approach)
      const mockRequest = {
        url: 'http://localhost:3000/api/session?code=LERUSIK'
      };
      
      // Call the GET function
      const response = await GET(mockRequest);
      const data = await response.json();
      
      // Verify the response
      expect(response.status).toBe(200);
      expect(data.isMasterAccess).toBe(true);
      expect(data.masterCode).toBe('LERUSIK');
      expect(data.codes).toBeDefined();
      expect(data.codes.master).toHaveLength(1);
      expect(data.codes.special).toHaveLength(2); // Web3 + Demo
      expect(data.codes.user).toHaveLength(1); // USER123
    });

    it('should not check for master code when MASTER_CODE is not set', async () => {
      // Clear environment
      delete process.env.MASTER_CODE;
      
      // Mock regular user authentication
      const mockContentData = {
        'REGULAR123': {
          meta: { company: 'Test Company' }
        },
        'GLOBAL_DATA': {}
      };
      
      fs.readFile.mockResolvedValueOnce(JSON.stringify(mockContentData));
      // Use mockReturnValue on the correctly mocked function
      mergeSessionData.mockReturnValue({ meta: { company: 'Test Company' } });
      
      // Create a mock request using a plain object (simpler approach)
      const mockRequest = {
        url: 'http://localhost:3000/api/session?code=REGULAR123'
      };
      
      // Call the GET function
      const response = await GET(mockRequest);
      const data = await response.json();
      
      // Verify the response
      expect(response.status).toBe(200);
      expect(data.isMasterAccess).toBeUndefined();
      expect(data.meta.company).toBe('Test Company');
    });
  });
});