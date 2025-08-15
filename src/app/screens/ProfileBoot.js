'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'; 
import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress';
import MorphingTerminal from '../components/ui/MorphingTerminal'; 

export default function ProfileBoot() {
  const { 
    sessionData, 
    theme, 
    navigate, 
    addLog, 
    currentDomain,
    domainData
  } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loaderFrame, setLoaderFrame] = useState(0);
  const logContainerRef = useRef(null);
  
  const loaderFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  const bootSequence = useMemo(() => {
    const terminalTitle = domainData?.terminalTitle || 'portfolio';
    return [
      // The terminalTitle with $ prefix creates the shell-like appearance
      { message: `Loading $${terminalTitle}...`, duration: 1200 },
      { message: 'Initializing session...', duration: 800 },
      { message: 'Fetching case studies...', duration: 1000 },
      { message: 'Loading experience data...', duration: 900 },
      { message: 'Preparing interface...', duration: 700 },
      { message: 'Access granted.', duration: 500 }
    ];
  }, [domainData?.terminalTitle]);
  
  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setLoaderFrame(prev => (prev + 1) % loaderFrames.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isComplete, loaderFrames.length]);
  
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [currentStep]);
  
  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        const step = bootSequence[currentStep];
        addLog(step.message.replace(/\.\.\.$/, ''));
        
        setCurrentStep(prev => prev + 1);
        
        if (currentStep === bootSequence.length - 1) {
          setTimeout(() => setIsComplete(true), 500);
        }
      }, bootSequence[currentStep].duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, bootSequence, addLog]);
  
  const handleContinue = useCallback(() => {
    addLog('BOOT COMPLETE: Entering main hub');
    navigate('MainHub', false);
  }, [addLog, navigate]);
  
  const progressPercentage = (currentStep / bootSequence.length) * 100;
  
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div className="mb-6">
        <MorphingTerminal autoPlay={true} loopAnimation={false} frameDelay={600} />
      </div>
      
      <div 
        ref={logContainerRef}
        role="log"
        aria-live="polite"
        className={`w-full max-w-md h-32 overflow-y-auto border rounded p-2 mb-6 ${
          theme === 'dark' ? 'border-dark-border bg-dark-bg/90' : 'border-light-border bg-light-bg/90'
        }`}
      >
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
            {/* WHY: To ensure the button is the only element that appears after loading is complete, for a cleaner UI. */}
        <Button
          onClick={handleContinue}
          variant="primary"
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