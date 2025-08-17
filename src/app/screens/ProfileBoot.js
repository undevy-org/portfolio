// src/app/screens/ProfileBoot.js
'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress';
import MorphingTerminal from '../components/ui/MorphingTerminal';

export default function ProfileBoot() {
  const { 
    navigate,
    addLog,
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
    <div className="p-8 min-h-[400px] flex flex-col items-center justify-center text-primary">
      <div className="mb-6">
        <MorphingTerminal autoPlay={true} loopAnimation={false} frameDelay={600} />
      </div>

      <div
        ref={logContainerRef}
        role="log"
        aria-live="polite"
        className="w-full h-32 overflow-y-auto panel-full p-2 mb-6"
      >
        {bootSequence
          .slice(0, Math.min(currentStep, bootSequence.length))
          .map((step, index) => {
            const isCurrent = index === currentStep - 1 && !isComplete;
            return (
              <div
                key={index}
                className={`text-sm mb-1 text-primary ${isCurrent ? 'opacity-100' : 'opacity-60'}`}
              >
                <span className="text-command">
                  {index < currentStep - 1 || isComplete ? '✓' : '▸'}
                </span>{' '}
                {step.message}
              </div>
            );
          })}
      </div>

      <div className="w-full h-16 flex flex-col items-center justify-center">
        {!isComplete ? (
          <div className="w-full">
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
          <div className="w-full flex flex-col items-center">
            <Button
              onClick={handleContinue}
              variant="primary"
              icon={() => <ArrowRight className="text-command" size={20} strokeWidth={2} />}
              className="w-full px-6 py-3 transition-opacity duration-500"
            >
              VIEW PORTFOLIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
