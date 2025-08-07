// src/app/components/TerminalImagePreview.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function TerminalImagePreview({ 
  src, 
  alt = 'Image preview',
  height = 200, // Height in pixels for the ASCII frame
  width = 400,  // Default width for the image
  aspectRatio = '16/9' // Default aspect ratio
}) {
  const { theme, addLog } = useSession();
  const [state, setState] = useState('idle'); // idle | loading | ready | error
  const [progress, setProgress] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Generate ASCII frame characters based on theme
  const frameChars = {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│'
  };

  // Handle click on the initial frame
  const handleShowImage = useCallback(() => {
    if (state !== 'idle') return;
    
    setState('loading');
    setProgress(0);
    addLog(`IMAGE REQUEST: ${src.split('/').pop()}`);
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(loadingInterval);
          return 95; // Stay at 95% until actual load
        }
        // Variable speed for more realistic feel
        const increment = Math.random() * 5 + 2;
        return Math.min(prev + increment, 95);
      });
    }, 100);

    // Store interval ID for cleanup
    return () => clearInterval(loadingInterval);
  }, [src, state, addLog]);

  // Handle successful image load
  const handleImageLoad = useCallback((result) => {
    setProgress(100);
    
    // Store natural dimensions if available
    if (result.naturalWidth) {
      setImageDimensions({
        width: result.naturalWidth,
        height: result.naturalHeight
      });
    }
    
    setTimeout(() => {
      setState('ready');
      addLog(`IMAGE LOADED: ${src.split('/').pop()}`);
    }, 300); // Small delay to show 100%
  }, [src, addLog]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setState('error');
    addLog(`ERROR: Failed to load ${src.split('/').pop()}`);
  }, [src, addLog]);

  // Generate progress bar visual
  const getProgressBar = useCallback(() => {
    const filled = Math.floor((progress / 100) * 12);
    const empty = 12 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }, [progress]);

  // Handle image click to open lightbox
  const handleImageClick = () => {
    if (state === 'ready') {
      setShowLightbox(true);
      addLog('LIGHTBOX: Opened');
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setShowLightbox(false);
    addLog('LIGHTBOX: Closed');
  };

  // Generate ASCII frame content
  const renderFrame = () => {
    const frameClasses = `
      relative font-mono text-sm flex items-center justify-center overflow-hidden
      ${theme === 'dark' 
        ? 'bg-dark-bg text-dark-text-primary border-dark-border' 
        : 'bg-light-bg text-light-text-primary border-light-border'}
    `;

    const buttonClasses = `
      px-4 py-2 border rounded cursor-pointer transition-colors z-10
      ${theme === 'dark'
        ? 'border-dark-border hover:bg-dark-hover text-dark-text-command'
        : 'border-light-border hover:bg-light-hover text-light-text-command'}
    `;

    if (state === 'idle') {
      return (
        <div 
          className={`${frameClasses} cursor-pointer border ${
            theme === 'dark' ? 'border-dark-border' : 'border-light-border'
          }`}
          style={{ 
            height: `${height}px`,
            borderStyle: 'dashed'
          }}
          onClick={handleShowImage}
        >
          <button className={buttonClasses}>
            [ SHOW IMAGE ]
          </button>
        </div>
      );
    }

    if (state === 'loading') {
      return (
        <div 
          className={frameClasses}
          style={{ height: `${height}px`, aspectRatio }}
        >
          {/* Hidden Image component that actually loads */}
          <div className="hidden">
            <Image 
              src={src}
              alt={alt}
              width={width}
              height={height}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
          </div>
          
          <div className="text-center z-10">
            <div className={`mb-2 ${
              theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
            }`}>
              Rendering image...
            </div>
            <div className={`font-mono ${
              theme === 'dark' ? 'text-dark-success' : 'text-light-success'
            }`}>
              {getProgressBar()} {Math.floor(progress)}%
            </div>
          </div>
        </div>
      );
    }

    if (state === 'error') {
      return (
        <div 
          className={frameClasses}
          style={{ height: `${height}px` }}
        >
          <div className={`text-center ${
            theme === 'dark' ? 'text-dark-error' : 'text-light-error'
          }`}>
            [ ERROR ]<br/>
            <span className="text-xs">Failed to load image</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // Main render
  return (
    <>
      {/* Image or Frame */}
      {state === 'ready' ? (
        <div 
          className="relative cursor-pointer group"
          onClick={handleImageClick}
          style={{ aspectRatio }}
        >
          <div className={`relative w-full h-full rounded border overflow-hidden ${
            theme === 'dark' ? 'border-dark-border' : 'border-light-border'
          }`}>
            <Image 
              src={src} 
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-all group-hover:opacity-90"
            />
          </div>
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
            theme === 'dark' 
              ? 'bg-dark-bg/80 text-dark-text-command border border-dark-border' 
              : 'bg-light-bg/80 text-light-text-command border border-light-border'
          }`}>
            [ CLICK TO EXPAND ]
          </div>
        </div>
      ) : (
        renderFrame()
      )}

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'bg-black/80' : 'bg-black/60'
          }`} />
          
          {/* Modal Content */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-bg/90 text-dark-text-primary hover:bg-dark-hover border border-dark-border'
                  : 'bg-light-bg/90 text-light-text-primary hover:bg-light-hover border border-light-border'
              }`}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            
            {/* Image Container */}
            <div className="relative w-full h-full">
              <Image 
                src={src} 
                alt={alt}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                quality={100}
                className={`rounded ${
                  theme === 'dark' ? 'drop-shadow-2xl' : 'drop-shadow-xl'
                }`}
              />
            </div>
            
            {/* Caption */}
            {alt && (
              <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 text-center text-sm font-mono ${
                theme === 'dark' 
                  ? 'text-dark-text-secondary bg-dark-bg/90 border border-dark-border' 
                  : 'text-light-text-secondary bg-light-bg/90 border border-light-border'
              } rounded`}>
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}