// src/app/components/MatomoTracker.js
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from '../context/SessionContext';

export default function MatomoTracker() {
  const searchParams = useSearchParams();
  // CHANGED: Added domainData to get domain-specific configuration
  const { currentScreen, sessionData, domainData } = useSession();
  const isInitialMount = useRef(true);
  const matomoInitialized = useRef(false);

  useEffect(() => {
    // CHANGED: Use environment variable for Matomo URL instead of hardcoded value
    // This allows different deployments to use their own analytics instances
    const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
    // CHANGED: Use environment variable for Site ID instead of hardcoded value
    // This allows tracking to different sites in Matomo based on configuration
    const SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '1';
    const accessCode = searchParams.get('code');

    // CHANGED: Check if analytics is enabled for this domain
    // Some domains might not want analytics tracking
    if (domainData && domainData.analyticsEnabled === false) {
      console.log('[MATOMO] Analytics disabled for this domain');
      return;
    }

    // CHANGED: Check if Matomo URL is configured
    // If no URL is provided, skip analytics initialization
    if (!MATOMO_URL) {
      console.log('[MATOMO] No Matomo URL configured, skipping analytics');
      return;
    }

    // This makes sure the script is only run in the browser
    if (typeof window === 'undefined' || matomoInitialized.current) {
      return;
    }

    // Initialize the Matomo tracking array
    var _paq = window._paq = window._paq || [];
    
    // --- CRITICAL FIX: Set custom dimension BEFORE trackPageView ---
    
    // If a valid access code is present, set it as a custom dimension
    if (accessCode) {
      // Method 1: Set for this page view only
      _paq.push(['setCustomDimension', 1, accessCode]);
      _paq.push(['setUserId', accessCode]);
      
      console.log('[MATOMO] Setting custom dimension 1 to:', accessCode);
    }
    
    // IMPORTANT: Track page view AFTER setting custom dimension
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    
    // --- SCRIPT INJECTION ---
    
    (function() {
      var u = MATOMO_URL;
      _paq.push(['setTrackerUrl', u + '/matomo.php']);
      _paq.push(['setSiteId', SITE_ID]);
      
      // Check if Matomo script already loaded
      if (document.getElementById('matomo-script')) {
        console.log('[MATOMO] Script already loaded, skipping injection');
        return;
      }
      
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.id = 'matomo-script';  // Add ID to prevent duplicate loading
      g.async = true; 
      g.src = u + '/matomo.js';
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
    })();
    
    matomoInitialized.current = true;
    console.log('[MATOMO] Initialized');

    // Debug: Check if dimension was set
    if (accessCode) {
      console.log('[MATOMO] Custom dimension should be sent with code:', accessCode);
    }

  }, [searchParams, domainData]); // CHANGED: Added domainData to dependencies

  // Track screen changes (including initial screen)
  useEffect(() => {
    if (typeof window === 'undefined' || !matomoInitialized.current) {
      return;
    }

    // Wait a tick to ensure Matomo script is loaded
    setTimeout(() => {
      if (!window._paq) {
        console.log('[MATOMO] Waiting for _paq to be available...');
      return;
    }

    // Construct the new URL with hash
    const accessCode = searchParams.get('code');
    const baseUrl = window.location.origin + window.location.pathname;
    const urlWithHash = accessCode 
      ? `${baseUrl}?code=${accessCode}#${currentScreen}`
      : `${baseUrl}#${currentScreen}`;

    // Get a more descriptive page title
    const getPageTitle = (screen) => {
      const screenTitles = {
        Entry: 'Entry - Authentication',
        MainHub: 'Main Hub - Navigation',
        Introduction: 'Introduction - About Me',
        Timeline: 'Timeline - Experience',
        RoleDetail: 'Role Detail',
        CaseList: 'Case Studies - List',
        CaseDetail: 'Case Study - Detail',
        SkillsGrid: 'Skills - Overview',
        SkillDetail: 'Skill - Detail',
        SideProjects: 'Side Projects',
        Contact: 'Contact Information'
      };
      
      // CHANGED: Use brandingToken from domainData instead of hardcoded portfolio name
      // This ensures the page title reflects the correct portfolio branding
      const portfolioName = domainData?.brandingToken || '$portfolio';
      return screenTitles[screen] || `${screen} - ${portfolioName}`;
    };

    // Update the URL that Matomo tracks
    window._paq.push(['setCustomUrl', urlWithHash]);
      
    // Track the page view with custom title
    window._paq.push(['trackPageView', getPageTitle(currentScreen)]);
    
      console.log('[MATOMO] Tracked screen:', currentScreen, urlWithHash);
      
      // Update ref to know we're no longer on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
    }, 100); // Small delay to ensure Matomo is ready

  }, [currentScreen, searchParams, domainData]); // CHANGED: Added domainData to dependencies

  return null; // This component renders nothing
}