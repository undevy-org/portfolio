#!/bin/bash

# NPM Fallback Strategy - Monitoring Script Template
# This script helps track Phase 1 performance metrics

echo "📊 NPM Fallback Strategy - Phase 1 Monitoring"
echo "=============================================="
echo ""

# Check recent workflow runs (requires GitHub CLI)
if command -v gh &> /dev/null; then
    echo "🔍 Recent workflow runs:"
    gh run list --limit 10 --json conclusion,startedAt,workflowName,headBranch,event
    echo ""
    
    echo "📈 Success rate analysis:"
    success_count=$(gh run list --limit 20 --json conclusion --jq '[.[] | select(.conclusion == "success")] | length')
    total_count=$(gh run list --limit 20 --json conclusion --jq 'length')
    
    if [ "$total_count" -gt 0 ]; then
        success_rate=$((success_count * 100 / total_count))
        echo "  Recent success rate: $success_count/$total_count ($success_rate%)"
        
        if [ "$success_rate" -lt 90 ]; then
            echo "  ⚠️  SUCCESS RATE BELOW 90% - Consider activating Phase 2"
        else
            echo "  ✅ Success rate is healthy"
        fi
    fi
    echo ""
else
    echo "⚠️  GitHub CLI not installed. Install with:"
    echo "   macOS: brew install gh"
    echo "   Linux: curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
    echo "          echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null"
    echo "          sudo apt update && sudo apt install gh"
    echo "   Windows: winget install --id GitHub.cli"
    echo "   Other: See https://github.com/cli/cli#installation"
    echo ""
    echo "   Continuing with limited monitoring (no GitHub Actions analysis)..."
    echo "   Manual monitoring: Check GitHub Actions tab for success rates"
    echo ""
fi

# Analyze local npm performance
echo "🧪 Local npm performance test:"
start_time=$(date +%s)

# Test npm ci with current configuration
if npm ci --dry-run --silent &> /dev/null; then
    end_time=$(date +%s)
    duration=$((end_time - start_time))
    echo "  Local npm ci test: ${duration}s"
    
    if [ "$duration" -gt 120 ]; then
        echo "  ⚠️  Local performance > 2 minutes - may indicate issues"
    else
        echo "  ✅ Local performance is good"
    fi
else
    echo "  ❌ Local npm ci test failed"
fi

echo ""

# Check npm configuration
echo "🔧 Current npm configuration:"
echo "  Registry: $(npm config get registry)"
echo "  Cache location: $(npm config get cache)"
echo "  Prefer offline: $(npm config get prefer-offline)"
echo "  Fetch retries: $(npm config get fetch-retries)"
echo "  Fetch timeout: $(npm config get fetch-timeout)"
echo ""

# Check cache status
if [ -d "$(npm config get cache)" ]; then
    cache_size=$(du -sh "$(npm config get cache)" 2>/dev/null | cut -f1)
    echo "📦 NPM cache status:"
    echo "  Cache size: ${cache_size:-unknown}"
    echo "  Cache location: $(npm config get cache)"
    
    # Count cached packages
    cached_packages=$(find "$(npm config get cache)" -name "*.tgz" 2>/dev/null | wc -l)
    echo "  Cached packages: $cached_packages"
else
    echo "📦 NPM cache: Not found or inaccessible"
fi

echo ""

# Phase decision matrix
echo "🎯 Current Implementation: Phase 1 (Cache-Optimized)"
echo "   Files: .github/workflows/ci.yml, .npmrc"
echo "   Strategy: Offline-first cache with single attempt"
echo "   Target: 95% success rate, < 2 min install time"
echo ""

echo "📊 Phase 1 Success Criteria:"
echo "  ✅ Cache hit rate: > 80%"
echo "  ✅ Average installation time: < 2 minutes"  
echo "  ✅ Success rate: > 90%"
echo "  ✅ Developer satisfaction: Improved workflow"
echo ""

echo "🚨 Phase 2 Activation Triggers:"
echo "  - Success rate < 90% after 1 week"
echo "  - Average installation time > 3 minutes"
echo "  - Cache hit rate < 60%"
echo "  - Persistent developer workflow issues"
echo ""

echo "⚡ Phase 2 Implementation Ready:"
echo "  - File: PHASE-2-IMPLEMENTATION.yml"
echo "  - Strategy: Single fallback registry with health checks"
echo "  - Expected: +4% success rate, <45s additional time"
echo ""

echo "🛠️ Phase 3 Activation Triggers:"
echo "  - Combined Phase 1+2 success rate < 97%"
echo "  - Complex failure patterns requiring multiple strategies"
echo "  - Critical infrastructure reliability requirements"
echo ""

echo "🚀 Phase 3 Implementation Ready:"
echo "  - File: PHASE-3-IMPLEMENTATION.yml"
echo "  - Strategy: Full three-level strategy with resilient recovery"
echo "  - Expected: +0.9% success rate, <8min total maximum time"
echo ""

echo "📋 Monitoring Checklist:"
echo "  [ ] Monitor for 1 week minimum before phase decisions"
echo "  [ ] Check success rates daily via GitHub Actions"
echo "  [ ] Track average build times and cache effectiveness"
echo "  [ ] Collect developer feedback on workflow experience"
echo "  [ ] Review GitHub Actions logs for failure patterns"
echo "  [ ] Analyze failure types and registry health"
echo "  [ ] Document weekly monitoring results"
echo ""

echo "🚀 Phase Activation Instructions:"
echo "  Phase 2: Replace ci.yml steps with PHASE-2-IMPLEMENTATION.yml"
echo "  Phase 3: Replace ci.yml steps with PHASE-3-IMPLEMENTATION.yml"
echo "  Rollback: Use backup branches or git revert"
echo "  Testing: Create test PR before activating new phase"
echo ""

echo "🚨 Emergency Actions:"
echo "  - Set EMERGENCY_NPM_BYPASS=true in repository variables"
echo "  - Create incident issue with npm-fallback label"
echo "  - Contact development team lead"
echo ""

echo "📖 Documentation:"
echo "  - Phase 1 Guide: NPM-FALLBACK-STRATEGY.md"
echo "  - Phase 2 Template: PHASE-2-TEMPLATE.md"
echo "  - Phase 2 Implementation: PHASE-2-IMPLEMENTATION.yml"
echo "  - Phase 3 Implementation: PHASE-3-IMPLEMENTATION.yml"
echo "  - Integration Guide: INTEGRATION-GUIDE.md"
echo "  - Baseline Analysis: BASELINE-ANALYSIS.md"
echo "  - Current branch: $(git branch --show-current)"
echo ""

echo "✅ Monitoring script complete!"
echo "   Run this script weekly to track Phase 1 performance"