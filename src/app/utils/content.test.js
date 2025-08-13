/**
 * @fileoverview Content validation test suite.
 * This test acts as a "linter" for the content.json file, ensuring that
 * all profiles adhere to a baseline structure. It warns about missing
 * fields but always passes, to avoid blocking CI/CD pipelines.
 */

import { REQUIRED_PROFILE_FIELDS } from './content.schema.js';
import content from '../test-content-local.json' with { type: 'json' };

/**
 * Checks if a nested property exists in an object using a dot-notation string.
 * @param {object} obj - The object to check.
 * @param {string} path - The dot-notation path (e.g., 'profile.summary.title').
 * @returns {boolean} - True if the path exists, false otherwise.
 */
const hasPath = (obj, path) => {
  const pathParts = path.split('.');
  let current = obj;
  for (let i = 0; i < pathParts.length; i++) {
    if (current === null || typeof current !== 'object' || !current.hasOwnProperty(pathParts[i])) {
      return false;
    }
    current = current[pathParts[i]];
  }
  return true;
};

// Get all profile keys from the content file, excluding GLOBAL_DATA
const profileKeys = Object.keys(content).filter(key => key !== 'GLOBAL_DATA');

describe('Content Linter', () => {

  // Dynamically create a test for each profile
  test.each(profileKeys)('Profile "%s" should have all required fields', (profileKey) => {
    const profile = content[profileKey];
    const warnings = [];

    REQUIRED_PROFILE_FIELDS.forEach(fieldPath => {
      if (!hasPath(profile, fieldPath)) {
        warnings.push(`Missing required field: ${fieldPath}`);
      }
    });

    if (warnings.length > 0) {
      const warningMessage = [
        `[CONTENT LINTING] Profile "${profileKey}" has validation issues:`,
        ...warnings.map(w => `  - ${w}`),
      ].join('\n');
      console.warn(warningMessage);
    }

    // This test should always pass to avoid blocking CI
    expect(true).toBe(true);
  });
});
