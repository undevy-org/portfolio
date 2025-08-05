// src/app/layout.js
import { IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";
import MatomoTracker from "./components/MatomoTracker";
import SystemLog from "./components/SystemLog";
import AnalyticsPanel from "./components/AnalyticsPanel";
import { Suspense } from 'react';
import { SessionProvider } from "./context/SessionContext";
import ThemeManager from "./components/ThemeManager";

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
          <ThemeManager />
          <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
            {children}
            <AnalyticsPanel />
            <SystemLog />
          </main>
          <Suspense fallback={null}>
            <MatomoTracker />
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
