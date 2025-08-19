// src/app/components/ui/ThemeSwitcher.js
'use client';

import { useSession, themes } from '../../context/SessionContext';
import { useEffect, useState } from 'react';
import { Sun, Moon, Terminal, Bug, Waves, HardDrive, LayoutDashboard, SlidersHorizontal } from 'lucide-react';

/**
 * ThemeSwitcher Component
 * 
 * A specialized theme selector component designed exclusively for the Entry screen.
 * Displays all available themes as a horizontal row of buttons, with the active
 * theme highlighted with a prominent border (similar to the Tabs component).
 * 
 * Design principles:
 * - Uses semantic CSS classes for automatic theme adaptation
 * - Maintains visual consistency with other terminal UI components
 * - Provides immediate visual feedback for theme changes
 * - Only visible on the Entry screen to avoid redundancy with header controls
 */
export default function ThemeSwitcher() {
  // Get theme management functions from SessionContext
  const { theme: currentTheme, setThemeExplicit, addLog, currentScreen } = useSession();
  
  // Local state to track if component is mounted (for client-side only rendering)
  const [isMounted, setIsMounted] = useState(false);
  
  // Dictionary mapping each theme to its representative icon
  // These icons provide visual hints about each theme's character
  const themeIcons = {
    dark: Moon,      // Moon icon for dark theme (night/dark association)
    light: Sun,      // Sun icon for light theme (daylight association)  
    amber: Terminal, // Terminal icon for amber theme (retro phosphor terminal feel)
    bsod: Bug,       // Bug icon for BSOD theme (system error association)
    synthwave: Waves, // Waves icon for synthwave theme (retro wave association)
    operator: HardDrive, // HardDrive icon for operator theme (system drive association)
    kyoto: LayoutDashboard, // LayoutDashboard icon for kyoto theme (dashboard association)
    radar: SlidersHorizontal, // SlidersHorizontal icon for radar theme (radar association)
  };
  
  // Theme display names for better UX
  // These could be made configurable via props if needed
  const themeNames = {
    dark: 'DARK',
    light: 'LIGHT',
    amber: 'AMBER',
    bsod: 'BSOD',
    synthwave: 'SYNTHWAVE',
    operator: 'OPERATOR',
    kyoto: 'KYOTO',
    radar: 'RADAR',
  };
  
  // Ensure component only renders on client side to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render on screens other than Entry and ProfileBoot
  // This component is specifically designed for these authentication screens
  if (!['Entry', 'ProfileBoot'].includes(currentScreen)) {
    return null;
  }
  
  // Don't render during SSR to prevent hydration errors
  if (!isMounted) {
    return null;
  }
  
  /**
   * Handle theme selection
   * @param {string} themeName - The name of the theme to switch to
   */
  const handleThemeSelect = (themeName) => {
    // Don't do anything if clicking the already active theme
    if (themeName === currentTheme) {
      return;
    }
    
    // Update the theme through SessionContext
    setThemeExplicit(themeName);
  };
  
  return (
    <div className="w-full max-w-2xl">
      {/* Main container with terminal-style border */}
      <div className="border rounded bg-main border-primary p-2">
        {/* CHANGE: Replaced flexbox with a responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {themes.map((themeName) => {
            // Get the icon component for this theme
            const IconComponent = themeIcons[themeName] || Terminal;
            
            // Determine if this is the currently active theme
            const isActive = themeName === currentTheme;
            
            return (
              <button
                key={themeName}
                onClick={() => handleThemeSelect(themeName)}
                // Build dynamic classes based on active state
                // Active theme gets prominent border and background (similar to Tabs component)
                // Inactive themes are more subtle but still clickable
                className={`
                  flex items-center justify-center gap-2
                  px-3 py-2
                  rounded
                  border
                  transition-all duration-200
                  text-sm
                  font-mono
                  ${isActive 
                    ? 'bg-active border-primary text-primary opacity-100' 
                    : 'border-secondary text-secondary opacity-75 hover:opacity-100 hover:border-primary bg-hover'
                  }
                `}
                // Accessibility attributes
                aria-label={`Switch to ${themeNames[themeName]} theme`}
                aria-pressed={isActive}
              >
                {/* Theme icon with consistent sizing */}
                <IconComponent className="w-4 h-4" />
                
                {/* Theme name */}
                <span className="hidden sm:inline">
                  {themeNames[themeName]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}