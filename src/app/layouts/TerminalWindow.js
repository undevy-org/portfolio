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

  const windowClasses = `w-full max-w-2xl border rounded ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;

  const headerClasses = `flex items-center justify-between p-4 border-b ${
    "border-primary"
  }`;

  const titleClasses = `font-normal text-lg truncate min-w-0 ${
    "text-command"
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
        <div className="flex items-center gap-2 flex-shrink-0">
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

      {!['ProfileBoot', 'Entry'].includes(currentScreen) && breadcrumbPath.length > 0 && (
        <div className={`px-4 py-2 text-sm border-b ${
          theme === 'dark' ? 'border-dark-border bg-dark-bg/50' : 'border-light-border bg-light-bg/50'
        }`}>
          <div className="flex items-center flex-wrap">
            {breadcrumbPath.map((screen, index) => (
              <span key={screen} className="flex items-center">
                {index > 0 && (
                  <span className={`mx-2 ${
                    "text-secondary"
                  }`}>
                    &gt;
                  </span>
                )}
                {index === breadcrumbPath.length - 1 ? (
                  // Current screen - not clickable, highlighted
                  <span className={
                    "text-primary"
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
