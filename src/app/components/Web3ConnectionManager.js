// src/app/components/Web3ConnectionManager.js
'use client';

import { useEffect, useCallback } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/navigation';

/**
 * This component manages Web3 connection logic and authentication.
 * It's designed to be lazy-loaded and handles all Web3-specific operations.
 * 
 * This component MUST be rendered inside Web3Provider to access Web3 hooks.
 * It communicates with the Entry component through SessionContext.
 * 
 * The key insight: instead of trying to pass hooks around, this component
 * encapsulates all Web3 logic and communicates through context and callbacks.
 */
export default function Web3ConnectionManager({ 
  onConnectionChange,
  web3Status,
  onWeb3StatusChange 
}) {
  // Web3 hooks - used normally, no dynamic imports
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  
  // Context hooks
  const { 
    addLog, 
    setAuthError, 
    setSessionData,
    navigate,
    web3LogoutPending,
    setWeb3LogoutPending
  } = useSession();
  
  const router = useRouter();
  
  // Handle wallet connection changes
  useEffect(() => {
    if (onConnectionChange) {
      onConnectionChange({
        address,
        isConnected,
        open,
        disconnectAsync
      });
    }
  }, [address, isConnected, open, disconnectAsync, onConnectionChange]);
  
  // Handle Web3 logout when requested
  useEffect(() => {
    if (web3LogoutPending && isConnected) {
      console.log('[Web3ConnectionManager] Processing logout request');
      
      const performDisconnect = async () => {
        try {
          await disconnectAsync();
          console.log('[Web3ConnectionManager] Wallet disconnected');
        } catch (error) {
          console.error('[Web3ConnectionManager] Disconnect error:', error);
        } finally {
          setWeb3LogoutPending(false);
        }
      };
      
      performDisconnect();
    }
  }, [web3LogoutPending, isConnected, disconnectAsync, setWeb3LogoutPending]);
  
  // Handle Web3 authentication when wallet connects
  useEffect(() => {
    if (isConnected && address && web3Status === 'connecting') {
      console.log('[Web3ConnectionManager] Wallet connected, authenticating...');
      
      const performAuth = async () => {
        try {
          const code = process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE || '0XDEFI2311';
          addLog(`WEB3 AUTH: Using code ${code}`);
          
          const response = await fetch(`/api/session?code=${code}`);
          
          if (response.ok) {
            const userData = await response.json();
            const enrichedData = {
              ...userData,
              accessCode: code,
              walletAddress: address
            };
            
            setSessionData(enrichedData);
            addLog(`WEB3 ACCESS GRANTED: ${userData.meta?.company || 'Unknown'}`);
            
            router.push('/');
            navigate('ProfileBoot', false);
            
            if (onWeb3StatusChange) {
              onWeb3StatusChange('connected');
            }
          } else {
            addLog('WEB3 ACCESS DENIED');
            setAuthError('Web3 authentication failed');
            
            if (onWeb3StatusChange) {
              onWeb3StatusChange('idle');
            }
            
            // Disconnect wallet after failed auth
            setTimeout(async () => {
              await disconnectAsync();
            }, 1000);
          }
        } catch (error) {
          console.error('[Web3ConnectionManager] Auth error:', error);
          addLog('WEB3 ERROR: Authentication failed');
          setAuthError('Connection error during Web3 auth');
          
          if (onWeb3StatusChange) {
            onWeb3StatusChange('idle');
          }
        }
      };
      
      performAuth();
    }
    
    // Handle wallet disconnection
    if (!isConnected && web3Status !== 'idle') {
      console.log('[Web3ConnectionManager] Wallet disconnected');
      if (onWeb3StatusChange) {
        onWeb3StatusChange('idle');
      }
    }
  }, [
    isConnected, 
    address, 
    web3Status, 
    addLog, 
    setAuthError, 
    setSessionData, 
    navigate, 
    router, 
    disconnectAsync,
    onWeb3StatusChange
  ]);
  
  // This component doesn't render anything
  return null;
}

/**
 * Placeholder component for when Web3 isn't loaded
 * Provides stub functions to prevent errors
 */
export function Web3ConnectionManagerPlaceholder({ onConnectionChange }) {
  useEffect(() => {
    if (onConnectionChange) {
      onConnectionChange({
        address: null,
        isConnected: false,
        open: () => {
          console.log('[Placeholder] Cannot open - Web3 not loaded');
        },
        disconnectAsync: async () => {
          console.log('[Placeholder] Cannot disconnect - Web3 not loaded');
        }
      });
    }
  }, [onConnectionChange]);
  
  return null;
}