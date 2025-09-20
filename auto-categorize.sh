#!/bin/bash

# Auto-categorization workflow for LeetCode solutions
# This script can be run manually or integrated into your workflow

set -e  # Exit on any error

echo "🚀 LeetCode Auto-Categorization Workflow"
echo "========================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed"
    echo "💡 Install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Choose categorization method based on available API key
if [ -z "$CLAUDE_API_KEY" ]; then
    echo "🔍 Using pattern-based categorization (no API key found)..."
    node categorize-patterns.js
else
    echo "🔍 Using Claude AI categorization..."
    node categorize-solution.js
fi

echo ""
echo "🎉 Auto-categorization workflow complete!"
echo "📝 Check your README.md for updates"

# Optional: Show git status if in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo ""
    echo "📋 Git Status:"
    git status --porcelain README.md || true
fi