// src/app/screens/AccessManager.js
'use client';

import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import SystemLog from '../components/SystemLog';
import Button from '../components/ui/Button';
import { Home, ChevronRight, Shield, Key, Users } from 'lucide-react';

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
    if (!code) return; // Don't do anything for codes without value (like Demo Mode)
    
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
    <ScreenWrapper>
      {/* Master Codes Section */}
      {masterCodes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-command" />
            <h3 className="text-sm uppercase tracking-wider text-command">Master Access</h3>
          </div>
          <div className="space-y-3">
            {masterCodes.map((code, index) => (
              <div
                key={`master-${index}`}
                className="w-full p-4 text-left border rounded transition-colors border-secondary bg-main"
              >
                <div className="hidden md:grid grid-cols-[auto,1fr] items-start w-full gap-x-3">
                  <span className="mt-1 text-command">
                    [M{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div>
                    <div className="text-lg font-mono text-success">
                      {code.code}
                    </div>
                    <div className="text-sm opacity-80 text-secondary">
                      {code.label}
                    </div>
                    <div className="text-xs mt-1 text-secondary">
                      {code.description}
                    </div>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-lg font-mono text-success">
                      {code.code}
                    </span>
                    <span className="mt-1 text-sm text-command">
                      [M{String(index + 1).padStart(2, '0')}]
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-secondary">{code.label}</div>
                  <div className="mt-1 text-xs text-secondary">
                    {code.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Codes Section */}
      {specialCodes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-4 h-4 text-command" />
            <h3 className="text-sm uppercase tracking-wider text-command">Special Access</h3>
          </div>
          <div className="space-y-3">
            {specialCodes.map((code, index) => (
              <button
                key={`special-${index}`}
                onClick={() => handleCodeClick(code.code)}
                disabled={!code.code}
                className={`w-full p-4 text-left border rounded transition-colors relative ${
                  code.code 
                    ? "border-secondary bg-hover hover:border-primary cursor-pointer" 
                    : "border-secondary bg-main opacity-60 cursor-default"
                }`}
              >
                <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
                  <span className="mt-1 text-command">
                    [S{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div>
                    <div className="text-lg font-mono text-command">
                      {code.code || '[NO CODE REQUIRED]'}
                    </div>
                    <div className="text-sm opacity-80 text-secondary">
                      {code.label}
                    </div>
                    <div className="text-xs mt-1 text-secondary">
                      Type: {code.type} • {code.description}
                    </div>
                  </div>
                  {code.code && <ChevronRight className="w-5 h-5 mt-1 text-secondary" />}
                </div>
                <div className="md:hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-lg font-mono text-command">
                      {code.code || '[NO CODE]'}
                    </span>
                    <span className="mt-1 text-sm text-command">
                      [S{String(index + 1).padStart(2, '0')}]
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-secondary">{code.label}</div>
                  <div className="mt-1 text-xs text-secondary">
                    Type: {code.type} • {code.description}
                  </div>
                  {code.code && <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-secondary" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Codes Section */}
      {userCodes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-command" />
            <h3 className="text-sm uppercase tracking-wider text-command">User Codes [{userCodes.length}]</h3>
          </div>
          <div className="space-y-3">
            {userCodes.map((code, index) => (
              <button
                key={`user-${index}`}
                onClick={() => handleCodeClick(code.code)}
                className="w-full p-4 text-left border rounded transition-colors relative border-secondary bg-hover hover:border-primary"
              >
                <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
                  <span className="mt-1 text-command">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div>
                    <div className="text-lg font-mono text-command">
                      {code.code}
                    </div>
                    <div className="text-sm opacity-80 text-secondary">
                      {code.label}
                    </div>
                    <div className="text-xs mt-1 text-secondary">
                      {code.email && <span>{code.email}</span>}
                      {code.email && code.telegram && <span> • </span>}
                      {code.telegram && <span>{code.telegram}</span>}
                      {!code.email && !code.telegram && <span>No contact info</span>}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 mt-1 text-secondary" />
                </div>
                <div className="md:hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-lg font-mono text-command">
                      {code.code}
                    </span>
                    <span className="mt-1 text-sm text-command">
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-secondary">{code.label}</div>
                  <div className="mt-1 text-xs text-secondary">
                    {code.email && <span>{code.email}</span>}
                    {code.email && code.telegram && <span> • </span>}
                    {code.telegram && <span>{code.telegram}</span>}
                    {!code.email && !code.telegram && <span>No contact info</span>}
                  </div>
                  <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-secondary" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex mt-5 flex-col md:flex-row gap-3">
        <Button
          onClick={handleProceed}
          icon={Home}
          iconPosition="left"
          variant="flex"
        >
          PROCEED TO MAIN HUB
        </Button>
      </div>

      {/* System Log */}
      <SystemLog />
    </ScreenWrapper>
  );
}