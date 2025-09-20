// src/app/components/SystemLog.js
'use client';

import { useSession } from '../context/SessionContext';
import { useEffect, useRef, useState } from 'react';

export default function SystemLog() {
  const { logEntries } = useSession();
  const logContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logEntries]);

  return (
    <div className="w-full max-w-2xl border rounded h-32 overflow-y-auto text-xs p-2 font-mono bg-main border-primary" ref={logContainerRef}>
      {logEntries.map((entry, index) => {
        // Check if this is the special ACCESS GRANTED message
        const isAccessGranted = entry.includes('ACCESS GRANTED');
        
        return (
        <div key={index} className="flex">
          <span className="mr-2 select-none text-text-secondary">{'>'}</span>
            <p className={isAccessGranted ? "text-accent font-bold" : "text-secondary"}>
              {entry}
            </p>
        </div>
        );
      })}
      
      {logEntries.length > 0 && (
      <div className="flex items-center mt-1">
        <span className="mr-2 select-none text-text-secondary">{'>'}</span>
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              className="bg-transparent outline-none w-full text-secondary"
              placeholder=""
              tabIndex={-1}
              style={{ caretColor: 'transparent' }}
            />
            <span 
            className={'absolute top-1/2 -translate-y-1/2 inline-block w-2 h-4 animate-pulse cursor-terminal'}
              style={{
              // Approximating character width more accurately for monospace font
              left: `${inputValue.length * 7.2}px`
              }}
            ></span>
      </div>
        </div>
      )}
    </div>
  );
}
