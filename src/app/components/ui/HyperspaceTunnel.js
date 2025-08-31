// src/app/components/ui/HyperspaceTunnel.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from '../../context/SessionContext';

/**
 * HyperspaceTunnel Component - Fully Fixed Version
 * 
 * FIXES:
 * 1. Proper full-screen coverage without gaps
 * 2. Dynamic viewBox that adapts to screen size
 * 3. Correct background handling for all themes
 * 4. Better center positioning that works on all screen sizes
 */
export default function HyperspaceTunnel({ 
  isActive = false, 
  progress = 0,
  duration = 6000,
  onComplete = () => {}
}) {
  const { theme } = useSession();
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
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
  
  if (!isActive) return null;
  
  // Calculate center position - slightly above center for better visual effect
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2 - (dimensions.height * 0.1); // Move up by 10% for better composition
  
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
        zIndex: -1, // Above background but below content
        // Always fill the entire viewport
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
      }}
    >
      <svg 
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none" // Changed from "xMidYMid slice" to prevent cropping
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          {/* Center glow gradient using theme colors */}
          <radialGradient id="hyperspace-center-glow" cx="50%" cy="45%">
            <stop offset="0%" stopColor="var(--color-text-primary)" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </stop>
            <stop offset="30%" stopColor="var(--color-border)" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="var(--color-active)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          
          {/* Pulsing background gradient */}
          <radialGradient id="hyperspace-pulse-gradient" cx="50%" cy="45%">
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
        
        {/* FIXED: Full background coverage with theme-aware color */}
        <rect 
          width="100%" 
          height="100%" 
          fill="var(--color-bg)"
          opacity="1"
        />
        
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
        
        {/* Animation centered with calculated position */}
        <g transform={`translate(${centerX}, ${centerY})`}>
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