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
    };

    // Add proper JSX loader for .jsx files
    config.module.rules.push({
      test: /\.jsx?$/,
      include: path.resolve(__dirname, '../src'),
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
