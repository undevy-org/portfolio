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

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono',
});

const portfolioTitle = process.env.PORTFOLIO_TITLE || 'Interactive Portfolio';

export const metadata = {
  title: {
    // Use the constant for the default title.
    default: portfolioTitle,
    // Use the constant in the template as well.
    template: `%s | ${portfolioTitle}`,
  },
  description: "Interactive terminal-based portfolio",
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
              {/* Main content (TerminalWindow with screens) */}
              {children}
              
              <div className="panels-container w-full max-w-2xl mx-auto space-y-2 mt-2">
                <AnalyticsPanel />
                <ThemeSwitcher />
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