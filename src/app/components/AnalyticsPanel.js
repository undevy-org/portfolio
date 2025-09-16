// src/app/components/AnalyticsPanel.js
'use client';

import { useSession } from '../context/SessionContext';
import { CommandTitle, Divider } from '../components/atoms';
import { LabelValuePair } from '../components/molecules';

export default function AnalyticsPanel() {
  const { 
    sessionData, 
    currentScreen, 
    navigationHistory,
    navigate,
    screensVisitedCount,
    setNavigationHistory 
  } = useSession();

  if (!sessionData || currentScreen === 'ProfileBoot') {
    return null;
  }

  const handlePathClick = (screen, index) => {
    // Update navigation history to only include screens up to the clicked one
    const newHistory = navigationHistory.slice(0, index);
    setNavigationHistory(newHistory);
    navigate(screen, false);
  };

  return (
    <div className="w-full max-w-2xl border rounded p-3 text-sm bg-main border-primary">

      <CommandTitle text="analytics" level="h2" className="mb-2" />
      <LabelValuePair label="$company" value={sessionData.meta?.company} responsive />
      <LabelValuePair label="$access_level" value={sessionData.meta?.depth || 'standard'} responsive />
      <LabelValuePair label="$access_method" value={sessionData.meta?.accessMethod || 'Code'} responsive />
      {sessionData.isWeb3User ? (
        <LabelValuePair
          label="$wallet_address"
          value={`${sessionData.walletAddress.slice(0, 6)}...${sessionData.walletAddress.slice(-4)}`}
          responsive
        />
      ) : (
        <LabelValuePair label="$access_code" value={sessionData.accessCode} responsive />
      )}
      <LabelValuePair label="$current_screen" value={currentScreen} responsive />
      <LabelValuePair label="$screens_visited" value={screensVisitedCount} responsive />
      
      <Divider spacing="my-4" />
      
      {/* Navigation Path / Breadcrumbs */}
      <div className="mt-4 pt-3">

        <CommandTitle text="session_trace" level="h3" className="mb-2" />
        
        <div className="text-sm flex items-center flex-wrap">
          {navigationHistory.length > 0 ? (
            <>
              {navigationHistory.map((screen, index) => (
                <span key={index} className="flex items-center">
                  <span className="text-secondary mr-1">[{index}]</span>
                    <button
                    onClick={() => handlePathClick(screen, index)}
                      className="text-secondary hover:underline hover:text-primary"
                    >
                      {screen}
                    </button>
                  <span className="mx-2 text-secondary">→</span>
                  </span>
              ))}
              
              <span className="flex items-center">
                <span className="text-secondary mr-1">[{navigationHistory.length}]</span>
              <span className="text-command">{currentScreen}</span>
              </span>
            </>
          ) : (
            <>
              <span className="text-secondary mr-1">[0]</span>
            <span className="text-command">{currentScreen}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
