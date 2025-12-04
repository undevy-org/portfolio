import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { getWidgetsConfigPath, getExampleWidgetsConfigPath } from '../../utils/config';

export async function GET(request) {
    try {
        // Get domain from query params
        const { searchParams } = new URL(request.url);
        const domain = searchParams.get('domain');

        // Try to get the configured widgets path
        let configPath = getWidgetsConfigPath();
        let configData = null;

        try {
            // Try to read the primary config file
            const fileContent = await fs.readFile(configPath, 'utf-8');
            configData = JSON.parse(fileContent);
        } catch (error) {
            console.warn(`[API] Failed to read widgets config from ${configPath}, trying example...`);

            // Fallback to example config if primary is missing (e.g. in a fresh clone)
            try {
                const examplePath = getExampleWidgetsConfigPath();
                const exampleContent = await fs.readFile(examplePath, 'utf-8');
                configData = JSON.parse(exampleContent);
            } catch (fallbackError) {
                console.error('[API] Failed to read example widgets config:', fallbackError);
                return NextResponse.json(
                    { error: 'Failed to load widget configuration' },
                    { status: 500 }
                );
            }
        }

        // Resolve widgets based on domain
        let resolvedWidgets = null;

        // 1. Try exact domain match
        if (domain && configData[domain]) {
            resolvedWidgets = configData[domain];
        }
        // 2. Try localhost if applicable
        else if (domain && (domain.includes('localhost') || domain.includes('127.0.0.1')) && configData.localhost) {
            resolvedWidgets = configData.localhost;
        }
        // 3. Try default key
        else if (configData.default) {
            resolvedWidgets = configData.default;
        }
        // 4. Fallback: assume legacy structure (root object)
        else {
            resolvedWidgets = configData;
        }

        return NextResponse.json({
            widgets: resolvedWidgets,
            source: configPath.endsWith('example.json') ? 'example' : 'configured',
            domain: domain || 'unknown'
        });

    } catch (error) {
        console.error('[API] Error in widgets route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
