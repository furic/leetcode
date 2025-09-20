#!/usr/bin/env node

/**
 * LeetCode Solution Categorization Script
 * Automatically categorizes new solutions and updates README.md using Claude API
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Configuration
const CONFIG = {
  apiKey: process.env.CLAUDE_API_KEY || '',
  apiUrl: 'https://api.anthropic.com/v1/messages',
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 2000,
  readmePath: path.join(__dirname, 'README.md'),
  // Categories from your current README structure
  existingCategories: {
    'Arrays': [
      'Prefix Sum & Subarray/Product Problems',
      'Sorting, Pairing & Removal',
      'Counting, Frequency & Miscellaneous',
      'Matrix Problems',
      'Two-Pointer & Sliding Window',
      'Dynamic Programming'
    ],
    'Strings': [
      'String Manipulation',
      'Strings & Palindromes'
    ],
    'Trees & Graphs': [
      'Tree & Graph Problems'
    ],
    'Hash Tables & Dictionaries': [],
    'Math & Bit Manipulation': [
      'Math & Bit Manipulation'
    ],
    'System Design': [],
    'SQL': []
  }
};

class SolutionCategorizer {
  constructor() {
    this.validateConfig();
  }

  validateConfig() {
    if (!CONFIG.apiKey) {
      console.error('❌ Error: CLAUDE_API_KEY environment variable is required');
      console.log('💡 Set it with: export CLAUDE_API_KEY="your-api-key-here"');
      process.exit(1);
    }

    if (!fs.existsSync(CONFIG.readmePath)) {
      console.error('❌ Error: README.md not found at', CONFIG.readmePath);
      process.exit(1);
    }
  }

  /**
   * Find new solution directories that aren't in README.md
   */
  async findNewSolutions() {
    const readmeContent = fs.readFileSync(CONFIG.readmePath, 'utf8');
    const allDirs = fs.readdirSync(__dirname, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => /^\d{4}-/.test(name)); // Match pattern: 4 digits followed by dash

    const newSolutions = allDirs.filter(dir => !readmeContent.includes(`[${dir}]`));

    console.log(`📁 Found ${allDirs.length} total solution directories`);
    console.log(`🆕 Found ${newSolutions.length} new solutions to categorize`);

    return newSolutions;
  }

  /**
   * Analyze solution files and get problem context
   */
  async analyzeSolution(solutionDir) {
    const solutionPath = path.join(__dirname, solutionDir);

    // Read problem description from README.md
    const readmePath = path.join(solutionPath, 'README.md');
    const solutionFile = path.join(solutionPath, `${solutionDir}.ts`);

    let problemDescription = '';
    let solutionCode = '';
    let solutionExplanation = '';

    try {
      if (fs.existsSync(readmePath)) {
        problemDescription = fs.readFileSync(readmePath, 'utf8').slice(0, 2000); // Limit size
      }

      if (fs.existsSync(solutionFile)) {
        solutionCode = fs.readFileSync(solutionFile, 'utf8');
      }

      // Check for Solution.md
      const solutionMdPath = path.join(solutionPath, 'Solution.md');
      if (fs.existsSync(solutionMdPath)) {
        solutionExplanation = fs.readFileSync(solutionMdPath, 'utf8').slice(0, 1000);
      }

    } catch (error) {
      console.warn(`⚠️  Could not read files for ${solutionDir}:`, error.message);
    }

    return {
      directory: solutionDir,
      problemDescription,
      solutionCode,
      solutionExplanation
    };
  }

  /**
   * Call Claude API to categorize the solution
   */
  async categorizeSolution(solutionData) {
    const prompt = this.buildCategorizationPrompt(solutionData);

    try {
      const response = await this.callClaudeAPI(prompt);
      return this.parseCategorizationResponse(response);
    } catch (error) {
      console.error(`❌ Error categorizing ${solutionData.directory}:`, error.message);
      return null;
    }
  }

  buildCategorizationPrompt(solutionData) {
    return `You are a LeetCode expert. Analyze this solution and categorize it according to the existing category structure.

EXISTING CATEGORIES AND SUBCATEGORIES:
${JSON.stringify(CONFIG.existingCategories, null, 2)}

SOLUTION TO CATEGORIZE:
Directory: ${solutionData.directory}

Problem Description (first 2000 chars):
${solutionData.problemDescription}

Solution Code:
${solutionData.solutionCode}

${solutionData.solutionExplanation ? `Solution Explanation:\n${solutionData.solutionExplanation}` : ''}

INSTRUCTIONS:
1. Analyze the problem type, algorithms used, and data structures involved
2. Choose the BEST FITTING main category from the existing categories
3. Choose or suggest a subcategory that fits the problem pattern
4. If no existing subcategory fits well, suggest a new descriptive subcategory name
5. Consider algorithm complexity, problem patterns, and solution approach

Respond with ONLY a JSON object in this exact format:
{
  "category": "exact_category_name_from_existing",
  "subcategory": "subcategory_name",
  "reasoning": "brief explanation of why this categorization fits",
  "title": "problem_number. Problem Title",
  "isNewSubcategory": true/false
}

Example response:
{
  "category": "Arrays",
  "subcategory": "Two-Pointer & Sliding Window",
  "reasoning": "Uses two-pointer technique to solve array problem efficiently",
  "title": "0015. 3Sum",
  "isNewSubcategory": false
}`;
  }

  async callClaudeAPI(prompt) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        model: CONFIG.model,
        max_tokens: CONFIG.maxTokens,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

      const curl = spawn('curl', [
        '-X', 'POST',
        CONFIG.apiUrl,
        '-H', 'Content-Type: application/json',
        '-H', `x-api-key: ${CONFIG.apiKey}`,
        '-H', 'anthropic-version: 2023-06-01',
        '-d', postData
      ]);

      let responseData = '';
      let errorData = '';

      curl.stdout.on('data', (data) => {
        responseData += data.toString();
      });

      curl.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      curl.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`API call failed with code ${code}: ${errorData}`));
          return;
        }

        try {
          const response = JSON.parse(responseData);
          if (response.error) {
            reject(new Error(`API error: ${response.error.message}`));
            return;
          }

          if (response.content && response.content[0] && response.content[0].text) {
            resolve(response.content[0].text);
          } else {
            reject(new Error('Unexpected API response format'));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse API response: ${parseError.message}`));
        }
      });
    });
  }

  parseCategorizationResponse(response) {
    try {
      // Extract JSON from response (handle cases where Claude adds explanation)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const result = JSON.parse(jsonMatch[0]);

      // Validate required fields
      if (!result.category || !result.subcategory || !result.title) {
        throw new Error('Missing required fields in categorization response');
      }

      return result;
    } catch (error) {
      console.error('❌ Failed to parse categorization response:', error.message);
      console.log('Raw response:', response);
      return null;
    }
  }

  /**
   * Update README.md with new categorized solution
   */
  async updateReadme(categorization, solutionDir) {
    const readmeContent = fs.readFileSync(CONFIG.readmePath, 'utf8');

    const { category, subcategory, title, isNewSubcategory } = categorization;
    const solutionLink = `- [${title}](./${solutionDir}/)`;

    let updatedContent = readmeContent;

    // Find the category section
    const categoryRegex = new RegExp(`<summary>[^<]*${category}[^<]*</summary>`, 'i');
    const categoryMatch = updatedContent.match(categoryRegex);

    if (!categoryMatch) {
      console.error(`❌ Could not find category section: ${category}`);
      return false;
    }

    // Find the position to insert the new solution
    const categoryStartIndex = updatedContent.indexOf(categoryMatch[0]);
    const nextDetailsIndex = updatedContent.indexOf('</details>', categoryStartIndex);

    if (nextDetailsIndex === -1) {
      console.error(`❌ Could not find end of category section: ${category}`);
      return false;
    }

    // Extract the category content
    const beforeCategory = updatedContent.substring(0, categoryStartIndex);
    const categorySection = updatedContent.substring(categoryStartIndex, nextDetailsIndex);
    const afterCategory = updatedContent.substring(nextDetailsIndex);

    let updatedCategorySection = categorySection;

    // Check if subcategory exists
    const subcategoryRegex = new RegExp(`### ${subcategory.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    const subcategoryMatch = updatedCategorySection.match(subcategoryRegex);

    if (subcategoryMatch) {
      // Add to existing subcategory
      const subcategoryIndex = updatedCategorySection.indexOf(subcategoryMatch[0]);
      const nextSubcategoryIndex = updatedCategorySection.indexOf('\n### ', subcategoryIndex + 1);
      const insertIndex = nextSubcategoryIndex !== -1 ? nextSubcategoryIndex : updatedCategorySection.lastIndexOf('\n');

      updatedCategorySection =
        updatedCategorySection.substring(0, insertIndex) +
        '\n' + solutionLink +
        updatedCategorySection.substring(insertIndex);
    } else {
      // Create new subcategory
      const insertIndex = updatedCategorySection.lastIndexOf('\n');
      updatedCategorySection =
        updatedCategorySection.substring(0, insertIndex) +
        `\n\n### ${subcategory}\n${solutionLink}` +
        updatedCategorySection.substring(insertIndex);
    }

    // Reconstruct the full content
    updatedContent = beforeCategory + updatedCategorySection + afterCategory;

    // Write back to file
    fs.writeFileSync(CONFIG.readmePath, updatedContent, 'utf8');

    console.log(`✅ Added ${title} to ${category} > ${subcategory}`);
    return true;
  }

  /**
   * Main processing function
   */
  async run() {
    console.log('🚀 Starting LeetCode Solution Categorization...\n');

    const newSolutions = await this.findNewSolutions();

    if (newSolutions.length === 0) {
      console.log('✨ No new solutions to categorize!');
      return;
    }

    console.log(`\n📝 Processing ${newSolutions.length} new solutions...\n`);

    let successCount = 0;
    let failCount = 0;

    for (const solutionDir of newSolutions) {
      console.log(`🔍 Analyzing: ${solutionDir}`);

      try {
        // Analyze solution
        const solutionData = await this.analyzeSolution(solutionDir);

        // Get categorization from Claude
        const categorization = await this.categorizeSolution(solutionData);

        if (!categorization) {
          console.log(`❌ Failed to categorize ${solutionDir}`);
          failCount++;
          continue;
        }

        console.log(`🎯 Categorized as: ${categorization.category} > ${categorization.subcategory}`);
        console.log(`💭 Reasoning: ${categorization.reasoning}`);

        // Update README
        const updated = await this.updateReadme(categorization, solutionDir);

        if (updated) {
          successCount++;
        } else {
          failCount++;
        }

        // Small delay to be respectful to API
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ Error processing ${solutionDir}:`, error.message);
        failCount++;
      }

      console.log(''); // Empty line for readability
    }

    console.log('📊 Summary:');
    console.log(`✅ Successfully categorized: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Total processed: ${newSolutions.length}`);

    if (successCount > 0) {
      console.log('\n🎉 README.md has been updated with new categorizations!');
    }
  }
}

// Handle command line usage
if (require.main === module) {
  const categorizer = new SolutionCategorizer();
  categorizer.run().catch(console.error);
}

module.exports = SolutionCategorizer;