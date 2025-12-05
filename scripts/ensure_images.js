const fs = require('fs');
const path = require('path');

// Configuration
const IMAGES_DIR = process.env.IMAGES_DIR
    ? path.resolve(process.env.IMAGES_DIR)
    : path.join(__dirname, '../public/images/projects');
const TEMPLATE_FILE = path.join(__dirname, '../public/images/template.webp');
const TABS = ['challenge', 'approach', 'solution', 'results'];

// Determine content file path
function getContentFile() {
    // 1. Environment variable (highest priority)
    if (process.env.CONTENT_FILE_PATH) {
        return path.resolve(process.cwd(), process.env.CONTENT_FILE_PATH);
    }

    // 2. Production default (server)
    const productionPath = path.join(__dirname, '../content.json');
    if (fs.existsSync(productionPath)) {
        return productionPath;
    }

    // 3. Local development default
    const localPath = path.join(__dirname, '../test-content-local.json');
    if (fs.existsSync(localPath)) {
        return localPath;
    }

    // 4. CI/Fallback (always exists in repo)
    return path.join(__dirname, '../src/app/test-content.json');
}

const CONTENT_FILE = getContentFile();

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    gray: '\x1b[90m'
};

function ensureImages() {
    console.log(`${colors.blue}Starting image verification process...${colors.reset}`);
    console.log(`${colors.gray}Using content file: ${CONTENT_FILE}${colors.reset}`);

    // 1. Verify prerequisites
    if (!fs.existsSync(CONTENT_FILE)) {
        console.error(`${colors.red}Error: Content file not found at ${CONTENT_FILE}${colors.reset}`);
        process.exit(1);
    }
    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error(`${colors.red}Error: Template file not found at ${TEMPLATE_FILE}${colors.reset}`);
        process.exit(1);
    }
    if (!fs.existsSync(IMAGES_DIR)) {
        console.log(`${colors.yellow}Creating images directory at ${IMAGES_DIR}${colors.reset}`);
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    // 2. Load content
    let content;
    try {
        const rawData = fs.readFileSync(CONTENT_FILE, 'utf8');
        content = JSON.parse(rawData);
    } catch (error) {
        console.error(`${colors.red}Error parsing content JSON:${colors.reset}`, error.message);
        process.exit(1);
    }

    const caseDetails = content.GLOBAL_DATA?.case_details || {};
    console.log('Found cases:', Object.keys(caseDetails));
    let createdCount = 0;
    let skippedCount = 0;
    let existingCount = 0;

    // 3. Iterate through cases
    Object.entries(caseDetails).forEach(([caseId, details]) => {
        const hiddenImages = details.hidden_images || [];

        console.log(`${colors.gray}Checking case: ${caseId}${colors.reset}`);

        TABS.forEach(tab => {
            // Check if this specific image should be hidden
            if (hiddenImages.includes(tab)) {
                console.log(`  ${colors.yellow}⚠ Skipped (Hidden):${colors.reset} ${tab}`);
                skippedCount++;
                return;
            }

            const imageName = `${caseId}_${tab}.webp`;
            const imagePath = path.join(IMAGES_DIR, imageName);

            if (fs.existsSync(imagePath)) {
                // Image exists - do nothing
                existingCount++;
            } else {
                // Image missing - create from template
                try {
                    fs.copyFileSync(TEMPLATE_FILE, imagePath);
                    console.log(`  ${colors.green}✔ Created:${colors.reset} ${imageName}`);
                    createdCount++;
                } catch (error) {
                    console.error(`  ${colors.red}✖ Failed to create ${imageName}:${colors.reset}`, error.message);
                }
            }
        });
    });

    // 4. Summary
    console.log(`\n${colors.blue}Verification Complete:${colors.reset}`);
    console.log(`  Existing: ${existingCount}`);
    console.log(`  Created:  ${createdCount}`);
    console.log(`  Skipped:  ${skippedCount}`);
}

ensureImages();
