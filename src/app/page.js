// src/app/page.js
'use client';

import { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from './context/SessionContext';
import ScreenRenderer from './components/ScreenRenderer';
import TerminalWindow from './layouts/TerminalWindow';

function AppContent() {
  const searchParams = useSearchParams();
  const { 
    sessionData, 
    setSessionData, 
    navigate, 
    addLog, 
    endSession, 
    setAuthError,
    currentScreen,
    currentDomain,
    domainData
  } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate window title based on current screen
  // This logic was previously in ScreenRenderer
  const windowTitle = useMemo(() => {
    // For Entry and MainHub, use domain-specific title
    if (currentScreen === 'Entry' || currentScreen === 'MainHub') {
      // Priority: domainData > currentDomain > fallback
      if (domainData?.terminalTitle) {
        return domainData.terminalTitle;
      }
      if (currentDomain) {
        return `${currentDomain}_portfolio`;
      }
      return 'portfolio';
    }
    
    // For other screens, convert CamelCase to snake_case
    return currentScreen.replace(/([A-Z])/g, (match, p1, offset) => 
      offset > 0 ? '_' + p1.toLowerCase() : p1.toLowerCase()
    );
  }, [currentScreen, currentDomain, domainData]);
  
  useEffect(() => {
    const code = searchParams.get('code');

    // Handle session switching
    if (sessionData && code && code !== sessionData.accessCode) {
      addLog(`SESSION SWITCH: New code detected. Old: ${sessionData.accessCode}, New: ${code}. Terminating old session.`);
      endSession(); 
      return; 
    }

    // If already authenticated, stop loading
    if (sessionData) {
      setIsLoading(false);
      return;
    }
    
    // Authentication logic
    const authenticateWithCode = async (accessCode) => {
      if (!accessCode) {
        setIsLoading(false);
        navigate('Entry', false);
        return;
      }
      
      try {
        const response = await fetch(`/api/session?code=${accessCode}`);
        if (response.ok) {
          const userData = await response.json();

          const enrichedData = {
            ...userData,
            accessCode: accessCode
          };
          setSessionData(enrichedData);
          addLog(`ACCESS GRANTED: ${userData.meta?.company || 'Unknown Company'}`);
          navigate('ProfileBoot', false);
        } else {
          addLog(`ACCESS DENIED: Invalid code ${accessCode}`);
          setAuthError('Invalid access code. Please try again.');
          navigate('Entry', false);
        }
      } catch (error) {
        addLog(`ERROR: Failed to authenticate`);
        setAuthError('Connection error. Please try again.');
        navigate('Entry', false);
      }
      setIsLoading(false);
    };
    
    // Trigger authentication if code is present
    if (code) {
      authenticateWithCode(code);
    } else {
      setIsLoading(false);
      navigate('Entry', false);
    }

  }, [searchParams, sessionData, setSessionData, navigate, addLog, setAuthError, endSession]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8">
        <div className="text-primary">AUTHENTICATING...</div>
      </div>
    );
  }
  
  // CRITICAL: TerminalWindow is ALWAYS rendered here
  // It provides the stable container that doesn't get recreated
  // The existing TerminalWindow logic already handles hiding the header for Entry/ProfileBoot
  return (
    <TerminalWindow title={windowTitle}>
      <ScreenRenderer />
    </TerminalWindow>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}