'use client';

import { useState, useEffect } from 'react';
import { useSession } from '../../context/SessionContext';

const AnimatedAsciiArt = () => {
  const { theme } = useSession();
  const [frame, setFrame] = useState(0);

  const frames = [
    [
      '    ╔══════════════════╗',
      '    ║                  ║',
      '    ║                  ║',
      '    ║                  ║',
      '    ║                  ║',
      '    ╚══════════════════╝'
    ],
    [
      '    ╔══════════════════╗',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ╚══════════════════╝'
    ],
    [
      '    ╔══════════════════╗',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ║  ▓▓ PORTFOLIO ▓▓  ║',
      '    ║  ▓▓          ▓▓  ║',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ╚══════════════════╝'
    ],
    [
      '    ╔══════════════════╗',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ║  ▓▓ PORTFOLIO ▓▓  ║',
      '    ║  ▓▓  SYSTEM   ▓▓  ║',
      '    ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║',
      '    ╚══════════════════╝'
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prevFrame => {
        if (prevFrame < frames.length - 1) {
          return prevFrame + 1;
        }
        clearInterval(interval);
        return prevFrame;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <div className={`font-mono text-xs ${
      theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
    }`}>
      {frames[frame].map((line, index) => (
        <div key={index} className="text-center whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
};

export default AnimatedAsciiArt;
