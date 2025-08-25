// src/app/layouts/TerminalWindow.js
'use client';

import { memo, useMemo, useCallback } from 'react';
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

function TerminalWindow({ 
  title, 
  children, 
  fixedHeight = false  // NEW PROP: Controls whether to use fixed height mode
}) {
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
    domainData,
    sessionData
  } = useSession();

  // Memoize navigation button states to prevent recalculation on every render
  const navigationStates = useMemo(() => ({
    isBackDisabled: navigationHistory.length === 0 || currentScreen === 'Entry',
    isUpDisabled: !screenHierarchy[currentScreen],
    isHomeDisabled: currentScreen === 'MainHub' || currentScreen === 'Entry'
  }), [navigationHistory.length, currentScreen, screenHierarchy]);

  // Extract individual states for cleaner code
  const { isBackDisabled, isUpDisabled, isHomeDisabled } = navigationStates;

  // Memoize display title calculation to prevent unnecessary recalculations
  const displayTitle = useMemo(() => {
    if (currentScreen === 'MainHub' || currentScreen === 'Entry') {
      return domainData?.terminalTitle || 'portfolio'; // Fallback to generic 'portfolio' if not configured
    }
    return title;
  }, [title, currentScreen, domainData?.terminalTitle]);

  // Memoize breadcrumb path calculation to prevent rebuilding on every render
  const breadcrumbPath = useMemo(() => {
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
  }, [currentScreen, screenHierarchy]);

  // Memoize event handlers to prevent child component re-renders
  const handleClose = useCallback(() => {
    if (currentScreen === 'Entry') {
      return;
    }
    endSession();
  }, [currentScreen, endSession]);

  // Memoize theme icons dictionary and current icon selection
  const themeIcons = useMemo(() => ({
    dark: Sun,     
    light: Terminal,     
    amber: Bug,
    bsod: Waves,
    synthwave: HardDrive,
    operator: LayoutDashboard,
    kyoto: SlidersHorizontal,
    radar: Moon,
  }), []);

  const CurrentThemeIcon = useMemo(() => 
    themeIcons[theme] || Sun, 
    [theme, themeIcons]
  );

  // Memoize CSS classes to prevent string concatenation on every render
  const containerClasses = useMemo(() => `
    w-full 
    max-w-2xl 
    border 
    rounded 
    bg-main 
    border-primary
    ${fixedHeight ? 
      // Fixed height mode: Become a flex container that fills parent
      'h-full flex flex-col' : 
      // Standard mode: Normal flow, grow with content
      ''
    }
  `, [fixedHeight]);

  const contentClasses = useMemo(() => `
  ${fixedHeight ? 
    'flex-1 overflow-y-auto md:overflow-y-scroll min-h-0' : 
    ''
    }
  `, [fixedHeight]);

  return (
    <div className={containerClasses}>
      {/* HEADER SECTION - Always visible when not on Entry/ProfileBoot */}
      {!['Entry', 'ProfileBoot'].includes(currentScreen) && (
        <div className="flex items-center justify-between p-4 border-b border-primary flex-shrink-0">
          {/* flex-shrink-0 ensures header doesn't shrink when content is large */}
          <h1 className="font-normal text-lg truncate min-w-0 text-command">
            ${displayTitle}
          </h1>
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

      {/* BREADCRUMBS - Also stays fixed, doesn't scroll with content */}
      {!['ProfileBoot', 'Entry'].includes(currentScreen) && breadcrumbPath.length > 0 && (
        <div 
          className="px-4 py-2 text-sm border-b border-primary flex-shrink-0" 
          style={{ backgroundColor: 'var(--color-hover)' }}
        >
          <div className="flex items-center flex-wrap">
            {breadcrumbPath.map((screen, index) => (
              <span key={screen} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-secondary">&gt;</span>
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

      {/* DEMO MODE BANNER - Also fixed, doesn't scroll */}
      {sessionData?.isDemoMode && !['Entry', 'ProfileBoot'].includes(currentScreen) && (
        <div className="px-4 py-2 bg-hover border-b border-secondary flex-shrink-0">
          <div className="text-xs text-command">
            DEMO MODE - This is example content. Get your personalized access code via Telegram.
          </div>
        </div>
      )}

      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
}

// Wrap with React.memo with custom comparison function to prevent unnecessary re-renders
// This ensures TerminalWindow only re-renders when props actually change
export default memo(TerminalWindow, (prevProps, nextProps) => {
  // Only re-render if title, children, or fixedHeight props change
  return (
    prevProps.title === nextProps.title &&
    prevProps.children === nextProps.children &&
    prevProps.fixedHeight === nextProps.fixedHeight
  );
});