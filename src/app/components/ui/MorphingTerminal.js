// src/app/components/ui/MorphingTerminal.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '../../context/SessionContext';

const MorphingTerminal = ({ autoPlay = false, loopAnimation = true, frameDelay = 600 }) => {
  const { theme } = useSession();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  // Define all animation frames
  const frames = [
    // Frame 0: Empty canvas
    [
      "                              ",
      "                              ",
      "                              ",
      "                              ",
      "                              ",
      "                              ",
      "                              ",
      "                              "
    ],

    // Frame 1: Sparse dots appear
    [
      "         .        .           ",
      "   .               .     .    ",
      "                .             ",
      "      .     .          .      ",
      "   .                .         ",
      "                .        .    ",
      "        .                .    ",
      "                              "
    ],

    // Frame 2: More dots, light noise
    [
      "     .     o     .      o     ",
      "  o     .       o    .        ",
      "     .     o        .     o   ",
      "  .     o     .   o      .    ",
      "     .       o     .      o   ",
      "  o     .        o    .       ",
      "     .     o        .     o   ",
      "                              "
    ],

    // Frame 3: Dots begin clustering
    [
      "     o  .  o  .  o  .  o      ",
      "  .  o  .  o  .  o  .  o   .  ",
      "     o  .  o  .  o  .  o      ",
      "  .  o  .  o  .  o  .  o   .  ",
      "     o  .  o  .  o  .  o      ",
      "  .  o  .  o  .  o  .  o   .  ",
      "     o  .  o  .  o  .  o      ",
      "                              "
    ],

    // Frame 4: Ordered grid emerges
    [
      "  o  .  o  .  o  .  o  .  o   ",
      "  .  o  .  o  .  o  .  o  .   ",
      "  o  .  o  .  o  .  o  .  o   ",
      "  .  o  .  o  .  o  .  o  .   ",
      "  o  .  o  .  o  .  o  .  o   ",
      "  .  o  .  o  .  o  .  o  .   ",
      "  o  .  o  .  o  .  o  .  o   ",
      "                              "
    ],

    // Frame 5: Grid sharpens (O)
    [
      "  O  .  O  .  O  .  O  .  O   ",
      "  .  O  .  O  .  O  .  O  .   ",
      "  O  .  O  .  O  .  O  .  O   ",
      "  .  O  .  O  .  O  .  O  .   ",
      "  O  .  O  .  O  .  O  .  O   ",
      "  .  O  .  O  .  O  .  O  .   ",
      "  O  .  O  .  O  .  O  .  O   ",
      "                              "
    ],

    // Frame 6: Introducing # pattern
    [
      "  O  .  O  #  O  #  O  .  O   ",
      "  .  O  #  O  #  O  #  O  .   ",
      "  O  #  O  #  O  #  O  #  O   ",
      "  #  O  #  O  #  O  #  O  #   ",
      "  O  #  O  #  O  #  O  #  O   ",
      "  .  O  #  O  #  O  #  O  .   ",
      "  O  .  O  #  O  #  O  .  O   ",
      "                              "
    ],

    // Frame 7: Central motif starts
    [
      "  O  .  O  #  O  #  O  .  O   ",
      "  .  #  #  O  O  O  #  #  .   ",
      "  O  #  O  O  #  O  O  #  O   ",
      "  #  O  O  #  #  #  O  O  #   ",
      "  O  #  O  O  #  O  O  #  O   ",
      "  .  #  #  O  O  O  #  #  .   ",
      "  O  .  O  #  O  #  O  .  O   ",
      "                              "
    ],

    // Frame 8: Pattern intensifies
    [
      "  #  O  #  O  #  O  #  O  #   ",
      "  O  #  O  #  O  #  O  #  O   ",
      "  #  O  #  O  #  O  #  O  #   ",
      "  O  #  O  #  O  #  O  #  O   ",
      "  #  O  #  O  #  O  #  O  #   ",
      "  O  #  O  #  O  #  O  #  O   ",
      "  #  O  #  O  #  O  #  O  #   ",
      "                              "
    ],

    // Frame 9: Solid abstract blocks
    [
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "                              ",
      "                              ",
      "                              "
    ],

    // Frame 10: Highlight pass 1
    [
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "        Building details...   ",
      "                              ",
      "                              "
    ],

    // Frame 11: Highlight pass 2
    [
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "        Finalizing pattern... ",
      "                              ",
      "                              "
    ],

    // Frame 12: Finale title appears
    [
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "       * Pixel artifact *     ",
      "            compiled          ",
      "                              "
    ],

    // Frame 13: Atmospheric ending (stop here)
    [
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "  #  #   #  #   #  #   #  #   ",
      "  ####   ####   ####   ####   ",
      "       * Pixel artifact *     ",
      "        Ready for launch...   ",
      "                              "
    ]
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame(prevFrame => {
        const nextFrame = prevFrame + 1;
        
        // If we reached the end
        if (nextFrame >= frames.length) {
          // If looping is enabled, restart
          if (loopAnimation) {
            return 0;
          } else {
            // Otherwise stop playing
            setIsPlaying(false);
            return prevFrame;
          }
        }
        
        return nextFrame;
      });
    }, frameDelay);

    return () => clearInterval(interval);
  }, [isPlaying, frames.length, loopAnimation, frameDelay]);

  // Function to start animation (can be called from parent component)
  const startAnimation = () => {
    setCurrentFrame(0);
    setIsPlaying(true);
  };

  // Function to stop animation
  const stopAnimation = () => {
    setIsPlaying(false);
  };

  // Function to reset animation
  const resetAnimation = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  return (
    <div className={`font-mono text-xs ${
      "text-command"
    }`}>
      {frames[currentFrame].map((line, index) => (
        <div key={index} className="text-center whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
};

export default MorphingTerminal;