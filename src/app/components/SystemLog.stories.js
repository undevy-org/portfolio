// src/app/components/SystemLog.stories.js
import SystemLog from './SystemLog';
import { useState, useEffect } from 'react';

/**
 * SystemLog Story Configuration
 */
const meta = {
  title: 'Components/SystemLog',
  component: SystemLog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Terminal-style system log display with chronological entries and typewriter cursor. Shows session activity and system messages.',
      },
    },
  },
  argTypes: {},
};

export default meta;

/**
 * Primary story - Default log display
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Default system log with initial mock entries.',
      },
    },
  },
};

/**
 * Mock data variations
 */
export const WithMockEntries = {
  parameters: {
    docs: {
      description: {
        story: 'System log with custom mock entries showing various system activities.',
      },
    },
  },
};

/**
 * Long log with scrolling
 */
export const LongLogHistory = {
  parameters: {
    docs: {
      description: {
        story: 'Long system log showing detailed session history with scrolling.',
      },
    },
  },
};

/**
 * Empty log state
 */
export const EmptyLog = {
  parameters: {
    docs: {
      description: {
        story: 'System log with no entries (empty state).',
      },
    },
  },
};

/**
 * Special messages - Access granted
 */
export const AccessGranted = {
  parameters: {
    docs: {
      description: {
        story: 'System log showing the ACCESS GRANTED special message with highlighting.',
      },
    },
  },
};

/**
 * Error states and warnings
 */
export const WithErrors = {
  parameters: {
    docs: {
      description: {
        story: 'System log showing error states and warnings.',
      },
    },
  },
};

/**
 * Navigation heavy log
 */
export const NavigationTracking = {
  parameters: {
    docs: {
      description: {
        story: 'System log focused on navigation tracking within the portfolio.',
      },
    },
  },
};

/**
 * Performance metrics
 */
export const PerformanceMetrics = {
  parameters: {
    docs: {
      description: {
        story: 'System log showing performance metrics and system health.',
      },
    },
  },
};

/**
 * Interactive demo with live updates
 */
const LiveLogDemo = () => {
  const [logEntries, setLogEntries] = useState([
    '[18:50:01] SYSTEM LOG INITIALIZED',
    '[18:50:02] DEMO MODE ACTIVE'
  ]);

  const addRandomLog = () => {
    const messages = [
      'NAVIGATE: MainHub',
      'USER INTERACTION: button clicked',
      'COMPONENT LOADED: SystemLog',
      'THEME CHANGED: CYBERPUNK',
      'SUCCESS: Operation completed',
      'SESSION EXTENDED: user active',
      'PERFORMANCE: Animation completed',
      'METRICS: Event tracked'
    ];

    const timestamp = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newEntry = `[${timestamp}] ${randomMessage}`;

    setLogEntries(prev => [...prev.slice(-19), newEntry]);
  };

  const clearLogs = () => {
    setLogEntries([]);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-secondary mb-4">
        Interactive system log demo - click buttons to add entries or clear them all.
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-primary text-bg rounded hover:bg-primary/80 transition-colors"
          onClick={addRandomLog}
        >
          Add Random Log Entry
        </button>
        <button
          className="px-4 py-2 bg-secondary text-bg rounded hover:bg-secondary/80 transition-colors"
          onClick={clearLogs}
        >
          Clear All Logs
        </button>
      </div>

      <SystemLog />
    </div>
  );
};

export const InteractiveDemo = () => <LiveLogDemo />;

InteractiveDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demo allowing live addition and clearing of log entries.',
    },
  },
  layout: 'padded',
};

/**
 * Session lifecycle log
 */
export const SessionLifecycle = {
  parameters: {
    docs: {
      description: {
        story: 'System log showing complete session lifecycle from authentication to extension.',
      },
    },
  },
};

/**
 * Theme switching log
 */
export const ThemeSwitchingLog = {
  parameters: {
    docs: {
      description: {
        story: 'System log focused on theme switching activities and persistence.',
      },
    },
  },
};
