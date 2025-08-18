// src/app/layout.js
import { IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";
import MatomoTracker from "./components/MatomoTracker";
import SystemLog from "./components/SystemLog";
import AnalyticsPanel from "./components/AnalyticsPanel";
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
      <body className={`${ibmPlexMono.variable} font-mono bg-dark-bg text-dark-text-primary`}>
        <SessionProvider>
          <Web3Provider>
            <ThemeManager />
            <main className="flex flex-col items-center justify-start md:justify-center min-h-screen p-2 gap-2">
              {children}
              <AnalyticsPanel />
              <ThemeSwitcher />
              <SystemLog />
            </main>
            <Suspense fallback={null}>
              <MatomoTracker />
            </Suspense>
          </Web3Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
