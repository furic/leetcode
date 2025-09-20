#!/usr/bin/env node

/**
 * Manual LeetCode Solution Categorization Script
 * For users without Claude API access - provides guided categorization
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class ManualCategorizer {
  constructor() {
    this.readmePath = path.join(__dirname, 'README.md');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.categories = {
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

  async showProblemInfo(solutionDir) {
    const solutionPath = path.join(__dirname, solutionDir);
    const readmePath = path.join(solutionPath, 'README.md');
    const solutionFile = path.join(solutionPath, `${solutionDir}.ts`);

    console.log(`\n📋 Problem: ${solutionDir}`);
    console.log(''.padEnd(50, '='));

    // Show problem description snippet
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      const titleMatch = content.match(/<h2><a href="[^"]*">([^<]+)<\/a><\/h2><h3>([^<]+)<\/h3>/);
      if (titleMatch) {
        console.log(`📝 Title: ${titleMatch[1]}`);
        console.log(`⚡ Difficulty: ${titleMatch[2]}`);
      }

      // Show first few lines of description
      const lines = content.split('\n').slice(0, 10);
      const description = lines.join('\n').replace(/<[^>]*>/g, '').slice(0, 300);
      console.log(`📖 Description: ${description}...`);
    }

    // Show solution approach
    if (fs.existsSync(solutionFile)) {
      const code = fs.readFileSync(solutionFile, 'utf8');
      const codeSnippet = code.split('\n').slice(0, 15).join('\n');
      console.log(`\n💻 Solution Preview:\n${codeSnippet}...`);
    }
  }

  async promptCategory() {
    console.log('\n🏷️  Available Categories:');
    const categoryList = Object.keys(this.categories);
    categoryList.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    return new Promise((resolve) => {
      this.rl.question('\n👉 Select category (1-' + categoryList.length + '): ', (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < categoryList.length) {
          resolve(categoryList[index]);
        } else {
          console.log('❌ Invalid selection. Please try again.');
          this.promptCategory().then(resolve);
        }
      });
    });
  }

  async promptSubcategory(category) {
    const subcategories = this.categories[category];

    if (subcategories.length === 0) {
      return new Promise((resolve) => {
        this.rl.question(`\n📝 Enter subcategory for ${category}: `, resolve);
      });
    }

    console.log(`\n📂 Available Subcategories for ${category}:`);
    subcategories.forEach((sub, index) => {
      console.log(`${index + 1}. ${sub}`);
    });
    console.log(`${subcategories.length + 1}. Create new subcategory`);

    return new Promise((resolve) => {
      this.rl.question('\n👉 Select subcategory (1-' + (subcategories.length + 1) + '): ', (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < subcategories.length) {
          resolve(subcategories[index]);
        } else if (index === subcategories.length) {
          this.rl.question('📝 Enter new subcategory name: ', resolve);
        } else {
          console.log('❌ Invalid selection. Please try again.');
          this.promptSubcategory(category).then(resolve);
        }
      });
    });
  }

  async updateReadme(solutionDir, category, subcategory) {
    const readmeContent = fs.readFileSync(this.readmePath, 'utf8');

    // Extract problem title from directory name
    const titleMatch = solutionDir.match(/^(\d{4})-(.+)$/);
    const problemNumber = titleMatch[1];
    const problemName = titleMatch[2].split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    const title = `${problemNumber}. ${problemName}`;

    const solutionLink = `- [${title}](./${solutionDir}/)`;

    // Find category section and update
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

    // Write back
    const updatedContent = beforeCategory + updatedCategorySection + afterCategory;
    fs.writeFileSync(this.readmePath, updatedContent, 'utf8');

    console.log(`✅ Added ${title} to ${category} > ${subcategory}`);
    return true;
  }

  async run() {
    console.log('🚀 Manual LeetCode Solution Categorization\n');

    const newSolutions = await this.findNewSolutions();

    if (newSolutions.length === 0) {
      console.log('✨ No new solutions to categorize!');
      this.rl.close();
      return;
    }

    console.log(`\n📝 Processing ${newSolutions.length} new solutions...\n`);

    for (const solutionDir of newSolutions) {
      await this.showProblemInfo(solutionDir);

      const category = await this.promptCategory();
      const subcategory = await this.promptSubcategory(category);

      console.log(`\n🎯 Categorizing as: ${category} > ${subcategory}`);

      const confirmPromise = new Promise((resolve) => {
        this.rl.question('✅ Confirm? (y/n): ', (answer) => {
          resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
      });

      const confirmed = await confirmPromise;

      if (confirmed) {
        await this.updateReadme(solutionDir, category, subcategory);
        console.log('✅ Successfully categorized!');
      } else {
        console.log('⏭️  Skipped');
      }

      console.log('\n' + ''.padEnd(50, '-') + '\n');
    }

    console.log('🎉 Manual categorization complete!');
    this.rl.close();
  }
}

if (require.main === module) {
  const categorizer = new ManualCategorizer();
  categorizer.run().catch(console.error);
}

module.exports = ManualCategorizer;