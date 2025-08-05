// src/app/layouts/TerminalWindow.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowLeft, Sun, Moon, X, Home, ArrowUp } from 'lucide-react';

export default function TerminalWindow({ title, children }) {
   const { 
    theme, 
    toggleTheme, 
    goBack, 
    endSession, 
    currentScreen,
    navigationHistory,
    currentDomain,
    goHome,
    goUp,
    screenHierarchy
  } = useSession();

    const showBackButton = navigationHistory.length > 0 && currentScreen !== 'Entry';
    const showHomeButton = currentScreen !== 'MainHub' && currentScreen !== 'Entry';
    const showUpButton = !!screenHierarchy[currentScreen];

    let displayTitle = title; 

    if (currentScreen === 'MainHub' || currentScreen === 'Entry') {
      if (currentDomain?.includes('undevy')) {
        displayTitle = 'undevy_portfolio'; 
      } else {
        displayTitle = 'foxous_design';
      }
  }

  const windowClasses = `w-full max-w-2xl border rounded ${
    theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
  }`;
  
  const headerClasses = `flex items-center justify-between p-4 border-b ${
    theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  }`;
  
  const titleClasses = `font-normal text-lg ${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  
  const iconClasses = `text-xl cursor-pointer mx-2 ${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  
  const backButtonClasses = `text-xl cursor-pointer ml-2 ${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;

  const handleClose = () => {
    if (currentScreen === 'Entry') {
      return;
    }
    endSession();
  };

  return (
    <div className={windowClasses}>
      <div className={headerClasses}>
        <div className="flex items-center">
          {showBackButton && (
            <Button
              onClick={goBack}
              icon={() => <ArrowLeft size={20} strokeWidth={1.5} />}
              variant="icon-only"
              className="p-1"
              aria-label="Go back"
            />
          )}
          {showUpButton && (
            <Button
              onClick={goUp}
              icon={() => <ArrowUp size={20} strokeWidth={1.5} />}
              variant="icon-only"
              className="p-1"
              aria-label="Go up one level"
            />
          )}
          <h1 className={`${titleClasses} ml-2`}>${displayTitle}</h1>
        </div>
        <div className="flex items-center gap-3">
          {showHomeButton && (
            <Button
              onClick={goHome}
              icon={() => <Home size={20} strokeWidth={1.5} />}
              variant="icon-only"
              className="p-1"
              aria-label="Go to Main Hub"
            />
          )}

          <Button
            onClick={toggleTheme}
            icon={() => theme === 'dark' 
              ? <Sun size={20} strokeWidth={1.5} /> 
              : <Moon size={20} strokeWidth={1.5} />
            }
            variant="icon-only"
            className="p-1"
            aria-label="Toggle theme"
          />

          {currentScreen !== 'Entry' && (
            <Button
              onClick={handleClose}
              icon={() => <X size={20} strokeWidth={1.5} />}
              variant="icon-only"
              className="p-1"
              aria-label="Close session"
            />
          )}
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
