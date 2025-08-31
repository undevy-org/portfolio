// src/app/components/ui/HyperspaceTunnel.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from '../../context/SessionContext';

/**
 * HyperspaceTunnel Component - Fixed Version
 * 
 * FIXES:
 * 1. Proper background handling for Kyoto and Radar themes
 * 2. Better centering relative to content container
 */
export default function HyperspaceTunnel({ 
  isActive = false, 
  progress = 0,
  duration = 6000,
  onComplete = () => {},
  centerOffset = { x: 0, y: 0 } // NEW: Allow custom center positioning
}) {
  const { theme } = useSession();
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef(null);
  
  // Track completion
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [progress, isComplete, onComplete]);
  
  // Generate ring animation data
  const createRingData = () => {
    const rings = [];
    const numRings = 15;
    
    for (let i = 0; i < numRings; i++) {
      rings.push({
        id: `ring-${i}`,
        delay: i * 0.4,
        duration: 6
      });
    }
    return rings;
  };
  
  // Generate particle data
  const createParticleData = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const startRadius = Math.random() * 20;
      
      particles.push({
        id: `particle-${i}`,
        startX: Math.cos(angle) * startRadius,
        startY: Math.sin(angle) * startRadius,
        endX: Math.cos(angle) * 1500,
        endY: Math.sin(angle) * 1500,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 6
      });
    }
    return particles;
  };
  
  const [rings] = useState(() => createRingData());
  const [particles] = useState(() => createParticleData());
  
  // FIXED: Determine correct background color based on theme
  // For Kyoto and Radar, we need transparent background to show body color
  const getBackgroundStyle = () => {
    if (theme === 'kyoto' || theme === 'radar') {
      // For these themes, don't override the body background
      return 'transparent';
    }
    // For other themes, use the standard bg color
    return 'var(--color-bg)';
  };
  
  if (!isActive) return null;
  
  return (
    <div 
      className={`
        fixed inset-0 
        z-0 
        overflow-hidden 
        pointer-events-none
        transition-opacity duration-1000
        ${isComplete ? 'opacity-0' : 'opacity-100'}
      `}
      style={{ 
        zIndex: -1,
        // FIXED: Use transparent for Kyoto/Radar, color-bg for others
        backgroundColor: getBackgroundStyle()
      }}
    >
      <svg 
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Center glow gradient using theme colors */}
          <radialGradient id="hyperspace-center-glow">
            <stop offset="0%" stopColor="var(--color-text-primary)" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </stop>
            <stop offset="30%" stopColor="var(--color-border)" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="var(--color-active)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="var(--color-border-darker)" stopOpacity="0"/>
          </radialGradient>
          
          {/* Pulsing background gradient */}
          <radialGradient id="hyperspace-pulse-gradient">
            <stop offset="0%" stopColor="var(--color-text-primary)" stopOpacity="0.15">
              <animate 
                attributeName="stop-opacity" 
                values="0.05;0.2;0.05" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="var(--color-border)" stopOpacity="0.08">
              <animate 
                attributeName="stop-opacity" 
                values="0.03;0.12;0.03" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          
          {/* Glow filter for all elements */}
          <filter id="hyperspace-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* FIXED: Only add background rect for non-Kyoto/Radar themes */}
        {theme !== 'kyoto' && theme !== 'radar' && (
          <rect width="100%" height="100%" fill="var(--color-bg)"/>
        )}
        
        {/* Pulsing background layer */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#hyperspace-pulse-gradient)"
        >
          <animate 
            attributeName="opacity" 
            values="0.5;1;0.5" 
            dur="3s" 
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            keyTimes="0;0.5;1"
          />
        </rect>
        
        {/* Center glow layer */}
        <rect width="100%" height="100%" fill="url(#hyperspace-center-glow)" opacity="0.3"/>
        
        {/* NEW: Adjust center position based on centerOffset prop */}
        {/* This allows us to align with TerminalWindow center */}
        <g transform={`translate(${960 + centerOffset.x}, ${540 + centerOffset.y})`}>
          {/* Center vortex point */}
          <circle 
            cx="0" 
            cy="0" 
            r="2" 
            fill="var(--color-text-primary)" 
            filter="url(#hyperspace-glow)"
          >
            <animate 
              attributeName="r" 
              values="2;4;2" 
              dur="2s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0.5;1;0.5" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Tunnel rings */}
          {rings.map((ring) => (
            <circle
              key={ring.id}
              cx="0"
              cy="0"
              r="5"
              stroke="var(--color-text-primary)"
              strokeWidth="1"
              fill="none"
              opacity="0"
              filter="url(#hyperspace-glow)"
            >
              <animate
                attributeName="r"
                values="5;50;150;300;500;800;1200"
                dur={`${ring.duration}s`}
                begin={`${ring.delay}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.25 0 0.5 1;0.25 0 0.5 1;0.25 0 0.5 1;0.25 0 0.5 1;0.25 0 0.5 1;0.25 0 0.5 1"
                keyTimes="0;0.1;0.2;0.4;0.6;0.8;1"
              />
              
              <animate
                attributeName="opacity"
                values="0;0.8;0.7;0.5;0.3;0.1;0"
                dur={`${ring.duration}s`}
                begin={`${ring.delay}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
              />
              
              <animate
                attributeName="stroke-width"
                values="2;1.5;1;0.7;0.5;0.3;0.1"
                dur={`${ring.duration}s`}
                begin={`${ring.delay}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
              />
              
              <animate
                attributeName="stroke"
                values="var(--color-text-primary);var(--color-border);var(--color-active);var(--color-border-darker)"
                dur={`${ring.duration}s`}
                begin={`${ring.delay}s`}
                fill="freeze"
              />
            </circle>
          ))}
          
          {/* Particle stars */}
          {particles.map((particle) => (
            <circle
              key={particle.id}
              cx={particle.startX}
              cy={particle.startY}
              r="0.5"
              fill="var(--color-text-primary)"
              opacity="0"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0; ${particle.endX} ${particle.endY}`}
                dur={`${particle.duration}s`}
                begin={`${particle.delay}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.25 0 0.5 1"
              />
              
              <animate
                attributeName="opacity"
                values="0;0.6;0"
                dur={`${particle.duration}s`}
                begin={`${particle.delay}s`}
                fill="freeze"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}