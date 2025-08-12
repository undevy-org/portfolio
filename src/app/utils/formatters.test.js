import { getScreenDisplayName, getAvailabilityDate } from './formatters';

describe('formatters', () => {
  describe('getScreenDisplayName', () => {
    it('should return "Home" for "MainHub"', () => {
      expect(getScreenDisplayName('MainHub')).toBe('Home');
    });

    it('should convert CamelCase to Title Case', () => {
      expect(getScreenDisplayName('CaseDetail')).toBe('Case Detail');
    });

    it('should handle single-word screen names', () => {
      expect(getScreenDisplayName('Contact')).toBe('Contact');
    });
  });

  describe('getAvailabilityDate', () => {
    it('should return a date in the correct format', () => {
      const date = getAvailabilityDate();
      expect(date).toMatch(/\w+ \d{1,2}, \d{4}/);
    });

    it('should return a date that is a weekday', () => {
      // This is a bit tricky to test without mocking Date, but we can check
      // that the returned date is not a Saturday or Sunday.
      const date = new Date(getAvailabilityDate());
      const day = date.getDay();
      expect(day).not.toBe(0);
      expect(day).not.toBe(6);
    });
  });
});
