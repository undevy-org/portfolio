// src/app/components/Web3CleanupManager.js
'use client';

import { useEffect } from 'react';
import { useWeb3State } from '../hooks/useWeb3State';

/**
 * Component that manages Web3 cleanup on page unload
 * Ensures wallet is disconnected when user closes the tab
 */
export default function Web3CleanupManager() {
  const { isConnected, disconnectWallet } = useWeb3State();

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (isConnected) {
        console.log('[Web3CleanupManager] Page unloading, disconnecting wallet...');
        
        // Clear all Web3 related localStorage items immediately
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.includes('walletconnect') ||
            key.includes('wc@') ||
            key.includes('@appkit') ||
            key.includes('wagmi') ||
            key.includes('reown') ||
            key.includes('W3M')
          )) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
        });
        
        // Also clear sessionStorage
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
          const key = sessionStorage.key(i);
          if (key && (
            key.includes('wc') || 
            key.includes('reown') || 
            key.includes('wagmi') ||
            key.includes('appkit') ||
            key.includes('W3M')
          )) {
            sessionStorage.removeItem(key);
          }
        }
        
        // Try to disconnect (may not complete before page closes)
        try {
          await disconnectWallet();
        } catch (error) {
          console.error('[Web3CleanupManager] Error during disconnect:', error);
        }
      }
    };

    // Add event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isConnected, disconnectWallet]);

  return null; // This component doesn't render anything
}
