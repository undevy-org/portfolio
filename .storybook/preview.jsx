// .storybook/main.js
const config = {
  stories: [
    // Look for stories next to components, not in separate directory
    '../src/app/components/**/*.stories.js',
    '../src/app/components/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  core: {
    builder: '@storybook/builder-vite' // Keep Vite for performance
  }
};

export default config;