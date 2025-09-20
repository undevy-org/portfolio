#!/usr/bin/env node
/**
 * Component Migration Helper for Storybook
 *
 * This script analyzes components and identifies which styling approach they use,
 * then provides actionable migration plans to update them to the hybrid CSS variables + Tailwind approach.
 */

const fs = require('fs');
const path = require('path');

const componentPaths = [
  'src/app/components/atoms/CommandTitle.jsx',
  'src/app/components/atoms/Divider.js',
  'src/app/components/atoms/Input.js',
  'src/app/components/atoms/Label.js',
  'src/app/components/atoms/Tag.js',
  'src/app/components/ui/Button.js',
  'src/app/components/ui/Accordion.js',
  'src/app/components/ui/HyperspaceTunnel.js',
  'src/app/components/ui/Tabs.js',
  'src/app/components/ui/TerminalProgress.js',
  'src/app/components/ui/ThemeSwitcher.js',
  'src/app/components/organisms/NavigationPanel.js',
  'src/app/components/organisms/StatisticsGrid.js'
];

const customClassMappings = {
  // Map old custom classes to new hybrid approach
  'btn-command': 'px-4 py-2 bg-btn-bg text-text border border-border hover:bg-btn-bg-hover hover:text-text transition-colors duration-200',
  'btn-secondary': 'px-4 py-2 bg-transparent text-text-secondary border border-border hover:bg-surface hover:text-text transition-colors duration-200',
  'btn-destructive': 'px-4 py-2 bg-error/10 text-error border border-error hover:bg-error hover:text-background transition-colors duration-200',
  'btn-success': 'px-4 py-2 bg-success/10 text-success border border-success hover:bg-success hover:text-background transition-colors duration-200',

  'input-base': 'w-full px-3 py-2 bg-surface text-text border border-border focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200',
  'input-error': 'input-base border-error focus:ring-error',

  'panel-main': 'p-4 bg-surface border border-border rounded-lg',
  'panel-full': 'panel-main bg-surface',
  'panel-theme': 'border-border',

  'text-primary': 'text-text',
  'text-secondary': 'text-text-secondary',
  'text-tertiary': 'text-text-tertiary',
  'text-command': 'text-warning',
  'text-error': 'text-error',
  'text-success': 'text-success',
  'text-accent': 'text-accent',

  'border-primary': 'border-border',
  'border-secondary': 'border-border-darker',
  'border-tertiary': 'border-gray-600',

  'bg-main': 'bg-background',
  'bg-panel': 'bg-surface',
  'bg-input': 'bg-surface',

  'tag-badge': 'text-xs px-2 py-0.5 border rounded whitespace-nowrap border-border text-text-secondary',

  'label-base': 'block text-sm font-mono mb-1 text-text-secondary'
};

function analyzeComponent(filePath) {
  const report = {
    path: filePath,
    exists: false,
    customClassesUsed: [],
    customClassesFound: {},
    tailwindClassesUsed: [],
    mixedUsage: false,
    needsMigration: false,
    migrationPlan: []
  };

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    report.exists = true;

    // Find all className attributes
    const classNameMatches = content.matchAll(/className=["']([^"']+)["']/g);

    for (const match of classNameMatches) {
      const classes = match[1].split(/\s+/);

      for (const cls of classes) {
        if (customClassMappings[cls]) {
          // Found a custom class that needs migration
          report.customClassesUsed.push(cls);
          report.customClassesFound[cls] = (report.customClassesFound[cls] || 0) + 1;
          report.needsMigration = true;
        } else if (cls.match(/^(bg|text|border|hover|focus|p|m|flex|grid)-/)) {
          // Found Tailwind utility
          report.tailwindClassesUsed.push(cls);
        }
      }
    }

    report.mixedUsage = report.customClassesUsed.length > 0 && report.tailwindClassesUsed.length > 0;

    // Generate migration plan
    if (report.needsMigration) {
      report.migrationPlan = Object.entries(report.customClassesFound).map(([oldClass, count]) => ({
        oldClass,
        newClasses: customClassMappings[oldClass],
        occurrences: count,
        migration: `Replace "${oldClass}" with "${customClassMappings[oldClass]}"`
      }));
    }

  } catch (error) {
    console.log(`Could not read ${filePath}: ${error.message}`);
  }

  return report;
}

function generateMigrationReport() {
  console.log('\n=== Component Styling Migration Analysis ===\n');

  const reports = componentPaths.map(analyzeComponent);
  const existingReports = reports.filter(r => r.exists);
  const migrationNeeded = existingReports.filter(r => r.needsMigration);
  const alreadyHybrid = existingReports.filter(r => !r.needsMigration && r.tailwindClassesUsed.length > 0);

  console.log(`📊 Summary:`);
  console.log(`   Total components: ${reports.length}`);
  console.log(`   Components found: ${existingReports.length}`);
  console.log(`   Need migration: ${migrationNeeded.length}`);
  console.log(`   Already hybrid: ${alreadyHybrid.length}`);
  console.log(`   Pure CSS classes only: ${existingReports.length - migrationNeeded.length - alreadyHybrid.length}`);

  if (migrationNeeded.length > 0) {
    console.log('\n🔄 Components Requiring Migration:');
    migrationNeeded.forEach(report => {
      console.log(`\n   📝 ${path.basename(report.path)}:`);
      console.log(`      Location: ${report.path}`);
      console.log(`      Custom classes: ${report.customClassesUsed.join(', ')}`);
      console.log(`      Migration plan:`);
      report.migrationPlan.forEach(plan => {
        console.log(`         • ${plan.migration} (${plan.occurrences} occurrence${plan.occurrences > 1 ? 's' : ''})`);
      });
    });

    console.log('\n📋 Quick Migration Command:');
    console.log('   Run the following to migrate all components:');
    const helpCommand = migrationNeeded.map(r => `--migrate "${r.path}"`).join(' \\\n                    ');
    console.log(`   node scripts/migrate-components.js ${helpCommand}`);
  }

  if (alreadyHybrid.length > 0) {
    console.log('\n✨ Components Already Using Hybrid Approach:');
    alreadyHybrid.forEach(report => {
      console.log(`   ✓ ${path.basename(report.path)}`);
    });
  }

  console.log('\n🎨 CSS Variable to Tailwind Mappings Available:');
  console.log('   bg-primary -> background: var(--color-bg)');
  console.log('   bg-surface -> background: var(--color-input-bg)');
  console.log('   text-text -> color: var(--color-text-primary)');
  console.log('   border-border -> border-color: var(--color-border)');
  // ... more mappings

  return reports;
}

// Migration execution functionality
function migrateComponent(filePath) {
  const report = analyzeComponent(filePath);

  if (!report.needsMigration) {
    console.log(`✓ No migration needed for ${filePath}`);
    return false;
  }

  console.log(`🚀 Migrating ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [oldClass, newClasses] of Object.entries(customClassMappings)) {
    if (report.customClassesFound[oldClass]) {
      // Replace className with mixed quotes handling
      const regex = new RegExp(`className=["']([^"']*)${oldClass}([^"']*)["']`, 'g');
      content = content.replace(regex, (match, before, after, quote) => {
        const otherClasses = `${before}${after}`.trim();
        const allClasses = otherClasses ? `${newClasses} ${otherClasses}` : newClasses;
        modified = true;
        return `className=${quote}${allClasses}${quote}`;
      });
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`   ✓ Updated ${Object.keys(report.customClassesFound).length} class replacements`);
  } else {
    console.log(`   ⚠ No changes made to ${filePath}`);
  }

  return modified;
}

// CLI interface
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Component Migration Helper for Storybook

Usage:
  node scripts/migrate-components.js [options] [files...]

Options:
  --analyze          Analyze all components (default)
  --migrate <file>   Migrate specific component
  --migrate-all      Migrate all components that need it
  --list             List all components and their status

Examples:
  node scripts/migrate-components.js --analyze
  node scripts/migrate-components.js --migrate "src/app/components/ui/Button.js"
  node scripts/migrate-components.js --migrate-all
`);
    return;
  }

  if (args.includes('--migrate-all')) {
    console.log('🔄 Migrating all components...');
    const reports = componentPaths.map(analyzeComponent);
    const migrationNeeded = reports.filter(r => r.needsMigration && r.exists);
    let migrated = 0;

    migrationNeeded.forEach(report => {
      if (migrateComponent(report.path)) {
        migrated++;
      }
    });

    console.log(`\n✅ Migration complete: ${migrated}/${migrationNeeded.length} components migrated`);
  } else if (args.includes('--migrate') && args.length > 1) {
    const migrateIndex = args.indexOf('--migrate');
    if (args[migrateIndex + 1]) {
      migrateComponent(args[migrateIndex + 1]);
    } else {
      console.error('Error: --migrate requires a file path');
    }
  } else if (args.includes('--list')) {
    const reports = generateMigrationReport();
    reports.filter(r => r.exists).forEach(report => {
      console.log(`${report.needsMigration ? '🔄' : '✨'} ${path.basename(report.path)}`);
    });
  } else {
    // Default to analysis
    generateMigrationReport();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeComponent,
  generateMigrationReport,
  customClassMappings
};
