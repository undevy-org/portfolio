// src/app/layouts/TerminalWindow.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  X, 
  Home, 
  ArrowUp, 
  Bug, 
  Terminal, 
  Waves, 
  HardDrive, 
  LayoutDashboard, 
  SlidersHorizontal
} from 'lucide-react';
import { getScreenDisplayName } from '../utils/formatters';

export default function TerminalWindow({ title, children }) {
   const { 
    theme, 
    toggleTheme, 
    goBack, 
    endSession, 
    currentScreen,
    navigationHistory,
    goHome,
    goUp,
    screenHierarchy,
    navigate,
    domainData
  } = useSession();

  const isBackDisabled = navigationHistory.length === 0 || currentScreen === 'Entry';
  const isUpDisabled = !screenHierarchy[currentScreen];
  const isHomeDisabled = currentScreen === 'MainHub' || currentScreen === 'Entry';

    let displayTitle = title; 

    if (currentScreen === 'MainHub' || currentScreen === 'Entry') {
      displayTitle = domainData?.terminalTitle || 'portfolio'; // Fallback to generic 'portfolio' if not configured
  }

  const buildBreadcrumbPath = () => {
    const path = [];
    let current = currentScreen;
    
    // Don't show breadcrumbs on Entry screen
    if (current === 'Entry') return [];
    
    // Build path from current screen up to MainHub
    while (current && current !== 'MainHub') {
      path.unshift(current);
      current = screenHierarchy[current];
    }
    
    // Add MainHub at the beginning if we have any path
    if (path.length > 0 || currentScreen === 'MainHub') {
      path.unshift('MainHub');
    }
    
    return path;
  };

  const breadcrumbPath = buildBreadcrumbPath();

  const handleClose = () => {
    if (currentScreen === 'Entry') {
      return;
    }
    endSession();
  };

  // Dictionary of icons for themes
  // Each theme has a dedicated icon for better UX
  const themeIcons = {
    dark: Sun,     
    light: Bug,     
    amber: Terminal,
    bsod: Waves,
    synthwave: HardDrive,
    operator: LayoutDashboard,
    kyoto: SlidersHorizontal,
    radar: Moon,
  };

const CurrentThemeIcon = themeIcons[theme] || Sun;

  return (
    <div className="w-full max-w-2xl border rounded bg-main border-primary">
      {!['Entry', 'ProfileBoot'].includes(currentScreen) && (
      <div className="flex items-center justify-between p-4 border-b border-primary">
        <h1 className="font-normal text-lg truncate min-w-0 text-command">${displayTitle}</h1>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!['ProfileBoot', 'Entry'].includes(currentScreen) && (
            <>
          <Button
            onClick={goBack}
            icon={ArrowLeft}
            variant="icon-only"
            className={`p-1 ${isBackDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isBackDisabled}
            aria-label="Go back"
          />
          <Button
            onClick={goUp}
            icon={ArrowUp}
            variant="icon-only"
            className={`p-1 ${isUpDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUpDisabled}
            aria-label="Go up one level"
          />
          <Button
            onClick={goHome}
            icon={Home}
            variant="icon-only"
            className={`p-1 ${isHomeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isHomeDisabled}
            aria-label="Go to Main Hub"
          />
            </>
          )}
          <Button
            onClick={toggleTheme}
            icon={CurrentThemeIcon}
            variant="icon-only"
            className="p-1"
            aria-label="Toggle theme"
          />
          {!['Entry', 'ProfileBoot'].includes(currentScreen) && (
            <Button
              onClick={handleClose}
              icon={X}
              variant="icon-only"
              className="p-1"
              aria-label="Close session"
            />
          )}
        </div>

      </div>
      )}

      {!['ProfileBoot', 'Entry'].includes(currentScreen) && breadcrumbPath.length > 0 && (
        <div className="px-4 py-2 text-sm border-b border-primary" style={{ backgroundColor: 'var(--color-hover)' }}>
          <div className="flex items-center flex-wrap">
            {breadcrumbPath.map((screen, index) => (
              <span key={screen} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-secondary">
                    &gt;
                  </span>
                )}
                {index === breadcrumbPath.length - 1 ? (
                  // Current screen - not clickable, highlighted
                  <span className="text-primary">
                    {getScreenDisplayName(screen)}
                  </span>
                ) : (
                  <button
                    onClick={() => navigate(screen)}
                    className="text-secondary hover:text-primary hover:underline"
                  >
                    {getScreenDisplayName(screen)}
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        {children}
      </div>
    </div>
  );
}
