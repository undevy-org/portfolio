// src/app/components/TerminalImagePreview.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from '../context/SessionContext';
import { X } from 'lucide-react';
import NextImage from 'next/image';
import TerminalProgress from './ui/TerminalProgress';

// Global cache for loaded images to maintain state across tab switches
const imageLoadCache = new Map();

export default function TerminalImagePreview({ 
  src, 
  alt = 'Image preview',
  height = 200, // Height in pixels for the ASCII frame
  width = 400,  // Default width for the image
  aspectRatio = '16/9', // Default aspect ratio
  resetOnTabChange = false // Option to reset state when tab changes
}) {
  // REMOVED: The 'theme' variable is no longer used for styling.
  const { addLog } = useSession();
  
  // Use src as unique identifier for this image's state
  const cacheKey = src;
  
  // Initialize state from cache if available
  const getCachedState = () => {
    if (imageLoadCache.has(cacheKey)) {
      return imageLoadCache.get(cacheKey);
    }
    return { state: 'idle', progress: 0 };
  };
  
  const [imageState, setImageStateInternal] = useState(getCachedState);
  const loadingIntervalRef = useRef(null);
  const imageRef = useRef(null);
  
  // Update cache whenever state changes
  const setImageState = useCallback((newState) => {
    setImageStateInternal(newState);
    imageLoadCache.set(cacheKey, newState);
  }, [cacheKey]);

  // Detect mobile for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click on the initial frame
  const handleShowImage = useCallback(() => {
    if (imageState.state !== 'idle') return;
    
    setImageState({ state: 'loading', progress: 0 });
    addLog(`IMAGE REQUEST: ${src.split('/').pop()}`);
    
    // Realistic loading simulation (3-5 seconds)
    let currentProgress = 0;
    const targetDuration = 3000 + Math.random() * 2000; // 3-5 seconds
    const startTime = Date.now();
    
    loadingIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = elapsed / targetDuration;
      
      // Simulate network speed variations
      // Slow start (establishing connection), fast middle (downloading), slow end (processing)
      let speed;
      if (timeProgress < 0.1) {
        // Initial connection (0-10% of time)
        speed = 0.3;
      } else if (timeProgress < 0.2) {
        // Handshake complete, starting download (10-20% of time)
        speed = 0.8;
      } else if (timeProgress < 0.8) {
        // Main download phase (20-80% of time)
        speed = 1.5 + Math.sin(timeProgress * Math.PI * 4) * 0.3; // Fluctuating speed
      } else if (timeProgress < 0.95) {
        // Final chunks (80-95% of time)
        speed = 0.5;
      } else {
        // Processing (95-100% of time)
        speed = 0.2;
      }
      
      // Add some randomness for realism
      const randomFactor = 0.8 + Math.random() * 0.4; // 80% to 120%
      currentProgress += speed * randomFactor * 2;
      
      // Cap at 95% until image actually loads
      currentProgress = Math.min(currentProgress, 95);
      
      // Stop interval when time is up
      if (elapsed >= targetDuration) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
        currentProgress = 95;
      }
      
      setImageState({ state: 'loading', progress: Math.floor(currentProgress) });
    }, 50); // Update every 50ms for smooth animation
    
    // Actually load the image
    if (!imageRef.current) {
      imageRef.current = new Image();
    }
    
    imageRef.current.onload = () => {

      // Track when loading started for minimum animation time
      const loadStartTime = Date.now();
      
      // Check if loading was too fast (less than 500ms)
      const loadTime = Date.now() - loadStartTime;
      const minLoadTime = 1500; // Minimum 1.5 seconds for visual effect

  if (loadTime < minLoadTime) {
    // Continue animation for remaining time
      setTimeout(() => {
        if (loadingIntervalRef.current) {
          clearInterval(loadingIntervalRef.current);
          loadingIntervalRef.current = null;
        }
        setImageState({ state: 'loading', progress: 100 });
        setTimeout(() => {
          setImageState({ state: 'ready', progress: 100 });
          addLog(`IMAGE LOADED: ${src.split('/').pop()}`);
        }, 300);
      }, minLoadTime - loadTime);
    } else {
      // Normal flow for slow loads
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      setImageState({ state: 'loading', progress: 100 });
      setTimeout(() => {
        setImageState({ state: 'ready', progress: 100 });
        addLog(`IMAGE LOADED: ${src.split('/').pop()}`);
      }, 300);
    }
  };

    imageRef.current.onerror = () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      setImageState({ state: 'error', progress: 0 });
    addLog(`ERROR: Failed to load ${src.split('/').pop()}`);
    };
    
    imageRef.current.src = src;
  }, [src, imageState.state, addLog, setImageState]);
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, []);

  // Generate responsive progress bar
  const getProgressBar = useCallback(() => {
    // Use fewer blocks on mobile for better fit
    const barLength = isMobile ? 8 : 12;
    const filled = Math.floor((imageState.progress / 100) * barLength);
    const empty = barLength - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }, [imageState.progress, isMobile]);

  // Handle image click to open lightbox
  const [showLightbox, setShowLightbox] = useState(false);
  
  const handleImageClick = () => {
    if (imageState.state === 'ready') {
      setShowLightbox(true);
      addLog('LIGHTBOX: Opened');
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setShowLightbox(false);
    addLog('LIGHTBOX: Closed');
  };

  // Render based on state
  if (imageState.state === 'idle') {
      return (
      // CHANGE: Replaced theme-dependent classes with semantic ones.
      // '.bg-main', '.text-primary', and '.border-primary' now control the appearance.
        <div 
        className="relative font-mono text-sm flex items-center justify-center overflow-hidden cursor-pointer border-2 bg-main text-primary border-primary"
        style={{ height: `${height}px`, borderStyle: 'dashed' }}
          onClick={handleShowImage}
        >
        {/* CHANGE: The button now uses the semantic '.btn-command' class for consistent styling. */}
        <button className="btn-command px-3 sm:px-4 py-2 z-10 text-xs sm:text-sm">
            [ SHOW IMAGE ]
          </button>
        </div>
      );
    }

  if (imageState.state === 'loading') {
      return (
      // CHANGE: Replaced theme-dependent classes with semantic '.bg-main' and '.border-primary'.
        <div 
        className="relative font-mono text-sm flex items-center justify-center overflow-hidden border-2 bg-main border-primary"
        style={{ height: `${height}px`, borderStyle: 'dashed', padding: '1rem' }}
      >
        <div className="w-full max-w-xs px-2">
          {/* COMMENT: TerminalProgress is already refactored and theme-agnostic. */}
          <TerminalProgress 
            progress={imageState.progress}
            isLoading={true}
            label="RENDERING IMAGE"
            showPercentage={true}
            animateProgress={false} // Set to false because we control the animation ourselves
            height="h-3"
          />
          </div>
        </div>
      );
    }

  if (imageState.state === 'error') {
      return (
      // CHANGE: Replaced theme-dependent classes with semantic ones.
        <div 
        className="relative font-mono text-sm flex items-center justify-center overflow-hidden border bg-main border-primary"
        style={{ height: `${height}px`, borderStyle: 'dashed' }}
        >
        {/* CHANGE: Directly applied the '.text-error' semantic class for the error message. */}
        <div className="text-center text-error">
            [ ERROR ]<br/>
            <span className="text-xs">Failed to load image</span>
          </div>
        </div>
      );
    }

  if (imageState.state === 'ready') {
  return (
    <>
        <div 
          className="relative cursor-pointer group"
          onClick={handleImageClick}
          style={{ aspectRatio }}
        >
          {/* CHANGE: Directly applied the '.border-primary' semantic class. */}
          <div className="relative w-full h-full rounded border overflow-hidden border-primary">
            <NextImage 
              src={src} 
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-all group-hover:opacity-90"
            />
          </div>
          {/* CHANGE: Replaced theme-dependent logic with semantic classes.
          '.bg-main' with opacity, '.text-command', and '.border-primary' create the theme-aware hint. */}
          <div 
            className="absolute top-2 right-2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-main/80 text-command border border-primary"
          >
            [ CLICK TO EXPAND ]
          </div>
        </div>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
            {/* CHANGE: Replaced theme-dependent classes with a simple black background with opacity. */}
            <div className="absolute inset-0 bg-black/80" />
          
          {/* Modal Content */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
              {/* CHANGE: Replaced complex theme-dependent classes with semantic ones for the close button. */}
            <button
              onClick={closeLightbox}
                className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors bg-main/90 text-primary bg-hover border border-primary"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            
            {/* Image Container */}
            <div className="relative w-full h-full">
              <NextImage 
                src={src} 
                alt={alt}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                quality={100}
                  // COMMENT: Drop shadow is a visual effect that can be simplified for now.
                  className="rounded"
              />
            </div>
            
            {/* Caption */}
            {alt && (
                // CHANGE: Replaced complex theme-dependent classes with semantic ones for the caption.
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 text-center text-sm font-mono text-secondary bg-main/90 border border-secondary rounded">
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  }
  
  return null;
}