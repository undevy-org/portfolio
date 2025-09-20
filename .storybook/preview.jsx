import '../src/app/globals.css';
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
      <div className="min-h-screen bg-black text-green-400 p-4">
        <Story />
      </div>
    </MockSessionProvider>
  ),
];
