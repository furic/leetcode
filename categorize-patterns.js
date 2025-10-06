#!/usr/bin/env node

/**
 * Pattern-Based LeetCode Solution Categorization
 * Categorizes solutions based on code patterns and keywords - no API required
 */

const fs = require('fs');
const path = require('path');

class PatternCategorizer {
  constructor() {
    this.readmePath = path.join(__dirname, 'README.md');

    // Pattern-based categorization rules
    this.patterns = {
      'Arrays': {
        'Two-Pointer & Sliding Window': {
          keywords: ['two pointer', 'sliding window', 'left', 'right', 'window'],
          codePatterns: [/left.*right/, /while.*left.*right/, /window/i, /slow.*fast/]
        },
        'Prefix Sum & Subarray/Product Problems': {
          keywords: ['prefix sum', 'subarray', 'cumulative', 'presum'],
          codePatterns: [/prefixSum|prefix_sum/, /cumSum/, /subarray/i, /sum.*\[i\]/]
        },
        'Sorting, Pairing & Removal': {
          keywords: ['sort', 'pair', 'remove', 'merge'],
          codePatterns: [/\.sort\(/, /merge/, /partition/, /quick.*sort/i]
        },
        'Matrix Problems': {
          keywords: ['matrix', 'grid', '2d', 'spiral', 'island', 'water flow', 'ocean', 'diagonal', 'swim', 'rising water'],
          codePatterns: [/matrix/, /grid/, /\[i\]\[j\]/, /rows.*cols/, /pacific|atlantic/i, /ocean/i, /swim/i]
        },
        'Counting, Frequency & Miscellaneous': {
          keywords: ['count', 'frequency', 'map', 'hash'],
          codePatterns: [/count/, /frequency/, /Map/, /Set/, /\{.*\}/]
        },
        'Dynamic Programming': {
          keywords: ['dp', 'dynamic', 'memo', 'cache'],
          codePatterns: [/dp\[/, /memo/, /cache/, /fibonacci/, /knapsack/i]
        }
      },
      'Strings': {
        'String Manipulation': {
          keywords: ['string', 'char', 'substring', 'replace'],
          codePatterns: [/\.charAt/, /\.substring/, /\.replace/, /\.split/]
        },
        'Strings & Palindromes': {
          keywords: ['palindrome', 'reverse', 'mirror'],
          codePatterns: [/palindrome/i, /reverse/, /charAt.*charAt/]
        }
      },
      'Trees & Graphs': {
        'Tree & Graph Problems': {
          keywords: ['tree', 'node', 'graph', 'dfs', 'bfs', 'traverse'],
          codePatterns: [/TreeNode/, /\.left/, /\.right/, /dfs/, /bfs/, /visited/]
        }
      },
      'Hash Tables & Dictionaries': {
        '': {
          keywords: ['map', 'hash', 'dictionary', 'cache', 'lru'],
          codePatterns: [/Map/, /HashMap/, /Set/, /cache/, /lru/i]
        }
      },
      'Math & Bit Manipulation': {
        'Bit Manipulation': {
          keywords: ['bitwise', 'xor', 'bit mask', 'shift', 'power of two', 'binary'],
          codePatterns: [/<<|>>/, /\^.*\^/, /&=|&(?!\&).*&(?!\&)/, /\|=|\|(?!\|).*\|(?!\|)/, /1\s*<</, />>>?/]
        },
        'Pure Math': {
          keywords: ['gcd', 'lcm', 'prime', 'factorial', 'coprime', 'modulo', 'fibonacci', 'pascal', 'triangle'],
          codePatterns: [/gcd|lcm/i, /prime/i, /factorial/i, /coprime/i, /Math\.pow/, /Math\.sqrt/, /isPrime/i]
        }
      },
      'System Design': {
        '': {
          keywords: ['design', 'implement', 'system', 'cache', 'lru'],
          codePatterns: [/class.*{/, /constructor/, /this\./, /interface/]
        }
      },
      'SQL': {
        '': {
          keywords: ['select', 'from', 'where', 'join'],
          codePatterns: [/SELECT/i, /FROM/i, /WHERE/i, /JOIN/i]
        }
      }
    };
  }

  async findNewSolutions() {
    const readmeContent = fs.readFileSync(this.readmePath, 'utf8');
    const allDirs = fs.readdirSync(__dirname, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => /^\d{4}-/.test(name));

    const newSolutions = allDirs.filter(dir => !readmeContent.includes(`[${dir}]`));

    console.log(`📁 Found ${allDirs.length} total solution directories`);
    console.log(`🆕 Found ${newSolutions.length} new solutions to categorize`);

    return newSolutions;
  }

  analyzeSolution(solutionDir) {
    const solutionPath = path.join(__dirname, solutionDir);
    const readmePath = path.join(solutionPath, 'README.md');
    const solutionFile = path.join(solutionPath, `${solutionDir}.ts`);

    let problemText = '';
    let solutionCode = '';

    try {
      if (fs.existsSync(readmePath)) {
        problemText = fs.readFileSync(readmePath, 'utf8').toLowerCase();
      }

      if (fs.existsSync(solutionFile)) {
        solutionCode = fs.readFileSync(solutionFile, 'utf8');
      }
    } catch (error) {
      console.warn(`⚠️  Could not read files for ${solutionDir}:`, error.message);
    }

    return { problemText, solutionCode };
  }

  categorizeByPatterns(solutionDir, problemText, solutionCode) {
    const allText = (problemText + ' ' + solutionCode).toLowerCase();
    let bestMatch = { category: 'Arrays', subcategory: 'Counting, Frequency & Miscellaneous', score: 0 };

    // Score each category/subcategory
    for (const [category, subcategories] of Object.entries(this.patterns)) {
      for (const [subcategory, patterns] of Object.entries(subcategories)) {
        let score = 0;

        // Check keywords
        for (const keyword of patterns.keywords) {
          if (allText.includes(keyword.toLowerCase())) {
            score += 2;
          }
        }

        // Check code patterns
        for (const pattern of patterns.codePatterns) {
          if (pattern.test(solutionCode)) {
            score += 3;
          }
        }

        // Bonus for exact matches
        if (solutionDir.toLowerCase().includes(patterns.keywords[0])) {
          score += 5;
        }

        if (score > bestMatch.score) {
          bestMatch = {
            category,
            subcategory: subcategory || category,
            score,
            reasoning: this.generateReasoning(patterns.keywords, solutionCode)
          };
        }
      }
    }

    return bestMatch;
  }

  generateReasoning(keywords, code) {
    const matches = keywords.filter(keyword =>
      code.toLowerCase().includes(keyword.toLowerCase())
    );
    return `Detected patterns: ${matches.join(', ')}`;
  }

  async updateReadme(solutionDir, category, subcategory) {
    const readmeContent = fs.readFileSync(this.readmePath, 'utf8');

    // Extract problem title
    const titleMatch = solutionDir.match(/^(\d{4})-(.+)$/);
    const problemNumber = titleMatch[1];
    const problemName = titleMatch[2].split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    const title = `${problemNumber}. ${problemName}`;

    const solutionLink = `- [${title}](./${solutionDir}/)`;

    // Find and update category section
    const categoryRegex = new RegExp(`<summary>[^<]*${category}[^<]*</summary>`, 'i');
    const categoryMatch = readmeContent.match(categoryRegex);

    if (!categoryMatch) {
      console.error(`❌ Could not find category section: ${category}`);
      return false;
    }

    const categoryStartIndex = readmeContent.indexOf(categoryMatch[0]);
    const nextDetailsIndex = readmeContent.indexOf('</details>', categoryStartIndex);

    const beforeCategory = readmeContent.substring(0, categoryStartIndex);
    const categorySection = readmeContent.substring(categoryStartIndex, nextDetailsIndex);
    const afterCategory = readmeContent.substring(nextDetailsIndex);

    let updatedCategorySection = categorySection;

    // Handle subcategory insertion
    if (subcategory && subcategory !== category) {
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
    } else {
      // Add directly to category
      const insertIndex = updatedCategorySection.lastIndexOf('\n');
      updatedCategorySection =
        updatedCategorySection.substring(0, insertIndex) +
        '\n' + solutionLink +
        updatedCategorySection.substring(insertIndex);
    }

    // Write back
    const updatedContent = beforeCategory + updatedCategorySection + afterCategory;
    fs.writeFileSync(this.readmePath, updatedContent, 'utf8');

    console.log(`✅ Added ${title} to ${category} > ${subcategory}`);
    return true;
  }

  async run() {
    console.log('🤖 Pattern-Based LeetCode Solution Categorization\n');

    const newSolutions = await this.findNewSolutions();

    if (newSolutions.length === 0) {
      console.log('✨ No new solutions to categorize!');
      return;
    }

    console.log(`\n📝 Processing ${newSolutions.length} new solutions...\n`);

    let successCount = 0;

    for (const solutionDir of newSolutions) {
      console.log(`🔍 Analyzing: ${solutionDir}`);

      const { problemText, solutionCode } = this.analyzeSolution(solutionDir);
      const categorization = this.categorizeByPatterns(solutionDir, problemText, solutionCode);

      console.log(`🎯 Categorized as: ${categorization.category} > ${categorization.subcategory}`);
      console.log(`💭 Reasoning: ${categorization.reasoning}`);
      console.log(`📊 Confidence: ${categorization.score}/10`);

      const updated = await this.updateReadme(solutionDir, categorization.category, categorization.subcategory);

      if (updated) {
        successCount++;
      }

      console.log(''); // Empty line
    }

    console.log('📊 Summary:');
    console.log(`✅ Successfully categorized: ${successCount}`);
    console.log(`📁 Total processed: ${newSolutions.length}`);

    if (successCount > 0) {
      console.log('\n🎉 README.md has been updated with new categorizations!');
    }
  }
}

if (require.main === module) {
  const categorizer = new PatternCategorizer();
  categorizer.run().catch(console.error);
}

module.exports = PatternCategorizer;