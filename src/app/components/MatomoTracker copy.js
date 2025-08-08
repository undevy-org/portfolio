// src/app/components/MatomoTracker.js
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from '../context/SessionContext';

export default function MatomoTracker() {
  const searchParams = useSearchParams();
  const { currentScreen, sessionData } = useSession();
  const isInitialMount = useRef(true);
  const matomoInitialized = useRef(false);

  useEffect(() => {
    const MATOMO_URL = 'https://analytics.undevy.com';
    const SITE_ID = '1';
    const accessCode = searchParams.get('code');

    // This makes sure the script is only run in the browser
    if (typeof window === 'undefined' || matomoInitialized.current) {
      return;
    }

    // Initialize the Matomo tracking array
    var _paq = window._paq = window._paq || [];
    
    // --- ENHANCEMENT: Reset tracker for clean state ---
    // This ensures no stale data from previous sessions
    _paq.push(['deleteCookies']);
    _paq.push(['forgetConsentGiven']); // Clear any consent data
    
    // --- CRITICAL FIX: Set custom dimension BEFORE trackPageView ---
    if (accessCode) {
      // Method 1: Standard Custom Dimension (primary method)
      _paq.push(['setCustomDimension', 1, accessCode]);
      
      // Method 2: Custom Variable as fallback (belt and suspenders approach)
      _paq.push(['setCustomVariable', 1, 'AccessCode', accessCode, 'visit']);
      
      // Method 3: Set as User ID for additional tracking
      _paq.push(['setUserId', accessCode]);
      
      console.log('[MATOMO] Triple-setting access code:', {
        code: accessCode,
        dimension: 1,
        methods: ['setCustomDimension', 'setCustomVariable', 'setUserId']
      });
    }
    
    // IMPORTANT: Track page view AFTER setting custom dimension
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    
    // --- ENHANCEMENT: Track initial access as an event for debugging ---
    if (accessCode) {
      _paq.push(['trackEvent', 'Authentication', 'AccessCode', accessCode]);
      console.log('[MATOMO] Tracked authentication event with code:', accessCode);
    }
    
    // --- SCRIPT INJECTION with enhanced error handling ---
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
      g.id = 'matomo-script'; // Add ID to prevent duplicate loading
      g.async = true;
      g.src = u + '/matomo.js';
      
      // --- ENHANCEMENT: Add load and error callbacks for debugging ---
      g.onload = function() {
        console.log('[MATOMO] Script loaded successfully');
        
        // Double-check that custom dimension was set after script loads
        if (accessCode && window._paq) {
          // Re-send the custom dimension after script loads to be absolutely sure
          window._paq.push(['setCustomDimension', 1, accessCode]);
          console.log('[MATOMO] Re-confirmed custom dimension after script load');
        }
      };
      
      g.onerror = function() {
        console.error('[MATOMO] Failed to load Matomo script');
      };
      
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
    })();
    
    matomoInitialized.current = true;
    console.log('[MATOMO] Initialized with full context:', {
      url: window.location.href,
      accessCode: accessCode || 'none',
      siteId: SITE_ID,
      timestamp: new Date().toISOString()
    });
    
  }, [searchParams]); // Run when searchParams changes

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
        return screenTitles[screen] || `${screen} - Undevy Portfolio`;
      };

      // Update the URL that Matomo tracks
      window._paq.push(['setCustomUrl', urlWithHash]);
      
      // --- ENHANCEMENT: Re-set custom dimension on every page view ---
      // This ensures dimension persists across navigation
      if (accessCode) {
        window._paq.push(['setCustomDimension', 1, accessCode]);
        console.log('[MATOMO] Re-setting dimension for screen change:', accessCode);
      }
      
      // Track the page view with custom title
      window._paq.push(['trackPageView', getPageTitle(currentScreen)]);
      
      // --- ENHANCEMENT: Track screen navigation as an event for debugging ---
      if (accessCode) {
        window._paq.push(['trackEvent', 'Navigation', currentScreen, accessCode]);
      }
      
      console.log('[MATOMO] Tracked screen:', {
        screen: currentScreen,
        url: urlWithHash,
        accessCode: accessCode || 'none',
        title: getPageTitle(currentScreen)
      });

      // Update ref to know we're no longer on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
    }, 100); // Small delay to ensure Matomo is ready
  }, [currentScreen, searchParams]); // Track when screen changes

  return null; // This component renders nothing
}