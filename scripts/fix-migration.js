#!/usr/bin/env node
/**
 * Fix Migration Script - Correct the broken class replacements
 */

const fs = require('fs');
const path = require('path');

// Components that need fixing based on the error messages
const componentsToFix = [
  'src/app/components/atoms/Label.js',
  'src/app/components/ui/Accordion.js',
  'src/app/components/ui/Tabs.js',
  'src/app/components/ui/TerminalProgress.js',
  'src/app/components/ui/ThemeSwitcher.js'
];

// Patterns that went wrong in the migration
const fixes = [
  {
    // Fix Label.js: =245text-error ml-1245 -> "text-error ml-1"
    component: 'src/app/components/atoms/Label.js',
    patterns: [
      /=(\d+)(text-error)/g,
      /(ml-)(\d+)=\d+/g
    ],
    replacements: [
      '"$2"',
      '$1$2"'
    ]
  },
  {
    // Fix Accordion.js: =842text-text-secondary -> "text-text-secondary"
    component: 'src/app/components/ui/Accordion.js',
    patterns: [
      /=(\d+)(text-text-secondary)/g,
      /=(\d+)(text-success)/g,
      /=(\d+)(border-border-darker)/g
    ],
    replacements: [
      '"$2"',
      '"$2"',
      '"$2"'
    ]
  },
  {
    // Fix Tabs.js: =1623text-text-secondary -> "text-text-secondary"
    component: 'src/app/components/ui/Tabs.js',
    patterns: [
      /=(\d+)(text-text-secondary)/g,
      /=(\d+)(text-success)/g,
      /=(\d+)(border-border-darker)/g
    ],
    replacements: [
      '"$2"',
      '"$2"',
      '"$2"'
    ]
  },
  {
    // Fix TerminalProgress.js: =2417text-text -> "text-text"
    component: 'src/app/components/ui/TerminalProgress.js',
    patterns: [
      /=(\d+)(text-text)/g,
      /=(\d+)(text-warning)/g,
      /=(\d+)(text-text-secondary)/g,
      /=(\d+)(text-success)/g,
      /space-y-(\d+)=\d+/g
    ],
    replacements: [
      '"$2"',
      '"$2"',
      '"$2"',
      '"$2"',
      'space-y-$1"'
    ]
  },
  {
    // Fix ThemeSwitcher.js: =3303border-border -> "border-border"
    component: 'src/app/components/ui/ThemeSwitcher.js',
    patterns: [
      /=(\d+)(border-border)/g,
      /p-(\d+)=\d+/g
    ],
    replacements: [
      '"$2"',
      'p-$1"'
    ]
  }
];

function fixComponent(componentPath, fixes) {
  console.log(`🔧 Fixing ${componentPath}...`);

  if (!fs.existsSync(componentPath)) {
    console.log(`  ⚠️ Component not found: ${componentPath}`);
    return false;
  }

  let content = fs.readFileSync(componentPath, 'utf8');
  let modified = false;

  fixes.forEach((fix, index) => {
    const newContent = content.replace(fix.pattern, fix.replacements[index]);
    if (newContent !== content) {
      content = newContent;
      modified = true;
      console.log(`  ✓ Applied fix for pattern: ${fix.pattern}`);
    }
  });

  if (modified) {
    fs.writeFileSync(componentPath, content);
    console.log(`  ✅ Fixed ${componentPath}`);
  } else {
    console.log(`  ℹ️ No changes needed for ${componentPath}`);
  }

  return modified;
}

function main() {
  console.log('🔧 Starting migration fix...\n');

  const results = fixes.map(fix => ({
    component: fix.component,
    fixed: fixComponent(fix.component, [
      { pattern: fix.patterns[0], replacements: fix.replacements[0] },
      { pattern: fix.patterns[1], replacements: fix.replacements[1] },
      { pattern: fix.patterns[2] ? fix.patterns[2] : '', replacements: fix.replacements[2] || '' },
      { pattern: fix.patterns[3] ? fix.patterns[3] : '', replacements: fix.replacements[3] || '' },
      { pattern: fix.patterns[4] ? fix.patterns[4] : '', replacements: fix.replacements[4] || '' }
    ].filter(item => item.pattern))
  }));

  console.log('\n📊 Summary:');
  results.forEach(result => {
    console.log(`  ${result.fixed ? '✅' : 'ℹ️'} ${path.basename(result.component)}`);
  });

  const fixedCount = results.filter(r => r.fixed).length;
  console.log(`\n🎉 Fix complete: ${fixedCount}/${results.length} components fixed`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fixes };
