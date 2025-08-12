// src/app/api/admin/content/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { validateContentStructure, deepMerge } from './validator';
// CHANGED: Import config utilities instead of using hardcoded values
import { getContentFilePath, getBackupDir, getAdminToken } from '../../../utils/config';

// CHANGED: Use getAdminToken() from config instead of direct env access
// This is now retrieved from the config utility
const ADMIN_TOKEN = getAdminToken();

// CHANGED: Use getContentFilePath() from config utility instead of hardcoded paths
// The config utility handles all the environment detection and path resolution
const CONTENT_FILE_PATH = getContentFilePath(false); // false = use real content, not demo

// CHANGED: Use getBackupDir() from config utility instead of hardcoded paths
// This ensures consistency across the application
const BACKUP_DIR = getBackupDir();

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  // CHANGED: ADMIN_TOKEN now comes from config utility
  return token === ADMIN_TOKEN;
}

async function createBackup(currentContent) {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `content-${timestamp}.json`);
    
    await fs.writeFile(backupPath, currentContent);
    console.log('[ADMIN API] Backup created:', backupPath);

    // Keep only the 10 most recent backups
    const files = await fs.readdir(BACKUP_DIR);
    const backupFiles = files
      .filter(f => f.startsWith('content-') && f.endsWith('.json'))
      .sort()
      .reverse();
    
    if (backupFiles.length > 10) {
      for (const oldBackup of backupFiles.slice(10)) {
        await fs.unlink(path.join(BACKUP_DIR, oldBackup));
        console.log('[ADMIN API] Deleted old backup:', oldBackup);
      }
    }
    
    return backupPath;
  } catch (error) {
    console.error('[ADMIN API] Backup error:', error);
    return null;
  }
}

export async function GET(request) {
  console.log('[ADMIN API] GET request received');
  
  if (!isAuthorized(request)) {
    console.log('[ADMIN API] Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // CHANGED: CONTENT_FILE_PATH now comes from config utility
    const fileContent = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
    const content = JSON.parse(fileContent);

    const stats = {
      profilesCount: Object.keys(content).filter(k => k === k.toUpperCase() && k !== 'GLOBAL_DATA').length,
      lastModified: (await fs.stat(CONTENT_FILE_PATH)).mtime,
      fileSize: fileContent.length
    };
    
    return NextResponse.json({
      success: true,
      content: content,
      stats: stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[ADMIN API] Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  console.log('[ADMIN API] PUT request received');
  
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const newContent = await request.json();
    
    const validation = validateContentStructure(newContent);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid content structure', details: validation.errors },
        { status: 400 }
      );
    }
    
    let backupPath = null;
    try {
      // CHANGED: CONTENT_FILE_PATH now comes from config utility
      const currentContent = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
      backupPath = await createBackup(currentContent);
    } catch (error) {
      console.log('[ADMIN API] No existing file to backup');
    }
    
    // CHANGED: CONTENT_FILE_PATH now comes from config utility
    await fs.writeFile(
      CONTENT_FILE_PATH,
      JSON.stringify(newContent, null, 2)
    );
    
    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      backup: backupPath,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[ADMIN API] Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  console.log('[ADMIN API] PATCH request received');
  
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { path: updatePath, value } = await request.json();
    
    if (!updatePath || value === undefined) {
      return NextResponse.json(
        { error: 'Invalid request', details: 'Path and value are required' },
        { status: 400 }
      );
    }
    
    // CHANGED: CONTENT_FILE_PATH now comes from config utility
    const fileContent = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
    const currentContent = JSON.parse(fileContent);
    
    await createBackup(fileContent);
    
    const pathParts = updatePath.split('.');
    let target = currentContent;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!target[pathParts[i]]) {
        target[pathParts[i]] = {};
      }
      target = target[pathParts[i]];
    }
    
    target[pathParts[pathParts.length - 1]] = value;
    
    const validation = validateContentStructure(currentContent);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Update would create invalid structure', details: validation.errors },
        { status: 400 }
      );
    }
    
    // CHANGED: CONTENT_FILE_PATH now comes from config utility
    await fs.writeFile(
      CONTENT_FILE_PATH,
      JSON.stringify(currentContent, null, 2)
    );
    
    return NextResponse.json({
      success: true,
      message: 'Content patched successfully',
      updatedPath: updatePath,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[ADMIN API] Error in PATCH:', error);
    return NextResponse.json(
      { error: 'Failed to patch content', details: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return new NextResponse(null, { status: 200 });
}
