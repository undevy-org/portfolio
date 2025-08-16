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
  
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useEffect(() => {
    if (!animateProgress) {
      setDisplayProgress(progress);
      return;
    }
    
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
  
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setSpinnerFrame(prev => (prev + 1) % spinnerFrames.length);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoading, spinnerFrames.length]);
  
  if (!isLoading) return null;
  
  const progressBarWidth = 30; // Total width in characters
  const filledBlocks = Math.floor((displayProgress / 100) * progressBarWidth);
  const emptyBlocks = progressBarWidth - filledBlocks;
  
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  
  return (
    <div className={`space-y-2 ${
      "text-primary"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${
            "text-command"
          }`}>
            {spinnerFrames[spinnerFrame]}
          </span>
          <span className={`text-xs uppercase tracking-wider ${
            "text-secondary"
          }`}>
            {label}
          </span>
        </div>
        
        {showPercentage && (
          <span className={`text-xs ${
            "text-success"
          }`}>
            {Math.round(displayProgress)}%
          </span>
        )}
      </div>
      
      <div className={`${height} relative overflow-hidden rounded ${
        theme === 'dark' ? 'bg-dark-hover' : 'bg-light-hover'
      }`}>
        <div className={`absolute inset-0 flex items-center px-1 font-mono text-xs ${
          "text-success"
        }`}>
          {progressBar}
        </div>
      </div>
      
      <div className={`text-xs ${
        "text-secondary"
      }`}>
        <span className="opacity-60">
          [{Math.round(displayProgress)}% complete]
        </span>
      </div>
    </div>
  );
}