import React from 'react';
// Temporarily comment out the globals.css import
// import '../src/app/globals.css';

// Import just the basic Tailwind CSS for Storybook
import './storybook-tailwind.css';
import { MockSessionProvider } from '../test-utils/storybook-mocks.jsx';

export const parameters = {
  actions: {},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'terminal',
    values: [
      { name: 'terminal', value: '#000000' },
      { name: 'dark', value: '#1a1a1a' },
      { name: 'light', value: '#ffffff' },
    ],
  },
};

// Global decorator - applies MockSessionProvider to ALL stories automatically
export const decorators = [
  (Story) => (
    <MockSessionProvider>
      <div
        className="min-h-screen bg-black text-green-400 p-4"
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          // Ensure CSS variables are applied
          '--font-ibm-plex-mono': 'IBM Plex Mono, monospace',
        }}
      >
        <Story />
      </div>
    </MockSessionProvider>
  ),
];
