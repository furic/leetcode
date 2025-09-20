#!/bin/bash

# Auto-categorization workflow for LeetCode solutions
# This script can be run manually or integrated into your workflow

set -e  # Exit on any error

echo "🚀 LeetCode Auto-Categorization Workflow"
echo "========================================"

# Check if Claude API key is set
if [ -z "$CLAUDE_API_KEY" ]; then
    echo "❌ Error: CLAUDE_API_KEY environment variable is required"
    echo "💡 Set it with: export CLAUDE_API_KEY=\"your-api-key-here\""
    echo "🔗 Get your API key from: https://console.anthropic.com/"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed"
    echo "💡 Install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Update statistics
echo "📊 Step 1: Updating statistics..."
node update-stats.js

# Categorize new solutions
echo ""
echo "🔍 Step 2: Categorizing new solutions..."
node categorize-solution.js

echo ""
echo "🎉 Auto-categorization workflow complete!"
echo "📝 Check your README.md for updates"

# Optional: Show git status if in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo ""
    echo "📋 Git Status:"
    git status --porcelain README.md || true
fi