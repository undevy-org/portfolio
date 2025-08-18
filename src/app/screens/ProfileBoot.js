// src/app/screens/ProfileBoot.js
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress';
import MorphingTerminal from '../components/ui/MorphingTerminal';

export default function ProfileBoot() {
  const { 
    sessionData,
    navigate,
    addLog,
    domainData
  } = useSession();
  
  // Track current step in boot sequence
  const [currentStep, setCurrentStep] = useState(0);
  // Flag when boot sequence is complete
  const [isComplete, setIsComplete] = useState(false);
  
  // Enhanced boot sequence with more technical detail
  // Each message simulates a real system initialization process
  const bootSequence = useMemo(() => {
    const terminalTitle = domainData?.terminalTitle || 'portfolio';
    const domain = domainData?.domain || 'system';
    
    return [
      // Initial system checks
      { message: `Initializing $${terminalTitle}...`, duration: 600 },
      { message: 'Checking system compatibility...', duration: 400 },
      { message: 'Verifying access credentials...', duration: 500 },
      
      // Session establishment
      { message: 'Establishing secure session...', duration: 700 },
      { message: `Connecting to ${domain} servers...`, duration: 800 },
      { message: 'Authenticating user profile...', duration: 600 },
      
      // Data loading phase
      { message: 'Loading portfolio modules...', duration: 500 },
      { message: 'Fetching case studies database...', duration: 900 },
      { message: 'Indexing project archives...', duration: 700 },
      { message: 'Parsing experience timeline...', duration: 600 },
      
      // Interface preparation
      { message: 'Compiling interface components...', duration: 500 },
      { message: 'Applying theme configuration...', duration: 400 },
      { message: 'Optimizing render pipeline...', duration: 600 },
      
      // Final checks
      { message: 'Running integrity checks...', duration: 500 },
      { message: 'Validating content structure...', duration: 400 },
      { message: 'All systems operational.', duration: 300 },
      
      // Access granted
      { message: 'ACCESS GRANTED', duration: 200 },
      { message: 'Welcome to the portfolio terminal.', duration: 500 }
    ];
  }, [domainData?.terminalTitle, domainData?.domain]);
  
  // Process boot sequence messages one by one
  useEffect(() => {
    // Stop if we've completed all steps
    if (currentStep >= bootSequence.length) {
      return;
    }
    
    // Get current boot step
    const step = bootSequence[currentStep];
    
    // Set timer for this step's duration
    const timer = setTimeout(() => {
      // Add message to system log (removing any trailing dots for consistency)
      addLog(step.message.replace(/\.\.\.$/, ''));
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
      // Check if this was the last step
      if (currentStep === bootSequence.length - 1) {
        // Mark as complete after a short delay
        setTimeout(() => setIsComplete(true), 300);
      }
    }, step.duration);
    
    // Cleanup timer on unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [currentStep, bootSequence, addLog]);
  
  // Handle continue button click
  const handleContinue = useCallback(() => {
    // Log the transition
    addLog('Entering main portfolio hub...');
    // Navigate to main hub without adding to history (false flag)
    navigate('MainHub', false);
  }, [addLog, navigate]);
  
  // Calculate progress percentage for progress bar
  const progressPercentage = (currentStep / bootSequence.length) * 100;
  
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[500px]">
      <div className="mb-12 h-40 flex items-center justify-center">
        <MorphingTerminal 
          autoPlay={true}
          frameDelay={150}
        />
      </div>
      
      <div className="w-full max-w-md h-20 flex flex-col items-center justify-center">
        {!isComplete ? (
          <div className="w-full">
            <TerminalProgress 
              progress={progressPercentage}
              isLoading={true}
              label="INITIALIZING"
              showPercentage={true}
              animateProgress={true}
              height="h-2"
            />
            <p className="text-xs mt-2 text-center opacity-60 text-secondary">
              {bootSequence[Math.min(currentStep, bootSequence.length - 1)]?.message}
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <Button
              onClick={handleContinue}
              variant="primary"
              // CHANGE: The icon prop is now passed correctly as a component reference, not a function.
              icon={ArrowRight}
              className="w-full px-6 py-3 transition-all duration-500"
            >
              ENTER PORTFOLIO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}