// src/app/components/AnimatedScreenTransition.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from '../context/SessionContext';

export default function AnimatedScreenTransition({ children }) {
  const { currentScreen } = useSession();
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const previousScreenRef = useRef(currentScreen);
  const contentRef = useRef(null);
  
  useEffect(() => {
    // If screen hasn't changed, just update content
    if (previousScreenRef.current === currentScreen) {
      return;
    }
    
    // Screen changed, trigger animation
    const animateTransition = async () => {
      // Start fade out
      setIsAnimating(true);
      setOpacity(0);
      
      // Wait for fade out to complete
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Fade in with new content
      setOpacity(1);
      
      // Wait for fade in to complete
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Animation complete
      setIsAnimating(false);
    };
    
    animateTransition();
    previousScreenRef.current = currentScreen;
  }, [currentScreen]);
  
  return (
    <div 
      ref={contentRef}
      className="transition-container w-full h-full"
      style={{
        opacity: opacity,
        transition: isAnimating ? 'opacity 150ms ease-in-out' : 'none',
      }}
    >
      {children}
    </div>
  );
}