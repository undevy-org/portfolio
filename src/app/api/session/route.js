import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getContentFilePath, isDemoModeEnabled, loadContent } from '../../utils/config';
import { mergeSessionData } from '../../utils/session';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code && isDemoModeEnabled()) {
    console.log('[SESSION API] Demo mode requested');
    
    const demoContentPath = getContentFilePath(true);
    const demoData = await loadContent(demoContentPath);
    
    if (demoData && demoData.DEMO_USER) {
      const sessionData = mergeSessionData(demoData.DEMO_USER, demoData.GLOBAL_DATA);
      sessionData.isDemoMode = true;
      return NextResponse.json(sessionData, { status: 200 });
    }
  }

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

    const sessionData = mergeSessionData(userProfile, globalData);
    
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
      const sessionData = mergeSessionData(userProfile, globalData);
      
      return NextResponse.json(sessionData, { status: 200 });
      
    } catch (localError) {
      console.error('Failed to load test data:', localError);
      return NextResponse.json({ error: 'Server content file not found' }, { status: 500 });
    }
  }
}
