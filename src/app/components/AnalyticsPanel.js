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

  // MODIFICATION: Do not render on the ProfileBoot screen.
  // WHY: The ProfileBoot screen is a transitional state before the main interface is shown,
  // and displaying analytics here is premature and clutters the view.
  if (!sessionData || currentScreen === 'ProfileBoot') {
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
      {/* MODIFIED: Layout is now responsive and element order is corrected. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {/* 1. Company */}
        <div>
          <span className={`${labelClasses} mr-2`}>$company:</span>
          <span className={valueClasses}>{sessionData.meta?.company}</span>
        </div>
        
        {/* 2. Access Level */}
        <div>
          <span className={`${labelClasses} mr-2`}>$access_level:</span>
          <span className={valueClasses}>{sessionData.meta?.depth || 'standard'}</span>
        </div>

        {/* 3. Access Method */}
        <div>
          <span className={`${labelClasses} mr-2`}>$access_method:</span>
          <span className={valueClasses}>{sessionData.meta?.accessMethod || 'Code'}</span>
        </div>

        {/* 4. Access Code or Wallet */}
        {sessionData.isWeb3User ? (
          <div>
            <span className={`${labelClasses} mr-2`}>$wallet_address:</span>
            <span className={valueClasses}>
              {sessionData.walletAddress.slice(0, 6)}...{sessionData.walletAddress.slice(-4)}
            </span>
          </div>
        ) : (
          <div>
            <span className={`${labelClasses} mr-2`}>$access_code:</span>
            <span className={valueClasses}>{sessionData.accessCode}</span>
          </div>
        )}

        {/* 5. Current Screen */}
        <div>
          <span className={`${labelClasses} mr-2`}>$current_screen:</span>
          <span className={valueClasses}>{currentScreen}</span>
        </div>
        
        {/* 6. Screens Visited */}
        <div>
          <span className={`${labelClasses} mr-2`}>$screens_visited:</span>
          <span className={valueClasses}>{screensVisitedCount}</span>
        </div>
      </div>
      
      {/* Navigation Path / Breadcrumbs */}
      <div className={`mt-4 pt-3 border-t ${
        theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
      }`}>

        {/* CHANGE: Renamed from $navigation_path to $session_trace to reflect temporal nature */}
        <h3 className={`text-base mb-2 ${yellowClasses}`}>$session_trace</h3>
        
        {/* MODIFIED: Wrapped in flex-wrap for better mobile handling */}
        <div className="text-sm flex items-center flex-wrap">
          {navigationHistory.length > 0 ? (
            <>
              {navigationHistory.map((screen, index) => (
                <span key={index} className="flex items-center">
                  {/* CHANGE: Added index prefix to show this is a sequential log */}
                  <span className={`${secondaryClasses} mr-1`}>[{index}]</span>
                    <button
                    onClick={() => handlePathClick(screen, index)}
                      className={`${secondaryClasses} hover:underline`}
                    >
                      {screen}
                    </button>
                  {/* CHANGE: Replaced '>' with '→' to avoid breadcrumb confusion */}
                  <span className={`mx-2 ${secondaryClasses}`}>→</span>
                  </span>
              ))}
              
              {/* CHANGE: Added index to current screen for consistency */}
              <span className="flex items-center">
                <span className={`${secondaryClasses} mr-1`}>[{navigationHistory.length}]</span>
              <span className={yellowClasses}>{currentScreen}</span>
              </span>
            </>
          ) : (
            <>
              {/* CHANGE: Added [0] prefix even for the initial screen */}
              <span className={`${secondaryClasses} mr-1`}>[0]</span>
            <span className={yellowClasses}>{currentScreen}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
