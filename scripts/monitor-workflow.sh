#!/bin/bash
# Workflow Protocol Monitoring Script
# Location: scripts/monitor-workflow.sh
# Purpose: Monitor workflow adoption and compliance metrics

echo "📊 Workflow Protocol Monitoring Report"
echo "======================================"
echo ""

# Check git configuration
echo "🔧 Git Configuration Check:"
echo "----------------------------"
if [ -f ".git/hooks/pre-commit" ]; then
    echo "✅ Pre-commit hook: Installed"
else
    echo "❌ Pre-commit hook: Missing"
fi

if [ -x ".git/hooks/pre-commit" ]; then
    echo "✅ Pre-commit hook: Executable"
else
    echo "❌ Pre-commit hook: Not executable"
fi

echo ""

# Check recent commits for conventional format
echo "📝 Recent Commit Analysis (last 10):"
echo "------------------------------------"
commit_count=0
conventional_count=0

while IFS= read -r commit_msg; do
    commit_count=$((commit_count + 1))
    
    # Check if commit follows conventional format (type: description)
    if echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
        conventional_count=$((conventional_count + 1))
        echo "✅ $commit_msg"
    else
        echo "❌ $commit_msg"
    fi
done < <(git log --oneline -10 --pretty=format:"%s")

compliance_rate=$((conventional_count * 100 / commit_count))
echo ""
echo "📈 Commit Compliance: $conventional_count/$commit_count ($compliance_rate%)"

if [ $compliance_rate -ge 80 ]; then
    echo "✅ Good compliance rate"
elif [ $compliance_rate -ge 60 ]; then
    echo "⚠️  Moderate compliance rate - needs improvement"
else
    echo "❌ Poor compliance rate - requires attention"
fi

echo ""

# Check branch naming patterns
echo "🌳 Branch Analysis:"
echo "------------------"
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $current_branch"

if echo "$current_branch" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)/"; then
    echo "✅ Branch follows naming convention"
elif [ "$current_branch" = "main" ]; then
    echo "ℹ️  On main branch"
else
    echo "❌ Branch does not follow naming convention"
fi

echo ""

# Check test coverage
echo "🧪 Test Infrastructure Status:"
echo "------------------------------"
test_files=$(find src -name "*.test.js" | wc -l)
component_files=$(find src -name "*.js" | grep -v ".test.js" | wc -l)

echo "Test files: $test_files"
echo "Component files: $component_files"

if [ $component_files -gt 0 ]; then
    test_ratio=$((test_files * 100 / component_files))
    echo "Test ratio: $test_ratio%"
    
    if [ $test_ratio -ge 50 ]; then
        echo "✅ Good test coverage ratio"
    elif [ $test_ratio -ge 25 ]; then
        echo "⚠️  Moderate test coverage ratio"
    else
        echo "❌ Low test coverage ratio"
    fi
fi

echo ""

# Check CI/CD status
echo "🚀 CI/CD Pipeline Status:"
echo "-------------------------"
if [ -f ".github/workflows/ci.yml" ]; then
    echo "✅ CI workflow: Present"
else
    echo "❌ CI workflow: Missing"
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Deploy workflow: Present"
else
    echo "❌ Deploy workflow: Missing"
fi

echo ""

# Performance metrics
echo "⚡ Performance Metrics:"
echo "----------------------"
build_size=""
if [ -d ".next" ]; then
    build_size=$(du -sh .next 2>/dev/null | cut -f1)
    echo "Build size: $build_size"
else
    echo "Build size: Not available (run 'npm run build')"
fi

dependency_count=$(npm list --depth=0 2>/dev/null | grep -c "├\|└" || echo "Unknown")
echo "Dependencies: $dependency_count packages"

echo ""

# Recommendations
echo "💡 Recommendations:"
echo "------------------"

if [ $compliance_rate -lt 80 ]; then
    echo "• Improve commit message format adherence"
    echo "• Review WORKFLOW_PROTOCOL.md for conventional commit guidelines"
fi

if [ ! -x ".git/hooks/pre-commit" ]; then
    echo "• Install and configure pre-commit hooks"
    echo "• Run: chmod +x .git/hooks/pre-commit"
fi

if [[ ! "$current_branch" =~ ^(feat|fix|docs|style|refactor|test|chore)/ ]] && [ "$current_branch" != "main" ]; then
    echo "• Use conventional branch naming: type/description"
fi

if [ $test_files -eq 0 ]; then
    echo "• Add unit tests for critical components"
fi

echo ""
echo "📋 Summary:"
echo "----------"
echo "Workflow compliance: $compliance_rate%"
echo "Generated: $(date)"
echo ""
echo "For detailed workflow guidelines, see WORKFLOW_PROTOCOL.md"