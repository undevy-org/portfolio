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
    echo "⚠️  GitHub CLI not installed. Install with: brew install gh"
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
echo "🎯 Phase 1 Success Criteria:"
echo "  ✅ Cache hit rate: > 80%"
echo "  ✅ Average installation time: < 2 minutes"  
echo "  ✅ Success rate: > 90%"
echo "  ✅ Developer satisfaction: Improved workflow"
echo ""

echo "🔄 Phase 2 Activation Triggers:"
echo "  - Success rate < 90% after 1 week"
echo "  - Average installation time > 3 minutes"
echo "  - Cache hit rate < 60%"
echo "  - Persistent developer workflow issues"
echo ""

echo "📋 Monitoring Checklist:"
echo "  [ ] Monitor for 1 week minimum"
echo "  [ ] Check success rates daily"
echo "  [ ] Track average build times"
echo "  [ ] Collect developer feedback"
echo "  [ ] Review GitHub Actions logs"
echo "  [ ] Analyze failure patterns"
echo ""

echo "🚨 Emergency Actions:"
echo "  - Set EMERGENCY_NPM_BYPASS=true in repository variables"
echo "  - Create incident issue with npm-fallback label"
echo "  - Contact development team lead"
echo ""

echo "📖 Documentation:"
echo "  - Implementation guide: NPM-FALLBACK-STRATEGY.md"
echo "  - Phase 2 template: PHASE-2-TEMPLATE.md"
echo "  - Current branch: $(git branch --show-current)"
echo ""

echo "✅ Monitoring script complete!"
echo "   Run this script weekly to track Phase 1 performance"