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
import { Web3Provider } from "./components/Web3Provider";
import ThemeSwitcher from "./components/ui/ThemeSwitcher";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: {
    default: "Interactive Portfolio", 
    template: "%s | Interactive Portfolio", 
  },
  description: "Interactive terminal-based portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} font-mono bg-main text-primary`}>
        <SessionProvider>
          <Web3Provider>
            <ThemeManager />
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
          </Web3Provider>
        </SessionProvider>
      </body>
    </html>
  );
}