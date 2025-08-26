# Phase 2 Implementation Template - Single Fallback Registry

## When to Activate

Activate Phase 2 if Phase 1 metrics after 1 week show:
- Success rate < 90%
- Average installation time > 3 minutes
- Cache hit rate < 60%

## Implementation

Add the following step after the Phase 1 installation step in `.github/workflows/ci.yml`:

```yaml
- name: Phase 2 - Fallback Registry Installation
  if: steps.phase1-install.outcome == 'failure'
  env:
    EMERGENCY_NPM_BYPASS: ${{ vars.EMERGENCY_NPM_BYPASS }}
  run: |
    echo "🔄 Phase 2: Fallback registry installation"
    
    # Check if emergency bypass is enabled
    if [ "${EMERGENCY_NPM_BYPASS}" = "true" ]; then
      echo "🚨 Emergency bypass enabled - skipping Phase 2"
      exit 1
    fi
    
    # Start timer for Phase 2 metrics
    start_time=$(date +%s)
    
    # Test registry health first
    echo "🏥 Testing fallback registry health..."
    if curl -s --connect-timeout 10 https://registry.yarnpkg.com/ > /dev/null; then
      echo "✅ Yarn registry is healthy"
      registry="https://registry.yarnpkg.com/"
    else
      echo "⚠️ Yarn registry unhealthy, trying Cloudflare mirror"
      if curl -s --connect-timeout 10 https://registry.npmjs.cf/ > /dev/null; then
        echo "✅ Cloudflare mirror is healthy"
        registry="https://registry.npmjs.cf/"
      else
        echo "❌ All fallback registries unavailable"
        exit 1
      fi
    fi
    
    echo "📦 Installing dependencies from fallback registry: $registry"
    
    if npm ci --registry="$registry" --timeout=90000; then
      end_time=$(date +%s)
      duration=$((end_time - start_time))
      echo "✅ Phase 2 installation successful in ${duration} seconds"
      
      # Log Phase 2 success metrics
      echo "npm_install_duration=${duration}" >> $GITHUB_STEP_SUMMARY
      echo "npm_install_attempts=2" >> $GITHUB_STEP_SUMMARY
      echo "npm_fallback_registry_used=$registry" >> $GITHUB_STEP_SUMMARY
      echo "npm_phase2_success=true" >> $GITHUB_STEP_SUMMARY
      
    else
      end_time=$(date +%s)
      duration=$((end_time - start_time))
      echo "❌ Phase 2 installation failed after ${duration} seconds"
      
      # Log Phase 2 failure metrics
      echo "npm_install_duration=${duration}" >> $GITHUB_STEP_SUMMARY
      echo "npm_install_attempts=2" >> $GITHUB_STEP_SUMMARY
      echo "npm_phase2_success=false" >> $GITHUB_STEP_SUMMARY
      echo "npm_failure_reason=phase2_failed" >> $GITHUB_STEP_SUMMARY
      
      echo "💀 Phase 2 failed. Consider implementing Phase 3 or investigating registry issues."
      exit 1
    fi
```

## Required Changes

### 1. Update Phase 1 Step ID

Change the Phase 1 installation step to include an ID:

```yaml
- name: Install dependencies with cache optimization
  id: phase1-install  # Add this ID
  env:
    EMERGENCY_NPM_BYPASS: ${{ vars.EMERGENCY_NPM_BYPASS }}
  continue-on-error: true  # Add this to allow Phase 2 to run
  run: |
    # ... existing Phase 1 code ...
```

### 2. Environment Variables

No additional environment variables needed - uses existing `EMERGENCY_NPM_BYPASS`.

### 3. Registry Priority

- Primary fallback: `https://registry.yarnpkg.com/` (Yarn official registry)
- Secondary fallback: `https://registry.npmjs.cf/` (Cloudflare mirror)

### 4. Health Checks

Phase 2 includes health checks for fallback registries before attempting installation.

### 5. Metrics Collection

Phase 2 adds the following metrics:
- `npm_fallback_registry_used` - Which fallback registry was used
- `npm_phase2_success` - Boolean indicating Phase 2 success/failure

## Activation Checklist

- [ ] Verify Phase 1 metrics show insufficient performance
- [ ] Update Phase 1 step to include `id` and `continue-on-error`
- [ ] Add Phase 2 step after Phase 1
- [ ] Test with a failing Phase 1 scenario
- [ ] Monitor Phase 2 performance for 1 week
- [ ] Decide whether Phase 3 is needed

## Rollback

To rollback Phase 2:
1. Remove the Phase 2 step from ci.yml
2. Remove `continue-on-error: true` from Phase 1
3. Remove `id: phase1-install` from Phase 1 (optional)

## Expected Performance

- **Phase 2 Success Rate**: 4% additional (targeting 94% combined)
- **Phase 2 Additional Time**: < 45 seconds
- **Health Check Time**: < 10 seconds
- **Total Maximum Time**: Phase 1 (3 min) + Phase 2 (45 sec) = ~4 minutes

---

**Template Version**: 1.0.0
**Phase**: 2 (Single Fallback Registry)
**Status**: Ready for activation if needed