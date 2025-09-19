// src/app/components/ui/TerminalProgress.stories.js
import TerminalProgress from './TerminalProgress';

/**
 * TerminalProgress Story Configuration
 */
const meta = {
  title: 'UI/TerminalProgress',
  component: TerminalProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An ASCII-style progress indicator with animated terminal-style display and customizable steps.',
      },
    },
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current progress value (0-100)',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Total progress value (default: 100)',
    },
    message: {
      control: 'text',
      description: 'Progress message shown above progress bar',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show percentage text',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the progress bar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

/**
 * Primary story - Default usage
 */
export const Default = {
  args: {
    current: 50,
    total: 100,
    message: 'Processing files...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default progress indicator with 50% completion.',
      },
    },
  },
};

/**
 * Progress states - Different percentages
 */
export const Empty = {
  args: {
    current: 0,
    message: 'Starting...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Zero progress state.',
      },
    },
  },
};

export const Quarter = {
  args: {
    current: 25,
    message: '25% complete',
  },
  parameters: {
    docs: {
      description: {
        story: '25% progress.',
      },
    },
  },
};

export const ThreeQuarters = {
  args: {
    current: 75,
    message: 'Almost done...',
  },
  parameters: {
    docs: {
      description: {
        story: '75% progress.',
      },
    },
  },
};

export const Complete = {
  args: {
    current: 100,
    message: 'Complete!',
  },
  parameters: {
    docs: {
      description: {
        story: '100% completion state.',
      },
    },
  },
};

/**
 * Animation states
 */
export const Animated = {
  args: {
    current: 60,
    message: 'Downloading...',
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated progress bar.',
      },
    },
  },
};

export const FastAnimation = {
  args: {
    current: 80,
    total: 100,
    message: 'Quick operation',
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fast animated progress.',
      },
    },
  },
};

/**
 * Display variations - With/without features
 */
export const WithPercentage = {
  args: {
    current: 45,
    message: 'Processing data',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with percentage display.',
      },
    },
  },
};

export const WithoutPercentage = {
  args: {
    current: 35,
    message: 'Loading data...',
    showPercentage: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar without percentage text.',
      },
    },
  },
};

/**
 * Message variations - Different loading states
 */
export const ShortMessage = {
  args: {
    current: 30,
    message: 'Loading',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Very short progress message.',
      },
    },
  },
};

export const LongMessage = {
  args: {
    current: 65,
    message: 'Installing dependencies and configuring environment',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Long, descriptive progress message.',
      },
    },
  },
};

/**
 * Real-world examples
 */
export const FileDownload = {
  args: {
    current: 72,
    message: 'Downloading project files...',
    showPercentage: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'File download progress simulation.',
      },
    },
  },
};

export const DataProcessing = {
  args: {
    current: 88,
    message: 'Analyzing dataset',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data processing progress indicator.',
      },
    },
  },
};

export const SystemUpdate = {
  args: {
    current: 15,
    message: 'Updating system components...',
    showPercentage: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'System update progress with slow initial phase.',
      },
    },
  },
};

/**
 * Terminal simulation - Multiple progress bars in sequence
 */
export const TerminalSequence = () => (
  <div className="space-y-4 p-4 bg-black text-green-400 font-mono text-sm max-w-md">
    <div>INITIALIZING TERMINAL CONNECTION</div>

    <TerminalProgress
      current={100}
      message="Connecting to server..."
    />

    <div>AUTHENTICATING...</div>
    <TerminalProgress
      current={100}
      message="Verifying credentials"
    />

    <div>TRANSFERRING FILES...</div>
    <TerminalProgress
      current={65}
      message="Uploading project files"
      animated
    />

    <div>DEPLOYMENT STATUS</div>
    <TerminalProgress
      current={45}
      message="Configuring environment"
      showPercentage
    />

    <div>WAITING...</div>
  </div>
);

TerminalSequence.parameters = {
  docs: {
    description: {
      story: 'Simulated terminal output with multiple progress indicators.',
    },
  },
};

/**
 * Edge case stories
 */
export const OverLimit = {
  args: {
    current: 150,
    total: 100,
    message: 'Over-progress demo',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case where current exceeds total.',
      },
    },
  },
};

export const SmallTotal = {
  args: {
    current: 2,
    total: 3,
    message: 'Fine-grained progress',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress with small total value.',
      },
    },
  },
};

export const LargeTotal = {
  args: {
    current: 1024,
    total: 2048,
    message: 'Large scale operation',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress with large total values.',
      },
    },
  },
};

export const WithCustomClass = {
  args: {
    current: 40,
    message: 'Custom styled progress',
    className: 'text-lg font-bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator with custom styling.',
      },
    },
  },
};
