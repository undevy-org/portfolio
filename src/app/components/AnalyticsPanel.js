// src/app/components/AnalyticsPanel.js
'use client';

import { useSession } from '../context/SessionContext';

export default function AnalyticsPanel() {
  const { 
    sessionData, 
    theme, 
    currentScreen, 
    navigationHistory,
    navigate,
    screensVisitedCount,
    setNavigationHistory 
  } = useSession();

  // Don't render if no session data
  if (!sessionData) {
    return null;
  }

  const panelClasses = `w-full max-w-2xl border rounded p-3 text-sm ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;
  
  const labelClasses = `${
    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
  }`;

    const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;
  
  const secondaryClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;

  const handlePathClick = (screen, index) => {
    // Update navigation history to only include screens up to the clicked one
    const newHistory = navigationHistory.slice(0, index);
    setNavigationHistory(newHistory);
    navigate(screen, false);
  };

  return (
    <div className={panelClasses}>
      <h2 className={`text-base mb-2 ${yellowClasses}`}>$analytics</h2>
      {/* MODIFIED: Layout is now responsive. Switches from single-line to grid on medium screens. */}
      <div className="space-y-1 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-1 md:space-y-0">
        <div>
          <span className={`${labelClasses} mr-2`}>$company:</span>
          <span className={valueClasses}>{sessionData.meta?.company || sessionData.company}</span>
        </div>

        <div>
          <span className={`${labelClasses} mr-2`}>$access_level:</span>
          <span className={valueClasses}>{sessionData.meta?.depth || sessionData.access_level || 'standard'}</span>
        </div>

        <div>
          <span className={`${labelClasses} mr-2`}>$current_screen:</span>
          <span className={valueClasses}>{currentScreen}</span>
        </div>
        
        <div>
          <span className={`${labelClasses} mr-2`}>$screens_visited:</span>
          <span className={valueClasses}>{screensVisitedCount}</span>
        </div>
      </div>
      
      {/* Navigation Path / Breadcrumbs */}
      <div className={`mt-4 pt-3 border-t ${
        theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
      }`}>

        <h3 className={`text-base mb-2 ${yellowClasses}`}>$navigation_path:</h3>
        
        <div className={`text-sm flex items-center flex-wrap`}>
          {navigationHistory.length > 0 ? (
            <>
              {navigationHistory.slice(-3).map((screen, index) => {
                const actualIndex = navigationHistory.indexOf(screen);
                return (
                  <span key={index}>
                    <button
                      onClick={() => handlePathClick(screen, actualIndex)}
                      className={`${secondaryClasses} hover:underline`}
                    >
                      {screen}
                    </button>
                    <span className={`mx-1 ${labelClasses}`}>{'>'}</span>
                  </span>
                );
              })}
              
              <span className={yellowClasses}>{currentScreen}</span>
            </>
          ) : (
            <span className={yellowClasses}>{currentScreen}</span>
          )}
        </div>
      </div>
    </div>
  );
}
