// src/app/components/ui/MorphingTerminal.js
'use client';
import { useState, useEffect } from 'react';
import { useSession } from '../../context/SessionContext';

const MorphingTerminal = ({ autoPlay = true, frameDelay = 150 }) => {
  const { theme } = useSession();
  const [currentFrame, setCurrentFrame] = useState(0);

  // Define breathing animation frames
  // Each frame is exactly 19 characters wide and 9 lines tall
  // Using symbols with increasing visual density: ' ' -> '·' -> '○' -> '●' -> '█'
  const frames = [
    // Frame 0: Minimal core
    [
      "                   ",  // 19 spaces
      "                   ",
      "                   ",
      "        ·●·        ",  // Center point
      "                   ",
      "                   ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 1: First expansion
    [
      "                   ",
      "                   ",
      "       · · ·       ",
      "       · ● ·       ",
      "       · · ·       ",
      "                   ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 2: Growing ring
    [
      "                   ",
      "      · · · ·      ",
      "     · ○ ○ ○ ·     ",
      "     · ○ ● ○ ·     ",
      "     · ○ ○ ○ ·     ",
      "      · · · ·      ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 3: Expanding presence
    [
      "                   ",
      "    · · · · · ·    ",
      "   · ○ ○ ○ ○ ○ ·   ",
      "   · ○ ● ● ● ○ ·   ",
      "   · ○ ○ ○ ○ ○ ·   ",
      "    · · · · · ·    ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 4: Near maximum
    [
      "   · · · · · · ·   ",
      "  · ○ ○ ○ ○ ○ ○ ·  ",
      " · ○ ● ● ● ● ● ○ · ",
      " · ○ ● █ █ █ ● ○ · ",
      " · ○ ● ● ● ● ● ○ · ",
      "  · ○ ○ ○ ○ ○ ○ ·  ",
      "   · · · · · · ·   ",
      "                   ",
      "                   "
    ],
    // Frame 5: Maximum expansion
    [
      "  · · · · · · · ·  ",
      " · ○ ○ ○ ○ ○ ○ ○ · ",
      "· ○ ● ● ● ● ● ● ○ ·",
      "· ○ ● █ █ █ █ ● ○ ·",
      "· ○ ● ● ● ● ● ● ○ ·",
      " · ○ ○ ○ ○ ○ ○ ○ · ",
      "  · · · · · · · ·  ",
      "                   ",
      "                   "
    ],
    // Frame 6: Beginning contraction
    [
      "   · · · · · · ·   ",
      "  · ○ ○ ○ ○ ○ ○ ·  ",
      " · ○ ● ● ● ● ● ○ · ",
      " · ○ ● █ █ █ ● ○ · ",
      " · ○ ● ● ● ● ● ○ · ",
      "  · ○ ○ ○ ○ ○ ○ ·  ",
      "   · · · · · · ·   ",
      "                   ",
      "                   "
    ],
    // Frame 7: Contracting
    [
      "                   ",
      "    · · · · · ·    ",
      "   · ○ ○ ○ ○ ○ ·   ",
      "   · ○ ● ● ● ○ ·   ",
      "   · ○ ○ ○ ○ ○ ·   ",
      "    · · · · · ·    ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 8: Almost back to core
    [
      "                   ",
      "      · · · ·      ",
      "     · ○ ○ ○ ·     ",
      "     · ○ ● ○ ·     ",
      "     · ○ ○ ○ ·     ",
      "      · · · ·      ",
      "                   ",
      "                   ",
      "                   "
    ],
    // Frame 9: Return to near-minimal
    [
      "                   ",
      "                   ",
      "       · · ·       ",
      "       · ● ·       ",
      "       · · ·       ",
      "                   ",
      "                   ",
      "                   ",
      "                   "
    ]
  ];

  useEffect(() => {
    // Only animate if autoPlay is enabled
    if (!autoPlay) return;

    // Set up interval for frame changes
    const interval = setInterval(() => {
      setCurrentFrame(prevFrame => {
        // Loop back to beginning after last frame
        return (prevFrame + 1) % frames.length;
      });
    }, frameDelay);

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [autoPlay, frames.length, frameDelay]);

  /* Glow is minimal at frames 0,1,8,9 and maximal at frames 4,5 */
  const glowIntensity = () => {
    const intensityMap = [0.2, 0.3, 0.5, 0.7, 0.9, 1.0, 0.9, 0.7, 0.5, 0.3];
    return intensityMap[currentFrame] || 0.5;
  };

  return (
    <div className="flex items-center justify-center w-full">
      <pre 
        className="text-command font-mono text-sm leading-tight select-none"
        style={{
          /* Multiple shadows create a layered glow that adapts to theme */
          textShadow: `
            0 0 ${10 * glowIntensity()}px var(--color-text-command),
            0 0 ${20 * glowIntensity()}px var(--color-accent),
            0 0 ${30 * glowIntensity()}px var(--color-success)
          `,
          transition: 'text-shadow 0.3s ease-in-out',
          willChange: 'text-shadow'
        }}
      >
        {frames[currentFrame].map((line, index) => (
          <div 
            key={index} 
            className="whitespace-pre"
            style={{
              /* Existing opacity variation for depth */
              opacity: 0.8 + (Math.sin((currentFrame + index) * 0.5) * 0.2)
            }}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default MorphingTerminal;