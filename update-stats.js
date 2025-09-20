#!/usr/bin/env node

/**
 * Update LeetCode statistics in README.md
 * This script counts actual solutions and updates the badges
 */

const fs = require('fs');
const path = require('path');

class StatsUpdater {
  constructor() {
    this.readmePath = path.join(__dirname, 'README.md');
  }

  /**
   * Count actual solution directories
   */
  countSolutions() {
    const dirs = fs.readdirSync(__dirname, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => /^\d{4}-/.test(name)); // Match pattern: 4 digits followed by dash

    return {
      solved: dirs.length,
      directories: dirs
    };
  }

  /**
   * Analyze difficulty distribution by reading problem files
   */
  analyzeDifficulty() {
    const dirs = this.countSolutions().directories;
    const difficulties = { Easy: 0, Medium: 0, Hard: 0 };

    for (const dir of dirs) {
      try {
        const readmePath = path.join(__dirname, dir, 'README.md');
        if (fs.existsSync(readmePath)) {
          const content = fs.readFileSync(readmePath, 'utf8');

          if (content.includes('<h3>Easy</h3>')) {
            difficulties.Easy++;
          } else if (content.includes('<h3>Medium</h3>')) {
            difficulties.Medium++;
          } else if (content.includes('<h3>Hard</h3>')) {
            difficulties.Hard++;
          }
        }
      } catch (error) {
        // Skip if can't read file
      }
    }

    return difficulties;
  }

  /**
   * Update README badges with actual counts
   */
  updateStats() {
    const stats = this.countSolutions();
    const difficulties = this.analyzeDifficulty();

    const readmeContent = fs.readFileSync(this.readmePath, 'utf8');

    // Calculate solve percentage (assuming LeetCode has ~3700 problems)
    const totalProblems = 3700; // Approximate total LeetCode problems
    const solvePercentage = ((stats.solved / totalProblems) * 100).toFixed(1);

    let updatedContent = readmeContent;

    // Update Problems Solved badge
    updatedContent = updatedContent.replace(
      /Problems_Solved-\d+\/\d+,\d+-blue/,
      `Problems_Solved-${stats.solved}/${totalProblems}-blue`
    );

    // Update Solve Percentage badge
    updatedContent = updatedContent.replace(
      /Solve_Rate-[\d.]+%25-success/,
      `Solve_Rate-${solvePercentage}%25-success`
    );

    // Write back to file
    fs.writeFileSync(this.readmePath, updatedContent, 'utf8');

    console.log('📊 Statistics Updated:');
    console.log(`✅ Problems Solved: ${stats.solved}`);
    console.log(`📈 Solve Rate: ${solvePercentage}%`);
    console.log(`🟢 Easy: ${difficulties.Easy}`);
    console.log(`🟡 Medium: ${difficulties.Medium}`);
    console.log(`🔴 Hard: ${difficulties.Hard}`);
  }

  run() {
    console.log('📊 Updating LeetCode statistics...\n');
    this.updateStats();
    console.log('\n✅ Statistics update complete!');
  }
}

// Handle command line usage
if (require.main === module) {
  const updater = new StatsUpdater();
  updater.run();
}

module.exports = StatsUpdater;