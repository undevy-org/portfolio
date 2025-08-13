'use client';

import { useSession } from '../context/SessionContext';
import Panel from './ui/Panel';
import PanelTitle from './ui/PanelTitle';

export default function AnalyticsPanel() {
  const { 
    sessionData, 
    currentScreen, 
    navigationHistory,
    navigate,
    screensVisitedCount,
    setNavigationHistory 
  } = useSession();

  // WHY: The ProfileBoot screen is a transitional state before the main interface is shown,
  // and displaying analytics here is premature and clutters the view.
  if (!sessionData || currentScreen === 'ProfileBoot') {
    return null;
  }

  const handlePathClick = (screen, index) => {
    const newHistory = navigationHistory.slice(0, index);
    setNavigationHistory(newHistory);
    navigate(screen, false);
  };

  return (
    <Panel className="w-full max-w-2xl p-3 text-sm bg-opacity-90">
      <PanelTitle>$analytics</PanelTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <div>
          <span className="value-primary text-sm mr-2">$company:</span>
          <span className="key-label">{sessionData.meta?.company}</span>
        </div>
        
        <div>
          <span className="value-primary text-sm mr-2">$access_level:</span>
          <span className="key-label">{sessionData.meta?.depth || 'standard'}</span>
        </div>

        <div>
          <span className="value-primary text-sm mr-2">$access_method:</span>
          <span className="key-label">{sessionData.meta?.accessMethod || 'Code'}</span>
        </div>

        {sessionData.isWeb3User ? (
          <div>
            <span className="value-primary text-sm mr-2">$wallet_address:</span>
            <span className="key-label">
              {sessionData.walletAddress.slice(0, 6)}...{sessionData.walletAddress.slice(-4)}
            </span>
          </div>
        ) : (
          <div>
            <span className="value-primary text-sm mr-2">$access_code:</span>
            <span className="key-label">{sessionData.accessCode}</span>
          </div>
        )}

        <div>
          <span className="value-primary text-sm mr-2">$current_screen:</span>
          <span className="key-label">{currentScreen}</span>
        </div>
        
        <div>
          <span className="value-primary text-sm mr-2">$screens_visited:</span>
          <span className="key-label">{screensVisitedCount}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-light-border-lighter dark:border-dark-border-darker">

        <PanelTitle>$session_trace</PanelTitle>
        
        <div className="text-sm flex items-center flex-wrap">
          {navigationHistory.length > 0 ? (
            <>
              {navigationHistory.map((screen, index) => (
                <span key={index} className="flex items-center">
                  <span className="key-label mr-1">[{index}]</span>
                    <button
                    onClick={() => handlePathClick(screen, index)}
                      className="key-label hover:underline"
                    >
                      {screen}
                    </button>
                  <span className="key-label mx-2">→</span>
                  </span>
              ))}
              
              <span className="flex items-center">
                <span className="key-label mr-1">[{navigationHistory.length}]</span>
              <PanelTitle>{currentScreen}</PanelTitle>
              </span>
            </>
          ) : (
            <>
              <span className="key-label mr-1">[0]</span>
            <PanelTitle>{currentScreen}</PanelTitle>
            </>
          )}
        </div>
      </div>
    </Panel>
  );
}
