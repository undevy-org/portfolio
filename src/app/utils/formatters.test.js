// src/app/utils/formatters.test.js
import { getScreenDisplayName, getAvailabilityDate } from './formatters';

describe('formatters', () => {
  describe('getScreenDisplayName', () => {
    // Existing tests
    it('should return "Home" for "MainHub"', () => {
      expect(getScreenDisplayName('MainHub')).toBe('Home');
    });

    it('should convert CamelCase to Title Case', () => {
      expect(getScreenDisplayName('CaseDetail')).toBe('Case Detail');
    });

    it('should handle single-word screen names', () => {
      expect(getScreenDisplayName('Contact')).toBe('Contact');
    });

    // Additional comprehensive tests from checklist
    it('should handle special case mappings correctly', () => {
      // Test all known special cases
      expect(getScreenDisplayName('MainHub')).toBe('Home');
      // Add other special mappings if they exist in your implementation
    });

    it('should convert multiple word CamelCase correctly', () => {
      // Test various CamelCase patterns
      expect(getScreenDisplayName('UserProfileSettings')).toBe('User Profile Settings');
      expect(getScreenDisplayName('WebThreeAuth')).toBe('Web Three Auth');
      expect(getScreenDisplayName('APIConfiguration')).toBe('API Configuration');
    });

    it('should handle edge cases', () => {
      // Empty string
      expect(getScreenDisplayName('')).toBe('');
      
      // Single letter
      expect(getScreenDisplayName('A')).toBe('A');
      
      // All caps
      expect(getScreenDisplayName('API')).toBe('API');
      
      // Lowercase input
      expect(getScreenDisplayName('lowercase')).toBe('Lowercase');
      
      // With numbers
      expect(getScreenDisplayName('Web3Auth')).toBe('Web 3 Auth');
      expect(getScreenDisplayName('Section404')).toBe('Section 404');
    });

    it('should handle null/undefined gracefully', () => {
      expect(getScreenDisplayName(null)).toBe('');
      expect(getScreenDisplayName(undefined)).toBe('');
    });

    it('should handle non-string inputs', () => {
      expect(getScreenDisplayName(123)).toBe('123');
      expect(getScreenDisplayName({})).toBe('[object Object]');
      expect(getScreenDisplayName([])).toBe('');
    });

    it('should preserve consecutive capitals at the start', () => {
      expect(getScreenDisplayName('UIComponent')).toBe('UI Component');
      expect(getScreenDisplayName('XMLParser')).toBe('XML Parser');
    });

    it('should handle underscores if present', () => {
      expect(getScreenDisplayName('snake_case_name')).toBe('Snake Case Name');
      expect(getScreenDisplayName('CONSTANT_NAME')).toBe('CONSTANT NAME');
    });
  });

  describe('getAvailabilityDate', () => {
    it('should return a date in the correct format', () => {
      const date = getAvailabilityDate();
      // Format should be "Month DD, YYYY"
      expect(date).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
    });
  
    it('should return a date that is a weekday', () => {
      const dateString = getAvailabilityDate();
      const date = new Date(dateString);
      const day = date.getDay();
      
      // 0 = Sunday, 6 = Saturday
      expect(day).toBeGreaterThan(0);
      expect(day).toBeLessThan(6);
    });
  
    it('should return a future date', () => {
      const dateString = getAvailabilityDate();
      const availabilityDate = new Date(dateString);
      const today = new Date();
      
      // The availability date should be at least today or in the future
      // We allow for same day in case test runs at midnight
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const availStart = new Date(availabilityDate.getFullYear(), availabilityDate.getMonth(), availabilityDate.getDate());
      
      expect(availStart.getTime()).toBeGreaterThanOrEqual(todayStart.getTime());
    });
  
    it('should skip weekends when calculating availability', () => {
      // Test with different offset values to ensure weekend skipping
      const dates = [];
      
      // Generate multiple dates with different offsets
      for (let offset = 1; offset <= 7; offset++) {
        const date = getAvailabilityDate(offset);
        const parsed = new Date(date);
        dates.push(parsed.getDay());
      }
      
      // None should be 0 (Sunday) or 6 (Saturday)
      dates.forEach(day => {
        expect(day).not.toBe(0);
        expect(day).not.toBe(6);
      });
    });
  
    it('should handle custom offset parameter', () => {
      const date7Days = getAvailabilityDate(7);
      const date14Days = getAvailabilityDate(14);
      
      const parsed7 = new Date(date7Days);
      const parsed14 = new Date(date14Days);
      
      // 14 days offset should result in a later date than 7 days
      expect(parsed14.getTime()).toBeGreaterThan(parsed7.getTime());
    });
  
    it('should use consistent date format', () => {
      const date = getAvailabilityDate();
      
      // Should always be "Month DD, YYYY" format
      expect(date).toMatch(/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/);
    });
  });

  // Add tests for any other formatter functions that might exist
  describe('other formatters (if any)', () => {
    // Placeholder for additional formatter tests
    // For example: formatCurrency, formatPercentage, formatFileSize, etc.
    
    it.todo('should test formatCurrency if it exists');
    it.todo('should test formatPercentage if it exists');
    it.todo('should test formatFileSize if it exists');
  });
});