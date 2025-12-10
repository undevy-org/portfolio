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

import { headers } from 'next/headers';

const portfolioTitle = process.env.PORTFOLIO_TITLE || 'Interactive Portfolio';

// Determine environment configuration based on hostname or environment variables
// This forces dynamic rendering.
const getEnvironmentConfig = async () => {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const forwardedHost = headersList.get('x-forwarded-host') || '';
  const domain = forwardedHost || host;

  // Debug logging
  console.log(`[ENV_DEBUG] Host: ${host}, FwdHost: ${forwardedHost}, Env: ${process.env.APP_ENV || process.env['NEXT_PUBLIC_ENV']}`);

  // Base config
  let config = {
    faviconBase: '/images/favicons/production',
    title: portfolioTitle
  };

  // 1. Check for specific environment variable overrides (Runtime)
  const envVar = process.env.APP_ENV || process.env['NEXT_PUBLIC_ENV'];

  if (envVar === 'staging') {
    return {
      faviconBase: '/images/favicons/staging',
      title: 'Staging Env'
    };
  }

  if (envVar === 'production') {
    return config;
  }

  // 2. Check Domain / Hostname
  if (domain.includes('localhost') || domain.includes('127.0.0.1')) {
    return {
      faviconBase: '/images/favicons/local',
      title: 'Localhost Env'
    };
  }

  if (domain.includes('stage') || domain.includes('staging')) {
    return {
      faviconBase: '/images/favicons/staging',
      title: 'Staging Env'
    };
  }

  return config;
};

export async function generateMetadata() {
  const envConfig = await getEnvironmentConfig();
  const { faviconBase, title } = envConfig;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
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
}

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