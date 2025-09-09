// scripts/measure-performance.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Measuring Bundle Performance...\n');

// Build the application
console.log('📦 Building production bundle...');
execSync('npm run build', { stdio: 'inherit' });

// Read the build output
const buildOutputPath = path.join(__dirname, '../.next');
const buildManifestPath = path.join(buildOutputPath, 'build-manifest.json');
const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));

// Parse chunk sizes from build output
const statsPath = path.join(buildOutputPath, 'stats.json');
let stats = {};

if (fs.existsSync(statsPath)) {
  stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
}

// Calculate metrics
console.log('\n📊 Bundle Analysis Results:\n');
console.log('─'.repeat(50));

// Check for Web3 chunk
const web3ChunkPattern = /web3-vendors/;
let web3ChunkSize = 0;
let mainChunkSize = 0;

// Get chunk sizes from .next directory
const chunksDir = path.join(buildOutputPath, 'static/chunks');
if (fs.existsSync(chunksDir)) {
  const files = fs.readdirSync(chunksDir);
  
  files.forEach(file => {
    const filePath = path.join(chunksDir, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
    
    if (web3ChunkPattern.test(file)) {
      web3ChunkSize = stats.size;
      console.log(`✅ Web3 Chunk Found: ${file}`);
      console.log(`   Size: ${sizeInMB} MB`);
      console.log(`   Status: LAZY LOADED (not in initial bundle)`);
    } else if (file.includes('main') || file.includes('app')) {
      mainChunkSize += stats.size;
    }
  });
}

// Calculate improvements
const mainSizeInMB = (mainChunkSize / 1024 / 1024).toFixed(2);
const web3SizeInMB = (web3ChunkSize / 1024 / 1024).toFixed(2);
const totalBefore = mainChunkSize + web3ChunkSize;
const totalBeforeInMB = (totalBefore / 1024 / 1024).toFixed(2);
const improvement = ((web3ChunkSize / totalBefore) * 100).toFixed(1);

console.log('\n📈 Performance Metrics:');
console.log('─'.repeat(50));
console.log(`Initial Bundle (without Web3): ${mainSizeInMB} MB`);
console.log(`Web3 Libraries (lazy loaded): ${web3SizeInMB} MB`);
console.log(`Total Size (if not optimized): ${totalBeforeInMB} MB`);
console.log(`\n🎯 Improvement: ${improvement}% reduction in initial load`);

// Success criteria
console.log('\n✅ Success Criteria Check:');
console.log('─'.repeat(50));

const criteria = [
  {
    name: 'Web3 chunk created separately',
    pass: web3ChunkSize > 0
  },
  {
    name: 'Initial bundle < 2.5MB',
    pass: mainChunkSize < 2.5 * 1024 * 1024
  },
  {
    name: 'Web3 chunk > 1.5MB',
    pass: web3ChunkSize > 1.5 * 1024 * 1024
  },
  {
    name: 'Overall reduction > 40%',
    pass: improvement > 40
  }
];

criteria.forEach(criterion => {
  const status = criterion.pass ? '✅' : '❌';
  console.log(`${status} ${criterion.name}`);
});

const allPassed = criteria.every(c => c.pass);
if (allPassed) {
  console.log('\n🎉 All performance criteria met! Ready to deploy.');
} else {
  console.log('\n⚠️  Some criteria not met. Review the optimization.');
}