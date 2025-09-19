// src/app/components/SystemLog.stories.js
import SystemLog from './SystemLog';
import { MockSessionProvider } from '../../../test-utils/storybook-mocks.jsx';
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
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:45:23] STORYBOOK SESSION INITIALIZED',
          '[18:45:24] THEME CHANGED: OPERATOR 🔄',
          '[18:45:25] NAVIGATE: MainHub',
          '[18:45:26] USER INTERACTION: portfolio viewed',
          '[18:45:27] COMPONENT LOADED: SystemLog',
          '[18:45:28] SESSION ACTIVE: 3 minutes elapsed'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:00:01] SESSION STARTED: User authenticated',
          '[18:00:02] NAVIGATE: Entry → MainHub',
          '[18:01:15] COMPONENT LOADED: NavigationPanel',
          '[18:01:16] USER INTERACTION: case_list selected',
          '[18:01:17] NAVIGATE: MainHub → CaseList',
          '[18:02:33] COMPONENT LOADED: CaseGrid',
          '[18:02:34] DATA FETCHED: 8 cases retrieved',
          '[18:03:12] USER INTERACTION: case_details clicked',
          '[18:03:13] NAVIGATE: CaseList → CaseDetail',
          '[18:04:27] COMPONENT LOADED: CaseDetailView',
          '[18:04:28] THEME CHANGED: DARK 🔒',
          '[18:05:41] USER INTERACTION: back_navigation',
          '[18:05:42] NAVIGATE: CaseDetail → CaseList',
          '[18:06:18] USER INTERACTION: main_menu clicked',
          '[18:06:19] NAVIGATE: CaseList → MainHub',
          '[18:07:33] COMPONENT LOADED: StatsPanel',
          '[18:07:34] METRICS UPDATED: visitor_count +1',
          '[18:08:52] USER INTERACTION: theme_toggle',
          '[18:08:53] THEME CHANGED: CYBERPUNK 🔄',
          '[18:09:17] SESSION EXTENDED: timeout reset',
          '[18:10:44] COMPONENT LOADED: ContactForm',
          '[18:11:23] VALIDATION PASSED: email format correct',
          '[18:12:05] FORM SUBMITTED: contact request sent',
          '[18:12:06] SUCCESS: message delivered',
          '[18:13:28] NAVIGATE: MainHub → Profile',
          '[18:14:12] COMPONENT LOADED: ProfileDataGrid',
          '[18:15:33] USER INTERACTION: data_filtered',
          '[18:16:47] EXPORT REQUESTED: profile_data.csv',
          '[18:16:48] DOWNLOAD STARTED: preparing file',
          '[18:16:49] DOWNLOAD COMPLETED: 2.3KB transferred'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: []
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:45:12] ACCESS CODE VALIDATION: checking format...',
          '[18:45:13] SECURITY CHECK: authentication successful',
          '[18:45:14] INITIALIZATION: loading user profile...',
          '[18:45:15] ACCESS GRANTED: portfolio unlocked'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:45:01] SESSION STARTED: initializing components',
          '[18:45:02] COMPONENT LOADED: NavigationPanel',
          '[18:45:03] ERROR: Failed to load theme configuration',
          '[18:45:04] WARNING: Falling back to default theme',
          '[18:45:05] COMPONENT LOADED: ThemeSwitcher',
          '[18:45:06] WARNING: API rate limit approaching',
          '[18:45:07] COMPONENT LOADED: DataGrid',
          '[18:45:08] ERROR: Network timeout - retrying...',
          '[18:45:09] SUCCESS: Connection restored',
          '[18:45:10] COMPONENT LOADED: CaseDetail'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:40:15] SESSION STARTED: portfolio accessed',
          '[18:40:16] NAVIGATE: Entry → MainHub',
          '[18:41:22] NAVIGATE: MainHub → CaseList',
          '[18:42:18] NAVIGATE: CaseList → CaseDetail',
          '[18:43:05] NAVIGATE: CaseDetail → CaseList',
          '[18:43:32] NAVIGATE: CaseList → CaseDetail',
          '[18:44:44] NAVIGATE: CaseDetail → CaseList',
          '[18:45:12] NAVIGATE: CaseList → SkillDetail',
          '[18:45:55] NAVIGATE: SkillDetail → SkillsGrid',
          '[18:46:38] NAVIGATE: SkillsGrid → MainHub',
          '[18:47:01] NAVIGATE: MainHub → Timeline',
          '[18:47:45] NAVIGATE: Timeline → MainHub',
          '[18:48:12] NAVIGATE: MainHub → Contact',
          '[18:49:28] NAVIGATE: Contact → MainHub'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:45:01] PERFORMANCE: App loaded in 1450ms',
          '[18:45:02] METRICS: Bundle size parsed (2.3MB)',
          '[18:45:03] PERFORMANCE: Navigation transition completed (120ms)',
          '[18:45:04] METRICS: Memory usage 45.2MB / 512MB',
          '[18:45:05] PERFORMANCE: Component render time <16ms',
          '[18:45:06] METRICS: Network requests: 12 (cached: 8)',
          '[18:45:07] PERFORMANCE: Animation frame rate 60fps',
          '[18:45:08] PERFORMANCE: Theme switch completed (80ms)'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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

      <MockSessionProvider mockSession={{ logEntries }}>
        <SystemLog />
      </MockSessionProvider>
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[17:30:15] SESSION REQUEST: Access code entered',
          '[17:30:16] AUTHENTICATION: Validating credentials...',
          '[17:30:17] AUTHENTICATION: Credentials verified',
          '[17:30:18] AUTHORIZATION: Checking permissions...',
          '[17:30:19] AUTHORIZATION: Access granted',
          '[17:30:20] SESSION INITIALIZED: ID sb-12345-abc',
          '[17:30:21] PROFILE LOADED: John Doe, Senior Developer',
          '[17:30:22] THEME APPLIED: dark mode active',
          '[17:32:18] FIRST NAVIGATION: MainHub loaded',
          '[17:35:44] SESSION EXTENDED: Activity detected',
          '[17:45:12] COMPONENT LOADED: CaseList view',
          '[17:48:33] NETWORK REQUEST: Cases data fetched',
          '[17:52:07] INTERACTION: Case study viewed',
          '[18:00:01] SESSION EXTENDED: Automatic renewal',
          '[18:10:16] SAVE POINT: Auto-saved at 18:10',
          '[18:15:33] SESSION EXTENDED: Activity renewed',
          '[18:20:01] SAVE POINT: Auto-saved at 18:20',
          '[18:25:44] WARNING: 5 minute timeout approaching',
          '[18:29:12] REMINDER: Session expires in 60 seconds',
          '[18:29:59] EXTENSION REQUESTED: User interaction',
          '[18:30:00] SESSION EXTENDED: Successfully renewed'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{
        logEntries: [
          '[18:40:15] THEME DETECTED: system preference dark',
          '[18:40:16] THEME CHANGED: DARK (auto) 🔄',
          '[18:41:22] USER INTERACTION: theme_switcher clicked',
          '[18:41:23] THEME CHANGED: LIGHT 🔒',
          '[18:42:18] THEME PERSISTED: manual override saved',
          '[18:43:05] USER INTERACTION: theme_switcher clicked',
          '[18:43:06] THEME CHANGED: AMBER 🔒',
          '[18:44:12] USER INTERACTION: theme_switcher clicked',
          '[18:44:13] THEME CHANGED: BSOD 🔒',
          '[18:45:08] USER INTERACTION: theme_switcher clicked',
          '[18:45:09] THEME CHANGED: SYNTHWAVE 🔒',
          '[18:46:15] USER INTERACTION: theme_switcher clicked',
          '[18:46:16] THEME CHANGED: OPERATOR 🔒',
          '[18:47:33] USER INTERACTION: theme_switcher clicked',
          '[18:47:34] THEME CHANGED: KYOTO 🔒',
          '[18:48:21] USER INTERACTION: theme_switcher clicked',
          '[18:48:22] THEME CHANGED: RADAR 🔒',
          '[18:49:18] USER INTERACTION: auto_theme_toggle',
          '[18:49:19] THEME RESET: Automatic mode enabled 🔄'
        ]
      }}>
        <Story />
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'System log focused on theme switching activities and persistence.',
      },
    },
  },
};
