// src/app/components/Web3Bridge.js
'use client';

import { useEffect, useRef } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';

/**
 * This component acts as a bridge between Web3 hooks and the rest of the application.
 * It uses Web3 hooks normally (following React rules) and communicates their values
 * upward through a callback prop.
 * 
 * This component MUST be rendered inside Web3Provider to have access to the hooks.
 * It will be lazy-loaded along with Web3Provider by the Web3Manager.
 */
export default function Web3Bridge({ onWeb3StateChange }) {
  // Use Web3 hooks normally - no dynamic imports, no conditional calls
  const { open } = useAppKit();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { disconnect, disconnectAsync } = useDisconnect();
  
  // Track previous values to avoid unnecessary updates
  const prevStateRef = useRef({});
  
  // Send Web3 state updates to parent whenever they change
  useEffect(() => {
    const currentState = {
      address,
      isConnected,
      isConnecting,
      isDisconnected,
      open,
      disconnect,
      disconnectAsync
    };
    
    // Check if state actually changed to avoid infinite loops
    const stateChanged = 
      prevStateRef.current.address !== address ||
      prevStateRef.current.isConnected !== isConnected ||
      prevStateRef.current.isConnecting !== isConnecting ||
      prevStateRef.current.isDisconnected !== isDisconnected;
    
    if (stateChanged && onWeb3StateChange) {
      console.log('[Web3Bridge] Web3 state updated:', {
        address,
        isConnected,
        isConnecting,
        isDisconnected
      });
      
      // Call the callback with current Web3 state
      onWeb3StateChange(currentState);
      
      // Update ref for next comparison
      prevStateRef.current = {
        address,
        isConnected,
        isConnecting,
        isDisconnected
      };
    }
  }, [address, isConnected, isConnecting, isDisconnected, open, disconnect, disconnectAsync, onWeb3StateChange]);
  
  // This component doesn't render anything visible
  return null;
}

// Also create a placeholder component for when Web3 isn't loaded
export function Web3BridgePlaceholder({ onWeb3StateChange }) {
  useEffect(() => {
    // Provide default values when Web3 isn't loaded
    if (onWeb3StateChange) {
      onWeb3StateChange({
        address: null,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        open: () => {
          console.log('[Web3BridgePlaceholder] Cannot open - Web3 not loaded');
        },
        disconnect: () => {
          console.log('[Web3BridgePlaceholder] Cannot disconnect - Web3 not loaded');
        },
        disconnectAsync: async () => {
          console.log('[Web3BridgePlaceholder] Cannot disconnect - Web3 not loaded');
        }
      });
    }
  }, [onWeb3StateChange]);
  
  return null;
}