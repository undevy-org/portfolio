// src/app/components/ThemeManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';

/**
 * ThemeManager Component
 * 
 * This component manages the application theme by:
 * 1. Applying the 'dark' class to <html> for Tailwind's dark mode
 * 2. Managing body background and text color classes
 * 
 * The component has no visual output - it only manages DOM classes
 */
export default function ThemeManager() {
  const { theme } = useSession();

  useEffect(() => {
    // Get references to both html and body elements
    const html = document.documentElement;
    const body = document.body;
    
    // Define theme-specific classes for the body
    const darkThemeClasses = ['bg-dark-bg', 'text-dark-text-primary'];
    const lightThemeClasses = ['bg-light-bg', 'text-light-text-primary'];

    if (theme === 'light') {
      // Light theme: remove dark class from html and dark classes from body
      html.classList.remove('dark');
      body.classList.remove(...darkThemeClasses);
      body.classList.add(...lightThemeClasses);
    } else {
      // Dark theme: add dark class to html and dark classes to body
      html.classList.add('dark');
      body.classList.remove(...lightThemeClasses);
      body.classList.add(...darkThemeClasses);
    }

    // Log theme change for debugging (can be removed in production)
    console.log(`[ThemeManager] Theme applied: ${theme}, HTML classes: ${html.className}`);
  }, [theme]);

  return null;
}