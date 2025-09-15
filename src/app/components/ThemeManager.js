// src/app/components/ThemeManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';

/**
 * ThemeManager Component
 *
 * Responsible for applying the proper HTML/body classes for the active theme.
 * - Sets data-theme attribute on <html> for ALL themes
 * - Manages body background and text color classes using CSS variables
 */

export default function ThemeManager() {
  const { theme } = useSession();

  /**
   * Apply theme using CSS variables approach
   * This eliminates the need for theme-specific body classes
   */
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // Single source of truth: data-theme attribute
    html.setAttribute('data-theme', theme);
    
    // Use semantic classes that reference CSS variables
    body.className = 'bg-main text-primary terminal-texture';

    // Debug info
    console.debug(`[ThemeManager] Theme applied: ${theme}`);
  }, [theme]);

  return null;
}