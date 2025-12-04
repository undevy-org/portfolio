// src/app/utils/config.js
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

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
    'ADMIN_TOKEN',
    'DOMAIN_CONFIG_PATH'
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
  // WHY: We prioritize demo mode. If it's requested and enabled, we use a dedicated
  // environment variable for it, keeping the logic clean and portable.
  if (isDemoMode && isDemoModeEnabled()) {
    if (process.env.DEMO_CONTENT_FILE_PATH) {
      if (!path.isAbsolute(process.env.DEMO_CONTENT_FILE_PATH)) {
        return path.join(process.cwd(), process.env.DEMO_CONTENT_FILE_PATH);
      }
      return process.env.DEMO_CONTENT_FILE_PATH;
    }
    // Fallback for development if the variable isn't set.
    console.warn('DEMO_CONTENT_FILE_PATH not set, using default config/demo-content.json');
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
    let configPath;
    if (process.env.DOMAIN_CONFIG_PATH) {
      if (path.isAbsolute(process.env.DOMAIN_CONFIG_PATH)) {
        configPath = process.env.DOMAIN_CONFIG_PATH;
      } else {
        configPath = path.join(process.cwd(), process.env.DOMAIN_CONFIG_PATH);
      }
    } else {
      configPath = path.join(process.cwd(), 'config', 'domains.json');
    }

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
 * Get the path to the widgets configuration file
 * @returns {string} Absolute path to the widgets config file
 */
export const getWidgetsConfigPath = () => {
  // Check for environment variable override
  if (process.env.WIDGETS_CONFIG_PATH) {
    return process.env.WIDGETS_CONFIG_PATH;
  }

  // In production, use the standard server path (user's home directory)
  if (process.env.NODE_ENV === 'production') {
    return path.join(os.homedir(), 'widgets-config.json');
  }

  // In development, use the local file in the project root
  return path.join(process.cwd(), 'widgets-config.local.json');
};

/**
 * Get the path to the example widgets configuration file (fallback)
 * @returns {string} Absolute path to the example widgets config file
 */
export const getExampleWidgetsConfigPath = () => {
  return path.join(process.cwd(), 'widgets-config.example.json');
};

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
    brandingToken: process.env.NEXT_PUBLIC_DEFAULT_PORTFOLIO_TITLE || process.env.DEFAULT_PORTFOLIO_TITLE || '$terminal_portfolio',
    email: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_EMAIL || process.env.DEFAULT_CONTACT_EMAIL || 'contact@example.com',
    telegram: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_TELEGRAM || process.env.DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
    website: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_WEBSITE || process.env.DEFAULT_CONTACT_WEBSITE || 'https://example.com',
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