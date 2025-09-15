// src/app/components/ThemeManager.test.js
import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeManager from './ThemeManager';

jest.mock('../context/SessionContext', () => ({
  useSession: jest.fn(),
}));
import { useSession } from '../context/SessionContext';

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.body.className = '';
  jest.clearAllMocks();
});

describe('ThemeManager', () => {
  test('applies data-theme attribute to html element when theme is dark', async () => {
    useSession.mockReturnValue({ theme: 'dark' });
    render(<ThemeManager />);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(document.body.classList.contains('bg-main')).toBe(true);
      expect(document.body.classList.contains('text-primary')).toBe(true);
    });
  });

  test('removes old theme and applies new theme when theme changes', async () => {
    useSession.mockReturnValue({ theme: 'light' });
    render(<ThemeManager />);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(document.body.classList.contains('bg-main')).toBe(true);
      expect(document.body.classList.contains('text-primary')).toBe(true);
    });
  });

  test('logs theme change to console for debugging', async () => {
    // Silence console output during test and spy
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    useSession.mockReturnValue({ theme: 'dark' });

    render(<ThemeManager />);

    await waitFor(() => {
      // Ensure it was called at least once
      expect(consoleSpy).toHaveBeenCalled();
      // Check the first argument (the message string) contains the expected substring
      const firstArg = consoleSpy.mock.calls[0][0];
      expect(firstArg).toEqual(expect.stringContaining('[ThemeManager] Theme applied: dark'));
    });

    consoleSpy.mockRestore();
  });
});