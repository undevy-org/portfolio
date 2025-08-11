// src/app/page.js
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from './context/SessionContext';
import ScreenRenderer from './components/ScreenRenderer';

function AppContent() {
  const searchParams = useSearchParams();
  const { sessionData, setSessionData, navigate, addLog, endSession, setAuthError } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const code = searchParams.get('code');

    if (sessionData && code && code !== sessionData.accessCode) {
      addLog(`SESSION SWITCH: New code detected. Old: ${sessionData.accessCode}, New: ${code}. Terminating old session.`);
      // Terminate the current session completely before starting a new one.
      // This is a critical step to ensure a clean state for the new authentication.
      endSession(); 
      // By calling endSession(), we trigger a re-render where sessionData becomes null,
      // which then allows the authentication logic below to run for the new code.
      return; 
    }

    // If we are already authenticated and the code hasn't changed, do nothing.
    if (sessionData) {
      setIsLoading(false);
      return;
    }
    
    const authenticateWithCode = async (accessCode) => {
      // Prevent authentication attempt with an empty code.
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
    
    // We only need to run authentication if a code is present and there's no active session.
    if (code) {
      authenticateWithCode(code);
    } else {
      // No code in URL, and no session, so just show the entry screen.
      setIsLoading(false);
      navigate('Entry', false);
    }

  }, [searchParams, sessionData, setSessionData, navigate, addLog, setAuthError, endSession]);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8">
        <div className="text-dark-text-primary">AUTHENTICATING...</div>
      </div>
    );
  }
  
  return <ScreenRenderer />;
}

export default function Home() {
  return (
    // Suspense is necessary because useSearchParams is a client-side hook.
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}
