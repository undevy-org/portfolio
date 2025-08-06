// src/app/components/SystemLog.js
'use client';

import { useSession } from '../context/SessionContext';
import { useEffect, useRef, useState } from 'react';

export default function SystemLog() {
  const { logEntries, theme } = useSession();
  const logContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logEntries]);

  const containerClasses = `w-full max-w-2xl border rounded h-32 overflow-y-auto text-xs p-2 ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;
  
  const textClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;

  const cursorClasses = `inline-block w-1 h-3 ml-0.5 ${
    theme === 'dark' ? 'bg-dark-text-secondary' : 'bg-light-text-secondary'
  }`;

  const inputClasses = `bg-transparent outline-none flex-1 ${textClasses}`;

  return (
    <div className={containerClasses} ref={logContainerRef}>
      {logEntries.map((entry, index) => (
        <p key={index} className={textClasses}>{entry}</p>
      ))}
      
      {logEntries.length > 0 && (
      <div className="flex items-center gap-1 mt-1">
        <span className={textClasses}>{'>'}$</span>
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={inputClasses}
              placeholder=""
              tabIndex={-1}
              style={{ caretColor: 'transparent' }} // Hide native cursor
            />
            {/* Custom blinking cursor */}
            <span 
              className={`absolute top-1/2 -translate-y-1/2 ${cursorClasses} animate-pulse`}
              style={{
                left: `${inputValue.length * 7}px`, // Approximate character width
                animationDuration: '1s',
                animationIterationCount: 'infinite',
                pointerEvents: 'none' // Cursor doesn't block clicks
              }}
            ></span>
      </div>
        </div>
      )}
    </div>
  );
}