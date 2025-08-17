// src/app/components/ThemeManager.js
'use client';

import { useEffect } from 'react';
import { useSession, themes } from '../context/SessionContext';

/**
 * ThemeManager Component
 *
 * Responsible for applying the proper HTML/body classes for the active theme.
 * - Sets data-theme attribute on <html> for ALL themes (including light and dark)
 * - Also adds theme-<id> class for backward compatibility
 * - Manages body background and text color classes
 */

export default function ThemeManager() {
  const { theme } = useSession();

  /**
   * Mapping of theme id -> body classes that should be applied for that theme.
   * Keep these in sync with your Tailwind color tokens (tailwind.config) and
   * utility selectors in globals.css.
   */
  useEffect(() => {
    const themeBodyClassMap = {
      dark: ['bg-dark-bg', 'text-dark-text-primary'],
      light: ['bg-light-bg', 'text-light-text-primary'],
      amber: ['bg-amber-bg', 'text-amber-text-primary'],
      bsod: ['bg-bsod-bg', 'text-bsod-text-primary'],
    };

    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // Remove any body classes that belong to any theme
    const allBodyClasses = Object.values(themeBodyClassMap).flat();
    if (allBodyClasses.length > 0) {
      body.classList.remove(...allBodyClasses);
    }

    // Remove all theme-<id> classes from <html> to avoid leftover state
    themes.forEach((t) => {
      html.classList.remove(`theme-${t}`);
    });

    // Remove old data-theme attribute
    html.removeAttribute('data-theme');

    // Remove Tailwind dark class
    html.classList.remove('dark');

    // IMPORTANT: Set data-theme for ALL themes (including dark and light)
    // This ensures CSS selectors work consistently
      html.setAttribute('data-theme', theme);

    // Also add theme-<id> class for backward compatibility
    html.classList.add(`theme-${theme}`);

    // Add the body classes for the selected theme
    const bodyClasses = themeBodyClassMap[theme] || themeBodyClassMap.dark;
    if (bodyClasses && bodyClasses.length > 0) {
      body.classList.add(...bodyClasses);
    }

    // Debug info
    console.debug(`[ThemeManager] Theme applied: ${theme}`, {
      htmlClassName: html.className,
      dataTheme: html.getAttribute('data-theme'),
      bodyClassList: body.className,
    });
  }, [theme]);

  return null;
}
