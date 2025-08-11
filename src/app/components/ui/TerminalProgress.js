// src/app/components/ui/TerminalProgress.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '../../context/SessionContext';

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
 * - height: string (optional, default 'h-4') - Tailwind height class for the progress bar
 */
export default function TerminalProgress({ 
  progress = 0, 
  isLoading = false,
  label = 'LOADING',
  showPercentage = true,
  animateProgress = true,
  height = 'h-4'
}) {
  const { theme } = useSession();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  
  // Spinner animation frames for visual feedback
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  // Animate the progress bar smoothly
  useEffect(() => {
    if (!animateProgress) {
      setDisplayProgress(progress);
      return;
    }
    
    // Smooth animation towards target progress
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 1) return progress;
        // Move 10% of the difference each frame for smooth animation
        return prev + diff * 0.1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [progress, animateProgress]);
  
  // Animate the spinner independently
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setSpinnerFrame(prev => (prev + 1) % spinnerFrames.length);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoading, spinnerFrames.length]);
  
  // Don't render if not loading
  if (!isLoading) return null;
  
  // Calculate the number of filled blocks for the progress bar
  const progressBarWidth = 30; // Total width in characters
  const filledBlocks = Math.floor((displayProgress / 100) * progressBarWidth);
  const emptyBlocks = progressBarWidth - filledBlocks;
  
  // Build the progress bar string
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  
  return (
    <div className={`space-y-2 ${
      theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
    }`}>
      {/* Label with spinner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${
            theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
          }`}>
            {spinnerFrames[spinnerFrame]}
          </span>
          <span className={`text-xs uppercase tracking-wider ${
            theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            {label}
          </span>
        </div>
        
        {/* Percentage display */}
        {showPercentage && (
          <span className={`text-xs ${
            theme === 'dark' ? 'text-dark-success' : 'text-light-success'
          }`}>
            {Math.round(displayProgress)}%
          </span>
        )}
      </div>
      
      {/* Progress bar container */}
      <div className={`${height} relative overflow-hidden rounded ${
        theme === 'dark' ? 'bg-dark-hover' : 'bg-light-hover'
      }`}>
        {/* ASCII-style progress bar */}
        <div className={`absolute inset-0 flex items-center px-1 font-mono text-xs ${
          theme === 'dark' ? 'text-dark-success' : 'text-light-success'
        }`}>
          {progressBar}
        </div>
      </div>
      
      {/* Optional status line */}
      <div className={`text-xs ${
        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
      }`}>
        <span className="opacity-60">
          [{Math.round(displayProgress)}% complete]
        </span>
      </div>
    </div>
  );
}