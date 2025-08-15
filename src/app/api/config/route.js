import { NextResponse } from 'next/server';
import { getDomainConfig } from '../../utils/config';

/**
 * API endpoint that provides domain-specific configuration to the client
 * This ensures that only the configuration for the current domain is exposed,
 * preventing information leakage about other configured domains
 */

export async function GET(request) {
  try {
    // Extract the hostname from the request headers
    // The 'host' header contains the domain the user is visiting
    const host = request.headers.get('host') || 'localhost';
    
    // Remove port number if present (e.g., "localhost:3000" -> "localhost")
    const hostname = host.split(':')[0];
    
    console.log(`[CONFIG API] Fetching configuration for domain: ${hostname}`);
    
    // Get the configuration for this specific domain
    // This function handles fallbacks and defaults internally
    const domainConfig = await getDomainConfig(hostname);
    
    // Add metadata about the configuration source
    const response = {
      domain: hostname,
      config: domainConfig,
      timestamp: new Date().toISOString()
    };
    
    // Return the configuration with appropriate caching headers
    return NextResponse.json(response, {
      status: 200,
      headers: {
        // Cache the configuration for 5 minutes on the client
        // This reduces server load while still allowing relatively quick updates
        'Cache-Control': 'public, max-age=300',
      }
    });
    
  } catch (error) {
    console.error('[CONFIG API] Error fetching domain configuration:', error);
    
    // Return a safe default configuration if something goes wrong
    // This ensures the application can still function even if configuration loading fails
    return NextResponse.json({
      domain: 'unknown',
      config: {
        brandingToken: '$terminal_portfolio',
        email: process.env.DEFAULT_CONTACT_EMAIL || 'contact@example.com',
        telegram: process.env.DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
        website: process.env.DEFAULT_CONTACT_WEBSITE || 'https://example.com',
        analyticsEnabled: false
      },
      error: 'Failed to load domain configuration, using defaults',
      timestamp: new Date().toISOString()
    }, { status: 200 }); // Return 200 even on error to prevent client-side failures
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 * This allows the API to be called from different origins if needed
 */
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}