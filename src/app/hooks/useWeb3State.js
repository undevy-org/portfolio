// src/app/hooks/useWeb3State.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useWeb3Manager } from '../components/Web3Manager';

/**
 * This hook provides Web3 functionality to components that need it.
 * It works with the Web3Manager context to get Web3 state and handle loading.
 * 
 * Unlike the original approach, this doesn't try to import or use Web3 hooks directly.
 * Instead, it relies on the Web3Bridge component to provide the Web3 state through
 * the Web3Manager context.
 * 
 * Usage:
 * const { web3State, openWeb3Modal, disconnectWallet, isWeb3Loading } = useWeb3State();
 */
export function useWeb3State() {
  const { 
    isWeb3Loaded, 
    isWeb3Ready, 
    loadWeb3, 
    isLoading,
    web3State 
  } = useWeb3Manager();
  
  // Track if we're waiting to open the modal after loading
  const pendingModalOpenRef = useRef(false);
  
  // Function to open Web3 modal with automatic loading if needed
  const openWeb3Modal = useCallback(() => {
    if (!isWeb3Loaded) {
      // Web3 not loaded yet - trigger loading
      console.log('[useWeb3State] Web3 not loaded, triggering load');
      pendingModalOpenRef.current = true;
      loadWeb3();
    } else if (isWeb3Ready && web3State?.open) {
      // Web3 is ready and we have the open function
      console.log('[useWeb3State] Opening Web3 modal');
      web3State.open();
    } else {
      // Web3 is loaded but not ready yet
      console.log('[useWeb3State] Web3 loaded but not ready, waiting...');
      pendingModalOpenRef.current = true;
    }
  }, [isWeb3Loaded, isWeb3Ready, loadWeb3, web3State]);
  
  // Handle opening modal after Web3 becomes ready
  useEffect(() => {
    if (pendingModalOpenRef.current && isWeb3Ready && web3State?.open) {
      console.log('[useWeb3State] Web3 now ready, opening modal');
      // Small delay to ensure everything is initialized
      const timer = setTimeout(() => {
        web3State.open();
        pendingModalOpenRef.current = false;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isWeb3Ready, web3State]);
  
  // Function to disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (web3State?.disconnectAsync) {
      console.log('[useWeb3State] Disconnecting wallet');
      try {
        await web3State.disconnectAsync();
        
        // ADDED: Also clear any persisted connection data
        if (typeof window !== 'undefined') {
          // Clear WalletConnect data specifically
          const wcKeys = Object.keys(localStorage).filter(key => 
            key.includes('walletconnect') || 
            key.includes('wc@') || 
            key.includes('appkit')
          );
          wcKeys.forEach(key => localStorage.removeItem(key));
          console.log('[useWeb3State] Cleared', wcKeys.length, 'WalletConnect keys');
        }
      } catch (error) {
        console.error('[useWeb3State] Error disconnecting:', error);
        // Force clear even on error
        if (typeof window !== 'undefined' && error.message?.includes('already')) {
          location.reload(); // Last resort if wallet state is corrupted
        }
      }
    } else {
      console.log('[useWeb3State] Cannot disconnect - Web3 not ready');
    }
  }, [web3State]);
  
  // Return a consistent interface regardless of Web3 loading state
  return {
    // Web3 state
    address: web3State?.address || null,
    isConnected: web3State?.isConnected || false,
    isConnecting: web3State?.isConnecting || false,
    isDisconnected: web3State?.isDisconnected !== false,
    
    // Actions
    openWeb3Modal,
    disconnectWallet,
    
    // Loading states
    isWeb3Loading: isLoading,
    isWeb3Ready,
    isWeb3Loaded
  };
}

/**
 * Simplified hook for components that only need to check Web3 connection status
 */
export function useWeb3Connection() {
  const { web3State } = useWeb3Manager();
  
  return {
    address: web3State?.address || null,
    isConnected: web3State?.isConnected || false
  };
}

/**
 * Hook for components that need to trigger Web3 loading without using it
 */
export function useWeb3Loader() {
  const { loadWeb3, isWeb3Loaded, isWeb3Ready, isLoading } = useWeb3Manager();
  
  return {
    loadWeb3,
    isWeb3Loaded,
    isWeb3Ready,
    isLoading
  };
}