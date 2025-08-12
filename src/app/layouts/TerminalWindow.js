'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft, Sun, Moon, X, Home, ArrowUp } from 'lucide-react';
import { getScreenDisplayName } from '../utils/formatters';

export default function TerminalWindow({ title, children }) {
   const { 
    theme, 
    toggleTheme, 
    goBack, 
    endSession, 
    currentScreen,
    navigationHistory,
    currentDomain,
    goHome,
    goUp,
    screenHierarchy,
    navigate
  } = useSession();

  const isBackDisabled = navigationHistory.length === 0 || currentScreen === 'Entry';
  const isUpDisabled = !screenHierarchy[currentScreen];
  const isHomeDisabled = currentScreen === 'MainHub' || currentScreen === 'Entry';

    let displayTitle = title; 

    if (currentScreen === 'MainHub' || currentScreen === 'Entry') {
      if (currentDomain?.includes('undevy')) {
        displayTitle = 'undevy_portfolio'; 
      } else {
        displayTitle = 'foxous_design';
      }
  }

  // WHY: We need to traverse up the hierarchy from current screen to build the full path
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

  const windowClasses = `w-full max-w-2xl border rounded ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;
  
  // WHY: Removed `flex-wrap` and `md:flex-nowrap`. The new layout is a single line on all screen sizes,
  // with `justify-between` pushing the title to the left and the controls to the right.
  const headerClasses = `flex items-center justify-between p-4 border-b ${
    theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  }`;
  
  // WHY: Removed all responsive `order` and `width` classes. Added `truncate` to ensure the title
  // shortens with '...' on small screens. `min-w-0` is crucial for `truncate` to work correctly in a flex container.
  const titleClasses = `font-normal text-lg truncate min-w-0 ${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;

  const handleClose = () => {
    if (currentScreen === 'Entry') {
      return;
    }
    endSession();
  };

  return (
    <div className={windowClasses}>
      <div className={headerClasses}>
        <h1 className={titleClasses}>${displayTitle}</h1>

        {/* 
          WHY: This creates a single, consistent block of controls on the right side of the header
          for both mobile and desktop views, as you requested. `flex-shrink-0` ensures this
          group of buttons does not shrink on smaller screens.
        */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* WHY: These screens are entry points and should not have standard navigation controls */}
          {/* like 'Back', 'Up', or 'Home', providing a cleaner user experience. */}
          {!['ProfileBoot', 'Entry'].includes(currentScreen) && (
            <>
          <Button
            onClick={goBack}
            icon={() => <ArrowLeft size={20} strokeWidth={1.5} />}
            variant="icon-only"
            className={`p-1 ${isBackDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isBackDisabled}
            aria-label="Go back"
          />
          <Button
            onClick={goUp}
            icon={() => <ArrowUp size={20} strokeWidth={1.5} />}
            variant="icon-only"
            className={`p-1 ${isUpDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUpDisabled}
            aria-label="Go up one level"
          />
          <Button
            onClick={goHome}
            icon={() => <Home size={20} strokeWidth={1.5} />}
            variant="icon-only"
            className={`p-1 ${isHomeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isHomeDisabled}
            aria-label="Go to Main Hub"
          />
            </>
          )}
          <Button
            onClick={toggleTheme}
            icon={() => theme === 'dark' 
              ? <Sun size={20} strokeWidth={1.5} /> 
              : <Moon size={20} strokeWidth={1.5} />
            }
            variant="icon-only"
            className="p-1"
            aria-label="Toggle theme"
          />
          {currentScreen !== 'Entry' && (
            <Button
              onClick={handleClose}
              icon={() => <X size={20} strokeWidth={1.5} />}
              variant="icon-only"
              className="p-1"
              aria-label="Close session"
            />
          )}
        </div>

      </div>

      {/* WHY: The 'Entry' screen is the main entry point and does not have a navigation path to display. */}
      {!['ProfileBoot', 'Entry'].includes(currentScreen) && breadcrumbPath.length > 0 && (
        <div className={`px-4 py-2 text-sm border-b ${
          theme === 'dark' ? 'border-dark-border bg-dark-bg/50' : 'border-light-border bg-light-bg/50'
        }`}>
          <div className="flex items-center flex-wrap">
            {breadcrumbPath.map((screen, index) => (
              <span key={screen} className="flex items-center">
                {index > 0 && (
                  <span className={`mx-2 ${
                    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    &gt;
                  </span>
                )}
                {index === breadcrumbPath.length - 1 ? (
                  // Current screen - not clickable, highlighted
                  <span className={
                    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }>
                    {getScreenDisplayName(screen)}
                  </span>
                ) : (
                  // Parent screens - clickable
                  <button
                    onClick={() => navigate(screen)}
                    className={`hover:underline ${
                      theme === 'dark' ? 'text-dark-text-secondary hover:text-dark-text-primary' : 
                      'text-light-text-secondary hover:text-light-text-primary'
                    }`}
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
