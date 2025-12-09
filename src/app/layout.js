// src/app/layout.js
import { IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";
import MatomoTracker from "./components/MatomoTracker";
import SystemLog from "./components/SystemLog";
import AnalyticsPanel from "./components/AnalyticsPanel";
import StableLayout from "./components/StableLayout";
import { Suspense } from 'react';
import { SessionProvider } from "./context/SessionContext";
import ThemeManager from "./components/ThemeManager";
import { Web3Manager } from "./components/Web3Manager";
import ThemeSwitcher from "./components/ui/ThemeSwitcher";
import Web3CleanupManager from './components/Web3CleanupManager';
import LatestProjects from "./components/LatestProjects";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-ibm-plex',
});

const portfolioTitle = process.env.PORTFOLIO_TITLE || 'Interactive Portfolio';

// Determine favicon base path based on environment
// Note: NEXT_PUBLIC_ENV must be set to 'staging' in the staging environment's .env file
const getFaviconBase = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/images/favicons/local';
  }
  if (process.env.NEXT_PUBLIC_ENV === 'staging') {
    return '/images/favicons/staging';
  }
  return '/images/favicons/production';
};

const faviconBase = getFaviconBase();

export const metadata = {
  title: {
    // Use the constant for the default title.
    default: portfolioTitle,
    // Use the constant in the template as well.
    template: `%s | ${portfolioTitle}`,
  },
  description: "Interactive terminal-based portfolio",
  manifest: `${faviconBase}/site.webmanifest`,
  icons: {
    icon: [
      { url: `${faviconBase}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${faviconBase}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${faviconBase}/favicon.ico` }, // Fallback
    ],
    apple: [
      { url: `${faviconBase}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: `${faviconBase}/apple-touch-icon.png`,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} font-mono bg-main text-primary terminal-texture`}>
        <SessionProvider>
          <Web3Manager>
            <ThemeManager />
            <Web3CleanupManager />

            <StableLayout>
              {/* Desktop ThemeSwitcher - Top mounted, appearing only on Entry/ProfileBoot */}
              <div className="w-full max-w-2xl mx-auto mb-2 hidden md:block z-50 relative">
                <ThemeSwitcher />
              </div>

              {/* Main content (TerminalWindow with screens) */}
              {children}

              <div className="panels-container w-full max-w-2xl mx-auto space-y-2 mt-2">
                <ThemeSwitcher className="md:hidden" />
                <AnalyticsPanel />
                <LatestProjects />
                <SystemLog />
              </div>
            </StableLayout>

            <Suspense fallback={null}>
              <MatomoTracker />
            </Suspense>
          </Web3Manager>
        </SessionProvider>
      </body>
    </html>
  );
}