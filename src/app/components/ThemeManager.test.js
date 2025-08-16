// src/app/components/ThemeManager.test.js
import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeManager from './ThemeManager';

// Мокаем useSession
jest.mock('../context/SessionContext', () => ({
  useSession: jest.fn()
}));
import { useSession } from '../context/SessionContext';

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.body.className = '';
  jest.clearAllMocks();
});

describe('ThemeManager', () => {
  test('applies dark class to html element when theme is dark', async () => {
    useSession.mockReturnValue({ theme: 'dark' });

    render(<ThemeManager />);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('bg-dark-bg')).toBe(true);
      expect(document.body.classList.contains('text-dark-text-primary')).toBe(true);
    });
  });

  test('removes dark class and applies light classes when theme is light', async () => {
    useSession.mockReturnValue({ theme: 'light' });

    render(<ThemeManager />);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(document.body.classList.contains('bg-light-bg')).toBe(true);
      expect(document.body.classList.contains('text-light-text-primary')).toBe(true);
      expect(document.body.classList.contains('bg-dark-bg')).toBe(false);
    });
  });

  test('logs theme change to console for debugging', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    useSession.mockReturnValue({ theme: 'dark' });

    render(<ThemeManager />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ThemeManager] Theme applied: dark')
      );
    });

    consoleSpy.mockRestore();
  });
});
