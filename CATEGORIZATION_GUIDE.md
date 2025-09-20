# 🤖 LeetCode Solution Auto-Categorization Guide

This guide explains how to use the intelligent categorization system for your LeetCode solutions with multiple categorization options.

## 🚀 Quick Start

### Choose Your Categorization Method

**Option 1: Pattern-Based (Recommended - No API needed)**
```bash
npm run categorize:patterns  # Fast automated categorization
```

**Option 2: Manual Interactive**
```bash
npm run categorize:manual    # Guided manual categorization
```

**Option 3: Claude AI (Requires API key)**
```bash
# First set up Claude API key:
export CLAUDE_API_KEY="your-api-key-here"
npm run categorize           # AI-powered categorization
```

### Complete Workflow

```bash
# Choose your categorization method
npm run categorize:patterns  # Pattern-based (recommended)
npm run categorize:manual    # Interactive manual
npm run categorize           # Claude AI (requires API key)
```

## 📁 How It Works

### 1. **Detection** (All Methods)
- Scans for directories matching pattern `\d{4}-*` (e.g., `0001-two-sum`)
- Compares against existing entries in README.md
- Identifies new solutions that need categorization

### 2. **Analysis** (All Methods)
- Reads problem description from `README.md`
- Analyzes solution code from `{problem-id}-{problem-name}.ts`
- Includes solution explanation from `Solution.md` if available

### 3. **Categorization Methods**

**Pattern-Based Categorization:**
- Analyzes code patterns and keywords automatically
- Uses predefined rules for common algorithm patterns
- Fast and requires no external dependencies
- ~80-90% accuracy for standard problems

**Manual Categorization:**
- Shows problem info and code preview
- Interactive selection of category and subcategory
- 100% accuracy with human judgment
- Educational - helps you learn problem patterns

**Claude AI Categorization:**
- Sends problem context to Claude AI (requires API key)
- Gets intelligent categorization based on:
  - Algorithm patterns (Two Pointers, Dynamic Programming, etc.)
  - Data structures used (Arrays, Trees, Hash Tables, etc.)
  - Problem complexity and approach
  - Existing category structure

### 4. **README Update** (All Methods)
- Automatically places solution in appropriate category
- Creates new subcategories when needed
- Maintains existing structure and formatting

## 🏗️ Project Structure

```
leetcode/
├── categorize-solution.js      # Claude AI categorization script
├── categorize-patterns.js      # Pattern-based categorization (recommended)
├── categorize-manual.js        # Interactive manual categorization
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
# Optional: Claude API key (only needed for AI categorization)
export CLAUDE_API_KEY="your-api-key"

# Optional: Custom configuration for Claude AI
export CATEGORIZE_MODEL="claude-3-5-sonnet-20241022"  # AI model
export CATEGORIZE_MAX_TOKENS="2000"                   # Response limit
```

### Pattern-Based Configuration

Pattern rules are defined in `categorize-patterns.js` and can be customized:

```javascript
'Two-Pointer & Sliding Window': {
  keywords: ['two pointer', 'sliding window', 'left', 'right'],
  codePatterns: [/left.*right/, /while.*left.*right/, /window/i]
}
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

**For Pattern-Based (Recommended):**
- No setup required - works out of the box
- Workflow uses `categorize-patterns.js` by default

**For Claude AI (Optional):**
1. **Add API Key to GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add new secret: `CLAUDE_API_KEY` with your API key
   - Modify workflow to use `categorize-solution.js`

### Workflow Triggers
- **Automatic**: When new solution directories are pushed
- **Manual**: Dispatch from GitHub Actions tab

### Workflow Features

- ✅ Detects new solutions automatically
- 🤖 Categorizes using pattern matching (or Claude AI if configured)
- 📊 Updates statistics
- 📝 Commits changes back to repository
- 🚫 Skips if no new solutions found

## 📋 Commands Reference

### NPM Scripts

```bash
npm run categorize:patterns # Pattern-based categorization (recommended)
npm run categorize:manual   # Interactive manual categorization
npm run categorize          # Claude AI categorization (requires API key)
npm run setup             # Show setup instructions
npm run verify            # Verify configuration
```

### Direct Node.js

```bash
node categorize-patterns.js   # Pattern-based categorization
node categorize-manual.js     # Manual interactive categorization
node categorize-solution.js   # Claude AI categorization
```

### Shell Script

```bash
./auto-categorize.sh          # Complete workflow
```

## 🛠️ Advanced Usage

### Custom Categories

**For Pattern-Based:** Edit the `patterns` object in `categorize-patterns.js`:

```javascript
patterns: {
  'Your New Category': {
    'Your Subcategory': {
      keywords: ['keyword1', 'keyword2'],
      codePatterns: [/pattern1/, /pattern2/]
    }
  }
}
```

**For Claude AI:** Edit the `existingCategories` object in `categorize-solution.js`:

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
# Solution 1: Use pattern-based instead (recommended)
npm run categorize:patterns

# Solution 2: Set API key for Claude AI
export CLAUDE_API_KEY="your-api-key-here"
```

**❌ "Could not find category section"**
- Check that README.md follows the expected format
- Ensure category names match exactly
- Try updating with a simple case first

**❌ Pattern categorization seems inaccurate**
- Use manual categorization for complex cases
- Adjust pattern rules in `categorize-patterns.js`
- Review and manually fix any mistakes

**❌ "API call failed" (Claude AI only)**
- Verify API key is correct
- Check internet connection
- Ensure you have API credits
- Switch to pattern-based as fallback

**❌ "No JSON found in response" (Claude AI only)**
- Claude's response format changed
- Check and update prompt if needed
- Use pattern-based as alternative

### Debug Mode

Enable verbose logging:

```bash
DEBUG=true node categorize-solution.js
```

### Rate Limiting

**Pattern-Based:** No rate limiting needed - runs locally

**Claude AI:** The script includes automatic delays between API calls:

```javascript
// In categorize-solution.js
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
```

## 🎯 Best Practices

### 1. **Regular Updates**
- Run after adding new solutions
- Use GitHub Actions for automation
- Pattern-based method works without any setup
- Keep API key secure (if using Claude AI)

### 2. **Solution Structure**
- Ensure each solution has proper README.md
- Include Solution.md for better categorization
- Use descriptive variable names in code

### 3. **Manual Review**
- Review automated categorizations occasionally
- Use manual mode for complex or edge cases
- Adjust pattern rules as needed
- Fix any categorization mistakes


## 🔒 Security

- **Pattern-based method:** No security concerns - runs locally
- **Claude AI method:**
  - Never commit API keys to the repository
  - Use environment variables or GitHub Secrets
  - Regularly rotate API keys
  - Monitor API usage and costs

## 🚀 Contributing

To improve the categorization system:

1. **Fork the repository**
2. **Improve pattern rules** in `categorize-patterns.js`
3. **Enhance prompts** in `buildCategorizationPrompt()` (Claude AI)
4. **Add new categories** to configuration
5. **Enhance error handling**
6. **Submit pull request**

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Try pattern-based method as fallback
3. Review error messages carefully
4. Enable debug mode for more details
5. Check Claude API status (if using AI method)
6. Use manual categorization for edge cases
7. Create an issue with detailed error info

---

**Happy coding! 🎉**

*This system helps you focus on solving problems while automation handles the organization.*