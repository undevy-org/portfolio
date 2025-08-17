// src/app/screens/SystemLog.js
'use client';

import { useSession } from '../context/SessionContext';
import { useEffect, useRef, useState } from 'react';

export default function SystemLog() {
  // REMOVED: The 'theme' variable is no longer needed for direct styling.
  // The new theming system works via a data-theme attribute on the HTML tag,
  // and semantic CSS classes in globals.css automatically adapt.
  const { logEntries } = useSession();
  const logContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logEntries]);

  // COMMENT: All theme-dependent class variables have been removed to fix hydration errors.
  // We now use the semantic classes from globals.css directly in the JSX.

  return (
    // CHANGE: Replaced the theme-dependent 'containerClasses' variable with semantic classes.
    // 'bg-main' and 'border-primary' now pull their values from CSS variables,
    // which prevents a mismatch between server-rendered and client-rendered HTML.
    // The background opacity from the original code has been omitted for now to ensure
    // compatibility with the new CSS variable system without adding complexity.
    <div className="w-full max-w-2xl border rounded h-32 overflow-y-auto text-xs p-2 font-mono bg-main border-primary" ref={logContainerRef}>
      {logEntries.map((entry, index) => (
        // WHY: This ensures every line in the log, including the final input line, has the same
        // visual structure and alignment, mimicking a real terminal output.
        <div key={index} className="flex">
          <span className="mr-2 select-none">{'>'}</span>
          {/* CHANGE: Replaced 'textClasses' variable with the direct semantic class '.text-secondary'. */}
          <p className="text-secondary">{entry}</p>
        </div>
      ))}
      
      {logEntries.length > 0 && (
      <div className="flex items-center mt-1">
        <span className="mr-2 select-none">{'>'}</span>
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
            // WHY: This aligns with the terminal aesthetic where commands are often uppercase.
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              // CHANGE: Replaced 'inputClasses' variable with direct semantic classes.
              className="bg-transparent outline-none w-full text-secondary"
              placeholder=""
              tabIndex={-1}
              style={{ caretColor: 'transparent' }}
            />
            <span 
            // CHANGE: Replaced the theme-dependent 'cursorClasses' variable.
            // The background color is now set using an inline style that reads a CSS variable.
            // This is the correct way to apply a theme-aware color that doesn't have a dedicated
            // semantic background class, fixing the hydration error.
            className={'absolute top-1/2 -translate-y-1/2 inline-block w-2 h-4 animate-pulse'}
              style={{
              // Approximating character width more accurately for monospace font
              left: `${inputValue.length * 7.2}px`, 
              pointerEvents: 'none',
              backgroundColor: 'var(--color-text-secondary)'
              }}
            ></span>
      </div>
        </div>
      )}
    </div>
  );
}