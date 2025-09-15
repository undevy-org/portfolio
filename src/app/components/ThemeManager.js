// src/app/components/ThemeManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';

/**
 * ThemeManager Component
 *
 * Responsible for applying the theme to the document.
 * - Sets data-theme attribute on <html> for CSS variables
 * - Preserves existing body classes from layout.js (font loading)
 */
export default function ThemeManager() {
  const { theme } = useSession();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // Set data-theme for CSS variables
    html.setAttribute('data-theme', theme);
    
    // Preserve existing classes (especially font classes from layout.js)
    // Only ensure our semantic classes are present, don't overwrite everything
    if (!body.classList.contains('bg-main')) {
      body.classList.add('bg-main');
    }
    if (!body.classList.contains('text-primary')) {
      body.classList.add('text-primary');
    }
    if (!body.classList.contains('terminal-texture')) {
      body.classList.add('terminal-texture');
    }

    // Debug info
    console.debug(`[ThemeManager] Theme applied: ${theme}`, {
      dataTheme: html.getAttribute('data-theme'),
      bodyClasses: body.className,
    });
  }, [theme]);

  return null;
}