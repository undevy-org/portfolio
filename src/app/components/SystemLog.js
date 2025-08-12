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

  const containerClasses = `w-full max-w-2xl border rounded h-32 overflow-y-auto text-xs p-2 font-mono ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;
  
  const textClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;

  const cursorClasses = `inline-block w-2 h-4 ${
    theme === 'dark' ? 'bg-dark-text-secondary' : 'bg-light-text-secondary'
  }`;

  const inputClasses = `bg-transparent outline-none w-full ${textClasses}`;

  return (
    <div className={containerClasses} ref={logContainerRef}>
      {logEntries.map((entry, index) => (
        // WHY: This ensures every line in the log, including the final input line, has the same
        // visual structure and alignment, mimicking a real terminal output.
        <div key={index} className="flex">
          <span className="mr-2 select-none">{'>'}</span>
          <p className={textClasses}>{entry}</p>
        </div>
      ))}
      
      {/* This check is kept to only show the input prompt after logs appear */}
      {logEntries.length > 0 && (
      // WHY: This fixes the visual bug where the input line appeared slightly lower than the log entries.
      <div className="flex items-center mt-1">
        <span className="mr-2 select-none">{'>'}</span>
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
            // WHY: This aligns with the terminal aesthetic where commands are often uppercase.
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              className={inputClasses}
              placeholder=""
              tabIndex={-1}
              style={{ caretColor: 'transparent' }}
            />
            <span 
            // WHY: `top-1/2 -translate-y-1/2` is a robust way to vertically center an element regardless of parent height,
            // fixing the issue where the cursor appeared too high.
            className={`absolute top-1/2 -translate-y-1/2 ${cursorClasses} animate-pulse`}
              style={{
              // Approximating character width more accurately for monospace font
              left: `${inputValue.length * 7.2}px`, 
              pointerEvents: 'none'
              }}
            ></span>
      </div>
        </div>
      )}
    </div>
  );
}