// src/app/components/ui/TerminalProgress.js
'use client';

import { useState, useEffect } from 'react';

/**
 * Universal terminal-style progress loader component
 * Can be used anywhere we need a progress visualization
 * 
 * Props:
 * - progress: number (0-100) - current progress percentage
 * - isLoading: boolean - whether to show the loader
 * - label: string (optional) - text to show above the progress bar
 * - showPercentage: boolean (optional, default true) - whether to show percentage
 * - animateProgress: boolean (optional, default true) - whether to animate the progress bar
 * - height: string (optional, default 'h-2') - Tailwind height class for the progress bar
 * - showPulse: boolean (optional, default true) - whether to show pulse animation on progress fill
 */
export default function TerminalProgress({ 
  progress = 0, 
  isLoading = false,
  label = 'LOADING',
  showPercentage = true,
  animateProgress = true,
  height = 'h-2',
  showPulse = true 
}) {
  // Track the displayed progress for smooth animation
  const [displayProgress, setDisplayProgress] = useState(0);
  // Track spinner animation frame
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  
  // Unicode spinner frames for loading animation
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  // Handle smooth progress animation
  useEffect(() => {
    if (!animateProgress) {
      // If animation is disabled, set progress directly
      setDisplayProgress(progress);
      return;
    }
    
    // Smooth animation using interval
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        // Stop animating when close enough to target
        if (Math.abs(diff) < 1) return progress;
        // Move 10% of the difference each frame for easing effect
        return prev + diff * 0.1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [progress, animateProgress]);
  
  // Handle spinner animation
  useEffect(() => {
    if (!isLoading) return;
    
    // Rotate through spinner frames
    const interval = setInterval(() => {
      setSpinnerFrame(prev => (prev + 1) % spinnerFrames.length);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoading, spinnerFrames.length]);
  
  // Don't render anything if not loading
  if (!isLoading) return null;
  
  return (
    <div className="w-full space-y-2 text-primary">
      {/* Header row with label and percentage */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Animated spinner icon */}
          <span className="text-command">
            {spinnerFrames[spinnerFrame]}
          </span>
          {/* Loading label */}
          <span className="text-xs uppercase tracking-wider text-secondary">
            {label}
          </span>
        </div>
        
        {/* Percentage display on the right */}
        {showPercentage && (
          <span className="text-xs text-success">
            {Math.round(displayProgress)}%
          </span>
        )}
      </div>
      
      <div 
        className={`${height} relative w-full overflow-hidden border border-secondary`}
        style={{
          backgroundColor: 'var(--color-hover)'
        }}
      >
        <div 
          className={`absolute inset-y-0 left-0 transition-all duration-300 ease-out ${
            showPulse && displayProgress < 100 ? 'animate-pulse-progress' : ''
          }`}
          style={{ 
            width: `${displayProgress}%`,
            // Use CSS variable for theme-aware success color
            backgroundColor: 'var(--color-success)'
          }}
        />
      </div>
      
      {/* Status text below progress bar */}
      <div className="text-xs text-secondary">
        <span className="opacity-60">
          [{Math.round(displayProgress)}% complete]
        </span>
      </div>
    </div>
  );
}