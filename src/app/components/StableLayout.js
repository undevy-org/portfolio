// src/app/components/StableLayout.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';

export default function StableLayout({ children, showPanels = true }) {
  const { currentScreen } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);
  
  // Special handling for Entry screen - it shouldn't have fixed height
  const isEntryScreen = currentScreen === 'Entry';
  
  return (
    <div className="stable-layout-root min-h-screen flex flex-col">
      <div 
        className={`
          flex-1 
          flex 
          flex-col 
          ${isMobile ? 
            'pt-4' :  // Mobile: Add top padding
            'justify-center'  // Desktop: Center vertically
          }
          px-2 
          md:px-4
        `}
      >
        {/* Main content container */}
        <div 
          className={`
            mx-auto 
            w-full 
            max-w-2xl
            ${!isEntryScreen && !isMobile ? 
              'md:h-[700px]' :  // Fixed height for non-Entry screens on desktop
              ''  // Flexible height for Entry or mobile
            }
          `}
        >
          {children}
        </div>
        
        {showPanels && !isMobile && (
          <div className="h-64 mt-4" aria-hidden="true">
            {/* This matches approximate height of AnalyticsPanel + SystemLog */}
          </div>
        )}
      </div>
    </div>
  );
}