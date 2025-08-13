import fs from 'fs/promises';
import path from 'path';

/**
 * Configuration utility for managing environment variables and domain settings
 * This module handles all configuration reading and validation for the portfolio
 */

// Cache for domain configurations to avoid repeated file reads
let domainConfigCache = null;
let domainConfigLastLoaded = 0;
const CACHE_TTL = 60000; // 60 seconds cache TTL

/**
 * Validates that all required environment variables are present
 * ONLY called at runtime, not during build
 */
export function validateEnvironment() {
  // Skip validation during build time
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }
  
  const required = [
    'CONTENT_FILE_PATH',
    'BACKUP_DIR',
    'ADMIN_TOKEN'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`);
    // Don't throw error, just warn
  }

  console.log('[CONFIG] Environment validation completed');
}

/**
 * Gets the content file path based on environment and demo mode
 * @param {boolean} isDemoMode - Whether to use demo content
 * @returns {string} Path to the content file
 */
export function getContentFilePath(isDemoMode = false) {
  // If demo mode is explicitly requested and enabled
  if (isDemoMode && process.env.ENABLE_DEMO_MODE === 'true') {
    return path.join(process.cwd(), 'config', 'demo-content.json');
  }

  // Use environment variable if set
  if (process.env.CONTENT_FILE_PATH) {
    // Handle relative paths by making them absolute
    if (!path.isAbsolute(process.env.CONTENT_FILE_PATH)) {
      return path.join(process.cwd(), process.env.CONTENT_FILE_PATH);
    }
    return process.env.CONTENT_FILE_PATH;
  }

  // Fallback to default test content for development
  if (process.env.NODE_ENV !== 'production') {
    return path.join(process.cwd(), 'test-content-local.json'); 
  }

  // Production without explicit path - return a default
  console.warn('CONTENT_FILE_PATH not set, using default');
  return path.join(process.cwd(), 'content.json');
}

/**
 * Gets the backup directory path
 * @returns {string} Path to the backup directory
 */
export function getBackupDir() {
  // Use environment variable if set
  if (process.env.BACKUP_DIR) {
    // Handle relative paths by making them absolute
    if (!path.isAbsolute(process.env.BACKUP_DIR)) {
      return path.join(process.cwd(), process.env.BACKUP_DIR);
    }
    return process.env.BACKUP_DIR;
  }

  // Fallback to default for development
  return path.join(process.cwd(), 'content-backups');
}

/**
 * Loads domain configuration from the domains.json file
 * @returns {Promise<Object>} Domain configuration object
 */
async function loadDomainConfig() {
  // Check cache first
  const now = Date.now();
  if (domainConfigCache && (now - domainConfigLastLoaded) < CACHE_TTL) {
    return domainConfigCache;
  }

  try {
    // Get path from environment or use default
    const configPath = process.env.DOMAIN_CONFIG_PATH 
      ? path.join(process.cwd(), process.env.DOMAIN_CONFIG_PATH)
      : path.join(process.cwd(), 'config', 'domains.json');

    const configContent = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    // Update cache
    domainConfigCache = config;
    domainConfigLastLoaded = now;

    return config;
  } catch (error) {
    console.warn('[CONFIG] Could not load domains.json, using defaults:', error.message);
    
    // Return default configuration if file doesn't exist
    return {
      localhost: {
        brandingToken: '$terminal_portfolio',
        email: process.env.DEFAULT_CONTACT_EMAIL || 'contact@example.com',
        telegram: process.env.DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
        website: process.env.DEFAULT_CONTACT_WEBSITE || 'http://localhost:3000',
        analyticsEnabled: false
      }
    };
  }
}

/**
 * Gets configuration for a specific domain
 * @param {string} hostname - The hostname to get configuration for
 * @returns {Promise<Object>} Configuration object for the domain
 */
export async function getDomainConfig(hostname) {
  const domains = await loadDomainConfig();

  // Try exact match first
  if (domains[hostname]) {
    return domains[hostname];
  }

  // Try localhost if running locally
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return domains.localhost || getDefaultDomainConfig();
  }

  // Return default configuration
  return getDefaultDomainConfig();
}

/**
 * Gets default domain configuration from environment variables
 * @returns {Object} Default configuration object
 */
function getDefaultDomainConfig() {
  return {
    brandingToken: process.env.DEFAULT_PORTFOLIO_TITLE || '$terminal_portfolio',
    email: process.env.DEFAULT_CONTACT_EMAIL || 'contact@example.com',
    telegram: process.env.DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
    website: process.env.DEFAULT_CONTACT_WEBSITE || 'https://example.com',
    analyticsEnabled: false
  };
}

/**
 * Checks if demo mode is enabled
 * @returns {boolean} Whether demo mode is enabled
 */
export function isDemoModeEnabled() {
  return process.env.ENABLE_DEMO_MODE === 'true';
}

/**
 * Gets the admin token for API authentication
 * @returns {string|undefined} Admin token
 */
export function getAdminToken() {
  return process.env.ADMIN_TOKEN || 'default-dev-token';
}

/**
 * Loads content from a file with proper error handling
 * @param {string} filePath - Path to the content file
 * @returns {Promise<Object|null>} Parsed content or null if error
 */
export async function loadContent(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`[CONFIG] Error loading content from ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Gets all environment-based configuration
 * Useful for debugging and initial setup verification
 * @returns {Object} All configuration values
 */
export function getAllConfig() {
  return {
    contentFilePath: getContentFilePath(),
    backupDir: getBackupDir(),
    demoModeEnabled: isDemoModeEnabled(),
    adminTokenSet: !!getAdminToken(),
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000
  };
}