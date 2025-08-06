// src/app/screens/Entry.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/navigation';
import { MessageSquare, Wallet } from 'lucide-react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';

export default function Entry() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [web3Status] = useState('idle'); 
  const { theme, addLog, currentDomain, domainData, authError, setAuthError, setSessionData, navigate } = useSession();
  const router = useRouter();
  
  const { open } = useAppKit();
  const { address, isConnected } = useAccount(); 
  // Use disconnectAsync for better control over the disconnection process
  const { disconnectAsync } = useDisconnect(); 

  const isLoggingOut = useRef(false);
  
  useEffect(() => {
    const handleWeb3Success = async (walletAddress) => {
      console.log('handleWeb3Success called, isLoggingOut:', isLoggingOut.current);
      // Check the ref value directly to prevent re-authentication during logout
      if (isLoggingOut.current) {
        addLog('WEB3 LOGIN: Skipped - logout in progress');
        return;
      }
      
      addLog(`WEB3 CONNECTED: ${walletAddress}`);
      
      try {
        const response = await fetch(`/api/session?code=0XDEFI2311`);
        if (response.ok) {
          const userData = await response.json();
          
          const web3SessionData = {
            ...userData,
            isWeb3User: true,
            walletAddress: walletAddress,
            meta: {
              ...userData.meta,
              company: `Web3 User: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
              accessMethod: 'web3'
            },

            profile: {
              ...userData.profile,
              greeting_name: 'Web3 User',
              summary: {
                ...userData.profile?.summary,
                title: 'Web3 Authenticated User',
                specialization: `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
                background: 'Decentralized Access'
              }
            }
          };
          
          setSessionData(web3SessionData);
          addLog(`WEB3 ACCESS GRANTED: ${walletAddress}`);
          navigate('MainHub', false);
          
          router.push(`/?web3=${walletAddress}`);
        } else {
          addLog('ERROR: Failed to create Web3 session');
          // Use disconnectAsync for consistency
          await disconnectAsync();
        }
      } catch (error) {
        addLog('ERROR: Web3 session creation failed');
        console.error('Web3 session error:', error);
        // Use disconnectAsync for consistency
        await disconnectAsync();
      }
    };
    
    // Ensure we only attempt authentication when connected, have an address, and are not logging out
    if (isConnected && address && !isLoggingOut.current) {
      handleWeb3Success(address);
    }
  }, [isConnected, address, addLog, setSessionData, navigate, router, disconnectAsync]);
  
  useEffect(() => {
    const handleWeb3LogoutRequest = async () => {
      // Set the logout flag immediately when the request is received
      isLoggingOut.current = true; 
      
      if (isConnected) {
        addLog('WEB3 LOGOUT: Starting disconnect process');
        
        try {
          // Use disconnectAsync and await its completion
          await disconnectAsync(); 
          addLog('WEB3 LOGOUT: Wallet disconnected successfully');
        } catch (error) {
          console.error('Error disconnecting wallet:', error);
          addLog('WEB3 LOGOUT: Error during disconnect');
        } 
        // Do not reset isLoggingOut here - wait for the state to update
      } else {
        // Even if not connected, ensure the flag is reset after a short delay
        // to handle edge cases
          setTimeout(() => {
            isLoggingOut.current = false;
        }, 100);
      }
    };
    
    window.addEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    
    return () => {
      window.removeEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    };
  }, [isConnected, disconnectAsync, addLog]);

  // Add a new effect to properly reset the isLoggingOut flag
  // after the wallet state has had time to update
  useEffect(() => {
    // When isConnected becomes false, it means disconnection is complete
    if (!isConnected) {
      const timer = setTimeout(() => {
        // Only reset if we were in a logout process
        if (isLoggingOut.current) {
          isLoggingOut.current = false;
          addLog('WEB3 LOGOUT: Process completed and lock released');
        }
      }, 100); // Small delay to ensure state consistency
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, addLog]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      addLog('ERROR: No access code provided');
      return;
    }

    setIsLoading(true);
    setAuthError(null); 
    addLog(`AUTHENTICATING: ${code}`);
    router.push(`/?code=${code}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const handleGetCode = () => {
    let telegramUrl;
    if (domainData?.telegram) {
      telegramUrl = domainData.telegram;
    } else if (currentDomain?.includes('undevy')) {
      telegramUrl = 'https://t.me/undevy';
    } else {
      telegramUrl = 'https://t.me/foxous';
    }
    
    addLog(`EXTERNAL LINK: Telegram ${telegramUrl}`);
    window.open(telegramUrl, '_blank');
  };

  const handleWeb3Login = () => {
  addLog('WEB3 LOGIN: Opening wallet connection');
  open();
};

  return (
    <div className="p-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}
        className={`w-full p-3 mb-3 rounded font-mono text-lg tracking-wider ${
          theme === 'dark' 
            ? 'bg-dark-input-bg text-dark-text-primary' 
            : 'bg-light-input-bg text-light-text-primary'
        } border ${
          authError
            ? (theme === 'dark' ? 'border-dark-error' : 'border-light-error')
            : (theme === 'dark' ? 'border-dark-border' : 'border-light-border')
        } ${
          authError ? 'animate-pulse' : ''
        }`}
        placeholder="ENTER ACCESS CODE"
        autoFocus
        disabled={isLoading || isConnected}
      />

      {authError && (
        <div className={`mb-3 text-sm ${
          theme === 'dark' ? 'text-dark-error' : 'text-light-error'
        }`}>
          {authError}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || isConnected}
        className={`w-full p-3 mb-3 border rounded transition-colors ${
          theme === 'dark'
            ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
            : 'border-light-border hover:bg-light-hover text-light-text-primary'
        } ${(isLoading || isConnected) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
      </button>

      <div className="flex gap-3">
      <button
        onClick={handleGetCode}
          disabled={isConnected}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
            : 'border-light-border hover:bg-light-hover text-light-text-primary'
          } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
          <MessageSquare className="w-4 h-4" />
        GET CODE
      </button>

        <button
          onClick={handleWeb3Login}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 transition-colors ${
            theme === 'dark'
              ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
              : 'border-light-border hover:bg-light-hover text-light-text-primary'
          } ${web3Status === 'coming-soon' ? 'opacity-50' : ''}`}
        >
          <Wallet className="w-4 h-4" />
          {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'WEB3 LOGIN'}
        </button>
      </div>
      
      {isConnected && (
        <div className={`mt-2 text-center text-xs ${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          Processing Web3 authentication...
        </div>
      )}
    </div>
  );
}