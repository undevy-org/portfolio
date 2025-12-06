// src/app/screens/ProfileBoot.js
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress';
import HyperspaceTunnel from '../components/ui/HyperspaceTunnel';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';

export default function ProfileBoot() {
  const {
    sessionData,
    navigate,
    addLog,
    domainData,
    verifyImage
  } = useSession();

  // Track current step in boot sequence
  const [currentStep, setCurrentStep] = useState(0);
  // Flag when boot sequence is complete
  const [isComplete, setIsComplete] = useState(false);

  // State for controlling the hyperspace tunnel animation
  const [isAnimationActive, setIsAnimationActive] = useState(true);

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
      { message: 'Verifying visual assets...', duration: 1500, action: 'verify_images' },
      { message: 'Validating content structure...', duration: 400 },
      { message: 'All systems operational.', duration: 300 },

      // Access granted - special message
      { message: 'ACCESS GRANTED', duration: 200, isSpecial: true },
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
      // Add message to system log
      // For special messages like ACCESS GRANTED, we could potentially style them differently
      // in the SystemLog component by checking the message content
      addLog(step.message.replace(/\.\.\.$/, ''));

      // Handle special actions
      if (step.action === 'verify_images') {
        const verifyAssets = async () => {
          // Get all accessible cases from session data
          // We need to find which cases are accessible based on the current profile/code
          // Since sessionData might not be fully populated with filtered cases yet, 
          // we can check the raw data if needed, but sessionData should be ready by this point

          const cases = sessionData?.case_details || {};
          const tabs = ['challenge', 'approach', 'solution', 'results'];

          // Create array of all potential image URLs
          const verificationPromises = [];

          Object.entries(cases).forEach(([caseId, details]) => {
            const hiddenImages = details.hidden_images || [];

            tabs.forEach(tab => {
              if (!hiddenImages.includes(tab)) {
                const url = `/images/projects/${caseId}_${tab}.webp`;
                verificationPromises.push(verifyImage(url));
              }
            });
          });

          // Run verifications in parallel
          await Promise.all(verificationPromises);
          console.log(`[ProfileBoot] Verified ${verificationPromises.length} assets`);
        };

        verifyAssets();
      }

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

  // Callback for when the tunnel animation completes
  const handleTunnelComplete = useCallback(() => {
    setIsAnimationActive(false);
  }, []);

  // Calculate progress percentage for progress bar
  const progressPercentage = (currentStep / bootSequence.length) * 100;

  return (
    <>
      <HyperspaceTunnel
        isActive={isAnimationActive}
        progress={progressPercentage}
        duration={10000}
        onComplete={handleTunnelComplete}
      />

      {/* Main content area */}
      <ScreenWrapper>
        {/* Desktop ThemeSwitcher handled in layout.js */}

        <div className="flex flex-col items-center justify-center min-h-[400px]">

          {/* Unified progress and button section - styling provided by outer TerminalWindow */}
          <div className="w-full max-w-md flex flex-col items-center space-y-6">
            {/* Progress bar - wrapped in same width container as button */}
            <div className="w-full max-w-xs">
              <TerminalProgress
                progress={progressPercentage}
                isLoading={true}  // Always true to keep it visible
                label="SYSTEM INITIALIZATION"
                showPercentage={true}
                animateProgress={true}
                height="h-3"
                showPulse={!isComplete}  // Stop pulse animation when complete
              />
            </div>

            {/* Button - content and state change based on completion */}
            <div className="w-full max-w-xs">
              <Button
                onClick={handleContinue}
                variant="primary"
                // Show icon only when complete
                icon={isComplete ? ArrowRight : null}
                disabled={!isComplete}
                className={`
                    w-full px-6 py-3 
                    transition-all duration-500
                    ${!isComplete ? 'opacity-40 cursor-not-allowed' : 'animate-pulse-slow'}
                  `}
              >
                {/* Change text based on completion state */}
                {isComplete ? 'ENTER PORTFOLIO' : '...INITIALIZING...'}
              </Button>
            </div>
          </div>
        </div>
      </ScreenWrapper >
    </>
  );
}