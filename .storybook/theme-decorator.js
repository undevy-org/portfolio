// .storybook/theme-decorator.js
import React, { useEffect } from 'react';

// Define all 8 themes with their CSS variable mappings
// These match the CSS variables in src/app/globals.css
const themes = {
  default: {
    name: 'Terminal Dark',
    class: 'theme-default',
    dataAttribute: 'dark',
    variables: {
      '--color-bg': '#000000',
      '--color-text-primary': '#86efac',
      '--color-text-secondary': '#9ca3af',
      '--color-text-tertiary': '#6b7280',
      '--color-text-command': '#eab308',
      '--color-text-white': '#ffffff',
      '--color-border': '#22c55e',
      '--color-border-darker': '#166534',
      '--color-active': '#053516',
      '--color-error': '#dc2626',
      '--color-success': '#4ade80',
      '--color-input-bg': '#111827',
      '--color-hover': 'rgba(34, 197, 94, 0.1)',
      '--color-accent': '#22d3ee',
      '--color-btn-bg': 'rgba(255, 255, 255, 0.07)',
      '--color-btn-bg-hover': 'rgba(255, 255, 255, 0.09)',
      '--texture-line-color': '34, 197, 94',
      '--texture-opacity': '0.09',
      '--texture-grid-size': '100px'
    }
  },
  light: {
    name: 'Terminal Light',
    class: 'theme-light',
    dataAttribute: 'light',
    variables: {
      '--color-bg': '#ffffff',
      '--color-text-primary': '#065f46',
      '--color-text-secondary': '#4b5563',
      '--color-text-tertiary': '#9ca3af',
      '--color-text-command': '#b45309',
      '--color-text-white': '#0a0a0a',
      '--color-border': '#10b981',
      '--color-border-darker': '#059669',
      '--color-active': '#d1fae5',
      '--color-error': '#dc2626',
      '--color-success': '#059669',
      '--color-input-bg': '#ffffff',
      '--color-hover': 'rgba(5, 150, 105, 0.1)',
      '--color-accent': '#0284c7',
      '--color-btn-bg': 'rgba(5, 150, 105, 0.05)',
      '--color-btn-bg-hover': 'rgba(5, 150, 105, 0.1)',
      '--texture-line-color': '59, 130, 246',
      '--texture-opacity': '0.09',
      '--texture-grid-size': '120px'
    }
  },
  amber: {
    name: 'Amber Phosphor',
    class: 'theme-amber',
    dataAttribute: 'amber',
    variables: {
      '--color-bg': '#1C140D',
      '--color-text-primary': '#FFB86C',
      '--color-text-secondary': '#D9A15D',
      '--color-text-tertiary': '#B08953',
      '--color-text-command': '#FFD173',
      '--color-text-white': '#FFB86C',
      '--color-border': '#FF9F1C',
      '--color-border-darker': '#8B5A00',
      '--color-active': '#4d2e08',
      '--color-error': '#FF6B6B',
      '--color-success': '#4ADE80',
      '--color-input-bg': '#1B1210',
      '--color-hover': 'rgba(255, 184, 108, 0.08)',
      '--color-accent': '#FFDDAA',
      '--color-btn-bg': 'rgba(255, 184, 108, 0.05)',
      '--color-btn-bg-hover': 'rgba(255, 184, 108, 0.1)',
      '--texture-line-color': '251, 146, 60',
      '--texture-opacity': '0.05',
      '--texture-grid-size': '100px'
    }
  },
  bsod: {
    name: 'BSOD Classic',
    class: 'theme-bsod',
    dataAttribute: 'bsod',
    variables: {
      '--color-bg': '#0B4DA8',
      '--color-text-primary': '#FFFFFF',
      '--color-text-secondary': '#CFE9FF',
      '--color-text-tertiary': '#9EC7FF',
      '--color-text-command': '#E1F0FF',
      '--color-text-white': '#FFFFFF',
      '--color-border': '#E6F3FF',
      '--color-border-darker': '#7FB3FF',
      '--color-active': '#0066FF',
      '--color-error': '#FF6B6B',
      '--color-success': '#00D084',
      '--color-input-bg': '#073A93',
      '--color-hover': 'rgba(230, 243, 255, 0.06)',
      '--color-accent': '#88B8FF',
      '--color-btn-bg': 'rgba(230, 243, 255, 0.08)',
      '--color-btn-bg-hover': 'rgba(230, 243, 255, 0.15)',
      '--texture-line-color': '255, 255, 255',
      '--texture-opacity': '0.08',
      '--texture-grid-size': '80px'
    }
  },
  synthwave: {
    name: 'Synthwave 84',
    class: 'theme-synthwave',
    dataAttribute: 'synthwave',
    variables: {
      '--color-bg': '#1A103C',
      '--color-text-primary': '#FF00E5',
      '--color-text-secondary': '#00BFFF',
      '--color-text-tertiary': '#7B61FF',
      '--color-text-command': '#F7B801',
      '--color-text-white': '#FF00E5',
      '--color-border': '#FF00E5',
      '--color-border-darker': '#00BFFF',
      '--color-active': '#4C00A4',
      '--color-error': '#FF1B1B',
      '--color-success': '#39FF14',
      '--color-input-bg': '#2C1E5C',
      '--color-hover': 'rgba(255, 0, 229, 0.1)',
      '--color-accent': '#00F6FF',
      '--color-btn-bg': 'rgba(255, 0, 229, 0.08)',
      '--color-btn-bg-hover': 'rgba(255, 0, 229, 0.12)',
      '--texture-line-color': '236, 72, 153',
      '--texture-opacity': '0.09',
      '--texture-grid-size': '100px'
    }
  },
  operator: {
    name: 'Operator Mono',
    class: 'theme-operator',
    dataAttribute: 'operator',
    variables: {
      '--color-bg': '#1E0000',
      '--color-text-primary': '#FF4100',
      '--color-text-secondary': '#FFA500',
      '--color-text-tertiary': '#B37400',
      '--color-text-command': '#FF4100',
      '--color-text-white': '#FF4100',
      '--color-border': '#FF4100',
      '--color-border-darker': '#FFA500',
      '--color-active': '#5D1800',
      '--color-error': '#FFFF00',
      '--color-success': '#A8FF00',
      '--color-input-bg': '#1A1A1A',
      '--color-hover': 'rgba(255, 65, 0, 0.1)',
      '--color-accent': '#FFA500',
      '--color-btn-bg': 'rgba(255, 65, 0, 0.08)',
      '--color-btn-bg-hover': 'rgba(255, 65, 0, 0.12)',
      '--texture-line-color': '251, 191, 36',
      '--texture-opacity': '0.09',
      '--texture-grid-size': '100px'
    }
  },
  kyoto: {
    name: 'Kyoto Sunset',
    class: 'theme-kyoto',
    dataAttribute: 'kyoto',
    variables: {
      '--color-bg': '#B0B0B0',
      '--color-text-primary': '#1A1A1A',
      '--color-text-secondary': '#4A4A4A',
      '--color-text-tertiary': '#7A7A7A',
      '--color-text-command': '#D95D39',
      '--color-text-white': '#1A1A1A',
      '--color-border': '#1A1A1A',
      '--color-border-darker': '#4A4A4A',
      '--color-active': '#8E8E8E',
      '--color-error': '#A80000',
      '--color-success': '#0A6D0A',
      '--color-input-bg': '#8E8E8E',
      '--color-hover': 'rgba(74, 74, 74, 0.1)',
      '--color-accent': '#39D9D9',
      '--color-btn-bg': 'rgba(26, 26, 26, 0.05)',
      '--color-btn-bg-hover': 'rgba(26, 26, 26, 0.1)',
      '--texture-line-color': '220, 38, 38',
      '--texture-opacity': '0.09',
      '--texture-grid-size': '110px'
    }
  },
  radar: {
    name: 'Radar Green',
    class: 'theme-radar',
    dataAttribute: 'radar',
    variables: {
      '--color-bg': '#3C4D3A',
      '--color-text-primary': '#B3E2A7',
      '--color-text-secondary': '#8BAA85',
      '--color-text-tertiary': '#5A5A5A',
      '--color-text-command': '#D98E39',
      '--color-text-white': '#B3E2A7',
      '--color-border': '#2A2A2A',
      '--color-border-darker': '#2A2A2A',
      '--color-active': '#2F3D2D',
      '--color-error': '#D94639',
      '--color-success': '#65B354',
      '--color-input-bg': '#32402F',
      '--color-hover': 'rgba(179, 226, 167, 0.1)',
      '--color-accent': '#54B3B3',
      '--color-btn-bg': 'rgba(179, 226, 167, 0.05)',
      '--color-btn-bg-hover': 'rgba(179, 226, 167, 0.1)',
      '--texture-line-color': '34, 197, 94',
      '--texture-opacity': '0.08',
      '--texture-grid-size': '90px'
    }
  }
};

// Create a context for theme management
export const ThemeContext = React.createContext({
  theme: 'default',
  setTheme: () => {}
});

// Theme provider component that applies CSS variables
export const ThemeProvider = ({ theme, children }) => {
  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = themes[theme] || themes.default;

    // Apply CSS variables to the root element
    Object.entries(selectedTheme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply theme class for any theme-specific CSS rules
    root.classList.remove(...Object.values(themes).map(t => t.class));
    root.classList.add(selectedTheme.class);

    // Apply data attribute for additional theme-specific styles
    document.documentElement.setAttribute('data-theme', selectedTheme.dataAttribute);
  }, [theme]);

  return children;
};

// Storybook decorator that wraps stories with theme support
export const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'default';

  return (
    <ThemeProvider theme={theme}>
      <div className="terminal-texture min-h-screen">
        <Story />
      </div>
    </ThemeProvider>
  );
};
