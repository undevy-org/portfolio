import React from 'react';
// Import global CSS for theme variables and Tailwind
import '../src/app/globals.css';
import './storybook-tailwind.css';
import { withTheme } from './theme-decorator';
import { MockSessionProvider } from '../test-utils/storybook-mocks.jsx';

// Define the theme switcher for Storybook's toolbar
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Terminal theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      title: 'Theme',
      items: [
        { value: 'default', title: 'Terminal Dark' },
        { value: 'light', title: 'Terminal Light' },
        { value: 'amber', title: 'Amber Phosphor' },
        { value: 'bsod', title: 'BSOD Classic' },
        { value: 'synthwave', title: 'Synthwave 84' },
        { value: 'operator', title: 'Operator Mono' },
        { value: 'kyoto', title: 'Kyoto Sunset' },
        { value: 'radar', title: 'Radar Green' }
      ],
      dynamicTitle: true
    }
  }
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    expanded: true
  },
  layout: 'padded',
  backgrounds: {
    disable: true // Disable default backgrounds since themes handle this
  }
};

// Apply decorators in the correct order
export const decorators = [
  withTheme, // Theme must be first to set CSS variables
  (Story) => (
    <MockSessionProvider>
      <Story />
    </MockSessionProvider>
  )
];
