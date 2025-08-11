// src/app/screens/ProfileBoot.js
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
// MODIFICATION: Imported ArrowRight icon from lucide-react.
// WHY: To add a visual cue to the "VIEW PORTFOLIO" button, indicating progression.
import { ArrowRight } from 'lucide-react';
// NEW IMPORT: Import the new TerminalProgress component to replace simple text loader
import TerminalProgress from '../components/ui/TerminalProgress';

export default function ProfileBoot() {
  const { sessionData, theme, navigate, addLog, currentDomain } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loaderFrame, setLoaderFrame] = useState(0); // For ASCII loader animation
  const logContainerRef = useRef(null); // Reference for auto-scroll functionality
  
  // ASCII loader frames - similar to image loading animation
  const loaderFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  // Boot sequence messages - wrapped in useMemo to prevent recreation
  const bootSequence = useMemo(() => [
    { message: `Loading ${currentDomain === 'foxous.design' ? '$foxous_portfolio' : '$undevy_portfolio'}...`, duration: 1200 },
    { message: 'Initializing session...', duration: 800 },
    { message: 'Fetching case studies...', duration: 1000 },
    { message: 'Loading experience data...', duration: 900 },
    { message: 'Preparing interface...', duration: 700 },
    { message: 'Access granted.', duration: 500 }
  ], [currentDomain]); // Only recreate when currentDomain changes
  
  // ASCII art for the terminal (static for now, can be animated later)
  const asciiArt = [
    '    ╔══════════════════╗',
    '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
    '    ║  ▓▓ PORTFOLIO ▓▓  ║',
    '    ║  ▓▓  SYSTEM   ▓▓  ║',
    '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
    '    ╚══════════════════╝'
  ];
  
  // Animate the ASCII loader - cycles through frames every 80ms
  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setLoaderFrame(prev => (prev + 1) % loaderFrames.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isComplete, loaderFrames.length]);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [currentStep]);
  
    // Run through boot sequence
  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        // Only proceed if we haven't reached the end
        if (currentStep < bootSequence.length) {
          // Log the current message (not the next one)
        addLog(bootSequence[currentStep].message.replace('...', ''));
        
          // Move to next step
          setCurrentStep(prev => prev + 1);
          
          // Check if this was the last message
        if (currentStep === bootSequence.length - 1) {
          setTimeout(() => setIsComplete(true), 500);
          }
        }
      }, bootSequence[currentStep].duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, bootSequence, addLog]);
  
  const handleContinue = () => {
    addLog('BOOT COMPLETE: Entering main hub');
    // Navigate to MainHub without adding to history
    navigate('MainHub', false);
  };
  
  // Calculate progress percentage for visual feedback
  const progressPercentage = (currentStep / bootSequence.length) * 100;
  
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
      {/* ASCII Art Container */}
      <div className={`mb-6 font-mono text-xs ${
        theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
      }`}>
        {asciiArt.map((line, index) => (
          <div key={index} className="text-center whitespace-pre">
            {line}
          </div>
        ))}
      </div>
      
      {/* Boot Messages Container - Fixed height with scroll like SystemLog */}
      <div 
        ref={logContainerRef}
        className={`w-full max-w-md h-32 overflow-y-auto border rounded p-2 mb-6 ${
          theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
        }`}
      >
        {/* Display all messages up to current step */}
        {bootSequence.slice(0, Math.min(currentStep, bootSequence.length)).map((step, index) => (
          <div
            key={index}
            className={`text-sm mb-1 ${
              theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
            } ${
              index === currentStep - 1 && !isComplete
                ? 'opacity-100' 
                : 'opacity-60'
            }`}
          >
            {/* Status indicator - checkmark for complete, arrow for current */}
            <span className={theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'}>
              {index < currentStep - 1 || isComplete ? '✓' : '▸'}
            </span>
            {' '}
            {step.message}
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-md h-16 flex flex-col items-center justify-center">
        {!isComplete ? (
          // STATE 1: While loading, show the progress indicator.
          // CHANGE: Replaced simple text loader with TerminalProgress component
          // OLD CODE:
          // <div className={`text-xs ${
          //   theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          // }`}>
          //   <span className="font-mono">{loaderFrames[loaderFrame]}</span>
          //   {' '}
          //   {Math.round(progressPercentage)}% complete
          // </div>
          // NEW CODE: Using TerminalProgress component for better visual consistency
          <div className="w-full max-w-xs">
            <TerminalProgress 
              progress={progressPercentage}
              isLoading={true}
              label="BOOTING"
              showPercentage={true}
              animateProgress={true}
              height="h-2"
            />
          </div>
        ) : (
          // STATE 2: When complete, replace the loader with the final content.
          <div className="w-full flex flex-col items-center">
            {/* MODIFICATION: The "System ready" text and its container span have been removed. */}
            {/* WHY: To ensure the button is the only element that appears after loading is complete, for a cleaner UI. */}
        <Button
          onClick={handleContinue}
          variant="primary"
              // MODIFICATION: Added an icon prop to display an arrow.
              // WHY: To visually indicate that clicking the button will proceed to the next step.
              icon={() => <ArrowRight size={20} strokeWidth={2} />}
              className="w-full px-6 py-3 font-bold transition-opacity duration-500"
        >
          VIEW PORTFOLIO
        </Button>
          </div>
      )}
    </div>
    </div>
  );
}