// .storybook/main.js
const path = require('path');

const config = {
  stories: [
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
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Handle Next.js style absolute imports from 'src'
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      // Replace SessionContext with mock for all story files
      '../context/SessionContext': path.resolve(__dirname, '../test-utils/storybook-mocks.jsx'),
      '../../context/SessionContext': path.resolve(__dirname, '../test-utils/storybook-mocks.jsx'),
      '.././context/SessionContext': path.resolve(__dirname, '../test-utils/storybook-mocks.jsx'),
    };

    // Add proper JSX loader for .jsx and .js files (both src/ and .storybook/)
    config.module.rules.push({
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../test-utils'),
        __dirname
      ],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              [
                require.resolve('@babel/preset-react'),
                {
                  runtime: 'automatic',
                },
              ],
            ],
            babelrc: false,
          },
        },
      ],
    });

    return config;
  }
};

export default config;
