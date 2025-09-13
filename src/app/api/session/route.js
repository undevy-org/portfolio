// src/app/api/session/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getContentFilePath, isDemoModeEnabled, loadContent } from '../../utils/config';
import { mergeSessionData } from '../../utils/session';

// Helper function to extract user label from profile data
function extractUserLabel(profileData) {
  if (!profileData) return 'Unknown User';
  
  // Try to find a suitable name field
  return profileData.profileName || 
         profileData.fullName || 
         profileData.name || 
         profileData.title || 
         profileData.company ||
         'Unknown User';
}

// Helper function to extract contact information
function extractContactInfo(profileData) {
  if (!profileData) return {};
  
  return {
    email: profileData.contactEmail || profileData.email || null,
    telegram: profileData.contactTelegram || profileData.telegram || null
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const checkSession = searchParams.get('check');

  // CRITICAL - Session check logic (NOT Demo Mode!)
  // When page.js calls checkExistingSession, it will pass check=session
  // This prevents the API from returning Demo Mode when checking for existing sessions
  if (checkSession === 'session' && !code) {
    console.log('[SESSION API] Session check requested - no active session');
    // Return 401 to indicate no session exists
    // This is the expected behavior for session checks
    return NextResponse.json({ error: 'No active session' }, { status: 401 });
  }

  // Master Code logic - check if provided code matches MASTER_CODE environment variable
  const masterCode = process.env.MASTER_CODE;
  if (masterCode && code === masterCode) {
    console.log('[SESSION API] Master code detected');
    
    try {
      // Gather all codes from different sources
      const codes = {
        master: [{
          code: masterCode,
          label: 'Master Key',
          type: 'master',
          description: 'Provides full system access to all codes'
        }],
        special: [],
        user: []
      };
      
      // Add Web3 code if available
      const web3Code = process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE;
      if (web3Code) {
        codes.special.push({
          code: web3Code,
          label: 'Web3 Login',
          type: 'web3',
          description: 'Shared access code for Web3 authentication'
        });
      }
      
      // Add demo mode entry
      codes.special.push({
        code: null,
        label: 'Demo Mode',
        type: 'demo',
        description: 'Activated by accessing the site without any code parameter'
      });
      
      // Load user codes from content file
      const dataFilePath = getContentFilePath(false);
      let allData;
      
      try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        allData = JSON.parse(fileContent);
      } catch (error) {
        console.warn(`Could not read server content file. Falling back to local test data. Reason: ${error.message}`);
        
        try {
          const testFilePath = process.env.USE_LOCAL_TEST_CONTENT
            ? path.join(process.cwd(), 'test-content-local.json')
            : path.join(process.cwd(), 'src/app/test-content.json');
          const testContent = await fs.readFile(testFilePath, 'utf-8');
          allData = JSON.parse(testContent);
        } catch (localError) {
          console.error('Failed to load test data:', localError);
          // Continue with empty data if both files fail
          allData = {};
        }
      }
      
      // Extract user codes (excluding special keys)
      const systemKeys = ['GLOBAL_DATA', 'DEMO_USER', masterCode];
      const userCodes = Object.keys(allData)
        .filter(key => !systemKeys.includes(key) && !key.startsWith('_'))
        .map(codeKey => {
          const profileData = allData[codeKey];
          return {
            code: codeKey,
            label: extractUserLabel(profileData),
            type: 'user',
            ...extractContactInfo(profileData)
          };
        });
      
      codes.user = userCodes;
      
      // Return master access response
      return NextResponse.json({
        isMasterAccess: true,
        masterCode: masterCode,
        codes: codes
      }, { status: 200 });
    } catch (error) {
      console.error('[SESSION API] Error processing master code request:', error);
      return NextResponse.json({ error: 'Server error processing master access' }, { status: 500 });
    }
  }

  // Demo Mode logic - only activate when explicitly requested
  // Demo Mode should ONLY activate when:
  // 1. No code parameter is provided
  // 2. NOT a session check (no check parameter)
  // 3. Demo mode is enabled in configuration
  if (!code && !checkSession && isDemoModeEnabled()) {
    console.log('[SESSION API] Demo mode requested');
    
    const demoContentPath = getContentFilePath(true);
    const demoData = await loadContent(demoContentPath);
    
    if (demoData && demoData.DEMO_USER) {
      // Pass true as third parameter to indicate demo mode
      // This ensures demo content isn't overwritten by empty GLOBAL_DATA fields
      const sessionData = mergeSessionData(demoData.DEMO_USER, demoData.GLOBAL_DATA, true);
      sessionData.isDemoMode = true;
      return NextResponse.json(sessionData, { status: 200 });
    }
  }

  // Standard authentication with access code
  if (!code) {
    return NextResponse.json({ error: 'Access code is required' }, { status: 400 });
  }

  const dataFilePath = getContentFilePath(false);

  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const allData = JSON.parse(fileContent);
    
    const userProfile = allData[code];
    
    if (!userProfile) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 404 });
    }
    
    const globalData = allData.GLOBAL_DATA;
    
    if (!globalData) {
      console.error('GLOBAL_DATA not found in content.json');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Pass false as third parameter for regular (non-demo) sessions
    const sessionData = mergeSessionData(userProfile, globalData, false);
    
    return NextResponse.json(sessionData, { status: 200 });
    
  } catch (error) {
    console.warn(`Could not read server content file. Falling back to local test data. Reason: ${error.message}`);
    
    try {
      const testFilePath = process.env.USE_LOCAL_TEST_CONTENT
      ? path.join(process.cwd(), 'test-content-local.json')
      : path.join(process.cwd(), 'src/app/test-content.json');
      const testContent = await fs.readFile(testFilePath, 'utf-8');
      const testData = JSON.parse(testContent);
      
      const userProfile = testData[code];
      
      if (!userProfile) {
        return NextResponse.json({ error: 'Invalid access code' }, { status: 404 });
      }
      
      const globalData = testData.GLOBAL_DATA;
      // Pass false for test data (non-demo mode)
      const sessionData = mergeSessionData(userProfile, globalData, false);
      
      return NextResponse.json(sessionData, { status: 200 });
      
    } catch (localError) {
      console.error('Failed to load test data:', localError);
      return NextResponse.json({ error: 'Server content file not found' }, { status: 500 });
    }
  }
}