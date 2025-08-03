// src/app/screens/Entry.js
'use client';

import { useState } from 'react';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';

export default function Entry() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme, addLog, currentDomain, domainData } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!code.trim()) {
      addLog('ERROR: No access code provided');
      return;
    }

    setIsLoading(true);
    addLog(`AUTHENTICATING: ${code}`);
    router.push(`/?code=${code}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const handleGetCode = () => {
    const telegramUrl = domainData?.telegram || 'https://t.me/undevy';
    addLog(`EXTERNAL LINK: Telegram ${telegramUrl}`);
    window.open(telegramUrl, '_blank');
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
            ? 'bg-dark-input-bg text-dark-text-primary border-dark-border' 
            : 'bg-light-input-bg text-light-text-primary border-light-border'
        } border`}
        placeholder="ENTER ACCESS CODE"
        autoFocus
        disabled={isLoading}
      />

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        variant="full"
        className="mb-2 font-bold"
      >
        {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
      </Button>

      <Button
        onClick={handleGetCode}
        variant="full"
        className="font-bold"
      >
        GET CODE
      </Button>
    </div>
  );
}