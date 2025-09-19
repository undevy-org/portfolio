// Minimal Storybook preview configuration
import '../src/app/globals.css';

// Default export with minimal options
export const parameters = {
  actions: {},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [];

// Optional: Apply theme configuration if you have theme context
// import { ThemeProvider } from '../src/app/components/ThemeManager';
// export const decorators = [
//   (Story) => (
//     <ThemeProvider>
//       <div className="min-h-screen bg-gray-900 text-white">
//         <Story />
//       </div>
//     </ThemeProvider>
//   ),
// ];
