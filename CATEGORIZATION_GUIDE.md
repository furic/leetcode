# 🤖 LeetCode Solution Auto-Categorization Guide

This guide explains how to use the intelligent categorization system for your LeetCode solutions using Claude AI.

## 🚀 Quick Start

### 1. Setup

First, get your Claude API key:
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and get your API key
3. Set the environment variable:

```bash
export CLAUDE_API_KEY="your-api-key-here"
```

### 2. Run Auto-Categorization

```bash
# Make the script executable (one time)
chmod +x auto-categorize.sh

# Run the complete workflow
./auto-categorize.sh

# Or run individual commands
npm run update-stats        # Update solution count statistics
npm run categorize          # Categorize new solutions only
npm run categorize:watch    # Update stats + categorize
```

## 📁 How It Works

### 1. **Detection**
- Scans for directories matching pattern `\d{4}-*` (e.g., `0001-two-sum`)
- Compares against existing entries in README.md
- Identifies new solutions that need categorization

### 2. **Analysis**
- Reads problem description from `README.md`
- Analyzes solution code from `{problem-id}-{problem-name}.ts`
- Includes solution explanation from `Solution.md` if available

### 3. **AI Categorization**
- Sends problem context to Claude AI
- Gets intelligent categorization based on:
  - Algorithm patterns (Two Pointers, Dynamic Programming, etc.)
  - Data structures used (Arrays, Trees, Hash Tables, etc.)
  - Problem complexity and approach
  - Existing category structure

### 4. **README Update**
- Automatically places solution in appropriate category
- Creates new subcategories when needed
- Maintains existing structure and formatting
- Updates solution count statistics

## 🏗️ Project Structure

```
leetcode/
├── categorize-solution.js      # Main categorization script
├── update-stats.js            # Statistics updater
├── auto-categorize.sh         # Complete workflow script
├── package.json               # NPM configuration
├── CATEGORIZATION_GUIDE.md    # This guide
├── .github/workflows/         # GitHub Actions automation
│   └── auto-categorize.yml
└── {problem-directories}/     # Your LeetCode solutions
    ├── README.md              # Problem description
    ├── Solution.md            # Solution explanation
    └── {problem}.ts           # TypeScript solution
```

## 🔧 Configuration

### Environment Variables

```bash
# Required: Claude API key
export CLAUDE_API_KEY="your-api-key"

# Optional: Custom configuration
export CATEGORIZE_MODEL="claude-3-5-sonnet-20241022"  # AI model
export CATEGORIZE_MAX_TOKENS="2000"                   # Response limit
```

### Categories

Current category structure (automatically detected):

```
📋 Arrays
  ├── Prefix Sum & Subarray/Product Problems
  ├── Sorting, Pairing & Removal
  ├── Counting, Frequency & Miscellaneous
  ├── Matrix Problems
  ├── Two-Pointer & Sliding Window
  └── Dynamic Programming

🔤 Strings
  ├── String Manipulation
  └── Strings & Palindromes

🌳 Trees & Graphs
  └── Tree & Graph Problems

🔍 Hash Tables & Dictionaries

🔢 Math & Bit Manipulation

💾 System Design

📊 SQL
```

## 🤖 GitHub Actions Integration

The repository includes automatic categorization via GitHub Actions:

### Setup GitHub Actions

1. **Add API Key to GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add new secret: `CLAUDE_API_KEY` with your API key

2. **Workflow Triggers:**
   - **Automatic**: When new solution directories are pushed
   - **Manual**: Dispatch from GitHub Actions tab

### Workflow Features

- ✅ Detects new solutions automatically
- 🤖 Categorizes using Claude AI
- 📊 Updates statistics
- 📝 Commits changes back to repository
- 🚫 Skips if no new solutions found

## 📋 Commands Reference

### NPM Scripts

```bash
npm run categorize          # Categorize new solutions
npm run categorize:watch    # Update stats + categorize
npm run update-stats       # Update solution count only
npm run setup             # Show setup instructions
npm run verify            # Verify configuration
```

### Direct Node.js

```bash
node categorize-solution.js    # Main categorization
node update-stats.js          # Statistics only
```

### Shell Script

```bash
./auto-categorize.sh          # Complete workflow
```

## 🛠️ Advanced Usage

### Custom Categories

To add new categories, edit the `existingCategories` object in `categorize-solution.js`:

```javascript
existingCategories: {
  'Your New Category': [
    'Subcategory 1',
    'Subcategory 2'
  ],
  // ... existing categories
}
```

### Dry Run Mode

Test categorization without making changes:

```javascript
// Add to categorize-solution.js
const DRY_RUN = process.argv.includes('--dry-run');
```

### Batch Processing

Process specific solutions:

```bash
# Process only specific directories
SOLUTIONS="0001-two-sum,0002-add-two-numbers" node categorize-solution.js
```

## 🐛 Troubleshooting

### Common Issues

**❌ "CLAUDE_API_KEY environment variable is required"**
```bash
# Solution: Set your API key
export CLAUDE_API_KEY="your-api-key-here"
```

**❌ "Could not find category section"**
- Check that README.md follows the expected format
- Ensure category names match exactly

**❌ "API call failed"**
- Verify API key is correct
- Check internet connection
- Ensure you have API credits

**❌ "No JSON found in response"**
- Claude's response format changed
- Check and update prompt if needed

### Debug Mode

Enable verbose logging:

```bash
DEBUG=true node categorize-solution.js
```

### Rate Limiting

The script includes automatic delays between API calls to respect rate limits. Adjust if needed:

```javascript
// In categorize-solution.js
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
```

## 🎯 Best Practices

### 1. **Regular Updates**
- Run after adding new solutions
- Use GitHub Actions for automation
- Keep API key secure

### 2. **Solution Structure**
- Ensure each solution has proper README.md
- Include Solution.md for better categorization
- Use descriptive variable names in code

### 3. **Manual Review**
- Review AI categorizations occasionally
- Adjust categories as needed
- Provide feedback for improvements

### 4. **Statistics Accuracy**
- Run `update-stats.js` regularly
- Verify counts match actual solutions
- Update total problem count periodically

## 🔒 Security

- **Never commit API keys** to the repository
- Use environment variables or GitHub Secrets
- Regularly rotate API keys
- Monitor API usage and costs

## 🚀 Contributing

To improve the categorization system:

1. **Fork the repository**
2. **Improve prompts** in `buildCategorizationPrompt()`
3. **Add new categories** to configuration
4. **Enhance error handling**
5. **Submit pull request**

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review error messages carefully
3. Enable debug mode for more details
4. Check Claude API status
5. Create an issue with detailed error info

---

**Happy coding! 🎉**

*This system helps you focus on solving problems while AI handles the organization.*