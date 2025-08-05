// src/app/screens/Entry.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/navigation';
import { MessageSquare, Wallet } from 'lucide-react';

export default function Entry() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [web3Status, setWeb3Status] = useState('idle'); 
  const { theme, addLog, currentDomain, domainData, authError, setAuthError } = useSession();
  const router = useRouter();

  // Watch for auth errors and react to them
  useEffect(() => {
    if (authError) {
      setIsLoading(false);
      setCode(''); // Clear the field
      
      // Clear the error after 5 seconds
      const timer = setTimeout(() => {
        setAuthError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [authError, setAuthError]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      addLog('ERROR: No access code provided');
      return;
    }

    setIsLoading(true);
    setAuthError(null); // Clear any previous errors
    addLog(`AUTHENTICATING: ${code}`);
    router.push(`/?code=${code}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const handleGetCode = () => {
    // Use domain-specific telegram or fallback based on current domain
    let telegramUrl;
    if (domainData?.telegram) {
      telegramUrl = domainData.telegram;
    } else if (currentDomain?.includes('foxous')) {
      telegramUrl = 'https://t.me/foxous';
    } else {
      telegramUrl = 'https://t.me/undevy';
    }
    
    addLog(`EXTERNAL LINK: Telegram ${telegramUrl}`);
    window.open(telegramUrl, '_blank');
  };

  const handleWeb3Login = () => {
    addLog('WEB3 LOGIN: Coming soon');
    setWeb3Status('coming-soon');
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setWeb3Status('idle');
    }, 3000);
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
        disabled={isLoading}
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
        disabled={isLoading}
        className={`w-full p-3 mb-3 border rounded font-bold transition-colors ${
          theme === 'dark'
            ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
            : 'border-light-border hover:bg-light-hover text-light-text-primary'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
      </button>

      {/* Two horizontal buttons */}
      <div className="flex gap-3">
      <button
        onClick={handleGetCode}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 font-bold transition-colors ${
          theme === 'dark'
            ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
            : 'border-light-border hover:bg-light-hover text-light-text-primary'
        }`}
      >
          <MessageSquare className="w-4 h-4" />
        GET CODE
      </button>

        <button
          onClick={handleWeb3Login}
          disabled={web3Status === 'coming-soon'}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 font-bold transition-colors ${
            theme === 'dark'
              ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
              : 'border-light-border hover:bg-light-hover text-light-text-primary'
          } ${web3Status === 'coming-soon' ? 'opacity-50' : ''}`}
        >
          <Wallet className="w-4 h-4" />
          {web3Status === 'coming-soon' ? 'COMING SOON...' : 'WEB3 LOGIN'}
        </button>
      </div>
    </div>
  );
}