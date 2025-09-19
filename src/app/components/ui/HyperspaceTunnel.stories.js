// src/app/components/ui/HyperspaceTunnel.stories.js
import HyperspaceTunnel from './HyperspaceTunnel';
import { useState } from 'react';

/**
 * HyperspaceTunnel Story Configuration
 */
const meta = {
  title: 'UI/HyperspaceTunnel',
  component: HyperspaceTunnel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An animated hyperspace tunnel effect used for screen transitions. Creates a dynamic starfield effect with expanding rings and particle animations.',
      },
    },
  },
  argTypes: {
    isActive: {
      control: 'boolean',
      description: 'Whether the tunnel animation is active',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress of the animation (0-100)',
    },
    duration: {
      control: 'number',
      description: 'Total duration of the animation in milliseconds',
    },
    onComplete: {
      control: 'object',
      description: 'Callback function when animation completes',
    },
  },
};

export default meta;

/**
 * Primary story - Default tunnel effect
 */
export const Default = {
  args: {
    isActive: true,
    progress: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default hyperspace tunnel with mid-animation progress.',
      },
    },
  },
};

/**
 * Animation states - Different progress levels
 */
export const AtStart = {
  args: {
    isActive: true,
    progress: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel at the beginning of the animation.',
      },
    },
  },
};

export const OneThirdComplete = {
  args: {
    isActive: true,
    progress: 33,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel one-third through the animation.',
      },
    },
  },
};

export const TwoThirdsComplete = {
  args: {
    isActive: true,
    progress: 67,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel two-thirds through the animation.',
      },
    },
  },
};

export const NearComplete = {
  args: {
    isActive: true,
    progress: 90,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel near the end of the animation.',
      },
    },
  },
};

export const Completed = {
  args: {
    isActive: true,
    progress: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel animation completed (will fade out).',
      },
    },
  },
};

/**
 * Interactive demo - Animated tunnel
 */
const AnimatedTunnelDemo = (args) => {
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);

  const startAnimation = () => {
    setProgress(0);
    setIsActive(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsActive(false), 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleComplete = () => {
    console.log('HyperspaceTunnel: Animation completed');
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Button to start animation */}
      <div className="absolute top-8 left-8 z-10">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={startAnimation}
        >
          Start Hyperspace Journey
        </button>
      </div>

      {/* Status display */}
      <div className="absolute top-8 right-8 z-10">
        <div className="bg-black bg-opacity-50 text-white p-4 rounded">
          <div>Active: {isActive ? 'Yes' : 'No'}</div>
          <div>Progress: {progress}%</div>
        </div>
      </div>

      {/* The tunnel */}
      <HyperspaceTunnel
        {...args}
        isActive={isActive}
        progress={progress}
        onComplete={handleComplete}
      />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Hyperspace Navigator</h2>
        <p className="text-gray-300">Experience the full tunnel animation</p>
      </div>
    </div>
  );
};

export const InteractiveDemo = () => <AnimatedTunnelDemo />;

InteractiveDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demo showing the full tunnel animation with controls.',
    },
  },
};

/**
 * Different durations
 */
export const FastTransition = {
  args: {
    isActive: true,
    progress: 50,
    duration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Faster tunnel animation with 3-second duration.',
      },
    },
  },
};

export const SlowTransition = {
  args: {
    isActive: true,
    progress: 50,
    duration: 10000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slower tunnel animation with 10-second duration.',
      },
    },
  },
};

/**
 * State variations - Hidden/inactive
 */
export const Inactive = {
  args: {
    isActive: false,
    progress: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel in inactive state (invisible).',
      },
    },
  },
};

/**
 * Callback demo
 */
const CallbackDemo = (args) => {
  const [message, setMessage] = useState('Click start to begin animation');

  const handleComplete = () => {
    setMessage('Animation completed! onComplete callback triggered.');
    setTimeout(() => {
      setMessage('Ready for another run');
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-black bg-opacity-75 text-white p-8 rounded-lg text-center max-w-md">
          <h3 className="text-lg font-bold mb-4">Callback Demo</h3>
          <p className="mb-4">{message}</p>
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => setMessage('Animation started...')}
            >
              Start Animation
            </button>
          </div>
        </div>
      </div>

      <HyperspaceTunnel
        {...args}
        isActive={message.includes('started')}
        progress={message.includes('started') ? 100 : 0}
        onComplete={handleComplete}
      />
    </div>
  );
};

export const WithCallback = () => <CallbackDemo />;

WithCallback.parameters = {
  docs: {
    description: {
      story: 'Demo showing the onComplete callback functionality.',
    },
  },
};

/**
 * Composition example - With other UI
 */
export const WithOverlayContent = {
  args: {
    isActive: true,
    progress: 30,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tunnel overlaying other content elements.',
      },
    },
    layout: 'fullscreen',
  },
};

/**
 * Real-world usage examples
 */
const NavigationTransition = (args) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Entry', 'Profile', 'Skills', 'Timeline', 'Main Hub'];

  const handleTransition = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    console.log('Navigation transition completed');
  };

  return (
    <div className="relative w-full h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-3xl font-bold">Portfolio Navigator</h1>

        <div className="text-xl">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </div>

        <div className="flex space-x-4 justify-center">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`px-4 py-2 rounded ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              {index < currentStep ? '✓' : step}
            </div>
          ))}
        </div>

        {currentStep < steps.length - 1 && (
          <button
            className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            onClick={handleTransition}
          >
            Transition to Next Step
          </button>
        )}

        {currentStep >= steps.length - 1 && (
          <p className="text-green-400">Navigation completed!</p>
        )}
      </div>

      <HyperspaceTunnel
        {...args}
        isActive={currentStep > 0 && currentStep < steps.length}
        progress={currentStep === steps.length - 1 ? 100 : 0}
        onComplete={handleComplete}
      />
    </div>
  );
};

export const NavigationTransitionDemo = () => <NavigationTransition />;

NavigationTransitionDemo.parameters = {
  docs: {
    description: {
      story: 'Real-world example of using HyperspaceTunnel for navigation transitions.',
    },
  },
};

/**
 * Performance test - Many particles
 */
export const PerformanceTest = {
  args: {
    isActive: true,
    progress: 25,
    duration: 8000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with extended duration to observe stability.',
      },
    },
  },
};
