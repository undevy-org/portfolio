// src/app/screens/AccessManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import SystemLog from '../components/SystemLog';
import Button from '../components/ui/Button';
import { Home, Copy, ExternalLink } from 'lucide-react';

export default function AccessManager() {
  const { sessionData, navigate, addLog, setSessionData } = useSession();

  // Prevent navigation away from this screen using browser back button
  useEffect(() => {
    const handlePopState = () => {
      // When user tries to go back, redirect to MainHub
      navigate('MainHub', false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const handleProceed = () => {
    navigate('MainHub', false); // false means don't add to history
  };

  // Function to simulate access with a specific code
  const handleCodeClick = async (code) => {
    try {
      addLog(`ACCESS SIMULATION: Using code ${code}`);
      
      // Make API call to authenticate with this code
      const response = await fetch(`/api/session?code=${code}`);
      
      if (response.ok) {
        const userData = await response.json();
        
        // Set session data with the authenticated user's data
        const enrichedData = {
          ...userData,
          accessCode: code
        };
        
        setSessionData(enrichedData);
        addLog(`ACCESS GRANTED: Viewing portfolio for ${userData.meta?.company || code}`);
        
        // Navigate to ProfileBoot to start the user experience
        navigate('ProfileBoot', false);
      } else {
        const errorData = await response.json();
        addLog(`ACCESS DENIED: ${errorData.error || 'Invalid code'}`);
      }
    } catch (error) {
      addLog(`ACCESS ERROR: ${error.message}`);
    }
  };

  // Extract codes from session data
  const masterCodes = sessionData?.codes?.master || [];
  const specialCodes = sessionData?.codes?.special || [];
  const userCodes = sessionData?.codes?.user || [];

  return (
    <ScreenWrapper 
      title="SYSTEM ACCESS CODES" 
      subtitle="Administrative Access Panel"
      icon="🔐"
    >
      <div className="space-y-6">
        {/* Master Code Section */}
        <div className="terminal-section">
          <h3 className="terminal-heading">MASTER ACCESS</h3>
          <div className="terminal-divider"></div>
          <div className="space-y-2">
            {masterCodes.map((code, index) => (
              <div key={index} className="terminal-grid grid-cols-3 gap-4">
                <div className="font-mono font-bold text-command">{code.code}</div>
                <div className="text-secondary">{code.label}</div>
                <div className="text-tertiary text-sm">{code.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Codes Section */}
        <div className="terminal-section">
          <h3 className="terminal-heading">SPECIAL CODES</h3>
          <div className="terminal-divider"></div>
          <div className="space-y-2">
            {specialCodes.map((code, index) => (
              <button 
                key={index} 
                onClick={() => handleCodeClick(code.code)}
                className="terminal-grid grid-cols-3 gap-4 w-full text-left hover:bg-hover p-2 rounded transition-colors"
                disabled={!code.code} // Disable demo mode entry which has null code
              >
                <div className="font-mono font-bold text-command flex items-center gap-2">
                  {code.code || '[none]'}
                  {code.code && <ExternalLink className="w-4 h-4" />}
                </div>
                <div className="text-secondary">{code.label}</div>
                <div className="text-tertiary text-sm">{code.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* User Codes Section */}
        <div className="terminal-section">
          <h3 className="terminal-heading">USER CODES</h3>
          <div className="terminal-divider"></div>
          <div className="space-y-2">
            {userCodes.map((code, index) => (
              <button 
                key={index} 
                onClick={() => handleCodeClick(code.code)}
                className="terminal-grid grid-cols-3 gap-4 w-full text-left hover:bg-hover p-2 rounded transition-colors"
              >
                <div className="font-mono font-bold text-command flex items-center gap-2">
                  {code.code}
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="text-secondary">{code.label}</div>
                <div className="text-tertiary text-sm">
                  {code.email && `${code.email}`}
                  {code.telegram && ` ${code.telegram}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            onClick={handleProceed}
            icon={Home}
            className="w-full"
          >
            PROCEED TO MAIN HUB
          </Button>
        </div>

        {/* System Log */}
        <SystemLog />
      </div>
    </ScreenWrapper>
  );
}